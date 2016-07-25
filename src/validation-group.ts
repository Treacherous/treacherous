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
import {ModelResolver} from "./model-resolver";

// TODO: This class is WAY to long, needs refactoring
export class ValidationGroup implements IValidationGroup
{
    private propertyErrors = {};
    private activePromiseChain: Promise<any>;
    private activeValidationCount: number;

    public propertyStateChangedEvent: EventHandler;
    public modelStateChangedEvent: EventHandler;

    constructor(private fieldErrorProcessor: IFieldErrorProcessor,
                private modelWatcher: IModelWatcher,
                private propertyResolver = new PropertyResolver(),
                private ruleResolver: IRuleResolver = new RuleResolver(),
                private ruleset: Ruleset,
                private model: any,
                public refreshRate = 500)
    {
        this.model = this.model || {};
        this.activeValidationCount = 0;
        this.propertyStateChangedEvent = new EventHandler(this);
        this.modelStateChangedEvent = new EventHandler(this);

        this.modelWatcher.setupWatcher(model, ruleset, refreshRate);
        this.modelWatcher.onPropertyChanged.subscribe(this.onModelChanged);

        this.validateModel();
    }

    private countedPromise = (wrappedPromise:Promise<any>) => {
        if(!wrappedPromise) { return Promise.resolve(); }

        this.activeValidationCount++;
        return wrappedPromise.then(r=> { this.activeValidationCount--; return r; }, e => { this.activeValidationCount--; throw(e); } );
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

    private validatePropertyWithRuleLinks = (propertyName: string, propertyRules: Array<RuleLink>): any => {
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
                    var mr = new ModelResolver(this.propertyResolver, this.model);
                    var promise = this.fieldErrorProcessor
                        .checkFieldForErrors(this.model, propertyName, propertyRules)
                        .then(handlePossibleError);
                    return this.countedPromise(promise);
                });
        }
        else
        {
            var mr = new ModelResolver(this.propertyResolver, this.model);
            this.activePromiseChain = this.countedPromise(this.fieldErrorProcessor
                .checkFieldForErrors(this.model, propertyName, propertyRules)
                .then(handlePossibleError));
            return this.countedPromise(this.activePromiseChain);
        }
    };

    private validatePropertyWithRuleSet = (propertyName: string, ruleset: Ruleset) => {
        var promiseList = [];
        var transformedPropertyName;
        for(var childPropertyName in ruleset.rules){
            transformedPropertyName = `${propertyName}.${childPropertyName}`;
            var countedPromise = this.validatePropertyWithRules(transformedPropertyName, ruleset.getRulesForProperty(childPropertyName));
            promiseList.push(countedPromise);
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
            var mr = new ModelResolver(this.propertyResolver, this.model);
            currentValue = mr.get(propertyName);
        }
        catch(ex)
        {
            throw(ex);
            return Promise.resolve();
        }

        var routeEachRule = (ruleLinkOrSet) => {
            if(this.isForEach(ruleLinkOrSet))
            {
                var isCurrentlyAnArray = TypeHelper.isArrayType(currentValue);

                if(isCurrentlyAnArray) {
                    currentValue.forEach((element, index) => {
                        var childPropertyName = `${propertyName}[${index}]`;
                        console.log(childPropertyName);
                        var promise = this.validatePropertyWithRules(childPropertyName, [ruleLinkOrSet.internalRule]);
                        var countedPromise = this.countedPromise(promise);
                        validationPromises.push(countedPromise);
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

        var countedPromise = this.countedPromise(this.validatePropertyWithRuleLinks(propertyName, ruleLinks));
        validationPromises.push(countedPromise);

        ruleSets.forEach((ruleSet) => {
            var eachCountedPromise = this.countedPromise(this.validatePropertyWithRuleSet(propertyName, ruleSet));
            validationPromises.push(eachCountedPromise);
        });

        return Promise.all(validationPromises);
    }

    private validateProperty = (propertyName: string) => {
        var rulesForProperty = this.ruleResolver.resolvePropertyRules(propertyName, this.ruleset);
        if(!rulesForProperty) { return; }

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

    private waitForValidatorsToFinish = () : Promise<any> => {
        return new Promise((resolve, reject) => {
            var interval = setInterval(() => {
                if(this.activeValidationCount == 0)
                {
                    clearInterval(interval);
                    resolve();
                }
            }, this.modelWatcher.scanInterval);
        });
    };
}
