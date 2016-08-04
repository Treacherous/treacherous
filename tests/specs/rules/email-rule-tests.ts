import {expect} from "chai";
import {EmailValidationRule} from "../../../src/rules/email-validation-rule";
import {PropertyResolver} from "property-resolver";
import {ModelResolver} from "../../../src/resolvers/model-resolver";

describe("Validation Rules", function(){
    describe('Email Rule', function () {

        it('should be valid when email is provided', function (done) {
            var modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.validEmail = "test@test.com";

            var rule = new EmailValidationRule();
            rule.validate(modelResolver,'validEmail').then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });


        it('should be valid when provided a null value', function (done) {
            var modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.null = null;

            var rule = new EmailValidationRule();
            rule.validate(modelResolver,'null').then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be invalid when pattern is not matched', function (done) {
            var modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.invalidEmail = "this isn't an email";

            var rule = new EmailValidationRule();
            rule.validate(modelResolver,'invalidEmail').then(function(isValid){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });

    });
});