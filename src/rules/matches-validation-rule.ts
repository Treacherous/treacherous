import {IValidationRule} from "./ivalidation-rule";
import {IModelResolver} from "../resolvers/imodel-resolver";
import {TypeHelper} from "../helpers/type-helper";
import {ComparerHelper} from "../helpers/comparer-helper";

export class MatchesValidationRule implements IValidationRule
{
    public ruleName = "matches";

    constructor(){}

    public async validate(modelResolver: IModelResolver, propertyName: string, optionsOrProperty: any): Promise<boolean>
    {
        const fieldToMatch = optionsOrProperty.property || optionsOrProperty;
        const weakEquality = optionsOrProperty.weakEquality || false;
        const value = modelResolver.resolve(propertyName);
        const matchingFieldValue = modelResolver.resolve(fieldToMatch);

        if (value === undefined || value === null)
        { return (matchingFieldValue === undefined || matchingFieldValue === null); }
        else if(TypeHelper.isDateType(value))
        { return ComparerHelper.dateTimeCompararer(value, matchingFieldValue); }
        else
        { return ComparerHelper.simpleTypeComparer(value, matchingFieldValue, weakEquality); }
    }
}