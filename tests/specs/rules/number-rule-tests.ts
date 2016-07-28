import {expect} from "chai";
import {NumberValidationRule} from "../../../src/rules/number-validation-rule";
import {PropertyResolver} from "property-resolver";
import {ModelResolver} from "../../../src/resolvers/model-resolver";

describe("Validation Rules", function(){
    describe('Number Rule', function () {

        var mr = new ModelResolver(new PropertyResolver(), { null:null, validStringNumber:"10", validnum:10, validDecimal:10.25, validDecimalString:"10.25", nan:"not a number" });

        it('should be valid when number is provided', function (done) {
            var rule = new NumberValidationRule();
            rule.validate(mr,'validnum').then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when number string is provided', function (done) {
            var rule = new NumberValidationRule();
            rule.validate(mr, 'validStringNumber').then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when provided a null value', function (done) {
            var rule = new NumberValidationRule();
            rule.validate(mr,'null').then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be invalid when a valid decimal is provided', function (done) {
            var rule = new NumberValidationRule();
            rule.validate(mr,'validDecimal').then(function(isValid){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });

        it('should be invalid when a valid decimal string is provided', function (done) {
            var rule = new NumberValidationRule();
            rule.validate(mr,'validDecimalString').then(function(isValid){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });

        it('should be invalid when a non numeric string is provided', function (done) {
            var rule = new NumberValidationRule();
            rule.validate(mr,'nan').then(function(isValid){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });
    });
});