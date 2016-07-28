import {expect} from "chai";
import {RequiredValidationRule} from "../../../src/rules/required-validation-rule";
import {PropertyResolver} from "property-resolver";
import {ModelResolver} from "../../../src/resolvers/model-resolver";

describe("Validation Rules", function(){
    describe('Required Rule', function () {

        var mr = new ModelResolver(new PropertyResolver(), { null:null });


        it('should be valid when non empty string is required', function (done) {
            var rule = new RequiredValidationRule();
            mr.model.validString = "1";
            rule.validate(mr,'validString', true).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when non empty array is required', function (done) {
            var rule = new RequiredValidationRule();
            mr.model.validArray = [0,1,2,3,4,5,6,7,8,9];
            rule.validate(mr,'validArray', true).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when number is required', function (done) {
            var rule = new RequiredValidationRule();
            mr.model.validNumber = 1;
            rule.validate(mr,'validNumber', true).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be invalid when empty string is required', function (done) {
            var rule = new RequiredValidationRule();
            mr.model.invalidString = "";
            rule.validate(mr,'invalidString', true).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });

        it('should be invalid when empty array is required', function (done) {
            var rule = new RequiredValidationRule();
            mr.model.invalidArray = [];
            rule.validate(mr,'invalidArray', true).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });

        it('should be invalid when null is required', function (done) {
            var rule = new RequiredValidationRule();
            rule.validate(mr,'null', true).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });

        it('should be invalid when undefined is required', function (done) {
            var rule = new RequiredValidationRule();
            rule.validate(mr,'undefined', true).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });

        it('should be valid when empty string is not required', function (done) {
            var rule = new RequiredValidationRule();
            mr.model.validString = "";
            rule.validate(mr,'validString', false).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when array is not required', function (done) {
            var rule = new RequiredValidationRule();
            mr.model.validArray = [];
            rule.validate(mr,'validArray', false).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when array is not required', function (done) {
            var rule = new RequiredValidationRule();
            mr.model.validArray = [];
            rule.validate(mr,'validArray', false).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when null is not required', function (done) {
            var rule = new RequiredValidationRule();
            rule.validate(mr,'null', false).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when undefined is not required', function (done) {
            var rule = new RequiredValidationRule();
            rule.validate(mr,'undefined', false).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when string is not required', function (done) {
            var rule = new RequiredValidationRule();
            mr.model.someString = "hello";
            rule.validate(mr,'someString', false).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });


        it('should be valid when string is not required', function (done) {
            var rule = new RequiredValidationRule();
            mr.model.someString = "hello";
            rule.validate(mr,'someString', false).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when array is not required', function (done) {
            var rule = new RequiredValidationRule();
            mr.model.someArray = [1];
            rule.validate(mr,'someArray', false).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });
    });
});