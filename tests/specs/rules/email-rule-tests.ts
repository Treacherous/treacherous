import {describe, it} from "mocha";
import {expect} from "chai";
import {EmailValidationRule} from "../../../src/rules/email-validation-rule";
import {PropertyResolver} from "property-resolver";
import {ModelResolver} from "../../../src/resolvers/model-resolver";

describe("Validation Rules", function(){
    describe('Email Rule', function () {

        it('should be valid when email is provided', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.validEmail = "test@test.com";

            const rule = new EmailValidationRule();
            rule.validate(modelResolver,'validEmail').then(function(isValid: boolean){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when email is provided with various case', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.validEmail = "TeST@TeSt.cOm";

            const rule = new EmailValidationRule();
            rule.validate(modelResolver,'validEmail').then(function(isValid: boolean){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when provided a null value', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.null = null;

            const rule = new EmailValidationRule();
            rule.validate(modelResolver,'null').then(function(isValid: boolean){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when provided an empty string', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.someString = "";

            const rule = new EmailValidationRule();
            rule.validate(modelResolver, 'someString').then(function(isValid: boolean){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be invalid when pattern is not matched', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.invalidEmail = "this isn't an email";

            const rule = new EmailValidationRule();
            rule.validate(modelResolver,'invalidEmail').then(function(isValid: boolean){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });

    });
});