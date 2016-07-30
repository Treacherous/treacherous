import {expect} from "chai";
import {DateValidationRule} from "../../../src/rules/date-validation-rule";
import {ModelHelper} from "../../../src/model-helper";
import {PropertyResolver} from "property-resolver";

describe("Validation Rules", function(){
    describe('Date Rule', function () {

        var modelHelper = new ModelHelper(new PropertyResolver(), {});

        it('should be valid when date is provided', function (done) {
            var rule = new DateValidationRule();
            modelHelper.model.validDate = Date.now();
            rule.validate(modelHelper,'validDate').then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });


        it('should be valid when provided a null value', function (done) {
            var rule = new DateValidationRule();
            modelHelper.model.invalidDate = null;
            rule.validate(modelHelper,'invalidDate').then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be invalid when non date is provided', function (done) {
            var rule = new DateValidationRule();
            modelHelper.model.invalidDate = "this isn't a date";
            rule.validate(modelHelper,'invalidDate').then(function(isValid){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });

    });
});