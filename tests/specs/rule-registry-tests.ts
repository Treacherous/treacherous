import {describe, it} from "mocha";
import {expect} from "chai";
import {RuleRegistry} from "../../src/rules/rule-registry";
import {RequiredValidationRule} from "../../src/rules/required-validation-rule";

describe('Rule registry', function () {

    it('should correctly get rule for name', function () {
        const requiredRule = new RequiredValidationRule();

        const ruleRegistry = new RuleRegistry();
        ruleRegistry.registerRule(requiredRule);

        const returnedRule = ruleRegistry.getRuleNamed(requiredRule.ruleName);
        expect(returnedRule).to.equal(requiredRule)
    });

    it('should return null for missing rule', function () {
        const ruleRegistry = new RuleRegistry();

        const returnedRule = ruleRegistry.getRuleNamed("doesn't-exist");
        expect(returnedRule).to.be.null;
    });

});