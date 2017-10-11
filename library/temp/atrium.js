(
  function() {
    var game = {};
    game.commands = {
      "move": 1
    };
    game.graphics = {
      "icons": {
        "kings": "kings",
        "queens": "queens"
      }
    };
    game.board = {
      "height": 5,
      "width": 5
    };
    game.AI = [];
    game.id = "atrium";
    var boardDef = {
      "height": 5,
      "width": 5
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
          "kings": {
            "1": ["a2", "c5", "e2"],
            "2": ["b1", "b5", "e3"]
          },
          "queens": {
            "1": ["a3", "d5", "d1"],
            "2": ["a4", "c1", "e4"]
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
          movetargets: Object.assign({}, step.ARTIFACTS.movetargets)
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
          if (POS && !UNITLAYERS.units[POS]) {
            ARTIFACTS['movetargets'][POS] = {};
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
          text: 'Select orthogonal empty neighbour to move to'
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
        var MARKS = step.MARKS;
        return collapseLine({
          type: 'line',
          content: [{
            type: 'text',
            text: 'Press'
          }, {
            type: 'cmndref',
            cmnd: 'move'
          }, {
            type: 'text',
            text: 'to walk from '
          }, {
            type: 'posref',
            pos: MARKS['selectunit']
          }, {
            type: 'text',
            text: 'to'
          }, {
            type: 'posref',
            pos: MARKS['selectmovetarget']
          }]
        });
      };
      game.move1 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          winline: Object.assign({}, step.ARTIFACTS.winline)
        });
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
          "kings": {},
          "mykings": {},
          "oppkings": {},
          "neutralkings": {},
          "queens": {},
          "myqueens": {},
          "oppqueens": {},
          "neutralqueens": {},
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
          "winline": {}
        };
        var walkstarts = UNITLAYERS.myunits;
        for (var STARTPOS in walkstarts) {
          var allowedsteps = (!!(UNITLAYERS.mykings[STARTPOS]) ? UNITLAYERS.mykings : UNITLAYERS.myqueens);
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var walkedsquares = [];
            var POS = STARTPOS;
            while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && allowedsteps[POS]) {
              walkedsquares.push(POS);
            }
            var WALKLENGTH = walkedsquares.length;
            if ((WALKLENGTH === 2)) {
              ARTIFACTS['winline'][STARTPOS] = {};
            }
          }
        }
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
        if (Object.keys(ARTIFACTS.winline).length !== 0) {
          var winner = 1;
          var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'madewinline';
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
          "movetargets": {},
          "winline": {}
        };
        var UNITDATA = step.UNITDATA;
        var UNITLAYERS = {
          "kings": {},
          "mykings": {},
          "oppkings": {},
          "neutralkings": {},
          "queens": {},
          "myqueens": {},
          "oppqueens": {},
          "neutralqueens": {},
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
          text: 'Select which unit to move'
        };
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
          movetargets: Object.assign({}, step.ARTIFACTS.movetargets)
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
          if (POS && !UNITLAYERS.units[POS]) {
            ARTIFACTS['movetargets'][POS] = {};
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
          text: 'Select orthogonal empty neighbour to move to'
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
        var MARKS = step.MARKS;
        return collapseLine({
          type: 'line',
          content: [{
            type: 'text',
            text: 'Press'
          }, {
            type: 'cmndref',
            cmnd: 'move'
          }, {
            type: 'text',
            text: 'to walk from '
          }, {
            type: 'posref',
            pos: MARKS['selectunit']
          }, {
            type: 'text',
            text: 'to'
          }, {
            type: 'posref',
            pos: MARKS['selectmovetarget']
          }]
        });
      };
      game.move2 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          winline: Object.assign({}, step.ARTIFACTS.winline)
        });
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
          "kings": {},
          "mykings": {},
          "oppkings": {},
          "neutralkings": {},
          "queens": {},
          "myqueens": {},
          "oppqueens": {},
          "neutralqueens": {},
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
          "winline": {}
        };
        var walkstarts = UNITLAYERS.myunits;
        for (var STARTPOS in walkstarts) {
          var allowedsteps = (!!(UNITLAYERS.mykings[STARTPOS]) ? UNITLAYERS.mykings : UNITLAYERS.myqueens);
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var walkedsquares = [];
            var POS = STARTPOS;
            while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && allowedsteps[POS]) {
              walkedsquares.push(POS);
            }
            var WALKLENGTH = walkedsquares.length;
            if ((WALKLENGTH === 2)) {
              ARTIFACTS['winline'][STARTPOS] = {};
            }
          }
        }
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
        if (Object.keys(ARTIFACTS.winline).length !== 0) {
          var winner = 2;
          var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'madewinline';
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
          "movetargets": {},
          "winline": {}
        };
        var UNITDATA = step.UNITDATA;
        var UNITLAYERS = {
          "kings": {},
          "mykings": {},
          "oppkings": {},
          "neutralkings": {},
          "queens": {},
          "myqueens": {},
          "oppqueens": {},
          "neutralqueens": {},
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
          text: 'Select which unit to move'
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