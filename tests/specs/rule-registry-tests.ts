import {expect} from "chai";
import {RuleRegistry} from "../../src/rules/rule-registry";
import {RequiredValidationRule} from "../../src/rules/required-validation-rule";

describe('Rule registry', function () {

    it('should correctly resolve rule for name', function () {
        var requiredRule = new RequiredValidationRule();

        var ruleRegistry = new RuleRegistry();
        ruleRegistry.registerRule(requiredRule);

        var returnedRule = ruleRegistry.getRuleNamed(requiredRule.ruleName);
        expect(returnedRule).to.equal(requiredRule)
    });

    it('should return null for missing rule', function () {
        var ruleRegistry = new RuleRegistry();

        var returnedRule = ruleRegistry.getRuleNamed("doesn't-exist");
        expect(returnedRule).to.be.null;
    });

});