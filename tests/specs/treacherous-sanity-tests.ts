import {expect} from "chai";
import {createRuleset, createGroup, createGroupWithRules, ruleRegistry} from "../../src/exposer";
import {Ruleset} from "../../src/rulesets/ruleset";

describe('Treacherous Sanity Checks', function () {

    it('should correctly expose methods', function () {
        var ruleBuilder = createRuleset();
        expect(ruleBuilder).is.not.null;
        expect(ruleBuilder.create).to.be.a("function");

        var validationGroup = createGroup({}, new Ruleset());
        expect(validationGroup).is.not.null;
        expect(validationGroup.getModelErrors).to.be.a("function");

        var validationGroupExplicitRules = createGroupWithRules({}, function(rulesetBuilder){
            return rulesetBuilder.create().build();
        });
        expect(validationGroupExplicitRules).is.not.null;
        expect(validationGroupExplicitRules.getModelErrors).to.be.a("function");
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

        var validationGroup = createGroup(dummyModel, ruleset);

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

        var invoiceValidationGroup = createGroup(dummyInvoice, invoiceRuleSet);

        dummyOrder1.products.push(dummyProduct1);
        dummyOrder1.products.push(dummyProduct2);

        invoiceValidationGroup.getModelErrors()
            .then(function(errors){
                console.log("errors", errors);
                expect(errors).to.include.keys("orders[0].products[0].deliveryDate");
                expect(errors).to.include.keys("orders[0].products[1].deliveryDate");
                expect(errors).to.include.keys("orders[1].products[0].deliveryDate");
                expect(errors).to.include.keys("orders[1].products[1].deliveryDate");
                done();
            }).catch(done);
    });

    // TODO: This needs fixing but needs discussion on purely state checks
    it.skip("should correctly be invalid after changes", function(done){
        var ruleSet = createRuleset()
            .forProperty("stringValue1").addRule("required")
            .forProperty("stringValue2").addRule("required")
            .build();

        var model = {
            stringValue1: "",
            stringValue2: ""
        };

        var isValid;
        var valGroup = createGroup(model, ruleSet);
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
});