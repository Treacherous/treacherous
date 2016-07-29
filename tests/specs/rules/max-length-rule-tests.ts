import {expect} from "chai";
import {MaxLengthValidationRule} from "../../../src/rules/max-length-validation-rule";
import {PropertyResolver} from "property-resolver";
import {ModelHelper} from "../../../src/model-helper";

describe("Validation Rules", function(){
    describe('Max Length Rule', function () {
        var modelHelper = new ModelHelper(new PropertyResolver(), { null:null });

        it('should be valid when string length is <= max length', function (done) {
            var rule = new MaxLengthValidationRule();
            modelHelper.model.validString = "0123456789";
            rule.validate(modelHelper,'validString', 10).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when array length is <= max length', function (done) {
            var rule = new MaxLengthValidationRule();
            modelHelper.model.validArray = [0,1,2,3,4,5,6,7,8,9];
            rule.validate(modelHelper,'validArray', 10).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when provided a null value', function (done) {
            var rule = new MaxLengthValidationRule();
            rule.validate(modelHelper,'null', 10).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be invalid when string length is > max length', function (done) {
            var rule = new MaxLengthValidationRule();
            modelHelper.model.invalidString = "0123456789";
            rule.validate(modelHelper,'invalidString', 9).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });

        it('should be invalid when array length is > max length', function (done) {
            var rule = new MaxLengthValidationRule();
            modelHelper.model.invalidArray = [0,1,2,3,4,5,6,7,8,9];
            rule.validate(modelHelper,'invalidArray', 9).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });

    });
});