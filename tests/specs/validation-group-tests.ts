import {expect} from "chai";
import {FieldErrorProcessor} from "../../src/processors/field-error-processor";
import {RulesetBuilder} from "../../src/builders/ruleset-builder";
import {ruleRegistry} from "../../src/rule-registry-setup";
import {RuleResolver} from "../../src/rulesets/rule-resolver";
import {IModelResolver} from "../../src/resolvers/imodel-resolver";
import {ValidationGroup} from "../../src/validation-groups/validation-group";
import {IValidationGroup} from "../../src/validation-groups/ivalidation-group";
import {ModelResolverFactory} from "../../src/factories/model-resolver-factory";
import {DynamicCompositeValidationRule} from "../../src/index";
import {PropertyStateChangedEvent} from "../../src/events/property-state-changed-event";
import {DefaultLocaleHandler} from "../../src/localization/default-locale-handler";
import {locale as defaultLocale} from "../../src/locales/en-us";

describe('Validation Group', function () {

    const defaultLocaleCode = "en-us";

    const createValidationGroupFor = (model: any, ruleset: any) : IValidationGroup => {
        const defaultLocaleHandler = new DefaultLocaleHandler();
        defaultLocaleHandler.registerLocale(defaultLocaleCode, defaultLocale);
        defaultLocaleHandler.useLocale(defaultLocaleCode);

        const fieldErrorProcessor = new FieldErrorProcessor(ruleRegistry, defaultLocaleHandler);
        const ruleResolver = new RuleResolver();
        const modelResolverFactory = new ModelResolverFactory();
        return new ValidationGroup(fieldErrorProcessor, ruleResolver, modelResolverFactory, 
            defaultLocaleHandler, model, ruleset);
    };

    const delayedRequiresValid = (retval:any = true, delay:number = 100) => { 
        return {
            ruleName: "delayed",
            validate: function(modelResolver: IModelResolver, propertyName: string, options: any){
                return new Promise(function(resolve, reject){
                    console.log("validating", modelResolver.resolve(propertyName));
                    setTimeout(function() { resolve(modelResolver.resolve(propertyName) == "valid"); }, delay);
                });
            }
        };
    };

    it('should correctly get errors', function (done) {
        const dummyRuleRegistry = { hasRuleNamed: function(){ return true; }};
        const rulesetBuilder = new RulesetBuilder(<any>dummyRuleRegistry);
        const ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRule("maxLength", 2)
            .build();

        const dummyModel = {
            foo: "hello"
        };

        const validationGroup = createValidationGroupFor(dummyModel, ruleset);
        validationGroup.getModelErrors(true)
            .then(function(errors){
                expect(errors).not.to.be.null;
                expect(errors).to.include.keys("foo");
                validationGroup.release();
                done();
            }).catch(done);

    });

    it('should apply appliesIf rules correctly for TRUE', function (done) {

        const dummyRuleRegistry = { hasRuleNamed: function(){ return true; }};
        const rulesetBuilder = new RulesetBuilder(<any>dummyRuleRegistry);
        const ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRule("maxLength", 2)
            .appliesIf((v,o) => { return dummyModel.checkFoo; })
            .build();

        const dummyModel = {
            foo: "hello",
            checkFoo: true
        };

        const validationGroup = createValidationGroupFor(dummyModel, ruleset);
        validationGroup.getModelErrors(true)
            .then(function(errors){
                expect(errors).not.to.be.null;
                expect(errors).to.include.keys("foo");
                validationGroup.release();
                done();
            }).catch(done);
    });


    it('should apply appliesIf rules correctly for FALSE', function (done) {

        const dummyRuleRegistry = { hasRuleNamed: function(){ return true; }};
        const rulesetBuilder = new RulesetBuilder(<any>dummyRuleRegistry);
        const ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRule("maxLength", 2)
            .appliesIf((v,o) => { return dummyModel.checkFoo; })
            .build();

        const dummyModel = {
            foo: "hello",
            checkFoo: false
        };

        const validationGroup = createValidationGroupFor(dummyModel, ruleset);
        validationGroup.getModelErrors()
            .then(function(errors){
                expect(errors).not.to.be.null;
                expect(errors).not.to.include.keys("foo");
                validationGroup.release();
                done();
            }).catch(done);
    });


    it('should correctly get errors in nested objects', function (done) {

        const rulesetBuilder = new RulesetBuilder();
        const elementRuleset = rulesetBuilder.create()
            .forProperty("bar")
            .addRule("required", true)
            .addRule("maxLength", 5)
            .build();

        const ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRuleset(elementRuleset)
            .build();

        const dummyModel = {
            foo: { bar: "not valid" }
        };

        const validationGroup = createValidationGroupFor(dummyModel, ruleset);
        validationGroup.validate()
            .then(() => {
                validationGroup.getModelErrors()
                    .then(function(errors){
                        expect(errors).not.to.be.null;
                        expect(errors).to.include.keys("foo.bar");
                        expect(errors["foo.bar"]).to.contain("5");
                        expect(errors["foo.bar"]).to.contain("9");
                        validationGroup.release();
                        done();
                    }).catch(done);
            });

    });

    it('should correctly get errors in complex arrays', function (done) {

        const rulesetBuilder = new RulesetBuilder();
        const elementRuleset = rulesetBuilder.create()
            .forProperty("bar")
            .addRule("required")
            .addRule("maxLength", 5)
            .build();

        const ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRulesetForEach(elementRuleset)
            .build();

        const dummyModel = {
            foo: [
                { bar: "hello" },
                { bar: "" },
                { bar: "too long" }
            ]
        };

        const validationGroup = createValidationGroupFor(dummyModel, ruleset);
        validationGroup.getModelErrors(true)
            .then(function(errors){
                console.log(dummyModel);
                console.log(errors);
                expect(errors).not.to.be.null;
                expect(errors).to.include.keys("foo[1].bar");
                expect(errors["foo[1].bar"]).to.contain("required");
                expect(errors).to.include.keys("foo[2].bar");
                expect(errors["foo[2].bar"]).to.contain("8");
                expect(errors["foo[2].bar"]).to.contain("5");
                validationGroup.release();
                done();
            }).catch(done);

    });

    it('should correctly get errors in simple arrays', function (done) {

        const rulesetBuilder = new RulesetBuilder();
        const ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRuleForEach("maxValue", 25)
            .build();

        const dummyModel = {
            foo: [ 10, 20, 30 ]
        };

        const validationGroup = createValidationGroupFor(dummyModel, ruleset);
        validationGroup.getModelErrors(true)
            .then(function(errors){
                expect(errors).not.to.be.null;
                expect(errors).to.include.keys("foo[2]");
                expect(errors["foo[2]"]).to.contain("25");
                expect(errors["foo[2]"]).to.contain("30");
                validationGroup.release();
                done();
            }).catch(done);
    });

    it('should correctly get property error', function (done) {

        const rulesetBuilder = new RulesetBuilder();
        const ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRule("maxLength", 2)
            .build();

        const dummyModel = {
            foo: "hello"
        };

        const validationGroup = createValidationGroupFor(dummyModel, ruleset);
        validationGroup.validate().then(v => {
            validationGroup.getPropertyError("foo")
                .then(function (error) {
                    expect(error).not.to.be.null;
                    expect(error).to.contain("2");
                    expect(error).to.contain("5");
                    validationGroup.release();
                    done();
                }).catch(done);
        });
    });

    it('should correctly get nested property error', function (done) {

        const rulesetBuilder = new RulesetBuilder();
        const elementRuleset = rulesetBuilder.create()
            .forProperty("bar")
            .addRule("required", true)
            .addRule("maxLength", 5)
            .build();

        const ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRuleset(elementRuleset)
            .build();

        const dummyModel = {
            foo: { bar: "not valid" }
        };

        const validationGroup = createValidationGroupFor(dummyModel, ruleset);
        validationGroup.validate().then(v => {
            validationGroup.getPropertyError("foo.bar")
            .then(function(error){
                expect(error).not.to.be.null;
                expect(error).to.contain("9");
                expect(error).to.contain("5");
                validationGroup.release();
                done();
            }).catch(done);
        });
    });

    it('should correctly get property error in complex arrays', function (done) {

        const rulesetBuilder = new RulesetBuilder();
        const elementRuleset = rulesetBuilder.create()
            .forProperty("bar")
            .addRule("required")
            .addRule("maxLength", 5)
            .build();

        const ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRulesetForEach(elementRuleset)
            .build();

        const dummyModel = {
            foo: [
                { bar: "hello" },
                { bar: "" },
                { bar: "too long" }
            ]
        };

        const validationGroup = createValidationGroupFor(dummyModel, ruleset);
        const checkOne = validationGroup.validate()
        .then(v => {
            validationGroup.getPropertyError("foo[1].bar")
                .then(function(error){
                    console.log(error);
                    expect(error).not.to.be.null;
                    expect(error).to.contain("required");
                });

            const checkTwo = validationGroup.getPropertyError("foo[2].bar")
                .then(function(error){
                    console.log(error);
                    expect(error).not.to.be.null;
                    expect(error).to.contain("8");
                    expect(error).to.contain("5");
                });

            Promise.all([checkOne, checkTwo])
                .then(function() {
                    validationGroup.release();
                    done();
                });
        });
    });


    it('should correctly get property error in simple array', function (done) {

        const rulesetBuilder = new RulesetBuilder();
        const ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRuleForEach("maxValue", 25)
            .build();

        const dummyModel = {
            foo: [ 10, 20, 30 ]
        };

        const validationGroup = createValidationGroupFor(dummyModel, ruleset);
        validationGroup.validate().then(v => {
            validationGroup.validateProperty("foo[2]")
            .then(v => {
                console.log(validationGroup["propertyErrors"]);
                return validationGroup.getPropertyError("foo[2]");
            })
            .then(function(error){
                expect(error).not.to.be.null;
                expect(error).to.contain("25");
                expect(error).to.contain("30");
                validationGroup.release();
                done();
            }).catch(done); 
        });
    });

    it('should return undefined if no error exists for property', function (done) {

        const rulesetBuilder = new RulesetBuilder();
        const ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRule("maxLength", 2)
            .build();

        const dummyModel = {
            foo: "hello"
        };

        const validationGroup = createValidationGroupFor(dummyModel, ruleset);
        validationGroup.validateProperty("nothing")
            .then(() => validationGroup.getPropertyError("nothing"))
            .then(error => {
                expect(error).to.be.undefined;
                validationGroup.release();
                done();
            }).catch(done);
    });

    it('should not apply array errors to child indexes', function (done) {

        const rulesetBuilder = new RulesetBuilder();
        const ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRule("maxLength", 2)
            .addRuleForEach("maxValue", 100)
            .build();

        const dummyModel = {
            foo: [ 10, 20, 30 ]
        };

        const validationGroup = createValidationGroupFor(dummyModel, ruleset);
        validationGroup.getModelErrors(true)
            .then(function(errors){
                console.log(errors);
                expect(errors).not.to.be.null;
                expect(Object.keys(errors).length).to.equal(1);
                expect(errors).to.include.keys("foo");
                expect(errors["foo"]).to.contain("2");
                expect(errors["foo"]).to.contain("3");
                validationGroup.release();
                done();
            }).catch(done);
    });

    it('should correctly get errors when invalid elements added to arrays', function (done) {

        const rulesetBuilder = new RulesetBuilder();
        const elementRuleset = rulesetBuilder.create()
            .forProperty("bar")
            .addRule("required")
            .addRule("maxLength", 5)
            .build();

        const ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRulesetForEach(elementRuleset)
            .build();

        const dummyModel = {
            foo: [
                { bar: "hello" },
                { bar: "" }
            ]
        };

        const validationGroup = createValidationGroupFor(dummyModel, ruleset);

        dummyModel.foo.push({ bar: "too long" });

        setTimeout(function(){
            validationGroup.getModelErrors(true)
                .then((errors) => {
                    console.log(errors);
                    expect(errors).not.to.be.null;
                    expect(errors).to.include.keys("foo[1].bar");
                    expect(errors["foo[1].bar"]).to.contain("required");
                    expect(errors).to.include.keys("foo[2].bar");
                    expect(errors["foo[2].bar"]).to.contain("8");
                    expect(errors["foo[2].bar"]).to.contain("5");
                    validationGroup.release();
                    done();
                }).catch(done);
        }, 600);
    });

    it('should correctly provide errors', function (done) {

        const rulesetBuilder = new RulesetBuilder();
        const ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRule("maxLength", 15)
            .build();

        const dummyModel = {
            foo: "this is not valid so should fail"
        };

        const validationGroup = createValidationGroupFor(dummyModel, ruleset);
        validationGroup.getModelErrors(true)
            .then((errors) => {
                expect(errors).not.to.be.null;
                expect(errors).to.include.keys("foo");
                expect(errors.foo).to.contain("32");
                expect(errors.foo).to.contain("15");
                validationGroup.release();
                done();
            }).catch(done);
    });

    it('should correctly return promise indicating validity', function (done) {

        const rulesetBuilder = new RulesetBuilder();
        const ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRule("maxLength", 15)
            .build();

        const dummyModel = {
            foo: "this is not valid so should fail"
        };

        const validationGroup = createValidationGroupFor(dummyModel, ruleset);
        validationGroup.getModelErrors(true)
            .then(function(errors){
                expect(errors).not.to.be.null;
                expect(errors).to.include.keys("foo");
                expect(errors.foo).to.contain("32");
                expect(errors.foo).to.contain("15");
                validationGroup.release();
                done();
            }).catch(done);
    });

    it('should only return errors when all validation events have finished', function (done) {

        // This basically delays validation so others stack
        const delayedRequiresValid: any = {
            ruleName: "delayed",
            validate: function(modelResolver: IModelResolver, prop: string, options: any){
                return new Promise(function(resolve, reject){
                    setTimeout(function() { resolve(modelResolver.resolve(prop) == "valid"); }, 200);
                });
            }
        };

        ruleRegistry.registerRule(delayedRequiresValid);

        const rulesetBuilder = new RulesetBuilder();
        const ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRule("delayed")
            .build();

        const dummyModel = {
            foo: "invalid"
        };

        const validationGroup = createValidationGroupFor(dummyModel, ruleset);
        validationGroup.getModelErrors()
            .then(function(errors){
                expect(errors).to.be.empty;
                validationGroup.release();
                done();
            }).catch(done);

        dummyModel.foo = "invalid";
        dummyModel.foo = "valid";
    });

    it('should only return valid state when all validation events have finished', function (done) {

        ruleRegistry.registerRule(delayedRequiresValid());

        const rulesetBuilder = new RulesetBuilder();
        const ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRule("delayed")
            .build();

        const dummyModel = {
            foo: "invalid"
        };

        const validationGroup = createValidationGroupFor(dummyModel, ruleset);
        validationGroup.validate()
            .then(function(isValid){
                console.log("isValid", isValid);
                expect(isValid).to.be.true;
                validationGroup.release();
                done();
            }).catch(done);

        console.log("changing");
        dummyModel.foo = "invalid";
        dummyModel.foo = "valid";
        console.log("changed");
    });

    it('should correctly delay error requests until validation has finished', function (done) {

        const delayedRequires10Rule: any = {
            ruleName: "delayed",
            validate: function(mr: any, prop: any, options: any){
                return new Promise(function(resolve, reject){
                    setTimeout(function() { resolve(mr.resolve(prop) == 10); }, 100);
                });
            }
        };

        ruleRegistry.registerRule(delayedRequires10Rule);

        const rulesetBuilder = new RulesetBuilder();
        const ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRule("delayed")
            .build();

        const dummyModel: any = {
            foo: "hello"
        };

        const validationGroup = createValidationGroupFor(dummyModel, ruleset);

        // This starts the initial validation chain so delays it
        const promise1 = validationGroup.getModelErrors()
            .then(function(errors){
                expect(errors).to.be.empty;
            }).catch(done);

        dummyModel.foo = 10;

        const promise2 = validationGroup.getModelErrors()
            .then(function(errors){
                expect(errors).to.be.empty;
            }).catch(done);

        Promise.all([promise1, promise2])
            .then(function(){
                validationGroup.release();
                done();
            })
            .catch(function(error){
                validationGroup.release();
                done(error);
            });
    });

    it('should correctly update errors when model changed', function (done) {

        const rulesetBuilder = new RulesetBuilder();
        const ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRule("maxLength", 2)
            .build();

        const validationGroup = createValidationGroupFor({ foo: "invalid" }, ruleset);
        validationGroup.changeValidationTarget({ foo: "ok" });
        validationGroup.getModelErrors()
            .then(function(errors){
                expect(errors).to.be.empty;
                validationGroup.release();
                done();
            }).catch(done);
    });

    it('should correctly allow empty model then update errors when model changed', function (done) {

        const rulesetBuilder = new RulesetBuilder();
        const ruleset = rulesetBuilder.create()
            .forProperty("foo")
                .addRule("maxLength", 2)
            .forProperty("bar")
                .addRuleForEach("maxValue", 10)
            .build();

        const validationGroup = createValidationGroupFor(null, ruleset);
        validationGroup.changeValidationTarget({ foo: "not ok", bar: [ 20, 10 ]  });
        validationGroup.getModelErrors(true)
            .then(function(errors){
                expect(errors).not.to.be.null;
                expect(errors).to.include.keys("foo");
                expect(errors.foo).to.contain("6");
                expect(errors.foo).to.contain("2");
                expect(errors).to.include.keys("bar[0]");
                expect(errors["bar[0]"]).to.contain("20");
                expect(errors["bar[0]"]).to.contain("10");
                validationGroup.release();
                done();
            }).catch(done);
    });

    it('should correctly report errors with empty models that later on get a schema', function (done) {

        const rulesetBuilder = new RulesetBuilder();
        const ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRule("maxLength", 2)
            .forProperty("bar")
            .addRuleForEach("maxValue", 10)
            .build();

        const changingModel: any = {};
        const validationGroup = createValidationGroupFor(changingModel, ruleset);
        changingModel.foo = "not ok";
        changingModel.bar = [ 20, 10 ];

        console.log("model updated", changingModel);
        setTimeout(function(){
            validationGroup.getModelErrors(true)
                .then(function(errors){
                    console.log("ended model", changingModel);
                    console.log("errors", errors);
                    expect(errors).not.to.be.null;
                    expect(errors).to.include.keys("foo");
                    expect(errors.foo).to.contain("6");
                    expect(errors.foo).to.contain("2");
                    expect(errors).to.include.keys("bar[0]");
                    expect(errors["bar[0]"]).to.contain("20");
                    expect(errors["bar[0]"]).to.contain("10");
                    validationGroup.release();
                    done();
                }).catch(done);
        }, 200);
    });

    it("should delay model errors until model watcher has updated", function(done){
        const rulesetBuilder = new RulesetBuilder();
        const ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRule("required")
            .build();

        const model: any = {
            foo: null
        };

        const validationGroup = createValidationGroupFor(model, ruleset);

        model.foo = "valid";

        validationGroup.getModelErrors()
            .then((errors) => {
                console.log("errors", errors);
                expect(errors).to.be.empty;
                done();
            })
            .catch(done);
    });

    it('should correctly notify on property validation change', function (done) {

        const rulesetBuilder = new RulesetBuilder();
        const ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRule("maxLength", 15)
            .build();

            const dummyModel = {
            foo: "hello"
        };

        const validationGroup = createValidationGroupFor(dummyModel, ruleset);
        validationGroup.propertyStateChangedEvent.subscribe(function(args){
            console.log("DATA", args);
            expect(args.isValid).to.be.false;
            expect(args.error).contains("15");
            expect(args.property).to.equal("foo");
            validationGroup.release();
            done();
        });

        dummyModel.foo = "this is now no longer valid";
        validationGroup.getPropertyError("foo", true);
    });

    it('should correctly notify on model validation change', function (done) {

        const rulesetBuilder = new RulesetBuilder();
        const ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRule("maxLength", 15)
            .build();

            const dummyModel = {
            foo: "hello"
        };

        const validationGroup = createValidationGroupFor(dummyModel, ruleset);
        validationGroup.modelStateChangedEvent.subscribe(function(args){
            expect(args.isValid).to.be.false;
            validationGroup.release();
            done();
        });

        dummyModel.foo = "this is now no longer valid";
        validationGroup.getPropertyError("foo", true);
    });

    it('should correctly return errors for composite rules with getPropertyError', function (done) {
        const validationName = "testCompositeRule";
        const expectedError = "validation triggered by getPropertyError";

        const compositeRule = new DynamicCompositeValidationRule(
            validationName, 
            () => { return Promise.resolve(false); });

        const rulesetBuilder = new RulesetBuilder();
        const ruleset = rulesetBuilder.create()
            .addCompositeRule(compositeRule)
            .build();

        const dummyModel = {
            foo: ""
        };

        const validationGroup = createValidationGroupFor(dummyModel, ruleset);
        const localeHandler = <DefaultLocaleHandler>validationGroup["localeHandler"];

        const compositeLocales: any = {};
        compositeLocales[validationName] = expectedError;
        localeHandler.supplementLocaleFrom(defaultLocaleCode, compositeLocales);

        validationGroup.getPropertyError(validationName, true)
            .then((error) => {
                expect(error).to.equal(expectedError);
                validationGroup.release();
                done();
            });
    });

    it('should correctly raise model validation changes for composite rule changes', function (done) {
        const validationName = "testCompositeRule";
        const expectedError = "validation triggered from rule change";

        const compositeRule = new DynamicCompositeValidationRule(
            validationName,
            () => { return Promise.resolve(false); });

        const rulesetBuilder = new RulesetBuilder();
        const ruleset = rulesetBuilder.create()
            .addCompositeRule(compositeRule)
            .build();

        const dummyModel = {
            foo: ""
        };

        const validationGroup = createValidationGroupFor(dummyModel, ruleset);
        const localeHandler = <DefaultLocaleHandler>validationGroup["localeHandler"];

        const compositeLocales: any = {};
        compositeLocales[validationName] = expectedError;
        localeHandler.supplementLocaleFrom(defaultLocaleCode, compositeLocales);

        validationGroup.modelStateChangedEvent.subscribe(function(args){
            expect(args.isValid).to.be.false;
            validationGroup.release();
            done();
        });

        validationGroup.getPropertyError(validationName, true);
    });

    it('should correctly raise property validation changes for composite rule changes', function (done) {
        const validationName = "testCompositeRule";
        const expectedError = "validation triggered by composite";

        const compositeRule = new DynamicCompositeValidationRule(
            validationName,
            () => { return Promise.resolve(false); });

        const rulesetBuilder = new RulesetBuilder();
        const ruleset = rulesetBuilder.create()
            .addCompositeRule(compositeRule)
            .build();

        const dummyModel = {
            foo: ""
        };

        const validationGroup = createValidationGroupFor(dummyModel, ruleset);
        const localeHandler = <DefaultLocaleHandler>validationGroup["localeHandler"];

        const compositeLocales: any = {};
        compositeLocales[validationName] = expectedError;
        localeHandler.supplementLocaleFrom(defaultLocaleCode, compositeLocales);

        validationGroup.propertyStateChangedEvent.subscribe(function(args: PropertyStateChangedEvent){
            expect(args.isValid).to.be.false;
            expect(args.property).to.equal(validationName);
            validationGroup.release();
            done();
        });

        validationGroup.getPropertyError(validationName, true);
    });

    it('should correctly get property display name', function () {
        const displayName = "User's name";
        const rulesetBuilder = new RulesetBuilder();
        const ruleset = rulesetBuilder.create()
            .forProperty("username")
                .addRule("required")
                .withDisplayName(displayName)
            .build();

        const dummyModel = {
            username: ""
        };

        const validationGroup = createValidationGroupFor(dummyModel, ruleset);
        const actualDisplayName = validationGroup.getPropertyDisplayName("username");

        expect(actualDisplayName).to.equal(displayName);
    });

    it('should correctly check if property is within group', function () {
        const rulesetBuilder = new RulesetBuilder();
        const ruleset = rulesetBuilder.create()
            .forProperty("propertyInGroup")
                .addRule("required")
            .build();

        const dummyModel = {
            propertyInGroup: "",
            propertyNotInGroup: ""
        };

        const validationGroup = createValidationGroupFor(dummyModel, ruleset);
        const shouldBeInGroup = validationGroup.isPropertyInGroup("propertyInGroup");
        const shouldNotBeInGroup = validationGroup.isPropertyInGroup("propertyNotInGroup");
        const shouldAlsoNotBeInGroup = validationGroup.isPropertyInGroup("notEvenARealProperty");
        
        expect(shouldBeInGroup).to.be.true;
        expect(shouldNotBeInGroup).to.be.false;
        expect(shouldAlsoNotBeInGroup).to.be.false;
    });

});