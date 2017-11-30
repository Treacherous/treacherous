import {expect} from "chai";
import {StepValidationRule} from "../../../src/rules/step-validation-rule";
import {PropertyResolver} from "property-resolver";
import {ModelResolver} from "../../../src/resolvers/model-resolver";

describe("Validation Rules", function(){
    describe('Step Rule', function () {

        it('should be valid when number is valid increment', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.validIncrement = 10;

            const rule = new StepValidationRule();
            rule.validate(modelResolver,'validIncrement', 5).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when string number is valid increment', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.validNumberString = "10";

            const rule = new StepValidationRule();
            rule.validate(modelResolver,'validNumberString', 5).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when provided a null value', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.a = null;

            const rule = new StepValidationRule();
            rule.validate(modelResolver, 'a', 5).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be invalid when number is not valid increment', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.invalidIncrement = 12;

            const rule = new StepValidationRule();
            rule.validate(modelResolver,'invalidIncrement', 5).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });

        it('should be invalid when string number is not valid increment', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.invalidIncrement = "12";

            const rule = new StepValidationRule();
            rule.validate(modelResolver,'invalidIncrement', 5).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });
    });
});