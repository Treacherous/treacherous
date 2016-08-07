import {expect} from "chai";
import {RuleRegistry} from "../../src/rules/rule-registry";
import {RuleLink} from "../../src/rulesets/rule-link";
import {RulesetBuilder} from "../../src/builders/ruleset-builder";
import {Ruleset} from "../../src/rulesets/ruleset";

describe('Ruleset Builder', function () {

    it('should correctly add rules to the ruleset', function () {
        var dummyRuleRegistry = { hasRuleNamed: function(){ return true; }};
        var rulesetBuilder = new RulesetBuilder(<any>dummyRuleRegistry);

        var ruleset: any = rulesetBuilder.create()
            .forProperty("foo")
                .addRule("required", true)
                .addRule("maxLength", 20)
            .build();

        expect(ruleset).not.to.be.null;
        expect(ruleset.rules).to.include.keys("foo");
        expect(ruleset.rules.foo.length).to.equal(2);
        expect(ruleset.rules.foo[0]).to.eql(new RuleLink("required", true));
        expect(ruleset.rules.foo[1]).to.eql(new RuleLink("maxLength", 20));
    });

    it('should support custom message strings on rules added to the ruleset', function () {
        var dummyRuleRegistry = { hasRuleNamed: function(){ return true; }};
        var rulesetBuilder = new RulesetBuilder(<any>dummyRuleRegistry);

        var ruleset: any = rulesetBuilder.create()
            .forProperty("foo")
                .addRule("required")
                .withMessage('Hi there!')
            .build();

        expect(ruleset).not.to.be.null;
        expect(ruleset.rules).to.include.keys("foo");
        expect(ruleset.rules.foo.length).to.equal(1);
        expect(ruleset.rules.foo[0].messageOverride).to.eql('Hi there!');
    });

    it('should support custom message functions on rules added to the ruleset', function () {
        var dummyRuleRegistry = { hasRuleNamed: function(){ return true; }};
        var rulesetBuilder = new RulesetBuilder(<any>dummyRuleRegistry);

        var ruleset: any = rulesetBuilder.create()
            .forProperty("foo")
                .addRule("required")
                .withMessage(function(v,o) { return 'Hi there,' + v + o })
            .build();

        expect(ruleset).not.to.be.null;
        expect(ruleset.rules).to.include.keys("foo");
        expect(ruleset.rules.foo.length).to.equal(1);
        expect(ruleset.rules.foo[0].messageOverride('a','b')).to.eql('Hi there,ab');
    });

    it('should correctly add rulesets to properties in the generated ruleset', function () {
        var dummyRuleRegistry = { hasRuleNamed: function(){ return true; }};
        var rulesetBuilder = new RulesetBuilder(<any>dummyRuleRegistry);

        var dummyRuleset: any = new Ruleset();
        dummyRuleset.rules.bar = [ new RuleLink("required", true) ];

        var ruleset: any = rulesetBuilder.create()
            .forProperty("foo")
                .addRuleset(dummyRuleset)
            .build();

        expect(ruleset).not.to.be.null;
        expect(ruleset.rules).to.include.keys("foo");
        expect(ruleset.rules.foo.length).to.equal(1);
        expect(ruleset.rules.foo[0]).to.eql(dummyRuleset);
    });

    it('should correctly add foreach rules to the ruleset', function () {
        var dummyRuleRegistry = { hasRuleNamed: function(){ return true; }};
        var rulesetBuilder = new RulesetBuilder(<any>dummyRuleRegistry);

        var ruleset: any = rulesetBuilder.create()
            .forProperty("foo")
            .addRuleForEach("required")
            .build();

        expect(ruleset).not.to.be.null;
        expect(ruleset.rules).to.include.keys("foo");
        expect(ruleset.rules.foo.length).to.equal(1);
        expect(ruleset.rules.foo[0].isForEach).to.be.true;
    });

    it('should not allow empty rule names with ruleRegistry', function () {
        var dummyRuleRegistry = { hasRuleNamed: function(){ return true; }};
        var rulesetBuilder = new RulesetBuilder(<any>dummyRuleRegistry);
        var hasFailed = false;

        try
        {
            rulesetBuilder.create()
                .forProperty("foo")
                .addRule("");
        }
        catch(ex)
        {
            hasFailed = true;
        }

        expect(hasFailed).to.be.true;
     });

    it('should not allow empty rule names without ruleRegistry', function () {
        var rulesetBuilder = new RulesetBuilder();
        var hasFailed = false;

        try
        {
            rulesetBuilder.create()
                .forProperty("foo")
                .addRule("");
        }
        catch(ex)
        {
            hasFailed = true;
        }

        expect(hasFailed).to.be.true;
    });

    it('should not allow unregistered rule names with ruleRegistry', function () {
        var ruleRegistry = new RuleRegistry();
        var rulesetBuilder = new RulesetBuilder(ruleRegistry);
        var hasFailed = false;

        try
        {
            rulesetBuilder.create()
                .forProperty("foo")
                .addRule("not-real-rule");
        }
        catch(ex)
        {
            hasFailed = true;
        }

        expect(hasFailed).to.be.true;
    });

    it('should not allow unregistered rule names with ruleRegistry', function () {
        var rulesetBuilder = new RulesetBuilder();
        var hasFailed = false;

        try
        {
            rulesetBuilder.create()
                .forProperty("foo")
                .addRule("not-real-rule");
        }
        catch(ex)
        {
            hasFailed = true;
        }

        expect(hasFailed).to.be.false;
    });

});