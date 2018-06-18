import 'mocha';
import {expect} from "chai";
import {RulesetBuilder} from "../../src/builders/ruleset-builder";
import {RuleResolver} from "../../src/rulesets/rule-resolver";

describe('Rule resolver', function () {

    it('should correctly resolve a property name to a rule', function () {
        const rulesetBuilder = new RulesetBuilder();

        const ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRule("required", true)
            .build();

        const propertyRoute = "foo";

        const ruleResolver = new RuleResolver();
        const locatedRules = ruleResolver.resolvePropertyRules(propertyRoute, ruleset);

        expect(locatedRules).not.to.be.null;
        expect(locatedRules.length).to.equal(1);
        expect(locatedRules[0].ruleName).to.equal("required");
        expect(locatedRules[0].ruleOptions).to.be.true;
    });

    it('should correctly resolve a property route to a rule', function () {
        const rulesetBuilder = new RulesetBuilder();

        const nestedRuleset = rulesetBuilder.create()
            .forProperty("bar")
            .addRule("required", true)
            .addRule("maxLength", 10)
            .build();

        const ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRuleset(nestedRuleset)
            .build();

        const propertyRoute = "foo.bar";

        const ruleResolver = new RuleResolver();
        const locatedRules = ruleResolver.resolvePropertyRules(propertyRoute, ruleset);

        expect(locatedRules).not.to.be.null;
        expect(locatedRules.length).to.equal(2);
        expect(locatedRules[0].ruleName).to.equal("required");
        expect(locatedRules[0].ruleOptions).to.be.true;
        expect(locatedRules[1].ruleName).to.equal("maxLength");
        expect(locatedRules[1].ruleOptions).to.equal(10);
    });

    it('should correctly resolve a property route ending in an array to a rule', function () {
        const rulesetBuilder = new RulesetBuilder();

        const nestedRuleset = rulesetBuilder.create()
            .forProperty("bar")
            .addRuleForEach("maxLength", 10)
            .build();

        const ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRuleset(nestedRuleset)
            .build();

        const propertyRoute = "foo.bar[0]";

        const ruleResolver = new RuleResolver();
        const locatedRules = ruleResolver.resolvePropertyRules(propertyRoute, ruleset);

        expect(locatedRules).not.to.be.null;
        expect(locatedRules.length).to.equal(1);
        expect(locatedRules[0].ruleName).to.equal("maxLength");
        expect(locatedRules[0].ruleOptions).to.equal(10);
    });

    it('should only resolve array child property rules and not array container rules', function () {
        const rulesetBuilder = new RulesetBuilder();

        const ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRule("maxLength", 2)
            .addRuleForEach("maxValue", 10)
            .build();

        const propertyRoute = "foo[0]";

        const ruleResolver = new RuleResolver();
        const locatedRules = ruleResolver.resolvePropertyRules(propertyRoute, ruleset);

        expect(locatedRules).not.to.be.null;
        expect(locatedRules.length).to.equal(1);
        expect(locatedRules[0].ruleName).to.equal("maxValue");
        expect(locatedRules[0].ruleOptions).to.equal(10);
    });

    it('should correctly resolve a property route with foreach ruleset', function () {
        const rulesetBuilder = new RulesetBuilder();
        const elementRuleset = rulesetBuilder.create()
            .forProperty("bar")
            .addRule("required")
            .addRule("maxLength", 5)
            .build();

        const ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRulesetForEach(elementRuleset)
            .build();

        const propertyRoute = "foo[1].bar";

        const ruleResolver = new RuleResolver();
        const locatedRules = ruleResolver.resolvePropertyRules(propertyRoute, ruleset);

        expect(locatedRules).not.to.be.null;
        expect(locatedRules.length).to.equal(2);
        expect(locatedRules[0].ruleName).to.equal("required");
        expect(locatedRules[1].ruleName).to.equal("maxLength");
        expect(locatedRules[1].ruleOptions).to.equal(5);
    });

    it('should correctly resolve a property route with a foreach to a rule', function () {
        const rulesetBuilder = new RulesetBuilder();

        const nestedRuleset = rulesetBuilder.create()
            .forProperty("woo")
            .addRule("required", true)
            .addRule("maxLength", 10)
            .build();

        const forEachRuleset = rulesetBuilder.create()
            .forProperty("bar")
            .addRulesetForEach(nestedRuleset)
            .build();

        const ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRuleset(forEachRuleset)
            .build();

        const propertyRoute = "foo.bar[2].woo";

        const ruleResolver = new RuleResolver();
        const locatedRules = ruleResolver.resolvePropertyRules(propertyRoute, ruleset);

        expect(locatedRules).not.to.be.null;
        expect(locatedRules.length).to.equal(2);
        expect(locatedRules[0].ruleName).to.equal("required");
        expect(locatedRules[0].ruleOptions).to.be.true;
        expect(locatedRules[1].ruleName).to.equal("maxLength");
        expect(locatedRules[1].ruleOptions).to.equal(10);
    });

});