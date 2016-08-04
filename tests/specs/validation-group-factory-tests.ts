import {use, expect} from "chai";
import * as spies from "chai-spies";
import {ValidationGroupFactory} from "../../src/factories/validation-group-factory";
import {Ruleset} from "../../src/rulesets/ruleset";
import {DefaultValidationSettings} from "../../src/settings/default-validation-settings";
use(spies);

describe('Validation Group Factory', function () {

    it('should create unique model watchers per group', function () {

        var validationGroupFactory = new ValidationGroupFactory(null, null, new DefaultValidationSettings());
        var dummyRuleset = new Ruleset();
        var vg1 = validationGroupFactory.createValidationGroup({}, dummyRuleset);
        var vg2 = validationGroupFactory.createValidationGroup({}, dummyRuleset);

        expect(vg1.modelWatcher).to.not.equal(vg2.modelWatcher);
    });
});