import {expect} from "chai";
import {FieldErrorProcessor} from "../../src/processors/field-error-processor";
import {RulesetBuilder} from "../../src/rulesets/ruleset-builder";
import {ruleRegistry} from "../../src/exposer";
import {RuleResolver} from "../../src/rulesets/rule-resolver";
import {ValidationGroup} from "../../src/validation-group";
import {IValidationSettings} from "../../src/settings/ivalidation-settings";
import {DefaultValidationSettings} from "../../src/settings/default-validation-settings";
import {PropertyResolver} from "property-resolver";
import {IModelResolver} from "../../src/resolvers/imodel-resolver";
import {IValidationGroup} from "../../src/ivalidation-group";

describe('Validation Group', function () {

    var createValidationGroupFor = function(model, ruleset) : IValidationGroup {
        var fieldErrorProcessor = new FieldErrorProcessor(ruleRegistry);
        var ruleResolver = new RuleResolver();
        var validationSettings = new DefaultValidationSettings(new PropertyResolver());
        return new ValidationGroup(fieldErrorProcessor, ruleResolver, ruleset, model, validationSettings, 50);
    }

    var createNonPollingValidationGroupFor = function(model, ruleset) {
        var fieldErrorProcessor = new FieldErrorProcessor(ruleRegistry);
        var ruleResolver = new RuleResolver();
        var validationSettings = new DefaultValidationSettings(new PropertyResolver());
        return new ValidationGroup(fieldErrorProcessor, ruleResolver, ruleset, model, validationSettings);
    }

    var delayedRequiresValid = (retval?:any=true, delay?:number=100) => { return {
        ruleName: "delayed",
        validate: function(modelResolver: IModelResolver, propertyName: string, options){
            return new Promise(function(resolve, reject){
                setTimeout(function() { resolve(modelResolver.resolve(propertyName) == "valid"); }, 100);
            });
        },
        getMessage: function(value, options) { return "delayed rule: " + value; }
    }};
/*
    it('should not notify if model watcher is not used', function (done) {
        var rulesetBuilder = new RulesetBuilder();
        var ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRule("maxLength", 15)
            .build();

        var dummyModel = {
            foo: "hello"
        };

        setTimeout(function(){
            dummyModel.foo = "this is now no longer valid";
        }, 100);

        var validationGroup = createNonPollingValidationGroupFor(dummyModel, ruleset);
        //var validationGroup = createValidationGroupFor(dummyModel, ruleset);
        setTimeout(function() {
            expect(validationGroup.propertyErrors).to.be.empty;
            done();
        },600);

    });
*/
    it('should correctly get errors', function (done) {

        var dummyRuleRegistry = { hasRuleNamed: function(){ return true; }};
        var rulesetBuilder = new RulesetBuilder(<any>dummyRuleRegistry);
        var ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRule("maxLength", 2)
            .build();

        var dummyModel = {
            foo: "hello"
        };

        var validationGroup = createValidationGroupFor(dummyModel, ruleset);
        validationGroup.getModelErrors()
            .then(function(errors){
                expect(errors).not.to.be.null;
                expect(errors).to.include.keys("foo");
                validationGroup.release();
                done();
            }).catch(done);

    });

    it('should apply appliesId rules correctly for TRUE', function (done) {

        var dummyRuleRegistry = { hasRuleNamed: function(){ return true; }};
        var rulesetBuilder = new RulesetBuilder(<any>dummyRuleRegistry);
        var ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRule("maxLength", 2)
            .appliesIf((v,o) => { return dummyModel.checkFoo })
            .build();

        var dummyModel = {
            foo: "hello",
            checkFoo: true
        };

        var validationGroup = createValidationGroupFor(dummyModel, ruleset);
        validationGroup.getModelErrors()
            .then(function(errors){
                expect(errors).not.to.be.null;
                expect(errors).to.include.keys("foo");
                validationGroup.release();
                done();
            }).catch(done);
    });


    it('should apply appliesId rules correctly for FALSE', function (done) {

        var dummyRuleRegistry = { hasRuleNamed: function(){ return true; }};
        var rulesetBuilder = new RulesetBuilder(<any>dummyRuleRegistry);
        var ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRule("maxLength", 2)
            .appliesIf((v,o) => { return dummyModel.checkFoo })
            .build();

        var dummyModel = {
            foo: "hello",
            checkFoo: false
        };

        var validationGroup = createValidationGroupFor(dummyModel, ruleset);
        validationGroup.getModelErrors()
            .then(function(errors){
                expect(errors).not.to.be.null;
                expect(errors).not.to.include.keys("foo");
                validationGroup.release();
                done();
            }).catch(done);
    });


    it('should correctly get errors in nested objects', function (done) {

        var rulesetBuilder = new RulesetBuilder();
        var elementRuleset = rulesetBuilder.create()
            .forProperty("bar")
            .addRule("required", true)
            .addRule("maxLength", 5)
            .build();

        var ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRuleset(elementRuleset)
            .build();

        var dummyModel = {
            foo: { bar: "not valid" }
        };

        var validationGroup = createValidationGroupFor(dummyModel, ruleset);
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

    it('should correctly get errors in complex arrays', function (done) {

        var rulesetBuilder = new RulesetBuilder();
        var elementRuleset = rulesetBuilder.create()
            .forProperty("bar")
            .addRule("required")
            .addRule("maxLength", 5)
            .build();

        var ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRulesetForEach(elementRuleset)
            .build();

        var dummyModel = {
            foo: [
                { bar: "hello" },
                { bar: "" },
                { bar: "too long" }
            ]
        };

        var validationGroup = createValidationGroupFor(dummyModel, ruleset);
        validationGroup.getModelErrors()
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

        var rulesetBuilder = new RulesetBuilder();
        var ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRuleForEach("maxValue", 25)
            .build();

        var dummyModel = {
            foo: [ 10, 20, 30 ]
        };

        var validationGroup = createValidationGroupFor(dummyModel, ruleset);
        validationGroup.getModelErrors()
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

        var rulesetBuilder = new RulesetBuilder();
        var ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRule("maxLength", 2)
            .build();

        var dummyModel = {
            foo: "hello"
        };

        var validationGroup = createValidationGroupFor(dummyModel, ruleset);
        validationGroup.validate().then(v => {
            validationGroup.getPropertyError("foo")
                .then(function (error) {
                    expect(error).not.to.be.null;
                    expect(error).to.contain("2");
                    expect(error).to.contain("5");
                    validationGroup.release();
                    done();
                }).catch(done);
        })
    });

    it('should correctly get nested property error', function (done) {

        var rulesetBuilder = new RulesetBuilder();
        var elementRuleset = rulesetBuilder.create()
            .forProperty("bar")
            .addRule("required", true)
            .addRule("maxLength", 5)
            .build();

        var ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRuleset(elementRuleset)
            .build();

        var dummyModel = {
            foo: { bar: "not valid" }
        };

        var validationGroup = createValidationGroupFor(dummyModel, ruleset);
        validationGroup.validate().then(v => {
            validationGroup.getPropertyError("foo.bar")
            .then(function(error){
                expect(error).not.to.be.null;
                expect(error).to.contain("9");
                expect(error).to.contain("5");
                validationGroup.release();
                done();
            }).catch(done) });
    });

    it('should correctly get property error in complex arrays', function (done) {

        var rulesetBuilder = new RulesetBuilder();
        var elementRuleset = rulesetBuilder.create()
            .forProperty("bar")
            .addRule("required")
            .addRule("maxLength", 5)
            .build();

        var ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRulesetForEach(elementRuleset)
            .build();

        var dummyModel = {
            foo: [
                { bar: "hello" },
                { bar: "" },
                { bar: "too long" }
            ]
        };

        var validationGroup = createValidationGroupFor(dummyModel, ruleset);
        var checkOne = validationGroup.validate().then(v => {
            validationGroup.getPropertyError("foo[1].bar")
            .then(function(error){
                console.log(error);
                expect(error).not.to.be.null;
                expect(error).to.contain("required");
            });

        var checkTwo = validationGroup.getPropertyError("foo[2].bar")
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
    })});


    it('should correctly get property error in simple array', function (done) {

        var rulesetBuilder = new RulesetBuilder();
        var ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRuleForEach("maxValue", 25)
            .build();

        var dummyModel = {
            foo: [ 10, 20, 30 ]
        };

        var validationGroup = createValidationGroupFor(dummyModel, ruleset);
        validationGroup.validate().then(v => {
            validationGroup.validateProperty("foo[2]")
            .then(v => {  console.log(validationGroup.propertyErrors); return validationGroup.getPropertyError("foo[2]")})
            .then(function(error){
                expect(error).not.to.be.null;
                expect(error).to.contain("25");
                expect(error).to.contain("30");
                validationGroup.release();
                done();
            }).catch(done); })
    });

    it('should return undefined if no error exists for property', function (done) {

        var rulesetBuilder = new RulesetBuilder();
        var ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRule("maxLength", 2)
            .build();

        var dummyModel = {
            foo: "hello"
        };

        var validationGroup = createValidationGroupFor(dummyModel, ruleset);
        validationGroup.validateProperty("nothing")
            .then(() => validationGroup.getPropertyError("nothing"))
            .then(error => {
                expect(error).to.be.undefined;
                validationGroup.release();
                done();
            }).catch(done);
    });

    it('should not apply array errors to child indexes', function (done) {

        var rulesetBuilder = new RulesetBuilder();
        var ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRule("maxLength", 2)
            .addRuleForEach("maxValue", 100)
            .build();

        var dummyModel = {
            foo: [ 10, 20, 30 ]
        };

        var validationGroup = createValidationGroupFor(dummyModel, ruleset);
        validationGroup.getModelErrors()
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

        var rulesetBuilder = new RulesetBuilder();
        var elementRuleset = rulesetBuilder.create()
            .forProperty("bar")
            .addRule("required")
            .addRule("maxLength", 5)
            .build();

        var ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRulesetForEach(elementRuleset)
            .build();

        var dummyModel = {
            foo: [
                { bar: "hello" },
                { bar: "" }
            ]
        };

        var validationGroup = createValidationGroupFor(dummyModel, ruleset);

        dummyModel.foo.push({ bar: "too long" });

        setTimeout(function(){
            validationGroup.getModelErrors()
                .then(function(errors){
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


    it('should correctly notify on property validation change', function (done) {

        var rulesetBuilder = new RulesetBuilder();
        var ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRule("maxLength", 15)
            .build();

        var dummyModel = {
            foo: "hello"
        };

        var validationGroup = createValidationGroupFor(dummyModel, ruleset);
        validationGroup.propertyStateChangedEvent.subscribe(function(args){
            expect(args.isValid).to.be.false;
            expect(args.error).contains("15");
            expect(args.property).to.equal("foo");
            validationGroup.release();
            done();
        });

        validationGroup.validate();

        setTimeout(function(){
            dummyModel.foo = "still valid";
            console.log("This is still valid")
        }, 50);

        setTimeout(function(){
            dummyModel.foo = "this is now no longer valid";
            console.log("This is not valid");
        }, 100);
    });
    it('should correctly notify on property in nested object validation change', function (done) {

        var rulesetBuilder = new RulesetBuilder();
        var childRuleset = rulesetBuilder.create()
            .forProperty("bar")
                .addRule("maxLength", 5)
            .build();

        var ruleset = rulesetBuilder.create()
            .forProperty("foo")
                .addRuleset(childRuleset)
            .build();

        var dummyModel = {
            foo: {
                bar: "fine"
            }
        };

        var validationGroup = createValidationGroupFor(dummyModel, ruleset);
        validationGroup.propertyStateChangedEvent.subscribe(function(args){
            expect(args.isValid).to.be.false;
            expect(args.error).contains("27");
            expect(args.property).to.equal("foo.bar");
            validationGroup.release();
            done();
        });

        setTimeout(function(){
            dummyModel.foo.bar = "ok";
        }, 50);

        setTimeout(function(){
            dummyModel.foo.bar = "this is now no longer valid";
        }, 100);
    });

    it('should correctly notify on array property validation change', function (done) {

        var rulesetBuilder = new RulesetBuilder();
        var ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRuleForEach("maxValue", 15)
            .build();

        var dummyModel = {
            foo: [10, 15, 10]
        };

        var validationGroup = createValidationGroupFor(dummyModel, ruleset);
        validationGroup.propertyStateChangedEvent.subscribe(function(args){
            expect(args.isValid).to.be.false;
            expect(args.error).contains("15");
            expect(args.error).contains("20");
            expect(args.property).to.equal("foo[2]");
            validationGroup.release();
            done();
        });

        setTimeout(function(){
            dummyModel.foo[2] = 10;
            console.log("This is still valid")
        }, 50);

        setTimeout(function(){
            dummyModel.foo[2] = 20;
            console.log("This is not valid");
        }, 100);
    });

    it('should only notify array and not properties with validation change', function (done) {

        var rulesetBuilder = new RulesetBuilder();
        var ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRule("maxLength", 2)
            .build();

        var dummyModel = {
            foo: [10, 15]
        };

        var validationGroup = createValidationGroupFor(dummyModel, ruleset);
        console.log(validationGroup.modelWatcher)

        validationGroup.propertyStateChangedEvent.subscribe(function(args){
            console.log("triggered", args);
            expect(args.isValid).to.be.false;
            expect(args.error).contains("3");
            expect(args.error).contains("2");
            expect(args.property).to.equal("foo");
            validationGroup.release();
            done();
        });

        dummyModel.foo.push(10);
    });





    it('should correctly notify on validation change', function (done) {

        var rulesetBuilder = new RulesetBuilder();
        var ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRule("maxLength", 15)
            .build();

        var dummyModel = {
            foo: "hello"
        };

        var validationGroup = createValidationGroupFor(dummyModel, ruleset);
        validationGroup.modelStateChangedEvent.subscribe(function(args){
            expect(args.isValid).to.be.false;
            validationGroup.release();
            done();
        });

        setTimeout(function(){
            dummyModel.foo = "still valid";
        }, 50);

        setTimeout(function(){
            dummyModel.foo = "this is now no longer valid";
        }, 100);
    });


    it('should correctly provide errors', function (done) {

        var rulesetBuilder = new RulesetBuilder();
        var ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRule("maxLength", 15)
            .build();

        var dummyModel = {
            foo: "this is not valid so should fail"
        };

        var validationGroup = createValidationGroupFor(dummyModel, ruleset);
        validationGroup.getModelErrors().then(function(errors){
            expect(errors).not.to.be.null;
            expect(errors).to.include.keys("foo");
            expect(errors.foo).to.contain("32");
            expect(errors.foo).to.contain("15");
            validationGroup.release();
            done();
        }).catch(done);
    });

    it('should correctly return promise indicating validity', function (done) {

        var rulesetBuilder = new RulesetBuilder();
        var ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRule("maxLength", 15)
            .build();

        var dummyModel = {
            foo: "this is not valid so should fail"
        };

        var validationGroup = createValidationGroupFor(dummyModel, ruleset);
        validationGroup.getModelErrors().then(function(errors){
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
        var delayedRequiresValid: any = {
            ruleName: "delayed",
            validate: function(modelResolver: IModelResolver, prop: string, options){
                return new Promise(function(resolve, reject){
                    setTimeout(function() { resolve(modelResolver.resolve(prop) == "valid"); }, 200);
                });
            },
            getMessage: function(value, options) { return "delayed rule: " + value; }
        };

        ruleRegistry.registerRule(delayedRequiresValid);

        var rulesetBuilder = new RulesetBuilder();
        var ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRule("delayed")
            .build();

        var dummyModel = {
            foo: "invalid"
        };

        var validationGroup = createValidationGroupFor(dummyModel, ruleset);
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

        var rulesetBuilder = new RulesetBuilder();
        var ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRule("delayed")
            .build();

        var dummyModel = {
            foo: "invalid"
        };

        var validationGroup = createValidationGroupFor(dummyModel, ruleset);
        validationGroup.validate()
            .then(function(isValid){
                expect(isValid).to.be.true;
                validationGroup.release();
                done();
            }).catch(done);

        dummyModel.foo = "invalid";
        dummyModel.foo = "valid";
    });

    it('validation status should cycle between states', function (done) {

        ruleRegistry.registerRule(delayedRequiresValid(true, 50));

        var rulesetBuilder = new RulesetBuilder();
        var ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRule("delayed")
            .build();

        var dummyModel = {
            foo: "invalid"
        };

        var validationGroup = createValidationGroupFor(dummyModel, ruleset);

        expect(validationGroup.ValidationState).equals("valid");

        validationGroup.validate()
            .then(function(isValid){
                expect(validationGroup.ValidationState).equals("valid");
                expect(isValid).to.be.true;
                validationGroup.release();
                done();
            }).catch(done);

        expect(validationGroup.ValidationState).equals("calculating");

        dummyModel.foo = "invalid";
        dummyModel.foo = "valid";
    });


    it('should correctly delay error requests until validation has finished', function (done) {

        var delayedRequires10Rule: any = {
            ruleName: "delayed",
            validate: function(mr, prop, options){
                return new Promise(function(resolve, reject){
                    setTimeout(function() { resolve(mr.resolve(prop) == 10); }, 100);
                });
            },
            getMessage: function(value, options) { return "delayed rule: " + value; }
        };

        ruleRegistry.registerRule(delayedRequires10Rule);

        var rulesetBuilder = new RulesetBuilder();
        var ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRule("delayed")
            .build();

        var dummyModel: any = {
            foo: "hello"
        };

        var validationGroup = createValidationGroupFor(dummyModel, ruleset);

        // This starts the initial validation chain so delays it
        var promise1 = validationGroup.getModelErrors()
            .then(function(errors){
                expect(errors).to.be.empty;
            }).catch(done);

        dummyModel.foo = 10;

        var promise2 = validationGroup.getModelErrors()
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
            })
    });

    it('should correctly update errors when model changed', function (done) {

        var rulesetBuilder = new RulesetBuilder();
        var ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRule("maxLength", 2)
            .build();

        var validationGroup = createValidationGroupFor({ foo: "invalid" }, ruleset);
        validationGroup.changeValidationTarget({ foo: "ok" });
        validationGroup.getModelErrors()
            .then(function(errors){
                expect(errors).to.be.empty;
                validationGroup.release();
                done();
            }).catch(done);
    });

    it('should correctly allow empty model then update errors when model changed', function (done) {

        var rulesetBuilder = new RulesetBuilder();
        var ruleset = rulesetBuilder.create()
            .forProperty("foo")
                .addRule("maxLength", 2)
            .forProperty("bar")
                .addRuleForEach("maxValue", 10)
            .build();

        var validationGroup = createValidationGroupFor(null, ruleset);
        validationGroup.changeValidationTarget({ foo: "not ok", bar: [ 20, 10 ]  });
        validationGroup.getModelErrors()
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

        var rulesetBuilder = new RulesetBuilder();
        var ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRule("maxLength", 2)
            .forProperty("bar")
            .addRuleForEach("maxValue", 10)
            .build();

        var changingModel: any = {};
        var validationGroup = createValidationGroupFor(changingModel, ruleset);
        changingModel.foo = "not ok";
        changingModel.bar = [ 20, 10 ];

        console.log("model updated", changingModel);
        setTimeout(function(){
            validationGroup.getModelErrors()
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
        var rulesetBuilder = new RulesetBuilder();
        var ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRule("required")
            .build();

        var model = {
            foo: null
        };

        var validationGroup = createValidationGroupFor(model, ruleset);

        model.foo = "valid";

        validationGroup.getModelErrors()
            .then((errors) => {
                console.log("errors", errors);
                expect(errors).to.be.empty;
                done();
            })
            .catch(done);
    });

});