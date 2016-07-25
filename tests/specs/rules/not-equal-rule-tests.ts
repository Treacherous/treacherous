import {expect} from "chai";
import {NotEqualValidationRule} from "../../../src/rules/not-equal-validation-rule";
import {PropertyResolver} from "property-resolver";
import {ModelResolver} from "../../../src/model-resolver";

describe("Validation Rules", function(){
    describe('Not Equal Rule', function () {

        var mr = new ModelResolver(new PropertyResolver(), { null:null });


        it('should be valid when numbers dont equal', function (done) {
            var rule = new NotEqualValidationRule();
            mr.model.a=10;
            rule.validate(mr,'a', 12).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when strings dont equal', function (done) {
            var rule = new NotEqualValidationRule();
            mr.model.hello='hello';
            rule.validate(mr,'hello', "hello again").then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when number does not weak equality string', function (done) {
            var rule = new NotEqualValidationRule();
            mr.model.a=10;
            rule.validate(mr,'a', { value: "25", weakEquality: true }).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when dates dont equal', function (done) {
            var rule = new NotEqualValidationRule();
            mr.model.d = new Date(1995, 11, 17);
            rule.validate(mr,'d', new Date(1995, 11, 27)).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when number and string are same but not using weak equality', function (done) {
            var rule = new NotEqualValidationRule();
            mr.model.a=10;
            rule.validate(mr,'a', "10").then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when provided a null value', function (done) {
            var rule = new NotEqualValidationRule();
            rule.validate(mr,'null', {}).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be invalid when number equals same number', function (done) {
            var rule = new NotEqualValidationRule();
            mr.model.a=10;
            rule.validate(mr,'a', 10).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });

        it('should be invalid when number equals string number with weak equality', function (done) {
            var rule = new NotEqualValidationRule();
            mr.model.a=10;
            rule.validate(mr,'a', { value: "10", weakEquality: true }).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });
    });
});