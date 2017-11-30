import {IModelResolver} from "../resolvers/imodel-resolver";
import {IValidationRule} from "./ivalidation-rule";

export class ISODateValidationRule implements IValidationRule
{
    public ruleName = "isoDate";
    private isoDateRegex = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/;

    public async validate(modelResolver: IModelResolver, propertyName: string): Promise<boolean>
    {
        const value = modelResolver.resolve(propertyName);

        if (value === undefined || value === null)
        { return true; }

        return this.isoDateRegex.test(value);
    }
}