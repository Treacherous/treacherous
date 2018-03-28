import {use, expect, assert, spy} from "chai";
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
import {locale as defaultLocale} from "../../src/locales/en-us";

use(spies);

describe('Field Error Processor', function () {

    it('should correctly return an error for the field', function (done) {
        const ruleRegistry = new RuleRegistry();
        ruleRegistry.registerRule(new RequiredValidationRule());
        ruleRegistry.registerRule(new MaxLengthValidationRule());

        const defaultLocaleHandler = new DefaultLocaleHandler();
        defaultLocaleHandler.registerLocale("en-us", defaultLocale);
        defaultLocaleHandler.useLocale("en-us");

        const fieldErrorProcessor = new FieldErrorProcessor(ruleRegistry, defaultLocaleHandler);

        const dummyModel = new ModelResolver(new PropertyResolver(), { dummyField: "123"});
        console.log(dummyModel);
        const dummyRules = [
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
        const ruleRegistry = new RuleRegistry();
        ruleRegistry.registerRule(new RequiredValidationRule());

        const defaultLocaleHandler = new DefaultLocaleHandler();
        defaultLocaleHandler.registerLocale("en-us", defaultLocale);
        defaultLocaleHandler.useLocale("en-us");

        const fieldErrorProcessor = new FieldErrorProcessor(ruleRegistry, defaultLocaleHandler);

        const dummyModel = new ModelResolver(new PropertyResolver(), {});
        const expectedMessage = "you should have put in some text";
        const dummyField = "";
        const rule = new RuleLink("required", true);
        rule.messageOverride = function() { return expectedMessage; };
        const dummyRules = [rule];

        fieldErrorProcessor
            .checkFieldForErrors(dummyModel, dummyField, dummyRules)
            .then(function(error){
                expect(error).not.to.be.null;
                expect(error).to.equal(expectedMessage);
                done();
            }).catch(done);
    });

    it('should correctly return a custom error message for the field', function (done) {
        const ruleRegistry = new RuleRegistry();
        ruleRegistry.registerRule(new RequiredValidationRule());

        const defaultLocaleHandler = new DefaultLocaleHandler();
        defaultLocaleHandler.registerLocale("en-us", defaultLocale);
        defaultLocaleHandler.useLocale("en-us");

        const fieldErrorProcessor = new FieldErrorProcessor(ruleRegistry, defaultLocaleHandler);

        const dummyModel = new ModelResolver(new PropertyResolver(),{});
        const expectedMessage = "you should have put in some text";
        const dummyField = "";
        const rule = new RuleLink("required", true);
        rule.messageOverride = expectedMessage;
        const dummyRules = [
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
        const ruleRegistry = new RuleRegistry();
        ruleRegistry.registerRule(new EqualValidationRule());

        const defaultLocaleHandler = new DefaultLocaleHandler();
        defaultLocaleHandler.registerLocale("en-us", defaultLocale);
        defaultLocaleHandler.useLocale("en-us");

        const fieldErrorProcessor = new FieldErrorProcessor(ruleRegistry, defaultLocaleHandler);

        const dummyModel = new ModelResolver(new PropertyResolver(),{ foo: "AA", bar:"BB" });
        const dummyField = "foo";
        const rule = new RuleLink("equal", "bar");
        const expectedMessage = "Should have had foo (AA) == bar (BB)";
        rule.messageOverride = (m,v,o) => `Should have had ${v} (${m.resolve(v)}) == ${o} (${m.resolve(o)})`;

        const dummyRules = [
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
        const ruleRegistry = new RuleRegistry();
        ruleRegistry.registerRule(new RequiredValidationRule());
        ruleRegistry.registerRule(new MaxLengthValidationRule());

        const defaultLocaleHandler = new DefaultLocaleHandler();
        defaultLocaleHandler.registerLocale("en-us", defaultLocale);
        defaultLocaleHandler.useLocale("en-us");

        const fieldErrorProcessor = new FieldErrorProcessor(ruleRegistry, defaultLocaleHandler);

        const dummyModel = new ModelResolver(new PropertyResolver(),{ dummyField : "12" });
        const dummyRules = [
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
        const ruleRegistry = new RuleRegistry();
        ruleRegistry.registerRule(new RequiredValidationRule());

        const maxLengthTreacherous = new MaxLengthValidationRule();
        const spiedValidationMethod = spy.on(maxLengthTreacherous, 'validate');
        ruleRegistry.registerRule(maxLengthTreacherous);

        const defaultLocaleHandler = new DefaultLocaleHandler();
        defaultLocaleHandler.registerLocale("en-us", defaultLocale);
        defaultLocaleHandler.useLocale("en-us");

        const fieldErrorProcessor = new FieldErrorProcessor(ruleRegistry, defaultLocaleHandler);

        const dummyModel = new ModelResolver(new PropertyResolver(),{});
        const dummyField: any = null;
        const dummyRules = [
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
        const ruleRegistry = new RuleRegistry();

        const requiredValidationRule = new RequiredValidationRule();
        const spiedValidationMethod = spy.on(requiredValidationRule, 'validate');
        ruleRegistry.registerRule(requiredValidationRule);

        const defaultLocaleHandler = new DefaultLocaleHandler();
        defaultLocaleHandler.registerLocale("en-us", defaultLocale);
        defaultLocaleHandler.useLocale("en-us");
        
        const fieldErrorProcessor = new FieldErrorProcessor(ruleRegistry, defaultLocaleHandler);

        const dummyModel = new ModelResolver(new PropertyResolver(),{ shouldRun: false });
        const dummyField: any = null;

        const requireRule = new RuleLink("required", true);
        requireRule.appliesIf = (modelResolver: IModelResolver) => { return modelResolver.resolve("shouldRun"); };;

        fieldErrorProcessor
            .processRuleLink(dummyModel, dummyField, requireRule)
            .then(function(){
                expect(spiedValidationMethod).to.not.have.been.called;
                done();
            }).catch(done);
    });

    it('should throw exception if invalid rule has been used', function (done) {
        const ruleRegistry = new RuleRegistry();

        const defaultLocaleHandler = new DefaultLocaleHandler();
        defaultLocaleHandler.registerLocale("en-us", defaultLocale);
        defaultLocaleHandler.useLocale("en-us");
        
        const fieldErrorProcessor = new FieldErrorProcessor(ruleRegistry, defaultLocaleHandler);

        const dummyModel = new ModelResolver(new PropertyResolver(), { something: true });
        const fakeRuleName = "non-existant-rule";
        const ruleLink = new RuleLink(fakeRuleName, true);
                
        fieldErrorProcessor
            .processRuleLink(dummyModel, "something", ruleLink)
            .then(function(error){
                console.log("FAILED", error);
                done(error);
            }).catch(function(error){
                console.log(error);
                expect(error).to.match(new RegExp(fakeRuleName));
                done();
            });
    });

});