# Breaking Changes

Wherever possible breaking changes are avoided but in some cases its going to happen.

## 0.12.0

- Removed `IValidationSettings`
- Changed constructor order/args for `ValidationGroup`
- Made `createGroup` return a builder not an instance of `IValidationGroup`
- Removed `createGroupWithRules` from the exposer

## 0.11.0

- Removed `isValid` method, replaced with `validate`
- Changed signature of `IValidationRule` to take an `IModelResolver` and property name

## 0.9.0

- The whole module is now released as a commonjs module rather than different versions.

## 0.6.0

- The `treacherous.minimal.js` dist file was removed
- The `create` method exposed was changed to `createGroup` to be more explicit of what it does
- The `createWithRules` method exposed was changed to `createGroupWithRules` to be more explicit of what it does