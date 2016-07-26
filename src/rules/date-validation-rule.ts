import {IValidationRule} from "./ivalidation-rule";

export class DateValidationRule implements IValidationRule
{
    public ruleName = "date";
    private invalidObjectRegex = /Invalid|NaN/;

    public validate(model, value): Promise<boolean>
    {
        if (value === undefined || value === null)
        { return Promise.resolve(true); }

        var matchesRegex = !this.invalidObjectRegex.test(<any>new Date(value));
        return Promise.resolve(matchesRegex);
    }

    public getMessage(model, value) {
        return `This field contains "${value}" which is not a valid date`;
    }
}