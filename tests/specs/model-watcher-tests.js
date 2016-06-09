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

        var modelWatcher = new Treacherous.ModelWatcher();
        modelWatcher.setupWatcher(dummyModel, ruleset, 50);
        var spySubscription = chai.spy(function(eventArgs){});

        modelWatcher.onPropertyChanged.subscribe(spySubscription);

        dummyModel.foo = null;
        dummyModel.bar[2] = 10;

        setTimeout(function(){
            // once for foo, once for bar, once for bar[2]
            expect(spySubscription).to.have.been.called.three;
            modelWatcher.stopWatching();
            done();
        }, 250);
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

        var modelWatcher = new Treacherous.ModelWatcher();
        modelWatcher.setupWatcher(dummyModel, ruleset, 50);
        var spySubscription = chai.spy(function(eventArgs){});

        modelWatcher.onPropertyChanged.subscribe(spySubscription);

        dummyModel.bar[2].val = 10;

        setTimeout(function(){
            expect(spySubscription).to.have.been.called.once;
            modelWatcher.stopWatching();
            done();
        }, 250);
    });

    it('should correctly notice array size changes', function (done) {
        var dummyModel = {
            foo: 10,
            bar: [ 10, 20 ]
        };

        var rulesetBuilder = new Treacherous.RulesetBuilder();
        var ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRule("required", true)
            .forProperty("bar")
            .addRule("minLength", 1)
            .addRuleForEach("maxValue", 20)
            .build();

        var modelWatcher = new Treacherous.ModelWatcher();
        modelWatcher.setupWatcher(dummyModel, ruleset, 50);
        var spySubscription = chai.spy(function(eventArgs){});

        modelWatcher.onPropertyChanged.subscribe(spySubscription);

        console.log("watcher before", modelWatcher.watchCache);

        dummyModel.bar.push(30);

        console.log("watcher after", modelWatcher.watchCache);

        setTimeout(function(){
            expect(spySubscription).to.have.been.called.exactly(2);
            modelWatcher.stopWatching();
            done();
        }, 250);
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

        var modelWatcher = new Treacherous.ModelWatcher();
        modelWatcher.setupWatcher(dummyModel, ruleset, 50);

        expect(modelWatcher.watchCache.length).to.equal(1);
        expect(modelWatcher.watchCache[0].propertyPath).to.equal("blah.test.woop");
        expect(modelWatcher.watchCache[0].previousValue).to.equal(20);
        modelWatcher.stopWatching();
    });


    it('should correctly update when model is changed', function (done) {
        var dummyModel = { foo: 0 };

        var rulesetBuilder = new Treacherous.RulesetBuilder();
        var ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRule("maxValue", 10)
            .build();

        var modelWatcher = new Treacherous.ModelWatcher();
        modelWatcher.setupWatcher(dummyModel, ruleset, 50);

        modelWatcher.onPropertyChanged.subscribe(function(data){
            expect(data.propertyPath).to.equal("foo");
            expect(data.newValue).to.equal(10);
            expect(data.oldValue).to.equal(0);
            done();
        });

        var newModel = { foo: 10 };
        modelWatcher.changeWatcherTarget(newModel);
        modelWatcher.stopWatching();
    });

    it('should correctly cope with null model setup and replacement', function (done) {
        var dummyModel = null;

        var rulesetBuilder = new Treacherous.RulesetBuilder();
        var ruleset = rulesetBuilder.create()
            .forProperty("foo")
                .addRule("maxValue", 10)
            .forProperty("bar")
                .addRule("maxLength", 5)
                .addRuleForEach("maxValue", 10)
            .build();

        var modelWatcher = new Treacherous.ModelWatcher();
        modelWatcher.setupWatcher(dummyModel, ruleset, 50);

        var newModel = {
            foo: 11,
            bar: [11, 12]
        };

        var spySubscription = chai.spy(function(eventArgs){console.log("event", eventArgs);});
        modelWatcher.onPropertyChanged.subscribe(spySubscription);
        modelWatcher.changeWatcherTarget(newModel);

        setTimeout(function(){
            // once for foo, once for bar, once for bar[0] and then bar[1]
            expect(spySubscription).to.have.been.called.exactly(4);
            modelWatcher.stopWatching();
            done();
        }, 250);
    });

    it('should correctly cope with empty model which is updated', function (done) {
        var dummyModel = {};

        var rulesetBuilder = new Treacherous.RulesetBuilder();
        var ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRule("maxValue", 10)
            .forProperty("bar")
            .addRuleForEach("maxValue", 10)
            .build();

        var modelWatcher = new Treacherous.ModelWatcher();
        modelWatcher.setupWatcher(dummyModel, ruleset, 50);

        var spySubscription = chai.spy(function(eventArgs){ console.log("event", eventArgs); });
        modelWatcher.onPropertyChanged.subscribe(spySubscription);

        dummyModel.foo = 11;
        dummyModel.bar = [11, 12];

        setTimeout(function(){
            // once for foo, once for bar, once for bar[0] and then bar[1]
            expect(spySubscription).to.have.been.called.exactly(4);
            modelWatcher.stopWatching();
            done();
        }, 250);
    });
});