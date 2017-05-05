import { RuleResolver } from "../rulesets/rule-resolver";
import { ValidationGroup } from "./validation-group";
export class ReactiveValidationGroup extends ValidationGroup {
    constructor(fieldErrorProcessor, ruleResolver = new RuleResolver(), modelResolverFactory, modelWatcherFactory, model, ruleset, refreshRate = 500) {
        super(fieldErrorProcessor, ruleResolver, modelResolverFactory, model, ruleset);
        this.modelWatcherFactory = modelWatcherFactory;
        this.refreshRate = refreshRate;
        this.onModelChanged = (eventArgs) => {
            this.startValidateProperty(eventArgs.propertyPath);
        };
        this.release = () => {
            if (this.modelWatcher)
                this.modelWatcher.stopWatching();
        };
        this.modelWatcher = this.modelWatcherFactory.createModelWatcher();
        this.modelWatcher.setupWatcher(model, ruleset, refreshRate);
        this.modelWatcher.onPropertyChanged.subscribe(this.onModelChanged);
    }
}
