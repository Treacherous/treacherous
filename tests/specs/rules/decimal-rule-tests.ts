import {expect} from "chai";
import {DecimalValidationRule} from "../../../src/rules/decimal-validation-rule";
import {PropertyResolver} from "property-resolver";
import {ModelHelper} from "../../../src/model-helper";

describe("Validation Rules", function(){
    describe('Decimal Rule', function () {

        var modelHelper = new ModelHelper(new PropertyResolver(), {});

        it('should be valid when number is provided', function (done) {
            var rule = new DecimalValidationRule();
            modelHelper.model.validNumber = 10;
            rule.validate(modelHelper,'validNumber').then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when number string is provided', function (done) {
            var rule = new DecimalValidationRule();
            modelHelper.model.validStringNumber = "10";
            rule.validate(modelHelper,'validStringNumber').then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when a valid decimal is provided', function (done) {
            var rule = new DecimalValidationRule();
            modelHelper.model.validDecimal = 10.25;
            rule.validate(modelHelper,'validDecimal').then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when a valid decimal string is provided', function (done) {
            var rule = new DecimalValidationRule();
            modelHelper.model.validDecimalString = "10.25";
            rule.validate(modelHelper,'validDecimalString').then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when provided a null value', function (done) {
            var rule = new DecimalValidationRule();
            modelHelper.model.null = null;
            rule.validate(modelHelper,'null').then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be invalid when provided a non numeric value', function (done) {
            var rule = new DecimalValidationRule();
            modelHelper.model.invalidNumber = "not a number";
            rule.validate(modelHelper,'invalidNumber').then(function(isValid){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });
    });
});