import 'mocha';
import {use, expect, spy} from "chai";
import {RulesetBuilder} from "../../src/builders/ruleset-builder";
import {ModelProxy} from "../../src/proxy/model-proxy";
import * as spies from "chai-spies";
use(spies);

describe('Model Proxy', function () {

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

        const modelProxy = new ModelProxy();
        const proxyModel = modelProxy.proxyObject(dummyModel, ruleset);
        const spySubscription = spy(function(eventArgs: any){
            console.log("called with", eventArgs);
        });

        modelProxy.onPropertyChanged.subscribe(spySubscription);

        proxyModel.foo = null;
        proxyModel.bar[2] = 10;

        setTimeout(function(){
            // once for foo, once for bar[2]
            expect(spySubscription).to.have.been.called.exactly(2);
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

        const modelProxy = new ModelProxy();
        const proxyModel = modelProxy.proxyObject(dummyModel, ruleset);
        const spySubscription = spy(function(eventArgs: any){
            console.log("Raised", eventArgs);
        });

        modelProxy.onPropertyChanged.subscribe(spySubscription);

        proxyModel.bar[2].val = 10;

        setTimeout(function(){
            expect(spySubscription).to.have.been.called.once;
            done();
        }, 250);
    });

});