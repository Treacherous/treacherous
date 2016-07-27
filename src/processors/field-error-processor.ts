import {RuleRegistry} from "../rules/rule-registry";
import {RuleLink} from "../rulesets/rule-link";
import {FieldHasError} from "./field-has-error";
import {IFieldErrorProcessor} from "./ifield-error-processor";
import {ModelResolver} from "../model-resolver";

export class FieldErrorProcessor implements IFieldErrorProcessor
{
    constructor(public ruleRegistry: RuleRegistry){}

    // Validates a single property against a model
    public processRuleLink(mr: ModelResolver, propname: any, ruleLink: RuleLink): Promise<any>{

        var shouldRuleApply = ruleLink.appliesIf === true
            || ((typeof(ruleLink.appliesIf) === "function")
                ? (<((model:any, value: any, ruleOptions?: any) => boolean)>(ruleLink.appliesIf))(mr, propname, ruleLink.ruleOptions)
                : false);

        if (!shouldRuleApply)
            { return Promise.resolve(); }

        var validator = this.ruleRegistry.getRuleNamed(ruleLink.ruleName);

        var options = (typeof ruleLink.ruleOptions == "function") ? ruleLink.ruleOptions() : ruleLink.ruleOptions;

        return validator
            .validate(mr, propname, options)
            .then(isValid => {
                if(!isValid) {
                    var error;
                    if(ruleLink.messageOverride)
                    {
                        if(typeof(ruleLink.messageOverride) === "function")
                        { error = (<((model:any, value: any, ruleOptions?: any) => string)>(ruleLink.messageOverride))(mr, propname, ruleLink.ruleOptions); }
                        else
                        { error = ruleLink.messageOverride; }
                    }
                    else
                    { error = validator.getMessage(mr, propname, ruleLink.ruleOptions); }

                    throw new FieldHasError(error);
                }
                return Promise.resolve();
            });
    }

    // Loops through each rule on a property, adds it to a chain, then calls Promise.all
    // Probably not correct, as they won't fire sequentially? Promises need to be chained
    public checkFieldForErrors(mr: ModelResolver, propname: any, rules: any): Promise<string>
    {
        var ruleCheck = (ruleLinkOrSet: any): Promise<any>  => {
            return this.processRuleLink(mr, propname, ruleLinkOrSet);
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