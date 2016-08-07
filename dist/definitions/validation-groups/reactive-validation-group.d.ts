import { EventHandler } from "event-js";
import { Ruleset } from "../rulesets/ruleset";
import { RuleLink } from "../rulesets/rule-link";
import { IModelWatcher } from "../watcher/imodel-watcher";
import { IFieldErrorProcessor } from "../processors/ifield-error-processor";
import { IRuleResolver } from "../rulesets/irule-resolver";
import { IValidationSettings } from "../settings/ivalidation-settings";
import { IReactiveValidationGroup } from "./ireactive-validation-group";
import { ValidationGroup } from "./validation-group";
export declare class ReactiveValidationGroup extends ValidationGroup implements IReactiveValidationGroup {
    private refreshRate;
    modelWatcher: IModelWatcher;
    propertyStateChangedEvent: EventHandler;
    modelStateChangedEvent: EventHandler;
    constructor(fieldErrorProcessor: IFieldErrorProcessor, ruleResolver: IRuleResolver, settings: IValidationSettings, model: any, ruleset: Ruleset, refreshRate?: number);
    private onModelChanged;
    protected validatePropertyWithRuleLinks: (propertyName: string, propertyRules: RuleLink[]) => any;
    release: () => void;
}
