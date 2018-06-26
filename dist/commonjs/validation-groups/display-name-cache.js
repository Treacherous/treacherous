"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var type_helper_1 = require("../helpers/type-helper");
var DisplayNameCache = /** @class */ (function () {
    function DisplayNameCache() {
        var _this = this;
        this.propertySanitizerRegex = /\[(.*?)]/g;
        this.propertyNameOverrideCache = {};
        this.recurseTree = function (ruleset, currentPropertyRoute) {
            var _loop_1 = function (propertyKey) {
                var nextRoute = _this.updateRouteName(currentPropertyRoute, propertyKey);
                var appliedRules = ruleset.rules[propertyKey];
                appliedRules.forEach(function (ruleOrSet) {
                    if (type_helper_1.TypeHelper.isForEach(ruleOrSet) && type_helper_1.TypeHelper.isRuleset(ruleOrSet.internalRule)) {
                        _this.recurseTree(ruleOrSet.internalRule, nextRoute);
                    }
                    if (type_helper_1.TypeHelper.isRuleset(ruleOrSet)) {
                        _this.recurseTree(ruleOrSet, nextRoute);
                    }
                });
            };
            for (var propertyKey in ruleset.rules) {
                _loop_1(propertyKey);
            }
            if (Object.keys(ruleset.propertyDisplayNames).length == 0) {
                return;
            }
            for (var propertyKey in ruleset.propertyDisplayNames) {
                var routeName = _this.updateRouteName(currentPropertyRoute, propertyKey);
                _this.propertyNameOverrideCache[routeName] = ruleset.propertyDisplayNames[propertyKey];
            }
        };
        this.updateRouteName = function (currentRoute, nextPart) {
            return currentRoute.length > 0 ? currentRoute + "." + nextPart : nextPart;
        };
        this.cacheDisplayNamesFor = function (rootRuleset) {
            _this.recurseTree(rootRuleset, "");
        };
        this.getDisplayNameFor = function (propertyRoute) {
            var sanitisedDisplayName = propertyRoute.replace(_this.propertySanitizerRegex, "");
            return _this.propertyNameOverrideCache[sanitisedDisplayName] || propertyRoute;
        };
    }
    return DisplayNameCache;
}());
exports.DisplayNameCache = DisplayNameCache;
