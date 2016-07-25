import {expect} from "chai";
import {MinValueValidationRule} from "../../../src/rules/min-value-validation-rule";
import {PropertyResolver} from "property-resolver";
import {ModelResolver} from "../../../src/model-resolver";

describe("Validation Rules", function(){
    describe('Min Value Rule', function () {

        var mr = new ModelResolver(new PropertyResolver(), { null:null });

        it('should be valid when number is >= min length', function (done) {
            var rule = new MinValueValidationRule();
            mr.model.validNumber = 10;
            rule.validate(mr,'validNumber', 10).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when string number is >= min length', function (done) {
            var rule = new MinValueValidationRule();
            mr.model.validNumberString = "10";
            rule.validate(mr,'validNumberString', 10).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when date is >= min date', function (done) {
            var rule = new MinValueValidationRule();
            var minDate = new Date(2000, 1, 1);
            mr.model.validDate = new Date(2001, 1, 1);
            rule.validate(mr,'validDate', minDate).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when provided a null value', function (done) {
            var rule = new MinValueValidationRule();
            rule.validate(mr,'null', 10).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be invalid when number is < min length', function (done) {
            var rule = new MinValueValidationRule();
            mr.model.invalidNumber = 9;
            rule.validate(mr,'invalidNumber', 10).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });

        it('should be invalid when string number is < min length', function (done) {
            var rule = new MinValueValidationRule();
            mr.model.invalidStringNumber = "9";
            rule.validate(mr,'invalidStringNumber', 10).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });

        it('should be invalid when date is < min date', function (done) {
            var rule = new MinValueValidationRule();
            var minDate = new Date(2000, 1, 1);
            mr.model.invalidDate = new Date(1990, 1, 1);
            rule.validate(mr,'invalidDate', minDate).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });

    });
});