sap.ui.define(["exports", "sap/ui/webc/common/thirdparty/base/config/Theme", "./v1/column-unselected", "./v2/column-unselected"], function (_exports, _Theme, _columnUnselected, _columnUnselected2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "accData", {
    enumerable: true,
    get: function () {
      return _columnUnselected.accData;
    }
  });
  _exports.default = void 0;
  Object.defineProperty(_exports, "ltr", {
    enumerable: true,
    get: function () {
      return _columnUnselected.ltr;
    }
  });
  _exports.pathData = void 0;
  const pathData = (0, _Theme.isLegacyThemeFamily)() ? _columnUnselected.pathData : _columnUnselected2.pathData;
  _exports.pathData = pathData;
  var _default = "business-suite/column-unselected";
  _exports.default = _default;
});