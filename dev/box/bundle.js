/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _daggers = __webpack_require__(1);

	var _daggers2 = _interopRequireDefault(_daggers);

	var _play = __webpack_require__(21);

	var _play2 = _interopRequireDefault(_play);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	window.daggers = _daggers2.default;
	window.play = _play2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _keys = __webpack_require__(2);

	var _keys2 = _interopRequireDefault(_keys);

	var _assign = __webpack_require__(14);

	var _assign2 = _interopRequireDefault(_assign);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var makeGame = function makeGame() {
	  var game = {};
	  var connections = {
	    "a1": {
	      "1": "a2",
	      "2": "b2",
	      "3": "b1"
	    },
	    "a2": {
	      "1": "a3",
	      "2": "b3",
	      "3": "b2",
	      "4": "b1",
	      "5": "a1"
	    },
	    "a3": {
	      "1": "a4",
	      "2": "b4",
	      "3": "b3",
	      "4": "b2",
	      "5": "a2"
	    },
	    "a4": {
	      "1": "a5",
	      "2": "b5",
	      "3": "b4",
	      "4": "b3",
	      "5": "a3"
	    },
	    "a5": {
	      "1": "a6",
	      "2": "b6",
	      "3": "b5",
	      "4": "b4",
	      "5": "a4"
	    },
	    "a6": {
	      "1": "a7",
	      "2": "b7",
	      "3": "b6",
	      "4": "b5",
	      "5": "a5"
	    },
	    "a7": {
	      "1": "a8",
	      "2": "b8",
	      "3": "b7",
	      "4": "b6",
	      "5": "a6"
	    },
	    "a8": {
	      "3": "b8",
	      "4": "b7",
	      "5": "a7"
	    },
	    "b1": {
	      "1": "b2",
	      "2": "c2",
	      "3": "c1",
	      "7": "a1",
	      "8": "a2"
	    },
	    "b2": {
	      "1": "b3",
	      "2": "c3",
	      "3": "c2",
	      "4": "c1",
	      "5": "b1",
	      "6": "a1",
	      "7": "a2",
	      "8": "a3"
	    },
	    "b3": {
	      "1": "b4",
	      "2": "c4",
	      "3": "c3",
	      "4": "c2",
	      "5": "b2",
	      "6": "a2",
	      "7": "a3",
	      "8": "a4"
	    },
	    "b4": {
	      "1": "b5",
	      "2": "c5",
	      "3": "c4",
	      "4": "c3",
	      "5": "b3",
	      "6": "a3",
	      "7": "a4",
	      "8": "a5"
	    },
	    "b5": {
	      "1": "b6",
	      "2": "c6",
	      "3": "c5",
	      "4": "c4",
	      "5": "b4",
	      "6": "a4",
	      "7": "a5",
	      "8": "a6"
	    },
	    "b6": {
	      "1": "b7",
	      "2": "c7",
	      "3": "c6",
	      "4": "c5",
	      "5": "b5",
	      "6": "a5",
	      "7": "a6",
	      "8": "a7"
	    },
	    "b7": {
	      "1": "b8",
	      "2": "c8",
	      "3": "c7",
	      "4": "c6",
	      "5": "b6",
	      "6": "a6",
	      "7": "a7",
	      "8": "a8"
	    },
	    "b8": {
	      "3": "c8",
	      "4": "c7",
	      "5": "b7",
	      "6": "a7",
	      "7": "a8"
	    },
	    "c1": {
	      "1": "c2",
	      "2": "d2",
	      "3": "d1",
	      "7": "b1",
	      "8": "b2"
	    },
	    "c2": {
	      "1": "c3",
	      "2": "d3",
	      "3": "d2",
	      "4": "d1",
	      "5": "c1",
	      "6": "b1",
	      "7": "b2",
	      "8": "b3"
	    },
	    "c3": {
	      "1": "c4",
	      "2": "d4",
	      "3": "d3",
	      "4": "d2",
	      "5": "c2",
	      "6": "b2",
	      "7": "b3",
	      "8": "b4"
	    },
	    "c4": {
	      "1": "c5",
	      "2": "d5",
	      "3": "d4",
	      "4": "d3",
	      "5": "c3",
	      "6": "b3",
	      "7": "b4",
	      "8": "b5"
	    },
	    "c5": {
	      "1": "c6",
	      "2": "d6",
	      "3": "d5",
	      "4": "d4",
	      "5": "c4",
	      "6": "b4",
	      "7": "b5",
	      "8": "b6"
	    },
	    "c6": {
	      "1": "c7",
	      "2": "d7",
	      "3": "d6",
	      "4": "d5",
	      "5": "c5",
	      "6": "b5",
	      "7": "b6",
	      "8": "b7"
	    },
	    "c7": {
	      "1": "c8",
	      "2": "d8",
	      "3": "d7",
	      "4": "d6",
	      "5": "c6",
	      "6": "b6",
	      "7": "b7",
	      "8": "b8"
	    },
	    "c8": {
	      "3": "d8",
	      "4": "d7",
	      "5": "c7",
	      "6": "b7",
	      "7": "b8"
	    },
	    "d1": {
	      "1": "d2",
	      "2": "e2",
	      "3": "e1",
	      "7": "c1",
	      "8": "c2"
	    },
	    "d2": {
	      "1": "d3",
	      "2": "e3",
	      "3": "e2",
	      "4": "e1",
	      "5": "d1",
	      "6": "c1",
	      "7": "c2",
	      "8": "c3"
	    },
	    "d3": {
	      "1": "d4",
	      "2": "e4",
	      "3": "e3",
	      "4": "e2",
	      "5": "d2",
	      "6": "c2",
	      "7": "c3",
	      "8": "c4"
	    },
	    "d4": {
	      "1": "d5",
	      "2": "e5",
	      "3": "e4",
	      "4": "e3",
	      "5": "d3",
	      "6": "c3",
	      "7": "c4",
	      "8": "c5"
	    },
	    "d5": {
	      "1": "d6",
	      "2": "e6",
	      "3": "e5",
	      "4": "e4",
	      "5": "d4",
	      "6": "c4",
	      "7": "c5",
	      "8": "c6"
	    },
	    "d6": {
	      "1": "d7",
	      "2": "e7",
	      "3": "e6",
	      "4": "e5",
	      "5": "d5",
	      "6": "c5",
	      "7": "c6",
	      "8": "c7"
	    },
	    "d7": {
	      "1": "d8",
	      "2": "e8",
	      "3": "e7",
	      "4": "e6",
	      "5": "d6",
	      "6": "c6",
	      "7": "c7",
	      "8": "c8"
	    },
	    "d8": {
	      "3": "e8",
	      "4": "e7",
	      "5": "d7",
	      "6": "c7",
	      "7": "c8"
	    },
	    "e1": {
	      "1": "e2",
	      "2": "f2",
	      "3": "f1",
	      "7": "d1",
	      "8": "d2"
	    },
	    "e2": {
	      "1": "e3",
	      "2": "f3",
	      "3": "f2",
	      "4": "f1",
	      "5": "e1",
	      "6": "d1",
	      "7": "d2",
	      "8": "d3"
	    },
	    "e3": {
	      "1": "e4",
	      "2": "f4",
	      "3": "f3",
	      "4": "f2",
	      "5": "e2",
	      "6": "d2",
	      "7": "d3",
	      "8": "d4"
	    },
	    "e4": {
	      "1": "e5",
	      "2": "f5",
	      "3": "f4",
	      "4": "f3",
	      "5": "e3",
	      "6": "d3",
	      "7": "d4",
	      "8": "d5"
	    },
	    "e5": {
	      "1": "e6",
	      "2": "f6",
	      "3": "f5",
	      "4": "f4",
	      "5": "e4",
	      "6": "d4",
	      "7": "d5",
	      "8": "d6"
	    },
	    "e6": {
	      "1": "e7",
	      "2": "f7",
	      "3": "f6",
	      "4": "f5",
	      "5": "e5",
	      "6": "d5",
	      "7": "d6",
	      "8": "d7"
	    },
	    "e7": {
	      "1": "e8",
	      "2": "f8",
	      "3": "f7",
	      "4": "f6",
	      "5": "e6",
	      "6": "d6",
	      "7": "d7",
	      "8": "d8"
	    },
	    "e8": {
	      "3": "f8",
	      "4": "f7",
	      "5": "e7",
	      "6": "d7",
	      "7": "d8"
	    },
	    "f1": {
	      "1": "f2",
	      "2": "g2",
	      "3": "g1",
	      "7": "e1",
	      "8": "e2"
	    },
	    "f2": {
	      "1": "f3",
	      "2": "g3",
	      "3": "g2",
	      "4": "g1",
	      "5": "f1",
	      "6": "e1",
	      "7": "e2",
	      "8": "e3"
	    },
	    "f3": {
	      "1": "f4",
	      "2": "g4",
	      "3": "g3",
	      "4": "g2",
	      "5": "f2",
	      "6": "e2",
	      "7": "e3",
	      "8": "e4"
	    },
	    "f4": {
	      "1": "f5",
	      "2": "g5",
	      "3": "g4",
	      "4": "g3",
	      "5": "f3",
	      "6": "e3",
	      "7": "e4",
	      "8": "e5"
	    },
	    "f5": {
	      "1": "f6",
	      "2": "g6",
	      "3": "g5",
	      "4": "g4",
	      "5": "f4",
	      "6": "e4",
	      "7": "e5",
	      "8": "e6"
	    },
	    "f6": {
	      "1": "f7",
	      "2": "g7",
	      "3": "g6",
	      "4": "g5",
	      "5": "f5",
	      "6": "e5",
	      "7": "e6",
	      "8": "e7"
	    },
	    "f7": {
	      "1": "f8",
	      "2": "g8",
	      "3": "g7",
	      "4": "g6",
	      "5": "f6",
	      "6": "e6",
	      "7": "e7",
	      "8": "e8"
	    },
	    "f8": {
	      "3": "g8",
	      "4": "g7",
	      "5": "f7",
	      "6": "e7",
	      "7": "e8"
	    },
	    "g1": {
	      "1": "g2",
	      "2": "h2",
	      "3": "h1",
	      "7": "f1",
	      "8": "f2"
	    },
	    "g2": {
	      "1": "g3",
	      "2": "h3",
	      "3": "h2",
	      "4": "h1",
	      "5": "g1",
	      "6": "f1",
	      "7": "f2",
	      "8": "f3"
	    },
	    "g3": {
	      "1": "g4",
	      "2": "h4",
	      "3": "h3",
	      "4": "h2",
	      "5": "g2",
	      "6": "f2",
	      "7": "f3",
	      "8": "f4"
	    },
	    "g4": {
	      "1": "g5",
	      "2": "h5",
	      "3": "h4",
	      "4": "h3",
	      "5": "g3",
	      "6": "f3",
	      "7": "f4",
	      "8": "f5"
	    },
	    "g5": {
	      "1": "g6",
	      "2": "h6",
	      "3": "h5",
	      "4": "h4",
	      "5": "g4",
	      "6": "f4",
	      "7": "f5",
	      "8": "f6"
	    },
	    "g6": {
	      "1": "g7",
	      "2": "h7",
	      "3": "h6",
	      "4": "h5",
	      "5": "g5",
	      "6": "f5",
	      "7": "f6",
	      "8": "f7"
	    },
	    "g7": {
	      "1": "g8",
	      "2": "h8",
	      "3": "h7",
	      "4": "h6",
	      "5": "g6",
	      "6": "f6",
	      "7": "f7",
	      "8": "f8"
	    },
	    "g8": {
	      "3": "h8",
	      "4": "h7",
	      "5": "g7",
	      "6": "f7",
	      "7": "f8"
	    },
	    "h1": {
	      "1": "h2",
	      "7": "g1",
	      "8": "g2"
	    },
	    "h2": {
	      "1": "h3",
	      "5": "h1",
	      "6": "g1",
	      "7": "g2",
	      "8": "g3"
	    },
	    "h3": {
	      "1": "h4",
	      "5": "h2",
	      "6": "g2",
	      "7": "g3",
	      "8": "g4"
	    },
	    "h4": {
	      "1": "h5",
	      "5": "h3",
	      "6": "g3",
	      "7": "g4",
	      "8": "g5"
	    },
	    "h5": {
	      "1": "h6",
	      "5": "h4",
	      "6": "g4",
	      "7": "g5",
	      "8": "g6"
	    },
	    "h6": {
	      "1": "h7",
	      "5": "h5",
	      "6": "g5",
	      "7": "g6",
	      "8": "g7"
	    },
	    "h7": {
	      "1": "h8",
	      "5": "h6",
	      "6": "g6",
	      "7": "g7",
	      "8": "g8"
	    },
	    "h8": {
	      "5": "h7",
	      "6": "g7",
	      "7": "g8"
	    }
	  };
	  var BOARD = {
	    "board": {
	      "a1": {
	        "colour": "dark",
	        "pos": "a1",
	        "x": 1,
	        "y": 1
	      },
	      "a2": {
	        "colour": "light",
	        "pos": "a2",
	        "x": 1,
	        "y": 2
	      },
	      "a3": {
	        "colour": "dark",
	        "pos": "a3",
	        "x": 1,
	        "y": 3
	      },
	      "a4": {
	        "colour": "light",
	        "pos": "a4",
	        "x": 1,
	        "y": 4
	      },
	      "a5": {
	        "colour": "dark",
	        "pos": "a5",
	        "x": 1,
	        "y": 5
	      },
	      "a6": {
	        "colour": "light",
	        "pos": "a6",
	        "x": 1,
	        "y": 6
	      },
	      "a7": {
	        "colour": "dark",
	        "pos": "a7",
	        "x": 1,
	        "y": 7
	      },
	      "a8": {
	        "colour": "light",
	        "pos": "a8",
	        "x": 1,
	        "y": 8
	      },
	      "b1": {
	        "colour": "light",
	        "pos": "b1",
	        "x": 2,
	        "y": 1
	      },
	      "b2": {
	        "colour": "dark",
	        "pos": "b2",
	        "x": 2,
	        "y": 2
	      },
	      "b3": {
	        "colour": "light",
	        "pos": "b3",
	        "x": 2,
	        "y": 3
	      },
	      "b4": {
	        "colour": "dark",
	        "pos": "b4",
	        "x": 2,
	        "y": 4
	      },
	      "b5": {
	        "colour": "light",
	        "pos": "b5",
	        "x": 2,
	        "y": 5
	      },
	      "b6": {
	        "colour": "dark",
	        "pos": "b6",
	        "x": 2,
	        "y": 6
	      },
	      "b7": {
	        "colour": "light",
	        "pos": "b7",
	        "x": 2,
	        "y": 7
	      },
	      "b8": {
	        "colour": "dark",
	        "pos": "b8",
	        "x": 2,
	        "y": 8
	      },
	      "c1": {
	        "colour": "dark",
	        "pos": "c1",
	        "x": 3,
	        "y": 1
	      },
	      "c2": {
	        "colour": "light",
	        "pos": "c2",
	        "x": 3,
	        "y": 2
	      },
	      "c3": {
	        "colour": "dark",
	        "pos": "c3",
	        "x": 3,
	        "y": 3
	      },
	      "c4": {
	        "colour": "light",
	        "pos": "c4",
	        "x": 3,
	        "y": 4
	      },
	      "c5": {
	        "colour": "dark",
	        "pos": "c5",
	        "x": 3,
	        "y": 5
	      },
	      "c6": {
	        "colour": "light",
	        "pos": "c6",
	        "x": 3,
	        "y": 6
	      },
	      "c7": {
	        "colour": "dark",
	        "pos": "c7",
	        "x": 3,
	        "y": 7
	      },
	      "c8": {
	        "colour": "light",
	        "pos": "c8",
	        "x": 3,
	        "y": 8
	      },
	      "d1": {
	        "colour": "light",
	        "pos": "d1",
	        "x": 4,
	        "y": 1
	      },
	      "d2": {
	        "colour": "dark",
	        "pos": "d2",
	        "x": 4,
	        "y": 2
	      },
	      "d3": {
	        "colour": "light",
	        "pos": "d3",
	        "x": 4,
	        "y": 3
	      },
	      "d4": {
	        "colour": "dark",
	        "pos": "d4",
	        "x": 4,
	        "y": 4
	      },
	      "d5": {
	        "colour": "light",
	        "pos": "d5",
	        "x": 4,
	        "y": 5
	      },
	      "d6": {
	        "colour": "dark",
	        "pos": "d6",
	        "x": 4,
	        "y": 6
	      },
	      "d7": {
	        "colour": "light",
	        "pos": "d7",
	        "x": 4,
	        "y": 7
	      },
	      "d8": {
	        "colour": "dark",
	        "pos": "d8",
	        "x": 4,
	        "y": 8
	      },
	      "e1": {
	        "colour": "dark",
	        "pos": "e1",
	        "x": 5,
	        "y": 1
	      },
	      "e2": {
	        "colour": "light",
	        "pos": "e2",
	        "x": 5,
	        "y": 2
	      },
	      "e3": {
	        "colour": "dark",
	        "pos": "e3",
	        "x": 5,
	        "y": 3
	      },
	      "e4": {
	        "colour": "light",
	        "pos": "e4",
	        "x": 5,
	        "y": 4
	      },
	      "e5": {
	        "colour": "dark",
	        "pos": "e5",
	        "x": 5,
	        "y": 5
	      },
	      "e6": {
	        "colour": "light",
	        "pos": "e6",
	        "x": 5,
	        "y": 6
	      },
	      "e7": {
	        "colour": "dark",
	        "pos": "e7",
	        "x": 5,
	        "y": 7
	      },
	      "e8": {
	        "colour": "light",
	        "pos": "e8",
	        "x": 5,
	        "y": 8
	      },
	      "f1": {
	        "colour": "light",
	        "pos": "f1",
	        "x": 6,
	        "y": 1
	      },
	      "f2": {
	        "colour": "dark",
	        "pos": "f2",
	        "x": 6,
	        "y": 2
	      },
	      "f3": {
	        "colour": "light",
	        "pos": "f3",
	        "x": 6,
	        "y": 3
	      },
	      "f4": {
	        "colour": "dark",
	        "pos": "f4",
	        "x": 6,
	        "y": 4
	      },
	      "f5": {
	        "colour": "light",
	        "pos": "f5",
	        "x": 6,
	        "y": 5
	      },
	      "f6": {
	        "colour": "dark",
	        "pos": "f6",
	        "x": 6,
	        "y": 6
	      },
	      "f7": {
	        "colour": "light",
	        "pos": "f7",
	        "x": 6,
	        "y": 7
	      },
	      "f8": {
	        "colour": "dark",
	        "pos": "f8",
	        "x": 6,
	        "y": 8
	      },
	      "g1": {
	        "colour": "dark",
	        "pos": "g1",
	        "x": 7,
	        "y": 1
	      },
	      "g2": {
	        "colour": "light",
	        "pos": "g2",
	        "x": 7,
	        "y": 2
	      },
	      "g3": {
	        "colour": "dark",
	        "pos": "g3",
	        "x": 7,
	        "y": 3
	      },
	      "g4": {
	        "colour": "light",
	        "pos": "g4",
	        "x": 7,
	        "y": 4
	      },
	      "g5": {
	        "colour": "dark",
	        "pos": "g5",
	        "x": 7,
	        "y": 5
	      },
	      "g6": {
	        "colour": "light",
	        "pos": "g6",
	        "x": 7,
	        "y": 6
	      },
	      "g7": {
	        "colour": "dark",
	        "pos": "g7",
	        "x": 7,
	        "y": 7
	      },
	      "g8": {
	        "colour": "light",
	        "pos": "g8",
	        "x": 7,
	        "y": 8
	      },
	      "h1": {
	        "colour": "light",
	        "pos": "h1",
	        "x": 8,
	        "y": 1
	      },
	      "h2": {
	        "colour": "dark",
	        "pos": "h2",
	        "x": 8,
	        "y": 2
	      },
	      "h3": {
	        "colour": "light",
	        "pos": "h3",
	        "x": 8,
	        "y": 3
	      },
	      "h4": {
	        "colour": "dark",
	        "pos": "h4",
	        "x": 8,
	        "y": 4
	      },
	      "h5": {
	        "colour": "light",
	        "pos": "h5",
	        "x": 8,
	        "y": 5
	      },
	      "h6": {
	        "colour": "dark",
	        "pos": "h6",
	        "x": 8,
	        "y": 6
	      },
	      "h7": {
	        "colour": "light",
	        "pos": "h7",
	        "x": 8,
	        "y": 7
	      },
	      "h8": {
	        "colour": "dark",
	        "pos": "h8",
	        "x": 8,
	        "y": 8
	      }
	    },
	    "light": {
	      "a2": {
	        "colour": "light",
	        "pos": "a2",
	        "x": 1,
	        "y": 2
	      },
	      "a4": {
	        "colour": "light",
	        "pos": "a4",
	        "x": 1,
	        "y": 4
	      },
	      "a6": {
	        "colour": "light",
	        "pos": "a6",
	        "x": 1,
	        "y": 6
	      },
	      "a8": {
	        "colour": "light",
	        "pos": "a8",
	        "x": 1,
	        "y": 8
	      },
	      "b1": {
	        "colour": "light",
	        "pos": "b1",
	        "x": 2,
	        "y": 1
	      },
	      "b3": {
	        "colour": "light",
	        "pos": "b3",
	        "x": 2,
	        "y": 3
	      },
	      "b5": {
	        "colour": "light",
	        "pos": "b5",
	        "x": 2,
	        "y": 5
	      },
	      "b7": {
	        "colour": "light",
	        "pos": "b7",
	        "x": 2,
	        "y": 7
	      },
	      "c2": {
	        "colour": "light",
	        "pos": "c2",
	        "x": 3,
	        "y": 2
	      },
	      "c4": {
	        "colour": "light",
	        "pos": "c4",
	        "x": 3,
	        "y": 4
	      },
	      "c6": {
	        "colour": "light",
	        "pos": "c6",
	        "x": 3,
	        "y": 6
	      },
	      "c8": {
	        "colour": "light",
	        "pos": "c8",
	        "x": 3,
	        "y": 8
	      },
	      "d1": {
	        "colour": "light",
	        "pos": "d1",
	        "x": 4,
	        "y": 1
	      },
	      "d3": {
	        "colour": "light",
	        "pos": "d3",
	        "x": 4,
	        "y": 3
	      },
	      "d5": {
	        "colour": "light",
	        "pos": "d5",
	        "x": 4,
	        "y": 5
	      },
	      "d7": {
	        "colour": "light",
	        "pos": "d7",
	        "x": 4,
	        "y": 7
	      },
	      "e2": {
	        "colour": "light",
	        "pos": "e2",
	        "x": 5,
	        "y": 2
	      },
	      "e4": {
	        "colour": "light",
	        "pos": "e4",
	        "x": 5,
	        "y": 4
	      },
	      "e6": {
	        "colour": "light",
	        "pos": "e6",
	        "x": 5,
	        "y": 6
	      },
	      "e8": {
	        "colour": "light",
	        "pos": "e8",
	        "x": 5,
	        "y": 8
	      },
	      "f1": {
	        "colour": "light",
	        "pos": "f1",
	        "x": 6,
	        "y": 1
	      },
	      "f3": {
	        "colour": "light",
	        "pos": "f3",
	        "x": 6,
	        "y": 3
	      },
	      "f5": {
	        "colour": "light",
	        "pos": "f5",
	        "x": 6,
	        "y": 5
	      },
	      "f7": {
	        "colour": "light",
	        "pos": "f7",
	        "x": 6,
	        "y": 7
	      },
	      "g2": {
	        "colour": "light",
	        "pos": "g2",
	        "x": 7,
	        "y": 2
	      },
	      "g4": {
	        "colour": "light",
	        "pos": "g4",
	        "x": 7,
	        "y": 4
	      },
	      "g6": {
	        "colour": "light",
	        "pos": "g6",
	        "x": 7,
	        "y": 6
	      },
	      "g8": {
	        "colour": "light",
	        "pos": "g8",
	        "x": 7,
	        "y": 8
	      },
	      "h1": {
	        "colour": "light",
	        "pos": "h1",
	        "x": 8,
	        "y": 1
	      },
	      "h3": {
	        "colour": "light",
	        "pos": "h3",
	        "x": 8,
	        "y": 3
	      },
	      "h5": {
	        "colour": "light",
	        "pos": "h5",
	        "x": 8,
	        "y": 5
	      },
	      "h7": {
	        "colour": "light",
	        "pos": "h7",
	        "x": 8,
	        "y": 7
	      }
	    },
	    "dark": {
	      "a1": {
	        "colour": "dark",
	        "pos": "a1",
	        "x": 1,
	        "y": 1
	      },
	      "a3": {
	        "colour": "dark",
	        "pos": "a3",
	        "x": 1,
	        "y": 3
	      },
	      "a5": {
	        "colour": "dark",
	        "pos": "a5",
	        "x": 1,
	        "y": 5
	      },
	      "a7": {
	        "colour": "dark",
	        "pos": "a7",
	        "x": 1,
	        "y": 7
	      },
	      "b2": {
	        "colour": "dark",
	        "pos": "b2",
	        "x": 2,
	        "y": 2
	      },
	      "b4": {
	        "colour": "dark",
	        "pos": "b4",
	        "x": 2,
	        "y": 4
	      },
	      "b6": {
	        "colour": "dark",
	        "pos": "b6",
	        "x": 2,
	        "y": 6
	      },
	      "b8": {
	        "colour": "dark",
	        "pos": "b8",
	        "x": 2,
	        "y": 8
	      },
	      "c1": {
	        "colour": "dark",
	        "pos": "c1",
	        "x": 3,
	        "y": 1
	      },
	      "c3": {
	        "colour": "dark",
	        "pos": "c3",
	        "x": 3,
	        "y": 3
	      },
	      "c5": {
	        "colour": "dark",
	        "pos": "c5",
	        "x": 3,
	        "y": 5
	      },
	      "c7": {
	        "colour": "dark",
	        "pos": "c7",
	        "x": 3,
	        "y": 7
	      },
	      "d2": {
	        "colour": "dark",
	        "pos": "d2",
	        "x": 4,
	        "y": 2
	      },
	      "d4": {
	        "colour": "dark",
	        "pos": "d4",
	        "x": 4,
	        "y": 4
	      },
	      "d6": {
	        "colour": "dark",
	        "pos": "d6",
	        "x": 4,
	        "y": 6
	      },
	      "d8": {
	        "colour": "dark",
	        "pos": "d8",
	        "x": 4,
	        "y": 8
	      },
	      "e1": {
	        "colour": "dark",
	        "pos": "e1",
	        "x": 5,
	        "y": 1
	      },
	      "e3": {
	        "colour": "dark",
	        "pos": "e3",
	        "x": 5,
	        "y": 3
	      },
	      "e5": {
	        "colour": "dark",
	        "pos": "e5",
	        "x": 5,
	        "y": 5
	      },
	      "e7": {
	        "colour": "dark",
	        "pos": "e7",
	        "x": 5,
	        "y": 7
	      },
	      "f2": {
	        "colour": "dark",
	        "pos": "f2",
	        "x": 6,
	        "y": 2
	      },
	      "f4": {
	        "colour": "dark",
	        "pos": "f4",
	        "x": 6,
	        "y": 4
	      },
	      "f6": {
	        "colour": "dark",
	        "pos": "f6",
	        "x": 6,
	        "y": 6
	      },
	      "f8": {
	        "colour": "dark",
	        "pos": "f8",
	        "x": 6,
	        "y": 8
	      },
	      "g1": {
	        "colour": "dark",
	        "pos": "g1",
	        "x": 7,
	        "y": 1
	      },
	      "g3": {
	        "colour": "dark",
	        "pos": "g3",
	        "x": 7,
	        "y": 3
	      },
	      "g5": {
	        "colour": "dark",
	        "pos": "g5",
	        "x": 7,
	        "y": 5
	      },
	      "g7": {
	        "colour": "dark",
	        "pos": "g7",
	        "x": 7,
	        "y": 7
	      },
	      "h2": {
	        "colour": "dark",
	        "pos": "h2",
	        "x": 8,
	        "y": 2
	      },
	      "h4": {
	        "colour": "dark",
	        "pos": "h4",
	        "x": 8,
	        "y": 4
	      },
	      "h6": {
	        "colour": "dark",
	        "pos": "h6",
	        "x": 8,
	        "y": 6
	      },
	      "h8": {
	        "colour": "dark",
	        "pos": "h8",
	        "x": 8,
	        "y": 8
	      }
	    }
	  };
	  (function () {
	    var terrain = {
	      "bases": {
	        "a8": {
	          "pos": "a8",
	          "owner": 1
	        },
	        "b8": {
	          "pos": "b8",
	          "owner": 1
	        },
	        "c8": {
	          "pos": "c8",
	          "owner": 1
	        },
	        "d8": {
	          "pos": "d8",
	          "owner": 1
	        },
	        "e8": {
	          "pos": "e8",
	          "owner": 1
	        },
	        "f8": {
	          "pos": "f8",
	          "owner": 1
	        },
	        "g8": {
	          "pos": "g8",
	          "owner": 1
	        },
	        "h8": {
	          "pos": "h8",
	          "owner": 1
	        },
	        "a1": {
	          "pos": "a1",
	          "owner": 2
	        },
	        "b1": {
	          "pos": "b1",
	          "owner": 2
	        },
	        "c1": {
	          "pos": "c1",
	          "owner": 2
	        },
	        "d1": {
	          "pos": "d1",
	          "owner": 2
	        },
	        "e1": {
	          "pos": "e1",
	          "owner": 2
	        },
	        "f1": {
	          "pos": "f1",
	          "owner": 2
	        },
	        "g1": {
	          "pos": "g1",
	          "owner": 2
	        },
	        "h1": {
	          "pos": "h1",
	          "owner": 2
	        }
	      },
	      "mybases": {
	        "a8": {
	          "pos": "a8",
	          "owner": 1
	        },
	        "b8": {
	          "pos": "b8",
	          "owner": 1
	        },
	        "c8": {
	          "pos": "c8",
	          "owner": 1
	        },
	        "d8": {
	          "pos": "d8",
	          "owner": 1
	        },
	        "e8": {
	          "pos": "e8",
	          "owner": 1
	        },
	        "f8": {
	          "pos": "f8",
	          "owner": 1
	        },
	        "g8": {
	          "pos": "g8",
	          "owner": 1
	        },
	        "h8": {
	          "pos": "h8",
	          "owner": 1
	        }
	      },
	      "oppbases": {
	        "a1": {
	          "pos": "a1",
	          "owner": 2
	        },
	        "b1": {
	          "pos": "b1",
	          "owner": 2
	        },
	        "c1": {
	          "pos": "c1",
	          "owner": 2
	        },
	        "d1": {
	          "pos": "d1",
	          "owner": 2
	        },
	        "e1": {
	          "pos": "e1",
	          "owner": 2
	        },
	        "f1": {
	          "pos": "f1",
	          "owner": 2
	        },
	        "g1": {
	          "pos": "g1",
	          "owner": 2
	        },
	        "h1": {
	          "pos": "h1",
	          "owner": 2
	        }
	      }
	    };
	    var ownernames = ["neutral", "my", "opp"];
	    var player = 1;
	    var otherplayer = 2;
	    game.selectunit1 = function (turn, step, markpos) {
	      var ARTIFACTS = (0, _assign2.default)({}, step.ARTIFACTS);
	      var UNITLAYERS = step.UNITLAYERS;
	      var MARKS = (0, _assign2.default)({}, step.MARKS, {
	        selectunit: markpos
	      });
	      if (!!ARTIFACTS.mycrowns[MARKS['selectunit']]) {
	        var STARTPOS = MARKS['selectunit'];
	        var neighbourdirs = [1, 2, 3, 4, 5, 6, 7, 8];
	        var startconnections = connections[STARTPOS];
	        for (var dirnbr = 0; dirnbr < 8; dirnbr++) {
	          var POS = startconnections[neighbourdirs[dirnbr]];
	          if (POS) {
	            if (!ARTIFACTS.myunits[POS]) {
	              ARTIFACTS[!!ARTIFACTS.oppunits[POS] ? 'killtarget' : 'movetarget'][POS] = {};
	            }
	          }
	        }
	      } else {
	        var STARTPOS = MARKS['selectunit'];
	        var allwalkerdirs = [8, 1, 2, 4, 5, 6];
	        for (var walkerdirnbr = 0; walkerdirnbr < 6; walkerdirnbr++) {
	          var DIR = allwalkerdirs[walkerdirnbr];
	          var walkedsquares = [];
	          var STOPREASON = "";
	          var nextpos = "";
	          var MAX = [8, 1, 2].indexOf(DIR) !== -1 ? 1 : 8;
	          var POS = STARTPOS;
	          var BLOCKS = UNITLAYERS.all;
	          var LENGTH = 0;
	          while (!(STOPREASON = LENGTH === MAX ? "reachedmax" : !(nextpos = connections[POS][DIR]) ? "outofbounds" : BLOCKS[nextpos] ? "hitblock" : null)) {
	            walkedsquares.push(POS = nextpos);
	            LENGTH++;
	            ARTIFACTS['movetarget'][POS] = {};
	          }
	          var WALKLENGTH = walkedsquares.length;
	          if (STOPREASON === "hitblock") {
	            POS = nextpos;
	            if (!ARTIFACTS.myunits[POS] && !([1, 5].indexOf(DIR) !== -1 && !!ARTIFACTS.oppdaggers[POS])) {
	              ARTIFACTS['movetarget'][POS] = {};
	            }
	          }
	        }
	      }
	      var newstepid = step.stepid + '-' + markpos;
	      var newstep = turn.steps[newstepid] = (0, _assign2.default)({}, step, {
	        ARTIFACTS: ARTIFACTS,
	        MARKS: MARKS,
	        stepid: newstepid,
	        path: step.path.concat(markpos)
	      });
	      turn.links[newstepid] = {};
	      var linkedpositions = (0, _keys2.default)(MARKS.selectmovetarget);
	      var nbrofpositions = positions.length;
	      for (var linknbr = 0; linknbr < nbrofpositions; linknbr++) {
	        turn[newstepid][linkedpositions[linknbr]] = 'selectmovetarget1';
	      }
	      return newstep;
	    };
	    game.selectmovetarget1 = function (turn, step, markpos) {
	      var MARKS = (0, _assign2.default)({}, step.MARKS, {
	        selectmovetarget: markpos
	      });
	      var newstepid = step.stepid + '-' + markpos;
	      var newstep = turn.steps[newstepid] = (0, _assign2.default)({}, step, {
	        MARKS: MARKS,
	        stepid: newstepid,
	        path: step.path.concat(markpos)
	      });
	      turn.links[newstepid] = {};
	      turn[newstepid].move = 'move1';
	      return newstep;
	    };
	    game.move1 = function (turn, step) {
	      var ARTIFACTS = step.ARTIFACTS;
	      var MARKS = step.MARKS;
	      var UNITDATA = (0, _assign2.default)({}, step.UNITDATA);
	      var UNITLAYERS = step.UNITLAYERS;
	      delete UNITDATA[(UNITLAYERS.all[MARKS['selectmovetarget']] || {}).id];
	      var unitid = (UNITLAYERS.all[MARKS['selectunit']] || {}).id;
	      if (unitid) {
	        UNITDATA[unitid] = (0, _assign2.default)({}, UNITDATA[unitid], {
	          'pos': MARKS['selectmovetarget']
	        });
	      }
	      MARKS = {};
	      UNITLAYERS = {
	        "crowns": {},
	        "mycrowns": {},
	        "oppcrowns": {},
	        "neutralcrowns": {},
	        "daggers": {},
	        "mydaggers": {},
	        "oppdaggers": {},
	        "neutraldaggers": {},
	        "units": {},
	        "myunits": {},
	        "oppunits": {},
	        "neutralunits": {}
	      };
	      for (var unitid in UNITDATA) {
	        var currentunit = UNITDATA[unitid];
	        var unitgroup = currentunit.group;
	        var unitpos = currentunit.pos;
	        var owner = ownernames[currentunit.owner];
	        UNITLAYERS.all[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
	      }
	      ARTIFACTS = {
	        "killtarget": {},
	        "movetarget": {}
	      };
	      var newstepid = step.stepid + '-' + 'move';
	      var newstep = turn.steps[newstepid] = (0, _assign2.default)({}, step, {
	        ARTIFACTS: ARTIFACTS,
	        MARKS: MARKS,
	        UNITDATA: UNITDATA,
	        UNITLAYERS: UNITLAYERS,
	        stepid: newstepid,
	        path: step.path.concat('move')
	      });
	      turn.links[newstepid] = {};
	      if ((0, _keys2.default)(function () {
	        var ret = {},
	            s0 = ARTIFACTS.mycrowns,
	            s1 = ARTIFACTS.oppbases;
	        for (var key in s0) {
	          if (s1[key]) {
	            ret[key] = s0[key];
	          }
	        }
	        return ret;
	      }() || {}).length !== 0) {
	        var winner = 1;
	        var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
	        turn.links[newstepid][result] = 'infiltration';
	      } else if ((0, _keys2.default)(ARTIFACTS.oppdeadcrowns || {}).length !== 0) {
	        var winner = 1;
	        var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
	        turn.links[newstepid][result] = 'kingkill';
	      } else turn.links[newstepid].endturn = "start" + otherplayer;
	      return newstep;
	    };
	    game.start1 = function (turn, step) {
	      var turn = {
	        steps: {},
	        player: player,
	        turn: turn.turn + 1,
	        links: {}
	      };
	      var MARKS = {};
	      var ARTIFACTS = {
	        "killtarget": {},
	        "movetarget": {}
	      };
	      var UNITDATA = step.UNITDATA;
	      var UNITLAYERS = {
	        "crowns": {},
	        "mycrowns": {},
	        "oppcrowns": {},
	        "neutralcrowns": {},
	        "daggers": {},
	        "mydaggers": {},
	        "oppdaggers": {},
	        "neutraldaggers": {},
	        "units": {},
	        "myunits": {},
	        "oppunits": {},
	        "neutralunits": {}
	      };
	      for (var unitid in UNITDATA) {
	        var currentunit = UNITDATA[unitid];
	        var unitgroup = currentunit.group;
	        var unitpos = currentunit.pos;
	        var owner = ownernames[currentunit.owner];
	        UNITLAYERS.all[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
	      }
	      var newstep = turn.steps.root = {
	        ARTIFACTS: ARTIFACTS,
	        UNITDATA: UNITDATA,
	        UNITLAYERS: UNITLAYERS,
	        MARKS: MARKS,
	        stepid: 'root',
	        path: []
	      };
	      undefined;
	      return turn;
	    };
	  })();
	  (function () {
	    var terrain = {
	      "bases": {
	        "a8": {
	          "pos": "a8",
	          "owner": 1
	        },
	        "b8": {
	          "pos": "b8",
	          "owner": 1
	        },
	        "c8": {
	          "pos": "c8",
	          "owner": 1
	        },
	        "d8": {
	          "pos": "d8",
	          "owner": 1
	        },
	        "e8": {
	          "pos": "e8",
	          "owner": 1
	        },
	        "f8": {
	          "pos": "f8",
	          "owner": 1
	        },
	        "g8": {
	          "pos": "g8",
	          "owner": 1
	        },
	        "h8": {
	          "pos": "h8",
	          "owner": 1
	        },
	        "a1": {
	          "pos": "a1",
	          "owner": 2
	        },
	        "b1": {
	          "pos": "b1",
	          "owner": 2
	        },
	        "c1": {
	          "pos": "c1",
	          "owner": 2
	        },
	        "d1": {
	          "pos": "d1",
	          "owner": 2
	        },
	        "e1": {
	          "pos": "e1",
	          "owner": 2
	        },
	        "f1": {
	          "pos": "f1",
	          "owner": 2
	        },
	        "g1": {
	          "pos": "g1",
	          "owner": 2
	        },
	        "h1": {
	          "pos": "h1",
	          "owner": 2
	        }
	      },
	      "oppbases": {
	        "a8": {
	          "pos": "a8",
	          "owner": 1
	        },
	        "b8": {
	          "pos": "b8",
	          "owner": 1
	        },
	        "c8": {
	          "pos": "c8",
	          "owner": 1
	        },
	        "d8": {
	          "pos": "d8",
	          "owner": 1
	        },
	        "e8": {
	          "pos": "e8",
	          "owner": 1
	        },
	        "f8": {
	          "pos": "f8",
	          "owner": 1
	        },
	        "g8": {
	          "pos": "g8",
	          "owner": 1
	        },
	        "h8": {
	          "pos": "h8",
	          "owner": 1
	        }
	      },
	      "mybases": {
	        "a1": {
	          "pos": "a1",
	          "owner": 2
	        },
	        "b1": {
	          "pos": "b1",
	          "owner": 2
	        },
	        "c1": {
	          "pos": "c1",
	          "owner": 2
	        },
	        "d1": {
	          "pos": "d1",
	          "owner": 2
	        },
	        "e1": {
	          "pos": "e1",
	          "owner": 2
	        },
	        "f1": {
	          "pos": "f1",
	          "owner": 2
	        },
	        "g1": {
	          "pos": "g1",
	          "owner": 2
	        },
	        "h1": {
	          "pos": "h1",
	          "owner": 2
	        }
	      }
	    };
	    var ownernames = ["neutral", "opp", "my"];
	    var player = 2;
	    var otherplayer = 1;
	    game.selectunit2 = function (turn, step, markpos) {
	      var ARTIFACTS = (0, _assign2.default)({}, step.ARTIFACTS);
	      var UNITLAYERS = step.UNITLAYERS;
	      var MARKS = (0, _assign2.default)({}, step.MARKS, {
	        selectunit: markpos
	      });
	      if (!!ARTIFACTS.mycrowns[MARKS['selectunit']]) {
	        var STARTPOS = MARKS['selectunit'];
	        var neighbourdirs = [1, 2, 3, 4, 5, 6, 7, 8];
	        var startconnections = connections[STARTPOS];
	        for (var dirnbr = 0; dirnbr < 8; dirnbr++) {
	          var POS = startconnections[neighbourdirs[dirnbr]];
	          if (POS) {
	            if (!ARTIFACTS.myunits[POS]) {
	              ARTIFACTS[!!ARTIFACTS.oppunits[POS] ? 'killtarget' : 'movetarget'][POS] = {};
	            }
	          }
	        }
	      } else {
	        var STARTPOS = MARKS['selectunit'];
	        var allwalkerdirs = [8, 1, 2, 4, 5, 6];
	        for (var walkerdirnbr = 0; walkerdirnbr < 6; walkerdirnbr++) {
	          var DIR = allwalkerdirs[walkerdirnbr];
	          var walkedsquares = [];
	          var STOPREASON = "";
	          var nextpos = "";
	          var MAX = [8, 1, 2].indexOf(DIR) !== -1 ? 1 : 8;
	          var POS = STARTPOS;
	          var BLOCKS = UNITLAYERS.all;
	          var LENGTH = 0;
	          while (!(STOPREASON = LENGTH === MAX ? "reachedmax" : !(nextpos = connections[POS][DIR]) ? "outofbounds" : BLOCKS[nextpos] ? "hitblock" : null)) {
	            walkedsquares.push(POS = nextpos);
	            LENGTH++;
	            ARTIFACTS['movetarget'][POS] = {};
	          }
	          var WALKLENGTH = walkedsquares.length;
	          if (STOPREASON === "hitblock") {
	            POS = nextpos;
	            if (!ARTIFACTS.myunits[POS] && !([1, 5].indexOf(DIR) !== -1 && !!ARTIFACTS.oppdaggers[POS])) {
	              ARTIFACTS['movetarget'][POS] = {};
	            }
	          }
	        }
	      }
	      var newstepid = step.stepid + '-' + markpos;
	      var newstep = turn.steps[newstepid] = (0, _assign2.default)({}, step, {
	        ARTIFACTS: ARTIFACTS,
	        MARKS: MARKS,
	        stepid: newstepid,
	        path: step.path.concat(markpos)
	      });
	      turn.links[newstepid] = {};
	      var linkedpositions = (0, _keys2.default)(MARKS.selectmovetarget);
	      var nbrofpositions = positions.length;
	      for (var linknbr = 0; linknbr < nbrofpositions; linknbr++) {
	        turn[newstepid][linkedpositions[linknbr]] = 'selectmovetarget2';
	      }
	      return newstep;
	    };
	    game.selectmovetarget2 = function (turn, step, markpos) {
	      var MARKS = (0, _assign2.default)({}, step.MARKS, {
	        selectmovetarget: markpos
	      });
	      var newstepid = step.stepid + '-' + markpos;
	      var newstep = turn.steps[newstepid] = (0, _assign2.default)({}, step, {
	        MARKS: MARKS,
	        stepid: newstepid,
	        path: step.path.concat(markpos)
	      });
	      turn.links[newstepid] = {};
	      turn[newstepid].move = 'move2';
	      return newstep;
	    };
	    game.move2 = function (turn, step) {
	      var ARTIFACTS = step.ARTIFACTS;
	      var MARKS = step.MARKS;
	      var UNITDATA = (0, _assign2.default)({}, step.UNITDATA);
	      var UNITLAYERS = step.UNITLAYERS;
	      delete UNITDATA[(UNITLAYERS.all[MARKS['selectmovetarget']] || {}).id];
	      var unitid = (UNITLAYERS.all[MARKS['selectunit']] || {}).id;
	      if (unitid) {
	        UNITDATA[unitid] = (0, _assign2.default)({}, UNITDATA[unitid], {
	          'pos': MARKS['selectmovetarget']
	        });
	      }
	      MARKS = {};
	      UNITLAYERS = {
	        "crowns": {},
	        "mycrowns": {},
	        "oppcrowns": {},
	        "neutralcrowns": {},
	        "daggers": {},
	        "mydaggers": {},
	        "oppdaggers": {},
	        "neutraldaggers": {},
	        "units": {},
	        "myunits": {},
	        "oppunits": {},
	        "neutralunits": {}
	      };
	      for (var unitid in UNITDATA) {
	        var currentunit = UNITDATA[unitid];
	        var unitgroup = currentunit.group;
	        var unitpos = currentunit.pos;
	        var owner = ownernames[currentunit.owner];
	        UNITLAYERS.all[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
	      }
	      ARTIFACTS = {
	        "killtarget": {},
	        "movetarget": {}
	      };
	      var newstepid = step.stepid + '-' + 'move';
	      var newstep = turn.steps[newstepid] = (0, _assign2.default)({}, step, {
	        ARTIFACTS: ARTIFACTS,
	        MARKS: MARKS,
	        UNITDATA: UNITDATA,
	        UNITLAYERS: UNITLAYERS,
	        stepid: newstepid,
	        path: step.path.concat('move')
	      });
	      turn.links[newstepid] = {};
	      if ((0, _keys2.default)(function () {
	        var ret = {},
	            s0 = ARTIFACTS.mycrowns,
	            s1 = ARTIFACTS.oppbases;
	        for (var key in s0) {
	          if (s1[key]) {
	            ret[key] = s0[key];
	          }
	        }
	        return ret;
	      }() || {}).length !== 0) {
	        var winner = 2;
	        var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
	        turn.links[newstepid][result] = 'infiltration';
	      } else if ((0, _keys2.default)(ARTIFACTS.oppdeadcrowns || {}).length !== 0) {
	        var winner = 2;
	        var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
	        turn.links[newstepid][result] = 'kingkill';
	      } else turn.links[newstepid].endturn = "start" + otherplayer;
	      return newstep;
	    };
	    game.start2 = function (turn, step) {
	      var turn = {
	        steps: {},
	        player: player,
	        turn: turn.turn + 1,
	        links: {}
	      };
	      var MARKS = {};
	      var ARTIFACTS = {
	        "killtarget": {},
	        "movetarget": {}
	      };
	      var UNITDATA = step.UNITDATA;
	      var UNITLAYERS = {
	        "crowns": {},
	        "mycrowns": {},
	        "oppcrowns": {},
	        "neutralcrowns": {},
	        "daggers": {},
	        "mydaggers": {},
	        "oppdaggers": {},
	        "neutraldaggers": {},
	        "units": {},
	        "myunits": {},
	        "oppunits": {},
	        "neutralunits": {}
	      };
	      for (var unitid in UNITDATA) {
	        var currentunit = UNITDATA[unitid];
	        var unitgroup = currentunit.group;
	        var unitpos = currentunit.pos;
	        var owner = ownernames[currentunit.owner];
	        UNITLAYERS.all[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
	      }
	      var newstep = turn.steps.root = {
	        ARTIFACTS: ARTIFACTS,
	        UNITDATA: UNITDATA,
	        UNITLAYERS: UNITLAYERS,
	        MARKS: MARKS,
	        stepid: 'root',
	        path: []
	      };
	      undefined;
	      return turn;
	    };
	  })();
	  game.newGame = function () {
	    var turnseed = {
	      turn: 0
	    };
	    var stepseed = {
	      UNITDATA: {
	        "unit1": {
	          "pos": "d8",
	          "id": "unit1",
	          "group": "crowns",
	          "owner": 1
	        },
	        "unit2": {
	          "pos": "e8",
	          "id": "unit2",
	          "group": "crowns",
	          "owner": 1
	        },
	        "unit3": {
	          "pos": "c1",
	          "id": "unit3",
	          "group": "crowns",
	          "owner": 2
	        },
	        "unit4": {
	          "pos": "f1",
	          "id": "unit4",
	          "group": "crowns",
	          "owner": 2
	        },
	        "unit5": {
	          "pos": "c7",
	          "id": "unit5",
	          "group": "daggers",
	          "owner": 1
	        },
	        "unit6": {
	          "pos": "d7",
	          "id": "unit6",
	          "group": "daggers",
	          "owner": 1
	        },
	        "unit7": {
	          "pos": "e7",
	          "id": "unit7",
	          "group": "daggers",
	          "owner": 1
	        },
	        "unit8": {
	          "pos": "f7",
	          "id": "unit8",
	          "group": "daggers",
	          "owner": 1
	        },
	        "unit9": {
	          "pos": "c3",
	          "id": "unit9",
	          "group": "daggers",
	          "owner": 2
	        },
	        "unit10": {
	          "pos": "f3",
	          "id": "unit10",
	          "group": "daggers",
	          "owner": 2
	        },
	        "unit11": {
	          "pos": "b2",
	          "id": "unit11",
	          "group": "daggers",
	          "owner": 2
	        },
	        "unit12": {
	          "pos": "c2",
	          "id": "unit12",
	          "group": "daggers",
	          "owner": 2
	        },
	        "unit13": {
	          "pos": "d2",
	          "id": "unit13",
	          "group": "daggers",
	          "owner": 2
	        },
	        "unit14": {
	          "pos": "e2",
	          "id": "unit14",
	          "group": "daggers",
	          "owner": 2
	        },
	        "unit15": {
	          "pos": "f2",
	          "id": "unit15",
	          "group": "daggers",
	          "owner": 2
	        },
	        "unit16": {
	          "pos": "g2",
	          "id": "unit16",
	          "group": "daggers",
	          "owner": 2
	        }
	      }
	    };
	    return game.start1(turnseed, stepseed);
	  };
	  return game;
	};
	exports.default = makeGame();

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(3), __esModule: true };

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(4);
	module.exports = __webpack_require__(10).Object.keys;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(5);

	__webpack_require__(7)('keys', function($keys){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(6);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(8)
	  , core    = __webpack_require__(10)
	  , fails   = __webpack_require__(13);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(9)
	  , core      = __webpack_require__(10)
	  , ctx       = __webpack_require__(11)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	};
	// type bitmap
	$export.F = 1;  // forced
	$export.G = 2;  // global
	$export.S = 4;  // static
	$export.P = 8;  // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	module.exports = $export;

/***/ },
/* 9 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 10 */
/***/ function(module, exports) {

	var core = module.exports = {version: '1.2.6'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(12);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(15), __esModule: true };

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(16);
	module.exports = __webpack_require__(10).Object.assign;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(8);

	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(17)});

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.1 Object.assign(target, source, ...)
	var $        = __webpack_require__(18)
	  , toObject = __webpack_require__(5)
	  , IObject  = __webpack_require__(19);

	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = __webpack_require__(13)(function(){
	  var a = Object.assign
	    , A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return a({}, A)[S] != 7 || Object.keys(a({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , $$    = arguments
	    , $$len = $$.length
	    , index = 1
	    , getKeys    = $.getKeys
	    , getSymbols = $.getSymbols
	    , isEnum     = $.isEnum;
	  while($$len > index){
	    var S      = IObject($$[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  }
	  return T;
	} : Object.assign;

/***/ },
/* 18 */
/***/ function(module, exports) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(20);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _keys = __webpack_require__(2);

	var _keys2 = _interopRequireDefault(_keys);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var endgameactions = { win: 1, lose: 1, draw: 1 };

	var play = {
	    hydrateTurn: function hydrateTurn(game, turn) {
	        var steps = turn.steps;
	        var links = turn.links;

	        var checkSteps = [steps.root];
	        turn.ends = {
	            win: [],
	            draw: [],
	            lose: []
	        };
	        turn.next = {};
	        while (checkSteps.length) {
	            var step = checkSteps.pop();
	            var stepid = step.stepid;
	            var steplinks = links[stepid];
	            var checkActions = (0, _keys2.default)(steplinks);
	            while (checkActions.length) {
	                var action = checkActions.pop();
	                var func = links[action];
	                if (endgameactions[action]) {
	                    turn.ends[action].push(stepid);
	                } else if (action === 'endturn') {
	                    var newturn = play.tryToReachTurnEnd(game, game[func]());
	                    if (newturn.canend) {
	                        turn.next[stepid] = newturn;
	                    } else {
	                        steplinks.win = newturn.blockedby || 'starvation'; // TODO - gamespec logic?
	                        turn.ends.win.push(stepid);
	                        delete steplinks.endturn;
	                    }
	                } else {
	                    var nextstepid = stepid + '_' + action;
	                    checkSteps.push(steps[nextstepid] || (steps[nextstepid] = game[func](turn, step, action)));
	                }
	            }
	        }
	    },
	    tryToReachTurnEnd: function tryToReachTurnEnd(game, turn) {
	        var steps = turn.steps;
	        var links = turn.links;

	        var checkSteps = [steps.root];
	        var canalwaysend = game.canalwaysend || {};
	        while (!turn.canend && checkSteps.length) {
	            var step = checkSteps.pop();
	            var stepid = step.stepid;
	            var checkActions = (0, _keys2.default)(links[stepid]);
	            while (!turn.canend && checkActions.length) {
	                var action = checkActions.pop();
	                var func = links[action];
	                if (endgameactions[action] || action === 'endturn' || canalwaysend[func]) {
	                    turn.canend = true;
	                } else {
	                    var nextstepid = stepid + '_' + action;
	                    checkSteps.push(steps[nextstepid] || (steps[nextstepid] = game[func](turn, step, action)));
	                }
	            }
	        }
	    }
	};

	exports.default = play;

/***/ }
/******/ ]);