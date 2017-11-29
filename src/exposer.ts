import {FieldErrorProcessor} from "./processors/field-error-processor";
import {RuleResolver} from "./rulesets/rule-resolver";
import {ValidationGroupBuilder} from "./builders/validation-group-builder";
import {ruleRegistry} from "./rule-registry-setup";
import {RulesetBuilder} from "./builders/ruleset-builder";

import {ILocaleHandler} from "./localization/ilocale-handler";
import {DefaultLocaleHandler} from "./localization/default-locale-handler";
import {Locale as DefaultLocale} from "./locales/en-us"

const defaultLocale = "en-us";

const defaultLocaleHandler = new DefaultLocaleHandler();
defaultLocaleHandler.registerLocale(defaultLocale, DefaultLocale);
defaultLocaleHandler.useLocale(defaultLocale);

let fieldErrorProcessor = new FieldErrorProcessor(ruleRegistry, defaultLocaleHandler);
const ruleResolver = new RuleResolver();

export function createRuleset<T>(withRuleVerification = false): RulesetBuilder<T>
{
    var rulesetBuilder = withRuleVerification ? new RulesetBuilder<T>(ruleRegistry) : new RulesetBuilder<T>();
    return rulesetBuilder.create();
}

export function createGroup(): ValidationGroupBuilder
{ return new ValidationGroupBuilder(fieldErrorProcessor, ruleResolver).create(); }

export var localeHandler: ILocaleHandler = defaultLocaleHandler;

export function supplementLocale(localeCode: string, localeResource: any) {
    defaultLocaleHandler.supplementLocaleFrom(localeCode, localeResource);
}