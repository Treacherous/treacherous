import {IValidationRule} from "./ivalidation-rule";
import {IModelResolver} from "../resolvers/imodel-resolver";
import {TypeHelper} from "../helpers/type-helper";
import {ComparerHelper} from "../helpers/comparer-helper";

export class MatchesValidationRule implements IValidationRule
{
    public ruleName = "matches";

    constructor(){}

    public validate(modelResolver: IModelResolver, propertyName: string, optionsOrProperty: any): Promise<boolean>
    {
        var fieldToMatch = optionsOrProperty.property || optionsOrProperty;
        var weakEquality = optionsOrProperty.weakEquality || false;
        var value = modelResolver.resolve(propertyName);
        var matchingFieldValue = modelResolver.resolve(fieldToMatch);

        var result;
        if (value === undefined || value === null)
        { result = (matchingFieldValue === undefined || matchingFieldValue === null); }
        else if(TypeHelper.isDateType(value))
        { result = ComparerHelper.dateTimeCompararer(value, matchingFieldValue); }
        else
        { result = ComparerHelper.simpleTypeComparer(value, matchingFieldValue, weakEquality); }

        return Promise.resolve(result);
    }

    public getMessage(modelResolver: IModelResolver, propertyName: string, optionsOrProperty: any) {
        var value = modelResolver.resolve(propertyName);
        var fieldToMatch = optionsOrProperty.property || optionsOrProperty;
        var matchingFieldValue = modelResolver.resolve(fieldToMatch);
        return `This field is ${value} but should match ${matchingFieldValue}`;
    }
}