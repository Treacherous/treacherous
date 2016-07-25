import {expect} from "chai";
import {DecimalValidationRule} from "../../../src/rules/decimal-validation-rule";
import {PropertyResolver} from "property-resolver";
import {ModelResolver} from "../../../src/model-resolver";

describe("Validation Rules", function(){
    describe('Decimal Rule', function () {

        var mr = new ModelResolver(new PropertyResolver(), {});

        it('should be valid when number is provided', function (done) {
            var rule = new DecimalValidationRule();
            mr.model.validNumber = 10;
            rule.validate(mr,'validNumber').then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when number string is provided', function (done) {
            var rule = new DecimalValidationRule();
            mr.model.validStringNumber = "10";
            rule.validate(mr,'validStringNumber').then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when a valid decimal is provided', function (done) {
            var rule = new DecimalValidationRule();
            mr.model.validDecimal = 10.25;
            rule.validate(mr,'validDecimal').then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when a valid decimal string is provided', function (done) {
            var rule = new DecimalValidationRule();
            mr.model.validDecimalString = "10.25";
            rule.validate(mr,'validDecimalString').then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when provided a null value', function (done) {
            var rule = new DecimalValidationRule();
            mr.model.null = null;
            rule.validate(mr,'null').then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be invalid when provided a non numeric value', function (done) {
            var rule = new DecimalValidationRule();
            mr.model.invalidNumber = "not a number";
            rule.validate(mr,'invalidNumber').then(function(isValid){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });
    });
});