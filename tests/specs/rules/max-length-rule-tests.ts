import {expect} from "chai";
import {MaxLengthValidationRule} from "../../../src/rules/max-length-validation-rule";
import {PropertyResolver} from "property-resolver";
import {ModelResolver} from "../../../src/model-resolver";

describe("Validation Rules", function(){
    describe('Max Length Rule', function () {
        var mr = new ModelResolver(new PropertyResolver(), { null:null });

        it('should be valid when string length is <= max length', function (done) {
            var rule = new MaxLengthValidationRule();
            mr.model.validString = "0123456789";
            rule.validate(mr,'validString', 10).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when array length is <= max length', function (done) {
            var rule = new MaxLengthValidationRule();
            mr.model.validArray = [0,1,2,3,4,5,6,7,8,9];
            rule.validate(mr,'validArray', 10).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when provided a null value', function (done) {
            var rule = new MaxLengthValidationRule();
            rule.validate(mr,'null', 10).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be invalid when string length is > max length', function (done) {
            var rule = new MaxLengthValidationRule();
            mr.model.invalidString = "0123456789";
            rule.validate(mr,'invalidString', 9).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });

        it('should be invalid when array length is > max length', function (done) {
            var rule = new MaxLengthValidationRule();
            mr.model.invalidArray = [0,1,2,3,4,5,6,7,8,9];
            rule.validate(mr,'invalidArray', 9).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });

    });
});