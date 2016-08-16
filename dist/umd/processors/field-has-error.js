var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var FieldHasError = (function (_super) {
        __extends(FieldHasError, _super);
        function FieldHasError(message) {
            _super.call(this, message);
            this.message = message;
        }
        return FieldHasError;
    }(Error));
    exports.FieldHasError = FieldHasError;
});
