import 'mocha';
import {use, expect, spy} from "chai";
import {RulesetBuilder} from "../../src/builders/ruleset-builder";
import {ModelWatcher} from "../../src/watcher/model-watcher";
import {DefaultLocaleHandler} from "../../src/localization/default-locale-handler";

import {locale as defaultLocale} from "../../src/locales/en-us";
import { IModelResolver } from '../../dist/definitions/index';

describe('Default Locale Handler Tests', function () {

    it('should correctly load locale module', async function () {
        const localeCode = "en-us";
        const moduleResourceLoader = new DefaultLocaleHandler();
        moduleResourceLoader.registerLocale(localeCode, defaultLocale);
        moduleResourceLoader.useLocale(localeCode);
        console.log("Loaded Resource", moduleResourceLoader["localeResources"]);

        expect(moduleResourceLoader.getCurrentLocale()).to.equal("en-us");
        expect(moduleResourceLoader["localeResources"]).to.have.property(localeCode);
        expect(moduleResourceLoader["localeResources"][localeCode]).to.equal(defaultLocale);
    });

    it('should correctly supplement locale', async function () {
        const localeCode = "en-us";
        const supplementLocale = {
            "superAmaze": "This is a super amazing message"
        };

        const moduleResourceLoader = new DefaultLocaleHandler();
        moduleResourceLoader.registerLocale(localeCode, defaultLocale);
        moduleResourceLoader.supplementLocaleFrom(localeCode, supplementLocale);   

        moduleResourceLoader.useLocale(localeCode);
        console.log("Loaded Resource", moduleResourceLoader["localeResources"]);

        expect(moduleResourceLoader.getCurrentLocale()).to.equal("en-us");
        expect(moduleResourceLoader["localeResources"]).to.have.property(localeCode);

        for(const propertyName in defaultLocale) {
            expect(moduleResourceLoader["localeResources"][localeCode]).to.have.property(propertyName);
        }

        expect(moduleResourceLoader["localeResources"][localeCode]).to.have.property("superAmaze");

        const message = await moduleResourceLoader.getMessage("superAmaze", null, null, null);
        expect(message).to.equal(supplementLocale.superAmaze);        
    });

    it('should correctly get locale message', async function () {
        const localeCode = "en-us";
        const moduleResourceLoader = new DefaultLocaleHandler();
        moduleResourceLoader.registerLocale(localeCode, defaultLocale);
        moduleResourceLoader.useLocale(localeCode);
        
        const message = await moduleResourceLoader.getMessage("required", null, null, null);
        expect(message).to.equal(defaultLocale.required);
    });

    it('should correctly flag error with non registered locale', function (done) {
        const localeCode = "en-us";
        const moduleResourceLoader = new DefaultLocaleHandler();

        moduleResourceLoader.useLocale(localeCode)
            .catch((exception) => {
                expect(exception).to.equal(`Unable to find registered locale for [${localeCode}]`);
                done();
            });
    });

    it('should correctly resolve string messages', async function () {
        const localeCode = "en-us";
        const exampleLocale = {
            "example": "this is a message"
        };

        const moduleResourceLoader = new DefaultLocaleHandler();
        moduleResourceLoader.supplementLocaleFrom(localeCode, exampleLocale);
        moduleResourceLoader.useLocale(localeCode);

        const message = await moduleResourceLoader.getMessage("example", null, null, null);
        console.log(`message is: ${message}`);
        expect(message).to.equal(exampleLocale.example);
    });

    it('should correctly resolve value function messages', async function () {
        const localeCode = "en-us";
        const exampleLocale = {
            "example": (value: any) => `message has value ${value}`
        };

        const moduleResourceLoader = new DefaultLocaleHandler();
        moduleResourceLoader.supplementLocaleFrom(localeCode, exampleLocale);
        moduleResourceLoader.useLocale(localeCode);

        const fakeResolver: IModelResolver = { model: null, resolve: (properyName: any): any => { return 10; }};
        const message = await moduleResourceLoader.getMessage("example", null, fakeResolver, "someProperty");
        console.log(`message is: ${message}`);
        expect(message).to.equal(exampleLocale.example(10));
    });

    it('should correctly resolve model resolver function messages', async function () {
        const localeCode = "en-us";
        const exampleLocale = {
            "example": (modelResolver: any, propertyName: string, option: any) => {
                const resolvedValue = modelResolver.resolve(propertyName);
                return `message has value been called with [${propertyName}]:[${option}] = [${resolvedValue}]`;
            }
        };

        const moduleResourceLoader = new DefaultLocaleHandler();
        moduleResourceLoader.supplementLocaleFrom(localeCode, exampleLocale);
        moduleResourceLoader.useLocale(localeCode);

        const fakeResolver: IModelResolver = { model: null, resolve: (properyName: any): string => { return "some-value"; }};
        const message = await moduleResourceLoader.getMessage("example", "options", fakeResolver, "name");
        console.log(`message is: ${message}`);
        expect(message).to.equal(exampleLocale.example(fakeResolver, "name", "options"));
    });
});