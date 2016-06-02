var assert = chai.assert;
var expect = chai.expect;

describe('Field Error Processor', function () {

    it('should correctly return an error for the field', function (done) {
        var ruleRegistry = new Treacherous.RuleRegistry();
        ruleRegistry.registerRule(new Treacherous.RequiredValidaitonRule());
        ruleRegistry.registerRule(new Treacherous.MaxLengthValidationRule());

        var fieldErrorProcessor = new Treacherous.FieldErrorProcessor(ruleRegistry);

        var dummyField = "123";
        var dummyRules = [
            new Treacherous.RuleLink("required", true),
            new Treacherous.RuleLink("maxLength", 2)
        ];

        fieldErrorProcessor
            .checkFieldForErrors(dummyField, dummyRules)
            .then(function(error){
                expect(error).not.to.be.null;
                expect(error).to.contain("3").and.to.contain("2");
                done();
            });
    });

    it('should correctly return a custom error message function for the field', function (done) {
        var ruleRegistry = new Treacherous.RuleRegistry();
        ruleRegistry.registerRule(new Treacherous.RequiredValidaitonRule());

        var fieldErrorProcessor = new Treacherous.FieldErrorProcessor(ruleRegistry);

        var expectedMessage = "you should have put in some text";
        var dummyField = "";
        var dummyRules = [
            new Treacherous.RuleLink("required", true, function() { return expectedMessage; })
        ];

        fieldErrorProcessor
            .checkFieldForErrors(dummyField, dummyRules)
            .then(function(error){
                expect(error).not.to.be.null;
                expect(error).to.equal(expectedMessage);
                done();
            });
    });

    it('should correctly return a custom error message for the field', function (done) {
        var ruleRegistry = new Treacherous.RuleRegistry();
        ruleRegistry.registerRule(new Treacherous.RequiredValidaitonRule());

        var fieldErrorProcessor = new Treacherous.FieldErrorProcessor(ruleRegistry);

        var expectedMessage = "you should have put in some text";
        var dummyField = "";
        var dummyRules = [
            new Treacherous.RuleLink("required", true, expectedMessage)
        ];

        fieldErrorProcessor
            .checkFieldForErrors(dummyField, dummyRules)
            .then(function(error){
                expect(error).not.to.be.null;
                expect(error).to.equal(expectedMessage);
                done();
            });
    });

    it('should correctly return no error for the field', function (done) {
        var ruleRegistry = new Treacherous.RuleRegistry();
        ruleRegistry.registerRule(new Treacherous.RequiredValidaitonRule());
        ruleRegistry.registerRule(new Treacherous.MaxLengthValidationRule());

        var fieldErrorProcessor = new Treacherous.FieldErrorProcessor(ruleRegistry);

        var dummyField = "12";
        var dummyRules = [
            new Treacherous.RuleLink("required", true),
            new Treacherous.RuleLink("maxLength", 2)
        ];

        fieldErrorProcessor
            .checkFieldForErrors(dummyField, dummyRules)
            .then(function(error){
                expect(error).to.be.null;
                done();
            });
    });

    it('should stop looking for errors on first fail', function (done) {
        var ruleRegistry = new Treacherous.RuleRegistry();
        ruleRegistry.registerRule(new Treacherous.RequiredValidaitonRule());

        var maxLengthTreacherous = new Treacherous.MaxLengthValidationRule();
        var spiedValidationMethod = chai.spy.on(maxLengthTreacherous, 'validate');
        ruleRegistry.registerRule(maxLengthTreacherous);

        var fieldErrorProcessor = new Treacherous.FieldErrorProcessor(ruleRegistry);

        var dummyField = null;
        var dummyRules = [
            new Treacherous.RuleLink("required", true),
            new Treacherous.RuleLink("maxLength", 2)
        ];

        fieldErrorProcessor
            .checkFieldForErrors(dummyField, dummyRules)
            .then(function(error){
                expect(error).not.to.be.null;
                expect(spiedValidationMethod).to.not.have.been.called;
                done();
            });
    });

});