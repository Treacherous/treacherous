import {ILocaleHandler} from '../localization/ilocale-handler';
import {RuleRegistry} from "../rules/rule-registry";
import {RuleLink} from "../rulesets/rule-link";
import {FieldHasError} from "./field-has-error";
import {IFieldErrorProcessor} from "./ifield-error-processor";
import {IModelResolver} from "../resolvers/imodel-resolver";

export class FieldErrorProcessor implements IFieldErrorProcessor
{
    constructor(public ruleRegistry: RuleRegistry, public localeHandler: ILocaleHandler){}

    // Validates a single property against a model
    public async processRuleLink(modelResolver: IModelResolver, propertyName: any, ruleLink: RuleLink): Promise<any>{

        let shouldRuleApply = ruleLink.appliesIf === true
            || ((typeof(ruleLink.appliesIf) === "function")
                ? (<((model:any, value: any, ruleOptions?: any) => boolean)>(ruleLink.appliesIf))(modelResolver, propertyName, ruleLink.ruleOptions)
                : false);

        if (!shouldRuleApply) { return; }

        let validator = this.ruleRegistry.getRuleNamed(ruleLink.ruleName);
        let options = (typeof ruleLink.ruleOptions == "function") ? ruleLink.ruleOptions() : ruleLink.ruleOptions;
        let isValid = await validator.validate(modelResolver, propertyName, options);

        if(isValid){ return; }

        let error;
        if(ruleLink.messageOverride)
        {
            if(typeof(ruleLink.messageOverride) === "function")
            { error = (<((model:any, value: any, ruleOptions?: any) => string)>(ruleLink.messageOverride))(modelResolver, propertyName, ruleLink.ruleOptions); }
            else
            { error = ruleLink.messageOverride; }
        }
        else
        { error = await this.localeHandler.getMessage(ruleLink.ruleName, ruleLink.ruleOptions, modelResolver, propertyName); }

        throw new FieldHasError(error);
    }

    // Loops through each rule on a property, adds it to a chain, then calls Promise.all
    // Probably not correct, as they won't fire sequentially? Promises need to be chained
    public async checkFieldForErrors(modelResolver: IModelResolver, propertyName: any, rules: any): Promise<string>
    {
        let ruleCheck = (ruleLinkOrSet: any): Promise<any>  => {
            return this.processRuleLink(modelResolver, propertyName, ruleLinkOrSet);
        };

        let checkEachRule = (rules: any) => {
            let promises: Array<any> = [];
            rules.forEach((rule: any) => {
                promises.push(ruleCheck(rule));
            });
            return Promise.all(promises);
        };

        return Promise.resolve(rules)
            .then(checkEachRule)
            .then(function(){ return null; })
            .catch((validationError) => {
                return validationError.message;
            });
    }
}