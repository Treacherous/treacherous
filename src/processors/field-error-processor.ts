import {RuleRegistry} from "../rules/rule-registry";
import {RuleLink} from "../rulesets/rule-link";
import {FieldHasError} from "./field-has-error";
import {IFieldErrorProcessor} from "./ifield-error-processor";
import {ModelHelper} from "../model-helper";

export class FieldErrorProcessor implements IFieldErrorProcessor
{
    constructor(public ruleRegistry: RuleRegistry){}

    // Validates a single property against a model
    public processRuleLink(modelHelper:ModelHelper, propertyName:string, ruleLink: RuleLink): Promise<any>{

        var shouldRuleApply = ruleLink.appliesIf === true
            || ((typeof(ruleLink.appliesIf) === "function")
                ? (<((modelHelper:ModelHelper, propertyName:string, ruleOptions?: any) => boolean)>(ruleLink.appliesIf))(modelHelper, propertyName, ruleLink.ruleOptions)
                : false);

        if (!shouldRuleApply)
            { return Promise.resolve(); }

        var validator = this.ruleRegistry.getRuleNamed(ruleLink.ruleName);

        var options = (typeof ruleLink.ruleOptions == "function") ? ruleLink.ruleOptions() : ruleLink.ruleOptions;

        return validator
            .validate(modelHelper, propertyName, options)
            .then(isValid => {
                if(!isValid) {
                    var error;
                    if(ruleLink.messageOverride)
                    {
                        if(typeof(ruleLink.messageOverride) === "function")
                        { error = (<((model:any, value: any, ruleOptions?: any) => string)>(ruleLink.messageOverride))(modelHelper, propertyName, ruleLink.ruleOptions); }
                        else
                        { error = ruleLink.messageOverride; }
                    }
                    else
                    { error = validator.getMessage(modelHelper, propertyName, ruleLink.ruleOptions); }

                    throw new FieldHasError(error);
                }
                return Promise.resolve();
            });
    }

    // Loops through each rule on a property, adds it to a chain, then calls Promise.all
    // Probably not correct, as they won't fire sequentially? Promises need to be chained
    public checkFieldForErrors(modelHelper:ModelHelper, propertyName:string, rules: any): Promise<string>
    {
        var ruleCheck = (ruleLinkOrSet: any): Promise<any>  => {
            return this.processRuleLink(modelHelper, propertyName, ruleLinkOrSet);
        };

        var checkEachRule = (rules: any) => {
            var promises = [];
            rules.forEach((rule) => {
                promises.push(ruleCheck(rule));
            });
            return Promise.all(promises);
        }

        return Promise.resolve(rules)
            .then(checkEachRule)
            .then(function(){ return null; })
            .catch((validationError) => {
                return validationError.message;
            });
    }
}