import 'mocha';
import {expect} from "chai";
import {RegexValidationRule} from "../../../src/rules/regex-validation-rule";
import {PropertyResolver} from "property-resolver";
import {ModelResolver} from "../../../src/resolvers/model-resolver";

describe("Validation Rules", function(){
    describe('Regex Rule', function () {

        it('should be valid when pattern is matched', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.validString = "matched-this";

            const rule = new RegexValidationRule();
            const validString = "matched-this";
            rule.validate(modelResolver,'validString', /matched-this/).then(function(isValid: boolean){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when provided a null value', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.a = null;

            const rule = new RegexValidationRule();
            rule.validate(modelResolver,'a', /matched-this/).then(function(isValid: boolean){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when provided an empty value', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.a = "";

            const rule = new RegexValidationRule();
            rule.validate(modelResolver,'a', /matched-this/).then(function(isValid: boolean){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be invalid when pattern is not matched', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.invalidString = "doesnt-match-this";

            const rule = new RegexValidationRule();
            const invalidString = "doesnt-match-this";
            rule.validate(modelResolver,'invalidString', /matched-this/).then(function(isValid: boolean){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });

    });
});