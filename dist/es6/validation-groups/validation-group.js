import { RuleResolver } from "../rulesets/rule-resolver";
import { TypeHelper } from "../helpers/type-helper";
import { PromiseCounter } from "../promises/promise-counter";
import { PropertyStateChangedEvent } from "../events/property-state-changed-event";
import { ModelStateChangedEvent } from "../events/model-state-changed-event";
import { EventHandler } from "event-js";
// TODO: This class could be simplified
export class ValidationGroup {
    constructor(fieldErrorProcessor, ruleResolver = new RuleResolver(), modelResolverFactory, model, ruleset) {
        this.fieldErrorProcessor = fieldErrorProcessor;
        this.ruleResolver = ruleResolver;
        this.modelResolverFactory = modelResolverFactory;
        this.ruleset = ruleset;
        this.propertyErrors = {};
        this.validatePropertyWithRuleLinks = async (propertyName, propertyRules) => {
            let activePromise = this.fieldErrorProcessor.checkFieldForErrors(this.modelResolver, propertyName, propertyRules);
            let possibleErrors = await this.promiseCounter.countPromise(activePromise);
            let hadErrors = this.hasErrors();
            if (!possibleErrors) {
                if (this.propertyErrors[propertyName]) {
                    delete this.propertyErrors[propertyName];
                    let eventArgs = new PropertyStateChangedEvent(propertyName, true);
                    this.propertyStateChangedEvent.publish(eventArgs);
                    let stillHasErrors = hadErrors && this.hasErrors();
                    if (!stillHasErrors) {
                        this.modelStateChangedEvent.publish(new ModelStateChangedEvent(true));
                    }
                }
                return this.promiseCounter.waitForCompletion();
            }
            let previousError = this.propertyErrors[propertyName];
            this.propertyErrors[propertyName] = possibleErrors;
            if (possibleErrors != previousError) {
                let eventArgs = new PropertyStateChangedEvent(propertyName, false, possibleErrors);
                this.propertyStateChangedEvent.publish(eventArgs);
                if (!hadErrors) {
                    this.modelStateChangedEvent.publish(new ModelStateChangedEvent(false));
                }
            }
            return this.promiseCounter.waitForCompletion();
        };
        this.validatePropertyWithRuleSet = (propertyRoute, ruleset) => {
            let transformedPropertyName;
            for (let childPropertyName in ruleset.rules) {
                transformedPropertyName = `${propertyRoute}.${childPropertyName}`;
                this.validatePropertyWithRules(transformedPropertyName, ruleset.getRulesForProperty(childPropertyName));
            }
        };
        this.validatePropertyWithRules = (propertyRoute, rules) => {
            let ruleLinks = [];
            let ruleSets = [];
            let currentValue;
            try {
                currentValue = this.modelResolver.resolve(propertyRoute);
            }
            catch (ex) {
                console.warn(`Failed to resolve property ${propertyRoute} during validation. Does it exist in your model?`);
                throw (ex);
            }
            let routeEachRule = (ruleLinkOrSet) => {
                if (ValidationGroup.isForEach(ruleLinkOrSet)) {
                    let isCurrentlyAnArray = TypeHelper.isArrayType(currentValue);
                    if (isCurrentlyAnArray) {
                        currentValue.forEach((element, index) => {
                            let childPropertyName = `${propertyRoute}[${index}]`;
                            this.validatePropertyWithRules(childPropertyName, [ruleLinkOrSet.internalRule]);
                        });
                    }
                    else {
                        if (ValidationGroup.isRuleset(ruleLinkOrSet.internalRule)) {
                            ruleSets.push(ruleLinkOrSet.internalRule);
                        }
                        else {
                            ruleLinks.push(ruleLinkOrSet.internalRule);
                        }
                    }
                }
                else if (ValidationGroup.isRuleset(ruleLinkOrSet)) {
                    ruleSets.push(ruleLinkOrSet);
                }
                else {
                    ruleLinks.push(ruleLinkOrSet);
                }
            };
            rules.forEach(routeEachRule);
            this.validatePropertyWithRuleLinks(propertyRoute, ruleLinks);
            ruleSets.forEach((ruleSet) => {
                this.validatePropertyWithRuleSet(propertyRoute, ruleSet);
            });
        };
        this.startValidateProperty = async (propertyRoute) => {
            if (this.ruleset.compositeRules !== {}) {
                await this.validateCompositeRules();
            }
            if (this.ruleset.compositeRules[propertyRoute] !== undefined) {
                return;
            }
            let rulesForProperty = this.ruleResolver.resolvePropertyRules(propertyRoute, this.ruleset);
            if (!rulesForProperty) {
                return;
            }
            return this.validatePropertyWithRules(propertyRoute, rulesForProperty);
        };
        this.validateCompositeRule = async (compositeRule) => {
            let hadErrors = this.hasErrors();
            let isValid = await compositeRule.validate(this.modelResolver);
            if (isValid) {
                if (this.propertyErrors[compositeRule.virtualPropertyName]) {
                    delete this.propertyErrors[compositeRule.virtualPropertyName];
                    let eventArgs = new PropertyStateChangedEvent(compositeRule.virtualPropertyName, true);
                    this.propertyStateChangedEvent.publish(eventArgs);
                }
                let stillHasErrors = hadErrors && this.hasErrors();
                if (!stillHasErrors) {
                    this.modelStateChangedEvent.publish(new ModelStateChangedEvent(true));
                }
                return;
            }
            let previousError = this.propertyErrors[compositeRule.virtualPropertyName];
            let currentError = compositeRule.getMessage(this.modelResolver);
            this.propertyErrors[compositeRule.virtualPropertyName] = currentError;
            if (currentError != previousError) {
                let eventArgs = new PropertyStateChangedEvent(compositeRule.virtualPropertyName, false, currentError);
                this.propertyStateChangedEvent.publish(eventArgs);
                if (!hadErrors) {
                    this.modelStateChangedEvent.publish(new ModelStateChangedEvent(false));
                }
            }
            return this.propertyErrors[compositeRule.virtualPropertyName];
        };
        this.validateCompositeRules = async () => {
            for (let propertyName in this.ruleset.compositeRules) {
                let compositeRule = this.ruleset.compositeRules[propertyName];
                this.validateCompositeRule(compositeRule);
            }
        };
        this.startValidateModel = () => {
            for (let parameterName in this.ruleset.rules) {
                this.startValidateProperty(parameterName);
            }
        };
        this.changeValidationTarget = (model) => {
            this.modelResolver = this.modelResolverFactory.createModelResolver(model);
        };
        this.validateProperty = async (propertyRoute) => {
            await this.startValidateProperty(propertyRoute);
            await this.promiseCounter.waitForCompletion();
            return !this.propertyErrors[propertyRoute];
        };
        this.validate = async () => {
            await this.startValidateModel();
            await this.promiseCounter.waitForCompletion();
            return !this.hasErrors();
        };
        this.getModelErrors = async (revalidate = false) => {
            if (revalidate) {
                await this.startValidateModel();
            }
            await this.promiseCounter.waitForCompletion();
            return this.propertyErrors;
        };
        this.getPropertyError = async (propertyRoute, revalidate = false) => {
            if (revalidate) {
                this.startValidateProperty(propertyRoute);
            }
            await this.promiseCounter.waitForCompletion();
            return this.propertyErrors[propertyRoute];
        };
        this.getPropertyDisplayName = (propertyRoute) => {
            return this.ruleset.getPropertyDisplayName(propertyRoute);
        };
        this.isPropertyInGroup = (propertyRoute) => {
            let applicableRules = this.ruleResolver.resolvePropertyRules(propertyRoute, this.ruleset);
            return (applicableRules != null);
        };
        this.release = () => { };
        this.propertyStateChangedEvent = new EventHandler(this);
        this.modelStateChangedEvent = new EventHandler(this);
        this.promiseCounter = new PromiseCounter();
        this.modelResolver = this.modelResolverFactory.createModelResolver(model);
    }
    static isRuleset(possibleRuleset) {
        return (typeof (possibleRuleset.addRule) == "function");
    }
    static isForEach(possibleForEach) {
        return possibleForEach.isForEach;
    }
    hasErrors() {
        return (Object.keys(this.propertyErrors).length > 0);
    }
}
