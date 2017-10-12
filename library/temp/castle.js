(
  function() {
    var game = {};
    game.commands = {
      "move": 1
    };
    game.graphics = {
      "tiles": {
        "walls": "castle",
        "thrones": "playercolour"
      },
      "icons": {
        "soldiers": "rooks"
      }
    };
    game.board = {
      "width": 19,
      "height": 19,
      "terrain": {
        "walls": [
          ["rect", "c2", "c8"],
          ["rect", "f1", "f6"],
          ["rect", "h2", "h6"],
          ["rect", "l2", "l6"],
          ["rect", "n1", "n6"],
          ["rect", "q2", "q8"],
          ["rect", "c8", "i8"],
          ["rect", "k8", "p8"],
          ["rect", "i6", "k6"], "i2", "k2", ["rect", "c12", "c18"],
          ["rect", "f14", "f19"],
          ["rect", "h14", "h18"],
          ["rect", "l14", "l18"],
          ["rect", "n14", "n19"],
          ["rect", "q12", "q18"],
          ["rect", "c12", "i12"],
          ["rect", "k12", "p12"],
          ["rect", "i14", "k14"], "i18", "k18"
        ],
        "thrones": {
          "1": ["j4"],
          "2": ["j16"]
        }
      }
    };
    game.AI = [];
    game.id = "castle";
    var boardDef = {
      "width": 19,
      "height": 19,
      "terrain": {
        "walls": [
          ["rect", "c2", "c8"],
          ["rect", "f1", "f6"],
          ["rect", "h2", "h6"],
          ["rect", "l2", "l6"],
          ["rect", "n1", "n6"],
          ["rect", "q2", "q8"],
          ["rect", "c8", "i8"],
          ["rect", "k8", "p8"],
          ["rect", "i6", "k6"], "i2", "k2", ["rect", "c12", "c18"],
          ["rect", "f14", "f19"],
          ["rect", "h14", "h18"],
          ["rect", "l14", "l18"],
          ["rect", "n14", "n19"],
          ["rect", "q12", "q18"],
          ["rect", "c12", "i12"],
          ["rect", "k12", "p12"],
          ["rect", "i14", "k14"], "i18", "k18"
        ],
        "thrones": {
          "1": ["j4"],
          "2": ["j16"]
        }
      }
    };
    var connections = boardConnections(boardDef);
    var BOARD = boardLayers(boardDef);
    var relativedirs = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    function reduce(coll, iterator, acc) {
      for (var key in coll) {
        acc = iterator(acc, coll[key], key);
      }
      return acc;
    }
    game.newGame = function() {
      var turnseed = {
        turn: 0
      };
      var stepseed = {
        UNITDATA: deduceInitialUnitData({
          "soldiers": {
            "1": ["f1", "n1", "h2", "l2", "h6", "l6", "c8", "q8"],
            "2": ["f19", "n19", "h18", "l18", "h14", "l14", "c12", "q12"]
          }
        })
      };
      return game.start1(turnseed, stepseed);
    };
    game.debug = function() {
      return {
        BOARD: BOARD,
        connections: connections,
        plr1: game.debug1(),
        plr2: game.debug2()
      };
    };
    (function() {
      var TERRAIN = terrainLayers(boardDef, 1);
      var ownernames = ["neutral", "my", "opp"];
      var player = 1;
      var otherplayer = 2;
      game.selectunit1 = function(turn, step, markpos) {
        var ARTIFACTS = {
          movetargets: Object.assign({}, step.ARTIFACTS.movetargets)
        };
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectunit: markpos
        };
        var STARTPOS = MARKS["selectunit"];
        var neighbourdirs = [1, 3, 5, 7];
        var startconnections = connections[STARTPOS];
        for (var dirnbr = 0; dirnbr < 4; dirnbr++) {
          var POS = startconnections[neighbourdirs[dirnbr]];
          if (POS && ((!!(TERRAIN.walls[STARTPOS]) && !(TERRAIN.walls[POS])) || (!(TERRAIN.walls[STARTPOS]) && !!(TERRAIN.walls[POS])))) {
            if (!UNITLAYERS.myunits[POS]) {
              ARTIFACTS["movetargets"][POS] = {};
            }
          }
        }
        var BLOCKS = UNITLAYERS.units;
        var STARTPOS = MARKS["selectunit"];
        var allowedsteps = (!!(TERRAIN.walls[STARTPOS]) ? TERRAIN.walls :
          (function() {
            var ret = {},
              s0 = TERRAIN.nowalls,
              s1 = TERRAIN.mythrones;
            for (var key in s0) {
              if (!s1[key]) {
                ret[key] = s0[key];
              }
            }
            return ret;
          }()));
        var allwalkerdirs = [1, 3, 5, 7];
        for (var walkerdirnbr = 0; walkerdirnbr < 4; walkerdirnbr++) {
          var STOPREASON = "";
          var POS = STARTPOS;
          while (!(STOPREASON = (!(POS = connections[POS][allwalkerdirs[walkerdirnbr]]) ? "outofbounds" : !allowedsteps[POS] ? "nomoresteps" : BLOCKS[POS] ? "hitblock" : null))) {
            ARTIFACTS["movetargets"][POS] = {};
          }
          if (BLOCKS[POS] && allowedsteps[POS]) {
            if (UNITLAYERS.oppunits[POS]) {
              ARTIFACTS["movetargets"][POS] = {};
            }
          }
        }
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectunit'
        });
        turn.links[newstepid] = {};
        var newlinks = turn.links[newstepid];
        for (var linkpos in ARTIFACTS.movetargets) {
          newlinks[linkpos] = 'selectmovetarget1';
        }
        return newstep;
      };
      game.selectunit1instruction = function(turn, step) {
        return {
          type: 'text',
          text: ""
        };
      };
      game.selectmovetarget1 = function(turn, step, markpos) {
        var MARKS = {
          selectmovetarget: markpos,
          selectunit: step.MARKS.selectunit
        };
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectmovetarget'
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].move = 'move1';
        return newstep;
      };
      game.selectmovetarget1instruction = function(turn, step) {
        return {
          type: 'text',
          text: ""
        };
      };
      game.move1 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var UNITLAYERS = step.UNITLAYERS;
        var unitid = (UNITLAYERS.units[MARKS["selectunit"]]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            "pos": MARKS["selectmovetarget"]
          });
          delete UNITDATA[(UNITLAYERS.units[MARKS["selectmovetarget"]]  || {}).id];
        }
        MARKS = {};
        UNITLAYERS = {
          "soldiers": {},
          "mysoldiers": {},
          "oppsoldiers": {},
          "neutralsoldiers": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        ARTIFACTS = {
          "movetargets": {}
        };
        var newstepid = step.stepid + '-' + 'move';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'move',
          path: step.path.concat('move')
        });
        turn.links[newstepid] = {};
        if (Object.keys(
            (function() {
              var ret = {},
                s0 = UNITLAYERS.myunits,
                s1 = TERRAIN.oppthrones;
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }())).length !== 0) {
          var winner = 1;
          var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'infiltration';
        } else
        if (Object.keys(UNITLAYERS.oppunits).length === 0) {
          var winner = 1;
          var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'genocide';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.move1instruction = function(turn, step) {
        return {
          type: 'text',
          text: ""
        };
      };
      game.start1 = function(turn, step) {
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
          "soldiers": {},
          "mysoldiers": {},
          "oppsoldiers": {},
          "neutralsoldiers": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        var newstep = turn.steps.root = {
          ARTIFACTS: ARTIFACTS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          MARKS: MARKS,
          stepid: 'root',
          name: 'start',
          path: []
        };
        var newlinks = turn.links.root;
        for (var linkpos in UNITLAYERS.myunits) {
          newlinks[linkpos] = 'selectunit1';
        }
        return turn;
      }
      game.start1instruction = function(turn, step) {
        return {
          type: 'text',
          text: ""
        };
      };
      game.debug1 = function() {
        return {
          TERRAIN: TERRAIN
        };
      }
    })();
    (function() {
      var TERRAIN = terrainLayers(boardDef, 2);
      var ownernames = ["neutral", "opp", "my"];
      var player = 2;
      var otherplayer = 1;
      game.selectunit2 = function(turn, step, markpos) {
        var ARTIFACTS = {
          movetargets: Object.assign({}, step.ARTIFACTS.movetargets)
        };
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectunit: markpos
        };
        var STARTPOS = MARKS["selectunit"];
        var neighbourdirs = [1, 3, 5, 7];
        var startconnections = connections[STARTPOS];
        for (var dirnbr = 0; dirnbr < 4; dirnbr++) {
          var POS = startconnections[neighbourdirs[dirnbr]];
          if (POS && ((!!(TERRAIN.walls[STARTPOS]) && !(TERRAIN.walls[POS])) || (!(TERRAIN.walls[STARTPOS]) && !!(TERRAIN.walls[POS])))) {
            if (!UNITLAYERS.myunits[POS]) {
              ARTIFACTS["movetargets"][POS] = {};
            }
          }
        }
        var BLOCKS = UNITLAYERS.units;
        var STARTPOS = MARKS["selectunit"];
        var allowedsteps = (!!(TERRAIN.walls[STARTPOS]) ? TERRAIN.walls :
          (function() {
            var ret = {},
              s0 = TERRAIN.nowalls,
              s1 = TERRAIN.mythrones;
            for (var key in s0) {
              if (!s1[key]) {
                ret[key] = s0[key];
              }
            }
            return ret;
          }()));
        var allwalkerdirs = [1, 3, 5, 7];
        for (var walkerdirnbr = 0; walkerdirnbr < 4; walkerdirnbr++) {
          var STOPREASON = "";
          var POS = STARTPOS;
          while (!(STOPREASON = (!(POS = connections[POS][allwalkerdirs[walkerdirnbr]]) ? "outofbounds" : !allowedsteps[POS] ? "nomoresteps" : BLOCKS[POS] ? "hitblock" : null))) {
            ARTIFACTS["movetargets"][POS] = {};
          }
          if (BLOCKS[POS] && allowedsteps[POS]) {
            if (UNITLAYERS.oppunits[POS]) {
              ARTIFACTS["movetargets"][POS] = {};
            }
          }
        }
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectunit'
        });
        turn.links[newstepid] = {};
        var newlinks = turn.links[newstepid];
        for (var linkpos in ARTIFACTS.movetargets) {
          newlinks[linkpos] = 'selectmovetarget2';
        }
        return newstep;
      };
      game.selectunit2instruction = function(turn, step) {
        return {
          type: 'text',
          text: ""
        };
      };
      game.selectmovetarget2 = function(turn, step, markpos) {
        var MARKS = {
          selectmovetarget: markpos,
          selectunit: step.MARKS.selectunit
        };
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectmovetarget'
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].move = 'move2';
        return newstep;
      };
      game.selectmovetarget2instruction = function(turn, step) {
        return {
          type: 'text',
          text: ""
        };
      };
      game.move2 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var UNITLAYERS = step.UNITLAYERS;
        var unitid = (UNITLAYERS.units[MARKS["selectunit"]]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            "pos": MARKS["selectmovetarget"]
          });
          delete UNITDATA[(UNITLAYERS.units[MARKS["selectmovetarget"]]  || {}).id];
        }
        MARKS = {};
        UNITLAYERS = {
          "soldiers": {},
          "mysoldiers": {},
          "oppsoldiers": {},
          "neutralsoldiers": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        ARTIFACTS = {
          "movetargets": {}
        };
        var newstepid = step.stepid + '-' + 'move';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'move',
          path: step.path.concat('move')
        });
        turn.links[newstepid] = {};
        if (Object.keys(
            (function() {
              var ret = {},
                s0 = UNITLAYERS.myunits,
                s1 = TERRAIN.oppthrones;
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }())).length !== 0) {
          var winner = 2;
          var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'infiltration';
        } else
        if (Object.keys(UNITLAYERS.oppunits).length === 0) {
          var winner = 2;
          var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'genocide';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.move2instruction = function(turn, step) {
        return {
          type: 'text',
          text: ""
        };
      };
      game.start2 = function(turn, step) {
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
          "soldiers": {},
          "mysoldiers": {},
          "oppsoldiers": {},
          "neutralsoldiers": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        var newstep = turn.steps.root = {
          ARTIFACTS: ARTIFACTS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          MARKS: MARKS,
          stepid: 'root',
          name: 'start',
          path: []
        };
        var newlinks = turn.links.root;
        for (var linkpos in UNITLAYERS.myunits) {
          newlinks[linkpos] = 'selectunit2';
        }
        return turn;
      }
      game.start2instruction = function(turn, step) {
        return {
          type: 'text',
          text: ""
        };
      };
      game.debug2 = function() {
        return {
          TERRAIN: TERRAIN
        };
      }
    })();
    return game;
  }
)()