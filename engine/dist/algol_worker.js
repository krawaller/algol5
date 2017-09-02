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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports =
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
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /*
	                                                                                                                                                                                                                                                                  The public methods of the Algol system.
	                                                                                                                                                                                                                                                                  Meant to be consumed by an app.
	                                                                                                                                                                                                                                                                  */

	var _gamesproxy = __webpack_require__(1);

	var _omit = __webpack_require__(4);

	var _omit2 = _interopRequireDefault(_omit);

	var _random = __webpack_require__(144);

	var _random2 = _interopRequireDefault(_random);

	var _decodesessionsave = __webpack_require__(149);

	var _decodesessionsave2 = _interopRequireDefault(_decodesessionsave);

	var _optionsinui = __webpack_require__(155);

	var _optionsinui2 = _interopRequireDefault(_optionsinui);

	var _newsession = __webpack_require__(156);

	var _newsession2 = _interopRequireDefault(_newsession);

	var _getsessionui = __webpack_require__(162);

	var _getsessionui2 = _interopRequireDefault(_getsessionui);

	var _makesessionaction = __webpack_require__(193);

	var _makesessionaction2 = _interopRequireDefault(_makesessionaction);

	var _findbestturnendpaths = __webpack_require__(196);

	var _findbestturnendpaths2 = _interopRequireDefault(_findbestturnendpaths);

	var _getrandomturnendpath = __webpack_require__(197);

	var _getrandomturnendpath2 = _interopRequireDefault(_getrandomturnendpath);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var sessions = {};

	// TODO - rename startGame to startBattle

	var api = {
	    /*
	    Start a new session for a given game with the given players
	    BattleId is optional, otherwise one will be randomised
	    */
	    startGame: function startGame(gameId, plr1, plr2, battleid) {
	        var session = (0, _newsession2.default)(gameId, plr1, plr2, battleid);
	        sessions[session.id] = session;
	        return (0, _getsessionui2.default)(session, session.step);
	    },

	    /*
	    Make a mark, do a command, etc. Perform an action in a session!
	    */
	    performAction: function performAction(sessionId, action) {
	        var session = sessions[sessionId];
	        //console.log('Gonna do',action,'in session',sessionId,'which has state',session);
	        session = (0, _makesessionaction2.default)(session, action);
	        return (0, _getsessionui2.default)(session, session.step);
	    },

	    /*
	    Returns array of best moves for finishing current turn according to named brain.
	    TODO - randomize all using battleId as a seed
	    */
	    findBestOption: function findBestOption(sessionId, brain) {
	        switch (brain) {
	            case "Randy":
	                return (0, _getrandomturnendpath2.default)(sessions[sessionId]);
	            default:
	                var paths = (0, _findbestturnendpaths2.default)(sessions[sessionId], brain);
	                return paths[(0, _random2.default)(0, paths.length - 1)];
	        }
	    },

	    /*
	    Take a wild guess! :D
	    */
	    debug: function debug(sessionId) {
	        var session = sessions[sessionId];
	        return _extends({}, (0, _omit2.default)(session, ['game']), session.game.debug());
	    },

	    /*
	    Yeeeah
	    */
	    inflateFromSave: function inflateFromSave(saveString) {
	        var _decodeSessionSave = (0, _decodesessionsave2.default)(saveString),
	            gameId = _decodeSessionSave.gameId,
	            battleId = _decodeSessionSave.battleId,
	            turnNumber = _decodeSessionSave.turnNumber,
	            moveIndexes = _decodeSessionSave.moveIndexes,
	            ended = _decodeSessionSave.ended;

	        var UI = api.startGame(gameId, 'plr1', 'plr2', battleId);
	        while (UI.turn < turnNumber || UI.turn == turnNumber && ended && !UI.endedBy) {
	            var action = void 0,
	                available = (0, _optionsinui2.default)(UI);
	            if (available.length === 1) {
	                action = available[0];
	            } else if (available.length > 1) {
	                if (!moveIndexes.length) {
	                    throw "Many available but no save index left!";
	                }
	                action = available[moveIndexes.shift()];
	            } else {
	                throw "No available actions!";
	            }
	            UI = api.performAction(UI.sessionId, action);
	        }
	        if (moveIndexes.length) {
	            console.log(moveIndexes);
	            throw "Oh noes, we had indexes still to go :(";
	        }
	        return UI;
	    },

	    /*
	    Wooh! :D
	    */
	    gameLibrary: function gameLibrary() {
	        return _gamesproxy.meta;
	    }
	};

	exports.default = api;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var GAMES = __webpack_require__(2);
	var META = __webpack_require__(3);

	var games = exports.games = GAMES;
	var meta = exports.meta = META;

	// TODO - import? 
	var colnametonumber = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXYZ".split("").reduce(function (mem, char, n) {
	  mem[char] = n + 1;
	  return mem;
	}, {});
	var colnumbertoname = Object.keys(colnametonumber).reduce(function (mem, key) {
	  var val = colnametonumber[key];
	  mem[val] = key;
	  return mem;
	}, {});
	var coords2pos = exports.coords2pos = function coords2pos(coords) {
	  return colnumbertoname[coords.x] + coords.y;
	};
	var pos2coords = exports.pos2coords = function pos2coords(pos) {
	  return {
	    x: colnametonumber[pos[0]],
	    y: parseInt(pos.substr(1))
	  };
	};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	"use strict";module.exports={_test:function(){var game={};var connections={"faux":{},"a1":{"1":"a2","2":"b2","3":"b1"},"a10":{"3":"b10","4":"b9","5":"a9"},"a2":{"1":"a3","2":"b3","3":"b2","4":"b1","5":"a1"},"a3":{"1":"a4","2":"b4","3":"b3","4":"b2","5":"a2"},"a4":{"1":"a5","2":"b5","3":"b4","4":"b3","5":"a3"},"a5":{"1":"a6","2":"b6","3":"b5","4":"b4","5":"a4"},"a6":{"1":"a7","2":"b7","3":"b6","4":"b5","5":"a5"},"a7":{"1":"a8","2":"b8","3":"b7","4":"b6","5":"a6"},"a8":{"1":"a9","2":"b9","3":"b8","4":"b7","5":"a7"},"a9":{"1":"a10","2":"b10","3":"b9","4":"b8","5":"a8"},"b1":{"1":"b2","2":"c2","3":"c1","7":"a1","8":"a2"},"b10":{"3":"c10","4":"c9","5":"b9","6":"a9","7":"a10"},"b2":{"1":"b3","2":"c3","3":"c2","4":"c1","5":"b1","6":"a1","7":"a2","8":"a3"},"b3":{"1":"b4","2":"c4","3":"c3","4":"c2","5":"b2","6":"a2","7":"a3","8":"a4"},"b4":{"1":"b5","2":"c5","3":"c4","4":"c3","5":"b3","6":"a3","7":"a4","8":"a5"},"b5":{"1":"b6","2":"c6","3":"c5","4":"c4","5":"b4","6":"a4","7":"a5","8":"a6"},"b6":{"1":"b7","2":"c7","3":"c6","4":"c5","5":"b5","6":"a5","7":"a6","8":"a7"},"b7":{"1":"b8","2":"c8","3":"c7","4":"c6","5":"b6","6":"a6","7":"a7","8":"a8"},"b8":{"1":"b9","2":"c9","3":"c8","4":"c7","5":"b7","6":"a7","7":"a8","8":"a9"},"b9":{"1":"b10","2":"c10","3":"c9","4":"c8","5":"b8","6":"a8","7":"a9","8":"a10"},"c1":{"1":"c2","2":"d2","3":"d1","7":"b1","8":"b2"},"c10":{"3":"d10","4":"d9","5":"c9","6":"b9","7":"b10"},"c2":{"1":"c3","2":"d3","3":"d2","4":"d1","5":"c1","6":"b1","7":"b2","8":"b3"},"c3":{"1":"c4","2":"d4","3":"d3","4":"d2","5":"c2","6":"b2","7":"b3","8":"b4"},"c4":{"1":"c5","2":"d5","3":"d4","4":"d3","5":"c3","6":"b3","7":"b4","8":"b5"},"c5":{"1":"c6","2":"d6","3":"d5","4":"d4","5":"c4","6":"b4","7":"b5","8":"b6"},"c6":{"1":"c7","2":"d7","3":"d6","4":"d5","5":"c5","6":"b5","7":"b6","8":"b7"},"c7":{"1":"c8","2":"d8","3":"d7","4":"d6","5":"c6","6":"b6","7":"b7","8":"b8"},"c8":{"1":"c9","2":"d9","3":"d8","4":"d7","5":"c7","6":"b7","7":"b8","8":"b9"},"c9":{"1":"c10","2":"d10","3":"d9","4":"d8","5":"c8","6":"b8","7":"b9","8":"b10"},"d1":{"1":"d2","2":"e2","3":"e1","7":"c1","8":"c2"},"d10":{"3":"e10","4":"e9","5":"d9","6":"c9","7":"c10"},"d2":{"1":"d3","2":"e3","3":"e2","4":"e1","5":"d1","6":"c1","7":"c2","8":"c3"},"d3":{"1":"d4","2":"e4","3":"e3","4":"e2","5":"d2","6":"c2","7":"c3","8":"c4"},"d4":{"1":"d5","2":"e5","3":"e4","4":"e3","5":"d3","6":"c3","7":"c4","8":"c5"},"d5":{"1":"d6","2":"e6","3":"e5","4":"e4","5":"d4","6":"c4","7":"c5","8":"c6"},"d6":{"1":"d7","2":"e7","3":"e6","4":"e5","5":"d5","6":"c5","7":"c6","8":"c7"},"d7":{"1":"d8","2":"e8","3":"e7","4":"e6","5":"d6","6":"c6","7":"c7","8":"c8"},"d8":{"1":"d9","2":"e9","3":"e8","4":"e7","5":"d7","6":"c7","7":"c8","8":"c9"},"d9":{"1":"d10","2":"e10","3":"e9","4":"e8","5":"d8","6":"c8","7":"c9","8":"c10"},"e1":{"1":"e2","2":"f2","3":"f1","7":"d1","8":"d2"},"e10":{"3":"f10","4":"f9","5":"e9","6":"d9","7":"d10"},"e2":{"1":"e3","2":"f3","3":"f2","4":"f1","5":"e1","6":"d1","7":"d2","8":"d3"},"e3":{"1":"e4","2":"f4","3":"f3","4":"f2","5":"e2","6":"d2","7":"d3","8":"d4"},"e4":{"1":"e5","2":"f5","3":"f4","4":"f3","5":"e3","6":"d3","7":"d4","8":"d5"},"e5":{"1":"e6","2":"f6","3":"f5","4":"f4","5":"e4","6":"d4","7":"d5","8":"d6"},"e6":{"1":"e7","2":"f7","3":"f6","4":"f5","5":"e5","6":"d5","7":"d6","8":"d7"},"e7":{"1":"e8","2":"f8","3":"f7","4":"f6","5":"e6","6":"d6","7":"d7","8":"d8"},"e8":{"1":"e9","2":"f9","3":"f8","4":"f7","5":"e7","6":"d7","7":"d8","8":"d9"},"e9":{"1":"e10","2":"f10","3":"f9","4":"f8","5":"e8","6":"d8","7":"d9","8":"d10"},"f1":{"1":"f2","2":"g2","3":"g1","7":"e1","8":"e2"},"f10":{"3":"g10","4":"g9","5":"f9","6":"e9","7":"e10"},"f2":{"1":"f3","2":"g3","3":"g2","4":"g1","5":"f1","6":"e1","7":"e2","8":"e3"},"f3":{"1":"f4","2":"g4","3":"g3","4":"g2","5":"f2","6":"e2","7":"e3","8":"e4"},"f4":{"1":"f5","2":"g5","3":"g4","4":"g3","5":"f3","6":"e3","7":"e4","8":"e5"},"f5":{"1":"f6","2":"g6","3":"g5","4":"g4","5":"f4","6":"e4","7":"e5","8":"e6"},"f6":{"1":"f7","2":"g7","3":"g6","4":"g5","5":"f5","6":"e5","7":"e6","8":"e7"},"f7":{"1":"f8","2":"g8","3":"g7","4":"g6","5":"f6","6":"e6","7":"e7","8":"e8"},"f8":{"1":"f9","2":"g9","3":"g8","4":"g7","5":"f7","6":"e7","7":"e8","8":"e9"},"f9":{"1":"f10","2":"g10","3":"g9","4":"g8","5":"f8","6":"e8","7":"e9","8":"e10"},"g1":{"1":"g2","2":"h2","3":"h1","7":"f1","8":"f2"},"g10":{"3":"h10","4":"h9","5":"g9","6":"f9","7":"f10"},"g2":{"1":"g3","2":"h3","3":"h2","4":"h1","5":"g1","6":"f1","7":"f2","8":"f3"},"g3":{"1":"g4","2":"h4","3":"h3","4":"h2","5":"g2","6":"f2","7":"f3","8":"f4"},"g4":{"1":"g5","2":"h5","3":"h4","4":"h3","5":"g3","6":"f3","7":"f4","8":"f5"},"g5":{"1":"g6","2":"h6","3":"h5","4":"h4","5":"g4","6":"f4","7":"f5","8":"f6"},"g6":{"1":"g7","2":"h7","3":"h6","4":"h5","5":"g5","6":"f5","7":"f6","8":"f7"},"g7":{"1":"g8","2":"h8","3":"h7","4":"h6","5":"g6","6":"f6","7":"f7","8":"f8"},"g8":{"1":"g9","2":"h9","3":"h8","4":"h7","5":"g7","6":"f7","7":"f8","8":"f9"},"g9":{"1":"g10","2":"h10","3":"h9","4":"h8","5":"g8","6":"f8","7":"f9","8":"f10"},"h1":{"1":"h2","2":"i2","3":"i1","7":"g1","8":"g2"},"h10":{"3":"i10","4":"i9","5":"h9","6":"g9","7":"g10"},"h2":{"1":"h3","2":"i3","3":"i2","4":"i1","5":"h1","6":"g1","7":"g2","8":"g3"},"h3":{"1":"h4","2":"i4","3":"i3","4":"i2","5":"h2","6":"g2","7":"g3","8":"g4"},"h4":{"1":"h5","2":"i5","3":"i4","4":"i3","5":"h3","6":"g3","7":"g4","8":"g5"},"h5":{"1":"h6","2":"i6","3":"i5","4":"i4","5":"h4","6":"g4","7":"g5","8":"g6"},"h6":{"1":"h7","2":"i7","3":"i6","4":"i5","5":"h5","6":"g5","7":"g6","8":"g7"},"h7":{"1":"h8","2":"i8","3":"i7","4":"i6","5":"h6","6":"g6","7":"g7","8":"g8"},"h8":{"1":"h9","2":"i9","3":"i8","4":"i7","5":"h7","6":"g7","7":"g8","8":"g9"},"h9":{"1":"h10","2":"i10","3":"i9","4":"i8","5":"h8","6":"g8","7":"g9","8":"g10"},"i1":{"1":"i2","2":"j2","3":"j1","7":"h1","8":"h2"},"i10":{"3":"j10","4":"j9","5":"i9","6":"h9","7":"h10"},"i2":{"1":"i3","2":"j3","3":"j2","4":"j1","5":"i1","6":"h1","7":"h2","8":"h3"},"i3":{"1":"i4","2":"j4","3":"j3","4":"j2","5":"i2","6":"h2","7":"h3","8":"h4"},"i4":{"1":"i5","2":"j5","3":"j4","4":"j3","5":"i3","6":"h3","7":"h4","8":"h5"},"i5":{"1":"i6","2":"j6","3":"j5","4":"j4","5":"i4","6":"h4","7":"h5","8":"h6"},"i6":{"1":"i7","2":"j7","3":"j6","4":"j5","5":"i5","6":"h5","7":"h6","8":"h7"},"i7":{"1":"i8","2":"j8","3":"j7","4":"j6","5":"i6","6":"h6","7":"h7","8":"h8"},"i8":{"1":"i9","2":"j9","3":"j8","4":"j7","5":"i7","6":"h7","7":"h8","8":"h9"},"i9":{"1":"i10","2":"j10","3":"j9","4":"j8","5":"i8","6":"h8","7":"h9","8":"h10"},"j1":{"1":"j2","7":"i1","8":"i2"},"j10":{"5":"j9","6":"i9","7":"i10"},"j2":{"1":"j3","5":"j1","6":"i1","7":"i2","8":"i3"},"j3":{"1":"j4","5":"j2","6":"i2","7":"i3","8":"i4"},"j4":{"1":"j5","5":"j3","6":"i3","7":"i4","8":"i5"},"j5":{"1":"j6","5":"j4","6":"i4","7":"i5","8":"i6"},"j6":{"1":"j7","5":"j5","6":"i5","7":"i6","8":"i7"},"j7":{"1":"j8","5":"j6","6":"i6","7":"i7","8":"i8"},"j8":{"1":"j9","5":"j7","6":"i7","7":"i8","8":"i9"},"j9":{"1":"j10","5":"j8","6":"i8","7":"i9","8":"i10"}};var BOARD={"board":{"a1":{"colour":"dark","pos":"a1","x":1,"y":1},"a10":{"colour":"light","pos":"a10","x":1,"y":10},"a2":{"colour":"light","pos":"a2","x":1,"y":2},"a3":{"colour":"dark","pos":"a3","x":1,"y":3},"a4":{"colour":"light","pos":"a4","x":1,"y":4},"a5":{"colour":"dark","pos":"a5","x":1,"y":5},"a6":{"colour":"light","pos":"a6","x":1,"y":6},"a7":{"colour":"dark","pos":"a7","x":1,"y":7},"a8":{"colour":"light","pos":"a8","x":1,"y":8},"a9":{"colour":"dark","pos":"a9","x":1,"y":9},"b1":{"colour":"light","pos":"b1","x":2,"y":1},"b10":{"colour":"dark","pos":"b10","x":2,"y":10},"b2":{"colour":"dark","pos":"b2","x":2,"y":2},"b3":{"colour":"light","pos":"b3","x":2,"y":3},"b4":{"colour":"dark","pos":"b4","x":2,"y":4},"b5":{"colour":"light","pos":"b5","x":2,"y":5},"b6":{"colour":"dark","pos":"b6","x":2,"y":6},"b7":{"colour":"light","pos":"b7","x":2,"y":7},"b8":{"colour":"dark","pos":"b8","x":2,"y":8},"b9":{"colour":"light","pos":"b9","x":2,"y":9},"c1":{"colour":"dark","pos":"c1","x":3,"y":1},"c10":{"colour":"light","pos":"c10","x":3,"y":10},"c2":{"colour":"light","pos":"c2","x":3,"y":2},"c3":{"colour":"dark","pos":"c3","x":3,"y":3},"c4":{"colour":"light","pos":"c4","x":3,"y":4},"c5":{"colour":"dark","pos":"c5","x":3,"y":5},"c6":{"colour":"light","pos":"c6","x":3,"y":6},"c7":{"colour":"dark","pos":"c7","x":3,"y":7},"c8":{"colour":"light","pos":"c8","x":3,"y":8},"c9":{"colour":"dark","pos":"c9","x":3,"y":9},"d1":{"colour":"light","pos":"d1","x":4,"y":1},"d10":{"colour":"dark","pos":"d10","x":4,"y":10},"d2":{"colour":"dark","pos":"d2","x":4,"y":2},"d3":{"colour":"light","pos":"d3","x":4,"y":3},"d4":{"colour":"dark","pos":"d4","x":4,"y":4},"d5":{"colour":"light","pos":"d5","x":4,"y":5},"d6":{"colour":"dark","pos":"d6","x":4,"y":6},"d7":{"colour":"light","pos":"d7","x":4,"y":7},"d8":{"colour":"dark","pos":"d8","x":4,"y":8},"d9":{"colour":"light","pos":"d9","x":4,"y":9},"e1":{"colour":"dark","pos":"e1","x":5,"y":1},"e10":{"colour":"light","pos":"e10","x":5,"y":10},"e2":{"colour":"light","pos":"e2","x":5,"y":2},"e3":{"colour":"dark","pos":"e3","x":5,"y":3},"e4":{"colour":"light","pos":"e4","x":5,"y":4},"e5":{"colour":"dark","pos":"e5","x":5,"y":5},"e6":{"colour":"light","pos":"e6","x":5,"y":6},"e7":{"colour":"dark","pos":"e7","x":5,"y":7},"e8":{"colour":"light","pos":"e8","x":5,"y":8},"e9":{"colour":"dark","pos":"e9","x":5,"y":9},"f1":{"colour":"light","pos":"f1","x":6,"y":1},"f10":{"colour":"dark","pos":"f10","x":6,"y":10},"f2":{"colour":"dark","pos":"f2","x":6,"y":2},"f3":{"colour":"light","pos":"f3","x":6,"y":3},"f4":{"colour":"dark","pos":"f4","x":6,"y":4},"f5":{"colour":"light","pos":"f5","x":6,"y":5},"f6":{"colour":"dark","pos":"f6","x":6,"y":6},"f7":{"colour":"light","pos":"f7","x":6,"y":7},"f8":{"colour":"dark","pos":"f8","x":6,"y":8},"f9":{"colour":"light","pos":"f9","x":6,"y":9},"g1":{"colour":"dark","pos":"g1","x":7,"y":1},"g10":{"colour":"light","pos":"g10","x":7,"y":10},"g2":{"colour":"light","pos":"g2","x":7,"y":2},"g3":{"colour":"dark","pos":"g3","x":7,"y":3},"g4":{"colour":"light","pos":"g4","x":7,"y":4},"g5":{"colour":"dark","pos":"g5","x":7,"y":5},"g6":{"colour":"light","pos":"g6","x":7,"y":6},"g7":{"colour":"dark","pos":"g7","x":7,"y":7},"g8":{"colour":"light","pos":"g8","x":7,"y":8},"g9":{"colour":"dark","pos":"g9","x":7,"y":9},"h1":{"colour":"light","pos":"h1","x":8,"y":1},"h10":{"colour":"dark","pos":"h10","x":8,"y":10},"h2":{"colour":"dark","pos":"h2","x":8,"y":2},"h3":{"colour":"light","pos":"h3","x":8,"y":3},"h4":{"colour":"dark","pos":"h4","x":8,"y":4},"h5":{"colour":"light","pos":"h5","x":8,"y":5},"h6":{"colour":"dark","pos":"h6","x":8,"y":6},"h7":{"colour":"light","pos":"h7","x":8,"y":7},"h8":{"colour":"dark","pos":"h8","x":8,"y":8},"h9":{"colour":"light","pos":"h9","x":8,"y":9},"i1":{"colour":"dark","pos":"i1","x":9,"y":1},"i10":{"colour":"light","pos":"i10","x":9,"y":10},"i2":{"colour":"light","pos":"i2","x":9,"y":2},"i3":{"colour":"dark","pos":"i3","x":9,"y":3},"i4":{"colour":"light","pos":"i4","x":9,"y":4},"i5":{"colour":"dark","pos":"i5","x":9,"y":5},"i6":{"colour":"light","pos":"i6","x":9,"y":6},"i7":{"colour":"dark","pos":"i7","x":9,"y":7},"i8":{"colour":"light","pos":"i8","x":9,"y":8},"i9":{"colour":"dark","pos":"i9","x":9,"y":9},"j1":{"colour":"light","pos":"j1","x":10,"y":1},"j10":{"colour":"dark","pos":"j10","x":10,"y":10},"j2":{"colour":"dark","pos":"j2","x":10,"y":2},"j3":{"colour":"light","pos":"j3","x":10,"y":3},"j4":{"colour":"dark","pos":"j4","x":10,"y":4},"j5":{"colour":"light","pos":"j5","x":10,"y":5},"j6":{"colour":"dark","pos":"j6","x":10,"y":6},"j7":{"colour":"light","pos":"j7","x":10,"y":7},"j8":{"colour":"dark","pos":"j8","x":10,"y":8},"j9":{"colour":"light","pos":"j9","x":10,"y":9}},"light":{"a10":{"colour":"light","pos":"a10","x":1,"y":10},"a2":{"colour":"light","pos":"a2","x":1,"y":2},"a4":{"colour":"light","pos":"a4","x":1,"y":4},"a6":{"colour":"light","pos":"a6","x":1,"y":6},"a8":{"colour":"light","pos":"a8","x":1,"y":8},"b1":{"colour":"light","pos":"b1","x":2,"y":1},"b3":{"colour":"light","pos":"b3","x":2,"y":3},"b5":{"colour":"light","pos":"b5","x":2,"y":5},"b7":{"colour":"light","pos":"b7","x":2,"y":7},"b9":{"colour":"light","pos":"b9","x":2,"y":9},"c10":{"colour":"light","pos":"c10","x":3,"y":10},"c2":{"colour":"light","pos":"c2","x":3,"y":2},"c4":{"colour":"light","pos":"c4","x":3,"y":4},"c6":{"colour":"light","pos":"c6","x":3,"y":6},"c8":{"colour":"light","pos":"c8","x":3,"y":8},"d1":{"colour":"light","pos":"d1","x":4,"y":1},"d3":{"colour":"light","pos":"d3","x":4,"y":3},"d5":{"colour":"light","pos":"d5","x":4,"y":5},"d7":{"colour":"light","pos":"d7","x":4,"y":7},"d9":{"colour":"light","pos":"d9","x":4,"y":9},"e10":{"colour":"light","pos":"e10","x":5,"y":10},"e2":{"colour":"light","pos":"e2","x":5,"y":2},"e4":{"colour":"light","pos":"e4","x":5,"y":4},"e6":{"colour":"light","pos":"e6","x":5,"y":6},"e8":{"colour":"light","pos":"e8","x":5,"y":8},"f1":{"colour":"light","pos":"f1","x":6,"y":1},"f3":{"colour":"light","pos":"f3","x":6,"y":3},"f5":{"colour":"light","pos":"f5","x":6,"y":5},"f7":{"colour":"light","pos":"f7","x":6,"y":7},"f9":{"colour":"light","pos":"f9","x":6,"y":9},"g10":{"colour":"light","pos":"g10","x":7,"y":10},"g2":{"colour":"light","pos":"g2","x":7,"y":2},"g4":{"colour":"light","pos":"g4","x":7,"y":4},"g6":{"colour":"light","pos":"g6","x":7,"y":6},"g8":{"colour":"light","pos":"g8","x":7,"y":8},"h1":{"colour":"light","pos":"h1","x":8,"y":1},"h3":{"colour":"light","pos":"h3","x":8,"y":3},"h5":{"colour":"light","pos":"h5","x":8,"y":5},"h7":{"colour":"light","pos":"h7","x":8,"y":7},"h9":{"colour":"light","pos":"h9","x":8,"y":9},"i10":{"colour":"light","pos":"i10","x":9,"y":10},"i2":{"colour":"light","pos":"i2","x":9,"y":2},"i4":{"colour":"light","pos":"i4","x":9,"y":4},"i6":{"colour":"light","pos":"i6","x":9,"y":6},"i8":{"colour":"light","pos":"i8","x":9,"y":8},"j1":{"colour":"light","pos":"j1","x":10,"y":1},"j3":{"colour":"light","pos":"j3","x":10,"y":3},"j5":{"colour":"light","pos":"j5","x":10,"y":5},"j7":{"colour":"light","pos":"j7","x":10,"y":7},"j9":{"colour":"light","pos":"j9","x":10,"y":9}},"dark":{"a1":{"colour":"dark","pos":"a1","x":1,"y":1},"a3":{"colour":"dark","pos":"a3","x":1,"y":3},"a5":{"colour":"dark","pos":"a5","x":1,"y":5},"a7":{"colour":"dark","pos":"a7","x":1,"y":7},"a9":{"colour":"dark","pos":"a9","x":1,"y":9},"b10":{"colour":"dark","pos":"b10","x":2,"y":10},"b2":{"colour":"dark","pos":"b2","x":2,"y":2},"b4":{"colour":"dark","pos":"b4","x":2,"y":4},"b6":{"colour":"dark","pos":"b6","x":2,"y":6},"b8":{"colour":"dark","pos":"b8","x":2,"y":8},"c1":{"colour":"dark","pos":"c1","x":3,"y":1},"c3":{"colour":"dark","pos":"c3","x":3,"y":3},"c5":{"colour":"dark","pos":"c5","x":3,"y":5},"c7":{"colour":"dark","pos":"c7","x":3,"y":7},"c9":{"colour":"dark","pos":"c9","x":3,"y":9},"d10":{"colour":"dark","pos":"d10","x":4,"y":10},"d2":{"colour":"dark","pos":"d2","x":4,"y":2},"d4":{"colour":"dark","pos":"d4","x":4,"y":4},"d6":{"colour":"dark","pos":"d6","x":4,"y":6},"d8":{"colour":"dark","pos":"d8","x":4,"y":8},"e1":{"colour":"dark","pos":"e1","x":5,"y":1},"e3":{"colour":"dark","pos":"e3","x":5,"y":3},"e5":{"colour":"dark","pos":"e5","x":5,"y":5},"e7":{"colour":"dark","pos":"e7","x":5,"y":7},"e9":{"colour":"dark","pos":"e9","x":5,"y":9},"f10":{"colour":"dark","pos":"f10","x":6,"y":10},"f2":{"colour":"dark","pos":"f2","x":6,"y":2},"f4":{"colour":"dark","pos":"f4","x":6,"y":4},"f6":{"colour":"dark","pos":"f6","x":6,"y":6},"f8":{"colour":"dark","pos":"f8","x":6,"y":8},"g1":{"colour":"dark","pos":"g1","x":7,"y":1},"g3":{"colour":"dark","pos":"g3","x":7,"y":3},"g5":{"colour":"dark","pos":"g5","x":7,"y":5},"g7":{"colour":"dark","pos":"g7","x":7,"y":7},"g9":{"colour":"dark","pos":"g9","x":7,"y":9},"h10":{"colour":"dark","pos":"h10","x":8,"y":10},"h2":{"colour":"dark","pos":"h2","x":8,"y":2},"h4":{"colour":"dark","pos":"h4","x":8,"y":4},"h6":{"colour":"dark","pos":"h6","x":8,"y":6},"h8":{"colour":"dark","pos":"h8","x":8,"y":8},"i1":{"colour":"dark","pos":"i1","x":9,"y":1},"i3":{"colour":"dark","pos":"i3","x":9,"y":3},"i5":{"colour":"dark","pos":"i5","x":9,"y":5},"i7":{"colour":"dark","pos":"i7","x":9,"y":7},"i9":{"colour":"dark","pos":"i9","x":9,"y":9},"j10":{"colour":"dark","pos":"j10","x":10,"y":10},"j2":{"colour":"dark","pos":"j2","x":10,"y":2},"j4":{"colour":"dark","pos":"j4","x":10,"y":4},"j6":{"colour":"dark","pos":"j6","x":10,"y":6},"j8":{"colour":"dark","pos":"j8","x":10,"y":8}}};var relativedirs=[1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];(function(){var TERRAIN={"steps":{"a1":{"pos":"a1"},"b1":{"pos":"b1"},"c1":{"pos":"c1"},"d1":{"pos":"d1"},"a2":{"pos":"a2"},"b2":{"pos":"b2"},"c2":{"pos":"c2"},"d2":{"pos":"d2"},"a3":{"pos":"a3"},"b3":{"pos":"b3"},"c3":{"pos":"c3"},"d3":{"pos":"d3"},"a4":{"pos":"a4"},"b4":{"pos":"b4"},"c4":{"pos":"c4"},"d4":{"pos":"d4"}}};var ownernames=["neutral","my","opp"];var player=1;var otherplayer=2;game.selectunit1=function(turn,step,markpos){var ARTIFACTS={marks:Object.assign({},step.ARTIFACTS.marks),blocks:Object.assign({},step.ARTIFACTS.blocks)};var UNITLAYERS=step.UNITLAYERS;var MARKS={selectunit:markpos};var allowedsteps=TERRAIN.steps;var BLOCKS=UNITLAYERS.units;var walkstarts=function(){var ret={},s0=UNITLAYERS.mystepsfirsts,s1=function(){var ret={};ret[MARKS['selectunit']]=1;return ret;}();for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}();for(var STARTPOS in walkstarts){var allwalkerdirs=[1,5];for(var walkerdirnbr=0;walkerdirnbr<2;walkerdirnbr++){var POS=STARTPOS;while((POS=connections[POS][allwalkerdirs[walkerdirnbr]])&&allowedsteps[POS]&&!BLOCKS[POS]){ARTIFACTS['marks'][POS]={};}if(BLOCKS[POS]&&allowedsteps[POS]){ARTIFACTS['blocks'][POS]={};}}}var allowedsteps=TERRAIN.steps;var BLOCKS=UNITLAYERS.units;var walkstarts=function(){var ret={},s0=UNITLAYERS.myblocksfirsts,s1=function(){var ret={};ret[MARKS['selectunit']]=1;return ret;}();for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}();for(var STARTPOS in walkstarts){var allwalkerdirs=[1,5];for(var walkerdirnbr=0;walkerdirnbr<2;walkerdirnbr++){var POS=STARTPOS;while((POS=connections[POS][allwalkerdirs[walkerdirnbr]])&&!BLOCKS[POS]&&allowedsteps[POS]){ARTIFACTS['marks'][POS]={};}if(BLOCKS[POS]){ARTIFACTS['blocks'][POS]={};}}}var allowedsteps=TERRAIN.steps;var BLOCKS=UNITLAYERS.units;var walkstarts=function(){var ret={},s0=UNITLAYERS.mydefaultfirsts,s1=function(){var ret={};ret[MARKS['selectunit']]=1;return ret;}();for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}();for(var STARTPOS in walkstarts){var allwalkerdirs=[1,5];for(var walkerdirnbr=0;walkerdirnbr<2;walkerdirnbr++){var POS=STARTPOS;while((POS=connections[POS][allwalkerdirs[walkerdirnbr]])&&allowedsteps[POS]&&!BLOCKS[POS]){ARTIFACTS['marks'][POS]={};}if(BLOCKS[POS]&&allowedsteps[POS]){ARTIFACTS['blocks'][POS]={};}}}var allowedsteps=TERRAIN.steps;var BLOCKS=UNITLAYERS.units;var walkstarts=function(){var ret={},s0=UNITLAYERS.mynoblocks,s1=function(){var ret={};ret[MARKS['selectunit']]=1;return ret;}();for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}();for(var STARTPOS in walkstarts){var allwalkerdirs=[1,5];for(var walkerdirnbr=0;walkerdirnbr<2;walkerdirnbr++){var POS=STARTPOS;while((POS=connections[POS][allwalkerdirs[walkerdirnbr]])&&allowedsteps[POS]&&!BLOCKS[POS]){ARTIFACTS['marks'][POS]={};}}}var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectunit'});turn.links[newstepid]={};var newlinks=turn.links[newstepid];for(var linkpos in function(){var k,ret={},s0=ARTIFACTS.marks,s1=ARTIFACTS.blocks;for(k in s0){ret[k]=1;}for(k in s1){ret[k]=1;}return ret;}()){newlinks[linkpos]='selectmark1';}return newstep;};game.selectunit1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.selectmark1=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectmark:markpos,selectunit:step.MARKS.selectunit};var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectmark'});turn.links[newstepid]={};turn.links[newstepid].endturn="start"+otherplayer;return newstep;};game.selectmark1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.start1=function(turn,step){var turn={steps:{},player:player,turn:turn.turn+1,links:{root:{}}};var MARKS={};var ARTIFACTS={"marks":{},"blocks":{}};var UNITDATA=step.UNITDATA;var UNITLAYERS={"stepsfirsts":{},"mystepsfirsts":{},"oppstepsfirsts":{},"neutralstepsfirsts":{},"blocksfirsts":{},"myblocksfirsts":{},"oppblocksfirsts":{},"neutralblocksfirsts":{},"defaultfirsts":{},"mydefaultfirsts":{},"oppdefaultfirsts":{},"neutraldefaultfirsts":{},"noblocks":{},"mynoblocks":{},"oppnoblocks":{},"neutralnoblocks":{},"pawns":{},"mypawns":{},"opppawns":{},"neutralpawns":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}var newstep=turn.steps.root={ARTIFACTS:ARTIFACTS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,MARKS:MARKS,stepid:'root',name:'start',path:[]};var newlinks=turn.links.root;for(var linkpos in UNITLAYERS.myunits){newlinks[linkpos]='selectunit1';}return turn;};game.start1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.debug1=function(){return{TERRAIN:TERRAIN};};})();(function(){var TERRAIN={"steps":{"a1":{"pos":"a1"},"b1":{"pos":"b1"},"c1":{"pos":"c1"},"d1":{"pos":"d1"},"a2":{"pos":"a2"},"b2":{"pos":"b2"},"c2":{"pos":"c2"},"d2":{"pos":"d2"},"a3":{"pos":"a3"},"b3":{"pos":"b3"},"c3":{"pos":"c3"},"d3":{"pos":"d3"},"a4":{"pos":"a4"},"b4":{"pos":"b4"},"c4":{"pos":"c4"},"d4":{"pos":"d4"}}};var ownernames=["neutral","opp","my"];var player=2;var otherplayer=1;game.selectunit2=function(turn,step,markpos){var ARTIFACTS={marks:Object.assign({},step.ARTIFACTS.marks),blocks:Object.assign({},step.ARTIFACTS.blocks)};var UNITLAYERS=step.UNITLAYERS;var MARKS={selectunit:markpos};var allowedsteps=TERRAIN.steps;var BLOCKS=UNITLAYERS.units;var walkstarts=function(){var ret={},s0=UNITLAYERS.mystepsfirsts,s1=function(){var ret={};ret[MARKS['selectunit']]=1;return ret;}();for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}();for(var STARTPOS in walkstarts){var allwalkerdirs=[1,5];for(var walkerdirnbr=0;walkerdirnbr<2;walkerdirnbr++){var POS=STARTPOS;while((POS=connections[POS][allwalkerdirs[walkerdirnbr]])&&allowedsteps[POS]&&!BLOCKS[POS]){ARTIFACTS['marks'][POS]={};}if(BLOCKS[POS]&&allowedsteps[POS]){ARTIFACTS['blocks'][POS]={};}}}var allowedsteps=TERRAIN.steps;var BLOCKS=UNITLAYERS.units;var walkstarts=function(){var ret={},s0=UNITLAYERS.myblocksfirsts,s1=function(){var ret={};ret[MARKS['selectunit']]=1;return ret;}();for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}();for(var STARTPOS in walkstarts){var allwalkerdirs=[1,5];for(var walkerdirnbr=0;walkerdirnbr<2;walkerdirnbr++){var POS=STARTPOS;while((POS=connections[POS][allwalkerdirs[walkerdirnbr]])&&!BLOCKS[POS]&&allowedsteps[POS]){ARTIFACTS['marks'][POS]={};}if(BLOCKS[POS]){ARTIFACTS['blocks'][POS]={};}}}var allowedsteps=TERRAIN.steps;var BLOCKS=UNITLAYERS.units;var walkstarts=function(){var ret={},s0=UNITLAYERS.mydefaultfirsts,s1=function(){var ret={};ret[MARKS['selectunit']]=1;return ret;}();for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}();for(var STARTPOS in walkstarts){var allwalkerdirs=[1,5];for(var walkerdirnbr=0;walkerdirnbr<2;walkerdirnbr++){var POS=STARTPOS;while((POS=connections[POS][allwalkerdirs[walkerdirnbr]])&&allowedsteps[POS]&&!BLOCKS[POS]){ARTIFACTS['marks'][POS]={};}if(BLOCKS[POS]&&allowedsteps[POS]){ARTIFACTS['blocks'][POS]={};}}}var allowedsteps=TERRAIN.steps;var BLOCKS=UNITLAYERS.units;var walkstarts=function(){var ret={},s0=UNITLAYERS.mynoblocks,s1=function(){var ret={};ret[MARKS['selectunit']]=1;return ret;}();for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}();for(var STARTPOS in walkstarts){var allwalkerdirs=[1,5];for(var walkerdirnbr=0;walkerdirnbr<2;walkerdirnbr++){var POS=STARTPOS;while((POS=connections[POS][allwalkerdirs[walkerdirnbr]])&&allowedsteps[POS]&&!BLOCKS[POS]){ARTIFACTS['marks'][POS]={};}}}var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectunit'});turn.links[newstepid]={};var newlinks=turn.links[newstepid];for(var linkpos in function(){var k,ret={},s0=ARTIFACTS.marks,s1=ARTIFACTS.blocks;for(k in s0){ret[k]=1;}for(k in s1){ret[k]=1;}return ret;}()){newlinks[linkpos]='selectmark2';}return newstep;};game.selectunit2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.selectmark2=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectmark:markpos,selectunit:step.MARKS.selectunit};var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectmark'});turn.links[newstepid]={};turn.links[newstepid].endturn="start"+otherplayer;return newstep;};game.selectmark2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.start2=function(turn,step){var turn={steps:{},player:player,turn:turn.turn+1,links:{root:{}}};var MARKS={};var ARTIFACTS={"marks":{},"blocks":{}};var UNITDATA=step.UNITDATA;var UNITLAYERS={"stepsfirsts":{},"mystepsfirsts":{},"oppstepsfirsts":{},"neutralstepsfirsts":{},"blocksfirsts":{},"myblocksfirsts":{},"oppblocksfirsts":{},"neutralblocksfirsts":{},"defaultfirsts":{},"mydefaultfirsts":{},"oppdefaultfirsts":{},"neutraldefaultfirsts":{},"noblocks":{},"mynoblocks":{},"oppnoblocks":{},"neutralnoblocks":{},"pawns":{},"mypawns":{},"opppawns":{},"neutralpawns":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}var newstep=turn.steps.root={ARTIFACTS:ARTIFACTS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,MARKS:MARKS,stepid:'root',name:'start',path:[]};var newlinks=turn.links.root;for(var linkpos in UNITLAYERS.myunits){newlinks[linkpos]='selectunit2';}return turn;};game.start2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.debug2=function(){return{TERRAIN:TERRAIN};};})();function reduce(coll,iterator,acc){for(var key in coll){acc=iterator(acc,coll[key],key);}return acc;}game.newGame=function(){var turnseed={turn:0};var stepseed={UNITDATA:{"unit1":{"pos":"a3","id":"unit1","group":"stepsfirsts","owner":1},"unit2":{"pos":"b3","id":"unit2","group":"blocksfirsts","owner":1},"unit3":{"pos":"c3","id":"unit3","group":"defaultfirsts","owner":1},"unit4":{"pos":"d3","id":"unit4","group":"noblocks","owner":1},"unit5":{"pos":"a1","id":"unit5","group":"pawns","owner":2},"unit6":{"pos":"a5","id":"unit6","group":"pawns","owner":2},"unit7":{"pos":"b1","id":"unit7","group":"pawns","owner":2},"unit8":{"pos":"b5","id":"unit8","group":"pawns","owner":2},"unit9":{"pos":"c1","id":"unit9","group":"pawns","owner":2},"unit10":{"pos":"c5","id":"unit10","group":"pawns","owner":2},"unit11":{"pos":"d1","id":"unit11","group":"pawns","owner":2},"unit12":{"pos":"d5","id":"unit12","group":"pawns","owner":2}}};return game.start1(turnseed,stepseed);};game.debug=function(){return{BOARD:BOARD,connections:connections,plr1:game.debug1(),plr2:game.debug2()};};game.commands={};game.graphics={"icons":{"stepsfirsts":"queens","blocksfirsts":"queens","defaultfirsts":"queens","noblocks":"queens","pawns":"pawns"},"tiles":{"steps":"grass"}};game.board={"height":10,"width":10,"terrain":{"steps":[["rect","a1","d4"]]}};game.AI=[];game.id="_test";return game;}(),amazon:function(){var game={};var connections={"faux":{},"a1":{"1":"a2","2":"b2","3":"b1"},"a10":{"3":"b10","4":"b9","5":"a9"},"a2":{"1":"a3","2":"b3","3":"b2","4":"b1","5":"a1"},"a3":{"1":"a4","2":"b4","3":"b3","4":"b2","5":"a2"},"a4":{"1":"a5","2":"b5","3":"b4","4":"b3","5":"a3"},"a5":{"1":"a6","2":"b6","3":"b5","4":"b4","5":"a4"},"a6":{"1":"a7","2":"b7","3":"b6","4":"b5","5":"a5"},"a7":{"1":"a8","2":"b8","3":"b7","4":"b6","5":"a6"},"a8":{"1":"a9","2":"b9","3":"b8","4":"b7","5":"a7"},"a9":{"1":"a10","2":"b10","3":"b9","4":"b8","5":"a8"},"b1":{"1":"b2","2":"c2","3":"c1","7":"a1","8":"a2"},"b10":{"3":"c10","4":"c9","5":"b9","6":"a9","7":"a10"},"b2":{"1":"b3","2":"c3","3":"c2","4":"c1","5":"b1","6":"a1","7":"a2","8":"a3"},"b3":{"1":"b4","2":"c4","3":"c3","4":"c2","5":"b2","6":"a2","7":"a3","8":"a4"},"b4":{"1":"b5","2":"c5","3":"c4","4":"c3","5":"b3","6":"a3","7":"a4","8":"a5"},"b5":{"1":"b6","2":"c6","3":"c5","4":"c4","5":"b4","6":"a4","7":"a5","8":"a6"},"b6":{"1":"b7","2":"c7","3":"c6","4":"c5","5":"b5","6":"a5","7":"a6","8":"a7"},"b7":{"1":"b8","2":"c8","3":"c7","4":"c6","5":"b6","6":"a6","7":"a7","8":"a8"},"b8":{"1":"b9","2":"c9","3":"c8","4":"c7","5":"b7","6":"a7","7":"a8","8":"a9"},"b9":{"1":"b10","2":"c10","3":"c9","4":"c8","5":"b8","6":"a8","7":"a9","8":"a10"},"c1":{"1":"c2","2":"d2","3":"d1","7":"b1","8":"b2"},"c10":{"3":"d10","4":"d9","5":"c9","6":"b9","7":"b10"},"c2":{"1":"c3","2":"d3","3":"d2","4":"d1","5":"c1","6":"b1","7":"b2","8":"b3"},"c3":{"1":"c4","2":"d4","3":"d3","4":"d2","5":"c2","6":"b2","7":"b3","8":"b4"},"c4":{"1":"c5","2":"d5","3":"d4","4":"d3","5":"c3","6":"b3","7":"b4","8":"b5"},"c5":{"1":"c6","2":"d6","3":"d5","4":"d4","5":"c4","6":"b4","7":"b5","8":"b6"},"c6":{"1":"c7","2":"d7","3":"d6","4":"d5","5":"c5","6":"b5","7":"b6","8":"b7"},"c7":{"1":"c8","2":"d8","3":"d7","4":"d6","5":"c6","6":"b6","7":"b7","8":"b8"},"c8":{"1":"c9","2":"d9","3":"d8","4":"d7","5":"c7","6":"b7","7":"b8","8":"b9"},"c9":{"1":"c10","2":"d10","3":"d9","4":"d8","5":"c8","6":"b8","7":"b9","8":"b10"},"d1":{"1":"d2","2":"e2","3":"e1","7":"c1","8":"c2"},"d10":{"3":"e10","4":"e9","5":"d9","6":"c9","7":"c10"},"d2":{"1":"d3","2":"e3","3":"e2","4":"e1","5":"d1","6":"c1","7":"c2","8":"c3"},"d3":{"1":"d4","2":"e4","3":"e3","4":"e2","5":"d2","6":"c2","7":"c3","8":"c4"},"d4":{"1":"d5","2":"e5","3":"e4","4":"e3","5":"d3","6":"c3","7":"c4","8":"c5"},"d5":{"1":"d6","2":"e6","3":"e5","4":"e4","5":"d4","6":"c4","7":"c5","8":"c6"},"d6":{"1":"d7","2":"e7","3":"e6","4":"e5","5":"d5","6":"c5","7":"c6","8":"c7"},"d7":{"1":"d8","2":"e8","3":"e7","4":"e6","5":"d6","6":"c6","7":"c7","8":"c8"},"d8":{"1":"d9","2":"e9","3":"e8","4":"e7","5":"d7","6":"c7","7":"c8","8":"c9"},"d9":{"1":"d10","2":"e10","3":"e9","4":"e8","5":"d8","6":"c8","7":"c9","8":"c10"},"e1":{"1":"e2","2":"f2","3":"f1","7":"d1","8":"d2"},"e10":{"3":"f10","4":"f9","5":"e9","6":"d9","7":"d10"},"e2":{"1":"e3","2":"f3","3":"f2","4":"f1","5":"e1","6":"d1","7":"d2","8":"d3"},"e3":{"1":"e4","2":"f4","3":"f3","4":"f2","5":"e2","6":"d2","7":"d3","8":"d4"},"e4":{"1":"e5","2":"f5","3":"f4","4":"f3","5":"e3","6":"d3","7":"d4","8":"d5"},"e5":{"1":"e6","2":"f6","3":"f5","4":"f4","5":"e4","6":"d4","7":"d5","8":"d6"},"e6":{"1":"e7","2":"f7","3":"f6","4":"f5","5":"e5","6":"d5","7":"d6","8":"d7"},"e7":{"1":"e8","2":"f8","3":"f7","4":"f6","5":"e6","6":"d6","7":"d7","8":"d8"},"e8":{"1":"e9","2":"f9","3":"f8","4":"f7","5":"e7","6":"d7","7":"d8","8":"d9"},"e9":{"1":"e10","2":"f10","3":"f9","4":"f8","5":"e8","6":"d8","7":"d9","8":"d10"},"f1":{"1":"f2","2":"g2","3":"g1","7":"e1","8":"e2"},"f10":{"3":"g10","4":"g9","5":"f9","6":"e9","7":"e10"},"f2":{"1":"f3","2":"g3","3":"g2","4":"g1","5":"f1","6":"e1","7":"e2","8":"e3"},"f3":{"1":"f4","2":"g4","3":"g3","4":"g2","5":"f2","6":"e2","7":"e3","8":"e4"},"f4":{"1":"f5","2":"g5","3":"g4","4":"g3","5":"f3","6":"e3","7":"e4","8":"e5"},"f5":{"1":"f6","2":"g6","3":"g5","4":"g4","5":"f4","6":"e4","7":"e5","8":"e6"},"f6":{"1":"f7","2":"g7","3":"g6","4":"g5","5":"f5","6":"e5","7":"e6","8":"e7"},"f7":{"1":"f8","2":"g8","3":"g7","4":"g6","5":"f6","6":"e6","7":"e7","8":"e8"},"f8":{"1":"f9","2":"g9","3":"g8","4":"g7","5":"f7","6":"e7","7":"e8","8":"e9"},"f9":{"1":"f10","2":"g10","3":"g9","4":"g8","5":"f8","6":"e8","7":"e9","8":"e10"},"g1":{"1":"g2","2":"h2","3":"h1","7":"f1","8":"f2"},"g10":{"3":"h10","4":"h9","5":"g9","6":"f9","7":"f10"},"g2":{"1":"g3","2":"h3","3":"h2","4":"h1","5":"g1","6":"f1","7":"f2","8":"f3"},"g3":{"1":"g4","2":"h4","3":"h3","4":"h2","5":"g2","6":"f2","7":"f3","8":"f4"},"g4":{"1":"g5","2":"h5","3":"h4","4":"h3","5":"g3","6":"f3","7":"f4","8":"f5"},"g5":{"1":"g6","2":"h6","3":"h5","4":"h4","5":"g4","6":"f4","7":"f5","8":"f6"},"g6":{"1":"g7","2":"h7","3":"h6","4":"h5","5":"g5","6":"f5","7":"f6","8":"f7"},"g7":{"1":"g8","2":"h8","3":"h7","4":"h6","5":"g6","6":"f6","7":"f7","8":"f8"},"g8":{"1":"g9","2":"h9","3":"h8","4":"h7","5":"g7","6":"f7","7":"f8","8":"f9"},"g9":{"1":"g10","2":"h10","3":"h9","4":"h8","5":"g8","6":"f8","7":"f9","8":"f10"},"h1":{"1":"h2","2":"i2","3":"i1","7":"g1","8":"g2"},"h10":{"3":"i10","4":"i9","5":"h9","6":"g9","7":"g10"},"h2":{"1":"h3","2":"i3","3":"i2","4":"i1","5":"h1","6":"g1","7":"g2","8":"g3"},"h3":{"1":"h4","2":"i4","3":"i3","4":"i2","5":"h2","6":"g2","7":"g3","8":"g4"},"h4":{"1":"h5","2":"i5","3":"i4","4":"i3","5":"h3","6":"g3","7":"g4","8":"g5"},"h5":{"1":"h6","2":"i6","3":"i5","4":"i4","5":"h4","6":"g4","7":"g5","8":"g6"},"h6":{"1":"h7","2":"i7","3":"i6","4":"i5","5":"h5","6":"g5","7":"g6","8":"g7"},"h7":{"1":"h8","2":"i8","3":"i7","4":"i6","5":"h6","6":"g6","7":"g7","8":"g8"},"h8":{"1":"h9","2":"i9","3":"i8","4":"i7","5":"h7","6":"g7","7":"g8","8":"g9"},"h9":{"1":"h10","2":"i10","3":"i9","4":"i8","5":"h8","6":"g8","7":"g9","8":"g10"},"i1":{"1":"i2","2":"j2","3":"j1","7":"h1","8":"h2"},"i10":{"3":"j10","4":"j9","5":"i9","6":"h9","7":"h10"},"i2":{"1":"i3","2":"j3","3":"j2","4":"j1","5":"i1","6":"h1","7":"h2","8":"h3"},"i3":{"1":"i4","2":"j4","3":"j3","4":"j2","5":"i2","6":"h2","7":"h3","8":"h4"},"i4":{"1":"i5","2":"j5","3":"j4","4":"j3","5":"i3","6":"h3","7":"h4","8":"h5"},"i5":{"1":"i6","2":"j6","3":"j5","4":"j4","5":"i4","6":"h4","7":"h5","8":"h6"},"i6":{"1":"i7","2":"j7","3":"j6","4":"j5","5":"i5","6":"h5","7":"h6","8":"h7"},"i7":{"1":"i8","2":"j8","3":"j7","4":"j6","5":"i6","6":"h6","7":"h7","8":"h8"},"i8":{"1":"i9","2":"j9","3":"j8","4":"j7","5":"i7","6":"h7","7":"h8","8":"h9"},"i9":{"1":"i10","2":"j10","3":"j9","4":"j8","5":"i8","6":"h8","7":"h9","8":"h10"},"j1":{"1":"j2","7":"i1","8":"i2"},"j10":{"5":"j9","6":"i9","7":"i10"},"j2":{"1":"j3","5":"j1","6":"i1","7":"i2","8":"i3"},"j3":{"1":"j4","5":"j2","6":"i2","7":"i3","8":"i4"},"j4":{"1":"j5","5":"j3","6":"i3","7":"i4","8":"i5"},"j5":{"1":"j6","5":"j4","6":"i4","7":"i5","8":"i6"},"j6":{"1":"j7","5":"j5","6":"i5","7":"i6","8":"i7"},"j7":{"1":"j8","5":"j6","6":"i6","7":"i7","8":"i8"},"j8":{"1":"j9","5":"j7","6":"i7","7":"i8","8":"i9"},"j9":{"1":"j10","5":"j8","6":"i8","7":"i9","8":"i10"}};var BOARD={"board":{"a1":{"colour":"dark","pos":"a1","x":1,"y":1},"a10":{"colour":"light","pos":"a10","x":1,"y":10},"a2":{"colour":"light","pos":"a2","x":1,"y":2},"a3":{"colour":"dark","pos":"a3","x":1,"y":3},"a4":{"colour":"light","pos":"a4","x":1,"y":4},"a5":{"colour":"dark","pos":"a5","x":1,"y":5},"a6":{"colour":"light","pos":"a6","x":1,"y":6},"a7":{"colour":"dark","pos":"a7","x":1,"y":7},"a8":{"colour":"light","pos":"a8","x":1,"y":8},"a9":{"colour":"dark","pos":"a9","x":1,"y":9},"b1":{"colour":"light","pos":"b1","x":2,"y":1},"b10":{"colour":"dark","pos":"b10","x":2,"y":10},"b2":{"colour":"dark","pos":"b2","x":2,"y":2},"b3":{"colour":"light","pos":"b3","x":2,"y":3},"b4":{"colour":"dark","pos":"b4","x":2,"y":4},"b5":{"colour":"light","pos":"b5","x":2,"y":5},"b6":{"colour":"dark","pos":"b6","x":2,"y":6},"b7":{"colour":"light","pos":"b7","x":2,"y":7},"b8":{"colour":"dark","pos":"b8","x":2,"y":8},"b9":{"colour":"light","pos":"b9","x":2,"y":9},"c1":{"colour":"dark","pos":"c1","x":3,"y":1},"c10":{"colour":"light","pos":"c10","x":3,"y":10},"c2":{"colour":"light","pos":"c2","x":3,"y":2},"c3":{"colour":"dark","pos":"c3","x":3,"y":3},"c4":{"colour":"light","pos":"c4","x":3,"y":4},"c5":{"colour":"dark","pos":"c5","x":3,"y":5},"c6":{"colour":"light","pos":"c6","x":3,"y":6},"c7":{"colour":"dark","pos":"c7","x":3,"y":7},"c8":{"colour":"light","pos":"c8","x":3,"y":8},"c9":{"colour":"dark","pos":"c9","x":3,"y":9},"d1":{"colour":"light","pos":"d1","x":4,"y":1},"d10":{"colour":"dark","pos":"d10","x":4,"y":10},"d2":{"colour":"dark","pos":"d2","x":4,"y":2},"d3":{"colour":"light","pos":"d3","x":4,"y":3},"d4":{"colour":"dark","pos":"d4","x":4,"y":4},"d5":{"colour":"light","pos":"d5","x":4,"y":5},"d6":{"colour":"dark","pos":"d6","x":4,"y":6},"d7":{"colour":"light","pos":"d7","x":4,"y":7},"d8":{"colour":"dark","pos":"d8","x":4,"y":8},"d9":{"colour":"light","pos":"d9","x":4,"y":9},"e1":{"colour":"dark","pos":"e1","x":5,"y":1},"e10":{"colour":"light","pos":"e10","x":5,"y":10},"e2":{"colour":"light","pos":"e2","x":5,"y":2},"e3":{"colour":"dark","pos":"e3","x":5,"y":3},"e4":{"colour":"light","pos":"e4","x":5,"y":4},"e5":{"colour":"dark","pos":"e5","x":5,"y":5},"e6":{"colour":"light","pos":"e6","x":5,"y":6},"e7":{"colour":"dark","pos":"e7","x":5,"y":7},"e8":{"colour":"light","pos":"e8","x":5,"y":8},"e9":{"colour":"dark","pos":"e9","x":5,"y":9},"f1":{"colour":"light","pos":"f1","x":6,"y":1},"f10":{"colour":"dark","pos":"f10","x":6,"y":10},"f2":{"colour":"dark","pos":"f2","x":6,"y":2},"f3":{"colour":"light","pos":"f3","x":6,"y":3},"f4":{"colour":"dark","pos":"f4","x":6,"y":4},"f5":{"colour":"light","pos":"f5","x":6,"y":5},"f6":{"colour":"dark","pos":"f6","x":6,"y":6},"f7":{"colour":"light","pos":"f7","x":6,"y":7},"f8":{"colour":"dark","pos":"f8","x":6,"y":8},"f9":{"colour":"light","pos":"f9","x":6,"y":9},"g1":{"colour":"dark","pos":"g1","x":7,"y":1},"g10":{"colour":"light","pos":"g10","x":7,"y":10},"g2":{"colour":"light","pos":"g2","x":7,"y":2},"g3":{"colour":"dark","pos":"g3","x":7,"y":3},"g4":{"colour":"light","pos":"g4","x":7,"y":4},"g5":{"colour":"dark","pos":"g5","x":7,"y":5},"g6":{"colour":"light","pos":"g6","x":7,"y":6},"g7":{"colour":"dark","pos":"g7","x":7,"y":7},"g8":{"colour":"light","pos":"g8","x":7,"y":8},"g9":{"colour":"dark","pos":"g9","x":7,"y":9},"h1":{"colour":"light","pos":"h1","x":8,"y":1},"h10":{"colour":"dark","pos":"h10","x":8,"y":10},"h2":{"colour":"dark","pos":"h2","x":8,"y":2},"h3":{"colour":"light","pos":"h3","x":8,"y":3},"h4":{"colour":"dark","pos":"h4","x":8,"y":4},"h5":{"colour":"light","pos":"h5","x":8,"y":5},"h6":{"colour":"dark","pos":"h6","x":8,"y":6},"h7":{"colour":"light","pos":"h7","x":8,"y":7},"h8":{"colour":"dark","pos":"h8","x":8,"y":8},"h9":{"colour":"light","pos":"h9","x":8,"y":9},"i1":{"colour":"dark","pos":"i1","x":9,"y":1},"i10":{"colour":"light","pos":"i10","x":9,"y":10},"i2":{"colour":"light","pos":"i2","x":9,"y":2},"i3":{"colour":"dark","pos":"i3","x":9,"y":3},"i4":{"colour":"light","pos":"i4","x":9,"y":4},"i5":{"colour":"dark","pos":"i5","x":9,"y":5},"i6":{"colour":"light","pos":"i6","x":9,"y":6},"i7":{"colour":"dark","pos":"i7","x":9,"y":7},"i8":{"colour":"light","pos":"i8","x":9,"y":8},"i9":{"colour":"dark","pos":"i9","x":9,"y":9},"j1":{"colour":"light","pos":"j1","x":10,"y":1},"j10":{"colour":"dark","pos":"j10","x":10,"y":10},"j2":{"colour":"dark","pos":"j2","x":10,"y":2},"j3":{"colour":"light","pos":"j3","x":10,"y":3},"j4":{"colour":"dark","pos":"j4","x":10,"y":4},"j5":{"colour":"light","pos":"j5","x":10,"y":5},"j6":{"colour":"dark","pos":"j6","x":10,"y":6},"j7":{"colour":"light","pos":"j7","x":10,"y":7},"j8":{"colour":"dark","pos":"j8","x":10,"y":8},"j9":{"colour":"light","pos":"j9","x":10,"y":9}},"light":{"a10":{"colour":"light","pos":"a10","x":1,"y":10},"a2":{"colour":"light","pos":"a2","x":1,"y":2},"a4":{"colour":"light","pos":"a4","x":1,"y":4},"a6":{"colour":"light","pos":"a6","x":1,"y":6},"a8":{"colour":"light","pos":"a8","x":1,"y":8},"b1":{"colour":"light","pos":"b1","x":2,"y":1},"b3":{"colour":"light","pos":"b3","x":2,"y":3},"b5":{"colour":"light","pos":"b5","x":2,"y":5},"b7":{"colour":"light","pos":"b7","x":2,"y":7},"b9":{"colour":"light","pos":"b9","x":2,"y":9},"c10":{"colour":"light","pos":"c10","x":3,"y":10},"c2":{"colour":"light","pos":"c2","x":3,"y":2},"c4":{"colour":"light","pos":"c4","x":3,"y":4},"c6":{"colour":"light","pos":"c6","x":3,"y":6},"c8":{"colour":"light","pos":"c8","x":3,"y":8},"d1":{"colour":"light","pos":"d1","x":4,"y":1},"d3":{"colour":"light","pos":"d3","x":4,"y":3},"d5":{"colour":"light","pos":"d5","x":4,"y":5},"d7":{"colour":"light","pos":"d7","x":4,"y":7},"d9":{"colour":"light","pos":"d9","x":4,"y":9},"e10":{"colour":"light","pos":"e10","x":5,"y":10},"e2":{"colour":"light","pos":"e2","x":5,"y":2},"e4":{"colour":"light","pos":"e4","x":5,"y":4},"e6":{"colour":"light","pos":"e6","x":5,"y":6},"e8":{"colour":"light","pos":"e8","x":5,"y":8},"f1":{"colour":"light","pos":"f1","x":6,"y":1},"f3":{"colour":"light","pos":"f3","x":6,"y":3},"f5":{"colour":"light","pos":"f5","x":6,"y":5},"f7":{"colour":"light","pos":"f7","x":6,"y":7},"f9":{"colour":"light","pos":"f9","x":6,"y":9},"g10":{"colour":"light","pos":"g10","x":7,"y":10},"g2":{"colour":"light","pos":"g2","x":7,"y":2},"g4":{"colour":"light","pos":"g4","x":7,"y":4},"g6":{"colour":"light","pos":"g6","x":7,"y":6},"g8":{"colour":"light","pos":"g8","x":7,"y":8},"h1":{"colour":"light","pos":"h1","x":8,"y":1},"h3":{"colour":"light","pos":"h3","x":8,"y":3},"h5":{"colour":"light","pos":"h5","x":8,"y":5},"h7":{"colour":"light","pos":"h7","x":8,"y":7},"h9":{"colour":"light","pos":"h9","x":8,"y":9},"i10":{"colour":"light","pos":"i10","x":9,"y":10},"i2":{"colour":"light","pos":"i2","x":9,"y":2},"i4":{"colour":"light","pos":"i4","x":9,"y":4},"i6":{"colour":"light","pos":"i6","x":9,"y":6},"i8":{"colour":"light","pos":"i8","x":9,"y":8},"j1":{"colour":"light","pos":"j1","x":10,"y":1},"j3":{"colour":"light","pos":"j3","x":10,"y":3},"j5":{"colour":"light","pos":"j5","x":10,"y":5},"j7":{"colour":"light","pos":"j7","x":10,"y":7},"j9":{"colour":"light","pos":"j9","x":10,"y":9}},"dark":{"a1":{"colour":"dark","pos":"a1","x":1,"y":1},"a3":{"colour":"dark","pos":"a3","x":1,"y":3},"a5":{"colour":"dark","pos":"a5","x":1,"y":5},"a7":{"colour":"dark","pos":"a7","x":1,"y":7},"a9":{"colour":"dark","pos":"a9","x":1,"y":9},"b10":{"colour":"dark","pos":"b10","x":2,"y":10},"b2":{"colour":"dark","pos":"b2","x":2,"y":2},"b4":{"colour":"dark","pos":"b4","x":2,"y":4},"b6":{"colour":"dark","pos":"b6","x":2,"y":6},"b8":{"colour":"dark","pos":"b8","x":2,"y":8},"c1":{"colour":"dark","pos":"c1","x":3,"y":1},"c3":{"colour":"dark","pos":"c3","x":3,"y":3},"c5":{"colour":"dark","pos":"c5","x":3,"y":5},"c7":{"colour":"dark","pos":"c7","x":3,"y":7},"c9":{"colour":"dark","pos":"c9","x":3,"y":9},"d10":{"colour":"dark","pos":"d10","x":4,"y":10},"d2":{"colour":"dark","pos":"d2","x":4,"y":2},"d4":{"colour":"dark","pos":"d4","x":4,"y":4},"d6":{"colour":"dark","pos":"d6","x":4,"y":6},"d8":{"colour":"dark","pos":"d8","x":4,"y":8},"e1":{"colour":"dark","pos":"e1","x":5,"y":1},"e3":{"colour":"dark","pos":"e3","x":5,"y":3},"e5":{"colour":"dark","pos":"e5","x":5,"y":5},"e7":{"colour":"dark","pos":"e7","x":5,"y":7},"e9":{"colour":"dark","pos":"e9","x":5,"y":9},"f10":{"colour":"dark","pos":"f10","x":6,"y":10},"f2":{"colour":"dark","pos":"f2","x":6,"y":2},"f4":{"colour":"dark","pos":"f4","x":6,"y":4},"f6":{"colour":"dark","pos":"f6","x":6,"y":6},"f8":{"colour":"dark","pos":"f8","x":6,"y":8},"g1":{"colour":"dark","pos":"g1","x":7,"y":1},"g3":{"colour":"dark","pos":"g3","x":7,"y":3},"g5":{"colour":"dark","pos":"g5","x":7,"y":5},"g7":{"colour":"dark","pos":"g7","x":7,"y":7},"g9":{"colour":"dark","pos":"g9","x":7,"y":9},"h10":{"colour":"dark","pos":"h10","x":8,"y":10},"h2":{"colour":"dark","pos":"h2","x":8,"y":2},"h4":{"colour":"dark","pos":"h4","x":8,"y":4},"h6":{"colour":"dark","pos":"h6","x":8,"y":6},"h8":{"colour":"dark","pos":"h8","x":8,"y":8},"i1":{"colour":"dark","pos":"i1","x":9,"y":1},"i3":{"colour":"dark","pos":"i3","x":9,"y":3},"i5":{"colour":"dark","pos":"i5","x":9,"y":5},"i7":{"colour":"dark","pos":"i7","x":9,"y":7},"i9":{"colour":"dark","pos":"i9","x":9,"y":9},"j10":{"colour":"dark","pos":"j10","x":10,"y":10},"j2":{"colour":"dark","pos":"j2","x":10,"y":2},"j4":{"colour":"dark","pos":"j4","x":10,"y":4},"j6":{"colour":"dark","pos":"j6","x":10,"y":6},"j8":{"colour":"dark","pos":"j8","x":10,"y":8}}};var relativedirs=[1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];var TERRAIN={};(function(){var ownernames=["neutral","my","opp"];var player=1;var otherplayer=2;game.selectunit1=function(turn,step,markpos){var ARTIFACTS={targets:Object.assign({},step.ARTIFACTS.targets)};var UNITLAYERS=step.UNITLAYERS;var MARKS={selectunit:markpos};var BLOCKS=UNITLAYERS.units;var STARTPOS=MARKS['selectunit'];var allwalkerdirs=[1,2,3,4,5,6,7,8];for(var walkerdirnbr=0;walkerdirnbr<8;walkerdirnbr++){var POS=STARTPOS;while((POS=connections[POS][allwalkerdirs[walkerdirnbr]])&&!BLOCKS[POS]){ARTIFACTS['targets'][POS]={};}}var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectunit'});turn.links[newstepid]={};var newlinks=turn.links[newstepid];for(var linkpos in ARTIFACTS.targets){newlinks[linkpos]='selectmovetarget1';}return newstep;};game.selectunit1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'Select where to move the amazon';};game.selectmovetarget1=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectmovetarget:markpos,selectunit:step.MARKS.selectunit};var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectmovetarget'});turn.links[newstepid]={};turn.links[newstepid].move='move1';return newstep;};game.selectmovetarget1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'Choose Move to go here!';};game.selectfiretarget1=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectfiretarget:markpos};var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectfiretarget'});turn.links[newstepid]={};turn.links[newstepid].fire='fire1';return newstep;};game.selectfiretarget1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'Choose Fire to shoot here!';};game.move1=function(turn,step){var ARTIFACTS={targets:Object.assign({},step.ARTIFACTS.targets)};var MARKS=step.MARKS;var UNITDATA=Object.assign({},step.UNITDATA);var UNITLAYERS=step.UNITLAYERS;var TURNVARS=Object.assign({},step.TURNVARS);var unitid=(UNITLAYERS.units[MARKS['selectunit']]||{}).id;if(unitid){UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{'pos':MARKS['selectmovetarget']});}TURNVARS['movedto']=MARKS['selectmovetarget'];MARKS={};UNITLAYERS={"queens":{},"myqueens":{},"oppqueens":{},"neutralqueens":{},"fires":{},"myfires":{},"oppfires":{},"neutralfires":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}ARTIFACTS={"targets":{}};var BLOCKS=UNITLAYERS.units;var STARTPOS=TURNVARS['movedto'];var allwalkerdirs=[1,2,3,4,5,6,7,8];for(var walkerdirnbr=0;walkerdirnbr<8;walkerdirnbr++){var POS=STARTPOS;while((POS=connections[POS][allwalkerdirs[walkerdirnbr]])&&!BLOCKS[POS]){ARTIFACTS['targets'][POS]={};}}var newstepid=step.stepid+'-'+'move';var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,stepid:newstepid,name:'move',path:step.path.concat('move'),TURNVARS:TURNVARS});turn.links[newstepid]={};var newlinks=turn.links[newstepid];for(var linkpos in ARTIFACTS.targets){newlinks[linkpos]='selectfiretarget1';}return newstep;};game.move1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'Now select where to fire at';};game.fire1=function(turn,step){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var MARKS=step.MARKS;var UNITDATA=Object.assign({},step.UNITDATA);var clones=step.clones;var UNITLAYERS=step.UNITLAYERS;var TURNVARS=Object.assign({},step.TURNVARS);var newunitid='spawn'+clones++;UNITDATA[newunitid]={pos:MARKS['selectfiretarget'],id:newunitid,group:'fires',owner:0,from:TURNVARS['movedto']};MARKS={};UNITLAYERS={"queens":{},"myqueens":{},"oppqueens":{},"neutralqueens":{},"fires":{},"myfires":{},"oppfires":{},"neutralfires":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}ARTIFACTS={"targets":{}};var newstepid=step.stepid+'-'+'fire';var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,stepid:newstepid,name:'fire',path:step.path.concat('fire'),clones:clones,TURNVARS:TURNVARS});turn.links[newstepid]={};turn.links[newstepid].endturn="start"+otherplayer;return newstep;};game.fire1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.start1=function(turn,step){var turn={steps:{},player:player,turn:turn.turn+1,links:{root:{}}};var MARKS={};var ARTIFACTS={"targets":{}};var UNITDATA=step.UNITDATA;var TURNVARS={};var UNITLAYERS={"queens":{},"myqueens":{},"oppqueens":{},"neutralqueens":{},"fires":{},"myfires":{},"oppfires":{},"neutralfires":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}var newstep=turn.steps.root={ARTIFACTS:ARTIFACTS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,MARKS:MARKS,stepid:'root',name:'start',clones:step.clones,path:[],TURNVARS:TURNVARS};var newlinks=turn.links.root;for(var linkpos in UNITLAYERS.myunits){newlinks[linkpos]='selectunit1';}return turn;};game.start1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'Select an amazon to move and fire with';};game.brain_Steve_1=function(step){var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;ARTIFACTS.myroads={};ARTIFACTS.opproads={};ARTIFACTS.myreach={};ARTIFACTS.oppreach={};for(var STARTPOS in UNITLAYERS.queens){var neighbourdirs=[1,2,3,4,5,6,7,8];var foundneighbours=[];var startconnections=connections[STARTPOS];for(var dirnbr=0;dirnbr<8;dirnbr++){var POS=startconnections[neighbourdirs[dirnbr]];if(POS&&!UNITLAYERS.units[POS]){foundneighbours.push(POS);}}var NEIGHBOURCOUNT=foundneighbours.length;ARTIFACTS[!!UNITLAYERS.myunits[STARTPOS]?'myroads':'opproads'][STARTPOS]={count:NEIGHBOURCOUNT};}var BLOCKS=UNITLAYERS.units;var walkstarts=UNITLAYERS.queens;for(var STARTPOS in walkstarts){var allwalkerdirs=[1,2,3,4,5,6,7,8];for(var walkerdirnbr=0;walkerdirnbr<8;walkerdirnbr++){var POS=STARTPOS;while((POS=connections[POS][allwalkerdirs[walkerdirnbr]])&&!BLOCKS[POS]){ARTIFACTS[!!UNITLAYERS.myunits[STARTPOS]?'myreach':'oppreach'][POS]={};}}}return reduce(ARTIFACTS.myroads,function(mem,obj){return mem+obj['count'];},0)+Object.keys(ARTIFACTS.myreach).length-reduce(ARTIFACTS.opproads,function(mem,obj){return mem+obj['count'];},0)-Object.keys(ARTIFACTS.oppreach).length;};game.brain_Steve_1_detailed=function(step){var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;ARTIFACTS.myroads={};ARTIFACTS.opproads={};ARTIFACTS.myreach={};ARTIFACTS.oppreach={};for(var STARTPOS in UNITLAYERS.queens){var neighbourdirs=[1,2,3,4,5,6,7,8];var foundneighbours=[];var startconnections=connections[STARTPOS];for(var dirnbr=0;dirnbr<8;dirnbr++){var POS=startconnections[neighbourdirs[dirnbr]];if(POS&&!UNITLAYERS.units[POS]){foundneighbours.push(POS);}}var NEIGHBOURCOUNT=foundneighbours.length;ARTIFACTS[!!UNITLAYERS.myunits[STARTPOS]?'myroads':'opproads'][STARTPOS]={count:NEIGHBOURCOUNT};}var BLOCKS=UNITLAYERS.units;var walkstarts=UNITLAYERS.queens;for(var STARTPOS in walkstarts){var allwalkerdirs=[1,2,3,4,5,6,7,8];for(var walkerdirnbr=0;walkerdirnbr<8;walkerdirnbr++){var POS=STARTPOS;while((POS=connections[POS][allwalkerdirs[walkerdirnbr]])&&!BLOCKS[POS]){ARTIFACTS[!!UNITLAYERS.myunits[STARTPOS]?'myreach':'oppreach'][POS]={};}}}return{myroads:reduce(ARTIFACTS.myroads,function(mem,obj){return mem+obj['count'];},0),mydomain:Object.keys(ARTIFACTS.myreach).length,opproads:-reduce(ARTIFACTS.opproads,function(mem,obj){return mem+obj['count'];},0),oppdomain:-Object.keys(ARTIFACTS.oppreach).length};};game.debug1=function(){return{TERRAIN:TERRAIN};};})();(function(){var ownernames=["neutral","opp","my"];var player=2;var otherplayer=1;game.selectunit2=function(turn,step,markpos){var ARTIFACTS={targets:Object.assign({},step.ARTIFACTS.targets)};var UNITLAYERS=step.UNITLAYERS;var MARKS={selectunit:markpos};var BLOCKS=UNITLAYERS.units;var STARTPOS=MARKS['selectunit'];var allwalkerdirs=[1,2,3,4,5,6,7,8];for(var walkerdirnbr=0;walkerdirnbr<8;walkerdirnbr++){var POS=STARTPOS;while((POS=connections[POS][allwalkerdirs[walkerdirnbr]])&&!BLOCKS[POS]){ARTIFACTS['targets'][POS]={};}}var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectunit'});turn.links[newstepid]={};var newlinks=turn.links[newstepid];for(var linkpos in ARTIFACTS.targets){newlinks[linkpos]='selectmovetarget2';}return newstep;};game.selectunit2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'Select where to move the amazon';};game.selectmovetarget2=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectmovetarget:markpos,selectunit:step.MARKS.selectunit};var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectmovetarget'});turn.links[newstepid]={};turn.links[newstepid].move='move2';return newstep;};game.selectmovetarget2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'Choose Move to go here!';};game.selectfiretarget2=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectfiretarget:markpos};var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectfiretarget'});turn.links[newstepid]={};turn.links[newstepid].fire='fire2';return newstep;};game.selectfiretarget2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'Choose Fire to shoot here!';};game.move2=function(turn,step){var ARTIFACTS={targets:Object.assign({},step.ARTIFACTS.targets)};var MARKS=step.MARKS;var UNITDATA=Object.assign({},step.UNITDATA);var UNITLAYERS=step.UNITLAYERS;var TURNVARS=Object.assign({},step.TURNVARS);var unitid=(UNITLAYERS.units[MARKS['selectunit']]||{}).id;if(unitid){UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{'pos':MARKS['selectmovetarget']});}TURNVARS['movedto']=MARKS['selectmovetarget'];MARKS={};UNITLAYERS={"queens":{},"myqueens":{},"oppqueens":{},"neutralqueens":{},"fires":{},"myfires":{},"oppfires":{},"neutralfires":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}ARTIFACTS={"targets":{}};var BLOCKS=UNITLAYERS.units;var STARTPOS=TURNVARS['movedto'];var allwalkerdirs=[1,2,3,4,5,6,7,8];for(var walkerdirnbr=0;walkerdirnbr<8;walkerdirnbr++){var POS=STARTPOS;while((POS=connections[POS][allwalkerdirs[walkerdirnbr]])&&!BLOCKS[POS]){ARTIFACTS['targets'][POS]={};}}var newstepid=step.stepid+'-'+'move';var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,stepid:newstepid,name:'move',path:step.path.concat('move'),TURNVARS:TURNVARS});turn.links[newstepid]={};var newlinks=turn.links[newstepid];for(var linkpos in ARTIFACTS.targets){newlinks[linkpos]='selectfiretarget2';}return newstep;};game.move2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'Now select where to fire at';};game.fire2=function(turn,step){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var MARKS=step.MARKS;var UNITDATA=Object.assign({},step.UNITDATA);var clones=step.clones;var UNITLAYERS=step.UNITLAYERS;var TURNVARS=Object.assign({},step.TURNVARS);var newunitid='spawn'+clones++;UNITDATA[newunitid]={pos:MARKS['selectfiretarget'],id:newunitid,group:'fires',owner:0,from:TURNVARS['movedto']};MARKS={};UNITLAYERS={"queens":{},"myqueens":{},"oppqueens":{},"neutralqueens":{},"fires":{},"myfires":{},"oppfires":{},"neutralfires":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}ARTIFACTS={"targets":{}};var newstepid=step.stepid+'-'+'fire';var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,stepid:newstepid,name:'fire',path:step.path.concat('fire'),clones:clones,TURNVARS:TURNVARS});turn.links[newstepid]={};turn.links[newstepid].endturn="start"+otherplayer;return newstep;};game.fire2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.start2=function(turn,step){var turn={steps:{},player:player,turn:turn.turn+1,links:{root:{}}};var MARKS={};var ARTIFACTS={"targets":{}};var UNITDATA=step.UNITDATA;var TURNVARS={};var UNITLAYERS={"queens":{},"myqueens":{},"oppqueens":{},"neutralqueens":{},"fires":{},"myfires":{},"oppfires":{},"neutralfires":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}var newstep=turn.steps.root={ARTIFACTS:ARTIFACTS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,MARKS:MARKS,stepid:'root',name:'start',clones:step.clones,path:[],TURNVARS:TURNVARS};var newlinks=turn.links.root;for(var linkpos in UNITLAYERS.myunits){newlinks[linkpos]='selectunit2';}return turn;};game.start2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'Select an amazon to move and fire with';};game.brain_Steve_2=function(step){var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;ARTIFACTS.myroads={};ARTIFACTS.opproads={};ARTIFACTS.myreach={};ARTIFACTS.oppreach={};for(var STARTPOS in UNITLAYERS.queens){var neighbourdirs=[1,2,3,4,5,6,7,8];var foundneighbours=[];var startconnections=connections[STARTPOS];for(var dirnbr=0;dirnbr<8;dirnbr++){var POS=startconnections[neighbourdirs[dirnbr]];if(POS&&!UNITLAYERS.units[POS]){foundneighbours.push(POS);}}var NEIGHBOURCOUNT=foundneighbours.length;ARTIFACTS[!!UNITLAYERS.myunits[STARTPOS]?'myroads':'opproads'][STARTPOS]={count:NEIGHBOURCOUNT};}var BLOCKS=UNITLAYERS.units;var walkstarts=UNITLAYERS.queens;for(var STARTPOS in walkstarts){var allwalkerdirs=[1,2,3,4,5,6,7,8];for(var walkerdirnbr=0;walkerdirnbr<8;walkerdirnbr++){var POS=STARTPOS;while((POS=connections[POS][allwalkerdirs[walkerdirnbr]])&&!BLOCKS[POS]){ARTIFACTS[!!UNITLAYERS.myunits[STARTPOS]?'myreach':'oppreach'][POS]={};}}}return reduce(ARTIFACTS.myroads,function(mem,obj){return mem+obj['count'];},0)+Object.keys(ARTIFACTS.myreach).length-reduce(ARTIFACTS.opproads,function(mem,obj){return mem+obj['count'];},0)-Object.keys(ARTIFACTS.oppreach).length;};game.brain_Steve_2_detailed=function(step){var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;ARTIFACTS.myroads={};ARTIFACTS.opproads={};ARTIFACTS.myreach={};ARTIFACTS.oppreach={};for(var STARTPOS in UNITLAYERS.queens){var neighbourdirs=[1,2,3,4,5,6,7,8];var foundneighbours=[];var startconnections=connections[STARTPOS];for(var dirnbr=0;dirnbr<8;dirnbr++){var POS=startconnections[neighbourdirs[dirnbr]];if(POS&&!UNITLAYERS.units[POS]){foundneighbours.push(POS);}}var NEIGHBOURCOUNT=foundneighbours.length;ARTIFACTS[!!UNITLAYERS.myunits[STARTPOS]?'myroads':'opproads'][STARTPOS]={count:NEIGHBOURCOUNT};}var BLOCKS=UNITLAYERS.units;var walkstarts=UNITLAYERS.queens;for(var STARTPOS in walkstarts){var allwalkerdirs=[1,2,3,4,5,6,7,8];for(var walkerdirnbr=0;walkerdirnbr<8;walkerdirnbr++){var POS=STARTPOS;while((POS=connections[POS][allwalkerdirs[walkerdirnbr]])&&!BLOCKS[POS]){ARTIFACTS[!!UNITLAYERS.myunits[STARTPOS]?'myreach':'oppreach'][POS]={};}}}return{myroads:reduce(ARTIFACTS.myroads,function(mem,obj){return mem+obj['count'];},0),mydomain:Object.keys(ARTIFACTS.myreach).length,opproads:-reduce(ARTIFACTS.opproads,function(mem,obj){return mem+obj['count'];},0),oppdomain:-Object.keys(ARTIFACTS.oppreach).length};};game.debug2=function(){return{TERRAIN:TERRAIN};};})();function reduce(coll,iterator,acc){for(var key in coll){acc=iterator(acc,coll[key],key);}return acc;}game.newGame=function(){var turnseed={turn:0};var stepseed={UNITDATA:{"unit1":{"pos":"d10","id":"unit1","group":"queens","owner":1},"unit2":{"pos":"g10","id":"unit2","group":"queens","owner":1},"unit3":{"pos":"a7","id":"unit3","group":"queens","owner":1},"unit4":{"pos":"j7","id":"unit4","group":"queens","owner":1},"unit5":{"pos":"a4","id":"unit5","group":"queens","owner":2},"unit6":{"pos":"d1","id":"unit6","group":"queens","owner":2},"unit7":{"pos":"g1","id":"unit7","group":"queens","owner":2},"unit8":{"pos":"j4","id":"unit8","group":"queens","owner":2}},TURNVARS:{},clones:0};return game.start1(turnseed,stepseed);};game.debug=function(){return{BOARD:BOARD,connections:connections,plr1:game.debug1(),plr2:game.debug2()};};game.commands={"move":1,"fire":1};game.graphics={"icons":{"queens":"queens","fires":"pawns"}};game.board={"height":10,"width":10};game.AI=["Steve"];game.id="amazon";return game;}(),aries:function(){var game={};var connections={"faux":{},"a1":{"1":"a2","2":"b2","3":"b1"},"a2":{"1":"a3","2":"b3","3":"b2","4":"b1","5":"a1"},"a3":{"1":"a4","2":"b4","3":"b3","4":"b2","5":"a2"},"a4":{"1":"a5","2":"b5","3":"b4","4":"b3","5":"a3"},"a5":{"1":"a6","2":"b6","3":"b5","4":"b4","5":"a4"},"a6":{"1":"a7","2":"b7","3":"b6","4":"b5","5":"a5"},"a7":{"1":"a8","2":"b8","3":"b7","4":"b6","5":"a6"},"a8":{"3":"b8","4":"b7","5":"a7"},"b1":{"1":"b2","2":"c2","3":"c1","7":"a1","8":"a2"},"b2":{"1":"b3","2":"c3","3":"c2","4":"c1","5":"b1","6":"a1","7":"a2","8":"a3"},"b3":{"1":"b4","2":"c4","3":"c3","4":"c2","5":"b2","6":"a2","7":"a3","8":"a4"},"b4":{"1":"b5","2":"c5","3":"c4","4":"c3","5":"b3","6":"a3","7":"a4","8":"a5"},"b5":{"1":"b6","2":"c6","3":"c5","4":"c4","5":"b4","6":"a4","7":"a5","8":"a6"},"b6":{"1":"b7","2":"c7","3":"c6","4":"c5","5":"b5","6":"a5","7":"a6","8":"a7"},"b7":{"1":"b8","2":"c8","3":"c7","4":"c6","5":"b6","6":"a6","7":"a7","8":"a8"},"b8":{"3":"c8","4":"c7","5":"b7","6":"a7","7":"a8"},"c1":{"1":"c2","2":"d2","3":"d1","7":"b1","8":"b2"},"c2":{"1":"c3","2":"d3","3":"d2","4":"d1","5":"c1","6":"b1","7":"b2","8":"b3"},"c3":{"1":"c4","2":"d4","3":"d3","4":"d2","5":"c2","6":"b2","7":"b3","8":"b4"},"c4":{"1":"c5","2":"d5","3":"d4","4":"d3","5":"c3","6":"b3","7":"b4","8":"b5"},"c5":{"1":"c6","2":"d6","3":"d5","4":"d4","5":"c4","6":"b4","7":"b5","8":"b6"},"c6":{"1":"c7","2":"d7","3":"d6","4":"d5","5":"c5","6":"b5","7":"b6","8":"b7"},"c7":{"1":"c8","2":"d8","3":"d7","4":"d6","5":"c6","6":"b6","7":"b7","8":"b8"},"c8":{"3":"d8","4":"d7","5":"c7","6":"b7","7":"b8"},"d1":{"1":"d2","2":"e2","3":"e1","7":"c1","8":"c2"},"d2":{"1":"d3","2":"e3","3":"e2","4":"e1","5":"d1","6":"c1","7":"c2","8":"c3"},"d3":{"1":"d4","2":"e4","3":"e3","4":"e2","5":"d2","6":"c2","7":"c3","8":"c4"},"d4":{"1":"d5","2":"e5","3":"e4","4":"e3","5":"d3","6":"c3","7":"c4","8":"c5"},"d5":{"1":"d6","2":"e6","3":"e5","4":"e4","5":"d4","6":"c4","7":"c5","8":"c6"},"d6":{"1":"d7","2":"e7","3":"e6","4":"e5","5":"d5","6":"c5","7":"c6","8":"c7"},"d7":{"1":"d8","2":"e8","3":"e7","4":"e6","5":"d6","6":"c6","7":"c7","8":"c8"},"d8":{"3":"e8","4":"e7","5":"d7","6":"c7","7":"c8"},"e1":{"1":"e2","2":"f2","3":"f1","7":"d1","8":"d2"},"e2":{"1":"e3","2":"f3","3":"f2","4":"f1","5":"e1","6":"d1","7":"d2","8":"d3"},"e3":{"1":"e4","2":"f4","3":"f3","4":"f2","5":"e2","6":"d2","7":"d3","8":"d4"},"e4":{"1":"e5","2":"f5","3":"f4","4":"f3","5":"e3","6":"d3","7":"d4","8":"d5"},"e5":{"1":"e6","2":"f6","3":"f5","4":"f4","5":"e4","6":"d4","7":"d5","8":"d6"},"e6":{"1":"e7","2":"f7","3":"f6","4":"f5","5":"e5","6":"d5","7":"d6","8":"d7"},"e7":{"1":"e8","2":"f8","3":"f7","4":"f6","5":"e6","6":"d6","7":"d7","8":"d8"},"e8":{"3":"f8","4":"f7","5":"e7","6":"d7","7":"d8"},"f1":{"1":"f2","2":"g2","3":"g1","7":"e1","8":"e2"},"f2":{"1":"f3","2":"g3","3":"g2","4":"g1","5":"f1","6":"e1","7":"e2","8":"e3"},"f3":{"1":"f4","2":"g4","3":"g3","4":"g2","5":"f2","6":"e2","7":"e3","8":"e4"},"f4":{"1":"f5","2":"g5","3":"g4","4":"g3","5":"f3","6":"e3","7":"e4","8":"e5"},"f5":{"1":"f6","2":"g6","3":"g5","4":"g4","5":"f4","6":"e4","7":"e5","8":"e6"},"f6":{"1":"f7","2":"g7","3":"g6","4":"g5","5":"f5","6":"e5","7":"e6","8":"e7"},"f7":{"1":"f8","2":"g8","3":"g7","4":"g6","5":"f6","6":"e6","7":"e7","8":"e8"},"f8":{"3":"g8","4":"g7","5":"f7","6":"e7","7":"e8"},"g1":{"1":"g2","2":"h2","3":"h1","7":"f1","8":"f2"},"g2":{"1":"g3","2":"h3","3":"h2","4":"h1","5":"g1","6":"f1","7":"f2","8":"f3"},"g3":{"1":"g4","2":"h4","3":"h3","4":"h2","5":"g2","6":"f2","7":"f3","8":"f4"},"g4":{"1":"g5","2":"h5","3":"h4","4":"h3","5":"g3","6":"f3","7":"f4","8":"f5"},"g5":{"1":"g6","2":"h6","3":"h5","4":"h4","5":"g4","6":"f4","7":"f5","8":"f6"},"g6":{"1":"g7","2":"h7","3":"h6","4":"h5","5":"g5","6":"f5","7":"f6","8":"f7"},"g7":{"1":"g8","2":"h8","3":"h7","4":"h6","5":"g6","6":"f6","7":"f7","8":"f8"},"g8":{"3":"h8","4":"h7","5":"g7","6":"f7","7":"f8"},"h1":{"1":"h2","7":"g1","8":"g2"},"h2":{"1":"h3","5":"h1","6":"g1","7":"g2","8":"g3"},"h3":{"1":"h4","5":"h2","6":"g2","7":"g3","8":"g4"},"h4":{"1":"h5","5":"h3","6":"g3","7":"g4","8":"g5"},"h5":{"1":"h6","5":"h4","6":"g4","7":"g5","8":"g6"},"h6":{"1":"h7","5":"h5","6":"g5","7":"g6","8":"g7"},"h7":{"1":"h8","5":"h6","6":"g6","7":"g7","8":"g8"},"h8":{"5":"h7","6":"g7","7":"g8"}};var BOARD={"board":{"a1":{"colour":"dark","pos":"a1","x":1,"y":1},"a2":{"colour":"light","pos":"a2","x":1,"y":2},"a3":{"colour":"dark","pos":"a3","x":1,"y":3},"a4":{"colour":"light","pos":"a4","x":1,"y":4},"a5":{"colour":"dark","pos":"a5","x":1,"y":5},"a6":{"colour":"light","pos":"a6","x":1,"y":6},"a7":{"colour":"dark","pos":"a7","x":1,"y":7},"a8":{"colour":"light","pos":"a8","x":1,"y":8},"b1":{"colour":"light","pos":"b1","x":2,"y":1},"b2":{"colour":"dark","pos":"b2","x":2,"y":2},"b3":{"colour":"light","pos":"b3","x":2,"y":3},"b4":{"colour":"dark","pos":"b4","x":2,"y":4},"b5":{"colour":"light","pos":"b5","x":2,"y":5},"b6":{"colour":"dark","pos":"b6","x":2,"y":6},"b7":{"colour":"light","pos":"b7","x":2,"y":7},"b8":{"colour":"dark","pos":"b8","x":2,"y":8},"c1":{"colour":"dark","pos":"c1","x":3,"y":1},"c2":{"colour":"light","pos":"c2","x":3,"y":2},"c3":{"colour":"dark","pos":"c3","x":3,"y":3},"c4":{"colour":"light","pos":"c4","x":3,"y":4},"c5":{"colour":"dark","pos":"c5","x":3,"y":5},"c6":{"colour":"light","pos":"c6","x":3,"y":6},"c7":{"colour":"dark","pos":"c7","x":3,"y":7},"c8":{"colour":"light","pos":"c8","x":3,"y":8},"d1":{"colour":"light","pos":"d1","x":4,"y":1},"d2":{"colour":"dark","pos":"d2","x":4,"y":2},"d3":{"colour":"light","pos":"d3","x":4,"y":3},"d4":{"colour":"dark","pos":"d4","x":4,"y":4},"d5":{"colour":"light","pos":"d5","x":4,"y":5},"d6":{"colour":"dark","pos":"d6","x":4,"y":6},"d7":{"colour":"light","pos":"d7","x":4,"y":7},"d8":{"colour":"dark","pos":"d8","x":4,"y":8},"e1":{"colour":"dark","pos":"e1","x":5,"y":1},"e2":{"colour":"light","pos":"e2","x":5,"y":2},"e3":{"colour":"dark","pos":"e3","x":5,"y":3},"e4":{"colour":"light","pos":"e4","x":5,"y":4},"e5":{"colour":"dark","pos":"e5","x":5,"y":5},"e6":{"colour":"light","pos":"e6","x":5,"y":6},"e7":{"colour":"dark","pos":"e7","x":5,"y":7},"e8":{"colour":"light","pos":"e8","x":5,"y":8},"f1":{"colour":"light","pos":"f1","x":6,"y":1},"f2":{"colour":"dark","pos":"f2","x":6,"y":2},"f3":{"colour":"light","pos":"f3","x":6,"y":3},"f4":{"colour":"dark","pos":"f4","x":6,"y":4},"f5":{"colour":"light","pos":"f5","x":6,"y":5},"f6":{"colour":"dark","pos":"f6","x":6,"y":6},"f7":{"colour":"light","pos":"f7","x":6,"y":7},"f8":{"colour":"dark","pos":"f8","x":6,"y":8},"g1":{"colour":"dark","pos":"g1","x":7,"y":1},"g2":{"colour":"light","pos":"g2","x":7,"y":2},"g3":{"colour":"dark","pos":"g3","x":7,"y":3},"g4":{"colour":"light","pos":"g4","x":7,"y":4},"g5":{"colour":"dark","pos":"g5","x":7,"y":5},"g6":{"colour":"light","pos":"g6","x":7,"y":6},"g7":{"colour":"dark","pos":"g7","x":7,"y":7},"g8":{"colour":"light","pos":"g8","x":7,"y":8},"h1":{"colour":"light","pos":"h1","x":8,"y":1},"h2":{"colour":"dark","pos":"h2","x":8,"y":2},"h3":{"colour":"light","pos":"h3","x":8,"y":3},"h4":{"colour":"dark","pos":"h4","x":8,"y":4},"h5":{"colour":"light","pos":"h5","x":8,"y":5},"h6":{"colour":"dark","pos":"h6","x":8,"y":6},"h7":{"colour":"light","pos":"h7","x":8,"y":7},"h8":{"colour":"dark","pos":"h8","x":8,"y":8}},"light":{"a2":{"colour":"light","pos":"a2","x":1,"y":2},"a4":{"colour":"light","pos":"a4","x":1,"y":4},"a6":{"colour":"light","pos":"a6","x":1,"y":6},"a8":{"colour":"light","pos":"a8","x":1,"y":8},"b1":{"colour":"light","pos":"b1","x":2,"y":1},"b3":{"colour":"light","pos":"b3","x":2,"y":3},"b5":{"colour":"light","pos":"b5","x":2,"y":5},"b7":{"colour":"light","pos":"b7","x":2,"y":7},"c2":{"colour":"light","pos":"c2","x":3,"y":2},"c4":{"colour":"light","pos":"c4","x":3,"y":4},"c6":{"colour":"light","pos":"c6","x":3,"y":6},"c8":{"colour":"light","pos":"c8","x":3,"y":8},"d1":{"colour":"light","pos":"d1","x":4,"y":1},"d3":{"colour":"light","pos":"d3","x":4,"y":3},"d5":{"colour":"light","pos":"d5","x":4,"y":5},"d7":{"colour":"light","pos":"d7","x":4,"y":7},"e2":{"colour":"light","pos":"e2","x":5,"y":2},"e4":{"colour":"light","pos":"e4","x":5,"y":4},"e6":{"colour":"light","pos":"e6","x":5,"y":6},"e8":{"colour":"light","pos":"e8","x":5,"y":8},"f1":{"colour":"light","pos":"f1","x":6,"y":1},"f3":{"colour":"light","pos":"f3","x":6,"y":3},"f5":{"colour":"light","pos":"f5","x":6,"y":5},"f7":{"colour":"light","pos":"f7","x":6,"y":7},"g2":{"colour":"light","pos":"g2","x":7,"y":2},"g4":{"colour":"light","pos":"g4","x":7,"y":4},"g6":{"colour":"light","pos":"g6","x":7,"y":6},"g8":{"colour":"light","pos":"g8","x":7,"y":8},"h1":{"colour":"light","pos":"h1","x":8,"y":1},"h3":{"colour":"light","pos":"h3","x":8,"y":3},"h5":{"colour":"light","pos":"h5","x":8,"y":5},"h7":{"colour":"light","pos":"h7","x":8,"y":7}},"dark":{"a1":{"colour":"dark","pos":"a1","x":1,"y":1},"a3":{"colour":"dark","pos":"a3","x":1,"y":3},"a5":{"colour":"dark","pos":"a5","x":1,"y":5},"a7":{"colour":"dark","pos":"a7","x":1,"y":7},"b2":{"colour":"dark","pos":"b2","x":2,"y":2},"b4":{"colour":"dark","pos":"b4","x":2,"y":4},"b6":{"colour":"dark","pos":"b6","x":2,"y":6},"b8":{"colour":"dark","pos":"b8","x":2,"y":8},"c1":{"colour":"dark","pos":"c1","x":3,"y":1},"c3":{"colour":"dark","pos":"c3","x":3,"y":3},"c5":{"colour":"dark","pos":"c5","x":3,"y":5},"c7":{"colour":"dark","pos":"c7","x":3,"y":7},"d2":{"colour":"dark","pos":"d2","x":4,"y":2},"d4":{"colour":"dark","pos":"d4","x":4,"y":4},"d6":{"colour":"dark","pos":"d6","x":4,"y":6},"d8":{"colour":"dark","pos":"d8","x":4,"y":8},"e1":{"colour":"dark","pos":"e1","x":5,"y":1},"e3":{"colour":"dark","pos":"e3","x":5,"y":3},"e5":{"colour":"dark","pos":"e5","x":5,"y":5},"e7":{"colour":"dark","pos":"e7","x":5,"y":7},"f2":{"colour":"dark","pos":"f2","x":6,"y":2},"f4":{"colour":"dark","pos":"f4","x":6,"y":4},"f6":{"colour":"dark","pos":"f6","x":6,"y":6},"f8":{"colour":"dark","pos":"f8","x":6,"y":8},"g1":{"colour":"dark","pos":"g1","x":7,"y":1},"g3":{"colour":"dark","pos":"g3","x":7,"y":3},"g5":{"colour":"dark","pos":"g5","x":7,"y":5},"g7":{"colour":"dark","pos":"g7","x":7,"y":7},"h2":{"colour":"dark","pos":"h2","x":8,"y":2},"h4":{"colour":"dark","pos":"h4","x":8,"y":4},"h6":{"colour":"dark","pos":"h6","x":8,"y":6},"h8":{"colour":"dark","pos":"h8","x":8,"y":8}}};var relativedirs=[1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];(function(){var TERRAIN={"corner":{"a1":{"pos":"a1","owner":1},"h8":{"pos":"h8","owner":2}},"mycorner":{"a1":{"pos":"a1","owner":1}},"oppcorner":{"h8":{"pos":"h8","owner":2}}};var ownernames=["neutral","my","opp"];var player=1;var otherplayer=2;game.selectunit1=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{movetargets:Object.assign({},step.ARTIFACTS.movetargets)});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectunit:markpos};var BLOCKS=UNITLAYERS.units;var STARTPOS=MARKS['selectunit'];var allwalkerdirs=[1,3,5,7];for(var walkerdirnbr=0;walkerdirnbr<4;walkerdirnbr++){var DIR=allwalkerdirs[walkerdirnbr];var POS=STARTPOS;while((POS=connections[POS][DIR])&&!BLOCKS[POS]){ARTIFACTS['movetargets'][POS]={};}if(BLOCKS[POS]){if(UNITLAYERS.oppunits[POS]){ARTIFACTS['movetargets'][POS]={dir:DIR};}}}var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectunit'});turn.links[newstepid]={};var newlinks=turn.links[newstepid];for(var linkpos in ARTIFACTS.movetargets){newlinks[linkpos]='selectmovetarget1';}return newstep;};game.selectunit1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.selectmovetarget1=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{beingpushed:Object.assign({},step.ARTIFACTS.beingpushed),squished:Object.assign({},step.ARTIFACTS.squished)});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectmovetarget:markpos,selectunit:step.MARKS.selectunit};if(!!UNITLAYERS.oppunits[MARKS['selectmovetarget']]){var allowedsteps=UNITLAYERS.oppunits;var BLOCKS=UNITLAYERS.myunits;var STARTPOS=MARKS['selectmovetarget'];var DIR=relativedirs[(ARTIFACTS.movetargets[MARKS['selectmovetarget']]||{})['dir']-2+1];var walkedsquares=[];var STOPREASON="";var POS="faux";connections.faux[DIR]=STARTPOS;while(!(STOPREASON=!(POS=connections[POS][relativedirs[(ARTIFACTS.movetargets[MARKS['selectmovetarget']]||{})['dir']-2+1]])?"outofbounds":BLOCKS[POS]?"hitblock":!allowedsteps[POS]?"nomoresteps":null)){walkedsquares.push(POS);ARTIFACTS['beingpushed'][POS]={};}var WALKLENGTH=walkedsquares.length;if(WALKLENGTH){if(['hitblock','outofbounds'].indexOf(STOPREASON)!==-1){ARTIFACTS['squished'][walkedsquares[WALKLENGTH-1]]={};}}}var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectmovetarget'});turn.links[newstepid]={};turn.links[newstepid].move='move1';return newstep;};game.selectmovetarget1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.move1=function(turn,step){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var MARKS=step.MARKS;var UNITDATA=Object.assign({},step.UNITDATA);var UNITLAYERS=step.UNITLAYERS;var LOOPID;for(var POS in ARTIFACTS.beingpushed){if(LOOPID=(UNITLAYERS.units[POS]||{}).id){var pushid=LOOPID;var pushdir=(ARTIFACTS.movetargets[MARKS['selectmovetarget']]||{})['dir'];var dist=1;var newpos=UNITDATA[pushid].pos;while(dist&&connections[newpos][pushdir]){newpos=connections[newpos][pushdir];dist--;}UNITDATA[pushid]=Object.assign({},UNITDATA[pushid],{pos:newpos});}}var LOOPID;for(var POS in ARTIFACTS.squished){if(LOOPID=(UNITLAYERS.units[POS]||{}).id){delete UNITDATA[LOOPID];}}var unitid=(UNITLAYERS.units[MARKS['selectunit']]||{}).id;if(unitid){UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{'pos':MARKS['selectmovetarget']});}MARKS={};UNITLAYERS={"soldiers":{},"mysoldiers":{},"oppsoldiers":{},"neutralsoldiers":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}ARTIFACTS={"movetargets":{},"beingpushed":{},"squished":{}};var newstepid=step.stepid+'-'+'move';var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,stepid:newstepid,name:'move',path:step.path.concat('move')});turn.links[newstepid]={};if(Object.keys(function(){var ret={},s0=TERRAIN.oppcorner,s1=UNITLAYERS.myunits;for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}()||{}).length!==0){var winner=1;var result=winner===1?'win':winner?'lose':'draw';turn.links[newstepid][result]='invade';}else turn.links[newstepid].endturn="start"+otherplayer;return newstep;};game.move1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.start1=function(turn,step){var turn={steps:{},player:player,turn:turn.turn+1,links:{root:{}}};var MARKS={};var ARTIFACTS={"movetargets":{},"beingpushed":{},"squished":{}};var UNITDATA=step.UNITDATA;var UNITLAYERS={"soldiers":{},"mysoldiers":{},"oppsoldiers":{},"neutralsoldiers":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}var newstep=turn.steps.root={ARTIFACTS:ARTIFACTS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,MARKS:MARKS,stepid:'root',name:'start',path:[]};var newlinks=turn.links.root;for(var linkpos in UNITLAYERS.myunits){newlinks[linkpos]='selectunit1';}return turn;};game.start1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.debug1=function(){return{TERRAIN:TERRAIN};};})();(function(){var TERRAIN={"corner":{"a1":{"pos":"a1","owner":1},"h8":{"pos":"h8","owner":2}},"oppcorner":{"a1":{"pos":"a1","owner":1}},"mycorner":{"h8":{"pos":"h8","owner":2}}};var ownernames=["neutral","opp","my"];var player=2;var otherplayer=1;game.selectunit2=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{movetargets:Object.assign({},step.ARTIFACTS.movetargets)});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectunit:markpos};var BLOCKS=UNITLAYERS.units;var STARTPOS=MARKS['selectunit'];var allwalkerdirs=[1,3,5,7];for(var walkerdirnbr=0;walkerdirnbr<4;walkerdirnbr++){var DIR=allwalkerdirs[walkerdirnbr];var POS=STARTPOS;while((POS=connections[POS][DIR])&&!BLOCKS[POS]){ARTIFACTS['movetargets'][POS]={};}if(BLOCKS[POS]){if(UNITLAYERS.oppunits[POS]){ARTIFACTS['movetargets'][POS]={dir:DIR};}}}var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectunit'});turn.links[newstepid]={};var newlinks=turn.links[newstepid];for(var linkpos in ARTIFACTS.movetargets){newlinks[linkpos]='selectmovetarget2';}return newstep;};game.selectunit2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.selectmovetarget2=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{beingpushed:Object.assign({},step.ARTIFACTS.beingpushed),squished:Object.assign({},step.ARTIFACTS.squished)});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectmovetarget:markpos,selectunit:step.MARKS.selectunit};if(!!UNITLAYERS.oppunits[MARKS['selectmovetarget']]){var allowedsteps=UNITLAYERS.oppunits;var BLOCKS=UNITLAYERS.myunits;var STARTPOS=MARKS['selectmovetarget'];var DIR=relativedirs[(ARTIFACTS.movetargets[MARKS['selectmovetarget']]||{})['dir']-2+1];var walkedsquares=[];var STOPREASON="";var POS="faux";connections.faux[DIR]=STARTPOS;while(!(STOPREASON=!(POS=connections[POS][relativedirs[(ARTIFACTS.movetargets[MARKS['selectmovetarget']]||{})['dir']-2+1]])?"outofbounds":BLOCKS[POS]?"hitblock":!allowedsteps[POS]?"nomoresteps":null)){walkedsquares.push(POS);ARTIFACTS['beingpushed'][POS]={};}var WALKLENGTH=walkedsquares.length;if(WALKLENGTH){if(['hitblock','outofbounds'].indexOf(STOPREASON)!==-1){ARTIFACTS['squished'][walkedsquares[WALKLENGTH-1]]={};}}}var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectmovetarget'});turn.links[newstepid]={};turn.links[newstepid].move='move2';return newstep;};game.selectmovetarget2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.move2=function(turn,step){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var MARKS=step.MARKS;var UNITDATA=Object.assign({},step.UNITDATA);var UNITLAYERS=step.UNITLAYERS;var LOOPID;for(var POS in ARTIFACTS.beingpushed){if(LOOPID=(UNITLAYERS.units[POS]||{}).id){var pushid=LOOPID;var pushdir=(ARTIFACTS.movetargets[MARKS['selectmovetarget']]||{})['dir'];var dist=1;var newpos=UNITDATA[pushid].pos;while(dist&&connections[newpos][pushdir]){newpos=connections[newpos][pushdir];dist--;}UNITDATA[pushid]=Object.assign({},UNITDATA[pushid],{pos:newpos});}}var LOOPID;for(var POS in ARTIFACTS.squished){if(LOOPID=(UNITLAYERS.units[POS]||{}).id){delete UNITDATA[LOOPID];}}var unitid=(UNITLAYERS.units[MARKS['selectunit']]||{}).id;if(unitid){UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{'pos':MARKS['selectmovetarget']});}MARKS={};UNITLAYERS={"soldiers":{},"mysoldiers":{},"oppsoldiers":{},"neutralsoldiers":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}ARTIFACTS={"movetargets":{},"beingpushed":{},"squished":{}};var newstepid=step.stepid+'-'+'move';var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,stepid:newstepid,name:'move',path:step.path.concat('move')});turn.links[newstepid]={};if(Object.keys(function(){var ret={},s0=TERRAIN.oppcorner,s1=UNITLAYERS.myunits;for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}()||{}).length!==0){var winner=2;var result=winner===2?'win':winner?'lose':'draw';turn.links[newstepid][result]='invade';}else turn.links[newstepid].endturn="start"+otherplayer;return newstep;};game.move2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.start2=function(turn,step){var turn={steps:{},player:player,turn:turn.turn+1,links:{root:{}}};var MARKS={};var ARTIFACTS={"movetargets":{},"beingpushed":{},"squished":{}};var UNITDATA=step.UNITDATA;var UNITLAYERS={"soldiers":{},"mysoldiers":{},"oppsoldiers":{},"neutralsoldiers":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}var newstep=turn.steps.root={ARTIFACTS:ARTIFACTS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,MARKS:MARKS,stepid:'root',name:'start',path:[]};var newlinks=turn.links.root;for(var linkpos in UNITLAYERS.myunits){newlinks[linkpos]='selectunit2';}return turn;};game.start2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.debug2=function(){return{TERRAIN:TERRAIN};};})();function reduce(coll,iterator,acc){for(var key in coll){acc=iterator(acc,coll[key],key);}return acc;}game.newGame=function(){var turnseed={turn:0};var stepseed={UNITDATA:{"unit1":{"pos":"a1","id":"unit1","group":"soldiers","owner":1},"unit2":{"pos":"b1","id":"unit2","group":"soldiers","owner":1},"unit3":{"pos":"c1","id":"unit3","group":"soldiers","owner":1},"unit4":{"pos":"d1","id":"unit4","group":"soldiers","owner":1},"unit5":{"pos":"a2","id":"unit5","group":"soldiers","owner":1},"unit6":{"pos":"b2","id":"unit6","group":"soldiers","owner":1},"unit7":{"pos":"c2","id":"unit7","group":"soldiers","owner":1},"unit8":{"pos":"d2","id":"unit8","group":"soldiers","owner":1},"unit9":{"pos":"a3","id":"unit9","group":"soldiers","owner":1},"unit10":{"pos":"b3","id":"unit10","group":"soldiers","owner":1},"unit11":{"pos":"c3","id":"unit11","group":"soldiers","owner":1},"unit12":{"pos":"d3","id":"unit12","group":"soldiers","owner":1},"unit13":{"pos":"a4","id":"unit13","group":"soldiers","owner":1},"unit14":{"pos":"b4","id":"unit14","group":"soldiers","owner":1},"unit15":{"pos":"c4","id":"unit15","group":"soldiers","owner":1},"unit16":{"pos":"d4","id":"unit16","group":"soldiers","owner":1},"unit17":{"pos":"e5","id":"unit17","group":"soldiers","owner":2},"unit18":{"pos":"f5","id":"unit18","group":"soldiers","owner":2},"unit19":{"pos":"g5","id":"unit19","group":"soldiers","owner":2},"unit20":{"pos":"h5","id":"unit20","group":"soldiers","owner":2},"unit21":{"pos":"e6","id":"unit21","group":"soldiers","owner":2},"unit22":{"pos":"f6","id":"unit22","group":"soldiers","owner":2},"unit23":{"pos":"g6","id":"unit23","group":"soldiers","owner":2},"unit24":{"pos":"h6","id":"unit24","group":"soldiers","owner":2},"unit25":{"pos":"e7","id":"unit25","group":"soldiers","owner":2},"unit26":{"pos":"f7","id":"unit26","group":"soldiers","owner":2},"unit27":{"pos":"g7","id":"unit27","group":"soldiers","owner":2},"unit28":{"pos":"h7","id":"unit28","group":"soldiers","owner":2},"unit29":{"pos":"e8","id":"unit29","group":"soldiers","owner":2},"unit30":{"pos":"f8","id":"unit30","group":"soldiers","owner":2},"unit31":{"pos":"g8","id":"unit31","group":"soldiers","owner":2},"unit32":{"pos":"h8","id":"unit32","group":"soldiers","owner":2}}};return game.start1(turnseed,stepseed);};game.debug=function(){return{BOARD:BOARD,connections:connections,plr1:game.debug1(),plr2:game.debug2()};};game.commands={"move":1};game.graphics={"tiles":{"corner":"playercolour"},"icons":{"soldiers":"rooks"}};game.board={"height":8,"width":8,"terrain":{"corner":{"1":["a1"],"2":["h8"]}}};game.AI=[];game.id="aries";return game;}(),atrium:function(){var game={};var connections={"faux":{},"a1":{"1":"a2","2":"b2","3":"b1"},"a2":{"1":"a3","2":"b3","3":"b2","4":"b1","5":"a1"},"a3":{"1":"a4","2":"b4","3":"b3","4":"b2","5":"a2"},"a4":{"1":"a5","2":"b5","3":"b4","4":"b3","5":"a3"},"a5":{"3":"b5","4":"b4","5":"a4"},"b1":{"1":"b2","2":"c2","3":"c1","7":"a1","8":"a2"},"b2":{"1":"b3","2":"c3","3":"c2","4":"c1","5":"b1","6":"a1","7":"a2","8":"a3"},"b3":{"1":"b4","2":"c4","3":"c3","4":"c2","5":"b2","6":"a2","7":"a3","8":"a4"},"b4":{"1":"b5","2":"c5","3":"c4","4":"c3","5":"b3","6":"a3","7":"a4","8":"a5"},"b5":{"3":"c5","4":"c4","5":"b4","6":"a4","7":"a5"},"c1":{"1":"c2","2":"d2","3":"d1","7":"b1","8":"b2"},"c2":{"1":"c3","2":"d3","3":"d2","4":"d1","5":"c1","6":"b1","7":"b2","8":"b3"},"c3":{"1":"c4","2":"d4","3":"d3","4":"d2","5":"c2","6":"b2","7":"b3","8":"b4"},"c4":{"1":"c5","2":"d5","3":"d4","4":"d3","5":"c3","6":"b3","7":"b4","8":"b5"},"c5":{"3":"d5","4":"d4","5":"c4","6":"b4","7":"b5"},"d1":{"1":"d2","2":"e2","3":"e1","7":"c1","8":"c2"},"d2":{"1":"d3","2":"e3","3":"e2","4":"e1","5":"d1","6":"c1","7":"c2","8":"c3"},"d3":{"1":"d4","2":"e4","3":"e3","4":"e2","5":"d2","6":"c2","7":"c3","8":"c4"},"d4":{"1":"d5","2":"e5","3":"e4","4":"e3","5":"d3","6":"c3","7":"c4","8":"c5"},"d5":{"3":"e5","4":"e4","5":"d4","6":"c4","7":"c5"},"e1":{"1":"e2","7":"d1","8":"d2"},"e2":{"1":"e3","5":"e1","6":"d1","7":"d2","8":"d3"},"e3":{"1":"e4","5":"e2","6":"d2","7":"d3","8":"d4"},"e4":{"1":"e5","5":"e3","6":"d3","7":"d4","8":"d5"},"e5":{"5":"e4","6":"d4","7":"d5"}};var BOARD={"board":{"a1":{"colour":"dark","pos":"a1","x":1,"y":1},"a2":{"colour":"light","pos":"a2","x":1,"y":2},"a3":{"colour":"dark","pos":"a3","x":1,"y":3},"a4":{"colour":"light","pos":"a4","x":1,"y":4},"a5":{"colour":"dark","pos":"a5","x":1,"y":5},"b1":{"colour":"light","pos":"b1","x":2,"y":1},"b2":{"colour":"dark","pos":"b2","x":2,"y":2},"b3":{"colour":"light","pos":"b3","x":2,"y":3},"b4":{"colour":"dark","pos":"b4","x":2,"y":4},"b5":{"colour":"light","pos":"b5","x":2,"y":5},"c1":{"colour":"dark","pos":"c1","x":3,"y":1},"c2":{"colour":"light","pos":"c2","x":3,"y":2},"c3":{"colour":"dark","pos":"c3","x":3,"y":3},"c4":{"colour":"light","pos":"c4","x":3,"y":4},"c5":{"colour":"dark","pos":"c5","x":3,"y":5},"d1":{"colour":"light","pos":"d1","x":4,"y":1},"d2":{"colour":"dark","pos":"d2","x":4,"y":2},"d3":{"colour":"light","pos":"d3","x":4,"y":3},"d4":{"colour":"dark","pos":"d4","x":4,"y":4},"d5":{"colour":"light","pos":"d5","x":4,"y":5},"e1":{"colour":"dark","pos":"e1","x":5,"y":1},"e2":{"colour":"light","pos":"e2","x":5,"y":2},"e3":{"colour":"dark","pos":"e3","x":5,"y":3},"e4":{"colour":"light","pos":"e4","x":5,"y":4},"e5":{"colour":"dark","pos":"e5","x":5,"y":5}},"light":{"a2":{"colour":"light","pos":"a2","x":1,"y":2},"a4":{"colour":"light","pos":"a4","x":1,"y":4},"b1":{"colour":"light","pos":"b1","x":2,"y":1},"b3":{"colour":"light","pos":"b3","x":2,"y":3},"b5":{"colour":"light","pos":"b5","x":2,"y":5},"c2":{"colour":"light","pos":"c2","x":3,"y":2},"c4":{"colour":"light","pos":"c4","x":3,"y":4},"d1":{"colour":"light","pos":"d1","x":4,"y":1},"d3":{"colour":"light","pos":"d3","x":4,"y":3},"d5":{"colour":"light","pos":"d5","x":4,"y":5},"e2":{"colour":"light","pos":"e2","x":5,"y":2},"e4":{"colour":"light","pos":"e4","x":5,"y":4}},"dark":{"a1":{"colour":"dark","pos":"a1","x":1,"y":1},"a3":{"colour":"dark","pos":"a3","x":1,"y":3},"a5":{"colour":"dark","pos":"a5","x":1,"y":5},"b2":{"colour":"dark","pos":"b2","x":2,"y":2},"b4":{"colour":"dark","pos":"b4","x":2,"y":4},"c1":{"colour":"dark","pos":"c1","x":3,"y":1},"c3":{"colour":"dark","pos":"c3","x":3,"y":3},"c5":{"colour":"dark","pos":"c5","x":3,"y":5},"d2":{"colour":"dark","pos":"d2","x":4,"y":2},"d4":{"colour":"dark","pos":"d4","x":4,"y":4},"e1":{"colour":"dark","pos":"e1","x":5,"y":1},"e3":{"colour":"dark","pos":"e3","x":5,"y":3},"e5":{"colour":"dark","pos":"e5","x":5,"y":5}}};var relativedirs=[1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];var TERRAIN={};(function(){var ownernames=["neutral","my","opp"];var player=1;var otherplayer=2;game.selectunit1=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{movetargets:Object.assign({},step.ARTIFACTS.movetargets)});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectunit:markpos};var STARTPOS=MARKS['selectunit'];var neighbourdirs=[1,2,3,4,5,6,7,8];var startconnections=connections[STARTPOS];for(var dirnbr=0;dirnbr<8;dirnbr++){var POS=startconnections[neighbourdirs[dirnbr]];if(POS&&!UNITLAYERS.units[POS]){ARTIFACTS['movetargets'][POS]={};}}var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectunit'});turn.links[newstepid]={};var newlinks=turn.links[newstepid];for(var linkpos in ARTIFACTS.movetargets){newlinks[linkpos]='selectmovetarget1';}return newstep;};game.selectunit1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.selectmovetarget1=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectmovetarget:markpos,selectunit:step.MARKS.selectunit};var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectmovetarget'});turn.links[newstepid]={};turn.links[newstepid].move='move1';return newstep;};game.selectmovetarget1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.move1=function(turn,step){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{winline:Object.assign({},step.ARTIFACTS.winline)});var MARKS=step.MARKS;var UNITDATA=Object.assign({},step.UNITDATA);var UNITLAYERS=step.UNITLAYERS;var unitid=(UNITLAYERS.units[MARKS['selectunit']]||{}).id;if(unitid){UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{'pos':MARKS['selectmovetarget']});}MARKS={};UNITLAYERS={"kings":{},"mykings":{},"oppkings":{},"neutralkings":{},"queens":{},"myqueens":{},"oppqueens":{},"neutralqueens":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}ARTIFACTS={"movetargets":{},"winline":{}};var walkstarts=UNITLAYERS.myunits;for(var STARTPOS in walkstarts){var allowedsteps=!!UNITLAYERS.mykings[STARTPOS]?UNITLAYERS.mykings:UNITLAYERS.myqueens;var allwalkerdirs=[1,2,3,4,5,6,7,8];for(var walkerdirnbr=0;walkerdirnbr<8;walkerdirnbr++){var walkedsquares=[];var POS=STARTPOS;while((POS=connections[POS][allwalkerdirs[walkerdirnbr]])&&allowedsteps[POS]){walkedsquares.push(POS);}var WALKLENGTH=walkedsquares.length;if(WALKLENGTH===2){ARTIFACTS['winline'][STARTPOS]={};}}}var newstepid=step.stepid+'-'+'move';var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,stepid:newstepid,name:'move',path:step.path.concat('move')});turn.links[newstepid]={};if(Object.keys(ARTIFACTS.winline||{}).length!==0){var winner=1;var result=winner===1?'win':winner?'lose':'draw';turn.links[newstepid][result]='madewinline';}else turn.links[newstepid].endturn="start"+otherplayer;return newstep;};game.move1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.start1=function(turn,step){var turn={steps:{},player:player,turn:turn.turn+1,links:{root:{}}};var MARKS={};var ARTIFACTS={"movetargets":{},"winline":{}};var UNITDATA=step.UNITDATA;var UNITLAYERS={"kings":{},"mykings":{},"oppkings":{},"neutralkings":{},"queens":{},"myqueens":{},"oppqueens":{},"neutralqueens":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}var newstep=turn.steps.root={ARTIFACTS:ARTIFACTS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,MARKS:MARKS,stepid:'root',name:'start',path:[]};var newlinks=turn.links.root;for(var linkpos in UNITLAYERS.myunits){newlinks[linkpos]='selectunit1';}return turn;};game.start1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.debug1=function(){return{TERRAIN:TERRAIN};};})();(function(){var ownernames=["neutral","opp","my"];var player=2;var otherplayer=1;game.selectunit2=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{movetargets:Object.assign({},step.ARTIFACTS.movetargets)});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectunit:markpos};var STARTPOS=MARKS['selectunit'];var neighbourdirs=[1,2,3,4,5,6,7,8];var startconnections=connections[STARTPOS];for(var dirnbr=0;dirnbr<8;dirnbr++){var POS=startconnections[neighbourdirs[dirnbr]];if(POS&&!UNITLAYERS.units[POS]){ARTIFACTS['movetargets'][POS]={};}}var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectunit'});turn.links[newstepid]={};var newlinks=turn.links[newstepid];for(var linkpos in ARTIFACTS.movetargets){newlinks[linkpos]='selectmovetarget2';}return newstep;};game.selectunit2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.selectmovetarget2=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectmovetarget:markpos,selectunit:step.MARKS.selectunit};var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectmovetarget'});turn.links[newstepid]={};turn.links[newstepid].move='move2';return newstep;};game.selectmovetarget2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.move2=function(turn,step){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{winline:Object.assign({},step.ARTIFACTS.winline)});var MARKS=step.MARKS;var UNITDATA=Object.assign({},step.UNITDATA);var UNITLAYERS=step.UNITLAYERS;var unitid=(UNITLAYERS.units[MARKS['selectunit']]||{}).id;if(unitid){UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{'pos':MARKS['selectmovetarget']});}MARKS={};UNITLAYERS={"kings":{},"mykings":{},"oppkings":{},"neutralkings":{},"queens":{},"myqueens":{},"oppqueens":{},"neutralqueens":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}ARTIFACTS={"movetargets":{},"winline":{}};var walkstarts=UNITLAYERS.myunits;for(var STARTPOS in walkstarts){var allowedsteps=!!UNITLAYERS.mykings[STARTPOS]?UNITLAYERS.mykings:UNITLAYERS.myqueens;var allwalkerdirs=[1,2,3,4,5,6,7,8];for(var walkerdirnbr=0;walkerdirnbr<8;walkerdirnbr++){var walkedsquares=[];var POS=STARTPOS;while((POS=connections[POS][allwalkerdirs[walkerdirnbr]])&&allowedsteps[POS]){walkedsquares.push(POS);}var WALKLENGTH=walkedsquares.length;if(WALKLENGTH===2){ARTIFACTS['winline'][STARTPOS]={};}}}var newstepid=step.stepid+'-'+'move';var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,stepid:newstepid,name:'move',path:step.path.concat('move')});turn.links[newstepid]={};if(Object.keys(ARTIFACTS.winline||{}).length!==0){var winner=2;var result=winner===2?'win':winner?'lose':'draw';turn.links[newstepid][result]='madewinline';}else turn.links[newstepid].endturn="start"+otherplayer;return newstep;};game.move2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.start2=function(turn,step){var turn={steps:{},player:player,turn:turn.turn+1,links:{root:{}}};var MARKS={};var ARTIFACTS={"movetargets":{},"winline":{}};var UNITDATA=step.UNITDATA;var UNITLAYERS={"kings":{},"mykings":{},"oppkings":{},"neutralkings":{},"queens":{},"myqueens":{},"oppqueens":{},"neutralqueens":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}var newstep=turn.steps.root={ARTIFACTS:ARTIFACTS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,MARKS:MARKS,stepid:'root',name:'start',path:[]};var newlinks=turn.links.root;for(var linkpos in UNITLAYERS.myunits){newlinks[linkpos]='selectunit2';}return turn;};game.start2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.debug2=function(){return{TERRAIN:TERRAIN};};})();function reduce(coll,iterator,acc){for(var key in coll){acc=iterator(acc,coll[key],key);}return acc;}game.newGame=function(){var turnseed={turn:0};var stepseed={UNITDATA:{"unit1":{"pos":"a2","id":"unit1","group":"kings","owner":1},"unit2":{"pos":"c5","id":"unit2","group":"kings","owner":1},"unit3":{"pos":"e2","id":"unit3","group":"kings","owner":1},"unit4":{"pos":"b1","id":"unit4","group":"kings","owner":2},"unit5":{"pos":"b5","id":"unit5","group":"kings","owner":2},"unit6":{"pos":"e3","id":"unit6","group":"kings","owner":2},"unit7":{"pos":"a3","id":"unit7","group":"queens","owner":1},"unit8":{"pos":"d5","id":"unit8","group":"queens","owner":1},"unit9":{"pos":"d1","id":"unit9","group":"queens","owner":1},"unit10":{"pos":"a4","id":"unit10","group":"queens","owner":2},"unit11":{"pos":"c1","id":"unit11","group":"queens","owner":2},"unit12":{"pos":"e4","id":"unit12","group":"queens","owner":2}}};return game.start1(turnseed,stepseed);};game.debug=function(){return{BOARD:BOARD,connections:connections,plr1:game.debug1(),plr2:game.debug2()};};game.commands={"move":1};game.graphics={"icons":{"kings":"kings","queens":"queens"}};game.board={"height":5,"width":5};game.AI=[];game.id="atrium";return game;}(),castle:function(){var game={};var connections={"faux":{},"a1":{"1":"a2","2":"b2","3":"b1"},"a10":{"1":"a11","2":"b11","3":"b10","4":"b9","5":"a9"},"a11":{"1":"a12","2":"b12","3":"b11","4":"b10","5":"a10"},"a12":{"1":"a13","2":"b13","3":"b12","4":"b11","5":"a11"},"a13":{"1":"a14","2":"b14","3":"b13","4":"b12","5":"a12"},"a14":{"1":"a15","2":"b15","3":"b14","4":"b13","5":"a13"},"a15":{"1":"a16","2":"b16","3":"b15","4":"b14","5":"a14"},"a16":{"1":"a17","2":"b17","3":"b16","4":"b15","5":"a15"},"a17":{"1":"a18","2":"b18","3":"b17","4":"b16","5":"a16"},"a18":{"1":"a19","2":"b19","3":"b18","4":"b17","5":"a17"},"a19":{"3":"b19","4":"b18","5":"a18"},"a2":{"1":"a3","2":"b3","3":"b2","4":"b1","5":"a1"},"a3":{"1":"a4","2":"b4","3":"b3","4":"b2","5":"a2"},"a4":{"1":"a5","2":"b5","3":"b4","4":"b3","5":"a3"},"a5":{"1":"a6","2":"b6","3":"b5","4":"b4","5":"a4"},"a6":{"1":"a7","2":"b7","3":"b6","4":"b5","5":"a5"},"a7":{"1":"a8","2":"b8","3":"b7","4":"b6","5":"a6"},"a8":{"1":"a9","2":"b9","3":"b8","4":"b7","5":"a7"},"a9":{"1":"a10","2":"b10","3":"b9","4":"b8","5":"a8"},"b1":{"1":"b2","2":"c2","3":"c1","7":"a1","8":"a2"},"b10":{"1":"b11","2":"c11","3":"c10","4":"c9","5":"b9","6":"a9","7":"a10","8":"a11"},"b11":{"1":"b12","2":"c12","3":"c11","4":"c10","5":"b10","6":"a10","7":"a11","8":"a12"},"b12":{"1":"b13","2":"c13","3":"c12","4":"c11","5":"b11","6":"a11","7":"a12","8":"a13"},"b13":{"1":"b14","2":"c14","3":"c13","4":"c12","5":"b12","6":"a12","7":"a13","8":"a14"},"b14":{"1":"b15","2":"c15","3":"c14","4":"c13","5":"b13","6":"a13","7":"a14","8":"a15"},"b15":{"1":"b16","2":"c16","3":"c15","4":"c14","5":"b14","6":"a14","7":"a15","8":"a16"},"b16":{"1":"b17","2":"c17","3":"c16","4":"c15","5":"b15","6":"a15","7":"a16","8":"a17"},"b17":{"1":"b18","2":"c18","3":"c17","4":"c16","5":"b16","6":"a16","7":"a17","8":"a18"},"b18":{"1":"b19","2":"c19","3":"c18","4":"c17","5":"b17","6":"a17","7":"a18","8":"a19"},"b19":{"3":"c19","4":"c18","5":"b18","6":"a18","7":"a19"},"b2":{"1":"b3","2":"c3","3":"c2","4":"c1","5":"b1","6":"a1","7":"a2","8":"a3"},"b3":{"1":"b4","2":"c4","3":"c3","4":"c2","5":"b2","6":"a2","7":"a3","8":"a4"},"b4":{"1":"b5","2":"c5","3":"c4","4":"c3","5":"b3","6":"a3","7":"a4","8":"a5"},"b5":{"1":"b6","2":"c6","3":"c5","4":"c4","5":"b4","6":"a4","7":"a5","8":"a6"},"b6":{"1":"b7","2":"c7","3":"c6","4":"c5","5":"b5","6":"a5","7":"a6","8":"a7"},"b7":{"1":"b8","2":"c8","3":"c7","4":"c6","5":"b6","6":"a6","7":"a7","8":"a8"},"b8":{"1":"b9","2":"c9","3":"c8","4":"c7","5":"b7","6":"a7","7":"a8","8":"a9"},"b9":{"1":"b10","2":"c10","3":"c9","4":"c8","5":"b8","6":"a8","7":"a9","8":"a10"},"c1":{"1":"c2","2":"d2","3":"d1","7":"b1","8":"b2"},"c10":{"1":"c11","2":"d11","3":"d10","4":"d9","5":"c9","6":"b9","7":"b10","8":"b11"},"c11":{"1":"c12","2":"d12","3":"d11","4":"d10","5":"c10","6":"b10","7":"b11","8":"b12"},"c12":{"1":"c13","2":"d13","3":"d12","4":"d11","5":"c11","6":"b11","7":"b12","8":"b13"},"c13":{"1":"c14","2":"d14","3":"d13","4":"d12","5":"c12","6":"b12","7":"b13","8":"b14"},"c14":{"1":"c15","2":"d15","3":"d14","4":"d13","5":"c13","6":"b13","7":"b14","8":"b15"},"c15":{"1":"c16","2":"d16","3":"d15","4":"d14","5":"c14","6":"b14","7":"b15","8":"b16"},"c16":{"1":"c17","2":"d17","3":"d16","4":"d15","5":"c15","6":"b15","7":"b16","8":"b17"},"c17":{"1":"c18","2":"d18","3":"d17","4":"d16","5":"c16","6":"b16","7":"b17","8":"b18"},"c18":{"1":"c19","2":"d19","3":"d18","4":"d17","5":"c17","6":"b17","7":"b18","8":"b19"},"c19":{"3":"d19","4":"d18","5":"c18","6":"b18","7":"b19"},"c2":{"1":"c3","2":"d3","3":"d2","4":"d1","5":"c1","6":"b1","7":"b2","8":"b3"},"c3":{"1":"c4","2":"d4","3":"d3","4":"d2","5":"c2","6":"b2","7":"b3","8":"b4"},"c4":{"1":"c5","2":"d5","3":"d4","4":"d3","5":"c3","6":"b3","7":"b4","8":"b5"},"c5":{"1":"c6","2":"d6","3":"d5","4":"d4","5":"c4","6":"b4","7":"b5","8":"b6"},"c6":{"1":"c7","2":"d7","3":"d6","4":"d5","5":"c5","6":"b5","7":"b6","8":"b7"},"c7":{"1":"c8","2":"d8","3":"d7","4":"d6","5":"c6","6":"b6","7":"b7","8":"b8"},"c8":{"1":"c9","2":"d9","3":"d8","4":"d7","5":"c7","6":"b7","7":"b8","8":"b9"},"c9":{"1":"c10","2":"d10","3":"d9","4":"d8","5":"c8","6":"b8","7":"b9","8":"b10"},"d1":{"1":"d2","2":"e2","3":"e1","7":"c1","8":"c2"},"d10":{"1":"d11","2":"e11","3":"e10","4":"e9","5":"d9","6":"c9","7":"c10","8":"c11"},"d11":{"1":"d12","2":"e12","3":"e11","4":"e10","5":"d10","6":"c10","7":"c11","8":"c12"},"d12":{"1":"d13","2":"e13","3":"e12","4":"e11","5":"d11","6":"c11","7":"c12","8":"c13"},"d13":{"1":"d14","2":"e14","3":"e13","4":"e12","5":"d12","6":"c12","7":"c13","8":"c14"},"d14":{"1":"d15","2":"e15","3":"e14","4":"e13","5":"d13","6":"c13","7":"c14","8":"c15"},"d15":{"1":"d16","2":"e16","3":"e15","4":"e14","5":"d14","6":"c14","7":"c15","8":"c16"},"d16":{"1":"d17","2":"e17","3":"e16","4":"e15","5":"d15","6":"c15","7":"c16","8":"c17"},"d17":{"1":"d18","2":"e18","3":"e17","4":"e16","5":"d16","6":"c16","7":"c17","8":"c18"},"d18":{"1":"d19","2":"e19","3":"e18","4":"e17","5":"d17","6":"c17","7":"c18","8":"c19"},"d19":{"3":"e19","4":"e18","5":"d18","6":"c18","7":"c19"},"d2":{"1":"d3","2":"e3","3":"e2","4":"e1","5":"d1","6":"c1","7":"c2","8":"c3"},"d3":{"1":"d4","2":"e4","3":"e3","4":"e2","5":"d2","6":"c2","7":"c3","8":"c4"},"d4":{"1":"d5","2":"e5","3":"e4","4":"e3","5":"d3","6":"c3","7":"c4","8":"c5"},"d5":{"1":"d6","2":"e6","3":"e5","4":"e4","5":"d4","6":"c4","7":"c5","8":"c6"},"d6":{"1":"d7","2":"e7","3":"e6","4":"e5","5":"d5","6":"c5","7":"c6","8":"c7"},"d7":{"1":"d8","2":"e8","3":"e7","4":"e6","5":"d6","6":"c6","7":"c7","8":"c8"},"d8":{"1":"d9","2":"e9","3":"e8","4":"e7","5":"d7","6":"c7","7":"c8","8":"c9"},"d9":{"1":"d10","2":"e10","3":"e9","4":"e8","5":"d8","6":"c8","7":"c9","8":"c10"},"e1":{"1":"e2","2":"f2","3":"f1","7":"d1","8":"d2"},"e10":{"1":"e11","2":"f11","3":"f10","4":"f9","5":"e9","6":"d9","7":"d10","8":"d11"},"e11":{"1":"e12","2":"f12","3":"f11","4":"f10","5":"e10","6":"d10","7":"d11","8":"d12"},"e12":{"1":"e13","2":"f13","3":"f12","4":"f11","5":"e11","6":"d11","7":"d12","8":"d13"},"e13":{"1":"e14","2":"f14","3":"f13","4":"f12","5":"e12","6":"d12","7":"d13","8":"d14"},"e14":{"1":"e15","2":"f15","3":"f14","4":"f13","5":"e13","6":"d13","7":"d14","8":"d15"},"e15":{"1":"e16","2":"f16","3":"f15","4":"f14","5":"e14","6":"d14","7":"d15","8":"d16"},"e16":{"1":"e17","2":"f17","3":"f16","4":"f15","5":"e15","6":"d15","7":"d16","8":"d17"},"e17":{"1":"e18","2":"f18","3":"f17","4":"f16","5":"e16","6":"d16","7":"d17","8":"d18"},"e18":{"1":"e19","2":"f19","3":"f18","4":"f17","5":"e17","6":"d17","7":"d18","8":"d19"},"e19":{"3":"f19","4":"f18","5":"e18","6":"d18","7":"d19"},"e2":{"1":"e3","2":"f3","3":"f2","4":"f1","5":"e1","6":"d1","7":"d2","8":"d3"},"e3":{"1":"e4","2":"f4","3":"f3","4":"f2","5":"e2","6":"d2","7":"d3","8":"d4"},"e4":{"1":"e5","2":"f5","3":"f4","4":"f3","5":"e3","6":"d3","7":"d4","8":"d5"},"e5":{"1":"e6","2":"f6","3":"f5","4":"f4","5":"e4","6":"d4","7":"d5","8":"d6"},"e6":{"1":"e7","2":"f7","3":"f6","4":"f5","5":"e5","6":"d5","7":"d6","8":"d7"},"e7":{"1":"e8","2":"f8","3":"f7","4":"f6","5":"e6","6":"d6","7":"d7","8":"d8"},"e8":{"1":"e9","2":"f9","3":"f8","4":"f7","5":"e7","6":"d7","7":"d8","8":"d9"},"e9":{"1":"e10","2":"f10","3":"f9","4":"f8","5":"e8","6":"d8","7":"d9","8":"d10"},"f1":{"1":"f2","2":"g2","3":"g1","7":"e1","8":"e2"},"f10":{"1":"f11","2":"g11","3":"g10","4":"g9","5":"f9","6":"e9","7":"e10","8":"e11"},"f11":{"1":"f12","2":"g12","3":"g11","4":"g10","5":"f10","6":"e10","7":"e11","8":"e12"},"f12":{"1":"f13","2":"g13","3":"g12","4":"g11","5":"f11","6":"e11","7":"e12","8":"e13"},"f13":{"1":"f14","2":"g14","3":"g13","4":"g12","5":"f12","6":"e12","7":"e13","8":"e14"},"f14":{"1":"f15","2":"g15","3":"g14","4":"g13","5":"f13","6":"e13","7":"e14","8":"e15"},"f15":{"1":"f16","2":"g16","3":"g15","4":"g14","5":"f14","6":"e14","7":"e15","8":"e16"},"f16":{"1":"f17","2":"g17","3":"g16","4":"g15","5":"f15","6":"e15","7":"e16","8":"e17"},"f17":{"1":"f18","2":"g18","3":"g17","4":"g16","5":"f16","6":"e16","7":"e17","8":"e18"},"f18":{"1":"f19","2":"g19","3":"g18","4":"g17","5":"f17","6":"e17","7":"e18","8":"e19"},"f19":{"3":"g19","4":"g18","5":"f18","6":"e18","7":"e19"},"f2":{"1":"f3","2":"g3","3":"g2","4":"g1","5":"f1","6":"e1","7":"e2","8":"e3"},"f3":{"1":"f4","2":"g4","3":"g3","4":"g2","5":"f2","6":"e2","7":"e3","8":"e4"},"f4":{"1":"f5","2":"g5","3":"g4","4":"g3","5":"f3","6":"e3","7":"e4","8":"e5"},"f5":{"1":"f6","2":"g6","3":"g5","4":"g4","5":"f4","6":"e4","7":"e5","8":"e6"},"f6":{"1":"f7","2":"g7","3":"g6","4":"g5","5":"f5","6":"e5","7":"e6","8":"e7"},"f7":{"1":"f8","2":"g8","3":"g7","4":"g6","5":"f6","6":"e6","7":"e7","8":"e8"},"f8":{"1":"f9","2":"g9","3":"g8","4":"g7","5":"f7","6":"e7","7":"e8","8":"e9"},"f9":{"1":"f10","2":"g10","3":"g9","4":"g8","5":"f8","6":"e8","7":"e9","8":"e10"},"g1":{"1":"g2","2":"h2","3":"h1","7":"f1","8":"f2"},"g10":{"1":"g11","2":"h11","3":"h10","4":"h9","5":"g9","6":"f9","7":"f10","8":"f11"},"g11":{"1":"g12","2":"h12","3":"h11","4":"h10","5":"g10","6":"f10","7":"f11","8":"f12"},"g12":{"1":"g13","2":"h13","3":"h12","4":"h11","5":"g11","6":"f11","7":"f12","8":"f13"},"g13":{"1":"g14","2":"h14","3":"h13","4":"h12","5":"g12","6":"f12","7":"f13","8":"f14"},"g14":{"1":"g15","2":"h15","3":"h14","4":"h13","5":"g13","6":"f13","7":"f14","8":"f15"},"g15":{"1":"g16","2":"h16","3":"h15","4":"h14","5":"g14","6":"f14","7":"f15","8":"f16"},"g16":{"1":"g17","2":"h17","3":"h16","4":"h15","5":"g15","6":"f15","7":"f16","8":"f17"},"g17":{"1":"g18","2":"h18","3":"h17","4":"h16","5":"g16","6":"f16","7":"f17","8":"f18"},"g18":{"1":"g19","2":"h19","3":"h18","4":"h17","5":"g17","6":"f17","7":"f18","8":"f19"},"g19":{"3":"h19","4":"h18","5":"g18","6":"f18","7":"f19"},"g2":{"1":"g3","2":"h3","3":"h2","4":"h1","5":"g1","6":"f1","7":"f2","8":"f3"},"g3":{"1":"g4","2":"h4","3":"h3","4":"h2","5":"g2","6":"f2","7":"f3","8":"f4"},"g4":{"1":"g5","2":"h5","3":"h4","4":"h3","5":"g3","6":"f3","7":"f4","8":"f5"},"g5":{"1":"g6","2":"h6","3":"h5","4":"h4","5":"g4","6":"f4","7":"f5","8":"f6"},"g6":{"1":"g7","2":"h7","3":"h6","4":"h5","5":"g5","6":"f5","7":"f6","8":"f7"},"g7":{"1":"g8","2":"h8","3":"h7","4":"h6","5":"g6","6":"f6","7":"f7","8":"f8"},"g8":{"1":"g9","2":"h9","3":"h8","4":"h7","5":"g7","6":"f7","7":"f8","8":"f9"},"g9":{"1":"g10","2":"h10","3":"h9","4":"h8","5":"g8","6":"f8","7":"f9","8":"f10"},"h1":{"1":"h2","2":"i2","3":"i1","7":"g1","8":"g2"},"h10":{"1":"h11","2":"i11","3":"i10","4":"i9","5":"h9","6":"g9","7":"g10","8":"g11"},"h11":{"1":"h12","2":"i12","3":"i11","4":"i10","5":"h10","6":"g10","7":"g11","8":"g12"},"h12":{"1":"h13","2":"i13","3":"i12","4":"i11","5":"h11","6":"g11","7":"g12","8":"g13"},"h13":{"1":"h14","2":"i14","3":"i13","4":"i12","5":"h12","6":"g12","7":"g13","8":"g14"},"h14":{"1":"h15","2":"i15","3":"i14","4":"i13","5":"h13","6":"g13","7":"g14","8":"g15"},"h15":{"1":"h16","2":"i16","3":"i15","4":"i14","5":"h14","6":"g14","7":"g15","8":"g16"},"h16":{"1":"h17","2":"i17","3":"i16","4":"i15","5":"h15","6":"g15","7":"g16","8":"g17"},"h17":{"1":"h18","2":"i18","3":"i17","4":"i16","5":"h16","6":"g16","7":"g17","8":"g18"},"h18":{"1":"h19","2":"i19","3":"i18","4":"i17","5":"h17","6":"g17","7":"g18","8":"g19"},"h19":{"3":"i19","4":"i18","5":"h18","6":"g18","7":"g19"},"h2":{"1":"h3","2":"i3","3":"i2","4":"i1","5":"h1","6":"g1","7":"g2","8":"g3"},"h3":{"1":"h4","2":"i4","3":"i3","4":"i2","5":"h2","6":"g2","7":"g3","8":"g4"},"h4":{"1":"h5","2":"i5","3":"i4","4":"i3","5":"h3","6":"g3","7":"g4","8":"g5"},"h5":{"1":"h6","2":"i6","3":"i5","4":"i4","5":"h4","6":"g4","7":"g5","8":"g6"},"h6":{"1":"h7","2":"i7","3":"i6","4":"i5","5":"h5","6":"g5","7":"g6","8":"g7"},"h7":{"1":"h8","2":"i8","3":"i7","4":"i6","5":"h6","6":"g6","7":"g7","8":"g8"},"h8":{"1":"h9","2":"i9","3":"i8","4":"i7","5":"h7","6":"g7","7":"g8","8":"g9"},"h9":{"1":"h10","2":"i10","3":"i9","4":"i8","5":"h8","6":"g8","7":"g9","8":"g10"},"i1":{"1":"i2","2":"j2","3":"j1","7":"h1","8":"h2"},"i10":{"1":"i11","2":"j11","3":"j10","4":"j9","5":"i9","6":"h9","7":"h10","8":"h11"},"i11":{"1":"i12","2":"j12","3":"j11","4":"j10","5":"i10","6":"h10","7":"h11","8":"h12"},"i12":{"1":"i13","2":"j13","3":"j12","4":"j11","5":"i11","6":"h11","7":"h12","8":"h13"},"i13":{"1":"i14","2":"j14","3":"j13","4":"j12","5":"i12","6":"h12","7":"h13","8":"h14"},"i14":{"1":"i15","2":"j15","3":"j14","4":"j13","5":"i13","6":"h13","7":"h14","8":"h15"},"i15":{"1":"i16","2":"j16","3":"j15","4":"j14","5":"i14","6":"h14","7":"h15","8":"h16"},"i16":{"1":"i17","2":"j17","3":"j16","4":"j15","5":"i15","6":"h15","7":"h16","8":"h17"},"i17":{"1":"i18","2":"j18","3":"j17","4":"j16","5":"i16","6":"h16","7":"h17","8":"h18"},"i18":{"1":"i19","2":"j19","3":"j18","4":"j17","5":"i17","6":"h17","7":"h18","8":"h19"},"i19":{"3":"j19","4":"j18","5":"i18","6":"h18","7":"h19"},"i2":{"1":"i3","2":"j3","3":"j2","4":"j1","5":"i1","6":"h1","7":"h2","8":"h3"},"i3":{"1":"i4","2":"j4","3":"j3","4":"j2","5":"i2","6":"h2","7":"h3","8":"h4"},"i4":{"1":"i5","2":"j5","3":"j4","4":"j3","5":"i3","6":"h3","7":"h4","8":"h5"},"i5":{"1":"i6","2":"j6","3":"j5","4":"j4","5":"i4","6":"h4","7":"h5","8":"h6"},"i6":{"1":"i7","2":"j7","3":"j6","4":"j5","5":"i5","6":"h5","7":"h6","8":"h7"},"i7":{"1":"i8","2":"j8","3":"j7","4":"j6","5":"i6","6":"h6","7":"h7","8":"h8"},"i8":{"1":"i9","2":"j9","3":"j8","4":"j7","5":"i7","6":"h7","7":"h8","8":"h9"},"i9":{"1":"i10","2":"j10","3":"j9","4":"j8","5":"i8","6":"h8","7":"h9","8":"h10"},"j1":{"1":"j2","2":"k2","3":"k1","7":"i1","8":"i2"},"j10":{"1":"j11","2":"k11","3":"k10","4":"k9","5":"j9","6":"i9","7":"i10","8":"i11"},"j11":{"1":"j12","2":"k12","3":"k11","4":"k10","5":"j10","6":"i10","7":"i11","8":"i12"},"j12":{"1":"j13","2":"k13","3":"k12","4":"k11","5":"j11","6":"i11","7":"i12","8":"i13"},"j13":{"1":"j14","2":"k14","3":"k13","4":"k12","5":"j12","6":"i12","7":"i13","8":"i14"},"j14":{"1":"j15","2":"k15","3":"k14","4":"k13","5":"j13","6":"i13","7":"i14","8":"i15"},"j15":{"1":"j16","2":"k16","3":"k15","4":"k14","5":"j14","6":"i14","7":"i15","8":"i16"},"j16":{"1":"j17","2":"k17","3":"k16","4":"k15","5":"j15","6":"i15","7":"i16","8":"i17"},"j17":{"1":"j18","2":"k18","3":"k17","4":"k16","5":"j16","6":"i16","7":"i17","8":"i18"},"j18":{"1":"j19","2":"k19","3":"k18","4":"k17","5":"j17","6":"i17","7":"i18","8":"i19"},"j19":{"3":"k19","4":"k18","5":"j18","6":"i18","7":"i19"},"j2":{"1":"j3","2":"k3","3":"k2","4":"k1","5":"j1","6":"i1","7":"i2","8":"i3"},"j3":{"1":"j4","2":"k4","3":"k3","4":"k2","5":"j2","6":"i2","7":"i3","8":"i4"},"j4":{"1":"j5","2":"k5","3":"k4","4":"k3","5":"j3","6":"i3","7":"i4","8":"i5"},"j5":{"1":"j6","2":"k6","3":"k5","4":"k4","5":"j4","6":"i4","7":"i5","8":"i6"},"j6":{"1":"j7","2":"k7","3":"k6","4":"k5","5":"j5","6":"i5","7":"i6","8":"i7"},"j7":{"1":"j8","2":"k8","3":"k7","4":"k6","5":"j6","6":"i6","7":"i7","8":"i8"},"j8":{"1":"j9","2":"k9","3":"k8","4":"k7","5":"j7","6":"i7","7":"i8","8":"i9"},"j9":{"1":"j10","2":"k10","3":"k9","4":"k8","5":"j8","6":"i8","7":"i9","8":"i10"},"k1":{"1":"k2","2":"l2","3":"l1","7":"j1","8":"j2"},"k10":{"1":"k11","2":"l11","3":"l10","4":"l9","5":"k9","6":"j9","7":"j10","8":"j11"},"k11":{"1":"k12","2":"l12","3":"l11","4":"l10","5":"k10","6":"j10","7":"j11","8":"j12"},"k12":{"1":"k13","2":"l13","3":"l12","4":"l11","5":"k11","6":"j11","7":"j12","8":"j13"},"k13":{"1":"k14","2":"l14","3":"l13","4":"l12","5":"k12","6":"j12","7":"j13","8":"j14"},"k14":{"1":"k15","2":"l15","3":"l14","4":"l13","5":"k13","6":"j13","7":"j14","8":"j15"},"k15":{"1":"k16","2":"l16","3":"l15","4":"l14","5":"k14","6":"j14","7":"j15","8":"j16"},"k16":{"1":"k17","2":"l17","3":"l16","4":"l15","5":"k15","6":"j15","7":"j16","8":"j17"},"k17":{"1":"k18","2":"l18","3":"l17","4":"l16","5":"k16","6":"j16","7":"j17","8":"j18"},"k18":{"1":"k19","2":"l19","3":"l18","4":"l17","5":"k17","6":"j17","7":"j18","8":"j19"},"k19":{"3":"l19","4":"l18","5":"k18","6":"j18","7":"j19"},"k2":{"1":"k3","2":"l3","3":"l2","4":"l1","5":"k1","6":"j1","7":"j2","8":"j3"},"k3":{"1":"k4","2":"l4","3":"l3","4":"l2","5":"k2","6":"j2","7":"j3","8":"j4"},"k4":{"1":"k5","2":"l5","3":"l4","4":"l3","5":"k3","6":"j3","7":"j4","8":"j5"},"k5":{"1":"k6","2":"l6","3":"l5","4":"l4","5":"k4","6":"j4","7":"j5","8":"j6"},"k6":{"1":"k7","2":"l7","3":"l6","4":"l5","5":"k5","6":"j5","7":"j6","8":"j7"},"k7":{"1":"k8","2":"l8","3":"l7","4":"l6","5":"k6","6":"j6","7":"j7","8":"j8"},"k8":{"1":"k9","2":"l9","3":"l8","4":"l7","5":"k7","6":"j7","7":"j8","8":"j9"},"k9":{"1":"k10","2":"l10","3":"l9","4":"l8","5":"k8","6":"j8","7":"j9","8":"j10"},"l1":{"1":"l2","2":"m2","3":"m1","7":"k1","8":"k2"},"l10":{"1":"l11","2":"m11","3":"m10","4":"m9","5":"l9","6":"k9","7":"k10","8":"k11"},"l11":{"1":"l12","2":"m12","3":"m11","4":"m10","5":"l10","6":"k10","7":"k11","8":"k12"},"l12":{"1":"l13","2":"m13","3":"m12","4":"m11","5":"l11","6":"k11","7":"k12","8":"k13"},"l13":{"1":"l14","2":"m14","3":"m13","4":"m12","5":"l12","6":"k12","7":"k13","8":"k14"},"l14":{"1":"l15","2":"m15","3":"m14","4":"m13","5":"l13","6":"k13","7":"k14","8":"k15"},"l15":{"1":"l16","2":"m16","3":"m15","4":"m14","5":"l14","6":"k14","7":"k15","8":"k16"},"l16":{"1":"l17","2":"m17","3":"m16","4":"m15","5":"l15","6":"k15","7":"k16","8":"k17"},"l17":{"1":"l18","2":"m18","3":"m17","4":"m16","5":"l16","6":"k16","7":"k17","8":"k18"},"l18":{"1":"l19","2":"m19","3":"m18","4":"m17","5":"l17","6":"k17","7":"k18","8":"k19"},"l19":{"3":"m19","4":"m18","5":"l18","6":"k18","7":"k19"},"l2":{"1":"l3","2":"m3","3":"m2","4":"m1","5":"l1","6":"k1","7":"k2","8":"k3"},"l3":{"1":"l4","2":"m4","3":"m3","4":"m2","5":"l2","6":"k2","7":"k3","8":"k4"},"l4":{"1":"l5","2":"m5","3":"m4","4":"m3","5":"l3","6":"k3","7":"k4","8":"k5"},"l5":{"1":"l6","2":"m6","3":"m5","4":"m4","5":"l4","6":"k4","7":"k5","8":"k6"},"l6":{"1":"l7","2":"m7","3":"m6","4":"m5","5":"l5","6":"k5","7":"k6","8":"k7"},"l7":{"1":"l8","2":"m8","3":"m7","4":"m6","5":"l6","6":"k6","7":"k7","8":"k8"},"l8":{"1":"l9","2":"m9","3":"m8","4":"m7","5":"l7","6":"k7","7":"k8","8":"k9"},"l9":{"1":"l10","2":"m10","3":"m9","4":"m8","5":"l8","6":"k8","7":"k9","8":"k10"},"m1":{"1":"m2","2":"n2","3":"n1","7":"l1","8":"l2"},"m10":{"1":"m11","2":"n11","3":"n10","4":"n9","5":"m9","6":"l9","7":"l10","8":"l11"},"m11":{"1":"m12","2":"n12","3":"n11","4":"n10","5":"m10","6":"l10","7":"l11","8":"l12"},"m12":{"1":"m13","2":"n13","3":"n12","4":"n11","5":"m11","6":"l11","7":"l12","8":"l13"},"m13":{"1":"m14","2":"n14","3":"n13","4":"n12","5":"m12","6":"l12","7":"l13","8":"l14"},"m14":{"1":"m15","2":"n15","3":"n14","4":"n13","5":"m13","6":"l13","7":"l14","8":"l15"},"m15":{"1":"m16","2":"n16","3":"n15","4":"n14","5":"m14","6":"l14","7":"l15","8":"l16"},"m16":{"1":"m17","2":"n17","3":"n16","4":"n15","5":"m15","6":"l15","7":"l16","8":"l17"},"m17":{"1":"m18","2":"n18","3":"n17","4":"n16","5":"m16","6":"l16","7":"l17","8":"l18"},"m18":{"1":"m19","2":"n19","3":"n18","4":"n17","5":"m17","6":"l17","7":"l18","8":"l19"},"m19":{"3":"n19","4":"n18","5":"m18","6":"l18","7":"l19"},"m2":{"1":"m3","2":"n3","3":"n2","4":"n1","5":"m1","6":"l1","7":"l2","8":"l3"},"m3":{"1":"m4","2":"n4","3":"n3","4":"n2","5":"m2","6":"l2","7":"l3","8":"l4"},"m4":{"1":"m5","2":"n5","3":"n4","4":"n3","5":"m3","6":"l3","7":"l4","8":"l5"},"m5":{"1":"m6","2":"n6","3":"n5","4":"n4","5":"m4","6":"l4","7":"l5","8":"l6"},"m6":{"1":"m7","2":"n7","3":"n6","4":"n5","5":"m5","6":"l5","7":"l6","8":"l7"},"m7":{"1":"m8","2":"n8","3":"n7","4":"n6","5":"m6","6":"l6","7":"l7","8":"l8"},"m8":{"1":"m9","2":"n9","3":"n8","4":"n7","5":"m7","6":"l7","7":"l8","8":"l9"},"m9":{"1":"m10","2":"n10","3":"n9","4":"n8","5":"m8","6":"l8","7":"l9","8":"l10"},"n1":{"1":"n2","2":"o2","3":"o1","7":"m1","8":"m2"},"n10":{"1":"n11","2":"o11","3":"o10","4":"o9","5":"n9","6":"m9","7":"m10","8":"m11"},"n11":{"1":"n12","2":"o12","3":"o11","4":"o10","5":"n10","6":"m10","7":"m11","8":"m12"},"n12":{"1":"n13","2":"o13","3":"o12","4":"o11","5":"n11","6":"m11","7":"m12","8":"m13"},"n13":{"1":"n14","2":"o14","3":"o13","4":"o12","5":"n12","6":"m12","7":"m13","8":"m14"},"n14":{"1":"n15","2":"o15","3":"o14","4":"o13","5":"n13","6":"m13","7":"m14","8":"m15"},"n15":{"1":"n16","2":"o16","3":"o15","4":"o14","5":"n14","6":"m14","7":"m15","8":"m16"},"n16":{"1":"n17","2":"o17","3":"o16","4":"o15","5":"n15","6":"m15","7":"m16","8":"m17"},"n17":{"1":"n18","2":"o18","3":"o17","4":"o16","5":"n16","6":"m16","7":"m17","8":"m18"},"n18":{"1":"n19","2":"o19","3":"o18","4":"o17","5":"n17","6":"m17","7":"m18","8":"m19"},"n19":{"3":"o19","4":"o18","5":"n18","6":"m18","7":"m19"},"n2":{"1":"n3","2":"o3","3":"o2","4":"o1","5":"n1","6":"m1","7":"m2","8":"m3"},"n3":{"1":"n4","2":"o4","3":"o3","4":"o2","5":"n2","6":"m2","7":"m3","8":"m4"},"n4":{"1":"n5","2":"o5","3":"o4","4":"o3","5":"n3","6":"m3","7":"m4","8":"m5"},"n5":{"1":"n6","2":"o6","3":"o5","4":"o4","5":"n4","6":"m4","7":"m5","8":"m6"},"n6":{"1":"n7","2":"o7","3":"o6","4":"o5","5":"n5","6":"m5","7":"m6","8":"m7"},"n7":{"1":"n8","2":"o8","3":"o7","4":"o6","5":"n6","6":"m6","7":"m7","8":"m8"},"n8":{"1":"n9","2":"o9","3":"o8","4":"o7","5":"n7","6":"m7","7":"m8","8":"m9"},"n9":{"1":"n10","2":"o10","3":"o9","4":"o8","5":"n8","6":"m8","7":"m9","8":"m10"},"o1":{"1":"o2","2":"p2","3":"p1","7":"n1","8":"n2"},"o10":{"1":"o11","2":"p11","3":"p10","4":"p9","5":"o9","6":"n9","7":"n10","8":"n11"},"o11":{"1":"o12","2":"p12","3":"p11","4":"p10","5":"o10","6":"n10","7":"n11","8":"n12"},"o12":{"1":"o13","2":"p13","3":"p12","4":"p11","5":"o11","6":"n11","7":"n12","8":"n13"},"o13":{"1":"o14","2":"p14","3":"p13","4":"p12","5":"o12","6":"n12","7":"n13","8":"n14"},"o14":{"1":"o15","2":"p15","3":"p14","4":"p13","5":"o13","6":"n13","7":"n14","8":"n15"},"o15":{"1":"o16","2":"p16","3":"p15","4":"p14","5":"o14","6":"n14","7":"n15","8":"n16"},"o16":{"1":"o17","2":"p17","3":"p16","4":"p15","5":"o15","6":"n15","7":"n16","8":"n17"},"o17":{"1":"o18","2":"p18","3":"p17","4":"p16","5":"o16","6":"n16","7":"n17","8":"n18"},"o18":{"1":"o19","2":"p19","3":"p18","4":"p17","5":"o17","6":"n17","7":"n18","8":"n19"},"o19":{"3":"p19","4":"p18","5":"o18","6":"n18","7":"n19"},"o2":{"1":"o3","2":"p3","3":"p2","4":"p1","5":"o1","6":"n1","7":"n2","8":"n3"},"o3":{"1":"o4","2":"p4","3":"p3","4":"p2","5":"o2","6":"n2","7":"n3","8":"n4"},"o4":{"1":"o5","2":"p5","3":"p4","4":"p3","5":"o3","6":"n3","7":"n4","8":"n5"},"o5":{"1":"o6","2":"p6","3":"p5","4":"p4","5":"o4","6":"n4","7":"n5","8":"n6"},"o6":{"1":"o7","2":"p7","3":"p6","4":"p5","5":"o5","6":"n5","7":"n6","8":"n7"},"o7":{"1":"o8","2":"p8","3":"p7","4":"p6","5":"o6","6":"n6","7":"n7","8":"n8"},"o8":{"1":"o9","2":"p9","3":"p8","4":"p7","5":"o7","6":"n7","7":"n8","8":"n9"},"o9":{"1":"o10","2":"p10","3":"p9","4":"p8","5":"o8","6":"n8","7":"n9","8":"n10"},"p1":{"1":"p2","2":"q2","3":"q1","7":"o1","8":"o2"},"p10":{"1":"p11","2":"q11","3":"q10","4":"q9","5":"p9","6":"o9","7":"o10","8":"o11"},"p11":{"1":"p12","2":"q12","3":"q11","4":"q10","5":"p10","6":"o10","7":"o11","8":"o12"},"p12":{"1":"p13","2":"q13","3":"q12","4":"q11","5":"p11","6":"o11","7":"o12","8":"o13"},"p13":{"1":"p14","2":"q14","3":"q13","4":"q12","5":"p12","6":"o12","7":"o13","8":"o14"},"p14":{"1":"p15","2":"q15","3":"q14","4":"q13","5":"p13","6":"o13","7":"o14","8":"o15"},"p15":{"1":"p16","2":"q16","3":"q15","4":"q14","5":"p14","6":"o14","7":"o15","8":"o16"},"p16":{"1":"p17","2":"q17","3":"q16","4":"q15","5":"p15","6":"o15","7":"o16","8":"o17"},"p17":{"1":"p18","2":"q18","3":"q17","4":"q16","5":"p16","6":"o16","7":"o17","8":"o18"},"p18":{"1":"p19","2":"q19","3":"q18","4":"q17","5":"p17","6":"o17","7":"o18","8":"o19"},"p19":{"3":"q19","4":"q18","5":"p18","6":"o18","7":"o19"},"p2":{"1":"p3","2":"q3","3":"q2","4":"q1","5":"p1","6":"o1","7":"o2","8":"o3"},"p3":{"1":"p4","2":"q4","3":"q3","4":"q2","5":"p2","6":"o2","7":"o3","8":"o4"},"p4":{"1":"p5","2":"q5","3":"q4","4":"q3","5":"p3","6":"o3","7":"o4","8":"o5"},"p5":{"1":"p6","2":"q6","3":"q5","4":"q4","5":"p4","6":"o4","7":"o5","8":"o6"},"p6":{"1":"p7","2":"q7","3":"q6","4":"q5","5":"p5","6":"o5","7":"o6","8":"o7"},"p7":{"1":"p8","2":"q8","3":"q7","4":"q6","5":"p6","6":"o6","7":"o7","8":"o8"},"p8":{"1":"p9","2":"q9","3":"q8","4":"q7","5":"p7","6":"o7","7":"o8","8":"o9"},"p9":{"1":"p10","2":"q10","3":"q9","4":"q8","5":"p8","6":"o8","7":"o9","8":"o10"},"q1":{"1":"q2","2":"r2","3":"r1","7":"p1","8":"p2"},"q10":{"1":"q11","2":"r11","3":"r10","4":"r9","5":"q9","6":"p9","7":"p10","8":"p11"},"q11":{"1":"q12","2":"r12","3":"r11","4":"r10","5":"q10","6":"p10","7":"p11","8":"p12"},"q12":{"1":"q13","2":"r13","3":"r12","4":"r11","5":"q11","6":"p11","7":"p12","8":"p13"},"q13":{"1":"q14","2":"r14","3":"r13","4":"r12","5":"q12","6":"p12","7":"p13","8":"p14"},"q14":{"1":"q15","2":"r15","3":"r14","4":"r13","5":"q13","6":"p13","7":"p14","8":"p15"},"q15":{"1":"q16","2":"r16","3":"r15","4":"r14","5":"q14","6":"p14","7":"p15","8":"p16"},"q16":{"1":"q17","2":"r17","3":"r16","4":"r15","5":"q15","6":"p15","7":"p16","8":"p17"},"q17":{"1":"q18","2":"r18","3":"r17","4":"r16","5":"q16","6":"p16","7":"p17","8":"p18"},"q18":{"1":"q19","2":"r19","3":"r18","4":"r17","5":"q17","6":"p17","7":"p18","8":"p19"},"q19":{"3":"r19","4":"r18","5":"q18","6":"p18","7":"p19"},"q2":{"1":"q3","2":"r3","3":"r2","4":"r1","5":"q1","6":"p1","7":"p2","8":"p3"},"q3":{"1":"q4","2":"r4","3":"r3","4":"r2","5":"q2","6":"p2","7":"p3","8":"p4"},"q4":{"1":"q5","2":"r5","3":"r4","4":"r3","5":"q3","6":"p3","7":"p4","8":"p5"},"q5":{"1":"q6","2":"r6","3":"r5","4":"r4","5":"q4","6":"p4","7":"p5","8":"p6"},"q6":{"1":"q7","2":"r7","3":"r6","4":"r5","5":"q5","6":"p5","7":"p6","8":"p7"},"q7":{"1":"q8","2":"r8","3":"r7","4":"r6","5":"q6","6":"p6","7":"p7","8":"p8"},"q8":{"1":"q9","2":"r9","3":"r8","4":"r7","5":"q7","6":"p7","7":"p8","8":"p9"},"q9":{"1":"q10","2":"r10","3":"r9","4":"r8","5":"q8","6":"p8","7":"p9","8":"p10"},"r1":{"1":"r2","2":"s2","3":"s1","7":"q1","8":"q2"},"r10":{"1":"r11","2":"s11","3":"s10","4":"s9","5":"r9","6":"q9","7":"q10","8":"q11"},"r11":{"1":"r12","2":"s12","3":"s11","4":"s10","5":"r10","6":"q10","7":"q11","8":"q12"},"r12":{"1":"r13","2":"s13","3":"s12","4":"s11","5":"r11","6":"q11","7":"q12","8":"q13"},"r13":{"1":"r14","2":"s14","3":"s13","4":"s12","5":"r12","6":"q12","7":"q13","8":"q14"},"r14":{"1":"r15","2":"s15","3":"s14","4":"s13","5":"r13","6":"q13","7":"q14","8":"q15"},"r15":{"1":"r16","2":"s16","3":"s15","4":"s14","5":"r14","6":"q14","7":"q15","8":"q16"},"r16":{"1":"r17","2":"s17","3":"s16","4":"s15","5":"r15","6":"q15","7":"q16","8":"q17"},"r17":{"1":"r18","2":"s18","3":"s17","4":"s16","5":"r16","6":"q16","7":"q17","8":"q18"},"r18":{"1":"r19","2":"s19","3":"s18","4":"s17","5":"r17","6":"q17","7":"q18","8":"q19"},"r19":{"3":"s19","4":"s18","5":"r18","6":"q18","7":"q19"},"r2":{"1":"r3","2":"s3","3":"s2","4":"s1","5":"r1","6":"q1","7":"q2","8":"q3"},"r3":{"1":"r4","2":"s4","3":"s3","4":"s2","5":"r2","6":"q2","7":"q3","8":"q4"},"r4":{"1":"r5","2":"s5","3":"s4","4":"s3","5":"r3","6":"q3","7":"q4","8":"q5"},"r5":{"1":"r6","2":"s6","3":"s5","4":"s4","5":"r4","6":"q4","7":"q5","8":"q6"},"r6":{"1":"r7","2":"s7","3":"s6","4":"s5","5":"r5","6":"q5","7":"q6","8":"q7"},"r7":{"1":"r8","2":"s8","3":"s7","4":"s6","5":"r6","6":"q6","7":"q7","8":"q8"},"r8":{"1":"r9","2":"s9","3":"s8","4":"s7","5":"r7","6":"q7","7":"q8","8":"q9"},"r9":{"1":"r10","2":"s10","3":"s9","4":"s8","5":"r8","6":"q8","7":"q9","8":"q10"},"s1":{"1":"s2","7":"r1","8":"r2"},"s10":{"1":"s11","5":"s9","6":"r9","7":"r10","8":"r11"},"s11":{"1":"s12","5":"s10","6":"r10","7":"r11","8":"r12"},"s12":{"1":"s13","5":"s11","6":"r11","7":"r12","8":"r13"},"s13":{"1":"s14","5":"s12","6":"r12","7":"r13","8":"r14"},"s14":{"1":"s15","5":"s13","6":"r13","7":"r14","8":"r15"},"s15":{"1":"s16","5":"s14","6":"r14","7":"r15","8":"r16"},"s16":{"1":"s17","5":"s15","6":"r15","7":"r16","8":"r17"},"s17":{"1":"s18","5":"s16","6":"r16","7":"r17","8":"r18"},"s18":{"1":"s19","5":"s17","6":"r17","7":"r18","8":"r19"},"s19":{"5":"s18","6":"r18","7":"r19"},"s2":{"1":"s3","5":"s1","6":"r1","7":"r2","8":"r3"},"s3":{"1":"s4","5":"s2","6":"r2","7":"r3","8":"r4"},"s4":{"1":"s5","5":"s3","6":"r3","7":"r4","8":"r5"},"s5":{"1":"s6","5":"s4","6":"r4","7":"r5","8":"r6"},"s6":{"1":"s7","5":"s5","6":"r5","7":"r6","8":"r7"},"s7":{"1":"s8","5":"s6","6":"r6","7":"r7","8":"r8"},"s8":{"1":"s9","5":"s7","6":"r7","7":"r8","8":"r9"},"s9":{"1":"s10","5":"s8","6":"r8","7":"r9","8":"r10"}};var BOARD={"board":{"a1":{"colour":"dark","pos":"a1","x":1,"y":1},"a10":{"colour":"light","pos":"a10","x":1,"y":10},"a11":{"colour":"dark","pos":"a11","x":1,"y":11},"a12":{"colour":"light","pos":"a12","x":1,"y":12},"a13":{"colour":"dark","pos":"a13","x":1,"y":13},"a14":{"colour":"light","pos":"a14","x":1,"y":14},"a15":{"colour":"dark","pos":"a15","x":1,"y":15},"a16":{"colour":"light","pos":"a16","x":1,"y":16},"a17":{"colour":"dark","pos":"a17","x":1,"y":17},"a18":{"colour":"light","pos":"a18","x":1,"y":18},"a19":{"colour":"dark","pos":"a19","x":1,"y":19},"a2":{"colour":"light","pos":"a2","x":1,"y":2},"a3":{"colour":"dark","pos":"a3","x":1,"y":3},"a4":{"colour":"light","pos":"a4","x":1,"y":4},"a5":{"colour":"dark","pos":"a5","x":1,"y":5},"a6":{"colour":"light","pos":"a6","x":1,"y":6},"a7":{"colour":"dark","pos":"a7","x":1,"y":7},"a8":{"colour":"light","pos":"a8","x":1,"y":8},"a9":{"colour":"dark","pos":"a9","x":1,"y":9},"b1":{"colour":"light","pos":"b1","x":2,"y":1},"b10":{"colour":"dark","pos":"b10","x":2,"y":10},"b11":{"colour":"light","pos":"b11","x":2,"y":11},"b12":{"colour":"dark","pos":"b12","x":2,"y":12},"b13":{"colour":"light","pos":"b13","x":2,"y":13},"b14":{"colour":"dark","pos":"b14","x":2,"y":14},"b15":{"colour":"light","pos":"b15","x":2,"y":15},"b16":{"colour":"dark","pos":"b16","x":2,"y":16},"b17":{"colour":"light","pos":"b17","x":2,"y":17},"b18":{"colour":"dark","pos":"b18","x":2,"y":18},"b19":{"colour":"light","pos":"b19","x":2,"y":19},"b2":{"colour":"dark","pos":"b2","x":2,"y":2},"b3":{"colour":"light","pos":"b3","x":2,"y":3},"b4":{"colour":"dark","pos":"b4","x":2,"y":4},"b5":{"colour":"light","pos":"b5","x":2,"y":5},"b6":{"colour":"dark","pos":"b6","x":2,"y":6},"b7":{"colour":"light","pos":"b7","x":2,"y":7},"b8":{"colour":"dark","pos":"b8","x":2,"y":8},"b9":{"colour":"light","pos":"b9","x":2,"y":9},"c1":{"colour":"dark","pos":"c1","x":3,"y":1},"c10":{"colour":"light","pos":"c10","x":3,"y":10},"c11":{"colour":"dark","pos":"c11","x":3,"y":11},"c12":{"colour":"light","pos":"c12","x":3,"y":12},"c13":{"colour":"dark","pos":"c13","x":3,"y":13},"c14":{"colour":"light","pos":"c14","x":3,"y":14},"c15":{"colour":"dark","pos":"c15","x":3,"y":15},"c16":{"colour":"light","pos":"c16","x":3,"y":16},"c17":{"colour":"dark","pos":"c17","x":3,"y":17},"c18":{"colour":"light","pos":"c18","x":3,"y":18},"c19":{"colour":"dark","pos":"c19","x":3,"y":19},"c2":{"colour":"light","pos":"c2","x":3,"y":2},"c3":{"colour":"dark","pos":"c3","x":3,"y":3},"c4":{"colour":"light","pos":"c4","x":3,"y":4},"c5":{"colour":"dark","pos":"c5","x":3,"y":5},"c6":{"colour":"light","pos":"c6","x":3,"y":6},"c7":{"colour":"dark","pos":"c7","x":3,"y":7},"c8":{"colour":"light","pos":"c8","x":3,"y":8},"c9":{"colour":"dark","pos":"c9","x":3,"y":9},"d1":{"colour":"light","pos":"d1","x":4,"y":1},"d10":{"colour":"dark","pos":"d10","x":4,"y":10},"d11":{"colour":"light","pos":"d11","x":4,"y":11},"d12":{"colour":"dark","pos":"d12","x":4,"y":12},"d13":{"colour":"light","pos":"d13","x":4,"y":13},"d14":{"colour":"dark","pos":"d14","x":4,"y":14},"d15":{"colour":"light","pos":"d15","x":4,"y":15},"d16":{"colour":"dark","pos":"d16","x":4,"y":16},"d17":{"colour":"light","pos":"d17","x":4,"y":17},"d18":{"colour":"dark","pos":"d18","x":4,"y":18},"d19":{"colour":"light","pos":"d19","x":4,"y":19},"d2":{"colour":"dark","pos":"d2","x":4,"y":2},"d3":{"colour":"light","pos":"d3","x":4,"y":3},"d4":{"colour":"dark","pos":"d4","x":4,"y":4},"d5":{"colour":"light","pos":"d5","x":4,"y":5},"d6":{"colour":"dark","pos":"d6","x":4,"y":6},"d7":{"colour":"light","pos":"d7","x":4,"y":7},"d8":{"colour":"dark","pos":"d8","x":4,"y":8},"d9":{"colour":"light","pos":"d9","x":4,"y":9},"e1":{"colour":"dark","pos":"e1","x":5,"y":1},"e10":{"colour":"light","pos":"e10","x":5,"y":10},"e11":{"colour":"dark","pos":"e11","x":5,"y":11},"e12":{"colour":"light","pos":"e12","x":5,"y":12},"e13":{"colour":"dark","pos":"e13","x":5,"y":13},"e14":{"colour":"light","pos":"e14","x":5,"y":14},"e15":{"colour":"dark","pos":"e15","x":5,"y":15},"e16":{"colour":"light","pos":"e16","x":5,"y":16},"e17":{"colour":"dark","pos":"e17","x":5,"y":17},"e18":{"colour":"light","pos":"e18","x":5,"y":18},"e19":{"colour":"dark","pos":"e19","x":5,"y":19},"e2":{"colour":"light","pos":"e2","x":5,"y":2},"e3":{"colour":"dark","pos":"e3","x":5,"y":3},"e4":{"colour":"light","pos":"e4","x":5,"y":4},"e5":{"colour":"dark","pos":"e5","x":5,"y":5},"e6":{"colour":"light","pos":"e6","x":5,"y":6},"e7":{"colour":"dark","pos":"e7","x":5,"y":7},"e8":{"colour":"light","pos":"e8","x":5,"y":8},"e9":{"colour":"dark","pos":"e9","x":5,"y":9},"f1":{"colour":"light","pos":"f1","x":6,"y":1},"f10":{"colour":"dark","pos":"f10","x":6,"y":10},"f11":{"colour":"light","pos":"f11","x":6,"y":11},"f12":{"colour":"dark","pos":"f12","x":6,"y":12},"f13":{"colour":"light","pos":"f13","x":6,"y":13},"f14":{"colour":"dark","pos":"f14","x":6,"y":14},"f15":{"colour":"light","pos":"f15","x":6,"y":15},"f16":{"colour":"dark","pos":"f16","x":6,"y":16},"f17":{"colour":"light","pos":"f17","x":6,"y":17},"f18":{"colour":"dark","pos":"f18","x":6,"y":18},"f19":{"colour":"light","pos":"f19","x":6,"y":19},"f2":{"colour":"dark","pos":"f2","x":6,"y":2},"f3":{"colour":"light","pos":"f3","x":6,"y":3},"f4":{"colour":"dark","pos":"f4","x":6,"y":4},"f5":{"colour":"light","pos":"f5","x":6,"y":5},"f6":{"colour":"dark","pos":"f6","x":6,"y":6},"f7":{"colour":"light","pos":"f7","x":6,"y":7},"f8":{"colour":"dark","pos":"f8","x":6,"y":8},"f9":{"colour":"light","pos":"f9","x":6,"y":9},"g1":{"colour":"dark","pos":"g1","x":7,"y":1},"g10":{"colour":"light","pos":"g10","x":7,"y":10},"g11":{"colour":"dark","pos":"g11","x":7,"y":11},"g12":{"colour":"light","pos":"g12","x":7,"y":12},"g13":{"colour":"dark","pos":"g13","x":7,"y":13},"g14":{"colour":"light","pos":"g14","x":7,"y":14},"g15":{"colour":"dark","pos":"g15","x":7,"y":15},"g16":{"colour":"light","pos":"g16","x":7,"y":16},"g17":{"colour":"dark","pos":"g17","x":7,"y":17},"g18":{"colour":"light","pos":"g18","x":7,"y":18},"g19":{"colour":"dark","pos":"g19","x":7,"y":19},"g2":{"colour":"light","pos":"g2","x":7,"y":2},"g3":{"colour":"dark","pos":"g3","x":7,"y":3},"g4":{"colour":"light","pos":"g4","x":7,"y":4},"g5":{"colour":"dark","pos":"g5","x":7,"y":5},"g6":{"colour":"light","pos":"g6","x":7,"y":6},"g7":{"colour":"dark","pos":"g7","x":7,"y":7},"g8":{"colour":"light","pos":"g8","x":7,"y":8},"g9":{"colour":"dark","pos":"g9","x":7,"y":9},"h1":{"colour":"light","pos":"h1","x":8,"y":1},"h10":{"colour":"dark","pos":"h10","x":8,"y":10},"h11":{"colour":"light","pos":"h11","x":8,"y":11},"h12":{"colour":"dark","pos":"h12","x":8,"y":12},"h13":{"colour":"light","pos":"h13","x":8,"y":13},"h14":{"colour":"dark","pos":"h14","x":8,"y":14},"h15":{"colour":"light","pos":"h15","x":8,"y":15},"h16":{"colour":"dark","pos":"h16","x":8,"y":16},"h17":{"colour":"light","pos":"h17","x":8,"y":17},"h18":{"colour":"dark","pos":"h18","x":8,"y":18},"h19":{"colour":"light","pos":"h19","x":8,"y":19},"h2":{"colour":"dark","pos":"h2","x":8,"y":2},"h3":{"colour":"light","pos":"h3","x":8,"y":3},"h4":{"colour":"dark","pos":"h4","x":8,"y":4},"h5":{"colour":"light","pos":"h5","x":8,"y":5},"h6":{"colour":"dark","pos":"h6","x":8,"y":6},"h7":{"colour":"light","pos":"h7","x":8,"y":7},"h8":{"colour":"dark","pos":"h8","x":8,"y":8},"h9":{"colour":"light","pos":"h9","x":8,"y":9},"i1":{"colour":"dark","pos":"i1","x":9,"y":1},"i10":{"colour":"light","pos":"i10","x":9,"y":10},"i11":{"colour":"dark","pos":"i11","x":9,"y":11},"i12":{"colour":"light","pos":"i12","x":9,"y":12},"i13":{"colour":"dark","pos":"i13","x":9,"y":13},"i14":{"colour":"light","pos":"i14","x":9,"y":14},"i15":{"colour":"dark","pos":"i15","x":9,"y":15},"i16":{"colour":"light","pos":"i16","x":9,"y":16},"i17":{"colour":"dark","pos":"i17","x":9,"y":17},"i18":{"colour":"light","pos":"i18","x":9,"y":18},"i19":{"colour":"dark","pos":"i19","x":9,"y":19},"i2":{"colour":"light","pos":"i2","x":9,"y":2},"i3":{"colour":"dark","pos":"i3","x":9,"y":3},"i4":{"colour":"light","pos":"i4","x":9,"y":4},"i5":{"colour":"dark","pos":"i5","x":9,"y":5},"i6":{"colour":"light","pos":"i6","x":9,"y":6},"i7":{"colour":"dark","pos":"i7","x":9,"y":7},"i8":{"colour":"light","pos":"i8","x":9,"y":8},"i9":{"colour":"dark","pos":"i9","x":9,"y":9},"j1":{"colour":"light","pos":"j1","x":10,"y":1},"j10":{"colour":"dark","pos":"j10","x":10,"y":10},"j11":{"colour":"light","pos":"j11","x":10,"y":11},"j12":{"colour":"dark","pos":"j12","x":10,"y":12},"j13":{"colour":"light","pos":"j13","x":10,"y":13},"j14":{"colour":"dark","pos":"j14","x":10,"y":14},"j15":{"colour":"light","pos":"j15","x":10,"y":15},"j16":{"colour":"dark","pos":"j16","x":10,"y":16},"j17":{"colour":"light","pos":"j17","x":10,"y":17},"j18":{"colour":"dark","pos":"j18","x":10,"y":18},"j19":{"colour":"light","pos":"j19","x":10,"y":19},"j2":{"colour":"dark","pos":"j2","x":10,"y":2},"j3":{"colour":"light","pos":"j3","x":10,"y":3},"j4":{"colour":"dark","pos":"j4","x":10,"y":4},"j5":{"colour":"light","pos":"j5","x":10,"y":5},"j6":{"colour":"dark","pos":"j6","x":10,"y":6},"j7":{"colour":"light","pos":"j7","x":10,"y":7},"j8":{"colour":"dark","pos":"j8","x":10,"y":8},"j9":{"colour":"light","pos":"j9","x":10,"y":9},"k1":{"colour":"dark","pos":"k1","x":11,"y":1},"k10":{"colour":"light","pos":"k10","x":11,"y":10},"k11":{"colour":"dark","pos":"k11","x":11,"y":11},"k12":{"colour":"light","pos":"k12","x":11,"y":12},"k13":{"colour":"dark","pos":"k13","x":11,"y":13},"k14":{"colour":"light","pos":"k14","x":11,"y":14},"k15":{"colour":"dark","pos":"k15","x":11,"y":15},"k16":{"colour":"light","pos":"k16","x":11,"y":16},"k17":{"colour":"dark","pos":"k17","x":11,"y":17},"k18":{"colour":"light","pos":"k18","x":11,"y":18},"k19":{"colour":"dark","pos":"k19","x":11,"y":19},"k2":{"colour":"light","pos":"k2","x":11,"y":2},"k3":{"colour":"dark","pos":"k3","x":11,"y":3},"k4":{"colour":"light","pos":"k4","x":11,"y":4},"k5":{"colour":"dark","pos":"k5","x":11,"y":5},"k6":{"colour":"light","pos":"k6","x":11,"y":6},"k7":{"colour":"dark","pos":"k7","x":11,"y":7},"k8":{"colour":"light","pos":"k8","x":11,"y":8},"k9":{"colour":"dark","pos":"k9","x":11,"y":9},"l1":{"colour":"light","pos":"l1","x":12,"y":1},"l10":{"colour":"dark","pos":"l10","x":12,"y":10},"l11":{"colour":"light","pos":"l11","x":12,"y":11},"l12":{"colour":"dark","pos":"l12","x":12,"y":12},"l13":{"colour":"light","pos":"l13","x":12,"y":13},"l14":{"colour":"dark","pos":"l14","x":12,"y":14},"l15":{"colour":"light","pos":"l15","x":12,"y":15},"l16":{"colour":"dark","pos":"l16","x":12,"y":16},"l17":{"colour":"light","pos":"l17","x":12,"y":17},"l18":{"colour":"dark","pos":"l18","x":12,"y":18},"l19":{"colour":"light","pos":"l19","x":12,"y":19},"l2":{"colour":"dark","pos":"l2","x":12,"y":2},"l3":{"colour":"light","pos":"l3","x":12,"y":3},"l4":{"colour":"dark","pos":"l4","x":12,"y":4},"l5":{"colour":"light","pos":"l5","x":12,"y":5},"l6":{"colour":"dark","pos":"l6","x":12,"y":6},"l7":{"colour":"light","pos":"l7","x":12,"y":7},"l8":{"colour":"dark","pos":"l8","x":12,"y":8},"l9":{"colour":"light","pos":"l9","x":12,"y":9},"m1":{"colour":"dark","pos":"m1","x":13,"y":1},"m10":{"colour":"light","pos":"m10","x":13,"y":10},"m11":{"colour":"dark","pos":"m11","x":13,"y":11},"m12":{"colour":"light","pos":"m12","x":13,"y":12},"m13":{"colour":"dark","pos":"m13","x":13,"y":13},"m14":{"colour":"light","pos":"m14","x":13,"y":14},"m15":{"colour":"dark","pos":"m15","x":13,"y":15},"m16":{"colour":"light","pos":"m16","x":13,"y":16},"m17":{"colour":"dark","pos":"m17","x":13,"y":17},"m18":{"colour":"light","pos":"m18","x":13,"y":18},"m19":{"colour":"dark","pos":"m19","x":13,"y":19},"m2":{"colour":"light","pos":"m2","x":13,"y":2},"m3":{"colour":"dark","pos":"m3","x":13,"y":3},"m4":{"colour":"light","pos":"m4","x":13,"y":4},"m5":{"colour":"dark","pos":"m5","x":13,"y":5},"m6":{"colour":"light","pos":"m6","x":13,"y":6},"m7":{"colour":"dark","pos":"m7","x":13,"y":7},"m8":{"colour":"light","pos":"m8","x":13,"y":8},"m9":{"colour":"dark","pos":"m9","x":13,"y":9},"n1":{"colour":"light","pos":"n1","x":14,"y":1},"n10":{"colour":"dark","pos":"n10","x":14,"y":10},"n11":{"colour":"light","pos":"n11","x":14,"y":11},"n12":{"colour":"dark","pos":"n12","x":14,"y":12},"n13":{"colour":"light","pos":"n13","x":14,"y":13},"n14":{"colour":"dark","pos":"n14","x":14,"y":14},"n15":{"colour":"light","pos":"n15","x":14,"y":15},"n16":{"colour":"dark","pos":"n16","x":14,"y":16},"n17":{"colour":"light","pos":"n17","x":14,"y":17},"n18":{"colour":"dark","pos":"n18","x":14,"y":18},"n19":{"colour":"light","pos":"n19","x":14,"y":19},"n2":{"colour":"dark","pos":"n2","x":14,"y":2},"n3":{"colour":"light","pos":"n3","x":14,"y":3},"n4":{"colour":"dark","pos":"n4","x":14,"y":4},"n5":{"colour":"light","pos":"n5","x":14,"y":5},"n6":{"colour":"dark","pos":"n6","x":14,"y":6},"n7":{"colour":"light","pos":"n7","x":14,"y":7},"n8":{"colour":"dark","pos":"n8","x":14,"y":8},"n9":{"colour":"light","pos":"n9","x":14,"y":9},"o1":{"colour":"dark","pos":"o1","x":15,"y":1},"o10":{"colour":"light","pos":"o10","x":15,"y":10},"o11":{"colour":"dark","pos":"o11","x":15,"y":11},"o12":{"colour":"light","pos":"o12","x":15,"y":12},"o13":{"colour":"dark","pos":"o13","x":15,"y":13},"o14":{"colour":"light","pos":"o14","x":15,"y":14},"o15":{"colour":"dark","pos":"o15","x":15,"y":15},"o16":{"colour":"light","pos":"o16","x":15,"y":16},"o17":{"colour":"dark","pos":"o17","x":15,"y":17},"o18":{"colour":"light","pos":"o18","x":15,"y":18},"o19":{"colour":"dark","pos":"o19","x":15,"y":19},"o2":{"colour":"light","pos":"o2","x":15,"y":2},"o3":{"colour":"dark","pos":"o3","x":15,"y":3},"o4":{"colour":"light","pos":"o4","x":15,"y":4},"o5":{"colour":"dark","pos":"o5","x":15,"y":5},"o6":{"colour":"light","pos":"o6","x":15,"y":6},"o7":{"colour":"dark","pos":"o7","x":15,"y":7},"o8":{"colour":"light","pos":"o8","x":15,"y":8},"o9":{"colour":"dark","pos":"o9","x":15,"y":9},"p1":{"colour":"light","pos":"p1","x":16,"y":1},"p10":{"colour":"dark","pos":"p10","x":16,"y":10},"p11":{"colour":"light","pos":"p11","x":16,"y":11},"p12":{"colour":"dark","pos":"p12","x":16,"y":12},"p13":{"colour":"light","pos":"p13","x":16,"y":13},"p14":{"colour":"dark","pos":"p14","x":16,"y":14},"p15":{"colour":"light","pos":"p15","x":16,"y":15},"p16":{"colour":"dark","pos":"p16","x":16,"y":16},"p17":{"colour":"light","pos":"p17","x":16,"y":17},"p18":{"colour":"dark","pos":"p18","x":16,"y":18},"p19":{"colour":"light","pos":"p19","x":16,"y":19},"p2":{"colour":"dark","pos":"p2","x":16,"y":2},"p3":{"colour":"light","pos":"p3","x":16,"y":3},"p4":{"colour":"dark","pos":"p4","x":16,"y":4},"p5":{"colour":"light","pos":"p5","x":16,"y":5},"p6":{"colour":"dark","pos":"p6","x":16,"y":6},"p7":{"colour":"light","pos":"p7","x":16,"y":7},"p8":{"colour":"dark","pos":"p8","x":16,"y":8},"p9":{"colour":"light","pos":"p9","x":16,"y":9},"q1":{"colour":"dark","pos":"q1","x":17,"y":1},"q10":{"colour":"light","pos":"q10","x":17,"y":10},"q11":{"colour":"dark","pos":"q11","x":17,"y":11},"q12":{"colour":"light","pos":"q12","x":17,"y":12},"q13":{"colour":"dark","pos":"q13","x":17,"y":13},"q14":{"colour":"light","pos":"q14","x":17,"y":14},"q15":{"colour":"dark","pos":"q15","x":17,"y":15},"q16":{"colour":"light","pos":"q16","x":17,"y":16},"q17":{"colour":"dark","pos":"q17","x":17,"y":17},"q18":{"colour":"light","pos":"q18","x":17,"y":18},"q19":{"colour":"dark","pos":"q19","x":17,"y":19},"q2":{"colour":"light","pos":"q2","x":17,"y":2},"q3":{"colour":"dark","pos":"q3","x":17,"y":3},"q4":{"colour":"light","pos":"q4","x":17,"y":4},"q5":{"colour":"dark","pos":"q5","x":17,"y":5},"q6":{"colour":"light","pos":"q6","x":17,"y":6},"q7":{"colour":"dark","pos":"q7","x":17,"y":7},"q8":{"colour":"light","pos":"q8","x":17,"y":8},"q9":{"colour":"dark","pos":"q9","x":17,"y":9},"r1":{"colour":"light","pos":"r1","x":18,"y":1},"r10":{"colour":"dark","pos":"r10","x":18,"y":10},"r11":{"colour":"light","pos":"r11","x":18,"y":11},"r12":{"colour":"dark","pos":"r12","x":18,"y":12},"r13":{"colour":"light","pos":"r13","x":18,"y":13},"r14":{"colour":"dark","pos":"r14","x":18,"y":14},"r15":{"colour":"light","pos":"r15","x":18,"y":15},"r16":{"colour":"dark","pos":"r16","x":18,"y":16},"r17":{"colour":"light","pos":"r17","x":18,"y":17},"r18":{"colour":"dark","pos":"r18","x":18,"y":18},"r19":{"colour":"light","pos":"r19","x":18,"y":19},"r2":{"colour":"dark","pos":"r2","x":18,"y":2},"r3":{"colour":"light","pos":"r3","x":18,"y":3},"r4":{"colour":"dark","pos":"r4","x":18,"y":4},"r5":{"colour":"light","pos":"r5","x":18,"y":5},"r6":{"colour":"dark","pos":"r6","x":18,"y":6},"r7":{"colour":"light","pos":"r7","x":18,"y":7},"r8":{"colour":"dark","pos":"r8","x":18,"y":8},"r9":{"colour":"light","pos":"r9","x":18,"y":9},"s1":{"colour":"dark","pos":"s1","x":19,"y":1},"s10":{"colour":"light","pos":"s10","x":19,"y":10},"s11":{"colour":"dark","pos":"s11","x":19,"y":11},"s12":{"colour":"light","pos":"s12","x":19,"y":12},"s13":{"colour":"dark","pos":"s13","x":19,"y":13},"s14":{"colour":"light","pos":"s14","x":19,"y":14},"s15":{"colour":"dark","pos":"s15","x":19,"y":15},"s16":{"colour":"light","pos":"s16","x":19,"y":16},"s17":{"colour":"dark","pos":"s17","x":19,"y":17},"s18":{"colour":"light","pos":"s18","x":19,"y":18},"s19":{"colour":"dark","pos":"s19","x":19,"y":19},"s2":{"colour":"light","pos":"s2","x":19,"y":2},"s3":{"colour":"dark","pos":"s3","x":19,"y":3},"s4":{"colour":"light","pos":"s4","x":19,"y":4},"s5":{"colour":"dark","pos":"s5","x":19,"y":5},"s6":{"colour":"light","pos":"s6","x":19,"y":6},"s7":{"colour":"dark","pos":"s7","x":19,"y":7},"s8":{"colour":"light","pos":"s8","x":19,"y":8},"s9":{"colour":"dark","pos":"s9","x":19,"y":9}},"light":{"a10":{"colour":"light","pos":"a10","x":1,"y":10},"a12":{"colour":"light","pos":"a12","x":1,"y":12},"a14":{"colour":"light","pos":"a14","x":1,"y":14},"a16":{"colour":"light","pos":"a16","x":1,"y":16},"a18":{"colour":"light","pos":"a18","x":1,"y":18},"a2":{"colour":"light","pos":"a2","x":1,"y":2},"a4":{"colour":"light","pos":"a4","x":1,"y":4},"a6":{"colour":"light","pos":"a6","x":1,"y":6},"a8":{"colour":"light","pos":"a8","x":1,"y":8},"b1":{"colour":"light","pos":"b1","x":2,"y":1},"b11":{"colour":"light","pos":"b11","x":2,"y":11},"b13":{"colour":"light","pos":"b13","x":2,"y":13},"b15":{"colour":"light","pos":"b15","x":2,"y":15},"b17":{"colour":"light","pos":"b17","x":2,"y":17},"b19":{"colour":"light","pos":"b19","x":2,"y":19},"b3":{"colour":"light","pos":"b3","x":2,"y":3},"b5":{"colour":"light","pos":"b5","x":2,"y":5},"b7":{"colour":"light","pos":"b7","x":2,"y":7},"b9":{"colour":"light","pos":"b9","x":2,"y":9},"c10":{"colour":"light","pos":"c10","x":3,"y":10},"c12":{"colour":"light","pos":"c12","x":3,"y":12},"c14":{"colour":"light","pos":"c14","x":3,"y":14},"c16":{"colour":"light","pos":"c16","x":3,"y":16},"c18":{"colour":"light","pos":"c18","x":3,"y":18},"c2":{"colour":"light","pos":"c2","x":3,"y":2},"c4":{"colour":"light","pos":"c4","x":3,"y":4},"c6":{"colour":"light","pos":"c6","x":3,"y":6},"c8":{"colour":"light","pos":"c8","x":3,"y":8},"d1":{"colour":"light","pos":"d1","x":4,"y":1},"d11":{"colour":"light","pos":"d11","x":4,"y":11},"d13":{"colour":"light","pos":"d13","x":4,"y":13},"d15":{"colour":"light","pos":"d15","x":4,"y":15},"d17":{"colour":"light","pos":"d17","x":4,"y":17},"d19":{"colour":"light","pos":"d19","x":4,"y":19},"d3":{"colour":"light","pos":"d3","x":4,"y":3},"d5":{"colour":"light","pos":"d5","x":4,"y":5},"d7":{"colour":"light","pos":"d7","x":4,"y":7},"d9":{"colour":"light","pos":"d9","x":4,"y":9},"e10":{"colour":"light","pos":"e10","x":5,"y":10},"e12":{"colour":"light","pos":"e12","x":5,"y":12},"e14":{"colour":"light","pos":"e14","x":5,"y":14},"e16":{"colour":"light","pos":"e16","x":5,"y":16},"e18":{"colour":"light","pos":"e18","x":5,"y":18},"e2":{"colour":"light","pos":"e2","x":5,"y":2},"e4":{"colour":"light","pos":"e4","x":5,"y":4},"e6":{"colour":"light","pos":"e6","x":5,"y":6},"e8":{"colour":"light","pos":"e8","x":5,"y":8},"f1":{"colour":"light","pos":"f1","x":6,"y":1},"f11":{"colour":"light","pos":"f11","x":6,"y":11},"f13":{"colour":"light","pos":"f13","x":6,"y":13},"f15":{"colour":"light","pos":"f15","x":6,"y":15},"f17":{"colour":"light","pos":"f17","x":6,"y":17},"f19":{"colour":"light","pos":"f19","x":6,"y":19},"f3":{"colour":"light","pos":"f3","x":6,"y":3},"f5":{"colour":"light","pos":"f5","x":6,"y":5},"f7":{"colour":"light","pos":"f7","x":6,"y":7},"f9":{"colour":"light","pos":"f9","x":6,"y":9},"g10":{"colour":"light","pos":"g10","x":7,"y":10},"g12":{"colour":"light","pos":"g12","x":7,"y":12},"g14":{"colour":"light","pos":"g14","x":7,"y":14},"g16":{"colour":"light","pos":"g16","x":7,"y":16},"g18":{"colour":"light","pos":"g18","x":7,"y":18},"g2":{"colour":"light","pos":"g2","x":7,"y":2},"g4":{"colour":"light","pos":"g4","x":7,"y":4},"g6":{"colour":"light","pos":"g6","x":7,"y":6},"g8":{"colour":"light","pos":"g8","x":7,"y":8},"h1":{"colour":"light","pos":"h1","x":8,"y":1},"h11":{"colour":"light","pos":"h11","x":8,"y":11},"h13":{"colour":"light","pos":"h13","x":8,"y":13},"h15":{"colour":"light","pos":"h15","x":8,"y":15},"h17":{"colour":"light","pos":"h17","x":8,"y":17},"h19":{"colour":"light","pos":"h19","x":8,"y":19},"h3":{"colour":"light","pos":"h3","x":8,"y":3},"h5":{"colour":"light","pos":"h5","x":8,"y":5},"h7":{"colour":"light","pos":"h7","x":8,"y":7},"h9":{"colour":"light","pos":"h9","x":8,"y":9},"i10":{"colour":"light","pos":"i10","x":9,"y":10},"i12":{"colour":"light","pos":"i12","x":9,"y":12},"i14":{"colour":"light","pos":"i14","x":9,"y":14},"i16":{"colour":"light","pos":"i16","x":9,"y":16},"i18":{"colour":"light","pos":"i18","x":9,"y":18},"i2":{"colour":"light","pos":"i2","x":9,"y":2},"i4":{"colour":"light","pos":"i4","x":9,"y":4},"i6":{"colour":"light","pos":"i6","x":9,"y":6},"i8":{"colour":"light","pos":"i8","x":9,"y":8},"j1":{"colour":"light","pos":"j1","x":10,"y":1},"j11":{"colour":"light","pos":"j11","x":10,"y":11},"j13":{"colour":"light","pos":"j13","x":10,"y":13},"j15":{"colour":"light","pos":"j15","x":10,"y":15},"j17":{"colour":"light","pos":"j17","x":10,"y":17},"j19":{"colour":"light","pos":"j19","x":10,"y":19},"j3":{"colour":"light","pos":"j3","x":10,"y":3},"j5":{"colour":"light","pos":"j5","x":10,"y":5},"j7":{"colour":"light","pos":"j7","x":10,"y":7},"j9":{"colour":"light","pos":"j9","x":10,"y":9},"k10":{"colour":"light","pos":"k10","x":11,"y":10},"k12":{"colour":"light","pos":"k12","x":11,"y":12},"k14":{"colour":"light","pos":"k14","x":11,"y":14},"k16":{"colour":"light","pos":"k16","x":11,"y":16},"k18":{"colour":"light","pos":"k18","x":11,"y":18},"k2":{"colour":"light","pos":"k2","x":11,"y":2},"k4":{"colour":"light","pos":"k4","x":11,"y":4},"k6":{"colour":"light","pos":"k6","x":11,"y":6},"k8":{"colour":"light","pos":"k8","x":11,"y":8},"l1":{"colour":"light","pos":"l1","x":12,"y":1},"l11":{"colour":"light","pos":"l11","x":12,"y":11},"l13":{"colour":"light","pos":"l13","x":12,"y":13},"l15":{"colour":"light","pos":"l15","x":12,"y":15},"l17":{"colour":"light","pos":"l17","x":12,"y":17},"l19":{"colour":"light","pos":"l19","x":12,"y":19},"l3":{"colour":"light","pos":"l3","x":12,"y":3},"l5":{"colour":"light","pos":"l5","x":12,"y":5},"l7":{"colour":"light","pos":"l7","x":12,"y":7},"l9":{"colour":"light","pos":"l9","x":12,"y":9},"m10":{"colour":"light","pos":"m10","x":13,"y":10},"m12":{"colour":"light","pos":"m12","x":13,"y":12},"m14":{"colour":"light","pos":"m14","x":13,"y":14},"m16":{"colour":"light","pos":"m16","x":13,"y":16},"m18":{"colour":"light","pos":"m18","x":13,"y":18},"m2":{"colour":"light","pos":"m2","x":13,"y":2},"m4":{"colour":"light","pos":"m4","x":13,"y":4},"m6":{"colour":"light","pos":"m6","x":13,"y":6},"m8":{"colour":"light","pos":"m8","x":13,"y":8},"n1":{"colour":"light","pos":"n1","x":14,"y":1},"n11":{"colour":"light","pos":"n11","x":14,"y":11},"n13":{"colour":"light","pos":"n13","x":14,"y":13},"n15":{"colour":"light","pos":"n15","x":14,"y":15},"n17":{"colour":"light","pos":"n17","x":14,"y":17},"n19":{"colour":"light","pos":"n19","x":14,"y":19},"n3":{"colour":"light","pos":"n3","x":14,"y":3},"n5":{"colour":"light","pos":"n5","x":14,"y":5},"n7":{"colour":"light","pos":"n7","x":14,"y":7},"n9":{"colour":"light","pos":"n9","x":14,"y":9},"o10":{"colour":"light","pos":"o10","x":15,"y":10},"o12":{"colour":"light","pos":"o12","x":15,"y":12},"o14":{"colour":"light","pos":"o14","x":15,"y":14},"o16":{"colour":"light","pos":"o16","x":15,"y":16},"o18":{"colour":"light","pos":"o18","x":15,"y":18},"o2":{"colour":"light","pos":"o2","x":15,"y":2},"o4":{"colour":"light","pos":"o4","x":15,"y":4},"o6":{"colour":"light","pos":"o6","x":15,"y":6},"o8":{"colour":"light","pos":"o8","x":15,"y":8},"p1":{"colour":"light","pos":"p1","x":16,"y":1},"p11":{"colour":"light","pos":"p11","x":16,"y":11},"p13":{"colour":"light","pos":"p13","x":16,"y":13},"p15":{"colour":"light","pos":"p15","x":16,"y":15},"p17":{"colour":"light","pos":"p17","x":16,"y":17},"p19":{"colour":"light","pos":"p19","x":16,"y":19},"p3":{"colour":"light","pos":"p3","x":16,"y":3},"p5":{"colour":"light","pos":"p5","x":16,"y":5},"p7":{"colour":"light","pos":"p7","x":16,"y":7},"p9":{"colour":"light","pos":"p9","x":16,"y":9},"q10":{"colour":"light","pos":"q10","x":17,"y":10},"q12":{"colour":"light","pos":"q12","x":17,"y":12},"q14":{"colour":"light","pos":"q14","x":17,"y":14},"q16":{"colour":"light","pos":"q16","x":17,"y":16},"q18":{"colour":"light","pos":"q18","x":17,"y":18},"q2":{"colour":"light","pos":"q2","x":17,"y":2},"q4":{"colour":"light","pos":"q4","x":17,"y":4},"q6":{"colour":"light","pos":"q6","x":17,"y":6},"q8":{"colour":"light","pos":"q8","x":17,"y":8},"r1":{"colour":"light","pos":"r1","x":18,"y":1},"r11":{"colour":"light","pos":"r11","x":18,"y":11},"r13":{"colour":"light","pos":"r13","x":18,"y":13},"r15":{"colour":"light","pos":"r15","x":18,"y":15},"r17":{"colour":"light","pos":"r17","x":18,"y":17},"r19":{"colour":"light","pos":"r19","x":18,"y":19},"r3":{"colour":"light","pos":"r3","x":18,"y":3},"r5":{"colour":"light","pos":"r5","x":18,"y":5},"r7":{"colour":"light","pos":"r7","x":18,"y":7},"r9":{"colour":"light","pos":"r9","x":18,"y":9},"s10":{"colour":"light","pos":"s10","x":19,"y":10},"s12":{"colour":"light","pos":"s12","x":19,"y":12},"s14":{"colour":"light","pos":"s14","x":19,"y":14},"s16":{"colour":"light","pos":"s16","x":19,"y":16},"s18":{"colour":"light","pos":"s18","x":19,"y":18},"s2":{"colour":"light","pos":"s2","x":19,"y":2},"s4":{"colour":"light","pos":"s4","x":19,"y":4},"s6":{"colour":"light","pos":"s6","x":19,"y":6},"s8":{"colour":"light","pos":"s8","x":19,"y":8}},"dark":{"a1":{"colour":"dark","pos":"a1","x":1,"y":1},"a11":{"colour":"dark","pos":"a11","x":1,"y":11},"a13":{"colour":"dark","pos":"a13","x":1,"y":13},"a15":{"colour":"dark","pos":"a15","x":1,"y":15},"a17":{"colour":"dark","pos":"a17","x":1,"y":17},"a19":{"colour":"dark","pos":"a19","x":1,"y":19},"a3":{"colour":"dark","pos":"a3","x":1,"y":3},"a5":{"colour":"dark","pos":"a5","x":1,"y":5},"a7":{"colour":"dark","pos":"a7","x":1,"y":7},"a9":{"colour":"dark","pos":"a9","x":1,"y":9},"b10":{"colour":"dark","pos":"b10","x":2,"y":10},"b12":{"colour":"dark","pos":"b12","x":2,"y":12},"b14":{"colour":"dark","pos":"b14","x":2,"y":14},"b16":{"colour":"dark","pos":"b16","x":2,"y":16},"b18":{"colour":"dark","pos":"b18","x":2,"y":18},"b2":{"colour":"dark","pos":"b2","x":2,"y":2},"b4":{"colour":"dark","pos":"b4","x":2,"y":4},"b6":{"colour":"dark","pos":"b6","x":2,"y":6},"b8":{"colour":"dark","pos":"b8","x":2,"y":8},"c1":{"colour":"dark","pos":"c1","x":3,"y":1},"c11":{"colour":"dark","pos":"c11","x":3,"y":11},"c13":{"colour":"dark","pos":"c13","x":3,"y":13},"c15":{"colour":"dark","pos":"c15","x":3,"y":15},"c17":{"colour":"dark","pos":"c17","x":3,"y":17},"c19":{"colour":"dark","pos":"c19","x":3,"y":19},"c3":{"colour":"dark","pos":"c3","x":3,"y":3},"c5":{"colour":"dark","pos":"c5","x":3,"y":5},"c7":{"colour":"dark","pos":"c7","x":3,"y":7},"c9":{"colour":"dark","pos":"c9","x":3,"y":9},"d10":{"colour":"dark","pos":"d10","x":4,"y":10},"d12":{"colour":"dark","pos":"d12","x":4,"y":12},"d14":{"colour":"dark","pos":"d14","x":4,"y":14},"d16":{"colour":"dark","pos":"d16","x":4,"y":16},"d18":{"colour":"dark","pos":"d18","x":4,"y":18},"d2":{"colour":"dark","pos":"d2","x":4,"y":2},"d4":{"colour":"dark","pos":"d4","x":4,"y":4},"d6":{"colour":"dark","pos":"d6","x":4,"y":6},"d8":{"colour":"dark","pos":"d8","x":4,"y":8},"e1":{"colour":"dark","pos":"e1","x":5,"y":1},"e11":{"colour":"dark","pos":"e11","x":5,"y":11},"e13":{"colour":"dark","pos":"e13","x":5,"y":13},"e15":{"colour":"dark","pos":"e15","x":5,"y":15},"e17":{"colour":"dark","pos":"e17","x":5,"y":17},"e19":{"colour":"dark","pos":"e19","x":5,"y":19},"e3":{"colour":"dark","pos":"e3","x":5,"y":3},"e5":{"colour":"dark","pos":"e5","x":5,"y":5},"e7":{"colour":"dark","pos":"e7","x":5,"y":7},"e9":{"colour":"dark","pos":"e9","x":5,"y":9},"f10":{"colour":"dark","pos":"f10","x":6,"y":10},"f12":{"colour":"dark","pos":"f12","x":6,"y":12},"f14":{"colour":"dark","pos":"f14","x":6,"y":14},"f16":{"colour":"dark","pos":"f16","x":6,"y":16},"f18":{"colour":"dark","pos":"f18","x":6,"y":18},"f2":{"colour":"dark","pos":"f2","x":6,"y":2},"f4":{"colour":"dark","pos":"f4","x":6,"y":4},"f6":{"colour":"dark","pos":"f6","x":6,"y":6},"f8":{"colour":"dark","pos":"f8","x":6,"y":8},"g1":{"colour":"dark","pos":"g1","x":7,"y":1},"g11":{"colour":"dark","pos":"g11","x":7,"y":11},"g13":{"colour":"dark","pos":"g13","x":7,"y":13},"g15":{"colour":"dark","pos":"g15","x":7,"y":15},"g17":{"colour":"dark","pos":"g17","x":7,"y":17},"g19":{"colour":"dark","pos":"g19","x":7,"y":19},"g3":{"colour":"dark","pos":"g3","x":7,"y":3},"g5":{"colour":"dark","pos":"g5","x":7,"y":5},"g7":{"colour":"dark","pos":"g7","x":7,"y":7},"g9":{"colour":"dark","pos":"g9","x":7,"y":9},"h10":{"colour":"dark","pos":"h10","x":8,"y":10},"h12":{"colour":"dark","pos":"h12","x":8,"y":12},"h14":{"colour":"dark","pos":"h14","x":8,"y":14},"h16":{"colour":"dark","pos":"h16","x":8,"y":16},"h18":{"colour":"dark","pos":"h18","x":8,"y":18},"h2":{"colour":"dark","pos":"h2","x":8,"y":2},"h4":{"colour":"dark","pos":"h4","x":8,"y":4},"h6":{"colour":"dark","pos":"h6","x":8,"y":6},"h8":{"colour":"dark","pos":"h8","x":8,"y":8},"i1":{"colour":"dark","pos":"i1","x":9,"y":1},"i11":{"colour":"dark","pos":"i11","x":9,"y":11},"i13":{"colour":"dark","pos":"i13","x":9,"y":13},"i15":{"colour":"dark","pos":"i15","x":9,"y":15},"i17":{"colour":"dark","pos":"i17","x":9,"y":17},"i19":{"colour":"dark","pos":"i19","x":9,"y":19},"i3":{"colour":"dark","pos":"i3","x":9,"y":3},"i5":{"colour":"dark","pos":"i5","x":9,"y":5},"i7":{"colour":"dark","pos":"i7","x":9,"y":7},"i9":{"colour":"dark","pos":"i9","x":9,"y":9},"j10":{"colour":"dark","pos":"j10","x":10,"y":10},"j12":{"colour":"dark","pos":"j12","x":10,"y":12},"j14":{"colour":"dark","pos":"j14","x":10,"y":14},"j16":{"colour":"dark","pos":"j16","x":10,"y":16},"j18":{"colour":"dark","pos":"j18","x":10,"y":18},"j2":{"colour":"dark","pos":"j2","x":10,"y":2},"j4":{"colour":"dark","pos":"j4","x":10,"y":4},"j6":{"colour":"dark","pos":"j6","x":10,"y":6},"j8":{"colour":"dark","pos":"j8","x":10,"y":8},"k1":{"colour":"dark","pos":"k1","x":11,"y":1},"k11":{"colour":"dark","pos":"k11","x":11,"y":11},"k13":{"colour":"dark","pos":"k13","x":11,"y":13},"k15":{"colour":"dark","pos":"k15","x":11,"y":15},"k17":{"colour":"dark","pos":"k17","x":11,"y":17},"k19":{"colour":"dark","pos":"k19","x":11,"y":19},"k3":{"colour":"dark","pos":"k3","x":11,"y":3},"k5":{"colour":"dark","pos":"k5","x":11,"y":5},"k7":{"colour":"dark","pos":"k7","x":11,"y":7},"k9":{"colour":"dark","pos":"k9","x":11,"y":9},"l10":{"colour":"dark","pos":"l10","x":12,"y":10},"l12":{"colour":"dark","pos":"l12","x":12,"y":12},"l14":{"colour":"dark","pos":"l14","x":12,"y":14},"l16":{"colour":"dark","pos":"l16","x":12,"y":16},"l18":{"colour":"dark","pos":"l18","x":12,"y":18},"l2":{"colour":"dark","pos":"l2","x":12,"y":2},"l4":{"colour":"dark","pos":"l4","x":12,"y":4},"l6":{"colour":"dark","pos":"l6","x":12,"y":6},"l8":{"colour":"dark","pos":"l8","x":12,"y":8},"m1":{"colour":"dark","pos":"m1","x":13,"y":1},"m11":{"colour":"dark","pos":"m11","x":13,"y":11},"m13":{"colour":"dark","pos":"m13","x":13,"y":13},"m15":{"colour":"dark","pos":"m15","x":13,"y":15},"m17":{"colour":"dark","pos":"m17","x":13,"y":17},"m19":{"colour":"dark","pos":"m19","x":13,"y":19},"m3":{"colour":"dark","pos":"m3","x":13,"y":3},"m5":{"colour":"dark","pos":"m5","x":13,"y":5},"m7":{"colour":"dark","pos":"m7","x":13,"y":7},"m9":{"colour":"dark","pos":"m9","x":13,"y":9},"n10":{"colour":"dark","pos":"n10","x":14,"y":10},"n12":{"colour":"dark","pos":"n12","x":14,"y":12},"n14":{"colour":"dark","pos":"n14","x":14,"y":14},"n16":{"colour":"dark","pos":"n16","x":14,"y":16},"n18":{"colour":"dark","pos":"n18","x":14,"y":18},"n2":{"colour":"dark","pos":"n2","x":14,"y":2},"n4":{"colour":"dark","pos":"n4","x":14,"y":4},"n6":{"colour":"dark","pos":"n6","x":14,"y":6},"n8":{"colour":"dark","pos":"n8","x":14,"y":8},"o1":{"colour":"dark","pos":"o1","x":15,"y":1},"o11":{"colour":"dark","pos":"o11","x":15,"y":11},"o13":{"colour":"dark","pos":"o13","x":15,"y":13},"o15":{"colour":"dark","pos":"o15","x":15,"y":15},"o17":{"colour":"dark","pos":"o17","x":15,"y":17},"o19":{"colour":"dark","pos":"o19","x":15,"y":19},"o3":{"colour":"dark","pos":"o3","x":15,"y":3},"o5":{"colour":"dark","pos":"o5","x":15,"y":5},"o7":{"colour":"dark","pos":"o7","x":15,"y":7},"o9":{"colour":"dark","pos":"o9","x":15,"y":9},"p10":{"colour":"dark","pos":"p10","x":16,"y":10},"p12":{"colour":"dark","pos":"p12","x":16,"y":12},"p14":{"colour":"dark","pos":"p14","x":16,"y":14},"p16":{"colour":"dark","pos":"p16","x":16,"y":16},"p18":{"colour":"dark","pos":"p18","x":16,"y":18},"p2":{"colour":"dark","pos":"p2","x":16,"y":2},"p4":{"colour":"dark","pos":"p4","x":16,"y":4},"p6":{"colour":"dark","pos":"p6","x":16,"y":6},"p8":{"colour":"dark","pos":"p8","x":16,"y":8},"q1":{"colour":"dark","pos":"q1","x":17,"y":1},"q11":{"colour":"dark","pos":"q11","x":17,"y":11},"q13":{"colour":"dark","pos":"q13","x":17,"y":13},"q15":{"colour":"dark","pos":"q15","x":17,"y":15},"q17":{"colour":"dark","pos":"q17","x":17,"y":17},"q19":{"colour":"dark","pos":"q19","x":17,"y":19},"q3":{"colour":"dark","pos":"q3","x":17,"y":3},"q5":{"colour":"dark","pos":"q5","x":17,"y":5},"q7":{"colour":"dark","pos":"q7","x":17,"y":7},"q9":{"colour":"dark","pos":"q9","x":17,"y":9},"r10":{"colour":"dark","pos":"r10","x":18,"y":10},"r12":{"colour":"dark","pos":"r12","x":18,"y":12},"r14":{"colour":"dark","pos":"r14","x":18,"y":14},"r16":{"colour":"dark","pos":"r16","x":18,"y":16},"r18":{"colour":"dark","pos":"r18","x":18,"y":18},"r2":{"colour":"dark","pos":"r2","x":18,"y":2},"r4":{"colour":"dark","pos":"r4","x":18,"y":4},"r6":{"colour":"dark","pos":"r6","x":18,"y":6},"r8":{"colour":"dark","pos":"r8","x":18,"y":8},"s1":{"colour":"dark","pos":"s1","x":19,"y":1},"s11":{"colour":"dark","pos":"s11","x":19,"y":11},"s13":{"colour":"dark","pos":"s13","x":19,"y":13},"s15":{"colour":"dark","pos":"s15","x":19,"y":15},"s17":{"colour":"dark","pos":"s17","x":19,"y":17},"s19":{"colour":"dark","pos":"s19","x":19,"y":19},"s3":{"colour":"dark","pos":"s3","x":19,"y":3},"s5":{"colour":"dark","pos":"s5","x":19,"y":5},"s7":{"colour":"dark","pos":"s7","x":19,"y":7},"s9":{"colour":"dark","pos":"s9","x":19,"y":9}}};var relativedirs=[1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];(function(){var TERRAIN={"walls":{"c2":{"pos":"c2"},"c3":{"pos":"c3"},"c4":{"pos":"c4"},"c5":{"pos":"c5"},"c6":{"pos":"c6"},"c7":{"pos":"c7"},"c8":{"pos":"c8"},"f1":{"pos":"f1"},"f2":{"pos":"f2"},"f3":{"pos":"f3"},"f4":{"pos":"f4"},"f5":{"pos":"f5"},"f6":{"pos":"f6"},"h2":{"pos":"h2"},"h3":{"pos":"h3"},"h4":{"pos":"h4"},"h5":{"pos":"h5"},"h6":{"pos":"h6"},"l2":{"pos":"l2"},"l3":{"pos":"l3"},"l4":{"pos":"l4"},"l5":{"pos":"l5"},"l6":{"pos":"l6"},"n1":{"pos":"n1"},"n2":{"pos":"n2"},"n3":{"pos":"n3"},"n4":{"pos":"n4"},"n5":{"pos":"n5"},"n6":{"pos":"n6"},"q2":{"pos":"q2"},"q3":{"pos":"q3"},"q4":{"pos":"q4"},"q5":{"pos":"q5"},"q6":{"pos":"q6"},"q7":{"pos":"q7"},"q8":{"pos":"q8"},"d8":{"pos":"d8"},"e8":{"pos":"e8"},"f8":{"pos":"f8"},"g8":{"pos":"g8"},"h8":{"pos":"h8"},"i8":{"pos":"i8"},"k8":{"pos":"k8"},"l8":{"pos":"l8"},"m8":{"pos":"m8"},"n8":{"pos":"n8"},"o8":{"pos":"o8"},"p8":{"pos":"p8"},"i6":{"pos":"i6"},"j6":{"pos":"j6"},"k6":{"pos":"k6"},"i2":{"pos":"i2"},"k2":{"pos":"k2"},"c12":{"pos":"c12"},"c13":{"pos":"c13"},"c14":{"pos":"c14"},"c15":{"pos":"c15"},"c16":{"pos":"c16"},"c17":{"pos":"c17"},"c18":{"pos":"c18"},"f14":{"pos":"f14"},"f15":{"pos":"f15"},"f16":{"pos":"f16"},"f17":{"pos":"f17"},"f18":{"pos":"f18"},"f19":{"pos":"f19"},"h14":{"pos":"h14"},"h15":{"pos":"h15"},"h16":{"pos":"h16"},"h17":{"pos":"h17"},"h18":{"pos":"h18"},"l14":{"pos":"l14"},"l15":{"pos":"l15"},"l16":{"pos":"l16"},"l17":{"pos":"l17"},"l18":{"pos":"l18"},"n14":{"pos":"n14"},"n15":{"pos":"n15"},"n16":{"pos":"n16"},"n17":{"pos":"n17"},"n18":{"pos":"n18"},"n19":{"pos":"n19"},"q12":{"pos":"q12"},"q13":{"pos":"q13"},"q14":{"pos":"q14"},"q15":{"pos":"q15"},"q16":{"pos":"q16"},"q17":{"pos":"q17"},"q18":{"pos":"q18"},"d12":{"pos":"d12"},"e12":{"pos":"e12"},"f12":{"pos":"f12"},"g12":{"pos":"g12"},"h12":{"pos":"h12"},"i12":{"pos":"i12"},"k12":{"pos":"k12"},"l12":{"pos":"l12"},"m12":{"pos":"m12"},"n12":{"pos":"n12"},"o12":{"pos":"o12"},"p12":{"pos":"p12"},"i14":{"pos":"i14"},"j14":{"pos":"j14"},"k14":{"pos":"k14"},"i18":{"pos":"i18"},"k18":{"pos":"k18"}},"thrones":{"j4":{"pos":"j4","owner":1},"j16":{"pos":"j16","owner":2}},"mythrones":{"j4":{"pos":"j4","owner":1}},"oppthrones":{"j16":{"pos":"j16","owner":2}},"nowalls":{"a1":{"pos":"a1"},"a10":{"pos":"a10"},"a11":{"pos":"a11"},"a12":{"pos":"a12"},"a13":{"pos":"a13"},"a14":{"pos":"a14"},"a15":{"pos":"a15"},"a16":{"pos":"a16"},"a17":{"pos":"a17"},"a18":{"pos":"a18"},"a19":{"pos":"a19"},"a2":{"pos":"a2"},"a3":{"pos":"a3"},"a4":{"pos":"a4"},"a5":{"pos":"a5"},"a6":{"pos":"a6"},"a7":{"pos":"a7"},"a8":{"pos":"a8"},"a9":{"pos":"a9"},"b1":{"pos":"b1"},"b10":{"pos":"b10"},"b11":{"pos":"b11"},"b12":{"pos":"b12"},"b13":{"pos":"b13"},"b14":{"pos":"b14"},"b15":{"pos":"b15"},"b16":{"pos":"b16"},"b17":{"pos":"b17"},"b18":{"pos":"b18"},"b19":{"pos":"b19"},"b2":{"pos":"b2"},"b3":{"pos":"b3"},"b4":{"pos":"b4"},"b5":{"pos":"b5"},"b6":{"pos":"b6"},"b7":{"pos":"b7"},"b8":{"pos":"b8"},"b9":{"pos":"b9"},"c1":{"pos":"c1"},"c10":{"pos":"c10"},"c11":{"pos":"c11"},"c19":{"pos":"c19"},"c9":{"pos":"c9"},"d1":{"pos":"d1"},"d10":{"pos":"d10"},"d11":{"pos":"d11"},"d13":{"pos":"d13"},"d14":{"pos":"d14"},"d15":{"pos":"d15"},"d16":{"pos":"d16"},"d17":{"pos":"d17"},"d18":{"pos":"d18"},"d19":{"pos":"d19"},"d2":{"pos":"d2"},"d3":{"pos":"d3"},"d4":{"pos":"d4"},"d5":{"pos":"d5"},"d6":{"pos":"d6"},"d7":{"pos":"d7"},"d9":{"pos":"d9"},"e1":{"pos":"e1"},"e10":{"pos":"e10"},"e11":{"pos":"e11"},"e13":{"pos":"e13"},"e14":{"pos":"e14"},"e15":{"pos":"e15"},"e16":{"pos":"e16"},"e17":{"pos":"e17"},"e18":{"pos":"e18"},"e19":{"pos":"e19"},"e2":{"pos":"e2"},"e3":{"pos":"e3"},"e4":{"pos":"e4"},"e5":{"pos":"e5"},"e6":{"pos":"e6"},"e7":{"pos":"e7"},"e9":{"pos":"e9"},"f10":{"pos":"f10"},"f11":{"pos":"f11"},"f13":{"pos":"f13"},"f7":{"pos":"f7"},"f9":{"pos":"f9"},"g1":{"pos":"g1"},"g10":{"pos":"g10"},"g11":{"pos":"g11"},"g13":{"pos":"g13"},"g14":{"pos":"g14"},"g15":{"pos":"g15"},"g16":{"pos":"g16"},"g17":{"pos":"g17"},"g18":{"pos":"g18"},"g19":{"pos":"g19"},"g2":{"pos":"g2"},"g3":{"pos":"g3"},"g4":{"pos":"g4"},"g5":{"pos":"g5"},"g6":{"pos":"g6"},"g7":{"pos":"g7"},"g9":{"pos":"g9"},"h1":{"pos":"h1"},"h10":{"pos":"h10"},"h11":{"pos":"h11"},"h13":{"pos":"h13"},"h19":{"pos":"h19"},"h7":{"pos":"h7"},"h9":{"pos":"h9"},"i1":{"pos":"i1"},"i10":{"pos":"i10"},"i11":{"pos":"i11"},"i13":{"pos":"i13"},"i15":{"pos":"i15"},"i16":{"pos":"i16"},"i17":{"pos":"i17"},"i19":{"pos":"i19"},"i3":{"pos":"i3"},"i4":{"pos":"i4"},"i5":{"pos":"i5"},"i7":{"pos":"i7"},"i9":{"pos":"i9"},"j1":{"pos":"j1"},"j10":{"pos":"j10"},"j11":{"pos":"j11"},"j12":{"pos":"j12"},"j13":{"pos":"j13"},"j15":{"pos":"j15"},"j16":{"pos":"j16"},"j17":{"pos":"j17"},"j18":{"pos":"j18"},"j19":{"pos":"j19"},"j2":{"pos":"j2"},"j3":{"pos":"j3"},"j4":{"pos":"j4"},"j5":{"pos":"j5"},"j7":{"pos":"j7"},"j8":{"pos":"j8"},"j9":{"pos":"j9"},"k1":{"pos":"k1"},"k10":{"pos":"k10"},"k11":{"pos":"k11"},"k13":{"pos":"k13"},"k15":{"pos":"k15"},"k16":{"pos":"k16"},"k17":{"pos":"k17"},"k19":{"pos":"k19"},"k3":{"pos":"k3"},"k4":{"pos":"k4"},"k5":{"pos":"k5"},"k7":{"pos":"k7"},"k9":{"pos":"k9"},"l1":{"pos":"l1"},"l10":{"pos":"l10"},"l11":{"pos":"l11"},"l13":{"pos":"l13"},"l19":{"pos":"l19"},"l7":{"pos":"l7"},"l9":{"pos":"l9"},"m1":{"pos":"m1"},"m10":{"pos":"m10"},"m11":{"pos":"m11"},"m13":{"pos":"m13"},"m14":{"pos":"m14"},"m15":{"pos":"m15"},"m16":{"pos":"m16"},"m17":{"pos":"m17"},"m18":{"pos":"m18"},"m19":{"pos":"m19"},"m2":{"pos":"m2"},"m3":{"pos":"m3"},"m4":{"pos":"m4"},"m5":{"pos":"m5"},"m6":{"pos":"m6"},"m7":{"pos":"m7"},"m9":{"pos":"m9"},"n10":{"pos":"n10"},"n11":{"pos":"n11"},"n13":{"pos":"n13"},"n7":{"pos":"n7"},"n9":{"pos":"n9"},"o1":{"pos":"o1"},"o10":{"pos":"o10"},"o11":{"pos":"o11"},"o13":{"pos":"o13"},"o14":{"pos":"o14"},"o15":{"pos":"o15"},"o16":{"pos":"o16"},"o17":{"pos":"o17"},"o18":{"pos":"o18"},"o19":{"pos":"o19"},"o2":{"pos":"o2"},"o3":{"pos":"o3"},"o4":{"pos":"o4"},"o5":{"pos":"o5"},"o6":{"pos":"o6"},"o7":{"pos":"o7"},"o9":{"pos":"o9"},"p1":{"pos":"p1"},"p10":{"pos":"p10"},"p11":{"pos":"p11"},"p13":{"pos":"p13"},"p14":{"pos":"p14"},"p15":{"pos":"p15"},"p16":{"pos":"p16"},"p17":{"pos":"p17"},"p18":{"pos":"p18"},"p19":{"pos":"p19"},"p2":{"pos":"p2"},"p3":{"pos":"p3"},"p4":{"pos":"p4"},"p5":{"pos":"p5"},"p6":{"pos":"p6"},"p7":{"pos":"p7"},"p9":{"pos":"p9"},"q1":{"pos":"q1"},"q10":{"pos":"q10"},"q11":{"pos":"q11"},"q19":{"pos":"q19"},"q9":{"pos":"q9"},"r1":{"pos":"r1"},"r10":{"pos":"r10"},"r11":{"pos":"r11"},"r12":{"pos":"r12"},"r13":{"pos":"r13"},"r14":{"pos":"r14"},"r15":{"pos":"r15"},"r16":{"pos":"r16"},"r17":{"pos":"r17"},"r18":{"pos":"r18"},"r19":{"pos":"r19"},"r2":{"pos":"r2"},"r3":{"pos":"r3"},"r4":{"pos":"r4"},"r5":{"pos":"r5"},"r6":{"pos":"r6"},"r7":{"pos":"r7"},"r8":{"pos":"r8"},"r9":{"pos":"r9"},"s1":{"pos":"s1"},"s10":{"pos":"s10"},"s11":{"pos":"s11"},"s12":{"pos":"s12"},"s13":{"pos":"s13"},"s14":{"pos":"s14"},"s15":{"pos":"s15"},"s16":{"pos":"s16"},"s17":{"pos":"s17"},"s18":{"pos":"s18"},"s19":{"pos":"s19"},"s2":{"pos":"s2"},"s3":{"pos":"s3"},"s4":{"pos":"s4"},"s5":{"pos":"s5"},"s6":{"pos":"s6"},"s7":{"pos":"s7"},"s8":{"pos":"s8"},"s9":{"pos":"s9"}}};var ownernames=["neutral","my","opp"];var player=1;var otherplayer=2;game.selectunit1=function(turn,step,markpos){var ARTIFACTS={movetargets:Object.assign({},step.ARTIFACTS.movetargets)};var UNITLAYERS=step.UNITLAYERS;var MARKS={selectunit:markpos};var STARTPOS=MARKS['selectunit'];var neighbourdirs=[1,3,5,7];var startconnections=connections[STARTPOS];for(var dirnbr=0;dirnbr<4;dirnbr++){var POS=startconnections[neighbourdirs[dirnbr]];if(POS&&(!!TERRAIN.walls[STARTPOS]&&!TERRAIN.walls[POS]||!TERRAIN.walls[STARTPOS]&&!!TERRAIN.walls[POS])){if(!UNITLAYERS.myunits[POS]){ARTIFACTS['movetargets'][POS]={};}}}var BLOCKS=UNITLAYERS.units;var STARTPOS=MARKS['selectunit'];var allowedsteps=!!TERRAIN.walls[STARTPOS]?TERRAIN.walls:function(){var ret={},s0=TERRAIN.nowalls,s1=TERRAIN.mythrones;for(var key in s0){if(!s1[key]){ret[key]=s0[key];}}return ret;}();var allwalkerdirs=[1,3,5,7];for(var walkerdirnbr=0;walkerdirnbr<4;walkerdirnbr++){var POS=STARTPOS;while((POS=connections[POS][allwalkerdirs[walkerdirnbr]])&&allowedsteps[POS]&&!BLOCKS[POS]){ARTIFACTS['movetargets'][POS]={};}if(BLOCKS[POS]&&allowedsteps[POS]){if(UNITLAYERS.oppunits[POS]){ARTIFACTS['movetargets'][POS]={};}}}var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectunit'});turn.links[newstepid]={};var newlinks=turn.links[newstepid];for(var linkpos in ARTIFACTS.movetargets){newlinks[linkpos]='selectmovetarget1';}return newstep;};game.selectunit1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.selectmovetarget1=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectmovetarget:markpos,selectunit:step.MARKS.selectunit};var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectmovetarget'});turn.links[newstepid]={};turn.links[newstepid].move='move1';return newstep;};game.selectmovetarget1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.move1=function(turn,step){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var MARKS=step.MARKS;var UNITDATA=Object.assign({},step.UNITDATA);var UNITLAYERS=step.UNITLAYERS;var unitid=(UNITLAYERS.units[MARKS['selectunit']]||{}).id;if(unitid){UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{'pos':MARKS['selectmovetarget']});delete UNITDATA[(UNITLAYERS.units[MARKS['selectmovetarget']]||{}).id];}MARKS={};UNITLAYERS={"soldiers":{},"mysoldiers":{},"oppsoldiers":{},"neutralsoldiers":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}ARTIFACTS={"movetargets":{}};var newstepid=step.stepid+'-'+'move';var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,stepid:newstepid,name:'move',path:step.path.concat('move')});turn.links[newstepid]={};if(Object.keys(function(){var ret={},s0=UNITLAYERS.myunits,s1=TERRAIN.oppthrones;for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}()||{}).length!==0){var winner=1;var result=winner===1?'win':winner?'lose':'draw';turn.links[newstepid][result]='infiltration';}else if(Object.keys(UNITLAYERS.oppunits||{}).length===0){var winner=1;var result=winner===1?'win':winner?'lose':'draw';turn.links[newstepid][result]='genocide';}else turn.links[newstepid].endturn="start"+otherplayer;return newstep;};game.move1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.start1=function(turn,step){var turn={steps:{},player:player,turn:turn.turn+1,links:{root:{}}};var MARKS={};var ARTIFACTS={"movetargets":{}};var UNITDATA=step.UNITDATA;var UNITLAYERS={"soldiers":{},"mysoldiers":{},"oppsoldiers":{},"neutralsoldiers":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}var newstep=turn.steps.root={ARTIFACTS:ARTIFACTS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,MARKS:MARKS,stepid:'root',name:'start',path:[]};var newlinks=turn.links.root;for(var linkpos in UNITLAYERS.myunits){newlinks[linkpos]='selectunit1';}return turn;};game.start1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.debug1=function(){return{TERRAIN:TERRAIN};};})();(function(){var TERRAIN={"walls":{"c2":{"pos":"c2"},"c3":{"pos":"c3"},"c4":{"pos":"c4"},"c5":{"pos":"c5"},"c6":{"pos":"c6"},"c7":{"pos":"c7"},"c8":{"pos":"c8"},"f1":{"pos":"f1"},"f2":{"pos":"f2"},"f3":{"pos":"f3"},"f4":{"pos":"f4"},"f5":{"pos":"f5"},"f6":{"pos":"f6"},"h2":{"pos":"h2"},"h3":{"pos":"h3"},"h4":{"pos":"h4"},"h5":{"pos":"h5"},"h6":{"pos":"h6"},"l2":{"pos":"l2"},"l3":{"pos":"l3"},"l4":{"pos":"l4"},"l5":{"pos":"l5"},"l6":{"pos":"l6"},"n1":{"pos":"n1"},"n2":{"pos":"n2"},"n3":{"pos":"n3"},"n4":{"pos":"n4"},"n5":{"pos":"n5"},"n6":{"pos":"n6"},"q2":{"pos":"q2"},"q3":{"pos":"q3"},"q4":{"pos":"q4"},"q5":{"pos":"q5"},"q6":{"pos":"q6"},"q7":{"pos":"q7"},"q8":{"pos":"q8"},"d8":{"pos":"d8"},"e8":{"pos":"e8"},"f8":{"pos":"f8"},"g8":{"pos":"g8"},"h8":{"pos":"h8"},"i8":{"pos":"i8"},"k8":{"pos":"k8"},"l8":{"pos":"l8"},"m8":{"pos":"m8"},"n8":{"pos":"n8"},"o8":{"pos":"o8"},"p8":{"pos":"p8"},"i6":{"pos":"i6"},"j6":{"pos":"j6"},"k6":{"pos":"k6"},"i2":{"pos":"i2"},"k2":{"pos":"k2"},"c12":{"pos":"c12"},"c13":{"pos":"c13"},"c14":{"pos":"c14"},"c15":{"pos":"c15"},"c16":{"pos":"c16"},"c17":{"pos":"c17"},"c18":{"pos":"c18"},"f14":{"pos":"f14"},"f15":{"pos":"f15"},"f16":{"pos":"f16"},"f17":{"pos":"f17"},"f18":{"pos":"f18"},"f19":{"pos":"f19"},"h14":{"pos":"h14"},"h15":{"pos":"h15"},"h16":{"pos":"h16"},"h17":{"pos":"h17"},"h18":{"pos":"h18"},"l14":{"pos":"l14"},"l15":{"pos":"l15"},"l16":{"pos":"l16"},"l17":{"pos":"l17"},"l18":{"pos":"l18"},"n14":{"pos":"n14"},"n15":{"pos":"n15"},"n16":{"pos":"n16"},"n17":{"pos":"n17"},"n18":{"pos":"n18"},"n19":{"pos":"n19"},"q12":{"pos":"q12"},"q13":{"pos":"q13"},"q14":{"pos":"q14"},"q15":{"pos":"q15"},"q16":{"pos":"q16"},"q17":{"pos":"q17"},"q18":{"pos":"q18"},"d12":{"pos":"d12"},"e12":{"pos":"e12"},"f12":{"pos":"f12"},"g12":{"pos":"g12"},"h12":{"pos":"h12"},"i12":{"pos":"i12"},"k12":{"pos":"k12"},"l12":{"pos":"l12"},"m12":{"pos":"m12"},"n12":{"pos":"n12"},"o12":{"pos":"o12"},"p12":{"pos":"p12"},"i14":{"pos":"i14"},"j14":{"pos":"j14"},"k14":{"pos":"k14"},"i18":{"pos":"i18"},"k18":{"pos":"k18"}},"thrones":{"j4":{"pos":"j4","owner":1},"j16":{"pos":"j16","owner":2}},"oppthrones":{"j4":{"pos":"j4","owner":1}},"mythrones":{"j16":{"pos":"j16","owner":2}},"nowalls":{"a1":{"pos":"a1"},"a10":{"pos":"a10"},"a11":{"pos":"a11"},"a12":{"pos":"a12"},"a13":{"pos":"a13"},"a14":{"pos":"a14"},"a15":{"pos":"a15"},"a16":{"pos":"a16"},"a17":{"pos":"a17"},"a18":{"pos":"a18"},"a19":{"pos":"a19"},"a2":{"pos":"a2"},"a3":{"pos":"a3"},"a4":{"pos":"a4"},"a5":{"pos":"a5"},"a6":{"pos":"a6"},"a7":{"pos":"a7"},"a8":{"pos":"a8"},"a9":{"pos":"a9"},"b1":{"pos":"b1"},"b10":{"pos":"b10"},"b11":{"pos":"b11"},"b12":{"pos":"b12"},"b13":{"pos":"b13"},"b14":{"pos":"b14"},"b15":{"pos":"b15"},"b16":{"pos":"b16"},"b17":{"pos":"b17"},"b18":{"pos":"b18"},"b19":{"pos":"b19"},"b2":{"pos":"b2"},"b3":{"pos":"b3"},"b4":{"pos":"b4"},"b5":{"pos":"b5"},"b6":{"pos":"b6"},"b7":{"pos":"b7"},"b8":{"pos":"b8"},"b9":{"pos":"b9"},"c1":{"pos":"c1"},"c10":{"pos":"c10"},"c11":{"pos":"c11"},"c19":{"pos":"c19"},"c9":{"pos":"c9"},"d1":{"pos":"d1"},"d10":{"pos":"d10"},"d11":{"pos":"d11"},"d13":{"pos":"d13"},"d14":{"pos":"d14"},"d15":{"pos":"d15"},"d16":{"pos":"d16"},"d17":{"pos":"d17"},"d18":{"pos":"d18"},"d19":{"pos":"d19"},"d2":{"pos":"d2"},"d3":{"pos":"d3"},"d4":{"pos":"d4"},"d5":{"pos":"d5"},"d6":{"pos":"d6"},"d7":{"pos":"d7"},"d9":{"pos":"d9"},"e1":{"pos":"e1"},"e10":{"pos":"e10"},"e11":{"pos":"e11"},"e13":{"pos":"e13"},"e14":{"pos":"e14"},"e15":{"pos":"e15"},"e16":{"pos":"e16"},"e17":{"pos":"e17"},"e18":{"pos":"e18"},"e19":{"pos":"e19"},"e2":{"pos":"e2"},"e3":{"pos":"e3"},"e4":{"pos":"e4"},"e5":{"pos":"e5"},"e6":{"pos":"e6"},"e7":{"pos":"e7"},"e9":{"pos":"e9"},"f10":{"pos":"f10"},"f11":{"pos":"f11"},"f13":{"pos":"f13"},"f7":{"pos":"f7"},"f9":{"pos":"f9"},"g1":{"pos":"g1"},"g10":{"pos":"g10"},"g11":{"pos":"g11"},"g13":{"pos":"g13"},"g14":{"pos":"g14"},"g15":{"pos":"g15"},"g16":{"pos":"g16"},"g17":{"pos":"g17"},"g18":{"pos":"g18"},"g19":{"pos":"g19"},"g2":{"pos":"g2"},"g3":{"pos":"g3"},"g4":{"pos":"g4"},"g5":{"pos":"g5"},"g6":{"pos":"g6"},"g7":{"pos":"g7"},"g9":{"pos":"g9"},"h1":{"pos":"h1"},"h10":{"pos":"h10"},"h11":{"pos":"h11"},"h13":{"pos":"h13"},"h19":{"pos":"h19"},"h7":{"pos":"h7"},"h9":{"pos":"h9"},"i1":{"pos":"i1"},"i10":{"pos":"i10"},"i11":{"pos":"i11"},"i13":{"pos":"i13"},"i15":{"pos":"i15"},"i16":{"pos":"i16"},"i17":{"pos":"i17"},"i19":{"pos":"i19"},"i3":{"pos":"i3"},"i4":{"pos":"i4"},"i5":{"pos":"i5"},"i7":{"pos":"i7"},"i9":{"pos":"i9"},"j1":{"pos":"j1"},"j10":{"pos":"j10"},"j11":{"pos":"j11"},"j12":{"pos":"j12"},"j13":{"pos":"j13"},"j15":{"pos":"j15"},"j16":{"pos":"j16"},"j17":{"pos":"j17"},"j18":{"pos":"j18"},"j19":{"pos":"j19"},"j2":{"pos":"j2"},"j3":{"pos":"j3"},"j4":{"pos":"j4"},"j5":{"pos":"j5"},"j7":{"pos":"j7"},"j8":{"pos":"j8"},"j9":{"pos":"j9"},"k1":{"pos":"k1"},"k10":{"pos":"k10"},"k11":{"pos":"k11"},"k13":{"pos":"k13"},"k15":{"pos":"k15"},"k16":{"pos":"k16"},"k17":{"pos":"k17"},"k19":{"pos":"k19"},"k3":{"pos":"k3"},"k4":{"pos":"k4"},"k5":{"pos":"k5"},"k7":{"pos":"k7"},"k9":{"pos":"k9"},"l1":{"pos":"l1"},"l10":{"pos":"l10"},"l11":{"pos":"l11"},"l13":{"pos":"l13"},"l19":{"pos":"l19"},"l7":{"pos":"l7"},"l9":{"pos":"l9"},"m1":{"pos":"m1"},"m10":{"pos":"m10"},"m11":{"pos":"m11"},"m13":{"pos":"m13"},"m14":{"pos":"m14"},"m15":{"pos":"m15"},"m16":{"pos":"m16"},"m17":{"pos":"m17"},"m18":{"pos":"m18"},"m19":{"pos":"m19"},"m2":{"pos":"m2"},"m3":{"pos":"m3"},"m4":{"pos":"m4"},"m5":{"pos":"m5"},"m6":{"pos":"m6"},"m7":{"pos":"m7"},"m9":{"pos":"m9"},"n10":{"pos":"n10"},"n11":{"pos":"n11"},"n13":{"pos":"n13"},"n7":{"pos":"n7"},"n9":{"pos":"n9"},"o1":{"pos":"o1"},"o10":{"pos":"o10"},"o11":{"pos":"o11"},"o13":{"pos":"o13"},"o14":{"pos":"o14"},"o15":{"pos":"o15"},"o16":{"pos":"o16"},"o17":{"pos":"o17"},"o18":{"pos":"o18"},"o19":{"pos":"o19"},"o2":{"pos":"o2"},"o3":{"pos":"o3"},"o4":{"pos":"o4"},"o5":{"pos":"o5"},"o6":{"pos":"o6"},"o7":{"pos":"o7"},"o9":{"pos":"o9"},"p1":{"pos":"p1"},"p10":{"pos":"p10"},"p11":{"pos":"p11"},"p13":{"pos":"p13"},"p14":{"pos":"p14"},"p15":{"pos":"p15"},"p16":{"pos":"p16"},"p17":{"pos":"p17"},"p18":{"pos":"p18"},"p19":{"pos":"p19"},"p2":{"pos":"p2"},"p3":{"pos":"p3"},"p4":{"pos":"p4"},"p5":{"pos":"p5"},"p6":{"pos":"p6"},"p7":{"pos":"p7"},"p9":{"pos":"p9"},"q1":{"pos":"q1"},"q10":{"pos":"q10"},"q11":{"pos":"q11"},"q19":{"pos":"q19"},"q9":{"pos":"q9"},"r1":{"pos":"r1"},"r10":{"pos":"r10"},"r11":{"pos":"r11"},"r12":{"pos":"r12"},"r13":{"pos":"r13"},"r14":{"pos":"r14"},"r15":{"pos":"r15"},"r16":{"pos":"r16"},"r17":{"pos":"r17"},"r18":{"pos":"r18"},"r19":{"pos":"r19"},"r2":{"pos":"r2"},"r3":{"pos":"r3"},"r4":{"pos":"r4"},"r5":{"pos":"r5"},"r6":{"pos":"r6"},"r7":{"pos":"r7"},"r8":{"pos":"r8"},"r9":{"pos":"r9"},"s1":{"pos":"s1"},"s10":{"pos":"s10"},"s11":{"pos":"s11"},"s12":{"pos":"s12"},"s13":{"pos":"s13"},"s14":{"pos":"s14"},"s15":{"pos":"s15"},"s16":{"pos":"s16"},"s17":{"pos":"s17"},"s18":{"pos":"s18"},"s19":{"pos":"s19"},"s2":{"pos":"s2"},"s3":{"pos":"s3"},"s4":{"pos":"s4"},"s5":{"pos":"s5"},"s6":{"pos":"s6"},"s7":{"pos":"s7"},"s8":{"pos":"s8"},"s9":{"pos":"s9"}}};var ownernames=["neutral","opp","my"];var player=2;var otherplayer=1;game.selectunit2=function(turn,step,markpos){var ARTIFACTS={movetargets:Object.assign({},step.ARTIFACTS.movetargets)};var UNITLAYERS=step.UNITLAYERS;var MARKS={selectunit:markpos};var STARTPOS=MARKS['selectunit'];var neighbourdirs=[1,3,5,7];var startconnections=connections[STARTPOS];for(var dirnbr=0;dirnbr<4;dirnbr++){var POS=startconnections[neighbourdirs[dirnbr]];if(POS&&(!!TERRAIN.walls[STARTPOS]&&!TERRAIN.walls[POS]||!TERRAIN.walls[STARTPOS]&&!!TERRAIN.walls[POS])){if(!UNITLAYERS.myunits[POS]){ARTIFACTS['movetargets'][POS]={};}}}var BLOCKS=UNITLAYERS.units;var STARTPOS=MARKS['selectunit'];var allowedsteps=!!TERRAIN.walls[STARTPOS]?TERRAIN.walls:function(){var ret={},s0=TERRAIN.nowalls,s1=TERRAIN.mythrones;for(var key in s0){if(!s1[key]){ret[key]=s0[key];}}return ret;}();var allwalkerdirs=[1,3,5,7];for(var walkerdirnbr=0;walkerdirnbr<4;walkerdirnbr++){var POS=STARTPOS;while((POS=connections[POS][allwalkerdirs[walkerdirnbr]])&&allowedsteps[POS]&&!BLOCKS[POS]){ARTIFACTS['movetargets'][POS]={};}if(BLOCKS[POS]&&allowedsteps[POS]){if(UNITLAYERS.oppunits[POS]){ARTIFACTS['movetargets'][POS]={};}}}var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectunit'});turn.links[newstepid]={};var newlinks=turn.links[newstepid];for(var linkpos in ARTIFACTS.movetargets){newlinks[linkpos]='selectmovetarget2';}return newstep;};game.selectunit2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.selectmovetarget2=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectmovetarget:markpos,selectunit:step.MARKS.selectunit};var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectmovetarget'});turn.links[newstepid]={};turn.links[newstepid].move='move2';return newstep;};game.selectmovetarget2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.move2=function(turn,step){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var MARKS=step.MARKS;var UNITDATA=Object.assign({},step.UNITDATA);var UNITLAYERS=step.UNITLAYERS;var unitid=(UNITLAYERS.units[MARKS['selectunit']]||{}).id;if(unitid){UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{'pos':MARKS['selectmovetarget']});delete UNITDATA[(UNITLAYERS.units[MARKS['selectmovetarget']]||{}).id];}MARKS={};UNITLAYERS={"soldiers":{},"mysoldiers":{},"oppsoldiers":{},"neutralsoldiers":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}ARTIFACTS={"movetargets":{}};var newstepid=step.stepid+'-'+'move';var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,stepid:newstepid,name:'move',path:step.path.concat('move')});turn.links[newstepid]={};if(Object.keys(function(){var ret={},s0=UNITLAYERS.myunits,s1=TERRAIN.oppthrones;for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}()||{}).length!==0){var winner=2;var result=winner===2?'win':winner?'lose':'draw';turn.links[newstepid][result]='infiltration';}else if(Object.keys(UNITLAYERS.oppunits||{}).length===0){var winner=2;var result=winner===2?'win':winner?'lose':'draw';turn.links[newstepid][result]='genocide';}else turn.links[newstepid].endturn="start"+otherplayer;return newstep;};game.move2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.start2=function(turn,step){var turn={steps:{},player:player,turn:turn.turn+1,links:{root:{}}};var MARKS={};var ARTIFACTS={"movetargets":{}};var UNITDATA=step.UNITDATA;var UNITLAYERS={"soldiers":{},"mysoldiers":{},"oppsoldiers":{},"neutralsoldiers":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}var newstep=turn.steps.root={ARTIFACTS:ARTIFACTS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,MARKS:MARKS,stepid:'root',name:'start',path:[]};var newlinks=turn.links.root;for(var linkpos in UNITLAYERS.myunits){newlinks[linkpos]='selectunit2';}return turn;};game.start2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.debug2=function(){return{TERRAIN:TERRAIN};};})();function reduce(coll,iterator,acc){for(var key in coll){acc=iterator(acc,coll[key],key);}return acc;}game.newGame=function(){var turnseed={turn:0};var stepseed={UNITDATA:{"unit1":{"pos":"f1","id":"unit1","group":"soldiers","owner":1},"unit2":{"pos":"n1","id":"unit2","group":"soldiers","owner":1},"unit3":{"pos":"h2","id":"unit3","group":"soldiers","owner":1},"unit4":{"pos":"l2","id":"unit4","group":"soldiers","owner":1},"unit5":{"pos":"h6","id":"unit5","group":"soldiers","owner":1},"unit6":{"pos":"l6","id":"unit6","group":"soldiers","owner":1},"unit7":{"pos":"c8","id":"unit7","group":"soldiers","owner":1},"unit8":{"pos":"q8","id":"unit8","group":"soldiers","owner":1},"unit9":{"pos":"f19","id":"unit9","group":"soldiers","owner":2},"unit10":{"pos":"n19","id":"unit10","group":"soldiers","owner":2},"unit11":{"pos":"h18","id":"unit11","group":"soldiers","owner":2},"unit12":{"pos":"l18","id":"unit12","group":"soldiers","owner":2},"unit13":{"pos":"h14","id":"unit13","group":"soldiers","owner":2},"unit14":{"pos":"l14","id":"unit14","group":"soldiers","owner":2},"unit15":{"pos":"c12","id":"unit15","group":"soldiers","owner":2},"unit16":{"pos":"q12","id":"unit16","group":"soldiers","owner":2}}};return game.start1(turnseed,stepseed);};game.debug=function(){return{BOARD:BOARD,connections:connections,plr1:game.debug1(),plr2:game.debug2()};};game.commands={"move":1};game.graphics={"tiles":{"walls":"castle","thrones":"playercolour"},"icons":{"soldiers":"rooks"}};game.board={"width":19,"height":19,"terrain":{"walls":[["rect","c2","c8"],["rect","f1","f6"],["rect","h2","h6"],["rect","l2","l6"],["rect","n1","n6"],["rect","q2","q8"],["rect","c8","i8"],["rect","k8","p8"],["rect","i6","k6"],"i2","k2",["rect","c12","c18"],["rect","f14","f19"],["rect","h14","h18"],["rect","l14","l18"],["rect","n14","n19"],["rect","q12","q18"],["rect","c12","i12"],["rect","k12","p12"],["rect","i14","k14"],"i18","k18"],"thrones":{"1":["j4"],"2":["j16"]}}};game.AI=[];game.id="castle";return game;}(),coffee:function(){var game={};var connections={"faux":{},"a1":{"1":"a2","2":"b2","3":"b1"},"a2":{"1":"a3","2":"b3","3":"b2","4":"b1","5":"a1"},"a3":{"1":"a4","2":"b4","3":"b3","4":"b2","5":"a2"},"a4":{"1":"a5","2":"b5","3":"b4","4":"b3","5":"a3"},"a5":{"3":"b5","4":"b4","5":"a4"},"b1":{"1":"b2","2":"c2","3":"c1","7":"a1","8":"a2"},"b2":{"1":"b3","2":"c3","3":"c2","4":"c1","5":"b1","6":"a1","7":"a2","8":"a3"},"b3":{"1":"b4","2":"c4","3":"c3","4":"c2","5":"b2","6":"a2","7":"a3","8":"a4"},"b4":{"1":"b5","2":"c5","3":"c4","4":"c3","5":"b3","6":"a3","7":"a4","8":"a5"},"b5":{"3":"c5","4":"c4","5":"b4","6":"a4","7":"a5"},"c1":{"1":"c2","2":"d2","3":"d1","7":"b1","8":"b2"},"c2":{"1":"c3","2":"d3","3":"d2","4":"d1","5":"c1","6":"b1","7":"b2","8":"b3"},"c3":{"1":"c4","2":"d4","3":"d3","4":"d2","5":"c2","6":"b2","7":"b3","8":"b4"},"c4":{"1":"c5","2":"d5","3":"d4","4":"d3","5":"c3","6":"b3","7":"b4","8":"b5"},"c5":{"3":"d5","4":"d4","5":"c4","6":"b4","7":"b5"},"d1":{"1":"d2","2":"e2","3":"e1","7":"c1","8":"c2"},"d2":{"1":"d3","2":"e3","3":"e2","4":"e1","5":"d1","6":"c1","7":"c2","8":"c3"},"d3":{"1":"d4","2":"e4","3":"e3","4":"e2","5":"d2","6":"c2","7":"c3","8":"c4"},"d4":{"1":"d5","2":"e5","3":"e4","4":"e3","5":"d3","6":"c3","7":"c4","8":"c5"},"d5":{"3":"e5","4":"e4","5":"d4","6":"c4","7":"c5"},"e1":{"1":"e2","7":"d1","8":"d2"},"e2":{"1":"e3","5":"e1","6":"d1","7":"d2","8":"d3"},"e3":{"1":"e4","5":"e2","6":"d2","7":"d3","8":"d4"},"e4":{"1":"e5","5":"e3","6":"d3","7":"d4","8":"d5"},"e5":{"5":"e4","6":"d4","7":"d5"}};var BOARD={"board":{"a1":{"colour":"dark","pos":"a1","x":1,"y":1},"a2":{"colour":"light","pos":"a2","x":1,"y":2},"a3":{"colour":"dark","pos":"a3","x":1,"y":3},"a4":{"colour":"light","pos":"a4","x":1,"y":4},"a5":{"colour":"dark","pos":"a5","x":1,"y":5},"b1":{"colour":"light","pos":"b1","x":2,"y":1},"b2":{"colour":"dark","pos":"b2","x":2,"y":2},"b3":{"colour":"light","pos":"b3","x":2,"y":3},"b4":{"colour":"dark","pos":"b4","x":2,"y":4},"b5":{"colour":"light","pos":"b5","x":2,"y":5},"c1":{"colour":"dark","pos":"c1","x":3,"y":1},"c2":{"colour":"light","pos":"c2","x":3,"y":2},"c3":{"colour":"dark","pos":"c3","x":3,"y":3},"c4":{"colour":"light","pos":"c4","x":3,"y":4},"c5":{"colour":"dark","pos":"c5","x":3,"y":5},"d1":{"colour":"light","pos":"d1","x":4,"y":1},"d2":{"colour":"dark","pos":"d2","x":4,"y":2},"d3":{"colour":"light","pos":"d3","x":4,"y":3},"d4":{"colour":"dark","pos":"d4","x":4,"y":4},"d5":{"colour":"light","pos":"d5","x":4,"y":5},"e1":{"colour":"dark","pos":"e1","x":5,"y":1},"e2":{"colour":"light","pos":"e2","x":5,"y":2},"e3":{"colour":"dark","pos":"e3","x":5,"y":3},"e4":{"colour":"light","pos":"e4","x":5,"y":4},"e5":{"colour":"dark","pos":"e5","x":5,"y":5}},"light":{"a2":{"colour":"light","pos":"a2","x":1,"y":2},"a4":{"colour":"light","pos":"a4","x":1,"y":4},"b1":{"colour":"light","pos":"b1","x":2,"y":1},"b3":{"colour":"light","pos":"b3","x":2,"y":3},"b5":{"colour":"light","pos":"b5","x":2,"y":5},"c2":{"colour":"light","pos":"c2","x":3,"y":2},"c4":{"colour":"light","pos":"c4","x":3,"y":4},"d1":{"colour":"light","pos":"d1","x":4,"y":1},"d3":{"colour":"light","pos":"d3","x":4,"y":3},"d5":{"colour":"light","pos":"d5","x":4,"y":5},"e2":{"colour":"light","pos":"e2","x":5,"y":2},"e4":{"colour":"light","pos":"e4","x":5,"y":4}},"dark":{"a1":{"colour":"dark","pos":"a1","x":1,"y":1},"a3":{"colour":"dark","pos":"a3","x":1,"y":3},"a5":{"colour":"dark","pos":"a5","x":1,"y":5},"b2":{"colour":"dark","pos":"b2","x":2,"y":2},"b4":{"colour":"dark","pos":"b4","x":2,"y":4},"c1":{"colour":"dark","pos":"c1","x":3,"y":1},"c3":{"colour":"dark","pos":"c3","x":3,"y":3},"c5":{"colour":"dark","pos":"c5","x":3,"y":5},"d2":{"colour":"dark","pos":"d2","x":4,"y":2},"d4":{"colour":"dark","pos":"d4","x":4,"y":4},"e1":{"colour":"dark","pos":"e1","x":5,"y":1},"e3":{"colour":"dark","pos":"e3","x":5,"y":3},"e5":{"colour":"dark","pos":"e5","x":5,"y":5}}};var relativedirs=[1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];var TERRAIN={};(function(){var ownernames=["neutral","my","opp"];var player=1;var otherplayer=2;game.selectdrop1=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{FOOBAR:Object.assign({},step.ARTIFACTS.FOOBAR),vertical:Object.assign({},step.ARTIFACTS.vertical),uphill:Object.assign({},step.ARTIFACTS.uphill),horisontal:Object.assign({},step.ARTIFACTS.horisontal),downhill:Object.assign({},step.ARTIFACTS.downhill)});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectdrop:markpos};var STARTPOS=MARKS['selectdrop'];var allwalkerdirs=[1,2,3,4,5,6,7,8];for(var walkerdirnbr=0;walkerdirnbr<8;walkerdirnbr++){var DIR=allwalkerdirs[walkerdirnbr];var POS=STARTPOS;while(POS=connections[POS][DIR]){if(!UNITLAYERS.units[POS]){ARTIFACTS[['FOOBAR','vertical','uphill','horisontal','downhill','vertical','uphill','horisontal','downhill'][DIR]][POS]={};}}}var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectdrop'});turn.links[newstepid]={};if(Object.keys(ARTIFACTS.uphill||{}).length!==0){turn.links[newstepid].uphill='uphill1';}if(Object.keys(ARTIFACTS.downhill||{}).length!==0){turn.links[newstepid].downhill='downhill1';}if(Object.keys(ARTIFACTS.vertical||{}).length!==0){turn.links[newstepid].vertical='vertical1';}if(Object.keys(ARTIFACTS.horisontal||{}).length!==0){turn.links[newstepid].horisontal='horisontal1';}return newstep;};game.selectdrop1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.uphill1=function(turn,step){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{winline:Object.assign({},step.ARTIFACTS.winline)});var MARKS=step.MARKS;var UNITDATA=Object.assign({},step.UNITDATA);var clones=step.clones;var UNITLAYERS=step.UNITLAYERS;for(var POS in UNITLAYERS.markers){delete UNITDATA[(UNITLAYERS.units[POS]||{}).id];}var newunitid='spawn'+clones++;UNITDATA[newunitid]={pos:MARKS['selectdrop'],id:newunitid,group:'soldiers',owner:player};for(var POS in ARTIFACTS.uphill){var newunitid='spawn'+clones++;UNITDATA[newunitid]={pos:POS,id:newunitid,group:'markers',owner:0};}MARKS={};UNITLAYERS={"markers":{},"mymarkers":{},"oppmarkers":{},"neutralmarkers":{},"soldiers":{},"mysoldiers":{},"oppsoldiers":{},"neutralsoldiers":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}ARTIFACTS={"FOOBAR":{},"vertical":{},"uphill":{},"horisontal":{},"downhill":{},"winline":{}};var allowedsteps=UNITLAYERS.myunits;var walkstarts=UNITLAYERS.myunits;for(var STARTPOS in walkstarts){var DIR=undefined;var walkedsquares=[];var POS=STARTPOS;while((POS=connections[POS][DIR])&&allowedsteps[POS]){walkedsquares.push(POS);}var WALKLENGTH=walkedsquares.length;if(3===WALKLENGTH){ARTIFACTS['winline'][STARTPOS]={};}}var newstepid=step.stepid+'-'+'uphill';var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,stepid:newstepid,name:'uphill',path:step.path.concat('uphill'),clones:clones});turn.links[newstepid]={};if(Object.keys(UNITLAYERS.markers||{}).length===0){turn.blockedby="nolegal";}else if(Object.keys(ARTIFACTS.winline||{}).length!==0){var winner=1;var result=winner===1?'win':winner?'lose':'draw';turn.links[newstepid][result]='madeline';}else turn.links[newstepid].endturn="start"+otherplayer;return newstep;};game.uphill1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.downhill1=function(turn,step){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{winline:Object.assign({},step.ARTIFACTS.winline)});var MARKS=step.MARKS;var UNITDATA=Object.assign({},step.UNITDATA);var clones=step.clones;var UNITLAYERS=step.UNITLAYERS;for(var POS in UNITLAYERS.markers){delete UNITDATA[(UNITLAYERS.units[POS]||{}).id];}var newunitid='spawn'+clones++;UNITDATA[newunitid]={pos:MARKS['selectdrop'],id:newunitid,group:'soldiers',owner:player};for(var POS in ARTIFACTS.downhill){var newunitid='spawn'+clones++;UNITDATA[newunitid]={pos:POS,id:newunitid,group:'markers',owner:0};}MARKS={};UNITLAYERS={"markers":{},"mymarkers":{},"oppmarkers":{},"neutralmarkers":{},"soldiers":{},"mysoldiers":{},"oppsoldiers":{},"neutralsoldiers":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}ARTIFACTS={"FOOBAR":{},"vertical":{},"uphill":{},"horisontal":{},"downhill":{},"winline":{}};var allowedsteps=UNITLAYERS.myunits;var walkstarts=UNITLAYERS.myunits;for(var STARTPOS in walkstarts){var DIR=undefined;var walkedsquares=[];var POS=STARTPOS;while((POS=connections[POS][DIR])&&allowedsteps[POS]){walkedsquares.push(POS);}var WALKLENGTH=walkedsquares.length;if(3===WALKLENGTH){ARTIFACTS['winline'][STARTPOS]={};}}var newstepid=step.stepid+'-'+'downhill';var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,stepid:newstepid,name:'downhill',path:step.path.concat('downhill'),clones:clones});turn.links[newstepid]={};if(Object.keys(UNITLAYERS.markers||{}).length===0){turn.blockedby="nolegal";}else if(Object.keys(ARTIFACTS.winline||{}).length!==0){var winner=1;var result=winner===1?'win':winner?'lose':'draw';turn.links[newstepid][result]='madeline';}else turn.links[newstepid].endturn="start"+otherplayer;return newstep;};game.downhill1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.horisontal1=function(turn,step){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{winline:Object.assign({},step.ARTIFACTS.winline)});var MARKS=step.MARKS;var UNITDATA=Object.assign({},step.UNITDATA);var clones=step.clones;var UNITLAYERS=step.UNITLAYERS;for(var POS in UNITLAYERS.markers){delete UNITDATA[(UNITLAYERS.units[POS]||{}).id];}var newunitid='spawn'+clones++;UNITDATA[newunitid]={pos:MARKS['selectdrop'],id:newunitid,group:'soldiers',owner:player};for(var POS in ARTIFACTS.horisontal){var newunitid='spawn'+clones++;UNITDATA[newunitid]={pos:POS,id:newunitid,group:'markers',owner:0};}MARKS={};UNITLAYERS={"markers":{},"mymarkers":{},"oppmarkers":{},"neutralmarkers":{},"soldiers":{},"mysoldiers":{},"oppsoldiers":{},"neutralsoldiers":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}ARTIFACTS={"FOOBAR":{},"vertical":{},"uphill":{},"horisontal":{},"downhill":{},"winline":{}};var allowedsteps=UNITLAYERS.myunits;var walkstarts=UNITLAYERS.myunits;for(var STARTPOS in walkstarts){var DIR=undefined;var walkedsquares=[];var POS=STARTPOS;while((POS=connections[POS][DIR])&&allowedsteps[POS]){walkedsquares.push(POS);}var WALKLENGTH=walkedsquares.length;if(3===WALKLENGTH){ARTIFACTS['winline'][STARTPOS]={};}}var newstepid=step.stepid+'-'+'horisontal';var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,stepid:newstepid,name:'horisontal',path:step.path.concat('horisontal'),clones:clones});turn.links[newstepid]={};if(Object.keys(UNITLAYERS.markers||{}).length===0){turn.blockedby="nolegal";}else if(Object.keys(ARTIFACTS.winline||{}).length!==0){var winner=1;var result=winner===1?'win':winner?'lose':'draw';turn.links[newstepid][result]='madeline';}else turn.links[newstepid].endturn="start"+otherplayer;return newstep;};game.horisontal1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.vertical1=function(turn,step){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{winline:Object.assign({},step.ARTIFACTS.winline)});var MARKS=step.MARKS;var UNITDATA=Object.assign({},step.UNITDATA);var clones=step.clones;var UNITLAYERS=step.UNITLAYERS;for(var POS in UNITLAYERS.markers){delete UNITDATA[(UNITLAYERS.units[POS]||{}).id];}var newunitid='spawn'+clones++;UNITDATA[newunitid]={pos:MARKS['selectdrop'],id:newunitid,group:'soldiers',owner:player};for(var POS in ARTIFACTS.vertical){var newunitid='spawn'+clones++;UNITDATA[newunitid]={pos:POS,id:newunitid,group:'markers',owner:0};}MARKS={};UNITLAYERS={"markers":{},"mymarkers":{},"oppmarkers":{},"neutralmarkers":{},"soldiers":{},"mysoldiers":{},"oppsoldiers":{},"neutralsoldiers":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}ARTIFACTS={"FOOBAR":{},"vertical":{},"uphill":{},"horisontal":{},"downhill":{},"winline":{}};var allowedsteps=UNITLAYERS.myunits;var walkstarts=UNITLAYERS.myunits;for(var STARTPOS in walkstarts){var DIR=undefined;var walkedsquares=[];var POS=STARTPOS;while((POS=connections[POS][DIR])&&allowedsteps[POS]){walkedsquares.push(POS);}var WALKLENGTH=walkedsquares.length;if(3===WALKLENGTH){ARTIFACTS['winline'][STARTPOS]={};}}var newstepid=step.stepid+'-'+'vertical';var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,stepid:newstepid,name:'vertical',path:step.path.concat('vertical'),clones:clones});turn.links[newstepid]={};if(Object.keys(UNITLAYERS.markers||{}).length===0){turn.blockedby="nolegal";}else if(Object.keys(ARTIFACTS.winline||{}).length!==0){var winner=1;var result=winner===1?'win':winner?'lose':'draw';turn.links[newstepid][result]='madeline';}else turn.links[newstepid].endturn="start"+otherplayer;return newstep;};game.vertical1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.start1=function(turn,step){var turn={steps:{},player:player,turn:turn.turn+1,links:{root:{}}};var MARKS={};var ARTIFACTS={"FOOBAR":{},"vertical":{},"uphill":{},"horisontal":{},"downhill":{},"winline":{}};var UNITDATA=step.UNITDATA;var UNITLAYERS={"markers":{},"mymarkers":{},"oppmarkers":{},"neutralmarkers":{},"soldiers":{},"mysoldiers":{},"oppsoldiers":{},"neutralsoldiers":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}var newstep=turn.steps.root={ARTIFACTS:ARTIFACTS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,MARKS:MARKS,stepid:'root',name:'start',clones:step.clones,path:[]};var newlinks=turn.links.root;for(var linkpos in Object.keys(UNITLAYERS.markers||{}).length===0?BOARD.board:UNITLAYERS.markers){newlinks[linkpos]='selectdrop1';}return turn;};game.start1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.debug1=function(){return{TERRAIN:TERRAIN};};})();(function(){var ownernames=["neutral","opp","my"];var player=2;var otherplayer=1;game.selectdrop2=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{FOOBAR:Object.assign({},step.ARTIFACTS.FOOBAR),vertical:Object.assign({},step.ARTIFACTS.vertical),uphill:Object.assign({},step.ARTIFACTS.uphill),horisontal:Object.assign({},step.ARTIFACTS.horisontal),downhill:Object.assign({},step.ARTIFACTS.downhill)});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectdrop:markpos};var STARTPOS=MARKS['selectdrop'];var allwalkerdirs=[1,2,3,4,5,6,7,8];for(var walkerdirnbr=0;walkerdirnbr<8;walkerdirnbr++){var DIR=allwalkerdirs[walkerdirnbr];var POS=STARTPOS;while(POS=connections[POS][DIR]){if(!UNITLAYERS.units[POS]){ARTIFACTS[['FOOBAR','vertical','uphill','horisontal','downhill','vertical','uphill','horisontal','downhill'][DIR]][POS]={};}}}var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectdrop'});turn.links[newstepid]={};if(Object.keys(ARTIFACTS.uphill||{}).length!==0){turn.links[newstepid].uphill='uphill2';}if(Object.keys(ARTIFACTS.downhill||{}).length!==0){turn.links[newstepid].downhill='downhill2';}if(Object.keys(ARTIFACTS.vertical||{}).length!==0){turn.links[newstepid].vertical='vertical2';}if(Object.keys(ARTIFACTS.horisontal||{}).length!==0){turn.links[newstepid].horisontal='horisontal2';}return newstep;};game.selectdrop2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.uphill2=function(turn,step){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{winline:Object.assign({},step.ARTIFACTS.winline)});var MARKS=step.MARKS;var UNITDATA=Object.assign({},step.UNITDATA);var clones=step.clones;var UNITLAYERS=step.UNITLAYERS;for(var POS in UNITLAYERS.markers){delete UNITDATA[(UNITLAYERS.units[POS]||{}).id];}var newunitid='spawn'+clones++;UNITDATA[newunitid]={pos:MARKS['selectdrop'],id:newunitid,group:'soldiers',owner:player};for(var POS in ARTIFACTS.uphill){var newunitid='spawn'+clones++;UNITDATA[newunitid]={pos:POS,id:newunitid,group:'markers',owner:0};}MARKS={};UNITLAYERS={"markers":{},"mymarkers":{},"oppmarkers":{},"neutralmarkers":{},"soldiers":{},"mysoldiers":{},"oppsoldiers":{},"neutralsoldiers":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}ARTIFACTS={"FOOBAR":{},"vertical":{},"uphill":{},"horisontal":{},"downhill":{},"winline":{}};var allowedsteps=UNITLAYERS.myunits;var walkstarts=UNITLAYERS.myunits;for(var STARTPOS in walkstarts){var DIR=undefined;var walkedsquares=[];var POS=STARTPOS;while((POS=connections[POS][DIR])&&allowedsteps[POS]){walkedsquares.push(POS);}var WALKLENGTH=walkedsquares.length;if(3===WALKLENGTH){ARTIFACTS['winline'][STARTPOS]={};}}var newstepid=step.stepid+'-'+'uphill';var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,stepid:newstepid,name:'uphill',path:step.path.concat('uphill'),clones:clones});turn.links[newstepid]={};if(Object.keys(UNITLAYERS.markers||{}).length===0){turn.blockedby="nolegal";}else if(Object.keys(ARTIFACTS.winline||{}).length!==0){var winner=2;var result=winner===2?'win':winner?'lose':'draw';turn.links[newstepid][result]='madeline';}else turn.links[newstepid].endturn="start"+otherplayer;return newstep;};game.uphill2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.downhill2=function(turn,step){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{winline:Object.assign({},step.ARTIFACTS.winline)});var MARKS=step.MARKS;var UNITDATA=Object.assign({},step.UNITDATA);var clones=step.clones;var UNITLAYERS=step.UNITLAYERS;for(var POS in UNITLAYERS.markers){delete UNITDATA[(UNITLAYERS.units[POS]||{}).id];}var newunitid='spawn'+clones++;UNITDATA[newunitid]={pos:MARKS['selectdrop'],id:newunitid,group:'soldiers',owner:player};for(var POS in ARTIFACTS.downhill){var newunitid='spawn'+clones++;UNITDATA[newunitid]={pos:POS,id:newunitid,group:'markers',owner:0};}MARKS={};UNITLAYERS={"markers":{},"mymarkers":{},"oppmarkers":{},"neutralmarkers":{},"soldiers":{},"mysoldiers":{},"oppsoldiers":{},"neutralsoldiers":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}ARTIFACTS={"FOOBAR":{},"vertical":{},"uphill":{},"horisontal":{},"downhill":{},"winline":{}};var allowedsteps=UNITLAYERS.myunits;var walkstarts=UNITLAYERS.myunits;for(var STARTPOS in walkstarts){var DIR=undefined;var walkedsquares=[];var POS=STARTPOS;while((POS=connections[POS][DIR])&&allowedsteps[POS]){walkedsquares.push(POS);}var WALKLENGTH=walkedsquares.length;if(3===WALKLENGTH){ARTIFACTS['winline'][STARTPOS]={};}}var newstepid=step.stepid+'-'+'downhill';var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,stepid:newstepid,name:'downhill',path:step.path.concat('downhill'),clones:clones});turn.links[newstepid]={};if(Object.keys(UNITLAYERS.markers||{}).length===0){turn.blockedby="nolegal";}else if(Object.keys(ARTIFACTS.winline||{}).length!==0){var winner=2;var result=winner===2?'win':winner?'lose':'draw';turn.links[newstepid][result]='madeline';}else turn.links[newstepid].endturn="start"+otherplayer;return newstep;};game.downhill2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.horisontal2=function(turn,step){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{winline:Object.assign({},step.ARTIFACTS.winline)});var MARKS=step.MARKS;var UNITDATA=Object.assign({},step.UNITDATA);var clones=step.clones;var UNITLAYERS=step.UNITLAYERS;for(var POS in UNITLAYERS.markers){delete UNITDATA[(UNITLAYERS.units[POS]||{}).id];}var newunitid='spawn'+clones++;UNITDATA[newunitid]={pos:MARKS['selectdrop'],id:newunitid,group:'soldiers',owner:player};for(var POS in ARTIFACTS.horisontal){var newunitid='spawn'+clones++;UNITDATA[newunitid]={pos:POS,id:newunitid,group:'markers',owner:0};}MARKS={};UNITLAYERS={"markers":{},"mymarkers":{},"oppmarkers":{},"neutralmarkers":{},"soldiers":{},"mysoldiers":{},"oppsoldiers":{},"neutralsoldiers":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}ARTIFACTS={"FOOBAR":{},"vertical":{},"uphill":{},"horisontal":{},"downhill":{},"winline":{}};var allowedsteps=UNITLAYERS.myunits;var walkstarts=UNITLAYERS.myunits;for(var STARTPOS in walkstarts){var DIR=undefined;var walkedsquares=[];var POS=STARTPOS;while((POS=connections[POS][DIR])&&allowedsteps[POS]){walkedsquares.push(POS);}var WALKLENGTH=walkedsquares.length;if(3===WALKLENGTH){ARTIFACTS['winline'][STARTPOS]={};}}var newstepid=step.stepid+'-'+'horisontal';var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,stepid:newstepid,name:'horisontal',path:step.path.concat('horisontal'),clones:clones});turn.links[newstepid]={};if(Object.keys(UNITLAYERS.markers||{}).length===0){turn.blockedby="nolegal";}else if(Object.keys(ARTIFACTS.winline||{}).length!==0){var winner=2;var result=winner===2?'win':winner?'lose':'draw';turn.links[newstepid][result]='madeline';}else turn.links[newstepid].endturn="start"+otherplayer;return newstep;};game.horisontal2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.vertical2=function(turn,step){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{winline:Object.assign({},step.ARTIFACTS.winline)});var MARKS=step.MARKS;var UNITDATA=Object.assign({},step.UNITDATA);var clones=step.clones;var UNITLAYERS=step.UNITLAYERS;for(var POS in UNITLAYERS.markers){delete UNITDATA[(UNITLAYERS.units[POS]||{}).id];}var newunitid='spawn'+clones++;UNITDATA[newunitid]={pos:MARKS['selectdrop'],id:newunitid,group:'soldiers',owner:player};for(var POS in ARTIFACTS.vertical){var newunitid='spawn'+clones++;UNITDATA[newunitid]={pos:POS,id:newunitid,group:'markers',owner:0};}MARKS={};UNITLAYERS={"markers":{},"mymarkers":{},"oppmarkers":{},"neutralmarkers":{},"soldiers":{},"mysoldiers":{},"oppsoldiers":{},"neutralsoldiers":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}ARTIFACTS={"FOOBAR":{},"vertical":{},"uphill":{},"horisontal":{},"downhill":{},"winline":{}};var allowedsteps=UNITLAYERS.myunits;var walkstarts=UNITLAYERS.myunits;for(var STARTPOS in walkstarts){var DIR=undefined;var walkedsquares=[];var POS=STARTPOS;while((POS=connections[POS][DIR])&&allowedsteps[POS]){walkedsquares.push(POS);}var WALKLENGTH=walkedsquares.length;if(3===WALKLENGTH){ARTIFACTS['winline'][STARTPOS]={};}}var newstepid=step.stepid+'-'+'vertical';var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,stepid:newstepid,name:'vertical',path:step.path.concat('vertical'),clones:clones});turn.links[newstepid]={};if(Object.keys(UNITLAYERS.markers||{}).length===0){turn.blockedby="nolegal";}else if(Object.keys(ARTIFACTS.winline||{}).length!==0){var winner=2;var result=winner===2?'win':winner?'lose':'draw';turn.links[newstepid][result]='madeline';}else turn.links[newstepid].endturn="start"+otherplayer;return newstep;};game.vertical2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.start2=function(turn,step){var turn={steps:{},player:player,turn:turn.turn+1,links:{root:{}}};var MARKS={};var ARTIFACTS={"FOOBAR":{},"vertical":{},"uphill":{},"horisontal":{},"downhill":{},"winline":{}};var UNITDATA=step.UNITDATA;var UNITLAYERS={"markers":{},"mymarkers":{},"oppmarkers":{},"neutralmarkers":{},"soldiers":{},"mysoldiers":{},"oppsoldiers":{},"neutralsoldiers":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}var newstep=turn.steps.root={ARTIFACTS:ARTIFACTS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,MARKS:MARKS,stepid:'root',name:'start',clones:step.clones,path:[]};var newlinks=turn.links.root;for(var linkpos in Object.keys(UNITLAYERS.markers||{}).length===0?BOARD.board:UNITLAYERS.markers){newlinks[linkpos]='selectdrop2';}return turn;};game.start2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.debug2=function(){return{TERRAIN:TERRAIN};};})();function reduce(coll,iterator,acc){for(var key in coll){acc=iterator(acc,coll[key],key);}return acc;}game.newGame=function(){var turnseed={turn:0};var stepseed={UNITDATA:{},clones:0};return game.start1(turnseed,stepseed);};game.debug=function(){return{BOARD:BOARD,connections:connections,plr1:game.debug1(),plr2:game.debug2()};};game.commands={"uphill":1,"downhill":1,"horisontal":1,"vertical":1};game.graphics={"icons":{"soldiers":"pawns","markers":"pawns"}};game.board={"height":5,"width":5};game.AI=[];game.id="coffee";return game;}(),daggers:function(){var game={};var connections={"faux":{},"a1":{"1":"a2","2":"b2","3":"b1"},"a2":{"1":"a3","2":"b3","3":"b2","4":"b1","5":"a1"},"a3":{"1":"a4","2":"b4","3":"b3","4":"b2","5":"a2"},"a4":{"1":"a5","2":"b5","3":"b4","4":"b3","5":"a3"},"a5":{"1":"a6","2":"b6","3":"b5","4":"b4","5":"a4"},"a6":{"1":"a7","2":"b7","3":"b6","4":"b5","5":"a5"},"a7":{"1":"a8","2":"b8","3":"b7","4":"b6","5":"a6"},"a8":{"3":"b8","4":"b7","5":"a7"},"b1":{"1":"b2","2":"c2","3":"c1","7":"a1","8":"a2"},"b2":{"1":"b3","2":"c3","3":"c2","4":"c1","5":"b1","6":"a1","7":"a2","8":"a3"},"b3":{"1":"b4","2":"c4","3":"c3","4":"c2","5":"b2","6":"a2","7":"a3","8":"a4"},"b4":{"1":"b5","2":"c5","3":"c4","4":"c3","5":"b3","6":"a3","7":"a4","8":"a5"},"b5":{"1":"b6","2":"c6","3":"c5","4":"c4","5":"b4","6":"a4","7":"a5","8":"a6"},"b6":{"1":"b7","2":"c7","3":"c6","4":"c5","5":"b5","6":"a5","7":"a6","8":"a7"},"b7":{"1":"b8","2":"c8","3":"c7","4":"c6","5":"b6","6":"a6","7":"a7","8":"a8"},"b8":{"3":"c8","4":"c7","5":"b7","6":"a7","7":"a8"},"c1":{"1":"c2","2":"d2","3":"d1","7":"b1","8":"b2"},"c2":{"1":"c3","2":"d3","3":"d2","4":"d1","5":"c1","6":"b1","7":"b2","8":"b3"},"c3":{"1":"c4","2":"d4","3":"d3","4":"d2","5":"c2","6":"b2","7":"b3","8":"b4"},"c4":{"1":"c5","2":"d5","3":"d4","4":"d3","5":"c3","6":"b3","7":"b4","8":"b5"},"c5":{"1":"c6","2":"d6","3":"d5","4":"d4","5":"c4","6":"b4","7":"b5","8":"b6"},"c6":{"1":"c7","2":"d7","3":"d6","4":"d5","5":"c5","6":"b5","7":"b6","8":"b7"},"c7":{"1":"c8","2":"d8","3":"d7","4":"d6","5":"c6","6":"b6","7":"b7","8":"b8"},"c8":{"3":"d8","4":"d7","5":"c7","6":"b7","7":"b8"},"d1":{"1":"d2","2":"e2","3":"e1","7":"c1","8":"c2"},"d2":{"1":"d3","2":"e3","3":"e2","4":"e1","5":"d1","6":"c1","7":"c2","8":"c3"},"d3":{"1":"d4","2":"e4","3":"e3","4":"e2","5":"d2","6":"c2","7":"c3","8":"c4"},"d4":{"1":"d5","2":"e5","3":"e4","4":"e3","5":"d3","6":"c3","7":"c4","8":"c5"},"d5":{"1":"d6","2":"e6","3":"e5","4":"e4","5":"d4","6":"c4","7":"c5","8":"c6"},"d6":{"1":"d7","2":"e7","3":"e6","4":"e5","5":"d5","6":"c5","7":"c6","8":"c7"},"d7":{"1":"d8","2":"e8","3":"e7","4":"e6","5":"d6","6":"c6","7":"c7","8":"c8"},"d8":{"3":"e8","4":"e7","5":"d7","6":"c7","7":"c8"},"e1":{"1":"e2","2":"f2","3":"f1","7":"d1","8":"d2"},"e2":{"1":"e3","2":"f3","3":"f2","4":"f1","5":"e1","6":"d1","7":"d2","8":"d3"},"e3":{"1":"e4","2":"f4","3":"f3","4":"f2","5":"e2","6":"d2","7":"d3","8":"d4"},"e4":{"1":"e5","2":"f5","3":"f4","4":"f3","5":"e3","6":"d3","7":"d4","8":"d5"},"e5":{"1":"e6","2":"f6","3":"f5","4":"f4","5":"e4","6":"d4","7":"d5","8":"d6"},"e6":{"1":"e7","2":"f7","3":"f6","4":"f5","5":"e5","6":"d5","7":"d6","8":"d7"},"e7":{"1":"e8","2":"f8","3":"f7","4":"f6","5":"e6","6":"d6","7":"d7","8":"d8"},"e8":{"3":"f8","4":"f7","5":"e7","6":"d7","7":"d8"},"f1":{"1":"f2","2":"g2","3":"g1","7":"e1","8":"e2"},"f2":{"1":"f3","2":"g3","3":"g2","4":"g1","5":"f1","6":"e1","7":"e2","8":"e3"},"f3":{"1":"f4","2":"g4","3":"g3","4":"g2","5":"f2","6":"e2","7":"e3","8":"e4"},"f4":{"1":"f5","2":"g5","3":"g4","4":"g3","5":"f3","6":"e3","7":"e4","8":"e5"},"f5":{"1":"f6","2":"g6","3":"g5","4":"g4","5":"f4","6":"e4","7":"e5","8":"e6"},"f6":{"1":"f7","2":"g7","3":"g6","4":"g5","5":"f5","6":"e5","7":"e6","8":"e7"},"f7":{"1":"f8","2":"g8","3":"g7","4":"g6","5":"f6","6":"e6","7":"e7","8":"e8"},"f8":{"3":"g8","4":"g7","5":"f7","6":"e7","7":"e8"},"g1":{"1":"g2","2":"h2","3":"h1","7":"f1","8":"f2"},"g2":{"1":"g3","2":"h3","3":"h2","4":"h1","5":"g1","6":"f1","7":"f2","8":"f3"},"g3":{"1":"g4","2":"h4","3":"h3","4":"h2","5":"g2","6":"f2","7":"f3","8":"f4"},"g4":{"1":"g5","2":"h5","3":"h4","4":"h3","5":"g3","6":"f3","7":"f4","8":"f5"},"g5":{"1":"g6","2":"h6","3":"h5","4":"h4","5":"g4","6":"f4","7":"f5","8":"f6"},"g6":{"1":"g7","2":"h7","3":"h6","4":"h5","5":"g5","6":"f5","7":"f6","8":"f7"},"g7":{"1":"g8","2":"h8","3":"h7","4":"h6","5":"g6","6":"f6","7":"f7","8":"f8"},"g8":{"3":"h8","4":"h7","5":"g7","6":"f7","7":"f8"},"h1":{"1":"h2","7":"g1","8":"g2"},"h2":{"1":"h3","5":"h1","6":"g1","7":"g2","8":"g3"},"h3":{"1":"h4","5":"h2","6":"g2","7":"g3","8":"g4"},"h4":{"1":"h5","5":"h3","6":"g3","7":"g4","8":"g5"},"h5":{"1":"h6","5":"h4","6":"g4","7":"g5","8":"g6"},"h6":{"1":"h7","5":"h5","6":"g5","7":"g6","8":"g7"},"h7":{"1":"h8","5":"h6","6":"g6","7":"g7","8":"g8"},"h8":{"5":"h7","6":"g7","7":"g8"}};var BOARD={"board":{"a1":{"colour":"dark","pos":"a1","x":1,"y":1},"a2":{"colour":"light","pos":"a2","x":1,"y":2},"a3":{"colour":"dark","pos":"a3","x":1,"y":3},"a4":{"colour":"light","pos":"a4","x":1,"y":4},"a5":{"colour":"dark","pos":"a5","x":1,"y":5},"a6":{"colour":"light","pos":"a6","x":1,"y":6},"a7":{"colour":"dark","pos":"a7","x":1,"y":7},"a8":{"colour":"light","pos":"a8","x":1,"y":8},"b1":{"colour":"light","pos":"b1","x":2,"y":1},"b2":{"colour":"dark","pos":"b2","x":2,"y":2},"b3":{"colour":"light","pos":"b3","x":2,"y":3},"b4":{"colour":"dark","pos":"b4","x":2,"y":4},"b5":{"colour":"light","pos":"b5","x":2,"y":5},"b6":{"colour":"dark","pos":"b6","x":2,"y":6},"b7":{"colour":"light","pos":"b7","x":2,"y":7},"b8":{"colour":"dark","pos":"b8","x":2,"y":8},"c1":{"colour":"dark","pos":"c1","x":3,"y":1},"c2":{"colour":"light","pos":"c2","x":3,"y":2},"c3":{"colour":"dark","pos":"c3","x":3,"y":3},"c4":{"colour":"light","pos":"c4","x":3,"y":4},"c5":{"colour":"dark","pos":"c5","x":3,"y":5},"c6":{"colour":"light","pos":"c6","x":3,"y":6},"c7":{"colour":"dark","pos":"c7","x":3,"y":7},"c8":{"colour":"light","pos":"c8","x":3,"y":8},"d1":{"colour":"light","pos":"d1","x":4,"y":1},"d2":{"colour":"dark","pos":"d2","x":4,"y":2},"d3":{"colour":"light","pos":"d3","x":4,"y":3},"d4":{"colour":"dark","pos":"d4","x":4,"y":4},"d5":{"colour":"light","pos":"d5","x":4,"y":5},"d6":{"colour":"dark","pos":"d6","x":4,"y":6},"d7":{"colour":"light","pos":"d7","x":4,"y":7},"d8":{"colour":"dark","pos":"d8","x":4,"y":8},"e1":{"colour":"dark","pos":"e1","x":5,"y":1},"e2":{"colour":"light","pos":"e2","x":5,"y":2},"e3":{"colour":"dark","pos":"e3","x":5,"y":3},"e4":{"colour":"light","pos":"e4","x":5,"y":4},"e5":{"colour":"dark","pos":"e5","x":5,"y":5},"e6":{"colour":"light","pos":"e6","x":5,"y":6},"e7":{"colour":"dark","pos":"e7","x":5,"y":7},"e8":{"colour":"light","pos":"e8","x":5,"y":8},"f1":{"colour":"light","pos":"f1","x":6,"y":1},"f2":{"colour":"dark","pos":"f2","x":6,"y":2},"f3":{"colour":"light","pos":"f3","x":6,"y":3},"f4":{"colour":"dark","pos":"f4","x":6,"y":4},"f5":{"colour":"light","pos":"f5","x":6,"y":5},"f6":{"colour":"dark","pos":"f6","x":6,"y":6},"f7":{"colour":"light","pos":"f7","x":6,"y":7},"f8":{"colour":"dark","pos":"f8","x":6,"y":8},"g1":{"colour":"dark","pos":"g1","x":7,"y":1},"g2":{"colour":"light","pos":"g2","x":7,"y":2},"g3":{"colour":"dark","pos":"g3","x":7,"y":3},"g4":{"colour":"light","pos":"g4","x":7,"y":4},"g5":{"colour":"dark","pos":"g5","x":7,"y":5},"g6":{"colour":"light","pos":"g6","x":7,"y":6},"g7":{"colour":"dark","pos":"g7","x":7,"y":7},"g8":{"colour":"light","pos":"g8","x":7,"y":8},"h1":{"colour":"light","pos":"h1","x":8,"y":1},"h2":{"colour":"dark","pos":"h2","x":8,"y":2},"h3":{"colour":"light","pos":"h3","x":8,"y":3},"h4":{"colour":"dark","pos":"h4","x":8,"y":4},"h5":{"colour":"light","pos":"h5","x":8,"y":5},"h6":{"colour":"dark","pos":"h6","x":8,"y":6},"h7":{"colour":"light","pos":"h7","x":8,"y":7},"h8":{"colour":"dark","pos":"h8","x":8,"y":8}},"light":{"a2":{"colour":"light","pos":"a2","x":1,"y":2},"a4":{"colour":"light","pos":"a4","x":1,"y":4},"a6":{"colour":"light","pos":"a6","x":1,"y":6},"a8":{"colour":"light","pos":"a8","x":1,"y":8},"b1":{"colour":"light","pos":"b1","x":2,"y":1},"b3":{"colour":"light","pos":"b3","x":2,"y":3},"b5":{"colour":"light","pos":"b5","x":2,"y":5},"b7":{"colour":"light","pos":"b7","x":2,"y":7},"c2":{"colour":"light","pos":"c2","x":3,"y":2},"c4":{"colour":"light","pos":"c4","x":3,"y":4},"c6":{"colour":"light","pos":"c6","x":3,"y":6},"c8":{"colour":"light","pos":"c8","x":3,"y":8},"d1":{"colour":"light","pos":"d1","x":4,"y":1},"d3":{"colour":"light","pos":"d3","x":4,"y":3},"d5":{"colour":"light","pos":"d5","x":4,"y":5},"d7":{"colour":"light","pos":"d7","x":4,"y":7},"e2":{"colour":"light","pos":"e2","x":5,"y":2},"e4":{"colour":"light","pos":"e4","x":5,"y":4},"e6":{"colour":"light","pos":"e6","x":5,"y":6},"e8":{"colour":"light","pos":"e8","x":5,"y":8},"f1":{"colour":"light","pos":"f1","x":6,"y":1},"f3":{"colour":"light","pos":"f3","x":6,"y":3},"f5":{"colour":"light","pos":"f5","x":6,"y":5},"f7":{"colour":"light","pos":"f7","x":6,"y":7},"g2":{"colour":"light","pos":"g2","x":7,"y":2},"g4":{"colour":"light","pos":"g4","x":7,"y":4},"g6":{"colour":"light","pos":"g6","x":7,"y":6},"g8":{"colour":"light","pos":"g8","x":7,"y":8},"h1":{"colour":"light","pos":"h1","x":8,"y":1},"h3":{"colour":"light","pos":"h3","x":8,"y":3},"h5":{"colour":"light","pos":"h5","x":8,"y":5},"h7":{"colour":"light","pos":"h7","x":8,"y":7}},"dark":{"a1":{"colour":"dark","pos":"a1","x":1,"y":1},"a3":{"colour":"dark","pos":"a3","x":1,"y":3},"a5":{"colour":"dark","pos":"a5","x":1,"y":5},"a7":{"colour":"dark","pos":"a7","x":1,"y":7},"b2":{"colour":"dark","pos":"b2","x":2,"y":2},"b4":{"colour":"dark","pos":"b4","x":2,"y":4},"b6":{"colour":"dark","pos":"b6","x":2,"y":6},"b8":{"colour":"dark","pos":"b8","x":2,"y":8},"c1":{"colour":"dark","pos":"c1","x":3,"y":1},"c3":{"colour":"dark","pos":"c3","x":3,"y":3},"c5":{"colour":"dark","pos":"c5","x":3,"y":5},"c7":{"colour":"dark","pos":"c7","x":3,"y":7},"d2":{"colour":"dark","pos":"d2","x":4,"y":2},"d4":{"colour":"dark","pos":"d4","x":4,"y":4},"d6":{"colour":"dark","pos":"d6","x":4,"y":6},"d8":{"colour":"dark","pos":"d8","x":4,"y":8},"e1":{"colour":"dark","pos":"e1","x":5,"y":1},"e3":{"colour":"dark","pos":"e3","x":5,"y":3},"e5":{"colour":"dark","pos":"e5","x":5,"y":5},"e7":{"colour":"dark","pos":"e7","x":5,"y":7},"f2":{"colour":"dark","pos":"f2","x":6,"y":2},"f4":{"colour":"dark","pos":"f4","x":6,"y":4},"f6":{"colour":"dark","pos":"f6","x":6,"y":6},"f8":{"colour":"dark","pos":"f8","x":6,"y":8},"g1":{"colour":"dark","pos":"g1","x":7,"y":1},"g3":{"colour":"dark","pos":"g3","x":7,"y":3},"g5":{"colour":"dark","pos":"g5","x":7,"y":5},"g7":{"colour":"dark","pos":"g7","x":7,"y":7},"h2":{"colour":"dark","pos":"h2","x":8,"y":2},"h4":{"colour":"dark","pos":"h4","x":8,"y":4},"h6":{"colour":"dark","pos":"h6","x":8,"y":6},"h8":{"colour":"dark","pos":"h8","x":8,"y":8}}};var relativedirs=[1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];(function(){var TERRAIN={"bases":{"a8":{"pos":"a8","owner":1},"b8":{"pos":"b8","owner":1},"c8":{"pos":"c8","owner":1},"d8":{"pos":"d8","owner":1},"e8":{"pos":"e8","owner":1},"f8":{"pos":"f8","owner":1},"g8":{"pos":"g8","owner":1},"h8":{"pos":"h8","owner":1},"a1":{"pos":"a1","owner":2},"b1":{"pos":"b1","owner":2},"c1":{"pos":"c1","owner":2},"d1":{"pos":"d1","owner":2},"e1":{"pos":"e1","owner":2},"f1":{"pos":"f1","owner":2},"g1":{"pos":"g1","owner":2},"h1":{"pos":"h1","owner":2}},"mybases":{"a8":{"pos":"a8","owner":1},"b8":{"pos":"b8","owner":1},"c8":{"pos":"c8","owner":1},"d8":{"pos":"d8","owner":1},"e8":{"pos":"e8","owner":1},"f8":{"pos":"f8","owner":1},"g8":{"pos":"g8","owner":1},"h8":{"pos":"h8","owner":1}},"oppbases":{"a1":{"pos":"a1","owner":2},"b1":{"pos":"b1","owner":2},"c1":{"pos":"c1","owner":2},"d1":{"pos":"d1","owner":2},"e1":{"pos":"e1","owner":2},"f1":{"pos":"f1","owner":2},"g1":{"pos":"g1","owner":2},"h1":{"pos":"h1","owner":2}}};var ownernames=["neutral","my","opp"];var player=1;var otherplayer=2;game.selectunit1=function(turn,step,markpos){var ARTIFACTS={movetarget:Object.assign({},step.ARTIFACTS.movetarget)};var UNITLAYERS=step.UNITLAYERS;var MARKS={selectunit:markpos};if(!!UNITLAYERS.mycrowns[MARKS['selectunit']]){var STARTPOS=MARKS['selectunit'];var neighbourdirs=[1,2,3,4,5,6,7,8];var startconnections=connections[STARTPOS];for(var dirnbr=0;dirnbr<8;dirnbr++){var POS=startconnections[neighbourdirs[dirnbr]];if(POS){if(!UNITLAYERS.myunits[POS]){ARTIFACTS['movetarget'][POS]={};}}}}else{var BLOCKS=UNITLAYERS.units;var STARTPOS=MARKS['selectunit'];var allwalkerdirs=[8,1,2,4,5,6];for(var walkerdirnbr=0;walkerdirnbr<6;walkerdirnbr++){var DIR=allwalkerdirs[walkerdirnbr];var MAX=[8,1,2].indexOf(DIR)!==-1?1:8;var POS=STARTPOS;var LENGTH=0;while(LENGTH<MAX&&(POS=connections[POS][DIR])&&!BLOCKS[POS]){LENGTH++;ARTIFACTS['movetarget'][POS]={};}if(BLOCKS[POS]){if(!UNITLAYERS.myunits[POS]&&!([1,5].indexOf(DIR)!==-1&&!!UNITLAYERS.oppdaggers[POS])){ARTIFACTS['movetarget'][POS]={};}}}}var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectunit'});turn.links[newstepid]={};var newlinks=turn.links[newstepid];for(var linkpos in ARTIFACTS.movetarget){newlinks[linkpos]='selectmovetarget1';}return newstep;};game.selectunit1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.selectmovetarget1=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectmovetarget:markpos,selectunit:step.MARKS.selectunit};var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectmovetarget'});turn.links[newstepid]={};turn.links[newstepid].move='move1';return newstep;};game.selectmovetarget1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.move1=function(turn,step){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var MARKS=step.MARKS;var UNITDATA=Object.assign({},step.UNITDATA);var UNITLAYERS=step.UNITLAYERS;delete UNITDATA[(UNITLAYERS.units[MARKS['selectmovetarget']]||{}).id];var unitid=(UNITLAYERS.units[MARKS['selectunit']]||{}).id;if(unitid){UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{'pos':MARKS['selectmovetarget']});}MARKS={};UNITLAYERS={"crowns":{},"mycrowns":{},"oppcrowns":{},"neutralcrowns":{},"daggers":{},"mydaggers":{},"oppdaggers":{},"neutraldaggers":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}ARTIFACTS={"movetarget":{}};var newstepid=step.stepid+'-'+'move';var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,stepid:newstepid,name:'move',path:step.path.concat('move')});turn.links[newstepid]={};if(Object.keys(function(){var ret={},s0=UNITLAYERS.mycrowns,s1=TERRAIN.oppbases;for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}()||{}).length!==0){var winner=1;var result=winner===1?'win':winner?'lose':'draw';turn.links[newstepid][result]='infiltration';}else if(Object.keys(UNITLAYERS.oppcrowns).length===1){var winner=1;var result=winner===1?'win':winner?'lose':'draw';turn.links[newstepid][result]='kingkill';}else turn.links[newstepid].endturn="start"+otherplayer;return newstep;};game.move1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.start1=function(turn,step){var turn={steps:{},player:player,turn:turn.turn+1,links:{root:{}}};var MARKS={};var ARTIFACTS={"movetarget":{}};var UNITDATA=step.UNITDATA;var UNITLAYERS={"crowns":{},"mycrowns":{},"oppcrowns":{},"neutralcrowns":{},"daggers":{},"mydaggers":{},"oppdaggers":{},"neutraldaggers":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}var newstep=turn.steps.root={ARTIFACTS:ARTIFACTS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,MARKS:MARKS,stepid:'root',name:'start',path:[]};var newlinks=turn.links.root;for(var linkpos in UNITLAYERS.myunits){newlinks[linkpos]='selectunit1';}return turn;};game.start1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.debug1=function(){return{TERRAIN:TERRAIN};};})();(function(){var TERRAIN={"bases":{"a8":{"pos":"a8","owner":1},"b8":{"pos":"b8","owner":1},"c8":{"pos":"c8","owner":1},"d8":{"pos":"d8","owner":1},"e8":{"pos":"e8","owner":1},"f8":{"pos":"f8","owner":1},"g8":{"pos":"g8","owner":1},"h8":{"pos":"h8","owner":1},"a1":{"pos":"a1","owner":2},"b1":{"pos":"b1","owner":2},"c1":{"pos":"c1","owner":2},"d1":{"pos":"d1","owner":2},"e1":{"pos":"e1","owner":2},"f1":{"pos":"f1","owner":2},"g1":{"pos":"g1","owner":2},"h1":{"pos":"h1","owner":2}},"oppbases":{"a8":{"pos":"a8","owner":1},"b8":{"pos":"b8","owner":1},"c8":{"pos":"c8","owner":1},"d8":{"pos":"d8","owner":1},"e8":{"pos":"e8","owner":1},"f8":{"pos":"f8","owner":1},"g8":{"pos":"g8","owner":1},"h8":{"pos":"h8","owner":1}},"mybases":{"a1":{"pos":"a1","owner":2},"b1":{"pos":"b1","owner":2},"c1":{"pos":"c1","owner":2},"d1":{"pos":"d1","owner":2},"e1":{"pos":"e1","owner":2},"f1":{"pos":"f1","owner":2},"g1":{"pos":"g1","owner":2},"h1":{"pos":"h1","owner":2}}};var ownernames=["neutral","opp","my"];var player=2;var otherplayer=1;game.selectunit2=function(turn,step,markpos){var ARTIFACTS={movetarget:Object.assign({},step.ARTIFACTS.movetarget)};var UNITLAYERS=step.UNITLAYERS;var MARKS={selectunit:markpos};if(!!UNITLAYERS.mycrowns[MARKS['selectunit']]){var STARTPOS=MARKS['selectunit'];var neighbourdirs=[1,2,3,4,5,6,7,8];var startconnections=connections[STARTPOS];for(var dirnbr=0;dirnbr<8;dirnbr++){var POS=startconnections[neighbourdirs[dirnbr]];if(POS){if(!UNITLAYERS.myunits[POS]){ARTIFACTS['movetarget'][POS]={};}}}}else{var BLOCKS=UNITLAYERS.units;var STARTPOS=MARKS['selectunit'];var allwalkerdirs=[8,1,2,4,5,6];for(var walkerdirnbr=0;walkerdirnbr<6;walkerdirnbr++){var DIR=allwalkerdirs[walkerdirnbr];var MAX=[8,1,2].indexOf(DIR)!==-1?1:8;var POS=STARTPOS;var LENGTH=0;while(LENGTH<MAX&&(POS=connections[POS][DIR])&&!BLOCKS[POS]){LENGTH++;ARTIFACTS['movetarget'][POS]={};}if(BLOCKS[POS]){if(!UNITLAYERS.myunits[POS]&&!([1,5].indexOf(DIR)!==-1&&!!UNITLAYERS.oppdaggers[POS])){ARTIFACTS['movetarget'][POS]={};}}}}var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectunit'});turn.links[newstepid]={};var newlinks=turn.links[newstepid];for(var linkpos in ARTIFACTS.movetarget){newlinks[linkpos]='selectmovetarget2';}return newstep;};game.selectunit2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.selectmovetarget2=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectmovetarget:markpos,selectunit:step.MARKS.selectunit};var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectmovetarget'});turn.links[newstepid]={};turn.links[newstepid].move='move2';return newstep;};game.selectmovetarget2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.move2=function(turn,step){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var MARKS=step.MARKS;var UNITDATA=Object.assign({},step.UNITDATA);var UNITLAYERS=step.UNITLAYERS;delete UNITDATA[(UNITLAYERS.units[MARKS['selectmovetarget']]||{}).id];var unitid=(UNITLAYERS.units[MARKS['selectunit']]||{}).id;if(unitid){UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{'pos':MARKS['selectmovetarget']});}MARKS={};UNITLAYERS={"crowns":{},"mycrowns":{},"oppcrowns":{},"neutralcrowns":{},"daggers":{},"mydaggers":{},"oppdaggers":{},"neutraldaggers":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}ARTIFACTS={"movetarget":{}};var newstepid=step.stepid+'-'+'move';var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,stepid:newstepid,name:'move',path:step.path.concat('move')});turn.links[newstepid]={};if(Object.keys(function(){var ret={},s0=UNITLAYERS.mycrowns,s1=TERRAIN.oppbases;for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}()||{}).length!==0){var winner=2;var result=winner===2?'win':winner?'lose':'draw';turn.links[newstepid][result]='infiltration';}else if(Object.keys(UNITLAYERS.oppcrowns).length===1){var winner=2;var result=winner===2?'win':winner?'lose':'draw';turn.links[newstepid][result]='kingkill';}else turn.links[newstepid].endturn="start"+otherplayer;return newstep;};game.move2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.start2=function(turn,step){var turn={steps:{},player:player,turn:turn.turn+1,links:{root:{}}};var MARKS={};var ARTIFACTS={"movetarget":{}};var UNITDATA=step.UNITDATA;var UNITLAYERS={"crowns":{},"mycrowns":{},"oppcrowns":{},"neutralcrowns":{},"daggers":{},"mydaggers":{},"oppdaggers":{},"neutraldaggers":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}var newstep=turn.steps.root={ARTIFACTS:ARTIFACTS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,MARKS:MARKS,stepid:'root',name:'start',path:[]};var newlinks=turn.links.root;for(var linkpos in UNITLAYERS.myunits){newlinks[linkpos]='selectunit2';}return turn;};game.start2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.debug2=function(){return{TERRAIN:TERRAIN};};})();function reduce(coll,iterator,acc){for(var key in coll){acc=iterator(acc,coll[key],key);}return acc;}game.newGame=function(){var turnseed={turn:0};var stepseed={UNITDATA:{"unit1":{"pos":"d8","id":"unit1","group":"crowns","owner":1},"unit2":{"pos":"e8","id":"unit2","group":"crowns","owner":1},"unit3":{"pos":"c1","id":"unit3","group":"crowns","owner":2},"unit4":{"pos":"f1","id":"unit4","group":"crowns","owner":2},"unit5":{"pos":"c7","id":"unit5","group":"daggers","owner":1},"unit6":{"pos":"d7","id":"unit6","group":"daggers","owner":1},"unit7":{"pos":"e7","id":"unit7","group":"daggers","owner":1},"unit8":{"pos":"f7","id":"unit8","group":"daggers","owner":1},"unit9":{"pos":"c3","id":"unit9","group":"daggers","owner":2},"unit10":{"pos":"f3","id":"unit10","group":"daggers","owner":2},"unit11":{"pos":"b2","id":"unit11","group":"daggers","owner":2},"unit12":{"pos":"c2","id":"unit12","group":"daggers","owner":2},"unit13":{"pos":"d2","id":"unit13","group":"daggers","owner":2},"unit14":{"pos":"e2","id":"unit14","group":"daggers","owner":2},"unit15":{"pos":"f2","id":"unit15","group":"daggers","owner":2},"unit16":{"pos":"g2","id":"unit16","group":"daggers","owner":2}}};return game.start1(turnseed,stepseed);};game.debug=function(){return{BOARD:BOARD,connections:connections,plr1:game.debug1(),plr2:game.debug2()};};game.commands={"move":1};game.graphics={"tiles":{"bases":"playercolour"},"icons":{"daggers":"bishops","crowns":"kings"}};game.board={"height":8,"width":8,"terrain":{"bases":{"1":[["rect","a8","h8"]],"2":[["rect","a1","h1"]]}}};game.AI=[];game.id="daggers";return game;}(),gogol:function(){var game={};var connections={"faux":{},"a1":{"1":"a2","2":"b2","3":"b1"},"a2":{"1":"a3","2":"b3","3":"b2","4":"b1","5":"a1"},"a3":{"1":"a4","2":"b4","3":"b3","4":"b2","5":"a2"},"a4":{"1":"a5","2":"b5","3":"b4","4":"b3","5":"a3"},"a5":{"1":"a6","2":"b6","3":"b5","4":"b4","5":"a4"},"a6":{"1":"a7","2":"b7","3":"b6","4":"b5","5":"a5"},"a7":{"1":"a8","2":"b8","3":"b7","4":"b6","5":"a6"},"a8":{"3":"b8","4":"b7","5":"a7"},"b1":{"1":"b2","2":"c2","3":"c1","7":"a1","8":"a2"},"b2":{"1":"b3","2":"c3","3":"c2","4":"c1","5":"b1","6":"a1","7":"a2","8":"a3"},"b3":{"1":"b4","2":"c4","3":"c3","4":"c2","5":"b2","6":"a2","7":"a3","8":"a4"},"b4":{"1":"b5","2":"c5","3":"c4","4":"c3","5":"b3","6":"a3","7":"a4","8":"a5"},"b5":{"1":"b6","2":"c6","3":"c5","4":"c4","5":"b4","6":"a4","7":"a5","8":"a6"},"b6":{"1":"b7","2":"c7","3":"c6","4":"c5","5":"b5","6":"a5","7":"a6","8":"a7"},"b7":{"1":"b8","2":"c8","3":"c7","4":"c6","5":"b6","6":"a6","7":"a7","8":"a8"},"b8":{"3":"c8","4":"c7","5":"b7","6":"a7","7":"a8"},"c1":{"1":"c2","2":"d2","3":"d1","7":"b1","8":"b2"},"c2":{"1":"c3","2":"d3","3":"d2","4":"d1","5":"c1","6":"b1","7":"b2","8":"b3"},"c3":{"1":"c4","2":"d4","3":"d3","4":"d2","5":"c2","6":"b2","7":"b3","8":"b4"},"c4":{"1":"c5","2":"d5","3":"d4","4":"d3","5":"c3","6":"b3","7":"b4","8":"b5"},"c5":{"1":"c6","2":"d6","3":"d5","4":"d4","5":"c4","6":"b4","7":"b5","8":"b6"},"c6":{"1":"c7","2":"d7","3":"d6","4":"d5","5":"c5","6":"b5","7":"b6","8":"b7"},"c7":{"1":"c8","2":"d8","3":"d7","4":"d6","5":"c6","6":"b6","7":"b7","8":"b8"},"c8":{"3":"d8","4":"d7","5":"c7","6":"b7","7":"b8"},"d1":{"1":"d2","2":"e2","3":"e1","7":"c1","8":"c2"},"d2":{"1":"d3","2":"e3","3":"e2","4":"e1","5":"d1","6":"c1","7":"c2","8":"c3"},"d3":{"1":"d4","2":"e4","3":"e3","4":"e2","5":"d2","6":"c2","7":"c3","8":"c4"},"d4":{"1":"d5","2":"e5","3":"e4","4":"e3","5":"d3","6":"c3","7":"c4","8":"c5"},"d5":{"1":"d6","2":"e6","3":"e5","4":"e4","5":"d4","6":"c4","7":"c5","8":"c6"},"d6":{"1":"d7","2":"e7","3":"e6","4":"e5","5":"d5","6":"c5","7":"c6","8":"c7"},"d7":{"1":"d8","2":"e8","3":"e7","4":"e6","5":"d6","6":"c6","7":"c7","8":"c8"},"d8":{"3":"e8","4":"e7","5":"d7","6":"c7","7":"c8"},"e1":{"1":"e2","2":"f2","3":"f1","7":"d1","8":"d2"},"e2":{"1":"e3","2":"f3","3":"f2","4":"f1","5":"e1","6":"d1","7":"d2","8":"d3"},"e3":{"1":"e4","2":"f4","3":"f3","4":"f2","5":"e2","6":"d2","7":"d3","8":"d4"},"e4":{"1":"e5","2":"f5","3":"f4","4":"f3","5":"e3","6":"d3","7":"d4","8":"d5"},"e5":{"1":"e6","2":"f6","3":"f5","4":"f4","5":"e4","6":"d4","7":"d5","8":"d6"},"e6":{"1":"e7","2":"f7","3":"f6","4":"f5","5":"e5","6":"d5","7":"d6","8":"d7"},"e7":{"1":"e8","2":"f8","3":"f7","4":"f6","5":"e6","6":"d6","7":"d7","8":"d8"},"e8":{"3":"f8","4":"f7","5":"e7","6":"d7","7":"d8"},"f1":{"1":"f2","2":"g2","3":"g1","7":"e1","8":"e2"},"f2":{"1":"f3","2":"g3","3":"g2","4":"g1","5":"f1","6":"e1","7":"e2","8":"e3"},"f3":{"1":"f4","2":"g4","3":"g3","4":"g2","5":"f2","6":"e2","7":"e3","8":"e4"},"f4":{"1":"f5","2":"g5","3":"g4","4":"g3","5":"f3","6":"e3","7":"e4","8":"e5"},"f5":{"1":"f6","2":"g6","3":"g5","4":"g4","5":"f4","6":"e4","7":"e5","8":"e6"},"f6":{"1":"f7","2":"g7","3":"g6","4":"g5","5":"f5","6":"e5","7":"e6","8":"e7"},"f7":{"1":"f8","2":"g8","3":"g7","4":"g6","5":"f6","6":"e6","7":"e7","8":"e8"},"f8":{"3":"g8","4":"g7","5":"f7","6":"e7","7":"e8"},"g1":{"1":"g2","2":"h2","3":"h1","7":"f1","8":"f2"},"g2":{"1":"g3","2":"h3","3":"h2","4":"h1","5":"g1","6":"f1","7":"f2","8":"f3"},"g3":{"1":"g4","2":"h4","3":"h3","4":"h2","5":"g2","6":"f2","7":"f3","8":"f4"},"g4":{"1":"g5","2":"h5","3":"h4","4":"h3","5":"g3","6":"f3","7":"f4","8":"f5"},"g5":{"1":"g6","2":"h6","3":"h5","4":"h4","5":"g4","6":"f4","7":"f5","8":"f6"},"g6":{"1":"g7","2":"h7","3":"h6","4":"h5","5":"g5","6":"f5","7":"f6","8":"f7"},"g7":{"1":"g8","2":"h8","3":"h7","4":"h6","5":"g6","6":"f6","7":"f7","8":"f8"},"g8":{"3":"h8","4":"h7","5":"g7","6":"f7","7":"f8"},"h1":{"1":"h2","7":"g1","8":"g2"},"h2":{"1":"h3","5":"h1","6":"g1","7":"g2","8":"g3"},"h3":{"1":"h4","5":"h2","6":"g2","7":"g3","8":"g4"},"h4":{"1":"h5","5":"h3","6":"g3","7":"g4","8":"g5"},"h5":{"1":"h6","5":"h4","6":"g4","7":"g5","8":"g6"},"h6":{"1":"h7","5":"h5","6":"g5","7":"g6","8":"g7"},"h7":{"1":"h8","5":"h6","6":"g6","7":"g7","8":"g8"},"h8":{"5":"h7","6":"g7","7":"g8"}};var BOARD={"board":{"a1":{"colour":"dark","pos":"a1","x":1,"y":1},"a2":{"colour":"light","pos":"a2","x":1,"y":2},"a3":{"colour":"dark","pos":"a3","x":1,"y":3},"a4":{"colour":"light","pos":"a4","x":1,"y":4},"a5":{"colour":"dark","pos":"a5","x":1,"y":5},"a6":{"colour":"light","pos":"a6","x":1,"y":6},"a7":{"colour":"dark","pos":"a7","x":1,"y":7},"a8":{"colour":"light","pos":"a8","x":1,"y":8},"b1":{"colour":"light","pos":"b1","x":2,"y":1},"b2":{"colour":"dark","pos":"b2","x":2,"y":2},"b3":{"colour":"light","pos":"b3","x":2,"y":3},"b4":{"colour":"dark","pos":"b4","x":2,"y":4},"b5":{"colour":"light","pos":"b5","x":2,"y":5},"b6":{"colour":"dark","pos":"b6","x":2,"y":6},"b7":{"colour":"light","pos":"b7","x":2,"y":7},"b8":{"colour":"dark","pos":"b8","x":2,"y":8},"c1":{"colour":"dark","pos":"c1","x":3,"y":1},"c2":{"colour":"light","pos":"c2","x":3,"y":2},"c3":{"colour":"dark","pos":"c3","x":3,"y":3},"c4":{"colour":"light","pos":"c4","x":3,"y":4},"c5":{"colour":"dark","pos":"c5","x":3,"y":5},"c6":{"colour":"light","pos":"c6","x":3,"y":6},"c7":{"colour":"dark","pos":"c7","x":3,"y":7},"c8":{"colour":"light","pos":"c8","x":3,"y":8},"d1":{"colour":"light","pos":"d1","x":4,"y":1},"d2":{"colour":"dark","pos":"d2","x":4,"y":2},"d3":{"colour":"light","pos":"d3","x":4,"y":3},"d4":{"colour":"dark","pos":"d4","x":4,"y":4},"d5":{"colour":"light","pos":"d5","x":4,"y":5},"d6":{"colour":"dark","pos":"d6","x":4,"y":6},"d7":{"colour":"light","pos":"d7","x":4,"y":7},"d8":{"colour":"dark","pos":"d8","x":4,"y":8},"e1":{"colour":"dark","pos":"e1","x":5,"y":1},"e2":{"colour":"light","pos":"e2","x":5,"y":2},"e3":{"colour":"dark","pos":"e3","x":5,"y":3},"e4":{"colour":"light","pos":"e4","x":5,"y":4},"e5":{"colour":"dark","pos":"e5","x":5,"y":5},"e6":{"colour":"light","pos":"e6","x":5,"y":6},"e7":{"colour":"dark","pos":"e7","x":5,"y":7},"e8":{"colour":"light","pos":"e8","x":5,"y":8},"f1":{"colour":"light","pos":"f1","x":6,"y":1},"f2":{"colour":"dark","pos":"f2","x":6,"y":2},"f3":{"colour":"light","pos":"f3","x":6,"y":3},"f4":{"colour":"dark","pos":"f4","x":6,"y":4},"f5":{"colour":"light","pos":"f5","x":6,"y":5},"f6":{"colour":"dark","pos":"f6","x":6,"y":6},"f7":{"colour":"light","pos":"f7","x":6,"y":7},"f8":{"colour":"dark","pos":"f8","x":6,"y":8},"g1":{"colour":"dark","pos":"g1","x":7,"y":1},"g2":{"colour":"light","pos":"g2","x":7,"y":2},"g3":{"colour":"dark","pos":"g3","x":7,"y":3},"g4":{"colour":"light","pos":"g4","x":7,"y":4},"g5":{"colour":"dark","pos":"g5","x":7,"y":5},"g6":{"colour":"light","pos":"g6","x":7,"y":6},"g7":{"colour":"dark","pos":"g7","x":7,"y":7},"g8":{"colour":"light","pos":"g8","x":7,"y":8},"h1":{"colour":"light","pos":"h1","x":8,"y":1},"h2":{"colour":"dark","pos":"h2","x":8,"y":2},"h3":{"colour":"light","pos":"h3","x":8,"y":3},"h4":{"colour":"dark","pos":"h4","x":8,"y":4},"h5":{"colour":"light","pos":"h5","x":8,"y":5},"h6":{"colour":"dark","pos":"h6","x":8,"y":6},"h7":{"colour":"light","pos":"h7","x":8,"y":7},"h8":{"colour":"dark","pos":"h8","x":8,"y":8}},"light":{"a2":{"colour":"light","pos":"a2","x":1,"y":2},"a4":{"colour":"light","pos":"a4","x":1,"y":4},"a6":{"colour":"light","pos":"a6","x":1,"y":6},"a8":{"colour":"light","pos":"a8","x":1,"y":8},"b1":{"colour":"light","pos":"b1","x":2,"y":1},"b3":{"colour":"light","pos":"b3","x":2,"y":3},"b5":{"colour":"light","pos":"b5","x":2,"y":5},"b7":{"colour":"light","pos":"b7","x":2,"y":7},"c2":{"colour":"light","pos":"c2","x":3,"y":2},"c4":{"colour":"light","pos":"c4","x":3,"y":4},"c6":{"colour":"light","pos":"c6","x":3,"y":6},"c8":{"colour":"light","pos":"c8","x":3,"y":8},"d1":{"colour":"light","pos":"d1","x":4,"y":1},"d3":{"colour":"light","pos":"d3","x":4,"y":3},"d5":{"colour":"light","pos":"d5","x":4,"y":5},"d7":{"colour":"light","pos":"d7","x":4,"y":7},"e2":{"colour":"light","pos":"e2","x":5,"y":2},"e4":{"colour":"light","pos":"e4","x":5,"y":4},"e6":{"colour":"light","pos":"e6","x":5,"y":6},"e8":{"colour":"light","pos":"e8","x":5,"y":8},"f1":{"colour":"light","pos":"f1","x":6,"y":1},"f3":{"colour":"light","pos":"f3","x":6,"y":3},"f5":{"colour":"light","pos":"f5","x":6,"y":5},"f7":{"colour":"light","pos":"f7","x":6,"y":7},"g2":{"colour":"light","pos":"g2","x":7,"y":2},"g4":{"colour":"light","pos":"g4","x":7,"y":4},"g6":{"colour":"light","pos":"g6","x":7,"y":6},"g8":{"colour":"light","pos":"g8","x":7,"y":8},"h1":{"colour":"light","pos":"h1","x":8,"y":1},"h3":{"colour":"light","pos":"h3","x":8,"y":3},"h5":{"colour":"light","pos":"h5","x":8,"y":5},"h7":{"colour":"light","pos":"h7","x":8,"y":7}},"dark":{"a1":{"colour":"dark","pos":"a1","x":1,"y":1},"a3":{"colour":"dark","pos":"a3","x":1,"y":3},"a5":{"colour":"dark","pos":"a5","x":1,"y":5},"a7":{"colour":"dark","pos":"a7","x":1,"y":7},"b2":{"colour":"dark","pos":"b2","x":2,"y":2},"b4":{"colour":"dark","pos":"b4","x":2,"y":4},"b6":{"colour":"dark","pos":"b6","x":2,"y":6},"b8":{"colour":"dark","pos":"b8","x":2,"y":8},"c1":{"colour":"dark","pos":"c1","x":3,"y":1},"c3":{"colour":"dark","pos":"c3","x":3,"y":3},"c5":{"colour":"dark","pos":"c5","x":3,"y":5},"c7":{"colour":"dark","pos":"c7","x":3,"y":7},"d2":{"colour":"dark","pos":"d2","x":4,"y":2},"d4":{"colour":"dark","pos":"d4","x":4,"y":4},"d6":{"colour":"dark","pos":"d6","x":4,"y":6},"d8":{"colour":"dark","pos":"d8","x":4,"y":8},"e1":{"colour":"dark","pos":"e1","x":5,"y":1},"e3":{"colour":"dark","pos":"e3","x":5,"y":3},"e5":{"colour":"dark","pos":"e5","x":5,"y":5},"e7":{"colour":"dark","pos":"e7","x":5,"y":7},"f2":{"colour":"dark","pos":"f2","x":6,"y":2},"f4":{"colour":"dark","pos":"f4","x":6,"y":4},"f6":{"colour":"dark","pos":"f6","x":6,"y":6},"f8":{"colour":"dark","pos":"f8","x":6,"y":8},"g1":{"colour":"dark","pos":"g1","x":7,"y":1},"g3":{"colour":"dark","pos":"g3","x":7,"y":3},"g5":{"colour":"dark","pos":"g5","x":7,"y":5},"g7":{"colour":"dark","pos":"g7","x":7,"y":7},"h2":{"colour":"dark","pos":"h2","x":8,"y":2},"h4":{"colour":"dark","pos":"h4","x":8,"y":4},"h6":{"colour":"dark","pos":"h6","x":8,"y":6},"h8":{"colour":"dark","pos":"h8","x":8,"y":8}}};var relativedirs=[1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];(function(){var TERRAIN={"homerow":{"a1":{"pos":"a1","owner":1},"b1":{"pos":"b1","owner":1},"c1":{"pos":"c1","owner":1},"d1":{"pos":"d1","owner":1},"e1":{"pos":"e1","owner":1},"f1":{"pos":"f1","owner":1},"g1":{"pos":"g1","owner":1},"h1":{"pos":"h1","owner":1},"a8":{"pos":"a8","owner":2},"b8":{"pos":"b8","owner":2},"c8":{"pos":"c8","owner":2},"d8":{"pos":"d8","owner":2},"e8":{"pos":"e8","owner":2},"f8":{"pos":"f8","owner":2},"g8":{"pos":"g8","owner":2},"h8":{"pos":"h8","owner":2}},"myhomerow":{"a1":{"pos":"a1","owner":1},"b1":{"pos":"b1","owner":1},"c1":{"pos":"c1","owner":1},"d1":{"pos":"d1","owner":1},"e1":{"pos":"e1","owner":1},"f1":{"pos":"f1","owner":1},"g1":{"pos":"g1","owner":1},"h1":{"pos":"h1","owner":1}},"opphomerow":{"a8":{"pos":"a8","owner":2},"b8":{"pos":"b8","owner":2},"c8":{"pos":"c8","owner":2},"d8":{"pos":"d8","owner":2},"e8":{"pos":"e8","owner":2},"f8":{"pos":"f8","owner":2},"g8":{"pos":"g8","owner":2},"h8":{"pos":"h8","owner":2}},"edges":{"a1":{"pos":"a1"},"a2":{"pos":"a2"},"a3":{"pos":"a3"},"a4":{"pos":"a4"},"a5":{"pos":"a5"},"a6":{"pos":"a6"},"a7":{"pos":"a7"},"a8":{"pos":"a8"},"h1":{"pos":"h1"},"h2":{"pos":"h2"},"h3":{"pos":"h3"},"h4":{"pos":"h4"},"h5":{"pos":"h5"},"h6":{"pos":"h6"},"h7":{"pos":"h7"},"h8":{"pos":"h8"},"b8":{"pos":"b8"},"c8":{"pos":"c8"},"d8":{"pos":"d8"},"e8":{"pos":"e8"},"f8":{"pos":"f8"},"g8":{"pos":"g8"},"b1":{"pos":"b1"},"c1":{"pos":"c1"},"d1":{"pos":"d1"},"e1":{"pos":"e1"},"f1":{"pos":"f1"},"g1":{"pos":"g1"}}};var ownernames=["neutral","my","opp"];var player=1;var otherplayer=2;game.selectkingdeploy1=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectkingdeploy:markpos};var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectkingdeploy'});turn.links[newstepid]={};turn.links[newstepid].deploy='deploy1';return newstep;};game.selectkingdeploy1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.selectunit1=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{kingwalk:Object.assign({},step.ARTIFACTS.kingwalk),adjacentenemies:Object.assign({},step.ARTIFACTS.adjacentenemies),willdie:Object.assign({},step.ARTIFACTS.willdie),jumptargets:Object.assign({},step.ARTIFACTS.jumptargets)});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectunit:markpos};var BLOCKS=UNITLAYERS.units;var walkstarts=function(){var k,ret={},s0=UNITLAYERS.mykings,s1=ARTIFACTS.selectunit;for(k in s0){ret[k]=1;}for(k in s1){ret[k]=1;}return ret;}();for(var STARTPOS in walkstarts){var allwalkerdirs=[1,2,3,4,5,6,7,8];for(var walkerdirnbr=0;walkerdirnbr<8;walkerdirnbr++){var POS=STARTPOS;while((POS=connections[POS][allwalkerdirs[walkerdirnbr]])&&!BLOCKS[POS]){if(!ARTIFACTS.nokings[POS]){ARTIFACTS['kingwalk'][POS]={};}}}}var STARTPOS=MARKS['selectunit'];var neighbourdirs=[1,2,3,4,5,6,7,8];var startconnections=connections[STARTPOS];for(var dirnbr=0;dirnbr<8;dirnbr++){var DIR=neighbourdirs[dirnbr];var POS=startconnections[DIR];if(POS&&UNITLAYERS.oppunits[POS]){ARTIFACTS['adjacentenemies'][POS]={dir:DIR};}}for(var STARTPOS in ARTIFACTS.adjacentenemies){var DIR=relativedirs[(ARTIFACTS.adjacentenemies[STARTPOS]||{})['dir']-2+1];var POS=connections[STARTPOS][DIR];if(POS&&!function(){var k,ret={},s0=UNITLAYERS.units,s1=!!UNITLAYERS.mykings[MARKS['selectunit']]?ARTIFACTS.nokings:ARTIFACTS.nosoldiers;for(k in s0){ret[k]=1;}for(k in s1){ret[k]=1;}return ret;}()[POS]){var NEIGHBOURCOUNT=1;ARTIFACTS['jumptargets'][POS]={dir:DIR};}if(!!NEIGHBOURCOUNT){ARTIFACTS['willdie'][STARTPOS]={dir:DIR};}}var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectunit'});turn.links[newstepid]={};var newlinks=turn.links[newstepid];for(var linkpos in!!UNITLAYERS.mykings[MARKS['selectunit']]?ARTIFACTS.kingwalk:function(){var ret={},s0=BOARD.board,s1=function(){var k,ret={},s0=UNITLAYERS.units,s1=function(){var k,ret={},s0=ARTIFACTS.nosoldiers,s1=ARTIFACTS.jumptargets;for(k in s0){ret[k]=1;}for(k in s1){ret[k]=1;}return ret;}();for(k in s0){ret[k]=1;}for(k in s1){ret[k]=1;}return ret;}();for(var key in s0){if(!s1[key]){ret[key]=s0[key];}}return ret;}()){newlinks[linkpos]='selectmovetarget1';}var newlinks=turn.links[newstepid];for(var linkpos in ARTIFACTS.jumptargets){newlinks[linkpos]='selectjumptarget1';}return newstep;};game.selectunit1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.selectmovetarget1=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectmovetarget:markpos,selectunit:step.MARKS.selectunit};var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectmovetarget'});turn.links[newstepid]={};turn.links[newstepid].move='move1';return newstep;};game.selectmovetarget1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.selectjumptarget1=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{splashed:Object.assign({},step.ARTIFACTS.splashed)});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectjumptarget:markpos,selectunit:step.MARKS.selectunit};var filtersourcelayer=ARTIFACTS.willdie;var filtertargetlayer=ARTIFACTS.splashed;for(var POS in filtersourcelayer){if(filtersourcelayer[POS]){var filterobj=filtersourcelayer[POS];if(filterobj.dir===(ARTIFACTS.jumptargets[MARKS['selectjumptarget']]||{})['dir']){filtertargetlayer[POS]=filterobj;}}}var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectjumptarget'});turn.links[newstepid]={};turn.links[newstepid].jump='jump1';return newstep;};game.selectjumptarget1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.deploy1=function(turn,step){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var MARKS=step.MARKS;var UNITDATA=Object.assign({},step.UNITDATA);var clones=step.clones;var UNITLAYERS=step.UNITLAYERS;var newunitid='spawn'+clones++;UNITDATA[newunitid]={pos:MARKS['selectkingdeploy'],id:newunitid,group:'kings',owner:player};MARKS={};UNITLAYERS={"soldiers":{},"mysoldiers":{},"oppsoldiers":{},"neutralsoldiers":{},"kings":{},"mykings":{},"oppkings":{},"neutralkings":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}ARTIFACTS={"nokings":{},"nosoldiers":{},"kingwalk":{},"adjacentenemies":{},"splashed":{},"willdie":{},"jumptargets":{}};var newstepid=step.stepid+'-'+'deploy';var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,stepid:newstepid,name:'deploy',path:step.path.concat('deploy'),clones:clones});turn.links[newstepid]={};if(Object.keys(function(){var ret={},s0=UNITLAYERS.mykings,s1=TERRAIN.opphomerow;for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}()||{}).length!==0){var winner=1;var result=winner===1?'win':winner?'lose':'draw';turn.links[newstepid][result]='infiltration';}else if(turn.turn>2&&Object.keys(UNITLAYERS.oppkings||{}).length===0){var winner=1;var result=winner===1?'win':winner?'lose':'draw';turn.links[newstepid][result]='kingkill';}else turn.links[newstepid].endturn="start"+otherplayer;return newstep;};game.deploy1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.move1=function(turn,step){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var MARKS=step.MARKS;var UNITDATA=Object.assign({},step.UNITDATA);var UNITLAYERS=step.UNITLAYERS;var unitid=(UNITLAYERS.units[MARKS['selectunit']]||{}).id;if(unitid){UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{'pos':MARKS['selectmovetarget']});}MARKS={};UNITLAYERS={"soldiers":{},"mysoldiers":{},"oppsoldiers":{},"neutralsoldiers":{},"kings":{},"mykings":{},"oppkings":{},"neutralkings":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}ARTIFACTS={"nokings":{},"nosoldiers":{},"kingwalk":{},"adjacentenemies":{},"splashed":{},"willdie":{},"jumptargets":{}};var newstepid=step.stepid+'-'+'move';var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,stepid:newstepid,name:'move',path:step.path.concat('move')});turn.links[newstepid]={};if(Object.keys(function(){var ret={},s0=UNITLAYERS.mykings,s1=TERRAIN.opphomerow;for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}()||{}).length!==0){var winner=1;var result=winner===1?'win':winner?'lose':'draw';turn.links[newstepid][result]='infiltration';}else if(turn.turn>2&&Object.keys(UNITLAYERS.oppkings||{}).length===0){var winner=1;var result=winner===1?'win':winner?'lose':'draw';turn.links[newstepid][result]='kingkill';}else turn.links[newstepid].endturn="start"+otherplayer;return newstep;};game.move1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.jump1=function(turn,step){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var MARKS=step.MARKS;var UNITDATA=Object.assign({},step.UNITDATA);var UNITLAYERS=step.UNITLAYERS;delete UNITDATA[(UNITLAYERS.units[Object.keys(ARTIFACTS.willdie)[0]]||{}).id];var unitid=(UNITLAYERS.units[MARKS['selectunit']]||{}).id;if(unitid){UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{'pos':MARKS['selectjumptarget']});}MARKS={};UNITLAYERS={"soldiers":{},"mysoldiers":{},"oppsoldiers":{},"neutralsoldiers":{},"kings":{},"mykings":{},"oppkings":{},"neutralkings":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}ARTIFACTS={"nokings":{},"nosoldiers":{},"kingwalk":{},"adjacentenemies":{},"splashed":{},"willdie":{},"jumptargets":{}};var newstepid=step.stepid+'-'+'jump';var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,stepid:newstepid,name:'jump',path:step.path.concat('jump')});turn.links[newstepid]={};if(Object.keys(function(){var ret={},s0=UNITLAYERS.mykings,s1=TERRAIN.opphomerow;for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}()||{}).length!==0){var winner=1;var result=winner===1?'win':winner?'lose':'draw';turn.links[newstepid][result]='infiltration';}else if(turn.turn>2&&Object.keys(UNITLAYERS.oppkings||{}).length===0){var winner=1;var result=winner===1?'win':winner?'lose':'draw';turn.links[newstepid][result]='kingkill';}else turn.links[newstepid].endturn="start"+otherplayer;return newstep;};game.jump1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.start1=function(turn,step){var turn={steps:{},player:player,turn:turn.turn+1,links:{root:{}}};var MARKS={};var ARTIFACTS={"nokings":{},"nosoldiers":{},"kingwalk":{},"adjacentenemies":{},"splashed":{},"willdie":{},"jumptargets":{}};var UNITDATA=step.UNITDATA;var UNITLAYERS={"soldiers":{},"mysoldiers":{},"oppsoldiers":{},"neutralsoldiers":{},"kings":{},"mykings":{},"oppkings":{},"neutralkings":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}for(var STARTPOS in function(){var ret={},s0=TERRAIN.edges,s1=UNITLAYERS.mysoldiers;for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}()){var neighbourdirs=!!TERRAIN.homerow[STARTPOS]?[1,3,5,7]:[1,5];var nbrofneighbourdirs=neighbourdirs.length;var startconnections=connections[STARTPOS];for(var dirnbr=0;dirnbr<nbrofneighbourdirs;dirnbr++){var POS=startconnections[neighbourdirs[dirnbr]];if(POS){ARTIFACTS['nokings'][POS]={};}}}for(var STARTPOS in UNITLAYERS.mykings){var neighbourdirs=[1,3,5,7];var startconnections=connections[STARTPOS];for(var dirnbr=0;dirnbr<4;dirnbr++){var POS=startconnections[neighbourdirs[dirnbr]];if(POS&&(!!TERRAIN.homerow[POS]||!!TERRAIN.edges[STARTPOS]&&!!TERRAIN.edges[POS])){ARTIFACTS['nosoldiers'][POS]={};}}}var newstep=turn.steps.root={ARTIFACTS:ARTIFACTS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,MARKS:MARKS,stepid:'root',name:'start',clones:step.clones,path:[]};if(turn.turn>2){var newlinks=turn.links.root;for(var linkpos in UNITLAYERS.myunits){newlinks[linkpos]='selectunit1';}}else{var newlinks=turn.links.root;for(var linkpos in function(){var ret={},s0=BOARD.board,s1=function(){var k,ret={},s0=UNITLAYERS.units,s1=ARTIFACTS.nokings;for(k in s0){ret[k]=1;}for(k in s1){ret[k]=1;}return ret;}();for(var key in s0){if(!s1[key]){ret[key]=s0[key];}}return ret;}()){newlinks[linkpos]='selectkingdeploy1';}}return turn;};game.start1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.debug1=function(){return{TERRAIN:TERRAIN};};})();(function(){var TERRAIN={"homerow":{"a1":{"pos":"a1","owner":1},"b1":{"pos":"b1","owner":1},"c1":{"pos":"c1","owner":1},"d1":{"pos":"d1","owner":1},"e1":{"pos":"e1","owner":1},"f1":{"pos":"f1","owner":1},"g1":{"pos":"g1","owner":1},"h1":{"pos":"h1","owner":1},"a8":{"pos":"a8","owner":2},"b8":{"pos":"b8","owner":2},"c8":{"pos":"c8","owner":2},"d8":{"pos":"d8","owner":2},"e8":{"pos":"e8","owner":2},"f8":{"pos":"f8","owner":2},"g8":{"pos":"g8","owner":2},"h8":{"pos":"h8","owner":2}},"opphomerow":{"a1":{"pos":"a1","owner":1},"b1":{"pos":"b1","owner":1},"c1":{"pos":"c1","owner":1},"d1":{"pos":"d1","owner":1},"e1":{"pos":"e1","owner":1},"f1":{"pos":"f1","owner":1},"g1":{"pos":"g1","owner":1},"h1":{"pos":"h1","owner":1}},"myhomerow":{"a8":{"pos":"a8","owner":2},"b8":{"pos":"b8","owner":2},"c8":{"pos":"c8","owner":2},"d8":{"pos":"d8","owner":2},"e8":{"pos":"e8","owner":2},"f8":{"pos":"f8","owner":2},"g8":{"pos":"g8","owner":2},"h8":{"pos":"h8","owner":2}},"edges":{"a1":{"pos":"a1"},"a2":{"pos":"a2"},"a3":{"pos":"a3"},"a4":{"pos":"a4"},"a5":{"pos":"a5"},"a6":{"pos":"a6"},"a7":{"pos":"a7"},"a8":{"pos":"a8"},"h1":{"pos":"h1"},"h2":{"pos":"h2"},"h3":{"pos":"h3"},"h4":{"pos":"h4"},"h5":{"pos":"h5"},"h6":{"pos":"h6"},"h7":{"pos":"h7"},"h8":{"pos":"h8"},"b8":{"pos":"b8"},"c8":{"pos":"c8"},"d8":{"pos":"d8"},"e8":{"pos":"e8"},"f8":{"pos":"f8"},"g8":{"pos":"g8"},"b1":{"pos":"b1"},"c1":{"pos":"c1"},"d1":{"pos":"d1"},"e1":{"pos":"e1"},"f1":{"pos":"f1"},"g1":{"pos":"g1"}}};var ownernames=["neutral","opp","my"];var player=2;var otherplayer=1;game.selectkingdeploy2=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectkingdeploy:markpos};var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectkingdeploy'});turn.links[newstepid]={};turn.links[newstepid].deploy='deploy2';return newstep;};game.selectkingdeploy2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.selectunit2=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{kingwalk:Object.assign({},step.ARTIFACTS.kingwalk),adjacentenemies:Object.assign({},step.ARTIFACTS.adjacentenemies),willdie:Object.assign({},step.ARTIFACTS.willdie),jumptargets:Object.assign({},step.ARTIFACTS.jumptargets)});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectunit:markpos};var BLOCKS=UNITLAYERS.units;var walkstarts=function(){var k,ret={},s0=UNITLAYERS.mykings,s1=ARTIFACTS.selectunit;for(k in s0){ret[k]=1;}for(k in s1){ret[k]=1;}return ret;}();for(var STARTPOS in walkstarts){var allwalkerdirs=[1,2,3,4,5,6,7,8];for(var walkerdirnbr=0;walkerdirnbr<8;walkerdirnbr++){var POS=STARTPOS;while((POS=connections[POS][allwalkerdirs[walkerdirnbr]])&&!BLOCKS[POS]){if(!ARTIFACTS.nokings[POS]){ARTIFACTS['kingwalk'][POS]={};}}}}var STARTPOS=MARKS['selectunit'];var neighbourdirs=[1,2,3,4,5,6,7,8];var startconnections=connections[STARTPOS];for(var dirnbr=0;dirnbr<8;dirnbr++){var DIR=neighbourdirs[dirnbr];var POS=startconnections[DIR];if(POS&&UNITLAYERS.oppunits[POS]){ARTIFACTS['adjacentenemies'][POS]={dir:DIR};}}for(var STARTPOS in ARTIFACTS.adjacentenemies){var DIR=relativedirs[(ARTIFACTS.adjacentenemies[STARTPOS]||{})['dir']-2+1];var POS=connections[STARTPOS][DIR];if(POS&&!function(){var k,ret={},s0=UNITLAYERS.units,s1=!!UNITLAYERS.mykings[MARKS['selectunit']]?ARTIFACTS.nokings:ARTIFACTS.nosoldiers;for(k in s0){ret[k]=1;}for(k in s1){ret[k]=1;}return ret;}()[POS]){var NEIGHBOURCOUNT=1;ARTIFACTS['jumptargets'][POS]={dir:DIR};}if(!!NEIGHBOURCOUNT){ARTIFACTS['willdie'][STARTPOS]={dir:DIR};}}var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectunit'});turn.links[newstepid]={};var newlinks=turn.links[newstepid];for(var linkpos in!!UNITLAYERS.mykings[MARKS['selectunit']]?ARTIFACTS.kingwalk:function(){var ret={},s0=BOARD.board,s1=function(){var k,ret={},s0=UNITLAYERS.units,s1=function(){var k,ret={},s0=ARTIFACTS.nosoldiers,s1=ARTIFACTS.jumptargets;for(k in s0){ret[k]=1;}for(k in s1){ret[k]=1;}return ret;}();for(k in s0){ret[k]=1;}for(k in s1){ret[k]=1;}return ret;}();for(var key in s0){if(!s1[key]){ret[key]=s0[key];}}return ret;}()){newlinks[linkpos]='selectmovetarget2';}var newlinks=turn.links[newstepid];for(var linkpos in ARTIFACTS.jumptargets){newlinks[linkpos]='selectjumptarget2';}return newstep;};game.selectunit2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.selectmovetarget2=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectmovetarget:markpos,selectunit:step.MARKS.selectunit};var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectmovetarget'});turn.links[newstepid]={};turn.links[newstepid].move='move2';return newstep;};game.selectmovetarget2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.selectjumptarget2=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{splashed:Object.assign({},step.ARTIFACTS.splashed)});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectjumptarget:markpos,selectunit:step.MARKS.selectunit};var filtersourcelayer=ARTIFACTS.willdie;var filtertargetlayer=ARTIFACTS.splashed;for(var POS in filtersourcelayer){if(filtersourcelayer[POS]){var filterobj=filtersourcelayer[POS];if(filterobj.dir===(ARTIFACTS.jumptargets[MARKS['selectjumptarget']]||{})['dir']){filtertargetlayer[POS]=filterobj;}}}var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectjumptarget'});turn.links[newstepid]={};turn.links[newstepid].jump='jump2';return newstep;};game.selectjumptarget2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.deploy2=function(turn,step){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var MARKS=step.MARKS;var UNITDATA=Object.assign({},step.UNITDATA);var clones=step.clones;var UNITLAYERS=step.UNITLAYERS;var newunitid='spawn'+clones++;UNITDATA[newunitid]={pos:MARKS['selectkingdeploy'],id:newunitid,group:'kings',owner:player};MARKS={};UNITLAYERS={"soldiers":{},"mysoldiers":{},"oppsoldiers":{},"neutralsoldiers":{},"kings":{},"mykings":{},"oppkings":{},"neutralkings":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}ARTIFACTS={"nokings":{},"nosoldiers":{},"kingwalk":{},"adjacentenemies":{},"splashed":{},"willdie":{},"jumptargets":{}};var newstepid=step.stepid+'-'+'deploy';var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,stepid:newstepid,name:'deploy',path:step.path.concat('deploy'),clones:clones});turn.links[newstepid]={};if(Object.keys(function(){var ret={},s0=UNITLAYERS.mykings,s1=TERRAIN.opphomerow;for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}()||{}).length!==0){var winner=2;var result=winner===2?'win':winner?'lose':'draw';turn.links[newstepid][result]='infiltration';}else if(turn.turn>2&&Object.keys(UNITLAYERS.oppkings||{}).length===0){var winner=2;var result=winner===2?'win':winner?'lose':'draw';turn.links[newstepid][result]='kingkill';}else turn.links[newstepid].endturn="start"+otherplayer;return newstep;};game.deploy2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.move2=function(turn,step){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var MARKS=step.MARKS;var UNITDATA=Object.assign({},step.UNITDATA);var UNITLAYERS=step.UNITLAYERS;var unitid=(UNITLAYERS.units[MARKS['selectunit']]||{}).id;if(unitid){UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{'pos':MARKS['selectmovetarget']});}MARKS={};UNITLAYERS={"soldiers":{},"mysoldiers":{},"oppsoldiers":{},"neutralsoldiers":{},"kings":{},"mykings":{},"oppkings":{},"neutralkings":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}ARTIFACTS={"nokings":{},"nosoldiers":{},"kingwalk":{},"adjacentenemies":{},"splashed":{},"willdie":{},"jumptargets":{}};var newstepid=step.stepid+'-'+'move';var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,stepid:newstepid,name:'move',path:step.path.concat('move')});turn.links[newstepid]={};if(Object.keys(function(){var ret={},s0=UNITLAYERS.mykings,s1=TERRAIN.opphomerow;for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}()||{}).length!==0){var winner=2;var result=winner===2?'win':winner?'lose':'draw';turn.links[newstepid][result]='infiltration';}else if(turn.turn>2&&Object.keys(UNITLAYERS.oppkings||{}).length===0){var winner=2;var result=winner===2?'win':winner?'lose':'draw';turn.links[newstepid][result]='kingkill';}else turn.links[newstepid].endturn="start"+otherplayer;return newstep;};game.move2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.jump2=function(turn,step){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var MARKS=step.MARKS;var UNITDATA=Object.assign({},step.UNITDATA);var UNITLAYERS=step.UNITLAYERS;delete UNITDATA[(UNITLAYERS.units[Object.keys(ARTIFACTS.willdie)[0]]||{}).id];var unitid=(UNITLAYERS.units[MARKS['selectunit']]||{}).id;if(unitid){UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{'pos':MARKS['selectjumptarget']});}MARKS={};UNITLAYERS={"soldiers":{},"mysoldiers":{},"oppsoldiers":{},"neutralsoldiers":{},"kings":{},"mykings":{},"oppkings":{},"neutralkings":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}ARTIFACTS={"nokings":{},"nosoldiers":{},"kingwalk":{},"adjacentenemies":{},"splashed":{},"willdie":{},"jumptargets":{}};var newstepid=step.stepid+'-'+'jump';var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,stepid:newstepid,name:'jump',path:step.path.concat('jump')});turn.links[newstepid]={};if(Object.keys(function(){var ret={},s0=UNITLAYERS.mykings,s1=TERRAIN.opphomerow;for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}()||{}).length!==0){var winner=2;var result=winner===2?'win':winner?'lose':'draw';turn.links[newstepid][result]='infiltration';}else if(turn.turn>2&&Object.keys(UNITLAYERS.oppkings||{}).length===0){var winner=2;var result=winner===2?'win':winner?'lose':'draw';turn.links[newstepid][result]='kingkill';}else turn.links[newstepid].endturn="start"+otherplayer;return newstep;};game.jump2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.start2=function(turn,step){var turn={steps:{},player:player,turn:turn.turn+1,links:{root:{}}};var MARKS={};var ARTIFACTS={"nokings":{},"nosoldiers":{},"kingwalk":{},"adjacentenemies":{},"splashed":{},"willdie":{},"jumptargets":{}};var UNITDATA=step.UNITDATA;var UNITLAYERS={"soldiers":{},"mysoldiers":{},"oppsoldiers":{},"neutralsoldiers":{},"kings":{},"mykings":{},"oppkings":{},"neutralkings":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}for(var STARTPOS in function(){var ret={},s0=TERRAIN.edges,s1=UNITLAYERS.mysoldiers;for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}()){var neighbourdirs=!!TERRAIN.homerow[STARTPOS]?[1,3,5,7]:[1,5];var nbrofneighbourdirs=neighbourdirs.length;var startconnections=connections[STARTPOS];for(var dirnbr=0;dirnbr<nbrofneighbourdirs;dirnbr++){var POS=startconnections[neighbourdirs[dirnbr]];if(POS){ARTIFACTS['nokings'][POS]={};}}}for(var STARTPOS in UNITLAYERS.mykings){var neighbourdirs=[1,3,5,7];var startconnections=connections[STARTPOS];for(var dirnbr=0;dirnbr<4;dirnbr++){var POS=startconnections[neighbourdirs[dirnbr]];if(POS&&(!!TERRAIN.homerow[POS]||!!TERRAIN.edges[STARTPOS]&&!!TERRAIN.edges[POS])){ARTIFACTS['nosoldiers'][POS]={};}}}var newstep=turn.steps.root={ARTIFACTS:ARTIFACTS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,MARKS:MARKS,stepid:'root',name:'start',clones:step.clones,path:[]};if(turn.turn>2){var newlinks=turn.links.root;for(var linkpos in UNITLAYERS.myunits){newlinks[linkpos]='selectunit2';}}else{var newlinks=turn.links.root;for(var linkpos in function(){var ret={},s0=BOARD.board,s1=function(){var k,ret={},s0=UNITLAYERS.units,s1=ARTIFACTS.nokings;for(k in s0){ret[k]=1;}for(k in s1){ret[k]=1;}return ret;}();for(var key in s0){if(!s1[key]){ret[key]=s0[key];}}return ret;}()){newlinks[linkpos]='selectkingdeploy2';}}return turn;};game.start2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.debug2=function(){return{TERRAIN:TERRAIN};};})();function reduce(coll,iterator,acc){for(var key in coll){acc=iterator(acc,coll[key],key);}return acc;}game.newGame=function(){var turnseed={turn:0};var stepseed={UNITDATA:{"unit1":{"pos":"a1","id":"unit1","group":"soldiers","owner":1},"unit2":{"pos":"b1","id":"unit2","group":"soldiers","owner":1},"unit3":{"pos":"c1","id":"unit3","group":"soldiers","owner":1},"unit4":{"pos":"d1","id":"unit4","group":"soldiers","owner":1},"unit5":{"pos":"e1","id":"unit5","group":"soldiers","owner":1},"unit6":{"pos":"f1","id":"unit6","group":"soldiers","owner":1},"unit7":{"pos":"g1","id":"unit7","group":"soldiers","owner":1},"unit8":{"pos":"h1","id":"unit8","group":"soldiers","owner":1},"unit9":{"pos":"a8","id":"unit9","group":"soldiers","owner":2},"unit10":{"pos":"b8","id":"unit10","group":"soldiers","owner":2},"unit11":{"pos":"c8","id":"unit11","group":"soldiers","owner":2},"unit12":{"pos":"d8","id":"unit12","group":"soldiers","owner":2},"unit13":{"pos":"e8","id":"unit13","group":"soldiers","owner":2},"unit14":{"pos":"f8","id":"unit14","group":"soldiers","owner":2},"unit15":{"pos":"g8","id":"unit15","group":"soldiers","owner":2},"unit16":{"pos":"h8","id":"unit16","group":"soldiers","owner":2}},clones:0};return game.start1(turnseed,stepseed);};game.debug=function(){return{BOARD:BOARD,connections:connections,plr1:game.debug1(),plr2:game.debug2()};};game.commands={"deploy":1,"move":1,"jump":1};game.graphics={"tiles":{"homerow":"playercolour"},"icons":{"kings":"kings","soldiers":"pawns"}};game.board={"height":8,"width":8,"terrain":{"homerow":{"1":[["rect","a1","h1"]],"2":[["rect","a8","h8"]]},"edges":[["rect","a1","a8"],["rect","h1","h8"],["rect","b8","g8"],["rect","b1","g1"]]}};game.AI=[];game.id="gogol";return game;}(),jostle:function(){var game={};var connections={"faux":{},"a1":{"1":"a2","2":"b2","3":"b1"},"a10":{"3":"b10","4":"b9","5":"a9"},"a2":{"1":"a3","2":"b3","3":"b2","4":"b1","5":"a1"},"a3":{"1":"a4","2":"b4","3":"b3","4":"b2","5":"a2"},"a4":{"1":"a5","2":"b5","3":"b4","4":"b3","5":"a3"},"a5":{"1":"a6","2":"b6","3":"b5","4":"b4","5":"a4"},"a6":{"1":"a7","2":"b7","3":"b6","4":"b5","5":"a5"},"a7":{"1":"a8","2":"b8","3":"b7","4":"b6","5":"a6"},"a8":{"1":"a9","2":"b9","3":"b8","4":"b7","5":"a7"},"a9":{"1":"a10","2":"b10","3":"b9","4":"b8","5":"a8"},"b1":{"1":"b2","2":"c2","3":"c1","7":"a1","8":"a2"},"b10":{"3":"c10","4":"c9","5":"b9","6":"a9","7":"a10"},"b2":{"1":"b3","2":"c3","3":"c2","4":"c1","5":"b1","6":"a1","7":"a2","8":"a3"},"b3":{"1":"b4","2":"c4","3":"c3","4":"c2","5":"b2","6":"a2","7":"a3","8":"a4"},"b4":{"1":"b5","2":"c5","3":"c4","4":"c3","5":"b3","6":"a3","7":"a4","8":"a5"},"b5":{"1":"b6","2":"c6","3":"c5","4":"c4","5":"b4","6":"a4","7":"a5","8":"a6"},"b6":{"1":"b7","2":"c7","3":"c6","4":"c5","5":"b5","6":"a5","7":"a6","8":"a7"},"b7":{"1":"b8","2":"c8","3":"c7","4":"c6","5":"b6","6":"a6","7":"a7","8":"a8"},"b8":{"1":"b9","2":"c9","3":"c8","4":"c7","5":"b7","6":"a7","7":"a8","8":"a9"},"b9":{"1":"b10","2":"c10","3":"c9","4":"c8","5":"b8","6":"a8","7":"a9","8":"a10"},"c1":{"1":"c2","2":"d2","3":"d1","7":"b1","8":"b2"},"c10":{"3":"d10","4":"d9","5":"c9","6":"b9","7":"b10"},"c2":{"1":"c3","2":"d3","3":"d2","4":"d1","5":"c1","6":"b1","7":"b2","8":"b3"},"c3":{"1":"c4","2":"d4","3":"d3","4":"d2","5":"c2","6":"b2","7":"b3","8":"b4"},"c4":{"1":"c5","2":"d5","3":"d4","4":"d3","5":"c3","6":"b3","7":"b4","8":"b5"},"c5":{"1":"c6","2":"d6","3":"d5","4":"d4","5":"c4","6":"b4","7":"b5","8":"b6"},"c6":{"1":"c7","2":"d7","3":"d6","4":"d5","5":"c5","6":"b5","7":"b6","8":"b7"},"c7":{"1":"c8","2":"d8","3":"d7","4":"d6","5":"c6","6":"b6","7":"b7","8":"b8"},"c8":{"1":"c9","2":"d9","3":"d8","4":"d7","5":"c7","6":"b7","7":"b8","8":"b9"},"c9":{"1":"c10","2":"d10","3":"d9","4":"d8","5":"c8","6":"b8","7":"b9","8":"b10"},"d1":{"1":"d2","2":"e2","3":"e1","7":"c1","8":"c2"},"d10":{"3":"e10","4":"e9","5":"d9","6":"c9","7":"c10"},"d2":{"1":"d3","2":"e3","3":"e2","4":"e1","5":"d1","6":"c1","7":"c2","8":"c3"},"d3":{"1":"d4","2":"e4","3":"e3","4":"e2","5":"d2","6":"c2","7":"c3","8":"c4"},"d4":{"1":"d5","2":"e5","3":"e4","4":"e3","5":"d3","6":"c3","7":"c4","8":"c5"},"d5":{"1":"d6","2":"e6","3":"e5","4":"e4","5":"d4","6":"c4","7":"c5","8":"c6"},"d6":{"1":"d7","2":"e7","3":"e6","4":"e5","5":"d5","6":"c5","7":"c6","8":"c7"},"d7":{"1":"d8","2":"e8","3":"e7","4":"e6","5":"d6","6":"c6","7":"c7","8":"c8"},"d8":{"1":"d9","2":"e9","3":"e8","4":"e7","5":"d7","6":"c7","7":"c8","8":"c9"},"d9":{"1":"d10","2":"e10","3":"e9","4":"e8","5":"d8","6":"c8","7":"c9","8":"c10"},"e1":{"1":"e2","2":"f2","3":"f1","7":"d1","8":"d2"},"e10":{"3":"f10","4":"f9","5":"e9","6":"d9","7":"d10"},"e2":{"1":"e3","2":"f3","3":"f2","4":"f1","5":"e1","6":"d1","7":"d2","8":"d3"},"e3":{"1":"e4","2":"f4","3":"f3","4":"f2","5":"e2","6":"d2","7":"d3","8":"d4"},"e4":{"1":"e5","2":"f5","3":"f4","4":"f3","5":"e3","6":"d3","7":"d4","8":"d5"},"e5":{"1":"e6","2":"f6","3":"f5","4":"f4","5":"e4","6":"d4","7":"d5","8":"d6"},"e6":{"1":"e7","2":"f7","3":"f6","4":"f5","5":"e5","6":"d5","7":"d6","8":"d7"},"e7":{"1":"e8","2":"f8","3":"f7","4":"f6","5":"e6","6":"d6","7":"d7","8":"d8"},"e8":{"1":"e9","2":"f9","3":"f8","4":"f7","5":"e7","6":"d7","7":"d8","8":"d9"},"e9":{"1":"e10","2":"f10","3":"f9","4":"f8","5":"e8","6":"d8","7":"d9","8":"d10"},"f1":{"1":"f2","2":"g2","3":"g1","7":"e1","8":"e2"},"f10":{"3":"g10","4":"g9","5":"f9","6":"e9","7":"e10"},"f2":{"1":"f3","2":"g3","3":"g2","4":"g1","5":"f1","6":"e1","7":"e2","8":"e3"},"f3":{"1":"f4","2":"g4","3":"g3","4":"g2","5":"f2","6":"e2","7":"e3","8":"e4"},"f4":{"1":"f5","2":"g5","3":"g4","4":"g3","5":"f3","6":"e3","7":"e4","8":"e5"},"f5":{"1":"f6","2":"g6","3":"g5","4":"g4","5":"f4","6":"e4","7":"e5","8":"e6"},"f6":{"1":"f7","2":"g7","3":"g6","4":"g5","5":"f5","6":"e5","7":"e6","8":"e7"},"f7":{"1":"f8","2":"g8","3":"g7","4":"g6","5":"f6","6":"e6","7":"e7","8":"e8"},"f8":{"1":"f9","2":"g9","3":"g8","4":"g7","5":"f7","6":"e7","7":"e8","8":"e9"},"f9":{"1":"f10","2":"g10","3":"g9","4":"g8","5":"f8","6":"e8","7":"e9","8":"e10"},"g1":{"1":"g2","2":"h2","3":"h1","7":"f1","8":"f2"},"g10":{"3":"h10","4":"h9","5":"g9","6":"f9","7":"f10"},"g2":{"1":"g3","2":"h3","3":"h2","4":"h1","5":"g1","6":"f1","7":"f2","8":"f3"},"g3":{"1":"g4","2":"h4","3":"h3","4":"h2","5":"g2","6":"f2","7":"f3","8":"f4"},"g4":{"1":"g5","2":"h5","3":"h4","4":"h3","5":"g3","6":"f3","7":"f4","8":"f5"},"g5":{"1":"g6","2":"h6","3":"h5","4":"h4","5":"g4","6":"f4","7":"f5","8":"f6"},"g6":{"1":"g7","2":"h7","3":"h6","4":"h5","5":"g5","6":"f5","7":"f6","8":"f7"},"g7":{"1":"g8","2":"h8","3":"h7","4":"h6","5":"g6","6":"f6","7":"f7","8":"f8"},"g8":{"1":"g9","2":"h9","3":"h8","4":"h7","5":"g7","6":"f7","7":"f8","8":"f9"},"g9":{"1":"g10","2":"h10","3":"h9","4":"h8","5":"g8","6":"f8","7":"f9","8":"f10"},"h1":{"1":"h2","2":"i2","3":"i1","7":"g1","8":"g2"},"h10":{"3":"i10","4":"i9","5":"h9","6":"g9","7":"g10"},"h2":{"1":"h3","2":"i3","3":"i2","4":"i1","5":"h1","6":"g1","7":"g2","8":"g3"},"h3":{"1":"h4","2":"i4","3":"i3","4":"i2","5":"h2","6":"g2","7":"g3","8":"g4"},"h4":{"1":"h5","2":"i5","3":"i4","4":"i3","5":"h3","6":"g3","7":"g4","8":"g5"},"h5":{"1":"h6","2":"i6","3":"i5","4":"i4","5":"h4","6":"g4","7":"g5","8":"g6"},"h6":{"1":"h7","2":"i7","3":"i6","4":"i5","5":"h5","6":"g5","7":"g6","8":"g7"},"h7":{"1":"h8","2":"i8","3":"i7","4":"i6","5":"h6","6":"g6","7":"g7","8":"g8"},"h8":{"1":"h9","2":"i9","3":"i8","4":"i7","5":"h7","6":"g7","7":"g8","8":"g9"},"h9":{"1":"h10","2":"i10","3":"i9","4":"i8","5":"h8","6":"g8","7":"g9","8":"g10"},"i1":{"1":"i2","2":"j2","3":"j1","7":"h1","8":"h2"},"i10":{"3":"j10","4":"j9","5":"i9","6":"h9","7":"h10"},"i2":{"1":"i3","2":"j3","3":"j2","4":"j1","5":"i1","6":"h1","7":"h2","8":"h3"},"i3":{"1":"i4","2":"j4","3":"j3","4":"j2","5":"i2","6":"h2","7":"h3","8":"h4"},"i4":{"1":"i5","2":"j5","3":"j4","4":"j3","5":"i3","6":"h3","7":"h4","8":"h5"},"i5":{"1":"i6","2":"j6","3":"j5","4":"j4","5":"i4","6":"h4","7":"h5","8":"h6"},"i6":{"1":"i7","2":"j7","3":"j6","4":"j5","5":"i5","6":"h5","7":"h6","8":"h7"},"i7":{"1":"i8","2":"j8","3":"j7","4":"j6","5":"i6","6":"h6","7":"h7","8":"h8"},"i8":{"1":"i9","2":"j9","3":"j8","4":"j7","5":"i7","6":"h7","7":"h8","8":"h9"},"i9":{"1":"i10","2":"j10","3":"j9","4":"j8","5":"i8","6":"h8","7":"h9","8":"h10"},"j1":{"1":"j2","7":"i1","8":"i2"},"j10":{"5":"j9","6":"i9","7":"i10"},"j2":{"1":"j3","5":"j1","6":"i1","7":"i2","8":"i3"},"j3":{"1":"j4","5":"j2","6":"i2","7":"i3","8":"i4"},"j4":{"1":"j5","5":"j3","6":"i3","7":"i4","8":"i5"},"j5":{"1":"j6","5":"j4","6":"i4","7":"i5","8":"i6"},"j6":{"1":"j7","5":"j5","6":"i5","7":"i6","8":"i7"},"j7":{"1":"j8","5":"j6","6":"i6","7":"i7","8":"i8"},"j8":{"1":"j9","5":"j7","6":"i7","7":"i8","8":"i9"},"j9":{"1":"j10","5":"j8","6":"i8","7":"i9","8":"i10"}};var BOARD={"board":{"a1":{"colour":"dark","pos":"a1","x":1,"y":1},"a10":{"colour":"light","pos":"a10","x":1,"y":10},"a2":{"colour":"light","pos":"a2","x":1,"y":2},"a3":{"colour":"dark","pos":"a3","x":1,"y":3},"a4":{"colour":"light","pos":"a4","x":1,"y":4},"a5":{"colour":"dark","pos":"a5","x":1,"y":5},"a6":{"colour":"light","pos":"a6","x":1,"y":6},"a7":{"colour":"dark","pos":"a7","x":1,"y":7},"a8":{"colour":"light","pos":"a8","x":1,"y":8},"a9":{"colour":"dark","pos":"a9","x":1,"y":9},"b1":{"colour":"light","pos":"b1","x":2,"y":1},"b10":{"colour":"dark","pos":"b10","x":2,"y":10},"b2":{"colour":"dark","pos":"b2","x":2,"y":2},"b3":{"colour":"light","pos":"b3","x":2,"y":3},"b4":{"colour":"dark","pos":"b4","x":2,"y":4},"b5":{"colour":"light","pos":"b5","x":2,"y":5},"b6":{"colour":"dark","pos":"b6","x":2,"y":6},"b7":{"colour":"light","pos":"b7","x":2,"y":7},"b8":{"colour":"dark","pos":"b8","x":2,"y":8},"b9":{"colour":"light","pos":"b9","x":2,"y":9},"c1":{"colour":"dark","pos":"c1","x":3,"y":1},"c10":{"colour":"light","pos":"c10","x":3,"y":10},"c2":{"colour":"light","pos":"c2","x":3,"y":2},"c3":{"colour":"dark","pos":"c3","x":3,"y":3},"c4":{"colour":"light","pos":"c4","x":3,"y":4},"c5":{"colour":"dark","pos":"c5","x":3,"y":5},"c6":{"colour":"light","pos":"c6","x":3,"y":6},"c7":{"colour":"dark","pos":"c7","x":3,"y":7},"c8":{"colour":"light","pos":"c8","x":3,"y":8},"c9":{"colour":"dark","pos":"c9","x":3,"y":9},"d1":{"colour":"light","pos":"d1","x":4,"y":1},"d10":{"colour":"dark","pos":"d10","x":4,"y":10},"d2":{"colour":"dark","pos":"d2","x":4,"y":2},"d3":{"colour":"light","pos":"d3","x":4,"y":3},"d4":{"colour":"dark","pos":"d4","x":4,"y":4},"d5":{"colour":"light","pos":"d5","x":4,"y":5},"d6":{"colour":"dark","pos":"d6","x":4,"y":6},"d7":{"colour":"light","pos":"d7","x":4,"y":7},"d8":{"colour":"dark","pos":"d8","x":4,"y":8},"d9":{"colour":"light","pos":"d9","x":4,"y":9},"e1":{"colour":"dark","pos":"e1","x":5,"y":1},"e10":{"colour":"light","pos":"e10","x":5,"y":10},"e2":{"colour":"light","pos":"e2","x":5,"y":2},"e3":{"colour":"dark","pos":"e3","x":5,"y":3},"e4":{"colour":"light","pos":"e4","x":5,"y":4},"e5":{"colour":"dark","pos":"e5","x":5,"y":5},"e6":{"colour":"light","pos":"e6","x":5,"y":6},"e7":{"colour":"dark","pos":"e7","x":5,"y":7},"e8":{"colour":"light","pos":"e8","x":5,"y":8},"e9":{"colour":"dark","pos":"e9","x":5,"y":9},"f1":{"colour":"light","pos":"f1","x":6,"y":1},"f10":{"colour":"dark","pos":"f10","x":6,"y":10},"f2":{"colour":"dark","pos":"f2","x":6,"y":2},"f3":{"colour":"light","pos":"f3","x":6,"y":3},"f4":{"colour":"dark","pos":"f4","x":6,"y":4},"f5":{"colour":"light","pos":"f5","x":6,"y":5},"f6":{"colour":"dark","pos":"f6","x":6,"y":6},"f7":{"colour":"light","pos":"f7","x":6,"y":7},"f8":{"colour":"dark","pos":"f8","x":6,"y":8},"f9":{"colour":"light","pos":"f9","x":6,"y":9},"g1":{"colour":"dark","pos":"g1","x":7,"y":1},"g10":{"colour":"light","pos":"g10","x":7,"y":10},"g2":{"colour":"light","pos":"g2","x":7,"y":2},"g3":{"colour":"dark","pos":"g3","x":7,"y":3},"g4":{"colour":"light","pos":"g4","x":7,"y":4},"g5":{"colour":"dark","pos":"g5","x":7,"y":5},"g6":{"colour":"light","pos":"g6","x":7,"y":6},"g7":{"colour":"dark","pos":"g7","x":7,"y":7},"g8":{"colour":"light","pos":"g8","x":7,"y":8},"g9":{"colour":"dark","pos":"g9","x":7,"y":9},"h1":{"colour":"light","pos":"h1","x":8,"y":1},"h10":{"colour":"dark","pos":"h10","x":8,"y":10},"h2":{"colour":"dark","pos":"h2","x":8,"y":2},"h3":{"colour":"light","pos":"h3","x":8,"y":3},"h4":{"colour":"dark","pos":"h4","x":8,"y":4},"h5":{"colour":"light","pos":"h5","x":8,"y":5},"h6":{"colour":"dark","pos":"h6","x":8,"y":6},"h7":{"colour":"light","pos":"h7","x":8,"y":7},"h8":{"colour":"dark","pos":"h8","x":8,"y":8},"h9":{"colour":"light","pos":"h9","x":8,"y":9},"i1":{"colour":"dark","pos":"i1","x":9,"y":1},"i10":{"colour":"light","pos":"i10","x":9,"y":10},"i2":{"colour":"light","pos":"i2","x":9,"y":2},"i3":{"colour":"dark","pos":"i3","x":9,"y":3},"i4":{"colour":"light","pos":"i4","x":9,"y":4},"i5":{"colour":"dark","pos":"i5","x":9,"y":5},"i6":{"colour":"light","pos":"i6","x":9,"y":6},"i7":{"colour":"dark","pos":"i7","x":9,"y":7},"i8":{"colour":"light","pos":"i8","x":9,"y":8},"i9":{"colour":"dark","pos":"i9","x":9,"y":9},"j1":{"colour":"light","pos":"j1","x":10,"y":1},"j10":{"colour":"dark","pos":"j10","x":10,"y":10},"j2":{"colour":"dark","pos":"j2","x":10,"y":2},"j3":{"colour":"light","pos":"j3","x":10,"y":3},"j4":{"colour":"dark","pos":"j4","x":10,"y":4},"j5":{"colour":"light","pos":"j5","x":10,"y":5},"j6":{"colour":"dark","pos":"j6","x":10,"y":6},"j7":{"colour":"light","pos":"j7","x":10,"y":7},"j8":{"colour":"dark","pos":"j8","x":10,"y":8},"j9":{"colour":"light","pos":"j9","x":10,"y":9}},"light":{"a10":{"colour":"light","pos":"a10","x":1,"y":10},"a2":{"colour":"light","pos":"a2","x":1,"y":2},"a4":{"colour":"light","pos":"a4","x":1,"y":4},"a6":{"colour":"light","pos":"a6","x":1,"y":6},"a8":{"colour":"light","pos":"a8","x":1,"y":8},"b1":{"colour":"light","pos":"b1","x":2,"y":1},"b3":{"colour":"light","pos":"b3","x":2,"y":3},"b5":{"colour":"light","pos":"b5","x":2,"y":5},"b7":{"colour":"light","pos":"b7","x":2,"y":7},"b9":{"colour":"light","pos":"b9","x":2,"y":9},"c10":{"colour":"light","pos":"c10","x":3,"y":10},"c2":{"colour":"light","pos":"c2","x":3,"y":2},"c4":{"colour":"light","pos":"c4","x":3,"y":4},"c6":{"colour":"light","pos":"c6","x":3,"y":6},"c8":{"colour":"light","pos":"c8","x":3,"y":8},"d1":{"colour":"light","pos":"d1","x":4,"y":1},"d3":{"colour":"light","pos":"d3","x":4,"y":3},"d5":{"colour":"light","pos":"d5","x":4,"y":5},"d7":{"colour":"light","pos":"d7","x":4,"y":7},"d9":{"colour":"light","pos":"d9","x":4,"y":9},"e10":{"colour":"light","pos":"e10","x":5,"y":10},"e2":{"colour":"light","pos":"e2","x":5,"y":2},"e4":{"colour":"light","pos":"e4","x":5,"y":4},"e6":{"colour":"light","pos":"e6","x":5,"y":6},"e8":{"colour":"light","pos":"e8","x":5,"y":8},"f1":{"colour":"light","pos":"f1","x":6,"y":1},"f3":{"colour":"light","pos":"f3","x":6,"y":3},"f5":{"colour":"light","pos":"f5","x":6,"y":5},"f7":{"colour":"light","pos":"f7","x":6,"y":7},"f9":{"colour":"light","pos":"f9","x":6,"y":9},"g10":{"colour":"light","pos":"g10","x":7,"y":10},"g2":{"colour":"light","pos":"g2","x":7,"y":2},"g4":{"colour":"light","pos":"g4","x":7,"y":4},"g6":{"colour":"light","pos":"g6","x":7,"y":6},"g8":{"colour":"light","pos":"g8","x":7,"y":8},"h1":{"colour":"light","pos":"h1","x":8,"y":1},"h3":{"colour":"light","pos":"h3","x":8,"y":3},"h5":{"colour":"light","pos":"h5","x":8,"y":5},"h7":{"colour":"light","pos":"h7","x":8,"y":7},"h9":{"colour":"light","pos":"h9","x":8,"y":9},"i10":{"colour":"light","pos":"i10","x":9,"y":10},"i2":{"colour":"light","pos":"i2","x":9,"y":2},"i4":{"colour":"light","pos":"i4","x":9,"y":4},"i6":{"colour":"light","pos":"i6","x":9,"y":6},"i8":{"colour":"light","pos":"i8","x":9,"y":8},"j1":{"colour":"light","pos":"j1","x":10,"y":1},"j3":{"colour":"light","pos":"j3","x":10,"y":3},"j5":{"colour":"light","pos":"j5","x":10,"y":5},"j7":{"colour":"light","pos":"j7","x":10,"y":7},"j9":{"colour":"light","pos":"j9","x":10,"y":9}},"dark":{"a1":{"colour":"dark","pos":"a1","x":1,"y":1},"a3":{"colour":"dark","pos":"a3","x":1,"y":3},"a5":{"colour":"dark","pos":"a5","x":1,"y":5},"a7":{"colour":"dark","pos":"a7","x":1,"y":7},"a9":{"colour":"dark","pos":"a9","x":1,"y":9},"b10":{"colour":"dark","pos":"b10","x":2,"y":10},"b2":{"colour":"dark","pos":"b2","x":2,"y":2},"b4":{"colour":"dark","pos":"b4","x":2,"y":4},"b6":{"colour":"dark","pos":"b6","x":2,"y":6},"b8":{"colour":"dark","pos":"b8","x":2,"y":8},"c1":{"colour":"dark","pos":"c1","x":3,"y":1},"c3":{"colour":"dark","pos":"c3","x":3,"y":3},"c5":{"colour":"dark","pos":"c5","x":3,"y":5},"c7":{"colour":"dark","pos":"c7","x":3,"y":7},"c9":{"colour":"dark","pos":"c9","x":3,"y":9},"d10":{"colour":"dark","pos":"d10","x":4,"y":10},"d2":{"colour":"dark","pos":"d2","x":4,"y":2},"d4":{"colour":"dark","pos":"d4","x":4,"y":4},"d6":{"colour":"dark","pos":"d6","x":4,"y":6},"d8":{"colour":"dark","pos":"d8","x":4,"y":8},"e1":{"colour":"dark","pos":"e1","x":5,"y":1},"e3":{"colour":"dark","pos":"e3","x":5,"y":3},"e5":{"colour":"dark","pos":"e5","x":5,"y":5},"e7":{"colour":"dark","pos":"e7","x":5,"y":7},"e9":{"colour":"dark","pos":"e9","x":5,"y":9},"f10":{"colour":"dark","pos":"f10","x":6,"y":10},"f2":{"colour":"dark","pos":"f2","x":6,"y":2},"f4":{"colour":"dark","pos":"f4","x":6,"y":4},"f6":{"colour":"dark","pos":"f6","x":6,"y":6},"f8":{"colour":"dark","pos":"f8","x":6,"y":8},"g1":{"colour":"dark","pos":"g1","x":7,"y":1},"g3":{"colour":"dark","pos":"g3","x":7,"y":3},"g5":{"colour":"dark","pos":"g5","x":7,"y":5},"g7":{"colour":"dark","pos":"g7","x":7,"y":7},"g9":{"colour":"dark","pos":"g9","x":7,"y":9},"h10":{"colour":"dark","pos":"h10","x":8,"y":10},"h2":{"colour":"dark","pos":"h2","x":8,"y":2},"h4":{"colour":"dark","pos":"h4","x":8,"y":4},"h6":{"colour":"dark","pos":"h6","x":8,"y":6},"h8":{"colour":"dark","pos":"h8","x":8,"y":8},"i1":{"colour":"dark","pos":"i1","x":9,"y":1},"i3":{"colour":"dark","pos":"i3","x":9,"y":3},"i5":{"colour":"dark","pos":"i5","x":9,"y":5},"i7":{"colour":"dark","pos":"i7","x":9,"y":7},"i9":{"colour":"dark","pos":"i9","x":9,"y":9},"j10":{"colour":"dark","pos":"j10","x":10,"y":10},"j2":{"colour":"dark","pos":"j2","x":10,"y":2},"j4":{"colour":"dark","pos":"j4","x":10,"y":4},"j6":{"colour":"dark","pos":"j6","x":10,"y":6},"j8":{"colour":"dark","pos":"j8","x":10,"y":8}}};var relativedirs=[1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];var TERRAIN={};(function(){var ownernames=["neutral","my","opp"];var player=1;var otherplayer=2;game.selectunit1=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{movetargets:Object.assign({},step.ARTIFACTS.movetargets),initialenemy:Object.assign({},step.ARTIFACTS.initialenemy),initialfriend:Object.assign({},step.ARTIFACTS.initialfriend)});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectunit:markpos};var STARTPOS=MARKS['selectunit'];var neighbourdirs=[1,3,5,7];var startconnections=connections[STARTPOS];for(var dirnbr=0;dirnbr<4;dirnbr++){var POS=startconnections[neighbourdirs[dirnbr]];if(POS){ARTIFACTS[!UNITLAYERS.units[POS]?'movetargets':!!UNITLAYERS.oppunits[POS]?'initialenemy':'initialfriend'][POS]={};}}var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectunit'});turn.links[newstepid]={};var newlinks=turn.links[newstepid];for(var linkpos in ARTIFACTS.movetargets){newlinks[linkpos]='selectmovetarget1';}return newstep;};game.selectunit1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'The current position is worth '+''+(Object.keys(ARTIFACTS.initialfriend).length-Object.keys(ARTIFACTS.initialenemy).length);};game.selectmovetarget1=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{newenemy:Object.assign({},step.ARTIFACTS.newenemy),newfriend:Object.assign({},step.ARTIFACTS.newfriend)});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectmovetarget:markpos,selectunit:step.MARKS.selectunit};var STARTPOS=MARKS['selectmovetarget'];var neighbourdirs=[1,3,5,7];var startconnections=connections[STARTPOS];for(var dirnbr=0;dirnbr<4;dirnbr++){var POS=startconnections[neighbourdirs[dirnbr]];if(POS&&UNITLAYERS.units[POS]){ARTIFACTS[!!UNITLAYERS.oppunits[POS]?'newenemy':'newfriend'][POS]={};}}var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectmovetarget'});turn.links[newstepid]={};if(Object.keys(ARTIFACTS.newfriend).length-(1+Object.keys(ARTIFACTS.newenemy).length)>Object.keys(ARTIFACTS.initialfriend).length-Object.keys(ARTIFACTS.initialenemy).length){turn.links[newstepid].jostle='jostle1';}return newstep;};game.selectmovetarget1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'That position would be worth '+''+(Object.keys(ARTIFACTS.newfriend).length-(1+Object.keys(ARTIFACTS.newenemy).length));};game.jostle1=function(turn,step){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var MARKS=step.MARKS;var UNITDATA=Object.assign({},step.UNITDATA);var UNITLAYERS=step.UNITLAYERS;var unitid=(UNITLAYERS.units[MARKS['selectunit']]||{}).id;if(unitid){UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{'pos':MARKS['selectmovetarget']});}MARKS={};UNITLAYERS={"checkers":{},"mycheckers":{},"oppcheckers":{},"neutralcheckers":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}ARTIFACTS={"movetargets":{},"initialenemy":{},"initialfriend":{},"newenemy":{},"newfriend":{}};var newstepid=step.stepid+'-'+'jostle';var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,stepid:newstepid,name:'jostle',path:step.path.concat('jostle')});turn.links[newstepid]={};turn.links[newstepid].endturn="start"+otherplayer;return newstep;};game.jostle1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.start1=function(turn,step){var turn={steps:{},player:player,turn:turn.turn+1,links:{root:{}}};var MARKS={};var ARTIFACTS={"movetargets":{},"initialenemy":{},"initialfriend":{},"newenemy":{},"newfriend":{}};var UNITDATA=step.UNITDATA;var UNITLAYERS={"checkers":{},"mycheckers":{},"oppcheckers":{},"neutralcheckers":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}var newstep=turn.steps.root={ARTIFACTS:ARTIFACTS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,MARKS:MARKS,stepid:'root',name:'start',path:[]};var newlinks=turn.links.root;for(var linkpos in UNITLAYERS.mycheckers){newlinks[linkpos]='selectunit1';}return turn;};game.start1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'Select which unit to jostle!';};game.debug1=function(){return{TERRAIN:TERRAIN};};})();(function(){var ownernames=["neutral","opp","my"];var player=2;var otherplayer=1;game.selectunit2=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{movetargets:Object.assign({},step.ARTIFACTS.movetargets),initialenemy:Object.assign({},step.ARTIFACTS.initialenemy),initialfriend:Object.assign({},step.ARTIFACTS.initialfriend)});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectunit:markpos};var STARTPOS=MARKS['selectunit'];var neighbourdirs=[1,3,5,7];var startconnections=connections[STARTPOS];for(var dirnbr=0;dirnbr<4;dirnbr++){var POS=startconnections[neighbourdirs[dirnbr]];if(POS){ARTIFACTS[!UNITLAYERS.units[POS]?'movetargets':!!UNITLAYERS.oppunits[POS]?'initialenemy':'initialfriend'][POS]={};}}var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectunit'});turn.links[newstepid]={};var newlinks=turn.links[newstepid];for(var linkpos in ARTIFACTS.movetargets){newlinks[linkpos]='selectmovetarget2';}return newstep;};game.selectunit2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'The current position is worth '+''+(Object.keys(ARTIFACTS.initialfriend).length-Object.keys(ARTIFACTS.initialenemy).length);};game.selectmovetarget2=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{newenemy:Object.assign({},step.ARTIFACTS.newenemy),newfriend:Object.assign({},step.ARTIFACTS.newfriend)});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectmovetarget:markpos,selectunit:step.MARKS.selectunit};var STARTPOS=MARKS['selectmovetarget'];var neighbourdirs=[1,3,5,7];var startconnections=connections[STARTPOS];for(var dirnbr=0;dirnbr<4;dirnbr++){var POS=startconnections[neighbourdirs[dirnbr]];if(POS&&UNITLAYERS.units[POS]){ARTIFACTS[!!UNITLAYERS.oppunits[POS]?'newenemy':'newfriend'][POS]={};}}var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectmovetarget'});turn.links[newstepid]={};if(Object.keys(ARTIFACTS.newfriend).length-(1+Object.keys(ARTIFACTS.newenemy).length)>Object.keys(ARTIFACTS.initialfriend).length-Object.keys(ARTIFACTS.initialenemy).length){turn.links[newstepid].jostle='jostle2';}return newstep;};game.selectmovetarget2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'That position would be worth '+''+(Object.keys(ARTIFACTS.newfriend).length-(1+Object.keys(ARTIFACTS.newenemy).length));};game.jostle2=function(turn,step){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var MARKS=step.MARKS;var UNITDATA=Object.assign({},step.UNITDATA);var UNITLAYERS=step.UNITLAYERS;var unitid=(UNITLAYERS.units[MARKS['selectunit']]||{}).id;if(unitid){UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{'pos':MARKS['selectmovetarget']});}MARKS={};UNITLAYERS={"checkers":{},"mycheckers":{},"oppcheckers":{},"neutralcheckers":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}ARTIFACTS={"movetargets":{},"initialenemy":{},"initialfriend":{},"newenemy":{},"newfriend":{}};var newstepid=step.stepid+'-'+'jostle';var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,stepid:newstepid,name:'jostle',path:step.path.concat('jostle')});turn.links[newstepid]={};turn.links[newstepid].endturn="start"+otherplayer;return newstep;};game.jostle2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.start2=function(turn,step){var turn={steps:{},player:player,turn:turn.turn+1,links:{root:{}}};var MARKS={};var ARTIFACTS={"movetargets":{},"initialenemy":{},"initialfriend":{},"newenemy":{},"newfriend":{}};var UNITDATA=step.UNITDATA;var UNITLAYERS={"checkers":{},"mycheckers":{},"oppcheckers":{},"neutralcheckers":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}var newstep=turn.steps.root={ARTIFACTS:ARTIFACTS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,MARKS:MARKS,stepid:'root',name:'start',path:[]};var newlinks=turn.links.root;for(var linkpos in UNITLAYERS.mycheckers){newlinks[linkpos]='selectunit2';}return turn;};game.start2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'Select which unit to jostle!';};game.debug2=function(){return{TERRAIN:TERRAIN};};})();function reduce(coll,iterator,acc){for(var key in coll){acc=iterator(acc,coll[key],key);}return acc;}game.newGame=function(){var turnseed={turn:0};var stepseed={UNITDATA:{"unit1":{"pos":"c4","id":"unit1","group":"checkers","owner":1},"unit2":{"pos":"c6","id":"unit2","group":"checkers","owner":1},"unit3":{"pos":"c8","id":"unit3","group":"checkers","owner":1},"unit4":{"pos":"d3","id":"unit4","group":"checkers","owner":1},"unit5":{"pos":"d5","id":"unit5","group":"checkers","owner":1},"unit6":{"pos":"d7","id":"unit6","group":"checkers","owner":1},"unit7":{"pos":"e4","id":"unit7","group":"checkers","owner":1},"unit8":{"pos":"e8","id":"unit8","group":"checkers","owner":1},"unit9":{"pos":"f3","id":"unit9","group":"checkers","owner":1},"unit10":{"pos":"f7","id":"unit10","group":"checkers","owner":1},"unit11":{"pos":"g4","id":"unit11","group":"checkers","owner":1},"unit12":{"pos":"g6","id":"unit12","group":"checkers","owner":1},"unit13":{"pos":"g8","id":"unit13","group":"checkers","owner":1},"unit14":{"pos":"h3","id":"unit14","group":"checkers","owner":1},"unit15":{"pos":"h5","id":"unit15","group":"checkers","owner":1},"unit16":{"pos":"h7","id":"unit16","group":"checkers","owner":1},"unit17":{"pos":"c3","id":"unit17","group":"checkers","owner":2},"unit18":{"pos":"c5","id":"unit18","group":"checkers","owner":2},"unit19":{"pos":"c7","id":"unit19","group":"checkers","owner":2},"unit20":{"pos":"d4","id":"unit20","group":"checkers","owner":2},"unit21":{"pos":"d6","id":"unit21","group":"checkers","owner":2},"unit22":{"pos":"d8","id":"unit22","group":"checkers","owner":2},"unit23":{"pos":"e3","id":"unit23","group":"checkers","owner":2},"unit24":{"pos":"e7","id":"unit24","group":"checkers","owner":2},"unit25":{"pos":"f4","id":"unit25","group":"checkers","owner":2},"unit26":{"pos":"f8","id":"unit26","group":"checkers","owner":2},"unit27":{"pos":"g3","id":"unit27","group":"checkers","owner":2},"unit28":{"pos":"g5","id":"unit28","group":"checkers","owner":2},"unit29":{"pos":"g7","id":"unit29","group":"checkers","owner":2},"unit30":{"pos":"h4","id":"unit30","group":"checkers","owner":2},"unit31":{"pos":"h6","id":"unit31","group":"checkers","owner":2},"unit32":{"pos":"h8","id":"unit32","group":"checkers","owner":2}}};return game.start1(turnseed,stepseed);};game.debug=function(){return{BOARD:BOARD,connections:connections,plr1:game.debug1(),plr2:game.debug2()};};game.commands={"jostle":1};game.graphics={"icons":{"checkers":"pawns"}};game.board={"height":10,"width":10};game.AI=[];game.id="jostle";return game;}(),kickrun:function(){var game={};var connections={"faux":{},"a1":{"1":"a2","2":"b2","3":"b1"},"a2":{"1":"a3","2":"b3","3":"b2","4":"b1","5":"a1"},"a3":{"1":"a4","2":"b4","3":"b3","4":"b2","5":"a2"},"a4":{"1":"a5","2":"b5","3":"b4","4":"b3","5":"a3"},"a5":{"3":"b5","4":"b4","5":"a4"},"b1":{"1":"b2","2":"c2","3":"c1","7":"a1","8":"a2"},"b2":{"1":"b3","2":"c3","3":"c2","4":"c1","5":"b1","6":"a1","7":"a2","8":"a3"},"b3":{"1":"b4","2":"c4","3":"c3","4":"c2","5":"b2","6":"a2","7":"a3","8":"a4"},"b4":{"1":"b5","2":"c5","3":"c4","4":"c3","5":"b3","6":"a3","7":"a4","8":"a5"},"b5":{"3":"c5","4":"c4","5":"b4","6":"a4","7":"a5"},"c1":{"1":"c2","2":"d2","3":"d1","7":"b1","8":"b2"},"c2":{"1":"c3","2":"d3","3":"d2","4":"d1","5":"c1","6":"b1","7":"b2","8":"b3"},"c3":{"1":"c4","2":"d4","3":"d3","4":"d2","5":"c2","6":"b2","7":"b3","8":"b4"},"c4":{"1":"c5","2":"d5","3":"d4","4":"d3","5":"c3","6":"b3","7":"b4","8":"b5"},"c5":{"3":"d5","4":"d4","5":"c4","6":"b4","7":"b5"},"d1":{"1":"d2","2":"e2","3":"e1","7":"c1","8":"c2"},"d2":{"1":"d3","2":"e3","3":"e2","4":"e1","5":"d1","6":"c1","7":"c2","8":"c3"},"d3":{"1":"d4","2":"e4","3":"e3","4":"e2","5":"d2","6":"c2","7":"c3","8":"c4"},"d4":{"1":"d5","2":"e5","3":"e4","4":"e3","5":"d3","6":"c3","7":"c4","8":"c5"},"d5":{"3":"e5","4":"e4","5":"d4","6":"c4","7":"c5"},"e1":{"1":"e2","7":"d1","8":"d2"},"e2":{"1":"e3","5":"e1","6":"d1","7":"d2","8":"d3"},"e3":{"1":"e4","5":"e2","6":"d2","7":"d3","8":"d4"},"e4":{"1":"e5","5":"e3","6":"d3","7":"d4","8":"d5"},"e5":{"5":"e4","6":"d4","7":"d5"}};var BOARD={"board":{"a1":{"colour":"dark","pos":"a1","x":1,"y":1},"a2":{"colour":"light","pos":"a2","x":1,"y":2},"a3":{"colour":"dark","pos":"a3","x":1,"y":3},"a4":{"colour":"light","pos":"a4","x":1,"y":4},"a5":{"colour":"dark","pos":"a5","x":1,"y":5},"b1":{"colour":"light","pos":"b1","x":2,"y":1},"b2":{"colour":"dark","pos":"b2","x":2,"y":2},"b3":{"colour":"light","pos":"b3","x":2,"y":3},"b4":{"colour":"dark","pos":"b4","x":2,"y":4},"b5":{"colour":"light","pos":"b5","x":2,"y":5},"c1":{"colour":"dark","pos":"c1","x":3,"y":1},"c2":{"colour":"light","pos":"c2","x":3,"y":2},"c3":{"colour":"dark","pos":"c3","x":3,"y":3},"c4":{"colour":"light","pos":"c4","x":3,"y":4},"c5":{"colour":"dark","pos":"c5","x":3,"y":5},"d1":{"colour":"light","pos":"d1","x":4,"y":1},"d2":{"colour":"dark","pos":"d2","x":4,"y":2},"d3":{"colour":"light","pos":"d3","x":4,"y":3},"d4":{"colour":"dark","pos":"d4","x":4,"y":4},"d5":{"colour":"light","pos":"d5","x":4,"y":5},"e1":{"colour":"dark","pos":"e1","x":5,"y":1},"e2":{"colour":"light","pos":"e2","x":5,"y":2},"e3":{"colour":"dark","pos":"e3","x":5,"y":3},"e4":{"colour":"light","pos":"e4","x":5,"y":4},"e5":{"colour":"dark","pos":"e5","x":5,"y":5}},"light":{"a2":{"colour":"light","pos":"a2","x":1,"y":2},"a4":{"colour":"light","pos":"a4","x":1,"y":4},"b1":{"colour":"light","pos":"b1","x":2,"y":1},"b3":{"colour":"light","pos":"b3","x":2,"y":3},"b5":{"colour":"light","pos":"b5","x":2,"y":5},"c2":{"colour":"light","pos":"c2","x":3,"y":2},"c4":{"colour":"light","pos":"c4","x":3,"y":4},"d1":{"colour":"light","pos":"d1","x":4,"y":1},"d3":{"colour":"light","pos":"d3","x":4,"y":3},"d5":{"colour":"light","pos":"d5","x":4,"y":5},"e2":{"colour":"light","pos":"e2","x":5,"y":2},"e4":{"colour":"light","pos":"e4","x":5,"y":4}},"dark":{"a1":{"colour":"dark","pos":"a1","x":1,"y":1},"a3":{"colour":"dark","pos":"a3","x":1,"y":3},"a5":{"colour":"dark","pos":"a5","x":1,"y":5},"b2":{"colour":"dark","pos":"b2","x":2,"y":2},"b4":{"colour":"dark","pos":"b4","x":2,"y":4},"c1":{"colour":"dark","pos":"c1","x":3,"y":1},"c3":{"colour":"dark","pos":"c3","x":3,"y":3},"c5":{"colour":"dark","pos":"c5","x":3,"y":5},"d2":{"colour":"dark","pos":"d2","x":4,"y":2},"d4":{"colour":"dark","pos":"d4","x":4,"y":4},"e1":{"colour":"dark","pos":"e1","x":5,"y":1},"e3":{"colour":"dark","pos":"e3","x":5,"y":3},"e5":{"colour":"dark","pos":"e5","x":5,"y":5}}};var relativedirs=[1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];(function(){var TERRAIN={"corners":{"a1":{"pos":"a1","owner":1},"e5":{"pos":"e5","owner":2}},"mycorners":{"a1":{"pos":"a1","owner":1}},"oppcorners":{"e5":{"pos":"e5","owner":2}}};var ownernames=["neutral","my","opp"];var player=1;var otherplayer=2;game.selectunit1=function(turn,step,markpos){var ARTIFACTS={movetargets:Object.assign({},step.ARTIFACTS.movetargets)};var UNITLAYERS=step.UNITLAYERS;var MARKS={selectunit:markpos};var BLOCKS=UNITLAYERS.units;var STARTPOS=MARKS['selectunit'];var allwalkerdirs=!!UNITLAYERS.myrunners[MARKS['selectunit']]?[1,2,3]:[8,1,3,4];var nbrofwalkerdirs=allwalkerdirs.length;for(var walkerdirnbr=0;walkerdirnbr<nbrofwalkerdirs;walkerdirnbr++){var DIR=allwalkerdirs[walkerdirnbr];var MAX=!!UNITLAYERS.myrunners[MARKS['selectunit']]?4:1;var POS=STARTPOS;var LENGTH=0;while(LENGTH<MAX&&(POS=connections[POS][DIR])&&!BLOCKS[POS]){LENGTH++;if(DIR!==8&&DIR!==4){ARTIFACTS['movetargets'][POS]={};}}if(BLOCKS[POS]){if(!!UNITLAYERS.oppunits[POS]&&(DIR===8||DIR===4)){ARTIFACTS['movetargets'][POS]={};}}}var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectunit'});turn.links[newstepid]={};var newlinks=turn.links[newstepid];for(var linkpos in ARTIFACTS.movetargets){newlinks[linkpos]='selectmovetarget1';}return newstep;};game.selectunit1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.selectmovetarget1=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectmovetarget:markpos,selectunit:step.MARKS.selectunit};var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectmovetarget'});turn.links[newstepid]={};turn.links[newstepid].move='move1';return newstep;};game.selectmovetarget1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.move1=function(turn,step){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var MARKS=step.MARKS;var UNITDATA=Object.assign({},step.UNITDATA);var UNITLAYERS=step.UNITLAYERS;var unitid=(UNITLAYERS.units[MARKS['selectunit']]||{}).id;if(unitid){UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{'pos':MARKS['selectmovetarget']});delete UNITDATA[(UNITLAYERS.units[MARKS['selectmovetarget']]||{}).id];}MARKS={};UNITLAYERS={"runners":{},"myrunners":{},"opprunners":{},"neutralrunners":{},"sidekickers":{},"mysidekickers":{},"oppsidekickers":{},"neutralsidekickers":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}ARTIFACTS={"movetargets":{}};var newstepid=step.stepid+'-'+'move';var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,stepid:newstepid,name:'move',path:step.path.concat('move')});turn.links[newstepid]={};if(Object.keys(function(){var ret={},s0=UNITLAYERS.myrunners,s1=TERRAIN.oppcorners;for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}()||{}).length!==0){var winner=1;var result=winner===1?'win':winner?'lose':'draw';turn.links[newstepid][result]='infiltration';}else turn.links[newstepid].endturn="start"+otherplayer;return newstep;};game.move1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.start1=function(turn,step){var turn={steps:{},player:player,turn:turn.turn+1,links:{root:{}}};var MARKS={};var ARTIFACTS={"movetargets":{}};var UNITDATA=step.UNITDATA;var UNITLAYERS={"runners":{},"myrunners":{},"opprunners":{},"neutralrunners":{},"sidekickers":{},"mysidekickers":{},"oppsidekickers":{},"neutralsidekickers":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}var newstep=turn.steps.root={ARTIFACTS:ARTIFACTS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,MARKS:MARKS,stepid:'root',name:'start',path:[]};var newlinks=turn.links.root;for(var linkpos in UNITLAYERS.myunits){newlinks[linkpos]='selectunit1';}return turn;};game.start1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.debug1=function(){return{TERRAIN:TERRAIN};};})();(function(){var TERRAIN={"corners":{"a1":{"pos":"a1","owner":1},"e5":{"pos":"e5","owner":2}},"oppcorners":{"a1":{"pos":"a1","owner":1}},"mycorners":{"e5":{"pos":"e5","owner":2}}};var ownernames=["neutral","opp","my"];var player=2;var otherplayer=1;game.selectunit2=function(turn,step,markpos){var ARTIFACTS={movetargets:Object.assign({},step.ARTIFACTS.movetargets)};var UNITLAYERS=step.UNITLAYERS;var MARKS={selectunit:markpos};var BLOCKS=UNITLAYERS.units;var STARTPOS=MARKS['selectunit'];var allwalkerdirs=!!UNITLAYERS.myrunners[MARKS['selectunit']]?[5,6,7]:[4,5,7,8];var nbrofwalkerdirs=allwalkerdirs.length;for(var walkerdirnbr=0;walkerdirnbr<nbrofwalkerdirs;walkerdirnbr++){var DIR=allwalkerdirs[walkerdirnbr];var MAX=!!UNITLAYERS.myrunners[MARKS['selectunit']]?4:1;var POS=STARTPOS;var LENGTH=0;while(LENGTH<MAX&&(POS=connections[POS][DIR])&&!BLOCKS[POS]){LENGTH++;if(DIR!==8&&DIR!==4){ARTIFACTS['movetargets'][POS]={};}}if(BLOCKS[POS]){if(!!UNITLAYERS.oppunits[POS]&&(DIR===8||DIR===4)){ARTIFACTS['movetargets'][POS]={};}}}var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectunit'});turn.links[newstepid]={};var newlinks=turn.links[newstepid];for(var linkpos in ARTIFACTS.movetargets){newlinks[linkpos]='selectmovetarget2';}return newstep;};game.selectunit2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.selectmovetarget2=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectmovetarget:markpos,selectunit:step.MARKS.selectunit};var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectmovetarget'});turn.links[newstepid]={};turn.links[newstepid].move='move2';return newstep;};game.selectmovetarget2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.move2=function(turn,step){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var MARKS=step.MARKS;var UNITDATA=Object.assign({},step.UNITDATA);var UNITLAYERS=step.UNITLAYERS;var unitid=(UNITLAYERS.units[MARKS['selectunit']]||{}).id;if(unitid){UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{'pos':MARKS['selectmovetarget']});delete UNITDATA[(UNITLAYERS.units[MARKS['selectmovetarget']]||{}).id];}MARKS={};UNITLAYERS={"runners":{},"myrunners":{},"opprunners":{},"neutralrunners":{},"sidekickers":{},"mysidekickers":{},"oppsidekickers":{},"neutralsidekickers":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}ARTIFACTS={"movetargets":{}};var newstepid=step.stepid+'-'+'move';var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,stepid:newstepid,name:'move',path:step.path.concat('move')});turn.links[newstepid]={};if(Object.keys(function(){var ret={},s0=UNITLAYERS.myrunners,s1=TERRAIN.oppcorners;for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}()||{}).length!==0){var winner=2;var result=winner===2?'win':winner?'lose':'draw';turn.links[newstepid][result]='infiltration';}else turn.links[newstepid].endturn="start"+otherplayer;return newstep;};game.move2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.start2=function(turn,step){var turn={steps:{},player:player,turn:turn.turn+1,links:{root:{}}};var MARKS={};var ARTIFACTS={"movetargets":{}};var UNITDATA=step.UNITDATA;var UNITLAYERS={"runners":{},"myrunners":{},"opprunners":{},"neutralrunners":{},"sidekickers":{},"mysidekickers":{},"oppsidekickers":{},"neutralsidekickers":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}var newstep=turn.steps.root={ARTIFACTS:ARTIFACTS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,MARKS:MARKS,stepid:'root',name:'start',path:[]};var newlinks=turn.links.root;for(var linkpos in UNITLAYERS.myunits){newlinks[linkpos]='selectunit2';}return turn;};game.start2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.debug2=function(){return{TERRAIN:TERRAIN};};})();function reduce(coll,iterator,acc){for(var key in coll){acc=iterator(acc,coll[key],key);}return acc;}game.newGame=function(){var turnseed={turn:0};var stepseed={UNITDATA:{"unit1":{"pos":"a2","id":"unit1","group":"runners","owner":1},"unit2":{"pos":"b1","id":"unit2","group":"runners","owner":1},"unit3":{"pos":"d5","id":"unit3","group":"runners","owner":2},"unit4":{"pos":"e4","id":"unit4","group":"runners","owner":2},"unit5":{"pos":"a1","id":"unit5","group":"sidekickers","owner":1},"unit6":{"pos":"c1","id":"unit6","group":"sidekickers","owner":1},"unit7":{"pos":"a3","id":"unit7","group":"sidekickers","owner":1},"unit8":{"pos":"c5","id":"unit8","group":"sidekickers","owner":2},"unit9":{"pos":"e5","id":"unit9","group":"sidekickers","owner":2},"unit10":{"pos":"e3","id":"unit10","group":"sidekickers","owner":2}}};return game.start1(turnseed,stepseed);};game.debug=function(){return{BOARD:BOARD,connections:connections,plr1:game.debug1(),plr2:game.debug2()};};game.commands={"move":1};game.graphics={"tiles":{"corners":"playercolour"},"icons":{"runners":"bishops","sidekickers":"pawns"}};game.board={"height":5,"width":5,"terrain":{"corners":{"1":["a1"],"2":["e5"]}}};game.AI=[];game.id="kickrun";return game;}(),krieg:function(){var game={};var connections={"faux":{},"a1":{"1":"a2","2":"b2","3":"b1"},"a2":{"1":"a3","2":"b3","3":"b2","4":"b1","5":"a1"},"a3":{"1":"a4","2":"b4","3":"b3","4":"b2","5":"a2"},"a4":{"3":"b4","4":"b3","5":"a3"},"b1":{"1":"b2","2":"c2","3":"c1","7":"a1","8":"a2"},"b2":{"1":"b3","2":"c3","3":"c2","4":"c1","5":"b1","6":"a1","7":"a2","8":"a3"},"b3":{"1":"b4","2":"c4","3":"c3","4":"c2","5":"b2","6":"a2","7":"a3","8":"a4"},"b4":{"3":"c4","4":"c3","5":"b3","6":"a3","7":"a4"},"c1":{"1":"c2","2":"d2","3":"d1","7":"b1","8":"b2"},"c2":{"1":"c3","2":"d3","3":"d2","4":"d1","5":"c1","6":"b1","7":"b2","8":"b3"},"c3":{"1":"c4","2":"d4","3":"d3","4":"d2","5":"c2","6":"b2","7":"b3","8":"b4"},"c4":{"3":"d4","4":"d3","5":"c3","6":"b3","7":"b4"},"d1":{"1":"d2","7":"c1","8":"c2"},"d2":{"1":"d3","5":"d1","6":"c1","7":"c2","8":"c3"},"d3":{"1":"d4","5":"d2","6":"c2","7":"c3","8":"c4"},"d4":{"5":"d3","6":"c3","7":"c4"}};var BOARD={"board":{"a1":{"colour":"dark","pos":"a1","x":1,"y":1},"a2":{"colour":"light","pos":"a2","x":1,"y":2},"a3":{"colour":"dark","pos":"a3","x":1,"y":3},"a4":{"colour":"light","pos":"a4","x":1,"y":4},"b1":{"colour":"light","pos":"b1","x":2,"y":1},"b2":{"colour":"dark","pos":"b2","x":2,"y":2},"b3":{"colour":"light","pos":"b3","x":2,"y":3},"b4":{"colour":"dark","pos":"b4","x":2,"y":4},"c1":{"colour":"dark","pos":"c1","x":3,"y":1},"c2":{"colour":"light","pos":"c2","x":3,"y":2},"c3":{"colour":"dark","pos":"c3","x":3,"y":3},"c4":{"colour":"light","pos":"c4","x":3,"y":4},"d1":{"colour":"light","pos":"d1","x":4,"y":1},"d2":{"colour":"dark","pos":"d2","x":4,"y":2},"d3":{"colour":"light","pos":"d3","x":4,"y":3},"d4":{"colour":"dark","pos":"d4","x":4,"y":4}},"light":{"a2":{"colour":"light","pos":"a2","x":1,"y":2},"a4":{"colour":"light","pos":"a4","x":1,"y":4},"b1":{"colour":"light","pos":"b1","x":2,"y":1},"b3":{"colour":"light","pos":"b3","x":2,"y":3},"c2":{"colour":"light","pos":"c2","x":3,"y":2},"c4":{"colour":"light","pos":"c4","x":3,"y":4},"d1":{"colour":"light","pos":"d1","x":4,"y":1},"d3":{"colour":"light","pos":"d3","x":4,"y":3}},"dark":{"a1":{"colour":"dark","pos":"a1","x":1,"y":1},"a3":{"colour":"dark","pos":"a3","x":1,"y":3},"b2":{"colour":"dark","pos":"b2","x":2,"y":2},"b4":{"colour":"dark","pos":"b4","x":2,"y":4},"c1":{"colour":"dark","pos":"c1","x":3,"y":1},"c3":{"colour":"dark","pos":"c3","x":3,"y":3},"d2":{"colour":"dark","pos":"d2","x":4,"y":2},"d4":{"colour":"dark","pos":"d4","x":4,"y":4}}};var relativedirs=[1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];(function(){var TERRAIN={"southeast":{"a4":{"pos":"a4"},"c2":{"pos":"c2"}},"northwest":{"b3":{"pos":"b3"},"d1":{"pos":"d1"}},"corners":{"a4":{"pos":"a4","owner":1},"d1":{"pos":"d1","owner":2}},"mycorners":{"a4":{"pos":"a4","owner":1}},"oppcorners":{"d1":{"pos":"d1","owner":2}},"bases":{"b4":{"pos":"b4","owner":1},"a3":{"pos":"a3","owner":1},"b3":{"pos":"b3","owner":1},"c2":{"pos":"c2","owner":2},"d2":{"pos":"d2","owner":2},"c1":{"pos":"c1","owner":2}},"mybases":{"b4":{"pos":"b4","owner":1},"a3":{"pos":"a3","owner":1},"b3":{"pos":"b3","owner":1}},"oppbases":{"c2":{"pos":"c2","owner":2},"d2":{"pos":"d2","owner":2},"c1":{"pos":"c1","owner":2}}};var ownernames=["neutral","my","opp"];var player=1;var otherplayer=2;game.selectunit1=function(turn,step,markpos){var ARTIFACTS={movetargets:Object.assign({},step.ARTIFACTS.movetargets)};var UNITLAYERS=step.UNITLAYERS;var MARKS={selectunit:markpos};var STARTPOS=MARKS['selectunit'];var neighbourdirs=!!TERRAIN.southeast[STARTPOS]?[1,3,4,5,7]:!!TERRAIN.northwest[STARTPOS]?[1,3,5,7,8]:[1,3,5,7];var nbrofneighbourdirs=neighbourdirs.length;var startconnections=connections[STARTPOS];for(var dirnbr=0;dirnbr<nbrofneighbourdirs;dirnbr++){var POS=startconnections[neighbourdirs[dirnbr]];if(POS&&!UNITLAYERS.units[POS]){ARTIFACTS['movetargets'][POS]={};}}var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectunit'});turn.links[newstepid]={};var newlinks=turn.links[newstepid];for(var linkpos in ARTIFACTS.movetargets){newlinks[linkpos]='selectmove1';}return newstep;};game.selectunit1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.selectmove1=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectmove:markpos,selectunit:step.MARKS.selectunit};var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectmove'});turn.links[newstepid]={};turn.links[newstepid].move='move1';return newstep;};game.selectmove1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.move1=function(turn,step){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var MARKS=step.MARKS;var UNITDATA=Object.assign({},step.UNITDATA);var UNITLAYERS=step.UNITLAYERS;var LOOPID;for(var POS in UNITLAYERS.myfrozens){LOOPID=UNITLAYERS.myfrozens[POS].id;UNITDATA[LOOPID]=Object.assign({},UNITDATA[LOOPID],{'group':'notfrozens'});}var unitid=(UNITLAYERS.units[MARKS['selectunit']]||{}).id;if(unitid){UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{'group':'frozens'});}var unitid=(UNITLAYERS.units[MARKS['selectunit']]||{}).id;if(unitid){UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{'pos':MARKS['selectmove']});}MARKS={};UNITLAYERS={"notfrozens":{},"mynotfrozens":{},"oppnotfrozens":{},"neutralnotfrozens":{},"frozens":{},"myfrozens":{},"oppfrozens":{},"neutralfrozens":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}ARTIFACTS={"movetargets":{}};var newstepid=step.stepid+'-'+'move';var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,stepid:newstepid,name:'move',path:step.path.concat('move')});turn.links[newstepid]={};if(Object.keys(function(){var ret={},s0=TERRAIN.oppcorners,s1=UNITLAYERS.myunits;for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}()||{}).length!==0){var winner=1;var result=winner===1?'win':winner?'lose':'draw';turn.links[newstepid][result]='cornerinfiltration';}else if(Object.keys(function(){var ret={},s0=TERRAIN.oppbases,s1=UNITLAYERS.myunits;for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}()).length===2){var winner=1;var result=winner===1?'win':winner?'lose':'draw';turn.links[newstepid][result]='occupation';}else turn.links[newstepid].endturn="start"+otherplayer;return newstep;};game.move1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.start1=function(turn,step){var turn={steps:{},player:player,turn:turn.turn+1,links:{root:{}}};var MARKS={};var ARTIFACTS={"movetargets":{}};var UNITDATA=step.UNITDATA;var UNITLAYERS={"notfrozens":{},"mynotfrozens":{},"oppnotfrozens":{},"neutralnotfrozens":{},"frozens":{},"myfrozens":{},"oppfrozens":{},"neutralfrozens":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}var newstep=turn.steps.root={ARTIFACTS:ARTIFACTS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,MARKS:MARKS,stepid:'root',name:'start',path:[]};var newlinks=turn.links.root;for(var linkpos in UNITLAYERS.mynotfrozens){newlinks[linkpos]='selectunit1';}return turn;};game.start1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.brain_Fred_1=function(step){var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;ARTIFACTS.myfrozenguardedthreat={};ARTIFACTS.myfrozenfreethreat={};ARTIFACTS.mymoverguardedthreat={};ARTIFACTS.mymoverfreethreat={};ARTIFACTS.oppfrozenguardedthreat={};ARTIFACTS.oppfrozenfreethreat={};ARTIFACTS.oppmoverguardedthreat={};ARTIFACTS.oppmoverfreethreat={};for(var STARTPOS in UNITLAYERS.myunits){var neighbourdirs=!!TERRAIN.oppbases[STARTPOS]?[4]:[3,5];var nbrofneighbourdirs=neighbourdirs.length;var startconnections=connections[STARTPOS];for(var dirnbr=0;dirnbr<nbrofneighbourdirs;dirnbr++){var POS=startconnections[neighbourdirs[dirnbr]];if(POS&&function(){var k,ret={},s0=TERRAIN.oppbases,s1=TERRAIN.oppcorners;for(k in s0){ret[k]=1;}for(k in s1){ret[k]=1;}return ret;}()[POS]){ARTIFACTS[!!UNITLAYERS.myfrozens[STARTPOS]?!!UNITLAYERS.units[POS]?'myfrozenguardedthreat':'myfrozenfreethreat':!!UNITLAYERS.units[POS]?'mymoverguardedthreat':'mymoverfreethreat'][POS]={};}}}for(var STARTPOS in UNITLAYERS.oppunits){var neighbourdirs=!!TERRAIN.mybases[STARTPOS]?[8]:[7,1];var nbrofneighbourdirs=neighbourdirs.length;var startconnections=connections[STARTPOS];for(var dirnbr=0;dirnbr<nbrofneighbourdirs;dirnbr++){var POS=startconnections[neighbourdirs[dirnbr]];if(POS&&function(){var k,ret={},s0=TERRAIN.mybases,s1=TERRAIN.mycorners;for(k in s0){ret[k]=1;}for(k in s1){ret[k]=1;}return ret;}()[POS]){ARTIFACTS[!!UNITLAYERS.oppfrozens[STARTPOS]?!!UNITLAYERS.units[POS]?'oppfrozenguardedthreat':'oppfrozenfreethreat':!!UNITLAYERS.units[POS]?'oppmoverguardedthreat':'oppmoverfreethreat'][POS]={};}}}return Object.keys(ARTIFACTS.myfrozenguardedthreat).length+2*Object.keys(ARTIFACTS.myfrozenfreethreat).length+3*Object.keys(ARTIFACTS.mymoverguardedthreat).length+4*Object.keys(ARTIFACTS.mymoverfreethreat).length+5*Object.keys(function(){var ret={},s0=UNITLAYERS.myfrozens,s1=TERRAIN.oppbases;for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}()).length+6*Object.keys(function(){var ret={},s0=UNITLAYERS.mynotfrozens,s1=TERRAIN.oppbases;for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}()).length-Object.keys(ARTIFACTS.oppfrozenguardedthreat).length-2*Object.keys(ARTIFACTS.oppfrozenfreethreat).length-3*Object.keys(ARTIFACTS.oppmoverguardedthreat).length-4*Object.keys(ARTIFACTS.oppmoverfreethreat).length-5*Object.keys(function(){var ret={},s0=UNITLAYERS.oppfrozens,s1=TERRAIN.mybases;for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}()).length-6*Object.keys(function(){var ret={},s0=UNITLAYERS.oppnotfrozens,s1=TERRAIN.mybases;for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}()).length;};game.brain_Fred_1_detailed=function(step){var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;ARTIFACTS.myfrozenguardedthreat={};ARTIFACTS.myfrozenfreethreat={};ARTIFACTS.mymoverguardedthreat={};ARTIFACTS.mymoverfreethreat={};ARTIFACTS.oppfrozenguardedthreat={};ARTIFACTS.oppfrozenfreethreat={};ARTIFACTS.oppmoverguardedthreat={};ARTIFACTS.oppmoverfreethreat={};for(var STARTPOS in UNITLAYERS.myunits){var neighbourdirs=!!TERRAIN.oppbases[STARTPOS]?[4]:[3,5];var nbrofneighbourdirs=neighbourdirs.length;var startconnections=connections[STARTPOS];for(var dirnbr=0;dirnbr<nbrofneighbourdirs;dirnbr++){var POS=startconnections[neighbourdirs[dirnbr]];if(POS&&function(){var k,ret={},s0=TERRAIN.oppbases,s1=TERRAIN.oppcorners;for(k in s0){ret[k]=1;}for(k in s1){ret[k]=1;}return ret;}()[POS]){ARTIFACTS[!!UNITLAYERS.myfrozens[STARTPOS]?!!UNITLAYERS.units[POS]?'myfrozenguardedthreat':'myfrozenfreethreat':!!UNITLAYERS.units[POS]?'mymoverguardedthreat':'mymoverfreethreat'][POS]={};}}}for(var STARTPOS in UNITLAYERS.oppunits){var neighbourdirs=!!TERRAIN.mybases[STARTPOS]?[8]:[7,1];var nbrofneighbourdirs=neighbourdirs.length;var startconnections=connections[STARTPOS];for(var dirnbr=0;dirnbr<nbrofneighbourdirs;dirnbr++){var POS=startconnections[neighbourdirs[dirnbr]];if(POS&&function(){var k,ret={},s0=TERRAIN.mybases,s1=TERRAIN.mycorners;for(k in s0){ret[k]=1;}for(k in s1){ret[k]=1;}return ret;}()[POS]){ARTIFACTS[!!UNITLAYERS.oppfrozens[STARTPOS]?!!UNITLAYERS.units[POS]?'oppfrozenguardedthreat':'oppfrozenfreethreat':!!UNITLAYERS.units[POS]?'oppmoverguardedthreat':'oppmoverfreethreat'][POS]={};}}}return{myfrozenguardedthreat:Object.keys(ARTIFACTS.myfrozenguardedthreat).length,myfrozenfreethreat:2*Object.keys(ARTIFACTS.myfrozenfreethreat).length,mymoverguardedthreat:3*Object.keys(ARTIFACTS.mymoverguardedthreat).length,mymoverfreethreat:4*Object.keys(ARTIFACTS.mymoverfreethreat).length,myfrozeninfiltrators:5*Object.keys(function(){var ret={},s0=UNITLAYERS.myfrozens,s1=TERRAIN.oppbases;for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}()).length,myfreeinfiltrators:6*Object.keys(function(){var ret={},s0=UNITLAYERS.mynotfrozens,s1=TERRAIN.oppbases;for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}()).length,oppfrozenguardedthreat:-Object.keys(ARTIFACTS.oppfrozenguardedthreat).length,oppfrozenfreethreat:-2*Object.keys(ARTIFACTS.oppfrozenfreethreat).length,oppmoverguardedthreat:-3*Object.keys(ARTIFACTS.oppmoverguardedthreat).length,oppmoverfreethreat:-4*Object.keys(ARTIFACTS.oppmoverfreethreat).length,oppfrozeninfiltrators:-5*Object.keys(function(){var ret={},s0=UNITLAYERS.oppfrozens,s1=TERRAIN.mybases;for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}()).length,oppfreeinfiltrators:-6*Object.keys(function(){var ret={},s0=UNITLAYERS.oppnotfrozens,s1=TERRAIN.mybases;for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}()).length};};game.debug1=function(){return{TERRAIN:TERRAIN};};})();(function(){var TERRAIN={"southeast":{"a4":{"pos":"a4"},"c2":{"pos":"c2"}},"northwest":{"b3":{"pos":"b3"},"d1":{"pos":"d1"}},"corners":{"a4":{"pos":"a4","owner":1},"d1":{"pos":"d1","owner":2}},"oppcorners":{"a4":{"pos":"a4","owner":1}},"mycorners":{"d1":{"pos":"d1","owner":2}},"bases":{"b4":{"pos":"b4","owner":1},"a3":{"pos":"a3","owner":1},"b3":{"pos":"b3","owner":1},"c2":{"pos":"c2","owner":2},"d2":{"pos":"d2","owner":2},"c1":{"pos":"c1","owner":2}},"oppbases":{"b4":{"pos":"b4","owner":1},"a3":{"pos":"a3","owner":1},"b3":{"pos":"b3","owner":1}},"mybases":{"c2":{"pos":"c2","owner":2},"d2":{"pos":"d2","owner":2},"c1":{"pos":"c1","owner":2}}};var ownernames=["neutral","opp","my"];var player=2;var otherplayer=1;game.selectunit2=function(turn,step,markpos){var ARTIFACTS={movetargets:Object.assign({},step.ARTIFACTS.movetargets)};var UNITLAYERS=step.UNITLAYERS;var MARKS={selectunit:markpos};var STARTPOS=MARKS['selectunit'];var neighbourdirs=!!TERRAIN.southeast[STARTPOS]?[1,3,4,5,7]:!!TERRAIN.northwest[STARTPOS]?[1,3,5,7,8]:[1,3,5,7];var nbrofneighbourdirs=neighbourdirs.length;var startconnections=connections[STARTPOS];for(var dirnbr=0;dirnbr<nbrofneighbourdirs;dirnbr++){var POS=startconnections[neighbourdirs[dirnbr]];if(POS&&!UNITLAYERS.units[POS]){ARTIFACTS['movetargets'][POS]={};}}var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectunit'});turn.links[newstepid]={};var newlinks=turn.links[newstepid];for(var linkpos in ARTIFACTS.movetargets){newlinks[linkpos]='selectmove2';}return newstep;};game.selectunit2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.selectmove2=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectmove:markpos,selectunit:step.MARKS.selectunit};var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectmove'});turn.links[newstepid]={};turn.links[newstepid].move='move2';return newstep;};game.selectmove2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.move2=function(turn,step){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var MARKS=step.MARKS;var UNITDATA=Object.assign({},step.UNITDATA);var UNITLAYERS=step.UNITLAYERS;var LOOPID;for(var POS in UNITLAYERS.myfrozens){LOOPID=UNITLAYERS.myfrozens[POS].id;UNITDATA[LOOPID]=Object.assign({},UNITDATA[LOOPID],{'group':'notfrozens'});}var unitid=(UNITLAYERS.units[MARKS['selectunit']]||{}).id;if(unitid){UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{'group':'frozens'});}var unitid=(UNITLAYERS.units[MARKS['selectunit']]||{}).id;if(unitid){UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{'pos':MARKS['selectmove']});}MARKS={};UNITLAYERS={"notfrozens":{},"mynotfrozens":{},"oppnotfrozens":{},"neutralnotfrozens":{},"frozens":{},"myfrozens":{},"oppfrozens":{},"neutralfrozens":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}ARTIFACTS={"movetargets":{}};var newstepid=step.stepid+'-'+'move';var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,stepid:newstepid,name:'move',path:step.path.concat('move')});turn.links[newstepid]={};if(Object.keys(function(){var ret={},s0=TERRAIN.oppcorners,s1=UNITLAYERS.myunits;for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}()||{}).length!==0){var winner=2;var result=winner===2?'win':winner?'lose':'draw';turn.links[newstepid][result]='cornerinfiltration';}else if(Object.keys(function(){var ret={},s0=TERRAIN.oppbases,s1=UNITLAYERS.myunits;for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}()).length===2){var winner=2;var result=winner===2?'win':winner?'lose':'draw';turn.links[newstepid][result]='occupation';}else turn.links[newstepid].endturn="start"+otherplayer;return newstep;};game.move2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.start2=function(turn,step){var turn={steps:{},player:player,turn:turn.turn+1,links:{root:{}}};var MARKS={};var ARTIFACTS={"movetargets":{}};var UNITDATA=step.UNITDATA;var UNITLAYERS={"notfrozens":{},"mynotfrozens":{},"oppnotfrozens":{},"neutralnotfrozens":{},"frozens":{},"myfrozens":{},"oppfrozens":{},"neutralfrozens":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}var newstep=turn.steps.root={ARTIFACTS:ARTIFACTS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,MARKS:MARKS,stepid:'root',name:'start',path:[]};var newlinks=turn.links.root;for(var linkpos in UNITLAYERS.mynotfrozens){newlinks[linkpos]='selectunit2';}return turn;};game.start2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.brain_Fred_2=function(step){var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;ARTIFACTS.myfrozenguardedthreat={};ARTIFACTS.myfrozenfreethreat={};ARTIFACTS.mymoverguardedthreat={};ARTIFACTS.mymoverfreethreat={};ARTIFACTS.oppfrozenguardedthreat={};ARTIFACTS.oppfrozenfreethreat={};ARTIFACTS.oppmoverguardedthreat={};ARTIFACTS.oppmoverfreethreat={};for(var STARTPOS in UNITLAYERS.myunits){var neighbourdirs=!!TERRAIN.oppbases[STARTPOS]?[8]:[7,1];var nbrofneighbourdirs=neighbourdirs.length;var startconnections=connections[STARTPOS];for(var dirnbr=0;dirnbr<nbrofneighbourdirs;dirnbr++){var POS=startconnections[neighbourdirs[dirnbr]];if(POS&&function(){var k,ret={},s0=TERRAIN.oppbases,s1=TERRAIN.oppcorners;for(k in s0){ret[k]=1;}for(k in s1){ret[k]=1;}return ret;}()[POS]){ARTIFACTS[!!UNITLAYERS.myfrozens[STARTPOS]?!!UNITLAYERS.units[POS]?'myfrozenguardedthreat':'myfrozenfreethreat':!!UNITLAYERS.units[POS]?'mymoverguardedthreat':'mymoverfreethreat'][POS]={};}}}for(var STARTPOS in UNITLAYERS.oppunits){var neighbourdirs=!!TERRAIN.mybases[STARTPOS]?[4]:[3,5];var nbrofneighbourdirs=neighbourdirs.length;var startconnections=connections[STARTPOS];for(var dirnbr=0;dirnbr<nbrofneighbourdirs;dirnbr++){var POS=startconnections[neighbourdirs[dirnbr]];if(POS&&function(){var k,ret={},s0=TERRAIN.mybases,s1=TERRAIN.mycorners;for(k in s0){ret[k]=1;}for(k in s1){ret[k]=1;}return ret;}()[POS]){ARTIFACTS[!!UNITLAYERS.oppfrozens[STARTPOS]?!!UNITLAYERS.units[POS]?'oppfrozenguardedthreat':'oppfrozenfreethreat':!!UNITLAYERS.units[POS]?'oppmoverguardedthreat':'oppmoverfreethreat'][POS]={};}}}return Object.keys(ARTIFACTS.myfrozenguardedthreat).length+2*Object.keys(ARTIFACTS.myfrozenfreethreat).length+3*Object.keys(ARTIFACTS.mymoverguardedthreat).length+4*Object.keys(ARTIFACTS.mymoverfreethreat).length+5*Object.keys(function(){var ret={},s0=UNITLAYERS.myfrozens,s1=TERRAIN.oppbases;for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}()).length+6*Object.keys(function(){var ret={},s0=UNITLAYERS.mynotfrozens,s1=TERRAIN.oppbases;for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}()).length-Object.keys(ARTIFACTS.oppfrozenguardedthreat).length-2*Object.keys(ARTIFACTS.oppfrozenfreethreat).length-3*Object.keys(ARTIFACTS.oppmoverguardedthreat).length-4*Object.keys(ARTIFACTS.oppmoverfreethreat).length-5*Object.keys(function(){var ret={},s0=UNITLAYERS.oppfrozens,s1=TERRAIN.mybases;for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}()).length-6*Object.keys(function(){var ret={},s0=UNITLAYERS.oppnotfrozens,s1=TERRAIN.mybases;for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}()).length;};game.brain_Fred_2_detailed=function(step){var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;ARTIFACTS.myfrozenguardedthreat={};ARTIFACTS.myfrozenfreethreat={};ARTIFACTS.mymoverguardedthreat={};ARTIFACTS.mymoverfreethreat={};ARTIFACTS.oppfrozenguardedthreat={};ARTIFACTS.oppfrozenfreethreat={};ARTIFACTS.oppmoverguardedthreat={};ARTIFACTS.oppmoverfreethreat={};for(var STARTPOS in UNITLAYERS.myunits){var neighbourdirs=!!TERRAIN.oppbases[STARTPOS]?[8]:[7,1];var nbrofneighbourdirs=neighbourdirs.length;var startconnections=connections[STARTPOS];for(var dirnbr=0;dirnbr<nbrofneighbourdirs;dirnbr++){var POS=startconnections[neighbourdirs[dirnbr]];if(POS&&function(){var k,ret={},s0=TERRAIN.oppbases,s1=TERRAIN.oppcorners;for(k in s0){ret[k]=1;}for(k in s1){ret[k]=1;}return ret;}()[POS]){ARTIFACTS[!!UNITLAYERS.myfrozens[STARTPOS]?!!UNITLAYERS.units[POS]?'myfrozenguardedthreat':'myfrozenfreethreat':!!UNITLAYERS.units[POS]?'mymoverguardedthreat':'mymoverfreethreat'][POS]={};}}}for(var STARTPOS in UNITLAYERS.oppunits){var neighbourdirs=!!TERRAIN.mybases[STARTPOS]?[4]:[3,5];var nbrofneighbourdirs=neighbourdirs.length;var startconnections=connections[STARTPOS];for(var dirnbr=0;dirnbr<nbrofneighbourdirs;dirnbr++){var POS=startconnections[neighbourdirs[dirnbr]];if(POS&&function(){var k,ret={},s0=TERRAIN.mybases,s1=TERRAIN.mycorners;for(k in s0){ret[k]=1;}for(k in s1){ret[k]=1;}return ret;}()[POS]){ARTIFACTS[!!UNITLAYERS.oppfrozens[STARTPOS]?!!UNITLAYERS.units[POS]?'oppfrozenguardedthreat':'oppfrozenfreethreat':!!UNITLAYERS.units[POS]?'oppmoverguardedthreat':'oppmoverfreethreat'][POS]={};}}}return{myfrozenguardedthreat:Object.keys(ARTIFACTS.myfrozenguardedthreat).length,myfrozenfreethreat:2*Object.keys(ARTIFACTS.myfrozenfreethreat).length,mymoverguardedthreat:3*Object.keys(ARTIFACTS.mymoverguardedthreat).length,mymoverfreethreat:4*Object.keys(ARTIFACTS.mymoverfreethreat).length,myfrozeninfiltrators:5*Object.keys(function(){var ret={},s0=UNITLAYERS.myfrozens,s1=TERRAIN.oppbases;for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}()).length,myfreeinfiltrators:6*Object.keys(function(){var ret={},s0=UNITLAYERS.mynotfrozens,s1=TERRAIN.oppbases;for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}()).length,oppfrozenguardedthreat:-Object.keys(ARTIFACTS.oppfrozenguardedthreat).length,oppfrozenfreethreat:-2*Object.keys(ARTIFACTS.oppfrozenfreethreat).length,oppmoverguardedthreat:-3*Object.keys(ARTIFACTS.oppmoverguardedthreat).length,oppmoverfreethreat:-4*Object.keys(ARTIFACTS.oppmoverfreethreat).length,oppfrozeninfiltrators:-5*Object.keys(function(){var ret={},s0=UNITLAYERS.oppfrozens,s1=TERRAIN.mybases;for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}()).length,oppfreeinfiltrators:-6*Object.keys(function(){var ret={},s0=UNITLAYERS.oppnotfrozens,s1=TERRAIN.mybases;for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}()).length};};game.debug2=function(){return{TERRAIN:TERRAIN};};})();function reduce(coll,iterator,acc){for(var key in coll){acc=iterator(acc,coll[key],key);}return acc;}game.newGame=function(){var turnseed={turn:0};var stepseed={UNITDATA:{"unit1":{"pos":"a4","id":"unit1","group":"notfrozens","owner":1},"unit2":{"pos":"b4","id":"unit2","group":"notfrozens","owner":1},"unit3":{"pos":"a3","id":"unit3","group":"notfrozens","owner":1},"unit4":{"pos":"b3","id":"unit4","group":"notfrozens","owner":1},"unit5":{"pos":"c2","id":"unit5","group":"notfrozens","owner":2},"unit6":{"pos":"c1","id":"unit6","group":"notfrozens","owner":2},"unit7":{"pos":"d2","id":"unit7","group":"notfrozens","owner":2},"unit8":{"pos":"d1","id":"unit8","group":"notfrozens","owner":2}}};return game.start1(turnseed,stepseed);};game.debug=function(){return{BOARD:BOARD,connections:connections,plr1:game.debug1(),plr2:game.debug2()};};game.commands={"move":1};game.graphics={"tiles":{"corners":"playercolour","bases":"castle"},"icons":{"notfrozens":"knights","frozens":"rooks"}};game.board={"width":4,"height":4,"terrain":{"southeast":["a4","c2"],"northwest":["b3","d1"],"corners":{"1":["a4"],"2":["d1"]},"bases":{"1":["b4","a3","b3"],"2":["c2","d2","c1"]}}};game.AI=["Fred"];game.id="krieg";return game;}(),murusgallicus:function(){var game={};var connections={"faux":{},"a1":{"1":"a2","2":"b2","3":"b1"},"a2":{"1":"a3","2":"b3","3":"b2","4":"b1","5":"a1"},"a3":{"1":"a4","2":"b4","3":"b3","4":"b2","5":"a2"},"a4":{"1":"a5","2":"b5","3":"b4","4":"b3","5":"a3"},"a5":{"1":"a6","2":"b6","3":"b5","4":"b4","5":"a4"},"a6":{"1":"a7","2":"b7","3":"b6","4":"b5","5":"a5"},"a7":{"3":"b7","4":"b6","5":"a6"},"b1":{"1":"b2","2":"c2","3":"c1","7":"a1","8":"a2"},"b2":{"1":"b3","2":"c3","3":"c2","4":"c1","5":"b1","6":"a1","7":"a2","8":"a3"},"b3":{"1":"b4","2":"c4","3":"c3","4":"c2","5":"b2","6":"a2","7":"a3","8":"a4"},"b4":{"1":"b5","2":"c5","3":"c4","4":"c3","5":"b3","6":"a3","7":"a4","8":"a5"},"b5":{"1":"b6","2":"c6","3":"c5","4":"c4","5":"b4","6":"a4","7":"a5","8":"a6"},"b6":{"1":"b7","2":"c7","3":"c6","4":"c5","5":"b5","6":"a5","7":"a6","8":"a7"},"b7":{"3":"c7","4":"c6","5":"b6","6":"a6","7":"a7"},"c1":{"1":"c2","2":"d2","3":"d1","7":"b1","8":"b2"},"c2":{"1":"c3","2":"d3","3":"d2","4":"d1","5":"c1","6":"b1","7":"b2","8":"b3"},"c3":{"1":"c4","2":"d4","3":"d3","4":"d2","5":"c2","6":"b2","7":"b3","8":"b4"},"c4":{"1":"c5","2":"d5","3":"d4","4":"d3","5":"c3","6":"b3","7":"b4","8":"b5"},"c5":{"1":"c6","2":"d6","3":"d5","4":"d4","5":"c4","6":"b4","7":"b5","8":"b6"},"c6":{"1":"c7","2":"d7","3":"d6","4":"d5","5":"c5","6":"b5","7":"b6","8":"b7"},"c7":{"3":"d7","4":"d6","5":"c6","6":"b6","7":"b7"},"d1":{"1":"d2","2":"e2","3":"e1","7":"c1","8":"c2"},"d2":{"1":"d3","2":"e3","3":"e2","4":"e1","5":"d1","6":"c1","7":"c2","8":"c3"},"d3":{"1":"d4","2":"e4","3":"e3","4":"e2","5":"d2","6":"c2","7":"c3","8":"c4"},"d4":{"1":"d5","2":"e5","3":"e4","4":"e3","5":"d3","6":"c3","7":"c4","8":"c5"},"d5":{"1":"d6","2":"e6","3":"e5","4":"e4","5":"d4","6":"c4","7":"c5","8":"c6"},"d6":{"1":"d7","2":"e7","3":"e6","4":"e5","5":"d5","6":"c5","7":"c6","8":"c7"},"d7":{"3":"e7","4":"e6","5":"d6","6":"c6","7":"c7"},"e1":{"1":"e2","2":"f2","3":"f1","7":"d1","8":"d2"},"e2":{"1":"e3","2":"f3","3":"f2","4":"f1","5":"e1","6":"d1","7":"d2","8":"d3"},"e3":{"1":"e4","2":"f4","3":"f3","4":"f2","5":"e2","6":"d2","7":"d3","8":"d4"},"e4":{"1":"e5","2":"f5","3":"f4","4":"f3","5":"e3","6":"d3","7":"d4","8":"d5"},"e5":{"1":"e6","2":"f6","3":"f5","4":"f4","5":"e4","6":"d4","7":"d5","8":"d6"},"e6":{"1":"e7","2":"f7","3":"f6","4":"f5","5":"e5","6":"d5","7":"d6","8":"d7"},"e7":{"3":"f7","4":"f6","5":"e6","6":"d6","7":"d7"},"f1":{"1":"f2","2":"g2","3":"g1","7":"e1","8":"e2"},"f2":{"1":"f3","2":"g3","3":"g2","4":"g1","5":"f1","6":"e1","7":"e2","8":"e3"},"f3":{"1":"f4","2":"g4","3":"g3","4":"g2","5":"f2","6":"e2","7":"e3","8":"e4"},"f4":{"1":"f5","2":"g5","3":"g4","4":"g3","5":"f3","6":"e3","7":"e4","8":"e5"},"f5":{"1":"f6","2":"g6","3":"g5","4":"g4","5":"f4","6":"e4","7":"e5","8":"e6"},"f6":{"1":"f7","2":"g7","3":"g6","4":"g5","5":"f5","6":"e5","7":"e6","8":"e7"},"f7":{"3":"g7","4":"g6","5":"f6","6":"e6","7":"e7"},"g1":{"1":"g2","2":"h2","3":"h1","7":"f1","8":"f2"},"g2":{"1":"g3","2":"h3","3":"h2","4":"h1","5":"g1","6":"f1","7":"f2","8":"f3"},"g3":{"1":"g4","2":"h4","3":"h3","4":"h2","5":"g2","6":"f2","7":"f3","8":"f4"},"g4":{"1":"g5","2":"h5","3":"h4","4":"h3","5":"g3","6":"f3","7":"f4","8":"f5"},"g5":{"1":"g6","2":"h6","3":"h5","4":"h4","5":"g4","6":"f4","7":"f5","8":"f6"},"g6":{"1":"g7","2":"h7","3":"h6","4":"h5","5":"g5","6":"f5","7":"f6","8":"f7"},"g7":{"3":"h7","4":"h6","5":"g6","6":"f6","7":"f7"},"h1":{"1":"h2","7":"g1","8":"g2"},"h2":{"1":"h3","5":"h1","6":"g1","7":"g2","8":"g3"},"h3":{"1":"h4","5":"h2","6":"g2","7":"g3","8":"g4"},"h4":{"1":"h5","5":"h3","6":"g3","7":"g4","8":"g5"},"h5":{"1":"h6","5":"h4","6":"g4","7":"g5","8":"g6"},"h6":{"1":"h7","5":"h5","6":"g5","7":"g6","8":"g7"},"h7":{"5":"h6","6":"g6","7":"g7"}};var BOARD={"board":{"a1":{"colour":"dark","pos":"a1","x":1,"y":1},"a2":{"colour":"light","pos":"a2","x":1,"y":2},"a3":{"colour":"dark","pos":"a3","x":1,"y":3},"a4":{"colour":"light","pos":"a4","x":1,"y":4},"a5":{"colour":"dark","pos":"a5","x":1,"y":5},"a6":{"colour":"light","pos":"a6","x":1,"y":6},"a7":{"colour":"dark","pos":"a7","x":1,"y":7},"b1":{"colour":"light","pos":"b1","x":2,"y":1},"b2":{"colour":"dark","pos":"b2","x":2,"y":2},"b3":{"colour":"light","pos":"b3","x":2,"y":3},"b4":{"colour":"dark","pos":"b4","x":2,"y":4},"b5":{"colour":"light","pos":"b5","x":2,"y":5},"b6":{"colour":"dark","pos":"b6","x":2,"y":6},"b7":{"colour":"light","pos":"b7","x":2,"y":7},"c1":{"colour":"dark","pos":"c1","x":3,"y":1},"c2":{"colour":"light","pos":"c2","x":3,"y":2},"c3":{"colour":"dark","pos":"c3","x":3,"y":3},"c4":{"colour":"light","pos":"c4","x":3,"y":4},"c5":{"colour":"dark","pos":"c5","x":3,"y":5},"c6":{"colour":"light","pos":"c6","x":3,"y":6},"c7":{"colour":"dark","pos":"c7","x":3,"y":7},"d1":{"colour":"light","pos":"d1","x":4,"y":1},"d2":{"colour":"dark","pos":"d2","x":4,"y":2},"d3":{"colour":"light","pos":"d3","x":4,"y":3},"d4":{"colour":"dark","pos":"d4","x":4,"y":4},"d5":{"colour":"light","pos":"d5","x":4,"y":5},"d6":{"colour":"dark","pos":"d6","x":4,"y":6},"d7":{"colour":"light","pos":"d7","x":4,"y":7},"e1":{"colour":"dark","pos":"e1","x":5,"y":1},"e2":{"colour":"light","pos":"e2","x":5,"y":2},"e3":{"colour":"dark","pos":"e3","x":5,"y":3},"e4":{"colour":"light","pos":"e4","x":5,"y":4},"e5":{"colour":"dark","pos":"e5","x":5,"y":5},"e6":{"colour":"light","pos":"e6","x":5,"y":6},"e7":{"colour":"dark","pos":"e7","x":5,"y":7},"f1":{"colour":"light","pos":"f1","x":6,"y":1},"f2":{"colour":"dark","pos":"f2","x":6,"y":2},"f3":{"colour":"light","pos":"f3","x":6,"y":3},"f4":{"colour":"dark","pos":"f4","x":6,"y":4},"f5":{"colour":"light","pos":"f5","x":6,"y":5},"f6":{"colour":"dark","pos":"f6","x":6,"y":6},"f7":{"colour":"light","pos":"f7","x":6,"y":7},"g1":{"colour":"dark","pos":"g1","x":7,"y":1},"g2":{"colour":"light","pos":"g2","x":7,"y":2},"g3":{"colour":"dark","pos":"g3","x":7,"y":3},"g4":{"colour":"light","pos":"g4","x":7,"y":4},"g5":{"colour":"dark","pos":"g5","x":7,"y":5},"g6":{"colour":"light","pos":"g6","x":7,"y":6},"g7":{"colour":"dark","pos":"g7","x":7,"y":7},"h1":{"colour":"light","pos":"h1","x":8,"y":1},"h2":{"colour":"dark","pos":"h2","x":8,"y":2},"h3":{"colour":"light","pos":"h3","x":8,"y":3},"h4":{"colour":"dark","pos":"h4","x":8,"y":4},"h5":{"colour":"light","pos":"h5","x":8,"y":5},"h6":{"colour":"dark","pos":"h6","x":8,"y":6},"h7":{"colour":"light","pos":"h7","x":8,"y":7}},"light":{"a2":{"colour":"light","pos":"a2","x":1,"y":2},"a4":{"colour":"light","pos":"a4","x":1,"y":4},"a6":{"colour":"light","pos":"a6","x":1,"y":6},"b1":{"colour":"light","pos":"b1","x":2,"y":1},"b3":{"colour":"light","pos":"b3","x":2,"y":3},"b5":{"colour":"light","pos":"b5","x":2,"y":5},"b7":{"colour":"light","pos":"b7","x":2,"y":7},"c2":{"colour":"light","pos":"c2","x":3,"y":2},"c4":{"colour":"light","pos":"c4","x":3,"y":4},"c6":{"colour":"light","pos":"c6","x":3,"y":6},"d1":{"colour":"light","pos":"d1","x":4,"y":1},"d3":{"colour":"light","pos":"d3","x":4,"y":3},"d5":{"colour":"light","pos":"d5","x":4,"y":5},"d7":{"colour":"light","pos":"d7","x":4,"y":7},"e2":{"colour":"light","pos":"e2","x":5,"y":2},"e4":{"colour":"light","pos":"e4","x":5,"y":4},"e6":{"colour":"light","pos":"e6","x":5,"y":6},"f1":{"colour":"light","pos":"f1","x":6,"y":1},"f3":{"colour":"light","pos":"f3","x":6,"y":3},"f5":{"colour":"light","pos":"f5","x":6,"y":5},"f7":{"colour":"light","pos":"f7","x":6,"y":7},"g2":{"colour":"light","pos":"g2","x":7,"y":2},"g4":{"colour":"light","pos":"g4","x":7,"y":4},"g6":{"colour":"light","pos":"g6","x":7,"y":6},"h1":{"colour":"light","pos":"h1","x":8,"y":1},"h3":{"colour":"light","pos":"h3","x":8,"y":3},"h5":{"colour":"light","pos":"h5","x":8,"y":5},"h7":{"colour":"light","pos":"h7","x":8,"y":7}},"dark":{"a1":{"colour":"dark","pos":"a1","x":1,"y":1},"a3":{"colour":"dark","pos":"a3","x":1,"y":3},"a5":{"colour":"dark","pos":"a5","x":1,"y":5},"a7":{"colour":"dark","pos":"a7","x":1,"y":7},"b2":{"colour":"dark","pos":"b2","x":2,"y":2},"b4":{"colour":"dark","pos":"b4","x":2,"y":4},"b6":{"colour":"dark","pos":"b6","x":2,"y":6},"c1":{"colour":"dark","pos":"c1","x":3,"y":1},"c3":{"colour":"dark","pos":"c3","x":3,"y":3},"c5":{"colour":"dark","pos":"c5","x":3,"y":5},"c7":{"colour":"dark","pos":"c7","x":3,"y":7},"d2":{"colour":"dark","pos":"d2","x":4,"y":2},"d4":{"colour":"dark","pos":"d4","x":4,"y":4},"d6":{"colour":"dark","pos":"d6","x":4,"y":6},"e1":{"colour":"dark","pos":"e1","x":5,"y":1},"e3":{"colour":"dark","pos":"e3","x":5,"y":3},"e5":{"colour":"dark","pos":"e5","x":5,"y":5},"e7":{"colour":"dark","pos":"e7","x":5,"y":7},"f2":{"colour":"dark","pos":"f2","x":6,"y":2},"f4":{"colour":"dark","pos":"f4","x":6,"y":4},"f6":{"colour":"dark","pos":"f6","x":6,"y":6},"g1":{"colour":"dark","pos":"g1","x":7,"y":1},"g3":{"colour":"dark","pos":"g3","x":7,"y":3},"g5":{"colour":"dark","pos":"g5","x":7,"y":5},"g7":{"colour":"dark","pos":"g7","x":7,"y":7},"h2":{"colour":"dark","pos":"h2","x":8,"y":2},"h4":{"colour":"dark","pos":"h4","x":8,"y":4},"h6":{"colour":"dark","pos":"h6","x":8,"y":6}}};var relativedirs=[1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];(function(){var TERRAIN={"homerow":{"a1":{"pos":"a1","owner":1},"b1":{"pos":"b1","owner":1},"c1":{"pos":"c1","owner":1},"d1":{"pos":"d1","owner":1},"e1":{"pos":"e1","owner":1},"f1":{"pos":"f1","owner":1},"g1":{"pos":"g1","owner":1},"h1":{"pos":"h1","owner":1},"a7":{"pos":"a7","owner":2},"b7":{"pos":"b7","owner":2},"c7":{"pos":"c7","owner":2},"d7":{"pos":"d7","owner":2},"e7":{"pos":"e7","owner":2},"f7":{"pos":"f7","owner":2},"g7":{"pos":"g7","owner":2},"h7":{"pos":"h7","owner":2}},"myhomerow":{"a1":{"pos":"a1","owner":1},"b1":{"pos":"b1","owner":1},"c1":{"pos":"c1","owner":1},"d1":{"pos":"d1","owner":1},"e1":{"pos":"e1","owner":1},"f1":{"pos":"f1","owner":1},"g1":{"pos":"g1","owner":1},"h1":{"pos":"h1","owner":1}},"opphomerow":{"a7":{"pos":"a7","owner":2},"b7":{"pos":"b7","owner":2},"c7":{"pos":"c7","owner":2},"d7":{"pos":"d7","owner":2},"e7":{"pos":"e7","owner":2},"f7":{"pos":"f7","owner":2},"g7":{"pos":"g7","owner":2},"h7":{"pos":"h7","owner":2}},"threatrow":{"a3":{"pos":"a3","owner":1},"b3":{"pos":"b3","owner":1},"c3":{"pos":"c3","owner":1},"d3":{"pos":"d3","owner":1},"e3":{"pos":"e3","owner":1},"f3":{"pos":"f3","owner":1},"g3":{"pos":"g3","owner":1},"h3":{"pos":"h3","owner":1},"a5":{"pos":"a5","owner":2},"b5":{"pos":"b5","owner":2},"c5":{"pos":"c5","owner":2},"d5":{"pos":"d5","owner":2},"e5":{"pos":"e5","owner":2},"f5":{"pos":"f5","owner":2},"g5":{"pos":"g5","owner":2},"h5":{"pos":"h5","owner":2}},"mythreatrow":{"a3":{"pos":"a3","owner":1},"b3":{"pos":"b3","owner":1},"c3":{"pos":"c3","owner":1},"d3":{"pos":"d3","owner":1},"e3":{"pos":"e3","owner":1},"f3":{"pos":"f3","owner":1},"g3":{"pos":"g3","owner":1},"h3":{"pos":"h3","owner":1}},"oppthreatrow":{"a5":{"pos":"a5","owner":2},"b5":{"pos":"b5","owner":2},"c5":{"pos":"c5","owner":2},"d5":{"pos":"d5","owner":2},"e5":{"pos":"e5","owner":2},"f5":{"pos":"f5","owner":2},"g5":{"pos":"g5","owner":2},"h5":{"pos":"h5","owner":2}}};var ownernames=["neutral","my","opp"];var player=1;var otherplayer=2;var mybasic={"h1":0,"g1":0,"f1":0,"e1":0,"d1":0,"c1":0,"b1":0,"a1":0,"h2":0,"g2":0,"f2":1,"e2":1,"d2":1,"c2":1,"b2":0,"a2":0,"h3":0,"g3":0,"f3":2,"e3":2,"d3":2,"c3":2,"b3":0,"a3":0,"h4":0,"g4":0,"f4":3,"e4":3,"d4":3,"c4":3,"b4":0,"a4":0,"h5":2,"g5":3,"f5":4,"e5":4,"d5":4,"c5":4,"b5":3,"a5":2,"h6":1,"g6":1,"f6":1,"e6":1,"d6":1,"c6":1,"b6":1,"a6":1,"h7":0,"g7":0,"f7":0,"e7":0,"d7":0,"c7":0,"b7":0,"a7":0};var oppbasic={"h1":0,"g1":0,"f1":0,"e1":0,"d1":0,"c1":0,"b1":0,"a1":0,"h2":1,"g2":1,"f2":1,"e2":1,"d2":1,"c2":1,"b2":1,"a2":1,"h3":2,"g3":3,"f3":4,"e3":4,"d3":4,"c3":4,"b3":3,"a3":2,"h4":0,"g4":0,"f4":3,"e4":3,"d4":3,"c4":3,"b4":0,"a4":0,"h5":0,"g5":0,"f5":2,"e5":2,"d5":2,"c5":2,"b5":0,"a5":0,"h6":0,"g6":0,"f6":1,"e6":1,"d6":1,"c6":1,"b6":0,"a6":0,"h7":0,"g7":0,"f7":0,"e7":0,"d7":0,"c7":0,"b7":0,"a7":0};game.selecttower1=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{movetargets:Object.assign({},step.ARTIFACTS.movetargets),killtargets:Object.assign({},step.ARTIFACTS.killtargets)});var UNITLAYERS=step.UNITLAYERS;var MARKS={selecttower:markpos};var BLOCKS=function(){var k,ret={},s0=UNITLAYERS.oppunits,s1=UNITLAYERS.mytowers;for(k in s0){ret[k]=1;}for(k in s1){ret[k]=1;}return ret;}();var STARTPOS=MARKS['selecttower'];var allwalkerdirs=[1,2,3,4,5,6,7,8];for(var walkerdirnbr=0;walkerdirnbr<8;walkerdirnbr++){var DIR=allwalkerdirs[walkerdirnbr];var walkedsquares=[];var MAX=2;var POS=STARTPOS;var LENGTH=0;while(LENGTH<MAX&&(POS=connections[POS][DIR])&&!BLOCKS[POS]){walkedsquares.push(POS);LENGTH++;}var WALKLENGTH=walkedsquares.length;var STEP=0;for(var walkstepper=0;walkstepper<WALKLENGTH;walkstepper++){POS=walkedsquares[walkstepper];STEP++;if(WALKLENGTH===2&&STEP===2){ARTIFACTS['movetargets'][POS]={dir:DIR};}}}var STARTPOS=MARKS['selecttower'];var neighbourdirs=[1,2,3,4,5,6,7,8];var startconnections=connections[STARTPOS];for(var dirnbr=0;dirnbr<8;dirnbr++){var POS=startconnections[neighbourdirs[dirnbr]];if(POS&&UNITLAYERS.oppwalls[POS]){ARTIFACTS['killtargets'][POS]={};}}var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selecttower'});turn.links[newstepid]={};var newlinks=turn.links[newstepid];for(var linkpos in ARTIFACTS.movetargets){newlinks[linkpos]='selectmove1';}var newlinks=turn.links[newstepid];for(var linkpos in ARTIFACTS.killtargets){newlinks[linkpos]='selectkill1';}return newstep;};game.selecttower1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.selectmove1=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{madetowers:Object.assign({},step.ARTIFACTS.madetowers),madewalls:Object.assign({},step.ARTIFACTS.madewalls)});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectmove:markpos,selecttower:step.MARKS.selecttower};var STARTPOS=MARKS['selectmove'];var POS=connections[STARTPOS][relativedirs[(ARTIFACTS.movetargets[MARKS['selectmove']]||{})['dir']-2+5]];if(POS){ARTIFACTS[!!UNITLAYERS.myunits[POS]?'madetowers':'madewalls'][POS]={};}ARTIFACTS[!!UNITLAYERS.myunits[MARKS['selectmove']]?'madetowers':'madewalls'][STARTPOS]={};var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectmove'});turn.links[newstepid]={};turn.links[newstepid].move='move1';return newstep;};game.selectmove1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.selectkill1=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectkill:markpos,selecttower:step.MARKS.selecttower};var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectkill'});turn.links[newstepid]={};turn.links[newstepid].kill='kill1';return newstep;};game.selectkill1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.move1=function(turn,step){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var MARKS=step.MARKS;var UNITDATA=Object.assign({},step.UNITDATA);var clones=step.clones;var UNITLAYERS=step.UNITLAYERS;delete UNITDATA[(UNITLAYERS.units[MARKS['selecttower']]||{}).id];for(var POS in ARTIFACTS.madetowers){var unitid=(UNITLAYERS.units[POS]||{}).id;if(unitid){UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{'group':'towers'});}}for(var POS in ARTIFACTS.madewalls){var newunitid='spawn'+clones++;UNITDATA[newunitid]={pos:POS,id:newunitid,group:'walls',owner:1,from:MARKS['selecttower']};}MARKS={};UNITLAYERS={"towers":{},"mytowers":{},"opptowers":{},"neutraltowers":{},"walls":{},"mywalls":{},"oppwalls":{},"neutralwalls":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}ARTIFACTS={"movetargets":{},"madetowers":{},"madewalls":{},"killtargets":{}};var newstepid=step.stepid+'-'+'move';var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,stepid:newstepid,name:'move',path:step.path.concat('move'),clones:clones});turn.links[newstepid]={};if(Object.keys(function(){var ret={},s0=UNITLAYERS.myunits,s1=TERRAIN.opphomerow;for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}()||{}).length!==0){var winner=1;var result=winner===1?'win':winner?'lose':'draw';turn.links[newstepid][result]='infiltration';}else turn.links[newstepid].endturn="start"+otherplayer;return newstep;};game.move1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.kill1=function(turn,step){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var MARKS=step.MARKS;var UNITDATA=Object.assign({},step.UNITDATA);var UNITLAYERS=step.UNITLAYERS;var unitid=(UNITLAYERS.units[MARKS['selecttower']]||{}).id;if(unitid){UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{'group':'walls'});}delete UNITDATA[(UNITLAYERS.units[MARKS['selectkill']]||{}).id];MARKS={};UNITLAYERS={"towers":{},"mytowers":{},"opptowers":{},"neutraltowers":{},"walls":{},"mywalls":{},"oppwalls":{},"neutralwalls":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}ARTIFACTS={"movetargets":{},"madetowers":{},"madewalls":{},"killtargets":{}};var newstepid=step.stepid+'-'+'kill';var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,stepid:newstepid,name:'kill',path:step.path.concat('kill')});turn.links[newstepid]={};if(Object.keys(function(){var ret={},s0=UNITLAYERS.myunits,s1=TERRAIN.opphomerow;for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}()||{}).length!==0){var winner=1;var result=winner===1?'win':winner?'lose':'draw';turn.links[newstepid][result]='infiltration';}else turn.links[newstepid].endturn="start"+otherplayer;return newstep;};game.kill1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.start1=function(turn,step){var turn={steps:{},player:player,turn:turn.turn+1,links:{root:{}}};var MARKS={};var ARTIFACTS={"movetargets":{},"madetowers":{},"madewalls":{},"killtargets":{}};var UNITDATA=step.UNITDATA;var UNITLAYERS={"towers":{},"mytowers":{},"opptowers":{},"neutraltowers":{},"walls":{},"mywalls":{},"oppwalls":{},"neutralwalls":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}var newstep=turn.steps.root={ARTIFACTS:ARTIFACTS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,MARKS:MARKS,stepid:'root',name:'start',clones:step.clones,path:[]};var newlinks=turn.links.root;for(var linkpos in UNITLAYERS.mytowers){newlinks[linkpos]='selecttower1';}return turn;};game.start1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.brain_Steve_1=function(step){var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;ARTIFACTS.oppmoves={};ARTIFACTS.oppheavythreats={};ARTIFACTS.opplightthreats={};var BLOCKS=function(){var k,ret={},s0=UNITLAYERS.towers,s1=UNITLAYERS.mywalls;for(k in s0){ret[k]=1;}for(k in s1){ret[k]=1;}return ret;}();var walkstarts=UNITLAYERS.opptowers;for(var STARTPOS in walkstarts){var allwalkerdirs=[1,2,3,4,5,6,7,8];for(var walkerdirnbr=0;walkerdirnbr<8;walkerdirnbr++){var walkedsquares=[];var MAX=2;var POS=STARTPOS;var LENGTH=0;while(LENGTH<MAX&&(POS=connections[POS][allwalkerdirs[walkerdirnbr]])&&!BLOCKS[POS]){walkedsquares.push(POS);LENGTH++;}var WALKLENGTH=walkedsquares.length;var STEP=0;for(var walkstepper=0;walkstepper<WALKLENGTH;walkstepper++){POS=walkedsquares[walkstepper];STEP++;if(WALKLENGTH===2&&STEP===2){ARTIFACTS['oppmoves'][POS]={};}}}}var filtersourcelayer=TERRAIN.mythreatrow;for(var POS in filtersourcelayer){var filtertargetlayer=ARTIFACTS[!!UNITLAYERS.oppwalls[POS]?'oppheavythreats':'opplightthreats'];if(filtersourcelayer[POS]){var filterobj=filtersourcelayer[POS];if(!!ARTIFACTS.oppmoves[POS]){filtertargetlayer[POS]=filterobj;}}}return 2*Object.keys(UNITLAYERS.mytowers).length+Object.keys(UNITLAYERS.mytowers).reduce(function(mem,pos){return mem+(mybasic[pos]||0);},0)+2*Object.keys(UNITLAYERS.mytowers).reduce(function(mem,pos){return mem+(mybasic[pos]||0);},0)-10000*Object.keys(function(){var k,ret={},s0=ARTIFACTS.oppmoves,s1=TERRAIN.myhomerow;for(k in s0){ret[k]=1;}for(k in s1){ret[k]=1;}return ret;}()).length-20*Object.keys(ARTIFACTS.opplightthreats).length-500*Object.keys(ARTIFACTS.oppheavythreats).length;};game.brain_Steve_1_detailed=function(step){var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;ARTIFACTS.oppmoves={};ARTIFACTS.oppheavythreats={};ARTIFACTS.opplightthreats={};var BLOCKS=function(){var k,ret={},s0=UNITLAYERS.towers,s1=UNITLAYERS.mywalls;for(k in s0){ret[k]=1;}for(k in s1){ret[k]=1;}return ret;}();var walkstarts=UNITLAYERS.opptowers;for(var STARTPOS in walkstarts){var allwalkerdirs=[1,2,3,4,5,6,7,8];for(var walkerdirnbr=0;walkerdirnbr<8;walkerdirnbr++){var walkedsquares=[];var MAX=2;var POS=STARTPOS;var LENGTH=0;while(LENGTH<MAX&&(POS=connections[POS][allwalkerdirs[walkerdirnbr]])&&!BLOCKS[POS]){walkedsquares.push(POS);LENGTH++;}var WALKLENGTH=walkedsquares.length;var STEP=0;for(var walkstepper=0;walkstepper<WALKLENGTH;walkstepper++){POS=walkedsquares[walkstepper];STEP++;if(WALKLENGTH===2&&STEP===2){ARTIFACTS['oppmoves'][POS]={};}}}}var filtersourcelayer=TERRAIN.mythreatrow;for(var POS in filtersourcelayer){var filtertargetlayer=ARTIFACTS[!!UNITLAYERS.oppwalls[POS]?'oppheavythreats':'opplightthreats'];if(filtersourcelayer[POS]){var filterobj=filtersourcelayer[POS];if(!!ARTIFACTS.oppmoves[POS]){filtertargetlayer[POS]=filterobj;}}}return{mytowercount:2*Object.keys(UNITLAYERS.mytowers).length,mywallpos:Object.keys(UNITLAYERS.mytowers).reduce(function(mem,pos){return mem+(mybasic[pos]||0);},0),mytowerpos:2*Object.keys(UNITLAYERS.mytowers).reduce(function(mem,pos){return mem+(mybasic[pos]||0);},0),oppwinmoves:-10000*Object.keys(function(){var k,ret={},s0=ARTIFACTS.oppmoves,s1=TERRAIN.myhomerow;for(k in s0){ret[k]=1;}for(k in s1){ret[k]=1;}return ret;}()).length,opplightthreats:-20*Object.keys(ARTIFACTS.opplightthreats).length,oppheavythreats:-500*Object.keys(ARTIFACTS.oppheavythreats).length};};game.brain_Joe_1=function(step){var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;ARTIFACTS.oppmoves={};var BLOCKS=function(){var k,ret={},s0=UNITLAYERS.towers,s1=UNITLAYERS.mywalls;for(k in s0){ret[k]=1;}for(k in s1){ret[k]=1;}return ret;}();var walkstarts=UNITLAYERS.opptowers;for(var STARTPOS in walkstarts){var allwalkerdirs=[1,2,3,4,5,6,7,8];for(var walkerdirnbr=0;walkerdirnbr<8;walkerdirnbr++){var walkedsquares=[];var MAX=2;var POS=STARTPOS;var LENGTH=0;while(LENGTH<MAX&&(POS=connections[POS][allwalkerdirs[walkerdirnbr]])&&!BLOCKS[POS]){walkedsquares.push(POS);LENGTH++;}var WALKLENGTH=walkedsquares.length;var STEP=0;for(var walkstepper=0;walkstepper<WALKLENGTH;walkstepper++){POS=walkedsquares[walkstepper];STEP++;if(WALKLENGTH===2&&STEP===2){ARTIFACTS['oppmoves'][POS]={};}}}}return 2*Object.keys(UNITLAYERS.mytowers).length+Object.keys(UNITLAYERS.mytowers).reduce(function(mem,pos){return mem+(mybasic[pos]||0);},0)+2*Object.keys(UNITLAYERS.mytowers).reduce(function(mem,pos){return mem+(mybasic[pos]||0);},0)-100*Object.keys(function(){var k,ret={},s0=ARTIFACTS.oppmoves,s1=TERRAIN.myhomerow;for(k in s0){ret[k]=1;}for(k in s1){ret[k]=1;}return ret;}()).length;};game.brain_Joe_1_detailed=function(step){var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;ARTIFACTS.oppmoves={};var BLOCKS=function(){var k,ret={},s0=UNITLAYERS.towers,s1=UNITLAYERS.mywalls;for(k in s0){ret[k]=1;}for(k in s1){ret[k]=1;}return ret;}();var walkstarts=UNITLAYERS.opptowers;for(var STARTPOS in walkstarts){var allwalkerdirs=[1,2,3,4,5,6,7,8];for(var walkerdirnbr=0;walkerdirnbr<8;walkerdirnbr++){var walkedsquares=[];var MAX=2;var POS=STARTPOS;var LENGTH=0;while(LENGTH<MAX&&(POS=connections[POS][allwalkerdirs[walkerdirnbr]])&&!BLOCKS[POS]){walkedsquares.push(POS);LENGTH++;}var WALKLENGTH=walkedsquares.length;var STEP=0;for(var walkstepper=0;walkstepper<WALKLENGTH;walkstepper++){POS=walkedsquares[walkstepper];STEP++;if(WALKLENGTH===2&&STEP===2){ARTIFACTS['oppmoves'][POS]={};}}}}return{mytowercount:2*Object.keys(UNITLAYERS.mytowers).length,mywallpos:Object.keys(UNITLAYERS.mytowers).reduce(function(mem,pos){return mem+(mybasic[pos]||0);},0),mytowerpos:2*Object.keys(UNITLAYERS.mytowers).reduce(function(mem,pos){return mem+(mybasic[pos]||0);},0),oppwinmoves:-100*Object.keys(function(){var k,ret={},s0=ARTIFACTS.oppmoves,s1=TERRAIN.myhomerow;for(k in s0){ret[k]=1;}for(k in s1){ret[k]=1;}return ret;}()).length};};game.brain_Clive_1=function(step){var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;ARTIFACTS.mymoves={};ARTIFACTS.oppmoves={};var BLOCKS=function(){var k,ret={},s0=UNITLAYERS.towers,s1=UNITLAYERS.oppwalls;for(k in s0){ret[k]=1;}for(k in s1){ret[k]=1;}return ret;}();var walkstarts=UNITLAYERS.mytowers;for(var STARTPOS in walkstarts){var allwalkerdirs=[1,2,3,4,5,6,7,8];for(var walkerdirnbr=0;walkerdirnbr<8;walkerdirnbr++){var walkedsquares=[];var MAX=2;var POS=STARTPOS;var LENGTH=0;while(LENGTH<MAX&&(POS=connections[POS][allwalkerdirs[walkerdirnbr]])&&!BLOCKS[POS]){walkedsquares.push(POS);LENGTH++;}var WALKLENGTH=walkedsquares.length;var STEP=0;for(var walkstepper=0;walkstepper<WALKLENGTH;walkstepper++){POS=walkedsquares[walkstepper];STEP++;if(WALKLENGTH===2&&STEP===2){ARTIFACTS['mymoves'][POS]={};}}}}var BLOCKS=function(){var k,ret={},s0=UNITLAYERS.towers,s1=UNITLAYERS.mywalls;for(k in s0){ret[k]=1;}for(k in s1){ret[k]=1;}return ret;}();var walkstarts=UNITLAYERS.opptowers;for(var STARTPOS in walkstarts){var allwalkerdirs=[1,2,3,4,5,6,7,8];for(var walkerdirnbr=0;walkerdirnbr<8;walkerdirnbr++){var walkedsquares=[];var MAX=2;var POS=STARTPOS;var LENGTH=0;while(LENGTH<MAX&&(POS=connections[POS][allwalkerdirs[walkerdirnbr]])&&!BLOCKS[POS]){walkedsquares.push(POS);LENGTH++;}var WALKLENGTH=walkedsquares.length;var STEP=0;for(var walkstepper=0;walkstepper<WALKLENGTH;walkstepper++){POS=walkedsquares[walkstepper];STEP++;if(WALKLENGTH===2&&STEP===2){ARTIFACTS['oppmoves'][POS]={};}}}}return Object.keys(ARTIFACTS.mymoves).length+3*Object.keys(UNITLAYERS.mytowers).reduce(function(mem,pos){return mem+(mybasic[pos]||0);},0)+Object.keys(UNITLAYERS.mytowers).reduce(function(mem,pos){return mem+(mybasic[pos]||0);},0)-Object.keys(ARTIFACTS.oppmoves).length;};game.brain_Clive_1_detailed=function(step){var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;ARTIFACTS.mymoves={};ARTIFACTS.oppmoves={};var BLOCKS=function(){var k,ret={},s0=UNITLAYERS.towers,s1=UNITLAYERS.oppwalls;for(k in s0){ret[k]=1;}for(k in s1){ret[k]=1;}return ret;}();var walkstarts=UNITLAYERS.mytowers;for(var STARTPOS in walkstarts){var allwalkerdirs=[1,2,3,4,5,6,7,8];for(var walkerdirnbr=0;walkerdirnbr<8;walkerdirnbr++){var walkedsquares=[];var MAX=2;var POS=STARTPOS;var LENGTH=0;while(LENGTH<MAX&&(POS=connections[POS][allwalkerdirs[walkerdirnbr]])&&!BLOCKS[POS]){walkedsquares.push(POS);LENGTH++;}var WALKLENGTH=walkedsquares.length;var STEP=0;for(var walkstepper=0;walkstepper<WALKLENGTH;walkstepper++){POS=walkedsquares[walkstepper];STEP++;if(WALKLENGTH===2&&STEP===2){ARTIFACTS['mymoves'][POS]={};}}}}var BLOCKS=function(){var k,ret={},s0=UNITLAYERS.towers,s1=UNITLAYERS.mywalls;for(k in s0){ret[k]=1;}for(k in s1){ret[k]=1;}return ret;}();var walkstarts=UNITLAYERS.opptowers;for(var STARTPOS in walkstarts){var allwalkerdirs=[1,2,3,4,5,6,7,8];for(var walkerdirnbr=0;walkerdirnbr<8;walkerdirnbr++){var walkedsquares=[];var MAX=2;var POS=STARTPOS;var LENGTH=0;while(LENGTH<MAX&&(POS=connections[POS][allwalkerdirs[walkerdirnbr]])&&!BLOCKS[POS]){walkedsquares.push(POS);LENGTH++;}var WALKLENGTH=walkedsquares.length;var STEP=0;for(var walkstepper=0;walkstepper<WALKLENGTH;walkstepper++){POS=walkedsquares[walkstepper];STEP++;if(WALKLENGTH===2&&STEP===2){ARTIFACTS['oppmoves'][POS]={};}}}}return{mymoves:Object.keys(ARTIFACTS.mymoves).length,mytowerpos:3*Object.keys(UNITLAYERS.mytowers).reduce(function(mem,pos){return mem+(mybasic[pos]||0);},0),mywallpos:Object.keys(UNITLAYERS.mytowers).reduce(function(mem,pos){return mem+(mybasic[pos]||0);},0),oppmoves:-Object.keys(ARTIFACTS.oppmoves).length};};game.debug1=function(){return{TERRAIN:TERRAIN};};})();(function(){var TERRAIN={"homerow":{"a1":{"pos":"a1","owner":1},"b1":{"pos":"b1","owner":1},"c1":{"pos":"c1","owner":1},"d1":{"pos":"d1","owner":1},"e1":{"pos":"e1","owner":1},"f1":{"pos":"f1","owner":1},"g1":{"pos":"g1","owner":1},"h1":{"pos":"h1","owner":1},"a7":{"pos":"a7","owner":2},"b7":{"pos":"b7","owner":2},"c7":{"pos":"c7","owner":2},"d7":{"pos":"d7","owner":2},"e7":{"pos":"e7","owner":2},"f7":{"pos":"f7","owner":2},"g7":{"pos":"g7","owner":2},"h7":{"pos":"h7","owner":2}},"opphomerow":{"a1":{"pos":"a1","owner":1},"b1":{"pos":"b1","owner":1},"c1":{"pos":"c1","owner":1},"d1":{"pos":"d1","owner":1},"e1":{"pos":"e1","owner":1},"f1":{"pos":"f1","owner":1},"g1":{"pos":"g1","owner":1},"h1":{"pos":"h1","owner":1}},"myhomerow":{"a7":{"pos":"a7","owner":2},"b7":{"pos":"b7","owner":2},"c7":{"pos":"c7","owner":2},"d7":{"pos":"d7","owner":2},"e7":{"pos":"e7","owner":2},"f7":{"pos":"f7","owner":2},"g7":{"pos":"g7","owner":2},"h7":{"pos":"h7","owner":2}},"threatrow":{"a3":{"pos":"a3","owner":1},"b3":{"pos":"b3","owner":1},"c3":{"pos":"c3","owner":1},"d3":{"pos":"d3","owner":1},"e3":{"pos":"e3","owner":1},"f3":{"pos":"f3","owner":1},"g3":{"pos":"g3","owner":1},"h3":{"pos":"h3","owner":1},"a5":{"pos":"a5","owner":2},"b5":{"pos":"b5","owner":2},"c5":{"pos":"c5","owner":2},"d5":{"pos":"d5","owner":2},"e5":{"pos":"e5","owner":2},"f5":{"pos":"f5","owner":2},"g5":{"pos":"g5","owner":2},"h5":{"pos":"h5","owner":2}},"oppthreatrow":{"a3":{"pos":"a3","owner":1},"b3":{"pos":"b3","owner":1},"c3":{"pos":"c3","owner":1},"d3":{"pos":"d3","owner":1},"e3":{"pos":"e3","owner":1},"f3":{"pos":"f3","owner":1},"g3":{"pos":"g3","owner":1},"h3":{"pos":"h3","owner":1}},"mythreatrow":{"a5":{"pos":"a5","owner":2},"b5":{"pos":"b5","owner":2},"c5":{"pos":"c5","owner":2},"d5":{"pos":"d5","owner":2},"e5":{"pos":"e5","owner":2},"f5":{"pos":"f5","owner":2},"g5":{"pos":"g5","owner":2},"h5":{"pos":"h5","owner":2}}};var ownernames=["neutral","opp","my"];var player=2;var otherplayer=1;var oppbasic={"h1":0,"g1":0,"f1":0,"e1":0,"d1":0,"c1":0,"b1":0,"a1":0,"h2":0,"g2":0,"f2":1,"e2":1,"d2":1,"c2":1,"b2":0,"a2":0,"h3":0,"g3":0,"f3":2,"e3":2,"d3":2,"c3":2,"b3":0,"a3":0,"h4":0,"g4":0,"f4":3,"e4":3,"d4":3,"c4":3,"b4":0,"a4":0,"h5":2,"g5":3,"f5":4,"e5":4,"d5":4,"c5":4,"b5":3,"a5":2,"h6":1,"g6":1,"f6":1,"e6":1,"d6":1,"c6":1,"b6":1,"a6":1,"h7":0,"g7":0,"f7":0,"e7":0,"d7":0,"c7":0,"b7":0,"a7":0};var mybasic={"h1":0,"g1":0,"f1":0,"e1":0,"d1":0,"c1":0,"b1":0,"a1":0,"h2":1,"g2":1,"f2":1,"e2":1,"d2":1,"c2":1,"b2":1,"a2":1,"h3":2,"g3":3,"f3":4,"e3":4,"d3":4,"c3":4,"b3":3,"a3":2,"h4":0,"g4":0,"f4":3,"e4":3,"d4":3,"c4":3,"b4":0,"a4":0,"h5":0,"g5":0,"f5":2,"e5":2,"d5":2,"c5":2,"b5":0,"a5":0,"h6":0,"g6":0,"f6":1,"e6":1,"d6":1,"c6":1,"b6":0,"a6":0,"h7":0,"g7":0,"f7":0,"e7":0,"d7":0,"c7":0,"b7":0,"a7":0};game.selecttower2=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{movetargets:Object.assign({},step.ARTIFACTS.movetargets),killtargets:Object.assign({},step.ARTIFACTS.killtargets)});var UNITLAYERS=step.UNITLAYERS;var MARKS={selecttower:markpos};var BLOCKS=function(){var k,ret={},s0=UNITLAYERS.oppunits,s1=UNITLAYERS.mytowers;for(k in s0){ret[k]=1;}for(k in s1){ret[k]=1;}return ret;}();var STARTPOS=MARKS['selecttower'];var allwalkerdirs=[1,2,3,4,5,6,7,8];for(var walkerdirnbr=0;walkerdirnbr<8;walkerdirnbr++){var DIR=allwalkerdirs[walkerdirnbr];var walkedsquares=[];var MAX=2;var POS=STARTPOS;var LENGTH=0;while(LENGTH<MAX&&(POS=connections[POS][DIR])&&!BLOCKS[POS]){walkedsquares.push(POS);LENGTH++;}var WALKLENGTH=walkedsquares.length;var STEP=0;for(var walkstepper=0;walkstepper<WALKLENGTH;walkstepper++){POS=walkedsquares[walkstepper];STEP++;if(WALKLENGTH===2&&STEP===2){ARTIFACTS['movetargets'][POS]={dir:DIR};}}}var STARTPOS=MARKS['selecttower'];var neighbourdirs=[1,2,3,4,5,6,7,8];var startconnections=connections[STARTPOS];for(var dirnbr=0;dirnbr<8;dirnbr++){var POS=startconnections[neighbourdirs[dirnbr]];if(POS&&UNITLAYERS.oppwalls[POS]){ARTIFACTS['killtargets'][POS]={};}}var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selecttower'});turn.links[newstepid]={};var newlinks=turn.links[newstepid];for(var linkpos in ARTIFACTS.movetargets){newlinks[linkpos]='selectmove2';}var newlinks=turn.links[newstepid];for(var linkpos in ARTIFACTS.killtargets){newlinks[linkpos]='selectkill2';}return newstep;};game.selecttower2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.selectmove2=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{madetowers:Object.assign({},step.ARTIFACTS.madetowers),madewalls:Object.assign({},step.ARTIFACTS.madewalls)});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectmove:markpos,selecttower:step.MARKS.selecttower};var STARTPOS=MARKS['selectmove'];var POS=connections[STARTPOS][relativedirs[(ARTIFACTS.movetargets[MARKS['selectmove']]||{})['dir']-2+5]];if(POS){ARTIFACTS[!!UNITLAYERS.myunits[POS]?'madetowers':'madewalls'][POS]={};}ARTIFACTS[!!UNITLAYERS.myunits[MARKS['selectmove']]?'madetowers':'madewalls'][STARTPOS]={};var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectmove'});turn.links[newstepid]={};turn.links[newstepid].move='move2';return newstep;};game.selectmove2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.selectkill2=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectkill:markpos,selecttower:step.MARKS.selecttower};var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectkill'});turn.links[newstepid]={};turn.links[newstepid].kill='kill2';return newstep;};game.selectkill2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.move2=function(turn,step){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var MARKS=step.MARKS;var UNITDATA=Object.assign({},step.UNITDATA);var clones=step.clones;var UNITLAYERS=step.UNITLAYERS;delete UNITDATA[(UNITLAYERS.units[MARKS['selecttower']]||{}).id];for(var POS in ARTIFACTS.madetowers){var unitid=(UNITLAYERS.units[POS]||{}).id;if(unitid){UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{'group':'towers'});}}for(var POS in ARTIFACTS.madewalls){var newunitid='spawn'+clones++;UNITDATA[newunitid]={pos:POS,id:newunitid,group:'walls',owner:2,from:MARKS['selecttower']};}MARKS={};UNITLAYERS={"towers":{},"mytowers":{},"opptowers":{},"neutraltowers":{},"walls":{},"mywalls":{},"oppwalls":{},"neutralwalls":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}ARTIFACTS={"movetargets":{},"madetowers":{},"madewalls":{},"killtargets":{}};var newstepid=step.stepid+'-'+'move';var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,stepid:newstepid,name:'move',path:step.path.concat('move'),clones:clones});turn.links[newstepid]={};if(Object.keys(function(){var ret={},s0=UNITLAYERS.myunits,s1=TERRAIN.opphomerow;for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}()||{}).length!==0){var winner=2;var result=winner===2?'win':winner?'lose':'draw';turn.links[newstepid][result]='infiltration';}else turn.links[newstepid].endturn="start"+otherplayer;return newstep;};game.move2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.kill2=function(turn,step){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var MARKS=step.MARKS;var UNITDATA=Object.assign({},step.UNITDATA);var UNITLAYERS=step.UNITLAYERS;var unitid=(UNITLAYERS.units[MARKS['selecttower']]||{}).id;if(unitid){UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{'group':'walls'});}delete UNITDATA[(UNITLAYERS.units[MARKS['selectkill']]||{}).id];MARKS={};UNITLAYERS={"towers":{},"mytowers":{},"opptowers":{},"neutraltowers":{},"walls":{},"mywalls":{},"oppwalls":{},"neutralwalls":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}ARTIFACTS={"movetargets":{},"madetowers":{},"madewalls":{},"killtargets":{}};var newstepid=step.stepid+'-'+'kill';var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,stepid:newstepid,name:'kill',path:step.path.concat('kill')});turn.links[newstepid]={};if(Object.keys(function(){var ret={},s0=UNITLAYERS.myunits,s1=TERRAIN.opphomerow;for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}()||{}).length!==0){var winner=2;var result=winner===2?'win':winner?'lose':'draw';turn.links[newstepid][result]='infiltration';}else turn.links[newstepid].endturn="start"+otherplayer;return newstep;};game.kill2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.start2=function(turn,step){var turn={steps:{},player:player,turn:turn.turn+1,links:{root:{}}};var MARKS={};var ARTIFACTS={"movetargets":{},"madetowers":{},"madewalls":{},"killtargets":{}};var UNITDATA=step.UNITDATA;var UNITLAYERS={"towers":{},"mytowers":{},"opptowers":{},"neutraltowers":{},"walls":{},"mywalls":{},"oppwalls":{},"neutralwalls":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}var newstep=turn.steps.root={ARTIFACTS:ARTIFACTS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,MARKS:MARKS,stepid:'root',name:'start',clones:step.clones,path:[]};var newlinks=turn.links.root;for(var linkpos in UNITLAYERS.mytowers){newlinks[linkpos]='selecttower2';}return turn;};game.start2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.brain_Steve_2=function(step){var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;ARTIFACTS.oppmoves={};ARTIFACTS.oppheavythreats={};ARTIFACTS.opplightthreats={};var BLOCKS=function(){var k,ret={},s0=UNITLAYERS.towers,s1=UNITLAYERS.mywalls;for(k in s0){ret[k]=1;}for(k in s1){ret[k]=1;}return ret;}();var walkstarts=UNITLAYERS.opptowers;for(var STARTPOS in walkstarts){var allwalkerdirs=[1,2,3,4,5,6,7,8];for(var walkerdirnbr=0;walkerdirnbr<8;walkerdirnbr++){var walkedsquares=[];var MAX=2;var POS=STARTPOS;var LENGTH=0;while(LENGTH<MAX&&(POS=connections[POS][allwalkerdirs[walkerdirnbr]])&&!BLOCKS[POS]){walkedsquares.push(POS);LENGTH++;}var WALKLENGTH=walkedsquares.length;var STEP=0;for(var walkstepper=0;walkstepper<WALKLENGTH;walkstepper++){POS=walkedsquares[walkstepper];STEP++;if(WALKLENGTH===2&&STEP===2){ARTIFACTS['oppmoves'][POS]={};}}}}var filtersourcelayer=TERRAIN.mythreatrow;for(var POS in filtersourcelayer){var filtertargetlayer=ARTIFACTS[!!UNITLAYERS.oppwalls[POS]?'oppheavythreats':'opplightthreats'];if(filtersourcelayer[POS]){var filterobj=filtersourcelayer[POS];if(!!ARTIFACTS.oppmoves[POS]){filtertargetlayer[POS]=filterobj;}}}return 2*Object.keys(UNITLAYERS.mytowers).length+Object.keys(UNITLAYERS.mytowers).reduce(function(mem,pos){return mem+(mybasic[pos]||0);},0)+2*Object.keys(UNITLAYERS.mytowers).reduce(function(mem,pos){return mem+(mybasic[pos]||0);},0)-10000*Object.keys(function(){var k,ret={},s0=ARTIFACTS.oppmoves,s1=TERRAIN.myhomerow;for(k in s0){ret[k]=1;}for(k in s1){ret[k]=1;}return ret;}()).length-20*Object.keys(ARTIFACTS.opplightthreats).length-500*Object.keys(ARTIFACTS.oppheavythreats).length;};game.brain_Steve_2_detailed=function(step){var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;ARTIFACTS.oppmoves={};ARTIFACTS.oppheavythreats={};ARTIFACTS.opplightthreats={};var BLOCKS=function(){var k,ret={},s0=UNITLAYERS.towers,s1=UNITLAYERS.mywalls;for(k in s0){ret[k]=1;}for(k in s1){ret[k]=1;}return ret;}();var walkstarts=UNITLAYERS.opptowers;for(var STARTPOS in walkstarts){var allwalkerdirs=[1,2,3,4,5,6,7,8];for(var walkerdirnbr=0;walkerdirnbr<8;walkerdirnbr++){var walkedsquares=[];var MAX=2;var POS=STARTPOS;var LENGTH=0;while(LENGTH<MAX&&(POS=connections[POS][allwalkerdirs[walkerdirnbr]])&&!BLOCKS[POS]){walkedsquares.push(POS);LENGTH++;}var WALKLENGTH=walkedsquares.length;var STEP=0;for(var walkstepper=0;walkstepper<WALKLENGTH;walkstepper++){POS=walkedsquares[walkstepper];STEP++;if(WALKLENGTH===2&&STEP===2){ARTIFACTS['oppmoves'][POS]={};}}}}var filtersourcelayer=TERRAIN.mythreatrow;for(var POS in filtersourcelayer){var filtertargetlayer=ARTIFACTS[!!UNITLAYERS.oppwalls[POS]?'oppheavythreats':'opplightthreats'];if(filtersourcelayer[POS]){var filterobj=filtersourcelayer[POS];if(!!ARTIFACTS.oppmoves[POS]){filtertargetlayer[POS]=filterobj;}}}return{mytowercount:2*Object.keys(UNITLAYERS.mytowers).length,mywallpos:Object.keys(UNITLAYERS.mytowers).reduce(function(mem,pos){return mem+(mybasic[pos]||0);},0),mytowerpos:2*Object.keys(UNITLAYERS.mytowers).reduce(function(mem,pos){return mem+(mybasic[pos]||0);},0),oppwinmoves:-10000*Object.keys(function(){var k,ret={},s0=ARTIFACTS.oppmoves,s1=TERRAIN.myhomerow;for(k in s0){ret[k]=1;}for(k in s1){ret[k]=1;}return ret;}()).length,opplightthreats:-20*Object.keys(ARTIFACTS.opplightthreats).length,oppheavythreats:-500*Object.keys(ARTIFACTS.oppheavythreats).length};};game.brain_Joe_2=function(step){var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;ARTIFACTS.oppmoves={};var BLOCKS=function(){var k,ret={},s0=UNITLAYERS.towers,s1=UNITLAYERS.mywalls;for(k in s0){ret[k]=1;}for(k in s1){ret[k]=1;}return ret;}();var walkstarts=UNITLAYERS.opptowers;for(var STARTPOS in walkstarts){var allwalkerdirs=[1,2,3,4,5,6,7,8];for(var walkerdirnbr=0;walkerdirnbr<8;walkerdirnbr++){var walkedsquares=[];var MAX=2;var POS=STARTPOS;var LENGTH=0;while(LENGTH<MAX&&(POS=connections[POS][allwalkerdirs[walkerdirnbr]])&&!BLOCKS[POS]){walkedsquares.push(POS);LENGTH++;}var WALKLENGTH=walkedsquares.length;var STEP=0;for(var walkstepper=0;walkstepper<WALKLENGTH;walkstepper++){POS=walkedsquares[walkstepper];STEP++;if(WALKLENGTH===2&&STEP===2){ARTIFACTS['oppmoves'][POS]={};}}}}return 2*Object.keys(UNITLAYERS.mytowers).length+Object.keys(UNITLAYERS.mytowers).reduce(function(mem,pos){return mem+(mybasic[pos]||0);},0)+2*Object.keys(UNITLAYERS.mytowers).reduce(function(mem,pos){return mem+(mybasic[pos]||0);},0)-100*Object.keys(function(){var k,ret={},s0=ARTIFACTS.oppmoves,s1=TERRAIN.myhomerow;for(k in s0){ret[k]=1;}for(k in s1){ret[k]=1;}return ret;}()).length;};game.brain_Joe_2_detailed=function(step){var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;ARTIFACTS.oppmoves={};var BLOCKS=function(){var k,ret={},s0=UNITLAYERS.towers,s1=UNITLAYERS.mywalls;for(k in s0){ret[k]=1;}for(k in s1){ret[k]=1;}return ret;}();var walkstarts=UNITLAYERS.opptowers;for(var STARTPOS in walkstarts){var allwalkerdirs=[1,2,3,4,5,6,7,8];for(var walkerdirnbr=0;walkerdirnbr<8;walkerdirnbr++){var walkedsquares=[];var MAX=2;var POS=STARTPOS;var LENGTH=0;while(LENGTH<MAX&&(POS=connections[POS][allwalkerdirs[walkerdirnbr]])&&!BLOCKS[POS]){walkedsquares.push(POS);LENGTH++;}var WALKLENGTH=walkedsquares.length;var STEP=0;for(var walkstepper=0;walkstepper<WALKLENGTH;walkstepper++){POS=walkedsquares[walkstepper];STEP++;if(WALKLENGTH===2&&STEP===2){ARTIFACTS['oppmoves'][POS]={};}}}}return{mytowercount:2*Object.keys(UNITLAYERS.mytowers).length,mywallpos:Object.keys(UNITLAYERS.mytowers).reduce(function(mem,pos){return mem+(mybasic[pos]||0);},0),mytowerpos:2*Object.keys(UNITLAYERS.mytowers).reduce(function(mem,pos){return mem+(mybasic[pos]||0);},0),oppwinmoves:-100*Object.keys(function(){var k,ret={},s0=ARTIFACTS.oppmoves,s1=TERRAIN.myhomerow;for(k in s0){ret[k]=1;}for(k in s1){ret[k]=1;}return ret;}()).length};};game.brain_Clive_2=function(step){var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;ARTIFACTS.mymoves={};ARTIFACTS.oppmoves={};var BLOCKS=function(){var k,ret={},s0=UNITLAYERS.towers,s1=UNITLAYERS.oppwalls;for(k in s0){ret[k]=1;}for(k in s1){ret[k]=1;}return ret;}();var walkstarts=UNITLAYERS.mytowers;for(var STARTPOS in walkstarts){var allwalkerdirs=[1,2,3,4,5,6,7,8];for(var walkerdirnbr=0;walkerdirnbr<8;walkerdirnbr++){var walkedsquares=[];var MAX=2;var POS=STARTPOS;var LENGTH=0;while(LENGTH<MAX&&(POS=connections[POS][allwalkerdirs[walkerdirnbr]])&&!BLOCKS[POS]){walkedsquares.push(POS);LENGTH++;}var WALKLENGTH=walkedsquares.length;var STEP=0;for(var walkstepper=0;walkstepper<WALKLENGTH;walkstepper++){POS=walkedsquares[walkstepper];STEP++;if(WALKLENGTH===2&&STEP===2){ARTIFACTS['mymoves'][POS]={};}}}}var BLOCKS=function(){var k,ret={},s0=UNITLAYERS.towers,s1=UNITLAYERS.mywalls;for(k in s0){ret[k]=1;}for(k in s1){ret[k]=1;}return ret;}();var walkstarts=UNITLAYERS.opptowers;for(var STARTPOS in walkstarts){var allwalkerdirs=[1,2,3,4,5,6,7,8];for(var walkerdirnbr=0;walkerdirnbr<8;walkerdirnbr++){var walkedsquares=[];var MAX=2;var POS=STARTPOS;var LENGTH=0;while(LENGTH<MAX&&(POS=connections[POS][allwalkerdirs[walkerdirnbr]])&&!BLOCKS[POS]){walkedsquares.push(POS);LENGTH++;}var WALKLENGTH=walkedsquares.length;var STEP=0;for(var walkstepper=0;walkstepper<WALKLENGTH;walkstepper++){POS=walkedsquares[walkstepper];STEP++;if(WALKLENGTH===2&&STEP===2){ARTIFACTS['oppmoves'][POS]={};}}}}return Object.keys(ARTIFACTS.mymoves).length+3*Object.keys(UNITLAYERS.mytowers).reduce(function(mem,pos){return mem+(mybasic[pos]||0);},0)+Object.keys(UNITLAYERS.mytowers).reduce(function(mem,pos){return mem+(mybasic[pos]||0);},0)-Object.keys(ARTIFACTS.oppmoves).length;};game.brain_Clive_2_detailed=function(step){var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;ARTIFACTS.mymoves={};ARTIFACTS.oppmoves={};var BLOCKS=function(){var k,ret={},s0=UNITLAYERS.towers,s1=UNITLAYERS.oppwalls;for(k in s0){ret[k]=1;}for(k in s1){ret[k]=1;}return ret;}();var walkstarts=UNITLAYERS.mytowers;for(var STARTPOS in walkstarts){var allwalkerdirs=[1,2,3,4,5,6,7,8];for(var walkerdirnbr=0;walkerdirnbr<8;walkerdirnbr++){var walkedsquares=[];var MAX=2;var POS=STARTPOS;var LENGTH=0;while(LENGTH<MAX&&(POS=connections[POS][allwalkerdirs[walkerdirnbr]])&&!BLOCKS[POS]){walkedsquares.push(POS);LENGTH++;}var WALKLENGTH=walkedsquares.length;var STEP=0;for(var walkstepper=0;walkstepper<WALKLENGTH;walkstepper++){POS=walkedsquares[walkstepper];STEP++;if(WALKLENGTH===2&&STEP===2){ARTIFACTS['mymoves'][POS]={};}}}}var BLOCKS=function(){var k,ret={},s0=UNITLAYERS.towers,s1=UNITLAYERS.mywalls;for(k in s0){ret[k]=1;}for(k in s1){ret[k]=1;}return ret;}();var walkstarts=UNITLAYERS.opptowers;for(var STARTPOS in walkstarts){var allwalkerdirs=[1,2,3,4,5,6,7,8];for(var walkerdirnbr=0;walkerdirnbr<8;walkerdirnbr++){var walkedsquares=[];var MAX=2;var POS=STARTPOS;var LENGTH=0;while(LENGTH<MAX&&(POS=connections[POS][allwalkerdirs[walkerdirnbr]])&&!BLOCKS[POS]){walkedsquares.push(POS);LENGTH++;}var WALKLENGTH=walkedsquares.length;var STEP=0;for(var walkstepper=0;walkstepper<WALKLENGTH;walkstepper++){POS=walkedsquares[walkstepper];STEP++;if(WALKLENGTH===2&&STEP===2){ARTIFACTS['oppmoves'][POS]={};}}}}return{mymoves:Object.keys(ARTIFACTS.mymoves).length,mytowerpos:3*Object.keys(UNITLAYERS.mytowers).reduce(function(mem,pos){return mem+(mybasic[pos]||0);},0),mywallpos:Object.keys(UNITLAYERS.mytowers).reduce(function(mem,pos){return mem+(mybasic[pos]||0);},0),oppmoves:-Object.keys(ARTIFACTS.oppmoves).length};};game.debug2=function(){return{TERRAIN:TERRAIN};};})();function reduce(coll,iterator,acc){for(var key in coll){acc=iterator(acc,coll[key],key);}return acc;}game.newGame=function(){var turnseed={turn:0};var stepseed={UNITDATA:{"unit1":{"pos":"a1","id":"unit1","group":"towers","owner":1},"unit2":{"pos":"b1","id":"unit2","group":"towers","owner":1},"unit3":{"pos":"c1","id":"unit3","group":"towers","owner":1},"unit4":{"pos":"d1","id":"unit4","group":"towers","owner":1},"unit5":{"pos":"e1","id":"unit5","group":"towers","owner":1},"unit6":{"pos":"f1","id":"unit6","group":"towers","owner":1},"unit7":{"pos":"g1","id":"unit7","group":"towers","owner":1},"unit8":{"pos":"h1","id":"unit8","group":"towers","owner":1},"unit9":{"pos":"a7","id":"unit9","group":"towers","owner":2},"unit10":{"pos":"b7","id":"unit10","group":"towers","owner":2},"unit11":{"pos":"c7","id":"unit11","group":"towers","owner":2},"unit12":{"pos":"d7","id":"unit12","group":"towers","owner":2},"unit13":{"pos":"e7","id":"unit13","group":"towers","owner":2},"unit14":{"pos":"f7","id":"unit14","group":"towers","owner":2},"unit15":{"pos":"g7","id":"unit15","group":"towers","owner":2},"unit16":{"pos":"h7","id":"unit16","group":"towers","owner":2}},clones:0};return game.start1(turnseed,stepseed);};game.debug=function(){return{BOARD:BOARD,connections:connections,plr1:game.debug1(),plr2:game.debug2()};};game.commands={"move":1,"kill":1};game.graphics={"tiles":{"homerow":"playercolour"},"icons":{"towers":"rooks","walls":"pawns"}};game.board={"height":7,"width":8,"terrain":{"homerow":{"1":[["rect","a1","h1"]],"2":[["rect","a7","h7"]]}}};game.AI=["Steve","Joe","Clive"];game.id="murusgallicus";return game;}(),murusgallicusadvanced:function(){var game={};var connections={"faux":{},"a1":{"1":"a2","2":"b2","3":"b1"},"a2":{"1":"a3","2":"b3","3":"b2","4":"b1","5":"a1"},"a3":{"1":"a4","2":"b4","3":"b3","4":"b2","5":"a2"},"a4":{"1":"a5","2":"b5","3":"b4","4":"b3","5":"a3"},"a5":{"1":"a6","2":"b6","3":"b5","4":"b4","5":"a4"},"a6":{"1":"a7","2":"b7","3":"b6","4":"b5","5":"a5"},"a7":{"3":"b7","4":"b6","5":"a6"},"b1":{"1":"b2","2":"c2","3":"c1","7":"a1","8":"a2"},"b2":{"1":"b3","2":"c3","3":"c2","4":"c1","5":"b1","6":"a1","7":"a2","8":"a3"},"b3":{"1":"b4","2":"c4","3":"c3","4":"c2","5":"b2","6":"a2","7":"a3","8":"a4"},"b4":{"1":"b5","2":"c5","3":"c4","4":"c3","5":"b3","6":"a3","7":"a4","8":"a5"},"b5":{"1":"b6","2":"c6","3":"c5","4":"c4","5":"b4","6":"a4","7":"a5","8":"a6"},"b6":{"1":"b7","2":"c7","3":"c6","4":"c5","5":"b5","6":"a5","7":"a6","8":"a7"},"b7":{"3":"c7","4":"c6","5":"b6","6":"a6","7":"a7"},"c1":{"1":"c2","2":"d2","3":"d1","7":"b1","8":"b2"},"c2":{"1":"c3","2":"d3","3":"d2","4":"d1","5":"c1","6":"b1","7":"b2","8":"b3"},"c3":{"1":"c4","2":"d4","3":"d3","4":"d2","5":"c2","6":"b2","7":"b3","8":"b4"},"c4":{"1":"c5","2":"d5","3":"d4","4":"d3","5":"c3","6":"b3","7":"b4","8":"b5"},"c5":{"1":"c6","2":"d6","3":"d5","4":"d4","5":"c4","6":"b4","7":"b5","8":"b6"},"c6":{"1":"c7","2":"d7","3":"d6","4":"d5","5":"c5","6":"b5","7":"b6","8":"b7"},"c7":{"3":"d7","4":"d6","5":"c6","6":"b6","7":"b7"},"d1":{"1":"d2","2":"e2","3":"e1","7":"c1","8":"c2"},"d2":{"1":"d3","2":"e3","3":"e2","4":"e1","5":"d1","6":"c1","7":"c2","8":"c3"},"d3":{"1":"d4","2":"e4","3":"e3","4":"e2","5":"d2","6":"c2","7":"c3","8":"c4"},"d4":{"1":"d5","2":"e5","3":"e4","4":"e3","5":"d3","6":"c3","7":"c4","8":"c5"},"d5":{"1":"d6","2":"e6","3":"e5","4":"e4","5":"d4","6":"c4","7":"c5","8":"c6"},"d6":{"1":"d7","2":"e7","3":"e6","4":"e5","5":"d5","6":"c5","7":"c6","8":"c7"},"d7":{"3":"e7","4":"e6","5":"d6","6":"c6","7":"c7"},"e1":{"1":"e2","2":"f2","3":"f1","7":"d1","8":"d2"},"e2":{"1":"e3","2":"f3","3":"f2","4":"f1","5":"e1","6":"d1","7":"d2","8":"d3"},"e3":{"1":"e4","2":"f4","3":"f3","4":"f2","5":"e2","6":"d2","7":"d3","8":"d4"},"e4":{"1":"e5","2":"f5","3":"f4","4":"f3","5":"e3","6":"d3","7":"d4","8":"d5"},"e5":{"1":"e6","2":"f6","3":"f5","4":"f4","5":"e4","6":"d4","7":"d5","8":"d6"},"e6":{"1":"e7","2":"f7","3":"f6","4":"f5","5":"e5","6":"d5","7":"d6","8":"d7"},"e7":{"3":"f7","4":"f6","5":"e6","6":"d6","7":"d7"},"f1":{"1":"f2","2":"g2","3":"g1","7":"e1","8":"e2"},"f2":{"1":"f3","2":"g3","3":"g2","4":"g1","5":"f1","6":"e1","7":"e2","8":"e3"},"f3":{"1":"f4","2":"g4","3":"g3","4":"g2","5":"f2","6":"e2","7":"e3","8":"e4"},"f4":{"1":"f5","2":"g5","3":"g4","4":"g3","5":"f3","6":"e3","7":"e4","8":"e5"},"f5":{"1":"f6","2":"g6","3":"g5","4":"g4","5":"f4","6":"e4","7":"e5","8":"e6"},"f6":{"1":"f7","2":"g7","3":"g6","4":"g5","5":"f5","6":"e5","7":"e6","8":"e7"},"f7":{"3":"g7","4":"g6","5":"f6","6":"e6","7":"e7"},"g1":{"1":"g2","2":"h2","3":"h1","7":"f1","8":"f2"},"g2":{"1":"g3","2":"h3","3":"h2","4":"h1","5":"g1","6":"f1","7":"f2","8":"f3"},"g3":{"1":"g4","2":"h4","3":"h3","4":"h2","5":"g2","6":"f2","7":"f3","8":"f4"},"g4":{"1":"g5","2":"h5","3":"h4","4":"h3","5":"g3","6":"f3","7":"f4","8":"f5"},"g5":{"1":"g6","2":"h6","3":"h5","4":"h4","5":"g4","6":"f4","7":"f5","8":"f6"},"g6":{"1":"g7","2":"h7","3":"h6","4":"h5","5":"g5","6":"f5","7":"f6","8":"f7"},"g7":{"3":"h7","4":"h6","5":"g6","6":"f6","7":"f7"},"h1":{"1":"h2","7":"g1","8":"g2"},"h2":{"1":"h3","5":"h1","6":"g1","7":"g2","8":"g3"},"h3":{"1":"h4","5":"h2","6":"g2","7":"g3","8":"g4"},"h4":{"1":"h5","5":"h3","6":"g3","7":"g4","8":"g5"},"h5":{"1":"h6","5":"h4","6":"g4","7":"g5","8":"g6"},"h6":{"1":"h7","5":"h5","6":"g5","7":"g6","8":"g7"},"h7":{"5":"h6","6":"g6","7":"g7"}};var BOARD={"board":{"a1":{"colour":"dark","pos":"a1","x":1,"y":1},"a2":{"colour":"light","pos":"a2","x":1,"y":2},"a3":{"colour":"dark","pos":"a3","x":1,"y":3},"a4":{"colour":"light","pos":"a4","x":1,"y":4},"a5":{"colour":"dark","pos":"a5","x":1,"y":5},"a6":{"colour":"light","pos":"a6","x":1,"y":6},"a7":{"colour":"dark","pos":"a7","x":1,"y":7},"b1":{"colour":"light","pos":"b1","x":2,"y":1},"b2":{"colour":"dark","pos":"b2","x":2,"y":2},"b3":{"colour":"light","pos":"b3","x":2,"y":3},"b4":{"colour":"dark","pos":"b4","x":2,"y":4},"b5":{"colour":"light","pos":"b5","x":2,"y":5},"b6":{"colour":"dark","pos":"b6","x":2,"y":6},"b7":{"colour":"light","pos":"b7","x":2,"y":7},"c1":{"colour":"dark","pos":"c1","x":3,"y":1},"c2":{"colour":"light","pos":"c2","x":3,"y":2},"c3":{"colour":"dark","pos":"c3","x":3,"y":3},"c4":{"colour":"light","pos":"c4","x":3,"y":4},"c5":{"colour":"dark","pos":"c5","x":3,"y":5},"c6":{"colour":"light","pos":"c6","x":3,"y":6},"c7":{"colour":"dark","pos":"c7","x":3,"y":7},"d1":{"colour":"light","pos":"d1","x":4,"y":1},"d2":{"colour":"dark","pos":"d2","x":4,"y":2},"d3":{"colour":"light","pos":"d3","x":4,"y":3},"d4":{"colour":"dark","pos":"d4","x":4,"y":4},"d5":{"colour":"light","pos":"d5","x":4,"y":5},"d6":{"colour":"dark","pos":"d6","x":4,"y":6},"d7":{"colour":"light","pos":"d7","x":4,"y":7},"e1":{"colour":"dark","pos":"e1","x":5,"y":1},"e2":{"colour":"light","pos":"e2","x":5,"y":2},"e3":{"colour":"dark","pos":"e3","x":5,"y":3},"e4":{"colour":"light","pos":"e4","x":5,"y":4},"e5":{"colour":"dark","pos":"e5","x":5,"y":5},"e6":{"colour":"light","pos":"e6","x":5,"y":6},"e7":{"colour":"dark","pos":"e7","x":5,"y":7},"f1":{"colour":"light","pos":"f1","x":6,"y":1},"f2":{"colour":"dark","pos":"f2","x":6,"y":2},"f3":{"colour":"light","pos":"f3","x":6,"y":3},"f4":{"colour":"dark","pos":"f4","x":6,"y":4},"f5":{"colour":"light","pos":"f5","x":6,"y":5},"f6":{"colour":"dark","pos":"f6","x":6,"y":6},"f7":{"colour":"light","pos":"f7","x":6,"y":7},"g1":{"colour":"dark","pos":"g1","x":7,"y":1},"g2":{"colour":"light","pos":"g2","x":7,"y":2},"g3":{"colour":"dark","pos":"g3","x":7,"y":3},"g4":{"colour":"light","pos":"g4","x":7,"y":4},"g5":{"colour":"dark","pos":"g5","x":7,"y":5},"g6":{"colour":"light","pos":"g6","x":7,"y":6},"g7":{"colour":"dark","pos":"g7","x":7,"y":7},"h1":{"colour":"light","pos":"h1","x":8,"y":1},"h2":{"colour":"dark","pos":"h2","x":8,"y":2},"h3":{"colour":"light","pos":"h3","x":8,"y":3},"h4":{"colour":"dark","pos":"h4","x":8,"y":4},"h5":{"colour":"light","pos":"h5","x":8,"y":5},"h6":{"colour":"dark","pos":"h6","x":8,"y":6},"h7":{"colour":"light","pos":"h7","x":8,"y":7}},"light":{"a2":{"colour":"light","pos":"a2","x":1,"y":2},"a4":{"colour":"light","pos":"a4","x":1,"y":4},"a6":{"colour":"light","pos":"a6","x":1,"y":6},"b1":{"colour":"light","pos":"b1","x":2,"y":1},"b3":{"colour":"light","pos":"b3","x":2,"y":3},"b5":{"colour":"light","pos":"b5","x":2,"y":5},"b7":{"colour":"light","pos":"b7","x":2,"y":7},"c2":{"colour":"light","pos":"c2","x":3,"y":2},"c4":{"colour":"light","pos":"c4","x":3,"y":4},"c6":{"colour":"light","pos":"c6","x":3,"y":6},"d1":{"colour":"light","pos":"d1","x":4,"y":1},"d3":{"colour":"light","pos":"d3","x":4,"y":3},"d5":{"colour":"light","pos":"d5","x":4,"y":5},"d7":{"colour":"light","pos":"d7","x":4,"y":7},"e2":{"colour":"light","pos":"e2","x":5,"y":2},"e4":{"colour":"light","pos":"e4","x":5,"y":4},"e6":{"colour":"light","pos":"e6","x":5,"y":6},"f1":{"colour":"light","pos":"f1","x":6,"y":1},"f3":{"colour":"light","pos":"f3","x":6,"y":3},"f5":{"colour":"light","pos":"f5","x":6,"y":5},"f7":{"colour":"light","pos":"f7","x":6,"y":7},"g2":{"colour":"light","pos":"g2","x":7,"y":2},"g4":{"colour":"light","pos":"g4","x":7,"y":4},"g6":{"colour":"light","pos":"g6","x":7,"y":6},"h1":{"colour":"light","pos":"h1","x":8,"y":1},"h3":{"colour":"light","pos":"h3","x":8,"y":3},"h5":{"colour":"light","pos":"h5","x":8,"y":5},"h7":{"colour":"light","pos":"h7","x":8,"y":7}},"dark":{"a1":{"colour":"dark","pos":"a1","x":1,"y":1},"a3":{"colour":"dark","pos":"a3","x":1,"y":3},"a5":{"colour":"dark","pos":"a5","x":1,"y":5},"a7":{"colour":"dark","pos":"a7","x":1,"y":7},"b2":{"colour":"dark","pos":"b2","x":2,"y":2},"b4":{"colour":"dark","pos":"b4","x":2,"y":4},"b6":{"colour":"dark","pos":"b6","x":2,"y":6},"c1":{"colour":"dark","pos":"c1","x":3,"y":1},"c3":{"colour":"dark","pos":"c3","x":3,"y":3},"c5":{"colour":"dark","pos":"c5","x":3,"y":5},"c7":{"colour":"dark","pos":"c7","x":3,"y":7},"d2":{"colour":"dark","pos":"d2","x":4,"y":2},"d4":{"colour":"dark","pos":"d4","x":4,"y":4},"d6":{"colour":"dark","pos":"d6","x":4,"y":6},"e1":{"colour":"dark","pos":"e1","x":5,"y":1},"e3":{"colour":"dark","pos":"e3","x":5,"y":3},"e5":{"colour":"dark","pos":"e5","x":5,"y":5},"e7":{"colour":"dark","pos":"e7","x":5,"y":7},"f2":{"colour":"dark","pos":"f2","x":6,"y":2},"f4":{"colour":"dark","pos":"f4","x":6,"y":4},"f6":{"colour":"dark","pos":"f6","x":6,"y":6},"g1":{"colour":"dark","pos":"g1","x":7,"y":1},"g3":{"colour":"dark","pos":"g3","x":7,"y":3},"g5":{"colour":"dark","pos":"g5","x":7,"y":5},"g7":{"colour":"dark","pos":"g7","x":7,"y":7},"h2":{"colour":"dark","pos":"h2","x":8,"y":2},"h4":{"colour":"dark","pos":"h4","x":8,"y":4},"h6":{"colour":"dark","pos":"h6","x":8,"y":6}}};var relativedirs=[1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];(function(){var TERRAIN={"homerow":{"a1":{"pos":"a1","owner":1},"b1":{"pos":"b1","owner":1},"c1":{"pos":"c1","owner":1},"d1":{"pos":"d1","owner":1},"e1":{"pos":"e1","owner":1},"f1":{"pos":"f1","owner":1},"g1":{"pos":"g1","owner":1},"h1":{"pos":"h1","owner":1},"a7":{"pos":"a7","owner":2},"b7":{"pos":"b7","owner":2},"c7":{"pos":"c7","owner":2},"d7":{"pos":"d7","owner":2},"e7":{"pos":"e7","owner":2},"f7":{"pos":"f7","owner":2},"g7":{"pos":"g7","owner":2},"h7":{"pos":"h7","owner":2}},"myhomerow":{"a1":{"pos":"a1","owner":1},"b1":{"pos":"b1","owner":1},"c1":{"pos":"c1","owner":1},"d1":{"pos":"d1","owner":1},"e1":{"pos":"e1","owner":1},"f1":{"pos":"f1","owner":1},"g1":{"pos":"g1","owner":1},"h1":{"pos":"h1","owner":1}},"opphomerow":{"a7":{"pos":"a7","owner":2},"b7":{"pos":"b7","owner":2},"c7":{"pos":"c7","owner":2},"d7":{"pos":"d7","owner":2},"e7":{"pos":"e7","owner":2},"f7":{"pos":"f7","owner":2},"g7":{"pos":"g7","owner":2},"h7":{"pos":"h7","owner":2}}};var ownernames=["neutral","my","opp"];var player=1;var otherplayer=2;game.selecttower1=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{movetargets:Object.assign({},step.ARTIFACTS.movetargets),killtargets:Object.assign({},step.ARTIFACTS.killtargets)});var UNITLAYERS=step.UNITLAYERS;var MARKS={selecttower:markpos};var BLOCKS=function(){var k,ret={},s0=UNITLAYERS.oppunits,s1=UNITLAYERS.mycatapults;for(k in s0){ret[k]=1;}for(k in s1){ret[k]=1;}return ret;}();var STARTPOS=MARKS['selecttower'];var allwalkerdirs=[1,2,3,4,5,6,7,8];for(var walkerdirnbr=0;walkerdirnbr<8;walkerdirnbr++){var DIR=allwalkerdirs[walkerdirnbr];var walkedsquares=[];var MAX=2;var POS=STARTPOS;var LENGTH=0;while(LENGTH<MAX&&(POS=connections[POS][DIR])&&!BLOCKS[POS]){walkedsquares.push(POS);LENGTH++;}var WALKLENGTH=walkedsquares.length;var STEP=0;for(var walkstepper=0;walkstepper<WALKLENGTH;walkstepper++){POS=walkedsquares[walkstepper];STEP++;if(WALKLENGTH===2&&STEP===2){ARTIFACTS['movetargets'][POS]={dir:DIR};}}}var STARTPOS=MARKS['selecttower'];var neighbourdirs=[1,2,3,4,5,6,7,8];var startconnections=connections[STARTPOS];for(var dirnbr=0;dirnbr<8;dirnbr++){var POS=startconnections[neighbourdirs[dirnbr]];if(POS&&function(){var k,ret={},s0=UNITLAYERS.oppcatapults,s1=UNITLAYERS.oppwalls;for(k in s0){ret[k]=1;}for(k in s1){ret[k]=1;}return ret;}()[POS]){ARTIFACTS['killtargets'][POS]={};}}var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selecttower'});turn.links[newstepid]={};var newlinks=turn.links[newstepid];for(var linkpos in ARTIFACTS.movetargets){newlinks[linkpos]='selectmove1';}var newlinks=turn.links[newstepid];for(var linkpos in ARTIFACTS.killtargets){newlinks[linkpos]='selectkill1';}return newstep;};game.selecttower1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.selectmove1=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{madecatapults:Object.assign({},step.ARTIFACTS.madecatapults),madetowers:Object.assign({},step.ARTIFACTS.madetowers),madewalls:Object.assign({},step.ARTIFACTS.madewalls)});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectmove:markpos,selecttower:step.MARKS.selecttower};var STARTPOS=MARKS['selectmove'];var POS=connections[STARTPOS][relativedirs[(ARTIFACTS.movetargets[MARKS['selectmove']]||{})['dir']-2+5]];if(POS){ARTIFACTS[!!UNITLAYERS.myunits[POS]?!!UNITLAYERS.mytowers[POS]?'madecatapults':'madetowers':'madewalls'][POS]={};}ARTIFACTS[!!UNITLAYERS.myunits[MARKS['selectmove']]?!!UNITLAYERS.mytowers[MARKS['selectmove']]?'madecatapults':'madetowers':'madewalls'][STARTPOS]={};var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectmove'});turn.links[newstepid]={};turn.links[newstepid].move='move1';return newstep;};game.selectmove1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.selectkill1=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectkill:markpos,selecttower:step.MARKS.selecttower};var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectkill'});turn.links[newstepid]={};turn.links[newstepid].kill='kill1';if(!!UNITLAYERS.oppcatapults[MARKS['selectkill']]){turn.links[newstepid].sacrifice='sacrifice1';}return newstep;};game.selectkill1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.selectcatapult1=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{firetargets:Object.assign({},step.ARTIFACTS.firetargets)});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectcatapult:markpos};var STARTPOS=MARKS['selectcatapult'];var allwalkerdirs=[7,8,1,2,3];for(var walkerdirnbr=0;walkerdirnbr<5;walkerdirnbr++){var MAX=3;var POS=STARTPOS;var LENGTH=0;var STEP=0;while(LENGTH<MAX&&(POS=connections[POS][allwalkerdirs[walkerdirnbr]])){LENGTH++;STEP++;if(STEP>1&&!UNITLAYERS.myunits[POS]){ARTIFACTS['firetargets'][POS]={};}}}var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectcatapult'});turn.links[newstepid]={};var newlinks=turn.links[newstepid];for(var linkpos in ARTIFACTS.firetargets){newlinks[linkpos]='selectfire1';}return newstep;};game.selectcatapult1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.selectfire1=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectfire:markpos,selectcatapult:step.MARKS.selectcatapult};var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectfire'});turn.links[newstepid]={};turn.links[newstepid].fire='fire1';return newstep;};game.selectfire1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.move1=function(turn,step){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var MARKS=step.MARKS;var UNITDATA=Object.assign({},step.UNITDATA);var clones=step.clones;var UNITLAYERS=step.UNITLAYERS;delete UNITDATA[(UNITLAYERS.units[MARKS['selecttower']]||{}).id];for(var POS in ARTIFACTS.madecatapults){var unitid=(UNITLAYERS.units[POS]||{}).id;if(unitid){UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{'group':'catapults'});}}for(var POS in ARTIFACTS.madetowers){var unitid=(UNITLAYERS.units[POS]||{}).id;if(unitid){UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{'group':'towers'});}}for(var POS in ARTIFACTS.madewalls){var newunitid='spawn'+clones++;UNITDATA[newunitid]={pos:POS,id:newunitid,group:'walls',owner:1,from:MARKS['selecttower']};}MARKS={};UNITLAYERS={"towers":{},"mytowers":{},"opptowers":{},"neutraltowers":{},"catapults":{},"mycatapults":{},"oppcatapults":{},"neutralcatapults":{},"walls":{},"mywalls":{},"oppwalls":{},"neutralwalls":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}ARTIFACTS={"firetargets":{},"movetargets":{},"madecatapults":{},"madetowers":{},"madewalls":{},"killtargets":{}};var newstepid=step.stepid+'-'+'move';var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,stepid:newstepid,name:'move',path:step.path.concat('move'),clones:clones});turn.links[newstepid]={};if(Object.keys(function(){var ret={},s0=UNITLAYERS.myunits,s1=TERRAIN.opphomerow;for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}()||{}).length!==0){var winner=1;var result=winner===1?'win':winner?'lose':'draw';turn.links[newstepid][result]='infiltration';}else turn.links[newstepid].endturn="start"+otherplayer;return newstep;};game.move1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.kill1=function(turn,step){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var MARKS=step.MARKS;var UNITDATA=Object.assign({},step.UNITDATA);var UNITLAYERS=step.UNITLAYERS;var unitid=(UNITLAYERS.units[MARKS['selecttower']]||{}).id;if(unitid){UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{'group':'walls'});}if(!!UNITLAYERS.oppcatapults[MARKS['selectkill']]){var unitid=(UNITLAYERS.units[MARKS['selectkill']]||{}).id;if(unitid){UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{'group':'towers'});}}else{delete UNITDATA[(UNITLAYERS.units[MARKS['selectkill']]||{}).id];}MARKS={};UNITLAYERS={"towers":{},"mytowers":{},"opptowers":{},"neutraltowers":{},"catapults":{},"mycatapults":{},"oppcatapults":{},"neutralcatapults":{},"walls":{},"mywalls":{},"oppwalls":{},"neutralwalls":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}ARTIFACTS={"firetargets":{},"movetargets":{},"madecatapults":{},"madetowers":{},"madewalls":{},"killtargets":{}};var newstepid=step.stepid+'-'+'kill';var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,stepid:newstepid,name:'kill',path:step.path.concat('kill')});turn.links[newstepid]={};if(Object.keys(function(){var ret={},s0=UNITLAYERS.myunits,s1=TERRAIN.opphomerow;for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}()||{}).length!==0){var winner=1;var result=winner===1?'win':winner?'lose':'draw';turn.links[newstepid][result]='infiltration';}else turn.links[newstepid].endturn="start"+otherplayer;return newstep;};game.kill1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.sacrifice1=function(turn,step){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var MARKS=step.MARKS;var UNITDATA=Object.assign({},step.UNITDATA);var UNITLAYERS=step.UNITLAYERS;var unitid=(UNITLAYERS.units[MARKS['selectkill']]||{}).id;if(unitid){UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{'group':'walls'});}delete UNITDATA[(UNITLAYERS.units[MARKS['selecttower']]||{}).id];MARKS={};UNITLAYERS={"towers":{},"mytowers":{},"opptowers":{},"neutraltowers":{},"catapults":{},"mycatapults":{},"oppcatapults":{},"neutralcatapults":{},"walls":{},"mywalls":{},"oppwalls":{},"neutralwalls":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}ARTIFACTS={"firetargets":{},"movetargets":{},"madecatapults":{},"madetowers":{},"madewalls":{},"killtargets":{}};var newstepid=step.stepid+'-'+'sacrifice';var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,stepid:newstepid,name:'sacrifice',path:step.path.concat('sacrifice')});turn.links[newstepid]={};if(Object.keys(function(){var ret={},s0=UNITLAYERS.myunits,s1=TERRAIN.opphomerow;for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}()||{}).length!==0){var winner=1;var result=winner===1?'win':winner?'lose':'draw';turn.links[newstepid][result]='infiltration';}else turn.links[newstepid].endturn="start"+otherplayer;return newstep;};game.sacrifice1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.fire1=function(turn,step){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var MARKS=step.MARKS;var UNITDATA=Object.assign({},step.UNITDATA);var clones=step.clones;var UNITLAYERS=step.UNITLAYERS;if(!!UNITLAYERS.oppwalls[MARKS['selectfire']]){delete UNITDATA[(UNITLAYERS.units[MARKS['selectfire']]||{}).id];}else{if(!!UNITLAYERS.oppunits[MARKS['selectfire']]){var unitid=(UNITLAYERS.units[MARKS['selectfire']]||{}).id;if(unitid){UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{'group':!!UNITLAYERS.oppcatapults[MARKS['selectfire']]?'towers':'walls'});}}else{var newunitid='spawn'+clones++;UNITDATA[newunitid]={pos:MARKS['selectfire'],id:newunitid,group:'walls',owner:1,from:MARKS['selectcatapult']};}}var unitid=(UNITLAYERS.units[MARKS['selectcatapult']]||{}).id;if(unitid){UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{'group':'towers'});}MARKS={};UNITLAYERS={"towers":{},"mytowers":{},"opptowers":{},"neutraltowers":{},"catapults":{},"mycatapults":{},"oppcatapults":{},"neutralcatapults":{},"walls":{},"mywalls":{},"oppwalls":{},"neutralwalls":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}ARTIFACTS={"firetargets":{},"movetargets":{},"madecatapults":{},"madetowers":{},"madewalls":{},"killtargets":{}};var newstepid=step.stepid+'-'+'fire';var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,stepid:newstepid,name:'fire',path:step.path.concat('fire'),clones:clones});turn.links[newstepid]={};if(Object.keys(function(){var ret={},s0=UNITLAYERS.myunits,s1=TERRAIN.opphomerow;for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}()||{}).length!==0){var winner=1;var result=winner===1?'win':winner?'lose':'draw';turn.links[newstepid][result]='infiltration';}else turn.links[newstepid].endturn="start"+otherplayer;return newstep;};game.fire1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.start1=function(turn,step){var turn={steps:{},player:player,turn:turn.turn+1,links:{root:{}}};var MARKS={};var ARTIFACTS={"firetargets":{},"movetargets":{},"madecatapults":{},"madetowers":{},"madewalls":{},"killtargets":{}};var UNITDATA=step.UNITDATA;var UNITLAYERS={"towers":{},"mytowers":{},"opptowers":{},"neutraltowers":{},"catapults":{},"mycatapults":{},"oppcatapults":{},"neutralcatapults":{},"walls":{},"mywalls":{},"oppwalls":{},"neutralwalls":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}var newstep=turn.steps.root={ARTIFACTS:ARTIFACTS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,MARKS:MARKS,stepid:'root',name:'start',clones:step.clones,path:[]};var newlinks=turn.links.root;for(var linkpos in UNITLAYERS.mytowers){newlinks[linkpos]='selecttower1';}var newlinks=turn.links.root;for(var linkpos in UNITLAYERS.mycatapults){newlinks[linkpos]='selectcatapult1';}return turn;};game.start1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.debug1=function(){return{TERRAIN:TERRAIN};};})();(function(){var TERRAIN={"homerow":{"a1":{"pos":"a1","owner":1},"b1":{"pos":"b1","owner":1},"c1":{"pos":"c1","owner":1},"d1":{"pos":"d1","owner":1},"e1":{"pos":"e1","owner":1},"f1":{"pos":"f1","owner":1},"g1":{"pos":"g1","owner":1},"h1":{"pos":"h1","owner":1},"a7":{"pos":"a7","owner":2},"b7":{"pos":"b7","owner":2},"c7":{"pos":"c7","owner":2},"d7":{"pos":"d7","owner":2},"e7":{"pos":"e7","owner":2},"f7":{"pos":"f7","owner":2},"g7":{"pos":"g7","owner":2},"h7":{"pos":"h7","owner":2}},"opphomerow":{"a1":{"pos":"a1","owner":1},"b1":{"pos":"b1","owner":1},"c1":{"pos":"c1","owner":1},"d1":{"pos":"d1","owner":1},"e1":{"pos":"e1","owner":1},"f1":{"pos":"f1","owner":1},"g1":{"pos":"g1","owner":1},"h1":{"pos":"h1","owner":1}},"myhomerow":{"a7":{"pos":"a7","owner":2},"b7":{"pos":"b7","owner":2},"c7":{"pos":"c7","owner":2},"d7":{"pos":"d7","owner":2},"e7":{"pos":"e7","owner":2},"f7":{"pos":"f7","owner":2},"g7":{"pos":"g7","owner":2},"h7":{"pos":"h7","owner":2}}};var ownernames=["neutral","opp","my"];var player=2;var otherplayer=1;game.selecttower2=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{movetargets:Object.assign({},step.ARTIFACTS.movetargets),killtargets:Object.assign({},step.ARTIFACTS.killtargets)});var UNITLAYERS=step.UNITLAYERS;var MARKS={selecttower:markpos};var BLOCKS=function(){var k,ret={},s0=UNITLAYERS.oppunits,s1=UNITLAYERS.mycatapults;for(k in s0){ret[k]=1;}for(k in s1){ret[k]=1;}return ret;}();var STARTPOS=MARKS['selecttower'];var allwalkerdirs=[1,2,3,4,5,6,7,8];for(var walkerdirnbr=0;walkerdirnbr<8;walkerdirnbr++){var DIR=allwalkerdirs[walkerdirnbr];var walkedsquares=[];var MAX=2;var POS=STARTPOS;var LENGTH=0;while(LENGTH<MAX&&(POS=connections[POS][DIR])&&!BLOCKS[POS]){walkedsquares.push(POS);LENGTH++;}var WALKLENGTH=walkedsquares.length;var STEP=0;for(var walkstepper=0;walkstepper<WALKLENGTH;walkstepper++){POS=walkedsquares[walkstepper];STEP++;if(WALKLENGTH===2&&STEP===2){ARTIFACTS['movetargets'][POS]={dir:DIR};}}}var STARTPOS=MARKS['selecttower'];var neighbourdirs=[1,2,3,4,5,6,7,8];var startconnections=connections[STARTPOS];for(var dirnbr=0;dirnbr<8;dirnbr++){var POS=startconnections[neighbourdirs[dirnbr]];if(POS&&function(){var k,ret={},s0=UNITLAYERS.oppcatapults,s1=UNITLAYERS.oppwalls;for(k in s0){ret[k]=1;}for(k in s1){ret[k]=1;}return ret;}()[POS]){ARTIFACTS['killtargets'][POS]={};}}var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selecttower'});turn.links[newstepid]={};var newlinks=turn.links[newstepid];for(var linkpos in ARTIFACTS.movetargets){newlinks[linkpos]='selectmove2';}var newlinks=turn.links[newstepid];for(var linkpos in ARTIFACTS.killtargets){newlinks[linkpos]='selectkill2';}return newstep;};game.selecttower2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.selectmove2=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{madecatapults:Object.assign({},step.ARTIFACTS.madecatapults),madetowers:Object.assign({},step.ARTIFACTS.madetowers),madewalls:Object.assign({},step.ARTIFACTS.madewalls)});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectmove:markpos,selecttower:step.MARKS.selecttower};var STARTPOS=MARKS['selectmove'];var POS=connections[STARTPOS][relativedirs[(ARTIFACTS.movetargets[MARKS['selectmove']]||{})['dir']-2+5]];if(POS){ARTIFACTS[!!UNITLAYERS.myunits[POS]?!!UNITLAYERS.mytowers[POS]?'madecatapults':'madetowers':'madewalls'][POS]={};}ARTIFACTS[!!UNITLAYERS.myunits[MARKS['selectmove']]?!!UNITLAYERS.mytowers[MARKS['selectmove']]?'madecatapults':'madetowers':'madewalls'][STARTPOS]={};var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectmove'});turn.links[newstepid]={};turn.links[newstepid].move='move2';return newstep;};game.selectmove2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.selectkill2=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectkill:markpos,selecttower:step.MARKS.selecttower};var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectkill'});turn.links[newstepid]={};turn.links[newstepid].kill='kill2';if(!!UNITLAYERS.oppcatapults[MARKS['selectkill']]){turn.links[newstepid].sacrifice='sacrifice2';}return newstep;};game.selectkill2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.selectcatapult2=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{firetargets:Object.assign({},step.ARTIFACTS.firetargets)});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectcatapult:markpos};var STARTPOS=MARKS['selectcatapult'];var allwalkerdirs=[3,4,5,6,7];for(var walkerdirnbr=0;walkerdirnbr<5;walkerdirnbr++){var MAX=3;var POS=STARTPOS;var LENGTH=0;var STEP=0;while(LENGTH<MAX&&(POS=connections[POS][allwalkerdirs[walkerdirnbr]])){LENGTH++;STEP++;if(STEP>1&&!UNITLAYERS.myunits[POS]){ARTIFACTS['firetargets'][POS]={};}}}var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectcatapult'});turn.links[newstepid]={};var newlinks=turn.links[newstepid];for(var linkpos in ARTIFACTS.firetargets){newlinks[linkpos]='selectfire2';}return newstep;};game.selectcatapult2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.selectfire2=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectfire:markpos,selectcatapult:step.MARKS.selectcatapult};var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectfire'});turn.links[newstepid]={};turn.links[newstepid].fire='fire2';return newstep;};game.selectfire2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.move2=function(turn,step){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var MARKS=step.MARKS;var UNITDATA=Object.assign({},step.UNITDATA);var clones=step.clones;var UNITLAYERS=step.UNITLAYERS;delete UNITDATA[(UNITLAYERS.units[MARKS['selecttower']]||{}).id];for(var POS in ARTIFACTS.madecatapults){var unitid=(UNITLAYERS.units[POS]||{}).id;if(unitid){UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{'group':'catapults'});}}for(var POS in ARTIFACTS.madetowers){var unitid=(UNITLAYERS.units[POS]||{}).id;if(unitid){UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{'group':'towers'});}}for(var POS in ARTIFACTS.madewalls){var newunitid='spawn'+clones++;UNITDATA[newunitid]={pos:POS,id:newunitid,group:'walls',owner:2,from:MARKS['selecttower']};}MARKS={};UNITLAYERS={"towers":{},"mytowers":{},"opptowers":{},"neutraltowers":{},"catapults":{},"mycatapults":{},"oppcatapults":{},"neutralcatapults":{},"walls":{},"mywalls":{},"oppwalls":{},"neutralwalls":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}ARTIFACTS={"firetargets":{},"movetargets":{},"madecatapults":{},"madetowers":{},"madewalls":{},"killtargets":{}};var newstepid=step.stepid+'-'+'move';var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,stepid:newstepid,name:'move',path:step.path.concat('move'),clones:clones});turn.links[newstepid]={};if(Object.keys(function(){var ret={},s0=UNITLAYERS.myunits,s1=TERRAIN.opphomerow;for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}()||{}).length!==0){var winner=2;var result=winner===2?'win':winner?'lose':'draw';turn.links[newstepid][result]='infiltration';}else turn.links[newstepid].endturn="start"+otherplayer;return newstep;};game.move2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.kill2=function(turn,step){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var MARKS=step.MARKS;var UNITDATA=Object.assign({},step.UNITDATA);var UNITLAYERS=step.UNITLAYERS;var unitid=(UNITLAYERS.units[MARKS['selecttower']]||{}).id;if(unitid){UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{'group':'walls'});}if(!!UNITLAYERS.oppcatapults[MARKS['selectkill']]){var unitid=(UNITLAYERS.units[MARKS['selectkill']]||{}).id;if(unitid){UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{'group':'towers'});}}else{delete UNITDATA[(UNITLAYERS.units[MARKS['selectkill']]||{}).id];}MARKS={};UNITLAYERS={"towers":{},"mytowers":{},"opptowers":{},"neutraltowers":{},"catapults":{},"mycatapults":{},"oppcatapults":{},"neutralcatapults":{},"walls":{},"mywalls":{},"oppwalls":{},"neutralwalls":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}ARTIFACTS={"firetargets":{},"movetargets":{},"madecatapults":{},"madetowers":{},"madewalls":{},"killtargets":{}};var newstepid=step.stepid+'-'+'kill';var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,stepid:newstepid,name:'kill',path:step.path.concat('kill')});turn.links[newstepid]={};if(Object.keys(function(){var ret={},s0=UNITLAYERS.myunits,s1=TERRAIN.opphomerow;for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}()||{}).length!==0){var winner=2;var result=winner===2?'win':winner?'lose':'draw';turn.links[newstepid][result]='infiltration';}else turn.links[newstepid].endturn="start"+otherplayer;return newstep;};game.kill2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.sacrifice2=function(turn,step){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var MARKS=step.MARKS;var UNITDATA=Object.assign({},step.UNITDATA);var UNITLAYERS=step.UNITLAYERS;var unitid=(UNITLAYERS.units[MARKS['selectkill']]||{}).id;if(unitid){UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{'group':'walls'});}delete UNITDATA[(UNITLAYERS.units[MARKS['selecttower']]||{}).id];MARKS={};UNITLAYERS={"towers":{},"mytowers":{},"opptowers":{},"neutraltowers":{},"catapults":{},"mycatapults":{},"oppcatapults":{},"neutralcatapults":{},"walls":{},"mywalls":{},"oppwalls":{},"neutralwalls":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}ARTIFACTS={"firetargets":{},"movetargets":{},"madecatapults":{},"madetowers":{},"madewalls":{},"killtargets":{}};var newstepid=step.stepid+'-'+'sacrifice';var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,stepid:newstepid,name:'sacrifice',path:step.path.concat('sacrifice')});turn.links[newstepid]={};if(Object.keys(function(){var ret={},s0=UNITLAYERS.myunits,s1=TERRAIN.opphomerow;for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}()||{}).length!==0){var winner=2;var result=winner===2?'win':winner?'lose':'draw';turn.links[newstepid][result]='infiltration';}else turn.links[newstepid].endturn="start"+otherplayer;return newstep;};game.sacrifice2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.fire2=function(turn,step){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var MARKS=step.MARKS;var UNITDATA=Object.assign({},step.UNITDATA);var clones=step.clones;var UNITLAYERS=step.UNITLAYERS;if(!!UNITLAYERS.oppwalls[MARKS['selectfire']]){delete UNITDATA[(UNITLAYERS.units[MARKS['selectfire']]||{}).id];}else{if(!!UNITLAYERS.oppunits[MARKS['selectfire']]){var unitid=(UNITLAYERS.units[MARKS['selectfire']]||{}).id;if(unitid){UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{'group':!!UNITLAYERS.oppcatapults[MARKS['selectfire']]?'towers':'walls'});}}else{var newunitid='spawn'+clones++;UNITDATA[newunitid]={pos:MARKS['selectfire'],id:newunitid,group:'walls',owner:2,from:MARKS['selectcatapult']};}}var unitid=(UNITLAYERS.units[MARKS['selectcatapult']]||{}).id;if(unitid){UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{'group':'towers'});}MARKS={};UNITLAYERS={"towers":{},"mytowers":{},"opptowers":{},"neutraltowers":{},"catapults":{},"mycatapults":{},"oppcatapults":{},"neutralcatapults":{},"walls":{},"mywalls":{},"oppwalls":{},"neutralwalls":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}ARTIFACTS={"firetargets":{},"movetargets":{},"madecatapults":{},"madetowers":{},"madewalls":{},"killtargets":{}};var newstepid=step.stepid+'-'+'fire';var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,stepid:newstepid,name:'fire',path:step.path.concat('fire'),clones:clones});turn.links[newstepid]={};if(Object.keys(function(){var ret={},s0=UNITLAYERS.myunits,s1=TERRAIN.opphomerow;for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}()||{}).length!==0){var winner=2;var result=winner===2?'win':winner?'lose':'draw';turn.links[newstepid][result]='infiltration';}else turn.links[newstepid].endturn="start"+otherplayer;return newstep;};game.fire2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.start2=function(turn,step){var turn={steps:{},player:player,turn:turn.turn+1,links:{root:{}}};var MARKS={};var ARTIFACTS={"firetargets":{},"movetargets":{},"madecatapults":{},"madetowers":{},"madewalls":{},"killtargets":{}};var UNITDATA=step.UNITDATA;var UNITLAYERS={"towers":{},"mytowers":{},"opptowers":{},"neutraltowers":{},"catapults":{},"mycatapults":{},"oppcatapults":{},"neutralcatapults":{},"walls":{},"mywalls":{},"oppwalls":{},"neutralwalls":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}var newstep=turn.steps.root={ARTIFACTS:ARTIFACTS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,MARKS:MARKS,stepid:'root',name:'start',clones:step.clones,path:[]};var newlinks=turn.links.root;for(var linkpos in UNITLAYERS.mytowers){newlinks[linkpos]='selecttower2';}var newlinks=turn.links.root;for(var linkpos in UNITLAYERS.mycatapults){newlinks[linkpos]='selectcatapult2';}return turn;};game.start2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.debug2=function(){return{TERRAIN:TERRAIN};};})();function reduce(coll,iterator,acc){for(var key in coll){acc=iterator(acc,coll[key],key);}return acc;}game.newGame=function(){var turnseed={turn:0};var stepseed={UNITDATA:{"unit1":{"pos":"a1","id":"unit1","group":"towers","owner":1},"unit2":{"pos":"b1","id":"unit2","group":"towers","owner":1},"unit3":{"pos":"c1","id":"unit3","group":"towers","owner":1},"unit4":{"pos":"d1","id":"unit4","group":"towers","owner":1},"unit5":{"pos":"e1","id":"unit5","group":"towers","owner":1},"unit6":{"pos":"f1","id":"unit6","group":"towers","owner":1},"unit7":{"pos":"g1","id":"unit7","group":"towers","owner":1},"unit8":{"pos":"h1","id":"unit8","group":"towers","owner":1},"unit9":{"pos":"a7","id":"unit9","group":"towers","owner":2},"unit10":{"pos":"b7","id":"unit10","group":"towers","owner":2},"unit11":{"pos":"c7","id":"unit11","group":"towers","owner":2},"unit12":{"pos":"d7","id":"unit12","group":"towers","owner":2},"unit13":{"pos":"e7","id":"unit13","group":"towers","owner":2},"unit14":{"pos":"f7","id":"unit14","group":"towers","owner":2},"unit15":{"pos":"g7","id":"unit15","group":"towers","owner":2},"unit16":{"pos":"h7","id":"unit16","group":"towers","owner":2}},clones:0};return game.start1(turnseed,stepseed);};game.debug=function(){return{BOARD:BOARD,connections:connections,plr1:game.debug1(),plr2:game.debug2()};};game.commands={"move":1,"kill":1,"sacrifice":1,"fire":1};game.graphics={"tiles":{"homerow":"playercolour"},"icons":{"towers":"rooks","walls":"pawns","catapults":"queens"}};game.board={"height":7,"width":8,"terrain":{"homerow":{"1":[["rect","a1","h1"]],"2":[["rect","a7","h7"]]}}};game.AI=[];game.id="murusgallicusadvanced";return game;}(),orthokon:function(){var game={};var connections={"faux":{},"a1":{"1":"a2","2":"b2","3":"b1"},"a2":{"1":"a3","2":"b3","3":"b2","4":"b1","5":"a1"},"a3":{"1":"a4","2":"b4","3":"b3","4":"b2","5":"a2"},"a4":{"3":"b4","4":"b3","5":"a3"},"b1":{"1":"b2","2":"c2","3":"c1","7":"a1","8":"a2"},"b2":{"1":"b3","2":"c3","3":"c2","4":"c1","5":"b1","6":"a1","7":"a2","8":"a3"},"b3":{"1":"b4","2":"c4","3":"c3","4":"c2","5":"b2","6":"a2","7":"a3","8":"a4"},"b4":{"3":"c4","4":"c3","5":"b3","6":"a3","7":"a4"},"c1":{"1":"c2","2":"d2","3":"d1","7":"b1","8":"b2"},"c2":{"1":"c3","2":"d3","3":"d2","4":"d1","5":"c1","6":"b1","7":"b2","8":"b3"},"c3":{"1":"c4","2":"d4","3":"d3","4":"d2","5":"c2","6":"b2","7":"b3","8":"b4"},"c4":{"3":"d4","4":"d3","5":"c3","6":"b3","7":"b4"},"d1":{"1":"d2","7":"c1","8":"c2"},"d2":{"1":"d3","5":"d1","6":"c1","7":"c2","8":"c3"},"d3":{"1":"d4","5":"d2","6":"c2","7":"c3","8":"c4"},"d4":{"5":"d3","6":"c3","7":"c4"}};var BOARD={"board":{"a1":{"colour":"dark","pos":"a1","x":1,"y":1},"a2":{"colour":"light","pos":"a2","x":1,"y":2},"a3":{"colour":"dark","pos":"a3","x":1,"y":3},"a4":{"colour":"light","pos":"a4","x":1,"y":4},"b1":{"colour":"light","pos":"b1","x":2,"y":1},"b2":{"colour":"dark","pos":"b2","x":2,"y":2},"b3":{"colour":"light","pos":"b3","x":2,"y":3},"b4":{"colour":"dark","pos":"b4","x":2,"y":4},"c1":{"colour":"dark","pos":"c1","x":3,"y":1},"c2":{"colour":"light","pos":"c2","x":3,"y":2},"c3":{"colour":"dark","pos":"c3","x":3,"y":3},"c4":{"colour":"light","pos":"c4","x":3,"y":4},"d1":{"colour":"light","pos":"d1","x":4,"y":1},"d2":{"colour":"dark","pos":"d2","x":4,"y":2},"d3":{"colour":"light","pos":"d3","x":4,"y":3},"d4":{"colour":"dark","pos":"d4","x":4,"y":4}},"light":{"a2":{"colour":"light","pos":"a2","x":1,"y":2},"a4":{"colour":"light","pos":"a4","x":1,"y":4},"b1":{"colour":"light","pos":"b1","x":2,"y":1},"b3":{"colour":"light","pos":"b3","x":2,"y":3},"c2":{"colour":"light","pos":"c2","x":3,"y":2},"c4":{"colour":"light","pos":"c4","x":3,"y":4},"d1":{"colour":"light","pos":"d1","x":4,"y":1},"d3":{"colour":"light","pos":"d3","x":4,"y":3}},"dark":{"a1":{"colour":"dark","pos":"a1","x":1,"y":1},"a3":{"colour":"dark","pos":"a3","x":1,"y":3},"b2":{"colour":"dark","pos":"b2","x":2,"y":2},"b4":{"colour":"dark","pos":"b4","x":2,"y":4},"c1":{"colour":"dark","pos":"c1","x":3,"y":1},"c3":{"colour":"dark","pos":"c3","x":3,"y":3},"d2":{"colour":"dark","pos":"d2","x":4,"y":2},"d4":{"colour":"dark","pos":"d4","x":4,"y":4}}};var relativedirs=[1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];var TERRAIN={};(function(){var ownernames=["neutral","my","opp"];var player=1;var otherplayer=2;game.selectunit1=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{movetargets:Object.assign({},step.ARTIFACTS.movetargets)});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectunit:markpos};var BLOCKS=UNITLAYERS.units;var STARTPOS=MARKS['selectunit'];var allwalkerdirs=[1,2,3,4,5,6,7,8];for(var walkerdirnbr=0;walkerdirnbr<8;walkerdirnbr++){var walkedsquares=[];var POS=STARTPOS;while((POS=connections[POS][allwalkerdirs[walkerdirnbr]])&&!BLOCKS[POS]){walkedsquares.push(POS);}var WALKLENGTH=walkedsquares.length;if(WALKLENGTH){ARTIFACTS['movetargets'][walkedsquares[WALKLENGTH-1]]={};}}var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectunit'});turn.links[newstepid]={};var newlinks=turn.links[newstepid];for(var linkpos in ARTIFACTS.movetargets){newlinks[linkpos]='selectmovetarget1';}return newstep;};game.selectunit1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.selectmovetarget1=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{victims:Object.assign({},step.ARTIFACTS.victims)});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectmovetarget:markpos,selectunit:step.MARKS.selectunit};var STARTPOS=MARKS['selectmovetarget'];var neighbourdirs=[1,3,5,7];var startconnections=connections[STARTPOS];for(var dirnbr=0;dirnbr<4;dirnbr++){var POS=startconnections[neighbourdirs[dirnbr]];if(POS&&UNITLAYERS.oppunits[POS]){ARTIFACTS['victims'][POS]={};}}var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectmovetarget'});turn.links[newstepid]={};turn.links[newstepid].move='move1';return newstep;};game.selectmovetarget1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.move1=function(turn,step){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var MARKS=step.MARKS;var UNITDATA=Object.assign({},step.UNITDATA);var UNITLAYERS=step.UNITLAYERS;var unitid=(UNITLAYERS.units[MARKS['selectunit']]||{}).id;if(unitid){UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{'pos':MARKS['selectmovetarget']});}var LOOPID;for(var POS in ARTIFACTS.victims){if(LOOPID=(UNITLAYERS.units[POS]||{}).id){UNITDATA[LOOPID]=Object.assign({},UNITDATA[LOOPID],{'owner':1});}}MARKS={};UNITLAYERS={"soldiers":{},"mysoldiers":{},"oppsoldiers":{},"neutralsoldiers":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}ARTIFACTS={"victims":{},"movetargets":{}};var newstepid=step.stepid+'-'+'move';var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,stepid:newstepid,name:'move',path:step.path.concat('move')});turn.links[newstepid]={};turn.links[newstepid].endturn="start"+otherplayer;return newstep;};game.move1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.start1=function(turn,step){var turn={steps:{},player:player,turn:turn.turn+1,links:{root:{}}};var MARKS={};var ARTIFACTS={"victims":{},"movetargets":{}};var UNITDATA=step.UNITDATA;var UNITLAYERS={"soldiers":{},"mysoldiers":{},"oppsoldiers":{},"neutralsoldiers":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}var newstep=turn.steps.root={ARTIFACTS:ARTIFACTS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,MARKS:MARKS,stepid:'root',name:'start',path:[]};var newlinks=turn.links.root;for(var linkpos in UNITLAYERS.myunits){newlinks[linkpos]='selectunit1';}return turn;};game.start1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.brain_Bob_1=function(step){var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;return Object.keys(UNITLAYERS.myunits).length;};game.brain_Bob_1_detailed=function(step){var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;return{headcount:Object.keys(UNITLAYERS.myunits).length};};game.debug1=function(){return{TERRAIN:TERRAIN};};})();(function(){var ownernames=["neutral","opp","my"];var player=2;var otherplayer=1;game.selectunit2=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{movetargets:Object.assign({},step.ARTIFACTS.movetargets)});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectunit:markpos};var BLOCKS=UNITLAYERS.units;var STARTPOS=MARKS['selectunit'];var allwalkerdirs=[1,2,3,4,5,6,7,8];for(var walkerdirnbr=0;walkerdirnbr<8;walkerdirnbr++){var walkedsquares=[];var POS=STARTPOS;while((POS=connections[POS][allwalkerdirs[walkerdirnbr]])&&!BLOCKS[POS]){walkedsquares.push(POS);}var WALKLENGTH=walkedsquares.length;if(WALKLENGTH){ARTIFACTS['movetargets'][walkedsquares[WALKLENGTH-1]]={};}}var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectunit'});turn.links[newstepid]={};var newlinks=turn.links[newstepid];for(var linkpos in ARTIFACTS.movetargets){newlinks[linkpos]='selectmovetarget2';}return newstep;};game.selectunit2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.selectmovetarget2=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{victims:Object.assign({},step.ARTIFACTS.victims)});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectmovetarget:markpos,selectunit:step.MARKS.selectunit};var STARTPOS=MARKS['selectmovetarget'];var neighbourdirs=[1,3,5,7];var startconnections=connections[STARTPOS];for(var dirnbr=0;dirnbr<4;dirnbr++){var POS=startconnections[neighbourdirs[dirnbr]];if(POS&&UNITLAYERS.oppunits[POS]){ARTIFACTS['victims'][POS]={};}}var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectmovetarget'});turn.links[newstepid]={};turn.links[newstepid].move='move2';return newstep;};game.selectmovetarget2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.move2=function(turn,step){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var MARKS=step.MARKS;var UNITDATA=Object.assign({},step.UNITDATA);var UNITLAYERS=step.UNITLAYERS;var unitid=(UNITLAYERS.units[MARKS['selectunit']]||{}).id;if(unitid){UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{'pos':MARKS['selectmovetarget']});}var LOOPID;for(var POS in ARTIFACTS.victims){if(LOOPID=(UNITLAYERS.units[POS]||{}).id){UNITDATA[LOOPID]=Object.assign({},UNITDATA[LOOPID],{'owner':2});}}MARKS={};UNITLAYERS={"soldiers":{},"mysoldiers":{},"oppsoldiers":{},"neutralsoldiers":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}ARTIFACTS={"victims":{},"movetargets":{}};var newstepid=step.stepid+'-'+'move';var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,stepid:newstepid,name:'move',path:step.path.concat('move')});turn.links[newstepid]={};turn.links[newstepid].endturn="start"+otherplayer;return newstep;};game.move2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.start2=function(turn,step){var turn={steps:{},player:player,turn:turn.turn+1,links:{root:{}}};var MARKS={};var ARTIFACTS={"victims":{},"movetargets":{}};var UNITDATA=step.UNITDATA;var UNITLAYERS={"soldiers":{},"mysoldiers":{},"oppsoldiers":{},"neutralsoldiers":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}var newstep=turn.steps.root={ARTIFACTS:ARTIFACTS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,MARKS:MARKS,stepid:'root',name:'start',path:[]};var newlinks=turn.links.root;for(var linkpos in UNITLAYERS.myunits){newlinks[linkpos]='selectunit2';}return turn;};game.start2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.brain_Bob_2=function(step){var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;return Object.keys(UNITLAYERS.myunits).length;};game.brain_Bob_2_detailed=function(step){var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;return{headcount:Object.keys(UNITLAYERS.myunits).length};};game.debug2=function(){return{TERRAIN:TERRAIN};};})();function reduce(coll,iterator,acc){for(var key in coll){acc=iterator(acc,coll[key],key);}return acc;}game.newGame=function(){var turnseed={turn:0};var stepseed={UNITDATA:{"unit1":{"pos":"a1","id":"unit1","group":"soldiers","owner":1},"unit2":{"pos":"b1","id":"unit2","group":"soldiers","owner":1},"unit3":{"pos":"c1","id":"unit3","group":"soldiers","owner":1},"unit4":{"pos":"d1","id":"unit4","group":"soldiers","owner":1},"unit5":{"pos":"a4","id":"unit5","group":"soldiers","owner":2},"unit6":{"pos":"b4","id":"unit6","group":"soldiers","owner":2},"unit7":{"pos":"c4","id":"unit7","group":"soldiers","owner":2},"unit8":{"pos":"d4","id":"unit8","group":"soldiers","owner":2}}};return game.start1(turnseed,stepseed);};game.debug=function(){return{BOARD:BOARD,connections:connections,plr1:game.debug1(),plr2:game.debug2()};};game.commands={"move":1};game.graphics={"icons":{"soldiers":"pawns"}};game.board={"height":4,"width":4};game.AI=["Bob"];game.id="orthokon";return game;}(),semaphor:function(){var game={};var connections={"faux":{},"a1":{"1":"a2","2":"b2","3":"b1"},"a2":{"1":"a3","2":"b3","3":"b2","4":"b1","5":"a1"},"a3":{"3":"b3","4":"b2","5":"a2"},"b1":{"1":"b2","2":"c2","3":"c1","7":"a1","8":"a2"},"b2":{"1":"b3","2":"c3","3":"c2","4":"c1","5":"b1","6":"a1","7":"a2","8":"a3"},"b3":{"3":"c3","4":"c2","5":"b2","6":"a2","7":"a3"},"c1":{"1":"c2","2":"d2","3":"d1","7":"b1","8":"b2"},"c2":{"1":"c3","2":"d3","3":"d2","4":"d1","5":"c1","6":"b1","7":"b2","8":"b3"},"c3":{"3":"d3","4":"d2","5":"c2","6":"b2","7":"b3"},"d1":{"1":"d2","7":"c1","8":"c2"},"d2":{"1":"d3","5":"d1","6":"c1","7":"c2","8":"c3"},"d3":{"5":"d2","6":"c2","7":"c3"}};var BOARD={"board":{"a1":{"colour":"dark","pos":"a1","x":1,"y":1},"a2":{"colour":"light","pos":"a2","x":1,"y":2},"a3":{"colour":"dark","pos":"a3","x":1,"y":3},"b1":{"colour":"light","pos":"b1","x":2,"y":1},"b2":{"colour":"dark","pos":"b2","x":2,"y":2},"b3":{"colour":"light","pos":"b3","x":2,"y":3},"c1":{"colour":"dark","pos":"c1","x":3,"y":1},"c2":{"colour":"light","pos":"c2","x":3,"y":2},"c3":{"colour":"dark","pos":"c3","x":3,"y":3},"d1":{"colour":"light","pos":"d1","x":4,"y":1},"d2":{"colour":"dark","pos":"d2","x":4,"y":2},"d3":{"colour":"light","pos":"d3","x":4,"y":3}},"light":{"a2":{"colour":"light","pos":"a2","x":1,"y":2},"b1":{"colour":"light","pos":"b1","x":2,"y":1},"b3":{"colour":"light","pos":"b3","x":2,"y":3},"c2":{"colour":"light","pos":"c2","x":3,"y":2},"d1":{"colour":"light","pos":"d1","x":4,"y":1},"d3":{"colour":"light","pos":"d3","x":4,"y":3}},"dark":{"a1":{"colour":"dark","pos":"a1","x":1,"y":1},"a3":{"colour":"dark","pos":"a3","x":1,"y":3},"b2":{"colour":"dark","pos":"b2","x":2,"y":2},"c1":{"colour":"dark","pos":"c1","x":3,"y":1},"c3":{"colour":"dark","pos":"c3","x":3,"y":3},"d2":{"colour":"dark","pos":"d2","x":4,"y":2}}};var relativedirs=[1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];var TERRAIN={};(function(){var ownernames=["neutral","my","opp"];var player=1;var otherplayer=2;game.selectdeploytarget1=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectdeploytarget:markpos};var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectdeploytarget'});turn.links[newstepid]={};turn.links[newstepid].deploy='deploy1';return newstep;};game.selectdeploytarget1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.selectunit1=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectunit:markpos};var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectunit'});turn.links[newstepid]={};turn.links[newstepid].promote='promote1';return newstep;};game.selectunit1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.deploy1=function(turn,step){var ARTIFACTS={line:Object.assign({},step.ARTIFACTS.line)};var MARKS=step.MARKS;var UNITDATA=Object.assign({},step.UNITDATA);var clones=step.clones;var UNITLAYERS=step.UNITLAYERS;var newunitid='spawn'+clones++;UNITDATA[newunitid]={pos:MARKS['selectdeploytarget'],id:newunitid,group:'pawns',owner:0};MARKS={};UNITLAYERS={"bishops":{},"mybishops":{},"oppbishops":{},"neutralbishops":{},"kings":{},"mykings":{},"oppkings":{},"neutralkings":{},"pawns":{},"mypawns":{},"opppawns":{},"neutralpawns":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}ARTIFACTS={"line":{}};var walkstarts=UNITLAYERS.units;for(var STARTPOS in walkstarts){var allowedsteps=UNITLAYERS[(UNITLAYERS.units[STARTPOS]||{})['group']];var allwalkerdirs=[1,2,3,4];for(var walkerdirnbr=0;walkerdirnbr<4;walkerdirnbr++){var walkedsquares=[];var POS=STARTPOS;while((POS=connections[POS][allwalkerdirs[walkerdirnbr]])&&allowedsteps[POS]){walkedsquares.push(POS);}var WALKLENGTH=walkedsquares.length;for(var walkstepper=0;walkstepper<WALKLENGTH;walkstepper++){POS=walkedsquares[walkstepper];if(WALKLENGTH>1){ARTIFACTS['line'][POS]={};}}}}var newstepid=step.stepid+'-'+'deploy';var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,stepid:newstepid,name:'deploy',path:step.path.concat('deploy'),clones:clones});turn.links[newstepid]={};if(Object.keys(ARTIFACTS.line||{}).length!==0){var winner=1;var result=winner===1?'win':winner?'lose':'draw';turn.links[newstepid][result]='madeline';}else turn.links[newstepid].endturn="start"+otherplayer;return newstep;};game.deploy1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.promote1=function(turn,step){var ARTIFACTS={line:Object.assign({},step.ARTIFACTS.line)};var MARKS=step.MARKS;var UNITDATA=Object.assign({},step.UNITDATA);var UNITLAYERS=step.UNITLAYERS;var unitid=(UNITLAYERS.units[MARKS['selectunit']]||{}).id;if(unitid){UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{'group':!!UNITLAYERS.pawns[MARKS['selectunit']]?'bishops':'kings'});}MARKS={};UNITLAYERS={"bishops":{},"mybishops":{},"oppbishops":{},"neutralbishops":{},"kings":{},"mykings":{},"oppkings":{},"neutralkings":{},"pawns":{},"mypawns":{},"opppawns":{},"neutralpawns":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}ARTIFACTS={"line":{}};var walkstarts=UNITLAYERS.units;for(var STARTPOS in walkstarts){var allowedsteps=UNITLAYERS[(UNITLAYERS.units[STARTPOS]||{})['group']];var allwalkerdirs=[1,2,3,4];for(var walkerdirnbr=0;walkerdirnbr<4;walkerdirnbr++){var walkedsquares=[];var POS=STARTPOS;while((POS=connections[POS][allwalkerdirs[walkerdirnbr]])&&allowedsteps[POS]){walkedsquares.push(POS);}var WALKLENGTH=walkedsquares.length;for(var walkstepper=0;walkstepper<WALKLENGTH;walkstepper++){POS=walkedsquares[walkstepper];if(WALKLENGTH>1){ARTIFACTS['line'][POS]={};}}}}var newstepid=step.stepid+'-'+'promote';var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,stepid:newstepid,name:'promote',path:step.path.concat('promote')});turn.links[newstepid]={};if(Object.keys(ARTIFACTS.line||{}).length!==0){var winner=1;var result=winner===1?'win':winner?'lose':'draw';turn.links[newstepid][result]='madeline';}else turn.links[newstepid].endturn="start"+otherplayer;return newstep;};game.promote1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.start1=function(turn,step){var turn={steps:{},player:player,turn:turn.turn+1,links:{root:{}}};var MARKS={};var ARTIFACTS={"line":{}};var UNITDATA=step.UNITDATA;var UNITLAYERS={"bishops":{},"mybishops":{},"oppbishops":{},"neutralbishops":{},"kings":{},"mykings":{},"oppkings":{},"neutralkings":{},"pawns":{},"mypawns":{},"opppawns":{},"neutralpawns":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}var newstep=turn.steps.root={ARTIFACTS:ARTIFACTS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,MARKS:MARKS,stepid:'root',name:'start',clones:step.clones,path:[]};var newlinks=turn.links.root;for(var linkpos in function(){var ret={},s0=BOARD.board,s1=UNITLAYERS.units;for(var key in s0){if(!s1[key]){ret[key]=s0[key];}}return ret;}()){newlinks[linkpos]='selectdeploytarget1';}var newlinks=turn.links.root;for(var linkpos in function(){var k,ret={},s0=UNITLAYERS.pawns,s1=UNITLAYERS.bishops;for(k in s0){ret[k]=1;}for(k in s1){ret[k]=1;}return ret;}()){newlinks[linkpos]='selectunit1';}return turn;};game.start1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.debug1=function(){return{TERRAIN:TERRAIN};};})();(function(){var ownernames=["neutral","opp","my"];var player=2;var otherplayer=1;game.selectdeploytarget2=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectdeploytarget:markpos};var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectdeploytarget'});turn.links[newstepid]={};turn.links[newstepid].deploy='deploy2';return newstep;};game.selectdeploytarget2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.selectunit2=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectunit:markpos};var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectunit'});turn.links[newstepid]={};turn.links[newstepid].promote='promote2';return newstep;};game.selectunit2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.deploy2=function(turn,step){var ARTIFACTS={line:Object.assign({},step.ARTIFACTS.line)};var MARKS=step.MARKS;var UNITDATA=Object.assign({},step.UNITDATA);var clones=step.clones;var UNITLAYERS=step.UNITLAYERS;var newunitid='spawn'+clones++;UNITDATA[newunitid]={pos:MARKS['selectdeploytarget'],id:newunitid,group:'pawns',owner:0};MARKS={};UNITLAYERS={"bishops":{},"mybishops":{},"oppbishops":{},"neutralbishops":{},"kings":{},"mykings":{},"oppkings":{},"neutralkings":{},"pawns":{},"mypawns":{},"opppawns":{},"neutralpawns":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}ARTIFACTS={"line":{}};var walkstarts=UNITLAYERS.units;for(var STARTPOS in walkstarts){var allowedsteps=UNITLAYERS[(UNITLAYERS.units[STARTPOS]||{})['group']];var allwalkerdirs=[1,2,3,4];for(var walkerdirnbr=0;walkerdirnbr<4;walkerdirnbr++){var walkedsquares=[];var POS=STARTPOS;while((POS=connections[POS][allwalkerdirs[walkerdirnbr]])&&allowedsteps[POS]){walkedsquares.push(POS);}var WALKLENGTH=walkedsquares.length;for(var walkstepper=0;walkstepper<WALKLENGTH;walkstepper++){POS=walkedsquares[walkstepper];if(WALKLENGTH>1){ARTIFACTS['line'][POS]={};}}}}var newstepid=step.stepid+'-'+'deploy';var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,stepid:newstepid,name:'deploy',path:step.path.concat('deploy'),clones:clones});turn.links[newstepid]={};if(Object.keys(ARTIFACTS.line||{}).length!==0){var winner=2;var result=winner===2?'win':winner?'lose':'draw';turn.links[newstepid][result]='madeline';}else turn.links[newstepid].endturn="start"+otherplayer;return newstep;};game.deploy2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.promote2=function(turn,step){var ARTIFACTS={line:Object.assign({},step.ARTIFACTS.line)};var MARKS=step.MARKS;var UNITDATA=Object.assign({},step.UNITDATA);var UNITLAYERS=step.UNITLAYERS;var unitid=(UNITLAYERS.units[MARKS['selectunit']]||{}).id;if(unitid){UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{'group':!!UNITLAYERS.pawns[MARKS['selectunit']]?'bishops':'kings'});}MARKS={};UNITLAYERS={"bishops":{},"mybishops":{},"oppbishops":{},"neutralbishops":{},"kings":{},"mykings":{},"oppkings":{},"neutralkings":{},"pawns":{},"mypawns":{},"opppawns":{},"neutralpawns":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}ARTIFACTS={"line":{}};var walkstarts=UNITLAYERS.units;for(var STARTPOS in walkstarts){var allowedsteps=UNITLAYERS[(UNITLAYERS.units[STARTPOS]||{})['group']];var allwalkerdirs=[1,2,3,4];for(var walkerdirnbr=0;walkerdirnbr<4;walkerdirnbr++){var walkedsquares=[];var POS=STARTPOS;while((POS=connections[POS][allwalkerdirs[walkerdirnbr]])&&allowedsteps[POS]){walkedsquares.push(POS);}var WALKLENGTH=walkedsquares.length;for(var walkstepper=0;walkstepper<WALKLENGTH;walkstepper++){POS=walkedsquares[walkstepper];if(WALKLENGTH>1){ARTIFACTS['line'][POS]={};}}}}var newstepid=step.stepid+'-'+'promote';var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,stepid:newstepid,name:'promote',path:step.path.concat('promote')});turn.links[newstepid]={};if(Object.keys(ARTIFACTS.line||{}).length!==0){var winner=2;var result=winner===2?'win':winner?'lose':'draw';turn.links[newstepid][result]='madeline';}else turn.links[newstepid].endturn="start"+otherplayer;return newstep;};game.promote2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.start2=function(turn,step){var turn={steps:{},player:player,turn:turn.turn+1,links:{root:{}}};var MARKS={};var ARTIFACTS={"line":{}};var UNITDATA=step.UNITDATA;var UNITLAYERS={"bishops":{},"mybishops":{},"oppbishops":{},"neutralbishops":{},"kings":{},"mykings":{},"oppkings":{},"neutralkings":{},"pawns":{},"mypawns":{},"opppawns":{},"neutralpawns":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}var newstep=turn.steps.root={ARTIFACTS:ARTIFACTS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,MARKS:MARKS,stepid:'root',name:'start',clones:step.clones,path:[]};var newlinks=turn.links.root;for(var linkpos in function(){var ret={},s0=BOARD.board,s1=UNITLAYERS.units;for(var key in s0){if(!s1[key]){ret[key]=s0[key];}}return ret;}()){newlinks[linkpos]='selectdeploytarget2';}var newlinks=turn.links.root;for(var linkpos in function(){var k,ret={},s0=UNITLAYERS.pawns,s1=UNITLAYERS.bishops;for(k in s0){ret[k]=1;}for(k in s1){ret[k]=1;}return ret;}()){newlinks[linkpos]='selectunit2';}return turn;};game.start2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.debug2=function(){return{TERRAIN:TERRAIN};};})();function reduce(coll,iterator,acc){for(var key in coll){acc=iterator(acc,coll[key],key);}return acc;}game.newGame=function(){var turnseed={turn:0};var stepseed={UNITDATA:{},clones:0};return game.start1(turnseed,stepseed);};game.debug=function(){return{BOARD:BOARD,connections:connections,plr1:game.debug1(),plr2:game.debug2()};};game.commands={"deploy":1,"promote":1};game.graphics={"icons":{"kings":"kings","pawns":"pawns","bishops":"bishops"}};game.board={"width":4,"height":3};game.AI=[];game.id="semaphor";return game;}(),serauqs:function(){var game={};var connections={"faux":{},"a1":{"1":"a2","2":"b2","3":"b1"},"a2":{"1":"a3","2":"b3","3":"b2","4":"b1","5":"a1"},"a3":{"1":"a4","2":"b4","3":"b3","4":"b2","5":"a2"},"a4":{"3":"b4","4":"b3","5":"a3"},"b1":{"1":"b2","2":"c2","3":"c1","7":"a1","8":"a2"},"b2":{"1":"b3","2":"c3","3":"c2","4":"c1","5":"b1","6":"a1","7":"a2","8":"a3"},"b3":{"1":"b4","2":"c4","3":"c3","4":"c2","5":"b2","6":"a2","7":"a3","8":"a4"},"b4":{"3":"c4","4":"c3","5":"b3","6":"a3","7":"a4"},"c1":{"1":"c2","2":"d2","3":"d1","7":"b1","8":"b2"},"c2":{"1":"c3","2":"d3","3":"d2","4":"d1","5":"c1","6":"b1","7":"b2","8":"b3"},"c3":{"1":"c4","2":"d4","3":"d3","4":"d2","5":"c2","6":"b2","7":"b3","8":"b4"},"c4":{"3":"d4","4":"d3","5":"c3","6":"b3","7":"b4"},"d1":{"1":"d2","7":"c1","8":"c2"},"d2":{"1":"d3","5":"d1","6":"c1","7":"c2","8":"c3"},"d3":{"1":"d4","5":"d2","6":"c2","7":"c3","8":"c4"},"d4":{"5":"d3","6":"c3","7":"c4"}};var BOARD={"board":{"a1":{"colour":"dark","pos":"a1","x":1,"y":1},"a2":{"colour":"light","pos":"a2","x":1,"y":2},"a3":{"colour":"dark","pos":"a3","x":1,"y":3},"a4":{"colour":"light","pos":"a4","x":1,"y":4},"b1":{"colour":"light","pos":"b1","x":2,"y":1},"b2":{"colour":"dark","pos":"b2","x":2,"y":2},"b3":{"colour":"light","pos":"b3","x":2,"y":3},"b4":{"colour":"dark","pos":"b4","x":2,"y":4},"c1":{"colour":"dark","pos":"c1","x":3,"y":1},"c2":{"colour":"light","pos":"c2","x":3,"y":2},"c3":{"colour":"dark","pos":"c3","x":3,"y":3},"c4":{"colour":"light","pos":"c4","x":3,"y":4},"d1":{"colour":"light","pos":"d1","x":4,"y":1},"d2":{"colour":"dark","pos":"d2","x":4,"y":2},"d3":{"colour":"light","pos":"d3","x":4,"y":3},"d4":{"colour":"dark","pos":"d4","x":4,"y":4}},"light":{"a2":{"colour":"light","pos":"a2","x":1,"y":2},"a4":{"colour":"light","pos":"a4","x":1,"y":4},"b1":{"colour":"light","pos":"b1","x":2,"y":1},"b3":{"colour":"light","pos":"b3","x":2,"y":3},"c2":{"colour":"light","pos":"c2","x":3,"y":2},"c4":{"colour":"light","pos":"c4","x":3,"y":4},"d1":{"colour":"light","pos":"d1","x":4,"y":1},"d3":{"colour":"light","pos":"d3","x":4,"y":3}},"dark":{"a1":{"colour":"dark","pos":"a1","x":1,"y":1},"a3":{"colour":"dark","pos":"a3","x":1,"y":3},"b2":{"colour":"dark","pos":"b2","x":2,"y":2},"b4":{"colour":"dark","pos":"b4","x":2,"y":4},"c1":{"colour":"dark","pos":"c1","x":3,"y":1},"c3":{"colour":"dark","pos":"c3","x":3,"y":3},"d2":{"colour":"dark","pos":"d2","x":4,"y":2},"d4":{"colour":"dark","pos":"d4","x":4,"y":4}}};var relativedirs=[1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];(function(){var TERRAIN={"base":{"a1":{"pos":"a1","owner":1},"b1":{"pos":"b1","owner":1},"c1":{"pos":"c1","owner":1},"d1":{"pos":"d1","owner":1},"a4":{"pos":"a4","owner":2},"b4":{"pos":"b4","owner":2},"c4":{"pos":"c4","owner":2},"d4":{"pos":"d4","owner":2}},"mybase":{"a1":{"pos":"a1","owner":1},"b1":{"pos":"b1","owner":1},"c1":{"pos":"c1","owner":1},"d1":{"pos":"d1","owner":1}},"oppbase":{"a4":{"pos":"a4","owner":2},"b4":{"pos":"b4","owner":2},"c4":{"pos":"c4","owner":2},"d4":{"pos":"d4","owner":2}},"corners":{"a1":{"pos":"a1"},"a4":{"pos":"a4"},"d1":{"pos":"d1"},"d4":{"pos":"d4"}},"middle":{"b2":{"pos":"b2"},"c2":{"pos":"c2"},"b3":{"pos":"b3"},"c3":{"pos":"c3"}}};var ownernames=["neutral","my","opp"];var player=1;var otherplayer=2;game.selectunit1=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{movetargets:Object.assign({},step.ARTIFACTS.movetargets)});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectunit:markpos};var STARTPOS=MARKS['selectunit'];var neighbourdirs=[1,2,3,4,5,6,7,8];var startconnections=connections[STARTPOS];for(var dirnbr=0;dirnbr<8;dirnbr++){var POS=startconnections[neighbourdirs[dirnbr]];if(POS&&!UNITLAYERS.units[POS]){ARTIFACTS['movetargets'][POS]={};}}var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectunit'});turn.links[newstepid]={};if(3>turn.turn){turn.links[newstepid].makewild='makewild1';}else{var newlinks=turn.links[newstepid];for(var linkpos in ARTIFACTS.movetargets){newlinks[linkpos]='selectmovetarget1';}}return newstep;};game.selectunit1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.selectmovetarget1=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectmovetarget:markpos,selectunit:step.MARKS.selectunit};var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectmovetarget'});turn.links[newstepid]={};turn.links[newstepid].move='move1';return newstep;};game.selectmovetarget1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.makewild1=function(turn,step){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var MARKS=step.MARKS;var UNITDATA=Object.assign({},step.UNITDATA);var UNITLAYERS=step.UNITLAYERS;var unitid=(UNITLAYERS.units[MARKS['selectunit']]||{}).id;if(unitid){UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{'group':'wild'});}MARKS={};UNITLAYERS={"soldiers":{},"mysoldiers":{},"oppsoldiers":{},"neutralsoldiers":{},"wild":{},"mywild":{},"oppwild":{},"neutralwild":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}ARTIFACTS={"movetargets":{},"winline":{}};var newstepid=step.stepid+'-'+'makewild';var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,stepid:newstepid,name:'makewild',path:step.path.concat('makewild')});turn.links[newstepid]={};if(Object.keys(ARTIFACTS.winline||{}).length!==0){var winner=1;var result=winner===1?'win':winner?'lose':'draw';turn.links[newstepid][result]='madeline';}else if(Object.keys(function(){var ret={},s0=TERRAIN.corners,s1=function(){var k,ret={},s0=UNITLAYERS.myunits,s1=UNITLAYERS.oppwild;for(k in s0){ret[k]=1;}for(k in s1){ret[k]=1;}return ret;}();for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}()).length>3){var winner=1;var result=winner===1?'win':winner?'lose':'draw';turn.links[newstepid][result]='madex';}else if(Object.keys(function(){var ret={},s0=TERRAIN.middle,s1=function(){var k,ret={},s0=UNITLAYERS.myunits,s1=UNITLAYERS.oppwild;for(k in s0){ret[k]=1;}for(k in s1){ret[k]=1;}return ret;}();for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}()).length>3){var winner=1;var result=winner===1?'win':winner?'lose':'draw';turn.links[newstepid][result]='tookcenter';}else turn.links[newstepid].endturn="start"+otherplayer;return newstep;};game.makewild1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.move1=function(turn,step){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{winline:Object.assign({},step.ARTIFACTS.winline)});var MARKS=step.MARKS;var UNITDATA=Object.assign({},step.UNITDATA);var UNITLAYERS=step.UNITLAYERS;var unitid=(UNITLAYERS.units[MARKS['selectunit']]||{}).id;if(unitid){UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{'pos':MARKS['selectmovetarget']});}MARKS={};UNITLAYERS={"soldiers":{},"mysoldiers":{},"oppsoldiers":{},"neutralsoldiers":{},"wild":{},"mywild":{},"oppwild":{},"neutralwild":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}ARTIFACTS={"movetargets":{},"winline":{}};var allowedsteps=function(){var k,ret={},s0=UNITLAYERS.myunits,s1=UNITLAYERS.oppwild;for(k in s0){ret[k]=1;}for(k in s1){ret[k]=1;}return ret;}();var walkstarts=function(){var k,ret={},s0=UNITLAYERS.myunits,s1=UNITLAYERS.oppwild;for(k in s0){ret[k]=1;}for(k in s1){ret[k]=1;}return ret;}();for(var STARTPOS in walkstarts){var allwalkerdirs=[1,2,3,4,5,6,7,8];for(var walkerdirnbr=0;walkerdirnbr<8;walkerdirnbr++){var walkedsquares=[];var POS=STARTPOS;var walkpositionstocount=TERRAIN.mybase;var CURRENTCOUNT=0;while((POS=connections[POS][allwalkerdirs[walkerdirnbr]])&&allowedsteps[POS]){walkedsquares.push(POS);CURRENTCOUNT+=walkpositionstocount[POS]?1:0;}var WALKLENGTH=walkedsquares.length;var TOTALCOUNT=CURRENTCOUNT;if(WALKLENGTH===3&&TOTALCOUNT!==3){ARTIFACTS['winline'][STARTPOS]={};}}}var newstepid=step.stepid+'-'+'move';var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,stepid:newstepid,name:'move',path:step.path.concat('move')});turn.links[newstepid]={};if(Object.keys(ARTIFACTS.winline||{}).length!==0){var winner=1;var result=winner===1?'win':winner?'lose':'draw';turn.links[newstepid][result]='madeline';}else if(Object.keys(function(){var ret={},s0=TERRAIN.corners,s1=function(){var k,ret={},s0=UNITLAYERS.myunits,s1=UNITLAYERS.oppwild;for(k in s0){ret[k]=1;}for(k in s1){ret[k]=1;}return ret;}();for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}()).length>3){var winner=1;var result=winner===1?'win':winner?'lose':'draw';turn.links[newstepid][result]='madex';}else if(Object.keys(function(){var ret={},s0=TERRAIN.middle,s1=function(){var k,ret={},s0=UNITLAYERS.myunits,s1=UNITLAYERS.oppwild;for(k in s0){ret[k]=1;}for(k in s1){ret[k]=1;}return ret;}();for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}()).length>3){var winner=1;var result=winner===1?'win':winner?'lose':'draw';turn.links[newstepid][result]='tookcenter';}else turn.links[newstepid].endturn="start"+otherplayer;return newstep;};game.move1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.start1=function(turn,step){var turn={steps:{},player:player,turn:turn.turn+1,links:{root:{}}};var MARKS={};var ARTIFACTS={"movetargets":{},"winline":{}};var UNITDATA=step.UNITDATA;var UNITLAYERS={"soldiers":{},"mysoldiers":{},"oppsoldiers":{},"neutralsoldiers":{},"wild":{},"mywild":{},"oppwild":{},"neutralwild":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}var newstep=turn.steps.root={ARTIFACTS:ARTIFACTS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,MARKS:MARKS,stepid:'root',name:'start',path:[]};var newlinks=turn.links.root;for(var linkpos in UNITLAYERS.myunits){newlinks[linkpos]='selectunit1';}return turn;};game.start1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.debug1=function(){return{TERRAIN:TERRAIN};};})();(function(){var TERRAIN={"base":{"a1":{"pos":"a1","owner":1},"b1":{"pos":"b1","owner":1},"c1":{"pos":"c1","owner":1},"d1":{"pos":"d1","owner":1},"a4":{"pos":"a4","owner":2},"b4":{"pos":"b4","owner":2},"c4":{"pos":"c4","owner":2},"d4":{"pos":"d4","owner":2}},"oppbase":{"a1":{"pos":"a1","owner":1},"b1":{"pos":"b1","owner":1},"c1":{"pos":"c1","owner":1},"d1":{"pos":"d1","owner":1}},"mybase":{"a4":{"pos":"a4","owner":2},"b4":{"pos":"b4","owner":2},"c4":{"pos":"c4","owner":2},"d4":{"pos":"d4","owner":2}},"corners":{"a1":{"pos":"a1"},"a4":{"pos":"a4"},"d1":{"pos":"d1"},"d4":{"pos":"d4"}},"middle":{"b2":{"pos":"b2"},"c2":{"pos":"c2"},"b3":{"pos":"b3"},"c3":{"pos":"c3"}}};var ownernames=["neutral","opp","my"];var player=2;var otherplayer=1;game.selectunit2=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{movetargets:Object.assign({},step.ARTIFACTS.movetargets)});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectunit:markpos};var STARTPOS=MARKS['selectunit'];var neighbourdirs=[1,2,3,4,5,6,7,8];var startconnections=connections[STARTPOS];for(var dirnbr=0;dirnbr<8;dirnbr++){var POS=startconnections[neighbourdirs[dirnbr]];if(POS&&!UNITLAYERS.units[POS]){ARTIFACTS['movetargets'][POS]={};}}var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectunit'});turn.links[newstepid]={};if(3>turn.turn){turn.links[newstepid].makewild='makewild2';}else{var newlinks=turn.links[newstepid];for(var linkpos in ARTIFACTS.movetargets){newlinks[linkpos]='selectmovetarget2';}}return newstep;};game.selectunit2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.selectmovetarget2=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectmovetarget:markpos,selectunit:step.MARKS.selectunit};var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectmovetarget'});turn.links[newstepid]={};turn.links[newstepid].move='move2';return newstep;};game.selectmovetarget2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.makewild2=function(turn,step){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var MARKS=step.MARKS;var UNITDATA=Object.assign({},step.UNITDATA);var UNITLAYERS=step.UNITLAYERS;var unitid=(UNITLAYERS.units[MARKS['selectunit']]||{}).id;if(unitid){UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{'group':'wild'});}MARKS={};UNITLAYERS={"soldiers":{},"mysoldiers":{},"oppsoldiers":{},"neutralsoldiers":{},"wild":{},"mywild":{},"oppwild":{},"neutralwild":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}ARTIFACTS={"movetargets":{},"winline":{}};var newstepid=step.stepid+'-'+'makewild';var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,stepid:newstepid,name:'makewild',path:step.path.concat('makewild')});turn.links[newstepid]={};if(Object.keys(ARTIFACTS.winline||{}).length!==0){var winner=2;var result=winner===2?'win':winner?'lose':'draw';turn.links[newstepid][result]='madeline';}else if(Object.keys(function(){var ret={},s0=TERRAIN.corners,s1=function(){var k,ret={},s0=UNITLAYERS.myunits,s1=UNITLAYERS.oppwild;for(k in s0){ret[k]=1;}for(k in s1){ret[k]=1;}return ret;}();for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}()).length>3){var winner=2;var result=winner===2?'win':winner?'lose':'draw';turn.links[newstepid][result]='madex';}else if(Object.keys(function(){var ret={},s0=TERRAIN.middle,s1=function(){var k,ret={},s0=UNITLAYERS.myunits,s1=UNITLAYERS.oppwild;for(k in s0){ret[k]=1;}for(k in s1){ret[k]=1;}return ret;}();for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}()).length>3){var winner=2;var result=winner===2?'win':winner?'lose':'draw';turn.links[newstepid][result]='tookcenter';}else turn.links[newstepid].endturn="start"+otherplayer;return newstep;};game.makewild2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.move2=function(turn,step){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{winline:Object.assign({},step.ARTIFACTS.winline)});var MARKS=step.MARKS;var UNITDATA=Object.assign({},step.UNITDATA);var UNITLAYERS=step.UNITLAYERS;var unitid=(UNITLAYERS.units[MARKS['selectunit']]||{}).id;if(unitid){UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{'pos':MARKS['selectmovetarget']});}MARKS={};UNITLAYERS={"soldiers":{},"mysoldiers":{},"oppsoldiers":{},"neutralsoldiers":{},"wild":{},"mywild":{},"oppwild":{},"neutralwild":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}ARTIFACTS={"movetargets":{},"winline":{}};var allowedsteps=function(){var k,ret={},s0=UNITLAYERS.myunits,s1=UNITLAYERS.oppwild;for(k in s0){ret[k]=1;}for(k in s1){ret[k]=1;}return ret;}();var walkstarts=function(){var k,ret={},s0=UNITLAYERS.myunits,s1=UNITLAYERS.oppwild;for(k in s0){ret[k]=1;}for(k in s1){ret[k]=1;}return ret;}();for(var STARTPOS in walkstarts){var allwalkerdirs=[1,2,3,4,5,6,7,8];for(var walkerdirnbr=0;walkerdirnbr<8;walkerdirnbr++){var walkedsquares=[];var POS=STARTPOS;var walkpositionstocount=TERRAIN.mybase;var CURRENTCOUNT=0;while((POS=connections[POS][allwalkerdirs[walkerdirnbr]])&&allowedsteps[POS]){walkedsquares.push(POS);CURRENTCOUNT+=walkpositionstocount[POS]?1:0;}var WALKLENGTH=walkedsquares.length;var TOTALCOUNT=CURRENTCOUNT;if(WALKLENGTH===3&&TOTALCOUNT!==3){ARTIFACTS['winline'][STARTPOS]={};}}}var newstepid=step.stepid+'-'+'move';var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,stepid:newstepid,name:'move',path:step.path.concat('move')});turn.links[newstepid]={};if(Object.keys(ARTIFACTS.winline||{}).length!==0){var winner=2;var result=winner===2?'win':winner?'lose':'draw';turn.links[newstepid][result]='madeline';}else if(Object.keys(function(){var ret={},s0=TERRAIN.corners,s1=function(){var k,ret={},s0=UNITLAYERS.myunits,s1=UNITLAYERS.oppwild;for(k in s0){ret[k]=1;}for(k in s1){ret[k]=1;}return ret;}();for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}()).length>3){var winner=2;var result=winner===2?'win':winner?'lose':'draw';turn.links[newstepid][result]='madex';}else if(Object.keys(function(){var ret={},s0=TERRAIN.middle,s1=function(){var k,ret={},s0=UNITLAYERS.myunits,s1=UNITLAYERS.oppwild;for(k in s0){ret[k]=1;}for(k in s1){ret[k]=1;}return ret;}();for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}()).length>3){var winner=2;var result=winner===2?'win':winner?'lose':'draw';turn.links[newstepid][result]='tookcenter';}else turn.links[newstepid].endturn="start"+otherplayer;return newstep;};game.move2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.start2=function(turn,step){var turn={steps:{},player:player,turn:turn.turn+1,links:{root:{}}};var MARKS={};var ARTIFACTS={"movetargets":{},"winline":{}};var UNITDATA=step.UNITDATA;var UNITLAYERS={"soldiers":{},"mysoldiers":{},"oppsoldiers":{},"neutralsoldiers":{},"wild":{},"mywild":{},"oppwild":{},"neutralwild":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}var newstep=turn.steps.root={ARTIFACTS:ARTIFACTS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,MARKS:MARKS,stepid:'root',name:'start',path:[]};var newlinks=turn.links.root;for(var linkpos in UNITLAYERS.myunits){newlinks[linkpos]='selectunit2';}return turn;};game.start2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.debug2=function(){return{TERRAIN:TERRAIN};};})();function reduce(coll,iterator,acc){for(var key in coll){acc=iterator(acc,coll[key],key);}return acc;}game.newGame=function(){var turnseed={turn:0};var stepseed={UNITDATA:{"unit1":{"pos":"a1","id":"unit1","group":"soldiers","owner":1},"unit2":{"pos":"b1","id":"unit2","group":"soldiers","owner":1},"unit3":{"pos":"c1","id":"unit3","group":"soldiers","owner":1},"unit4":{"pos":"d1","id":"unit4","group":"soldiers","owner":1},"unit5":{"pos":"a4","id":"unit5","group":"soldiers","owner":2},"unit6":{"pos":"b4","id":"unit6","group":"soldiers","owner":2},"unit7":{"pos":"c4","id":"unit7","group":"soldiers","owner":2},"unit8":{"pos":"d4","id":"unit8","group":"soldiers","owner":2}}};return game.start1(turnseed,stepseed);};game.debug=function(){return{BOARD:BOARD,connections:connections,plr1:game.debug1(),plr2:game.debug2()};};game.commands={"makewild":1,"move":1};game.graphics={"icons":{"soldiers":"pawns","wild":"kings"},"tiles":{"corners":"grass","middle":"castle"}};game.board={"height":4,"width":4,"terrain":{"base":{"1":[["rect","a1","d1"]],"2":[["rect","a4","d4"]]},"corners":["a1","a4","d1","d4"],"middle":[["rect","b2","c3"]]}};game.AI=[];game.id="serauqs";return game;}(),snijpunt:function(){var game={};var connections={"faux":{},"a1":{"1":"a2","2":"b2","3":"b1"},"a2":{"1":"a3","2":"b3","3":"b2","4":"b1","5":"a1"},"a3":{"1":"a4","2":"b4","3":"b3","4":"b2","5":"a2"},"a4":{"1":"a5","2":"b5","3":"b4","4":"b3","5":"a3"},"a5":{"1":"a6","2":"b6","3":"b5","4":"b4","5":"a4"},"a6":{"3":"b6","4":"b5","5":"a5"},"b1":{"1":"b2","2":"c2","3":"c1","7":"a1","8":"a2"},"b2":{"1":"b3","2":"c3","3":"c2","4":"c1","5":"b1","6":"a1","7":"a2","8":"a3"},"b3":{"1":"b4","2":"c4","3":"c3","4":"c2","5":"b2","6":"a2","7":"a3","8":"a4"},"b4":{"1":"b5","2":"c5","3":"c4","4":"c3","5":"b3","6":"a3","7":"a4","8":"a5"},"b5":{"1":"b6","2":"c6","3":"c5","4":"c4","5":"b4","6":"a4","7":"a5","8":"a6"},"b6":{"3":"c6","4":"c5","5":"b5","6":"a5","7":"a6"},"c1":{"1":"c2","2":"d2","3":"d1","7":"b1","8":"b2"},"c2":{"1":"c3","2":"d3","3":"d2","4":"d1","5":"c1","6":"b1","7":"b2","8":"b3"},"c3":{"1":"c4","2":"d4","3":"d3","4":"d2","5":"c2","6":"b2","7":"b3","8":"b4"},"c4":{"1":"c5","2":"d5","3":"d4","4":"d3","5":"c3","6":"b3","7":"b4","8":"b5"},"c5":{"1":"c6","2":"d6","3":"d5","4":"d4","5":"c4","6":"b4","7":"b5","8":"b6"},"c6":{"3":"d6","4":"d5","5":"c5","6":"b5","7":"b6"},"d1":{"1":"d2","2":"e2","3":"e1","7":"c1","8":"c2"},"d2":{"1":"d3","2":"e3","3":"e2","4":"e1","5":"d1","6":"c1","7":"c2","8":"c3"},"d3":{"1":"d4","2":"e4","3":"e3","4":"e2","5":"d2","6":"c2","7":"c3","8":"c4"},"d4":{"1":"d5","2":"e5","3":"e4","4":"e3","5":"d3","6":"c3","7":"c4","8":"c5"},"d5":{"1":"d6","2":"e6","3":"e5","4":"e4","5":"d4","6":"c4","7":"c5","8":"c6"},"d6":{"3":"e6","4":"e5","5":"d5","6":"c5","7":"c6"},"e1":{"1":"e2","2":"f2","3":"f1","7":"d1","8":"d2"},"e2":{"1":"e3","2":"f3","3":"f2","4":"f1","5":"e1","6":"d1","7":"d2","8":"d3"},"e3":{"1":"e4","2":"f4","3":"f3","4":"f2","5":"e2","6":"d2","7":"d3","8":"d4"},"e4":{"1":"e5","2":"f5","3":"f4","4":"f3","5":"e3","6":"d3","7":"d4","8":"d5"},"e5":{"1":"e6","2":"f6","3":"f5","4":"f4","5":"e4","6":"d4","7":"d5","8":"d6"},"e6":{"3":"f6","4":"f5","5":"e5","6":"d5","7":"d6"},"f1":{"1":"f2","7":"e1","8":"e2"},"f2":{"1":"f3","5":"f1","6":"e1","7":"e2","8":"e3"},"f3":{"1":"f4","5":"f2","6":"e2","7":"e3","8":"e4"},"f4":{"1":"f5","5":"f3","6":"e3","7":"e4","8":"e5"},"f5":{"1":"f6","5":"f4","6":"e4","7":"e5","8":"e6"},"f6":{"5":"f5","6":"e5","7":"e6"}};var BOARD={"board":{"a1":{"colour":"dark","pos":"a1","x":1,"y":1},"a2":{"colour":"light","pos":"a2","x":1,"y":2},"a3":{"colour":"dark","pos":"a3","x":1,"y":3},"a4":{"colour":"light","pos":"a4","x":1,"y":4},"a5":{"colour":"dark","pos":"a5","x":1,"y":5},"a6":{"colour":"light","pos":"a6","x":1,"y":6},"b1":{"colour":"light","pos":"b1","x":2,"y":1},"b2":{"colour":"dark","pos":"b2","x":2,"y":2},"b3":{"colour":"light","pos":"b3","x":2,"y":3},"b4":{"colour":"dark","pos":"b4","x":2,"y":4},"b5":{"colour":"light","pos":"b5","x":2,"y":5},"b6":{"colour":"dark","pos":"b6","x":2,"y":6},"c1":{"colour":"dark","pos":"c1","x":3,"y":1},"c2":{"colour":"light","pos":"c2","x":3,"y":2},"c3":{"colour":"dark","pos":"c3","x":3,"y":3},"c4":{"colour":"light","pos":"c4","x":3,"y":4},"c5":{"colour":"dark","pos":"c5","x":3,"y":5},"c6":{"colour":"light","pos":"c6","x":3,"y":6},"d1":{"colour":"light","pos":"d1","x":4,"y":1},"d2":{"colour":"dark","pos":"d2","x":4,"y":2},"d3":{"colour":"light","pos":"d3","x":4,"y":3},"d4":{"colour":"dark","pos":"d4","x":4,"y":4},"d5":{"colour":"light","pos":"d5","x":4,"y":5},"d6":{"colour":"dark","pos":"d6","x":4,"y":6},"e1":{"colour":"dark","pos":"e1","x":5,"y":1},"e2":{"colour":"light","pos":"e2","x":5,"y":2},"e3":{"colour":"dark","pos":"e3","x":5,"y":3},"e4":{"colour":"light","pos":"e4","x":5,"y":4},"e5":{"colour":"dark","pos":"e5","x":5,"y":5},"e6":{"colour":"light","pos":"e6","x":5,"y":6},"f1":{"colour":"light","pos":"f1","x":6,"y":1},"f2":{"colour":"dark","pos":"f2","x":6,"y":2},"f3":{"colour":"light","pos":"f3","x":6,"y":3},"f4":{"colour":"dark","pos":"f4","x":6,"y":4},"f5":{"colour":"light","pos":"f5","x":6,"y":5},"f6":{"colour":"dark","pos":"f6","x":6,"y":6}},"light":{"a2":{"colour":"light","pos":"a2","x":1,"y":2},"a4":{"colour":"light","pos":"a4","x":1,"y":4},"a6":{"colour":"light","pos":"a6","x":1,"y":6},"b1":{"colour":"light","pos":"b1","x":2,"y":1},"b3":{"colour":"light","pos":"b3","x":2,"y":3},"b5":{"colour":"light","pos":"b5","x":2,"y":5},"c2":{"colour":"light","pos":"c2","x":3,"y":2},"c4":{"colour":"light","pos":"c4","x":3,"y":4},"c6":{"colour":"light","pos":"c6","x":3,"y":6},"d1":{"colour":"light","pos":"d1","x":4,"y":1},"d3":{"colour":"light","pos":"d3","x":4,"y":3},"d5":{"colour":"light","pos":"d5","x":4,"y":5},"e2":{"colour":"light","pos":"e2","x":5,"y":2},"e4":{"colour":"light","pos":"e4","x":5,"y":4},"e6":{"colour":"light","pos":"e6","x":5,"y":6},"f1":{"colour":"light","pos":"f1","x":6,"y":1},"f3":{"colour":"light","pos":"f3","x":6,"y":3},"f5":{"colour":"light","pos":"f5","x":6,"y":5}},"dark":{"a1":{"colour":"dark","pos":"a1","x":1,"y":1},"a3":{"colour":"dark","pos":"a3","x":1,"y":3},"a5":{"colour":"dark","pos":"a5","x":1,"y":5},"b2":{"colour":"dark","pos":"b2","x":2,"y":2},"b4":{"colour":"dark","pos":"b4","x":2,"y":4},"b6":{"colour":"dark","pos":"b6","x":2,"y":6},"c1":{"colour":"dark","pos":"c1","x":3,"y":1},"c3":{"colour":"dark","pos":"c3","x":3,"y":3},"c5":{"colour":"dark","pos":"c5","x":3,"y":5},"d2":{"colour":"dark","pos":"d2","x":4,"y":2},"d4":{"colour":"dark","pos":"d4","x":4,"y":4},"d6":{"colour":"dark","pos":"d6","x":4,"y":6},"e1":{"colour":"dark","pos":"e1","x":5,"y":1},"e3":{"colour":"dark","pos":"e3","x":5,"y":3},"e5":{"colour":"dark","pos":"e5","x":5,"y":5},"f2":{"colour":"dark","pos":"f2","x":6,"y":2},"f4":{"colour":"dark","pos":"f4","x":6,"y":4},"f6":{"colour":"dark","pos":"f6","x":6,"y":6}}};var relativedirs=[1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];(function(){var TERRAIN={"zone":{"b6":{"pos":"b6","owner":1},"c6":{"pos":"c6","owner":1},"d6":{"pos":"d6","owner":1},"e6":{"pos":"e6","owner":1},"f6":{"pos":"f6","owner":1},"a1":{"pos":"a1","owner":2},"a2":{"pos":"a2","owner":2},"a3":{"pos":"a3","owner":2},"a4":{"pos":"a4","owner":2},"a5":{"pos":"a5","owner":2}},"myzone":{"b6":{"pos":"b6","owner":1},"c6":{"pos":"c6","owner":1},"d6":{"pos":"d6","owner":1},"e6":{"pos":"e6","owner":1},"f6":{"pos":"f6","owner":1}},"oppzone":{"a1":{"pos":"a1","owner":2},"a2":{"pos":"a2","owner":2},"a3":{"pos":"a3","owner":2},"a4":{"pos":"a4","owner":2},"a5":{"pos":"a5","owner":2}},"corner":{"a6":{"pos":"a6"}}};var ownernames=["neutral","my","opp"];var player=1;var otherplayer=2;game.selecttarget1=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{intersection:Object.assign({},step.ARTIFACTS.intersection)});var UNITLAYERS=step.UNITLAYERS;var MARKS={selecttarget:markpos};var STARTPOS=MARKS['selecttarget'];var DIR=5;var POS=STARTPOS;while(POS=connections[POS][5]){if(ARTIFACTS.enemyline[POS]){ARTIFACTS['intersection'][POS]={};}}var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selecttarget'});turn.links[newstepid]={};turn.links[newstepid].snipe='snipe1';return newstep;};game.selecttarget1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.snipe1=function(turn,step){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{winline:Object.assign({},step.ARTIFACTS.winline),loseline:Object.assign({},step.ARTIFACTS.loseline)});var MARKS=step.MARKS;var UNITDATA=Object.assign({},step.UNITDATA);var clones=step.clones;var UNITLAYERS=step.UNITLAYERS;if(Object.keys(UNITLAYERS.mysniper||{}).length===0){var newunitid='spawn'+clones++;UNITDATA[newunitid]={pos:MARKS['selecttarget'],id:newunitid,group:'sniper',owner:player};}else{var unitid=(UNITLAYERS.units[Object.keys(UNITLAYERS.mysniper)[0]]||{}).id;if(unitid){UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{'pos':MARKS['selecttarget']});}}if(Object.keys(UNITLAYERS.oppsniper||{}).length!==0){if(!!UNITLAYERS.units[Object.keys(ARTIFACTS.intersection)[0]]){var unitid=(UNITLAYERS.units[Object.keys(ARTIFACTS.intersection)[0]]||{}).id;if(unitid){UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{'owner':(UNITLAYERS.units[Object.keys(ARTIFACTS.intersection)[0]]||{})['owner']===2?1:2});}}else{var newunitid='spawn'+clones++;UNITDATA[newunitid]={pos:Object.keys(ARTIFACTS.intersection)[0],id:newunitid,group:'soldiers',owner:1,from:MARKS['selecttarget']};}}MARKS={};UNITLAYERS={"sniper":{},"mysniper":{},"oppsniper":{},"neutralsniper":{},"soldiers":{},"mysoldiers":{},"oppsoldiers":{},"neutralsoldiers":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}ARTIFACTS={"winline":{},"loseline":{},"intersection":{},"enemyline":{},"potentialempties":{},"mandatory":{}};var walkstarts=UNITLAYERS.soldiers;for(var STARTPOS in walkstarts){var allowedsteps=!!UNITLAYERS.mysoldiers[STARTPOS]?UNITLAYERS.mysoldiers:UNITLAYERS.oppsoldiers;var allwalkerdirs=[1,2,3,4,5,6,7,8];for(var walkerdirnbr=0;walkerdirnbr<8;walkerdirnbr++){var walkedsquares=[];var POS=STARTPOS;while((POS=connections[POS][allwalkerdirs[walkerdirnbr]])&&allowedsteps[POS]){walkedsquares.push(POS);}var WALKLENGTH=walkedsquares.length;if(WALKLENGTH>2){ARTIFACTS[!!UNITLAYERS.mysoldiers[STARTPOS]?'winline':'loseline'][STARTPOS]={};}}}var newstepid=step.stepid+'-'+'snipe';var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,stepid:newstepid,name:'snipe',path:step.path.concat('snipe'),clones:clones});turn.links[newstepid]={};if(Object.keys(ARTIFACTS.winline||{}).length!==0){var winner=1;var result=winner===1?'win':winner?'lose':'draw';turn.links[newstepid][result]='madeline';}else if(Object.keys(ARTIFACTS.loseline||{}).length!==0){var winner=2;var result=winner===1?'win':winner?'lose':'draw';turn.links[newstepid][result]='madeoppline';}else turn.links[newstepid].endturn="start"+otherplayer;return newstep;};game.snipe1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.start1=function(turn,step){var turn={steps:{},player:player,turn:turn.turn+1,links:{root:{}}};var MARKS={};var ARTIFACTS={"winline":{},"loseline":{},"intersection":{},"enemyline":{},"potentialempties":{},"mandatory":{}};var UNITDATA=step.UNITDATA;var UNITLAYERS={"sniper":{},"mysniper":{},"oppsniper":{},"neutralsniper":{},"soldiers":{},"mysoldiers":{},"oppsoldiers":{},"neutralsoldiers":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}if(Object.keys(UNITLAYERS.oppsniper||{}).length!==0){var STARTPOS=Object.keys(UNITLAYERS.oppsniper)[0];var DIR=3;var POS=STARTPOS;while(POS=connections[POS][3]){if(!UNITLAYERS.units[POS]){ARTIFACTS['potentialempties'][POS]={};}ARTIFACTS['enemyline'][POS]={};}var walkstarts=ARTIFACTS.potentialempties;for(var STARTPOS in walkstarts){var DIR=1;var walkedsquares=[];var POS=STARTPOS;while(POS=connections[POS][1]){walkedsquares.push(POS);}var WALKLENGTH=walkedsquares.length;if(WALKLENGTH){if(!UNITLAYERS.sniper[walkedsquares[WALKLENGTH-1]]){ARTIFACTS['mandatory'][walkedsquares[WALKLENGTH-1]]={};}}}}var newstep=turn.steps.root={ARTIFACTS:ARTIFACTS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,MARKS:MARKS,stepid:'root',name:'start',clones:step.clones,path:[]};var newlinks=turn.links.root;for(var linkpos in Object.keys(ARTIFACTS.mandatory||{}).length===0?function(){var ret={},s0=TERRAIN.myzone,s1=UNITLAYERS.sniper;for(var key in s0){if(!s1[key]){ret[key]=s0[key];}}return ret;}():ARTIFACTS.mandatory){newlinks[linkpos]='selecttarget1';}return turn;};game.start1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return Object.keys(UNITLAYERS.mysniper||{}).length===0?'Select initial sniper deployment':'Select where to snipe from';};game.debug1=function(){return{TERRAIN:TERRAIN};};})();(function(){var TERRAIN={"zone":{"b6":{"pos":"b6","owner":1},"c6":{"pos":"c6","owner":1},"d6":{"pos":"d6","owner":1},"e6":{"pos":"e6","owner":1},"f6":{"pos":"f6","owner":1},"a1":{"pos":"a1","owner":2},"a2":{"pos":"a2","owner":2},"a3":{"pos":"a3","owner":2},"a4":{"pos":"a4","owner":2},"a5":{"pos":"a5","owner":2}},"oppzone":{"b6":{"pos":"b6","owner":1},"c6":{"pos":"c6","owner":1},"d6":{"pos":"d6","owner":1},"e6":{"pos":"e6","owner":1},"f6":{"pos":"f6","owner":1}},"myzone":{"a1":{"pos":"a1","owner":2},"a2":{"pos":"a2","owner":2},"a3":{"pos":"a3","owner":2},"a4":{"pos":"a4","owner":2},"a5":{"pos":"a5","owner":2}},"corner":{"a6":{"pos":"a6"}}};var ownernames=["neutral","opp","my"];var player=2;var otherplayer=1;game.selecttarget2=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{intersection:Object.assign({},step.ARTIFACTS.intersection)});var UNITLAYERS=step.UNITLAYERS;var MARKS={selecttarget:markpos};var STARTPOS=MARKS['selecttarget'];var DIR=3;var POS=STARTPOS;while(POS=connections[POS][3]){if(ARTIFACTS.enemyline[POS]){ARTIFACTS['intersection'][POS]={};}}var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selecttarget'});turn.links[newstepid]={};turn.links[newstepid].snipe='snipe2';return newstep;};game.selecttarget2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.snipe2=function(turn,step){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{winline:Object.assign({},step.ARTIFACTS.winline),loseline:Object.assign({},step.ARTIFACTS.loseline)});var MARKS=step.MARKS;var UNITDATA=Object.assign({},step.UNITDATA);var clones=step.clones;var UNITLAYERS=step.UNITLAYERS;if(Object.keys(UNITLAYERS.mysniper||{}).length===0){var newunitid='spawn'+clones++;UNITDATA[newunitid]={pos:MARKS['selecttarget'],id:newunitid,group:'sniper',owner:player};}else{var unitid=(UNITLAYERS.units[Object.keys(UNITLAYERS.mysniper)[0]]||{}).id;if(unitid){UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{'pos':MARKS['selecttarget']});}}if(Object.keys(UNITLAYERS.oppsniper||{}).length!==0){if(!!UNITLAYERS.units[Object.keys(ARTIFACTS.intersection)[0]]){var unitid=(UNITLAYERS.units[Object.keys(ARTIFACTS.intersection)[0]]||{}).id;if(unitid){UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{'owner':(UNITLAYERS.units[Object.keys(ARTIFACTS.intersection)[0]]||{})['owner']===2?1:2});}}else{var newunitid='spawn'+clones++;UNITDATA[newunitid]={pos:Object.keys(ARTIFACTS.intersection)[0],id:newunitid,group:'soldiers',owner:2,from:MARKS['selecttarget']};}}MARKS={};UNITLAYERS={"sniper":{},"mysniper":{},"oppsniper":{},"neutralsniper":{},"soldiers":{},"mysoldiers":{},"oppsoldiers":{},"neutralsoldiers":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}ARTIFACTS={"winline":{},"loseline":{},"intersection":{},"enemyline":{},"potentialempties":{},"mandatory":{}};var walkstarts=UNITLAYERS.soldiers;for(var STARTPOS in walkstarts){var allowedsteps=!!UNITLAYERS.mysoldiers[STARTPOS]?UNITLAYERS.mysoldiers:UNITLAYERS.oppsoldiers;var allwalkerdirs=[1,2,3,4,5,6,7,8];for(var walkerdirnbr=0;walkerdirnbr<8;walkerdirnbr++){var walkedsquares=[];var POS=STARTPOS;while((POS=connections[POS][allwalkerdirs[walkerdirnbr]])&&allowedsteps[POS]){walkedsquares.push(POS);}var WALKLENGTH=walkedsquares.length;if(WALKLENGTH>2){ARTIFACTS[!!UNITLAYERS.mysoldiers[STARTPOS]?'winline':'loseline'][STARTPOS]={};}}}var newstepid=step.stepid+'-'+'snipe';var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,stepid:newstepid,name:'snipe',path:step.path.concat('snipe'),clones:clones});turn.links[newstepid]={};if(Object.keys(ARTIFACTS.winline||{}).length!==0){var winner=2;var result=winner===2?'win':winner?'lose':'draw';turn.links[newstepid][result]='madeline';}else if(Object.keys(ARTIFACTS.loseline||{}).length!==0){var winner=1;var result=winner===2?'win':winner?'lose':'draw';turn.links[newstepid][result]='madeoppline';}else turn.links[newstepid].endturn="start"+otherplayer;return newstep;};game.snipe2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.start2=function(turn,step){var turn={steps:{},player:player,turn:turn.turn+1,links:{root:{}}};var MARKS={};var ARTIFACTS={"winline":{},"loseline":{},"intersection":{},"enemyline":{},"potentialempties":{},"mandatory":{}};var UNITDATA=step.UNITDATA;var UNITLAYERS={"sniper":{},"mysniper":{},"oppsniper":{},"neutralsniper":{},"soldiers":{},"mysoldiers":{},"oppsoldiers":{},"neutralsoldiers":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}if(Object.keys(UNITLAYERS.oppsniper||{}).length!==0){var STARTPOS=Object.keys(UNITLAYERS.oppsniper)[0];var DIR=5;var POS=STARTPOS;while(POS=connections[POS][5]){if(!UNITLAYERS.units[POS]){ARTIFACTS['potentialempties'][POS]={};}ARTIFACTS['enemyline'][POS]={};}var walkstarts=ARTIFACTS.potentialempties;for(var STARTPOS in walkstarts){var DIR=7;var walkedsquares=[];var POS=STARTPOS;while(POS=connections[POS][7]){walkedsquares.push(POS);}var WALKLENGTH=walkedsquares.length;if(WALKLENGTH){if(!UNITLAYERS.sniper[walkedsquares[WALKLENGTH-1]]){ARTIFACTS['mandatory'][walkedsquares[WALKLENGTH-1]]={};}}}}var newstep=turn.steps.root={ARTIFACTS:ARTIFACTS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,MARKS:MARKS,stepid:'root',name:'start',clones:step.clones,path:[]};var newlinks=turn.links.root;for(var linkpos in Object.keys(ARTIFACTS.mandatory||{}).length===0?function(){var ret={},s0=TERRAIN.myzone,s1=UNITLAYERS.sniper;for(var key in s0){if(!s1[key]){ret[key]=s0[key];}}return ret;}():ARTIFACTS.mandatory){newlinks[linkpos]='selecttarget2';}return turn;};game.start2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return Object.keys(UNITLAYERS.mysniper||{}).length===0?'Select initial sniper deployment':'Select where to snipe from';};game.debug2=function(){return{TERRAIN:TERRAIN};};})();function reduce(coll,iterator,acc){for(var key in coll){acc=iterator(acc,coll[key],key);}return acc;}game.newGame=function(){var turnseed={turn:0};var stepseed={UNITDATA:{},clones:0};return game.start1(turnseed,stepseed);};game.debug=function(){return{BOARD:BOARD,connections:connections,plr1:game.debug1(),plr2:game.debug2()};};game.commands={"snipe":1};game.graphics={"icons":{"soldiers":"pawns","sniper":"kings"},"tiles":{"zone":"grass","corner":"castle"}};game.board={"height":6,"width":6,"terrain":{"zone":{"1":[["rect","b6","f6",5]],"2":[["rect","a1","a5",3]]},"corner":["a6"]}};game.AI=[];game.id="snijpunt";return game;}(),threemusketeers:function(){var game={};var connections={"faux":{},"a1":{"1":"a2","2":"b2","3":"b1"},"a2":{"1":"a3","2":"b3","3":"b2","4":"b1","5":"a1"},"a3":{"1":"a4","2":"b4","3":"b3","4":"b2","5":"a2"},"a4":{"1":"a5","2":"b5","3":"b4","4":"b3","5":"a3"},"a5":{"3":"b5","4":"b4","5":"a4"},"b1":{"1":"b2","2":"c2","3":"c1","7":"a1","8":"a2"},"b2":{"1":"b3","2":"c3","3":"c2","4":"c1","5":"b1","6":"a1","7":"a2","8":"a3"},"b3":{"1":"b4","2":"c4","3":"c3","4":"c2","5":"b2","6":"a2","7":"a3","8":"a4"},"b4":{"1":"b5","2":"c5","3":"c4","4":"c3","5":"b3","6":"a3","7":"a4","8":"a5"},"b5":{"3":"c5","4":"c4","5":"b4","6":"a4","7":"a5"},"c1":{"1":"c2","2":"d2","3":"d1","7":"b1","8":"b2"},"c2":{"1":"c3","2":"d3","3":"d2","4":"d1","5":"c1","6":"b1","7":"b2","8":"b3"},"c3":{"1":"c4","2":"d4","3":"d3","4":"d2","5":"c2","6":"b2","7":"b3","8":"b4"},"c4":{"1":"c5","2":"d5","3":"d4","4":"d3","5":"c3","6":"b3","7":"b4","8":"b5"},"c5":{"3":"d5","4":"d4","5":"c4","6":"b4","7":"b5"},"d1":{"1":"d2","2":"e2","3":"e1","7":"c1","8":"c2"},"d2":{"1":"d3","2":"e3","3":"e2","4":"e1","5":"d1","6":"c1","7":"c2","8":"c3"},"d3":{"1":"d4","2":"e4","3":"e3","4":"e2","5":"d2","6":"c2","7":"c3","8":"c4"},"d4":{"1":"d5","2":"e5","3":"e4","4":"e3","5":"d3","6":"c3","7":"c4","8":"c5"},"d5":{"3":"e5","4":"e4","5":"d4","6":"c4","7":"c5"},"e1":{"1":"e2","7":"d1","8":"d2"},"e2":{"1":"e3","5":"e1","6":"d1","7":"d2","8":"d3"},"e3":{"1":"e4","5":"e2","6":"d2","7":"d3","8":"d4"},"e4":{"1":"e5","5":"e3","6":"d3","7":"d4","8":"d5"},"e5":{"5":"e4","6":"d4","7":"d5"}};var BOARD={"board":{"a1":{"colour":"dark","pos":"a1","x":1,"y":1},"a2":{"colour":"light","pos":"a2","x":1,"y":2},"a3":{"colour":"dark","pos":"a3","x":1,"y":3},"a4":{"colour":"light","pos":"a4","x":1,"y":4},"a5":{"colour":"dark","pos":"a5","x":1,"y":5},"b1":{"colour":"light","pos":"b1","x":2,"y":1},"b2":{"colour":"dark","pos":"b2","x":2,"y":2},"b3":{"colour":"light","pos":"b3","x":2,"y":3},"b4":{"colour":"dark","pos":"b4","x":2,"y":4},"b5":{"colour":"light","pos":"b5","x":2,"y":5},"c1":{"colour":"dark","pos":"c1","x":3,"y":1},"c2":{"colour":"light","pos":"c2","x":3,"y":2},"c3":{"colour":"dark","pos":"c3","x":3,"y":3},"c4":{"colour":"light","pos":"c4","x":3,"y":4},"c5":{"colour":"dark","pos":"c5","x":3,"y":5},"d1":{"colour":"light","pos":"d1","x":4,"y":1},"d2":{"colour":"dark","pos":"d2","x":4,"y":2},"d3":{"colour":"light","pos":"d3","x":4,"y":3},"d4":{"colour":"dark","pos":"d4","x":4,"y":4},"d5":{"colour":"light","pos":"d5","x":4,"y":5},"e1":{"colour":"dark","pos":"e1","x":5,"y":1},"e2":{"colour":"light","pos":"e2","x":5,"y":2},"e3":{"colour":"dark","pos":"e3","x":5,"y":3},"e4":{"colour":"light","pos":"e4","x":5,"y":4},"e5":{"colour":"dark","pos":"e5","x":5,"y":5}},"light":{"a2":{"colour":"light","pos":"a2","x":1,"y":2},"a4":{"colour":"light","pos":"a4","x":1,"y":4},"b1":{"colour":"light","pos":"b1","x":2,"y":1},"b3":{"colour":"light","pos":"b3","x":2,"y":3},"b5":{"colour":"light","pos":"b5","x":2,"y":5},"c2":{"colour":"light","pos":"c2","x":3,"y":2},"c4":{"colour":"light","pos":"c4","x":3,"y":4},"d1":{"colour":"light","pos":"d1","x":4,"y":1},"d3":{"colour":"light","pos":"d3","x":4,"y":3},"d5":{"colour":"light","pos":"d5","x":4,"y":5},"e2":{"colour":"light","pos":"e2","x":5,"y":2},"e4":{"colour":"light","pos":"e4","x":5,"y":4}},"dark":{"a1":{"colour":"dark","pos":"a1","x":1,"y":1},"a3":{"colour":"dark","pos":"a3","x":1,"y":3},"a5":{"colour":"dark","pos":"a5","x":1,"y":5},"b2":{"colour":"dark","pos":"b2","x":2,"y":2},"b4":{"colour":"dark","pos":"b4","x":2,"y":4},"c1":{"colour":"dark","pos":"c1","x":3,"y":1},"c3":{"colour":"dark","pos":"c3","x":3,"y":3},"c5":{"colour":"dark","pos":"c5","x":3,"y":5},"d2":{"colour":"dark","pos":"d2","x":4,"y":2},"d4":{"colour":"dark","pos":"d4","x":4,"y":4},"e1":{"colour":"dark","pos":"e1","x":5,"y":1},"e3":{"colour":"dark","pos":"e3","x":5,"y":3},"e5":{"colour":"dark","pos":"e5","x":5,"y":5}}};var relativedirs=[1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];var TERRAIN={};(function(){var ownernames=["neutral","my","opp"];var player=1;var otherplayer=2;game.selectunit1=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{movetargets:Object.assign({},step.ARTIFACTS.movetargets)});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectunit:markpos};var STARTPOS=MARKS['selectunit'];var neighbourdirs=[1,3,5,7];var startconnections=connections[STARTPOS];for(var dirnbr=0;dirnbr<4;dirnbr++){var POS=startconnections[neighbourdirs[dirnbr]];if(POS&&!!UNITLAYERS.oppunits[POS]){ARTIFACTS['movetargets'][POS]={};}}var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectunit'});turn.links[newstepid]={};var newlinks=turn.links[newstepid];for(var linkpos in ARTIFACTS.movetargets){newlinks[linkpos]='selectmovetarget1';}return newstep;};game.selectunit1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.selectmovetarget1=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectmovetarget:markpos,selectunit:step.MARKS.selectunit};var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectmovetarget'});turn.links[newstepid]={};turn.links[newstepid].move='move1';return newstep;};game.selectmovetarget1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.move1=function(turn,step){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{musketeerline:Object.assign({},step.ARTIFACTS.musketeerline),strandedmusketeers:Object.assign({},step.ARTIFACTS.strandedmusketeers)});var MARKS=step.MARKS;var UNITDATA=Object.assign({},step.UNITDATA);var UNITLAYERS=step.UNITLAYERS;var unitid=(UNITLAYERS.units[MARKS['selectunit']]||{}).id;if(unitid){UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{'pos':MARKS['selectmovetarget']});delete UNITDATA[(UNITLAYERS.units[MARKS['selectmovetarget']]||{}).id];}MARKS={};UNITLAYERS={"kings":{},"mykings":{},"oppkings":{},"neutralkings":{},"pawns":{},"mypawns":{},"opppawns":{},"neutralpawns":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}ARTIFACTS={"strandedmusketeers":{},"musketeerline":{},"movetargets":{}};var walkstarts=UNITLAYERS.kings;for(var STARTPOS in walkstarts){var allwalkerdirs=[1,3,5,7];for(var walkerdirnbr=0;walkerdirnbr<4;walkerdirnbr++){var POS=STARTPOS;var walkpositionstocount=UNITLAYERS.kings;var CURRENTCOUNT=0;while(POS=connections[POS][allwalkerdirs[walkerdirnbr]]){CURRENTCOUNT+=walkpositionstocount[POS]?1:0;}var TOTALCOUNT=CURRENTCOUNT;if(2===TOTALCOUNT){ARTIFACTS['musketeerline'][STARTPOS]={};}}}var newstepid=step.stepid+'-'+'move';var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,stepid:newstepid,name:'move',path:step.path.concat('move')});turn.links[newstepid]={};if(Object.keys(ARTIFACTS.musketeerline||{}).length!==0){var winner=2;var result=winner===1?'win':winner?'lose':'draw';turn.links[newstepid][result]='musketeersinline';}else if(Object.keys(ARTIFACTS.strandedmusketeers).length===3){var winner=1;var result=winner===1?'win':winner?'lose':'draw';turn.links[newstepid][result]='strandedmusketeers';}else turn.links[newstepid].endturn="start"+otherplayer;return newstep;};game.move1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.start1=function(turn,step){var turn={steps:{},player:player,turn:turn.turn+1,links:{root:{}}};var MARKS={};var ARTIFACTS={"strandedmusketeers":{},"musketeerline":{},"movetargets":{}};var UNITDATA=step.UNITDATA;var UNITLAYERS={"kings":{},"mykings":{},"oppkings":{},"neutralkings":{},"pawns":{},"mypawns":{},"opppawns":{},"neutralpawns":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}var newstep=turn.steps.root={ARTIFACTS:ARTIFACTS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,MARKS:MARKS,stepid:'root',name:'start',path:[]};var newlinks=turn.links.root;for(var linkpos in UNITLAYERS.myunits){newlinks[linkpos]='selectunit1';}return turn;};game.start1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.debug1=function(){return{TERRAIN:TERRAIN};};})();(function(){var ownernames=["neutral","opp","my"];var player=2;var otherplayer=1;game.selectunit2=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{movetargets:Object.assign({},step.ARTIFACTS.movetargets)});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectunit:markpos};var STARTPOS=MARKS['selectunit'];var neighbourdirs=[1,3,5,7];var startconnections=connections[STARTPOS];for(var dirnbr=0;dirnbr<4;dirnbr++){var POS=startconnections[neighbourdirs[dirnbr]];if(POS&&!UNITLAYERS.units[POS]){ARTIFACTS['movetargets'][POS]={};}}var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectunit'});turn.links[newstepid]={};var newlinks=turn.links[newstepid];for(var linkpos in ARTIFACTS.movetargets){newlinks[linkpos]='selectmovetarget2';}return newstep;};game.selectunit2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.selectmovetarget2=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectmovetarget:markpos,selectunit:step.MARKS.selectunit};var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectmovetarget'});turn.links[newstepid]={};turn.links[newstepid].move='move2';return newstep;};game.selectmovetarget2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.move2=function(turn,step){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{musketeerline:Object.assign({},step.ARTIFACTS.musketeerline),strandedmusketeers:Object.assign({},step.ARTIFACTS.strandedmusketeers)});var MARKS=step.MARKS;var UNITDATA=Object.assign({},step.UNITDATA);var UNITLAYERS=step.UNITLAYERS;var unitid=(UNITLAYERS.units[MARKS['selectunit']]||{}).id;if(unitid){UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{'pos':MARKS['selectmovetarget']});delete UNITDATA[(UNITLAYERS.units[MARKS['selectmovetarget']]||{}).id];}MARKS={};UNITLAYERS={"kings":{},"mykings":{},"oppkings":{},"neutralkings":{},"pawns":{},"mypawns":{},"opppawns":{},"neutralpawns":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}ARTIFACTS={"strandedmusketeers":{},"musketeerline":{},"movetargets":{}};var walkstarts=UNITLAYERS.kings;for(var STARTPOS in walkstarts){var allwalkerdirs=[1,3,5,7];for(var walkerdirnbr=0;walkerdirnbr<4;walkerdirnbr++){var POS=STARTPOS;var walkpositionstocount=UNITLAYERS.kings;var CURRENTCOUNT=0;while(POS=connections[POS][allwalkerdirs[walkerdirnbr]]){CURRENTCOUNT+=walkpositionstocount[POS]?1:0;}var TOTALCOUNT=CURRENTCOUNT;if(2===TOTALCOUNT){ARTIFACTS['musketeerline'][STARTPOS]={};}}}for(var STARTPOS in UNITLAYERS.kings){var neighbourdirs=[1,3,5,7];var foundneighbours=[];var startconnections=connections[STARTPOS];for(var dirnbr=0;dirnbr<4;dirnbr++){var POS=startconnections[neighbourdirs[dirnbr]];if(POS&&UNITLAYERS.pawns[POS]){foundneighbours.push(POS);}}var NEIGHBOURCOUNT=foundneighbours.length;if(!NEIGHBOURCOUNT){ARTIFACTS['strandedmusketeers'][STARTPOS]={};}}var newstepid=step.stepid+'-'+'move';var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,stepid:newstepid,name:'move',path:step.path.concat('move')});turn.links[newstepid]={};if(Object.keys(ARTIFACTS.musketeerline||{}).length!==0){var winner=2;var result=winner===2?'win':winner?'lose':'draw';turn.links[newstepid][result]='musketeersinline';}else if(Object.keys(ARTIFACTS.strandedmusketeers).length===3){var winner=1;var result=winner===2?'win':winner?'lose':'draw';turn.links[newstepid][result]='strandedmusketeers';}else turn.links[newstepid].endturn="start"+otherplayer;return newstep;};game.move2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.start2=function(turn,step){var turn={steps:{},player:player,turn:turn.turn+1,links:{root:{}}};var MARKS={};var ARTIFACTS={"strandedmusketeers":{},"musketeerline":{},"movetargets":{}};var UNITDATA=step.UNITDATA;var UNITLAYERS={"kings":{},"mykings":{},"oppkings":{},"neutralkings":{},"pawns":{},"mypawns":{},"opppawns":{},"neutralpawns":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}var newstep=turn.steps.root={ARTIFACTS:ARTIFACTS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,MARKS:MARKS,stepid:'root',name:'start',path:[]};var newlinks=turn.links.root;for(var linkpos in UNITLAYERS.myunits){newlinks[linkpos]='selectunit2';}return turn;};game.start2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.debug2=function(){return{TERRAIN:TERRAIN};};})();function reduce(coll,iterator,acc){for(var key in coll){acc=iterator(acc,coll[key],key);}return acc;}game.newGame=function(){var turnseed={turn:0};var stepseed={UNITDATA:{"unit1":{"pos":"a1","id":"unit1","group":"kings","owner":1},"unit2":{"pos":"c3","id":"unit2","group":"kings","owner":1},"unit3":{"pos":"e5","id":"unit3","group":"kings","owner":1},"unit4":{"pos":"b1","id":"unit4","group":"pawns","owner":2},"unit5":{"pos":"c1","id":"unit5","group":"pawns","owner":2},"unit6":{"pos":"d1","id":"unit6","group":"pawns","owner":2},"unit7":{"pos":"e1","id":"unit7","group":"pawns","owner":2},"unit8":{"pos":"a2","id":"unit8","group":"pawns","owner":2},"unit9":{"pos":"b2","id":"unit9","group":"pawns","owner":2},"unit10":{"pos":"c2","id":"unit10","group":"pawns","owner":2},"unit11":{"pos":"d2","id":"unit11","group":"pawns","owner":2},"unit12":{"pos":"e2","id":"unit12","group":"pawns","owner":2},"unit13":{"pos":"a3","id":"unit13","group":"pawns","owner":2},"unit14":{"pos":"b3","id":"unit14","group":"pawns","owner":2},"unit15":{"pos":"d3","id":"unit15","group":"pawns","owner":2},"unit16":{"pos":"e3","id":"unit16","group":"pawns","owner":2},"unit17":{"pos":"a4","id":"unit17","group":"pawns","owner":2},"unit18":{"pos":"b4","id":"unit18","group":"pawns","owner":2},"unit19":{"pos":"c4","id":"unit19","group":"pawns","owner":2},"unit20":{"pos":"d4","id":"unit20","group":"pawns","owner":2},"unit21":{"pos":"e4","id":"unit21","group":"pawns","owner":2},"unit22":{"pos":"a5","id":"unit22","group":"pawns","owner":2},"unit23":{"pos":"b5","id":"unit23","group":"pawns","owner":2},"unit24":{"pos":"c5","id":"unit24","group":"pawns","owner":2},"unit25":{"pos":"d5","id":"unit25","group":"pawns","owner":2}}};return game.start1(turnseed,stepseed);};game.debug=function(){return{BOARD:BOARD,connections:connections,plr1:game.debug1(),plr2:game.debug2()};};game.commands={"move":1};game.graphics={"icons":{"pawns":"pawns","kings":"kings"}};game.board={"height":5,"width":5};game.AI=[];game.id="threemusketeers";return game;}(),transet:function(){var game={};var connections={"faux":{},"a1":{"1":"a2","2":"b2","3":"b1"},"a2":{"1":"a3","2":"b3","3":"b2","4":"b1","5":"a1"},"a3":{"1":"a4","2":"b4","3":"b3","4":"b2","5":"a2"},"a4":{"1":"a5","2":"b5","3":"b4","4":"b3","5":"a3"},"a5":{"3":"b5","4":"b4","5":"a4"},"b1":{"1":"b2","2":"c2","3":"c1","7":"a1","8":"a2"},"b2":{"1":"b3","2":"c3","3":"c2","4":"c1","5":"b1","6":"a1","7":"a2","8":"a3"},"b3":{"1":"b4","2":"c4","3":"c3","4":"c2","5":"b2","6":"a2","7":"a3","8":"a4"},"b4":{"1":"b5","2":"c5","3":"c4","4":"c3","5":"b3","6":"a3","7":"a4","8":"a5"},"b5":{"3":"c5","4":"c4","5":"b4","6":"a4","7":"a5"},"c1":{"1":"c2","2":"d2","3":"d1","7":"b1","8":"b2"},"c2":{"1":"c3","2":"d3","3":"d2","4":"d1","5":"c1","6":"b1","7":"b2","8":"b3"},"c3":{"1":"c4","2":"d4","3":"d3","4":"d2","5":"c2","6":"b2","7":"b3","8":"b4"},"c4":{"1":"c5","2":"d5","3":"d4","4":"d3","5":"c3","6":"b3","7":"b4","8":"b5"},"c5":{"3":"d5","4":"d4","5":"c4","6":"b4","7":"b5"},"d1":{"1":"d2","2":"e2","3":"e1","7":"c1","8":"c2"},"d2":{"1":"d3","2":"e3","3":"e2","4":"e1","5":"d1","6":"c1","7":"c2","8":"c3"},"d3":{"1":"d4","2":"e4","3":"e3","4":"e2","5":"d2","6":"c2","7":"c3","8":"c4"},"d4":{"1":"d5","2":"e5","3":"e4","4":"e3","5":"d3","6":"c3","7":"c4","8":"c5"},"d5":{"3":"e5","4":"e4","5":"d4","6":"c4","7":"c5"},"e1":{"1":"e2","7":"d1","8":"d2"},"e2":{"1":"e3","5":"e1","6":"d1","7":"d2","8":"d3"},"e3":{"1":"e4","5":"e2","6":"d2","7":"d3","8":"d4"},"e4":{"1":"e5","5":"e3","6":"d3","7":"d4","8":"d5"},"e5":{"5":"e4","6":"d4","7":"d5"}};var BOARD={"board":{"a1":{"colour":"dark","pos":"a1","x":1,"y":1},"a2":{"colour":"light","pos":"a2","x":1,"y":2},"a3":{"colour":"dark","pos":"a3","x":1,"y":3},"a4":{"colour":"light","pos":"a4","x":1,"y":4},"a5":{"colour":"dark","pos":"a5","x":1,"y":5},"b1":{"colour":"light","pos":"b1","x":2,"y":1},"b2":{"colour":"dark","pos":"b2","x":2,"y":2},"b3":{"colour":"light","pos":"b3","x":2,"y":3},"b4":{"colour":"dark","pos":"b4","x":2,"y":4},"b5":{"colour":"light","pos":"b5","x":2,"y":5},"c1":{"colour":"dark","pos":"c1","x":3,"y":1},"c2":{"colour":"light","pos":"c2","x":3,"y":2},"c3":{"colour":"dark","pos":"c3","x":3,"y":3},"c4":{"colour":"light","pos":"c4","x":3,"y":4},"c5":{"colour":"dark","pos":"c5","x":3,"y":5},"d1":{"colour":"light","pos":"d1","x":4,"y":1},"d2":{"colour":"dark","pos":"d2","x":4,"y":2},"d3":{"colour":"light","pos":"d3","x":4,"y":3},"d4":{"colour":"dark","pos":"d4","x":4,"y":4},"d5":{"colour":"light","pos":"d5","x":4,"y":5},"e1":{"colour":"dark","pos":"e1","x":5,"y":1},"e2":{"colour":"light","pos":"e2","x":5,"y":2},"e3":{"colour":"dark","pos":"e3","x":5,"y":3},"e4":{"colour":"light","pos":"e4","x":5,"y":4},"e5":{"colour":"dark","pos":"e5","x":5,"y":5}},"light":{"a2":{"colour":"light","pos":"a2","x":1,"y":2},"a4":{"colour":"light","pos":"a4","x":1,"y":4},"b1":{"colour":"light","pos":"b1","x":2,"y":1},"b3":{"colour":"light","pos":"b3","x":2,"y":3},"b5":{"colour":"light","pos":"b5","x":2,"y":5},"c2":{"colour":"light","pos":"c2","x":3,"y":2},"c4":{"colour":"light","pos":"c4","x":3,"y":4},"d1":{"colour":"light","pos":"d1","x":4,"y":1},"d3":{"colour":"light","pos":"d3","x":4,"y":3},"d5":{"colour":"light","pos":"d5","x":4,"y":5},"e2":{"colour":"light","pos":"e2","x":5,"y":2},"e4":{"colour":"light","pos":"e4","x":5,"y":4}},"dark":{"a1":{"colour":"dark","pos":"a1","x":1,"y":1},"a3":{"colour":"dark","pos":"a3","x":1,"y":3},"a5":{"colour":"dark","pos":"a5","x":1,"y":5},"b2":{"colour":"dark","pos":"b2","x":2,"y":2},"b4":{"colour":"dark","pos":"b4","x":2,"y":4},"c1":{"colour":"dark","pos":"c1","x":3,"y":1},"c3":{"colour":"dark","pos":"c3","x":3,"y":3},"c5":{"colour":"dark","pos":"c5","x":3,"y":5},"d2":{"colour":"dark","pos":"d2","x":4,"y":2},"d4":{"colour":"dark","pos":"d4","x":4,"y":4},"e1":{"colour":"dark","pos":"e1","x":5,"y":1},"e3":{"colour":"dark","pos":"e3","x":5,"y":3},"e5":{"colour":"dark","pos":"e5","x":5,"y":5}}};var relativedirs=[1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];(function(){var TERRAIN={"base":{"a1":{"pos":"a1","owner":1},"b1":{"pos":"b1","owner":1},"c1":{"pos":"c1","owner":1},"d1":{"pos":"d1","owner":1},"e1":{"pos":"e1","owner":1},"a5":{"pos":"a5","owner":2},"b5":{"pos":"b5","owner":2},"c5":{"pos":"c5","owner":2},"d5":{"pos":"d5","owner":2},"e5":{"pos":"e5","owner":2}},"mybase":{"a1":{"pos":"a1","owner":1},"b1":{"pos":"b1","owner":1},"c1":{"pos":"c1","owner":1},"d1":{"pos":"d1","owner":1},"e1":{"pos":"e1","owner":1}},"oppbase":{"a5":{"pos":"a5","owner":2},"b5":{"pos":"b5","owner":2},"c5":{"pos":"c5","owner":2},"d5":{"pos":"d5","owner":2},"e5":{"pos":"e5","owner":2}}};var ownernames=["neutral","my","opp"];var player=1;var otherplayer=2;game.selectunit1=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{movetargets:Object.assign({},step.ARTIFACTS.movetargets)});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectunit:markpos};var STARTPOS=MARKS['selectunit'];var neighbourdirs=!!UNITLAYERS.pinets[MARKS['selectunit']]?[1]:!!UNITLAYERS.piokers[MARKS['selectunit']]?[8,2]:[8,1,2];var nbrofneighbourdirs=neighbourdirs.length;var startconnections=connections[STARTPOS];for(var dirnbr=0;dirnbr<nbrofneighbourdirs;dirnbr++){var POS=startconnections[neighbourdirs[dirnbr]];if(POS&&!UNITLAYERS.myunits[POS]){ARTIFACTS['movetargets'][POS]={};}}var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectunit'});turn.links[newstepid]={};var newlinks=turn.links[newstepid];for(var linkpos in ARTIFACTS.movetargets){newlinks[linkpos]='selectmovetarget1';}var newlinks=turn.links[newstepid];for(var linkpos in function(){var ret={},s0=UNITLAYERS.myunits,s1=function(){var ret={};ret[MARKS['selectunit']]=1;return ret;}();for(var key in s0){if(!s1[key]){ret[key]=s0[key];}}return ret;}()){newlinks[linkpos]='selectswapunit1';}return newstep;};game.selectunit1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.selectmovetarget1=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectmovetarget:markpos,selectunit:step.MARKS.selectunit};var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectmovetarget'});turn.links[newstepid]={};if(!!UNITLAYERS.units[MARKS['selectmovetarget']]&&!TERRAIN.oppbase[MARKS['selectmovetarget']]){var newlinks=turn.links[newstepid];for(var linkpos in function(){var ret={},s0=TERRAIN.oppbase,s1=UNITLAYERS.oppunits;for(var key in s0){if(!s1[key]){ret[key]=s0[key];}}return ret;}()){newlinks[linkpos]='selectdeportdestination1';}}else{turn.links[newstepid].move='move1';}return newstep;};game.selectmovetarget1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.selectdeportdestination1=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectdeportdestination:markpos,selectunit:step.MARKS.selectunit,selectmovetarget:step.MARKS.selectmovetarget};var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectdeportdestination'});turn.links[newstepid]={};turn.links[newstepid].move='move1';return newstep;};game.selectdeportdestination1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.selectswapunit1=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{swap1steps:Object.assign({},step.ARTIFACTS.swap1steps)});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectswapunit:markpos,selectunit:step.MARKS.selectunit};var STARTPOS=MARKS['selectunit'];var neighbourdirs=[1,3,5,7];var startconnections=connections[STARTPOS];for(var dirnbr=0;dirnbr<4;dirnbr++){var DIR=neighbourdirs[dirnbr];var POS=startconnections[DIR];if(POS&&!UNITLAYERS.units[POS]){ARTIFACTS['swap1steps'][POS]={dir:DIR};}}var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectswapunit'});turn.links[newstepid]={};var newlinks=turn.links[newstepid];for(var linkpos in ARTIFACTS.swap1steps){newlinks[linkpos]='selectswap1target1';}return newstep;};game.selectswapunit1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.selectswap1target1=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{swap2step:Object.assign({},step.ARTIFACTS.swap2step)});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectswap1target:markpos,selectunit:step.MARKS.selectunit,selectswapunit:step.MARKS.selectswapunit};var STARTPOS=MARKS['selectswapunit'];var POS=connections[STARTPOS][relativedirs[(ARTIFACTS.swap1steps[MARKS['selectswap1target']]||{})['dir']-2+5]];if(POS&&!function(){var k,ret={},s0=UNITLAYERS.units,s1=function(){var ret={};ret[MARKS['selectswap1target']]=1;return ret;}();for(k in s0){ret[k]=1;}for(k in s1){ret[k]=1;}return ret;}()[POS]){ARTIFACTS['swap2step'][POS]={};}var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectswap1target'});turn.links[newstepid]={};if(Object.keys(ARTIFACTS.swap2step||{}).length!==0){turn.links[newstepid].swap='swap1';}return newstep;};game.selectswap1target1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.move1=function(turn,step){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var MARKS=step.MARKS;var UNITDATA=Object.assign({},step.UNITDATA);var UNITLAYERS=step.UNITLAYERS;if(!!UNITLAYERS.units[MARKS['selectmovetarget']]){if(!!TERRAIN.oppbase[MARKS['selectmovetarget']]){delete UNITDATA[(UNITLAYERS.units[MARKS['selectmovetarget']]||{}).id];}else{var unitid=(UNITLAYERS.units[MARKS['selectmovetarget']]||{}).id;if(unitid){UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{'pos':MARKS['selectdeportdestination']});}}}var unitid=(UNITLAYERS.units[MARKS['selectunit']]||{}).id;if(unitid){UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{'pos':MARKS['selectmovetarget']});}MARKS={};UNITLAYERS={"pinets":{},"mypinets":{},"opppinets":{},"neutralpinets":{},"piokers":{},"mypiokers":{},"opppiokers":{},"neutralpiokers":{},"piases":{},"mypiases":{},"opppiases":{},"neutralpiases":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}ARTIFACTS={"swap2step":{},"swap1steps":{},"movetargets":{}};var newstepid=step.stepid+'-'+'move';var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,stepid:newstepid,name:'move',path:step.path.concat('move')});turn.links[newstepid]={};if(Object.keys(function(){var ret={},s0=UNITLAYERS.myunits,s1=TERRAIN.oppbase;for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}()||{}).length!==0){var winner=1;var result=winner===1?'win':winner?'lose':'draw';turn.links[newstepid][result]='infiltration';}else turn.links[newstepid].endturn="start"+otherplayer;return newstep;};game.move1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.swap1=function(turn,step){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var MARKS=step.MARKS;var UNITDATA=Object.assign({},step.UNITDATA);var UNITLAYERS=step.UNITLAYERS;var unitid=(UNITLAYERS.units[MARKS['selectunit']]||{}).id;if(unitid){UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{'pos':MARKS['selectswap1target']});}var unitid=(UNITLAYERS.units[MARKS['selectswapunit']]||{}).id;if(unitid){UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{'pos':Object.keys(ARTIFACTS.swap2step)[0]});}MARKS={};UNITLAYERS={"pinets":{},"mypinets":{},"opppinets":{},"neutralpinets":{},"piokers":{},"mypiokers":{},"opppiokers":{},"neutralpiokers":{},"piases":{},"mypiases":{},"opppiases":{},"neutralpiases":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}ARTIFACTS={"swap2step":{},"swap1steps":{},"movetargets":{}};var newstepid=step.stepid+'-'+'swap';var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,stepid:newstepid,name:'swap',path:step.path.concat('swap')});turn.links[newstepid]={};if(Object.keys(function(){var ret={},s0=UNITLAYERS.myunits,s1=TERRAIN.oppbase;for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}()||{}).length!==0){var winner=1;var result=winner===1?'win':winner?'lose':'draw';turn.links[newstepid][result]='infiltration';}else turn.links[newstepid].endturn="start"+otherplayer;return newstep;};game.swap1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.start1=function(turn,step){var turn={steps:{},player:player,turn:turn.turn+1,links:{root:{}}};var MARKS={};var ARTIFACTS={"swap2step":{},"swap1steps":{},"movetargets":{}};var UNITDATA=step.UNITDATA;var UNITLAYERS={"pinets":{},"mypinets":{},"opppinets":{},"neutralpinets":{},"piokers":{},"mypiokers":{},"opppiokers":{},"neutralpiokers":{},"piases":{},"mypiases":{},"opppiases":{},"neutralpiases":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}var newstep=turn.steps.root={ARTIFACTS:ARTIFACTS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,MARKS:MARKS,stepid:'root',name:'start',path:[]};var newlinks=turn.links.root;for(var linkpos in UNITLAYERS.myunits){newlinks[linkpos]='selectunit1';}return turn;};game.start1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.debug1=function(){return{TERRAIN:TERRAIN};};})();(function(){var TERRAIN={"base":{"a1":{"pos":"a1","owner":1},"b1":{"pos":"b1","owner":1},"c1":{"pos":"c1","owner":1},"d1":{"pos":"d1","owner":1},"e1":{"pos":"e1","owner":1},"a5":{"pos":"a5","owner":2},"b5":{"pos":"b5","owner":2},"c5":{"pos":"c5","owner":2},"d5":{"pos":"d5","owner":2},"e5":{"pos":"e5","owner":2}},"oppbase":{"a1":{"pos":"a1","owner":1},"b1":{"pos":"b1","owner":1},"c1":{"pos":"c1","owner":1},"d1":{"pos":"d1","owner":1},"e1":{"pos":"e1","owner":1}},"mybase":{"a5":{"pos":"a5","owner":2},"b5":{"pos":"b5","owner":2},"c5":{"pos":"c5","owner":2},"d5":{"pos":"d5","owner":2},"e5":{"pos":"e5","owner":2}}};var ownernames=["neutral","opp","my"];var player=2;var otherplayer=1;game.selectunit2=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{movetargets:Object.assign({},step.ARTIFACTS.movetargets)});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectunit:markpos};var STARTPOS=MARKS['selectunit'];var neighbourdirs=!!UNITLAYERS.pinets[MARKS['selectunit']]?[5]:!!UNITLAYERS.piokers[MARKS['selectunit']]?[4,6]:[4,5,6];var nbrofneighbourdirs=neighbourdirs.length;var startconnections=connections[STARTPOS];for(var dirnbr=0;dirnbr<nbrofneighbourdirs;dirnbr++){var POS=startconnections[neighbourdirs[dirnbr]];if(POS&&!UNITLAYERS.myunits[POS]){ARTIFACTS['movetargets'][POS]={};}}var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectunit'});turn.links[newstepid]={};var newlinks=turn.links[newstepid];for(var linkpos in ARTIFACTS.movetargets){newlinks[linkpos]='selectmovetarget2';}var newlinks=turn.links[newstepid];for(var linkpos in function(){var ret={},s0=UNITLAYERS.myunits,s1=function(){var ret={};ret[MARKS['selectunit']]=1;return ret;}();for(var key in s0){if(!s1[key]){ret[key]=s0[key];}}return ret;}()){newlinks[linkpos]='selectswapunit2';}return newstep;};game.selectunit2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.selectmovetarget2=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectmovetarget:markpos,selectunit:step.MARKS.selectunit};var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectmovetarget'});turn.links[newstepid]={};if(!!UNITLAYERS.units[MARKS['selectmovetarget']]&&!TERRAIN.oppbase[MARKS['selectmovetarget']]){var newlinks=turn.links[newstepid];for(var linkpos in function(){var ret={},s0=TERRAIN.oppbase,s1=UNITLAYERS.oppunits;for(var key in s0){if(!s1[key]){ret[key]=s0[key];}}return ret;}()){newlinks[linkpos]='selectdeportdestination2';}}else{turn.links[newstepid].move='move2';}return newstep;};game.selectmovetarget2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.selectdeportdestination2=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectdeportdestination:markpos,selectunit:step.MARKS.selectunit,selectmovetarget:step.MARKS.selectmovetarget};var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectdeportdestination'});turn.links[newstepid]={};turn.links[newstepid].move='move2';return newstep;};game.selectdeportdestination2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.selectswapunit2=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{swap1steps:Object.assign({},step.ARTIFACTS.swap1steps)});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectswapunit:markpos,selectunit:step.MARKS.selectunit};var STARTPOS=MARKS['selectunit'];var neighbourdirs=[1,3,5,7];var startconnections=connections[STARTPOS];for(var dirnbr=0;dirnbr<4;dirnbr++){var DIR=neighbourdirs[dirnbr];var POS=startconnections[DIR];if(POS&&!UNITLAYERS.units[POS]){ARTIFACTS['swap1steps'][POS]={dir:DIR};}}var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectswapunit'});turn.links[newstepid]={};var newlinks=turn.links[newstepid];for(var linkpos in ARTIFACTS.swap1steps){newlinks[linkpos]='selectswap1target2';}return newstep;};game.selectswapunit2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.selectswap1target2=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{swap2step:Object.assign({},step.ARTIFACTS.swap2step)});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectswap1target:markpos,selectunit:step.MARKS.selectunit,selectswapunit:step.MARKS.selectswapunit};var STARTPOS=MARKS['selectswapunit'];var POS=connections[STARTPOS][relativedirs[(ARTIFACTS.swap1steps[MARKS['selectswap1target']]||{})['dir']-2+5]];if(POS&&!function(){var k,ret={},s0=UNITLAYERS.units,s1=function(){var ret={};ret[MARKS['selectswap1target']]=1;return ret;}();for(k in s0){ret[k]=1;}for(k in s1){ret[k]=1;}return ret;}()[POS]){ARTIFACTS['swap2step'][POS]={};}var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectswap1target'});turn.links[newstepid]={};if(Object.keys(ARTIFACTS.swap2step||{}).length!==0){turn.links[newstepid].swap='swap2';}return newstep;};game.selectswap1target2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.move2=function(turn,step){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var MARKS=step.MARKS;var UNITDATA=Object.assign({},step.UNITDATA);var UNITLAYERS=step.UNITLAYERS;if(!!UNITLAYERS.units[MARKS['selectmovetarget']]){if(!!TERRAIN.oppbase[MARKS['selectmovetarget']]){delete UNITDATA[(UNITLAYERS.units[MARKS['selectmovetarget']]||{}).id];}else{var unitid=(UNITLAYERS.units[MARKS['selectmovetarget']]||{}).id;if(unitid){UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{'pos':MARKS['selectdeportdestination']});}}}var unitid=(UNITLAYERS.units[MARKS['selectunit']]||{}).id;if(unitid){UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{'pos':MARKS['selectmovetarget']});}MARKS={};UNITLAYERS={"pinets":{},"mypinets":{},"opppinets":{},"neutralpinets":{},"piokers":{},"mypiokers":{},"opppiokers":{},"neutralpiokers":{},"piases":{},"mypiases":{},"opppiases":{},"neutralpiases":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}ARTIFACTS={"swap2step":{},"swap1steps":{},"movetargets":{}};var newstepid=step.stepid+'-'+'move';var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,stepid:newstepid,name:'move',path:step.path.concat('move')});turn.links[newstepid]={};if(Object.keys(function(){var ret={},s0=UNITLAYERS.myunits,s1=TERRAIN.oppbase;for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}()||{}).length!==0){var winner=2;var result=winner===2?'win':winner?'lose':'draw';turn.links[newstepid][result]='infiltration';}else turn.links[newstepid].endturn="start"+otherplayer;return newstep;};game.move2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.swap2=function(turn,step){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var MARKS=step.MARKS;var UNITDATA=Object.assign({},step.UNITDATA);var UNITLAYERS=step.UNITLAYERS;var unitid=(UNITLAYERS.units[MARKS['selectunit']]||{}).id;if(unitid){UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{'pos':MARKS['selectswap1target']});}var unitid=(UNITLAYERS.units[MARKS['selectswapunit']]||{}).id;if(unitid){UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{'pos':Object.keys(ARTIFACTS.swap2step)[0]});}MARKS={};UNITLAYERS={"pinets":{},"mypinets":{},"opppinets":{},"neutralpinets":{},"piokers":{},"mypiokers":{},"opppiokers":{},"neutralpiokers":{},"piases":{},"mypiases":{},"opppiases":{},"neutralpiases":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}ARTIFACTS={"swap2step":{},"swap1steps":{},"movetargets":{}};var newstepid=step.stepid+'-'+'swap';var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,stepid:newstepid,name:'swap',path:step.path.concat('swap')});turn.links[newstepid]={};if(Object.keys(function(){var ret={},s0=UNITLAYERS.myunits,s1=TERRAIN.oppbase;for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}()||{}).length!==0){var winner=2;var result=winner===2?'win':winner?'lose':'draw';turn.links[newstepid][result]='infiltration';}else turn.links[newstepid].endturn="start"+otherplayer;return newstep;};game.swap2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.start2=function(turn,step){var turn={steps:{},player:player,turn:turn.turn+1,links:{root:{}}};var MARKS={};var ARTIFACTS={"swap2step":{},"swap1steps":{},"movetargets":{}};var UNITDATA=step.UNITDATA;var UNITLAYERS={"pinets":{},"mypinets":{},"opppinets":{},"neutralpinets":{},"piokers":{},"mypiokers":{},"opppiokers":{},"neutralpiokers":{},"piases":{},"mypiases":{},"opppiases":{},"neutralpiases":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}var newstep=turn.steps.root={ARTIFACTS:ARTIFACTS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,MARKS:MARKS,stepid:'root',name:'start',path:[]};var newlinks=turn.links.root;for(var linkpos in UNITLAYERS.myunits){newlinks[linkpos]='selectunit2';}return turn;};game.start2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.debug2=function(){return{TERRAIN:TERRAIN};};})();function reduce(coll,iterator,acc){for(var key in coll){acc=iterator(acc,coll[key],key);}return acc;}game.newGame=function(){var turnseed={turn:0};var stepseed={UNITDATA:{"unit1":{"pos":"a1","id":"unit1","group":"pinets","owner":1},"unit2":{"pos":"e1","id":"unit2","group":"pinets","owner":1},"unit3":{"pos":"a5","id":"unit3","group":"pinets","owner":2},"unit4":{"pos":"e5","id":"unit4","group":"pinets","owner":2},"unit5":{"pos":"b1","id":"unit5","group":"piokers","owner":1},"unit6":{"pos":"d1","id":"unit6","group":"piokers","owner":1},"unit7":{"pos":"b5","id":"unit7","group":"piokers","owner":2},"unit8":{"pos":"d5","id":"unit8","group":"piokers","owner":2},"unit9":{"pos":"c1","id":"unit9","group":"piases","owner":1},"unit10":{"pos":"c5","id":"unit10","group":"piases","owner":2}}};return game.start1(turnseed,stepseed);};game.debug=function(){return{BOARD:BOARD,connections:connections,plr1:game.debug1(),plr2:game.debug2()};};game.commands={"move":1,"swap":1};game.graphics={"icons":{"pinets":"pawns","piokers":"bishops","piases":"kings"},"tiles":{"base":"playercolour"}};game.board={"height":5,"width":5,"terrain":{"base":{"1":[["rect","a1","e1"]],"2":[["rect","a5","e5"]]}}};game.AI=[];game.id="transet";return game;}(),uglyduck:function(){var game={};var connections={"faux":{},"a1":{"1":"a2","2":"b2","3":"b1"},"a2":{"1":"a3","2":"b3","3":"b2","4":"b1","5":"a1"},"a3":{"1":"a4","2":"b4","3":"b3","4":"b2","5":"a2"},"a4":{"1":"a5","2":"b5","3":"b4","4":"b3","5":"a3"},"a5":{"3":"b5","4":"b4","5":"a4"},"b1":{"1":"b2","2":"c2","3":"c1","7":"a1","8":"a2"},"b2":{"1":"b3","2":"c3","3":"c2","4":"c1","5":"b1","6":"a1","7":"a2","8":"a3"},"b3":{"1":"b4","2":"c4","3":"c3","4":"c2","5":"b2","6":"a2","7":"a3","8":"a4"},"b4":{"1":"b5","2":"c5","3":"c4","4":"c3","5":"b3","6":"a3","7":"a4","8":"a5"},"b5":{"3":"c5","4":"c4","5":"b4","6":"a4","7":"a5"},"c1":{"1":"c2","2":"d2","3":"d1","7":"b1","8":"b2"},"c2":{"1":"c3","2":"d3","3":"d2","4":"d1","5":"c1","6":"b1","7":"b2","8":"b3"},"c3":{"1":"c4","2":"d4","3":"d3","4":"d2","5":"c2","6":"b2","7":"b3","8":"b4"},"c4":{"1":"c5","2":"d5","3":"d4","4":"d3","5":"c3","6":"b3","7":"b4","8":"b5"},"c5":{"3":"d5","4":"d4","5":"c4","6":"b4","7":"b5"},"d1":{"1":"d2","2":"e2","3":"e1","7":"c1","8":"c2"},"d2":{"1":"d3","2":"e3","3":"e2","4":"e1","5":"d1","6":"c1","7":"c2","8":"c3"},"d3":{"1":"d4","2":"e4","3":"e3","4":"e2","5":"d2","6":"c2","7":"c3","8":"c4"},"d4":{"1":"d5","2":"e5","3":"e4","4":"e3","5":"d3","6":"c3","7":"c4","8":"c5"},"d5":{"3":"e5","4":"e4","5":"d4","6":"c4","7":"c5"},"e1":{"1":"e2","7":"d1","8":"d2"},"e2":{"1":"e3","5":"e1","6":"d1","7":"d2","8":"d3"},"e3":{"1":"e4","5":"e2","6":"d2","7":"d3","8":"d4"},"e4":{"1":"e5","5":"e3","6":"d3","7":"d4","8":"d5"},"e5":{"5":"e4","6":"d4","7":"d5"}};var BOARD={"board":{"a1":{"colour":"dark","pos":"a1","x":1,"y":1},"a2":{"colour":"light","pos":"a2","x":1,"y":2},"a3":{"colour":"dark","pos":"a3","x":1,"y":3},"a4":{"colour":"light","pos":"a4","x":1,"y":4},"a5":{"colour":"dark","pos":"a5","x":1,"y":5},"b1":{"colour":"light","pos":"b1","x":2,"y":1},"b2":{"colour":"dark","pos":"b2","x":2,"y":2},"b3":{"colour":"light","pos":"b3","x":2,"y":3},"b4":{"colour":"dark","pos":"b4","x":2,"y":4},"b5":{"colour":"light","pos":"b5","x":2,"y":5},"c1":{"colour":"dark","pos":"c1","x":3,"y":1},"c2":{"colour":"light","pos":"c2","x":3,"y":2},"c3":{"colour":"dark","pos":"c3","x":3,"y":3},"c4":{"colour":"light","pos":"c4","x":3,"y":4},"c5":{"colour":"dark","pos":"c5","x":3,"y":5},"d1":{"colour":"light","pos":"d1","x":4,"y":1},"d2":{"colour":"dark","pos":"d2","x":4,"y":2},"d3":{"colour":"light","pos":"d3","x":4,"y":3},"d4":{"colour":"dark","pos":"d4","x":4,"y":4},"d5":{"colour":"light","pos":"d5","x":4,"y":5},"e1":{"colour":"dark","pos":"e1","x":5,"y":1},"e2":{"colour":"light","pos":"e2","x":5,"y":2},"e3":{"colour":"dark","pos":"e3","x":5,"y":3},"e4":{"colour":"light","pos":"e4","x":5,"y":4},"e5":{"colour":"dark","pos":"e5","x":5,"y":5}},"light":{"a2":{"colour":"light","pos":"a2","x":1,"y":2},"a4":{"colour":"light","pos":"a4","x":1,"y":4},"b1":{"colour":"light","pos":"b1","x":2,"y":1},"b3":{"colour":"light","pos":"b3","x":2,"y":3},"b5":{"colour":"light","pos":"b5","x":2,"y":5},"c2":{"colour":"light","pos":"c2","x":3,"y":2},"c4":{"colour":"light","pos":"c4","x":3,"y":4},"d1":{"colour":"light","pos":"d1","x":4,"y":1},"d3":{"colour":"light","pos":"d3","x":4,"y":3},"d5":{"colour":"light","pos":"d5","x":4,"y":5},"e2":{"colour":"light","pos":"e2","x":5,"y":2},"e4":{"colour":"light","pos":"e4","x":5,"y":4}},"dark":{"a1":{"colour":"dark","pos":"a1","x":1,"y":1},"a3":{"colour":"dark","pos":"a3","x":1,"y":3},"a5":{"colour":"dark","pos":"a5","x":1,"y":5},"b2":{"colour":"dark","pos":"b2","x":2,"y":2},"b4":{"colour":"dark","pos":"b4","x":2,"y":4},"c1":{"colour":"dark","pos":"c1","x":3,"y":1},"c3":{"colour":"dark","pos":"c3","x":3,"y":3},"c5":{"colour":"dark","pos":"c5","x":3,"y":5},"d2":{"colour":"dark","pos":"d2","x":4,"y":2},"d4":{"colour":"dark","pos":"d4","x":4,"y":4},"e1":{"colour":"dark","pos":"e1","x":5,"y":1},"e3":{"colour":"dark","pos":"e3","x":5,"y":3},"e5":{"colour":"dark","pos":"e5","x":5,"y":5}}};var relativedirs=[1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];(function(){var TERRAIN={"homerow":{"a1":{"pos":"a1","owner":1},"b1":{"pos":"b1","owner":1},"c1":{"pos":"c1","owner":1},"d1":{"pos":"d1","owner":1},"e1":{"pos":"e1","owner":1},"a5":{"pos":"a5","owner":2},"b5":{"pos":"b5","owner":2},"c5":{"pos":"c5","owner":2},"d5":{"pos":"d5","owner":2},"e5":{"pos":"e5","owner":2}},"myhomerow":{"a1":{"pos":"a1","owner":1},"b1":{"pos":"b1","owner":1},"c1":{"pos":"c1","owner":1},"d1":{"pos":"d1","owner":1},"e1":{"pos":"e1","owner":1}},"opphomerow":{"a5":{"pos":"a5","owner":2},"b5":{"pos":"b5","owner":2},"c5":{"pos":"c5","owner":2},"d5":{"pos":"d5","owner":2},"e5":{"pos":"e5","owner":2}}};var ownernames=["neutral","my","opp"];var player=1;var otherplayer=2;game.selectunit1=function(turn,step,markpos){var ARTIFACTS={movetargets:Object.assign({},step.ARTIFACTS.movetargets)};var UNITLAYERS=step.UNITLAYERS;var MARKS={selectunit:markpos};var STARTPOS=MARKS['selectunit'];var neighbourdirs=!!UNITLAYERS.mykings[MARKS['selectunit']]?[4,5,6]:[8,1,2];var startconnections=connections[STARTPOS];for(var dirnbr=0;dirnbr<3;dirnbr++){var DIR=neighbourdirs[dirnbr];var POS=startconnections[DIR];if(POS&&(DIR===1||DIR===5?!UNITLAYERS.units[POS]:!UNITLAYERS.myunits[POS])){ARTIFACTS['movetargets'][POS]={};}}var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectunit'});turn.links[newstepid]={};var newlinks=turn.links[newstepid];for(var linkpos in ARTIFACTS.movetargets){newlinks[linkpos]='selectmovetarget1';}return newstep;};game.selectunit1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.selectmovetarget1=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectmovetarget:markpos,selectunit:step.MARKS.selectunit};var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectmovetarget'});turn.links[newstepid]={};turn.links[newstepid].move='move1';return newstep;};game.selectmovetarget1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.move1=function(turn,step){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var MARKS=step.MARKS;var UNITDATA=Object.assign({},step.UNITDATA);var UNITLAYERS=step.UNITLAYERS;if(!!TERRAIN.opphomerow[MARKS['selectmovetarget']]){var unitid=(UNITLAYERS.units[MARKS['selectunit']]||{}).id;if(unitid){UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{'group':'kings'});}}var unitid=(UNITLAYERS.units[MARKS['selectunit']]||{}).id;if(unitid){UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{'pos':MARKS['selectmovetarget']});delete UNITDATA[(UNITLAYERS.units[MARKS['selectmovetarget']]||{}).id];}MARKS={};UNITLAYERS={"soldiers":{},"mysoldiers":{},"oppsoldiers":{},"neutralsoldiers":{},"kings":{},"mykings":{},"oppkings":{},"neutralkings":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}ARTIFACTS={"movetargets":{}};var newstepid=step.stepid+'-'+'move';var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,stepid:newstepid,name:'move',path:step.path.concat('move')});turn.links[newstepid]={};if(Object.keys(function(){var ret={},s0=UNITLAYERS.mykings,s1=TERRAIN.myhomerow;for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}()||{}).length!==0){var winner=1;var result=winner===1?'win':winner?'lose':'draw';turn.links[newstepid][result]='swanhome';}else turn.links[newstepid].endturn="start"+otherplayer;return newstep;};game.move1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.start1=function(turn,step){var turn={steps:{},player:player,turn:turn.turn+1,links:{root:{}}};var MARKS={};var ARTIFACTS={"movetargets":{}};var UNITDATA=step.UNITDATA;var UNITLAYERS={"soldiers":{},"mysoldiers":{},"oppsoldiers":{},"neutralsoldiers":{},"kings":{},"mykings":{},"oppkings":{},"neutralkings":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}var newstep=turn.steps.root={ARTIFACTS:ARTIFACTS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,MARKS:MARKS,stepid:'root',name:'start',path:[]};var newlinks=turn.links.root;for(var linkpos in UNITLAYERS.myunits){newlinks[linkpos]='selectunit1';}return turn;};game.start1instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.debug1=function(){return{TERRAIN:TERRAIN};};})();(function(){var TERRAIN={"homerow":{"a1":{"pos":"a1","owner":1},"b1":{"pos":"b1","owner":1},"c1":{"pos":"c1","owner":1},"d1":{"pos":"d1","owner":1},"e1":{"pos":"e1","owner":1},"a5":{"pos":"a5","owner":2},"b5":{"pos":"b5","owner":2},"c5":{"pos":"c5","owner":2},"d5":{"pos":"d5","owner":2},"e5":{"pos":"e5","owner":2}},"opphomerow":{"a1":{"pos":"a1","owner":1},"b1":{"pos":"b1","owner":1},"c1":{"pos":"c1","owner":1},"d1":{"pos":"d1","owner":1},"e1":{"pos":"e1","owner":1}},"myhomerow":{"a5":{"pos":"a5","owner":2},"b5":{"pos":"b5","owner":2},"c5":{"pos":"c5","owner":2},"d5":{"pos":"d5","owner":2},"e5":{"pos":"e5","owner":2}}};var ownernames=["neutral","opp","my"];var player=2;var otherplayer=1;game.selectunit2=function(turn,step,markpos){var ARTIFACTS={movetargets:Object.assign({},step.ARTIFACTS.movetargets)};var UNITLAYERS=step.UNITLAYERS;var MARKS={selectunit:markpos};var STARTPOS=MARKS['selectunit'];var neighbourdirs=!!UNITLAYERS.mykings[MARKS['selectunit']]?[8,1,2]:[4,5,6];var startconnections=connections[STARTPOS];for(var dirnbr=0;dirnbr<3;dirnbr++){var DIR=neighbourdirs[dirnbr];var POS=startconnections[DIR];if(POS&&(DIR===1||DIR===5?!UNITLAYERS.units[POS]:!UNITLAYERS.myunits[POS])){ARTIFACTS['movetargets'][POS]={};}}var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectunit'});turn.links[newstepid]={};var newlinks=turn.links[newstepid];for(var linkpos in ARTIFACTS.movetargets){newlinks[linkpos]='selectmovetarget2';}return newstep;};game.selectunit2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.selectmovetarget2=function(turn,step,markpos){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var UNITLAYERS=step.UNITLAYERS;var MARKS={selectmovetarget:markpos,selectunit:step.MARKS.selectunit};var newstepid=step.stepid+'-'+markpos;var newstep=turn.steps[newstepid]=Object.assign({},step,{MARKS:MARKS,stepid:newstepid,path:step.path.concat(markpos),name:'selectmovetarget'});turn.links[newstepid]={};turn.links[newstepid].move='move2';return newstep;};game.selectmovetarget2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.move2=function(turn,step){var ARTIFACTS=Object.assign({},step.ARTIFACTS,{});var MARKS=step.MARKS;var UNITDATA=Object.assign({},step.UNITDATA);var UNITLAYERS=step.UNITLAYERS;if(!!TERRAIN.opphomerow[MARKS['selectmovetarget']]){var unitid=(UNITLAYERS.units[MARKS['selectunit']]||{}).id;if(unitid){UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{'group':'kings'});}}var unitid=(UNITLAYERS.units[MARKS['selectunit']]||{}).id;if(unitid){UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{'pos':MARKS['selectmovetarget']});delete UNITDATA[(UNITLAYERS.units[MARKS['selectmovetarget']]||{}).id];}MARKS={};UNITLAYERS={"soldiers":{},"mysoldiers":{},"oppsoldiers":{},"neutralsoldiers":{},"kings":{},"mykings":{},"oppkings":{},"neutralkings":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}ARTIFACTS={"movetargets":{}};var newstepid=step.stepid+'-'+'move';var newstep=turn.steps[newstepid]=Object.assign({},step,{ARTIFACTS:ARTIFACTS,MARKS:MARKS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,stepid:newstepid,name:'move',path:step.path.concat('move')});turn.links[newstepid]={};if(Object.keys(function(){var ret={},s0=UNITLAYERS.mykings,s1=TERRAIN.myhomerow;for(var key in s0){if(s1[key]){ret[key]=s0[key];}}return ret;}()||{}).length!==0){var winner=2;var result=winner===2?'win':winner?'lose':'draw';turn.links[newstepid][result]='swanhome';}else turn.links[newstepid].endturn="start"+otherplayer;return newstep;};game.move2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.start2=function(turn,step){var turn={steps:{},player:player,turn:turn.turn+1,links:{root:{}}};var MARKS={};var ARTIFACTS={"movetargets":{}};var UNITDATA=step.UNITDATA;var UNITLAYERS={"soldiers":{},"mysoldiers":{},"oppsoldiers":{},"neutralsoldiers":{},"kings":{},"mykings":{},"oppkings":{},"neutralkings":{},"units":{},"myunits":{},"oppunits":{},"neutralunits":{}};for(var unitid in UNITDATA){var currentunit=UNITDATA[unitid];var unitgroup=currentunit.group;var unitpos=currentunit.pos;var owner=ownernames[currentunit.owner];UNITLAYERS.units[unitpos]=UNITLAYERS[unitgroup][unitpos]=UNITLAYERS[owner+unitgroup][unitpos]=UNITLAYERS[owner+'units'][unitpos]=currentunit;}var newstep=turn.steps.root={ARTIFACTS:ARTIFACTS,UNITDATA:UNITDATA,UNITLAYERS:UNITLAYERS,MARKS:MARKS,stepid:'root',name:'start',path:[]};var newlinks=turn.links.root;for(var linkpos in UNITLAYERS.myunits){newlinks[linkpos]='selectunit2';}return turn;};game.start2instruction=function(step){var MARKS=step.MARKS;var ARTIFACTS=step.ARTIFACTS;var UNITLAYERS=step.UNITLAYERS;var UNITDATA=step.UNITDATA;return'';};game.debug2=function(){return{TERRAIN:TERRAIN};};})();function reduce(coll,iterator,acc){for(var key in coll){acc=iterator(acc,coll[key],key);}return acc;}game.newGame=function(){var turnseed={turn:0};var stepseed={UNITDATA:{"unit1":{"pos":"a1","id":"unit1","group":"soldiers","owner":1},"unit2":{"pos":"b1","id":"unit2","group":"soldiers","owner":1},"unit3":{"pos":"c1","id":"unit3","group":"soldiers","owner":1},"unit4":{"pos":"d1","id":"unit4","group":"soldiers","owner":1},"unit5":{"pos":"e1","id":"unit5","group":"soldiers","owner":1},"unit6":{"pos":"a5","id":"unit6","group":"soldiers","owner":2},"unit7":{"pos":"b5","id":"unit7","group":"soldiers","owner":2},"unit8":{"pos":"c5","id":"unit8","group":"soldiers","owner":2},"unit9":{"pos":"d5","id":"unit9","group":"soldiers","owner":2},"unit10":{"pos":"e5","id":"unit10","group":"soldiers","owner":2}}};return game.start1(turnseed,stepseed);};game.debug=function(){return{BOARD:BOARD,connections:connections,plr1:game.debug1(),plr2:game.debug2()};};game.commands={"move":1};game.graphics={"icons":{"soldiers":"pawns","kings":"kings"},"tiles":{"homerow":"playercolour"}};game.board={"height":5,"width":5,"terrain":{"homerow":{"1":[["rect","a1","e1"]],"2":[["rect","a5","e5"]]}}};game.AI=[];game.id="uglyduck";return game;}()};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	"use strict";

	module.exports = { "_test": { "id": "_test", "name": "Test", "tags": [], "exclude": true, "AI": ["Randy"], "board": { "height": 10, "width": 10, "terrainLayers": { "steps": { "a1": { "pos": "a1" }, "b1": { "pos": "b1" }, "c1": { "pos": "c1" }, "d1": { "pos": "d1" }, "a2": { "pos": "a2" }, "b2": { "pos": "b2" }, "c2": { "pos": "c2" }, "d2": { "pos": "d2" }, "a3": { "pos": "a3" }, "b3": { "pos": "b3" }, "c3": { "pos": "c3" }, "d3": { "pos": "d3" }, "a4": { "pos": "a4" }, "b4": { "pos": "b4" }, "c4": { "pos": "c4" }, "d4": { "pos": "d4" } } } }, "graphics": { "icons": { "stepsfirsts": "queens", "blocksfirsts": "queens", "defaultfirsts": "queens", "noblocks": "queens", "pawns": "pawns" }, "tiles": { "steps": "grass" } } }, "amazon": { "id": "amazon", "name": "Amazons", "source": "http://www.chessvariants.org/other.dir/amazons.html", "tags": ["deploy", "starve"], "author": "Walter Zamkauskas", "year": 1988, "AI": ["Steve", "Randy"], "board": { "height": 10, "width": 10, "terrainLayers": {} }, "graphics": { "icons": { "queens": "queens", "fires": "pawns" } } }, "aries": { "id": "aries", "name": "Aries", "source": "http://www.di.fc.ul.pt/~jpn/gv/aries.htm", "tags": ["push", "infiltrate", "eradicate", "multiplegoals"], "AI": ["Randy"], "board": { "height": 8, "width": 8, "terrainLayers": { "corner": { "a1": { "pos": "a1", "owner": 1 }, "h8": { "pos": "h8", "owner": 2 } }, "oppcorner": { "a1": { "pos": "a1", "owner": 1 }, "h8": { "pos": "h8", "owner": 2 } } } }, "graphics": { "tiles": { "corner": "playercolour" }, "icons": { "soldiers": "rooks" } } }, "atrium": { "id": "atrium", "name": "Atrium", "source": "http://www.di.fc.ul.pt/~jpn/gv/atrium.htm", "tags": ["formation", "nocapture"], "author": "Guy Jeandel", "year": 2004, "AI": ["Randy"], "board": { "height": 5, "width": 5, "terrainLayers": {} }, "graphics": { "icons": { "kings": "kings", "queens": "queens" } } }, "castle": { "id": "castle", "name": "Castle", "source": "http://www.di.fc.ul.pt/~jpn/gv/castle.htm", "tags": ["infiltrate", "terrain", "capture"], "AI": ["Randy"], "board": { "width": 19, "height": 19, "terrainLayers": { "walls": { "c2": { "pos": "c2" }, "c3": { "pos": "c3" }, "c4": { "pos": "c4" }, "c5": { "pos": "c5" }, "c6": { "pos": "c6" }, "c7": { "pos": "c7" }, "c8": { "pos": "c8" }, "f1": { "pos": "f1" }, "f2": { "pos": "f2" }, "f3": { "pos": "f3" }, "f4": { "pos": "f4" }, "f5": { "pos": "f5" }, "f6": { "pos": "f6" }, "h2": { "pos": "h2" }, "h3": { "pos": "h3" }, "h4": { "pos": "h4" }, "h5": { "pos": "h5" }, "h6": { "pos": "h6" }, "l2": { "pos": "l2" }, "l3": { "pos": "l3" }, "l4": { "pos": "l4" }, "l5": { "pos": "l5" }, "l6": { "pos": "l6" }, "n1": { "pos": "n1" }, "n2": { "pos": "n2" }, "n3": { "pos": "n3" }, "n4": { "pos": "n4" }, "n5": { "pos": "n5" }, "n6": { "pos": "n6" }, "q2": { "pos": "q2" }, "q3": { "pos": "q3" }, "q4": { "pos": "q4" }, "q5": { "pos": "q5" }, "q6": { "pos": "q6" }, "q7": { "pos": "q7" }, "q8": { "pos": "q8" }, "d8": { "pos": "d8" }, "e8": { "pos": "e8" }, "f8": { "pos": "f8" }, "g8": { "pos": "g8" }, "h8": { "pos": "h8" }, "i8": { "pos": "i8" }, "k8": { "pos": "k8" }, "l8": { "pos": "l8" }, "m8": { "pos": "m8" }, "n8": { "pos": "n8" }, "o8": { "pos": "o8" }, "p8": { "pos": "p8" }, "i6": { "pos": "i6" }, "j6": { "pos": "j6" }, "k6": { "pos": "k6" }, "i2": { "pos": "i2" }, "k2": { "pos": "k2" }, "c12": { "pos": "c12" }, "c13": { "pos": "c13" }, "c14": { "pos": "c14" }, "c15": { "pos": "c15" }, "c16": { "pos": "c16" }, "c17": { "pos": "c17" }, "c18": { "pos": "c18" }, "f14": { "pos": "f14" }, "f15": { "pos": "f15" }, "f16": { "pos": "f16" }, "f17": { "pos": "f17" }, "f18": { "pos": "f18" }, "f19": { "pos": "f19" }, "h14": { "pos": "h14" }, "h15": { "pos": "h15" }, "h16": { "pos": "h16" }, "h17": { "pos": "h17" }, "h18": { "pos": "h18" }, "l14": { "pos": "l14" }, "l15": { "pos": "l15" }, "l16": { "pos": "l16" }, "l17": { "pos": "l17" }, "l18": { "pos": "l18" }, "n14": { "pos": "n14" }, "n15": { "pos": "n15" }, "n16": { "pos": "n16" }, "n17": { "pos": "n17" }, "n18": { "pos": "n18" }, "n19": { "pos": "n19" }, "q12": { "pos": "q12" }, "q13": { "pos": "q13" }, "q14": { "pos": "q14" }, "q15": { "pos": "q15" }, "q16": { "pos": "q16" }, "q17": { "pos": "q17" }, "q18": { "pos": "q18" }, "d12": { "pos": "d12" }, "e12": { "pos": "e12" }, "f12": { "pos": "f12" }, "g12": { "pos": "g12" }, "h12": { "pos": "h12" }, "i12": { "pos": "i12" }, "k12": { "pos": "k12" }, "l12": { "pos": "l12" }, "m12": { "pos": "m12" }, "n12": { "pos": "n12" }, "o12": { "pos": "o12" }, "p12": { "pos": "p12" }, "i14": { "pos": "i14" }, "j14": { "pos": "j14" }, "k14": { "pos": "k14" }, "i18": { "pos": "i18" }, "k18": { "pos": "k18" } }, "thrones": { "j4": { "pos": "j4", "owner": 1 }, "j16": { "pos": "j16", "owner": 2 } }, "oppthrones": { "j4": { "pos": "j4", "owner": 1 }, "j16": { "pos": "j16", "owner": 2 } }, "nowalls": { "a1": { "pos": "a1" }, "a10": { "pos": "a10" }, "a11": { "pos": "a11" }, "a12": { "pos": "a12" }, "a13": { "pos": "a13" }, "a14": { "pos": "a14" }, "a15": { "pos": "a15" }, "a16": { "pos": "a16" }, "a17": { "pos": "a17" }, "a18": { "pos": "a18" }, "a19": { "pos": "a19" }, "a2": { "pos": "a2" }, "a3": { "pos": "a3" }, "a4": { "pos": "a4" }, "a5": { "pos": "a5" }, "a6": { "pos": "a6" }, "a7": { "pos": "a7" }, "a8": { "pos": "a8" }, "a9": { "pos": "a9" }, "b1": { "pos": "b1" }, "b10": { "pos": "b10" }, "b11": { "pos": "b11" }, "b12": { "pos": "b12" }, "b13": { "pos": "b13" }, "b14": { "pos": "b14" }, "b15": { "pos": "b15" }, "b16": { "pos": "b16" }, "b17": { "pos": "b17" }, "b18": { "pos": "b18" }, "b19": { "pos": "b19" }, "b2": { "pos": "b2" }, "b3": { "pos": "b3" }, "b4": { "pos": "b4" }, "b5": { "pos": "b5" }, "b6": { "pos": "b6" }, "b7": { "pos": "b7" }, "b8": { "pos": "b8" }, "b9": { "pos": "b9" }, "c1": { "pos": "c1" }, "c10": { "pos": "c10" }, "c11": { "pos": "c11" }, "c19": { "pos": "c19" }, "c9": { "pos": "c9" }, "d1": { "pos": "d1" }, "d10": { "pos": "d10" }, "d11": { "pos": "d11" }, "d13": { "pos": "d13" }, "d14": { "pos": "d14" }, "d15": { "pos": "d15" }, "d16": { "pos": "d16" }, "d17": { "pos": "d17" }, "d18": { "pos": "d18" }, "d19": { "pos": "d19" }, "d2": { "pos": "d2" }, "d3": { "pos": "d3" }, "d4": { "pos": "d4" }, "d5": { "pos": "d5" }, "d6": { "pos": "d6" }, "d7": { "pos": "d7" }, "d9": { "pos": "d9" }, "e1": { "pos": "e1" }, "e10": { "pos": "e10" }, "e11": { "pos": "e11" }, "e13": { "pos": "e13" }, "e14": { "pos": "e14" }, "e15": { "pos": "e15" }, "e16": { "pos": "e16" }, "e17": { "pos": "e17" }, "e18": { "pos": "e18" }, "e19": { "pos": "e19" }, "e2": { "pos": "e2" }, "e3": { "pos": "e3" }, "e4": { "pos": "e4" }, "e5": { "pos": "e5" }, "e6": { "pos": "e6" }, "e7": { "pos": "e7" }, "e9": { "pos": "e9" }, "f10": { "pos": "f10" }, "f11": { "pos": "f11" }, "f13": { "pos": "f13" }, "f7": { "pos": "f7" }, "f9": { "pos": "f9" }, "g1": { "pos": "g1" }, "g10": { "pos": "g10" }, "g11": { "pos": "g11" }, "g13": { "pos": "g13" }, "g14": { "pos": "g14" }, "g15": { "pos": "g15" }, "g16": { "pos": "g16" }, "g17": { "pos": "g17" }, "g18": { "pos": "g18" }, "g19": { "pos": "g19" }, "g2": { "pos": "g2" }, "g3": { "pos": "g3" }, "g4": { "pos": "g4" }, "g5": { "pos": "g5" }, "g6": { "pos": "g6" }, "g7": { "pos": "g7" }, "g9": { "pos": "g9" }, "h1": { "pos": "h1" }, "h10": { "pos": "h10" }, "h11": { "pos": "h11" }, "h13": { "pos": "h13" }, "h19": { "pos": "h19" }, "h7": { "pos": "h7" }, "h9": { "pos": "h9" }, "i1": { "pos": "i1" }, "i10": { "pos": "i10" }, "i11": { "pos": "i11" }, "i13": { "pos": "i13" }, "i15": { "pos": "i15" }, "i16": { "pos": "i16" }, "i17": { "pos": "i17" }, "i19": { "pos": "i19" }, "i3": { "pos": "i3" }, "i4": { "pos": "i4" }, "i5": { "pos": "i5" }, "i7": { "pos": "i7" }, "i9": { "pos": "i9" }, "j1": { "pos": "j1" }, "j10": { "pos": "j10" }, "j11": { "pos": "j11" }, "j12": { "pos": "j12" }, "j13": { "pos": "j13" }, "j15": { "pos": "j15" }, "j16": { "pos": "j16" }, "j17": { "pos": "j17" }, "j18": { "pos": "j18" }, "j19": { "pos": "j19" }, "j2": { "pos": "j2" }, "j3": { "pos": "j3" }, "j4": { "pos": "j4" }, "j5": { "pos": "j5" }, "j7": { "pos": "j7" }, "j8": { "pos": "j8" }, "j9": { "pos": "j9" }, "k1": { "pos": "k1" }, "k10": { "pos": "k10" }, "k11": { "pos": "k11" }, "k13": { "pos": "k13" }, "k15": { "pos": "k15" }, "k16": { "pos": "k16" }, "k17": { "pos": "k17" }, "k19": { "pos": "k19" }, "k3": { "pos": "k3" }, "k4": { "pos": "k4" }, "k5": { "pos": "k5" }, "k7": { "pos": "k7" }, "k9": { "pos": "k9" }, "l1": { "pos": "l1" }, "l10": { "pos": "l10" }, "l11": { "pos": "l11" }, "l13": { "pos": "l13" }, "l19": { "pos": "l19" }, "l7": { "pos": "l7" }, "l9": { "pos": "l9" }, "m1": { "pos": "m1" }, "m10": { "pos": "m10" }, "m11": { "pos": "m11" }, "m13": { "pos": "m13" }, "m14": { "pos": "m14" }, "m15": { "pos": "m15" }, "m16": { "pos": "m16" }, "m17": { "pos": "m17" }, "m18": { "pos": "m18" }, "m19": { "pos": "m19" }, "m2": { "pos": "m2" }, "m3": { "pos": "m3" }, "m4": { "pos": "m4" }, "m5": { "pos": "m5" }, "m6": { "pos": "m6" }, "m7": { "pos": "m7" }, "m9": { "pos": "m9" }, "n10": { "pos": "n10" }, "n11": { "pos": "n11" }, "n13": { "pos": "n13" }, "n7": { "pos": "n7" }, "n9": { "pos": "n9" }, "o1": { "pos": "o1" }, "o10": { "pos": "o10" }, "o11": { "pos": "o11" }, "o13": { "pos": "o13" }, "o14": { "pos": "o14" }, "o15": { "pos": "o15" }, "o16": { "pos": "o16" }, "o17": { "pos": "o17" }, "o18": { "pos": "o18" }, "o19": { "pos": "o19" }, "o2": { "pos": "o2" }, "o3": { "pos": "o3" }, "o4": { "pos": "o4" }, "o5": { "pos": "o5" }, "o6": { "pos": "o6" }, "o7": { "pos": "o7" }, "o9": { "pos": "o9" }, "p1": { "pos": "p1" }, "p10": { "pos": "p10" }, "p11": { "pos": "p11" }, "p13": { "pos": "p13" }, "p14": { "pos": "p14" }, "p15": { "pos": "p15" }, "p16": { "pos": "p16" }, "p17": { "pos": "p17" }, "p18": { "pos": "p18" }, "p19": { "pos": "p19" }, "p2": { "pos": "p2" }, "p3": { "pos": "p3" }, "p4": { "pos": "p4" }, "p5": { "pos": "p5" }, "p6": { "pos": "p6" }, "p7": { "pos": "p7" }, "p9": { "pos": "p9" }, "q1": { "pos": "q1" }, "q10": { "pos": "q10" }, "q11": { "pos": "q11" }, "q19": { "pos": "q19" }, "q9": { "pos": "q9" }, "r1": { "pos": "r1" }, "r10": { "pos": "r10" }, "r11": { "pos": "r11" }, "r12": { "pos": "r12" }, "r13": { "pos": "r13" }, "r14": { "pos": "r14" }, "r15": { "pos": "r15" }, "r16": { "pos": "r16" }, "r17": { "pos": "r17" }, "r18": { "pos": "r18" }, "r19": { "pos": "r19" }, "r2": { "pos": "r2" }, "r3": { "pos": "r3" }, "r4": { "pos": "r4" }, "r5": { "pos": "r5" }, "r6": { "pos": "r6" }, "r7": { "pos": "r7" }, "r8": { "pos": "r8" }, "r9": { "pos": "r9" }, "s1": { "pos": "s1" }, "s10": { "pos": "s10" }, "s11": { "pos": "s11" }, "s12": { "pos": "s12" }, "s13": { "pos": "s13" }, "s14": { "pos": "s14" }, "s15": { "pos": "s15" }, "s16": { "pos": "s16" }, "s17": { "pos": "s17" }, "s18": { "pos": "s18" }, "s19": { "pos": "s19" }, "s2": { "pos": "s2" }, "s3": { "pos": "s3" }, "s4": { "pos": "s4" }, "s5": { "pos": "s5" }, "s6": { "pos": "s6" }, "s7": { "pos": "s7" }, "s8": { "pos": "s8" }, "s9": { "pos": "s9" } } } }, "graphics": { "tiles": { "walls": "castle", "thrones": "playercolour" }, "icons": { "soldiers": "rooks" } } }, "coffee": { "id": "coffee", "name": "Coffee", "source": "https://www.boardgamegeek.com/filepage/64972/coffee-rules-nestorgames", "tags": ["deploy", "formation", "limitmoves"], "author": "Néstor Romeral Andrés", "AI": ["Randy"], "board": { "height": 5, "width": 5, "terrainLayers": {} }, "graphics": { "icons": { "soldiers": "pawns", "markers": "pawns" } } }, "daggers": { "id": "daggers", "name": "Daggers", "source": "http://www.di.fc.ul.pt/~jpn/gv/daggers.htm", "tags": ["differentunits", "asymmetric", "multiplegoals", "infiltrate", "killking", "capture"], "AI": ["Randy"], "board": { "height": 8, "width": 8, "terrainLayers": { "bases": { "a8": { "pos": "a8", "owner": 1 }, "b8": { "pos": "b8", "owner": 1 }, "c8": { "pos": "c8", "owner": 1 }, "d8": { "pos": "d8", "owner": 1 }, "e8": { "pos": "e8", "owner": 1 }, "f8": { "pos": "f8", "owner": 1 }, "g8": { "pos": "g8", "owner": 1 }, "h8": { "pos": "h8", "owner": 1 }, "a1": { "pos": "a1", "owner": 2 }, "b1": { "pos": "b1", "owner": 2 }, "c1": { "pos": "c1", "owner": 2 }, "d1": { "pos": "d1", "owner": 2 }, "e1": { "pos": "e1", "owner": 2 }, "f1": { "pos": "f1", "owner": 2 }, "g1": { "pos": "g1", "owner": 2 }, "h1": { "pos": "h1", "owner": 2 } }, "oppbases": { "a8": { "pos": "a8", "owner": 1 }, "b8": { "pos": "b8", "owner": 1 }, "c8": { "pos": "c8", "owner": 1 }, "d8": { "pos": "d8", "owner": 1 }, "e8": { "pos": "e8", "owner": 1 }, "f8": { "pos": "f8", "owner": 1 }, "g8": { "pos": "g8", "owner": 1 }, "h8": { "pos": "h8", "owner": 1 }, "a1": { "pos": "a1", "owner": 2 }, "b1": { "pos": "b1", "owner": 2 }, "c1": { "pos": "c1", "owner": 2 }, "d1": { "pos": "d1", "owner": 2 }, "e1": { "pos": "e1", "owner": 2 }, "f1": { "pos": "f1", "owner": 2 }, "g1": { "pos": "g1", "owner": 2 }, "h1": { "pos": "h1", "owner": 2 } } } }, "graphics": { "tiles": { "bases": "playercolour" }, "icons": { "daggers": "bishops", "crowns": "kings" } } }, "gogol": { "id": "gogol", "name": "Gogol", "source": "http://www.di.fc.ul.pt/~jpn/gv/gogol.htm", "tags": ["deploy", "infiltrate", "kingkill", "multiplegoals", "differentunits", "jump"], "AI": ["Randy"], "board": { "height": 8, "width": 8, "terrainLayers": { "homerow": { "a1": { "pos": "a1", "owner": 1 }, "b1": { "pos": "b1", "owner": 1 }, "c1": { "pos": "c1", "owner": 1 }, "d1": { "pos": "d1", "owner": 1 }, "e1": { "pos": "e1", "owner": 1 }, "f1": { "pos": "f1", "owner": 1 }, "g1": { "pos": "g1", "owner": 1 }, "h1": { "pos": "h1", "owner": 1 }, "a8": { "pos": "a8", "owner": 2 }, "b8": { "pos": "b8", "owner": 2 }, "c8": { "pos": "c8", "owner": 2 }, "d8": { "pos": "d8", "owner": 2 }, "e8": { "pos": "e8", "owner": 2 }, "f8": { "pos": "f8", "owner": 2 }, "g8": { "pos": "g8", "owner": 2 }, "h8": { "pos": "h8", "owner": 2 } }, "opphomerow": { "a1": { "pos": "a1", "owner": 1 }, "b1": { "pos": "b1", "owner": 1 }, "c1": { "pos": "c1", "owner": 1 }, "d1": { "pos": "d1", "owner": 1 }, "e1": { "pos": "e1", "owner": 1 }, "f1": { "pos": "f1", "owner": 1 }, "g1": { "pos": "g1", "owner": 1 }, "h1": { "pos": "h1", "owner": 1 }, "a8": { "pos": "a8", "owner": 2 }, "b8": { "pos": "b8", "owner": 2 }, "c8": { "pos": "c8", "owner": 2 }, "d8": { "pos": "d8", "owner": 2 }, "e8": { "pos": "e8", "owner": 2 }, "f8": { "pos": "f8", "owner": 2 }, "g8": { "pos": "g8", "owner": 2 }, "h8": { "pos": "h8", "owner": 2 } }, "edges": { "a1": { "pos": "a1" }, "a2": { "pos": "a2" }, "a3": { "pos": "a3" }, "a4": { "pos": "a4" }, "a5": { "pos": "a5" }, "a6": { "pos": "a6" }, "a7": { "pos": "a7" }, "a8": { "pos": "a8" }, "h1": { "pos": "h1" }, "h2": { "pos": "h2" }, "h3": { "pos": "h3" }, "h4": { "pos": "h4" }, "h5": { "pos": "h5" }, "h6": { "pos": "h6" }, "h7": { "pos": "h7" }, "h8": { "pos": "h8" }, "b8": { "pos": "b8" }, "c8": { "pos": "c8" }, "d8": { "pos": "d8" }, "e8": { "pos": "e8" }, "f8": { "pos": "f8" }, "g8": { "pos": "g8" }, "b1": { "pos": "b1" }, "c1": { "pos": "c1" }, "d1": { "pos": "d1" }, "e1": { "pos": "e1" }, "f1": { "pos": "f1" }, "g1": { "pos": "g1" } } } }, "graphics": { "tiles": { "homerow": "playercolour" }, "icons": { "kings": "kings", "soldiers": "pawns" } } }, "jostle": { "id": "jostle", "name": "Jostle", "source": "http://www.marksteeregames.com/Jostle_Go_rules.pdf", "tags": [], "author": "Mark Steere", "year": 2010, "AI": ["Randy"], "board": { "height": 10, "width": 10, "terrainLayers": {} }, "graphics": { "icons": { "checkers": "pawns" } } }, "kickrun": { "id": "kickrun", "name": "Kick & run", "source": "http://www.di.fc.ul.pt/~jpn/gv/kickrun.htm", "tags": ["infiltrate", "differentunits", "capture"], "AI": ["Randy"], "board": { "height": 5, "width": 5, "terrainLayers": { "corners": { "a1": { "pos": "a1", "owner": 1 }, "e5": { "pos": "e5", "owner": 2 } }, "oppcorners": { "a1": { "pos": "a1", "owner": 1 }, "e5": { "pos": "e5", "owner": 2 } } } }, "graphics": { "tiles": { "corners": "playercolour" }, "icons": { "runners": "bishops", "sidekickers": "pawns" } } }, "krieg": { "id": "krieg", "name": "Krieg", "source": "http://www.di.fc.ul.pt/~jpn/gv/krieg.htm", "tags": ["infiltrate", "multiplegoals"], "AI": ["Fred", "Randy"], "board": { "width": 4, "height": 4, "terrainLayers": { "southeast": { "a4": { "pos": "a4" }, "c2": { "pos": "c2" } }, "northwest": { "b3": { "pos": "b3" }, "d1": { "pos": "d1" } }, "corners": { "a4": { "pos": "a4", "owner": 1 }, "d1": { "pos": "d1", "owner": 2 } }, "oppcorners": { "a4": { "pos": "a4", "owner": 1 }, "d1": { "pos": "d1", "owner": 2 } }, "bases": { "b4": { "pos": "b4", "owner": 1 }, "a3": { "pos": "a3", "owner": 1 }, "b3": { "pos": "b3", "owner": 1 }, "c2": { "pos": "c2", "owner": 2 }, "d2": { "pos": "d2", "owner": 2 }, "c1": { "pos": "c1", "owner": 2 } }, "oppbases": { "b4": { "pos": "b4", "owner": 1 }, "a3": { "pos": "a3", "owner": 1 }, "b3": { "pos": "b3", "owner": 1 }, "c2": { "pos": "c2", "owner": 2 }, "d2": { "pos": "d2", "owner": 2 }, "c1": { "pos": "c1", "owner": 2 } } } }, "graphics": { "tiles": { "corners": "playercolour", "bases": "castle" }, "icons": { "notfrozens": "knights", "frozens": "rooks" } } }, "murusgallicus": { "id": "murusgallicus", "name": "Murus Gallicus", "source": "https://boardgamegeek.com/filepage/46316/murus-gallicus-detailed-rules", "tags": ["differentunits", "infiltrate"], "author": "Phillip L. Leduc", "AI": ["Steve", "Joe", "Clive", "Randy"], "board": { "height": 7, "width": 8, "terrainLayers": { "homerow": { "a1": { "pos": "a1", "owner": 1 }, "b1": { "pos": "b1", "owner": 1 }, "c1": { "pos": "c1", "owner": 1 }, "d1": { "pos": "d1", "owner": 1 }, "e1": { "pos": "e1", "owner": 1 }, "f1": { "pos": "f1", "owner": 1 }, "g1": { "pos": "g1", "owner": 1 }, "h1": { "pos": "h1", "owner": 1 }, "a7": { "pos": "a7", "owner": 2 }, "b7": { "pos": "b7", "owner": 2 }, "c7": { "pos": "c7", "owner": 2 }, "d7": { "pos": "d7", "owner": 2 }, "e7": { "pos": "e7", "owner": 2 }, "f7": { "pos": "f7", "owner": 2 }, "g7": { "pos": "g7", "owner": 2 }, "h7": { "pos": "h7", "owner": 2 } }, "opphomerow": { "a1": { "pos": "a1", "owner": 1 }, "b1": { "pos": "b1", "owner": 1 }, "c1": { "pos": "c1", "owner": 1 }, "d1": { "pos": "d1", "owner": 1 }, "e1": { "pos": "e1", "owner": 1 }, "f1": { "pos": "f1", "owner": 1 }, "g1": { "pos": "g1", "owner": 1 }, "h1": { "pos": "h1", "owner": 1 }, "a7": { "pos": "a7", "owner": 2 }, "b7": { "pos": "b7", "owner": 2 }, "c7": { "pos": "c7", "owner": 2 }, "d7": { "pos": "d7", "owner": 2 }, "e7": { "pos": "e7", "owner": 2 }, "f7": { "pos": "f7", "owner": 2 }, "g7": { "pos": "g7", "owner": 2 }, "h7": { "pos": "h7", "owner": 2 } }, "threatrow": { "a3": { "pos": "a3", "owner": 1 }, "b3": { "pos": "b3", "owner": 1 }, "c3": { "pos": "c3", "owner": 1 }, "d3": { "pos": "d3", "owner": 1 }, "e3": { "pos": "e3", "owner": 1 }, "f3": { "pos": "f3", "owner": 1 }, "g3": { "pos": "g3", "owner": 1 }, "h3": { "pos": "h3", "owner": 1 }, "a5": { "pos": "a5", "owner": 2 }, "b5": { "pos": "b5", "owner": 2 }, "c5": { "pos": "c5", "owner": 2 }, "d5": { "pos": "d5", "owner": 2 }, "e5": { "pos": "e5", "owner": 2 }, "f5": { "pos": "f5", "owner": 2 }, "g5": { "pos": "g5", "owner": 2 }, "h5": { "pos": "h5", "owner": 2 } }, "oppthreatrow": { "a3": { "pos": "a3", "owner": 1 }, "b3": { "pos": "b3", "owner": 1 }, "c3": { "pos": "c3", "owner": 1 }, "d3": { "pos": "d3", "owner": 1 }, "e3": { "pos": "e3", "owner": 1 }, "f3": { "pos": "f3", "owner": 1 }, "g3": { "pos": "g3", "owner": 1 }, "h3": { "pos": "h3", "owner": 1 }, "a5": { "pos": "a5", "owner": 2 }, "b5": { "pos": "b5", "owner": 2 }, "c5": { "pos": "c5", "owner": 2 }, "d5": { "pos": "d5", "owner": 2 }, "e5": { "pos": "e5", "owner": 2 }, "f5": { "pos": "f5", "owner": 2 }, "g5": { "pos": "g5", "owner": 2 }, "h5": { "pos": "h5", "owner": 2 } } } }, "graphics": { "tiles": { "homerow": "playercolour" }, "icons": { "towers": "rooks", "walls": "pawns" } } }, "murusgallicusadvanced": { "id": "murusgallicusadvanced", "name": "Murus Gallicus Advanced", "source": "https://boardgamegeek.com/thread/844020/advanced-murus-gallicus", "tags": ["differentunits", "infiltrate", "shoot"], "author": "Phillip L. Leduc", "AI": ["Randy"], "board": { "height": 7, "width": 8, "terrainLayers": { "homerow": { "a1": { "pos": "a1", "owner": 1 }, "b1": { "pos": "b1", "owner": 1 }, "c1": { "pos": "c1", "owner": 1 }, "d1": { "pos": "d1", "owner": 1 }, "e1": { "pos": "e1", "owner": 1 }, "f1": { "pos": "f1", "owner": 1 }, "g1": { "pos": "g1", "owner": 1 }, "h1": { "pos": "h1", "owner": 1 }, "a7": { "pos": "a7", "owner": 2 }, "b7": { "pos": "b7", "owner": 2 }, "c7": { "pos": "c7", "owner": 2 }, "d7": { "pos": "d7", "owner": 2 }, "e7": { "pos": "e7", "owner": 2 }, "f7": { "pos": "f7", "owner": 2 }, "g7": { "pos": "g7", "owner": 2 }, "h7": { "pos": "h7", "owner": 2 } }, "opphomerow": { "a1": { "pos": "a1", "owner": 1 }, "b1": { "pos": "b1", "owner": 1 }, "c1": { "pos": "c1", "owner": 1 }, "d1": { "pos": "d1", "owner": 1 }, "e1": { "pos": "e1", "owner": 1 }, "f1": { "pos": "f1", "owner": 1 }, "g1": { "pos": "g1", "owner": 1 }, "h1": { "pos": "h1", "owner": 1 }, "a7": { "pos": "a7", "owner": 2 }, "b7": { "pos": "b7", "owner": 2 }, "c7": { "pos": "c7", "owner": 2 }, "d7": { "pos": "d7", "owner": 2 }, "e7": { "pos": "e7", "owner": 2 }, "f7": { "pos": "f7", "owner": 2 }, "g7": { "pos": "g7", "owner": 2 }, "h7": { "pos": "h7", "owner": 2 } } } }, "graphics": { "tiles": { "homerow": "playercolour" }, "icons": { "towers": "rooks", "walls": "pawns", "catapults": "queens" } } }, "orthokon": { "id": "orthokon", "name": "Orthokon", "source": "http://www.di.fc.ul.pt/~jpn/gv/orthokon.htm", "tags": ["changeowner", "stalemate"], "author": "L. Lynn Smith", "year": 2001, "AI": ["Bob", "Randy"], "board": { "height": 4, "width": 4, "terrainLayers": {} }, "graphics": { "icons": { "soldiers": "pawns" } } }, "semaphor": { "id": "semaphor", "name": "Semaphor", "source": "http://www.di.fc.ul.pt/~jpn/gv/semaphor.htm", "tags": ["commonunits", "formation", "deploy", "chooseaction", "changeunit"], "AI": ["Randy"], "board": { "width": 4, "height": 3, "terrainLayers": {} }, "graphics": { "icons": { "kings": "kings", "pawns": "pawns", "bishops": "bishops" } } }, "serauqs": { "id": "serauqs", "name": "Serauqs", "source": "https://boardgamegeek.com/image/274401/serauqs", "tags": ["formation"], "AI": ["Randy"], "board": { "height": 4, "width": 4, "terrainLayers": { "base": { "a1": { "pos": "a1", "owner": 1 }, "b1": { "pos": "b1", "owner": 1 }, "c1": { "pos": "c1", "owner": 1 }, "d1": { "pos": "d1", "owner": 1 }, "a4": { "pos": "a4", "owner": 2 }, "b4": { "pos": "b4", "owner": 2 }, "c4": { "pos": "c4", "owner": 2 }, "d4": { "pos": "d4", "owner": 2 } }, "oppbase": { "a1": { "pos": "a1", "owner": 1 }, "b1": { "pos": "b1", "owner": 1 }, "c1": { "pos": "c1", "owner": 1 }, "d1": { "pos": "d1", "owner": 1 }, "a4": { "pos": "a4", "owner": 2 }, "b4": { "pos": "b4", "owner": 2 }, "c4": { "pos": "c4", "owner": 2 }, "d4": { "pos": "d4", "owner": 2 } }, "corners": { "a1": { "pos": "a1" }, "a4": { "pos": "a4" }, "d1": { "pos": "d1" }, "d4": { "pos": "d4" } }, "middle": { "b2": { "pos": "b2" }, "c2": { "pos": "c2" }, "b3": { "pos": "b3" }, "c3": { "pos": "c3" } } } }, "graphics": { "icons": { "soldiers": "pawns", "wild": "kings" }, "tiles": { "corners": "grass", "middle": "castle" } } }, "snijpunt": { "id": "snijpunt", "name": "Snijpunt", "source": "http://www.di.fc.ul.pt/~jpn/gv/snijpunt.htm", "tags": ["formation", "changeowner", "deploy"], "AI": ["Randy"], "board": { "height": 6, "width": 6, "terrainLayers": { "zone": { "b6": { "pos": "b6", "owner": 1 }, "c6": { "pos": "c6", "owner": 1 }, "d6": { "pos": "d6", "owner": 1 }, "e6": { "pos": "e6", "owner": 1 }, "f6": { "pos": "f6", "owner": 1 }, "a1": { "pos": "a1", "owner": 2 }, "a2": { "pos": "a2", "owner": 2 }, "a3": { "pos": "a3", "owner": 2 }, "a4": { "pos": "a4", "owner": 2 }, "a5": { "pos": "a5", "owner": 2 } }, "oppzone": { "b6": { "pos": "b6", "owner": 1 }, "c6": { "pos": "c6", "owner": 1 }, "d6": { "pos": "d6", "owner": 1 }, "e6": { "pos": "e6", "owner": 1 }, "f6": { "pos": "f6", "owner": 1 }, "a1": { "pos": "a1", "owner": 2 }, "a2": { "pos": "a2", "owner": 2 }, "a3": { "pos": "a3", "owner": 2 }, "a4": { "pos": "a4", "owner": 2 }, "a5": { "pos": "a5", "owner": 2 } }, "corner": { "a6": { "pos": "a6" } } } }, "graphics": { "icons": { "soldiers": "pawns", "sniper": "kings" }, "tiles": { "zone": "grass", "corner": "castle" } } }, "threemusketeers": { "id": "threemusketeers", "name": "Three Musketeers", "source": "http://www.di.fc.ul.pt/~jpn/gv/3musketeers.htm", "tags": ["asymmetric", "formation"], "AI": ["Randy"], "board": { "height": 5, "width": 5, "terrainLayers": {} }, "graphics": { "icons": { "pawns": "pawns", "kings": "kings" } } }, "transet": { "id": "transet", "name": "Transet", "source": "http://sagme.blogspot.se/2013/05/transet.html", "tags": ["infiltration", "differentunits"], "AI": ["Randy"], "board": { "height": 5, "width": 5, "terrainLayers": { "base": { "a1": { "pos": "a1", "owner": 1 }, "b1": { "pos": "b1", "owner": 1 }, "c1": { "pos": "c1", "owner": 1 }, "d1": { "pos": "d1", "owner": 1 }, "e1": { "pos": "e1", "owner": 1 }, "a5": { "pos": "a5", "owner": 2 }, "b5": { "pos": "b5", "owner": 2 }, "c5": { "pos": "c5", "owner": 2 }, "d5": { "pos": "d5", "owner": 2 }, "e5": { "pos": "e5", "owner": 2 } }, "oppbase": { "a1": { "pos": "a1", "owner": 1 }, "b1": { "pos": "b1", "owner": 1 }, "c1": { "pos": "c1", "owner": 1 }, "d1": { "pos": "d1", "owner": 1 }, "e1": { "pos": "e1", "owner": 1 }, "a5": { "pos": "a5", "owner": 2 }, "b5": { "pos": "b5", "owner": 2 }, "c5": { "pos": "c5", "owner": 2 }, "d5": { "pos": "d5", "owner": 2 }, "e5": { "pos": "e5", "owner": 2 } } } }, "graphics": { "icons": { "pinets": "pawns", "piokers": "bishops", "piases": "kings" }, "tiles": { "base": "playercolour" } } }, "uglyduck": { "name": "Ugly duck", "id": "uglyduck", "source": "http://www.di.fc.ul.pt/~jpn/gv/uglyduck.htm", "tags": ["capture", "differentunits"], "AI": ["Randy"], "board": { "height": 5, "width": 5, "terrainLayers": { "homerow": { "a1": { "pos": "a1", "owner": 1 }, "b1": { "pos": "b1", "owner": 1 }, "c1": { "pos": "c1", "owner": 1 }, "d1": { "pos": "d1", "owner": 1 }, "e1": { "pos": "e1", "owner": 1 }, "a5": { "pos": "a5", "owner": 2 }, "b5": { "pos": "b5", "owner": 2 }, "c5": { "pos": "c5", "owner": 2 }, "d5": { "pos": "d5", "owner": 2 }, "e5": { "pos": "e5", "owner": 2 } }, "opphomerow": { "a1": { "pos": "a1", "owner": 1 }, "b1": { "pos": "b1", "owner": 1 }, "c1": { "pos": "c1", "owner": 1 }, "d1": { "pos": "d1", "owner": 1 }, "e1": { "pos": "e1", "owner": 1 }, "a5": { "pos": "a5", "owner": 2 }, "b5": { "pos": "b5", "owner": 2 }, "c5": { "pos": "c5", "owner": 2 }, "d5": { "pos": "d5", "owner": 2 }, "e5": { "pos": "e5", "owner": 2 } } } }, "graphics": { "icons": { "soldiers": "pawns", "kings": "kings" }, "tiles": { "homerow": "playercolour" } } } };

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(5),
	    baseClone = __webpack_require__(6),
	    baseUnset = __webpack_require__(117),
	    castPath = __webpack_require__(118),
	    copyObject = __webpack_require__(56),
	    customOmitClone = __webpack_require__(131),
	    flatRest = __webpack_require__(133),
	    getAllKeysIn = __webpack_require__(94);

	/** Used to compose bitmasks for cloning. */
	var CLONE_DEEP_FLAG = 1,
	    CLONE_FLAT_FLAG = 2,
	    CLONE_SYMBOLS_FLAG = 4;

	/**
	 * The opposite of `_.pick`; this method creates an object composed of the
	 * own and inherited enumerable property paths of `object` that are not omitted.
	 *
	 * **Note:** This method is considerably slower than `_.pick`.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The source object.
	 * @param {...(string|string[])} [paths] The property paths to omit.
	 * @returns {Object} Returns the new object.
	 * @example
	 *
	 * var object = { 'a': 1, 'b': '2', 'c': 3 };
	 *
	 * _.omit(object, ['a', 'c']);
	 * // => { 'b': '2' }
	 */
	var omit = flatRest(function(object, paths) {
	  var result = {};
	  if (object == null) {
	    return result;
	  }
	  var isDeep = false;
	  paths = arrayMap(paths, function(path) {
	    path = castPath(path, object);
	    isDeep || (isDeep = path.length > 1);
	    return path;
	  });
	  copyObject(object, getAllKeysIn(object), result);
	  if (isDeep) {
	    result = baseClone(result, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
	  }
	  var length = paths.length;
	  while (length--) {
	    baseUnset(result, paths[length]);
	  }
	  return result;
	});

	module.exports = omit;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

	/**
	 * A specialized version of `_.map` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function arrayMap(array, iteratee) {
	  var index = -1,
	      length = array == null ? 0 : array.length,
	      result = Array(length);

	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}

	module.exports = arrayMap;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(7),
	    arrayEach = __webpack_require__(51),
	    assignValue = __webpack_require__(52),
	    baseAssign = __webpack_require__(55),
	    baseAssignIn = __webpack_require__(78),
	    cloneBuffer = __webpack_require__(82),
	    copyArray = __webpack_require__(83),
	    copySymbols = __webpack_require__(84),
	    copySymbolsIn = __webpack_require__(88),
	    getAllKeys = __webpack_require__(92),
	    getAllKeysIn = __webpack_require__(94),
	    getTag = __webpack_require__(95),
	    initCloneArray = __webpack_require__(100),
	    initCloneByTag = __webpack_require__(101),
	    initCloneObject = __webpack_require__(115),
	    isArray = __webpack_require__(63),
	    isBuffer = __webpack_require__(64),
	    isObject = __webpack_require__(31),
	    keys = __webpack_require__(57);

	/** Used to compose bitmasks for cloning. */
	var CLONE_DEEP_FLAG = 1,
	    CLONE_FLAT_FLAG = 2,
	    CLONE_SYMBOLS_FLAG = 4;

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to identify `toStringTag` values supported by `_.clone`. */
	var cloneableTags = {};
	cloneableTags[argsTag] = cloneableTags[arrayTag] =
	cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
	cloneableTags[boolTag] = cloneableTags[dateTag] =
	cloneableTags[float32Tag] = cloneableTags[float64Tag] =
	cloneableTags[int8Tag] = cloneableTags[int16Tag] =
	cloneableTags[int32Tag] = cloneableTags[mapTag] =
	cloneableTags[numberTag] = cloneableTags[objectTag] =
	cloneableTags[regexpTag] = cloneableTags[setTag] =
	cloneableTags[stringTag] = cloneableTags[symbolTag] =
	cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
	cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
	cloneableTags[errorTag] = cloneableTags[funcTag] =
	cloneableTags[weakMapTag] = false;

	/**
	 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
	 * traversed objects.
	 *
	 * @private
	 * @param {*} value The value to clone.
	 * @param {boolean} bitmask The bitmask flags.
	 *  1 - Deep clone
	 *  2 - Flatten inherited properties
	 *  4 - Clone symbols
	 * @param {Function} [customizer] The function to customize cloning.
	 * @param {string} [key] The key of `value`.
	 * @param {Object} [object] The parent object of `value`.
	 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
	 * @returns {*} Returns the cloned value.
	 */
	function baseClone(value, bitmask, customizer, key, object, stack) {
	  var result,
	      isDeep = bitmask & CLONE_DEEP_FLAG,
	      isFlat = bitmask & CLONE_FLAT_FLAG,
	      isFull = bitmask & CLONE_SYMBOLS_FLAG;

	  if (customizer) {
	    result = object ? customizer(value, key, object, stack) : customizer(value);
	  }
	  if (result !== undefined) {
	    return result;
	  }
	  if (!isObject(value)) {
	    return value;
	  }
	  var isArr = isArray(value);
	  if (isArr) {
	    result = initCloneArray(value);
	    if (!isDeep) {
	      return copyArray(value, result);
	    }
	  } else {
	    var tag = getTag(value),
	        isFunc = tag == funcTag || tag == genTag;

	    if (isBuffer(value)) {
	      return cloneBuffer(value, isDeep);
	    }
	    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
	      result = (isFlat || isFunc) ? {} : initCloneObject(value);
	      if (!isDeep) {
	        return isFlat
	          ? copySymbolsIn(value, baseAssignIn(result, value))
	          : copySymbols(value, baseAssign(result, value));
	      }
	    } else {
	      if (!cloneableTags[tag]) {
	        return object ? value : {};
	      }
	      result = initCloneByTag(value, tag, baseClone, isDeep);
	    }
	  }
	  // Check for circular references and return its corresponding clone.
	  stack || (stack = new Stack);
	  var stacked = stack.get(value);
	  if (stacked) {
	    return stacked;
	  }
	  stack.set(value, result);

	  var keysFunc = isFull
	    ? (isFlat ? getAllKeysIn : getAllKeys)
	    : (isFlat ? keysIn : keys);

	  var props = isArr ? undefined : keysFunc(value);
	  arrayEach(props || value, function(subValue, key) {
	    if (props) {
	      key = subValue;
	      subValue = value[key];
	    }
	    // Recursively populate clone (susceptible to call stack limits).
	    assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
	  });
	  return result;
	}

	module.exports = baseClone;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(8),
	    stackClear = __webpack_require__(16),
	    stackDelete = __webpack_require__(17),
	    stackGet = __webpack_require__(18),
	    stackHas = __webpack_require__(19),
	    stackSet = __webpack_require__(20);

	/**
	 * Creates a stack cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Stack(entries) {
	  var data = this.__data__ = new ListCache(entries);
	  this.size = data.size;
	}

	// Add methods to `Stack`.
	Stack.prototype.clear = stackClear;
	Stack.prototype['delete'] = stackDelete;
	Stack.prototype.get = stackGet;
	Stack.prototype.has = stackHas;
	Stack.prototype.set = stackSet;

	module.exports = Stack;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	var listCacheClear = __webpack_require__(9),
	    listCacheDelete = __webpack_require__(10),
	    listCacheGet = __webpack_require__(13),
	    listCacheHas = __webpack_require__(14),
	    listCacheSet = __webpack_require__(15);

	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function ListCache(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `ListCache`.
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype['delete'] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;

	module.exports = ListCache;


/***/ }),
/* 9 */
/***/ (function(module, exports) {

	/**
	 * Removes all key-value entries from the list cache.
	 *
	 * @private
	 * @name clear
	 * @memberOf ListCache
	 */
	function listCacheClear() {
	  this.__data__ = [];
	  this.size = 0;
	}

	module.exports = listCacheClear;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(11);

	/** Used for built-in method references. */
	var arrayProto = Array.prototype;

	/** Built-in value references. */
	var splice = arrayProto.splice;

	/**
	 * Removes `key` and its value from the list cache.
	 *
	 * @private
	 * @name delete
	 * @memberOf ListCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function listCacheDelete(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = data.length - 1;
	  if (index == lastIndex) {
	    data.pop();
	  } else {
	    splice.call(data, index, 1);
	  }
	  --this.size;
	  return true;
	}

	module.exports = listCacheDelete;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(12);

	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}

	module.exports = assocIndexOf;


/***/ }),
/* 12 */
/***/ (function(module, exports) {

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}

	module.exports = eq;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(11);

	/**
	 * Gets the list cache value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf ListCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function listCacheGet(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  return index < 0 ? undefined : data[index][1];
	}

	module.exports = listCacheGet;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(11);

	/**
	 * Checks if a list cache value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf ListCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function listCacheHas(key) {
	  return assocIndexOf(this.__data__, key) > -1;
	}

	module.exports = listCacheHas;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(11);

	/**
	 * Sets the list cache `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf ListCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the list cache instance.
	 */
	function listCacheSet(key, value) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    ++this.size;
	    data.push([key, value]);
	  } else {
	    data[index][1] = value;
	  }
	  return this;
	}

	module.exports = listCacheSet;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(8);

	/**
	 * Removes all key-value entries from the stack.
	 *
	 * @private
	 * @name clear
	 * @memberOf Stack
	 */
	function stackClear() {
	  this.__data__ = new ListCache;
	  this.size = 0;
	}

	module.exports = stackClear;


/***/ }),
/* 17 */
/***/ (function(module, exports) {

	/**
	 * Removes `key` and its value from the stack.
	 *
	 * @private
	 * @name delete
	 * @memberOf Stack
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function stackDelete(key) {
	  var data = this.__data__,
	      result = data['delete'](key);

	  this.size = data.size;
	  return result;
	}

	module.exports = stackDelete;


/***/ }),
/* 18 */
/***/ (function(module, exports) {

	/**
	 * Gets the stack value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Stack
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function stackGet(key) {
	  return this.__data__.get(key);
	}

	module.exports = stackGet;


/***/ }),
/* 19 */
/***/ (function(module, exports) {

	/**
	 * Checks if a stack value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Stack
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function stackHas(key) {
	  return this.__data__.has(key);
	}

	module.exports = stackHas;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(8),
	    Map = __webpack_require__(21),
	    MapCache = __webpack_require__(36);

	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/**
	 * Sets the stack `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Stack
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the stack cache instance.
	 */
	function stackSet(key, value) {
	  var data = this.__data__;
	  if (data instanceof ListCache) {
	    var pairs = data.__data__;
	    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
	      pairs.push([key, value]);
	      this.size = ++data.size;
	      return this;
	    }
	    data = this.__data__ = new MapCache(pairs);
	  }
	  data.set(key, value);
	  this.size = data.size;
	  return this;
	}

	module.exports = stackSet;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(22),
	    root = __webpack_require__(27);

	/* Built-in method references that are verified to be native. */
	var Map = getNative(root, 'Map');

	module.exports = Map;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	var baseIsNative = __webpack_require__(23),
	    getValue = __webpack_require__(35);

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = getValue(object, key);
	  return baseIsNative(value) ? value : undefined;
	}

	module.exports = getNative;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(24),
	    isMasked = __webpack_require__(32),
	    isObject = __webpack_require__(31),
	    toSource = __webpack_require__(34);

	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
	 */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	    objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/**
	 * The base implementation of `_.isNative` without bad shim checks.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 */
	function baseIsNative(value) {
	  if (!isObject(value) || isMasked(value)) {
	    return false;
	  }
	  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
	  return pattern.test(toSource(value));
	}

	module.exports = baseIsNative;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(25),
	    isObject = __webpack_require__(31);

	/** `Object#toString` result references. */
	var asyncTag = '[object AsyncFunction]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    proxyTag = '[object Proxy]';

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  if (!isObject(value)) {
	    return false;
	  }
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 9 which returns 'object' for typed arrays and other constructors.
	  var tag = baseGetTag(value);
	  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
	}

	module.exports = isFunction;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(26),
	    getRawTag = __webpack_require__(29),
	    objectToString = __webpack_require__(30);

	/** `Object#toString` result references. */
	var nullTag = '[object Null]',
	    undefinedTag = '[object Undefined]';

	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

	/**
	 * The base implementation of `getTag` without fallbacks for buggy environments.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  if (value == null) {
	    return value === undefined ? undefinedTag : nullTag;
	  }
	  return (symToStringTag && symToStringTag in Object(value))
	    ? getRawTag(value)
	    : objectToString(value);
	}

	module.exports = baseGetTag;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	var root = __webpack_require__(27);

	/** Built-in value references. */
	var Symbol = root.Symbol;

	module.exports = Symbol;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	var freeGlobal = __webpack_require__(28);

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	module.exports = root;


/***/ }),
/* 28 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

	module.exports = freeGlobal;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(26);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

	/**
	 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the raw `toStringTag`.
	 */
	function getRawTag(value) {
	  var isOwn = hasOwnProperty.call(value, symToStringTag),
	      tag = value[symToStringTag];

	  try {
	    value[symToStringTag] = undefined;
	    var unmasked = true;
	  } catch (e) {}

	  var result = nativeObjectToString.call(value);
	  if (unmasked) {
	    if (isOwn) {
	      value[symToStringTag] = tag;
	    } else {
	      delete value[symToStringTag];
	    }
	  }
	  return result;
	}

	module.exports = getRawTag;


/***/ }),
/* 30 */
/***/ (function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/**
	 * Converts `value` to a string using `Object.prototype.toString`.
	 *
	 * @private
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 */
	function objectToString(value) {
	  return nativeObjectToString.call(value);
	}

	module.exports = objectToString;


/***/ }),
/* 31 */
/***/ (function(module, exports) {

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return value != null && (type == 'object' || type == 'function');
	}

	module.exports = isObject;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	var coreJsData = __webpack_require__(33);

	/** Used to detect methods masquerading as native. */
	var maskSrcKey = (function() {
	  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
	  return uid ? ('Symbol(src)_1.' + uid) : '';
	}());

	/**
	 * Checks if `func` has its source masked.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
	 */
	function isMasked(func) {
	  return !!maskSrcKey && (maskSrcKey in func);
	}

	module.exports = isMasked;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	var root = __webpack_require__(27);

	/** Used to detect overreaching core-js shims. */
	var coreJsData = root['__core-js_shared__'];

	module.exports = coreJsData;


/***/ }),
/* 34 */
/***/ (function(module, exports) {

	/** Used for built-in method references. */
	var funcProto = Function.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to convert.
	 * @returns {string} Returns the source code.
	 */
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString.call(func);
	    } catch (e) {}
	    try {
	      return (func + '');
	    } catch (e) {}
	  }
	  return '';
	}

	module.exports = toSource;


/***/ }),
/* 35 */
/***/ (function(module, exports) {

	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function getValue(object, key) {
	  return object == null ? undefined : object[key];
	}

	module.exports = getValue;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	var mapCacheClear = __webpack_require__(37),
	    mapCacheDelete = __webpack_require__(45),
	    mapCacheGet = __webpack_require__(48),
	    mapCacheHas = __webpack_require__(49),
	    mapCacheSet = __webpack_require__(50);

	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function MapCache(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `MapCache`.
	MapCache.prototype.clear = mapCacheClear;
	MapCache.prototype['delete'] = mapCacheDelete;
	MapCache.prototype.get = mapCacheGet;
	MapCache.prototype.has = mapCacheHas;
	MapCache.prototype.set = mapCacheSet;

	module.exports = MapCache;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	var Hash = __webpack_require__(38),
	    ListCache = __webpack_require__(8),
	    Map = __webpack_require__(21);

	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapCacheClear() {
	  this.size = 0;
	  this.__data__ = {
	    'hash': new Hash,
	    'map': new (Map || ListCache),
	    'string': new Hash
	  };
	}

	module.exports = mapCacheClear;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	var hashClear = __webpack_require__(39),
	    hashDelete = __webpack_require__(41),
	    hashGet = __webpack_require__(42),
	    hashHas = __webpack_require__(43),
	    hashSet = __webpack_require__(44);

	/**
	 * Creates a hash object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Hash(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `Hash`.
	Hash.prototype.clear = hashClear;
	Hash.prototype['delete'] = hashDelete;
	Hash.prototype.get = hashGet;
	Hash.prototype.has = hashHas;
	Hash.prototype.set = hashSet;

	module.exports = Hash;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(40);

	/**
	 * Removes all key-value entries from the hash.
	 *
	 * @private
	 * @name clear
	 * @memberOf Hash
	 */
	function hashClear() {
	  this.__data__ = nativeCreate ? nativeCreate(null) : {};
	  this.size = 0;
	}

	module.exports = hashClear;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(22);

	/* Built-in method references that are verified to be native. */
	var nativeCreate = getNative(Object, 'create');

	module.exports = nativeCreate;


/***/ }),
/* 41 */
/***/ (function(module, exports) {

	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @name delete
	 * @memberOf Hash
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(key) {
	  var result = this.has(key) && delete this.__data__[key];
	  this.size -= result ? 1 : 0;
	  return result;
	}

	module.exports = hashDelete;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(40);

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Hash
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(key) {
	  var data = this.__data__;
	  if (nativeCreate) {
	    var result = data[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty.call(data, key) ? data[key] : undefined;
	}

	module.exports = hashGet;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(40);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Hash
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(key) {
	  var data = this.__data__;
	  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
	}

	module.exports = hashHas;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(40);

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Hash
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the hash instance.
	 */
	function hashSet(key, value) {
	  var data = this.__data__;
	  this.size += this.has(key) ? 0 : 1;
	  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
	  return this;
	}

	module.exports = hashSet;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(46);

	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapCacheDelete(key) {
	  var result = getMapData(this, key)['delete'](key);
	  this.size -= result ? 1 : 0;
	  return result;
	}

	module.exports = mapCacheDelete;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	var isKeyable = __webpack_require__(47);

	/**
	 * Gets the data for `map`.
	 *
	 * @private
	 * @param {Object} map The map to query.
	 * @param {string} key The reference key.
	 * @returns {*} Returns the map data.
	 */
	function getMapData(map, key) {
	  var data = map.__data__;
	  return isKeyable(key)
	    ? data[typeof key == 'string' ? 'string' : 'hash']
	    : data.map;
	}

	module.exports = getMapData;


/***/ }),
/* 47 */
/***/ (function(module, exports) {

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value;
	  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
	    ? (value !== '__proto__')
	    : (value === null);
	}

	module.exports = isKeyable;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(46);

	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapCacheGet(key) {
	  return getMapData(this, key).get(key);
	}

	module.exports = mapCacheGet;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(46);

	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapCacheHas(key) {
	  return getMapData(this, key).has(key);
	}

	module.exports = mapCacheHas;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(46);

	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache instance.
	 */
	function mapCacheSet(key, value) {
	  var data = getMapData(this, key),
	      size = data.size;

	  data.set(key, value);
	  this.size += data.size == size ? 0 : 1;
	  return this;
	}

	module.exports = mapCacheSet;


/***/ }),
/* 51 */
/***/ (function(module, exports) {

	/**
	 * A specialized version of `_.forEach` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns `array`.
	 */
	function arrayEach(array, iteratee) {
	  var index = -1,
	      length = array == null ? 0 : array.length;

	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	  return array;
	}

	module.exports = arrayEach;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

	var baseAssignValue = __webpack_require__(53),
	    eq = __webpack_require__(12);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Assigns `value` to `key` of `object` if the existing value is not equivalent
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignValue(object, key, value) {
	  var objValue = object[key];
	  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
	      (value === undefined && !(key in object))) {
	    baseAssignValue(object, key, value);
	  }
	}

	module.exports = assignValue;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

	var defineProperty = __webpack_require__(54);

	/**
	 * The base implementation of `assignValue` and `assignMergeValue` without
	 * value checks.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function baseAssignValue(object, key, value) {
	  if (key == '__proto__' && defineProperty) {
	    defineProperty(object, key, {
	      'configurable': true,
	      'enumerable': true,
	      'value': value,
	      'writable': true
	    });
	  } else {
	    object[key] = value;
	  }
	}

	module.exports = baseAssignValue;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(22);

	var defineProperty = (function() {
	  try {
	    var func = getNative(Object, 'defineProperty');
	    func({}, '', {});
	    return func;
	  } catch (e) {}
	}());

	module.exports = defineProperty;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(56),
	    keys = __webpack_require__(57);

	/**
	 * The base implementation of `_.assign` without support for multiple sources
	 * or `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @returns {Object} Returns `object`.
	 */
	function baseAssign(object, source) {
	  return object && copyObject(source, keys(source), object);
	}

	module.exports = baseAssign;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

	var assignValue = __webpack_require__(52),
	    baseAssignValue = __webpack_require__(53);

	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property identifiers to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @param {Function} [customizer] The function to customize copied values.
	 * @returns {Object} Returns `object`.
	 */
	function copyObject(source, props, object, customizer) {
	  var isNew = !object;
	  object || (object = {});

	  var index = -1,
	      length = props.length;

	  while (++index < length) {
	    var key = props[index];

	    var newValue = customizer
	      ? customizer(object[key], source[key], key, object, source)
	      : undefined;

	    if (newValue === undefined) {
	      newValue = source[key];
	    }
	    if (isNew) {
	      baseAssignValue(object, key, newValue);
	    } else {
	      assignValue(object, key, newValue);
	    }
	  }
	  return object;
	}

	module.exports = copyObject;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

	var arrayLikeKeys = __webpack_require__(58),
	    baseKeys = __webpack_require__(73),
	    isArrayLike = __webpack_require__(77);

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys(object) {
	  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
	}

	module.exports = keys;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

	var baseTimes = __webpack_require__(59),
	    isArguments = __webpack_require__(60),
	    isArray = __webpack_require__(63),
	    isBuffer = __webpack_require__(64),
	    isIndex = __webpack_require__(67),
	    isTypedArray = __webpack_require__(68);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Creates an array of the enumerable property names of the array-like `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @param {boolean} inherited Specify returning inherited property names.
	 * @returns {Array} Returns the array of property names.
	 */
	function arrayLikeKeys(value, inherited) {
	  var isArr = isArray(value),
	      isArg = !isArr && isArguments(value),
	      isBuff = !isArr && !isArg && isBuffer(value),
	      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
	      skipIndexes = isArr || isArg || isBuff || isType,
	      result = skipIndexes ? baseTimes(value.length, String) : [],
	      length = result.length;

	  for (var key in value) {
	    if ((inherited || hasOwnProperty.call(value, key)) &&
	        !(skipIndexes && (
	           // Safari 9 has enumerable `arguments.length` in strict mode.
	           key == 'length' ||
	           // Node.js 0.10 has enumerable non-index properties on buffers.
	           (isBuff && (key == 'offset' || key == 'parent')) ||
	           // PhantomJS 2 has enumerable non-index properties on typed arrays.
	           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
	           // Skip index properties.
	           isIndex(key, length)
	        ))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = arrayLikeKeys;


/***/ }),
/* 59 */
/***/ (function(module, exports) {

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);

	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}

	module.exports = baseTimes;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

	var baseIsArguments = __webpack_require__(61),
	    isObjectLike = __webpack_require__(62);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
	  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
	    !propertyIsEnumerable.call(value, 'callee');
	};

	module.exports = isArguments;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(25),
	    isObjectLike = __webpack_require__(62);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';

	/**
	 * The base implementation of `_.isArguments`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 */
	function baseIsArguments(value) {
	  return isObjectLike(value) && baseGetTag(value) == argsTag;
	}

	module.exports = baseIsArguments;


/***/ }),
/* 62 */
/***/ (function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return value != null && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ }),
/* 63 */
/***/ (function(module, exports) {

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	module.exports = isArray;


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(27),
	    stubFalse = __webpack_require__(66);

	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Built-in value references. */
	var Buffer = moduleExports ? root.Buffer : undefined;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

	/**
	 * Checks if `value` is a buffer.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.3.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
	 * @example
	 *
	 * _.isBuffer(new Buffer(2));
	 * // => true
	 *
	 * _.isBuffer(new Uint8Array(2));
	 * // => false
	 */
	var isBuffer = nativeIsBuffer || stubFalse;

	module.exports = isBuffer;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(65)(module)))

/***/ }),
/* 65 */
/***/ (function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ }),
/* 66 */
/***/ (function(module, exports) {

	/**
	 * This method returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}

	module.exports = stubFalse;


/***/ }),
/* 67 */
/***/ (function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return !!length &&
	    (typeof value == 'number' || reIsUint.test(value)) &&
	    (value > -1 && value % 1 == 0 && value < length);
	}

	module.exports = isIndex;


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

	var baseIsTypedArray = __webpack_require__(69),
	    baseUnary = __webpack_require__(71),
	    nodeUtil = __webpack_require__(72);

	/* Node.js helper references. */
	var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

	module.exports = isTypedArray;


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(25),
	    isLength = __webpack_require__(70),
	    isObjectLike = __webpack_require__(62);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
	typedArrayTags[errorTag] = typedArrayTags[funcTag] =
	typedArrayTags[mapTag] = typedArrayTags[numberTag] =
	typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
	typedArrayTags[setTag] = typedArrayTags[stringTag] =
	typedArrayTags[weakMapTag] = false;

	/**
	 * The base implementation of `_.isTypedArray` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 */
	function baseIsTypedArray(value) {
	  return isObjectLike(value) &&
	    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
	}

	module.exports = baseIsTypedArray;


/***/ }),
/* 70 */
/***/ (function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	module.exports = isLength;


/***/ }),
/* 71 */
/***/ (function(module, exports) {

	/**
	 * The base implementation of `_.unary` without support for storing metadata.
	 *
	 * @private
	 * @param {Function} func The function to cap arguments for.
	 * @returns {Function} Returns the new capped function.
	 */
	function baseUnary(func) {
	  return function(value) {
	    return func(value);
	  };
	}

	module.exports = baseUnary;


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(28);

	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Detect free variable `process` from Node.js. */
	var freeProcess = moduleExports && freeGlobal.process;

	/** Used to access faster Node.js helpers. */
	var nodeUtil = (function() {
	  try {
	    return freeProcess && freeProcess.binding && freeProcess.binding('util');
	  } catch (e) {}
	}());

	module.exports = nodeUtil;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(65)(module)))

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

	var isPrototype = __webpack_require__(74),
	    nativeKeys = __webpack_require__(75);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  if (!isPrototype(object)) {
	    return nativeKeys(object);
	  }
	  var result = [];
	  for (var key in Object(object)) {
	    if (hasOwnProperty.call(object, key) && key != 'constructor') {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = baseKeys;


/***/ }),
/* 74 */
/***/ (function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

	  return value === proto;
	}

	module.exports = isPrototype;


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(76);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = overArg(Object.keys, Object);

	module.exports = nativeKeys;


/***/ }),
/* 76 */
/***/ (function(module, exports) {

	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}

	module.exports = overArg;


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(24),
	    isLength = __webpack_require__(70);

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(value.length) && !isFunction(value);
	}

	module.exports = isArrayLike;


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(56),
	    keysIn = __webpack_require__(79);

	/**
	 * The base implementation of `_.assignIn` without support for multiple sources
	 * or `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @returns {Object} Returns `object`.
	 */
	function baseAssignIn(object, source) {
	  return object && copyObject(source, keysIn(source), object);
	}

	module.exports = baseAssignIn;


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

	var arrayLikeKeys = __webpack_require__(58),
	    baseKeysIn = __webpack_require__(80),
	    isArrayLike = __webpack_require__(77);

	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
	}

	module.exports = keysIn;


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(31),
	    isPrototype = __webpack_require__(74),
	    nativeKeysIn = __webpack_require__(81);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeysIn(object) {
	  if (!isObject(object)) {
	    return nativeKeysIn(object);
	  }
	  var isProto = isPrototype(object),
	      result = [];

	  for (var key in object) {
	    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = baseKeysIn;


/***/ }),
/* 81 */
/***/ (function(module, exports) {

	/**
	 * This function is like
	 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * except that it includes inherited enumerable properties.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function nativeKeysIn(object) {
	  var result = [];
	  if (object != null) {
	    for (var key in Object(object)) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = nativeKeysIn;


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(27);

	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Built-in value references. */
	var Buffer = moduleExports ? root.Buffer : undefined,
	    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

	/**
	 * Creates a clone of  `buffer`.
	 *
	 * @private
	 * @param {Buffer} buffer The buffer to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Buffer} Returns the cloned buffer.
	 */
	function cloneBuffer(buffer, isDeep) {
	  if (isDeep) {
	    return buffer.slice();
	  }
	  var length = buffer.length,
	      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

	  buffer.copy(result);
	  return result;
	}

	module.exports = cloneBuffer;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(65)(module)))

/***/ }),
/* 83 */
/***/ (function(module, exports) {

	/**
	 * Copies the values of `source` to `array`.
	 *
	 * @private
	 * @param {Array} source The array to copy values from.
	 * @param {Array} [array=[]] The array to copy values to.
	 * @returns {Array} Returns `array`.
	 */
	function copyArray(source, array) {
	  var index = -1,
	      length = source.length;

	  array || (array = Array(length));
	  while (++index < length) {
	    array[index] = source[index];
	  }
	  return array;
	}

	module.exports = copyArray;


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(56),
	    getSymbols = __webpack_require__(85);

	/**
	 * Copies own symbols of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy symbols from.
	 * @param {Object} [object={}] The object to copy symbols to.
	 * @returns {Object} Returns `object`.
	 */
	function copySymbols(source, object) {
	  return copyObject(source, getSymbols(source), object);
	}

	module.exports = copySymbols;


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

	var arrayFilter = __webpack_require__(86),
	    stubArray = __webpack_require__(87);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetSymbols = Object.getOwnPropertySymbols;

	/**
	 * Creates an array of the own enumerable symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of symbols.
	 */
	var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
	  if (object == null) {
	    return [];
	  }
	  object = Object(object);
	  return arrayFilter(nativeGetSymbols(object), function(symbol) {
	    return propertyIsEnumerable.call(object, symbol);
	  });
	};

	module.exports = getSymbols;


/***/ }),
/* 86 */
/***/ (function(module, exports) {

	/**
	 * A specialized version of `_.filter` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {Array} Returns the new filtered array.
	 */
	function arrayFilter(array, predicate) {
	  var index = -1,
	      length = array == null ? 0 : array.length,
	      resIndex = 0,
	      result = [];

	  while (++index < length) {
	    var value = array[index];
	    if (predicate(value, index, array)) {
	      result[resIndex++] = value;
	    }
	  }
	  return result;
	}

	module.exports = arrayFilter;


/***/ }),
/* 87 */
/***/ (function(module, exports) {

	/**
	 * This method returns a new empty array.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {Array} Returns the new empty array.
	 * @example
	 *
	 * var arrays = _.times(2, _.stubArray);
	 *
	 * console.log(arrays);
	 * // => [[], []]
	 *
	 * console.log(arrays[0] === arrays[1]);
	 * // => false
	 */
	function stubArray() {
	  return [];
	}

	module.exports = stubArray;


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(56),
	    getSymbolsIn = __webpack_require__(89);

	/**
	 * Copies own and inherited symbols of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy symbols from.
	 * @param {Object} [object={}] The object to copy symbols to.
	 * @returns {Object} Returns `object`.
	 */
	function copySymbolsIn(source, object) {
	  return copyObject(source, getSymbolsIn(source), object);
	}

	module.exports = copySymbolsIn;


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

	var arrayPush = __webpack_require__(90),
	    getPrototype = __webpack_require__(91),
	    getSymbols = __webpack_require__(85),
	    stubArray = __webpack_require__(87);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetSymbols = Object.getOwnPropertySymbols;

	/**
	 * Creates an array of the own and inherited enumerable symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of symbols.
	 */
	var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
	  var result = [];
	  while (object) {
	    arrayPush(result, getSymbols(object));
	    object = getPrototype(object);
	  }
	  return result;
	};

	module.exports = getSymbolsIn;


/***/ }),
/* 90 */
/***/ (function(module, exports) {

	/**
	 * Appends the elements of `values` to `array`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {Array} values The values to append.
	 * @returns {Array} Returns `array`.
	 */
	function arrayPush(array, values) {
	  var index = -1,
	      length = values.length,
	      offset = array.length;

	  while (++index < length) {
	    array[offset + index] = values[index];
	  }
	  return array;
	}

	module.exports = arrayPush;


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(76);

	/** Built-in value references. */
	var getPrototype = overArg(Object.getPrototypeOf, Object);

	module.exports = getPrototype;


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

	var baseGetAllKeys = __webpack_require__(93),
	    getSymbols = __webpack_require__(85),
	    keys = __webpack_require__(57);

	/**
	 * Creates an array of own enumerable property names and symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function getAllKeys(object) {
	  return baseGetAllKeys(object, keys, getSymbols);
	}

	module.exports = getAllKeys;


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

	var arrayPush = __webpack_require__(90),
	    isArray = __webpack_require__(63);

	/**
	 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
	 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
	 * symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @param {Function} symbolsFunc The function to get the symbols of `object`.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function baseGetAllKeys(object, keysFunc, symbolsFunc) {
	  var result = keysFunc(object);
	  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
	}

	module.exports = baseGetAllKeys;


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

	var baseGetAllKeys = __webpack_require__(93),
	    getSymbolsIn = __webpack_require__(89),
	    keysIn = __webpack_require__(79);

	/**
	 * Creates an array of own and inherited enumerable property names and
	 * symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function getAllKeysIn(object) {
	  return baseGetAllKeys(object, keysIn, getSymbolsIn);
	}

	module.exports = getAllKeysIn;


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

	var DataView = __webpack_require__(96),
	    Map = __webpack_require__(21),
	    Promise = __webpack_require__(97),
	    Set = __webpack_require__(98),
	    WeakMap = __webpack_require__(99),
	    baseGetTag = __webpack_require__(25),
	    toSource = __webpack_require__(34);

	/** `Object#toString` result references. */
	var mapTag = '[object Map]',
	    objectTag = '[object Object]',
	    promiseTag = '[object Promise]',
	    setTag = '[object Set]',
	    weakMapTag = '[object WeakMap]';

	var dataViewTag = '[object DataView]';

	/** Used to detect maps, sets, and weakmaps. */
	var dataViewCtorString = toSource(DataView),
	    mapCtorString = toSource(Map),
	    promiseCtorString = toSource(Promise),
	    setCtorString = toSource(Set),
	    weakMapCtorString = toSource(WeakMap);

	/**
	 * Gets the `toStringTag` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	var getTag = baseGetTag;

	// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
	if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
	    (Map && getTag(new Map) != mapTag) ||
	    (Promise && getTag(Promise.resolve()) != promiseTag) ||
	    (Set && getTag(new Set) != setTag) ||
	    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
	  getTag = function(value) {
	    var result = baseGetTag(value),
	        Ctor = result == objectTag ? value.constructor : undefined,
	        ctorString = Ctor ? toSource(Ctor) : '';

	    if (ctorString) {
	      switch (ctorString) {
	        case dataViewCtorString: return dataViewTag;
	        case mapCtorString: return mapTag;
	        case promiseCtorString: return promiseTag;
	        case setCtorString: return setTag;
	        case weakMapCtorString: return weakMapTag;
	      }
	    }
	    return result;
	  };
	}

	module.exports = getTag;


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(22),
	    root = __webpack_require__(27);

	/* Built-in method references that are verified to be native. */
	var DataView = getNative(root, 'DataView');

	module.exports = DataView;


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(22),
	    root = __webpack_require__(27);

	/* Built-in method references that are verified to be native. */
	var Promise = getNative(root, 'Promise');

	module.exports = Promise;


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(22),
	    root = __webpack_require__(27);

	/* Built-in method references that are verified to be native. */
	var Set = getNative(root, 'Set');

	module.exports = Set;


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(22),
	    root = __webpack_require__(27);

	/* Built-in method references that are verified to be native. */
	var WeakMap = getNative(root, 'WeakMap');

	module.exports = WeakMap;


/***/ }),
/* 100 */
/***/ (function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Initializes an array clone.
	 *
	 * @private
	 * @param {Array} array The array to clone.
	 * @returns {Array} Returns the initialized clone.
	 */
	function initCloneArray(array) {
	  var length = array.length,
	      result = array.constructor(length);

	  // Add properties assigned by `RegExp#exec`.
	  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
	    result.index = array.index;
	    result.input = array.input;
	  }
	  return result;
	}

	module.exports = initCloneArray;


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

	var cloneArrayBuffer = __webpack_require__(102),
	    cloneDataView = __webpack_require__(104),
	    cloneMap = __webpack_require__(105),
	    cloneRegExp = __webpack_require__(109),
	    cloneSet = __webpack_require__(110),
	    cloneSymbol = __webpack_require__(113),
	    cloneTypedArray = __webpack_require__(114);

	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/**
	 * Initializes an object clone based on its `toStringTag`.
	 *
	 * **Note:** This function only supports cloning values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @param {string} tag The `toStringTag` of the object to clone.
	 * @param {Function} cloneFunc The function to clone values.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneByTag(object, tag, cloneFunc, isDeep) {
	  var Ctor = object.constructor;
	  switch (tag) {
	    case arrayBufferTag:
	      return cloneArrayBuffer(object);

	    case boolTag:
	    case dateTag:
	      return new Ctor(+object);

	    case dataViewTag:
	      return cloneDataView(object, isDeep);

	    case float32Tag: case float64Tag:
	    case int8Tag: case int16Tag: case int32Tag:
	    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
	      return cloneTypedArray(object, isDeep);

	    case mapTag:
	      return cloneMap(object, isDeep, cloneFunc);

	    case numberTag:
	    case stringTag:
	      return new Ctor(object);

	    case regexpTag:
	      return cloneRegExp(object);

	    case setTag:
	      return cloneSet(object, isDeep, cloneFunc);

	    case symbolTag:
	      return cloneSymbol(object);
	  }
	}

	module.exports = initCloneByTag;


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

	var Uint8Array = __webpack_require__(103);

	/**
	 * Creates a clone of `arrayBuffer`.
	 *
	 * @private
	 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
	 * @returns {ArrayBuffer} Returns the cloned array buffer.
	 */
	function cloneArrayBuffer(arrayBuffer) {
	  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
	  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
	  return result;
	}

	module.exports = cloneArrayBuffer;


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

	var root = __webpack_require__(27);

	/** Built-in value references. */
	var Uint8Array = root.Uint8Array;

	module.exports = Uint8Array;


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

	var cloneArrayBuffer = __webpack_require__(102);

	/**
	 * Creates a clone of `dataView`.
	 *
	 * @private
	 * @param {Object} dataView The data view to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned data view.
	 */
	function cloneDataView(dataView, isDeep) {
	  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
	  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
	}

	module.exports = cloneDataView;


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

	var addMapEntry = __webpack_require__(106),
	    arrayReduce = __webpack_require__(107),
	    mapToArray = __webpack_require__(108);

	/** Used to compose bitmasks for cloning. */
	var CLONE_DEEP_FLAG = 1;

	/**
	 * Creates a clone of `map`.
	 *
	 * @private
	 * @param {Object} map The map to clone.
	 * @param {Function} cloneFunc The function to clone values.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned map.
	 */
	function cloneMap(map, isDeep, cloneFunc) {
	  var array = isDeep ? cloneFunc(mapToArray(map), CLONE_DEEP_FLAG) : mapToArray(map);
	  return arrayReduce(array, addMapEntry, new map.constructor);
	}

	module.exports = cloneMap;


/***/ }),
/* 106 */
/***/ (function(module, exports) {

	/**
	 * Adds the key-value `pair` to `map`.
	 *
	 * @private
	 * @param {Object} map The map to modify.
	 * @param {Array} pair The key-value pair to add.
	 * @returns {Object} Returns `map`.
	 */
	function addMapEntry(map, pair) {
	  // Don't return `map.set` because it's not chainable in IE 11.
	  map.set(pair[0], pair[1]);
	  return map;
	}

	module.exports = addMapEntry;


/***/ }),
/* 107 */
/***/ (function(module, exports) {

	/**
	 * A specialized version of `_.reduce` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {*} [accumulator] The initial value.
	 * @param {boolean} [initAccum] Specify using the first element of `array` as
	 *  the initial value.
	 * @returns {*} Returns the accumulated value.
	 */
	function arrayReduce(array, iteratee, accumulator, initAccum) {
	  var index = -1,
	      length = array == null ? 0 : array.length;

	  if (initAccum && length) {
	    accumulator = array[++index];
	  }
	  while (++index < length) {
	    accumulator = iteratee(accumulator, array[index], index, array);
	  }
	  return accumulator;
	}

	module.exports = arrayReduce;


/***/ }),
/* 108 */
/***/ (function(module, exports) {

	/**
	 * Converts `map` to its key-value pairs.
	 *
	 * @private
	 * @param {Object} map The map to convert.
	 * @returns {Array} Returns the key-value pairs.
	 */
	function mapToArray(map) {
	  var index = -1,
	      result = Array(map.size);

	  map.forEach(function(value, key) {
	    result[++index] = [key, value];
	  });
	  return result;
	}

	module.exports = mapToArray;


/***/ }),
/* 109 */
/***/ (function(module, exports) {

	/** Used to match `RegExp` flags from their coerced string values. */
	var reFlags = /\w*$/;

	/**
	 * Creates a clone of `regexp`.
	 *
	 * @private
	 * @param {Object} regexp The regexp to clone.
	 * @returns {Object} Returns the cloned regexp.
	 */
	function cloneRegExp(regexp) {
	  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
	  result.lastIndex = regexp.lastIndex;
	  return result;
	}

	module.exports = cloneRegExp;


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

	var addSetEntry = __webpack_require__(111),
	    arrayReduce = __webpack_require__(107),
	    setToArray = __webpack_require__(112);

	/** Used to compose bitmasks for cloning. */
	var CLONE_DEEP_FLAG = 1;

	/**
	 * Creates a clone of `set`.
	 *
	 * @private
	 * @param {Object} set The set to clone.
	 * @param {Function} cloneFunc The function to clone values.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned set.
	 */
	function cloneSet(set, isDeep, cloneFunc) {
	  var array = isDeep ? cloneFunc(setToArray(set), CLONE_DEEP_FLAG) : setToArray(set);
	  return arrayReduce(array, addSetEntry, new set.constructor);
	}

	module.exports = cloneSet;


/***/ }),
/* 111 */
/***/ (function(module, exports) {

	/**
	 * Adds `value` to `set`.
	 *
	 * @private
	 * @param {Object} set The set to modify.
	 * @param {*} value The value to add.
	 * @returns {Object} Returns `set`.
	 */
	function addSetEntry(set, value) {
	  // Don't return `set.add` because it's not chainable in IE 11.
	  set.add(value);
	  return set;
	}

	module.exports = addSetEntry;


/***/ }),
/* 112 */
/***/ (function(module, exports) {

	/**
	 * Converts `set` to an array of its values.
	 *
	 * @private
	 * @param {Object} set The set to convert.
	 * @returns {Array} Returns the values.
	 */
	function setToArray(set) {
	  var index = -1,
	      result = Array(set.size);

	  set.forEach(function(value) {
	    result[++index] = value;
	  });
	  return result;
	}

	module.exports = setToArray;


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(26);

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

	/**
	 * Creates a clone of the `symbol` object.
	 *
	 * @private
	 * @param {Object} symbol The symbol object to clone.
	 * @returns {Object} Returns the cloned symbol object.
	 */
	function cloneSymbol(symbol) {
	  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
	}

	module.exports = cloneSymbol;


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

	var cloneArrayBuffer = __webpack_require__(102);

	/**
	 * Creates a clone of `typedArray`.
	 *
	 * @private
	 * @param {Object} typedArray The typed array to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned typed array.
	 */
	function cloneTypedArray(typedArray, isDeep) {
	  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
	  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
	}

	module.exports = cloneTypedArray;


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

	var baseCreate = __webpack_require__(116),
	    getPrototype = __webpack_require__(91),
	    isPrototype = __webpack_require__(74);

	/**
	 * Initializes an object clone.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneObject(object) {
	  return (typeof object.constructor == 'function' && !isPrototype(object))
	    ? baseCreate(getPrototype(object))
	    : {};
	}

	module.exports = initCloneObject;


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(31);

	/** Built-in value references. */
	var objectCreate = Object.create;

	/**
	 * The base implementation of `_.create` without support for assigning
	 * properties to the created object.
	 *
	 * @private
	 * @param {Object} proto The object to inherit from.
	 * @returns {Object} Returns the new object.
	 */
	var baseCreate = (function() {
	  function object() {}
	  return function(proto) {
	    if (!isObject(proto)) {
	      return {};
	    }
	    if (objectCreate) {
	      return objectCreate(proto);
	    }
	    object.prototype = proto;
	    var result = new object;
	    object.prototype = undefined;
	    return result;
	  };
	}());

	module.exports = baseCreate;


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

	var castPath = __webpack_require__(118),
	    last = __webpack_require__(126),
	    parent = __webpack_require__(127),
	    toKey = __webpack_require__(129);

	/**
	 * The base implementation of `_.unset`.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {Array|string} path The property path to unset.
	 * @returns {boolean} Returns `true` if the property is deleted, else `false`.
	 */
	function baseUnset(object, path) {
	  path = castPath(path, object);
	  object = parent(object, path);
	  return object == null || delete object[toKey(last(path))];
	}

	module.exports = baseUnset;


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(63),
	    isKey = __webpack_require__(119),
	    stringToPath = __webpack_require__(121),
	    toString = __webpack_require__(124);

	/**
	 * Casts `value` to a path array if it's not one.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {Array} Returns the cast property path array.
	 */
	function castPath(value, object) {
	  if (isArray(value)) {
	    return value;
	  }
	  return isKey(value, object) ? [value] : stringToPath(toString(value));
	}

	module.exports = castPath;


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(63),
	    isSymbol = __webpack_require__(120);

	/** Used to match property names within property paths. */
	var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
	    reIsPlainProp = /^\w*$/;

	/**
	 * Checks if `value` is a property name and not a property path.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
	 */
	function isKey(value, object) {
	  if (isArray(value)) {
	    return false;
	  }
	  var type = typeof value;
	  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
	      value == null || isSymbol(value)) {
	    return true;
	  }
	  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
	    (object != null && value in Object(object));
	}

	module.exports = isKey;


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(25),
	    isObjectLike = __webpack_require__(62);

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && baseGetTag(value) == symbolTag);
	}

	module.exports = isSymbol;


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

	var memoizeCapped = __webpack_require__(122);

	/** Used to match property names within property paths. */
	var reLeadingDot = /^\./,
	    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;

	/**
	 * Converts `string` to a property path array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the property path array.
	 */
	var stringToPath = memoizeCapped(function(string) {
	  var result = [];
	  if (reLeadingDot.test(string)) {
	    result.push('');
	  }
	  string.replace(rePropName, function(match, number, quote, string) {
	    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
	  });
	  return result;
	});

	module.exports = stringToPath;


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

	var memoize = __webpack_require__(123);

	/** Used as the maximum memoize cache size. */
	var MAX_MEMOIZE_SIZE = 500;

	/**
	 * A specialized version of `_.memoize` which clears the memoized function's
	 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
	 *
	 * @private
	 * @param {Function} func The function to have its output memoized.
	 * @returns {Function} Returns the new memoized function.
	 */
	function memoizeCapped(func) {
	  var result = memoize(func, function(key) {
	    if (cache.size === MAX_MEMOIZE_SIZE) {
	      cache.clear();
	    }
	    return key;
	  });

	  var cache = result.cache;
	  return result;
	}

	module.exports = memoizeCapped;


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(36);

	/** Error message constants. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/**
	 * Creates a function that memoizes the result of `func`. If `resolver` is
	 * provided, it determines the cache key for storing the result based on the
	 * arguments provided to the memoized function. By default, the first argument
	 * provided to the memoized function is used as the map cache key. The `func`
	 * is invoked with the `this` binding of the memoized function.
	 *
	 * **Note:** The cache is exposed as the `cache` property on the memoized
	 * function. Its creation may be customized by replacing the `_.memoize.Cache`
	 * constructor with one whose instances implement the
	 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
	 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to have its output memoized.
	 * @param {Function} [resolver] The function to resolve the cache key.
	 * @returns {Function} Returns the new memoized function.
	 * @example
	 *
	 * var object = { 'a': 1, 'b': 2 };
	 * var other = { 'c': 3, 'd': 4 };
	 *
	 * var values = _.memoize(_.values);
	 * values(object);
	 * // => [1, 2]
	 *
	 * values(other);
	 * // => [3, 4]
	 *
	 * object.a = 2;
	 * values(object);
	 * // => [1, 2]
	 *
	 * // Modify the result cache.
	 * values.cache.set(object, ['a', 'b']);
	 * values(object);
	 * // => ['a', 'b']
	 *
	 * // Replace `_.memoize.Cache`.
	 * _.memoize.Cache = WeakMap;
	 */
	function memoize(func, resolver) {
	  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  var memoized = function() {
	    var args = arguments,
	        key = resolver ? resolver.apply(this, args) : args[0],
	        cache = memoized.cache;

	    if (cache.has(key)) {
	      return cache.get(key);
	    }
	    var result = func.apply(this, args);
	    memoized.cache = cache.set(key, result) || cache;
	    return result;
	  };
	  memoized.cache = new (memoize.Cache || MapCache);
	  return memoized;
	}

	// Expose `MapCache`.
	memoize.Cache = MapCache;

	module.exports = memoize;


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

	var baseToString = __webpack_require__(125);

	/**
	 * Converts `value` to a string. An empty string is returned for `null`
	 * and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */
	function toString(value) {
	  return value == null ? '' : baseToString(value);
	}

	module.exports = toString;


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(26),
	    arrayMap = __webpack_require__(5),
	    isArray = __webpack_require__(63),
	    isSymbol = __webpack_require__(120);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolToString = symbolProto ? symbolProto.toString : undefined;

	/**
	 * The base implementation of `_.toString` which doesn't convert nullish
	 * values to empty strings.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }
	  if (isArray(value)) {
	    // Recursively convert values (susceptible to call stack limits).
	    return arrayMap(value, baseToString) + '';
	  }
	  if (isSymbol(value)) {
	    return symbolToString ? symbolToString.call(value) : '';
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}

	module.exports = baseToString;


/***/ }),
/* 126 */
/***/ (function(module, exports) {

	/**
	 * Gets the last element of `array`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Array
	 * @param {Array} array The array to query.
	 * @returns {*} Returns the last element of `array`.
	 * @example
	 *
	 * _.last([1, 2, 3]);
	 * // => 3
	 */
	function last(array) {
	  var length = array == null ? 0 : array.length;
	  return length ? array[length - 1] : undefined;
	}

	module.exports = last;


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(128),
	    baseSlice = __webpack_require__(130);

	/**
	 * Gets the parent value at `path` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} path The path to get the parent value of.
	 * @returns {*} Returns the parent value.
	 */
	function parent(object, path) {
	  return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
	}

	module.exports = parent;


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

	var castPath = __webpack_require__(118),
	    toKey = __webpack_require__(129);

	/**
	 * The base implementation of `_.get` without support for default values.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @returns {*} Returns the resolved value.
	 */
	function baseGet(object, path) {
	  path = castPath(path, object);

	  var index = 0,
	      length = path.length;

	  while (object != null && index < length) {
	    object = object[toKey(path[index++])];
	  }
	  return (index && index == length) ? object : undefined;
	}

	module.exports = baseGet;


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

	var isSymbol = __webpack_require__(120);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/**
	 * Converts `value` to a string key if it's not a string or symbol.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {string|symbol} Returns the key.
	 */
	function toKey(value) {
	  if (typeof value == 'string' || isSymbol(value)) {
	    return value;
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}

	module.exports = toKey;


/***/ }),
/* 130 */
/***/ (function(module, exports) {

	/**
	 * The base implementation of `_.slice` without an iteratee call guard.
	 *
	 * @private
	 * @param {Array} array The array to slice.
	 * @param {number} [start=0] The start position.
	 * @param {number} [end=array.length] The end position.
	 * @returns {Array} Returns the slice of `array`.
	 */
	function baseSlice(array, start, end) {
	  var index = -1,
	      length = array.length;

	  if (start < 0) {
	    start = -start > length ? 0 : (length + start);
	  }
	  end = end > length ? length : end;
	  if (end < 0) {
	    end += length;
	  }
	  length = start > end ? 0 : ((end - start) >>> 0);
	  start >>>= 0;

	  var result = Array(length);
	  while (++index < length) {
	    result[index] = array[index + start];
	  }
	  return result;
	}

	module.exports = baseSlice;


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

	var isPlainObject = __webpack_require__(132);

	/**
	 * Used by `_.omit` to customize its `_.cloneDeep` use to only clone plain
	 * objects.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @param {string} key The key of the property to inspect.
	 * @returns {*} Returns the uncloned value or `undefined` to defer cloning to `_.cloneDeep`.
	 */
	function customOmitClone(value) {
	  return isPlainObject(value) ? undefined : value;
	}

	module.exports = customOmitClone;


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(25),
	    getPrototype = __webpack_require__(91),
	    isObjectLike = __webpack_require__(62);

	/** `Object#toString` result references. */
	var objectTag = '[object Object]';

	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	    objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to infer the `Object` constructor. */
	var objectCtorString = funcToString.call(Object);

	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.8.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * _.isPlainObject(new Foo);
	 * // => false
	 *
	 * _.isPlainObject([1, 2, 3]);
	 * // => false
	 *
	 * _.isPlainObject({ 'x': 0, 'y': 0 });
	 * // => true
	 *
	 * _.isPlainObject(Object.create(null));
	 * // => true
	 */
	function isPlainObject(value) {
	  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
	    return false;
	  }
	  var proto = getPrototype(value);
	  if (proto === null) {
	    return true;
	  }
	  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
	  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
	    funcToString.call(Ctor) == objectCtorString;
	}

	module.exports = isPlainObject;


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

	var flatten = __webpack_require__(134),
	    overRest = __webpack_require__(137),
	    setToString = __webpack_require__(139);

	/**
	 * A specialized version of `baseRest` which flattens the rest array.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @returns {Function} Returns the new function.
	 */
	function flatRest(func) {
	  return setToString(overRest(func, undefined, flatten), func + '');
	}

	module.exports = flatRest;


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

	var baseFlatten = __webpack_require__(135);

	/**
	 * Flattens `array` a single level deep.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Array
	 * @param {Array} array The array to flatten.
	 * @returns {Array} Returns the new flattened array.
	 * @example
	 *
	 * _.flatten([1, [2, [3, [4]], 5]]);
	 * // => [1, 2, [3, [4]], 5]
	 */
	function flatten(array) {
	  var length = array == null ? 0 : array.length;
	  return length ? baseFlatten(array, 1) : [];
	}

	module.exports = flatten;


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

	var arrayPush = __webpack_require__(90),
	    isFlattenable = __webpack_require__(136);

	/**
	 * The base implementation of `_.flatten` with support for restricting flattening.
	 *
	 * @private
	 * @param {Array} array The array to flatten.
	 * @param {number} depth The maximum recursion depth.
	 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
	 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
	 * @param {Array} [result=[]] The initial result value.
	 * @returns {Array} Returns the new flattened array.
	 */
	function baseFlatten(array, depth, predicate, isStrict, result) {
	  var index = -1,
	      length = array.length;

	  predicate || (predicate = isFlattenable);
	  result || (result = []);

	  while (++index < length) {
	    var value = array[index];
	    if (depth > 0 && predicate(value)) {
	      if (depth > 1) {
	        // Recursively flatten arrays (susceptible to call stack limits).
	        baseFlatten(value, depth - 1, predicate, isStrict, result);
	      } else {
	        arrayPush(result, value);
	      }
	    } else if (!isStrict) {
	      result[result.length] = value;
	    }
	  }
	  return result;
	}

	module.exports = baseFlatten;


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(26),
	    isArguments = __webpack_require__(60),
	    isArray = __webpack_require__(63);

	/** Built-in value references. */
	var spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined;

	/**
	 * Checks if `value` is a flattenable `arguments` object or array.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
	 */
	function isFlattenable(value) {
	  return isArray(value) || isArguments(value) ||
	    !!(spreadableSymbol && value && value[spreadableSymbol]);
	}

	module.exports = isFlattenable;


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(138);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * A specialized version of `baseRest` which transforms the rest array.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @param {Function} transform The rest array transform.
	 * @returns {Function} Returns the new function.
	 */
	function overRest(func, start, transform) {
	  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        array = Array(length);

	    while (++index < length) {
	      array[index] = args[start + index];
	    }
	    index = -1;
	    var otherArgs = Array(start + 1);
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = transform(array);
	    return apply(func, this, otherArgs);
	  };
	}

	module.exports = overRest;


/***/ }),
/* 138 */
/***/ (function(module, exports) {

	/**
	 * A faster alternative to `Function#apply`, this function invokes `func`
	 * with the `this` binding of `thisArg` and the arguments of `args`.
	 *
	 * @private
	 * @param {Function} func The function to invoke.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} args The arguments to invoke `func` with.
	 * @returns {*} Returns the result of `func`.
	 */
	function apply(func, thisArg, args) {
	  switch (args.length) {
	    case 0: return func.call(thisArg);
	    case 1: return func.call(thisArg, args[0]);
	    case 2: return func.call(thisArg, args[0], args[1]);
	    case 3: return func.call(thisArg, args[0], args[1], args[2]);
	  }
	  return func.apply(thisArg, args);
	}

	module.exports = apply;


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

	var baseSetToString = __webpack_require__(140),
	    shortOut = __webpack_require__(143);

	/**
	 * Sets the `toString` method of `func` to return `string`.
	 *
	 * @private
	 * @param {Function} func The function to modify.
	 * @param {Function} string The `toString` result.
	 * @returns {Function} Returns `func`.
	 */
	var setToString = shortOut(baseSetToString);

	module.exports = setToString;


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

	var constant = __webpack_require__(141),
	    defineProperty = __webpack_require__(54),
	    identity = __webpack_require__(142);

	/**
	 * The base implementation of `setToString` without support for hot loop shorting.
	 *
	 * @private
	 * @param {Function} func The function to modify.
	 * @param {Function} string The `toString` result.
	 * @returns {Function} Returns `func`.
	 */
	var baseSetToString = !defineProperty ? identity : function(func, string) {
	  return defineProperty(func, 'toString', {
	    'configurable': true,
	    'enumerable': false,
	    'value': constant(string),
	    'writable': true
	  });
	};

	module.exports = baseSetToString;


/***/ }),
/* 141 */
/***/ (function(module, exports) {

	/**
	 * Creates a function that returns `value`.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Util
	 * @param {*} value The value to return from the new function.
	 * @returns {Function} Returns the new constant function.
	 * @example
	 *
	 * var objects = _.times(2, _.constant({ 'a': 1 }));
	 *
	 * console.log(objects);
	 * // => [{ 'a': 1 }, { 'a': 1 }]
	 *
	 * console.log(objects[0] === objects[1]);
	 * // => true
	 */
	function constant(value) {
	  return function() {
	    return value;
	  };
	}

	module.exports = constant;


/***/ }),
/* 142 */
/***/ (function(module, exports) {

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;


/***/ }),
/* 143 */
/***/ (function(module, exports) {

	/** Used to detect hot functions by number of calls within a span of milliseconds. */
	var HOT_COUNT = 800,
	    HOT_SPAN = 16;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeNow = Date.now;

	/**
	 * Creates a function that'll short out and invoke `identity` instead
	 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
	 * milliseconds.
	 *
	 * @private
	 * @param {Function} func The function to restrict.
	 * @returns {Function} Returns the new shortable function.
	 */
	function shortOut(func) {
	  var count = 0,
	      lastCalled = 0;

	  return function() {
	    var stamp = nativeNow(),
	        remaining = HOT_SPAN - (stamp - lastCalled);

	    lastCalled = stamp;
	    if (remaining > 0) {
	      if (++count >= HOT_COUNT) {
	        return arguments[0];
	      }
	    } else {
	      count = 0;
	    }
	    return func.apply(undefined, arguments);
	  };
	}

	module.exports = shortOut;


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

	var baseRandom = __webpack_require__(145),
	    isIterateeCall = __webpack_require__(146),
	    toFinite = __webpack_require__(147);

	/** Built-in method references without a dependency on `root`. */
	var freeParseFloat = parseFloat;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMin = Math.min,
	    nativeRandom = Math.random;

	/**
	 * Produces a random number between the inclusive `lower` and `upper` bounds.
	 * If only one argument is provided a number between `0` and the given number
	 * is returned. If `floating` is `true`, or either `lower` or `upper` are
	 * floats, a floating-point number is returned instead of an integer.
	 *
	 * **Note:** JavaScript follows the IEEE-754 standard for resolving
	 * floating-point values which can produce unexpected results.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.7.0
	 * @category Number
	 * @param {number} [lower=0] The lower bound.
	 * @param {number} [upper=1] The upper bound.
	 * @param {boolean} [floating] Specify returning a floating-point number.
	 * @returns {number} Returns the random number.
	 * @example
	 *
	 * _.random(0, 5);
	 * // => an integer between 0 and 5
	 *
	 * _.random(5);
	 * // => also an integer between 0 and 5
	 *
	 * _.random(5, true);
	 * // => a floating-point number between 0 and 5
	 *
	 * _.random(1.2, 5.2);
	 * // => a floating-point number between 1.2 and 5.2
	 */
	function random(lower, upper, floating) {
	  if (floating && typeof floating != 'boolean' && isIterateeCall(lower, upper, floating)) {
	    upper = floating = undefined;
	  }
	  if (floating === undefined) {
	    if (typeof upper == 'boolean') {
	      floating = upper;
	      upper = undefined;
	    }
	    else if (typeof lower == 'boolean') {
	      floating = lower;
	      lower = undefined;
	    }
	  }
	  if (lower === undefined && upper === undefined) {
	    lower = 0;
	    upper = 1;
	  }
	  else {
	    lower = toFinite(lower);
	    if (upper === undefined) {
	      upper = lower;
	      lower = 0;
	    } else {
	      upper = toFinite(upper);
	    }
	  }
	  if (lower > upper) {
	    var temp = lower;
	    lower = upper;
	    upper = temp;
	  }
	  if (floating || lower % 1 || upper % 1) {
	    var rand = nativeRandom();
	    return nativeMin(lower + (rand * (upper - lower + freeParseFloat('1e-' + ((rand + '').length - 1)))), upper);
	  }
	  return baseRandom(lower, upper);
	}

	module.exports = random;


/***/ }),
/* 145 */
/***/ (function(module, exports) {

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeFloor = Math.floor,
	    nativeRandom = Math.random;

	/**
	 * The base implementation of `_.random` without support for returning
	 * floating-point numbers.
	 *
	 * @private
	 * @param {number} lower The lower bound.
	 * @param {number} upper The upper bound.
	 * @returns {number} Returns the random number.
	 */
	function baseRandom(lower, upper) {
	  return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
	}

	module.exports = baseRandom;


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(12),
	    isArrayLike = __webpack_require__(77),
	    isIndex = __webpack_require__(67),
	    isObject = __webpack_require__(31);

	/**
	 * Checks if the given arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
	 *  else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number'
	        ? (isArrayLike(object) && isIndex(index, object.length))
	        : (type == 'string' && index in object)
	      ) {
	    return eq(object[index], value);
	  }
	  return false;
	}

	module.exports = isIterateeCall;


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

	var toNumber = __webpack_require__(148);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0,
	    MAX_INTEGER = 1.7976931348623157e+308;

	/**
	 * Converts `value` to a finite number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.12.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted number.
	 * @example
	 *
	 * _.toFinite(3.2);
	 * // => 3.2
	 *
	 * _.toFinite(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toFinite(Infinity);
	 * // => 1.7976931348623157e+308
	 *
	 * _.toFinite('3.2');
	 * // => 3.2
	 */
	function toFinite(value) {
	  if (!value) {
	    return value === 0 ? value : 0;
	  }
	  value = toNumber(value);
	  if (value === INFINITY || value === -INFINITY) {
	    var sign = (value < 0 ? -1 : 1);
	    return sign * MAX_INTEGER;
	  }
	  return value === value ? value : 0;
	}

	module.exports = toFinite;


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(31),
	    isSymbol = __webpack_require__(120);

	/** Used as references for various `Number` constants. */
	var NAN = 0 / 0;

	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;

	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;

	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;

	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;

	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3.2);
	 * // => 3.2
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3.2');
	 * // => 3.2
	 */
	function toNumber(value) {
	  if (typeof value == 'number') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return NAN;
	  }
	  if (isObject(value)) {
	    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
	    value = isObject(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}

	module.exports = toNumber;


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = decodeSessionSave;

	var _arrayCompress = __webpack_require__(150);

	var _lzString = __webpack_require__(151);

	var _lzString2 = _interopRequireDefault(_lzString);

	var _gameid = __webpack_require__(152);

	var _battleid = __webpack_require__(154);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

	//import stringcompr from 'js-string-compression';
	//let hm = new stringcompr.Hauffman();

	//import cc from 'classical-cipher';

	function decodeString(str) {
	  //return str; 
	  return _lzString2.default.decompressFromBase64(str);
	  //return hm.decompress(str);
	  //return cc.ciphers.hillCipher.decrypt(str,[ 2, 7, 15, 4 ]);
	}

	/*
	Should return {gameId, turnNumber, moveIndexes};
	*/
	function decodeSessionSave(garble) {
	  var garbledGameId = garble.substr(0, _gameid.lengthOfEncodedGameId);
	  var battleId = garble.substr(_gameid.lengthOfEncodedGameId, _battleid.lengthOfEncodedBattleId);

	  var _inflate = (0, _arrayCompress.inflate)(decodeString(garble.substr(_gameid.lengthOfEncodedGameId + _battleid.lengthOfEncodedBattleId))),
	      _inflate2 = _toArray(_inflate),
	      turnNumber = _inflate2[0],
	      moveIndexes = _inflate2.slice(1);

	  return {
	    gameId: (0, _gameid.decodeGameId)(garbledGameId, garble.substr(_gameid.lengthOfEncodedGameId, 1)),
	    battleId: battleId,
	    turnNumber: Math.abs(turnNumber),
	    moveIndexes: moveIndexes,
	    ended: turnNumber < 0
	  };
	}

/***/ }),
/* 150 */
/***/ (function(module, exports) {

	'use strict';function _defineProperty(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e};module.exports.compress = function compressArrayToString(r,e,a){if(e=numberIsInteger(e)?e:95,(a=numberIsInteger(a)?a:32)+e>256)throw new Error("Your provided asciiOffset("+a+") + maxRadix("+e+") = ("+(a+e)+") are greater than 256, the total number of ASCII characters available");for(var t=new Array(e),n=0;n<e;++n)t[n]=String.fromCharCode(n+a);var o=r.length;if(!o)return"";var v={val:r[0]},f=[v];f["__"+r[0]]=v;for(var i=_defineProperty({},r[0],[0]),l=[1],s=0,g=r[0],h=1;h<o;h++){var c=r[h];if(c===g)++l[s];else if(l.push(1),++s,g=c,i[c])i[c].push(s);else{i[c]=[s];var p={val:c};f.push(p),f["__"+c]=p}}var u=a+"|",d=f.length;if(d-1>e)throw new Error("Can't handle arrays with more than provided maxRadix("+e+") types of values");f.sort(function(r,e){if(!r.percentage){for(var a=i[r.val],t=a.length,n=0,v=0;v<t;++v)n+=l[a[v]];r.percentage=n/o}if(!e.percentage){for(var f=i[e.val],s=f.length,g=0,h=0;h<s;++h)g+=l[f[h]];e.percentage=g/o}return r.percentage-e.percentage});for(var m=0,_=e,w=d-1,x=0;x<w;++x){var I=f[x],y=I.percentage*_,R=Math.floor(y);y<1&&(++R,_-=1-y),I.radix=R,I.offset=m,I.valsRange=t.slice(m,m+R),m+=R,u+=I.val+"="+R+","}var b=m,C=e-m;f[w].offset=b,f[w].radix=C,f[w].valsRange=t.slice(b,b+C),u+=f[w].val+"="+C+"|";for(var A=0,S=l.length,E=0;E<S;E++){var B=r[A],F=l[E];u+=convertFromBase10(F,f["__"+B].valsRange),A+=F}return u};module.exports.inflate = function inflateCompressedArray(r){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Array;if(!r.length)return[];var a=r.indexOf("|"),s=r.indexOf("|",a+1);if(!~a||!~s)throw new Error("Missing pipe delimiters... this wasn't compressed with the 'compress' method from array-compress");for(var i=+r.slice(0,a),t=0,n=[],l=r.slice(a+1,s).split(","),o=l.length,f=0;f<o;++f){var v=l[f].split("="),h=+v[0],g=+v[1],d={val:h,radix:g,offset:t};t+=g,n["__"+h]=d,n.push(d)}for(var m=new Array(t),p=0;p<t;++p)m[p]=String.fromCharCode(p+i);for(var c={},w=n.length,_=0;_<w;++_){for(var u={},x=n[_],y=x.radix,A=x.offset,C=m.slice(A,A+y),L=x.val,O=0;O<y;++O){var R=C[O];c[R]=L,u[R]=O}C.__memo=u,x.valsRange=C}for(var V=[],B=0,E=r.slice(s+1),M=E.length+1,S=c[E[0]],T=E[0],b=1;b<M;b++){var j=E[b],k=c[j];if(S===k)T+=j;else{var q=n["__"+S],z=convertToBase10(T,q.valsRange);B+=z,T=j,V.push({arrLength:z,arrVal:S}),S=k}}for(var D=V.length,F=new e(B),G=0,H=0;H<D;++H){var I=V[H],J=I.arrLength,K=I.arrVal;F.fill(K,G,G+J),G+=J}return F};function convertFromBase10(r,t){var e=t.length;if(1===e)return stringRepeat(t[0],r);for(var n="";r>0;){var o=r%e;n=""+t[o]+n,r=(r-o)/e}return n||"0"}function convertToBase10(r,t){var e=t.length;if(1===e)return r.length;for(var n=0,o=t.__memo,a=r.length-1,i=a;i>=0;--i)n+=o[r[i]]*Math.pow(e,a-i);return n}function stringRepeat(r,t){"use strict";if(null==r)throw new TypeError("can't convert "+r+" to object");var e=""+r;if((t=+t)!=t&&(t=0),t<0)throw new RangeError("repeat count must be non-negative");if(t==1/0)throw new RangeError("repeat count must be less than infinity");if(t=Math.floor(t),0==e.length||0==t)return"";if(e.length*t>=1<<28)throw new RangeError("repeat count must not overflow maximum string size");for(var n="";1==(1&t)&&(n+=e),0!=(t>>>=1);)e+=e;return n}function numberIsInteger(r){return"number"==typeof r&&isFinite(r)&&Math.floor(r)===r}


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;// Copyright (c) 2013 Pieroxy <pieroxy@pieroxy.net>
	// This work is free. You can redistribute it and/or modify it
	// under the terms of the WTFPL, Version 2
	// For more information see LICENSE.txt or http://www.wtfpl.net/
	//
	// For more information, the home page:
	// http://pieroxy.net/blog/pages/lz-string/testing.html
	//
	// LZ-based compression algorithm, version 1.4.4
	var LZString = (function() {

	// private property
	var f = String.fromCharCode;
	var keyStrBase64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	var keyStrUriSafe = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$";
	var baseReverseDic = {};

	function getBaseValue(alphabet, character) {
	  if (!baseReverseDic[alphabet]) {
	    baseReverseDic[alphabet] = {};
	    for (var i=0 ; i<alphabet.length ; i++) {
	      baseReverseDic[alphabet][alphabet.charAt(i)] = i;
	    }
	  }
	  return baseReverseDic[alphabet][character];
	}

	var LZString = {
	  compressToBase64 : function (input) {
	    if (input == null) return "";
	    var res = LZString._compress(input, 6, function(a){return keyStrBase64.charAt(a);});
	    switch (res.length % 4) { // To produce valid Base64
	    default: // When could this happen ?
	    case 0 : return res;
	    case 1 : return res+"===";
	    case 2 : return res+"==";
	    case 3 : return res+"=";
	    }
	  },

	  decompressFromBase64 : function (input) {
	    if (input == null) return "";
	    if (input == "") return null;
	    return LZString._decompress(input.length, 32, function(index) { return getBaseValue(keyStrBase64, input.charAt(index)); });
	  },

	  compressToUTF16 : function (input) {
	    if (input == null) return "";
	    return LZString._compress(input, 15, function(a){return f(a+32);}) + " ";
	  },

	  decompressFromUTF16: function (compressed) {
	    if (compressed == null) return "";
	    if (compressed == "") return null;
	    return LZString._decompress(compressed.length, 16384, function(index) { return compressed.charCodeAt(index) - 32; });
	  },

	  //compress into uint8array (UCS-2 big endian format)
	  compressToUint8Array: function (uncompressed) {
	    var compressed = LZString.compress(uncompressed);
	    var buf=new Uint8Array(compressed.length*2); // 2 bytes per character

	    for (var i=0, TotalLen=compressed.length; i<TotalLen; i++) {
	      var current_value = compressed.charCodeAt(i);
	      buf[i*2] = current_value >>> 8;
	      buf[i*2+1] = current_value % 256;
	    }
	    return buf;
	  },

	  //decompress from uint8array (UCS-2 big endian format)
	  decompressFromUint8Array:function (compressed) {
	    if (compressed===null || compressed===undefined){
	        return LZString.decompress(compressed);
	    } else {
	        var buf=new Array(compressed.length/2); // 2 bytes per character
	        for (var i=0, TotalLen=buf.length; i<TotalLen; i++) {
	          buf[i]=compressed[i*2]*256+compressed[i*2+1];
	        }

	        var result = [];
	        buf.forEach(function (c) {
	          result.push(f(c));
	        });
	        return LZString.decompress(result.join(''));

	    }

	  },


	  //compress into a string that is already URI encoded
	  compressToEncodedURIComponent: function (input) {
	    if (input == null) return "";
	    return LZString._compress(input, 6, function(a){return keyStrUriSafe.charAt(a);});
	  },

	  //decompress from an output of compressToEncodedURIComponent
	  decompressFromEncodedURIComponent:function (input) {
	    if (input == null) return "";
	    if (input == "") return null;
	    input = input.replace(/ /g, "+");
	    return LZString._decompress(input.length, 32, function(index) { return getBaseValue(keyStrUriSafe, input.charAt(index)); });
	  },

	  compress: function (uncompressed) {
	    return LZString._compress(uncompressed, 16, function(a){return f(a);});
	  },
	  _compress: function (uncompressed, bitsPerChar, getCharFromInt) {
	    if (uncompressed == null) return "";
	    var i, value,
	        context_dictionary= {},
	        context_dictionaryToCreate= {},
	        context_c="",
	        context_wc="",
	        context_w="",
	        context_enlargeIn= 2, // Compensate for the first entry which should not count
	        context_dictSize= 3,
	        context_numBits= 2,
	        context_data=[],
	        context_data_val=0,
	        context_data_position=0,
	        ii;

	    for (ii = 0; ii < uncompressed.length; ii += 1) {
	      context_c = uncompressed.charAt(ii);
	      if (!Object.prototype.hasOwnProperty.call(context_dictionary,context_c)) {
	        context_dictionary[context_c] = context_dictSize++;
	        context_dictionaryToCreate[context_c] = true;
	      }

	      context_wc = context_w + context_c;
	      if (Object.prototype.hasOwnProperty.call(context_dictionary,context_wc)) {
	        context_w = context_wc;
	      } else {
	        if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate,context_w)) {
	          if (context_w.charCodeAt(0)<256) {
	            for (i=0 ; i<context_numBits ; i++) {
	              context_data_val = (context_data_val << 1);
	              if (context_data_position == bitsPerChar-1) {
	                context_data_position = 0;
	                context_data.push(getCharFromInt(context_data_val));
	                context_data_val = 0;
	              } else {
	                context_data_position++;
	              }
	            }
	            value = context_w.charCodeAt(0);
	            for (i=0 ; i<8 ; i++) {
	              context_data_val = (context_data_val << 1) | (value&1);
	              if (context_data_position == bitsPerChar-1) {
	                context_data_position = 0;
	                context_data.push(getCharFromInt(context_data_val));
	                context_data_val = 0;
	              } else {
	                context_data_position++;
	              }
	              value = value >> 1;
	            }
	          } else {
	            value = 1;
	            for (i=0 ; i<context_numBits ; i++) {
	              context_data_val = (context_data_val << 1) | value;
	              if (context_data_position ==bitsPerChar-1) {
	                context_data_position = 0;
	                context_data.push(getCharFromInt(context_data_val));
	                context_data_val = 0;
	              } else {
	                context_data_position++;
	              }
	              value = 0;
	            }
	            value = context_w.charCodeAt(0);
	            for (i=0 ; i<16 ; i++) {
	              context_data_val = (context_data_val << 1) | (value&1);
	              if (context_data_position == bitsPerChar-1) {
	                context_data_position = 0;
	                context_data.push(getCharFromInt(context_data_val));
	                context_data_val = 0;
	              } else {
	                context_data_position++;
	              }
	              value = value >> 1;
	            }
	          }
	          context_enlargeIn--;
	          if (context_enlargeIn == 0) {
	            context_enlargeIn = Math.pow(2, context_numBits);
	            context_numBits++;
	          }
	          delete context_dictionaryToCreate[context_w];
	        } else {
	          value = context_dictionary[context_w];
	          for (i=0 ; i<context_numBits ; i++) {
	            context_data_val = (context_data_val << 1) | (value&1);
	            if (context_data_position == bitsPerChar-1) {
	              context_data_position = 0;
	              context_data.push(getCharFromInt(context_data_val));
	              context_data_val = 0;
	            } else {
	              context_data_position++;
	            }
	            value = value >> 1;
	          }


	        }
	        context_enlargeIn--;
	        if (context_enlargeIn == 0) {
	          context_enlargeIn = Math.pow(2, context_numBits);
	          context_numBits++;
	        }
	        // Add wc to the dictionary.
	        context_dictionary[context_wc] = context_dictSize++;
	        context_w = String(context_c);
	      }
	    }

	    // Output the code for w.
	    if (context_w !== "") {
	      if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate,context_w)) {
	        if (context_w.charCodeAt(0)<256) {
	          for (i=0 ; i<context_numBits ; i++) {
	            context_data_val = (context_data_val << 1);
	            if (context_data_position == bitsPerChar-1) {
	              context_data_position = 0;
	              context_data.push(getCharFromInt(context_data_val));
	              context_data_val = 0;
	            } else {
	              context_data_position++;
	            }
	          }
	          value = context_w.charCodeAt(0);
	          for (i=0 ; i<8 ; i++) {
	            context_data_val = (context_data_val << 1) | (value&1);
	            if (context_data_position == bitsPerChar-1) {
	              context_data_position = 0;
	              context_data.push(getCharFromInt(context_data_val));
	              context_data_val = 0;
	            } else {
	              context_data_position++;
	            }
	            value = value >> 1;
	          }
	        } else {
	          value = 1;
	          for (i=0 ; i<context_numBits ; i++) {
	            context_data_val = (context_data_val << 1) | value;
	            if (context_data_position == bitsPerChar-1) {
	              context_data_position = 0;
	              context_data.push(getCharFromInt(context_data_val));
	              context_data_val = 0;
	            } else {
	              context_data_position++;
	            }
	            value = 0;
	          }
	          value = context_w.charCodeAt(0);
	          for (i=0 ; i<16 ; i++) {
	            context_data_val = (context_data_val << 1) | (value&1);
	            if (context_data_position == bitsPerChar-1) {
	              context_data_position = 0;
	              context_data.push(getCharFromInt(context_data_val));
	              context_data_val = 0;
	            } else {
	              context_data_position++;
	            }
	            value = value >> 1;
	          }
	        }
	        context_enlargeIn--;
	        if (context_enlargeIn == 0) {
	          context_enlargeIn = Math.pow(2, context_numBits);
	          context_numBits++;
	        }
	        delete context_dictionaryToCreate[context_w];
	      } else {
	        value = context_dictionary[context_w];
	        for (i=0 ; i<context_numBits ; i++) {
	          context_data_val = (context_data_val << 1) | (value&1);
	          if (context_data_position == bitsPerChar-1) {
	            context_data_position = 0;
	            context_data.push(getCharFromInt(context_data_val));
	            context_data_val = 0;
	          } else {
	            context_data_position++;
	          }
	          value = value >> 1;
	        }


	      }
	      context_enlargeIn--;
	      if (context_enlargeIn == 0) {
	        context_enlargeIn = Math.pow(2, context_numBits);
	        context_numBits++;
	      }
	    }

	    // Mark the end of the stream
	    value = 2;
	    for (i=0 ; i<context_numBits ; i++) {
	      context_data_val = (context_data_val << 1) | (value&1);
	      if (context_data_position == bitsPerChar-1) {
	        context_data_position = 0;
	        context_data.push(getCharFromInt(context_data_val));
	        context_data_val = 0;
	      } else {
	        context_data_position++;
	      }
	      value = value >> 1;
	    }

	    // Flush the last char
	    while (true) {
	      context_data_val = (context_data_val << 1);
	      if (context_data_position == bitsPerChar-1) {
	        context_data.push(getCharFromInt(context_data_val));
	        break;
	      }
	      else context_data_position++;
	    }
	    return context_data.join('');
	  },

	  decompress: function (compressed) {
	    if (compressed == null) return "";
	    if (compressed == "") return null;
	    return LZString._decompress(compressed.length, 32768, function(index) { return compressed.charCodeAt(index); });
	  },

	  _decompress: function (length, resetValue, getNextValue) {
	    var dictionary = [],
	        next,
	        enlargeIn = 4,
	        dictSize = 4,
	        numBits = 3,
	        entry = "",
	        result = [],
	        i,
	        w,
	        bits, resb, maxpower, power,
	        c,
	        data = {val:getNextValue(0), position:resetValue, index:1};

	    for (i = 0; i < 3; i += 1) {
	      dictionary[i] = i;
	    }

	    bits = 0;
	    maxpower = Math.pow(2,2);
	    power=1;
	    while (power!=maxpower) {
	      resb = data.val & data.position;
	      data.position >>= 1;
	      if (data.position == 0) {
	        data.position = resetValue;
	        data.val = getNextValue(data.index++);
	      }
	      bits |= (resb>0 ? 1 : 0) * power;
	      power <<= 1;
	    }

	    switch (next = bits) {
	      case 0:
	          bits = 0;
	          maxpower = Math.pow(2,8);
	          power=1;
	          while (power!=maxpower) {
	            resb = data.val & data.position;
	            data.position >>= 1;
	            if (data.position == 0) {
	              data.position = resetValue;
	              data.val = getNextValue(data.index++);
	            }
	            bits |= (resb>0 ? 1 : 0) * power;
	            power <<= 1;
	          }
	        c = f(bits);
	        break;
	      case 1:
	          bits = 0;
	          maxpower = Math.pow(2,16);
	          power=1;
	          while (power!=maxpower) {
	            resb = data.val & data.position;
	            data.position >>= 1;
	            if (data.position == 0) {
	              data.position = resetValue;
	              data.val = getNextValue(data.index++);
	            }
	            bits |= (resb>0 ? 1 : 0) * power;
	            power <<= 1;
	          }
	        c = f(bits);
	        break;
	      case 2:
	        return "";
	    }
	    dictionary[3] = c;
	    w = c;
	    result.push(c);
	    while (true) {
	      if (data.index > length) {
	        return "";
	      }

	      bits = 0;
	      maxpower = Math.pow(2,numBits);
	      power=1;
	      while (power!=maxpower) {
	        resb = data.val & data.position;
	        data.position >>= 1;
	        if (data.position == 0) {
	          data.position = resetValue;
	          data.val = getNextValue(data.index++);
	        }
	        bits |= (resb>0 ? 1 : 0) * power;
	        power <<= 1;
	      }

	      switch (c = bits) {
	        case 0:
	          bits = 0;
	          maxpower = Math.pow(2,8);
	          power=1;
	          while (power!=maxpower) {
	            resb = data.val & data.position;
	            data.position >>= 1;
	            if (data.position == 0) {
	              data.position = resetValue;
	              data.val = getNextValue(data.index++);
	            }
	            bits |= (resb>0 ? 1 : 0) * power;
	            power <<= 1;
	          }

	          dictionary[dictSize++] = f(bits);
	          c = dictSize-1;
	          enlargeIn--;
	          break;
	        case 1:
	          bits = 0;
	          maxpower = Math.pow(2,16);
	          power=1;
	          while (power!=maxpower) {
	            resb = data.val & data.position;
	            data.position >>= 1;
	            if (data.position == 0) {
	              data.position = resetValue;
	              data.val = getNextValue(data.index++);
	            }
	            bits |= (resb>0 ? 1 : 0) * power;
	            power <<= 1;
	          }
	          dictionary[dictSize++] = f(bits);
	          c = dictSize-1;
	          enlargeIn--;
	          break;
	        case 2:
	          return result.join('');
	      }

	      if (enlargeIn == 0) {
	        enlargeIn = Math.pow(2, numBits);
	        numBits++;
	      }

	      if (dictionary[c]) {
	        entry = dictionary[c];
	      } else {
	        if (c === dictSize) {
	          entry = w + w.charAt(0);
	        } else {
	          return null;
	        }
	      }
	      result.push(entry);

	      // Add w+entry[0] to the dictionary.
	      dictionary[dictSize++] = w + entry.charAt(0);
	      enlargeIn--;

	      w = entry;

	      if (enlargeIn == 0) {
	        enlargeIn = Math.pow(2, numBits);
	        numBits++;
	      }

	    }
	  }
	};
	  return LZString;
	})();

	if (true) {
	  !(__WEBPACK_AMD_DEFINE_RESULT__ = function () { return LZString; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if( typeof module !== 'undefined' && module != null ) {
	  module.exports = LZString
	}


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.lengthOfEncodedGameId = undefined;
	exports.decodeGameId = decodeGameId;
	exports.encodeGameId = encodeGameId;

	var _base64chars = __webpack_require__(153);

	var _base64chars2 = _interopRequireDefault(_base64chars);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// TODO - we should encode games to 2 letters, otherwise we get max cap at 60sth!

	// All games must be part of this array, and order must never be changed!
	// When you add a new game, add it to the end of the list!
	var games = ["_test", "amazon", "aries", "atrium", "castle", "coffee", "daggers", "gogol", "jostle", "kickrun", "krieg", "murusgallicus", "murusgallicusadvanced", "orthokon", "semaphor", "serauqs", "snijpunt", "transet", "threemusketeers", "uglyduck"];

	function char2index(char) {
	  return char ? Math.max(_base64chars2.default.indexOf(char), 0) : 0;
	}

	function game2num(gameid) {
	  var num = games.indexOf(gameid);
	  if (num === -1) {
	    throw "Game \"" + gameid + "\" is not mentioned in id array!";
	  }
	  return num;
	}

	function decodeGameId(codeChar, offsetChar) {
	  var pos = _base64chars2.default.indexOf(codeChar);
	  if (pos === -1) {
	    throw "Faulty gameId codechar " + codeChar;
	  }
	  pos -= char2index(offsetChar);
	  var game = games[pos < 0 ? pos + _base64chars2.default.length : pos];
	  if (!game) {
	    throw "Failed to get game!";
	  }
	  return game;
	}

	function encodeGameId(gameId, offsetChar) {
	  var code = _base64chars2.default[(game2num(gameId) + char2index(offsetChar)) % _base64chars2.default.length];
	  if (code.length !== lengthOfEncodedGameId) {
	    throw "Tried to encode " + gameId + " with offset {offsetChar}, but resulting code \"" + code + "\" was wrong length!";
	  }
	  return code;
	}

	var lengthOfEncodedGameId = exports.lengthOfEncodedGameId = 1;

/***/ }),
/* 153 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.lengthOfEncodedBattleId = undefined;
	exports.generateBattleId = generateBattleId;

	var _base64chars = __webpack_require__(153);

	var _base64chars2 = _interopRequireDefault(_base64chars);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var lengthOfEncodedBattleId = exports.lengthOfEncodedBattleId = 4;

	function generateBattleId() {
	  var id = '';
	  for (var i = 0; i < lengthOfEncodedBattleId; i++) {
	    id += _base64chars2.default[Math.floor(Math.random() * _base64chars2.default.length)];
	  }
	  return id;
	};

/***/ }),
/* 155 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = optionsInUI;
	/*
	Return a sorted array with all commands available in the UI at this time
	*/
	function optionsInUI(UI) {
	  return UI.commands.concat(UI.potentialMarks.map(function (m) {
	    return m.pos;
	  })).concat(UI.system.filter(function (c) {
	    return c.substr(0, 4) !== 'undo';
	  })).sort();
	}

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = newSession;

	var _hydrateturn = __webpack_require__(157);

	var _hydrateturn2 = _interopRequireDefault(_hydrateturn);

	var _gamesproxy = __webpack_require__(1);

	var _battleid = __webpack_require__(154);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var nextSessionId = 1; /*
	                       Used in API.startGameSession and API.inflateFromSave
	                       Creates a new session and returns it.
	                       Pure.
	                       */

	function newSession(gameId, plr1, plr2, battleId) {
	    var game = _gamesproxy.games[gameId];
	    var turn = game.newGame();
	    turn = (0, _hydrateturn2.default)(game, turn);
	    var session = {
	        gameId: gameId,
	        game: game,
	        turn: turn,
	        step: turn.steps.root,
	        savedIndexes: [],
	        markTimeStamps: {},
	        undo: [],
	        players: [plr1, plr2],
	        id: 's' + nextSessionId++,
	        battleId: battleId || (0, _battleid.generateBattleId)()
	    };
	    return session;
	}

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = hydrateTurn;

	var _hydratestep = __webpack_require__(158);

	var _hydratestep2 = _interopRequireDefault(_hydratestep);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function hydrateTurn(game, turn) {
	    // TODO - forcefully flag if we're AI analyzing! or just always do it :P
	    turn.ends = {
	        win: [],
	        draw: [],
	        lose: []
	    };
	    turn.next = {};
	    (0, _hydratestep2.default)(game, turn, turn.steps.root);
	    return turn;
	} /*
	  Used in .inflateFromSave, .startGameSession and .makeSessionAction (when ending turn)
	  Mutates the given turn with all steps that can lead to turn end, and links for those steps
	  Returns the mutated turn
	  */

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = hydrateStep;

	var _trytoreachturnend = __webpack_require__(159);

	var _trytoreachturnend2 = _interopRequireDefault(_trytoreachturnend);

	var _isgameendcmnd = __webpack_require__(161);

	var _isgameendcmnd2 = _interopRequireDefault(_isgameendcmnd);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*
	Used in .hydrateTurn, and will recursively call itself
	Mutates the given turn with links for the given step
	Will create linked steps if they didn't exist and hydrate those,
	but only keep them around if they lead to turn end.
	Returns whether or not the given step can lead to turn end
	*/

	function hydrateStep(game, turn, step) {
	    var steps = turn.steps;
	    var stepid = step.stepid;
	    var links = turn.links;
	    var steplinks = links[stepid];
	    var checkActions = Object.keys(steplinks);
	    var canend = false;
	    while (checkActions.length) {
	        var action = checkActions.pop();
	        var func = steplinks[action];
	        if ((0, _isgameendcmnd2.default)(action)) {
	            turn.ends[action].push(stepid);
	            canend = true;
	        } else if (action === 'endturn') {
	            var newturn = (0, _trytoreachturnend2.default)(game, game[func](turn, step));
	            if (newturn.canend) {
	                turn.next[stepid] = newturn;
	            } else {
	                steplinks.win = newturn.blockedby || 'starvation'; // TODO - gamespec logic?
	                turn.ends.win.push(stepid);
	                delete steplinks.endturn;
	            }
	            canend = true;
	        } else {
	            var nextstepid = stepid + '-' + action;
	            var nextstep = steps[nextstepid] || (steps[nextstepid] = game[func](turn, step, action));
	            if (hydrateStep(game, turn, nextstep)) {
	                canend = true;
	            } else {
	                delete steplinks[action]; // TODO - only this is actually needed
	                delete steps[nextstepid];
	                delete links[nextstepid];
	            }
	        }
	    }
	    return canend;
	}

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = tryToReachTurnEnd;

	var _isturnendcmnd = __webpack_require__(160);

	var _isturnendcmnd2 = _interopRequireDefault(_isturnendcmnd);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function tryToReachTurnEnd(game, turn) {
	    var steps = turn.steps,
	        links = turn.links;

	    var checkSteps = [steps.root];
	    var canalwaysend = game.canalwaysend || {};
	    while (!turn.canend && checkSteps.length) {
	        var step = checkSteps.pop();
	        var stepid = step.stepid;
	        var steplinks = links[stepid];
	        var checkActions = Object.keys(steplinks);
	        while (!turn.canend && checkActions.length) {
	            var action = checkActions.pop();
	            var func = steplinks[action];
	            if ((0, _isturnendcmnd2.default)(action) || canalwaysend[func]) {
	                turn.canend = true;
	            } else {
	                var nextstepid = stepid + '-' + action;
	                checkSteps.push(steps[nextstepid] || (steps[nextstepid] = game[func](turn, step, action)));
	            }
	        }
	    }
	    return turn;
	} /*
	  Used in .hydrateStep for links leading to a new turn, to see if that turn is a dead end
	  Mutates the given turn with .canend boolean, and returns same boolean
	  */

	;

/***/ }),
/* 160 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isTurnEndCommand;
	function isTurnEndCommand(cmnd) {
	  return !!{
	    endturn: 1,
	    win: 1,
	    lose: 1,
	    draw: 1
	  }[cmnd];
	}

/***/ }),
/* 161 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isGameEndCommand;
	function isGameEndCommand(cmnd) {
	  return !!{
	    win: 1,
	    lose: 1,
	    draw: 1
	  }[cmnd];
	}

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = getSessionUI;

	var _mapValues = __webpack_require__(163);

	var _mapValues2 = _interopRequireDefault(_mapValues);

	var _values = __webpack_require__(191);

	var _values2 = _interopRequireDefault(_values);

	var _isgameendcmnd = __webpack_require__(161);

	var _isgameendcmnd2 = _interopRequireDefault(_isgameendcmnd);

	var _gamesproxy = __webpack_require__(1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*
	Used in API.startGameSession and API.makeSessionAction.
	Returns an object used to draw board in an app.
	Pure.
	*/

	function getSessionUI(session, step) {
	    var game = session.game,
	        turn = session.turn,
	        undo = session.undo,
	        markTimeStamps = session.markTimeStamps;

	    var UI = {
	        activeMarks: (0, _values2.default)(step.MARKS).map(function (pos) {
	            return { pos: pos, coords: (0, _gamesproxy.pos2coords)(pos) };
	        }),
	        units: (0, _mapValues2.default)(step.UNITDATA, function (u) {
	            return Object.assign({}, u, {
	                group: game.graphics.icons[u.group],
	                coords: (0, _gamesproxy.pos2coords)(u.pos),
	                spawnCoords: u.from ? (0, _gamesproxy.pos2coords)(u.from) : undefined
	            });
	        }),
	        players: session.players,
	        playing: turn.player,
	        board: game.board,
	        sessionId: session.id,
	        turnStart: session.step.stepid === 'root',
	        gameId: game.id,
	        turn: turn.turn,
	        save: session.saveString,
	        potentialMarks: [],
	        commands: [],
	        system: []
	    };
	    if (!session.endedBy) {
	        var links = Object.keys(turn.links[step.stepid]).reduce(function (mem, action) {
	            if ((0, _isgameendcmnd2.default)(action) || action == 'endturn' || action === 'next') {
	                mem.system.push(action);
	            } else if (game.commands[action]) {
	                mem.commands.push(action);
	            } else {
	                mem.potentialMarks.push({
	                    coords: (0, _gamesproxy.pos2coords)(action),
	                    pos: action
	                });
	            }
	            return mem;
	        }, { potentialMarks: [], commands: [], system: undo.length ? ['undo ' + undo[undo.length - 1].actionName] : [] });
	        Object.assign(UI, links, {
	            instruction: game[step.name + turn.player + 'instruction'](step)
	        });
	    } else {
	        UI.endedBy = session.endedBy;
	        UI.winner = session.winner;
	    }
	    return UI;
	}

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

	var baseAssignValue = __webpack_require__(53),
	    baseForOwn = __webpack_require__(164),
	    baseIteratee = __webpack_require__(167);

	/**
	 * Creates an object with the same keys as `object` and values generated
	 * by running each own enumerable string keyed property of `object` thru
	 * `iteratee`. The iteratee is invoked with three arguments:
	 * (value, key, object).
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Object
	 * @param {Object} object The object to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @returns {Object} Returns the new mapped object.
	 * @see _.mapKeys
	 * @example
	 *
	 * var users = {
	 *   'fred':    { 'user': 'fred',    'age': 40 },
	 *   'pebbles': { 'user': 'pebbles', 'age': 1 }
	 * };
	 *
	 * _.mapValues(users, function(o) { return o.age; });
	 * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.mapValues(users, 'age');
	 * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
	 */
	function mapValues(object, iteratee) {
	  var result = {};
	  iteratee = baseIteratee(iteratee, 3);

	  baseForOwn(object, function(value, key, object) {
	    baseAssignValue(result, key, iteratee(value, key, object));
	  });
	  return result;
	}

	module.exports = mapValues;


/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(165),
	    keys = __webpack_require__(57);

	/**
	 * The base implementation of `_.forOwn` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForOwn(object, iteratee) {
	  return object && baseFor(object, iteratee, keys);
	}

	module.exports = baseForOwn;


/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

	var createBaseFor = __webpack_require__(166);

	/**
	 * The base implementation of `baseForOwn` which iterates over `object`
	 * properties returned by `keysFunc` and invokes `iteratee` for each property.
	 * Iteratee functions may exit iteration early by explicitly returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = createBaseFor();

	module.exports = baseFor;


/***/ }),
/* 166 */
/***/ (function(module, exports) {

	/**
	 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function(object, iteratee, keysFunc) {
	    var index = -1,
	        iterable = Object(object),
	        props = keysFunc(object),
	        length = props.length;

	    while (length--) {
	      var key = props[fromRight ? length : ++index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}

	module.exports = createBaseFor;


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

	var baseMatches = __webpack_require__(168),
	    baseMatchesProperty = __webpack_require__(183),
	    identity = __webpack_require__(142),
	    isArray = __webpack_require__(63),
	    property = __webpack_require__(188);

	/**
	 * The base implementation of `_.iteratee`.
	 *
	 * @private
	 * @param {*} [value=_.identity] The value to convert to an iteratee.
	 * @returns {Function} Returns the iteratee.
	 */
	function baseIteratee(value) {
	  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
	  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
	  if (typeof value == 'function') {
	    return value;
	  }
	  if (value == null) {
	    return identity;
	  }
	  if (typeof value == 'object') {
	    return isArray(value)
	      ? baseMatchesProperty(value[0], value[1])
	      : baseMatches(value);
	  }
	  return property(value);
	}

	module.exports = baseIteratee;


/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

	var baseIsMatch = __webpack_require__(169),
	    getMatchData = __webpack_require__(180),
	    matchesStrictComparable = __webpack_require__(182);

	/**
	 * The base implementation of `_.matches` which doesn't clone `source`.
	 *
	 * @private
	 * @param {Object} source The object of property values to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function baseMatches(source) {
	  var matchData = getMatchData(source);
	  if (matchData.length == 1 && matchData[0][2]) {
	    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
	  }
	  return function(object) {
	    return object === source || baseIsMatch(object, source, matchData);
	  };
	}

	module.exports = baseMatches;


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(7),
	    baseIsEqual = __webpack_require__(170);

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1,
	    COMPARE_UNORDERED_FLAG = 2;

	/**
	 * The base implementation of `_.isMatch` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to inspect.
	 * @param {Object} source The object of property values to match.
	 * @param {Array} matchData The property names, values, and compare flags to match.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	 */
	function baseIsMatch(object, source, matchData, customizer) {
	  var index = matchData.length,
	      length = index,
	      noCustomizer = !customizer;

	  if (object == null) {
	    return !length;
	  }
	  object = Object(object);
	  while (index--) {
	    var data = matchData[index];
	    if ((noCustomizer && data[2])
	          ? data[1] !== object[data[0]]
	          : !(data[0] in object)
	        ) {
	      return false;
	    }
	  }
	  while (++index < length) {
	    data = matchData[index];
	    var key = data[0],
	        objValue = object[key],
	        srcValue = data[1];

	    if (noCustomizer && data[2]) {
	      if (objValue === undefined && !(key in object)) {
	        return false;
	      }
	    } else {
	      var stack = new Stack;
	      if (customizer) {
	        var result = customizer(objValue, srcValue, key, object, source, stack);
	      }
	      if (!(result === undefined
	            ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack)
	            : result
	          )) {
	        return false;
	      }
	    }
	  }
	  return true;
	}

	module.exports = baseIsMatch;


/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

	var baseIsEqualDeep = __webpack_require__(171),
	    isObjectLike = __webpack_require__(62);

	/**
	 * The base implementation of `_.isEqual` which supports partial comparisons
	 * and tracks traversed objects.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {boolean} bitmask The bitmask flags.
	 *  1 - Unordered comparison
	 *  2 - Partial comparison
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 */
	function baseIsEqual(value, other, bitmask, customizer, stack) {
	  if (value === other) {
	    return true;
	  }
	  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
	    return value !== value && other !== other;
	  }
	  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
	}

	module.exports = baseIsEqual;


/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(7),
	    equalArrays = __webpack_require__(172),
	    equalByTag = __webpack_require__(178),
	    equalObjects = __webpack_require__(179),
	    getTag = __webpack_require__(95),
	    isArray = __webpack_require__(63),
	    isBuffer = __webpack_require__(64),
	    isTypedArray = __webpack_require__(68);

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1;

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    objectTag = '[object Object]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A specialized version of `baseIsEqual` for arrays and objects which performs
	 * deep comparisons and tracks traversed objects enabling objects with circular
	 * references to be compared.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
	  var objIsArr = isArray(object),
	      othIsArr = isArray(other),
	      objTag = objIsArr ? arrayTag : getTag(object),
	      othTag = othIsArr ? arrayTag : getTag(other);

	  objTag = objTag == argsTag ? objectTag : objTag;
	  othTag = othTag == argsTag ? objectTag : othTag;

	  var objIsObj = objTag == objectTag,
	      othIsObj = othTag == objectTag,
	      isSameTag = objTag == othTag;

	  if (isSameTag && isBuffer(object)) {
	    if (!isBuffer(other)) {
	      return false;
	    }
	    objIsArr = true;
	    objIsObj = false;
	  }
	  if (isSameTag && !objIsObj) {
	    stack || (stack = new Stack);
	    return (objIsArr || isTypedArray(object))
	      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
	      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
	  }
	  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
	    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

	    if (objIsWrapped || othIsWrapped) {
	      var objUnwrapped = objIsWrapped ? object.value() : object,
	          othUnwrapped = othIsWrapped ? other.value() : other;

	      stack || (stack = new Stack);
	      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
	    }
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  stack || (stack = new Stack);
	  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
	}

	module.exports = baseIsEqualDeep;


/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

	var SetCache = __webpack_require__(173),
	    arraySome = __webpack_require__(176),
	    cacheHas = __webpack_require__(177);

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1,
	    COMPARE_UNORDERED_FLAG = 2;

	/**
	 * A specialized version of `baseIsEqualDeep` for arrays with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Array} array The array to compare.
	 * @param {Array} other The other array to compare.
	 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Object} stack Tracks traversed `array` and `other` objects.
	 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	 */
	function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
	  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
	      arrLength = array.length,
	      othLength = other.length;

	  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
	    return false;
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(array);
	  if (stacked && stack.get(other)) {
	    return stacked == other;
	  }
	  var index = -1,
	      result = true,
	      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

	  stack.set(array, other);
	  stack.set(other, array);

	  // Ignore non-index properties.
	  while (++index < arrLength) {
	    var arrValue = array[index],
	        othValue = other[index];

	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, arrValue, index, other, array, stack)
	        : customizer(arrValue, othValue, index, array, other, stack);
	    }
	    if (compared !== undefined) {
	      if (compared) {
	        continue;
	      }
	      result = false;
	      break;
	    }
	    // Recursively compare arrays (susceptible to call stack limits).
	    if (seen) {
	      if (!arraySome(other, function(othValue, othIndex) {
	            if (!cacheHas(seen, othIndex) &&
	                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
	              return seen.push(othIndex);
	            }
	          })) {
	        result = false;
	        break;
	      }
	    } else if (!(
	          arrValue === othValue ||
	            equalFunc(arrValue, othValue, bitmask, customizer, stack)
	        )) {
	      result = false;
	      break;
	    }
	  }
	  stack['delete'](array);
	  stack['delete'](other);
	  return result;
	}

	module.exports = equalArrays;


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(36),
	    setCacheAdd = __webpack_require__(174),
	    setCacheHas = __webpack_require__(175);

	/**
	 *
	 * Creates an array cache object to store unique values.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [values] The values to cache.
	 */
	function SetCache(values) {
	  var index = -1,
	      length = values == null ? 0 : values.length;

	  this.__data__ = new MapCache;
	  while (++index < length) {
	    this.add(values[index]);
	  }
	}

	// Add methods to `SetCache`.
	SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
	SetCache.prototype.has = setCacheHas;

	module.exports = SetCache;


/***/ }),
/* 174 */
/***/ (function(module, exports) {

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/**
	 * Adds `value` to the array cache.
	 *
	 * @private
	 * @name add
	 * @memberOf SetCache
	 * @alias push
	 * @param {*} value The value to cache.
	 * @returns {Object} Returns the cache instance.
	 */
	function setCacheAdd(value) {
	  this.__data__.set(value, HASH_UNDEFINED);
	  return this;
	}

	module.exports = setCacheAdd;


/***/ }),
/* 175 */
/***/ (function(module, exports) {

	/**
	 * Checks if `value` is in the array cache.
	 *
	 * @private
	 * @name has
	 * @memberOf SetCache
	 * @param {*} value The value to search for.
	 * @returns {number} Returns `true` if `value` is found, else `false`.
	 */
	function setCacheHas(value) {
	  return this.__data__.has(value);
	}

	module.exports = setCacheHas;


/***/ }),
/* 176 */
/***/ (function(module, exports) {

	/**
	 * A specialized version of `_.some` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check,
	 *  else `false`.
	 */
	function arraySome(array, predicate) {
	  var index = -1,
	      length = array == null ? 0 : array.length;

	  while (++index < length) {
	    if (predicate(array[index], index, array)) {
	      return true;
	    }
	  }
	  return false;
	}

	module.exports = arraySome;


/***/ }),
/* 177 */
/***/ (function(module, exports) {

	/**
	 * Checks if a `cache` value for `key` exists.
	 *
	 * @private
	 * @param {Object} cache The cache to query.
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function cacheHas(cache, key) {
	  return cache.has(key);
	}

	module.exports = cacheHas;


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(26),
	    Uint8Array = __webpack_require__(103),
	    eq = __webpack_require__(12),
	    equalArrays = __webpack_require__(172),
	    mapToArray = __webpack_require__(108),
	    setToArray = __webpack_require__(112);

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1,
	    COMPARE_UNORDERED_FLAG = 2;

	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]';

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

	/**
	 * A specialized version of `baseIsEqualDeep` for comparing objects of
	 * the same `toStringTag`.
	 *
	 * **Note:** This function only supports comparing values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {string} tag The `toStringTag` of the objects to compare.
	 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
	  switch (tag) {
	    case dataViewTag:
	      if ((object.byteLength != other.byteLength) ||
	          (object.byteOffset != other.byteOffset)) {
	        return false;
	      }
	      object = object.buffer;
	      other = other.buffer;

	    case arrayBufferTag:
	      if ((object.byteLength != other.byteLength) ||
	          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
	        return false;
	      }
	      return true;

	    case boolTag:
	    case dateTag:
	    case numberTag:
	      // Coerce booleans to `1` or `0` and dates to milliseconds.
	      // Invalid dates are coerced to `NaN`.
	      return eq(+object, +other);

	    case errorTag:
	      return object.name == other.name && object.message == other.message;

	    case regexpTag:
	    case stringTag:
	      // Coerce regexes to strings and treat strings, primitives and objects,
	      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
	      // for more details.
	      return object == (other + '');

	    case mapTag:
	      var convert = mapToArray;

	    case setTag:
	      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
	      convert || (convert = setToArray);

	      if (object.size != other.size && !isPartial) {
	        return false;
	      }
	      // Assume cyclic values are equal.
	      var stacked = stack.get(object);
	      if (stacked) {
	        return stacked == other;
	      }
	      bitmask |= COMPARE_UNORDERED_FLAG;

	      // Recursively compare objects (susceptible to call stack limits).
	      stack.set(object, other);
	      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
	      stack['delete'](object);
	      return result;

	    case symbolTag:
	      if (symbolValueOf) {
	        return symbolValueOf.call(object) == symbolValueOf.call(other);
	      }
	  }
	  return false;
	}

	module.exports = equalByTag;


/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

	var getAllKeys = __webpack_require__(92);

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A specialized version of `baseIsEqualDeep` for objects with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
	  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
	      objProps = getAllKeys(object),
	      objLength = objProps.length,
	      othProps = getAllKeys(other),
	      othLength = othProps.length;

	  if (objLength != othLength && !isPartial) {
	    return false;
	  }
	  var index = objLength;
	  while (index--) {
	    var key = objProps[index];
	    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
	      return false;
	    }
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(object);
	  if (stacked && stack.get(other)) {
	    return stacked == other;
	  }
	  var result = true;
	  stack.set(object, other);
	  stack.set(other, object);

	  var skipCtor = isPartial;
	  while (++index < objLength) {
	    key = objProps[index];
	    var objValue = object[key],
	        othValue = other[key];

	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, objValue, key, other, object, stack)
	        : customizer(objValue, othValue, key, object, other, stack);
	    }
	    // Recursively compare objects (susceptible to call stack limits).
	    if (!(compared === undefined
	          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
	          : compared
	        )) {
	      result = false;
	      break;
	    }
	    skipCtor || (skipCtor = key == 'constructor');
	  }
	  if (result && !skipCtor) {
	    var objCtor = object.constructor,
	        othCtor = other.constructor;

	    // Non `Object` object instances with different constructors are not equal.
	    if (objCtor != othCtor &&
	        ('constructor' in object && 'constructor' in other) &&
	        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
	          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	      result = false;
	    }
	  }
	  stack['delete'](object);
	  stack['delete'](other);
	  return result;
	}

	module.exports = equalObjects;


/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

	var isStrictComparable = __webpack_require__(181),
	    keys = __webpack_require__(57);

	/**
	 * Gets the property names, values, and compare flags of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the match data of `object`.
	 */
	function getMatchData(object) {
	  var result = keys(object),
	      length = result.length;

	  while (length--) {
	    var key = result[length],
	        value = object[key];

	    result[length] = [key, value, isStrictComparable(value)];
	  }
	  return result;
	}

	module.exports = getMatchData;


/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(31);

	/**
	 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` if suitable for strict
	 *  equality comparisons, else `false`.
	 */
	function isStrictComparable(value) {
	  return value === value && !isObject(value);
	}

	module.exports = isStrictComparable;


/***/ }),
/* 182 */
/***/ (function(module, exports) {

	/**
	 * A specialized version of `matchesProperty` for source values suitable
	 * for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @param {*} srcValue The value to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function matchesStrictComparable(key, srcValue) {
	  return function(object) {
	    if (object == null) {
	      return false;
	    }
	    return object[key] === srcValue &&
	      (srcValue !== undefined || (key in Object(object)));
	  };
	}

	module.exports = matchesStrictComparable;


/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

	var baseIsEqual = __webpack_require__(170),
	    get = __webpack_require__(184),
	    hasIn = __webpack_require__(185),
	    isKey = __webpack_require__(119),
	    isStrictComparable = __webpack_require__(181),
	    matchesStrictComparable = __webpack_require__(182),
	    toKey = __webpack_require__(129);

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1,
	    COMPARE_UNORDERED_FLAG = 2;

	/**
	 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
	 *
	 * @private
	 * @param {string} path The path of the property to get.
	 * @param {*} srcValue The value to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function baseMatchesProperty(path, srcValue) {
	  if (isKey(path) && isStrictComparable(srcValue)) {
	    return matchesStrictComparable(toKey(path), srcValue);
	  }
	  return function(object) {
	    var objValue = get(object, path);
	    return (objValue === undefined && objValue === srcValue)
	      ? hasIn(object, path)
	      : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
	  };
	}

	module.exports = baseMatchesProperty;


/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(128);

	/**
	 * Gets the value at `path` of `object`. If the resolved value is
	 * `undefined`, the `defaultValue` is returned in its place.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.7.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
	 * @returns {*} Returns the resolved value.
	 * @example
	 *
	 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
	 *
	 * _.get(object, 'a[0].b.c');
	 * // => 3
	 *
	 * _.get(object, ['a', '0', 'b', 'c']);
	 * // => 3
	 *
	 * _.get(object, 'a.b.c', 'default');
	 * // => 'default'
	 */
	function get(object, path, defaultValue) {
	  var result = object == null ? undefined : baseGet(object, path);
	  return result === undefined ? defaultValue : result;
	}

	module.exports = get;


/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

	var baseHasIn = __webpack_require__(186),
	    hasPath = __webpack_require__(187);

	/**
	 * Checks if `path` is a direct or inherited property of `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 * @example
	 *
	 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
	 *
	 * _.hasIn(object, 'a');
	 * // => true
	 *
	 * _.hasIn(object, 'a.b');
	 * // => true
	 *
	 * _.hasIn(object, ['a', 'b']);
	 * // => true
	 *
	 * _.hasIn(object, 'b');
	 * // => false
	 */
	function hasIn(object, path) {
	  return object != null && hasPath(object, path, baseHasIn);
	}

	module.exports = hasIn;


/***/ }),
/* 186 */
/***/ (function(module, exports) {

	/**
	 * The base implementation of `_.hasIn` without support for deep paths.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHasIn(object, key) {
	  return object != null && key in Object(object);
	}

	module.exports = baseHasIn;


/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

	var castPath = __webpack_require__(118),
	    isArguments = __webpack_require__(60),
	    isArray = __webpack_require__(63),
	    isIndex = __webpack_require__(67),
	    isLength = __webpack_require__(70),
	    toKey = __webpack_require__(129);

	/**
	 * Checks if `path` exists on `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @param {Function} hasFunc The function to check properties.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 */
	function hasPath(object, path, hasFunc) {
	  path = castPath(path, object);

	  var index = -1,
	      length = path.length,
	      result = false;

	  while (++index < length) {
	    var key = toKey(path[index]);
	    if (!(result = object != null && hasFunc(object, key))) {
	      break;
	    }
	    object = object[key];
	  }
	  if (result || ++index != length) {
	    return result;
	  }
	  length = object == null ? 0 : object.length;
	  return !!length && isLength(length) && isIndex(key, length) &&
	    (isArray(object) || isArguments(object));
	}

	module.exports = hasPath;


/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(189),
	    basePropertyDeep = __webpack_require__(190),
	    isKey = __webpack_require__(119),
	    toKey = __webpack_require__(129);

	/**
	 * Creates a function that returns the value at `path` of a given object.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Util
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 * @example
	 *
	 * var objects = [
	 *   { 'a': { 'b': 2 } },
	 *   { 'a': { 'b': 1 } }
	 * ];
	 *
	 * _.map(objects, _.property('a.b'));
	 * // => [2, 1]
	 *
	 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
	 * // => [1, 2]
	 */
	function property(path) {
	  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
	}

	module.exports = property;


/***/ }),
/* 189 */
/***/ (function(module, exports) {

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}

	module.exports = baseProperty;


/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(128);

	/**
	 * A specialized version of `baseProperty` which supports deep paths.
	 *
	 * @private
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 */
	function basePropertyDeep(path) {
	  return function(object) {
	    return baseGet(object, path);
	  };
	}

	module.exports = basePropertyDeep;


/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

	var baseValues = __webpack_require__(192),
	    keys = __webpack_require__(57);

	/**
	 * Creates an array of the own enumerable string keyed property values of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property values.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.values(new Foo);
	 * // => [1, 2] (iteration order is not guaranteed)
	 *
	 * _.values('hi');
	 * // => ['h', 'i']
	 */
	function values(object) {
	  return object == null ? [] : baseValues(object, keys(object));
	}

	module.exports = values;


/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(5);

	/**
	 * The base implementation of `_.values` and `_.valuesIn` which creates an
	 * array of `object` property values corresponding to the property names
	 * of `props`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} props The property names to get values for.
	 * @returns {Object} Returns the array of property values.
	 */
	function baseValues(object, props) {
	  return arrayMap(props, function(key) {
	    return object[key];
	  });
	}

	module.exports = baseValues;


/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = makeSessionAction;

	var _hydrateturn = __webpack_require__(157);

	var _hydrateturn2 = _interopRequireDefault(_hydrateturn);

	var _isgameendcmnd = __webpack_require__(161);

	var _isgameendcmnd2 = _interopRequireDefault(_isgameendcmnd);

	var _calcturnsave = __webpack_require__(194);

	var _calcturnsave2 = _interopRequireDefault(_calcturnsave);

	var _encodesessionsave = __webpack_require__(195);

	var _encodesessionsave2 = _interopRequireDefault(_encodesessionsave);

	var _decodesessionsave = __webpack_require__(149);

	var _decodesessionsave2 = _interopRequireDefault(_decodesessionsave);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function makeSessionAction(session, action) {
	    // removing an existing mark, going back in time
	    if (session.markTimeStamps[action] && !session.turn.links[session.step.stepid][action]) {
	        console.log("Going back to", session.markTimeStamps[action]);
	        session.step = session.turn.steps[session.markTimeStamps[action]];
	        delete session.markTimeStamps[action]; // not really necessary
	    }
	    // undoing last action (stored in session)
	    else if (action === 'undo' || action.substr(0, 5) === 'undo ') {
	            var undo = session.undo.pop();
	            session.step = session.turn.steps[undo.backTo];
	        }
	        // ending the game!
	        else if ((0, _isgameendcmnd2.default)(action)) {
	                session.savedIndexes = session.savedIndexes.concat((0, _calcturnsave2.default)(session.turn, session.step, action));
	                session.saveString = (0, _encodesessionsave2.default)({
	                    gameId: session.gameId,
	                    turnNumber: session.turn.turn,
	                    battleId: session.battleId,
	                    moveIndexes: session.savedIndexes,
	                    ended: true
	                });
	                session.winner = action === 'win' ? session.turn.player : action === 'lose' ? { 1: 2, 2: 1 }[session.turn.player] : 0;
	                session.endedBy = session.turn.links[session.step.stepid][action];
	            }
	            // ending the turn, creating a new one
	            else if (action === 'endturn') {
	                    session.savedIndexes = session.savedIndexes.concat((0, _calcturnsave2.default)(session.turn, session.step, 'endturn'));
	                    session.turn = (0, _hydrateturn2.default)(session.game, session.turn.next[session.step.stepid]);
	                    session.saveString = (0, _encodesessionsave2.default)({
	                        gameId: session.gameId,
	                        turnNumber: session.turn.turn,
	                        battleId: session.battleId,
	                        moveIndexes: session.savedIndexes
	                    });
	                    session.step = session.turn.steps.root;
	                    session.markTimeStamps = {};
	                    session.undo = [];
	                    // TODO also add to session history
	                }
	                // doing an action or adding a mark
	                else {
	                        if (!session.game.commands[action]) {
	                            session.markTimeStamps[action] = session.step.stepid;
	                        } else {
	                            session.undo.push({
	                                backTo: session.step.stepid,
	                                actionName: action
	                            });
	                        }
	                        session.step = session.turn.steps[session.step.stepid + '-' + action]; // TODO - or create, if not there!
	                    }
	    return session;
	} /*
	  Used in API.makeSessionAction and API.inflateFromSave
	  Mutates the given session according to the given action and returns it.
	  */

/***/ }),
/* 194 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = calcTurnSave;
	function calcTurnSave(turn, step, finishCmnd) {
	  var id = 'root';
	  var remaining = step.path.concat(finishCmnd);
	  var save = [];
	  while (remaining.length) {
	    var cmnd = remaining.shift();
	    var available = Object.keys(turn.links[id]).sort();
	    if (available.length > 1) {
	      var index = available.indexOf(cmnd);
	      if (index === -1) {
	        throw "Didnt find action!"; // TODO - make it work for win/lose/draw
	      }
	      save.push(index);
	    }
	    id += '-' + cmnd;
	  }
	  return save;
	}

/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = encodeSessionSave;

	var _arrayCompress = __webpack_require__(150);

	var _gameid = __webpack_require__(152);

	var _lzString = __webpack_require__(151);

	var _lzString2 = _interopRequireDefault(_lzString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	//import cc from 'classical-cipher';

	//import stringcompr from 'js-string-compression';
	//let hm = new stringcompr.Hauffman();

	function compressString(str) {
	  //return str;
	  return _lzString2.default.compressToBase64(str);
	  // return hm.compress(str);
	  //return cc.ciphers.hillCipher.encrypt(str, [ 2, 7, 15, 4 ]);
	}

	/*
	Should return an encoded sessionSave
	*/
	function encodeSessionSave(_ref) {
	  var gameId = _ref.gameId,
	      turnNumber = _ref.turnNumber,
	      moveIndexes = _ref.moveIndexes,
	      battleId = _ref.battleId,
	      ended = _ref.ended;

	  return (0, _gameid.encodeGameId)(gameId, battleId[0]) + battleId + compressString((0, _arrayCompress.compress)([turnNumber * (ended ? -1 : 1)].concat(_toConsumableArray(moveIndexes))));
	}

/***/ }),
/* 196 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = findBestTurnEndPaths;
	/*
	Returns array of best moves for finishing current turn according to named brain.
	TODO - also add lose and draw!
	*/
	function findBestTurnEndPaths(_ref, brain) {
	    var game = _ref.game,
	        turn = _ref.turn;

	    var func = game['brain_' + brain + '_' + turn.player],
	        winners = [],
	        highscore = -1000000;
	    if (turn.ends.win.length) {
	        winners = turn.ends.win.map(function (winId) {
	            return turn.steps[winId].path.concat('win');
	        });
	    } else {
	        for (var stepid in turn.next) {
	            var stepscore = func(turn.steps[stepid]);
	            if (stepscore > highscore) {
	                winners = [turn.steps[stepid].path.concat('endturn')];
	                highscore = stepscore;
	            } else if (stepscore === highscore) {
	                winners.push(turn.steps[stepid].path.concat('endturn'));
	            }
	        }
	    }
	    return winners;
	}

/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = getRandomTurnEndPath;

	var _random = __webpack_require__(144);

	var _random2 = _interopRequireDefault(_random);

	var _endstepsforturnbycmnd = __webpack_require__(198);

	var _endstepsforturnbycmnd2 = _interopRequireDefault(_endstepsforturnbycmnd);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// TODO - randomize with seed!
	function getRandomTurnEndPath(_ref) {
	  var turn = _ref.turn;

	  var ends = (0, _endstepsforturnbycmnd2.default)(turn);
	  var fromName = ends.win.length ? 'win' : ends.endturn.length ? 'endturn' : ends.draw.length ? 'draw' : 'lose';
	  var targetStepId = ends[fromName][(0, _random2.default)(0, ends[fromName].length - 1)];
	  return turn.steps[targetStepId].path.concat(fromName);
	}

/***/ }),
/* 198 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = endStepsForTurnByCmnd;

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	/*
	Returns an object with the 4 turn-ending actions, and an array of steps for each.s
	*/
	function endStepsForTurnByCmnd(turn) {
	  return ['win', 'lose', 'draw'].reduce(function (mem, cmnd) {
	    return _extends({}, mem, _defineProperty({}, cmnd, turn.ends[cmnd]));
	  }, {
	    endturn: Object.keys(turn.next)
	  });
	}

/***/ })
/******/ ]);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/* Generated by WorkerWrapper */

var lib = __webpack_require__(0);

if (lib.default){
  lib = lib.default;
}

onmessage = function(e){
  var method = e.data[0];
  var callid = e.data[1];
  var args = e.data[2];
  var result = lib[method].apply(lib,args);
  postMessage([callid,result]);
}


/***/ })
/******/ ]);