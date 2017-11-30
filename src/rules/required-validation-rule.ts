import {IValidationRule} from "./ivalidation-rule";
import {IModelResolver} from "../resolvers/imodel-resolver";

export class RequiredValidationRule implements IValidationRule
{
    public ruleName = "required";

    public async validate(modelResolver: IModelResolver, propertyName: string, isRequired: boolean = true): Promise<boolean>
    {
        const value = modelResolver.resolve(propertyName);

        if (value === undefined || value === null)
        { return !isRequired; }

        let testValue = value;
        if (typeof (testValue) === 'string')
        {
            if (String.prototype.trim)
            { testValue = value.trim(); }
            else
            { testValue = value.replace(/^\s+|\s+$/g, ''); }
        }

        if (!isRequired)
        { return true; }

        return (testValue + '').length > 0;
    }
}