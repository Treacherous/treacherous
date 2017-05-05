System.register(["../rulesets/rule-resolver", "./validation-group"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || (function () {
        var extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __moduleName = context_1 && context_1.id;
    var rule_resolver_1, validation_group_1, ReactiveValidationGroup;
    return {
        setters: [
            function (rule_resolver_1_1) {
                rule_resolver_1 = rule_resolver_1_1;
            },
            function (validation_group_1_1) {
                validation_group_1 = validation_group_1_1;
            }
        ],
        execute: function () {
            ReactiveValidationGroup = (function (_super) {
                __extends(ReactiveValidationGroup, _super);
                function ReactiveValidationGroup(fieldErrorProcessor, ruleResolver, modelResolverFactory, modelWatcherFactory, model, ruleset, refreshRate) {
                    if (ruleResolver === void 0) { ruleResolver = new rule_resolver_1.RuleResolver(); }
                    if (refreshRate === void 0) { refreshRate = 500; }
                    var _this = _super.call(this, fieldErrorProcessor, ruleResolver, modelResolverFactory, model, ruleset) || this;
                    _this.modelWatcherFactory = modelWatcherFactory;
                    _this.refreshRate = refreshRate;
                    _this.onModelChanged = function (eventArgs) {
                        _this.startValidateProperty(eventArgs.propertyPath);
                    };
                    _this.release = function () {
                        if (_this.modelWatcher)
                            _this.modelWatcher.stopWatching();
                    };
                    _this.modelWatcher = _this.modelWatcherFactory.createModelWatcher();
                    _this.modelWatcher.setupWatcher(model, ruleset, refreshRate);
                    _this.modelWatcher.onPropertyChanged.subscribe(_this.onModelChanged);
                    return _this;
                }
                return ReactiveValidationGroup;
            }(validation_group_1.ValidationGroup));
            exports_1("ReactiveValidationGroup", ReactiveValidationGroup);
        }
    };
});
