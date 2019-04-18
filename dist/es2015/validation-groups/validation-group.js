import * as tslib_1 from "tslib";
import { RuleResolver } from "../rulesets/rule-resolver";
import { TypeHelper } from "../helpers/type-helper";
import { PromiseCounter } from "../promises/promise-counter";
import { PropertyStateChangedEvent } from "../events/property-state-changed-event";
import { ModelStateChangedEvent } from "../events/model-state-changed-event";
import { EventHandler } from "event-js";
import { DisplayNameCache } from "./display-name-cache";
// TODO: This class should be simplified further if possible
export class ValidationGroup {
    constructor(fieldErrorProcessor, ruleResolver = new RuleResolver(), modelResolverFactory, localeHandler, model, ruleset) {
        this.fieldErrorProcessor = fieldErrorProcessor;
        this.ruleResolver = ruleResolver;
        this.modelResolverFactory = modelResolverFactory;
        this.localeHandler = localeHandler;
        this.ruleset = ruleset;
        this.propertyErrors = {};
        this.validatePropertyWithRuleLinks = (propertyName, propertyRules) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const activePromise = this.fieldErrorProcessor.checkFieldForErrors(this.modelResolver, propertyName, propertyRules);
            const possibleErrors = yield this.promiseCounter.countPromise(activePromise);
            const hadErrors = this.hasErrors();
            if (!possibleErrors) {
                if (this.propertyErrors[propertyName]) {
                    delete this.propertyErrors[propertyName];
                    const eventArgs = new PropertyStateChangedEvent(propertyName, true);
                    this.propertyStateChangedEvent.publish(eventArgs);
                    const stillHasErrors = hadErrors && this.hasErrors();
                    if (!stillHasErrors) {
                        this.modelStateChangedEvent.publish(new ModelStateChangedEvent(true));
                    }
                }
                return this.promiseCounter.waitForCompletion();
            }
            const previousError = this.propertyErrors[propertyName];
            this.propertyErrors[propertyName] = possibleErrors;
            if (possibleErrors != previousError) {
                const eventArgs = new PropertyStateChangedEvent(propertyName, false, possibleErrors);
                this.propertyStateChangedEvent.publish(eventArgs);
                if (!hadErrors) {
                    this.modelStateChangedEvent.publish(new ModelStateChangedEvent(false));
                }
            }
            return this.promiseCounter.waitForCompletion();
        });
        this.validatePropertyWithRuleSet = (propertyRoute, ruleset) => {
            let transformedPropertyName;
            for (const childPropertyName in ruleset.rules) {
                transformedPropertyName = `${propertyRoute}.${childPropertyName}`;
                this.validatePropertyWithRules(transformedPropertyName, ruleset.getRulesForProperty(childPropertyName));
            }
        };
        // This is in case an array element is removed, but there is an error already on the model errors for it
        this.clearPotentiallyStaleChildErrors = (propertyRoute) => {
            const keys = Object.keys(this.propertyErrors);
            for (let i = 0; i < keys.length; i++) {
                if (keys[i].indexOf(propertyRoute) >= 0) {
                    delete this.propertyErrors[keys[i]];
                }
            }
        };
        this.validatePropertyWithRules = (propertyRoute, rules) => {
            const ruleLinks = [];
            const ruleSets = [];
            let currentValue;
            try {
                currentValue = this.modelResolver.resolve(propertyRoute);
            }
            catch (ex) {
                console.warn(`Failed to resolve property ${propertyRoute} during validation. Does it exist in your model?`);
                throw (ex);
            }
            const routeEachRule = (ruleLinkOrSet) => {
                if (TypeHelper.isForEach(ruleLinkOrSet)) {
                    const isCurrentlyAnArray = TypeHelper.isArrayType(currentValue);
                    if (isCurrentlyAnArray) {
                        this.clearPotentiallyStaleChildErrors(propertyRoute);
                        currentValue.forEach((element, index) => {
                            const childPropertyName = `${propertyRoute}[${index}]`;
                            this.validatePropertyWithRules(childPropertyName, [ruleLinkOrSet.internalRule]);
                        });
                    }
                    else {
                        if (TypeHelper.isRuleset(ruleLinkOrSet.internalRule)) {
                            ruleSets.push(ruleLinkOrSet.internalRule);
                        }
                        else {
                            ruleLinks.push(ruleLinkOrSet.internalRule);
                        }
                    }
                }
                else if (TypeHelper.isRuleset(ruleLinkOrSet)) {
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
        this.startValidateProperty = (propertyRoute) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (Object.keys(this.ruleset.compositeRules).length > 0) {
                yield this.validateCompositeRules();
            }
            if (this.ruleset.compositeRules[propertyRoute] !== undefined) {
                return;
            }
            const rulesForProperty = this.ruleResolver.resolvePropertyRules(propertyRoute, this.ruleset);
            if (!rulesForProperty) {
                return;
            }
            return this.validatePropertyWithRules(propertyRoute, rulesForProperty);
        });
        this.validateCompositeRule = (compositeRule) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const hadErrors = this.hasErrors();
            const isValid = yield compositeRule.validate(this.modelResolver);
            if (isValid) {
                if (this.propertyErrors[compositeRule.virtualPropertyName]) {
                    delete this.propertyErrors[compositeRule.virtualPropertyName];
                    const eventArgs = new PropertyStateChangedEvent(compositeRule.virtualPropertyName, true);
                    this.propertyStateChangedEvent.publish(eventArgs);
                }
                const stillHasErrors = hadErrors && this.hasErrors();
                if (!stillHasErrors) {
                    this.modelStateChangedEvent.publish(new ModelStateChangedEvent(true));
                }
                return;
            }
            const previousError = this.propertyErrors[compositeRule.virtualPropertyName];
            const currentError = yield this.localeHandler.getMessage(compositeRule.virtualPropertyName, compositeRule, this.modelResolver, null);
            this.propertyErrors[compositeRule.virtualPropertyName] = currentError;
            if (currentError != previousError) {
                const eventArgs = new PropertyStateChangedEvent(compositeRule.virtualPropertyName, false, currentError);
                this.propertyStateChangedEvent.publish(eventArgs);
                if (!hadErrors) {
                    this.modelStateChangedEvent.publish(new ModelStateChangedEvent(false));
                }
            }
            return this.propertyErrors[compositeRule.virtualPropertyName];
        });
        this.validateCompositeRules = () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            for (const propertyName in this.ruleset.compositeRules) {
                const compositeRule = this.ruleset.compositeRules[propertyName];
                yield this.validateCompositeRule(compositeRule);
            }
        });
        this.startValidateModel = () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (Object.keys(this.ruleset.compositeRules).length > 0) {
                yield this.validateCompositeRules();
            }
            for (const parameterName in this.ruleset.rules) {
                yield this.startValidateProperty(parameterName);
            }
        });
        this.changeValidationTarget = (model) => {
            this.modelResolver = this.modelResolverFactory.createModelResolver(model);
        };
        this.validateProperty = (propertyRoute) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.startValidateProperty(propertyRoute);
            yield this.promiseCounter.waitForCompletion();
            return !this.propertyErrors[propertyRoute];
        });
        this.validate = () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.startValidateModel();
            yield this.promiseCounter.waitForCompletion();
            return !this.hasErrors();
        });
        this.getModelErrors = (revalidate = false) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (revalidate) {
                yield this.startValidateModel();
            }
            yield this.promiseCounter.waitForCompletion();
            return this.propertyErrors;
        });
        this.getPropertyError = (propertyRoute, revalidate = false) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (revalidate) {
                yield this.startValidateProperty(propertyRoute);
            }
            yield this.promiseCounter.waitForCompletion();
            return this.propertyErrors[propertyRoute];
        });
        this.getPropertyDisplayName = (propertyRoute) => {
            return this.displayNameCache.getDisplayNameFor(propertyRoute);
        };
        this.isPropertyInGroup = (propertyRoute) => {
            const applicableRules = this.ruleResolver.resolvePropertyRules(propertyRoute, this.ruleset);
            return (applicableRules != null);
        };
        this.release = () => { };
        this.propertyStateChangedEvent = new EventHandler(this);
        this.modelStateChangedEvent = new EventHandler(this);
        this.displayNameCache = new DisplayNameCache();
        this.promiseCounter = new PromiseCounter();
        this.modelResolver = this.modelResolverFactory.createModelResolver(model);
        this.displayNameCache.cacheDisplayNamesFor(ruleset);
    }
    hasErrors() {
        return (Object.keys(this.propertyErrors).length > 0);
    }
}
