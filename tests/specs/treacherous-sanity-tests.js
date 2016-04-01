var assert = chai.assert;
var expect = chai.expect;

describe('Treacherous Sanity Checks', function () {

    it('should correctly expose methods', function () {
        var ruleBuilder = Treacherous.createRuleset();
        expect(ruleBuilder).is.not.null;
        expect(ruleBuilder.create).to.be.a("function");

        var validationGroup = Treacherous.create({}, new Treacherous.Ruleset());
        expect(validationGroup).is.not.null;
        expect(validationGroup.getErrors).to.be.a("function");

        var validationGroupExplicitRules = Treacherous.createWithRules({}, function(rulesetBuilder){
            return rulesetBuilder.create().build();
        });
        expect(validationGroupExplicitRules).is.not.null;
        expect(validationGroupExplicitRules.getErrors).to.be.a("function");
    });

    it('should correctly generate rules', function() {

       var ruleset = Treacherous.createRuleset()
           .forProperty("dummy")
           .addRule("required")
           .build();

        expect(ruleset).is.not.null;
    });

    it('should correctly expose the rule registry', function() {

        var requiredRule = Treacherous.ruleRegistry.getRuleNamed("required");
        expect(requiredRule).is.not.null;
    });

    it('should correctly validate simple array values with foreach', function(done) {

        var dummyModel = {
            foo: [10, 20, 30]
        };

        var ruleset = Treacherous.createRuleset()
            .forProperty("foo")
            .addRuleForEach("maxValue", 19)
            .build();

        var validationGroup = Treacherous.create(dummyModel, ruleset);

        validationGroup.getErrors()
            .then(function(errors){
                console.log("errors", errors);
                expect(errors).to.include.keys("foo[1]");
                expect(errors).to.include.keys("foo[2]");
                expect(errors["foo[1]"]).to.contain("20");
                expect(errors["foo[2]"]).to.contain("30");
                done();
            });
    });

});