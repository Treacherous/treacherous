"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var rule_resolver_1 = require("../rulesets/rule-resolver");
var type_helper_1 = require("../helpers/type-helper");
var promise_counter_1 = require("../promises/promise-counter");
var property_state_changed_event_1 = require("../events/property-state-changed-event");
var model_state_changed_event_1 = require("../events/model-state-changed-event");
var event_js_1 = require("event-js");
// TODO: This class could be simplified
var ValidationGroup = (function () {
    function ValidationGroup(fieldErrorProcessor, ruleResolver, modelResolverFactory, model, ruleset) {
        if (ruleResolver === void 0) { ruleResolver = new rule_resolver_1.RuleResolver(); }
        var _this = this;
        this.fieldErrorProcessor = fieldErrorProcessor;
        this.ruleResolver = ruleResolver;
        this.modelResolverFactory = modelResolverFactory;
        this.ruleset = ruleset;
        this.propertyErrors = {};
        this.validatePropertyWithRuleLinks = function (propertyName, propertyRules) { return __awaiter(_this, void 0, void 0, function () {
            var activePromise, possibleErrors, hadErrors, eventArgs, stillHasErrors, previousError, eventArgs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        activePromise = this.fieldErrorProcessor.checkFieldForErrors(this.modelResolver, propertyName, propertyRules);
                        return [4 /*yield*/, this.promiseCounter.countPromise(activePromise)];
                    case 1:
                        possibleErrors = _a.sent();
                        hadErrors = this.hasErrors();
                        if (!possibleErrors) {
                            if (this.propertyErrors[propertyName]) {
                                delete this.propertyErrors[propertyName];
                                eventArgs = new property_state_changed_event_1.PropertyStateChangedEvent(propertyName, true);
                                this.propertyStateChangedEvent.publish(eventArgs);
                                stillHasErrors = hadErrors && this.hasErrors();
                                if (!stillHasErrors) {
                                    this.modelStateChangedEvent.publish(new model_state_changed_event_1.ModelStateChangedEvent(true));
                                }
                            }
                            return [2 /*return*/, this.promiseCounter.waitForCompletion()];
                        }
                        previousError = this.propertyErrors[propertyName];
                        this.propertyErrors[propertyName] = possibleErrors;
                        if (possibleErrors != previousError) {
                            eventArgs = new property_state_changed_event_1.PropertyStateChangedEvent(propertyName, false, possibleErrors);
                            this.propertyStateChangedEvent.publish(eventArgs);
                            if (!hadErrors) {
                                this.modelStateChangedEvent.publish(new model_state_changed_event_1.ModelStateChangedEvent(false));
                            }
                        }
                        return [2 /*return*/, this.promiseCounter.waitForCompletion()];
                }
            });
        }); };
        this.validatePropertyWithRuleSet = function (propertyRoute, ruleset) {
            var transformedPropertyName;
            for (var childPropertyName in ruleset.rules) {
                transformedPropertyName = propertyRoute + "." + childPropertyName;
                _this.validatePropertyWithRules(transformedPropertyName, ruleset.getRulesForProperty(childPropertyName));
            }
        };
        this.validatePropertyWithRules = function (propertyRoute, rules) {
            var ruleLinks = [];
            var ruleSets = [];
            var currentValue;
            try {
                currentValue = _this.modelResolver.resolve(propertyRoute);
            }
            catch (ex) {
                console.warn("Failed to resolve property " + propertyRoute + " during validation. Does it exist in your model?");
                throw (ex);
            }
            var routeEachRule = function (ruleLinkOrSet) {
                if (_this.isForEach(ruleLinkOrSet)) {
                    var isCurrentlyAnArray = type_helper_1.TypeHelper.isArrayType(currentValue);
                    if (isCurrentlyAnArray) {
                        currentValue.forEach(function (element, index) {
                            var childPropertyName = propertyRoute + "[" + index + "]";
                            _this.validatePropertyWithRules(childPropertyName, [ruleLinkOrSet.internalRule]);
                        });
                    }
                    else {
                        if (_this.isRuleset(ruleLinkOrSet.internalRule)) {
                            ruleSets.push(ruleLinkOrSet.internalRule);
                        }
                        else {
                            ruleLinks.push(ruleLinkOrSet.internalRule);
                        }
                    }
                }
                else if (_this.isRuleset(ruleLinkOrSet)) {
                    ruleSets.push(ruleLinkOrSet);
                }
                else {
                    ruleLinks.push(ruleLinkOrSet);
                }
            };
            rules.forEach(routeEachRule);
            _this.validatePropertyWithRuleLinks(propertyRoute, ruleLinks);
            ruleSets.forEach(function (ruleSet) {
                _this.validatePropertyWithRuleSet(propertyRoute, ruleSet);
            });
        };
        this.startValidateProperty = function (propertyRoute) {
            var rulesForProperty = _this.ruleResolver.resolvePropertyRules(propertyRoute, _this.ruleset);
            if (!rulesForProperty) {
                return;
            }
            return _this.validatePropertyWithRules(propertyRoute, rulesForProperty);
        };
        this.startValidateModel = function () {
            for (var parameterName in _this.ruleset.rules) {
                _this.startValidateProperty(parameterName);
            }
        };
        this.changeValidationTarget = function (model) {
            _this.modelResolver = _this.modelResolverFactory.createModelResolver(model);
        };
        this.validateProperty = function (propertyRoute) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.startValidateProperty(propertyRoute)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.promiseCounter.waitForCompletion()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, !this.propertyErrors[propertyRoute]];
                }
            });
        }); };
        this.validate = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.startValidateModel()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.promiseCounter.waitForCompletion()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, !this.hasErrors()];
                }
            });
        }); };
        this.getModelErrors = function (revalidate) {
            if (revalidate === void 0) { revalidate = false; }
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!revalidate) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.startValidateModel()];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [4 /*yield*/, this.promiseCounter.waitForCompletion()];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, this.propertyErrors];
                    }
                });
            });
        };
        this.getPropertyError = function (propertyRoute, revalidate) {
            if (revalidate === void 0) { revalidate = false; }
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!revalidate) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.startValidateProperty(propertyRoute)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [4 /*yield*/, this.promiseCounter.waitForCompletion()];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, this.propertyErrors[propertyRoute]];
                    }
                });
            });
        };
        this.release = function () { };
        this.propertyStateChangedEvent = new event_js_1.EventHandler(this);
        this.modelStateChangedEvent = new event_js_1.EventHandler(this);
        this.promiseCounter = new promise_counter_1.PromiseCounter();
        this.modelResolver = this.modelResolverFactory.createModelResolver(model);
    }
    ValidationGroup.prototype.isRuleset = function (possibleRuleset) {
        return (typeof (possibleRuleset.addRule) == "function");
    };
    ValidationGroup.prototype.isForEach = function (possibleForEach) {
        return possibleForEach.isForEach;
    };
    ValidationGroup.prototype.hasErrors = function () {
        return (Object.keys(this.propertyErrors).length > 0);
    };
    return ValidationGroup;
}());
exports.ValidationGroup = ValidationGroup;
