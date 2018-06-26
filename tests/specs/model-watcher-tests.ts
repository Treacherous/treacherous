import {describe, it} from "mocha";
import {use, expect, spy} from "chai";
import {RulesetBuilder} from "../../src/builders/ruleset-builder";
import {ModelWatcher} from "../../src/watcher/model-watcher";
import * as spies from "chai-spies";
use(spies);

describe('Model Watcher', function () {

    it('should correctly watch model changes', function (done) {
        const dummyModel = {
            foo: 10,
            bar: [ 10, 20, 30, 40 ],
            woo: {
                poo: 10
            }
        };

        const rulesetBuilder = new RulesetBuilder();
        const ruleset = rulesetBuilder.create()
            .forProperty("foo")
                .addRule("required", true)
            .forProperty("bar")
                .addRule("minLength", 1)
                .addRuleForEach("maxValue", 20)
            .build();

        const modelWatcher = new ModelWatcher();
        modelWatcher.setupWatcher(dummyModel, ruleset, 50);
        const spySubscription = spy(function(eventArgs: any){});

        modelWatcher.onPropertyChanged.subscribe(spySubscription);

        dummyModel.foo = null;
        dummyModel.bar[2] = 10;

        setTimeout(function(){
            // once for foo, once for bar[2]
            expect(spySubscription).to.have.been.called.exactly(2);
            modelWatcher.stopWatching();
            done();
        }, 250);
    });

    it('should correctly watch model with nested rules', function (done) {
        const dummyModel = {
            bar: [
                { val: 10 },
                { val: 20 },
                { val: 30 },
                { val: 40 }
            ]
        };

        const rulesetBuilder = new RulesetBuilder();
        const nestedRuleset = rulesetBuilder.create()
            .forProperty("val")
            .addRule("maxValue", 30)
            .build();

        const ruleset = rulesetBuilder.create()
            .forProperty("bar")
            .addRulesetForEach(nestedRuleset)
            .build();

        const modelWatcher = new ModelWatcher();
        modelWatcher.setupWatcher(dummyModel, ruleset, 50);
        const spySubscription = spy(function(eventArgs: any){});

        modelWatcher.onPropertyChanged.subscribe(spySubscription);

        dummyModel.bar[2].val = 10;

        setTimeout(function(){
            expect(spySubscription).to.have.been.called.once;
            modelWatcher.stopWatching();
            done();
        }, 250);
    });

    it('should correctly notice array size changes', function (done) {
        const dummyModel = {
            foo: 10,
            bar: [ 10, 20 ]
        };

        const rulesetBuilder = new RulesetBuilder();
        const ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRule("required", true)
            .forProperty("bar")
            .addRule("minLength", 1)
            .addRuleForEach("maxValue", 20)
            .build();

        const modelWatcher = new ModelWatcher();
        modelWatcher.setupWatcher(dummyModel, ruleset, 50);
        const spySubscription = spy(function(eventArgs: any){});

        modelWatcher.onPropertyChanged.subscribe(spySubscription);

        dummyModel.bar.push(30);

        setTimeout(function(){
            expect(spySubscription).to.have.been.called.exactly(2);
            modelWatcher.stopWatching();
            done();
        }, 250);
    });

    it('should only watch properties with rules', function () {
        const dummyModel = {
            foo: 0,
            bar: [
                { val: 10 },
                { val: 20 }
            ],
            blah: {
                test: { woop: 20 }
            }
        };

        const rulesetBuilder = new RulesetBuilder();
        const woopRuleset = rulesetBuilder.create()
            .forProperty("woop")
            .addRule("maxValue", 10)
            .build();

        const testRuleset = rulesetBuilder.create()
            .forProperty("test")
            .addRuleset(woopRuleset)
            .build();

        const ruleset = rulesetBuilder.create()
            .forProperty("blah")
            .addRuleset(testRuleset)
            .build();

        const modelWatcher = new ModelWatcher();
        modelWatcher.setupWatcher(dummyModel, ruleset, 50);

        const watchCache = modelWatcher["watchCache"];
        expect(watchCache.length).to.equal(1);
        expect(watchCache[0].propertyPath).to.equal("blah.test.woop");
        expect(watchCache[0].previousValue).to.equal(20);
        modelWatcher.stopWatching();
    });


    it('should correctly update when model is changed', function (done) {
        const dummyModel = { foo: 0 };

        const rulesetBuilder = new RulesetBuilder();
        const ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRule("maxValue", 10)
            .build();

        const modelWatcher = new ModelWatcher();
        modelWatcher.setupWatcher(dummyModel, ruleset, 50);

        modelWatcher.onPropertyChanged.subscribe(function(data){
            expect(data.propertyPath).to.equal("foo");
            expect(data.newValue).to.equal(10);
            expect(data.oldValue).to.equal(0);
            done();
        });

        const newModel = { foo: 10 };
        modelWatcher.changeWatcherTarget(newModel);
        modelWatcher.stopWatching();
    });

    it('should correctly cope with null model setup and replacement', function (done) {
        const dummyModel: any = null;

        const rulesetBuilder = new RulesetBuilder();
        const ruleset = rulesetBuilder.create()
            .forProperty("foo")
                .addRule("maxValue", 10)
            .forProperty("bar")
                .addRule("maxLength", 5)
                .addRuleForEach("maxValue", 10)
            .build();

        const modelWatcher = new ModelWatcher();
        modelWatcher.setupWatcher(dummyModel, ruleset, 50);

        const newModel = {
            foo: 11,
            bar: [11, 12]
        };

        const spySubscription = spy(function(eventArgs: any){console.log("event", eventArgs);});
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
        const dummyModel: any = {};

        const rulesetBuilder = new RulesetBuilder();
        const ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRule("maxValue", 10)
            .forProperty("bar")
            .addRuleForEach("maxValue", 10)
            .build();

        const modelWatcher = new ModelWatcher();
        modelWatcher.setupWatcher(dummyModel, ruleset, 50);

        const spySubscription = spy(function(eventArgs: any){ console.log("event", eventArgs); });
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