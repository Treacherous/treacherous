# Installing

This can be used in nodejs or the browser, through a module loader or without one. It is flexible in how it 
is consumed as well as how it is exposed.

## Via NPM

Just do an `npm install treacherous`

## In browser

There are 3 flavours in the dist dir:

* `treacherous.all.js`      - Contains treacherous and all dependencies (mainly for testing)
* `treacherous.minimal.js`  - Contains only treacherous and no dependencies (for module aware systems)
* `treacherous.browser.js`  - Contains treacherous which works without modules for browser usage

The reason there are 3 flavours is because some people will use this in a non-module aware
browser scenario, and `treacherous.all.js` will contain everything for it to just work, it is also
used by the unit tests in the project.

`treacherous.js` is purely just the treacherous library without any dependencies, this is
the most modular version of the package and what the `package.json` defaults to. However there 
are 2 dependencies to other libraries I have written which were originally part of this but 
were split out for re-use, however I am aware most people will not use them outside of here, so
this is where the last version comes from.

`treacherous.browser.js` is same as `treacherous.minimal.js` but it does not know of modules, so it 
requires you to include `bluebird` and the other 2 packages in the page somewhere.
([event-js](https://github.com/grofit/eventjs), [property-resolver](https://github.com/grofit/property-resolver)), 

---

In the browser it will self register the `Treacherous` global, however in node or module aware
environments its up to you how you include it, but it will expose the same object for you.