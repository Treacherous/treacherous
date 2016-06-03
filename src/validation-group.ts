import * as Promise from "bluebird";
import {PropertyResolver} from "property-resolver";
import {PropertyChangedEvent} from "./events/property-changed-event";
import {EventHandler} from "event-js";
import {Ruleset} from "./rulesets/ruleset";
import {PropertyStateChangedEvent} from "./events/property-state-changed-event";
import {ModelStateChangedEvent} from "./events/model-state-changed-event";
import {RuleLink} from "./rulesets/rule-link";
import {RuleResolver} from "./rulesets/rule-resolver";
import {IModelWatcher} from "./watcher/imodel-watcher";
import {TypeHelper} from "./helpers/type-helper";
import {IValidationGroup} from "./ivalidation-group";
import {IFieldErrorProcessor} from "./processors/ifield-error-processor";
import {IRuleResolver} from "./rulesets/irule-resolver";

// TODO: This class is WAY to long, needs refactoring
export class ValidationGroup implements IValidationGroup
{
    private propertyErrors = {};
    private activePromiseChain: Promise<any>;

    public propertyStateChangedEvent: EventHandler;
    public modelStateChangedEvent: EventHandler;

    constructor(private fieldErrorProcessor: IFieldErrorProcessor,
                private modelWatcher: IModelWatcher,
                private propertyResolver = new PropertyResolver(),
                private ruleResolver: IRuleResolver = new RuleResolver(),
                private ruleset: Ruleset, private model: any,
                public refreshRate = 500)
    {
        this.propertyStateChangedEvent = new EventHandler(this);
        this.modelStateChangedEvent = new EventHandler(this);

        this.modelWatcher.setupWatcher(model, ruleset, refreshRate);
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
                    var eventArgs = new PropertyStateChangedEvent(propertyName, true);
                    this.propertyStateChangedEvent.publish(eventArgs);
                    if (hadErrors) {
                        this.modelStateChangedEvent.publish(new ModelStateChangedEvent(true));
                    }
                }
                return;
            }

            var previousError = this.propertyErrors[propertyName];
            this.propertyErrors[propertyName] = possibleError;

            if(possibleError != previousError){
                var eventArgs = new PropertyStateChangedEvent(propertyName, false, possibleError);
                this.propertyStateChangedEvent.publish(eventArgs);

                if (!hadErrors) {
                    this.modelStateChangedEvent.publish(new ModelStateChangedEvent(false));
                }
            }
        };

        if(this.activePromiseChain)
        {
            this.activePromiseChain = Promise.resolve(this.activePromiseChain)
                .then(() => {
                    var fieldValue = this.propertyResolver.resolveProperty(this.model, propertyName);
                    return this.fieldErrorProcessor
                        .checkFieldForErrors(fieldValue, propertyRules)
                        .then(handlePossibleError);
                })
        }
        else
        {
            var fieldValue = this.propertyResolver.resolveProperty(this.model, propertyName);
            this.activePromiseChain = this.fieldErrorProcessor
                .checkFieldForErrors(fieldValue, propertyRules)
                .then(handlePossibleError);
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

    private validatePropertyWithRules = (propertyName: string, rules: any): any => {
        var ruleLinks = [];
        var ruleSets = [];
        var validationPromises = [];

        var currentValue;
        try
        {
            currentValue = this.propertyResolver.resolveProperty(this.model, propertyName);
        }
        catch(ex)
        {
            return Promise.resolve();
        }

        var routeEachRule = (ruleLinkOrSet) => {
            if(this.isForEach(ruleLinkOrSet))
            {
                var isCurrentlyAnArray = TypeHelper.isArrayType(currentValue);

                if(isCurrentlyAnArray) {
                    currentValue.forEach((element, index) => {
                        var childPropertyName = `${propertyName}[${index}]`;
                        var promise = this.validatePropertyWithRules(childPropertyName, [ruleLinkOrSet.internalRule]);
                        validationPromises.push(promise);
                    });
                }
                else
                {
                    if(this.isRuleset(ruleLinkOrSet.internalRule))
                    { ruleSets.push(ruleLinkOrSet.internalRule); }
                    else
                    { ruleLinks.push(ruleLinkOrSet.internalRule); }
                }
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

    public changeValidationTarget = (model: any) => {
        this.model = model;
        this.modelWatcher.changeWatcherTarget(this.model);
    }

    public isValid = (): Promise<boolean> =>
    {
        return this.waitForValidatorsToFinish()
            .then(() => { return !this.hasErrors() });
    }

    public getModelErrors = (): Promise<any> =>
    {
        return this.waitForValidatorsToFinish()
            .then(() => { return this.propertyErrors});
    }
    
    public getPropertyError = (propertyRoute: string): Promise<any> => {
        return this.waitForValidatorsToFinish()
            .then(() => { return this.propertyErrors[propertyRoute]; })
    }

    public release = () => {
        this.modelWatcher.stopWatching();
    }

    private waitForValidatorsToFinish = () : Promise<void> => {
        return new Promise<void>((resolve: Function, reject: Function) => {
            var interval = setInterval(() => {
                if (this.activePromiseChain.isFulfilled()) {
                    clearInterval(interval);
                    resolve();
                }
            }, 50);
    });
};
}