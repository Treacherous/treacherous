import {FieldErrorProcessor} from "./processors/field-error-processor";
import {RuleResolver} from "./rulesets/rule-resolver";
import {ValidationGroupBuilder} from "./builders/validation-group-builder";
import {ruleRegistry} from "./rule-registry-setup";
import {RulesetBuilder} from "./builders/ruleset-builder";

import {ILocaleHandler} from "./localization/ilocale-handler";
import {DefaultLocaleHandler} from "./localization/default-locale-handler";
import {locale as defaultLocale} from "./locales/en-us";
import {Ruleset} from "./rulesets/ruleset";

const defaultLocaleCode = "en-us";

const defaultLocaleHandler = new DefaultLocaleHandler();
defaultLocaleHandler.registerLocale(defaultLocaleCode, defaultLocale);
defaultLocaleHandler.useLocale(defaultLocaleCode);

const fieldErrorProcessor = new FieldErrorProcessor(ruleRegistry, defaultLocaleHandler);
const ruleResolver = new RuleResolver();

export function createRuleset<T>(basedUpon?: Ruleset, withRuleVerification = false): RulesetBuilder<T>
{
    const rulesetBuilder = withRuleVerification ? new RulesetBuilder<T>(ruleRegistry) : new RulesetBuilder<T>();
    return rulesetBuilder.create(basedUpon);
}

export function mergeRulesets(rulesetA: Ruleset, rulesetB: Ruleset): Ruleset {
    const newRuleset = new Ruleset();
    newRuleset.rules = {...rulesetA.rules, ...rulesetB.rules};
    newRuleset.compositeRules = {...rulesetA.compositeRules, ...rulesetB.compositeRules};
    newRuleset.propertyDisplayNames = {...rulesetA.propertyDisplayNames, ...rulesetB.propertyDisplayNames};
    return newRuleset;
}

export function createGroup(): ValidationGroupBuilder
{ return new ValidationGroupBuilder(fieldErrorProcessor, ruleResolver, defaultLocaleHandler).create(); }

export const localeHandler: ILocaleHandler = defaultLocaleHandler;

export function supplementLocale(localeCode: string, localeResource: any) {
    defaultLocaleHandler.supplementLocaleFrom(localeCode, localeResource);
}