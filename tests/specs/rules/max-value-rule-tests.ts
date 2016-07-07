import {expect} from "chai";
import {MaxValueValidationRule} from "../../../src/rules/max-value-validation-rule";

describe("Validation Rules", function(){
    describe('Max Value Rule', function () {

        it('should be valid when number is <= max length', function (done) {
            var rule = new MaxValueValidationRule();
            var validNumber = 10;
            rule.validate(validNumber, 10).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            });
        });

        it('should be valid when string number is <= max value', function (done) {
            var rule = new MaxValueValidationRule();
            var validNumberString = "10";
            rule.validate(validNumberString, 10).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            });
        });

        it('should be valid when date is <= max date', function (done) {
            var rule = new MaxValueValidationRule();
            var maximumDate = new Date(2000, 01, 01);
            var validDate = new Date(1990, 01, 01);
            rule.validate(validDate, maximumDate).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            });
        });

        it('should be valid when provided a null value', function (done) {
            var rule = new MaxValueValidationRule();
            rule.validate(null, 10).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            });
        });

        it('should be invalid when number is > max value', function (done) {
            var rule = new MaxValueValidationRule();
            var invalidNumber = 11;
            rule.validate(invalidNumber, 10).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            });
        });

        it('should be invalid when string number is > max length', function (done) {
            var rule = new MaxValueValidationRule();
            var invalidStringNumber = "11";
            rule.validate(invalidStringNumber, 10).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            });
        });

        it('should be invalid when date is > max date', function (done) {
            var rule = new MaxValueValidationRule();
            var maximumDate = new Date(2000, 01, 01);
            var invalidDate = new Date(2001, 01, 01);
            rule.validate(invalidDate, maximumDate).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            });
        });

    });
});