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

// TODO: This class is WAY to long, needs refactoring
export class ValidationGroup implements IValidationGroup
{
    protected propertyErrors = {};
    protected promiseCounter: PromiseCounter;
    protected modelResolver: IModelResolver;

    constructor(protected fieldErrorProcessor: IFieldErrorProcessor,
                protected ruleResolver: IRuleResolver = new RuleResolver(),
                protected modelResolverFactory: IModelResolverFactory,
                model: any,
                protected ruleset: Ruleset)
    {
        this.promiseCounter = new PromiseCounter();
        this.modelResolver = this.modelResolverFactory.createModelResolver(model);
    }

    protected isRuleset(possibleRuleset: any): boolean {
        return (typeof(possibleRuleset.addRule) == "function");
    }

    protected isForEach(possibleForEach: any): boolean {
        return possibleForEach.isForEach;
    }

    protected validatePropertyWithRuleLinks = (propertyRoute: string, propertyRules: Array<RuleLink>): any => {
        return this.promiseCounter.countPromise(
            this.fieldErrorProcessor.checkFieldForErrors(this.modelResolver, propertyRoute, propertyRules)
            .then(possibleErrors => {

                if (!possibleErrors) {
                    if (this.propertyErrors[propertyRoute])
                    { delete this.propertyErrors[propertyRoute]; }
                    return;
                }

                this.propertyErrors[propertyRoute] = possibleErrors;
            }))
            .then(this.promiseCounter.waitForCompletion)
    };

    protected validatePropertyWithRuleSet = (propertyRoute: string, ruleset: Ruleset): void => {
        var transformedPropertyName;
        for(var childPropertyName in ruleset.rules){
            transformedPropertyName = `${propertyRoute}.${childPropertyName}`;
            this.validatePropertyWithRules(transformedPropertyName, ruleset.getRulesForProperty(childPropertyName));
        }
    }

    protected validatePropertyWithRules = (propertyRoute: string, rules: any): ValidationGroup => {
        var ruleLinks = [];
        var ruleSets = [];

        var currentValue;
        try
        {
            currentValue = this.modelResolver.resolve(propertyRoute);
        }
        catch(ex)
        {
            console.warn(`Failed to resolve property ${propertyRoute} during validation. Does it exist in your model?`);
            throw(ex);
        }

        var routeEachRule = (ruleLinkOrSet) => {
            if(this.isForEach(ruleLinkOrSet))
            {
                var isCurrentlyAnArray = TypeHelper.isArrayType(currentValue);

                if(isCurrentlyAnArray) {
                    currentValue.forEach((element, index) => {
                        var childPropertyName = `${propertyRoute}[${index}]`;
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

        this.validatePropertyWithRuleLinks(propertyRoute, ruleLinks);

        ruleSets.forEach((ruleSet) => {
            this.validatePropertyWithRuleSet(propertyRoute, ruleSet);
        });
        return this;
    }

    protected startValidateProperty = (propertyRoute: string) => {
        var rulesForProperty = this.ruleResolver.resolvePropertyRules(propertyRoute, this.ruleset);
        if(!rulesForProperty) { return this; }
        return this.validatePropertyWithRules(propertyRoute, rulesForProperty);
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
        this.modelResolver = this.modelResolverFactory.createModelResolver(model);
    }

    public validateProperty = (propertyRoute): Promise<boolean> =>
    {
        return this.startValidateProperty(propertyRoute)
            .promiseCounter.waitForCompletion()
            .then(() => !this.propertyErrors[propertyRoute]);
    }

    public validate = (): Promise<boolean> =>
    {
        return this.startValidateModel()
            .promiseCounter.waitForCompletion()
            .then(() => !this.hasErrors());
    }

    public getModelErrors = (revalidate = false): Promise<any> =>
    {
        var promise = revalidate ?
            this.startValidateModel().promiseCounter.waitForCompletion() :
            this.promiseCounter.waitForCompletion();

        return promise.then(() => { return this.propertyErrors; });
    }

    public getPropertyError = (propertyRoute: string, revalidate = false): Promise<any> =>
    {
        var promise = revalidate ?
            this.startValidateProperty(propertyRoute).promiseCounter.waitForCompletion() :
            this.promiseCounter.waitForCompletion();

        return promise.then(() => this.propertyErrors[propertyRoute])
    }

    public release = () => {}
}