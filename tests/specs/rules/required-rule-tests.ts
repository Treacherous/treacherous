import {describe, it} from "mocha";
import {expect} from "chai";
import {RequiredValidationRule} from "../../../src/rules/required-validation-rule";
import {PropertyResolver} from "property-resolver";
import {ModelResolver} from "../../../src/resolvers/model-resolver";

describe("Validation Rules", function(){
    describe('Required Rule', function () {

        it('should be valid when non empty string is required', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.validString = "1";

            const rule = new RequiredValidationRule();
            rule.validate(modelResolver,'validString', true).then(function(isValid: boolean){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when non empty array is required', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.validArray = [0,1,2,3,4,5,6,7,8,9];

            const rule = new RequiredValidationRule();
            rule.validate(modelResolver,'validArray', true).then(function(isValid: boolean){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when number is required', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.validNumber = 1;

            const rule = new RequiredValidationRule();
            rule.validate(modelResolver,'validNumber', true).then(function(isValid: boolean){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be invalid when empty string is required', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.invalidString = "";

            const rule = new RequiredValidationRule();
            rule.validate(modelResolver,'invalidString', true).then(function(isValid: boolean){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });

        it('should be invalid when empty array is required', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.invalidArray = [];

            const rule = new RequiredValidationRule();
            rule.validate(modelResolver,'invalidArray', true).then(function(isValid: boolean){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });

        it('should be invalid when null is required', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.a = null;

            const rule = new RequiredValidationRule();
            rule.validate(modelResolver, 'a', true).then(function(isValid: boolean){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });

        it('should be invalid when undefined is required', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});

            const rule = new RequiredValidationRule();
            rule.validate(modelResolver, 'a', true).then(function(isValid: boolean){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });

        it('should be valid when empty string is not required', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.validString = "";

            const rule = new RequiredValidationRule();
            rule.validate(modelResolver,'validString', false).then(function(isValid: boolean){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when array is not required', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.validArray = [];

            const rule = new RequiredValidationRule();
            rule.validate(modelResolver,'validArray', false).then(function(isValid: boolean){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when array is not required', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.validArray = [];

            const rule = new RequiredValidationRule();
            rule.validate(modelResolver,'validArray', false).then(function(isValid: boolean){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when null is not required', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.a = null;

            const rule = new RequiredValidationRule();
            rule.validate(modelResolver, 'a', false).then(function(isValid: boolean){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when undefined is not required', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});

            const rule = new RequiredValidationRule();
            rule.validate(modelResolver, 'undefined', false).then(function(isValid: boolean){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when string is not required', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.someString = "hello";

            const rule = new RequiredValidationRule();
            rule.validate(modelResolver,'someString', false).then(function(isValid: boolean){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });


        it('should be valid when string is not required', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.someString = "hello";

            const rule = new RequiredValidationRule();
            rule.validate(modelResolver,'someString', false).then(function(isValid: boolean){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when array is not required', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.someArray = [1];

            const rule = new RequiredValidationRule();
            rule.validate(modelResolver,'someArray', false).then(function(isValid: boolean){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });
    });
});