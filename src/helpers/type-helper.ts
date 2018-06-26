export class TypeHelper
{
    public static isDateType(value: any): boolean {
        return (typeof value.getMonth === 'function');
    }

    public static isFunctionType(value: any): boolean {
        return (typeof value === 'function');
    }

    public static isSimpleType(value: any): boolean {
        return (typeof value == "string" || typeof value == "number");
    }

    public static isArrayType(value: any): boolean {
        return Object.prototype.toString.call(value) === '[object Array]';
    }

    public static isEmptyValue(value: any): boolean {
        return value === undefined || value === null || value.length == 0;
    }

    public static isObjectOrArray(value: any): boolean {
        return (!!value) && (value.constructor === Array || value.constructor === Object)
    }

    public static isRuleset(possibleRuleset: any): boolean {
        return (typeof(possibleRuleset.addRule) == "function");
    }

    public static isForEach(possibleForEach: any): boolean {
        return possibleForEach.isForEach;
    }
}