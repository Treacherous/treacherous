export class PropertyValidationChangedEvent
{
    constructor(public property: string, public isValid: boolean, public error?: string) {}
}