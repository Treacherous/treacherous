var assert = chai.assert;
var expect = chai.expect;

describe("Validation Rules", function(){
    describe('ISO Date Rule', function () {

        it('should be valid when iso format date is provided', function (done) {
            var rule = new Treacherous.ISODateValidationRule();
            var validDateString = new Date().toISOString();
            rule.validate(validDateString).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            });
        });


        it('should be valid when provided a null value', function (done) {
            var rule = new Treacherous.ISODateValidationRule();
            rule.validate(null).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            });
        });

        it('should be invalid when non date is provided', function (done) {
            var rule = new Treacherous.ISODateValidationRule();
            var invalidDateString = "this isn't a date";
            rule.validate(invalidDateString).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            });
        });

    });
});