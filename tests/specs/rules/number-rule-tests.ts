import {expect} from "chai";
import {NumberValidationRule} from "../../../src/rules/number-validation-rule";
import {PropertyResolver} from "property-resolver";
import {ModelResolver} from "../../../src/resolvers/model-resolver";

describe("Validation Rules", function(){
    describe('Number Rule', function () {

        it('should be valid when number is provided', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.validNumber = 10;

            const rule = new NumberValidationRule();
            rule.validate(modelResolver,'validNumber').then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when number string is provided', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.validStringNumber = "10";

            const rule = new NumberValidationRule();
            rule.validate(modelResolver, 'validStringNumber').then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when provided a null value', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.a = null;

            const rule = new NumberValidationRule();
            rule.validate(modelResolver,'a').then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when provided an empty value', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.a = "";

            const rule = new NumberValidationRule();
            rule.validate(modelResolver,'a').then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be invalid when a valid decimal is provided', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.validDecimal = 10.25;

            const rule = new NumberValidationRule();
            rule.validate(modelResolver,'validDecimal').then(function(isValid){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });

        it('should be invalid when a valid decimal string is provided', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.validDecimalString = "10.25";

            const rule = new NumberValidationRule();
            rule.validate(modelResolver,'validDecimalString').then(function(isValid){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });

        it('should be invalid when a non numeric string is provided', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.nan = "not a number";

            const rule = new NumberValidationRule();
            rule.validate(modelResolver,'nan').then(function(isValid){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });
    });
});