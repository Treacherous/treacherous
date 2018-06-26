import {describe, it} from "mocha";
import {expect} from "chai";
import {PropertyResolver} from "property-resolver";
import {FieldErrorProcessor} from "../../src/processors/field-error-processor";
import {RulesetBuilder} from "../../src/builders/ruleset-builder";
import {RuleResolver} from "../../src/rulesets/rule-resolver";
import {ReactiveValidationGroup} from "../../src/validation-groups/reactive-validation-group";
import {IReactiveValidationGroup} from "../../src/validation-groups/ireactive-validation-group";
import {ruleRegistry} from "../../src/rule-registry-setup";
import {ModelResolverFactory} from "../../src/factories/model-resolver-factory";
import {ModelWatcherFactory} from "../../src/factories/model-watcher-factory";
import {DefaultLocaleHandler} from "../../src/localization/default-locale-handler";
import {locale as defaultLocale} from "../../src/locales/en-us";

describe('Reactive Validation Group', function () {

    const createValidationGroupFor = (model: any, ruleset: any) : IReactiveValidationGroup => {
        const defaultLocaleHandler = new DefaultLocaleHandler();
        defaultLocaleHandler.registerLocale("en-us", defaultLocale);
        defaultLocaleHandler.useLocale("en-us");
        
        const fieldErrorProcessor = new FieldErrorProcessor(ruleRegistry, defaultLocaleHandler);
        const ruleResolver = new RuleResolver();
        const modelResolverFactory = new ModelResolverFactory();
        const modelWatcherFactory = new ModelWatcherFactory();
        return new ReactiveValidationGroup(fieldErrorProcessor, ruleResolver, modelResolverFactory, 
            modelWatcherFactory, defaultLocaleHandler, model, ruleset, 50);
    }

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
        validationGroup.propertyStateChangedEvent.subscribe(function(args: any){
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

        const rulesetBuilder = new RulesetBuilder();
        const childRuleset = rulesetBuilder.create()
            .forProperty("bar")
                .addRule("maxLength", 5)
            .build();

        const ruleset = rulesetBuilder.create()
            .forProperty("foo")
                .addRuleset(childRuleset)
            .build();

        const dummyModel = {
            foo: {
                bar: "fine"
            }
        };

        const validationGroup = createValidationGroupFor(dummyModel, ruleset);
        validationGroup.propertyStateChangedEvent.subscribe(function(args: any){
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

        const rulesetBuilder = new RulesetBuilder();
        const ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRuleForEach("maxValue", 15)
            .build();

        const dummyModel = {
            foo: [10, 15, 10]
        };

        const validationGroup = createValidationGroupFor(dummyModel, ruleset);
        validationGroup.propertyStateChangedEvent.subscribe(function(args: any){
            console.log("args", args);
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

        const rulesetBuilder = new RulesetBuilder();
        const ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRule("maxLength", 2)
            .build();

        const dummyModel = {
            foo: [10, 15]
        };

        const validationGroup = createValidationGroupFor(dummyModel, ruleset);
        validationGroup.propertyStateChangedEvent.subscribe(function(args: any){
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

        const rulesetBuilder = new RulesetBuilder();
        const ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRule("maxLength", 15)
            .build();

        const dummyModel = {
            foo: "hello"
        };

        const validationGroup = createValidationGroupFor(dummyModel, ruleset);
        validationGroup.modelStateChangedEvent.subscribe(function(args: any){
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
});