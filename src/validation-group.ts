import * as Promise from "bluebird";
import {PropertyResolver} from "property-resolver";
import {ModelWatcher} from "./watcher/model-watcher";
import {PropertyChangedEvent} from "./watcher/property-changed-event";
import {EventHandler} from "eventjs";
import {FieldErrorProcessor} from "./processors/field-error-processor";
import {Ruleset} from "./rulesets/ruleset";
import {PropertyValidationChangedEvent} from "./events/property-validation-changed-event";
import {ValidationStateChangedEvent} from "./events/validation-state-changed-event";
import {RuleLink} from "./rulesets/rule-link";
import {RuleResolver} from "./rulesets/rule-resolver";

export class ValidationGroup
{
    public propertyErrors = {};
    public propertyChangedEvent: EventHandler;
    public validationStateChangedEvent: EventHandler;

    private modelWatcher: ModelWatcher;
    private propertyResolver = new PropertyResolver();
    private ruleResolver = new RuleResolver();
    private activePromiseChain: Promise<any>;
    private activeValidators = 0;

    constructor(private fieldErrorProcessor: FieldErrorProcessor,
                private ruleset: Ruleset, private model: any,
                public refreshRate = 500)
    {
        this.propertyChangedEvent = new EventHandler(this);
        this.validationStateChangedEvent = new EventHandler(this);

        this.modelWatcher = new ModelWatcher(model, ruleset, refreshRate);
        this.modelWatcher.onPropertyChanged.subscribe(this.onModelChanged);

        this.validateModel();
    }

    private isRuleset(possibleRuleset: any): boolean {
        return (typeof(possibleRuleset.addRule) == "function");
    }

    private isForEach(possibleForEach: any): boolean {
        return possibleForEach.isForEach;
    }

    private onModelChanged = (eventArgs: PropertyChangedEvent) => {
        this.validateProperty(eventArgs.propertyPath);
    };

    private validatePropertyWithRuleLinks = (propertyName: string, propertyRules: Array<RuleLink>) => {
        var handlePossibleError = (possibleError: string) => {
            var hadErrors = this.hasErrors();

            if (!possibleError) {
                if (this.propertyErrors[propertyName]) {
                    delete this.propertyErrors[propertyName];
                    var eventArgs = new PropertyValidationChangedEvent(propertyName, true);
                    this.propertyChangedEvent.publish(eventArgs);
                    if (hadErrors) {
                        this.validationStateChangedEvent.publish(new ValidationStateChangedEvent(true));
                    }
                }
                return;
            }

            var previousError = this.propertyErrors[propertyName];
            this.propertyErrors[propertyName] = possibleError;

            if(possibleError != previousError){
                var eventArgs = new PropertyValidationChangedEvent(propertyName, false, possibleError);
                this.propertyChangedEvent.publish(eventArgs);

                if (!hadErrors) {
                    this.validationStateChangedEvent.publish(new ValidationStateChangedEvent(false));
                }
            }
        };

        this.activeValidators++;
        if(this.activePromiseChain)
        {
            this.activePromiseChain = Promise.resolve(this.activePromiseChain)
                .then(() => {
                    var fieldValue = this.propertyResolver.resolveProperty(this.model, propertyName);
                    return this.fieldErrorProcessor
                        .checkFieldForErrors(fieldValue, propertyRules)
                        .then(handlePossibleError)
                })
                .tap(() => { this.activeValidators--;});
        }
        else
        {
            var fieldValue = this.propertyResolver.resolveProperty(this.model, propertyName);
            this.activePromiseChain = this.fieldErrorProcessor
                .checkFieldForErrors(fieldValue, propertyRules)
                .then(handlePossibleError)
                .tap(() => { this.activeValidators--;});
        }
    };

    private validatePropertyWithRuleSet = (propertyName: string, ruleset: Ruleset) => {
        var promiseList = [];
        var transformedPropertyName;
        for(var childPropertyName in ruleset.rules){
            transformedPropertyName = `${propertyName}.${childPropertyName}`;
            promiseList.push(this.validatePropertyWithRules(transformedPropertyName, ruleset.getRulesForProperty(childPropertyName)))
        }
        return Promise.all(promiseList);
    }

    private validatePropertyWithRules = (propertyName: string, rules: any) => {
        var ruleLinks = [];
        var ruleSets = [];
        var validationPromises = [];

        var routeEachRule = (ruleLinkOrSet) => {
            if(this.isForEach(ruleLinkOrSet))
            {
                this.model[propertyName].forEach((element, index) => {
                    var childPropertyName = `${propertyName}[${index}]`;
                    var promise = this.validatePropertyWithRules(childPropertyName, [ruleLinkOrSet.internalRule]);
                    validationPromises.push(promise);
                });
            }
            else if(this.isRuleset(ruleLinkOrSet))
            { ruleSets.push(ruleLinkOrSet); }
            else
            { ruleLinks.push(ruleLinkOrSet); }
        };

        rules.forEach(routeEachRule);

        validationPromises.push(this.validatePropertyWithRuleLinks(propertyName, ruleLinks));

        ruleSets.forEach((ruleSet) => {
            validationPromises.push(this.validatePropertyWithRuleSet(propertyName, ruleSet));
        });

        return Promise.all(validationPromises);
    }

    private validateProperty = (propertyName: string) => {
        var rulesForProperty = this.ruleResolver.resolvePropertyRules(propertyName, this.ruleset);
        if(!rulesForProperty) { return; }

        if(this.activePromiseChain && this.activePromiseChain.isFulfilled())
        { this.activePromiseChain = null; }

        return this.validatePropertyWithRules(propertyName, rulesForProperty);
    };

    private validateModel = () => {
        for(var parameterName in this.ruleset.rules) {
            this.validateProperty(parameterName);
        }
    };

    private hasErrors = (): boolean => {
        return Object.keys(this.propertyErrors).length > 0;
    }

    public isValid = (): Promise<boolean> =>
    {
        return this.waitForValidatorsToFinish()
            .then(() => { return !this.hasErrors() });
    }

    public getErrors = (): Promise<any> =>
    {
        return this.waitForValidatorsToFinish()
            .then(() => { return this.propertyErrors});
    }

    public release = () => {
        this.modelWatcher.stopWatching();
    }

    private waitForValidatorsToFinish = () : Promise<void> => {
        return new Promise<void>((resolve: Function, reject: Function) => {
            var interval = setInterval(() => {
                if (this.activeValidators == 0) {
                    clearInterval(interval);
                    resolve();
                }
            }, 50);
    });
};
}