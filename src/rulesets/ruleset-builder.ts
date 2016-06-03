import {IValidationRule} from "../rules/ivalidation-rule";
import {Ruleset} from "./ruleset";
import {RuleLink} from "./rule-link";
import {ForEachRule} from "./for-each-rule";

export class RulesetBuilder
{
    private internalRuleset: Ruleset;
    public currentProperty: string;

    public create = (): RulesetBuilder =>
    {
        this.internalRuleset = new Ruleset();
        this.currentProperty = null;
        return this;
    }

    public forProperty = (propertyName: string): RulesetBuilder =>
    {
        this.currentProperty = propertyName;
        return this;
    }

    public addRule = (rule: string, ruleOptions: any, messageOverride?: (value: any, ruleOptions?: any) => string | string): RulesetBuilder =>
    {
        if(!this.currentProperty)
        { throw new Error("A property must precede any rule calls in the chain"); }

        this.internalRuleset.addRule(this.currentProperty, new RuleLink(rule, ruleOptions, messageOverride));
        return this;
    }

    public addRuleForEach = (rule: string, ruleOptions: any, messageOverride?: (value: any, ruleOptions?: any) => string | string): RulesetBuilder =>
    {
        if(!this.currentProperty)
        { throw new Error("A property must precede any rule calls in the chain"); }

        var ruleLink = new RuleLink(rule, ruleOptions, messageOverride);
        this.internalRuleset.addRule(this.currentProperty, new ForEachRule<RuleLink>(ruleLink));

        return this;
    }

    public addRuleset = (ruleset: Ruleset): RulesetBuilder =>
    {
        if(!this.currentProperty)
        { throw new Error("A property must precede any rule calls in the chain"); }

        this.internalRuleset.addRuleset(this.currentProperty, ruleset);
        return this;
    }

    public addRulesetForEach = (ruleset: Ruleset): RulesetBuilder =>
    {
        if(!this.currentProperty)
        { throw new Error("A property must precede any rule calls in the chain"); }

        this.internalRuleset.addRuleset(this.currentProperty, new ForEachRule<Ruleset>(ruleset));
        return this;
    }

    public build = (): Ruleset =>
    {
        return this.internalRuleset;
    }
}