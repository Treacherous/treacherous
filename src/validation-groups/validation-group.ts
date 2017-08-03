import {Ruleset} from "../rulesets/ruleset";
import {RuleLink} from "../rulesets/rule-link";
import {RuleResolver} from "../rulesets/rule-resolver";
import {TypeHelper} from "../helpers/type-helper";
import {IValidationGroup} from "./ivalidation-group";
import {IFieldErrorProcessor} from "../processors/ifield-error-processor";
import {IRuleResolver} from "../rulesets/irule-resolver";
import {IModelResolver} from "../resolvers/imodel-resolver";
import {PromiseCounter} from "../promises/promise-counter";
import {IModelResolverFactory} from "../factories/imodel-resolver-factory";
import {PropertyStateChangedEvent} from "../events/property-state-changed-event";
import {ModelStateChangedEvent} from "../events/model-state-changed-event";
import {EventHandler} from "event-js";
import {ICompositeValidationRule} from "../rules/composite/icomposite-validation-rule";

// TODO: This class could be simplified
export class ValidationGroup implements IValidationGroup
{
    public propertyStateChangedEvent: EventHandler;
    public modelStateChangedEvent: EventHandler;

    protected propertyErrors = {};
    protected promiseCounter: PromiseCounter;
    protected modelResolver: IModelResolver;

    constructor(protected fieldErrorProcessor: IFieldErrorProcessor,
                protected ruleResolver: IRuleResolver = new RuleResolver(),
                protected modelResolverFactory: IModelResolverFactory,
                model: any,
                protected ruleset: Ruleset)
    {

        this.propertyStateChangedEvent = new EventHandler(this);
        this.modelStateChangedEvent = new EventHandler(this);

        this.promiseCounter = new PromiseCounter();
        this.modelResolver = this.modelResolverFactory.createModelResolver(model);
    }

    protected static isRuleset(possibleRuleset: any): boolean {
        return (typeof(possibleRuleset.addRule) == "function");
    }

    protected static isForEach(possibleForEach: any): boolean {
        return possibleForEach.isForEach;
    }

    protected validatePropertyWithRuleLinks = async (propertyName: string, propertyRules: Array<RuleLink>) => {

        let activePromise  = this.fieldErrorProcessor.checkFieldForErrors(this.modelResolver, propertyName, propertyRules);
        let possibleErrors = await this.promiseCounter.countPromise(activePromise);
        let hadErrors = this.hasErrors();

        if (!possibleErrors)
        {
            if (this.propertyErrors[propertyName])
            {
                delete this.propertyErrors[propertyName];
                let eventArgs = new PropertyStateChangedEvent(propertyName, true);
                this.propertyStateChangedEvent.publish(eventArgs);

                let stillHasErrors = hadErrors && this.hasErrors();
                if (!stillHasErrors)
                { this.modelStateChangedEvent.publish(new ModelStateChangedEvent(true)); }
            }

            return this.promiseCounter.waitForCompletion();
        }

        let previousError = this.propertyErrors[propertyName];
        this.propertyErrors[propertyName] = possibleErrors;

        if(possibleErrors != previousError)
        {
            let eventArgs = new PropertyStateChangedEvent(propertyName, false, possibleErrors);
            this.propertyStateChangedEvent.publish(eventArgs);

            if (!hadErrors)
            { this.modelStateChangedEvent.publish(new ModelStateChangedEvent(false)); }
        }

        return this.promiseCounter.waitForCompletion();
    };

    protected validatePropertyWithRuleSet = (propertyRoute: string, ruleset: Ruleset): void => {
        let transformedPropertyName;
        for(let childPropertyName in ruleset.rules){
            transformedPropertyName = `${propertyRoute}.${childPropertyName}`;
            this.validatePropertyWithRules(transformedPropertyName, ruleset.getRulesForProperty(childPropertyName));
        }
    }

