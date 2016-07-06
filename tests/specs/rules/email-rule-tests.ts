import {expect} from "chai";
import {EmailValidationRule} from "../../../src/rules/email-validation-rule";

describe("Validation Rules", function(){
    describe('Email Rule', function () {

        it('should be valid when email is provided', function (done) {
            var rule = new EmailValidationRule();
            var validEmail = "test@test.com";
            rule.validate(validEmail).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            });
        });


        it('should be valid when provided a null value', function (done) {
            var rule = new EmailValidationRule();
            rule.validate(null).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            });
        });

        it('should be invalid when pattern is not matched', function (done) {
            var rule = new EmailValidationRule();
            var invalidEmail = "this isn't an email";
            rule.validate(invalidEmail).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            });
        });

    });
});