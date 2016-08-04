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

	var _slicedToArray2 = __webpack_require__(22);

	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

	var _keys = __webpack_require__(2);

	var _keys2 = _interopRequireDefault(_keys);

	var _mapValues = __webpack_require__(54);

	var _mapValues2 = _interopRequireDefault(_mapValues);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var endgameactions = { win: 1, lose: 1, draw: 1 };

	var play = {
	    inflateFromSave: function inflateFromSave(game, turnnbr, save) {
	        var turn = game.newGame();
	        turn = play.hydrateTurn(game, turn);
	        var moves = save;
	        var stepid = 'root';
	        while (turn.turn < turnnbr) {
	            var action = undefined,
	                available = (0, _keys2.default)(turn.links[stepid]).sort();
	            if (available.length === 1) {
	                action = available[0];
	            } else if (available.length > 1) {
	                if (!moves.length) {
	                    throw "Many available but no save index left!";
	                }
	                action = available[moves.shift()];
	            } else {
	                throw "No available actions!";
	            }
	            var func = turn.links[stepid][action];
	            if (action === 'endturn') {
	                turn = play.hydrateTurn(game, turn.next[stepid]);
	                stepid = 'root';
	            } else {
	                stepid = stepid + '-' + [action];
	            } // TODO endgame funcs too!
	            console.log(action, available.length === 1);
	        }
	        return turn;
	    },
	    startGameSession: function startGameSession(game) {
	        var turn = game.newGame();
	        turn = play.hydrateTurn(game, turn);
	        var session = {
	            game: game,
	            turn: turn,
	            step: turn.steps.root,
	            save: [],
	            marks: {},
	            undo: []
	        };
	        session.UI = play.getSessionUI(session);
	        return session;
	    },
	    makeSessionAction: function makeSessionAction(session, action) {
	        if (session.marks[action]) {
	            // removing a mark
	            session.step = session.turn.steps[session.marks[action]];

	            session.marks = (0, _keys2.default)(session.step.MARKS).reduce(function (mem, markname) {
	                var pos = session.step.MARKS[markname];
	                mem[pos] = session.marks[pos];
	                return mem;
	            }, {});

	            session.UI = play.getSessionUI(session);
	        } else if (action === 'undo') {
	            var _session$undo$pop = session.undo.pop();

	            var _session$undo$pop2 = (0, _slicedToArray3.default)(_session$undo$pop, 2);

	            var gobackto = _session$undo$pop2[0];
	            var removemarks = _session$undo$pop2[1];

	            session.step = session.turn.steps[gobackto];

	            session.marks = removemarks;

	            session.UI = play.getSessionUI(session);
	        } else if (endgameactions[action]) {
	            // TODO - end the session!
	        } else if (action === 'endturn') {
	                session.save = session.save.concat(play.calculateSave(session.turn, session.step));
	                session.turn = play.hydrateTurn(session.game, session.turn.next[session.step.stepid]);
	                session.step = session.turn.steps.root;
	                session.marks = {};
	                session.undo = [];
	                session.UI = play.getSessionUI(session);
	            } else {
	                if (!session.game.commands[action]) {
	                    session.marks[action] = session.step.stepid;
	                } else {
	                    session.undo.push([session.step.stepid, session.marks]);
	                    session.marks = {};
	                }
	                session.step = session.turn.steps[session.step.stepid + '-' + action];
	                session.UI = play.getSessionUI(session);
	            }
	        console.log("SESS", session);
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
	                throw "Didnt find action!"; // TODO - make it work for win/lose/draw
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
	        var undo = _ref.undo;
	        return (0, _keys2.default)(turn.links[step.stepid]).reduce(function (mem, action) {
	            if (endgameactions[action] || action == 'endturn' || action === 'next') {
	                mem.system.push(action);
	            } else if (game.commands[action]) {
	                mem.commands.push(action);
	            } else {
	                mem.marks.push(action);
	            }
	            return mem;
	        }, { marks: [], commands: [], system: undo.length ? ['undo'] : [] });
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

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _isIterable2 = __webpack_require__(23);

	var _isIterable3 = _interopRequireDefault(_isIterable2);

	var _getIterator2 = __webpack_require__(48);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = (function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];
	    var _n = true;
	    var _d = false;
	    var _e = undefined;

	    try {
	      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);

	        if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;
	      _e = err;
	    } finally {
	      try {
	        if (!_n && _i["return"]) _i["return"]();
	      } finally {
	        if (_d) throw _e;
	      }
	    }

	    return _arr;
	  }

	  return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if ((0, _isIterable3.default)(Object(arr))) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError("Invalid attempt to destructure non-iterable instance");
	    }
	  };
	})();

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(24), __esModule: true };

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(25);
	__webpack_require__(43);
	module.exports = __webpack_require__(46);

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(26);
	var Iterators = __webpack_require__(29);
	Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(27)
	  , step             = __webpack_require__(28)
	  , Iterators        = __webpack_require__(29)
	  , toIObject        = __webpack_require__(30);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(31)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(19)
	  , defined = __webpack_require__(6);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(32)
	  , $export        = __webpack_require__(8)
	  , redefine       = __webpack_require__(33)
	  , hide           = __webpack_require__(34)
	  , has            = __webpack_require__(37)
	  , Iterators      = __webpack_require__(29)
	  , $iterCreate    = __webpack_require__(38)
	  , setToStringTag = __webpack_require__(39)
	  , getProto       = __webpack_require__(18).getProto
	  , ITERATOR       = __webpack_require__(40)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';

	var returnThis = function(){ return this; };

	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , methods, key;
	  // Fix native
	  if($native){
	    var IteratorPrototype = getProto($default.call(new Base));
	    // Set @@toStringTag to native iterators
	    setToStringTag(IteratorPrototype, TAG, true);
	    // FF fix
	    if(!LIBRARY && has(proto, FF_ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    // fix Array#{values, @@iterator}.name in V8 / FF
	    if(DEF_VALUES && $native.name !== VALUES){
	      VALUES_BUG = true;
	      $default = function values(){ return $native.call(this); };
	    }
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES  ? $default : getMethod(VALUES),
	      keys:    IS_SET      ? $default : getMethod(KEYS),
	      entries: !DEF_VALUES ? $default : getMethod('entries')
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(34);

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(18)
	  , createDesc = __webpack_require__(35);
	module.exports = __webpack_require__(36) ? function(object, key, value){
	  return $.setDesc(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(13)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 37 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $              = __webpack_require__(18)
	  , descriptor     = __webpack_require__(35)
	  , setToStringTag = __webpack_require__(39)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(34)(IteratorPrototype, __webpack_require__(40)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = $.create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(18).setDesc
	  , has = __webpack_require__(37)
	  , TAG = __webpack_require__(40)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var store  = __webpack_require__(41)('wks')
	  , uid    = __webpack_require__(42)
	  , Symbol = __webpack_require__(9).Symbol;
	module.exports = function(name){
	  return store[name] || (store[name] =
	    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(9)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 42 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(44)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(31)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(45)
	  , defined   = __webpack_require__(6);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 45 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(47)
	  , ITERATOR  = __webpack_require__(40)('iterator')
	  , Iterators = __webpack_require__(29);
	module.exports = __webpack_require__(10).isIterable = function(it){
	  var O = Object(it);
	  return O[ITERATOR] !== undefined
	    || '@@iterator' in O
	    || Iterators.hasOwnProperty(classof(O));
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(20)
	  , TAG = __webpack_require__(40)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(49), __esModule: true };

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(25);
	__webpack_require__(43);
	module.exports = __webpack_require__(50);

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(51)
	  , get      = __webpack_require__(53);
	module.exports = __webpack_require__(10).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(52);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 52 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(47)
	  , ITERATOR  = __webpack_require__(40)('iterator')
	  , Iterators = __webpack_require__(29);
	module.exports = __webpack_require__(10).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var createObjectMapper = __webpack_require__(55);

	/**
	 * Creates an object with the same keys as `object` and values generated by
	 * running each own enumerable property of `object` through `iteratee`. The
	 * iteratee function is bound to `thisArg` and invoked with three arguments:
	 * (value, key, object).
	 *
	 * If a property name is provided for `iteratee` the created `_.property`
	 * style callback returns the property value of the given element.
	 *
	 * If a value is also provided for `thisArg` the created `_.matchesProperty`
	 * style callback returns `true` for elements that have a matching property
	 * value, else `false`.
	 *
	 * If an object is provided for `iteratee` the created `_.matches` style
	 * callback returns `true` for elements that have the properties of the given
	 * object, else `false`.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to iterate over.
	 * @param {Function|Object|string} [iteratee=_.identity] The function invoked
	 *  per iteration.
	 * @param {*} [thisArg] The `this` binding of `iteratee`.
	 * @returns {Object} Returns the new mapped object.
	 * @example
	 *
	 * _.mapValues({ 'a': 1, 'b': 2 }, function(n) {
	 *   return n * 3;
	 * });
	 * // => { 'a': 3, 'b': 6 }
	 *
	 * var users = {
	 *   'fred':    { 'user': 'fred',    'age': 40 },
	 *   'pebbles': { 'user': 'pebbles', 'age': 1 }
	 * };
	 *
	 * // using the `_.property` callback shorthand
	 * _.mapValues(users, 'age');
	 * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
	 */
	var mapValues = createObjectMapper();

	module.exports = mapValues;


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var baseCallback = __webpack_require__(56),
	    baseForOwn = __webpack_require__(96);

	/**
	 * Creates a function for `_.mapKeys` or `_.mapValues`.
	 *
	 * @private
	 * @param {boolean} [isMapKeys] Specify mapping keys instead of values.
	 * @returns {Function} Returns the new map function.
	 */
	function createObjectMapper(isMapKeys) {
	  return function(object, iteratee, thisArg) {
	    var result = {};
	    iteratee = baseCallback(iteratee, thisArg, 3);

	    baseForOwn(object, function(value, key, object) {
	      var mapped = iteratee(value, key, object);
	      key = isMapKeys ? mapped : key;
	      value = isMapKeys ? value : mapped;
	      result[key] = value;
	    });
	    return result;
	  };
	}

	module.exports = createObjectMapper;


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var baseMatches = __webpack_require__(57),
	    baseMatchesProperty = __webpack_require__(85),
	    bindCallback = __webpack_require__(92),
	    identity = __webpack_require__(93),
	    property = __webpack_require__(94);

	/**
	 * The base implementation of `_.callback` which supports specifying the
	 * number of arguments to provide to `func`.
	 *
	 * @private
	 * @param {*} [func=_.identity] The value to convert to a callback.
	 * @param {*} [thisArg] The `this` binding of `func`.
	 * @param {number} [argCount] The number of arguments to provide to `func`.
	 * @returns {Function} Returns the callback.
	 */
	function baseCallback(func, thisArg, argCount) {
	  var type = typeof func;
	  if (type == 'function') {
	    return thisArg === undefined
	      ? func
	      : bindCallback(func, thisArg, argCount);
	  }
	  if (func == null) {
	    return identity;
	  }
	  if (type == 'object') {
	    return baseMatches(func);
	  }
	  return thisArg === undefined
	    ? property(func)
	    : baseMatchesProperty(func, thisArg);
	}

	module.exports = baseCallback;


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsMatch = __webpack_require__(58),
	    getMatchData = __webpack_require__(82),
	    toObject = __webpack_require__(81);

	/**
	 * The base implementation of `_.matches` which does not clone `source`.
	 *
	 * @private
	 * @param {Object} source The object of property values to match.
	 * @returns {Function} Returns the new function.
	 */
	function baseMatches(source) {
	  var matchData = getMatchData(source);
	  if (matchData.length == 1 && matchData[0][2]) {
	    var key = matchData[0][0],
	        value = matchData[0][1];

	    return function(object) {
	      if (object == null) {
	        return false;
	      }
	      return object[key] === value && (value !== undefined || (key in toObject(object)));
	    };
	  }
	  return function(object) {
	    return baseIsMatch(object, matchData);
	  };
	}

	module.exports = baseMatches;


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqual = __webpack_require__(59),
	    toObject = __webpack_require__(81);

	/**
	 * The base implementation of `_.isMatch` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Object} object The object to inspect.
	 * @param {Array} matchData The propery names, values, and compare flags to match.
	 * @param {Function} [customizer] The function to customize comparing objects.
	 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	 */
	function baseIsMatch(object, matchData, customizer) {
	  var index = matchData.length,
	      length = index,
	      noCustomizer = !customizer;

	  if (object == null) {
	    return !length;
	  }
	  object = toObject(object);
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
	      var result = customizer ? customizer(objValue, srcValue, key) : undefined;
	      if (!(result === undefined ? baseIsEqual(srcValue, objValue, customizer, true) : result)) {
	        return false;
	      }
	    }
	  }
	  return true;
	}

	module.exports = baseIsMatch;


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqualDeep = __webpack_require__(60),
	    isObject = __webpack_require__(69),
	    isObjectLike = __webpack_require__(70);

	/**
	 * The base implementation of `_.isEqual` without support for `this` binding
	 * `customizer` functions.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {Function} [customizer] The function to customize comparing values.
	 * @param {boolean} [isLoose] Specify performing partial comparisons.
	 * @param {Array} [stackA] Tracks traversed `value` objects.
	 * @param {Array} [stackB] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 */
	function baseIsEqual(value, other, customizer, isLoose, stackA, stackB) {
	  if (value === other) {
	    return true;
	  }
	  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
	    return value !== value && other !== other;
	  }
	  return baseIsEqualDeep(value, other, baseIsEqual, customizer, isLoose, stackA, stackB);
	}

	module.exports = baseIsEqual;


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var equalArrays = __webpack_require__(61),
	    equalByTag = __webpack_require__(63),
	    equalObjects = __webpack_require__(64),
	    isArray = __webpack_require__(77),
	    isTypedArray = __webpack_require__(80);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    objectTag = '[object Object]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * A specialized version of `baseIsEqual` for arrays and objects which performs
	 * deep comparisons and tracks traversed objects enabling objects with circular
	 * references to be compared.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparing objects.
	 * @param {boolean} [isLoose] Specify performing partial comparisons.
	 * @param {Array} [stackA=[]] Tracks traversed `value` objects.
	 * @param {Array} [stackB=[]] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseIsEqualDeep(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
	  var objIsArr = isArray(object),
	      othIsArr = isArray(other),
	      objTag = arrayTag,
	      othTag = arrayTag;

	  if (!objIsArr) {
	    objTag = objToString.call(object);
	    if (objTag == argsTag) {
	      objTag = objectTag;
	    } else if (objTag != objectTag) {
	      objIsArr = isTypedArray(object);
	    }
	  }
	  if (!othIsArr) {
	    othTag = objToString.call(other);
	    if (othTag == argsTag) {
	      othTag = objectTag;
	    } else if (othTag != objectTag) {
	      othIsArr = isTypedArray(other);
	    }
	  }
	  var objIsObj = objTag == objectTag,
	      othIsObj = othTag == objectTag,
	      isSameTag = objTag == othTag;

	  if (isSameTag && !(objIsArr || objIsObj)) {
	    return equalByTag(object, other, objTag);
	  }
	  if (!isLoose) {
	    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

	    if (objIsWrapped || othIsWrapped) {
	      return equalFunc(objIsWrapped ? object.value() : object, othIsWrapped ? other.value() : other, customizer, isLoose, stackA, stackB);
	    }
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  // Assume cyclic values are equal.
	  // For more information on detecting circular references see https://es5.github.io/#JO.
	  stackA || (stackA = []);
	  stackB || (stackB = []);

	  var length = stackA.length;
	  while (length--) {
	    if (stackA[length] == object) {
	      return stackB[length] == other;
	    }
	  }
	  // Add `object` and `other` to the stack of traversed objects.
	  stackA.push(object);
	  stackB.push(other);

	  var result = (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, customizer, isLoose, stackA, stackB);

	  stackA.pop();
	  stackB.pop();

	  return result;
	}

	module.exports = baseIsEqualDeep;


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var arraySome = __webpack_require__(62);

	/**
	 * A specialized version of `baseIsEqualDeep` for arrays with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Array} array The array to compare.
	 * @param {Array} other The other array to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparing arrays.
	 * @param {boolean} [isLoose] Specify performing partial comparisons.
	 * @param {Array} [stackA] Tracks traversed `value` objects.
	 * @param {Array} [stackB] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	 */
	function equalArrays(array, other, equalFunc, customizer, isLoose, stackA, stackB) {
	  var index = -1,
	      arrLength = array.length,
	      othLength = other.length;

	  if (arrLength != othLength && !(isLoose && othLength > arrLength)) {
	    return false;
	  }
	  // Ignore non-index properties.
	  while (++index < arrLength) {
	    var arrValue = array[index],
	        othValue = other[index],
	        result = customizer ? customizer(isLoose ? othValue : arrValue, isLoose ? arrValue : othValue, index) : undefined;

	    if (result !== undefined) {
	      if (result) {
	        continue;
	      }
	      return false;
	    }
	    // Recursively compare arrays (susceptible to call stack limits).
	    if (isLoose) {
	      if (!arraySome(other, function(othValue) {
	            return arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB);
	          })) {
	        return false;
	      }
	    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB))) {
	      return false;
	    }
	  }
	  return true;
	}

	module.exports = equalArrays;


/***/ },
/* 62 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.some` for arrays without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check,
	 *  else `false`.
	 */
	function arraySome(array, predicate) {
	  var index = -1,
	      length = array.length;

	  while (++index < length) {
	    if (predicate(array[index], index, array)) {
	      return true;
	    }
	  }
	  return false;
	}

	module.exports = arraySome;


/***/ },
/* 63 */
/***/ function(module, exports) {

	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    stringTag = '[object String]';

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
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalByTag(object, other, tag) {
	  switch (tag) {
	    case boolTag:
	    case dateTag:
	      // Coerce dates and booleans to numbers, dates to milliseconds and booleans
	      // to `1` or `0` treating invalid dates coerced to `NaN` as not equal.
	      return +object == +other;

	    case errorTag:
	      return object.name == other.name && object.message == other.message;

	    case numberTag:
	      // Treat `NaN` vs. `NaN` as equal.
	      return (object != +object)
	        ? other != +other
	        : object == +other;

	    case regexpTag:
	    case stringTag:
	      // Coerce regexes to strings and treat strings primitives and string
	      // objects as equal. See https://es5.github.io/#x15.10.6.4 for more details.
	      return object == (other + '');
	  }
	  return false;
	}

	module.exports = equalByTag;


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var keys = __webpack_require__(65);

	/** Used for native method references. */
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
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparing values.
	 * @param {boolean} [isLoose] Specify performing partial comparisons.
	 * @param {Array} [stackA] Tracks traversed `value` objects.
	 * @param {Array} [stackB] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalObjects(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
	  var objProps = keys(object),
	      objLength = objProps.length,
	      othProps = keys(other),
	      othLength = othProps.length;

	  if (objLength != othLength && !isLoose) {
	    return false;
	  }
	  var index = objLength;
	  while (index--) {
	    var key = objProps[index];
	    if (!(isLoose ? key in other : hasOwnProperty.call(other, key))) {
	      return false;
	    }
	  }
	  var skipCtor = isLoose;
	  while (++index < objLength) {
	    key = objProps[index];
	    var objValue = object[key],
	        othValue = other[key],
	        result = customizer ? customizer(isLoose ? othValue : objValue, isLoose? objValue : othValue, key) : undefined;

	    // Recursively compare objects (susceptible to call stack limits).
	    if (!(result === undefined ? equalFunc(objValue, othValue, customizer, isLoose, stackA, stackB) : result)) {
	      return false;
	    }
	    skipCtor || (skipCtor = key == 'constructor');
	  }
	  if (!skipCtor) {
	    var objCtor = object.constructor,
	        othCtor = other.constructor;

	    // Non `Object` object instances with different constructors are not equal.
	    if (objCtor != othCtor &&
	        ('constructor' in object && 'constructor' in other) &&
	        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
	          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	      return false;
	    }
	  }
	  return true;
	}

	module.exports = equalObjects;


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(66),
	    isArrayLike = __webpack_require__(71),
	    isObject = __webpack_require__(69),
	    shimKeys = __webpack_require__(75);

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeKeys = getNative(Object, 'keys');

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
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
	var keys = !nativeKeys ? shimKeys : function(object) {
	  var Ctor = object == null ? undefined : object.constructor;
	  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
	      (typeof object != 'function' && isArrayLike(object))) {
	    return shimKeys(object);
	  }
	  return isObject(object) ? nativeKeys(object) : [];
	};

	module.exports = keys;


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var isNative = __webpack_require__(67);

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object == null ? undefined : object[key];
	  return isNative(value) ? value : undefined;
	}

	module.exports = getNative;


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(68),
	    isObjectLike = __webpack_require__(70);

	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (isFunction(value)) {
	    return reIsNative.test(fnToString.call(value));
	  }
	  return isObjectLike(value) && reIsHostCtor.test(value);
	}

	module.exports = isNative;


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(69);

	/** `Object#toString` result references. */
	var funcTag = '[object Function]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in older versions of Chrome and Safari which return 'function' for regexes
	  // and Safari 8 which returns 'object' for typed array constructors.
	  return isObject(value) && objToString.call(value) == funcTag;
	}

	module.exports = isFunction;


