import {use, expect, spy} from "chai";
import {RuleRegistry} from "../../src/rules/rule-registry";
import {MaxLengthValidationRule} from "../../src/rules/max-length-validation-rule";
import {RequiredValidationRule} from "../../src/rules/required-validation-rule";
import {FieldErrorProcessor} from "../../src/processors/field-error-processor";
import {RuleLink} from "../../src/rulesets/rule-link";

import * as spies from "chai-spies";
use(spies);

describe('Field Error Processor', function () {

    it('should correctly return an error for the field', function (done) {
        var ruleRegistry = new RuleRegistry();
        ruleRegistry.registerRule(new RequiredValidationRule());
        ruleRegistry.registerRule(new MaxLengthValidationRule());

        var fieldErrorProcessor = new FieldErrorProcessor(ruleRegistry);

        var dummyField = "123";
        var dummyRules = [
            new RuleLink("required", true),
            new RuleLink("maxLength", 2)
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
        var ruleRegistry = new RuleRegistry();
        ruleRegistry.registerRule(new RequiredValidationRule());

        var fieldErrorProcessor = new FieldErrorProcessor(ruleRegistry);

        var expectedMessage = "you should have put in some text";
        var dummyField = "";
        var rule = new RuleLink("required", true);
        rule.messageOverride = function() { return expectedMessage; };
        var dummyRules = [rule];

        fieldErrorProcessor
            .checkFieldForErrors(dummyField, dummyRules)
            .then(function(error){
                expect(error).not.to.be.null;
                expect(error).to.equal(expectedMessage);
                done();
            });
    });

    it('should correctly return a custom error message for the field', function (done) {
        var ruleRegistry = new RuleRegistry();
        ruleRegistry.registerRule(new RequiredValidationRule());

        var fieldErrorProcessor = new FieldErrorProcessor(ruleRegistry);

        var expectedMessage = "you should have put in some text";
        var dummyField = "";
        var rule = new RuleLink("required", true);
        rule.messageOverride = expectedMessage;
        var dummyRules = [
            rule
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
        var ruleRegistry = new RuleRegistry();
        ruleRegistry.registerRule(new RequiredValidationRule());
        ruleRegistry.registerRule(new MaxLengthValidationRule());

        var fieldErrorProcessor = new FieldErrorProcessor(ruleRegistry);

        var dummyField = "12";
        var dummyRules = [
            new RuleLink("required", true),
            new RuleLink("maxLength", 2)
        ];

        fieldErrorProcessor
            .checkFieldForErrors(dummyField, dummyRules)
            .then(function(error){
                expect(error).to.be.null;
                done();
            });
    });

    it('should stop looking for errors on first fail', function (done) {
        var ruleRegistry = new RuleRegistry();
        ruleRegistry.registerRule(new RequiredValidationRule());

        var maxLengthTreacherous = new MaxLengthValidationRule();
        var spiedValidationMethod = spy.on(maxLengthTreacherous, 'validate');
        ruleRegistry.registerRule(maxLengthTreacherous);

        var fieldErrorProcessor = new FieldErrorProcessor(ruleRegistry);

        var dummyField = null;
        var dummyRules = [
            new RuleLink("required", true),
            new RuleLink("maxLength", 2)
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