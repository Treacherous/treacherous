(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Treacherous"] = factory();
	else
		root["Treacherous"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 47);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export __extends */
/* unused harmony export __assign */
/* unused harmony export __rest */
/* unused harmony export __decorate */
/* unused harmony export __param */
/* unused harmony export __metadata */
/* harmony export (immutable) */ __webpack_exports__["a"] = __awaiter;
/* unused harmony export __generator */
/* unused harmony export __exportStar */
/* unused harmony export __values */
/* unused harmony export __read */
/* unused harmony export __spread */
/* unused harmony export __await */
/* unused harmony export __asyncGenerator */
/* unused harmony export __asyncDelegator */
/* unused harmony export __asyncValues */
/* unused harmony export __makeTemplateObject */
/* unused harmony export __importStar */
/* unused harmony export __importDefault */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
}

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class TypeHelper {
    static isDateType(value) {
        return (typeof value.getMonth === 'function');
    }
    static isFunctionType(value) {
        return (typeof value === 'function');
    }
    static isSimpleType(value) {
        return (typeof value == "string" || typeof value == "number");
    }
    static isArrayType(value) {
        return Object.prototype.toString.call(value) === '[object Array]';
    }
    static isEmptyValue(value) {
        return value === undefined || value === null || value.length == 0;
    }
    static isObjectOrArray(value) {
        return (!!value) && (value.constructor === Array || value.constructor === Object);
    }
    static isRuleset(possibleRuleset) {
        return (typeof (possibleRuleset.addRule) == "function");
    }
    static isForEach(possibleForEach) {
        return possibleForEach.isForEach;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TypeHelper;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_property_resolver__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_property_resolver___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_property_resolver__);

class RuleResolver {
    constructor(propertyResolver = new __WEBPACK_IMPORTED_MODULE_0_property_resolver__["PropertyResolver"]()) {
        this.propertyResolver = propertyResolver;
        this.isPropertyRoute = (possiblePropertyRoute) => {
            return possiblePropertyRoute.indexOf(".") >= 0;
        };
        this.isIndexRoute = (possibleIndexRoute) => {
            return possibleIndexRoute.indexOf("[") >= 0;
        };
        this.resolvePropertyRules = (propertyRoute, ruleset) => {
            const propertyRouteSections = this.propertyResolver.decomposePropertyRoute(propertyRoute);
            const finalProperty = propertyRouteSections[propertyRouteSections.length - 1];
            const matchingRules = this.traverseRulesForRoutes(propertyRouteSections, ruleset);
            if (!matchingRules) {
                return null;
            }
            if (matchingRules.getRulesForProperty) {
                return matchingRules.getRulesForProperty(finalProperty);
            }
            return matchingRules;
        };
        this.getMatchingRuleForProperty = (property, rules) => {
            let currentRule;
            for (let i = 0; i < rules.length; i++) {
                currentRule = rules[i];
                if (currentRule.isForEach) {
                    currentRule = currentRule.internalRule;
                }
                if (!currentRule.getRulesForProperty) {
                    continue;
                }
                if (currentRule.rules[property]) {
                    return currentRule;
                }
            }
        };
        this.traverseRulesForRoutes = (propertyRouteSections, ruleset) => {
            const currentProperty = propertyRouteSections.shift();
            let childRules = ruleset;
            if (ruleset.rules) {
                childRules = childRules.rules[currentProperty];
            }
            if (!childRules) {
                return null;
            }
            if (propertyRouteSections.length == 0) {
                return childRules;
            }
            const nextProperty = propertyRouteSections[0];
            if (!nextProperty) {
                return ruleset;
            }
            if (this.isIndexRoute(nextProperty)) {
                propertyRouteSections.shift();
                const applicableRules = [];
                childRules.forEach((internalRules) => {
                    if (internalRules.isForEach) {
                        applicableRules.push(internalRules.internalRule);
                    }
                });
                if (propertyRouteSections.length > 0) {
                    const totalRules = [];
                    applicableRules.forEach((applicableRule) => {
                        const currentRouteSection = propertyRouteSections.slice();
                        const outputRules = this.traverseRulesForRoutes(currentRouteSection, applicableRule);
                        outputRules.forEach((outputRule) => {
                            totalRules.push(outputRule);
                        });
                    });
                    return totalRules;
                }
                return applicableRules;
            }
            if (propertyRouteSections.length == 0) {
                return childRules;
            }
            const nextChildRule = this.getMatchingRuleForProperty(nextProperty, childRules);
            if (propertyRouteSections.length > 0) {
                return this.traverseRulesForRoutes(propertyRouteSections, nextChildRule);
            }
            return nextChildRule;
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = RuleResolver;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class ComparerHelper {
    static simpleTypeComparer(value1, value2, isWeak) {
        if (isWeak) {
            return (value1 == value2);
        }
        return (value1 === value2);
    }
    static dateTimeCompararer(value1, value2) { return (value1.getTime() == value2.getTime()); }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ComparerHelper;



/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var property_resolver_1 = __webpack_require__(49);
exports.PropertyResolver = property_resolver_1.PropertyResolver;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__rulesets_rule_resolver__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helpers_type_helper__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__promises_promise_counter__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__events_property_state_changed_event__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__events_model_state_changed_event__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_event_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_event_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_event_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__display_name_cache__ = __webpack_require__(17);








// TODO: This class should be simplified further if possible
class ValidationGroup {
    constructor(fieldErrorProcessor, ruleResolver = new __WEBPACK_IMPORTED_MODULE_1__rulesets_rule_resolver__["a" /* RuleResolver */](), modelResolverFactory, localeHandler, model, ruleset) {
        this.fieldErrorProcessor = fieldErrorProcessor;
        this.ruleResolver = ruleResolver;
        this.modelResolverFactory = modelResolverFactory;
        this.localeHandler = localeHandler;
        this.ruleset = ruleset;
        this.propertyErrors = {};
        this.validatePropertyWithRuleLinks = (propertyName, propertyRules) => __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __awaiter */](this, void 0, void 0, function* () {
            const activePromise = this.fieldErrorProcessor.checkFieldForErrors(this.modelResolver, propertyName, propertyRules);
            const possibleErrors = yield this.promiseCounter.countPromise(activePromise);
            const hadErrors = this.hasErrors();
            if (!possibleErrors) {
                if (this.propertyErrors[propertyName]) {
                    delete this.propertyErrors[propertyName];
                    const eventArgs = new __WEBPACK_IMPORTED_MODULE_4__events_property_state_changed_event__["a" /* PropertyStateChangedEvent */](propertyName, true);
                    this.propertyStateChangedEvent.publish(eventArgs);
                    const stillHasErrors = hadErrors && this.hasErrors();
                    if (!stillHasErrors) {
                        this.modelStateChangedEvent.publish(new __WEBPACK_IMPORTED_MODULE_5__events_model_state_changed_event__["a" /* ModelStateChangedEvent */](true));
                    }
                }
                return this.promiseCounter.waitForCompletion();
            }
            const previousError = this.propertyErrors[propertyName];
            this.propertyErrors[propertyName] = possibleErrors;
            if (possibleErrors != previousError) {
                const eventArgs = new __WEBPACK_IMPORTED_MODULE_4__events_property_state_changed_event__["a" /* PropertyStateChangedEvent */](propertyName, false, possibleErrors);
                this.propertyStateChangedEvent.publish(eventArgs);
                if (!hadErrors) {
                    this.modelStateChangedEvent.publish(new __WEBPACK_IMPORTED_MODULE_5__events_model_state_changed_event__["a" /* ModelStateChangedEvent */](false));
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
                if (__WEBPACK_IMPORTED_MODULE_2__helpers_type_helper__["a" /* TypeHelper */].isForEach(ruleLinkOrSet)) {
                    const isCurrentlyAnArray = __WEBPACK_IMPORTED_MODULE_2__helpers_type_helper__["a" /* TypeHelper */].isArrayType(currentValue);
                    if (isCurrentlyAnArray) {
                        currentValue.forEach((element, index) => {
                            const childPropertyName = `${propertyRoute}[${index}]`;
                            this.validatePropertyWithRules(childPropertyName, [ruleLinkOrSet.internalRule]);
                        });
                    }
                    else {
                        if (__WEBPACK_IMPORTED_MODULE_2__helpers_type_helper__["a" /* TypeHelper */].isRuleset(ruleLinkOrSet.internalRule)) {
                            ruleSets.push(ruleLinkOrSet.internalRule);
                        }
                        else {
                            ruleLinks.push(ruleLinkOrSet.internalRule);
                        }
                    }
                }
                else if (__WEBPACK_IMPORTED_MODULE_2__helpers_type_helper__["a" /* TypeHelper */].isRuleset(ruleLinkOrSet)) {
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
        this.startValidateProperty = (propertyRoute) => __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __awaiter */](this, void 0, void 0, function* () {
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
        this.validateCompositeRule = (compositeRule) => __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __awaiter */](this, void 0, void 0, function* () {
            const hadErrors = this.hasErrors();
            const isValid = yield compositeRule.validate(this.modelResolver);
            if (isValid) {
                if (this.propertyErrors[compositeRule.virtualPropertyName]) {
                    delete this.propertyErrors[compositeRule.virtualPropertyName];
                    const eventArgs = new __WEBPACK_IMPORTED_MODULE_4__events_property_state_changed_event__["a" /* PropertyStateChangedEvent */](compositeRule.virtualPropertyName, true);
                    this.propertyStateChangedEvent.publish(eventArgs);
                }
                const stillHasErrors = hadErrors && this.hasErrors();
                if (!stillHasErrors) {
                    this.modelStateChangedEvent.publish(new __WEBPACK_IMPORTED_MODULE_5__events_model_state_changed_event__["a" /* ModelStateChangedEvent */](true));
                }
                return;
            }
            const previousError = this.propertyErrors[compositeRule.virtualPropertyName];
            const currentError = yield this.localeHandler.getMessage(compositeRule.virtualPropertyName, compositeRule, this.modelResolver, null);
            this.propertyErrors[compositeRule.virtualPropertyName] = currentError;
            if (currentError != previousError) {
                const eventArgs = new __WEBPACK_IMPORTED_MODULE_4__events_property_state_changed_event__["a" /* PropertyStateChangedEvent */](compositeRule.virtualPropertyName, false, currentError);
                this.propertyStateChangedEvent.publish(eventArgs);
                if (!hadErrors) {
                    this.modelStateChangedEvent.publish(new __WEBPACK_IMPORTED_MODULE_5__events_model_state_changed_event__["a" /* ModelStateChangedEvent */](false));
                }
            }
            return this.propertyErrors[compositeRule.virtualPropertyName];
        });
        this.validateCompositeRules = () => __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __awaiter */](this, void 0, void 0, function* () {
            for (const propertyName in this.ruleset.compositeRules) {
                const compositeRule = this.ruleset.compositeRules[propertyName];
                yield this.validateCompositeRule(compositeRule);
            }
        });
        this.startValidateModel = () => __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __awaiter */](this, void 0, void 0, function* () {
            for (const parameterName in this.ruleset.rules) {
                yield this.startValidateProperty(parameterName);
            }
        });
        this.changeValidationTarget = (model) => {
            this.modelResolver = this.modelResolverFactory.createModelResolver(model);
        };
        this.validateProperty = (propertyRoute) => __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __awaiter */](this, void 0, void 0, function* () {
            yield this.startValidateProperty(propertyRoute);
            yield this.promiseCounter.waitForCompletion();
            return !this.propertyErrors[propertyRoute];
        });
        this.validate = () => __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __awaiter */](this, void 0, void 0, function* () {
            yield this.startValidateModel();
            yield this.promiseCounter.waitForCompletion();
            return !this.hasErrors();
        });
        this.getModelErrors = (revalidate = false) => __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __awaiter */](this, void 0, void 0, function* () {
            if (revalidate) {
                yield this.startValidateModel();
            }
            yield this.promiseCounter.waitForCompletion();
            return this.propertyErrors;
        });
        this.getPropertyError = (propertyRoute, revalidate = false) => __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __awaiter */](this, void 0, void 0, function* () {
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
        this.propertyStateChangedEvent = new __WEBPACK_IMPORTED_MODULE_6_event_js__["EventHandler"](this);
        this.modelStateChangedEvent = new __WEBPACK_IMPORTED_MODULE_6_event_js__["EventHandler"](this);
        this.displayNameCache = new __WEBPACK_IMPORTED_MODULE_7__display_name_cache__["a" /* DisplayNameCache */]();
        this.promiseCounter = new __WEBPACK_IMPORTED_MODULE_3__promises_promise_counter__["a" /* PromiseCounter */]();
        this.modelResolver = this.modelResolverFactory.createModelResolver(model);
        this.displayNameCache.cacheDisplayNamesFor(ruleset);
    }
    hasErrors() {
        return (Object.keys(this.propertyErrors).length > 0);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ValidationGroup;



/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/* This is an auto-generated file by gulp-es6-exporter */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(50));
__export(__webpack_require__(16));


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class PropertyChangedEvent {
    constructor(propertyPath, newValue, oldValue) {
        this.propertyPath = propertyPath;
        this.newValue = newValue;
        this.oldValue = oldValue;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PropertyChangedEvent;



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__resolvers_model_resolver__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_property_resolver__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_property_resolver___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_property_resolver__);


class ModelResolverFactory {
    constructor(propertyResolver = new __WEBPACK_IMPORTED_MODULE_1_property_resolver__["PropertyResolver"]()) {
        this.propertyResolver = propertyResolver;
        this.createModelResolver = (model) => {
            return new __WEBPACK_IMPORTED_MODULE_0__resolvers_model_resolver__["a" /* ModelResolver */](this.propertyResolver, model);
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ModelResolverFactory;



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Ruleset {
    constructor() {
        this.rules = {};
        this.compositeRules = {};
        this.propertyDisplayNames = {};
        this.createPropertyEntryIfNeeded = (property) => {
            if (!this.rules[property]) {
                this.rules[property] = [];
            }
        };
        this.addRule = (property, ruleLink) => {
            this.createPropertyEntryIfNeeded(property);
            this.rules[property].push(ruleLink);
        };
        this.addRuleset = (property, ruleset) => {
            this.createPropertyEntryIfNeeded(property);
            this.rules[property].push(ruleset);
        };
        this.addCompositeRule = (compositeRule) => { this.compositeRules[compositeRule.virtualPropertyName] = compositeRule; };
        this.addPropertyDisplayName = (propertyName, displayName) => { return this.propertyDisplayNames[propertyName] = displayName; };
        this.getRulesForProperty = (property) => { return this.rules[property]; };
        this.getCompositeRulesRulesForProperty = (propertyName) => { return this.compositeRules[propertyName]; };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Ruleset;



/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__field_has_error__ = __webpack_require__(11);


class FieldErrorProcessor {
    constructor(ruleRegistry, localeHandler) {
        this.ruleRegistry = ruleRegistry;
        this.localeHandler = localeHandler;
        this.processRuleLink = (modelResolver, propertyName, ruleLink) => __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __awaiter */](this, void 0, void 0, function* () {
            const shouldRuleApply = ruleLink.appliesIf === true
                || ((typeof (ruleLink.appliesIf) === "function")
                    ? (ruleLink.appliesIf)(modelResolver, propertyName, ruleLink.ruleOptions)
                    : false);
            if (!shouldRuleApply) {
                return;
            }
            const validator = this.ruleRegistry.getRuleNamed(ruleLink.ruleName);
            if (!validator) {
                throw new __WEBPACK_IMPORTED_MODULE_1__field_has_error__["a" /* FieldHasError */](`No validator can be found for rule [${ruleLink.ruleName}]`);
            }
            const options = (typeof ruleLink.ruleOptions == "function") ? ruleLink.ruleOptions() : ruleLink.ruleOptions;
            const isValid = yield validator.validate(modelResolver, propertyName, options);
            if (isValid) {
                return;
            }
            let error;
            if (ruleLink.messageOverride) {
                if (typeof (ruleLink.messageOverride) === "function") {
                    error = (ruleLink.messageOverride)(modelResolver, propertyName, ruleLink.ruleOptions);
                }
                else {
                    error = ruleLink.messageOverride;
                }
            }
            else {
                error = yield this.localeHandler.getMessage(ruleLink.ruleName, ruleLink.ruleOptions, modelResolver, propertyName);
            }
            throw new __WEBPACK_IMPORTED_MODULE_1__field_has_error__["a" /* FieldHasError */](error);
        });
        this.checkFieldForErrors = (modelResolver, propertyName, rules) => __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __awaiter */](this, void 0, void 0, function* () {
            const ruleCheck = (ruleLinkOrSet) => {
                return this.processRuleLink(modelResolver, propertyName, ruleLinkOrSet);
            };
            const checkEachRule = (rules) => {
                const promises = [];
                rules.forEach((rule) => {
                    promises.push(ruleCheck(rule));
                });
                return Promise.all(promises);
            };
            return Promise.resolve(rules)
                .then(checkEachRule)
                .then(function () { return null; })
                .catch((validationError) => {
                return validationError.message;
            });
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = FieldErrorProcessor;



/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class FieldHasError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = FieldHasError;



/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__validation_groups_validation_group__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__reactive_validation_group_builder__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__factories_model_resolver_factory__ = __webpack_require__(8);



class ValidationGroupBuilder {
    constructor(fieldErrorProcessor, ruleResolver, localeHandler) {
        this.fieldErrorProcessor = fieldErrorProcessor;
        this.ruleResolver = ruleResolver;
        this.localeHandler = localeHandler;
        this.create = () => {
            this.modelResolverFactory = new __WEBPACK_IMPORTED_MODULE_2__factories_model_resolver_factory__["a" /* ModelResolverFactory */]();
            this.validateOnStart = false;
            return this;
        };
        this.asReactiveGroup = () => {
            const reactiveBuilder = new __WEBPACK_IMPORTED_MODULE_1__reactive_validation_group_builder__["a" /* ReactiveValidationGroupBuilder */](this.fieldErrorProcessor, this.ruleResolver, this.localeHandler)
                .create()
                .withModelResolverFactory(this.modelResolverFactory);
            return reactiveBuilder;
        };
        this.withModelResolverFactory = (modelResolverFactory) => {
            this.modelResolverFactory = modelResolverFactory;
            return this;
        };
        this.andValidateOnStart = () => {
            this.validateOnStart = true;
            return this;
        };
        this.build = (model, ruleset) => {
            const validationGroup = new __WEBPACK_IMPORTED_MODULE_0__validation_groups_validation_group__["a" /* ValidationGroup */](this.fieldErrorProcessor, this.ruleResolver, this.modelResolverFactory, this.localeHandler, model, ruleset);
            if (this.validateOnStart) {
                validationGroup.validate();
            }
            return validationGroup;
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ValidationGroupBuilder;



/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(0);

class PromiseCounter {
    constructor() {
        this.promiseCallbacks = [];
        this.validationCounter = 0;
        this.waitForCompletion = () => __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __awaiter */](this, void 0, void 0, function* () {
            if (!this.validationCounter) {
                return;
            }
            const resolver = (resolve) => {
                this.promiseCallbacks.push(() => resolve());
            };
            return new Promise(resolver);
        });
        this.countPromise = (promise) => __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __awaiter */](this, void 0, void 0, function* () {
            if (!promise) {
                return;
            }
            if (!promise.then) {
                throw new Error("Non-Promise pass in: " + promise);
            }
            this.incrementCounter();
            const result = yield promise;
            this.decrementCounter();
            return result;
        });
        this.decrementCounter = () => {
            this.validationCounter--;
            if (this.validationCounter) {
                return;
            }
            while (this.promiseCallbacks.length) {
                this.promiseCallbacks.shift()();
            }
        };
        this.incrementCounter = () => { this.validationCounter++; };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PromiseCounter;



/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class PropertyStateChangedEvent {
    constructor(property, isValid, error) {
        this.property = property;
        this.isValid = isValid;
        this.error = error;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PropertyStateChangedEvent;



/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class ModelStateChangedEvent {
    constructor(isValid) {
        this.isValid = isValid;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ModelStateChangedEvent;



/***/ }),
/* 16 */
/***/ (function(module, exports) {

var EventListener = (function () {
    function EventListener(callback, predicate) {
        this.callback = callback;
        this.predicate = predicate;
    }
    return EventListener;
})();
exports.EventListener = EventListener;


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helpers_type_helper__ = __webpack_require__(1);

class DisplayNameCache {
    constructor() {
        this.propertySanitizerRegex = /\[(.*?)]/g;
        this.propertyNameOverrideCache = {};
        this.recurseTree = (ruleset, currentPropertyRoute) => {
            for (const propertyKey in ruleset.rules) {
                const nextRoute = this.updateRouteName(currentPropertyRoute, propertyKey);
                const appliedRules = ruleset.rules[propertyKey];
                appliedRules.forEach((ruleOrSet) => {
                    if (__WEBPACK_IMPORTED_MODULE_0__helpers_type_helper__["a" /* TypeHelper */].isForEach(ruleOrSet) && __WEBPACK_IMPORTED_MODULE_0__helpers_type_helper__["a" /* TypeHelper */].isRuleset(ruleOrSet.internalRule)) {
                        this.recurseTree(ruleOrSet.internalRule, nextRoute);
                    }
                    if (__WEBPACK_IMPORTED_MODULE_0__helpers_type_helper__["a" /* TypeHelper */].isRuleset(ruleOrSet)) {
                        this.recurseTree(ruleOrSet, nextRoute);
                    }
                });
            }
            if (Object.keys(ruleset.propertyDisplayNames).length == 0) {
                return;
            }
            for (const propertyKey in ruleset.propertyDisplayNames) {
                const routeName = this.updateRouteName(currentPropertyRoute, propertyKey);
                this.propertyNameOverrideCache[routeName] = ruleset.propertyDisplayNames[propertyKey];
            }
        };
        this.updateRouteName = (currentRoute, nextPart) => {
            return currentRoute.length > 0 ? `${currentRoute}.${nextPart}` : nextPart;
        };
        this.cacheDisplayNamesFor = (rootRuleset) => {
            this.recurseTree(rootRuleset, "");
        };
        this.getDisplayNameFor = (propertyRoute) => {
            const sanitisedDisplayName = propertyRoute.replace(this.propertySanitizerRegex, "");
            return this.propertyNameOverrideCache[sanitisedDisplayName] || propertyRoute;
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DisplayNameCache;



/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__validation_groups_reactive_validation_group__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__factories_model_watcher_factory__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__factories_model_resolver_factory__ = __webpack_require__(8);



class ReactiveValidationGroupBuilder {
    constructor(fieldErrorProcessor, ruleResolver, localeHandler) {
        this.fieldErrorProcessor = fieldErrorProcessor;
        this.ruleResolver = ruleResolver;
        this.localeHandler = localeHandler;
        this.create = () => {
            this.refreshRate = 500;
            this.validateOnStart = false;
            this.modelWatcherFactory = new __WEBPACK_IMPORTED_MODULE_1__factories_model_watcher_factory__["a" /* ModelWatcherFactory */]();
            this.modelResolverFactory = new __WEBPACK_IMPORTED_MODULE_2__factories_model_resolver_factory__["a" /* ModelResolverFactory */]();
            return this;
        };
        this.withRefreshRate = (refreshRate) => {
            this.refreshRate = refreshRate;
            return this;
        };
        this.withModelResolverFactory = (modelResolverFactory) => {
            this.modelResolverFactory = modelResolverFactory;
            return this;
        };
        this.withModelWatcherFactory = (modelWatcherFactory) => {
            this.modelWatcherFactory = modelWatcherFactory;
            return this;
        };
        this.andValidateOnStart = () => {
            this.validateOnStart = true;
            return this;
        };
        this.build = (model, ruleset) => {
            const validationGroup = new __WEBPACK_IMPORTED_MODULE_0__validation_groups_reactive_validation_group__["a" /* ReactiveValidationGroup */](this.fieldErrorProcessor, this.ruleResolver, this.modelResolverFactory, this.modelWatcherFactory, this.localeHandler, model, ruleset, this.refreshRate);
            if (this.validateOnStart) {
                validationGroup.validate();
            }
            return validationGroup;
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ReactiveValidationGroupBuilder;



/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__rulesets_rule_resolver__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__validation_group__ = __webpack_require__(5);


class ReactiveValidationGroup extends __WEBPACK_IMPORTED_MODULE_1__validation_group__["a" /* ValidationGroup */] {
    constructor(fieldErrorProcessor, ruleResolver = new __WEBPACK_IMPORTED_MODULE_0__rulesets_rule_resolver__["a" /* RuleResolver */](), modelResolverFactory, modelWatcherFactory, localeHandler, model, ruleset, refreshRate = 500) {
        super(fieldErrorProcessor, ruleResolver, modelResolverFactory, localeHandler, model, ruleset);
        this.modelWatcherFactory = modelWatcherFactory;
        this.localeHandler = localeHandler;
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
/* harmony export (immutable) */ __webpack_exports__["a"] = ReactiveValidationGroup;



/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__watcher_model_watcher__ = __webpack_require__(21);

class ModelWatcherFactory {
    constructor() {
        this.createModelWatcher = () => {
            return new __WEBPACK_IMPORTED_MODULE_0__watcher_model_watcher__["a" /* ModelWatcher */]();
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ModelWatcherFactory;



/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_property_resolver__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_property_resolver___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_property_resolver__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_event_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_event_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_event_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helpers_type_helper__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__property_watcher__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__events_property_changed_event__ = __webpack_require__(7);





class ModelWatcher {
    constructor(propertyResolver = new __WEBPACK_IMPORTED_MODULE_0_property_resolver__["PropertyResolver"]()) {
        this.propertyResolver = propertyResolver;
        this.watchCache = [];
        this.watchCacheKeys = [];
        this.watcherInterval = null;
        this.setupWatcher = (model, ruleset, scanInterval = 500) => {
            this.model = model;
            this.ruleset = ruleset;
            this.scanInterval = scanInterval;
            this.watchCache = [];
            this.watchCacheKeys = [];
            this.cacheWatchTargets("", this.ruleset);
            this.scanProperties();
            this.startWatching();
        };
        this.changeWatcherTarget = (model) => {
            this.model = model;
            this.scanProperties();
        };
        this.startWatching = () => {
            this.stopWatching();
            this.watcherInterval = setInterval(this.scanProperties, this.scanInterval);
        };
        this.stopWatching = () => {
            if (this.watcherInterval) {
                clearInterval(this.watcherInterval);
            }
        };
        this.updateAndNotifyDifferences = () => {
            const previousKeyCache = this.watchCacheKeys;
            const previousWatchCache = this.watchCache;
            this.watchCache = [];
            this.watchCacheKeys = [];
            this.cacheWatchTargets("", this.ruleset);
            this.watchCacheKeys.forEach((key, index) => {
                let previousValue;
                if (previousKeyCache.indexOf(key) == -1) {
                    previousValue = this.watchCache[index].previousValue;
                    const propertyChangedArgs = new __WEBPACK_IMPORTED_MODULE_4__events_property_changed_event__["a" /* PropertyChangedEvent */](key, previousValue, null);
                    setTimeout(() => { this.onPropertyChanged.publish(propertyChangedArgs); }, 1);
                }
                else if (previousWatchCache[index].previousValue && previousWatchCache[index].previousValue.isArray) {
                    if (previousWatchCache[index].previousValue.length != this.watchCache[index].previousValue.length) {
                        const newValue = this.watchCache[index].previousValue;
                        previousValue = previousWatchCache[index].previousValue;
                        const propertyChangedArgs = new __WEBPACK_IMPORTED_MODULE_4__events_property_changed_event__["a" /* PropertyChangedEvent */](key, newValue, previousValue);
                        setTimeout(() => { this.onPropertyChanged.publish(propertyChangedArgs); }, 1);
                    }
                }
            });
        };
        this.watchProperty = (watchRoute, previousData) => {
            if (this.watchCacheKeys.indexOf(watchRoute) == -1) {
                const propertyWatcher = new __WEBPACK_IMPORTED_MODULE_3__property_watcher__["a" /* PropertyWatcher */](watchRoute, previousData);
                this.watchCache.push(propertyWatcher);
                this.watchCacheKeys.push(watchRoute);
            }
        };
        this.cacheWatchTargets = (propertyStack, ruleset) => {
            let paramRoute, parameterRules;
            let anyRulesAreForEach, anyRulesAreSets;
            let hasValue, currentValue;
            for (const param in ruleset.rules) {
                paramRoute = propertyStack ? propertyStack + "." + param : param;
                parameterRules = ruleset.rules[param];
                anyRulesAreForEach = false;
                anyRulesAreSets = false;
                parameterRules.forEach(function (rule) {
                    if (rule.isForEach) {
                        anyRulesAreForEach = true;
                    }
                    if (rule.getRulesForProperty) {
                        anyRulesAreSets = true;
                    }
                });
                hasValue = false;
                try {
                    currentValue = this.propertyResolver.resolveProperty(this.model, paramRoute);
                    hasValue = true;
                }
                catch (ex) { }
                if (currentValue == null && (anyRulesAreForEach || anyRulesAreSets)) {
                    if (anyRulesAreForEach) {
                        currentValue = [];
                    }
                    else if (anyRulesAreSets) {
                        currentValue = {};
                    }
                    else {
                        currentValue = null;
                    }
                }
                parameterRules.forEach((rule) => {
                    const isArray = __WEBPACK_IMPORTED_MODULE_2__helpers_type_helper__["a" /* TypeHelper */].isArrayType(currentValue);
                    if (isArray) {
                        const cachedArrayInfo = { length: currentValue.length, isArray: true };
                        this.watchProperty(paramRoute, cachedArrayInfo);
                    }
                    if (rule.isForEach && hasValue) {
                        // ruleset
                        if (rule.internalRule.getRulesForProperty) {
                            if (this.model[param]) {
                                this.model[param].forEach((element, index) => {
                                    this.cacheWatchTargets(paramRoute + "[" + index + "]", rule.internalRule);
                                });
                            }
                        }
                        else {
                            if (this.model[param]) {
                                this.model[param].forEach((element, index) => {
                                    this.watchProperty(paramRoute + "[" + index + "]", this.model[param][index]);
                                });
                            }
                        }
                    }
                    else {
                        // ruleset
                        if (rule.getRulesForProperty) {
                            this.cacheWatchTargets(paramRoute, rule);
                        }
                        else {
                            if (!isArray) {
                                this.watchProperty(paramRoute, currentValue);
                            }
                        }
                    }
                });
            }
        };
        this.scanProperties = () => {
            if (this.onPropertyChanged.getSubscriptionCount() == 0) {
                return;
            }
            if (this.watchCache.length == 0) {
                return;
            }
            let refreshOnNextCycle = false;
            this.watchCache.forEach((propertyWatcher) => {
                let currentValue;
                let hasChanged = false;
                try {
                    currentValue = this.propertyResolver.resolveProperty(this.model, propertyWatcher.propertyPath);
                }
                catch (ex) { }
                if (typeof (currentValue) == "undefined") {
                    currentValue = propertyWatcher.previousValue;
                }
                if (propertyWatcher.previousValue && propertyWatcher.previousValue.isArray) {
                    const currentLength = currentValue.length || 0;
                    if (currentLength != propertyWatcher.previousValue.length) {
                        hasChanged = true;
                    }
                }
                else if (currentValue !== propertyWatcher.previousValue) {
                    const propertyChangedArgs = new __WEBPACK_IMPORTED_MODULE_4__events_property_changed_event__["a" /* PropertyChangedEvent */](propertyWatcher.propertyPath, currentValue, propertyWatcher.previousValue);
                    setTimeout(() => { this.onPropertyChanged.publish(propertyChangedArgs); }, 1);
                    propertyWatcher.previousValue = currentValue;
                }
                if (hasChanged) {
                    refreshOnNextCycle = true;
                }
            });
            if (refreshOnNextCycle) {
                setTimeout(this.updateAndNotifyDifferences, 1);
            }
        };
        this.onPropertyChanged = new __WEBPACK_IMPORTED_MODULE_1_event_js__["EventHandler"](this);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ModelWatcher;



/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class PropertyWatcher {
    constructor(propertyPath, previousValue) {
        this.propertyPath = propertyPath;
        this.previousValue = previousValue;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PropertyWatcher;



/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class ModelResolver {
    constructor(propertyResolver, model) {
        this.propertyResolver = propertyResolver;
        this.model = model;
    }
    resolve(propertyName) {
        return this.propertyResolver.resolveProperty(this.model, propertyName);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ModelResolver;



/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ruleRegistry; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__rules_rule_registry__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__rules_date_validation_rule__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__rules_decimal_validation_rule__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__rules_email_validation_rule__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__rules_equal_validation_rule__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__rules_iso_date_validation_rule__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__rules_max_length_validation_rule__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__rules_max_value_validation_rule__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__rules_min_length_validation_rule__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__rules_min_value_validation_rule__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__rules_not_equal_validation_rule__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__rules_number_validation_rule__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__rules_regex_validation_rule__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__rules_required_validation_rule__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__rules_step_validation_rule__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__rules_matches_validation_rule__ = __webpack_require__(40);
















let ruleRegistry;
if (!ruleRegistry) {
    ruleRegistry = new __WEBPACK_IMPORTED_MODULE_0__rules_rule_registry__["a" /* RuleRegistry */]();
    ruleRegistry.registerRule(new __WEBPACK_IMPORTED_MODULE_1__rules_date_validation_rule__["a" /* DateValidationRule */]());
    ruleRegistry.registerRule(new __WEBPACK_IMPORTED_MODULE_2__rules_decimal_validation_rule__["a" /* DecimalValidationRule */]());
    ruleRegistry.registerRule(new __WEBPACK_IMPORTED_MODULE_3__rules_email_validation_rule__["a" /* EmailValidationRule */]());
    ruleRegistry.registerRule(new __WEBPACK_IMPORTED_MODULE_4__rules_equal_validation_rule__["a" /* EqualValidationRule */]());
    ruleRegistry.registerRule(new __WEBPACK_IMPORTED_MODULE_5__rules_iso_date_validation_rule__["a" /* ISODateValidationRule */]());
    ruleRegistry.registerRule(new __WEBPACK_IMPORTED_MODULE_6__rules_max_length_validation_rule__["a" /* MaxLengthValidationRule */]());
    ruleRegistry.registerRule(new __WEBPACK_IMPORTED_MODULE_7__rules_max_value_validation_rule__["a" /* MaxValueValidationRule */]());
    ruleRegistry.registerRule(new __WEBPACK_IMPORTED_MODULE_8__rules_min_length_validation_rule__["a" /* MinLengthValidationRule */]());
    ruleRegistry.registerRule(new __WEBPACK_IMPORTED_MODULE_9__rules_min_value_validation_rule__["a" /* MinValueValidationRule */]());
    ruleRegistry.registerRule(new __WEBPACK_IMPORTED_MODULE_10__rules_not_equal_validation_rule__["a" /* NotEqualValidationRule */]());
    ruleRegistry.registerRule(new __WEBPACK_IMPORTED_MODULE_11__rules_number_validation_rule__["a" /* NumberValidationRule */]());
    ruleRegistry.registerRule(new __WEBPACK_IMPORTED_MODULE_12__rules_regex_validation_rule__["a" /* RegexValidationRule */]());
    ruleRegistry.registerRule(new __WEBPACK_IMPORTED_MODULE_13__rules_required_validation_rule__["a" /* RequiredValidationRule */]());
    ruleRegistry.registerRule(new __WEBPACK_IMPORTED_MODULE_14__rules_step_validation_rule__["a" /* StepValidationRule */]());
    ruleRegistry.registerRule(new __WEBPACK_IMPORTED_MODULE_15__rules_matches_validation_rule__["a" /* MatchesValidationRule */]());
}


/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class RuleRegistry {
    constructor() {
        this.rules = {};
        this.registerRule = (validationRule) => {
            this.rules[validationRule.ruleName] = validationRule;
        };
        this.unregisterRule = (validationRule) => {
            delete this.rules[validationRule.ruleName];
        };
        this.getRuleNamed = (ruleName) => {
            return this.rules[ruleName] || null;
        };
        this.hasRuleNamed = (ruleName) => {
            return this.getRuleNamed(ruleName) != null;
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = RuleRegistry;



/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_type_helper__ = __webpack_require__(1);


class DateValidationRule {
    constructor() {
        this.ruleName = "date";
        this.invalidObjectRegex = /Invalid|NaN/;
    }
    validate(modelResolver, propertyName) {
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __awaiter */](this, void 0, void 0, function* () {
            const value = modelResolver.resolve(propertyName);
            if (__WEBPACK_IMPORTED_MODULE_1__helpers_type_helper__["a" /* TypeHelper */].isEmptyValue(value)) {
                return true;
            }
            return !this.invalidObjectRegex.test(new Date(value));
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DateValidationRule;



/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_type_helper__ = __webpack_require__(1);


class DecimalValidationRule {
    constructor() {
        this.ruleName = "decimal";
        this.decimalRegex = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/;
    }
    validate(modelResolver, propertyName) {
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __awaiter */](this, void 0, void 0, function* () {
            const value = modelResolver.resolve(propertyName);
            if (__WEBPACK_IMPORTED_MODULE_1__helpers_type_helper__["a" /* TypeHelper */].isEmptyValue(value)) {
                return true;
            }
            return this.decimalRegex.test(value);
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DecimalValidationRule;



/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_type_helper__ = __webpack_require__(1);


class EmailValidationRule {
    constructor() {
        this.ruleName = "email";
        this.emailRegex = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/;
    }
    validate(modelResolver, propertyName) {
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __awaiter */](this, void 0, void 0, function* () {
            const value = modelResolver.resolve(propertyName);
            if (__WEBPACK_IMPORTED_MODULE_1__helpers_type_helper__["a" /* TypeHelper */].isEmptyValue(value)) {
                return true;
            }
            return this.emailRegex.test(value);
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = EmailValidationRule;



/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_type_helper__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helpers_comparer_helper__ = __webpack_require__(3);



class EqualValidationRule {
    constructor() {
        this.ruleName = "equal";
    }
    validate(modelResolver, propertyName, optionsOrValue) {
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __awaiter */](this, void 0, void 0, function* () {
            const value = modelResolver.resolve(propertyName);
            if (__WEBPACK_IMPORTED_MODULE_1__helpers_type_helper__["a" /* TypeHelper */].isEmptyValue(value)) {
                return true;
            }
            let comparison = optionsOrValue.value || optionsOrValue;
            const weakEquality = optionsOrValue.weakEquality || false;
            if (__WEBPACK_IMPORTED_MODULE_1__helpers_type_helper__["a" /* TypeHelper */].isFunctionType(comparison)) {
                comparison = comparison();
            }
            if (__WEBPACK_IMPORTED_MODULE_1__helpers_type_helper__["a" /* TypeHelper */].isDateType(comparison)) {
                return __WEBPACK_IMPORTED_MODULE_2__helpers_comparer_helper__["a" /* ComparerHelper */].dateTimeCompararer(value, comparison);
            }
            else {
                return __WEBPACK_IMPORTED_MODULE_2__helpers_comparer_helper__["a" /* ComparerHelper */].simpleTypeComparer(value, comparison, weakEquality);
            }
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = EqualValidationRule;



/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_type_helper__ = __webpack_require__(1);


class ISODateValidationRule {
    constructor() {
        this.ruleName = "isoDate";
        this.isoDateRegex = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/;
    }
    validate(modelResolver, propertyName) {
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __awaiter */](this, void 0, void 0, function* () {
            const value = modelResolver.resolve(propertyName);
            if (__WEBPACK_IMPORTED_MODULE_1__helpers_type_helper__["a" /* TypeHelper */].isEmptyValue(value)) {
                return true;
            }
            return this.isoDateRegex.test(value);
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ISODateValidationRule;



/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_type_helper__ = __webpack_require__(1);


class MaxLengthValidationRule {
    constructor() {
        this.ruleName = "maxLength";
    }
    validate(modelResolver, propertyName, maxLength) {
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __awaiter */](this, void 0, void 0, function* () {
            const value = modelResolver.resolve(propertyName);
            if (__WEBPACK_IMPORTED_MODULE_1__helpers_type_helper__["a" /* TypeHelper */].isEmptyValue(value)) {
                return true;
            }
            return value.length <= maxLength;
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MaxLengthValidationRule;



/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_type_helper__ = __webpack_require__(1);


class MaxValueValidationRule {
    constructor() {
        this.ruleName = "maxValue";
    }
    validate(modelResolver, propertyName, maxValue) {
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __awaiter */](this, void 0, void 0, function* () {
            const value = modelResolver.resolve(propertyName);
            if (__WEBPACK_IMPORTED_MODULE_1__helpers_type_helper__["a" /* TypeHelper */].isEmptyValue(value)) {
                return true;
            }
            return value <= maxValue;
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MaxValueValidationRule;



/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_type_helper__ = __webpack_require__(1);


class MinLengthValidationRule {
    constructor() {
        this.ruleName = "minLength";
    }
    validate(modelResolver, propertyName, minLength) {
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __awaiter */](this, void 0, void 0, function* () {
            const value = modelResolver.resolve(propertyName);
            if (__WEBPACK_IMPORTED_MODULE_1__helpers_type_helper__["a" /* TypeHelper */].isEmptyValue(value)) {
                return true;
            }
            return value.length >= minLength;
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MinLengthValidationRule;



/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_type_helper__ = __webpack_require__(1);


class MinValueValidationRule {
    constructor() {
        this.ruleName = "minValue";
    }
    validate(modelResolver, propertyName, minValue) {
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __awaiter */](this, void 0, void 0, function* () {
            const value = modelResolver.resolve(propertyName);
            if (__WEBPACK_IMPORTED_MODULE_1__helpers_type_helper__["a" /* TypeHelper */].isEmptyValue(value)) {
                return true;
            }
            return value >= minValue;
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MinValueValidationRule;



/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_type_helper__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helpers_comparer_helper__ = __webpack_require__(3);



class NotEqualValidationRule {
    constructor() {
        this.ruleName = "notEqual";
    }
    validate(modelResolver, propertyName, optionsOrValue) {
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __awaiter */](this, void 0, void 0, function* () {
            const value = modelResolver.resolve(propertyName);
            if (__WEBPACK_IMPORTED_MODULE_1__helpers_type_helper__["a" /* TypeHelper */].isEmptyValue(value)) {
                return true;
            }
            let comparison = optionsOrValue.value || optionsOrValue;
            const weakEquality = optionsOrValue.weakEquality || false;
            if (__WEBPACK_IMPORTED_MODULE_1__helpers_type_helper__["a" /* TypeHelper */].isFunctionType(comparison)) {
                comparison = comparison();
            }
            if (__WEBPACK_IMPORTED_MODULE_1__helpers_type_helper__["a" /* TypeHelper */].isDateType(comparison)) {
                return !__WEBPACK_IMPORTED_MODULE_2__helpers_comparer_helper__["a" /* ComparerHelper */].dateTimeCompararer(value, comparison);
            }
            else {
                return !__WEBPACK_IMPORTED_MODULE_2__helpers_comparer_helper__["a" /* ComparerHelper */].simpleTypeComparer(value, comparison, weakEquality);
            }
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = NotEqualValidationRule;



/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_type_helper__ = __webpack_require__(1);


class NumberValidationRule {
    constructor() {
        this.ruleName = "number";
        this.numberRegex = /^\d+$/;
    }
    validate(modelResolver, propertyName) {
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __awaiter */](this, void 0, void 0, function* () {
            const value = modelResolver.resolve(propertyName);
            if (__WEBPACK_IMPORTED_MODULE_1__helpers_type_helper__["a" /* TypeHelper */].isEmptyValue(value)) {
                return true;
            }
            return this.numberRegex.test(value);
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = NumberValidationRule;



/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_type_helper__ = __webpack_require__(1);


class RegexValidationRule {
    constructor() {
        this.ruleName = "regex";
    }
    validate(modelResolver, propertyName, regexPattern) {
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __awaiter */](this, void 0, void 0, function* () {
            const value = modelResolver.resolve(propertyName);
            if (__WEBPACK_IMPORTED_MODULE_1__helpers_type_helper__["a" /* TypeHelper */].isEmptyValue(value)) {
                return true;
            }
            return value.toString().match(regexPattern) !== null;
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = RegexValidationRule;



/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(0);

class RequiredValidationRule {
    constructor() {
        this.ruleName = "required";
    }
    validate(modelResolver, propertyName, isRequired = true) {
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __awaiter */](this, void 0, void 0, function* () {
            const value = modelResolver.resolve(propertyName);
            if (value === undefined || value === null) {
                return !isRequired;
            }
            let testValue = value;
            if (typeof (testValue) === 'string') {
                if (String.prototype.trim) {
                    testValue = value.trim();
                }
                else {
                    testValue = value.replace(/^\s+|\s+$/g, '');
                }
            }
            if (!isRequired) {
                return true;
            }
            return (testValue + '').length > 0;
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = RequiredValidationRule;



/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_type_helper__ = __webpack_require__(1);


class StepValidationRule {
    constructor() {
        this.ruleName = "step";
    }
    validate(modelResolver, propertyName, step) {
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __awaiter */](this, void 0, void 0, function* () {
            const value = modelResolver.resolve(propertyName);
            if (__WEBPACK_IMPORTED_MODULE_1__helpers_type_helper__["a" /* TypeHelper */].isEmptyValue(value)) {
                return true;
            }
            const dif = (value * 100) % (step * 100);
            return Math.abs(dif) < 0.00001 || Math.abs(1 - dif) < 0.00001;
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = StepValidationRule;



/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_type_helper__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helpers_comparer_helper__ = __webpack_require__(3);



class MatchesValidationRule {
    constructor() {
        this.ruleName = "matches";
    }
    validate(modelResolver, propertyName, optionsOrProperty) {
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __awaiter */](this, void 0, void 0, function* () {
            const fieldToMatch = optionsOrProperty.property || optionsOrProperty;
            const weakEquality = optionsOrProperty.weakEquality || false;
            const value = modelResolver.resolve(propertyName);
            const matchingFieldValue = modelResolver.resolve(fieldToMatch);
            if (value === undefined || value === null) {
                return (matchingFieldValue === undefined || matchingFieldValue === null);
            }
            else if (__WEBPACK_IMPORTED_MODULE_1__helpers_type_helper__["a" /* TypeHelper */].isDateType(value)) {
                return __WEBPACK_IMPORTED_MODULE_2__helpers_comparer_helper__["a" /* ComparerHelper */].dateTimeCompararer(value, matchingFieldValue);
            }
            else {
                return __WEBPACK_IMPORTED_MODULE_2__helpers_comparer_helper__["a" /* ComparerHelper */].simpleTypeComparer(value, matchingFieldValue, weakEquality);
            }
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MatchesValidationRule;



/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__rulesets_ruleset__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__rulesets_rule_link__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__rulesets_for_each_rule__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__helpers_type_helper__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__rules_composite_dynamic_composite_validation_rule__ = __webpack_require__(44);





class RulesetBuilder {
    constructor(ruleRegistry) {
        this.ruleRegistry = ruleRegistry;
        this.verifyExistingProperty = () => {
            if (!this.currentProperty) {
                throw new Error("A property must precede any rule calls in the chain");
            }
        };
        this.verifyRuleNameIsValid = (rule) => {
            if (rule == null || typeof (rule) == "undefined" || rule.length == 0) {
                throw new Error("A rule name is required");
            }
            if (this.ruleRegistry && !this.ruleRegistry.hasRuleNamed(rule)) {
                throw new Error(`The rule [${rule}] has not been registered`);
            }
        };
        this.create = (templateRuleset) => {
            this.internalRuleset = templateRuleset || new __WEBPACK_IMPORTED_MODULE_0__rulesets_ruleset__["a" /* Ruleset */]();
            this.currentProperty = null;
            return this;
        };
        this.mergeInRuleset = (ruleset) => {
            this.internalRuleset.rules = Object.assign({}, this.internalRuleset.rules, ruleset.rules);
            this.internalRuleset.compositeRules = Object.assign({}, this.internalRuleset.compositeRules, ruleset.compositeRules);
            this.internalRuleset.propertyDisplayNames = Object.assign({}, this.internalRuleset.propertyDisplayNames, ruleset.propertyDisplayNames);
            return this;
        };
        this.forProperty = (propertyNameOrPredicate) => {
            let endProperty = propertyNameOrPredicate;
            if (__WEBPACK_IMPORTED_MODULE_3__helpers_type_helper__["a" /* TypeHelper */].isFunctionType(endProperty)) {
                endProperty = this.extractPropertyName(propertyNameOrPredicate);
                if (!endProperty) {
                    throw new Error(`cannot resolve property from: ${propertyNameOrPredicate}`);
                }
            }
            this.currentProperty = endProperty;
            this.currentRule = null;
            return this;
        };
        this.then = (builderMethod) => {
            this.verifyExistingProperty();
            const subBuilder = new RulesetBuilder().create();
            builderMethod(subBuilder);
            const ruleset = subBuilder.build();
            return this.addRuleset(ruleset);
        };
        this.thenForEach = (builderMethod) => {
            this.verifyExistingProperty();
            const subBuilder = new RulesetBuilder().create();
            builderMethod(subBuilder);
            const ruleset = subBuilder.build();
            return this.addRulesetForEach(ruleset);
        };
        this.addRule = (rule, ruleOptions) => {
            this.verifyRuleNameIsValid(rule);
            this.verifyExistingProperty();
            this.internalRuleset.addRule(this.currentProperty, this.currentRule = new __WEBPACK_IMPORTED_MODULE_1__rulesets_rule_link__["a" /* RuleLink */](rule, ruleOptions));
            return this;
        };
        this.addCompositeRule = (compositeRule) => {
            this.internalRuleset.compositeRules[compositeRule.virtualPropertyName] = compositeRule;
            return this;
        };
        this.withDisplayName = (displayName) => {
            this.verifyExistingProperty();
            this.internalRuleset.propertyDisplayNames[this.currentProperty] = displayName;
            return this;
        };
        this.addDynamicRule = (virtualPropertyName, validate) => {
            const compositeRule = new __WEBPACK_IMPORTED_MODULE_4__rules_composite_dynamic_composite_validation_rule__["a" /* DynamicCompositeValidationRule */](virtualPropertyName, validate);
            this.internalRuleset.compositeRules[virtualPropertyName] = compositeRule;
            return this;
        };
        this.withMessage = (messageOverride) => {
            this.verifyExistingProperty();
            this.currentRule.messageOverride = messageOverride;
            return this;
        };
        this.appliesIf = (appliesFunction) => {
            this.verifyExistingProperty();
            this.currentRule.appliesIf = appliesFunction;
            return this;
        };
        this.addRuleForEach = (rule, ruleOptions) => {
            this.verifyRuleNameIsValid(rule);
            this.verifyExistingProperty();
            const ruleLink = new __WEBPACK_IMPORTED_MODULE_1__rulesets_rule_link__["a" /* RuleLink */](rule, ruleOptions);
            this.currentRule = ruleLink;
            this.internalRuleset.addRule(this.currentProperty, new __WEBPACK_IMPORTED_MODULE_2__rulesets_for_each_rule__["a" /* ForEachRule */](ruleLink));
            return this;
        };
        this.addRuleset = (ruleset) => {
            this.verifyExistingProperty();
            this.internalRuleset.addRuleset(this.currentProperty, ruleset);
            return this;
        };
        this.addRulesetForEach = (ruleset) => {
            this.verifyExistingProperty();
            this.internalRuleset.addRuleset(this.currentProperty, new __WEBPACK_IMPORTED_MODULE_2__rulesets_for_each_rule__["a" /* ForEachRule */](ruleset));
            return this;
        };
        this.build = () => {
            return this.internalRuleset;
        };
        // Shorthands
        this.required = () => this.addRule("required");
        this.date = () => this.addRule("date");
        this.decimal = () => this.addRule("decimal");
        this.email = () => this.addRule("email");
        this.isoDate = () => this.addRule("isoDate");
        this.number = () => this.addRule("number");
        this.equal = (value) => this.addRule("equal", value);
        this.notEqual = (value) => this.addRule("notEqual", value);
        this.minValue = (value) => this.addRule("minValue", value);
        this.maxValue = (value) => this.addRule("maxValue", value);
        this.minLength = (value) => this.addRule("minLength", value);
        this.maxLength = (value) => this.addRule("maxLength", value);
        this.regex = (pattern) => this.addRule("regex", pattern);
        this.step = (step) => this.addRule("step", step);
        this.matches = (propertyNameOrPredicate) => {
            let endProperty = propertyNameOrPredicate;
            if (__WEBPACK_IMPORTED_MODULE_3__helpers_type_helper__["a" /* TypeHelper */].isFunctionType(endProperty)) {
                endProperty = this.extractPropertyName(propertyNameOrPredicate);
                if (!endProperty) {
                    throw new Error(`cannot resolve property from: ${propertyNameOrPredicate}`);
                }
            }
            return this.addRule("matches", endProperty);
        };
    }
    extractPropertyName(predicate) {
        const regex = /.*\.([\w]*)/;
        const predicateString = predicate.toString();
        return regex.exec(predicateString)[1];
    }
    static create(templateRuleset) { return new RulesetBuilder().create(templateRuleset); }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = RulesetBuilder;



/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class RuleLink {
    constructor(ruleName, ruleOptions) {
        this.ruleName = ruleName;
        this.ruleOptions = ruleOptions;
        this.appliesIf = true;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = RuleLink;



/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class ForEachRule {
    constructor(internalRule) {
        this.internalRule = internalRule;
        this.isForEach = true;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ForEachRule;



/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class DynamicCompositeValidationRule {
    constructor(virtualPropertyName, validate) {
        this.virtualPropertyName = virtualPropertyName;
        this.validate = validate;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DynamicCompositeValidationRule;



/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(0);

class DefaultLocaleHandler {
    constructor() {
        this.localeResources = {};
        this.getCurrentLocale = () => { return this.localeCode; };
        this.registerLocale = (localeCode, localeResource) => __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __awaiter */](this, void 0, void 0, function* () {
            this.localeCode = localeCode;
            this.localeResources[this.localeCode] = localeResource;
        });
        this.useLocale = (localeCode) => __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __awaiter */](this, void 0, void 0, function* () {
            if (!this.localeResources[localeCode]) {
                throw `Unable to find registered locale for [${localeCode}]`;
            }
            this.localeCode = localeCode;
        });
        this.supplementLocaleFrom = (localeCode, localeModule) => __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __awaiter */](this, void 0, void 0, function* () {
            if (!this.localeResources[localeCode]) {
                this.localeResources[localeCode] = {};
            }
            for (const propertyName in localeModule) {
                this.localeResources[localeCode][propertyName] = localeModule[propertyName];
            }
        });
        this.getMessage = (ruleName, ruleOptions, modelResolver, propertyName) => __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __awaiter */](this, void 0, void 0, function* () {
            const currentLocale = this.localeResources[this.localeCode];
            const ruleResource = currentLocale[ruleName] || currentLocale["default"] || `Cannot find rule for ${ruleName}`;
            if (typeof ruleResource === "string") {
                return ruleResource;
            }
            if (ruleResource.length === 3 || propertyName == null) {
                return ruleResource(modelResolver, propertyName, ruleOptions);
            }
            const propertyValue = modelResolver.resolve(propertyName);
            return ruleResource(propertyValue, ruleOptions);
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DefaultLocaleHandler;



/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const locale = {
    "default": "This field is invalid",
    "required": "This field is required",
    "date": (value) => `This field contains "${value}" which is not a valid date`,
    "decimal": (value) => `This field contains ${value} which is not a decimal value`,
    "equal": (value, optionsOrValue) => `This field is ${value} but should be equal to ${optionsOrValue.value || optionsOrValue}`,
    "notEqual": (value, optionsOrValue) => `This field is ${value} but should not be equal to ${optionsOrValue.value || optionsOrValue}`,
    "isoDate": (value) => `This field contains "${value}" which is not a valid ISO date`,
    "maxLength": (value, maxLength) => `This field has a length of ${value.length} but should contain no more than ${maxLength}`,
    "minLength": (value, minLength) => `This field has a length of ${value.length} but should more than ${minLength}`,
    "maxValue": (value, maxValue) => `This field has a value of ${value} but should be less than or equal to ${maxValue}`,
    "minValue": (value, minValue) => `This field has a value of ${value} but should be greater than or equal to ${minValue}`,
    "number": (value) => `This field contains ${value} which is not a numeric value`,
    "regex": "This field does not match the expected format",
    "step": (value, step) => `This field has a value of ${value} and should be an increment of ${step}`,
    "matches": (modelResolver, propertyName, optionsOrProperty) => {
        const value = modelResolver.resolve(propertyName);
        const fieldToMatch = optionsOrProperty.property || optionsOrProperty;
        const matchingFieldValue = modelResolver.resolve(fieldToMatch);
        return `This field is ${value} but should match ${matchingFieldValue}`;
    },
};
/* harmony export (immutable) */ __webpack_exports__["a"] = locale;



/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__exposer__ = __webpack_require__(48);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "createRuleset", function() { return __WEBPACK_IMPORTED_MODULE_0__exposer__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "mergeRulesets", function() { return __WEBPACK_IMPORTED_MODULE_0__exposer__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "createGroup", function() { return __WEBPACK_IMPORTED_MODULE_0__exposer__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "localeHandler", function() { return __WEBPACK_IMPORTED_MODULE_0__exposer__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "supplementLocale", function() { return __WEBPACK_IMPORTED_MODULE_0__exposer__["e"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__rule_registry_setup__ = __webpack_require__(24);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ruleRegistry", function() { return __WEBPACK_IMPORTED_MODULE_1__rule_registry_setup__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__builders_reactive_validation_group_builder__ = __webpack_require__(18);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ReactiveValidationGroupBuilder", function() { return __WEBPACK_IMPORTED_MODULE_2__builders_reactive_validation_group_builder__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__builders_ruleset_builder__ = __webpack_require__(41);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RulesetBuilder", function() { return __WEBPACK_IMPORTED_MODULE_3__builders_ruleset_builder__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__builders_validation_group_builder__ = __webpack_require__(12);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ValidationGroupBuilder", function() { return __WEBPACK_IMPORTED_MODULE_4__builders_validation_group_builder__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__events_model_state_changed_event__ = __webpack_require__(15);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ModelStateChangedEvent", function() { return __WEBPACK_IMPORTED_MODULE_5__events_model_state_changed_event__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__events_property_changed_event__ = __webpack_require__(7);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "PropertyChangedEvent", function() { return __WEBPACK_IMPORTED_MODULE_6__events_property_changed_event__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__events_property_state_changed_event__ = __webpack_require__(14);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "PropertyStateChangedEvent", function() { return __WEBPACK_IMPORTED_MODULE_7__events_property_state_changed_event__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__helpers_comparer_helper__ = __webpack_require__(3);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ComparerHelper", function() { return __WEBPACK_IMPORTED_MODULE_8__helpers_comparer_helper__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__helpers_type_helper__ = __webpack_require__(1);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TypeHelper", function() { return __WEBPACK_IMPORTED_MODULE_9__helpers_type_helper__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__factories_model_resolver_factory__ = __webpack_require__(8);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ModelResolverFactory", function() { return __WEBPACK_IMPORTED_MODULE_10__factories_model_resolver_factory__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__factories_model_watcher_factory__ = __webpack_require__(20);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ModelWatcherFactory", function() { return __WEBPACK_IMPORTED_MODULE_11__factories_model_watcher_factory__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__locales_en_us__ = __webpack_require__(46);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "locale", function() { return __WEBPACK_IMPORTED_MODULE_12__locales_en_us__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__localization_default_locale_handler__ = __webpack_require__(45);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DefaultLocaleHandler", function() { return __WEBPACK_IMPORTED_MODULE_13__localization_default_locale_handler__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__processors_field_error_processor__ = __webpack_require__(10);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FieldErrorProcessor", function() { return __WEBPACK_IMPORTED_MODULE_14__processors_field_error_processor__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__processors_field_has_error__ = __webpack_require__(11);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FieldHasError", function() { return __WEBPACK_IMPORTED_MODULE_15__processors_field_has_error__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__processors_validation_error__ = __webpack_require__(51);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ValidationError", function() { return __WEBPACK_IMPORTED_MODULE_16__processors_validation_error__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__promises_promise_counter__ = __webpack_require__(13);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "PromiseCounter", function() { return __WEBPACK_IMPORTED_MODULE_17__promises_promise_counter__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__proxy_model_proxy__ = __webpack_require__(52);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ModelProxy", function() { return __WEBPACK_IMPORTED_MODULE_18__proxy_model_proxy__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__resolvers_model_resolver__ = __webpack_require__(23);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ModelResolver", function() { return __WEBPACK_IMPORTED_MODULE_19__resolvers_model_resolver__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__rules_advanced_regex_rule__ = __webpack_require__(53);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AdvancedRegexValidationRule", function() { return __WEBPACK_IMPORTED_MODULE_20__rules_advanced_regex_rule__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__rules_date_validation_rule__ = __webpack_require__(26);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DateValidationRule", function() { return __WEBPACK_IMPORTED_MODULE_21__rules_date_validation_rule__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__rules_decimal_validation_rule__ = __webpack_require__(27);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DecimalValidationRule", function() { return __WEBPACK_IMPORTED_MODULE_22__rules_decimal_validation_rule__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__rules_email_validation_rule__ = __webpack_require__(28);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "EmailValidationRule", function() { return __WEBPACK_IMPORTED_MODULE_23__rules_email_validation_rule__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__rules_equal_validation_rule__ = __webpack_require__(29);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "EqualValidationRule", function() { return __WEBPACK_IMPORTED_MODULE_24__rules_equal_validation_rule__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__rules_iso_date_validation_rule__ = __webpack_require__(30);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ISODateValidationRule", function() { return __WEBPACK_IMPORTED_MODULE_25__rules_iso_date_validation_rule__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__rules_matches_validation_rule__ = __webpack_require__(40);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MatchesValidationRule", function() { return __WEBPACK_IMPORTED_MODULE_26__rules_matches_validation_rule__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__rules_max_length_validation_rule__ = __webpack_require__(31);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MaxLengthValidationRule", function() { return __WEBPACK_IMPORTED_MODULE_27__rules_max_length_validation_rule__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__rules_max_value_validation_rule__ = __webpack_require__(32);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MaxValueValidationRule", function() { return __WEBPACK_IMPORTED_MODULE_28__rules_max_value_validation_rule__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__rules_min_length_validation_rule__ = __webpack_require__(33);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MinLengthValidationRule", function() { return __WEBPACK_IMPORTED_MODULE_29__rules_min_length_validation_rule__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__rules_min_value_validation_rule__ = __webpack_require__(34);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MinValueValidationRule", function() { return __WEBPACK_IMPORTED_MODULE_30__rules_min_value_validation_rule__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__rules_not_equal_validation_rule__ = __webpack_require__(35);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "NotEqualValidationRule", function() { return __WEBPACK_IMPORTED_MODULE_31__rules_not_equal_validation_rule__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__rules_number_validation_rule__ = __webpack_require__(36);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "NumberValidationRule", function() { return __WEBPACK_IMPORTED_MODULE_32__rules_number_validation_rule__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__rules_regex_validation_rule__ = __webpack_require__(37);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RegexValidationRule", function() { return __WEBPACK_IMPORTED_MODULE_33__rules_regex_validation_rule__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__rules_required_validation_rule__ = __webpack_require__(38);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RequiredValidationRule", function() { return __WEBPACK_IMPORTED_MODULE_34__rules_required_validation_rule__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__rules_rule_registry__ = __webpack_require__(25);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RuleRegistry", function() { return __WEBPACK_IMPORTED_MODULE_35__rules_rule_registry__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__rules_step_validation_rule__ = __webpack_require__(39);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "StepValidationRule", function() { return __WEBPACK_IMPORTED_MODULE_36__rules_step_validation_rule__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__rulesets_for_each_rule__ = __webpack_require__(43);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ForEachRule", function() { return __WEBPACK_IMPORTED_MODULE_37__rulesets_for_each_rule__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__rulesets_rule_link__ = __webpack_require__(42);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RuleLink", function() { return __WEBPACK_IMPORTED_MODULE_38__rulesets_rule_link__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__rulesets_rule_resolver__ = __webpack_require__(2);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RuleResolver", function() { return __WEBPACK_IMPORTED_MODULE_39__rulesets_rule_resolver__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__rulesets_ruleset__ = __webpack_require__(9);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Ruleset", function() { return __WEBPACK_IMPORTED_MODULE_40__rulesets_ruleset__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__validation_groups_display_name_cache__ = __webpack_require__(17);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DisplayNameCache", function() { return __WEBPACK_IMPORTED_MODULE_41__validation_groups_display_name_cache__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__validation_groups_reactive_validation_group__ = __webpack_require__(19);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ReactiveValidationGroup", function() { return __WEBPACK_IMPORTED_MODULE_42__validation_groups_reactive_validation_group__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__validation_groups_validation_group__ = __webpack_require__(5);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ValidationGroup", function() { return __WEBPACK_IMPORTED_MODULE_43__validation_groups_validation_group__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__watcher_model_watcher__ = __webpack_require__(21);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ModelWatcher", function() { return __WEBPACK_IMPORTED_MODULE_44__watcher_model_watcher__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__watcher_property_watcher__ = __webpack_require__(22);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "PropertyWatcher", function() { return __WEBPACK_IMPORTED_MODULE_45__watcher_property_watcher__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__rules_composite_dynamic_composite_validation_rule__ = __webpack_require__(44);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DynamicCompositeValidationRule", function() { return __WEBPACK_IMPORTED_MODULE_46__rules_composite_dynamic_composite_validation_rule__["a"]; });

















































/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = createRuleset;
/* harmony export (immutable) */ __webpack_exports__["d"] = mergeRulesets;
/* harmony export (immutable) */ __webpack_exports__["a"] = createGroup;
/* harmony export (immutable) */ __webpack_exports__["e"] = supplementLocale;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__processors_field_error_processor__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__rulesets_rule_resolver__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__builders_validation_group_builder__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__rule_registry_setup__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__builders_ruleset_builder__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__localization_default_locale_handler__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__locales_en_us__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__rulesets_ruleset__ = __webpack_require__(9);








const defaultLocaleCode = "en-us";
const defaultLocaleHandler = new __WEBPACK_IMPORTED_MODULE_5__localization_default_locale_handler__["a" /* DefaultLocaleHandler */]();
defaultLocaleHandler.registerLocale(defaultLocaleCode, __WEBPACK_IMPORTED_MODULE_6__locales_en_us__["a" /* locale */]);
defaultLocaleHandler.useLocale(defaultLocaleCode);
const fieldErrorProcessor = new __WEBPACK_IMPORTED_MODULE_0__processors_field_error_processor__["a" /* FieldErrorProcessor */](__WEBPACK_IMPORTED_MODULE_3__rule_registry_setup__["a" /* ruleRegistry */], defaultLocaleHandler);
const ruleResolver = new __WEBPACK_IMPORTED_MODULE_1__rulesets_rule_resolver__["a" /* RuleResolver */]();
function createRuleset(basedUpon, withRuleVerification = false) {
    const rulesetBuilder = withRuleVerification ? new __WEBPACK_IMPORTED_MODULE_4__builders_ruleset_builder__["a" /* RulesetBuilder */](__WEBPACK_IMPORTED_MODULE_3__rule_registry_setup__["a" /* ruleRegistry */]) : new __WEBPACK_IMPORTED_MODULE_4__builders_ruleset_builder__["a" /* RulesetBuilder */]();
    return rulesetBuilder.create(basedUpon);
}
function mergeRulesets(rulesetA, rulesetB) {
    const newRuleset = new __WEBPACK_IMPORTED_MODULE_7__rulesets_ruleset__["a" /* Ruleset */]();
    newRuleset.rules = Object.assign({}, rulesetA.rules, rulesetB.rules);
    newRuleset.compositeRules = Object.assign({}, rulesetA.compositeRules, rulesetB.compositeRules);
    newRuleset.propertyDisplayNames = Object.assign({}, rulesetA.propertyDisplayNames, rulesetB.propertyDisplayNames);
    return newRuleset;
}
function createGroup() { return new __WEBPACK_IMPORTED_MODULE_2__builders_validation_group_builder__["a" /* ValidationGroupBuilder */](fieldErrorProcessor, ruleResolver, defaultLocaleHandler).create(); }
const localeHandler = defaultLocaleHandler;
/* harmony export (immutable) */ __webpack_exports__["c"] = localeHandler;

function supplementLocale(localeCode, localeResource) {
    defaultLocaleHandler.supplementLocaleFrom(localeCode, localeResource);
}


/***/ }),
/* 49 */
/***/ (function(module, exports) {

var PropertyResolver = (function () {
    function PropertyResolver() {
        var _this = this;
        this.indexRegex = /\[(\d)]/;
        this.splitRegex = /\./;
        this.resolveProperty = function (model, propertyChain) {
            var check = null, chain = [], lastkey = '';
            if (typeof propertyChain !== 'string') {
                throw new TypeError("propertyChain is not a string");
            }
            var processChain = function (key) {
                var arrayIndex = -1;
                if (_this.indexRegex.test(key)) {
                    arrayIndex = _this.indexRegex.exec(key)[1];
                    key = key.replace(_this.indexRegex, "");
                }
                if (check) {
                    if (typeof check === 'object') {
                        if (arrayIndex >= 0) {
                            if (arrayIndex < check[key].length) {
                                chain.push(check = check[key][arrayIndex]);
                                lastkey = key[arrayIndex];
                            }
                            else {
                                throw new TypeError('cannot find index "' + arrayIndex + '" in ' + lastkey);
                            }
                        }
                        else {
                            if (key in check) {
                                chain.push(check = check[key]);
                                lastkey = key;
                            }
                            else {
                                throw new TypeError('cannot resolve "' + key + '" in ' + lastkey);
                            }
                        }
                    }
                    else {
                        throw new TypeError('"' + check + '" ' + ' does not seem to be an object');
                    }
                }
                else {
                    if (arrayIndex >= 0) {
                        if (key.length == 0) {
                            chain.push(check = model[arrayIndex]);
                            lastkey = arrayIndex;
                        }
                        else {
                            chain.push(check = model[key][arrayIndex]);
                            lastkey = key[arrayIndex];
                        }
                    }
                    else {
                        lastkey = key;
                        chain.push(check = model[key]);
                    }
                }
            };
            var propertyRouteSections = propertyChain.split(_this.splitRegex);
            propertyRouteSections.forEach(processChain);
            return chain[chain.length - 1];
        };
    }
    PropertyResolver.prototype.decomposePropertyRoute = function (propertyRoute) {
        var routeComponents = [];
        var arrayIndex;
        var splitRoutes = propertyRoute.split(this.splitRegex);
        for (var i = 0; i < splitRoutes.length; i++) {
            if (this.indexRegex.test(splitRoutes[i])) {
                arrayIndex = this.indexRegex.exec(splitRoutes[i])[1];
                routeComponents.push(splitRoutes[i].replace(this.indexRegex, ""));
                routeComponents.push("[" + arrayIndex + "]");
            }
            else {
                routeComponents.push(splitRoutes[i]);
            }
        }
        return routeComponents;
    };
    PropertyResolver.prototype.getPropertyRouteSection = function (propertyRoute, sectionIndex) {
        if (sectionIndex === void 0) { sectionIndex = 0; }
        var routeComponents = this.decomposePropertyRoute(propertyRoute);
        return routeComponents[sectionIndex];
    };
    PropertyResolver.prototype.buildPropertyRoute = function (propertySections) {
        var propertyRoute = "";
        for (var i = 0; i < propertySections.length; i++) {
            if (propertyRoute.length == 0) {
                propertyRoute += propertySections[i];
                continue;
            }
            if (propertySections[i].indexOf("[") >= 0) {
                propertyRoute += "" + propertySections[i];
                continue;
            }
            propertyRoute += "." + propertySections[i];
        }
        return propertyRoute;
    };
    return PropertyResolver;
})();
exports.PropertyResolver = PropertyResolver;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var event_listener_1 = __webpack_require__(16);
var EventHandler = (function () {
    function EventHandler(sender) {
        var _this = this;
        this.sender = sender;
        this.listeners = [];
        this.subscribe = function (callback, predicate) {
            _this.listeners.push(new event_listener_1.EventListener(callback, predicate));
            return function () { _this.unsubscribe(callback); };
        };
        this.unsubscribe = function (callback) {
            for (var i = 0; i < _this.listeners.length; i++) {
                if (_this.listeners[i].callback == callback) {
                    _this.listeners.splice(i, 1);
                    return;
                }
            }
        };
        this.unsubscribeAll = function () {
            _this.listeners = [];
        };
        this.publish = function (args) {
            _this.listeners.forEach(function (eventListener) {
                if (eventListener.predicate) {
                    if (eventListener.predicate(args)) {
                        setTimeout(function () { eventListener.callback(args, _this.sender); }, 1);
                    }
                }
                else {
                    setTimeout(function () { eventListener.callback(args, _this.sender); }, 1);
                }
            });
        };
        this.publishSync = function (args) {
            _this.listeners.forEach(function (eventListener) {
                if (eventListener.predicate) {
                    if (eventListener.predicate(args)) {
                        eventListener.callback(args, _this.sender);
                    }
                }
                else {
                    eventListener.callback(args, _this.sender);
                }
            });
        };
        this.getSubscriptionCount = function () {
            return _this.listeners.length;
        };
    }
    return EventHandler;
})();
exports.EventHandler = EventHandler;


/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class ValidationError {
    constructor(propertyName, message) {
        this.propertyName = propertyName;
        this.message = message;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ValidationError;



/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_event_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_event_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_event_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__events_property_changed_event__ = __webpack_require__(7);


class ModelProxy {
    constructor() {
        this.proxyObject = (model, ruleset) => { return this.walkModelAndProxy(model, null, ruleset); };
        this.createHandler = (propertyRoute) => {
            const propertyChangedRaiser = this.onPropertyChanged;
            return {
                set: function (obj, prop, value) {
                    const currentValue = obj[prop];
                    if (currentValue !== value) {
                        Reflect.set(obj, prop, value);
                        const propertyChangedArgs = new __WEBPACK_IMPORTED_MODULE_1__events_property_changed_event__["a" /* PropertyChangedEvent */](propertyRoute, value, currentValue);
                        setTimeout(() => { propertyChangedRaiser.publish(propertyChangedArgs); }, 1);
                    }
                    return true;
                },
                get: function (obj, prop) {
                    return Reflect.get(obj, prop);
                }
            };
        };
        this.proxyProperty = (obj, propertyRoute) => {
            return new Proxy(obj, this.createHandler(propertyRoute));
        };
        this.walkModelAndProxy = (parent, currentRoute, ruleset) => {
            let paramRoute;
            let parameterRules;
            for (const param in ruleset.rules) {
                paramRoute = currentRoute ? currentRoute + "." + param : param;
                parameterRules = ruleset.rules[param];
                let isArray = false;
                let isObject = false;
                parameterRules.forEach((rule) => {
                    const nextProperty = parent[param];
                    isArray = rule.isForEach;
                    if (isArray) {
                        nextProperty.forEach((element, index) => {
                            if (rule.internalRule.getRulesForProperty) {
                                nextProperty[index] = this.walkModelAndProxy(element, `${paramRoute}[${index}]`, rule.internalRule);
                            }
                        });
                    }
                    else {
                        if (rule.getRulesForProperty) {
                            isObject = true;
                            parent[param] = this.walkModelAndProxy(nextProperty, paramRoute, rule);
                        }
                    }
                });
                if (isArray || isObject) {
                    parent[param] = this.proxyProperty(parent[param], paramRoute);
                }
            }
            return this.proxyProperty(parent, currentRoute);
        };
        this.onPropertyChanged = new __WEBPACK_IMPORTED_MODULE_0_event_js__["EventHandler"](this);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ModelProxy;



/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_type_helper__ = __webpack_require__(1);


class AdvancedRegexValidationRule {
    constructor(ruleName, expression) {
        if (!ruleName || ruleName.length == 0) {
            throw new Error("ruleName is required, an empty rule name is invalid");
        }
        if (!expression || expression.length == 0) {
            throw new Error("expression is required, an empty regex expression is invalid");
        }
        this.ruleName = ruleName;
        this.expression = expression;
    }
    validate(modelResolver, propertyName, regexPattern) {
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __awaiter */](this, void 0, void 0, function* () {
            const value = modelResolver.resolve(propertyName);
            if (__WEBPACK_IMPORTED_MODULE_1__helpers_type_helper__["a" /* TypeHelper */].isEmptyValue(value)) {
                return true;
            }
            return value.toString().match(this.expression) !== null;
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AdvancedRegexValidationRule;



/***/ })
/******/ ]);
});