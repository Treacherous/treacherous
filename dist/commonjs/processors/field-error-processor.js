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
var field_has_error_1 = require("./field-has-error");
var FieldErrorProcessor = (function () {
    function FieldErrorProcessor(ruleRegistry) {
        this.ruleRegistry = ruleRegistry;
    }
    // Validates a single property against a model
    FieldErrorProcessor.prototype.processRuleLink = function (modelResolver, propertyName, ruleLink) {
        return __awaiter(this, void 0, void 0, function () {
            var shouldRuleApply, validator, options, isValid, error;
            return __generator(this, function (_a) {
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
                        if (ruleLink.messageOverride) {
                            if (typeof (ruleLink.messageOverride) === "function") {
                                error = (ruleLink.messageOverride)(modelResolver, propertyName, ruleLink.ruleOptions);
                            }
                            else {
                                error = ruleLink.messageOverride;
                            }
                        }
                        else {
                            error = validator.getMessage(modelResolver, propertyName, ruleLink.ruleOptions);
                        }
                        throw new field_has_error_1.FieldHasError(error);
                }
            });
        });
    };
    // Loops through each rule on a property, adds it to a chain, then calls Promise.all
    // Probably not correct, as they won't fire sequentially? Promises need to be chained
    FieldErrorProcessor.prototype.checkFieldForErrors = function (modelResolver, propertyName, rules) {
        var _this = this;
        var ruleCheck = function (ruleLinkOrSet) {
            return _this.processRuleLink(modelResolver, propertyName, ruleLinkOrSet);
        };
        var checkEachRule = function (rules) {
            var promises = [];
            rules.forEach(function (rule) {
                promises.push(ruleCheck(rule));
            });
            return Promise.all(promises);
        };
        return Promise.resolve(rules)
            .then(checkEachRule)
            .then(function () { return null; })
            .catch(function (validationError) {
            return validationError.message;
        });
    };
    return FieldErrorProcessor;
}());
exports.FieldErrorProcessor = FieldErrorProcessor;
