import 'mocha';
import {expect} from "chai";
import {RuleRegistry} from "../../src/rules/rule-registry";
import {RuleLink} from "../../src/rulesets/rule-link";
import {RulesetBuilder} from "../../src/builders/ruleset-builder";
import {Ruleset} from "../../src/rulesets/ruleset";
import {DynamicCompositeValidationRule} from "../../src";

describe('Ruleset Builder', function () {

    it('should correctly resolve property predicates to property names', function () {
        class DummyModel
        {
            public property1: string;
            public property2: number;
        }

        const dummyRuleRegistry = { hasRuleNamed: function(){ return true; }};
        const rulesetBuilder = new RulesetBuilder<DummyModel>(<any>dummyRuleRegistry);

        const ruleset: any = rulesetBuilder.create()
            .forProperty(x => x.property1)
            .addRule("required", true)
            .forProperty(x => x.property2)
            .addRule("required", true)
            .build();

        expect(ruleset).not.to.be.null;
        expect(ruleset.rules).to.include.keys("property1");
        expect(ruleset.rules.property1.length).to.equal(1);
        expect(ruleset.rules.property1[0]).to.eql(new RuleLink("required", true));
        expect(ruleset.rules).to.include.keys("property2");
        expect(ruleset.rules.property2.length).to.equal(1);
        expect(ruleset.rules.property2[0]).to.eql(new RuleLink("required", true));
    });

    it('should correctly add rules to the ruleset', function () {
        const dummyRuleRegistry = { hasRuleNamed: function(){ return true; }};
        const rulesetBuilder = new RulesetBuilder(<any>dummyRuleRegistry);

        const ruleset: any = rulesetBuilder.create()
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
        const dummyRuleRegistry = { hasRuleNamed: function(){ return true; }};
        const rulesetBuilder = new RulesetBuilder(<any>dummyRuleRegistry);

        const ruleset: any = rulesetBuilder.create()
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
        const dummyRuleRegistry = { hasRuleNamed: function(){ return true; }};
        const rulesetBuilder = new RulesetBuilder(<any>dummyRuleRegistry);

        const ruleset: any = rulesetBuilder.create()
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
        const dummyRuleRegistry = { hasRuleNamed: function(){ return true; }};
        const rulesetBuilder = new RulesetBuilder(<any>dummyRuleRegistry);

        const dummyRuleset: any = new Ruleset();
        dummyRuleset.rules.bar = [ new RuleLink("required", true) ];

        const ruleset: any = rulesetBuilder.create()
            .forProperty("foo")
                .addRuleset(dummyRuleset)
            .build();

        expect(ruleset).not.to.be.null;
        expect(ruleset.rules).to.include.keys("foo");
        expect(ruleset.rules.foo.length).to.equal(1);
        expect(ruleset.rules.foo[0]).to.eql(dummyRuleset);
    });

    it('should correctly add foreach rules to the ruleset', function () {
        const dummyRuleRegistry = { hasRuleNamed: function(){ return true; }};
        const rulesetBuilder = new RulesetBuilder(<any>dummyRuleRegistry);

        const ruleset: any = rulesetBuilder.create()
            .forProperty("foo")
            .addRuleForEach("required")
            .build();

        expect(ruleset).not.to.be.null;
        expect(ruleset.rules).to.include.keys("foo");
        expect(ruleset.rules.foo.length).to.equal(1);
        expect(ruleset.rules.foo[0].isForEach).to.be.true;
    });

    it('should not allow empty rule names with ruleRegistry', function () {
        const dummyRuleRegistry = { hasRuleNamed: function(){ return true; }};
        const rulesetBuilder = new RulesetBuilder(<any>dummyRuleRegistry);
        let hasFailed = false;

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
        const rulesetBuilder = new RulesetBuilder();
        let hasFailed = false;

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
        const ruleRegistry = new RuleRegistry();
        const rulesetBuilder = new RulesetBuilder(ruleRegistry);
        let hasFailed = false;

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
        const rulesetBuilder = new RulesetBuilder();
        let hasFailed = false;

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

    it('should pre populate existing ruleset when existing is provided', function () {
        const rulesetBuilder = new RulesetBuilder();

        const ruleset = new Ruleset();
        ruleset.addRule("prop1", new RuleLink("required"));
        rulesetBuilder.create(ruleset);

        const internalRuleset = <Ruleset>rulesetBuilder["internalRuleset"];
        expect(internalRuleset.rules).to.include.keys("prop1");
        expect(internalRuleset.rules["prop1"][0].ruleName).to.equal("required");
    });

    it('should nest property rulesets correctly', function () {
        const rulesetBuilder = new RulesetBuilder();

        rulesetBuilder.create()
            .forProperty("parent")
                .then(x => {
                    x.forProperty("child")
                        .required()
                });

        const internalRuleset = <Ruleset>rulesetBuilder["internalRuleset"];
        expect(internalRuleset.rules).to.include.keys("parent");
        expect(internalRuleset.rules["parent"][0].rules).to.include.keys("child");
        expect(internalRuleset.rules["parent"][0].rules["child"][0].ruleName).to.equal("required");
    });

    it('should merge in ruleset correctly', function () {
        const rulesetBuilder = new RulesetBuilder();

        const ruleset1 = new Ruleset();
        ruleset1.addRule("prop1", new RuleLink("required"));
        rulesetBuilder.create(ruleset1);

        const ruleset2 = new Ruleset();
        ruleset2.addRule("prop2", new RuleLink("required"));
        rulesetBuilder.create(ruleset2);

        rulesetBuilder.create()
            .mergeInRuleset(ruleset1)
            .mergeInRuleset(ruleset2);

        const internalRuleset = <Ruleset>rulesetBuilder["internalRuleset"];
        expect(internalRuleset.rules).to.include.keys("prop1", "prop2");
        expect(internalRuleset.rules["prop1"][0].ruleName).to.equal("required");
        expect(internalRuleset.rules["prop2"][0].ruleName).to.equal("required");
    });

});