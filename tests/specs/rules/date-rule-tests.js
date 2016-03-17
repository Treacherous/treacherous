var assert = chai.assert;
var expect = chai.expect;

describe("Validation Rules", function(){
    describe('Date Rule', function () {

        it('should be valid when date is provided', function (done) {
            var rule = new Treacherous.DateValidationRule();
            var validDate = Date.now();
            rule.validate(validDate).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            });
        });


        it('should be valid when provided a null value', function (done) {
            var rule = new Treacherous.DateValidationRule();
            rule.validate(null).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            });
        });

        it('should be invalid when non date is provided', function (done) {
            var rule = new Treacherous.DateValidationRule();
            var invalidDate = "this isn't a date";
            rule.validate(invalidDate).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            });
        });

    });
});