import {expect} from "chai";
import {createRuleset, createGroup} from "../../src/exposer";
import {Ruleset} from "../../src/rulesets/ruleset";
import {ruleRegistry} from "../../src/rule-registry-setup";

describe('Treacherous Sanity Checks', function () {

    it('should correctly expose methods', function () {
        var ruleBuilder = createRuleset();
        expect(ruleBuilder).is.not.null;
        expect(ruleBuilder.create).to.be.a("function");

        var validationGroup = createGroup().build({}, new Ruleset());
        expect(validationGroup).is.not.null;
        expect(validationGroup.getModelErrors).to.be.a("function");
    });

    it('should correctly generate rules', function() {

       var ruleset = createRuleset()
           .forProperty("dummy")
           .addRule("required")
           .build();

        expect(ruleset).is.not.null;
    });

    it('should correctly expose the rule registry', function() {

        var requiredRule = ruleRegistry.getRuleNamed("required");
        expect(requiredRule).is.not.null;
    });

    it('should correctly validate simple array values with foreach', function(done) {

        var dummyModel = {
            foo: [10, 20, 30]
        };

        var ruleset = createRuleset()
            .forProperty("foo")
            .addRuleForEach("maxValue", 19)
            .build();

        var validationGroup = createGroup().build(dummyModel, ruleset);

        validationGroup.validate()
            .then(v => validationGroup.getModelErrors())
            .then(function(errors){
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
        var productRuleSet = createRuleset()
            .forProperty("deliveryDate")
            .addRule("required")
            .build();

        // order validation rules
        var orderRuleSet = createRuleset()
            .forProperty("products")
            .addRulesetForEach(productRuleSet)
            .build();

        // invoice validation rules
        var invoiceRuleSet = createRuleset()
            .forProperty("orders")
            .addRulesetForEach(orderRuleSet)
            .build();

        var dummyProduct1 = { deliveryDate: null };
        var dummyProduct2 = { deliveryDate: null };
        var dummyProduct3 = { deliveryDate: null };
        var dummyProduct4 = { deliveryDate: null };

        var dummyOrder1 = { products: [ ] };
        var dummyOrder2 = { products: [ dummyProduct3, dummyProduct4 ] };

        var dummyInvoice = {
            orders: [ dummyOrder1, dummyOrder2 ]
        };

        var invoiceValidationGroup = createGroup().build(dummyInvoice, invoiceRuleSet);

        dummyOrder1.products.push(dummyProduct1);
        dummyOrder1.products.push(dummyProduct2);

        invoiceValidationGroup.getModelErrors(true)
            .then(function(errors){
                console.log("errors", errors);
                expect(errors).to.include.keys("orders[0].products[0].deliveryDate");
                expect(errors).to.include.keys("orders[0].products[1].deliveryDate");
                expect(errors).to.include.keys("orders[1].products[0].deliveryDate");
                expect(errors).to.include.keys("orders[1].products[1].deliveryDate");
                done();
            }).catch(done);
    });

    it("should correctly be invalid after changes when reactive and validate on startup", function(done){
        var ruleSet = createRuleset()
            .forProperty("stringValue1").addRule("required")
            .forProperty("stringValue2").addRule("required")
            .build();

        var model = {
            stringValue1: "",
            stringValue2: ""
        };

        var isValid;
        var valGroup = createGroup().asReactiveGroup().andValidateOnStart().build(model, ruleSet);
        valGroup.modelStateChangedEvent.subscribe(event => {
            console.log("changing state:", event);
            isValid = event.isValid
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
        let ruleSet = createRuleset()
            .forProperty("number1").addRule("minValue", 1)
            .addDynamicRule("totalNumber",
                x => {
                     let total = x.resolve("number1") + x.resolve("number2");
                     return Promise.resolve(total > 10);
                },
                "The total is not greater than 10")
            .build();

        let model = {
            number1: 0,
            number2: 0
        };

        let valGroup = createGroup().build(model, ruleSet);

        let initialErrors = await valGroup.getModelErrors(true);
        expect(initialErrors).to.include.keys("number1");
        expect(initialErrors).to.include.keys("totalNumber");
        console.log("initial", initialErrors);

        model.number1 = 8;

        let nextErrors = await valGroup.getModelErrors(true);
        expect(nextErrors).to.not.include.keys("number1");
        expect(nextErrors).to.include.keys("totalNumber");
        console.log("next", nextErrors);

        model.number2 = 5;

        let noErrors = await valGroup.getModelErrors(true);
        expect(noErrors).to.not.include.keys("number1");
        expect(noErrors).to.not.include.keys("totalNumber");
        console.log("last", noErrors);
    });
});