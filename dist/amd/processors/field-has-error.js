define(["require", "exports", "tslib"], function (require, exports, tslib_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FieldHasError = (function (_super) {
        tslib_1.__extends(FieldHasError, _super);
        function FieldHasError(message) {
            var _this = _super.call(this, message) || this;
            _this.message = message;
            return _this;
        }
        return FieldHasError;
    }(Error));
    exports.FieldHasError = FieldHasError;
});
