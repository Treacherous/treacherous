import 'mocha';
import {expect} from "chai";
import {MatchesValidationRule} from "../../../src/rules/matches-validation-rule";
import {PropertyResolver} from "property-resolver";
import {ModelResolver} from "../../../src/resolvers/model-resolver";

describe("Validation Rules", function(){
    describe('Matches Rule', function () {

        it('should be valid when properties match without weak equality', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.a = 10;
            modelResolver.model.b = 10;

            const rule = new MatchesValidationRule();
            rule.validate(modelResolver,'a', 'b').then(function(isValid: boolean){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when properties weakly match with weak equality', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.a = "10";
            modelResolver.model.b = 10;

            const rule = new MatchesValidationRule();
            rule.validate(modelResolver, "a", { property: "b", weakEquality: true }).then(function(isValid: boolean){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be invalid when properties weakly match with no weak equality', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.a = 10;
            modelResolver.model.b = "10";

            const rule = new MatchesValidationRule();
            rule.validate(modelResolver, "a", "b").then(function(isValid: boolean){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });

        it('should be valid when dates properties match', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.a = new Date(1995, 11, 17);
            modelResolver.model.b = new Date(1995, 11, 17);

            const rule = new MatchesValidationRule();
            rule.validate(modelResolver, "a", "b").then(function(isValid: boolean){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when null values match', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.a = null;
            modelResolver.model.b = null;

            const rule = new MatchesValidationRule();
            rule.validate(modelResolver, "a", "b").then(function(isValid: boolean){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be invalid when property does not match', function (done) {
            const modelResolver = new ModelResolver(new PropertyResolver(), {});
            modelResolver.model.a = 10;
            modelResolver.model.a = "different";

            const rule = new MatchesValidationRule();
            rule.validate(modelResolver, "a", "b").then(function(isValid: boolean){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });
    });
});