import {use, expect, spy} from "chai";
import {RuleRegistry} from "../../src/rules/rule-registry";
import {MaxLengthValidationRule} from "../../src/rules/max-length-validation-rule";
import {RequiredValidationRule} from "../../src/rules/required-validation-rule";
import {FieldErrorProcessor} from "../../src/processors/field-error-processor";
import {RuleLink} from "../../src/rulesets/rule-link";

import * as spies from "chai-spies";
import {EqualValidationRule} from "../../src/rules/equal-validation-rule";
import {ModelResolver} from "../../src/resolvers/model-resolver";
import {PropertyResolver} from "property-resolver";
import {IModelResolver} from "../../src/resolvers/imodel-resolver";

import {DefaultLocaleHandler} from "../../src/localization/default-locale-handler";
import {Locale as DefaultLocale} from "../../src/locales/en-us";

use(spies);

describe('Field Error Processor', function () {

    it('should correctly return an error for the field', function (done) {
        var ruleRegistry = new RuleRegistry();
        ruleRegistry.registerRule(new RequiredValidationRule());
        ruleRegistry.registerRule(new MaxLengthValidationRule());

        var defaultLocaleHandler = new DefaultLocaleHandler();
        defaultLocaleHandler.registerLocale("en-us", DefaultLocale);
        defaultLocaleHandler.useLocale("en-us");

        var fieldErrorProcessor = new FieldErrorProcessor(ruleRegistry, defaultLocaleHandler);

        var dummyModel = new ModelResolver(new PropertyResolver(),{ dummyField: "123"});
        console.log(dummyModel);
        var dummyRules = [
            new RuleLink("required", true),
            new RuleLink("maxLength", 2)
        ];

        fieldErrorProcessor
            .checkFieldForErrors(dummyModel, 'dummyField', dummyRules)
            .then(function(error){
                expect(error).not.to.be.null;
                expect(error).to.contain("3").and.to.contain("2");
                done();
            }).catch(done);
    });


    it('should correctly return a custom error message function for the field', function (done) {
        var ruleRegistry = new RuleRegistry();
        ruleRegistry.registerRule(new RequiredValidationRule());

        var defaultLocaleHandler = new DefaultLocaleHandler();
        defaultLocaleHandler.registerLocale("en-us", DefaultLocale);
        defaultLocaleHandler.useLocale("en-us");

        var fieldErrorProcessor = new FieldErrorProcessor(ruleRegistry, defaultLocaleHandler);

        var dummyModel = new ModelResolver(new PropertyResolver(), {});
        var expectedMessage = "you should have put in some text";
        var dummyField = "";
        var rule = new RuleLink("required", true);
        rule.messageOverride = function() { return expectedMessage; };
        var dummyRules = [rule];

        fieldErrorProcessor
            .checkFieldForErrors(dummyModel, dummyField, dummyRules)
            .then(function(error){
                expect(error).not.to.be.null;
                expect(error).to.equal(expectedMessage);
                done();
            }).catch(done);
    });

    it('should correctly return a custom error message for the field', function (done) {
        var ruleRegistry = new RuleRegistry();
        ruleRegistry.registerRule(new RequiredValidationRule());

        var defaultLocaleHandler = new DefaultLocaleHandler();
        defaultLocaleHandler.registerLocale("en-us", DefaultLocale);
        defaultLocaleHandler.useLocale("en-us");

        var fieldErrorProcessor = new FieldErrorProcessor(ruleRegistry, defaultLocaleHandler);

        var dummyModel = new ModelResolver(new PropertyResolver(),{});
        var expectedMessage = "you should have put in some text";
        var dummyField = "";
        var rule = new RuleLink("required", true);
        rule.messageOverride = expectedMessage;
        var dummyRules = [
            rule
        ];

        fieldErrorProcessor
            .checkFieldForErrors(dummyModel, dummyField, dummyRules)
            .then(function(error){
                expect(error).not.to.be.null;
                expect(error).to.equal(expectedMessage);
                done();
            }).catch(done);
    });

    it('should correctly return a custom error message with model and value data', function (done) {
        var ruleRegistry = new RuleRegistry();
        ruleRegistry.registerRule(new EqualValidationRule());

        var defaultLocaleHandler = new DefaultLocaleHandler();
        defaultLocaleHandler.registerLocale("en-us", DefaultLocale);
        defaultLocaleHandler.useLocale("en-us");

        var fieldErrorProcessor = new FieldErrorProcessor(ruleRegistry, defaultLocaleHandler);

        var dummyModel = new ModelResolver(new PropertyResolver(),{ foo: "AA", bar:"BB" });
        var dummyField = "foo";
        var rule = new RuleLink("equal", "bar");
        var expectedMessage = "Should have had foo (AA) == bar (BB)";
        rule.messageOverride = (m,v,o) => `Should have had ${v} (${m.resolve(v)}) == ${o} (${m.resolve(o)})`;

        var dummyRules = [
            rule
        ];

        fieldErrorProcessor
            .checkFieldForErrors(dummyModel, dummyField, dummyRules)
            .then(function(error){
                console.log(error)
                expect(error).not.to.be.null;
                expect(error).to.equal(expectedMessage);
                done();
            }).catch(done);
    });

    it('should correctly return no error for the field', function (done) {
        var ruleRegistry = new RuleRegistry();
        ruleRegistry.registerRule(new RequiredValidationRule());
        ruleRegistry.registerRule(new MaxLengthValidationRule());

        var defaultLocaleHandler = new DefaultLocaleHandler();
        defaultLocaleHandler.registerLocale("en-us", DefaultLocale);
        defaultLocaleHandler.useLocale("en-us");

        var fieldErrorProcessor = new FieldErrorProcessor(ruleRegistry, defaultLocaleHandler);

        var dummyModel = new ModelResolver(new PropertyResolver(),{ dummyField : "12" });
        var dummyRules = [
            new RuleLink("required", true),
            new RuleLink("maxLength", 2)
        ];

        fieldErrorProcessor
            .checkFieldForErrors(dummyModel, 'dummyField', dummyRules)
            .then(function(error){
                expect(error).to.be.null;
                done();
            }).catch(done);
    });

    it('should stop looking for errors on first fail', function (done) {
        var ruleRegistry = new RuleRegistry();
        ruleRegistry.registerRule(new RequiredValidationRule());

        var maxLengthTreacherous = new MaxLengthValidationRule();
        var spiedValidationMethod = spy.on(maxLengthTreacherous, 'validate');
        ruleRegistry.registerRule(maxLengthTreacherous);

        var defaultLocaleHandler = new DefaultLocaleHandler();
        defaultLocaleHandler.registerLocale("en-us", DefaultLocale);
        defaultLocaleHandler.useLocale("en-us");

        var fieldErrorProcessor = new FieldErrorProcessor(ruleRegistry, defaultLocaleHandler);

        var dummyModel = new ModelResolver(new PropertyResolver(),{});
        var dummyField = null;
        var dummyRules = [
            new RuleLink("required", true),
            new RuleLink("maxLength", 2)
        ];

        fieldErrorProcessor
            .checkFieldForErrors(dummyModel, dummyField, dummyRules)
            .then(function(error){
                expect(error).not.to.be.null;
                expect(spiedValidationMethod).to.not.have.been.called;
                done();
            }).catch(done);
    });

    it('should only run rule if appliesIf is undefined or returns truthy', function (done) {
        var ruleRegistry = new RuleRegistry();

        var requiredValidationRule = new RequiredValidationRule();
        var spiedValidationMethod = spy.on(requiredValidationRule, 'validate');
        ruleRegistry.registerRule(requiredValidationRule);

        var defaultLocaleHandler = new DefaultLocaleHandler();
        defaultLocaleHandler.registerLocale("en-us", DefaultLocale);
        defaultLocaleHandler.useLocale("en-us");
        
        var fieldErrorProcessor = new FieldErrorProcessor(ruleRegistry, defaultLocaleHandler);

        var dummyModel = new ModelResolver(new PropertyResolver(),{ shouldRun: false });
        var dummyField = null;

        var requireRule = new RuleLink("required", true);
        requireRule.appliesIf = (modelResolver: IModelResolver) => { return modelResolver.resolve("shouldRun"); };;

        fieldErrorProcessor
            .processRuleLink(dummyModel, dummyField, requireRule)
            .then(function(){
                expect(spiedValidationMethod).to.not.have.been.called;
                done();
            }).catch(done);
    });

});