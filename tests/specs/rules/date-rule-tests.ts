import {expect} from "chai";
import {DateValidationRule} from "../../../src/rules/date-validation-rule";
import {ModelResolver} from "../../../src/model-resolver";
import {PropertyResolver} from "property-resolver";

describe("Validation Rules", function(){
    describe('Date Rule', function () {

        var mr = new ModelResolver(new PropertyResolver(), {});

        it('should be valid when date is provided', function (done) {
            var rule = new DateValidationRule();
            mr.model.validDate = Date.now();
            rule.validate(mr,'validDate').then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });


        it('should be valid when provided a null value', function (done) {
            var rule = new DateValidationRule();
            mr.model.invalidDate = null;
            rule.validate(mr,'invalidDate').then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be invalid when non date is provided', function (done) {
            var rule = new DateValidationRule();
            mr.model.invalidDate = "this isn't a date";
            rule.validate(mr,'invalidDate').then(function(isValid){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });

    });
});