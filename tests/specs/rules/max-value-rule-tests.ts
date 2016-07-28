import {expect} from "chai";
import {MaxValueValidationRule} from "../../../src/rules/max-value-validation-rule";
import {PropertyResolver} from "property-resolver";
import {ModelResolver} from "../../../src/resolvers/model-resolver";

describe("Validation Rules", function(){
    describe('Max Value Rule', function () {

        var mr = new ModelResolver(new PropertyResolver(), { null:null });


        it('should be valid when number is <= max length', function (done) {
            var rule = new MaxValueValidationRule();
            mr.model.validNumber = 10;
            rule.validate(mr,'validNumber', 10).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when string number is <= max value', function (done) {
            var rule = new MaxValueValidationRule();
            mr.model.validNumberString = "10";
            rule.validate(mr,'validNumberString', 10).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when date is <= max date', function (done) {
            var rule = new MaxValueValidationRule();
            var maximumDate = new Date(2000, 1, 1);
            mr.model.validDate = new Date(1990, 1, 1);
            rule.validate(mr,'validDate', maximumDate).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when provided a null value', function (done) {
            var rule = new MaxValueValidationRule();
            rule.validate(mr,'null', 10).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be invalid when number is > max value', function (done) {
            var rule = new MaxValueValidationRule();
            mr.model.invalidNumber = 11;
            rule.validate(mr,'invalidNumber', 10).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });

        it('should be invalid when string number is > max length', function (done) {
            var rule = new MaxValueValidationRule();
            mr.model.invalidStringNumber = "11";
            rule.validate(mr,'invalidStringNumber', 10).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });

        it('should be invalid when date is > max date', function (done) {
            var rule = new MaxValueValidationRule();
            var maximumDate = new Date(2000, 1, 1);
            mr.model.invalidDate = new Date(2001, 1, 1);
            rule.validate(mr,'invalidDate', maximumDate).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });
    });
});