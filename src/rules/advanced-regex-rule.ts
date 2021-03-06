import {IValidationRule} from "./ivalidation-rule";
import {IModelResolver} from "../resolvers/imodel-resolver";
import {TypeHelper} from "../helpers/type-helper";

export class AdvancedRegexValidationRule implements IValidationRule
{
    public ruleName: string;
    public expression: string;
    public message: (value: any) => string;

    constructor(ruleName: string, expression: string) {

        if(!ruleName || ruleName.length == 0)
        { throw new Error("ruleName is required, an empty rule name is invalid"); }

        if(!expression || expression.length == 0)
        { throw new Error("expression is required, an empty regex expression is invalid"); }

        this.ruleName = ruleName;
        this.expression = expression;
    }

    public async validate(modelResolver: IModelResolver, propertyName: string, regexPattern: RegExp): Promise<boolean>
    {
        const value = modelResolver.resolve(propertyName);

        if (TypeHelper.isEmptyValue(value))
        { return true; }

        return value.toString().match(this.expression) !== null;
    }
}