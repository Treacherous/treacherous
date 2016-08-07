export interface IValidationGroup
{
    validate(): Promise<boolean>;
    validateProperty(propertyname): Promise<boolean>
    getModelErrors(): Promise<any>;
    getPropertyError(propertyRoute: string): Promise<any>;
    changeValidationTarget(model: any);

    release(): void;
}