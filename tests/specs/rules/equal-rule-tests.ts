import {expect} from "chai";
import {EqualValidationRule} from "../../../src/rules/equal-validation-rule";
import {PropertyResolver} from "property-resolver";
import {ModelResolver} from "../../../src/resolvers/model-resolver";

describe("Validation Rules", function(){
    describe('Equal Rule', function () {

        it('should be valid when the comparitor is a function which equals the value', function (done) {
            var modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.a = 10;

            var rule = new EqualValidationRule();
            rule.validate(modelResolver, "a", () => 10).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when numbers equal', function (done) {
            var modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.a = 10;

            var rule = new EqualValidationRule();
            rule.validate(modelResolver,"a", 10).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when strings equal', function (done) {
            var modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.a = "hello";

            var rule = new EqualValidationRule();
            rule.validate(modelResolver, "a", "hello").then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when number weak equality string', function (done) {
            var modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.a = 10;

            var rule = new EqualValidationRule();
            rule.validate(modelResolver, "a", { value: "10", weakEquality: true }).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when dates equal', function (done) {
            var modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.a = new Date(1995, 11, 17);

            var rule = new EqualValidationRule();
            rule.validate(modelResolver, "a", new Date(1995, 11, 17)).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when provided a null value', function (done) {
            var modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.a = null;

            var rule = new EqualValidationRule();
            rule.validate(modelResolver, "a", {}).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be invalid when number does not equal same number as string without weak equality', function (done) {
            var modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.a = 10;

            var rule = new EqualValidationRule();
            rule.validate(modelResolver, "a", "10").then(function(isValid){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });

        it('should be invalid when number does not equal comparison', function (done) {
            var modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.a = 10;

            var rule = new EqualValidationRule();
            rule.validate(modelResolver, "a", 20).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });
    });
});