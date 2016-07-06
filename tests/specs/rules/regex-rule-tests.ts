import {expect} from "chai";
import {RegexValidationRule} from "../../../src/rules/regex-validation-rule";

describe("Validation Rules", function(){
    describe('Regex Rule', function () {

        it('should be valid when pattern is matched', function (done) {
            var rule = new RegexValidationRule();
            var validString = "matched-this";
            rule.validate(validString, /matched-this/).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            });
        });


        it('should be valid when provided a null value', function (done) {
            var rule = new RegexValidationRule();
            rule.validate(null, /matched-this/).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            });
        });

        it('should be invalid when pattern is not matched', function (done) {
            var rule = new RegexValidationRule();
            var invalidString = "doesnt-match-this";
            rule.validate(invalidString, /matched-this/).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            });
        });

    });
});