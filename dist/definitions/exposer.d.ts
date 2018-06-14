import { ValidationGroupBuilder } from "./builders/validation-group-builder";
import { RulesetBuilder } from "./builders/ruleset-builder";
import { ILocaleHandler } from "./localization/ilocale-handler";
import { Ruleset } from "./rulesets/ruleset";
export declare function createRuleset<T>(basedUpon?: Ruleset, withRuleVerification?: boolean): RulesetBuilder<T>;
export declare function mergeRulesets(rulesetA: Ruleset, rulesetB: Ruleset): Ruleset;
export declare function createGroup(): ValidationGroupBuilder;
export declare const localeHandler: ILocaleHandler;
export declare function supplementLocale(localeCode: string, localeResource: any): void;
