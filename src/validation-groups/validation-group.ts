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
import {ILocaleHandler} from "../localization/ilocale-handler";
import {IDisplayNameCache} from "./idisplay-name-cache";
import {DisplayNameCache} from "./display-name-cache";

// TODO: This class should be simplified further if possible
export class ValidationGroup implements IValidationGroup
{
    public propertyStateChangedEvent: EventHandler;
    public modelStateChangedEvent: EventHandler;

    protected propertyErrors: any = {};
    protected promiseCounter: PromiseCounter;
    protected modelResolver: IModelResolver;
    protected displayNameCache: IDisplayNameCache;

    constructor(protected fieldErrorProcessor: IFieldErrorProcessor,
                protected ruleResolver: IRuleResolver = new RuleResolver(),
                protected modelResolverFactory: IModelResolverFactory,
                protected localeHandler: ILocaleHandler,
                model: any,
                protected ruleset: Ruleset)
    {

        this.propertyStateChangedEvent = new EventHandler(this);
        this.modelStateChangedEvent = new EventHandler(this);
        this.displayNameCache = new DisplayNameCache();

        this.promiseCounter = new PromiseCounter();
        this.modelResolver = this.modelResolverFactory.createModelResolver(model);
        this.displayNameCache.cacheDisplayNamesFor(ruleset);
    }

    protected validatePropertyWithRuleLinks = async (propertyName: string, propertyRules: Array<RuleLink>) => {

        const activePromise  = this.fieldErrorProcessor.checkFieldForErrors(this.modelResolver, propertyName, propertyRules);
        const possibleErrors = await this.promiseCounter.countPromise(activePromise);
        const hadErrors = this.hasErrors();

        if (!possibleErrors)
        {
            if (this.propertyErrors[propertyName])
            {
                delete this.propertyErrors[propertyName];
                const eventArgs = new PropertyStateChangedEvent(propertyName, true);
                this.propertyStateChangedEvent.publish(eventArgs);

                const stillHasErrors = hadErrors && this.hasErrors();
                if (!stillHasErrors)
                { this.modelStateChangedEvent.publish(new ModelStateChangedEvent(true)); }
            }

            return this.promiseCounter.waitForCompletion();
        }

        const previousError = this.propertyErrors[propertyName];
        this.propertyErrors[propertyName] = possibleErrors;

        if(possibleErrors != previousError)
        {
            const eventArgs = new PropertyStateChangedEvent(propertyName, false, possibleErrors);
            this.propertyStateChangedEvent.publish(eventArgs);

            if (!hadErrors)
            { this.modelStateChangedEvent.publish(new ModelStateChangedEvent(false)); }
        }

        return this.promiseCounter.waitForCompletion();
    }

    protected validatePropertyWithRuleSet = (propertyRoute: string, ruleset: Ruleset): void => {
        let transformedPropertyName;
        for(const childPropertyName in ruleset.rules){
            transformedPropertyName = `${propertyRoute}.${childPropertyName}`;
            this.validatePropertyWithRules(transformedPropertyName, ruleset.getRulesForProperty(childPropertyName));
        }
    }

    protected validatePropertyWithRules = (propertyRoute: string, rules: any) => {
        const ruleLinks: Array<RuleLink> = [];
        const ruleSets: Array<Ruleset> = [];

        let currentValue: any;
        try
        {
            currentValue = this.modelResolver.resolve(propertyRoute);
        }
        catch(ex)
        {
            console.warn(`Failed to resolve property ${propertyRoute} during validation. Does it exist in your model?`);
            throw(ex);
        }

        const routeEachRule = (ruleLinkOrSet: any) => {
            if(TypeHelper.isForEach(ruleLinkOrSet))
            {
                const isCurrentlyAnArray = TypeHelper.isArrayType(currentValue);

                if(isCurrentlyAnArray) {
                    currentValue.forEach((element: any, index: number) => {
                        const childPropertyName = `${propertyRoute}[${index}]`;
                        this.validatePropertyWithRules(childPropertyName, [ruleLinkOrSet.internalRule]);
                    });
                }
                else
                {
                    if(TypeHelper.isRuleset(ruleLinkOrSet.internalRule))
                    { ruleSets.push(ruleLinkOrSet.internalRule); }
                    else
                    { ruleLinks.push(ruleLinkOrSet.internalRule); }
                }
            }
            else if(TypeHelper.isRuleset(ruleLinkOrSet))
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
        if(Object.keys(this.ruleset.compositeRules).length > 0)
        { await this.validateCompositeRules(); }

        if(this.ruleset.compositeRules[propertyRoute] !== undefined)
        { return; }

        const rulesForProperty = this.ruleResolver.resolvePropertyRules(propertyRoute, this.ruleset);
        if(!rulesForProperty) { return; }

        return this.validatePropertyWithRules(propertyRoute, rulesForProperty);
    }

    protected validateCompositeRule = async(compositeRule: ICompositeValidationRule) => {
        const hadErrors = this.hasErrors();
        const isValid = await compositeRule.validate(this.modelResolver);

        if(isValid)
        {
            if(this.propertyErrors[compositeRule.virtualPropertyName])
            {
                delete this.propertyErrors[compositeRule.virtualPropertyName];
                const eventArgs = new PropertyStateChangedEvent(compositeRule.virtualPropertyName, true);
                this.propertyStateChangedEvent.publish(eventArgs);
            }

            const stillHasErrors = hadErrors && this.hasErrors();
            if (!stillHasErrors)
            { this.modelStateChangedEvent.publish(new ModelStateChangedEvent(true)); }
            return;
        }

        const previousError = this.propertyErrors[compositeRule.virtualPropertyName];
        const currentError = await this.localeHandler.getMessage(compositeRule.virtualPropertyName, compositeRule, this.modelResolver, null);
        this.propertyErrors[compositeRule.virtualPropertyName] = currentError;

        if(currentError != previousError)
        {
            const eventArgs = new PropertyStateChangedEvent(compositeRule.virtualPropertyName, false, currentError);
            this.propertyStateChangedEvent.publish(eventArgs);

            if (!hadErrors)
            { this.modelStateChangedEvent.publish(new ModelStateChangedEvent(false)); }
        }

        return this.propertyErrors[compositeRule.virtualPropertyName];
    }

    protected validateCompositeRules = async () => {
        for(const propertyName in this.ruleset.compositeRules)
        {
            const compositeRule = this.ruleset.compositeRules[propertyName];
            await this.validateCompositeRule(compositeRule);
        }
    }

    protected startValidateModel = async () => {
        for(const parameterName in this.ruleset.rules) {
            await this.startValidateProperty(parameterName);
        }
    }

    protected hasErrors(): boolean {
        return (Object.keys(this.propertyErrors).length > 0);
    }

    public changeValidationTarget = (model: any) => {
        this.modelResolver = this.modelResolverFactory.createModelResolver(model);
    }

    public validateProperty = async(propertyRoute: string): Promise<boolean> =>
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
        { await this.startValidateProperty(propertyRoute); }

        await this.promiseCounter.waitForCompletion();
        return this.propertyErrors[propertyRoute];
    }

    public getPropertyDisplayName = (propertyRoute: string): string => {
        return this.displayNameCache.getDisplayNameFor(propertyRoute);
    }

    public isPropertyInGroup = (propertyRoute: string): boolean => {
        const applicableRules = this.ruleResolver.resolvePropertyRules(propertyRoute, this.ruleset);
        return (applicableRules != null);
    }

    public release = () => {};
}