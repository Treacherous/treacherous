var assert = chai.assert;
var expect = chai.expect;

describe('Rule registry', function () {

    it('should correctly get rule for name', function () {
        var requiredRule = new Treacherous.RequiredValidationRule();

        var ruleRegistry = new Treacherous.RuleRegistry();
        ruleRegistry.registerRule(requiredRule);

        var returnedRule = ruleRegistry.getRuleNamed(requiredRule.ruleName);
        expect(returnedRule).to.equal(requiredRule)
    });

    it('should return null for missing rule', function () {
        var ruleRegistry = new Treacherous.RuleRegistry();

        var returnedRule = ruleRegistry.getRuleNamed("doesn't-exist");
        expect(returnedRule).to.be.null;
    });

});