import {use, expect, spy} from "chai";
import * as spies from "chai-spies";
use(spies);

import {ValidationGroupFactory} from "../../src/factories/validation-group-factory";
import {ModelWatcherFactory} from "../../src/factories/model-watcher-factory";
import {PropertyResolver} from "property-resolver";
import {Ruleset} from "../../src/rulesets/ruleset";

describe('Validation Group', function () {

    it('should create unique model watchers per group', function () {

        var modelWatcherFactory = new ModelWatcherFactory(new PropertyResolver());
        var spiedCreationMethod = spy.on(modelWatcherFactory, 'createModelWatcher');
        var validationGroupFactory = new ValidationGroupFactory(null, modelWatcherFactory, null, null);

        var dummyRuleset = new Ruleset();
        validationGroupFactory.createValidationGroup({}, dummyRuleset);
        validationGroupFactory.createValidationGroup({}, dummyRuleset);

        expect(spiedCreationMethod).to.have.been.called.exactly(2);
    });
});