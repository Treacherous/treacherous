"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var DefaultLocaleHandler = /** @class */ (function () {
    function DefaultLocaleHandler() {
        var _this = this;
        this.localeResources = {};
        this.getCurrentLocale = function () { return _this.localeCode; };
        this.registerLocale = function (localeCode, localeResource) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.localeCode = localeCode;
                this.localeResources[this.localeCode] = localeResource;
                return [2 /*return*/];
            });
        }); };
        this.useLocale = function (localeCode) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                if (!this.localeResources[localeCode]) {
                    throw "Unable to find registered locale for [" + localeCode + "]";
                }
                this.localeCode = localeCode;
                return [2 /*return*/];
            });
        }); };
        this.supplementLocaleFrom = function (localeCode, localeModule) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var propertyName;
            return tslib_1.__generator(this, function (_a) {
                if (!this.localeResources[localeCode]) {
                    this.localeResources[localeCode] = {};
                }
                for (propertyName in localeModule) {
                    this.localeResources[localeCode][propertyName] = localeModule[propertyName];
                }
                return [2 /*return*/];
            });
        }); };
        this.getMessage = function (ruleName, ruleOptions, modelResolver, propertyName) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var currentLocale, ruleResource, propertyValue;
            return tslib_1.__generator(this, function (_a) {
                currentLocale = this.localeResources[this.localeCode];
                ruleResource = currentLocale[ruleName] || currentLocale["default"] || "Cannot find rule for " + ruleName;
                if (typeof ruleResource === "string") {
                    return [2 /*return*/, ruleResource];
                }
                if (ruleResource.length === 3 || propertyName == null) {
                    return [2 /*return*/, ruleResource(modelResolver, propertyName, ruleOptions)];
                }
                propertyValue = modelResolver.resolve(propertyName);
                return [2 /*return*/, ruleResource(propertyValue, ruleOptions)];
            });
        }); };
    }
    return DefaultLocaleHandler;
}());
exports.DefaultLocaleHandler = DefaultLocaleHandler;