/***/ },
/* 69 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
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
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	module.exports = isObject;


/***/ },
/* 70 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(72),
	    isLength = __webpack_require__(74);

	/**
	 * Checks if `value` is array-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value));
	}

	module.exports = isArrayLike;


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(73);

	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');

	module.exports = getLength;


/***/ },
/* 73 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}

	module.exports = baseProperty;


/***/ },
/* 74 */
/***/ function(module, exports) {

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	module.exports = isLength;


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var isArguments = __webpack_require__(76),
	    isArray = __webpack_require__(77),
	    isIndex = __webpack_require__(78),
	    isLength = __webpack_require__(74),
	    keysIn = __webpack_require__(79);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A fallback implementation of `Object.keys` which creates an array of the
	 * own enumerable property names of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function shimKeys(object) {
	  var props = keysIn(object),
	      propsLength = props.length,
	      length = propsLength && object.length;

	  var allowIndexes = !!length && isLength(length) &&
	    (isArray(object) || isArguments(object));

	  var index = -1,
	      result = [];

	  while (++index < propsLength) {
	    var key = props[index];
	    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = shimKeys;


/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(71),
	    isObjectLike = __webpack_require__(70);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Native method references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * Checks if `value` is classified as an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  return isObjectLike(value) && isArrayLike(value) &&
	    hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
	}

	module.exports = isArguments;


/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(66),
	    isLength = __webpack_require__(74),
	    isObjectLike = __webpack_require__(70);

	/** `Object#toString` result references. */
	var arrayTag = '[object Array]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeIsArray = getNative(Array, 'isArray');

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(function() { return arguments; }());
	 * // => false
	 */
	var isArray = nativeIsArray || function(value) {
	  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
	};

	module.exports = isArray;


/***/ },
/* 78 */
/***/ function(module, exports) {

	/** Used to detect unsigned integer values. */
	var reIsUint = /^\d+$/;

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return value > -1 && value % 1 == 0 && value < length;
	}

	module.exports = isIndex;


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var isArguments = __webpack_require__(76),
	    isArray = __webpack_require__(77),
	    isIndex = __webpack_require__(78),
	    isLength = __webpack_require__(74),
	    isObject = __webpack_require__(69);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
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
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  if (object == null) {
	    return [];
	  }
	  if (!isObject(object)) {
	    object = Object(object);
	  }
	  var length = object.length;
	  length = (length && isLength(length) &&
	    (isArray(object) || isArguments(object)) && length) || 0;

	  var Ctor = object.constructor,
	      index = -1,
	      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
	      result = Array(length),
	      skipIndexes = length > 0;

	  while (++index < length) {
	    result[index] = (index + '');
	  }
	  for (var key in object) {
	    if (!(skipIndexes && isIndex(key, length)) &&
	        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = keysIn;


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var isLength = __webpack_require__(74),
	    isObjectLike = __webpack_require__(70);

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
	typedArrayTags[dateTag] = typedArrayTags[errorTag] =
	typedArrayTags[funcTag] = typedArrayTags[mapTag] =
	typedArrayTags[numberTag] = typedArrayTags[objectTag] =
	typedArrayTags[regexpTag] = typedArrayTags[setTag] =
	typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	function isTypedArray(value) {
	  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objToString.call(value)];
	}

	module.exports = isTypedArray;


/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(69);

	/**
	 * Converts `value` to an object if it's not one.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {Object} Returns the object.
	 */
	function toObject(value) {
	  return isObject(value) ? value : Object(value);
	}

	module.exports = toObject;


/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var isStrictComparable = __webpack_require__(83),
	    pairs = __webpack_require__(84);

	/**
	 * Gets the propery names, values, and compare flags of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the match data of `object`.
	 */
	function getMatchData(object) {
	  var result = pairs(object),
	      length = result.length;

	  while (length--) {
	    result[length][2] = isStrictComparable(result[length][1]);
	  }
	  return result;
	}

	module.exports = getMatchData;


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(69);

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


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var keys = __webpack_require__(65),
	    toObject = __webpack_require__(81);

	/**
	 * Creates a two dimensional array of the key-value pairs for `object`,
	 * e.g. `[[key1, value1], [key2, value2]]`.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the new array of key-value pairs.
	 * @example
	 *
	 * _.pairs({ 'barney': 36, 'fred': 40 });
	 * // => [['barney', 36], ['fred', 40]] (iteration order is not guaranteed)
	 */
	function pairs(object) {
	  object = toObject(object);

	  var index = -1,
	      props = keys(object),
	      length = props.length,
	      result = Array(length);

	  while (++index < length) {
	    var key = props[index];
	    result[index] = [key, object[key]];
	  }
	  return result;
	}

	module.exports = pairs;


/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(86),
	    baseIsEqual = __webpack_require__(59),
	    baseSlice = __webpack_require__(87),
	    isArray = __webpack_require__(77),
	    isKey = __webpack_require__(88),
	    isStrictComparable = __webpack_require__(83),
	    last = __webpack_require__(89),
	    toObject = __webpack_require__(81),
	    toPath = __webpack_require__(90);

	/**
	 * The base implementation of `_.matchesProperty` which does not clone `srcValue`.
	 *
	 * @private
	 * @param {string} path The path of the property to get.
	 * @param {*} srcValue The value to compare.
	 * @returns {Function} Returns the new function.
	 */
	function baseMatchesProperty(path, srcValue) {
	  var isArr = isArray(path),
	      isCommon = isKey(path) && isStrictComparable(srcValue),
	      pathKey = (path + '');

	  path = toPath(path);
	  return function(object) {
	    if (object == null) {
	      return false;
	    }
	    var key = pathKey;
	    object = toObject(object);
	    if ((isArr || !isCommon) && !(key in object)) {
	      object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
	      if (object == null) {
	        return false;
	      }
	      key = last(path);
	      object = toObject(object);
	    }
	    return object[key] === srcValue
	      ? (srcValue !== undefined || (key in object))
	      : baseIsEqual(srcValue, object[key], undefined, true);
	  };
	}

	module.exports = baseMatchesProperty;


/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	var toObject = __webpack_require__(81);

	/**
	 * The base implementation of `get` without support for string paths
	 * and default values.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} path The path of the property to get.
	 * @param {string} [pathKey] The key representation of path.
	 * @returns {*} Returns the resolved value.
	 */
	function baseGet(object, path, pathKey) {
	  if (object == null) {
	    return;
	  }
	  if (pathKey !== undefined && pathKey in toObject(object)) {
	    path = [pathKey];
	  }
	  var index = 0,
	      length = path.length;

	  while (object != null && index < length) {
	    object = object[path[index++]];
	  }
	  return (index && index == length) ? object : undefined;
	}

	module.exports = baseGet;


/***/ },
/* 87 */
/***/ function(module, exports) {

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

	  start = start == null ? 0 : (+start || 0);
	  if (start < 0) {
	    start = -start > length ? 0 : (length + start);
	  }
	  end = (end === undefined || end > length) ? length : (+end || 0);
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


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(77),
	    toObject = __webpack_require__(81);

	/** Used to match property names within property paths. */
	var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/,
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
	  var type = typeof value;
	  if ((type == 'string' && reIsPlainProp.test(value)) || type == 'number') {
	    return true;
	  }
	  if (isArray(value)) {
	    return false;
	  }
	  var result = !reIsDeepProp.test(value);
	  return result || (object != null && value in toObject(object));
	}

	module.exports = isKey;


/***/ },
/* 89 */
/***/ function(module, exports) {

	/**
	 * Gets the last element of `array`.
	 *
	 * @static
	 * @memberOf _
	 * @category Array
	 * @param {Array} array The array to query.
	 * @returns {*} Returns the last element of `array`.
	 * @example
	 *
	 * _.last([1, 2, 3]);
	 * // => 3
	 */
	function last(array) {
	  var length = array ? array.length : 0;
	  return length ? array[length - 1] : undefined;
	}

	module.exports = last;


/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var baseToString = __webpack_require__(91),
	    isArray = __webpack_require__(77);

	/** Used to match property names within property paths. */
	var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g;

	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;

	/**
	 * Converts `value` to property path array if it's not one.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {Array} Returns the property path array.
	 */
	function toPath(value) {
	  if (isArray(value)) {
	    return value;
	  }
	  var result = [];
	  baseToString(value).replace(rePropName, function(match, number, quote, string) {
	    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
	  });
	  return result;
	}

	module.exports = toPath;


/***/ },
/* 91 */
/***/ function(module, exports) {

	/**
	 * Converts `value` to a string if it's not one. An empty string is returned
	 * for `null` or `undefined` values.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  return value == null ? '' : (value + '');
	}

	module.exports = baseToString;


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(93);

	/**
	 * A specialized version of `baseCallback` which only supports `this` binding
	 * and specifying the number of arguments to provide to `func`.
	 *
	 * @private
	 * @param {Function} func The function to bind.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {number} [argCount] The number of arguments to provide to `func`.
	 * @returns {Function} Returns the callback.
	 */
	function bindCallback(func, thisArg, argCount) {
	  if (typeof func != 'function') {
	    return identity;
	  }
	  if (thisArg === undefined) {
	    return func;
	  }
	  switch (argCount) {
	    case 1: return function(value) {
	      return func.call(thisArg, value);
	    };
	    case 3: return function(value, index, collection) {
	      return func.call(thisArg, value, index, collection);
	    };
	    case 4: return function(accumulator, value, index, collection) {
	      return func.call(thisArg, accumulator, value, index, collection);
	    };
	    case 5: return function(value, other, key, object, source) {
	      return func.call(thisArg, value, other, key, object, source);
	    };
	  }
	  return function() {
	    return func.apply(thisArg, arguments);
	  };
	}

	module.exports = bindCallback;


/***/ },
/* 93 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument provided to it.
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * _.identity(object) === object;
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;


/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(73),
	    basePropertyDeep = __webpack_require__(95),
	    isKey = __webpack_require__(88);

	/**
	 * Creates a function that returns the property value at `path` on a
	 * given object.
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var objects = [
	 *   { 'a': { 'b': { 'c': 2 } } },
	 *   { 'a': { 'b': { 'c': 1 } } }
	 * ];
	 *
	 * _.map(objects, _.property('a.b.c'));
	 * // => [2, 1]
	 *
	 * _.pluck(_.sortBy(objects, _.property(['a', 'b', 'c'])), 'a.b.c');
	 * // => [1, 2]
	 */
	function property(path) {
	  return isKey(path) ? baseProperty(path) : basePropertyDeep(path);
	}

	module.exports = property;


