import {expect} from "chai";
import {MinValueValidationRule} from "../../../src/rules/min-value-validation-rule";
import {PropertyResolver} from "property-resolver";
import {ModelResolver} from "../../../src/resolvers/model-resolver";

describe("Validation Rules", function(){
    describe('Min Value Rule', function () {

        it('should be valid when number is >= min length', function (done) {
            var modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.validNumber = 10;

            var rule = new MinValueValidationRule();
            rule.validate(modelResolver,'validNumber', 10).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when string number is >= min length', function (done) {
            var modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.validNumberString = "10";

            var rule = new MinValueValidationRule();
            rule.validate(modelResolver,'validNumberString', 10).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when date is >= min date', function (done) {
            var modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.validDate = new Date(2001, 1, 1);

            var rule = new MinValueValidationRule();
            var minDate = new Date(2000, 1, 1);
            rule.validate(modelResolver,'validDate', minDate).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when provided a null value', function (done) {
            var modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.a = null;

            var rule = new MinValueValidationRule();
            rule.validate(modelResolver, 'a', 10).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be invalid when number is < min length', function (done) {
            var modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.invalidNumber = 9;

            var rule = new MinValueValidationRule();
            rule.validate(modelResolver,'invalidNumber', 10).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });

        it('should be invalid when string number is < min length', function (done) {
            var modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.invalidStringNumber = "9";

            var rule = new MinValueValidationRule();
            rule.validate(modelResolver,'invalidStringNumber', 10).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });

        it('should be invalid when date is < min date', function (done) {
            var modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.invalidDate = new Date(1990, 1, 1);

            var rule = new MinValueValidationRule();
            var minDate = new Date(2000, 1, 1);
            rule.validate(modelResolver,'invalidDate', minDate).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });

    });
});