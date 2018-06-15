import {expect} from "chai";
import {ISODateValidationRule} from "../../../src/rules/iso-date-validation-rule";
import {PropertyResolver} from "property-resolver";
import {ModelResolver} from "../../../src/resolvers/model-resolver";

describe("Validation Rules", function(){
    describe('ISO Date Rule', function () {

        it('should be valid when iso format date is provided', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.validDateString = new Date().toISOString();

            const rule = new ISODateValidationRule();
            rule.validate(modelResolver,'validDateString').then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when provided a null value', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.null = null;

            const rule = new ISODateValidationRule();
            rule.validate(modelResolver,'null').then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when provided an empty value', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.empty = "";

            const rule = new ISODateValidationRule();
            rule.validate(modelResolver,'empty').then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });


        it('should be invalid when non date is provided', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.invalidDateString = "this isn't a date";

            const rule = new ISODateValidationRule();
            rule.validate(modelResolver,'invalidDateString').then(function(isValid){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });
    });
});