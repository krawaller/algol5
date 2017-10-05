(
  function() {
    var game = {};
    game.commands = {
      "move": 1
    };
    game.graphics = {
      "tiles": {
        "corner": "playercolour"
      },
      "icons": {
        "soldiers": "rooks"
      }
    };
    game.board = {
      "height": 8,
      "width": 8,
      "terrain": {
        "corner": {
          "1": ["a1"],
          "2": ["h8"]
        }
      }
    };
    game.AI = [];
    game.id = "aries";
    var boardDef = {
      "height": 8,
      "width": 8,
      "terrain": {
        "corner": {
          "1": ["a1"],
          "2": ["h8"]
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
            "1": [
              ["rect", "a1", "d4"]
            ],
            "2": [
              ["rect", "e5", "h8"]
            ]
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
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          movetargets: Object.assign({}, step.ARTIFACTS.movetargets)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectunit: markpos
        };
        var BLOCKS = UNITLAYERS.units;
        var STARTPOS = MARKS['selectunit'];
        var allwalkerdirs = [1, 3, 5, 7];
        for (var walkerdirnbr = 0; walkerdirnbr < 4; walkerdirnbr++) {
          var DIR = allwalkerdirs[walkerdirnbr];
          var STOPREASON = "";
          var POS = STARTPOS;
          while (!(STOPREASON = (!(POS = connections[POS][DIR]) ? "outofbounds" : BLOCKS[POS] ? "hitblock" : null))) {
            ARTIFACTS['movetargets'][POS] = {};
          }
          if (BLOCKS[POS]) {
            if (UNITLAYERS.oppunits[POS]) {
              ARTIFACTS['movetargets'][POS] = {
                dir: DIR
              };
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
        return '';
      };
      game.selectmovetarget1 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          beingpushed: Object.assign({}, step.ARTIFACTS.beingpushed),
          squished: Object.assign({}, step.ARTIFACTS.squished)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectmovetarget: markpos,
          selectunit: step.MARKS.selectunit
        };
        if (!!(UNITLAYERS.oppunits[MARKS['selectmovetarget']])) {
          var allowedsteps = UNITLAYERS.oppunits;
          var BLOCKS = UNITLAYERS.myunits;
          var STARTPOS = MARKS['selectmovetarget'];
          var DIR = relativedirs[(ARTIFACTS.movetargets[MARKS['selectmovetarget']] || {})['dir'] - 2 + 1];
          var walkedsquares = [];
          var STOPREASON = "";
          var POS = "faux";
          connections.faux[DIR] = STARTPOS;
          while (!(STOPREASON = (!(POS = connections[POS][DIR]) ? "outofbounds" : BLOCKS[POS] ? "hitblock" : !allowedsteps[POS] ? "nomoresteps" : null))) {
            walkedsquares.push(POS);
            ARTIFACTS['beingpushed'][POS] = {};
          }
          var WALKLENGTH = walkedsquares.length;
          if (WALKLENGTH) {
            if ((['hitblock', 'outofbounds'].indexOf(STOPREASON) !== -1)) {
              ARTIFACTS['squished'][walkedsquares[WALKLENGTH - 1]] = {};
            }
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
        turn.links[newstepid].move = 'move1';
        return newstep;
      };
      game.selectmovetarget1instruction = function(turn, step) {
        return '';
      };
      game.move1 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var UNITLAYERS = step.UNITLAYERS;
        var LOOPID;
        for (var POS in ARTIFACTS.beingpushed) {
          if (LOOPID = (UNITLAYERS.units[POS] || {}).id) {
            var pushid = LOOPID;
            var pushdir = (ARTIFACTS.movetargets[MARKS['selectmovetarget']] || {})['dir'];
            var dist = 1;
            var newpos = UNITDATA[pushid].pos;
            while (dist && connections[newpos][pushdir]) {
              newpos = connections[newpos][pushdir];
              dist--;
            }
            UNITDATA[pushid] = Object.assign({}, UNITDATA[pushid], {
              pos: newpos
            });
            // TODO - check that it uses ['loopid'] ?
          }
        }
        var LOOPID;
        for (var POS in ARTIFACTS.squished) {
          if (LOOPID = (UNITLAYERS.units[POS] || {}).id) {
            delete UNITDATA[LOOPID]; // TODO - check that it uses ['loopid'] ?
          }
        }
        var unitid = (UNITLAYERS.units[MARKS['selectunit']]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            'pos': MARKS['selectmovetarget']
          });
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
          "movetargets": {},
          "beingpushed": {},
          "squished": {}
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
                s0 = TERRAIN.oppcorner,
                s1 = UNITLAYERS.myunits;
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }())).length !== 0) {
          var winner = 1;
          var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'invade';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.move1instruction = function(turn, step) {
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
          "beingpushed": {},
          "squished": {}
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
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          movetargets: Object.assign({}, step.ARTIFACTS.movetargets)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectunit: markpos
        };
        var BLOCKS = UNITLAYERS.units;
        var STARTPOS = MARKS['selectunit'];
        var allwalkerdirs = [1, 3, 5, 7];
        for (var walkerdirnbr = 0; walkerdirnbr < 4; walkerdirnbr++) {
          var DIR = allwalkerdirs[walkerdirnbr];
          var STOPREASON = "";
          var POS = STARTPOS;
          while (!(STOPREASON = (!(POS = connections[POS][DIR]) ? "outofbounds" : BLOCKS[POS] ? "hitblock" : null))) {
            ARTIFACTS['movetargets'][POS] = {};
          }
          if (BLOCKS[POS]) {
            if (UNITLAYERS.oppunits[POS]) {
              ARTIFACTS['movetargets'][POS] = {
                dir: DIR
              };
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
        return '';
      };
      game.selectmovetarget2 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          beingpushed: Object.assign({}, step.ARTIFACTS.beingpushed),
          squished: Object.assign({}, step.ARTIFACTS.squished)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectmovetarget: markpos,
          selectunit: step.MARKS.selectunit
        };
        if (!!(UNITLAYERS.oppunits[MARKS['selectmovetarget']])) {
          var allowedsteps = UNITLAYERS.oppunits;
          var BLOCKS = UNITLAYERS.myunits;
          var STARTPOS = MARKS['selectmovetarget'];
          var DIR = relativedirs[(ARTIFACTS.movetargets[MARKS['selectmovetarget']] || {})['dir'] - 2 + 1];
          var walkedsquares = [];
          var STOPREASON = "";
          var POS = "faux";
          connections.faux[DIR] = STARTPOS;
          while (!(STOPREASON = (!(POS = connections[POS][DIR]) ? "outofbounds" : BLOCKS[POS] ? "hitblock" : !allowedsteps[POS] ? "nomoresteps" : null))) {
            walkedsquares.push(POS);
            ARTIFACTS['beingpushed'][POS] = {};
          }
          var WALKLENGTH = walkedsquares.length;
          if (WALKLENGTH) {
            if ((['hitblock', 'outofbounds'].indexOf(STOPREASON) !== -1)) {
              ARTIFACTS['squished'][walkedsquares[WALKLENGTH - 1]] = {};
            }
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
        turn.links[newstepid].move = 'move2';
        return newstep;
      };
      game.selectmovetarget2instruction = function(turn, step) {
        return '';
      };
      game.move2 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var UNITLAYERS = step.UNITLAYERS;
        var LOOPID;
        for (var POS in ARTIFACTS.beingpushed) {
          if (LOOPID = (UNITLAYERS.units[POS] || {}).id) {
            var pushid = LOOPID;
            var pushdir = (ARTIFACTS.movetargets[MARKS['selectmovetarget']] || {})['dir'];
            var dist = 1;
            var newpos = UNITDATA[pushid].pos;
            while (dist && connections[newpos][pushdir]) {
              newpos = connections[newpos][pushdir];
              dist--;
            }
            UNITDATA[pushid] = Object.assign({}, UNITDATA[pushid], {
              pos: newpos
            });
            // TODO - check that it uses ['loopid'] ?
          }
        }
        var LOOPID;
        for (var POS in ARTIFACTS.squished) {
          if (LOOPID = (UNITLAYERS.units[POS] || {}).id) {
            delete UNITDATA[LOOPID]; // TODO - check that it uses ['loopid'] ?
          }
        }
        var unitid = (UNITLAYERS.units[MARKS['selectunit']]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            'pos': MARKS['selectmovetarget']
          });
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
          "movetargets": {},
          "beingpushed": {},
          "squished": {}
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
                s0 = TERRAIN.oppcorner,
                s1 = UNITLAYERS.myunits;
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }())).length !== 0) {
          var winner = 2;
          var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'invade';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.move2instruction = function(turn, step) {
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
          "beingpushed": {},
          "squished": {}
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