(
  function() {
    var game = {};
    game.commands = {};
    game.graphics = {
      "icons": {
        "stepsfirsts": "queens",
        "blocksfirsts": "queens",
        "defaultfirsts": "queens",
        "noblocks": "queens",
        "pawns": "pawns"
      },
      "tiles": {
        "steps": "grass"
      }
    };
    game.board = {
      "height": 10,
      "width": 10,
      "terrain": {
        "steps": [
          ["rect", "a1", "d4"]
        ]
      }
    };
    game.AI = [];
    game.id = "_test";
    var boardDef = {
      "height": 10,
      "width": 10,
      "terrain": {
        "steps": [
          ["rect", "a1", "d4"]
        ]
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
          "stepsfirsts": {
            "1": ["a3"]
          },
          "blocksfirsts": {
            "1": ["b3"]
          },
          "defaultfirsts": {
            "1": ["c3"]
          },
          "noblocks": {
            "1": ["d3"]
          },
          "pawns": {
            "2": ["a1", "a5", "b1", "b5", "c1", "c5", "d1", "d5"]
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
          marks: Object.assign({}, step.ARTIFACTS.marks),
          blocks: Object.assign({}, step.ARTIFACTS.blocks)
        };
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectunit: markpos
        };
        var allowedsteps = TERRAIN.steps;
        var BLOCKS = UNITLAYERS.units;
        var walkstarts =
          (function() {
            var ret = {},
              s0 = UNITLAYERS.mystepsfirsts,
              s1 =
              (function() {
                var ret = {};
                ret[MARKS['selectunit']] = 1;
                return ret;
              }());
            for (var key in s0) {
              if (s1[key]) {
                ret[key] = s0[key];
              }
            }
            return ret;
          }());
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 5];
          for (var walkerdirnbr = 0; walkerdirnbr < 2; walkerdirnbr++) {
            var STOPREASON = "";
            var POS = STARTPOS;
            while (!(STOPREASON = (!(POS = connections[POS][allwalkerdirs[walkerdirnbr]]) ? "outofbounds" : !allowedsteps[POS] ? "nomoresteps" : BLOCKS[POS] ? "hitblock" : null))) {
              ARTIFACTS['marks'][POS] = {};
            }
            if (BLOCKS[POS] && allowedsteps[POS]) {
              ARTIFACTS['blocks'][POS] = {};
            }
          }
        }
        var allowedsteps = TERRAIN.steps;
        var BLOCKS = UNITLAYERS.units;
        var walkstarts =
          (function() {
            var ret = {},
              s0 = UNITLAYERS.myblocksfirsts,
              s1 =
              (function() {
                var ret = {};
                ret[MARKS['selectunit']] = 1;
                return ret;
              }());
            for (var key in s0) {
              if (s1[key]) {
                ret[key] = s0[key];
              }
            }
            return ret;
          }());
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 5];
          for (var walkerdirnbr = 0; walkerdirnbr < 2; walkerdirnbr++) {
            var STOPREASON = "";
            var POS = STARTPOS;
            while (!(STOPREASON = (!(POS = connections[POS][allwalkerdirs[walkerdirnbr]]) ? "outofbounds" : BLOCKS[POS] ? "hitblock" : !allowedsteps[POS] ? "nomoresteps" : null))) {
              ARTIFACTS['marks'][POS] = {};
            }
            if (BLOCKS[POS]) {
              ARTIFACTS['blocks'][POS] = {};
            }
          }
        }
        var allowedsteps = TERRAIN.steps;
        var BLOCKS = UNITLAYERS.units;
        var walkstarts =
          (function() {
            var ret = {},
              s0 = UNITLAYERS.mydefaultfirsts,
              s1 =
              (function() {
                var ret = {};
                ret[MARKS['selectunit']] = 1;
                return ret;
              }());
            for (var key in s0) {
              if (s1[key]) {
                ret[key] = s0[key];
              }
            }
            return ret;
          }());
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 5];
          for (var walkerdirnbr = 0; walkerdirnbr < 2; walkerdirnbr++) {
            var STOPREASON = "";
            var POS = STARTPOS;
            while (!(STOPREASON = (!(POS = connections[POS][allwalkerdirs[walkerdirnbr]]) ? "outofbounds" : !allowedsteps[POS] ? "nomoresteps" : BLOCKS[POS] ? "hitblock" : null))) {
              ARTIFACTS['marks'][POS] = {};
            }
            if (BLOCKS[POS] && allowedsteps[POS]) {
              ARTIFACTS['blocks'][POS] = {};
            }
          }
        }
        var allowedsteps = TERRAIN.steps;
        var BLOCKS = UNITLAYERS.units;
        var walkstarts =
          (function() {
            var ret = {},
              s0 = UNITLAYERS.mynoblocks,
              s1 =
              (function() {
                var ret = {};
                ret[MARKS['selectunit']] = 1;
                return ret;
              }());
            for (var key in s0) {
              if (s1[key]) {
                ret[key] = s0[key];
              }
            }
            return ret;
          }());
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 5];
          for (var walkerdirnbr = 0; walkerdirnbr < 2; walkerdirnbr++) {
            var POS = STARTPOS;
            while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && allowedsteps[POS] && !BLOCKS[POS]) {
              ARTIFACTS['marks'][POS] = {};
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
        for (var linkpos in
            (function() {
              var k, ret = {},
                s0 = ARTIFACTS.marks,
                s1 = ARTIFACTS.blocks;
              for (k in s0) {
                ret[k] = 1;
              }
              for (k in s1) {
                ret[k] = 1;
              }
              return ret;
            }())) {
          newlinks[linkpos] = 'selectmark1';
        }
        return newstep;
      };
      game.selectunit1instruction = function(turn, step) {
        return '';
      };
      game.selectmark1 = function(turn, step, markpos) {
        var MARKS = {
          selectmark: markpos,
          selectunit: step.MARKS.selectunit
        };
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectmark'
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      };
      game.selectmark1instruction = function(turn, step) {
        return '';
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
          "marks": {},
          "blocks": {}
        };
        var UNITDATA = step.UNITDATA;
        var UNITLAYERS = {
          "stepsfirsts": {},
          "mystepsfirsts": {},
          "oppstepsfirsts": {},
          "neutralstepsfirsts": {},
          "blocksfirsts": {},
          "myblocksfirsts": {},
          "oppblocksfirsts": {},
          "neutralblocksfirsts": {},
          "defaultfirsts": {},
          "mydefaultfirsts": {},
          "oppdefaultfirsts": {},
          "neutraldefaultfirsts": {},
          "noblocks": {},
          "mynoblocks": {},
          "oppnoblocks": {},
          "neutralnoblocks": {},
          "pawns": {},
          "mypawns": {},
          "opppawns": {},
          "neutralpawns": {},
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
        return '';
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
          marks: Object.assign({}, step.ARTIFACTS.marks),
          blocks: Object.assign({}, step.ARTIFACTS.blocks)
        };
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectunit: markpos
        };
        var allowedsteps = TERRAIN.steps;
        var BLOCKS = UNITLAYERS.units;
        var walkstarts =
          (function() {
            var ret = {},
              s0 = UNITLAYERS.mystepsfirsts,
              s1 =
              (function() {
                var ret = {};
                ret[MARKS['selectunit']] = 1;
                return ret;
              }());
            for (var key in s0) {
              if (s1[key]) {
                ret[key] = s0[key];
              }
            }
            return ret;
          }());
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 5];
          for (var walkerdirnbr = 0; walkerdirnbr < 2; walkerdirnbr++) {
            var STOPREASON = "";
            var POS = STARTPOS;
            while (!(STOPREASON = (!(POS = connections[POS][allwalkerdirs[walkerdirnbr]]) ? "outofbounds" : !allowedsteps[POS] ? "nomoresteps" : BLOCKS[POS] ? "hitblock" : null))) {
              ARTIFACTS['marks'][POS] = {};
            }
            if (BLOCKS[POS] && allowedsteps[POS]) {
              ARTIFACTS['blocks'][POS] = {};
            }
          }
        }
        var allowedsteps = TERRAIN.steps;
        var BLOCKS = UNITLAYERS.units;
        var walkstarts =
          (function() {
            var ret = {},
              s0 = UNITLAYERS.myblocksfirsts,
              s1 =
              (function() {
                var ret = {};
                ret[MARKS['selectunit']] = 1;
                return ret;
              }());
            for (var key in s0) {
              if (s1[key]) {
                ret[key] = s0[key];
              }
            }
            return ret;
          }());
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 5];
          for (var walkerdirnbr = 0; walkerdirnbr < 2; walkerdirnbr++) {
            var STOPREASON = "";
            var POS = STARTPOS;
            while (!(STOPREASON = (!(POS = connections[POS][allwalkerdirs[walkerdirnbr]]) ? "outofbounds" : BLOCKS[POS] ? "hitblock" : !allowedsteps[POS] ? "nomoresteps" : null))) {
              ARTIFACTS['marks'][POS] = {};
            }
            if (BLOCKS[POS]) {
              ARTIFACTS['blocks'][POS] = {};
            }
          }
        }
        var allowedsteps = TERRAIN.steps;
        var BLOCKS = UNITLAYERS.units;
        var walkstarts =
          (function() {
            var ret = {},
              s0 = UNITLAYERS.mydefaultfirsts,
              s1 =
              (function() {
                var ret = {};
                ret[MARKS['selectunit']] = 1;
                return ret;
              }());
            for (var key in s0) {
              if (s1[key]) {
                ret[key] = s0[key];
              }
            }
            return ret;
          }());
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 5];
          for (var walkerdirnbr = 0; walkerdirnbr < 2; walkerdirnbr++) {
            var STOPREASON = "";
            var POS = STARTPOS;
            while (!(STOPREASON = (!(POS = connections[POS][allwalkerdirs[walkerdirnbr]]) ? "outofbounds" : !allowedsteps[POS] ? "nomoresteps" : BLOCKS[POS] ? "hitblock" : null))) {
              ARTIFACTS['marks'][POS] = {};
            }
            if (BLOCKS[POS] && allowedsteps[POS]) {
              ARTIFACTS['blocks'][POS] = {};
            }
          }
        }
        var allowedsteps = TERRAIN.steps;
        var BLOCKS = UNITLAYERS.units;
        var walkstarts =
          (function() {
            var ret = {},
              s0 = UNITLAYERS.mynoblocks,
              s1 =
              (function() {
                var ret = {};
                ret[MARKS['selectunit']] = 1;
                return ret;
              }());
            for (var key in s0) {
              if (s1[key]) {
                ret[key] = s0[key];
              }
            }
            return ret;
          }());
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 5];
          for (var walkerdirnbr = 0; walkerdirnbr < 2; walkerdirnbr++) {
            var POS = STARTPOS;
            while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && allowedsteps[POS] && !BLOCKS[POS]) {
              ARTIFACTS['marks'][POS] = {};
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
        for (var linkpos in
            (function() {
              var k, ret = {},
                s0 = ARTIFACTS.marks,
                s1 = ARTIFACTS.blocks;
              for (k in s0) {
                ret[k] = 1;
              }
              for (k in s1) {
                ret[k] = 1;
              }
              return ret;
            }())) {
          newlinks[linkpos] = 'selectmark2';
        }
        return newstep;
      };
      game.selectunit2instruction = function(turn, step) {
        return '';
      };
      game.selectmark2 = function(turn, step, markpos) {
        var MARKS = {
          selectmark: markpos,
          selectunit: step.MARKS.selectunit
        };
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectmark'
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      };
      game.selectmark2instruction = function(turn, step) {
        return '';
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
          "marks": {},
          "blocks": {}
        };
        var UNITDATA = step.UNITDATA;
        var UNITLAYERS = {
          "stepsfirsts": {},
          "mystepsfirsts": {},
          "oppstepsfirsts": {},
          "neutralstepsfirsts": {},
          "blocksfirsts": {},
          "myblocksfirsts": {},
          "oppblocksfirsts": {},
          "neutralblocksfirsts": {},
          "defaultfirsts": {},
          "mydefaultfirsts": {},
          "oppdefaultfirsts": {},
          "neutraldefaultfirsts": {},
          "noblocks": {},
          "mynoblocks": {},
          "oppnoblocks": {},
          "neutralnoblocks": {},
          "pawns": {},
          "mypawns": {},
          "opppawns": {},
          "neutralpawns": {},
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
        return '';
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