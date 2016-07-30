import {expect} from "chai";
import {RequiredValidationRule} from "../../../src/rules/required-validation-rule";
import {PropertyResolver} from "property-resolver";
import {ModelHelper} from "../../../src/model-helper";

describe("Validation Rules", function(){
    describe('Required Rule', function () {

        var modelHelper = new ModelHelper(new PropertyResolver(), { null:null });


        it('should be valid when non empty string is required', function (done) {
            var rule = new RequiredValidationRule();
            modelHelper.model.validString = "1";
            rule.validate(modelHelper,'validString', true).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when non empty array is required', function (done) {
            var rule = new RequiredValidationRule();
            modelHelper.model.validArray = [0,1,2,3,4,5,6,7,8,9];
            rule.validate(modelHelper,'validArray', true).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when number is required', function (done) {
            var rule = new RequiredValidationRule();
            modelHelper.model.validNumber = 1;
            rule.validate(modelHelper,'validNumber', true).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be invalid when empty string is required', function (done) {
            var rule = new RequiredValidationRule();
            modelHelper.model.invalidString = "";
            rule.validate(modelHelper,'invalidString', true).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });

        it('should be invalid when empty array is required', function (done) {
            var rule = new RequiredValidationRule();
            modelHelper.model.invalidArray = [];
            rule.validate(modelHelper,'invalidArray', true).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });

        it('should be invalid when null is required', function (done) {
            var rule = new RequiredValidationRule();
            rule.validate(modelHelper,'null', true).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });

        it('should be invalid when undefined is required', function (done) {
            var rule = new RequiredValidationRule();
            rule.validate(modelHelper,'undefined', true).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });

        it('should be valid when empty string is not required', function (done) {
            var rule = new RequiredValidationRule();
            modelHelper.model.validString = "";
            rule.validate(modelHelper,'validString', false).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when array is not required', function (done) {
            var rule = new RequiredValidationRule();
            modelHelper.model.validArray = [];
            rule.validate(modelHelper,'validArray', false).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when array is not required', function (done) {
            var rule = new RequiredValidationRule();
            modelHelper.model.validArray = [];
            rule.validate(modelHelper,'validArray', false).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when null is not required', function (done) {
            var rule = new RequiredValidationRule();
            rule.validate(modelHelper,'null', false).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when undefined is not required', function (done) {
            var rule = new RequiredValidationRule();
            rule.validate(modelHelper,'undefined', false).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when string is not required', function (done) {
            var rule = new RequiredValidationRule();
            modelHelper.model.someString = "hello";
            rule.validate(modelHelper,'someString', false).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });


        it('should be valid when string is not required', function (done) {
            var rule = new RequiredValidationRule();
            modelHelper.model.someString = "hello";
            rule.validate(modelHelper,'someString', false).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when array is not required', function (done) {
            var rule = new RequiredValidationRule();
            modelHelper.model.someArray = [1];
            rule.validate(modelHelper,'someArray', false).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });
    });
});