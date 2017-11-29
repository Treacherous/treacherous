"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var type_helper_1 = require("../helpers/type-helper");
var comparer_helper_1 = require("../helpers/comparer-helper");
var MatchesValidationRule = /** @class */ (function () {
    function MatchesValidationRule() {
        this.ruleName = "matches";
    }
    MatchesValidationRule.prototype.validate = function (modelResolver, propertyName, optionsOrProperty) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var fieldToMatch, weakEquality, value, matchingFieldValue;
            return tslib_1.__generator(this, function (_a) {
                fieldToMatch = optionsOrProperty.property || optionsOrProperty;
                weakEquality = optionsOrProperty.weakEquality || false;
                value = modelResolver.resolve(propertyName);
                matchingFieldValue = modelResolver.resolve(fieldToMatch);
                if (value === undefined || value === null) {
                    return [2 /*return*/, (matchingFieldValue === undefined || matchingFieldValue === null)];
                }
                else if (type_helper_1.TypeHelper.isDateType(value)) {
                    return [2 /*return*/, comparer_helper_1.ComparerHelper.dateTimeCompararer(value, matchingFieldValue)];
                }
                else {
                    return [2 /*return*/, comparer_helper_1.ComparerHelper.simpleTypeComparer(value, matchingFieldValue, weakEquality)];
                }
                return [2 /*return*/];
            });
        });
    };
    return MatchesValidationRule;
}());
exports.MatchesValidationRule = MatchesValidationRule;
