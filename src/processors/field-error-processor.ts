import * as Promise from "bluebird";
import {Ruleset} from "../rulesets/ruleset";
import {RuleRegistry} from "../rules/rule-registry";
import {RuleLink} from "../rulesets/rule-link";
import {ValidationError} from "./validation-error";
import {FieldHasError} from "./field-has-error";

export class FieldErrorProcessor
{
    constructor(public ruleRegistry: RuleRegistry){}

    public processRuleLink(fieldValue: any, ruleLink: RuleLink){
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