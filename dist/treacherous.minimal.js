(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("bluebird"), require("property-resolver"), require("eventjs"));
	else if(typeof define === 'function' && define.amd)
		define(["bluebird", "property-resolver", "eventjs"], factory);
	else if(typeof exports === 'object')
		exports["Treacherous"] = factory(require("bluebird"), require("property-resolver"), require("eventjs"));
	else
		root["Treacherous"] = factory(root["bluebird"], root["property-resolver"], root["eventjs"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_6__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* This is an auto-generated file by gulp-es6-exporter */
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(1));
	__export(__webpack_require__(3));
	__export(__webpack_require__(7));
	__export(__webpack_require__(8));
	__export(__webpack_require__(2));
	__export(__webpack_require__(18));
	__export(__webpack_require__(10));
	__export(__webpack_require__(11));
	__export(__webpack_require__(12));
	__export(__webpack_require__(36));
	__export(__webpack_require__(14));
	__export(__webpack_require__(15));
	__export(__webpack_require__(16));
	__export(__webpack_require__(17));
	__export(__webpack_require__(19));
	__export(__webpack_require__(37));
	__export(__webpack_require__(20));
	__export(__webpack_require__(21));
	__export(__webpack_require__(22));
	__export(__webpack_require__(23));
	__export(__webpack_require__(24));
	__export(__webpack_require__(25));
	__export(__webpack_require__(26));
	__export(__webpack_require__(27));
	__export(__webpack_require__(13));
	__export(__webpack_require__(28));
	__export(__webpack_require__(32));
	__export(__webpack_require__(31));
	__export(__webpack_require__(9));
	__export(__webpack_require__(29));
	__export(__webpack_require__(30));
	__export(__webpack_require__(38));
	__export(__webpack_require__(33));
	__export(__webpack_require__(35));
	__export(__webpack_require__(34));


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var validation_group_factory_1 = __webpack_require__(2);
	var field_error_processor_1 = __webpack_require__(11);
	var rule_registry_1 = __webpack_require__(13);
	var date_validation_rule_1 = __webpack_require__(14);
	var decimal_validation_rule_1 = __webpack_require__(15);
	var email_validation_rule_1 = __webpack_require__(16);
	var equal_validation_rule_1 = __webpack_require__(17);
	var iso_date_validation_rule_1 = __webpack_require__(19);
	var max_length_validation_rule_1 = __webpack_require__(20);
	var max_value_validation_rule_1 = __webpack_require__(21);
	var min_length_validation_rule_1 = __webpack_require__(22);
	var min_value_validation_rule_1 = __webpack_require__(23);
	var not_equal_validation_rule_1 = __webpack_require__(24);
	var number_validation_rule_1 = __webpack_require__(25);
	var regex_validation_rule_1 = __webpack_require__(26);
	var required_validation_rule_1 = __webpack_require__(27);
	var step_validation_rule_1 = __webpack_require__(28);
	var ruleset_builder_1 = __webpack_require__(29);
	var model_watcher_1 = __webpack_require__(33);
	var property_resolver_1 = __webpack_require__(5);
	var rule_resolver_1 = __webpack_require__(9);
	exports.ruleRegistry = new rule_registry_1.RuleRegistry();
	exports.ruleRegistry.registerRule(new date_validation_rule_1.DateValidationRule());
	exports.ruleRegistry.registerRule(new decimal_validation_rule_1.DecimalValidationRule());
	exports.ruleRegistry.registerRule(new email_validation_rule_1.EmailValidationRule());
	exports.ruleRegistry.registerRule(new equal_validation_rule_1.EqualValidationRule());
	exports.ruleRegistry.registerRule(new iso_date_validation_rule_1.ISODateValidationRule());
	exports.ruleRegistry.registerRule(new max_length_validation_rule_1.MaxLengthValidationRule());
	exports.ruleRegistry.registerRule(new max_value_validation_rule_1.MaxValueValidationRule());
	exports.ruleRegistry.registerRule(new min_length_validation_rule_1.MinLengthValidationRule());
	exports.ruleRegistry.registerRule(new min_value_validation_rule_1.MinValueValidationRule());
	exports.ruleRegistry.registerRule(new not_equal_validation_rule_1.NotEqualValidationRule());
	exports.ruleRegistry.registerRule(new number_validation_rule_1.NumberValidationRule());
	exports.ruleRegistry.registerRule(new regex_validation_rule_1.RegexValidationRule());
	exports.ruleRegistry.registerRule(new required_validation_rule_1.RequiredValidaitonRule());
	exports.ruleRegistry.registerRule(new step_validation_rule_1.StepValidationRule());
	var fieldErrorProcessor = new field_error_processor_1.FieldErrorProcessor(exports.ruleRegistry);
	var modelWatcher = new model_watcher_1.ModelWatcher();
	var propertyResolver = new property_resolver_1.PropertyResolver();
	var ruleResolver = new rule_resolver_1.RuleResolver();
	var validationGroupFactory = new validation_group_factory_1.ValidationGroupFactory(fieldErrorProcessor, modelWatcher, propertyResolver, ruleResolver);
	function createRuleset() {
	    return new ruleset_builder_1.RulesetBuilder().create();
	}
	exports.createRuleset = createRuleset;
	function createWithRules(model, rulesCreator) {
	    var ruleset = rulesCreator(new ruleset_builder_1.RulesetBuilder());
	    return validationGroupFactory.createValidationGroup(model, ruleset);
	}
	exports.createWithRules = createWithRules;
	function create(model, ruleset) {
	    return validationGroupFactory.createValidationGroup(model, ruleset);
	}
	exports.create = create;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var validation_group_1 = __webpack_require__(3);
	var ValidationGroupFactory = (function () {
	    function ValidationGroupFactory(fieldErrorProcessor, modelWatcher, propertyResolver, ruleResolver) {
	        var _this = this;
	        this.fieldErrorProcessor = fieldErrorProcessor;
	        this.modelWatcher = modelWatcher;
	        this.propertyResolver = propertyResolver;
	        this.ruleResolver = ruleResolver;
	        this.createValidationGroup = function (model, ruleset) {
	            return new validation_group_1.ValidationGroup(_this.fieldErrorProcessor, _this.modelWatcher, _this.propertyResolver, _this.ruleResolver, ruleset, model);
	        };
	    }
	    return ValidationGroupFactory;
	})();
	exports.ValidationGroupFactory = ValidationGroupFactory;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var Promise = __webpack_require__(4);
	var property_resolver_1 = __webpack_require__(5);
	var eventjs_1 = __webpack_require__(6);
	var property_validation_changed_event_1 = __webpack_require__(7);
	var validation_state_changed_event_1 = __webpack_require__(8);
	var rule_resolver_1 = __webpack_require__(9);
	var type_helper_1 = __webpack_require__(10);
	var ValidationGroup = (function () {
	    function ValidationGroup(fieldErrorProcessor, modelWatcher, propertyResolver, ruleResolver, ruleset, model, refreshRate) {
	        var _this = this;
	        if (propertyResolver === void 0) { propertyResolver = new property_resolver_1.PropertyResolver(); }
	        if (ruleResolver === void 0) { ruleResolver = new rule_resolver_1.RuleResolver(); }
	        if (refreshRate === void 0) { refreshRate = 500; }
	        this.fieldErrorProcessor = fieldErrorProcessor;
	        this.modelWatcher = modelWatcher;
	        this.propertyResolver = propertyResolver;
	        this.ruleResolver = ruleResolver;
	        this.ruleset = ruleset;
	        this.model = model;
	        this.refreshRate = refreshRate;
	        this.propertyErrors = {};
	        this.activeValidators = 0;
	        this.onModelChanged = function (eventArgs) {
	            _this.validateProperty(eventArgs.propertyPath);
	        };
	        this.validatePropertyWithRuleLinks = function (propertyName, propertyRules) {
	            var handlePossibleError = function (possibleError) {
	                var hadErrors = _this.hasErrors();
	                if (!possibleError) {
	                    if (_this.propertyErrors[propertyName]) {
	                        delete _this.propertyErrors[propertyName];
	                        var eventArgs = new property_validation_changed_event_1.PropertyValidationChangedEvent(propertyName, true);
	                        _this.propertyChangedEvent.publish(eventArgs);
	                        if (hadErrors) {
	                            _this.validationStateChangedEvent.publish(new validation_state_changed_event_1.ValidationStateChangedEvent(true));
	                        }
	                    }
	                    return;
	                }
	                var previousError = _this.propertyErrors[propertyName];
	                _this.propertyErrors[propertyName] = possibleError;
	                if (possibleError != previousError) {
	                    var eventArgs = new property_validation_changed_event_1.PropertyValidationChangedEvent(propertyName, false, possibleError);
	                    _this.propertyChangedEvent.publish(eventArgs);
	                    if (!hadErrors) {
	                        _this.validationStateChangedEvent.publish(new validation_state_changed_event_1.ValidationStateChangedEvent(false));
	                    }
	                }
	            };
	            _this.activeValidators++;
	            if (_this.activePromiseChain) {
	                _this.activePromiseChain = Promise.resolve(_this.activePromiseChain)
	                    .then(function () {
	                    var fieldValue = _this.propertyResolver.resolveProperty(_this.model, propertyName);
	                    return _this.fieldErrorProcessor
	                        .checkFieldForErrors(fieldValue, propertyRules)
	                        .then(handlePossibleError);
	                })
	                    .tap(function () { _this.activeValidators--; });
	            }
	            else {
	                var fieldValue = _this.propertyResolver.resolveProperty(_this.model, propertyName);
	                _this.activePromiseChain = _this.fieldErrorProcessor
	                    .checkFieldForErrors(fieldValue, propertyRules)
	                    .then(handlePossibleError)
	                    .tap(function () { _this.activeValidators--; });
	            }
	        };
	        this.validatePropertyWithRuleSet = function (propertyName, ruleset) {
	            var promiseList = [];
	            var transformedPropertyName;
	            for (var childPropertyName in ruleset.rules) {
	                transformedPropertyName = propertyName + "." + childPropertyName;
	                promiseList.push(_this.validatePropertyWithRules(transformedPropertyName, ruleset.getRulesForProperty(childPropertyName)));
	            }
	            return Promise.all(promiseList);
	        };
	        this.validatePropertyWithRules = function (propertyName, rules) {
	            var ruleLinks = [];
	            var ruleSets = [];
	            var validationPromises = [];
	            var routeEachRule = function (ruleLinkOrSet) {
	                if (_this.isForEach(ruleLinkOrSet)) {
	                    var currentPropertyValue = _this.propertyResolver.resolveProperty(_this.model, propertyName);
	                    var isCurrentlyAnArray = type_helper_1.TypeHelper.isArrayType(currentPropertyValue);
	                    if (isCurrentlyAnArray) {
	                        currentPropertyValue.forEach(function (element, index) {
	                            var childPropertyName = propertyName + "[" + index + "]";
	                            var promise = _this.validatePropertyWithRules(childPropertyName, [ruleLinkOrSet.internalRule]);
	                            validationPromises.push(promise);
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
	            validationPromises.push(_this.validatePropertyWithRuleLinks(propertyName, ruleLinks));
	            ruleSets.forEach(function (ruleSet) {
	                validationPromises.push(_this.validatePropertyWithRuleSet(propertyName, ruleSet));
	            });
	            return Promise.all(validationPromises);
	        };
	        this.validateProperty = function (propertyName) {
	            var rulesForProperty = _this.ruleResolver.resolvePropertyRules(propertyName, _this.ruleset);
	            if (!rulesForProperty) {
	                return;
	            }
	            if (_this.activePromiseChain && _this.activePromiseChain.isFulfilled()) {
	                _this.activePromiseChain = null;
	            }
	            return _this.validatePropertyWithRules(propertyName, rulesForProperty);
	        };
	        this.validateModel = function () {
	            for (var parameterName in _this.ruleset.rules) {
	                _this.validateProperty(parameterName);
	            }
	        };
	        this.hasErrors = function () {
	            return Object.keys(_this.propertyErrors).length > 0;
	        };
	        this.isValid = function () {
	            return _this.waitForValidatorsToFinish()
	                .then(function () { return !_this.hasErrors(); });
	        };
	        this.getErrors = function () {
	            return _this.waitForValidatorsToFinish()
	                .then(function () { return _this.propertyErrors; });
	        };
	        this.release = function () {
	            _this.modelWatcher.stopWatching();
	        };
	        this.waitForValidatorsToFinish = function () {
	            return new Promise(function (resolve, reject) {
	                var interval = setInterval(function () {
	                    if (_this.activeValidators == 0) {
	                        clearInterval(interval);
	                        resolve();
	                    }
	                }, 50);
	            });
	        };
	        this.propertyChangedEvent = new eventjs_1.EventHandler(this);
	        this.validationStateChangedEvent = new eventjs_1.EventHandler(this);
	        this.modelWatcher.setupWatcher(model, ruleset, refreshRate);
	        this.modelWatcher.onPropertyChanged.subscribe(this.onModelChanged);
	        this.validateModel();
	    }
	    ValidationGroup.prototype.isRuleset = function (possibleRuleset) {
	        return (typeof (possibleRuleset.addRule) == "function");
	    };
	    ValidationGroup.prototype.isForEach = function (possibleForEach) {
	        return possibleForEach.isForEach;
	    };
	    return ValidationGroup;
	})();
	exports.ValidationGroup = ValidationGroup;


/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ },
/* 7 */
/***/ function(module, exports) {

	var PropertyValidationChangedEvent = (function () {
	    function PropertyValidationChangedEvent(property, isValid, error) {
	        this.property = property;
	        this.isValid = isValid;
	        this.error = error;
	    }
	    return PropertyValidationChangedEvent;
	})();
	exports.PropertyValidationChangedEvent = PropertyValidationChangedEvent;


/***/ },
/* 8 */
/***/ function(module, exports) {

	var ValidationStateChangedEvent = (function () {
	    function ValidationStateChangedEvent(isValid) {
	        this.isValid = isValid;
	    }
	    return ValidationStateChangedEvent;
	})();
	exports.ValidationStateChangedEvent = ValidationStateChangedEvent;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var property_resolver_1 = __webpack_require__(5);
	var RuleResolver = (function () {
	    function RuleResolver(propertyResolver) {
	        var _this = this;
	        if (propertyResolver === void 0) { propertyResolver = new property_resolver_1.PropertyResolver(); }
	        this.propertyResolver = propertyResolver;
	        this.isPropertyRoute = function (possiblePropertyRoute) {
	            return possiblePropertyRoute.indexOf(".") >= 0;
	        };
	        this.isIndexRoute = function (possibleIndexRoute) {
	            return possibleIndexRoute.indexOf("[") >= 0;
	        };
	        this.resolvePropertyRules = function (propertyRoute, ruleset) {
	            var propertyRouteSections = _this.propertyResolver.decomposePropertyRoute(propertyRoute);
	            var finalProperty = propertyRouteSections[propertyRouteSections.length - 1];
	            if (propertyRouteSections.length == 1) {
	                return ruleset.getRulesForProperty(propertyRoute);
	            }
	            var matchingRules = _this.traverseRulesForRoutes(propertyRouteSections, ruleset);
	            if (!matchingRules) {
	                return null;
	            }
	            if (matchingRules.getRulesForProperty) {
	                return matchingRules.getRulesForProperty(finalProperty);
	            }
	            return matchingRules;
	        };
	        this.getMatchingRuleForProperty = function (property, rules) {
	            var currentRule;
	            for (var i = 0; i < rules.length; i++) {
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
	        this.traverseRulesForRoutes = function (propertyRouteSections, ruleset) {
	            var currentProperty = propertyRouteSections.shift();
	            var childRules = ruleset.rules[currentProperty];
	            if (!childRules) {
	                return null;
	            }
	            if (propertyRouteSections.length == 0) {
	                return childRules;
	            }
	            var nextProperty = propertyRouteSections[0];
	            if (!nextProperty) {
	                return ruleset;
	            }
	            if (_this.isIndexRoute(nextProperty)) {
	                propertyRouteSections.shift();
	                nextProperty = propertyRouteSections[0];
	            }
	            if (propertyRouteSections.length == 0) {
	                return childRules;
	            }
	            var nextChildRule = _this.getMatchingRuleForProperty(nextProperty, childRules);
	            if (propertyRouteSections.length > 0) {
	                return _this.traverseRulesForRoutes(propertyRouteSections, nextChildRule);
	            }
	            return nextChildRule;
	        };
	    }
	    return RuleResolver;
	})();
	exports.RuleResolver = RuleResolver;


/***/ },
/* 10 */
/***/ function(module, exports) {

	var TypeHelper = (function () {
	    function TypeHelper() {
	    }
	    TypeHelper.isDateType = function (value) {
	        return (typeof value.getMonth === 'function');
	    };
	    TypeHelper.isSimpleType = function (value) {
	        return (typeof value == "string" || typeof value == "number");
	    };
	    TypeHelper.isArrayType = function (value) {
	        return Object.prototype.toString.call(value) === '[object Array]';
	    };
	    return TypeHelper;
	})();
	exports.TypeHelper = TypeHelper;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var Promise = __webpack_require__(4);
	var field_has_error_1 = __webpack_require__(12);
	var FieldErrorProcessor = (function () {
	    function FieldErrorProcessor(ruleRegistry) {
	        this.ruleRegistry = ruleRegistry;
	    }
	    FieldErrorProcessor.prototype.processRuleLink = function (fieldValue, ruleLink) {
	        var validator = this.ruleRegistry.getRuleNamed(ruleLink.ruleName);
	        var checkIfValid = function (isValid) {
	            if (!isValid) {
	                var error = validator.getMessage(fieldValue, ruleLink.ruleOptions);
	                throw new field_has_error_1.FieldHasError(error);
	            }
	            return null;
	        };
	        return validator
	            .validate(fieldValue, ruleLink.ruleOptions)
	            .then(checkIfValid);
	    };
	    FieldErrorProcessor.prototype.checkFieldForErrors = function (fieldValue, rules) {
	        var _this = this;
	        var ruleCheck = function (ruleLinkOrSet) {
	            return _this.processRuleLink(fieldValue, ruleLinkOrSet);
	        };
	        return Promise.resolve(rules)
	            .each(ruleCheck)
	            .then(function () { return null; })
	            .catch(field_has_error_1.FieldHasError, function (validationError) {
	            return validationError.message;
	        });
	    };
	    return FieldErrorProcessor;
	})();
	exports.FieldErrorProcessor = FieldErrorProcessor;


/***/ },
/* 12 */
/***/ function(module, exports) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var FieldHasError = (function (_super) {
	    __extends(FieldHasError, _super);
	    function FieldHasError(message) {
	        _super.call(this, message);
	        this.message = message;
	    }
	    return FieldHasError;
	})(Error);
	exports.FieldHasError = FieldHasError;


/***/ },
/* 13 */
/***/ function(module, exports) {

	var RuleRegistry = (function () {
	    function RuleRegistry() {
	        var _this = this;
	        this.rules = {};
	        this.registerRule = function (validationRule) {
	            _this.rules[validationRule.ruleName] = validationRule;
	        };
	        this.unregisterRule = function (validationRule) {
	            delete _this.rules[validationRule.ruleName];
	        };
	        this.getRuleNamed = function (ruleName) {
	            return _this.rules[ruleName];
	        };
	    }
	    return RuleRegistry;
	})();
	exports.RuleRegistry = RuleRegistry;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var Promise = __webpack_require__(4);
	var DateValidationRule = (function () {
	    function DateValidationRule() {
	        this.ruleName = "date";
	        this.invalidObjectRegex = /Invalid|NaN/;
	    }
	    DateValidationRule.prototype.validate = function (value) {
	        if (value === undefined || value === null) {
	            return Promise.resolve(true);
	        }
	        var matchesRegex = !this.invalidObjectRegex.test(new Date(value));
	        return Promise.resolve(matchesRegex);
	    };
	    DateValidationRule.prototype.getMessage = function (value) {
	        return "This field contains \"" + value + "\" which is not a valid date";
	    };
	    return DateValidationRule;
	})();
	exports.DateValidationRule = DateValidationRule;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var Promise = __webpack_require__(4);
	var DecimalValidationRule = (function () {
	    function DecimalValidationRule() {
	        this.ruleName = "decimal";
	        this.decimalRegex = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/;
	    }
	    DecimalValidationRule.prototype.validate = function (value) {
	        if (value === undefined || value === null) {
	            return Promise.resolve(true);
	        }
	        var matchesRegex = this.decimalRegex.test(value);
	        return Promise.resolve(matchesRegex);
	    };
	    DecimalValidationRule.prototype.getMessage = function (value) {
	        return "This field contains " + value + " which is not a decimal value";
	    };
	    return DecimalValidationRule;
	})();
	exports.DecimalValidationRule = DecimalValidationRule;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var Promise = __webpack_require__(4);
	var EmailValidationRule = (function () {
	    function EmailValidationRule() {
	        this.ruleName = "email";
	        this.emailRegex = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/;
	    }
	    EmailValidationRule.prototype.validate = function (value) {
	        if (value === undefined || value === null) {
	            return Promise.resolve(true);
	        }
	        var matchesRegex = this.emailRegex.test(value);
	        return Promise.resolve(matchesRegex);
	    };
	    EmailValidationRule.prototype.getMessage = function (value) {
	        return "This field contains \"" + value + "\" which is not a valid email address";
	    };
	    return EmailValidationRule;
	})();
	exports.EmailValidationRule = EmailValidationRule;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var Promise = __webpack_require__(4);
	var type_helper_1 = __webpack_require__(10);
	var comparer_helper_1 = __webpack_require__(18);
	var EqualValidationRule = (function () {
	    function EqualValidationRule() {
	        this.ruleName = "equal";
	    }
	    EqualValidationRule.prototype.validate = function (value, optionsOrValue) {
	        if (value === undefined || value === null) {
	            return Promise.resolve(true);
	        }
	        var result;
	        var comparison = optionsOrValue.value || optionsOrValue;
	        var weakEquality = optionsOrValue.weakEquality || false;
	        if (type_helper_1.TypeHelper.isDateType(comparison)) {
	            result = comparer_helper_1.ComparerHelper.dateTimeCompararer(value, comparison);
	        }
	        else {
	            result = comparer_helper_1.ComparerHelper.simpleTypeComparer(value, comparison, weakEquality);
	        }
	        return Promise.resolve(result);
	    };
	    EqualValidationRule.prototype.getMessage = function (value, optionsOrValue) {
	        return "This field is " + value + " but should be equal to " + (optionsOrValue.value || optionsOrValue);
	    };
	    return EqualValidationRule;
	})();
	exports.EqualValidationRule = EqualValidationRule;


/***/ },
/* 18 */
/***/ function(module, exports) {

	var ComparerHelper = (function () {
	    function ComparerHelper() {
	    }
	    ComparerHelper.simpleTypeComparer = function (value1, value2, isWeak) {
	        if (isWeak) {
	            return (value1 == value2);
	        }
	        return (value1 === value2);
	    };
	    ComparerHelper.dateTimeCompararer = function (value1, value2) { return (value1.getTime() == value2.getTime()); };
	    return ComparerHelper;
	})();
	exports.ComparerHelper = ComparerHelper;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var Promise = __webpack_require__(4);
	var ISODateValidationRule = (function () {
	    function ISODateValidationRule() {
	        this.ruleName = "isoDate";
	        this.isoDateRegex = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/;
	    }
	    ISODateValidationRule.prototype.validate = function (value) {
	        if (value === undefined || value === null) {
	            return Promise.resolve(true);
	        }
	        var matchesRegex = this.isoDateRegex.test(value);
	        return Promise.resolve(matchesRegex);
	    };
	    ISODateValidationRule.prototype.getMessage = function (value) {
	        return "This field contains \"" + value + "\" which is not a valid ISO date";
	    };
	    return ISODateValidationRule;
	})();
	exports.ISODateValidationRule = ISODateValidationRule;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var Promise = __webpack_require__(4);
	var MaxLengthValidationRule = (function () {
	    function MaxLengthValidationRule() {
	        this.ruleName = "maxLength";
	    }
	    MaxLengthValidationRule.prototype.validate = function (value, maxLength) {
	        if (value === undefined || value === null || value.length == 0) {
	            return Promise.resolve(true);
	        }
	        if (value.length <= maxLength) {
	            return Promise.resolve(true);
	        }
	        return Promise.resolve(false);
	    };
	    MaxLengthValidationRule.prototype.getMessage = function (value, maxLength) {
	        return "This field has a length of " + value.length + " but should contain no more than " + maxLength;
	    };
	    return MaxLengthValidationRule;
	})();
	exports.MaxLengthValidationRule = MaxLengthValidationRule;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var Promise = __webpack_require__(4);
	var MaxValueValidationRule = (function () {
	    function MaxValueValidationRule() {
	        this.ruleName = "maxValue";
	    }
	    MaxValueValidationRule.prototype.validate = function (value, maxValue) {
	        if (value === undefined || value === null || value.length == 0) {
	            return Promise.resolve(true);
	        }
	        if (value <= maxValue) {
	            return Promise.resolve(true);
	        }
	        return Promise.resolve(false);
	    };
	    MaxValueValidationRule.prototype.getMessage = function (value, maxValue) {
	        return "This field has a value of " + value + " but should be less than or equal to " + maxValue;
	    };
	    return MaxValueValidationRule;
	})();
	exports.MaxValueValidationRule = MaxValueValidationRule;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var Promise = __webpack_require__(4);
	var MinLengthValidationRule = (function () {
	    function MinLengthValidationRule() {
	        this.ruleName = "minLength";
	    }
	    MinLengthValidationRule.prototype.validate = function (value, minLength) {
	        if (value === undefined || value === null || value.length == 0) {
	            return Promise.resolve(true);
	        }
	        if (value.length >= minLength) {
	            return Promise.resolve(true);
	        }
	        return Promise.resolve(false);
	    };
	    MinLengthValidationRule.prototype.getMessage = function (value, minLength) {
	        return "This field has a length of " + value.length + " but should more than " + minLength;
	    };
	    return MinLengthValidationRule;
	})();
	exports.MinLengthValidationRule = MinLengthValidationRule;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var Promise = __webpack_require__(4);
	var MinValueValidationRule = (function () {
	    function MinValueValidationRule() {
	        this.ruleName = "minValue";
	    }
	    MinValueValidationRule.prototype.validate = function (value, minValue) {
	        if (value === undefined || value === null || value.length == 0) {
	            return Promise.resolve(true);
	        }
	        if (value >= minValue) {
	            return Promise.resolve(true);
	        }
	        return Promise.resolve(false);
	    };
	    MinValueValidationRule.prototype.getMessage = function (value, minValue) {
	        return "This field has a value of " + value + " but should be greater than or equal to " + minValue;
	    };
	    return MinValueValidationRule;
	})();
	exports.MinValueValidationRule = MinValueValidationRule;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var Promise = __webpack_require__(4);
	var type_helper_1 = __webpack_require__(10);
	var comparer_helper_1 = __webpack_require__(18);
	var NotEqualValidationRule = (function () {
	    function NotEqualValidationRule() {
	        this.ruleName = "notEqual";
	    }
	    NotEqualValidationRule.prototype.validate = function (value, optionsOrValue) {
	        if (value === undefined || value === null) {
	            return Promise.resolve(true);
	        }
	        var result;
	        var comparison = optionsOrValue.value || optionsOrValue;
	        var weakEquality = optionsOrValue.weakEquality || false;
	        if (type_helper_1.TypeHelper.isDateType(comparison)) {
	            result = !comparer_helper_1.ComparerHelper.dateTimeCompararer(value, comparison);
	        }
	        else {
	            result = !comparer_helper_1.ComparerHelper.simpleTypeComparer(value, comparison, weakEquality);
	        }
	        return Promise.resolve(result);
	    };
	    NotEqualValidationRule.prototype.getMessage = function (value, optionsOrValue) {
	        return "This field is " + value + " but should not be equal to " + (optionsOrValue.value || optionsOrValue);
	    };
	    return NotEqualValidationRule;
	})();
	exports.NotEqualValidationRule = NotEqualValidationRule;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var Promise = __webpack_require__(4);
	var NumberValidationRule = (function () {
	    function NumberValidationRule() {
	        this.ruleName = "number";
	        this.numberRegex = /^\d+$/;
	    }
	    NumberValidationRule.prototype.validate = function (value) {
	        if (value === undefined || value === null) {
	            return Promise.resolve(true);
	        }
	        var matchesRegex = this.numberRegex.test(value);
	        return Promise.resolve(matchesRegex);
	    };
	    NumberValidationRule.prototype.getMessage = function (value) {
	        return "This field contains " + value + " which is not a numeric value";
	    };
	    return NumberValidationRule;
	})();
	exports.NumberValidationRule = NumberValidationRule;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var Promise = __webpack_require__(4);
	var RegexValidationRule = (function () {
	    function RegexValidationRule() {
	        this.ruleName = "regex";
	    }
	    RegexValidationRule.prototype.validate = function (value, regexPattern) {
	        if (value === undefined || value === null || value.length == 0) {
	            return Promise.resolve(true);
	        }
	        var matchesPattern = value.toString().match(regexPattern) !== null;
	        return Promise.resolve(matchesPattern);
	    };
	    RegexValidationRule.prototype.getMessage = function (value, regexPattern) {
	        return "This field does not match the expected format";
	    };
	    return RegexValidationRule;
	})();
	exports.RegexValidationRule = RegexValidationRule;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var Promise = __webpack_require__(4);
	var RequiredValidaitonRule = (function () {
	    function RequiredValidaitonRule() {
	        this.ruleName = "required";
	    }
	    RequiredValidaitonRule.prototype.validate = function (value, isRequired) {
	        if (isRequired === void 0) { isRequired = true; }
	        if (value === undefined || value === null) {
	            return Promise.resolve(!isRequired);
	        }
	        var testValue = value;
	        if (typeof (testValue) === 'string') {
	            if (String.prototype.trim) {
	                testValue = value.trim();
	            }
	            else {
	                testValue = value.replace(/^\s+|\s+$/g, '');
	            }
	        }
	        if (!isRequired) {
	            return Promise.resolve(true);
	        }
	        return Promise.resolve((testValue + '').length > 0);
	    };
	    RequiredValidaitonRule.prototype.getMessage = function (value, isRequired) {
	        return "This field is required";
	    };
	    return RequiredValidaitonRule;
	})();
	exports.RequiredValidaitonRule = RequiredValidaitonRule;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var Promise = __webpack_require__(4);
	var StepValidationRule = (function () {
	    function StepValidationRule() {
	        this.ruleName = "step";
	    }
	    StepValidationRule.prototype.validate = function (value, step) {
	        if (value === undefined || value === null) {
	            return Promise.resolve(true);
	        }
	        var dif = (value * 100) % (step * 100);
	        var matchesStep = Math.abs(dif) < 0.00001 || Math.abs(1 - dif) < 0.00001;
	        return Promise.resolve(matchesStep);
	    };
	    StepValidationRule.prototype.getMessage = function (value, step) {
	        return "This field has a value of " + value + " and should be an increment of " + step;
	    };
	    return StepValidationRule;
	})();
	exports.StepValidationRule = StepValidationRule;


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var ruleset_1 = __webpack_require__(30);
	var rule_link_1 = __webpack_require__(31);
	var for_each_rule_1 = __webpack_require__(32);
	var RulesetBuilder = (function () {
	    function RulesetBuilder() {
	        var _this = this;
	        this.create = function () {
	            _this.internalRuleset = new ruleset_1.Ruleset();
	            _this.currentProperty = null;
	            return _this;
	        };
	        this.forProperty = function (propertyName) {
	            _this.currentProperty = propertyName;
	            return _this;
	        };
	        this.addRule = function (rule, ruleOptions) {
	            if (!_this.currentProperty) {
	                throw new Error("A property must precede any rule calls in the chain");
	            }
	            _this.internalRuleset.addRule(_this.currentProperty, new rule_link_1.RuleLink(rule, ruleOptions));
	            return _this;
	        };
	        this.addRuleForEach = function (rule, ruleOptions) {
	            if (!_this.currentProperty) {
	                throw new Error("A property must precede any rule calls in the chain");
	            }
	            var ruleLink = new rule_link_1.RuleLink(rule, ruleOptions);
	            _this.internalRuleset.addRule(_this.currentProperty, new for_each_rule_1.ForEachRule(ruleLink));
	            return _this;
	        };
	        this.addRuleset = function (ruleset) {
	            if (!_this.currentProperty) {
	                throw new Error("A property must precede any rule calls in the chain");
	            }
	            _this.internalRuleset.addRuleset(_this.currentProperty, ruleset);
	            return _this;
	        };
	        this.addRulesetForEach = function (ruleset) {
	            if (!_this.currentProperty) {
	                throw new Error("A property must precede any rule calls in the chain");
	            }
	            _this.internalRuleset.addRuleset(_this.currentProperty, new for_each_rule_1.ForEachRule(ruleset));
	            return _this;
	        };
	        this.build = function () {
	            return _this.internalRuleset;
	        };
	    }
	    return RulesetBuilder;
	})();
	exports.RulesetBuilder = RulesetBuilder;


/***/ },
/* 30 */
/***/ function(module, exports) {

	var Ruleset = (function () {
	    function Ruleset() {
	        var _this = this;
	        this.rules = {};
	        this.createPropertyEntryIfNeeded = function (property) {
	            if (!_this.rules[property]) {
	                _this.rules[property] = [];
	            }
	        };
	        this.addRule = function (property, ruleLink) {
	            _this.createPropertyEntryIfNeeded(property);
	            _this.rules[property].push(ruleLink);
	        };
	        this.addRuleset = function (property, ruleset) {
	            _this.createPropertyEntryIfNeeded(property);
	            _this.rules[property].push(ruleset);
	        };
	        this.getRulesForProperty = function (property) { return _this.rules[property]; };
	    }
	    return Ruleset;
	})();
	exports.Ruleset = Ruleset;


/***/ },
/* 31 */
/***/ function(module, exports) {

	var RuleLink = (function () {
	    function RuleLink(ruleName, ruleOptions) {
	        this.ruleName = ruleName;
	        this.ruleOptions = ruleOptions;
	    }
	    return RuleLink;
	})();
	exports.RuleLink = RuleLink;


/***/ },
/* 32 */
/***/ function(module, exports) {

	var ForEachRule = (function () {
	    function ForEachRule(internalRule) {
	        this.internalRule = internalRule;
	        this.isForEach = true;
	    }
	    return ForEachRule;
	})();
	exports.ForEachRule = ForEachRule;


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var property_resolver_1 = __webpack_require__(5);
	var eventjs_1 = __webpack_require__(6);
	var type_helper_1 = __webpack_require__(10);
	var property_watcher_1 = __webpack_require__(34);
	var property_changed_event_1 = __webpack_require__(35);
	var ModelWatcher = (function () {
	    function ModelWatcher(propertyResolver) {
	        var _this = this;
	        if (propertyResolver === void 0) { propertyResolver = new property_resolver_1.PropertyResolver(); }
	        this.propertyResolver = propertyResolver;
	        this.watchCache = [];
	        this.watchCacheKeys = [];
	        this.watcherInterval = null;
	        this.setupWatcher = function (model, ruleset, scanInterval) {
	            if (scanInterval === void 0) { scanInterval = 500; }
	            _this.model = model;
	            _this.ruleset = ruleset;
	            _this.scanInterval = scanInterval;
	            _this.watchCache = [];
	            _this.watchCacheKeys = [];
	            _this.cacheWatchTargets("", _this.ruleset);
	            _this.scanProperties();
	            _this.startWatching();
	        };
	        this.startWatching = function () {
	            _this.stopWatching();
	            _this.watcherInterval = setInterval(_this.scanProperties, _this.scanInterval);
	        };
	        this.stopWatching = function () {
	            if (_this.watcherInterval) {
	                clearInterval(_this.watcherInterval);
	            }
	        };
	        this.updateAndNotifyDifferences = function () {
	            var previousKeyCache = _this.watchCacheKeys;
	            _this.watchCache = [];
	            _this.watchCacheKeys = [];
	            _this.cacheWatchTargets("", _this.ruleset);
	            _this.watchCacheKeys.forEach(function (key, index) {
	                if (previousKeyCache.indexOf(key) == -1) {
	                    var previousValue = _this.watchCache[index].previousValue;
	                    var propertyChangedArgs = new property_changed_event_1.PropertyChangedEvent(key, previousValue, null);
	                    setTimeout(function () { _this.onPropertyChanged.publish(propertyChangedArgs); }, 1);
	                }
	            });
	        };
	        this.watchProperty = function (watchRoute, previousData) {
	            if (_this.watchCacheKeys.indexOf(watchRoute) == -1) {
	                var propertyWatcher = new property_watcher_1.PropertyWatcher(watchRoute, previousData);
	                _this.watchCache.push(propertyWatcher);
	                _this.watchCacheKeys.push(watchRoute);
	            }
	        };
	        this.cacheWatchTargets = function (propertyStack, ruleset) {
	            var paramRoute, parameterRules;
	            for (var param in ruleset.rules) {
	                paramRoute = propertyStack ? propertyStack + "." + param : param;
	                parameterRules = ruleset.rules[param];
	                parameterRules.forEach(function (rule) {
	                    var currentValue = _this.propertyResolver.resolveProperty(_this.model, paramRoute);
	                    var isArray = type_helper_1.TypeHelper.isArrayType(currentValue);
	                    if (isArray) {
	                        var cachedArrayInfo = { length: currentValue.length, isArray: true };
	                        _this.watchProperty(paramRoute, cachedArrayInfo);
	                    }
	                    if (rule.isForEach) {
	                        // ruleset
	                        if (rule.internalRule.getRulesForProperty) {
	                            _this.model[param].forEach(function (element, index) {
	                                _this.cacheWatchTargets(paramRoute + "[" + index + "]", rule.internalRule);
	                            });
	                        }
	                        else {
	                            _this.model[param].forEach(function (element, index) {
	                                _this.watchProperty(paramRoute + "[" + index + "]", _this.model[param][index]);
	                            });
	                        }
	                    }
	                    else {
	                        // ruleset
	                        if (rule.getRulesForProperty) {
	                            _this.cacheWatchTargets(paramRoute, rule);
	                        }
	                        else {
	                            if (!isArray) {
	                                _this.watchProperty(paramRoute, currentValue);
	                            }
	                        }
	                    }
	                });
	            }
	        };
	        this.scanProperties = function () {
	            if (_this.onPropertyChanged.getSubscriptionCount() == 0) {
	                return;
	            }
	            if (_this.watchCache.length == 0) {
	                return;
	            }
	            var refreshOnNextCycle = false;
	            _this.watchCache.forEach(function (propertyWatcher) {
	                var currentValue = _this.propertyResolver.resolveProperty(_this.model, propertyWatcher.propertyPath);
	                if (currentValue && propertyWatcher.previousValue.isArray) {
	                    if (currentValue.length != propertyWatcher.previousValue.length) {
	                        refreshOnNextCycle = true;
	                    }
	                }
	                else if (currentValue !== propertyWatcher.previousValue) {
	                    var propertyChangedArgs = new property_changed_event_1.PropertyChangedEvent(propertyWatcher.propertyPath, currentValue, propertyWatcher.previousValue);
	                    setTimeout(function () { _this.onPropertyChanged.publish(propertyChangedArgs); }, 1);
	                    propertyWatcher.previousValue = currentValue;
	                }
	            });
	            if (refreshOnNextCycle) {
	                setTimeout(_this.updateAndNotifyDifferences, 1);
	            }
	        };
	        this.onPropertyChanged = new eventjs_1.EventHandler(this);
	    }
	    return ModelWatcher;
	})();
	exports.ModelWatcher = ModelWatcher;


/***/ },
/* 34 */
/***/ function(module, exports) {

	var PropertyWatcher = (function () {
	    function PropertyWatcher(propertyPath, previousValue) {
	        this.propertyPath = propertyPath;
	        this.previousValue = previousValue;
	    }
	    return PropertyWatcher;
	})();
	exports.PropertyWatcher = PropertyWatcher;


/***/ },
/* 35 */
/***/ function(module, exports) {

	var PropertyChangedEvent = (function () {
	    function PropertyChangedEvent(propertyPath, newValue, oldValue) {
	        this.propertyPath = propertyPath;
	        this.newValue = newValue;
	        this.oldValue = oldValue;
	    }
	    return PropertyChangedEvent;
	})();
	exports.PropertyChangedEvent = PropertyChangedEvent;


/***/ },
/* 36 */
/***/ function(module, exports) {

	var ValidationError = (function () {
	    function ValidationError(propertyName, message) {
	        this.propertyName = propertyName;
	        this.message = message;
	    }
	    return ValidationError;
	})();
	exports.ValidationError = ValidationError;


/***/ },
/* 37 */
/***/ function(module, exports) {

	


/***/ },
/* 38 */
/***/ function(module, exports) {

	


/***/ }
/******/ ])
});
;