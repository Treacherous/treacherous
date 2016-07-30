import {expect} from "chai";
import {ISODateValidationRule} from "../../../src/rules/iso-date-validation-rule";
import {PropertyResolver} from "property-resolver";
import {ModelHelper} from "../../../src/model-helper";

describe("Validation Rules", function(){
    describe('ISO Date Rule', function () {

        var modelHelper = new ModelHelper(new PropertyResolver(), {});

        it('should be valid when iso format date is provided', function (done) {
            var rule = new ISODateValidationRule();
            modelHelper.model.validDateString = new Date().toISOString();
            rule.validate(modelHelper,'validDateString').then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });


        it('should be valid when provided a null value', function (done) {
            var rule = new ISODateValidationRule();
            modelHelper.model.null = null;
            rule.validate(modelHelper,'null').then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be invalid when non date is provided', function (done) {
            var rule = new ISODateValidationRule();
            modelHelper.model.invalidDateString = "this isn't a date";
            rule.validate(modelHelper,'invalidDateString').then(function(isValid){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });
    });
});