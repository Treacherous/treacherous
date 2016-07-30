/*
 validate() fires validateModel() then waits to ensure every rule has been resolved and returns Promise of true/false
 validateProperty(prop) calls the rules for a single Property, waits to ensure any pending rules have been resolved, and returns Promise of true/false

 getModelErrors() waits to ensure any pending rules have been resolved and returns Promise of all errors
 getPropertyError() waits to ensure any pending rules have been resolved and returns single error list for property

 startValidateModel() starts a set of Promises to validate everything in the RuleSet. Returns validationGroup without waiting
 startValidateProperty(prop) starts a set of Promises to validate a single Property. Returns validationGroup without waiting

 injectError(prop, error) manually applies an error to a property. Used for server-side errors reflected on-screen
 clearErrors(prop) manually clear errors associated with a property. Used clear server-side errors reflected on-screen or support error hiding prior to revalidation on the client (e.g. if fields are validated on blur, and errors hidden on changed)
 */

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
import {ModelHelper} from "./model-helper";
import {IValidationSettings} from "./ivalidation-settings";

// TODO: This class is WAY to long, needs refactoring
export class ValidationGroup implements IValidationGroup
{
    public propertyErrors = {};
    private validationCounter: number;
    private activePromises = [];
    public modelWatcher: IModelWatcher;
    private modelHelper:ModelHelper;

    public propertyStateChangedEvent: EventHandler;
    public modelStateChangedEvent: EventHandler;

    constructor(private fieldErrorProcessor: IFieldErrorProcessor,
                private ruleResolver: IRuleResolver = new RuleResolver(),
                private ruleset: Ruleset,
                model: any,
                private settings: IValidationSettings,
                public refreshRate = 500)
    {
        this.validationCounter = 0;
        this.propertyStateChangedEvent = new EventHandler(this);
        this.modelStateChangedEvent = new EventHandler(this);
        this.modelHelper = new ModelHelper(this.settings.createPropertyResolver(), model || {});

        if (this.settings.createModelWatcher) {
            this.modelWatcher = this.settings.createModelWatcher();
            this.modelWatcher.setupWatcher(model, ruleset, refreshRate);
            this.modelWatcher.onPropertyChanged.subscribe(this.onModelChanged);
        }
    }

    private OnCompletion = () => {
        return new Promise(r=> this.validationCounter ? this.activePromises.push(() => r('All Resolved') ) : r('Nothing queued') );
    }

    private CountedPromise = (p:Promise) => {
        if(!p) { return Promise.resolve(undefined); }
        if(!p.then) { throw new Error("Non-Promise pass in: " + p) }
        this.incCounter();
        return p.then(r=> { this.decCounter(); return r; }, c=> { this.decCounter(); throw c; } );
    }

    private decCounter = () => { this.validationCounter--;
        if (!this.validationCounter) {
            while (this.activePromises.length) this.activePromises.shift()();
        }
    }
    private incCounter = () => { this.validationCounter++; }

    public getValidationStatus() {
        return !this.validationCounter ? (!this.hasErrors() ? 'valid' : 'invalid') : 'calculating';
    }

    private isRuleset(possibleRuleset: any): boolean {
        return (typeof(possibleRuleset.addRule) == "function");
    }

    private isForEach(possibleForEach: any): boolean {
        return possibleForEach.isForEach;
    }

    private onModelChanged = (eventArgs: PropertyChangedEvent) => {
        this.startValidateProperty(eventArgs.propertyPath);
    };

