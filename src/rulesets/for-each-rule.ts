export class ForEachRule<RuleType>
{
    public isForEach = true;

    constructor(public internalRule: RuleType) {}
}