import {expect} from "chai";
import {ISODateValidationRule} from "../../../src/rules/iso-date-validation-rule";
import {PropertyResolver} from "property-resolver";
import {ModelResolver} from "../../../src/resolvers/model-resolver";

describe("Validation Rules", function(){
    describe('ISO Date Rule', function () {

        var mr = new ModelResolver(new PropertyResolver(), {});


        it('should be valid when iso format date is provided', function (done) {
            var rule = new ISODateValidationRule();
            mr.model.validDateString = new Date().toISOString();
            rule.validate(mr,'validDateString').then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });


        it('should be valid when provided a null value', function (done) {
            var rule = new ISODateValidationRule();
            mr.model.null = null;
            rule.validate(mr,'null').then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be invalid when non date is provided', function (done) {
            var rule = new ISODateValidationRule();
            mr.model.invalidDateString = "this isn't a date";
            rule.validate(mr,'invalidDateString').then(function(isValid){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });
    });
});