import {expect} from "chai";
import {EmailValidationRule} from "../../../src/rules/email-validation-rule";
import {PropertyResolver} from "property-resolver";
import {ModelResolver} from "../../../src/resolvers/model-resolver";

describe("Validation Rules", function(){
    describe('Email Rule', function () {

        var mr = new ModelResolver(new PropertyResolver(), {});

        it('should be valid when email is provided', function (done) {
            var rule = new EmailValidationRule();
            mr.model.validEmail = "test@test.com";
            rule.validate(mr,'validEmail').then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });


        it('should be valid when provided a null value', function (done) {
            var rule = new EmailValidationRule();
            mr.model.null = null;
            rule.validate(mr,'null').then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be invalid when pattern is not matched', function (done) {
            var rule = new EmailValidationRule();
            mr.model.invalidEmail = "this isn't an email";
            rule.validate(mr,'invalidEmail').then(function(isValid){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });

    });
});