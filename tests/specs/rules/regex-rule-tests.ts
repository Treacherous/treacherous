import {expect} from "chai";
import {RegexValidationRule} from "../../../src/rules/regex-validation-rule";
import {PropertyResolver} from "property-resolver";
import {ModelHelper} from "../../../src/model-helper";

describe("Validation Rules", function(){
    describe('Regex Rule', function () {

        var modelHelper = new ModelHelper(new PropertyResolver(), { null:null, validString:"matched-this", invalidString: "doesnt-match-this" });

        it('should be valid when pattern is matched', function (done) {
            var rule = new RegexValidationRule();
            var validString = "matched-this";
            rule.validate(modelHelper,'validString', /matched-this/).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });


        it('should be valid when provided a null value', function (done) {
            var rule = new RegexValidationRule();
            rule.validate(modelHelper,'null', /matched-this/).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be invalid when pattern is not matched', function (done) {
            var rule = new RegexValidationRule();
            var invalidString = "doesnt-match-this";
            rule.validate(modelHelper,'invalidString', /matched-this/).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });

    });
});