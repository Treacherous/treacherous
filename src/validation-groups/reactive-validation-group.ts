import {PropertyChangedEvent} from "../events/property-changed-event";
import {EventHandler} from "event-js";
import {Ruleset} from "../rulesets/ruleset";
import {PropertyStateChangedEvent} from "../events/property-state-changed-event";
import {ModelStateChangedEvent} from "../events/model-state-changed-event";
import {RuleLink} from "../rulesets/rule-link";
import {RuleResolver} from "../rulesets/rule-resolver";
import {IModelWatcher} from "../watcher/imodel-watcher";
import {IFieldErrorProcessor} from "../processors/ifield-error-processor";
import {IRuleResolver} from "../rulesets/irule-resolver";
import {IValidationSettings} from "../settings/ivalidation-settings";
import {IReactiveValidationGroup} from "./ireactive-validation-group";
import {ValidationGroup} from "./validation-group";

export class ReactiveValidationGroup extends ValidationGroup implements IReactiveValidationGroup
{
    public modelWatcher: IModelWatcher;
    public propertyStateChangedEvent: EventHandler;
    public modelStateChangedEvent: EventHandler;

    constructor(fieldErrorProcessor: IFieldErrorProcessor,
                ruleResolver: IRuleResolver = new RuleResolver(),
                settings: IValidationSettings,
                model: any,
                ruleset: Ruleset,
                private refreshRate = 500)
    {
        super(fieldErrorProcessor, ruleResolver, settings, ruleset, model);

        this.propertyStateChangedEvent = new EventHandler(this);
        this.modelStateChangedEvent = new EventHandler(this);

        this.modelWatcher = this.settings.createModelWatcher();
        this.modelWatcher.setupWatcher(model, ruleset, refreshRate);
        this.modelWatcher.onPropertyChanged.subscribe(this.onModelChanged);
    }

    private onModelChanged = (eventArgs: PropertyChangedEvent) => {
        this.startValidateProperty(eventArgs.propertyPath);
    };

    protected validatePropertyWithRuleLinks = (propertyName: string, propertyRules: Array<RuleLink>): any => {
        return this.promiseCounter.countPromise(this.fieldErrorProcessor.checkFieldForErrors(this.modelResolver, propertyName, propertyRules))
            .then(possibleErrors => {
                var hadErrors = this.hasErrors();

                if (!possibleErrors) {
                    if (this.propertyErrors[propertyName]) {
                        delete this.propertyErrors[propertyName];
                        var eventArgs = new PropertyStateChangedEvent(propertyName, true);
                        this.propertyStateChangedEvent.publish(eventArgs);

                        var stillHasErrors = hadErrors && this.hasErrors();
                        if (!stillHasErrors) {
                            this.modelStateChangedEvent.publish(new ModelStateChangedEvent(true));
                        }
                    }
                    return;
                }

                var previousError = this.propertyErrors[propertyName];
                this.propertyErrors[propertyName] = possibleErrors;

                if(possibleErrors != previousError){
                    var eventArgs = new PropertyStateChangedEvent(propertyName, false, possibleErrors);
                    this.propertyStateChangedEvent.publish(eventArgs);

                    if (!hadErrors) {
                        this.modelStateChangedEvent.publish(new ModelStateChangedEvent(false));
                    }
                }

            })
            .then(this.promiseCounter.waitForCompletion)
    };

    public release = () => {
        if (this.modelWatcher)
            this.modelWatcher.stopWatching();
    }
}