    protected validatePropertyWithRules = (propertyRoute: string, rules: any) => {
        let ruleLinks = [];
        let ruleSets = [];

        let currentValue;
        try
        {
            currentValue = this.modelResolver.resolve(propertyRoute);
        }
        catch(ex)
        {
            console.warn(`Failed to resolve property ${propertyRoute} during validation. Does it exist in your model?`);
            throw(ex);
        }

        let routeEachRule = (ruleLinkOrSet) => {
            if(ValidationGroup.isForEach(ruleLinkOrSet))
            {
                let isCurrentlyAnArray = TypeHelper.isArrayType(currentValue);

                if(isCurrentlyAnArray) {
                    currentValue.forEach((element, index) => {
                        let childPropertyName = `${propertyRoute}[${index}]`;
                        this.validatePropertyWithRules(childPropertyName, [ruleLinkOrSet.internalRule]);
                    });
                }
                else
                {
                    if(ValidationGroup.isRuleset(ruleLinkOrSet.internalRule))
                    { ruleSets.push(ruleLinkOrSet.internalRule); }
                    else
                    { ruleLinks.push(ruleLinkOrSet.internalRule); }
                }
            }
            else if(ValidationGroup.isRuleset(ruleLinkOrSet))
            { ruleSets.push(ruleLinkOrSet); }
            else
            { ruleLinks.push(ruleLinkOrSet); }
        };

        rules.forEach(routeEachRule);

        this.validatePropertyWithRuleLinks(propertyRoute, ruleLinks);

        ruleSets.forEach((ruleSet) => {
            this.validatePropertyWithRuleSet(propertyRoute, ruleSet);
        });
    }

    protected startValidateProperty = async (propertyRoute: string) => {
        if(this.ruleset.compositeRules !== {})
        { await this.validateCompositeRules(); }

        if(this.ruleset.compositeRules[propertyRoute] !== undefined)
        { return; }

        let rulesForProperty = this.ruleResolver.resolvePropertyRules(propertyRoute, this.ruleset);
        if(!rulesForProperty) { return; }

        return this.validatePropertyWithRules(propertyRoute, rulesForProperty);
    };

    protected validateCompositeRule = async(compositeRule: ICompositeValidationRule) => {
        let hadErrors = this.hasErrors();
        let isValid = await compositeRule.validate(this.modelResolver);

        if(isValid)
        {
            if(this.propertyErrors[compositeRule.virtualPropertyName])
            {
                delete this.propertyErrors[compositeRule.virtualPropertyName];
                let eventArgs = new PropertyStateChangedEvent(compositeRule.virtualPropertyName, true);
                this.propertyStateChangedEvent.publish(eventArgs);
            }

            let stillHasErrors = hadErrors && this.hasErrors();
            if (!stillHasErrors)
            { this.modelStateChangedEvent.publish(new ModelStateChangedEvent(true)); }
            return;
        }

        let previousError = this.propertyErrors[compositeRule.virtualPropertyName];
        let currentError = compositeRule.getMessage(this.modelResolver);
        this.propertyErrors[compositeRule.virtualPropertyName] = currentError;

        if(currentError != previousError)
        {
            let eventArgs = new PropertyStateChangedEvent(compositeRule.virtualPropertyName, false, currentError);
            this.propertyStateChangedEvent.publish(eventArgs);

            if (!hadErrors)
            { this.modelStateChangedEvent.publish(new ModelStateChangedEvent(false)); }
        }

        return this.propertyErrors[compositeRule.virtualPropertyName];
    }

    protected validateCompositeRules = async () => {
        for(let propertyName in this.ruleset.compositeRules)
        {
            let compositeRule = this.ruleset.compositeRules[propertyName];
            this.validateCompositeRule(compositeRule);
        }
    }

    protected startValidateModel = () => {
        for(let parameterName in this.ruleset.rules) {
            this.startValidateProperty(parameterName);
        }
    };

    protected hasErrors(): boolean {
        return (Object.keys(this.propertyErrors).length > 0);
    }

    public changeValidationTarget = (model: any) => {
        this.modelResolver = this.modelResolverFactory.createModelResolver(model);
    }

    public validateProperty = async(propertyRoute): Promise<boolean> =>
    {
        await this.startValidateProperty(propertyRoute);
        await this.promiseCounter.waitForCompletion();
        return !this.propertyErrors[propertyRoute];
    }

    public validate = async(): Promise<boolean> =>
    {
        await this.startValidateModel();
        await this.promiseCounter.waitForCompletion();
        return !this.hasErrors();
    }

    public getModelErrors = async(revalidate = false): Promise<any> =>
    {
        if(revalidate)
        { await this.startValidateModel(); }

        await this.promiseCounter.waitForCompletion();
        return this.propertyErrors;
    }

    public getPropertyError = async(propertyRoute: string, revalidate = false): Promise<any> =>
    {
        if(revalidate)
        { this.startValidateProperty(propertyRoute); }

        await this.promiseCounter.waitForCompletion();
        return this.propertyErrors[propertyRoute];
    }

    public getPropertyDisplayName = (propertyRoute: string): string => {
        return this.ruleset.getPropertyDisplayName(propertyRoute);
    }

    public isPropertyInGroup = (propertyRoute: string): boolean => {
        let applicableRules = this.ruleResolver.resolvePropertyRules(propertyRoute, this.ruleset);
        return (applicableRules != null);
    }

    public release = () => {}
}