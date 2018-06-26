import {describe, it} from "mocha";
import {expect} from "chai";
import {RulesetBuilder} from "../../src/builders/ruleset-builder";
import {Ruleset} from "../../src/rulesets/ruleset";
import {RuleLink} from "../../src";

function assertHasRule(ruleset: Ruleset, ruleName: string, ruleValue?: any) {
    expect(ruleset.rules).to.have.property("property");
    expect(ruleset.rules["property"].length).to.equal(1);

    const propertyRules = ruleset.rules["property"][0];
    expect(propertyRules.ruleName).to.equal(ruleName);
    expect(propertyRules.ruleOptions).to.equal(ruleValue);
};

describe('Ruleset Shorthand Builder', function () {

    it('should correctly apply required', function () {
        const ruleset = new RulesetBuilder()
            .create()
            .forProperty("property")
                .required()
            .build();

        assertHasRule(ruleset, "required");
    });

    it('should correctly apply date', function () {
        const ruleset = new RulesetBuilder()
            .create()
            .forProperty("property")
                .date()
            .build();

        assertHasRule(ruleset, "date");
    });

    it('should correctly apply decimal', function () {
        const ruleset = new RulesetBuilder()
            .create()
            .forProperty("property")
                .decimal()
            .build();

        assertHasRule(ruleset, "decimal");
    });

    it('should correctly apply email', function () {
        const ruleset = new RulesetBuilder()
            .create()
            .forProperty("property")
                .email()
            .build();

        assertHasRule(ruleset, "email");
    });

    it('should correctly apply equal', function () {
        const ruleset = new RulesetBuilder()
            .create()
            .forProperty("property")
                .equal(10)
            .build();

        assertHasRule(ruleset, "equal", 10);
    });

    it('should correctly apply isoDate', function () {
        const ruleset = new RulesetBuilder()
            .create()
            .forProperty("property")
                .isoDate()
            .build();

        assertHasRule(ruleset, "isoDate");
    });
    

    it('should correctly apply matches via string', function () {
        const ruleset = new RulesetBuilder()
            .create()
            .forProperty("property")
                .matches("property2")
            .build();

        assertHasRule(ruleset, "matches", "property2");
    });

    it('should correctly apply matches via property', function () {
        class FakeClass
        {
            public property: number;
            public property2: number;
        }

        const ruleset = new RulesetBuilder<FakeClass>()
            .create()
            .forProperty(x => x.property)
                .matches(x => x.property2)
            .build();

        assertHasRule(ruleset, "matches", "property2");
    });
    

    it('should correctly apply maxLength', function () {
        const ruleset = new RulesetBuilder()
            .create()
            .forProperty("property")
                .maxLength(10)
            .build();

        assertHasRule(ruleset, "maxLength", 10);
    });
    

    it('should correctly apply minLength', function () {
        const ruleset = new RulesetBuilder()
            .create()
            .forProperty("property")
                .minLength(10)
            .build();

        assertHasRule(ruleset, "minLength", 10);
    });
    

    it('should correctly apply minValue', function () {
        const ruleset = new RulesetBuilder()
            .create()
            .forProperty("property")
                .minValue(10)
            .build();

        assertHasRule(ruleset, "minValue", 10);
    });
    
    it('should correctly apply maxValue', function () {
        const ruleset = new RulesetBuilder()
            .create()
            .forProperty("property")
                .maxValue(10)
            .build();

        assertHasRule(ruleset, "maxValue", 10);
    });
    
    it('should correctly apply notEqual', function () {
        const ruleset = new RulesetBuilder()
            .create()
            .forProperty("property")
                .notEqual(10)
            .build();

        assertHasRule(ruleset, "notEqual", 10);
    });
    
    it('should correctly apply minValue', function () {
        const ruleset = new RulesetBuilder()
            .create()
            .forProperty("property")
                .number()
            .build();

        assertHasRule(ruleset, "number");
    });
    
    it('should correctly apply regex', function () {
        const ruleset = new RulesetBuilder()
            .create()
            .forProperty("property")
                .regex(".*")
            .build();

        assertHasRule(ruleset, "regex", ".*");
    });
    
    it('should correctly apply step', function () {
        const ruleset = new RulesetBuilder()
            .create()
            .forProperty("property")
                .step(10)
            .build();

        assertHasRule(ruleset, "step", 10);
    });
});