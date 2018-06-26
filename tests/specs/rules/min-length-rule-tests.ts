import {describe, it} from "mocha";
import {expect} from "chai";
import {MinLengthValidationRule} from "../../../src/rules/min-length-validation-rule";
import {PropertyResolver} from "property-resolver";
import {ModelResolver} from "../../../src/resolvers/model-resolver";

describe("Validation Rules", function(){
    describe('Min Length Rule', function () {

        it('should be valid when string length is >= max length', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.validString = "0123456789";

            const rule = new MinLengthValidationRule();
            rule.validate(modelResolver,'validString', 1).then(function(isValid: boolean){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when array length is >= max length', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.validArray = [0,1,2,3,4,5,6,7,8,9];

            const rule = new MinLengthValidationRule();
            rule.validate(modelResolver,'validArray', 1).then(function(isValid: boolean){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when provided a null value', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.a = null;

            const rule = new MinLengthValidationRule();
            rule.validate(modelResolver,'a', 1).then(function(isValid: boolean){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when provided an empty value', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.a = "";

            const rule = new MinLengthValidationRule();
            rule.validate(modelResolver,'a', 1).then(function(isValid: boolean){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be invalid when string length is < max length', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.invalidString = "0123456789";

            const rule = new MinLengthValidationRule();
            rule.validate(modelResolver,'invalidString', 11).then(function(isValid: boolean){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });

        it('should be invalid when array length is < max length', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.invalidArray = [0,1,2,3,4,5,6,7,8,9];

            const rule = new MinLengthValidationRule();
            rule.validate(modelResolver,'invalidArray', 11).then(function(isValid: boolean){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });

    });
});