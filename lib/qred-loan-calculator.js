(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("qred-loan-calculator", [], factory);
	else if(typeof exports === 'object')
		exports["qred-loan-calculator"] = factory();
	else
		root["qred-loan-calculator"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _loanCalculator = _interopRequireDefault(__webpack_require__(/*! ./loanCalculator */ "./src/loanCalculator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var construct = function construct(args) {
  return new _loanCalculator.default(args);
};

var _default = construct;
exports.default = _default;
module.exports = exports["default"];

/***/ }),

/***/ "./src/loanCalculator.js":
/*!*******************************!*\
  !*** ./src/loanCalculator.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var defaultProperties = {
  amount: 50000,
  termInMonths: 6,
  market: 'se',
  firstMonthFree: false
};

function omitBy(obj) {
  if (obj) {
    var newObj = {};
    Object.keys(obj).forEach(function (key) {
      var value = obj[key];

      if (value !== null) {
        newObj[key] = obj[key];
      }
    });
    return newObj;
  }

  return {};
}

var LoanCalculator =
/*#__PURE__*/
function () {
  function LoanCalculator() {
    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, LoanCalculator);

    var amount = args.amount,
        termInMonths = args.termInMonths,
        market = args.market,
        firstMonthFree = args.firstMonthFree; // args passed in

    var filteredArgs = {
      amount: amount || null,
      termInMonths: termInMonths || null,
      market: market || null,
      firstMonthFree: firstMonthFree || null
    };
    this.properties = Object.assign(defaultProperties, omitBy(filteredArgs));
  }

  _createClass(LoanCalculator, [{
    key: "interest",
    get: function get() {
      var termInMonths = this.properties.termInMonths;

      if (termInMonths === 9) {
        return {
          interest: 1.9,
          scalingRate: 1.45
        };
      } else if (termInMonths === 12) {
        return {
          interest: 1.8,
          scalingRate: 1.4
        };
      }

      return {
        interest: 2,
        scalingRate: 1.5
      };
    }
  }, {
    key: "totalToPay",
    get: function get() {
      var _this$properties = this.properties,
          termInMonths = _this$properties.termInMonths,
          amount = _this$properties.amount,
          firstMonthFree = _this$properties.firstMonthFree;
      var term = termInMonths;
      var _this$interest = this.interest,
          interest = _this$interest.interest,
          scalingRate = _this$interest.scalingRate;

      if (firstMonthFree) {
        term -= 1;
      }

      return {
        amount: amount + Math.min(amount, 100000) * (interest / 100) * term + Math.max(amount - 100000, 0) * (scalingRate / 100) * term,
        currency: this.currency
      };
    }
  }, {
    key: "monthlyFee",
    get: function get() {
      var _this$properties2 = this.properties,
          amount = _this$properties2.amount,
          termInMonths = _this$properties2.termInMonths;
      var totalToPay = this.totalToPay;
      return {
        amount: (totalToPay.amount - amount) / termInMonths,
        currency: this.currency
      };
    }
  }, {
    key: "monthlyAmortisation",
    get: function get() {
      var _this$properties3 = this.properties,
          amount = _this$properties3.amount,
          termInMonths = _this$properties3.termInMonths;
      return amount / termInMonths;
    }
  }, {
    key: "monthlyTotal",
    get: function get() {
      return {
        amount: this.monthlyAmortisation + this.monthlyFee.amount,
        currency: this.currency
      };
    }
  }, {
    key: "currency",
    get: function get() {
      var market = this.properties.market;

      switch (market) {
        case 'fi':
          return 'EUR';

        case 'nl':
          return 'EUR';

        case 'dk':
          return 'DKK';

        default:
          return 'SEK';
      }
    }
  }, {
    key: "getloanRange",
    get: function get() {
      var market = this.properties.market;

      switch (market) {
        case 'fi':
          return {
            min: 1000,
            max: 50000,
            currency: this.currency
          };

        case 'nl':
          return {
            min: 1000,
            max: 50000,
            currency: this.currency
          };

        case 'dk':
          return {
            min: 10000,
            max: 250000,
            currency: this.currency
          };

        default:
          return {
            min: 10000,
            max: 500000,
            currency: this.currency
          };
      }
    }
  }]);

  return LoanCalculator;
}();

exports.default = LoanCalculator;
module.exports = exports["default"];

/***/ })

/******/ });
});