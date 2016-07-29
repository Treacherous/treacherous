import {expect} from "chai";
import {StepValidationRule} from "../../../src/rules/step-validation-rule";
import {PropertyResolver} from "property-resolver";
import {ModelHelper} from "../../../src/model-helper";

describe("Validation Rules", function(){
    describe('Step Rule', function () {

        var modelHelper = new ModelHelper(new PropertyResolver(), { null:null});

        it('should be valid when number is valid increment', function (done) {
            var rule = new StepValidationRule();
            modelHelper.model.validIncrement = 10;
            rule.validate(modelHelper,'validIncrement', 5).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when string number is valid increment', function (done) {
            var rule = new StepValidationRule();
            modelHelper.model.validNumberString = "10";
            rule.validate(modelHelper,'validNumberString', 5).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when provided a null value', function (done) {
            var rule = new StepValidationRule();
            rule.validate(modelHelper,'null', 5).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be invalid when number is not valid increment', function (done) {
            var rule = new StepValidationRule();
            modelHelper.model.invalidIncrement = 12;
            rule.validate(modelHelper,'invalidIncrement', 5).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });

        it('should be invalid when string number is not valid increment', function (done) {
            var rule = new StepValidationRule();
            modelHelper.model.invalidIncrement = "12";
            rule.validate(modelHelper,'invalidIncrement', 5).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });
    });
});