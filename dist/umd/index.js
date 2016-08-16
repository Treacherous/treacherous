(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./exposer", "./rule-registry-setup", "./builders/reactive-validation-group-builder", "./builders/ruleset-builder", "./builders/validation-group-builder", "./events/model-state-changed-event", "./events/property-changed-event", "./events/property-state-changed-event", "./factories/model-resolver-factory", "./factories/model-watcher-factory", "./helpers/comparer-helper", "./helpers/type-helper", "./processors/field-error-processor", "./processors/field-has-error", "./processors/validation-error", "./promises/promise-counter", "./resolvers/model-resolver", "./rules/advanced-regex-rule", "./rules/date-validation-rule", "./rules/decimal-validation-rule", "./rules/email-validation-rule", "./rules/equal-validation-rule", "./rules/iso-date-validation-rule", "./rules/matches-validation-rule", "./rules/max-length-validation-rule", "./rules/max-value-validation-rule", "./rules/min-length-validation-rule", "./rules/min-value-validation-rule", "./rules/not-equal-validation-rule", "./rules/number-validation-rule", "./rules/regex-validation-rule", "./rules/required-validation-rule", "./rules/rule-registry", "./rules/step-validation-rule", "./rulesets/for-each-rule", "./rulesets/rule-link", "./rulesets/rule-resolver", "./rulesets/ruleset", "./validation-groups/reactive-validation-group", "./validation-groups/validation-group", "./watcher/model-watcher", "./watcher/property-watcher"], factory);
    }
})(function (require, exports) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    __export(require("./exposer"));
    __export(require("./rule-registry-setup"));
    __export(require("./builders/reactive-validation-group-builder"));
    __export(require("./builders/ruleset-builder"));
    __export(require("./builders/validation-group-builder"));
    __export(require("./events/model-state-changed-event"));
    __export(require("./events/property-changed-event"));
    __export(require("./events/property-state-changed-event"));
    __export(require("./factories/model-resolver-factory"));
    __export(require("./factories/model-watcher-factory"));
    __export(require("./helpers/comparer-helper"));
    __export(require("./helpers/type-helper"));
    __export(require("./processors/field-error-processor"));
    __export(require("./processors/field-has-error"));
    __export(require("./processors/validation-error"));
    __export(require("./promises/promise-counter"));
    __export(require("./resolvers/model-resolver"));
    __export(require("./rules/advanced-regex-rule"));
    __export(require("./rules/date-validation-rule"));
    __export(require("./rules/decimal-validation-rule"));
    __export(require("./rules/email-validation-rule"));
    __export(require("./rules/equal-validation-rule"));
    __export(require("./rules/iso-date-validation-rule"));
    __export(require("./rules/matches-validation-rule"));
    __export(require("./rules/max-length-validation-rule"));
    __export(require("./rules/max-value-validation-rule"));
    __export(require("./rules/min-length-validation-rule"));
    __export(require("./rules/min-value-validation-rule"));
    __export(require("./rules/not-equal-validation-rule"));
    __export(require("./rules/number-validation-rule"));
    __export(require("./rules/regex-validation-rule"));
    __export(require("./rules/required-validation-rule"));
    __export(require("./rules/rule-registry"));
    __export(require("./rules/step-validation-rule"));
    __export(require("./rulesets/for-each-rule"));
    __export(require("./rulesets/rule-link"));
    __export(require("./rulesets/rule-resolver"));
    __export(require("./rulesets/ruleset"));
    __export(require("./validation-groups/reactive-validation-group"));
    __export(require("./validation-groups/validation-group"));
    __export(require("./watcher/model-watcher"));
    __export(require("./watcher/property-watcher"));
});
