import {expect} from "chai";
import {DecimalValidationRule} from "../../../src/rules/decimal-validation-rule";

describe("Validation Rules", function(){
    describe('Decimal Rule', function () {

        it('should be valid when number is provided', function (done) {
            var rule = new DecimalValidationRule();
            var validNumber = 10;
            rule.validate(validNumber).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            });
        });

        it('should be valid when number string is provided', function (done) {
            var rule = new DecimalValidationRule();
            var validStringNumber = "10";
            rule.validate(validStringNumber).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            });
        });

        it('should be valid when a valid decimal is provided', function (done) {
            var rule = new DecimalValidationRule();
            var validDecimal = 10.25;
            rule.validate(validDecimal).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            });
        });

        it('should be valid when a valid decimal string is provided', function (done) {
            var rule = new DecimalValidationRule();
            var validDecimalString = "10.25";
            rule.validate(validDecimalString).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            });
        });

        it('should be valid when provided a null value', function (done) {
            var rule = new DecimalValidationRule();
            rule.validate(null).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            });
        });

        it('should be invalid when provided a non numeric value', function (done) {
            var rule = new DecimalValidationRule();
            var invalidNumber = "not a number";
            rule.validate(invalidNumber).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            });
        });
    });
});