import { ILocaleHandler } from '../localization/ilocale-handler';
import { RuleRegistry } from "../rules/rule-registry";
import { RuleLink } from "../rulesets/rule-link";
import { IFieldErrorProcessor } from "./ifield-error-processor";
import { IModelResolver } from "../resolvers/imodel-resolver";
export declare class FieldErrorProcessor implements IFieldErrorProcessor {
    ruleRegistry: RuleRegistry;
    localeHandler: ILocaleHandler;
    constructor(ruleRegistry: RuleRegistry, localeHandler: ILocaleHandler);
    processRuleLink: (modelResolver: IModelResolver, propertyName: any, ruleLink: RuleLink) => Promise<any>;
    checkFieldForErrors: (modelResolver: IModelResolver, propertyName: any, rules: any) => Promise<string>;
}
