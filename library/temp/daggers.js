(
  function() {
    var game = {};
    game.commands = {
      "move": 1
    };
    game.graphics = {
      "tiles": {
        "bases": "playercolour"
      },
      "icons": {
        "daggers": "bishops",
        "crowns": "kings"
      }
    };
    game.board = {
      "height": 8,
      "width": 8,
      "terrain": {
        "bases": {
          "1": [
            ["rect", "a8", "h8"]
          ],
          "2": [
            ["rect", "a1", "h1"]
          ]
        }
      }
    };
    game.AI = [];
    game.id = "daggers";
    var boardDef = {
      "height": 8,
      "width": 8,
      "terrain": {
        "bases": {
          "1": [
            ["rect", "a8", "h8"]
          ],
          "2": [
            ["rect", "a1", "h1"]
          ]
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
          "crowns": {
            "1": ["d8", "e8"],
            "2": ["c1", "f1"]
          },
          "daggers": {
            "1": [
              ["rect", "c7", "f7"]
            ],
            "2": ["c3", "f3", ["rect", "b2", "g2"]]
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
          movetarget: Object.assign({}, step.ARTIFACTS.movetarget)
        };
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectunit: markpos
        };
        if (!!(UNITLAYERS.mycrowns[MARKS['selectunit']])) {
          var STARTPOS = MARKS['selectunit'];
          var neighbourdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          var startconnections = connections[STARTPOS];
          for (var dirnbr = 0; dirnbr < 8; dirnbr++) {
            var POS = startconnections[neighbourdirs[dirnbr]];
            if (POS) {
              if (!(UNITLAYERS.myunits[POS])) {
                ARTIFACTS['movetarget'][POS] = {};
              }
            }
          }
        } else {
          var BLOCKS = UNITLAYERS.units;
          var STARTPOS = MARKS['selectunit'];
          var allwalkerdirs = [8, 1, 2, 4, 5, 6];
          for (var walkerdirnbr = 0; walkerdirnbr < 6; walkerdirnbr++) {
            var DIR = allwalkerdirs[walkerdirnbr];
            var STOPREASON = "";
            var MAX = (([8, 1, 2].indexOf(DIR) !== -1) ? 1 : 8);
            var POS = STARTPOS;
            var LENGTH = 0;
            while (!(STOPREASON = (LENGTH === MAX ? "reachedmax" : !(POS = connections[POS][DIR]) ? "outofbounds" : BLOCKS[POS] ? "hitblock" : null))) {
              LENGTH++;
              ARTIFACTS['movetarget'][POS] = {};
            }
            if (BLOCKS[POS]) {
              if ((!(UNITLAYERS.myunits[POS]) && !(([1, 5].indexOf(DIR) !== -1) && !!(UNITLAYERS.oppdaggers[POS])))) {
                ARTIFACTS['movetarget'][POS] = {};
              }
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
        for (var linkpos in ARTIFACTS.movetarget) {
          newlinks[linkpos] = 'selectmovetarget1';
        }
        return newstep;
      };
      game.selectunit1instruction = function(turn, step) {
        return {
          type: 'text',
          text: ''
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
          text: ''
        };
      };
      game.move1 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var UNITLAYERS = step.UNITLAYERS;
        var unitid = (UNITLAYERS.units[MARKS['selectunit']]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            'pos': MARKS['selectmovetarget']
          });
          delete UNITDATA[(UNITLAYERS.units[MARKS['selectmovetarget']]  || {}).id];
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
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        ARTIFACTS = {
          "movetarget": {}
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
                s0 = UNITLAYERS.mycrowns,
                s1 = TERRAIN.oppbases;
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
        if ((Object.keys(UNITLAYERS.oppcrowns).length === 1)) {
          var winner = 1;
          var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'kingkill';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.move1instruction = function(turn, step) {
        return {
          type: 'text',
          text: ''
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
          text: ''
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
          movetarget: Object.assign({}, step.ARTIFACTS.movetarget)
        };
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectunit: markpos
        };
        if (!!(UNITLAYERS.mycrowns[MARKS['selectunit']])) {
          var STARTPOS = MARKS['selectunit'];
          var neighbourdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          var startconnections = connections[STARTPOS];
          for (var dirnbr = 0; dirnbr < 8; dirnbr++) {
            var POS = startconnections[neighbourdirs[dirnbr]];
            if (POS) {
              if (!(UNITLAYERS.myunits[POS])) {
                ARTIFACTS['movetarget'][POS] = {};
              }
            }
          }
        } else {
          var BLOCKS = UNITLAYERS.units;
          var STARTPOS = MARKS['selectunit'];
          var allwalkerdirs = [8, 1, 2, 4, 5, 6];
          for (var walkerdirnbr = 0; walkerdirnbr < 6; walkerdirnbr++) {
            var DIR = allwalkerdirs[walkerdirnbr];
            var STOPREASON = "";
            var MAX = (([8, 1, 2].indexOf(DIR) !== -1) ? 1 : 8);
            var POS = STARTPOS;
            var LENGTH = 0;
            while (!(STOPREASON = (LENGTH === MAX ? "reachedmax" : !(POS = connections[POS][DIR]) ? "outofbounds" : BLOCKS[POS] ? "hitblock" : null))) {
              LENGTH++;
              ARTIFACTS['movetarget'][POS] = {};
            }
            if (BLOCKS[POS]) {
              if ((!(UNITLAYERS.myunits[POS]) && !(([1, 5].indexOf(DIR) !== -1) && !!(UNITLAYERS.oppdaggers[POS])))) {
                ARTIFACTS['movetarget'][POS] = {};
              }
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
        for (var linkpos in ARTIFACTS.movetarget) {
          newlinks[linkpos] = 'selectmovetarget2';
        }
        return newstep;
      };
      game.selectunit2instruction = function(turn, step) {
        return {
          type: 'text',
          text: ''
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
          text: ''
        };
      };
      game.move2 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var UNITLAYERS = step.UNITLAYERS;
        var unitid = (UNITLAYERS.units[MARKS['selectunit']]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            'pos': MARKS['selectmovetarget']
          });
          delete UNITDATA[(UNITLAYERS.units[MARKS['selectmovetarget']]  || {}).id];
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
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        ARTIFACTS = {
          "movetarget": {}
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
                s0 = UNITLAYERS.mycrowns,
                s1 = TERRAIN.oppbases;
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
        if ((Object.keys(UNITLAYERS.oppcrowns).length === 1)) {
          var winner = 2;
          var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'kingkill';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.move2instruction = function(turn, step) {
        return {
          type: 'text',
          text: ''
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
          text: ''
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