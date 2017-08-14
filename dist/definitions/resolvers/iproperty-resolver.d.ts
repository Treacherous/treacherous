export interface IPropertyResolver {
    resolveProperty(model: any, propertyChain: string): any;
    decomposePropertyRoute(propertyRoute: string): Array<string>;
    getPropertyRouteSection(propertyRoute: string, sectionIndex: number): any;
    buildPropertyRoute(propertySections: Array<string>): string;
}
