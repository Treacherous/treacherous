import {expect} from "chai";
import {MaxValueValidationRule} from "../../../src/rules/max-value-validation-rule";
import {PropertyResolver} from "property-resolver";
import {ModelResolver} from "../../../src/resolvers/model-resolver";

describe("Validation Rules", function(){
    describe('Max Value Rule', function () {

        it('should be valid when number is <= max length', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.validNumber = 10;

            const rule = new MaxValueValidationRule();
            rule.validate(modelResolver,'validNumber', 10).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when string number is <= max value', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.validNumberString = "10";

            const rule = new MaxValueValidationRule();
            rule.validate(modelResolver,'validNumberString', 10).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when date is <= max date', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.validDate = new Date(1990, 1, 1);

            const rule = new MaxValueValidationRule();
            const maximumDate = new Date(2000, 1, 1);
            rule.validate(modelResolver,'validDate', maximumDate).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when provided a null value', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.a = null;

            const rule = new MaxValueValidationRule();
            rule.validate(modelResolver,'a', 10).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be invalid when number is > max value', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.invalidNumber = 11;

            const rule = new MaxValueValidationRule();
            rule.validate(modelResolver,'invalidNumber', 10).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });

        it('should be invalid when string number is > max length', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.invalidStringNumber = "11";

            const rule = new MaxValueValidationRule();
            rule.validate(modelResolver,'invalidStringNumber', 10).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });

        it('should be invalid when date is > max date', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.invalidDate = new Date(2001, 1, 1);

            const rule = new MaxValueValidationRule();
            const maximumDate = new Date(2000, 1, 1);
            rule.validate(modelResolver,'invalidDate', maximumDate).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });
    });
});