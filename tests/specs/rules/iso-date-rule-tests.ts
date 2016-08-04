import {expect} from "chai";
import {ISODateValidationRule} from "../../../src/rules/iso-date-validation-rule";
import {PropertyResolver} from "property-resolver";
import {ModelResolver} from "../../../src/resolvers/model-resolver";

describe("Validation Rules", function(){
    describe('ISO Date Rule', function () {

        it('should be valid when iso format date is provided', function (done) {
            var modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.validDateString = new Date().toISOString();

            var rule = new ISODateValidationRule();
            rule.validate(modelResolver,'validDateString').then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });


        it('should be valid when provided a null value', function (done) {
            var modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.null = null;

            var rule = new ISODateValidationRule();
            rule.validate(modelResolver,'null').then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be invalid when non date is provided', function (done) {
            var modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.invalidDateString = "this isn't a date";

            var rule = new ISODateValidationRule();
            rule.validate(modelResolver,'invalidDateString').then(function(isValid){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });
    });
});