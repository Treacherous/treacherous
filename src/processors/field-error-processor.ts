import {ILocaleHandler} from '../localization/ilocale-handler';
import {RuleRegistry} from "../rules/rule-registry";
import {RuleLink} from "../rulesets/rule-link";
import {FieldHasError} from "./field-has-error";
import {IFieldErrorProcessor} from "./ifield-error-processor";
import {IModelResolver} from "../resolvers/imodel-resolver";

export class FieldErrorProcessor implements IFieldErrorProcessor
{
    constructor(public ruleRegistry: RuleRegistry, public localeHandler: ILocaleHandler){}

    public processRuleLink = async(modelResolver: IModelResolver, propertyName: any, ruleLink: RuleLink): Promise<any> => {

        const shouldRuleApply = ruleLink.appliesIf === true
            || ((typeof(ruleLink.appliesIf) === "function")
                ? (<((model:any, value: any, ruleOptions?: any) => boolean)>(ruleLink.appliesIf))(modelResolver, propertyName, ruleLink.ruleOptions)
                : false);

        if (!shouldRuleApply) { return; }

        const validator = this.ruleRegistry.getRuleNamed(ruleLink.ruleName);

        if(!validator)
        { throw new FieldHasError(`No validator can be found for rule [${ruleLink.ruleName}]`); }

        const options = (typeof ruleLink.ruleOptions == "function") ? ruleLink.ruleOptions() : ruleLink.ruleOptions;
        const isValid = await validator.validate(modelResolver, propertyName, options);

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

    public checkFieldForErrors = async (modelResolver: IModelResolver, propertyName: any, rules: any): Promise<string> =>
    {
        const ruleCheck = (ruleLinkOrSet: any): Promise<any>  => {
            return this.processRuleLink(modelResolver, propertyName, ruleLinkOrSet);
        };

        const checkEachRule = (rules: any) => {
            const promises: Array<any> = [];
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