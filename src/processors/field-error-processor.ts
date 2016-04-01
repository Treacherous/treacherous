import * as Promise from "bluebird";
import {RuleRegistry} from "../rules/rule-registry";
import {RuleLink} from "../rulesets/rule-link";
import {FieldHasError} from "./field-has-error";
import {IFieldErrorProcessor} from "./ifield-error-processor";

export class FieldErrorProcessor implements IFieldErrorProcessor
{
    constructor(public ruleRegistry: RuleRegistry){}

    public processRuleLink(fieldValue: any, ruleLink: RuleLink): Promise<any>{
        var validator = this.ruleRegistry.getRuleNamed(ruleLink.ruleName);

        var checkIfValid = (isValid) => {
            if(!isValid) {
                var error = validator.getMessage(fieldValue, ruleLink.ruleOptions);
                throw new FieldHasError(error);
            }
            return null;
        };

        return validator
            .validate(fieldValue, ruleLink.ruleOptions)
            .then(checkIfValid);
    }

    public checkFieldForErrors(fieldValue: any, rules: any): Promise<string>
    {
        var ruleCheck = (ruleLinkOrSet: any): Promise<any>  => {
            return this.processRuleLink(fieldValue, ruleLinkOrSet);
        };

        return Promise.resolve(rules)
            .each(ruleCheck)
            .then(function(){ return null; })
            .catch(FieldHasError, (validationError) => {
                return validationError.message;
            });
    }
}