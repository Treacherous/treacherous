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

}