import {expect} from "chai";
import {DateValidationRule} from "../../../src/rules/date-validation-rule";
import {PropertyResolver} from "property-resolver";
import {ModelResolver} from "../../../src/resolvers/model-resolver";

describe("Validation Rules", function(){
    describe('Date Rule', function () {

        it('should be valid when date is provided', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.validDate = Date.now();

            const rule = new DateValidationRule();
            rule.validate(modelResolver,'validDate').then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when provided a null value', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.invalidDate = null;

            const rule = new DateValidationRule();
            rule.validate(modelResolver,'invalidDate').then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be invalid when non date is provided', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.invalidDate = "this isn't a date";

            const rule = new DateValidationRule();
            rule.validate(modelResolver,'invalidDate').then(function(isValid){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });

    });
});