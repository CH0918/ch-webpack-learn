(function (modules) {
  function require(id) {
    const [fn, mapping] = modules[id];
    function localRequire(name) {
      return require(mapping[name]);
    }
    const module = { exports: {} };
    fn(localRequire, module, module.exports);
    return module.exports;
  }
  require(0);
})({
  0: [
    function (require, module, exports) {
      "use strict";

      var _a = _interopRequireDefault(require("a.js"));
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      // import b from "b.js";
      console.log("hello");
    },
    { "a.js": 1 },
  ],
  1: [
    function (require, module, exports) {
      "use strict";

      var _b = _interopRequireDefault(require("./b.js"));
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      console.log("a");
    },
    { "./b.js": 2 },
  ],
  2: [
    function (require, module, exports) {
      "use strict";

      var _c = _interopRequireDefault(require("c.js"));
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      console.log("b");
    },
    { "c.js": 3 },
  ],
  3: [
    function (require, module, exports) {
      "use strict";

      var _d = _interopRequireDefault(require("d.js"));
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      console.log("c");
    },
    { "d.js": 4 },
  ],
  4: [
    function (require, module, exports) {
      "use strict";
    },
    {},
  ],
});
