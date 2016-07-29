import {expect} from "chai";
import {MinValueValidationRule} from "../../../src/rules/min-value-validation-rule";
import {PropertyResolver} from "property-resolver";
import {ModelHelper} from "../../../src/model-helper";

describe("Validation Rules", function(){
    describe('Min Value Rule', function () {

        var modelHelper = new ModelHelper(new PropertyResolver(), { null:null });

        it('should be valid when number is >= min length', function (done) {
            var rule = new MinValueValidationRule();
            modelHelper.model.validNumber = 10;
            rule.validate(modelHelper,'validNumber', 10).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when string number is >= min length', function (done) {
            var rule = new MinValueValidationRule();
            modelHelper.model.validNumberString = "10";
            rule.validate(modelHelper,'validNumberString', 10).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when date is >= min date', function (done) {
            var rule = new MinValueValidationRule();
            var minDate = new Date(2000, 1, 1);
            modelHelper.model.validDate = new Date(2001, 1, 1);
            rule.validate(modelHelper,'validDate', minDate).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when provided a null value', function (done) {
            var rule = new MinValueValidationRule();
            rule.validate(modelHelper,'null', 10).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be invalid when number is < min length', function (done) {
            var rule = new MinValueValidationRule();
            modelHelper.model.invalidNumber = 9;
            rule.validate(modelHelper,'invalidNumber', 10).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });

        it('should be invalid when string number is < min length', function (done) {
            var rule = new MinValueValidationRule();
            modelHelper.model.invalidStringNumber = "9";
            rule.validate(modelHelper,'invalidStringNumber', 10).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });

        it('should be invalid when date is < min date', function (done) {
            var rule = new MinValueValidationRule();
            var minDate = new Date(2000, 1, 1);
            modelHelper.model.invalidDate = new Date(1990, 1, 1);
            rule.validate(modelHelper,'invalidDate', minDate).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });

    });
});