import { PropertyResolver } from "property-resolver";
import { EventHandler } from "event-js";
import { Ruleset } from "./rulesets/ruleset";
import { IModelWatcher } from "./watcher/imodel-watcher";
import { IValidationGroup } from "./ivalidation-group";
import { IFieldErrorProcessor } from "./processors/ifield-error-processor";
import { IRuleResolver } from "./rulesets/irule-resolver";
export declare class ValidationGroup implements IValidationGroup {
    private fieldErrorProcessor;
    private modelWatcher;
    private propertyResolver;
    private ruleResolver;
    private ruleset;
    private model;
    refreshRate: number;
    private propertyErrors;
    private activePromiseChain;
    private activeValidationCount;
    propertyStateChangedEvent: EventHandler;
    modelStateChangedEvent: EventHandler;
    constructor(fieldErrorProcessor: IFieldErrorProcessor, modelWatcher: IModelWatcher, propertyResolver: PropertyResolver, ruleResolver: IRuleResolver, ruleset: Ruleset, model: any, refreshRate?: number);
    private countedPromise;
    private isRuleset(possibleRuleset);
    private isForEach(possibleForEach);
    private onModelChanged;
    private validatePropertyWithRuleLinks;
    private validatePropertyWithRuleSet;
    private validatePropertyWithRules;
    private validateProperty;
    private validateModel;
    private hasErrors;
    changeValidationTarget: (model: any) => void;
    isValid: () => Promise<boolean>;
    getModelErrors: () => Promise<any>;
    getPropertyError: (propertyRoute: string) => Promise<any>;
    release: () => void;
    private waitForValidatorsToFinish;
}
