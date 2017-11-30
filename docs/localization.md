# Localization

Although there are a few different parts to it, the localization is actually quite simple under the hood, there is an `ILocaleHandler` which defines the contracts for handlers, be it the default one, a custom i18n one etc.

Lets quickly go over the *DEFAULT* setup which is automatically done for you and can be supplemented via code and any other modules.

## Default Locale Handler

So by default treacherous will pre load the locale handler with an instance of `DefaultLocaleHandler` and will register `en-us` as the default language, and use that.

### How it works

The code which does this is run for you as part of the default setup ([found in exposer.ts](../src/exposer.ts))

```ts
import {ILocaleHandler} from "./localization/ilocale-handler";
import {DefaultLocaleHandler} from "./localization/default-locale-handler";
import {locale as defaultLocale} from "./locales/en-us"

const defaultLocaleCode = "en-us";

const defaultLocaleHandler = new DefaultLocaleHandler();
defaultLocaleHandler.registerLocale(defaultLocaleCode, defaultLocale);
defaultLocaleHandler.useLocale(defaultLocaleCode);
```

As mentioned this is all done for you, but you can see that it sets the default locale to `en-us` and then instantiates the locale handler (so it can be passed to other treacherous classes) and registers the `en-us` locale data and then uses that.

Just to confirm here `registerLocale` does not select that locale as the current one, it just registers the locale within the handler. This is so that you can load multiple locales at once for SPAs and switch between them based upon the users selection. So the `useLocale` just tells the handler what locale to use when resolving messages.

### How to create locales

The default locale handler is quite simple and just expects you to pass it a module containing a `locale` export like so:

```ts
import {IModelResolver} from "../resolvers/imodel-resolver";

export var locale =
{
    "default": "This field is invalid",
    "required": "This field is required",
    "date": (value: any) => `This field contains "${value}" which is not a valid date`,
    // ... more rules here  
    "matches": (modelResolver: IModelResolver, propertyName: string, optionsOrProperty: any) => {
        const value = modelResolver.resolve(propertyName);
        const fieldToMatch = optionsOrProperty.property || optionsOrProperty;
        const matchingFieldValue = modelResolver.resolve(fieldToMatch);
        return `This field is ${value} but should match ${matchingFieldValue}`;
    },
};
```

So this is part of the [en-us locale](../src/locales/en-us.ts) module which is loaded for you, and this should be used as reference for other locales.

(If you are a JS user then you dont need the typings but export the `locale` object in the same way so it can be grabbed from the module.)

There are a few key bits to note here as to how the messages are resolved and how you can setup your messages, as a message can be a string or a method depending on the data needed for your message to be resolved.

#### `default` key

This is a fallback generic message incase you have a custom rule and have not provided it with a message. So for most cases this can be ignored, but the handler will try to find a message for your key, if it cant find one it looks for the default, if there is no default it tells you no rules could be found. So it is a good idea to provide a default fallback within your custom locales.

#### Providing a string as a message

This is the simplest example and your string will be passed through without any processing of any kind. 

The `default` and `required` keys are an example of this.

#### Providing a message which requires a value

This is the next logical step if you need more than just a static string, but only need the current value of the property being validated.

In this scenario you make your message a function which will be passed the current value, which you then use to generate you string. 

`date` is an example of this.

#### Providing a function which will manually resolve message

This is the most complex scenario but this is where you want to be able to interrogate the model directly and create your message in a more complex way.

In this scenario you make your message a function which takes an `IModelResolver`, the propertyName which is a string, and the rule options which can be anything based upon how you setup your rule.

The `matches` rule is an example of this.

#### Returning Promises

You can return a promise from your messages if you want and the handler will automatically handle it for you, in the case of you having async code within your error message handler.

If at all possible it is recommended you try to keep your messages lightweight, but in some cases you may need to asynchronously do something, and the support is there for you to do so if needed.

### Adding your own Locales

So once you have made your own locales such as `zh-cn` which adhere to the above pattern you can simply register it with the default locale handler like so:

