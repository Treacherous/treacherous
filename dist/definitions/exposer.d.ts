import { ValidationGroupBuilder } from "./builders/validation-group-builder";
import { RulesetBuilder } from "./builders/ruleset-builder";
export declare function createRuleset<T>(withRuleVerification?: boolean): RulesetBuilder<T>;
export declare function createGroup(): ValidationGroupBuilder;
export declare function registerLocale(localeCode: string, localeResource: any): void;
export declare function useLocale(localeCode: string): void;
export declare function supplementLocale(localeCode: string, localeResource: any): void;
