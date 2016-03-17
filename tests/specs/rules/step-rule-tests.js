var assert = chai.assert;
var expect = chai.expect;

describe("Validation Rules", function(){
    describe('Step Rule', function () {

        it('should be valid when number is valid increment', function (done) {
            var rule = new Treacherous.StepValidationRule();
            var validIncrement = 10;
            rule.validate(validIncrement, 5).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            });
        });

        it('should be valid when string number is valid increment', function (done) {
            var rule = new Treacherous.StepValidationRule();
            var validNumberString = "10";
            rule.validate(validNumberString, 5).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            });
        });

        it('should be valid when provided a null value', function (done) {
            var rule = new Treacherous.StepValidationRule();
            rule.validate(null, 5).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            });
        });

        it('should be invalid when number is not valid increment', function (done) {
            var rule = new Treacherous.StepValidationRule();
            var invalidIncrement = 12;
            rule.validate(invalidIncrement, 5).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            });
        });

        it('should be invalid when string number is not valid increment', function (done) {
            var rule = new Treacherous.StepValidationRule();
            var invalidIncrement = "12";
            rule.validate(invalidIncrement, 5).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            });
        });
    });
});