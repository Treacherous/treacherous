export interface IPropertyResolver {
    resolveProperty: (model: any, propertyChain: string) => any;
}
