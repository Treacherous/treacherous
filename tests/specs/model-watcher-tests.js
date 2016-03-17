var assert = chai.assert;
var expect = chai.expect;

describe('Model Watcher', function () {

    it('should correctly watch model changes', function (done) {
        var dummyModel = {
            foo: 10,
            bar: [ 10, 20, 30, 40 ],
            woo: {
                poo: 10
            }
        };

        var rulesetBuilder = new Treacherous.RulesetBuilder();
        var ruleset = rulesetBuilder.create()
            .forProperty("foo")
                .addRule("required", true)
            .forProperty("bar")
                .addRule("minLength", 1)
                .addRuleForEach("maxValue", 20)
            .build();

        var modelWatcher = new Treacherous.ModelWatcher(dummyModel, ruleset);
        var spySubscription = chai.spy(function(eventArgs){});

        modelWatcher.onPropertyChanged.subscribe(spySubscription);

        dummyModel.foo = null;
        dummyModel.bar[2] = 10;

        setTimeout(function(){
            expect(spySubscription).to.have.been.called.twice;
            modelWatcher.stopWatching();
            done();
        }, 1500);
    });

    it('should correctly watch model with nested rules', function (done) {
        var dummyModel = {
            bar: [
                { val: 10 },
                { val: 20 },
                { val: 30 },
                { val: 40 }
            ]
        };

        var rulesetBuilder = new Treacherous.RulesetBuilder();
        var nestedRuleset = rulesetBuilder.create()
            .forProperty("val")
            .addRule("maxValue", 30)
            .build();

        var ruleset = rulesetBuilder.create()
            .forProperty("bar")
            .addRulesetForEach(nestedRuleset)
            .build();

        var modelWatcher = new Treacherous.ModelWatcher(dummyModel, ruleset);
        var spySubscription = chai.spy(function(eventArgs){});

        modelWatcher.onPropertyChanged.subscribe(spySubscription);

        dummyModel.bar[2].val = 10;

        setTimeout(function(){
            expect(spySubscription).to.have.been.called.once;
            modelWatcher.stopWatching();
            done();
        }, 1500);
    });

    it('should only watch properties with rules', function () {
        var dummyModel = {
            foo: 0,
            bar: [
                { val: 10 },
                { val: 20 }
            ],
            blah: {
                test: { woop: 20 }
            }
        };

        var rulesetBuilder = new Treacherous.RulesetBuilder();
        var woopRuleset = rulesetBuilder.create()
            .forProperty("woop")
            .addRule("maxValue", 10)
            .build();

        var testRuleset = rulesetBuilder.create()
            .forProperty("test")
            .addRuleset(woopRuleset)
            .build();

        var ruleset = rulesetBuilder.create()
            .forProperty("blah")
            .addRuleset(testRuleset)
            .build();

        var modelWatcher = new Treacherous.ModelWatcher(dummyModel, ruleset);

        expect(modelWatcher.watchCache.length).to.equal(1);
        expect(modelWatcher.watchCache[0].propertyPath).to.equal("blah.test.woop");
        expect(modelWatcher.watchCache[0].previousValue).to.equal(20);
        modelWatcher.stopWatching();
    });

});