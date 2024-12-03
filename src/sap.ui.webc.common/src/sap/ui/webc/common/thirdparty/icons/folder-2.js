sap.ui.define(["exports", "sap/ui/webc/common/thirdparty/base/config/Theme", "./v4/folder-2", "./v5/folder-2"], function (_exports, _Theme, _folder, _folder2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "accData", {
    enumerable: true,
    get: function () {
      return _folder.accData;
    }
  });
  _exports.default = void 0;
  Object.defineProperty(_exports, "ltr", {
    enumerable: true,
    get: function () {
      return _folder.ltr;
    }
  });
  _exports.pathData = void 0;
  const pathData = (0, _Theme.isLegacyThemeFamily)() ? _folder.pathData : _folder2.pathData;
  _exports.pathData = pathData;
  var _default = "folder-2";
  _exports.default = _default;
});