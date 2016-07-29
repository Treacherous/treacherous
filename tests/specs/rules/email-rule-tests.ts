import {expect} from "chai";
import {EmailValidationRule} from "../../../src/rules/email-validation-rule";
import {PropertyResolver} from "property-resolver";
import {ModelHelper} from "../../../src/model-helper";

describe("Validation Rules", function(){
    describe('Email Rule', function () {

        var modelHelper = new ModelHelper(new PropertyResolver(), {});

        it('should be valid when email is provided', function (done) {
            var rule = new EmailValidationRule();
            modelHelper.model.validEmail = "test@test.com";
            rule.validate(modelHelper,'validEmail').then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });


        it('should be valid when provided a null value', function (done) {
            var rule = new EmailValidationRule();
            modelHelper.model.null = null;
            rule.validate(modelHelper,'null').then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be invalid when pattern is not matched', function (done) {
            var rule = new EmailValidationRule();
            modelHelper.model.invalidEmail = "this isn't an email";
            rule.validate(modelHelper,'invalidEmail').then(function(isValid){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });

    });
});