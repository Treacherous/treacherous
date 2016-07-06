import {expect} from "chai";
import {NotEqualValidationRule} from "../../../src/rules/not-equal-validation-rule";

describe("Validation Rules", function(){
    describe('Not Equal Rule', function () {

        it('should be valid when numbers dont equal', function (done) {
            var rule = new NotEqualValidationRule();
            rule.validate(10, 12).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            });
        });

        it('should be valid when strings dont equal', function (done) {
            var rule = new NotEqualValidationRule();
            rule.validate("hello", "hello again").then(function(isValid){
                expect(isValid).to.be.true;
                done();
            });
        });

        it('should be valid when number does not weak equality string', function (done) {
            var rule = new NotEqualValidationRule();
            rule.validate(10, { value: "25", weakEquality: true }).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            });
        });

        it('should be valid when dates dont equal', function (done) {
            var rule = new NotEqualValidationRule();
            rule.validate(new Date(1995, 11, 17), new Date(1995, 11, 27)).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            });
        });

        it('should be valid when number and string are same but not using weak equality', function (done) {
            var rule = new NotEqualValidationRule();
            rule.validate(10, "10").then(function(isValid){
                expect(isValid).to.be.true;
                done();
            });
        });

        it('should be valid when provided a null value', function (done) {
            var rule = new NotEqualValidationRule();
            rule.validate(null, {}).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            });
        });

        it('should be invalid when number equals same number', function (done) {
            var rule = new NotEqualValidationRule();
            rule.validate(10, 10).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            });
        });

        it('should be invalid when number equals string number with weak equality', function (done) {
            var rule = new NotEqualValidationRule();
            rule.validate(10, { value: "10", weakEquality: true }).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            });
        });

    });
});