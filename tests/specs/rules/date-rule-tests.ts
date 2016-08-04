import {expect} from "chai";
import {DateValidationRule} from "../../../src/rules/date-validation-rule";
import {PropertyResolver} from "property-resolver";
import {ModelResolver} from "../../../src/resolvers/model-resolver";

describe("Validation Rules", function(){
    describe('Date Rule', function () {

        it('should be valid when date is provided', function (done) {
            var modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.validDate = Date.now();

            var rule = new DateValidationRule();
            rule.validate(modelResolver,'validDate').then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when provided a null value', function (done) {
            var modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.invalidDate = null;

            var rule = new DateValidationRule();
            rule.validate(modelResolver,'invalidDate').then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be invalid when non date is provided', function (done) {
            var modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.invalidDate = "this isn't a date";

            var rule = new DateValidationRule();
            rule.validate(modelResolver,'invalidDate').then(function(isValid){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });

    });
});