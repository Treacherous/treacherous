"use strict";
var PropertyWatcher = (function () {
    function PropertyWatcher(propertyPath, previousValue) {
        this.propertyPath = propertyPath;
        this.previousValue = previousValue;
    }
    return PropertyWatcher;
}());
exports.PropertyWatcher = PropertyWatcher;
