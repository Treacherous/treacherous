export class PropertyChangedEvent
{
    constructor(public propertyPath: string, public newValue: any, public oldValue: any){}
}