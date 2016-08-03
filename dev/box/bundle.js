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

	var _krieg = __webpack_require__(1);

	var _krieg2 = _interopRequireDefault(_krieg);

	var _play = __webpack_require__(21);

	var _play2 = _interopRequireDefault(_play);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	window.krieg = _krieg2.default;
	window.play = _play2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

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
	      "3": "b4",
	      "4": "b3",
	      "5": "a3"
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
	      "3": "c4",
	      "4": "c3",
	      "5": "b3",
	      "6": "a3",
	      "7": "a4"
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
	      "3": "d4",
	      "4": "d3",
	      "5": "c3",
	      "6": "b3",
	      "7": "b4"
	    },
	    "d1": {
	      "1": "d2",
	      "7": "c1",
	      "8": "c2"
	    },
	    "d2": {
	      "1": "d3",
	      "5": "d1",
	      "6": "c1",
	      "7": "c2",
	      "8": "c3"
	    },
	    "d3": {
	      "1": "d4",
	      "5": "d2",
	      "6": "c2",
	      "7": "c3",
	      "8": "c4"
	    },
	    "d4": {
	      "5": "d3",
	      "6": "c3",
	      "7": "c4"
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
	      }
	    }
	  };
	  (function () {
	    var TERRAIN = {
	      "southeast": {
	        "a4": {
	          "pos": "a4"
	        },
	        "c2": {
	          "pos": "c2"
	        }
	      },
	      "northwest": {
	        "b3": {
	          "pos": "b3"
	        },
	        "d1": {
	          "pos": "d1"
	        }
	      },
	      "corners": {
	        "a4": {
	          "pos": "a4",
	          "owner": 1
	        },
	        "d1": {
	          "pos": "d1",
	          "owner": 2
	        }
	      },
	      "mycorners": {
	        "a4": {
	          "pos": "a4",
	          "owner": 1
	        }
	      },
	      "oppcorners": {
	        "d1": {
	          "pos": "d1",
	          "owner": 2
	        }
	      },
	      "bases": {
	        "b4": {
	          "pos": "b4",
	          "owner": 1
	        },
	        "a3": {
	          "pos": "a3",
	          "owner": 1
	        },
	        "b3": {
	          "pos": "b3",
	          "owner": 1
	        },
	        "c2": {
	          "pos": "c2",
	          "owner": 2
	        },
	        "d2": {
	          "pos": "d2",
	          "owner": 2
	        },
	        "c1": {
	          "pos": "c1",
	          "owner": 2
	        }
	      },
	      "mybases": {
	        "b4": {
	          "pos": "b4",
	          "owner": 1
	        },
	        "a3": {
	          "pos": "a3",
	          "owner": 1
	        },
	        "b3": {
	          "pos": "b3",
	          "owner": 1
	        }
	      },
	      "oppbases": {
	        "c2": {
	          "pos": "c2",
	          "owner": 2
	        },
	        "d2": {
	          "pos": "d2",
	          "owner": 2
	        },
	        "c1": {
	          "pos": "c1",
	          "owner": 2
	        }
	      }
	    };
	    var ownernames = ["neutral", "my", "opp"];
	    var player = 1;
	    var otherplayer = 2;
	    game.selectunit1 = function (turn, step, markpos) {
	      var ARTIFACTS = {
	        movetargets: (0, _assign2.default)({}, step.ARTIFACTS.movetargets)
	      };
	      var UNITLAYERS = step.UNITLAYERS;
	      var MARKS = (0, _assign2.default)({}, step.MARKS, {
	        selectunit: markpos
	      });
	      var STARTPOS = MARKS['selectunit'];
	      var neighbourdirs = !!TERRAIN.southeast[STARTPOS] ? [1, 3, 4, 5, 7] : !!TERRAIN.northwest[STARTPOS] ? [1, 3, 5, 7, 8] : [1, 3, 5, 7];
	      var nbrofneighbourdirs = neighbourdirs.length;
	      var startconnections = connections[STARTPOS];
	      for (var dirnbr = 0; dirnbr < nbrofneighbourdirs; dirnbr++) {
	        var POS = startconnections[neighbourdirs[dirnbr]];
	        if (POS && !UNITLAYERS.units[POS]) {
	          ARTIFACTS['movetargets'][POS] = {};
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
	      var linkedpositions = (0, _keys2.default)(ARTIFACTS.movetargets);
	      var nbrofpositions = linkedpositions.length;
	      for (var linknbr = 0; linknbr < nbrofpositions; linknbr++) {
	        turn.links[newstepid][linkedpositions[linknbr]] = 'selectmove1';
	      }
	      return newstep;
	    };
	    game.selectmove1 = function (turn, step, markpos) {
	      var ARTIFACTS = (0, _assign2.default)({}, step.ARTIFACTS, {});
	      var UNITLAYERS = step.UNITLAYERS;
	      var MARKS = (0, _assign2.default)({}, step.MARKS, {
	        selectmove: markpos
	      });
	      var newstepid = step.stepid + '-' + markpos;
	      var newstep = turn.steps[newstepid] = (0, _assign2.default)({}, step, {
	        MARKS: MARKS,
	        stepid: newstepid,
	        path: step.path.concat(markpos)
	      });
	      turn.links[newstepid] = {};
	      turn.links[newstepid].move = 'move1';
	      return newstep;
	    };
	    game.move1 = function (turn, step) {
	      var ARTIFACTS = (0, _assign2.default)({}, step.ARTIFACTS, {});
	      var MARKS = step.MARKS;
	      var UNITDATA = (0, _assign2.default)({}, step.UNITDATA);
	      var UNITLAYERS = step.UNITLAYERS;
	      var LOOPID;
	      for (var POS in UNITLAYERS.myfrozens) {
	        LOOPID = UNITLAYERS.myfrozens[POS].id;
	        UNITDATA[LOOPID] = (0, _assign2.default)({}, UNITDATA[LOOPID], {
	          'group': 'notfrozens'
	        });
	      }
	      var unitid = (UNITLAYERS.units[MARKS['selectunit']] || {}).id;
	      if (unitid) {
	        UNITDATA[unitid] = (0, _assign2.default)({}, UNITDATA[unitid], {
	          'group': 'frozens'
	        });
	      }
	      var unitid = (UNITLAYERS.units[MARKS['selectunit']] || {}).id;
	      if (unitid) {
	        UNITDATA[unitid] = (0, _assign2.default)({}, UNITDATA[unitid], {
	          'pos': MARKS['selectmove']
	        });
	      }
	      MARKS = {};
	      UNITLAYERS = {
	        "notfrozens": {},
	        "mynotfrozens": {},
	        "oppnotfrozens": {},
	        "neutralnotfrozens": {},
	        "frozens": {},
	        "myfrozens": {},
	        "oppfrozens": {},
	        "neutralfrozens": {},
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
	        UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
	      }
	      ARTIFACTS = {
	        "movetargets": {}
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
	            s0 = TERRAIN.oppcorners,
	            s1 = UNITLAYERS.myunits;
	        for (var key in s0) {
	          if (s1[key]) {
	            ret[key] = s0[key];
	          }
	        }
	        return ret;
	      }() || {}).length !== 0) {
	        var winner = 1;
	        var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
	        turn.links[newstepid][result] = 'cornerinfiltration';
	      } else if ((0, _keys2.default)(function () {
	        var ret = {},
	            s0 = TERRAIN.oppbases,
	            s1 = UNITLAYERS.myunits;
	        for (var key in s0) {
	          if (s1[key]) {
	            ret[key] = s0[key];
	          }
	        }
	        return ret;
	      }()).length === 2) {
	        var winner = 1;
	        var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
	        turn.links[newstepid][result] = 'occupation';
	      } else turn.links[newstepid].endturn = "start" + otherplayer;
	      return newstep;
	    };
	    game.start1 = function (turn, step) {
	      var turn = {
	        steps: {},
	        player: player,
	        turn: turn.turn + 1,
	        links: {
	          root: {}
	        }
	      };
	      var MARKS = {};
	      var ARTIFACTS = {
	        "movetargets": {}
	      };
	      var UNITDATA = step.UNITDATA;
	      var UNITLAYERS = {
	        "notfrozens": {},
	        "mynotfrozens": {},
	        "oppnotfrozens": {},
	        "neutralnotfrozens": {},
	        "frozens": {},
	        "myfrozens": {},
	        "oppfrozens": {},
	        "neutralfrozens": {},
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
	        UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
	      }
	      var newstep = turn.steps.root = {
	        ARTIFACTS: ARTIFACTS,
	        UNITDATA: UNITDATA,
	        UNITLAYERS: UNITLAYERS,
	        MARKS: MARKS,
	        stepid: 'root',
	        path: []
	      };
	      var linkedpositions = (0, _keys2.default)(UNITLAYERS.mynotfrozens);
	      var nbrofpositions = linkedpositions.length;
	      for (var linknbr = 0; linknbr < nbrofpositions; linknbr++) {
	        turn.links.root[linkedpositions[linknbr]] = 'selectunit1';
	      }
	      return turn;
	    };
	  })();
	  (function () {
	    var TERRAIN = {
	      "southeast": {
	        "a4": {
	          "pos": "a4"
	        },
	        "c2": {
	          "pos": "c2"
	        }
	      },
	      "northwest": {
	        "b3": {
	          "pos": "b3"
	        },
	        "d1": {
	          "pos": "d1"
	        }
	      },
	      "corners": {
	        "a4": {
	          "pos": "a4",
	          "owner": 1
	        },
	        "d1": {
	          "pos": "d1",
	          "owner": 2
	        }
	      },
	      "oppcorners": {
	        "a4": {
	          "pos": "a4",
	          "owner": 1
	        }
	      },
	      "mycorners": {
	        "d1": {
	          "pos": "d1",
	          "owner": 2
	        }
	      },
	      "bases": {
	        "b4": {
	          "pos": "b4",
	          "owner": 1
	        },
	        "a3": {
	          "pos": "a3",
	          "owner": 1
	        },
	        "b3": {
	          "pos": "b3",
	          "owner": 1
	        },
	        "c2": {
	          "pos": "c2",
	          "owner": 2
	        },
	        "d2": {
	          "pos": "d2",
	          "owner": 2
	        },
	        "c1": {
	          "pos": "c1",
	          "owner": 2
	        }
	      },
	      "oppbases": {
	        "b4": {
	          "pos": "b4",
	          "owner": 1
	        },
	        "a3": {
	          "pos": "a3",
	          "owner": 1
	        },
	        "b3": {
	          "pos": "b3",
	          "owner": 1
	        }
	      },
	      "mybases": {
	        "c2": {
	          "pos": "c2",
	          "owner": 2
	        },
	        "d2": {
	          "pos": "d2",
	          "owner": 2
	        },
	        "c1": {
	          "pos": "c1",
	          "owner": 2
	        }
	      }
	    };
	    var ownernames = ["neutral", "opp", "my"];
	    var player = 2;
	    var otherplayer = 1;
	    game.selectunit2 = function (turn, step, markpos) {
	      var ARTIFACTS = {
	        movetargets: (0, _assign2.default)({}, step.ARTIFACTS.movetargets)
	      };
	      var UNITLAYERS = step.UNITLAYERS;
	      var MARKS = (0, _assign2.default)({}, step.MARKS, {
	        selectunit: markpos
	      });
	      var STARTPOS = MARKS['selectunit'];
	      var neighbourdirs = !!TERRAIN.southeast[STARTPOS] ? [1, 3, 4, 5, 7] : !!TERRAIN.northwest[STARTPOS] ? [1, 3, 5, 7, 8] : [1, 3, 5, 7];
	      var nbrofneighbourdirs = neighbourdirs.length;
	      var startconnections = connections[STARTPOS];
	      for (var dirnbr = 0; dirnbr < nbrofneighbourdirs; dirnbr++) {
	        var POS = startconnections[neighbourdirs[dirnbr]];
	        if (POS && !UNITLAYERS.units[POS]) {
	          ARTIFACTS['movetargets'][POS] = {};
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
	      var linkedpositions = (0, _keys2.default)(ARTIFACTS.movetargets);
	      var nbrofpositions = linkedpositions.length;
	      for (var linknbr = 0; linknbr < nbrofpositions; linknbr++) {
	        turn.links[newstepid][linkedpositions[linknbr]] = 'selectmove2';
	      }
	      return newstep;
	    };
	    game.selectmove2 = function (turn, step, markpos) {
	      var ARTIFACTS = (0, _assign2.default)({}, step.ARTIFACTS, {});
	      var UNITLAYERS = step.UNITLAYERS;
	      var MARKS = (0, _assign2.default)({}, step.MARKS, {
	        selectmove: markpos
	      });
	      var newstepid = step.stepid + '-' + markpos;
	      var newstep = turn.steps[newstepid] = (0, _assign2.default)({}, step, {
	        MARKS: MARKS,
	        stepid: newstepid,
	        path: step.path.concat(markpos)
	      });
	      turn.links[newstepid] = {};
	      turn.links[newstepid].move = 'move2';
	      return newstep;
	    };
	    game.move2 = function (turn, step) {
	      var ARTIFACTS = (0, _assign2.default)({}, step.ARTIFACTS, {});
	      var MARKS = step.MARKS;
	      var UNITDATA = (0, _assign2.default)({}, step.UNITDATA);
	      var UNITLAYERS = step.UNITLAYERS;
	      var LOOPID;
	      for (var POS in UNITLAYERS.myfrozens) {
	        LOOPID = UNITLAYERS.myfrozens[POS].id;
	        UNITDATA[LOOPID] = (0, _assign2.default)({}, UNITDATA[LOOPID], {
	          'group': 'notfrozens'
	        });
	      }
	      var unitid = (UNITLAYERS.units[MARKS['selectunit']] || {}).id;
	      if (unitid) {
	        UNITDATA[unitid] = (0, _assign2.default)({}, UNITDATA[unitid], {
	          'group': 'frozens'
	        });
	      }
	      var unitid = (UNITLAYERS.units[MARKS['selectunit']] || {}).id;
	      if (unitid) {
	        UNITDATA[unitid] = (0, _assign2.default)({}, UNITDATA[unitid], {
	          'pos': MARKS['selectmove']
	        });
	      }
	      MARKS = {};
	      UNITLAYERS = {
	        "notfrozens": {},
	        "mynotfrozens": {},
	        "oppnotfrozens": {},
	        "neutralnotfrozens": {},
	        "frozens": {},
	        "myfrozens": {},
	        "oppfrozens": {},
	        "neutralfrozens": {},
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
	        UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
	      }
	      ARTIFACTS = {
	        "movetargets": {}
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
	            s0 = TERRAIN.oppcorners,
	            s1 = UNITLAYERS.myunits;
	        for (var key in s0) {
	          if (s1[key]) {
	            ret[key] = s0[key];
	          }
	        }
	        return ret;
	      }() || {}).length !== 0) {
	        var winner = 2;
	        var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
	        turn.links[newstepid][result] = 'cornerinfiltration';
	      } else if ((0, _keys2.default)(function () {
	        var ret = {},
	            s0 = TERRAIN.oppbases,
	            s1 = UNITLAYERS.myunits;
	        for (var key in s0) {
	          if (s1[key]) {
	            ret[key] = s0[key];
	          }
	        }
	        return ret;
	      }()).length === 2) {
	        var winner = 2;
	        var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
	        turn.links[newstepid][result] = 'occupation';
	      } else turn.links[newstepid].endturn = "start" + otherplayer;
	      return newstep;
	    };
	    game.start2 = function (turn, step) {
	      var turn = {
	        steps: {},
	        player: player,
	        turn: turn.turn + 1,
	        links: {
	          root: {}
	        }
	      };
	      var MARKS = {};
	      var ARTIFACTS = {
	        "movetargets": {}
	      };
	      var UNITDATA = step.UNITDATA;
	      var UNITLAYERS = {
	        "notfrozens": {},
	        "mynotfrozens": {},
	        "oppnotfrozens": {},
	        "neutralnotfrozens": {},
	        "frozens": {},
	        "myfrozens": {},
	        "oppfrozens": {},
	        "neutralfrozens": {},
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
	        UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
	      }
	      var newstep = turn.steps.root = {
	        ARTIFACTS: ARTIFACTS,
	        UNITDATA: UNITDATA,
	        UNITLAYERS: UNITLAYERS,
	        MARKS: MARKS,
	        stepid: 'root',
	        path: []
	      };
	      var linkedpositions = (0, _keys2.default)(UNITLAYERS.mynotfrozens);
	      var nbrofpositions = linkedpositions.length;
	      for (var linknbr = 0; linknbr < nbrofpositions; linknbr++) {
	        turn.links.root[linkedpositions[linknbr]] = 'selectunit2';
	      }
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
	          "pos": "a4",
	          "id": "unit1",
	          "group": "notfrozens",
	          "owner": 1
	        },
	        "unit2": {
	          "pos": "b4",
	          "id": "unit2",
	          "group": "notfrozens",
	          "owner": 1
	        },
	        "unit3": {
	          "pos": "a3",
	          "id": "unit3",
	          "group": "notfrozens",
	          "owner": 1
	        },
	        "unit4": {
	          "pos": "b3",
	          "id": "unit4",
	          "group": "notfrozens",
	          "owner": 1
	        },
	        "unit5": {
	          "pos": "c2",
	          "id": "unit5",
	          "group": "notfrozens",
	          "owner": 2
	        },
	        "unit6": {
	          "pos": "c1",
	          "id": "unit6",
	          "group": "notfrozens",
	          "owner": 2
	        },
	        "unit7": {
	          "pos": "d2",
	          "id": "unit7",
	          "group": "notfrozens",
	          "owner": 2
	        },
	        "unit8": {
	          "pos": "d1",
	          "id": "unit8",
	          "group": "notfrozens",
	          "owner": 2
	        }
	      }
	    };
	    return game.start1(turnseed, stepseed);
	  };
	  game.commands = {
	    "move": 1
	  };
	  game.graphics = {
	    "tiles": {
	      "corners": "playercolour",
	      "bases": "castle"
	    },
	    "icons": {
	      "notfrozens": "knights",
	      "frozens": "rooks"
	    }
	  };
	  game.board = {
	    "width": 4,
	    "height": 4,
	    "terrain": {
	      "southeast": ["a4", "c2"],
	      "northwest": ["b3", "d1"],
	      "corners": {
	        "1": ["a4"],
	        "2": ["d1"]
	      },
	      "bases": {
	        "1": ["b4", "a3", "b3"],
	        "2": ["c2", "d2", "c1"]
	      }
	    }
	  };
	  return game;
	};
	var instance = makeGame();
	module.exports = instance;

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
	    startGameSession: function startGameSession(game) {
	        var turn = game.newGame();
	        turn = play.hydrateTurn(game, turn);
	        var session = {
	            game: game,
	            turn: turn,
	            step: turn.steps.root,
	            save: []
	        };
	        session.UI = play.getSessionUI(session);
	        return session;
	    },
	    makeSessionAction: function makeSessionAction(session, action) {
	        if (endgameactions[action]) {
	            // TODO - end the session!
	        } else if (action === 'endturn') {
	                session.save = session.save.concat(play.calculateSave(session.turn, session.step));
	                session.turn = play.hydrateTurn(session.game, session.turn.next[session.step.stepid]);
	                session.step = session.turn.steps.root;
	                session.UI = play.getSessionUI(session);
	            } else {
	                session.step = session.turn.steps[session.step.stepid + '-' + action];
	                session.UI = play.getSessionUI(session);
	            }
	        return session;
	    },
	    calculateSave: function calculateSave(turn, step) {
	        var ret = [];
	        var id = 'root';
	        var followActions = step.path.concat('endturn');
	        while (followActions.length) {
	            var action = followActions.shift();
	            var available = (0, _keys2.default)(turn.links[id]).sort();
	            var index = available.indexOf(action);
	            if (index === -1) {
	                throw "Didnt find action!";
	            }
	            if (available.length > 1) {
	                ret.push(index);
	            }
	            id += '-' + action;
	        }
	        return ret;
	    },
	    getSessionUI: function getSessionUI(_ref) {
	        var game = _ref.game;
	        var turn = _ref.turn;
	        var step = _ref.step;
	        return (0, _keys2.default)(turn.links[step.stepid]).reduce(function (mem, action) {
	            if (endgameactions[action] || action == 'endturn' || action === 'next') {
	                mem.system.endturn = action;
	            } else if (game.commands[action]) {
	                mem.commands[action] = turn.links[step.stepid][action];
	            } else {
	                mem.marks[action] = turn.links[step.stepid][action];
	            }
	            return mem;
	        }, { marks: {}, commands: {}, system: {} });
	    },
	    hydrateStep: function hydrateStep(game, turn, step) {
	        var steps = turn.steps;
	        var stepid = step.stepid;
	        var links = turn.links;
	        var steplinks = links[stepid];
	        var checkActions = (0, _keys2.default)(steplinks);
	        var canend = false;
	        while (checkActions.length) {
	            var action = checkActions.pop();
	            var func = steplinks[action];
	            if (endgameactions[action]) {
	                turn.ends[action].push(stepid);
	                canend = true;
	            } else if (action === 'endturn') {
	                var newturn = play.tryToReachTurnEnd(game, game[func](turn, step));
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
	                if (play.hydrateStep(game, turn, nextstep)) {
	                    canend = true;
	                } else {
	                    delete steplinks[action]; // TODO - only this is actually needed
	                    delete steps[nextstepid];
	                    delete links[nextstepid];
	                }
	            }
	        }
	        return canend;
	    },
	    hydrateTurn: function hydrateTurn(game, turn) {
	        turn.ends = {
	            win: [],
	            draw: [],
	            lose: []
	        };
	        turn.next = {};
	        play.hydrateStep(game, turn, turn.steps.root);
	        return turn;
	    },
	    tryToReachTurnEnd: function tryToReachTurnEnd(game, turn) {
	        var steps = turn.steps;
	        var links = turn.links;

	        var checkSteps = [steps.root];
	        var canalwaysend = game.canalwaysend || {};
	        while (!turn.canend && checkSteps.length) {
	            var step = checkSteps.pop();
	            var stepid = step.stepid;
	            var steplinks = links[stepid];
	            var checkActions = (0, _keys2.default)(steplinks);
	            while (!turn.canend && checkActions.length) {
	                var action = checkActions.pop();
	                var func = steplinks[action];
	                if (endgameactions[action] || action === 'endturn' || canalwaysend[func]) {
	                    turn.canend = true;
	                } else {
	                    var nextstepid = stepid + '-' + action;
	                    checkSteps.push(steps[nextstepid] || (steps[nextstepid] = game[func](turn, step, action)));
	                }
	            }
	        }
	        return turn;
	    }
	};

	exports.default = play;

/***/ }
/******/ ]);