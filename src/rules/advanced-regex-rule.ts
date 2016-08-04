import {IValidationRule} from "./ivalidation-rule";
import {IModelResolver} from "../resolvers/imodel-resolver";

export class AdvancedRegexValidationRule implements IValidationRule
{
    public ruleName: string;
    public expression: string;
    public message: (value) => string;

    constructor(ruleName: string, expression: string, message: string | ((value)=>string)) {

        if(!ruleName || ruleName.length == 0)
        { throw new Error("ruleName is required, an empty rule name is invalid"); }

        if(!expression || expression.length == 0)
        { throw new Error("expression is required, an empty regex expression is invalid"); }

        this.ruleName = ruleName;
        this.expression = expression;
        this.message = (typeof message === "function") ? message : (): string => { return <string>message; };
    }

    public validate(modelResolver: IModelResolver, propertyName: string, regexPattern: RegExp): Promise<boolean>
    {
        var value = modelResolver.resolve(propertyName);
        if (value === undefined || value === null || value.length == 0)
        { return Promise.resolve(true); }

        var matchesPattern = value.toString().match(this.expression) !== null;
        return Promise.resolve(matchesPattern);
    }

    public getMessage(modelResolver: IModelResolver, propertyName: string, regexPattern: RegExp) {
        var value = modelResolver.resolve(propertyName);
        return this.message(value);
    }
}