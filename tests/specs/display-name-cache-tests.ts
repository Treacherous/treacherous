import {expect} from "chai";
import {RulesetBuilder} from "../../src/builders/ruleset-builder";
import {describe, it} from "mocha";
import {DisplayNameCache} from "../../src/validation-groups/display-name-cache";

describe('Display Name Cache', function () {

    it('should correctly get property display name', function () {
        const displayName = "User's name";
        const rulesetBuilder = new RulesetBuilder();
        const ruleset = rulesetBuilder.create()
            .forProperty("username")
                .addRule("required")
                .withDisplayName(displayName)
            .build();

        const cache = new DisplayNameCache();
        cache.cacheDisplayNamesFor(ruleset);

        const actualDisplayName = cache.getDisplayNameFor("username");

        expect(actualDisplayName).to.equal(displayName);
    });

    it('should correctly get nested property display name', function () {
        const displayName = "User's name";
        const rulesetBuilder = new RulesetBuilder();
        const ruleset = rulesetBuilder.create()
            .forProperty("user")
            .then(x => {
                x.forProperty("name")
                    .withDisplayName(displayName)
            })
            .build();

        const cache = new DisplayNameCache();
        cache.cacheDisplayNamesFor(ruleset);
        const actualDisplayName = cache.getDisplayNameFor("user.name");

        expect(actualDisplayName).to.equal(displayName);
    });

    it('should correctly get nested array property display name', function () {
        const displayName = "User's name";
        const rulesetBuilder = new RulesetBuilder();
        const ruleset = rulesetBuilder.create()
            .forProperty("groups")
            .thenForEach(x => {
                x.forProperty("users")
                    .thenForEach(y => {
                        y.forProperty("name")
                            .withDisplayName(displayName)
                    });

            })
            .build();

        const cache = new DisplayNameCache();
        cache.cacheDisplayNamesFor(ruleset);

        const actualDisplayName = cache.getDisplayNameFor("groups[1].users[424].name");
        console.log("cache", cache["propertyNameOverrideCache"]);

        expect(actualDisplayName).to.equal(displayName);
    });
});