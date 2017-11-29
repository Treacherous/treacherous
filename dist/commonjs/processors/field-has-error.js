"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var FieldHasError = /** @class */ (function (_super) {
    tslib_1.__extends(FieldHasError, _super);
    function FieldHasError(message) {
        var _this = _super.call(this, message) || this;
        _this.message = message;
        return _this;
    }
    return FieldHasError;
}(Error));
exports.FieldHasError = FieldHasError;
