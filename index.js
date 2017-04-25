/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/Users/evolux/Code/jstrace";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trace = trace;
var jsonToString = JSON.stringify;

function dumpStack(store) {
  var i = 0;

  if (store.fn.name === "") {
    console.log("Calling function:", store.fn.toString());
  } else {
    console.log("Calling function:", store.fn.name);
  }
  console.log("Input(s):");
  store.input.map(function (a, k) {
    return console.log(k + ":", jsonToString(a));
  });
  console.log("Output:");
  console.log(store.output);
  return store.output;
}

/**
 * trace - Use to dump the argument received by a function
 * before calling it.
 *
 * @param {string} message Message to log.
 * @param {Function} f A continuation function.
 * @return {Function}
 */
function trace(f, message, context) {
  var ctx = context ? context : null;
  return function (x) {
    var store = {};
    var args = [].concat(Array.prototype.slice.call(arguments));
    store.message = message || "";
    store.fn = f;
    store.input = args;
    store.context = context;
    try {
      var res = f.apply(ctx, args);
      store.output = res;
      return dumpStack(store);
    } catch (e) {
      store.error = e;
      store.stack = e.stack;
      console.log("[Exception]" + message, jsonToString(store));
    }
    console.log("Bailing out on trace. Return argument: ", x);
    return x;
  };
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _jstrace = __webpack_require__(0);

var _jstrace2 = _interopRequireDefault(_jstrace);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function add(x, y) {
  return x + y;
}

(0, _jstrace2.default)(add)(1, 2);

(0, _jstrace2.default)(function (x, y) {
  return x + y;
})(1, 2);

/***/ })
/******/ ]);