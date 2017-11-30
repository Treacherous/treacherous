"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var field_has_error_1 = require("./field-has-error");
var FieldErrorProcessor = /** @class */ (function () {
    function FieldErrorProcessor(ruleRegistry, localeHandler) {
        this.ruleRegistry = ruleRegistry;
        this.localeHandler = localeHandler;
    }
    FieldErrorProcessor.prototype.processRuleLink = function (modelResolver, propertyName, ruleLink) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var shouldRuleApply, validator, options, isValid, error;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        shouldRuleApply = ruleLink.appliesIf === true
                            || ((typeof (ruleLink.appliesIf) === "function")
                                ? (ruleLink.appliesIf)(modelResolver, propertyName, ruleLink.ruleOptions)
                                : false);
                        if (!shouldRuleApply) {
                            return [2 /*return*/];
                        }
                        validator = this.ruleRegistry.getRuleNamed(ruleLink.ruleName);
                        options = (typeof ruleLink.ruleOptions == "function") ? ruleLink.ruleOptions() : ruleLink.ruleOptions;
                        return [4 /*yield*/, validator.validate(modelResolver, propertyName, options)];
                    case 1:
                        isValid = _a.sent();
                        if (isValid) {
                            return [2 /*return*/];
                        }
                        if (!ruleLink.messageOverride) return [3 /*break*/, 2];
                        if (typeof (ruleLink.messageOverride) === "function") {
                            error = (ruleLink.messageOverride)(modelResolver, propertyName, ruleLink.ruleOptions);
                        }
                        else {
                            error = ruleLink.messageOverride;
                        }
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.localeHandler.getMessage(ruleLink.ruleName, ruleLink.ruleOptions, modelResolver, propertyName)];
                    case 3:
                        error = _a.sent();
                        _a.label = 4;
                    case 4: throw new field_has_error_1.FieldHasError(error);
                }
            });
        });
    };
    FieldErrorProcessor.prototype.checkFieldForErrors = function (modelResolver, propertyName, rules) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ruleCheck, checkEachRule;
            return tslib_1.__generator(this, function (_a) {
                ruleCheck = function (ruleLinkOrSet) {
                    return _this.processRuleLink(modelResolver, propertyName, ruleLinkOrSet);
                };
                checkEachRule = function (rules) {
                    var promises = [];
                    rules.forEach(function (rule) {
                        promises.push(ruleCheck(rule));
                    });
                    return Promise.all(promises);
                };
                return [2 /*return*/, Promise.resolve(rules)
                        .then(checkEachRule)
                        .then(function () { return null; })
                        .catch(function (validationError) {
                        return validationError.message;
                    })];
            });
        });
    };
    return FieldErrorProcessor;
}());
exports.FieldErrorProcessor = FieldErrorProcessor;
