import {expect} from "chai";
import {EqualValidationRule} from "../../../src/rules/equal-validation-rule";

describe("Validation Rules", function(){
    describe('Equal Rule', function () {

        it('should be valid when numbers equal', function (done) {
            var rule = new EqualValidationRule();
            rule.validate(10, 10).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            });
        });

        it('should be valid when strings equal', function (done) {
            var rule = new EqualValidationRule();
            rule.validate("hello", "hello").then(function(isValid){
                expect(isValid).to.be.true;
                done();
            });
        });

        it('should be valid when number weak equality string', function (done) {
            var rule = new EqualValidationRule();
            rule.validate(10, { value: "10", weakEquality: true }).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            });
        });

        it('should be valid when dates equal', function (done) {
            var rule = new EqualValidationRule();
            rule.validate(new Date(1995, 11, 17), new Date(1995, 11, 17)).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            });
        });

        it('should be valid when provided a null value', function (done) {
            var rule = new EqualValidationRule();
            rule.validate(null, {}).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            });
        });

        it('should be invalid when number does not equal same number as string without weak equality', function (done) {
            var rule = new EqualValidationRule();
            rule.validate(10, "10").then(function(isValid){
                expect(isValid).to.be.false;
                done();
            });
        });

        it('should be invalid when number does not equal comparison', function (done) {
            var rule = new EqualValidationRule();
            rule.validate(10, 20).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            });
        });

    });
});