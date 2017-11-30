import { ValidationGroupBuilder } from "./builders/validation-group-builder";
import { RulesetBuilder } from "./builders/ruleset-builder";
import { ILocaleHandler } from "./localization/ilocale-handler";
export declare function createRuleset<T>(withRuleVerification?: boolean): RulesetBuilder<T>;
export declare function createGroup(): ValidationGroupBuilder;
export declare const localeHandler: ILocaleHandler;
export declare function supplementLocale(localeCode: string, localeResource: any): void;
