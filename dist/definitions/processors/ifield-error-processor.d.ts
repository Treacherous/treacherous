import { RuleLink } from "../rulesets/rule-link";
import { IModelResolver } from "../resolvers/imodel-resolver";
export interface IFieldErrorProcessor {
    processRuleLink(modelResolver: IModelResolver, propertyName: string, ruleLink: RuleLink): Promise<any>;
    checkFieldForErrors(modelResolver: IModelResolver, propertyName: string, rules: any): Promise<string>;
}
