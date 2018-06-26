import {describe, it} from "mocha";
import {expect} from "chai";
import {NotEqualValidationRule} from "../../../src/rules/not-equal-validation-rule";
import {PropertyResolver} from "property-resolver";
import {ModelResolver} from "../../../src/resolvers/model-resolver";

describe("Validation Rules", function(){
    describe('Not Equal Rule', function () {

        it('should be valid when the comparitor is a function which does not equal the value', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.a = 10;

            const rule = new NotEqualValidationRule();
            rule.validate(modelResolver, "a", () => 15).then(function(isValid: boolean){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when numbers dont equal', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.a = 10;

            const rule = new NotEqualValidationRule();
            rule.validate(modelResolver,'a', 12).then(function(isValid: boolean){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when strings dont equal', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.a='hello';

            const rule = new NotEqualValidationRule();

            rule.validate(modelResolver, 'a', "hello again").then(function(isValid: boolean){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when number does not weak equality string', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.a = 10;

            const rule = new NotEqualValidationRule();
            rule.validate(modelResolver, 'a', { value: "25", weakEquality: true }).then(function(isValid: boolean){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when dates dont equal', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.a = new Date(1995, 11, 17);

            const rule = new NotEqualValidationRule();
            rule.validate(modelResolver, 'a', new Date(1995, 11, 27)).then(function(isValid: boolean){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when number and string are same but not using weak equality', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.a = 10;

            const rule = new NotEqualValidationRule();
            rule.validate(modelResolver, 'a', "10").then(function(isValid: boolean){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when provided a null value', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.a = null;

            const rule = new NotEqualValidationRule();
            rule.validate(modelResolver,'a', {}).then(function(isValid: boolean){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when provided an empty value', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.a = "";

            const rule = new NotEqualValidationRule();
            rule.validate(modelResolver,'a', {}).then(function(isValid: boolean){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be invalid when number equals same number', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.a = 10;

            const rule = new NotEqualValidationRule();
            rule.validate(modelResolver, 'a', 10).then(function(isValid: boolean){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });

        it('should be invalid when number equals string number with weak equality', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.a = 10;
            const rule = new NotEqualValidationRule();

            rule.validate(modelResolver,'a', { value: "10", weakEquality: true }).then(function(isValid: boolean){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });
    });
});