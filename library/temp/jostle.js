(
  function() {
    var game = {};
    game.commands = {
      "jostle": 1
    };
    game.graphics = {
      "icons": {
        "checkers": "pawns"
      }
    };
    game.board = {
      "height": 10,
      "width": 10
    };
    game.AI = [];
    game.id = "jostle";
    var boardDef = {
      "height": 10,
      "width": 10
    };
    var connections = boardConnections(boardDef);
    var BOARD = boardLayers(boardDef);
    var relativedirs = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    var TERRAIN = terrainLayers(boardDef, 0);
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
          "checkers": {
            "1": ["c4", "c6", "c8", "d3", "d5", "d7", "e4", "e8", "f3", "f7", "g4", "g6", "g8", "h3", "h5", "h7"],
            "2": ["c3", "c5", "c7", "d4", "d6", "d8", "e3", "e7", "f4", "f8", "g3", "g5", "g7", "h4", "h6", "h8"]
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
      var ownernames = ["neutral", "my", "opp"];
      var player = 1;
      var otherplayer = 2;
      game.selectunit1 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          movetargets: Object.assign({}, step.ARTIFACTS.movetargets),
          initialenemy: Object.assign({}, step.ARTIFACTS.initialenemy),
          initialfriend: Object.assign({}, step.ARTIFACTS.initialfriend)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectunit: markpos
        };
        var STARTPOS = MARKS['selectunit'];
        var neighbourdirs = [1, 3, 5, 7];
        var startconnections = connections[STARTPOS];
        for (var dirnbr = 0; dirnbr < 4; dirnbr++) {
          var POS = startconnections[neighbourdirs[dirnbr]];
          if (POS) {
            ARTIFACTS[(!(UNITLAYERS.units[POS]) ? 'movetargets' : (!!(UNITLAYERS.oppunits[POS]) ? 'initialenemy' : 'initialfriend'))][POS] = {};
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
      game.selectunit1instruction = function(step) {
        var ARTIFACTS = step.ARTIFACTS;
        return (('The current position is worth ' + '') + (Object.keys(ARTIFACTS.initialfriend).length - Object.keys(ARTIFACTS.initialenemy).length));
      };
      game.selectmovetarget1 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          newenemy: Object.assign({}, step.ARTIFACTS.newenemy),
          newfriend: Object.assign({}, step.ARTIFACTS.newfriend)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectmovetarget: markpos,
          selectunit: step.MARKS.selectunit
        };
        var STARTPOS = MARKS['selectmovetarget'];
        var neighbourdirs = [1, 3, 5, 7];
        var startconnections = connections[STARTPOS];
        for (var dirnbr = 0; dirnbr < 4; dirnbr++) {
          var POS = startconnections[neighbourdirs[dirnbr]];
          if (POS && UNITLAYERS.units[POS]) {
            ARTIFACTS[(!!(UNITLAYERS.oppunits[POS]) ? 'newenemy' : 'newfriend')][POS] = {};
          }
        }
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectmovetarget'
        });
        turn.links[newstepid] = {};
        if ((Object.keys(ARTIFACTS.newfriend).length - (1 + Object.keys(ARTIFACTS.newenemy).length) > Object.keys(ARTIFACTS.initialfriend).length - Object.keys(ARTIFACTS.initialenemy).length)) {
          turn.links[newstepid].jostle = 'jostle1';
        }
        return newstep;
      };
      game.selectmovetarget1instruction = function(step) {
        var ARTIFACTS = step.ARTIFACTS;
        return (('That position would be worth ' + '') + (Object.keys(ARTIFACTS.newfriend).length - (1 + Object.keys(ARTIFACTS.newenemy).length)));
      };
      game.jostle1 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var UNITLAYERS = step.UNITLAYERS;
        var unitid = (UNITLAYERS.units[MARKS['selectunit']]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            'pos': MARKS['selectmovetarget']
          });
        }
        MARKS = {};
        UNITLAYERS = {
          "checkers": {},
          "mycheckers": {},
          "oppcheckers": {},
          "neutralcheckers": {},
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
          "movetargets": {},
          "initialenemy": {},
          "initialfriend": {},
          "newenemy": {},
          "newfriend": {}
        };
        var newstepid = step.stepid + '-' + 'jostle';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'jostle',
          path: step.path.concat('jostle')
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.jostle1instruction = function(step) {
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
          "movetargets": {},
          "initialenemy": {},
          "initialfriend": {},
          "newenemy": {},
          "newfriend": {}
        };
        var UNITDATA = step.UNITDATA;
        var UNITLAYERS = {
          "checkers": {},
          "mycheckers": {},
          "oppcheckers": {},
          "neutralcheckers": {},
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
        for (var linkpos in UNITLAYERS.mycheckers) {
          newlinks[linkpos] = 'selectunit1';
        }
        return turn;
      }
      game.start1instruction = function(step) {
        return 'Select which unit to jostle!';
      };
      game.debug1 = function() {
        return {
          TERRAIN: TERRAIN
        };
      }
    })();
    (function() {
      var ownernames = ["neutral", "opp", "my"];
      var player = 2;
      var otherplayer = 1;
      game.selectunit2 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          movetargets: Object.assign({}, step.ARTIFACTS.movetargets),
          initialenemy: Object.assign({}, step.ARTIFACTS.initialenemy),
          initialfriend: Object.assign({}, step.ARTIFACTS.initialfriend)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectunit: markpos
        };
        var STARTPOS = MARKS['selectunit'];
        var neighbourdirs = [1, 3, 5, 7];
        var startconnections = connections[STARTPOS];
        for (var dirnbr = 0; dirnbr < 4; dirnbr++) {
          var POS = startconnections[neighbourdirs[dirnbr]];
          if (POS) {
            ARTIFACTS[(!(UNITLAYERS.units[POS]) ? 'movetargets' : (!!(UNITLAYERS.oppunits[POS]) ? 'initialenemy' : 'initialfriend'))][POS] = {};
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
      game.selectunit2instruction = function(step) {
        var ARTIFACTS = step.ARTIFACTS;
        return (('The current position is worth ' + '') + (Object.keys(ARTIFACTS.initialfriend).length - Object.keys(ARTIFACTS.initialenemy).length));
      };
      game.selectmovetarget2 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          newenemy: Object.assign({}, step.ARTIFACTS.newenemy),
          newfriend: Object.assign({}, step.ARTIFACTS.newfriend)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectmovetarget: markpos,
          selectunit: step.MARKS.selectunit
        };
        var STARTPOS = MARKS['selectmovetarget'];
        var neighbourdirs = [1, 3, 5, 7];
        var startconnections = connections[STARTPOS];
        for (var dirnbr = 0; dirnbr < 4; dirnbr++) {
          var POS = startconnections[neighbourdirs[dirnbr]];
          if (POS && UNITLAYERS.units[POS]) {
            ARTIFACTS[(!!(UNITLAYERS.oppunits[POS]) ? 'newenemy' : 'newfriend')][POS] = {};
          }
        }
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectmovetarget'
        });
        turn.links[newstepid] = {};
        if ((Object.keys(ARTIFACTS.newfriend).length - (1 + Object.keys(ARTIFACTS.newenemy).length) > Object.keys(ARTIFACTS.initialfriend).length - Object.keys(ARTIFACTS.initialenemy).length)) {
          turn.links[newstepid].jostle = 'jostle2';
        }
        return newstep;
      };
      game.selectmovetarget2instruction = function(step) {
        var ARTIFACTS = step.ARTIFACTS;
        return (('That position would be worth ' + '') + (Object.keys(ARTIFACTS.newfriend).length - (1 + Object.keys(ARTIFACTS.newenemy).length)));
      };
      game.jostle2 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var UNITLAYERS = step.UNITLAYERS;
        var unitid = (UNITLAYERS.units[MARKS['selectunit']]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            'pos': MARKS['selectmovetarget']
          });
        }
        MARKS = {};
        UNITLAYERS = {
          "checkers": {},
          "mycheckers": {},
          "oppcheckers": {},
          "neutralcheckers": {},
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
          "movetargets": {},
          "initialenemy": {},
          "initialfriend": {},
          "newenemy": {},
          "newfriend": {}
        };
        var newstepid = step.stepid + '-' + 'jostle';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'jostle',
          path: step.path.concat('jostle')
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.jostle2instruction = function(step) {
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
          "movetargets": {},
          "initialenemy": {},
          "initialfriend": {},
          "newenemy": {},
          "newfriend": {}
        };
        var UNITDATA = step.UNITDATA;
        var UNITLAYERS = {
          "checkers": {},
          "mycheckers": {},
          "oppcheckers": {},
          "neutralcheckers": {},
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
        for (var linkpos in UNITLAYERS.mycheckers) {
          newlinks[linkpos] = 'selectunit2';
        }
        return turn;
      }
      game.start2instruction = function(step) {
        return 'Select which unit to jostle!';
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