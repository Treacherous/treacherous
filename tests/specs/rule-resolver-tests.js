var assert = chai.assert;
var expect = chai.expect;

describe('Rule resolver', function () {

    it('should correctly resolve a property name to a rule', function () {
        var rulesetBuilder = new Treacherous.RulesetBuilder();

        var ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRule("required", true)
            .build();

        var propertyRoute = "foo";

        var ruleResolver = new Treacherous.RuleResolver();
        var locatedRules = ruleResolver.resolvePropertyRules(propertyRoute, ruleset);

        expect(locatedRules).not.to.be.null;
        expect(locatedRules.length).to.equal(1);
        expect(locatedRules[0].ruleName).to.equal("required");
        expect(locatedRules[0].ruleOptions).to.be.true;
    });

    it('should correctly resolve a property route to a rule', function () {
        var rulesetBuilder = new Treacherous.RulesetBuilder();

        var nestedRuleset = rulesetBuilder.create()
            .forProperty("bar")
            .addRule("required", true)
            .addRule("maxLength", 10)
            .build();

        var ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRuleset(nestedRuleset)
            .build();

        var propertyRoute = "foo.bar";

        var ruleResolver = new Treacherous.RuleResolver();
        var locatedRules = ruleResolver.resolvePropertyRules(propertyRoute, ruleset);

        expect(locatedRules).not.to.be.null;
        expect(locatedRules.length).to.equal(2);
        expect(locatedRules[0].ruleName).to.equal("required");
        expect(locatedRules[0].ruleOptions).to.be.true;
        expect(locatedRules[1].ruleName).to.equal("maxLength");
        expect(locatedRules[1].ruleOptions).to.equal(10);
    });

    it('should correctly resolve a property route ending in an array to a rule', function () {
        var rulesetBuilder = new Treacherous.RulesetBuilder();

        var nestedRuleset = rulesetBuilder.create()
            .forProperty("bar")
            .addRuleForEach("maxLength", 10)
            .build();

        var ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRuleset(nestedRuleset)
            .build();

        var propertyRoute = "foo.bar[0]";

        var ruleResolver = new Treacherous.RuleResolver();
        var locatedRules = ruleResolver.resolvePropertyRules(propertyRoute, ruleset);

        expect(locatedRules).not.to.be.null;
        expect(locatedRules.length).to.equal(1);
        expect(locatedRules[0].isForEach).to.be.true;
        expect(locatedRules[0].internalRule.ruleName).to.equal("maxLength");
        expect(locatedRules[0].internalRule.ruleOptions).to.equal(10);
    });

    it('should correctly resolve a property route with a foreach to a rule', function () {
        var rulesetBuilder = new Treacherous.RulesetBuilder();

        var nestedRuleset = rulesetBuilder.create()
            .forProperty("woo")
            .addRule("required", true)
            .addRule("maxLength", 10)
            .build();

        var forEachRuleset = rulesetBuilder.create()
            .forProperty("bar")
            .addRulesetForEach(nestedRuleset)
            .build();

        var ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRuleset(forEachRuleset)
            .build();

        var propertyRoute = "foo.bar[2].woo";

        var ruleResolver = new Treacherous.RuleResolver();
        var locatedRules = ruleResolver.resolvePropertyRules(propertyRoute, ruleset);

        expect(locatedRules).not.to.be.null;
        expect(locatedRules.length).to.equal(2);
        expect(locatedRules[0].ruleName).to.equal("required");
        expect(locatedRules[0].ruleOptions).to.be.true;
        expect(locatedRules[1].ruleName).to.equal("maxLength");
        expect(locatedRules[1].ruleOptions).to.equal(10);
    });

});