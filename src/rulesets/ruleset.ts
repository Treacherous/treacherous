import {RuleLink} from "./rule-link";
import {ForEachRule} from "./for-each-rule";
import {ICompositeValidationRule} from "../rules/composite/icomposite-validation-rule";

export class Ruleset
{
    public rules = {};
    public compositeRules = {};
    public propertyDisplayNames = {};

    private createPropertyEntryIfNeeded = (property: string): void =>
    {
        if(!this.rules[property])
        { this.rules[property] = []; }
    }

    public addRule = (property: string, ruleLink: RuleLink | ForEachRule<RuleLink>): void => {
        this.createPropertyEntryIfNeeded(property);
        this.rules[property].push(ruleLink);
    }

    public addRuleset = (property: string, ruleset: Ruleset | ForEachRule<Ruleset>): void => {
        this.createPropertyEntryIfNeeded(property);
        this.rules[property].push(ruleset);
    }

    public addCompositeRule = (compositeRule: ICompositeValidationRule) : void =>
    { this.compositeRules[compositeRule.propertyName] = compositeRule; }

    public addPropertyDisplayName = (propertyName: string, displayName) : string =>
    { return this.propertyDisplayNames[propertyName] = displayName; }

    public getRulesForProperty = (property: string): Array<any> =>
    { return this.rules[property]; }

    public getCompositeRulesRulesForProperty = (propertyName: string): Array<any> =>
    { return this.compositeRules[propertyName]; }

    public getPropertyDisplayName = (propertyName: string): Array<any> =>
    { return this.propertyDisplayNames[propertyName]; }
}