```ts
import {localeHandler} from "treacherous"
import {locale as chineseLocale} from "./my-locales/zh-cn`
localeHandler.registerLocale("zh-cn", chineseLocale);
```

That will tell the default locale handler that there is another language that it should support, so by default after that code is run you would have `en-us` and `zh-cn` available for use, **HOWEVER** it is still using `en-us` as we have only registered another locale, not actually told treacherous to use that as the current one, which can be achieved like so:

```ts
localeHandler.useLocale("zh-cn");
```

Then that's it, any time a validation rule would be resolved it would look for the chinese version of it rather than the english version of it. You can easily switch between the active locale by just calling `useLocale` with the registered locale you wish to use.

(If you try to use a locale which has not been registered an exception will be thrown.)

### Adding to existing locales

So in this scenario you will probably be making custom rules and done want to create your own custom `en-us` but add to the existing one, and that use case is super simple too as the default handler has support for supplementing locales.

So to do so you would create your own locale containing just the rules you want to add to the system, like so:

```
// Imagine you have a custom-rules.en-us
export var locale
{
    "myCustomRule1": "some message",
    "myOtherCustomRule2": (value) => `some message with the ${value}`
}

// Then you supplement en-us like so
import {supplementLocale} from "treacherous"
import {locale as supplementEnglishLocale} from "../my-locales/custom-rules.en-us"

supplementLocale("en-us", supplementEnglishLocale);
```

This is the neatest way of doing it, but you can go rogue and just pass the `supplementLocale` call a JS object containing the keys rather than loading it from a separate file.

## Custom Handlers

You will need to provide your locale data in different ways depending on the implementation of `ILocaleHandler`, but generally the data will be a same. There being a key which ties the rule to the message, such as `required` or `maxValue` and the locale code itself, which by default would be `en-us`.

So in a lot of real world scenarios you may be using one of the various i18n implementations with a backend/api/local files etc (there are that many varying implementations of it), or you may want to have a folder where you dynamically load modules on demand. 

Whatever your scenario, in almost all these cases the key parts are always the same, you have a locale code which identifies what language you want to use and a key that used to indicate what string you want from the locale data you have.

### The default handler

As you can see from the previous section the default handler delegates the fetching of the locale data to the consumer, and is quite simple in nature as all it really does is just cache the locales like a big dictionary and delegate the right data to the messages depending on their type.

It does however show the basics required for creating a localization handler, so lets pretend we wanted to make a handler that did the loading of modules for you so you.

### An imaginary path based handler

As there are a myriad of i18n frameworks and plugins for view libraries it would be too difficult to create an out the box i18n handler, but as at least a stepping stone, I can provide an imaginary async loader that shows the basics in a way that can be adapted to various other scenarios.

#### The implementation

```ts
// Import interfaces and expected types
import {ILocaleHandler} from "./ilocale-handler";
import {IModelResolver} from "../resolvers/imodel-resolver";
import {LocaleString, RawLocaleStringGetter, ProcessedLocaleStringGetter} from './locale-string';

// Create a class which implements ILocaleHandler
export class DynamicLocaleHandler implements ILocaleHandler
{
    // Current locale code
    private localeCode: string;

    // Container for cached locale resources
    private localeResources: any = {};

    // Promise to indicate if something is still loading
    private waitUntilLoaded: Promise<any>;

    // The default path where locales would be stored
    constructor(private defaultLocalePath = "/locales"){}

    public getCurrentLocale = () => { return this.localeCode; }

    // The register here allows an optional url override to the default path, but could be passed in anything
    public registerLocale = async (localeCode: string, localeModuleUrl?: string) => {

        // Make sure that any previous async tasks have finished
        await this.waitUntilLoaded;
       
        // Check if we have already cached it, if so return it
        if(this.localeResources[localeCode])
        { return this.localeResources[localeCode]; }

        // Get the url of the module
        const moduleUrl = localeModuleUrl ? localeModuleUrl : `${this.defaultLocalePath}/${localeCode}`;

        // Set the new promise that is outstanding
        this.waitUntilLoaded = this.loadLocaleFrom(moduleUrl)
            .then((localeData:any) => {
                // Cache the results
                this.localeResources[localeCode] = localeData;
            });           
        
        // Return current promise incase caller wants to wait
        return this.waitUntilLoaded;
    }