/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(86),
	    toPath = __webpack_require__(90);

	/**
	 * A specialized version of `baseProperty` which supports deep paths.
	 *
	 * @private
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function basePropertyDeep(path) {
	  var pathKey = (path + '');
	  path = toPath(path);
	  return function(object) {
	    return baseGet(object, path, pathKey);
	  };
	}

	module.exports = basePropertyDeep;


/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(97),
	    keys = __webpack_require__(65);

	/**
	 * The base implementation of `_.forOwn` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForOwn(object, iteratee) {
	  return baseFor(object, iteratee, keys);
	}

	module.exports = baseForOwn;


/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	var createBaseFor = __webpack_require__(98);

	/**
	 * The base implementation of `baseForIn` and `baseForOwn` which iterates
	 * over `object` properties returned by `keysFunc` invoking `iteratee` for
	 * each property. Iteratee functions may exit iteration early by explicitly
	 * returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = createBaseFor();

	module.exports = baseFor;


/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	var toObject = __webpack_require__(81);

	/**
	 * Creates a base function for `_.forIn` or `_.forInRight`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function(object, iteratee, keysFunc) {
	    var iterable = toObject(object),
	        props = keysFunc(object),
	        length = props.length,
	        index = fromRight ? length : -1;

	    while ((fromRight ? index-- : ++index < length)) {
	      var key = props[index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}

	module.exports = createBaseFor;


/***/ }
/******/ ]);