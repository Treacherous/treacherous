export class TypeHelper
{
    public static isDateType(value): boolean {
        return (typeof value.getMonth === 'function');
    }

    public static isSimpleType(value): boolean {
        return (typeof value == "string" || typeof value == "number");
    }

    public static isArrayType(value): boolean {
        return Object.prototype.toString.call(value) === '[object Array]';
    }

}