    public useLocale = async(localeCode: string) =>
    { 
        await this.waitUntilLoaded;
        
        if(!this.localeResources[localeCode])
        { throw `Unable to find registered locale for [${localeCode}]`; }

        this.localeCode = localeCode;
    }

    // Manually update the cached locales with a partial locale
    public supplementLocaleFrom = async (localeCode: string, localeModuleUrl: string) => {
        await this.waitUntilLoaded;

        // Tell everything else here to wait for this to finish
        this.waitUntilLoaded = this.loadLocaleFrom(localeModuleUrl)
            .then((localeData:any) => {
                // Merge objects together
                this.localeResources[localeCode] = Object.assign({}, this.localeResources[localeCode], localeData);
            });
            
        return this.waitUntilLoaded;
    }

    // This does the actual loading from external source
    private loadLocaleFrom = async (localeUrl: string) => {
        try
        { 
            // Dynamically import the locale file and return it
            const resourceContent = await import(localeUrl);
            return resourceContent.locale;
        }
        catch(ex)
        { throw `Cannot load locale: [${this.localeCode}] @ [${localeUrl}], error provided: ${ex}`; }    
    }
    
    // This is pretty much same as default implementation apart from wait for outstanding promises
    public getMessage = async (ruleName: string, ruleOptions: any, modelResolver: IModelResolver, propertyName: string) => {

        await this.waitUntilLoaded;

        const localeResource = this.localeResources[this.localeCode];
        const ruleResource: LocaleString = localeResource[ruleName] || localeResource["default"] || `Cannot find rule for ${ruleName}`;

        if(typeof ruleResource === "string")
        { return ruleResource; }

        if(ruleResource.length === 3 || propertyName == null)
        { return (<RawLocaleStringGetter>ruleResource)(modelResolver, propertyName, ruleOptions); }

        const propertyValue = modelResolver.resolve(propertyName);
        return (<ProcessedLocaleStringGetter>ruleResource)(propertyValue, ruleOptions);
    }
}
```

That is quite a bit of code there, but at a high level its basically resolving locales dynamically from a given path, which may seem a bit pointless but if you imagine an i18n scenario with a back end. You could change the `loadLocaleFrom` to do an async call to get you all related translations and cache them, or even just have `getMessage` do a realtime async call to the back end with the locale code and the tag (rulename), then you could optionally cache it etc.

There are many different ways to implement this interface, but this rough example should give you some idea as to how you can implement your own async handlers which would hook up to whatever back end you need.

#### Using it

Currently treacherous loads a lot of stuff automatically, this may change going forward but right now if you want to use your own handler you would need to make your own entry points like so:

```ts
import {FieldErrorProcessor, RuleResolver, ValidationGroupBuilder, ruleRegistry, RulesetBuilder, ILocaleHandler} from "treacherous";
import {DynamicLocaleHandler} from "./my-handlers/dynamic-locale-handler";

const defaultLocaleCode = "en-us";

const dynamicLocaleHandler = new DynamicLocaleHandler();
dynamicLocaleHandler.registerLocale(defaultLocaleCode);
dynamicLocaleHandler.useLocale(defaultLocaleCode);

const fieldErrorProcessor = new FieldErrorProcessor(ruleRegistry, dynamicLocaleHandler);
const ruleResolver = new RuleResolver();

export function createRuleset<T>(withRuleVerification = false): RulesetBuilder<T>
{
    const rulesetBuilder = withRuleVerification ? new RulesetBuilder<T>(ruleRegistry) : new RulesetBuilder<T>();
    return rulesetBuilder.create();
}

export function createGroup(): ValidationGroupBuilder
{ return new ValidationGroupBuilder(fieldErrorProcessor, ruleResolver, dynamicLocaleHandler).create(); }

export const localeHandler: ILocaleHandler = dynamicLocaleHandler;

export function supplementLocale(localeCode: string, localeResource: any) {
    dynamicLocaleHandler.supplementLocaleFrom(localeCode, localeResource);
}
```

Then wherever you would normally do `import {createRuleset, createGroup} from "treacherous";` change it to `import {createRuleset, createGroup} from "my-custom-exposer";`.