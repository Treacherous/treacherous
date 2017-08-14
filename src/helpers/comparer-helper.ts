export class ComparerHelper
{
    public static simpleTypeComparer(value1: (string | number), value2: (string | number), isWeak: boolean): boolean
    {
        if(isWeak)
        { return (value1 == value2); }

        return (value1 === value2);
    }

    public static dateTimeCompararer(value1: Date, value2: Date): boolean
    { return (value1.getTime() == value2.getTime()); }
}