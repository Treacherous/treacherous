import {describe, it} from "mocha";
import {expect} from "chai";
import {createRuleset, createGroup} from "../../src/exposer";
import {Ruleset} from "../../src/rulesets/ruleset";
import {ruleRegistry} from "../../src/rule-registry-setup";
import {DefaultLocaleHandler} from "../../src/localization/default-locale-handler";

describe('Treacherous Sanity Checks', function () {

    it('should correctly expose methods', function () {
        const ruleBuilder = createRuleset();
        expect(ruleBuilder).is.not.null;
        expect(ruleBuilder.create).to.be.a("function");

        const validationGroup = createGroup().build({}, new Ruleset());
        expect(validationGroup).is.not.null;
        expect(validationGroup.getModelErrors).to.be.a("function");
    });

    it('should correctly generate rules', function() {

       const ruleset = createRuleset()
           .forProperty("dummy")
           .addRule("required")
           .build();

        expect(ruleset).is.not.null;
    });

    it('should correctly expose the rule registry', function() {

        const requiredRule = ruleRegistry.getRuleNamed("required");
        expect(requiredRule).is.not.null;
    });

    it('should correctly validate simple array values with foreach', function(done) {

        const dummyModel = {
            foo: [10, 20, 30]
        };

        const ruleset = createRuleset()
            .forProperty("foo")
            .addRuleForEach("maxValue", 19)
            .build();

        const validationGroup = createGroup().build(dummyModel, ruleset);

        validationGroup.validate()
            .then(v => validationGroup.getModelErrors())
            .then(function(errors: any){
                console.log("errors", errors);
                expect(errors).to.include.keys("foo[1]");
                expect(errors).to.include.keys("foo[2]");
                expect(errors["foo[1]"]).to.contain("20");
                expect(errors["foo[2]"]).to.contain("30");
                validationGroup.release();
                done();
            }).catch(done);
    });

    it("should correctly validate dynamic nested arrays", function(done){
        // product validation rules
        const productRuleSet = createRuleset()
            .forProperty("deliveryDate")
            .addRule("required")
            .build();

        // order validation rules
        const orderRuleSet = createRuleset()
            .forProperty("products")
            .addRulesetForEach(productRuleSet)
            .build();

        // invoice validation rules
        const invoiceRuleSet = createRuleset()
            .forProperty("orders")
            .addRulesetForEach(orderRuleSet)
            .build();

        const dummyProduct1: any = { deliveryDate: null };
        const dummyProduct2: any = { deliveryDate: null };
        const dummyProduct3: any = { deliveryDate: null };
        const dummyProduct4: any = { deliveryDate: null };

        const dummyOrder1: any = { products: [ ] };
        const dummyOrder2: any = { products: [ dummyProduct3, dummyProduct4 ] };

        const dummyInvoice = {
            orders: [ dummyOrder1, dummyOrder2 ]
        };

        const invoiceValidationGroup = createGroup().build(dummyInvoice, invoiceRuleSet);

        dummyOrder1.products.push(dummyProduct1);
        dummyOrder1.products.push(dummyProduct2);

        invoiceValidationGroup.getModelErrors(true)
            .then(function(errors: any){
                console.log("errors", errors);
                expect(errors).to.include.keys("orders[0].products[0].deliveryDate");
                expect(errors).to.include.keys("orders[0].products[1].deliveryDate");
                expect(errors).to.include.keys("orders[1].products[0].deliveryDate");
                expect(errors).to.include.keys("orders[1].products[1].deliveryDate");
                done();
            }).catch(done);
    });

    it("should correctly be invalid after changes when reactive and validate on startup", function(done){
        const ruleSet = createRuleset()
            .forProperty("stringValue1").addRule("required")
            .forProperty("stringValue2").addRule("required")
            .build();

        const model = {
            stringValue1: "",
            stringValue2: ""
        };

        let isValid: boolean;
        const valGroup = createGroup().asReactiveGroup().andValidateOnStart().build(model, ruleSet);
        valGroup.modelStateChangedEvent.subscribe(event => {
            console.log("changing state:", event);
            isValid = event.isValid;
        });

        valGroup.propertyStateChangedEvent.subscribe(event => {
            console.log("changing property:", event);
        });

        model.stringValue1 = "valid";
        setTimeout(() => model.stringValue1 = "", 600);
        setTimeout(() => {
            console.log("finished with:", isValid);
            expect(isValid).to.be.false;
            done();
        }, 1500);
    });

    it("should correctly allow composite rules and normal rules and work together", async function(){
        const message = "The total is not greater than 10";
        
        const ruleSet = createRuleset()
            .forProperty("number1").addRule("minValue", 1)
            .addDynamicRule("totalNumber",
                x => {
                     const total = x.resolve("number1") + x.resolve("number2");
                     return Promise.resolve(total > 10);
                })
            .build();

        const model = {
            number1: 0,
            number2: 0
        };

        const valGroup: any = createGroup().build(model, ruleSet);

        const localeHandler = <DefaultLocaleHandler>valGroup["localeHandler"];
        
        const compositeLocales: any = {};
        compositeLocales["totalNumber"] = message;
        localeHandler.supplementLocaleFrom("en-us", compositeLocales);

        const initialErrors = await valGroup.getModelErrors(true);
        expect(initialErrors).to.include.keys("number1");
        expect(initialErrors).to.include.keys("totalNumber");
        console.log("initial", initialErrors);

        model.number1 = 8;

        const nextErrors = await valGroup.getModelErrors(true);
        expect(nextErrors).to.not.include.keys("number1");
        expect(nextErrors).to.include.keys("totalNumber");
        console.log("next", nextErrors);

        model.number2 = 5;

        const noErrors = await valGroup.getModelErrors(true);
        expect(noErrors).to.not.include.keys("number1");
        expect(noErrors).to.not.include.keys("totalNumber");
        console.log("last", noErrors);
    });

});