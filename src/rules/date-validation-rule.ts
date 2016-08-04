import {IValidationRule} from "./ivalidation-rule";
import {IModelResolver} from "../resolvers/imodel-resolver";

export class DateValidationRule implements IValidationRule
{
    public ruleName = "date";
    private invalidObjectRegex = /Invalid|NaN/;

    public validate(modelResolver: IModelResolver, propertyName: string): Promise<boolean>
    {
        var value = modelResolver.resolve(propertyName);
        if (value === undefined || value === null)
        { return Promise.resolve(true); }

        var matchesRegex = !this.invalidObjectRegex.test(<any>new Date(value));
        return Promise.resolve(matchesRegex);
    }

    public getMessage(modelResolver: IModelResolver, propertyName: string) {
        var value = modelResolver.resolve(propertyName);
        return `This field contains "${value}" which is not a valid date`;
    }
}