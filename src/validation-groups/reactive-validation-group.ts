import {PropertyChangedEvent} from "../events/property-changed-event";
import {EventHandler} from "event-js";
import {Ruleset} from "../rulesets/ruleset";
import {RuleResolver} from "../rulesets/rule-resolver";
import {IModelWatcher} from "../watcher/imodel-watcher";
import {IFieldErrorProcessor} from "../processors/ifield-error-processor";
import {IRuleResolver} from "../rulesets/irule-resolver";
import {IReactiveValidationGroup} from "./ireactive-validation-group";
import {ValidationGroup} from "./validation-group";
import {IModelResolverFactory} from "../factories/imodel-resolver-factory";
import {IModelWatcherFactory} from "../factories/imodel-watcher-factory";

export class ReactiveValidationGroup extends ValidationGroup implements IReactiveValidationGroup
{
    public modelWatcher: IModelWatcher;

    constructor(fieldErrorProcessor: IFieldErrorProcessor,
                ruleResolver: IRuleResolver = new RuleResolver(),
                modelResolverFactory: IModelResolverFactory,
                private modelWatcherFactory: IModelWatcherFactory,
                model: any,
                ruleset: Ruleset,
                private refreshRate = 500)
    {
        super(fieldErrorProcessor, ruleResolver, modelResolverFactory, model, ruleset);

        this.propertyStateChangedEvent = new EventHandler(this);
        this.modelStateChangedEvent = new EventHandler(this);

        this.modelWatcher = this.modelWatcherFactory.createModelWatcher();
        this.modelWatcher.setupWatcher(model, ruleset, refreshRate);
        this.modelWatcher.onPropertyChanged.subscribe(this.onModelChanged);
    }

    private onModelChanged = (eventArgs: PropertyChangedEvent) => {
        this.startValidateProperty(eventArgs.propertyPath);
    };

    public release = () => {
        if (this.modelWatcher)
            this.modelWatcher.stopWatching();
    }
}
