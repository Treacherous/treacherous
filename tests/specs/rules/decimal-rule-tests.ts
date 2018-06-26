import {describe, it} from "mocha";
import {expect} from "chai";
import {DecimalValidationRule} from "../../../src/rules/decimal-validation-rule";
import {PropertyResolver} from "property-resolver";
import {ModelResolver} from "../../../src/resolvers/model-resolver";

describe("Validation Rules", function(){
    describe('Decimal Rule', function () {

        it('should be valid when number is provided', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.validNumber = 10;

            const rule = new DecimalValidationRule();
            rule.validate(modelResolver,'validNumber').then(function(isValid: boolean){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when number string is provided', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.validStringNumber = "10";

            const rule = new DecimalValidationRule();
            rule.validate(modelResolver,'validStringNumber').then(function(isValid: boolean){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when a valid decimal is provided', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.validDecimal = 10.25;

            const rule = new DecimalValidationRule();
            rule.validate(modelResolver,'validDecimal').then(function(isValid: boolean){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when a valid decimal string is provided', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.validDecimalString = "10.25";

            const rule = new DecimalValidationRule();
            rule.validate(modelResolver,'validDecimalString').then(function(isValid: boolean){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when provided a null value', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.null = null;

            const rule = new DecimalValidationRule();
            rule.validate(modelResolver,'null').then(function(isValid: boolean){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when provided an empty value', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.empty = "";

            const rule = new DecimalValidationRule();
            rule.validate(modelResolver,'empty').then(function(isValid: boolean){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be invalid when provided a non numeric value', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.invalidNumber = "not a number";

            const rule = new DecimalValidationRule();
            rule.validate(modelResolver,'invalidNumber').then(function(isValid: boolean){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });
    });
});