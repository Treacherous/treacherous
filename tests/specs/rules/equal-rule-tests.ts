import {expect} from "chai";
import {EqualValidationRule} from "../../../src/rules/equal-validation-rule";
import {PropertyResolver} from "property-resolver";
import {ModelResolver} from "../../../src/model-resolver";

describe("Validation Rules", function(){
    describe('Equal Rule', function () {

        var mr = new ModelResolver(new PropertyResolver(), {});


        /*
                it('should be valid when the comparitor is a function', function (done) {
                    var rule = new EqualValidationRule();
                    rule.validate(10, () => 10).then(function(isValid){
                        expect(isValid).to.be.true;
                        done();
                    }).catch(done);
                });

                it('should be valid when comparing two model properties', function (done) {
                    var model = { password1: "Identical",password2: "Identical" }
                    var options = model;

                    var rule = new EqualValidationRule();

                    rule.validate(model.password1, model.password2).then(function(isValid){
                        expect(isValid).to.be.true;
                    }).catch(done);

                    model = { password1: "AlsoIdentical",password2: "AlsoIdentical" }

                    rule.validate(model.password1, model.password2).then(function(isValid){
                        expect(isValid).to.be.true;
                        done();
                    }).catch(done);

                });
         */

        it('should be valid when numbers equal', function (done) {
            var rule = new EqualValidationRule();
            mr.model.a=10;

            rule.validate(mr,'a', 10).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when strings equal', function (done) {
            var rule = new EqualValidationRule();
            mr.model.a='hello';
            rule.validate(mr, "a", "hello").then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when number weak equality string', function (done) {
            var rule = new EqualValidationRule();
            mr.model.a = 10;
            rule.validate(mr, 'a', { value: "10", weakEquality: true }).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when dates equal', function (done) {
            var rule = new EqualValidationRule();
            mr.model.d = new Date(1995, 11, 17);
            rule.validate(mr,'d', new Date(1995, 11, 17)).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when provided a null value', function (done) {
            var rule = new EqualValidationRule();
            mr.model.null = null;
            rule.validate(mr,'null', {}).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be invalid when number does not equal same number as string without weak equality', function (done) {
            var rule = new EqualValidationRule();
            mr.model.a = 10;
            rule.validate(mr, 'a', "10").then(function(isValid){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });

        it('should be invalid when number does not equal comparison', function (done) {
            var rule = new EqualValidationRule();
            mr.model.a = 10;
            rule.validate(mr,'a', 20).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });
    });
});