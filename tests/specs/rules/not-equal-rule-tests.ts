import {expect} from "chai";
import {NotEqualValidationRule} from "../../../src/rules/not-equal-validation-rule";
import {PropertyResolver} from "property-resolver";
import {ModelResolver} from "../../../src/resolvers/model-resolver";

describe("Validation Rules", function(){
    describe('Not Equal Rule', function () {

        it('should be valid when the comparitor is a function which does not equal the value', function (done) {
            var modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.a = 10;

            var rule = new NotEqualValidationRule();
            rule.validate(modelResolver, "a", () => 15).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when numbers dont equal', function (done) {
            var modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.a = 10;

            var rule = new NotEqualValidationRule();
            rule.validate(modelResolver,'a', 12).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when strings dont equal', function (done) {
            var modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.a='hello';

            var rule = new NotEqualValidationRule();

            rule.validate(modelResolver, 'a', "hello again").then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when number does not weak equality string', function (done) {
            var modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.a = 10;

            var rule = new NotEqualValidationRule();
            rule.validate(modelResolver, 'a', { value: "25", weakEquality: true }).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when dates dont equal', function (done) {
            var modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.a = new Date(1995, 11, 17);

            var rule = new NotEqualValidationRule();
            rule.validate(modelResolver, 'a', new Date(1995, 11, 27)).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when number and string are same but not using weak equality', function (done) {
            var modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.a = 10;

            var rule = new NotEqualValidationRule();
            rule.validate(modelResolver, 'a', "10").then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when provided a null value', function (done) {
            var modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.a = null;

            var rule = new NotEqualValidationRule();
            rule.validate(modelResolver,'a', {}).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be invalid when number equals same number', function (done) {
            var modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.a = 10;

            var rule = new NotEqualValidationRule();
            rule.validate(modelResolver, 'a', 10).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });

        it('should be invalid when number equals string number with weak equality', function (done) {
            var modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.a = 10;
            var rule = new NotEqualValidationRule();

            rule.validate(modelResolver,'a', { value: "10", weakEquality: true }).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });
    });
});