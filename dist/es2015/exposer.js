import { FieldErrorProcessor } from "./processors/field-error-processor";
import { RuleResolver } from "./rulesets/rule-resolver";
import { ValidationGroupBuilder } from "./builders/validation-group-builder";
import { ruleRegistry } from "./rule-registry-setup";
import { RulesetBuilder } from "./builders/ruleset-builder";
import { DefaultLocaleHandler } from "./localization/default-locale-handler";
import { locale as defaultLocale } from "./locales/en-us";
const defaultLocaleCode = "en-us";
const defaultLocaleHandler = new DefaultLocaleHandler();
defaultLocaleHandler.registerLocale(defaultLocaleCode, defaultLocale);
defaultLocaleHandler.useLocale(defaultLocaleCode);
const fieldErrorProcessor = new FieldErrorProcessor(ruleRegistry, defaultLocaleHandler);
const ruleResolver = new RuleResolver();
export function createRuleset(withRuleVerification = false) {
    const rulesetBuilder = withRuleVerification ? new RulesetBuilder(ruleRegistry) : new RulesetBuilder();
    return rulesetBuilder.create();
}
export function createGroup() { return new ValidationGroupBuilder(fieldErrorProcessor, ruleResolver, defaultLocaleHandler).create(); }
export const localeHandler = defaultLocaleHandler;
export function supplementLocale(localeCode, localeResource) {
    defaultLocaleHandler.supplementLocaleFrom(localeCode, localeResource);
}
