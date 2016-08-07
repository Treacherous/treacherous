import { Ruleset } from "./rulesets/ruleset";
import { IValidationGroup } from "./ivalidation-group";
import { IFieldErrorProcessor } from "./processors/ifield-error-processor";
import { IRuleResolver } from "./rulesets/irule-resolver";
import { IValidationSettings } from "./settings/ivalidation-settings";
export declare class ValidationGroup implements IValidationGroup {
    private fieldErrorProcessor;
    private ruleResolver;
    private ruleset;
    private settings;
    propertyErrors: {};
    private promiseCounter;
    private modelResolver;
    constructor(fieldErrorProcessor: IFieldErrorProcessor, ruleResolver: IRuleResolver, ruleset: Ruleset, model: any, settings: IValidationSettings);
    private isRuleset(possibleRuleset);
    private isForEach(possibleForEach);
    private validatePropertyWithRuleLinks;
    private validatePropertyWithRuleSet;
    private validatePropertyWithRules;
    private startValidateProperty;
    private startValidateModel;
    private hasErrors();
    changeValidationTarget: (model: any) => void;
    validateProperty: (propertyname: any) => Promise<boolean>;
    validate: () => Promise<boolean>;
    getModelErrors: () => Promise<any>;
    getPropertyError: (propertyRoute: string) => Promise<any>;
    release: () => void;
}
