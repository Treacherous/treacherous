export interface IValidationGroup
{
    validate(): Promise<boolean>;
    validateProperty(propertyname): Promise<boolean>
    getModelErrors(revalidate?: boolean): Promise<any>;
    getPropertyError(propertyRoute: string, revalidate?: boolean): Promise<any>;
    changeValidationTarget(model: any);

    release(): void;
}