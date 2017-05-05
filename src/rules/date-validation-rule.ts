import {IValidationRule} from "./ivalidation-rule";
import {IModelResolver} from "../resolvers/imodel-resolver";

export class DateValidationRule implements IValidationRule
{
    public ruleName = "date";
    private invalidObjectRegex = /Invalid|NaN/;

    public async validate(modelResolver: IModelResolver, propertyName: string): Promise<boolean>
    {
        let value = modelResolver.resolve(propertyName);

        if (value === undefined || value === null)
        { return true; }

        return !this.invalidObjectRegex.test(<any>new Date(value));
    }

    public getMessage(modelResolver: IModelResolver, propertyName: string) {
        let value = modelResolver.resolve(propertyName);
        return `This field contains "${value}" which is not a valid date`;
    }
}