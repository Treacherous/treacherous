import {Ruleset} from "../rulesets/ruleset";
import {RuleLink} from "../rulesets/rule-link";
import {RuleResolver} from "../rulesets/rule-resolver";
import {TypeHelper} from "../helpers/type-helper";
import {IValidationGroup} from "./ivalidation-group";
import {IFieldErrorProcessor} from "../processors/ifield-error-processor";
import {IRuleResolver} from "../rulesets/irule-resolver";
import {IValidationSettings} from "../settings/ivalidation-settings";
import {IModelResolver} from "../resolvers/imodel-resolver";
import {PromiseCounter} from "../promises/promise-counter";

// TODO: This class is WAY to long, needs refactoring
export class ValidationGroup implements IValidationGroup
{
    protected propertyErrors = {};
    protected promiseCounter: PromiseCounter;
    protected modelResolver: IModelResolver;

    constructor(protected fieldErrorProcessor: IFieldErrorProcessor,
                protected ruleResolver: IRuleResolver = new RuleResolver(),
                protected settings: IValidationSettings,
                model: any,
                protected ruleset: Ruleset)
    {
        this.promiseCounter = new PromiseCounter();
        this.modelResolver = this.settings.createModelResolver(model);
    }

    protected isRuleset(possibleRuleset: any): boolean {
        return (typeof(possibleRuleset.addRule) == "function");
    }

    protected isForEach(possibleForEach: any): boolean {
        return possibleForEach.isForEach;
    }

    protected validatePropertyWithRuleLinks = (propertyName: string, propertyRules: Array<RuleLink>): any => {
        return this.promiseCounter.countPromise(this.fieldErrorProcessor.checkFieldForErrors(this.modelResolver, propertyName, propertyRules))
            .then(possibleErrors => {

                if (!possibleErrors) {
                    if (this.propertyErrors[propertyName])
                    { delete this.propertyErrors[propertyName]; }
                    return;
                }

                this.propertyErrors[propertyName] = possibleErrors;
            })
            .then(this.promiseCounter.waitForCompletion)
    };

    protected validatePropertyWithRuleSet = (propertyName: string, ruleset: Ruleset) => {
        var transformedPropertyName;
        for(var childPropertyName in ruleset.rules){
            transformedPropertyName = `${propertyName}.${childPropertyName}`;
            this.validatePropertyWithRules(transformedPropertyName, ruleset.getRulesForProperty(childPropertyName));
        }
    }

    protected validatePropertyWithRules = (propertyName: string, rules: any): ValidationGroup => {
        var ruleLinks = [];
        var ruleSets = [];

        var currentValue;
        try
        {
            currentValue = this.modelResolver.resolve(propertyName);
        }
        catch(ex)
        {
            console.warn(`Failed to resolve property ${propertyName} during validation. Does it exist in your model?`);
            throw(ex);
        }

        var routeEachRule = (ruleLinkOrSet) => {
            if(this.isForEach(ruleLinkOrSet))
            {
                var isCurrentlyAnArray = TypeHelper.isArrayType(currentValue);

                if(isCurrentlyAnArray) {
                    currentValue.forEach((element, index) => {
                        var childPropertyName = `${propertyName}[${index}]`;
                        this.validatePropertyWithRules(childPropertyName, [ruleLinkOrSet.internalRule]);
                    });
                }
                else
                {
                    if(this.isRuleset(ruleLinkOrSet.internalRule))
                    { ruleSets.push(ruleLinkOrSet.internalRule); }
                    else
                    { ruleLinks.push(ruleLinkOrSet.internalRule); }
                }
            }
            else if(this.isRuleset(ruleLinkOrSet))
            { ruleSets.push(ruleLinkOrSet); }
            else
            { ruleLinks.push(ruleLinkOrSet); }
        };

        rules.forEach(routeEachRule);

        this.validatePropertyWithRuleLinks(propertyName, ruleLinks);

        ruleSets.forEach((ruleSet) => {
            this.promiseCounter.countPromise(this.validatePropertyWithRuleSet(propertyName, ruleSet));
        });
        return this;
    }

    protected startValidateProperty = (propertyName: string) => {
        var rulesForProperty = this.ruleResolver.resolvePropertyRules(propertyName, this.ruleset);
        if(!rulesForProperty) { return this; }
        return this.validatePropertyWithRules(propertyName, rulesForProperty);
    };

    protected startValidateModel = () => {
        for(var parameterName in this.ruleset.rules) {
            this.startValidateProperty(parameterName);
        }
        return this;
    };

    protected hasErrors(): boolean {
        return (Object.keys(this.propertyErrors).length > 0);
    }

    public changeValidationTarget = (model: any) => {
        this.modelResolver = this.settings.createModelResolver(model);
    }

    public validateProperty = (propertyname): Promise<boolean> =>
    {
        return this.startValidateProperty(propertyname)
            .promiseCounter.waitForCompletion()
            .then(() => { return !this.getPropertyError(propertyname) });
    }

    public validate = (): Promise<boolean> =>
    {
        return this.startValidateModel()
            .promiseCounter.waitForCompletion()
            .then(() => { return !this.hasErrors() });
    }

    public getModelErrors = (): Promise<any> =>
    {
        return this.startValidateModel()
            .promiseCounter.waitForCompletion()
            .then(() => {
                return this.propertyErrors});
    }

    public getPropertyError = (propertyRoute: string): Promise<any> => {
        return this
            .promiseCounter.waitForCompletion()
            .then(() => this.propertyErrors[propertyRoute])
    }

    public release = () => {}
}