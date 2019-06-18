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

var _default = _loanCalculator.default;
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
  termInMonths: 6,
  market: 'se',
  firstMonthFree: false
};

function getMarketDefaultAmount(market) {
  switch (market) {
    case 'nl':
      return 5000;

    case 'dk':
      return 50000;

    case 'fi':
      return 5000;

    default:
      return 50000;
  }
}

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

function formatMoney(value) {
  return parseFloat(Number.parseFloat(value).toFixed(2));
}

function validate(value, field) {
  if (value === undefined || value === null) return null;

  switch (field) {
    case 'amount':
      // TODO: validate amount is between loanRange
      if (Number(value) === value && value % 1 === 0) {
        return value;
      } else {
        return null;
      }

    case 'termInMonths':
      if ([6, 12, 18].includes(Number(value))) {
        return value;
      } else {
        return defaultProperties.termInMonths;
      }

    case 'market':
      if (['se', 'fi', 'dk', 'nl'].includes(value)) {
        return value;
      } else {
        return defaultProperties.market;
      }

    case 'firstMonthFree':
      return !!value;
  }
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
        firstMonthFree = args.firstMonthFree;
    var filteredArgs = {
      amount: validate(amount, 'amount'),
      termInMonths: validate(termInMonths, 'termInMonths'),
      market: validate(market, 'market'),
      firstMonthFree: validate(firstMonthFree, 'firstMonthFree')
    };

    if (!filteredArgs.amount) {
      filteredArgs.amount = getMarketDefaultAmount(filteredArgs.market);
    }

    this.properties = Object.assign({}, defaultProperties, omitBy(filteredArgs));
  }

  _createClass(LoanCalculator, [{
    key: "setAmount",
    value: function setAmount(amount) {
      var validatedAmount = validate(amount, 'amount');

      if (!validatedAmount) {
        this.properties.amount = getMarketDefaultAmount(this.properties.market);
      } else {
        this.properties.amount = validatedAmount;
      }
    }
  }, {
    key: "setTermInMonths",
    value: function setTermInMonths(termInMonths) {
      var validatedTerm = validate(termInMonths, 'termInMonths');
      this.properties.termInMonths = validatedTerm;
    }
  }, {
    key: "setMarket",
    value: function setMarket(market) {
      var validatedMarket = validate(market, 'market');
      this.properties.market = validatedMarket;
    }
  }, {
    key: "interest",
    get: function get() {
      var termInMonths = this.properties.termInMonths;

      if (termInMonths === 18) {
        return {
          interest: 1.55,
          scalingRate: 1
        };
      } else if (termInMonths === 12) {
        return {
          interest: 1.75,
          scalingRate: 1.25
        };
      }

      return {
        interest: 1.95,
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

      var unformatted = amount + Math.min(amount, 100000) * (interest / 100) * term + Math.max(amount - 100000, 0) * (scalingRate / 100) * term;
      return {
        value: formatMoney(unformatted),
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
        value: formatMoney((totalToPay.value - amount) / termInMonths),
        currency: this.currency
      };
    }
  }, {
    key: "monthlyAmortisation",
    get: function get() {
      var _this$properties3 = this.properties,
          amount = _this$properties3.amount,
          termInMonths = _this$properties3.termInMonths;
      return {
        value: formatMoney(amount / termInMonths),
        currency: this.currency
      };
    }
  }, {
    key: "monthlyTotal",
    get: function get() {
      return {
        value: formatMoney(Number(this.monthlyAmortisation.value + this.monthlyFee.value)),
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
    key: "loanRange",
    get: function get() {
      var market = this.properties.market;

      switch (market) {
        case 'fi':
          return {
            min: 1000,
            max: 100000,
            currency: this.currency
          };

        case 'nl':
          return {
            min: 1000,
            max: 100000,
            currency: this.currency
          };

        case 'dk':
          return {
            min: 10000,
            max: 500000,
            currency: this.currency
          };

        default:
          return {
            min: 10000,
            max: 1000000,
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