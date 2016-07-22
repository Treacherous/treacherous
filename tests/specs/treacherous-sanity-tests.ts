import {expect} from "chai";
import {createRuleset, createGroup, createGroupWithRules, ruleRegistry} from "../../src/exposer";
import {Ruleset} from "../../src/rulesets/ruleset";

describe('Treacherous Sanity Checks', function () {

    it('should correctly expose methods', function () {
        var ruleBuilder = createRuleset();
        expect(ruleBuilder).is.not.null;
        expect(ruleBuilder.create).to.be.a("function");

        var validationGroup = createGroup({}, new Ruleset());
        expect(validationGroup).is.not.null;
        expect(validationGroup.getModelErrors).to.be.a("function");

        var validationGroupExplicitRules = createGroupWithRules({}, function(rulesetBuilder){
            return rulesetBuilder.create().build();
        });
        expect(validationGroupExplicitRules).is.not.null;
        expect(validationGroupExplicitRules.getModelErrors).to.be.a("function");
    });

    it('should correctly generate rules', function() {

       var ruleset = createRuleset()
           .forProperty("dummy")
           .addRule("required")
           .build();

        expect(ruleset).is.not.null;
    });

    it('should correctly expose the rule registry', function() {

        var requiredRule = ruleRegistry.getRuleNamed("required");
        expect(requiredRule).is.not.null;
    });

    it('should correctly validate simple array values with foreach', function(done) {

        var dummyModel = {
            foo: [10, 20, 30]
        };

        var ruleset = createRuleset()
            .forProperty("foo")
            .addRuleForEach("maxValue", 19)
            .build();

        var validationGroup = createGroup(dummyModel, ruleset);

        validationGroup.getModelErrors()
            .then(function(errors){
                console.log("errors", errors);
                expect(errors).to.include.keys("foo[1]");
                expect(errors).to.include.keys("foo[2]");
                expect(errors["foo[1]"]).to.contain("20");
                expect(errors["foo[2]"]).to.contain("30");
                validationGroup.release();
                done();
            }).catch(done);
    });

});