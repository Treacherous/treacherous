;
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
