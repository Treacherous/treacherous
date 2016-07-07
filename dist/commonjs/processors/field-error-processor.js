var field_has_error_1 = require("./field-has-error");
var FieldErrorProcessor = (function () {
    function FieldErrorProcessor(ruleRegistry) {
        this.ruleRegistry = ruleRegistry;
    }
    FieldErrorProcessor.prototype.processRuleLink = function (fieldValue, ruleLink) {
        var validator = this.ruleRegistry.getRuleNamed(ruleLink.ruleName);
        var checkIfValid = function (isValid) {
            if (!isValid) {
                var error;
                if (ruleLink.messageOverride) {
                    if (typeof (ruleLink.messageOverride) === "function") {
                        error = (ruleLink.messageOverride)(fieldValue, ruleLink.ruleOptions);
                    }
                    else {
                        error = ruleLink.messageOverride;
                    }
                }
                else {
                    error = validator.getMessage(fieldValue, ruleLink.ruleOptions);
                }
                throw new field_has_error_1.FieldHasError(error);
            }
            return Promise.resolve();
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
})();
exports.FieldErrorProcessor = FieldErrorProcessor;
