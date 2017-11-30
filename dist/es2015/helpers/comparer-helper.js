export class ComparerHelper {
    static simpleTypeComparer(value1, value2, isWeak) {
        if (isWeak) {
            return (value1 == value2);
        }
        return (value1 === value2);
    }
    static dateTimeCompararer(value1, value2) { return (value1.getTime() == value2.getTime()); }
}
