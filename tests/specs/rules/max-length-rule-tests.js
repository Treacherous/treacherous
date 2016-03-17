var assert = chai.assert;
var expect = chai.expect;

describe("Validation Rules", function(){
    describe('Max Length Rule', function () {

        it('should be valid when string length is <= max length', function (done) {
            var rule = new Treacherous.MaxLengthValidationRule();
            var validString = "0123456789";
            rule.validate(validString, 10).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            });
        });

        it('should be valid when array length is <= max length', function (done) {
            var rule = new Treacherous.MaxLengthValidationRule();
            var validArray = [0,1,2,3,4,5,6,7,8,9];
            rule.validate(validArray, 10).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            });
        });

        it('should be valid when provided a null value', function (done) {
            var rule = new Treacherous.MaxLengthValidationRule();
            rule.validate(null, 10).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            });
        });

        it('should be invalid when string length is > max length', function (done) {
            var rule = new Treacherous.MaxLengthValidationRule();
            var invalidString = "0123456789";
            rule.validate(invalidString, 9).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            });
        });

        it('should be invalid when array length is > max length', function (done) {
            var rule = new Treacherous.MaxLengthValidationRule();
            var invalidArray = [0,1,2,3,4,5,6,7,8,9];
            rule.validate(invalidArray, 9).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            });
        });

    });
});