    // End of the property deep-dive for launching Promises against properties
    private validatePropertyWithRuleLinks = (propertyName: string, propertyRules: Array<RuleLink>): any => {
        return this.CountedPromise(this.fieldErrorProcessor.checkFieldForErrors(this.modelHelper, propertyName, propertyRules))
            .then(isvalid => {
                var hadErrors = this.hasErrors();

                if (!isvalid) {
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
                this.propertyErrors[propertyName] = isvalid;

                if(isvalid != previousError){
                    var eventArgs = new PropertyStateChangedEvent(propertyName, false, isvalid);
                    this.propertyStateChangedEvent.publish(eventArgs);

                    if (!hadErrors) {
                        this.modelStateChangedEvent.publish(new ModelStateChangedEvent(false));
                    }
                }

            })
            .then(this.OnCompletion)
    };

    // Calls validatePropertyWithRules
    private validatePropertyWithRuleSet = (propertyName: string, ruleset: Ruleset) => {
        var transformedPropertyName;
        for(var childPropertyName in ruleset.rules){
            transformedPropertyName = `${propertyName}.${childPropertyName}`;
            this.validatePropertyWithRules(transformedPropertyName, ruleset.getRulesForProperty(childPropertyName));
        }
    }


    // Starts CountedPromises for every rule in the set passed in. Does not wait for completion.
    private validatePropertyWithRules = (propertyName: string, rules: any): ValidationGroup => {
        var ruleLinks = [];
        var ruleSets = [];

        var currentValue;
        try
        {
            currentValue = this.modelHelper.resolve(propertyName);
        }
        catch(ex)
        {
            console.warn(`Failed to resolve property ${propertyName} during validation. Does it exist in your model?`);
            throw(ex);
        }

        var routeEachRule = (ruleLinkOrSet) => {
            if(this.isForEach(ruleLinkOrSet))
            {
                var isCurrentlyAnArray = TypeHelper.isArrayType(currentValue);

                if(isCurrentlyAnArray) {
                    currentValue.forEach((element, index) => {
                        var childPropertyName = `${propertyName}[${index}]`;
                        this.validatePropertyWithRules(childPropertyName, [ruleLinkOrSet.internalRule]);
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

        this.validatePropertyWithRuleLinks(propertyName, ruleLinks);

        ruleSets.forEach((ruleSet) => {
            this.CountedPromise(this.validatePropertyWithRuleSet(propertyName, ruleSet));
        });
        return this;
    }

    private startValidateProperty = (propertyName: string) => {
        var rulesForProperty = this.ruleResolver.resolvePropertyRules(this.modelHelper.decomposePropertyRoute(propertyName), this.ruleset);
        if(!rulesForProperty) { return this; }
        return this.validatePropertyWithRules(propertyName, rulesForProperty);
    };

    public startValidateModel = () => {
        for(var parameterName in this.ruleset.rules) {
            this.startValidateProperty(parameterName);
        }
        return this;
    };

    public hasErrors():boolean {
        return (Object.keys(this.propertyErrors).length > 0);
    }

    public changeValidationTarget = (model: any) => {
        this.modelHelper = new ModelHelper(this.settings.createPropertyResolver(), model || {});
        if (this.modelWatcher)
            this.modelWatcher.changeWatcherTarget(this.modelHelper.model);
    }

    public validateProperty = (propertyname): Promise<boolean> =>
    {
        return this.startValidateProperty(propertyname)
            .OnCompletion()
            .then(() => { return !this.getPropertyError(propertyname) });
    }

    public injectError = (propertyname:string, error:string):IValidationGroup =>
    {
        this.propertyErrors[propertyname].push(error);
        return this;
    }

    public clearErrors = (propertyname:string):IValidationGroup =>
    {
        delete this.propertyErrors[propertyname];
        return this;
    }

    public validate = (): Promise<boolean> =>
    {
        return this.startValidateModel()
            .OnCompletion()
            .then(() => { return !this.hasErrors() });
    }

    public getModelErrors = (): Promise<any> =>
    {
        return this.startValidateModel()
            .OnCompletion()
            .then(() => {
                return this.propertyErrors});
    }
    
    public getPropertyError = (propertyRoute: string): Promise<any> => {
        return this
            .OnCompletion()
            .then(() => this.propertyErrors[propertyRoute])
    }

    public release = () => {
        if (this.modelWatcher)
            this.modelWatcher.stopWatching();
    }
}
