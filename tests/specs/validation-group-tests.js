var assert = chai.assert;
var expect = chai.expect;

describe('Validation Group', function () {

    var createValidationGroupFor = function(model, ruleset) {
        var fieldErrorProcessor = new Treacherous.FieldErrorProcessor(Treacherous.ruleRegistry);
        var propertyResolver = new PropertyResolver();
        var ruleResolver = new Treacherous.RuleResolver();
        var modelWatcher = new Treacherous.ModelWatcher();
        return new Treacherous.ValidationGroup(fieldErrorProcessor, modelWatcher, propertyResolver, ruleResolver, ruleset, model, 50);
    }

    it('should correctly get errors', function (done) {

        var rulesetBuilder = new Treacherous.RulesetBuilder();
        var ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRule("maxLength", 2)
            .build();

        var dummyModel = {
            foo: "hello"
        };

        var validationGroup = createValidationGroupFor(dummyModel, ruleset);
        validationGroup.getErrors()
            .then(function(errors){
                expect(errors).not.to.be.null;
                expect(errors).to.include.keys("foo");
                validationGroup.release();
                done();
            });
    });

    it('should correctly get errors in nested objects', function (done) {

        var rulesetBuilder = new Treacherous.RulesetBuilder();
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
        validationGroup.getErrors()
            .then(function(errors){
                expect(errors).not.to.be.null;
                expect(errors).to.include.keys("foo.bar");
                expect(errors["foo.bar"]).to.contain("5");
                expect(errors["foo.bar"]).to.contain("9");
                validationGroup.release();
                done();
            });
    });

    it('should correctly get errors in complex arrays', function (done) {

        var rulesetBuilder = new Treacherous.RulesetBuilder();
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
        validationGroup.getErrors()
            .then(function(errors){
                expect(errors).not.to.be.null;
                expect(errors).to.include.keys("foo[1].bar");
                expect(errors["foo[1].bar"]).to.contain("required");
                expect(errors).to.include.keys("foo[2].bar");
                expect(errors["foo[2].bar"]).to.contain("8");
                expect(errors["foo[2].bar"]).to.contain("5");
                validationGroup.release();
                done();
            });
    });

    it('should correctly get errors in simple arrays', function (done) {

        var rulesetBuilder = new Treacherous.RulesetBuilder();
        var ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRuleForEach("maxValue", 25)
            .build();

        var dummyModel = {
            foo: [ 10, 20, 30 ]
        };

        var validationGroup = createValidationGroupFor(dummyModel, ruleset);
        validationGroup.getErrors()
            .then(function(errors){
                expect(errors).not.to.be.null;
                expect(errors).to.include.keys("foo[2]");
                expect(errors["foo[2]"]).to.contain("25");
                expect(errors["foo[2]"]).to.contain("30");
                validationGroup.release();
                done();
            });
    });

    it('should not apply array errors to child indexes', function (done) {

        var rulesetBuilder = new Treacherous.RulesetBuilder();
        var ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRule("maxLength", 2)
            .addRuleForEach("maxValue", 100)
            .build();

        var dummyModel = {
            foo: [ 10, 20, 30 ]
        };

        var validationGroup = createValidationGroupFor(dummyModel, ruleset);
        validationGroup.getErrors()
            .then(function(errors){
                console.log(errors);
                expect(errors).not.to.be.null;
                expect(Object.keys(errors).length).to.equal(1);
                expect(errors).to.include.keys("foo");
                expect(errors["foo"]).to.contain("2");
                expect(errors["foo"]).to.contain("3");
                validationGroup.release();
                done();
            });
    });

    it('should correctly get errors when invalid elements added to arrays', function (done) {

        var rulesetBuilder = new Treacherous.RulesetBuilder();
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
            validationGroup.getErrors()
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
                });
        }, 100);
    });

    it('should correctly notify on property validation change', function (done) {

        var rulesetBuilder = new Treacherous.RulesetBuilder();
        var ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRule("maxLength", 15)
            .build();

        var dummyModel = {
            foo: "hello"
        };

        var validationGroup = createValidationGroupFor(dummyModel, ruleset);
        validationGroup.propertyChangedEvent.subscribe(function(args){
            expect(args.isValid).to.be.false;
            expect(args.error).contains("15");
            expect(args.property).to.equal("foo");
            validationGroup.release();
            done();
        });

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

        var rulesetBuilder = new Treacherous.RulesetBuilder();
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
        validationGroup.propertyChangedEvent.subscribe(function(args){
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

        var ruleRegistry = new Treacherous.RuleRegistry();
        ruleRegistry.registerRule(new Treacherous.MaxValueValidationRule());

        var fieldErrorProcessor = new Treacherous.FieldErrorProcessor(ruleRegistry);
        var propertyResolver = new PropertyResolver();
        var ruleResolver = new Treacherous.RuleResolver();

        var rulesetBuilder = new Treacherous.RulesetBuilder();
        var ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRuleForEach("maxValue", 15)
            .build();

        var dummyModel = {
            foo: [10, 15, 10]
        };

        var modelWatcher = new Treacherous.ModelWatcher();
        var validationGroup = new Treacherous.ValidationGroup(fieldErrorProcessor, modelWatcher, propertyResolver, ruleResolver, ruleset, dummyModel);
        validationGroup.propertyChangedEvent.subscribe(function(args){
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

        var rulesetBuilder = new Treacherous.RulesetBuilder();
        var ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRule("maxLength", 2)
            .build();

        var dummyModel = {
            foo: [10, 15]
        };

        var validationGroup = createValidationGroupFor(dummyModel, ruleset);
        validationGroup.propertyChangedEvent.subscribe(function(args){
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

        var rulesetBuilder = new Treacherous.RulesetBuilder();
        var ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRule("maxLength", 15)
            .build();

        var dummyModel = {
            foo: "hello"
        };

        var validationGroup = createValidationGroupFor(dummyModel, ruleset);
        validationGroup.validationStateChangedEvent.subscribe(function(args){
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

        var rulesetBuilder = new Treacherous.RulesetBuilder();
        var ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRule("maxLength", 15)
            .build();

        var dummyModel = {
            foo: "this is not valid so should fail"
        };

        var validationGroup = createValidationGroupFor(dummyModel, ruleset);
        validationGroup.getErrors().then(function(errors){
            expect(errors).not.to.be.null;
            expect(errors).to.include.keys("foo");
            expect(errors.foo).to.contain("32");
            expect(errors.foo).to.contain("15");
            validationGroup.release();
            done();
        });
    });

    it('should correctly return promise indicating validity', function (done) {

        var rulesetBuilder = new Treacherous.RulesetBuilder();
        var ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRule("maxLength", 15)
            .build();

        var dummyModel = {
            foo: "this is not valid so should fail"
        };

        var validationGroup = createValidationGroupFor(dummyModel, ruleset);
        validationGroup.getErrors().then(function(errors){
            expect(errors).not.to.be.null;
            expect(errors).to.include.keys("foo");
            expect(errors.foo).to.contain("32");
            expect(errors.foo).to.contain("15");
            validationGroup.release();
            done();
        });
    });

    it('should only return errors when all validation events have finished', function (done) {

        // This basically delays validation so others stack
        var delayedRequiresValid = {
            ruleName: "delayed",
            validate: function(value, options){
                return new Promise(function(resolve, reject){
                    setTimeout(function() { resolve(value == "valid"); }, 200);
                });
            },
            getMessage: function(value, options) { return "delayed rule: " + value; }
        };

        Treacherous.ruleRegistry.registerRule(delayedRequiresValid);

        var rulesetBuilder = new Treacherous.RulesetBuilder();
        var ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRule("delayed")
            .build();

        var dummyModel = {
            foo: "invalid"
        };

        var validationGroup = createValidationGroupFor(dummyModel, ruleset);
        validationGroup.getErrors()
            .then(function(errors){
                expect(errors).to.be.empty;
                validationGroup.release();
                done();
            });

        dummyModel.foo = "invalid";
        dummyModel.foo = "valid";
    });

    it('should only return valid state when all validation events have finished', function (done) {

        var delayedRequiresValid = {
            ruleName: "delayed",
            validate: function(value, options){
                return new Promise(function(resolve, reject){
                    setTimeout(function() { resolve(value == "valid"); }, 100);
                });
            },
            getMessage: function(value, options) { return "delayed rule: " + value; }
        };

        Treacherous.ruleRegistry.registerRule(delayedRequiresValid);

        var rulesetBuilder = new Treacherous.RulesetBuilder();
        var ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRule("delayed")
            .build();

        var dummyModel = {
            foo: "invalid"
        };

        var validationGroup = createValidationGroupFor(dummyModel, ruleset);
        validationGroup.isValid()
            .then(function(isValid){
                expect(isValid).to.be.true;
                validationGroup.release();
                done();
            });

        dummyModel.foo = "invalid";
        dummyModel.foo = "valid";
    });

    it('should correctly delay error requests until validation has finished', function (done) {

        var delayedRequires10Rule = {
            ruleName: "delayed",
            validate: function(value, options){
                return new Promise(function(resolve, reject){
                    setTimeout(function() { resolve(value == 10); }, 100);
                });
            },
            getMessage: function(value, options) { return "delayed rule: " + value; }
        };

        Treacherous.ruleRegistry.registerRule(delayedRequires10Rule);

        var rulesetBuilder = new Treacherous.RulesetBuilder();
        var ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRule("delayed")
            .build();

        var dummyModel = {
            foo: "hello"
        };

        var validationGroup = createValidationGroupFor(dummyModel, ruleset);

        // This starts the initial validation chain so delays it
        var promise1 = validationGroup.getErrors()
            .then(function(errors){
                expect(errors).to.be.empty;
            });

        dummyModel.foo = 10;

        var promise2 = validationGroup.getErrors()
            .then(function(errors){
                expect(errors).to.be.empty;
            });

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

});