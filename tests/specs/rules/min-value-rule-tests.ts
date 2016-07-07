import {expect} from "chai";
import {MinValueValidationRule} from "../../../src/rules/min-value-validation-rule";

describe("Validation Rules", function(){
    describe('Min Value Rule', function () {

        it('should be valid when number is >= min length', function (done) {
            var rule = new MinValueValidationRule();
            var validNumber = 10;
            rule.validate(validNumber, 10).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            });
        });

        it('should be valid when string number is >= min length', function (done) {
            var rule = new MinValueValidationRule();
            var validNumberString = "10";
            rule.validate(validNumberString, 10).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            });
        });

        it('should be valid when date is >= min date', function (done) {
            var rule = new MinValueValidationRule();
            var minDate = new Date(2000, 1, 1);
            var validDate = new Date(2001, 1, 1);
            rule.validate(validDate, minDate).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            });
        });

        it('should be valid when provided a null value', function (done) {
            var rule = new MinValueValidationRule();
            rule.validate(null, 10).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            });
        });

        it('should be invalid when number is < min length', function (done) {
            var rule = new MinValueValidationRule();
            var invalidNumber = 9;
            rule.validate(invalidNumber, 10).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            });
        });

        it('should be invalid when string number is < min length', function (done) {
            var rule = new MinValueValidationRule();
            var invalidStringNumber = "9";
            rule.validate(invalidStringNumber, 10).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            });
        });

        it('should be invalid when date is < min date', function (done) {
            var rule = new MinValueValidationRule();
            var minDate = new Date(2000, 1, 1);
            var invalidDate = new Date(1990, 1, 1);
            rule.validate(invalidDate, minDate).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            });
        });

    });
});