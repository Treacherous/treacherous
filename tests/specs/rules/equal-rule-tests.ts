import {expect} from "chai";
import {EqualValidationRule} from "../../../src/rules/equal-validation-rule";
import {PropertyResolver} from "property-resolver";
import {ModelHelper} from "../../../src/model-helper";

describe("Validation Rules", function(){
    describe('Equal Rule', function () {

        var modelHelper = new ModelHelper(new PropertyResolver(), {});

        it('should be valid when numbers equal', function (done) {
            var rule = new EqualValidationRule();
            modelHelper.model.a=10;

            rule.validate(modelHelper,'a', 10).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when strings equal', function (done) {
            var rule = new EqualValidationRule();
            modelHelper.model.a='hello';
            rule.validate(modelHelper, "a", "hello").then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when number weak equality string', function (done) {
            var rule = new EqualValidationRule();
            modelHelper.model.a = 10;
            rule.validate(modelHelper, 'a', { value: "10", weakEquality: true }).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when dates equal', function (done) {
            var rule = new EqualValidationRule();
            modelHelper.model.d = new Date(1995, 11, 17);
            rule.validate(modelHelper,'d', new Date(1995, 11, 17)).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when provided a null value', function (done) {
            var rule = new EqualValidationRule();
            modelHelper.model.null = null;
            rule.validate(modelHelper,'null', {}).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be invalid when number does not equal same number as string without weak equality', function (done) {
            var rule = new EqualValidationRule();
            modelHelper.model.a = 10;
            rule.validate(modelHelper, 'a', "10").then(function(isValid){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });

        it('should be invalid when number does not equal comparison', function (done) {
            var rule = new EqualValidationRule();
            modelHelper.model.a = 10;
            rule.validate(modelHelper,'a', 20).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });
    });
});