module.exports = function (wallaby) {
    return {
        files: [
            {pattern: 'node_modules/chai/chai.js', instrument: false, instrument: false},
            {pattern: 'node_modules/chai-spies/lib/spy.js', load:false, instrument: false},
            {pattern: 'node_modules/property-resolver/**/property-resolver.js', load:false},
            {pattern: 'node_modules/bluebird/**/browser/bluebird.js', instrument: false},
            {pattern: 'src/**/*.ts', load: false}
        ],
        tests: [
            {pattern: 'tests/specs/**/*.ts'}
        ],
        env: { type: "node"},
        debug: true,
        testFramework: 'mocha'
    };
};