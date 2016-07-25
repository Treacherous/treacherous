import {expect} from "chai";
import {StepValidationRule} from "../../../src/rules/step-validation-rule";
import {PropertyResolver} from "property-resolver";
import {ModelResolver} from "../../../src/model-resolver";

describe("Validation Rules", function(){
    describe('Step Rule', function () {

        var mr = new ModelResolver(new PropertyResolver(), { null:null});

        it('should be valid when number is valid increment', function (done) {
            var rule = new StepValidationRule();
            mr.model.validIncrement = 10;
            rule.validate(mr,'validIncrement', 5).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when string number is valid increment', function (done) {
            var rule = new StepValidationRule();
            mr.model.validNumberString = "10";
            rule.validate(mr,'validNumberString', 5).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when provided a null value', function (done) {
            var rule = new StepValidationRule();
            rule.validate(mr,'null', 5).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be invalid when number is not valid increment', function (done) {
            var rule = new StepValidationRule();
            mr.model.invalidIncrement = 12;
            rule.validate(mr,'invalidIncrement', 5).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });

        it('should be invalid when string number is not valid increment', function (done) {
            var rule = new StepValidationRule();
            mr.model.invalidIncrement = "12";
            rule.validate(mr,'invalidIncrement', 5).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });
    });
});