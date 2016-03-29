export declare class PropertyValidationChangedEvent {
    property: string;
    isValid: boolean;
    error: string;
    constructor(property: string, isValid: boolean, error?: string);
}
