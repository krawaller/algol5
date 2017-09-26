(
  function() {
    var game = {};
    game.commands = {
      "move": 1,
      "dig": 1
    };
    game.graphics = {
      "icons": {
        "pawns": "pawns",
        "knights": "knights",
        "rooks": "rooks"
      }
    };
    game.board = {
      "height": 4,
      "width": 4
    };
    game.AI = [];
    game.id = "descent";
    var boardDef = {
      "height": 4,
      "width": 4
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
          "rooks": {
            "0": [
              ["rect", "a2", "d3"], "b4", "c1"
            ],
            "1": ["a1", "c4", "d1"],
            "2": ["a4", "b1", "d4"]
          }
        }),
        TURNVARS: {},
        clones: 0
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
        var neighbourdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        var startconnections = connections[STARTPOS];
        for (var dirnbr = 0; dirnbr < 8; dirnbr++) {
          var POS = startconnections[neighbourdirs[dirnbr]];
          if (POS && (!!(UNITLAYERS.rooks[MARKS['selectunit']]) ? !(UNITLAYERS.pawns[POS]) : (!!(UNITLAYERS.pawns[MARKS['selectunit']]) ? !(UNITLAYERS.rooks[POS]) : true))) {
            if (UNITLAYERS.neutralunits[POS]) {
              ARTIFACTS['movetargets'][POS] = {};
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
      game.selectunit1instruction = function(step) {
        return '';
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
      game.selectmovetarget1instruction = function(step) {
        return '';
      };
      game.selectdigtarget1 = function(turn, step, markpos) {
        var MARKS = {
          selectdigtarget: markpos
        };
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectdigtarget'
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].dig = 'dig1';
        return newstep;
      };
      game.selectdigtarget1instruction = function(step) {
        return '';
      };
      game.move1 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          digtargets: Object.assign({}, step.ARTIFACTS.digtargets)
        });
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var clones = step.clones;
        var UNITLAYERS = step.UNITLAYERS;
        var TURNVARS = Object.assign({}, step.TURNVARS);
        TURNVARS['movedto'] = MARKS['selectmovetarget'];
        TURNVARS['heightfrom'] = (UNITLAYERS.units[MARKS['selectunit']] || {})['group'];
        TURNVARS['heightto'] = (UNITLAYERS.units[MARKS['selectmovetarget']] || {})['group'];
        var unitid = (UNITLAYERS.units[MARKS['selectunit']]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            'group': TURNVARS['heightto']
          });
        }
        delete UNITDATA[(UNITLAYERS.units[MARKS['selectmovetarget']]  || {}).id];
        var unitid = (UNITLAYERS.units[MARKS['selectunit']]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            'pos': MARKS['selectmovetarget']
          });
        }
        var newunitid = 'spawn' + (clones++);
        UNITDATA[newunitid] = {
          pos: MARKS['selectunit'],
          id: newunitid,
          group: TURNVARS['heightfrom'],
          owner: 0
        };
        MARKS = {};
        UNITLAYERS = {
          "rooks": {},
          "myrooks": {},
          "opprooks": {},
          "neutralrooks": {},
          "knights": {},
          "myknights": {},
          "oppknights": {},
          "neutralknights": {},
          "pawns": {},
          "mypawns": {},
          "opppawns": {},
          "neutralpawns": {},
          "turnvar,heightfrom": {},
          "myturnvar,heightfrom": {},
          "oppturnvar,heightfrom": {},
          "neutralturnvar,heightfrom": {},
          "turnvar,heightto": {},
          "myturnvar,heightto": {},
          "oppturnvar,heightto": {},
          "neutralturnvar,heightto": {},
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
          "digtargets": {},
          "winline": {}
        };
        var STARTPOS = TURNVARS['movedto'];
        var neighbourdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        var startconnections = connections[STARTPOS];
        for (var dirnbr = 0; dirnbr < 8; dirnbr++) {
          var POS = startconnections[neighbourdirs[dirnbr]];
          if (POS && UNITLAYERS.neutralunits[POS]) {
            ARTIFACTS['digtargets'][POS] = {};
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
          path: step.path.concat('move'),
          clones: clones,
          TURNVARS: TURNVARS
        });
        turn.links[newstepid] = {};
        var newlinks = turn.links[newstepid];
        for (var linkpos in ARTIFACTS.digtargets) {
          newlinks[linkpos] = 'selectdigtarget1';
        }
        return newstep;
      }
      game.move1instruction = function(step) {
        return '';
      };
      game.dig1 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          winline: Object.assign({}, step.ARTIFACTS.winline)
        });
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var UNITLAYERS = step.UNITLAYERS;
        if (!!(UNITLAYERS.pawns[MARKS['selectdigtarget']])) {
          delete UNITDATA[(UNITLAYERS.units[MARKS['selectdigtarget']]  || {}).id];
        } else {
          var unitid = (UNITLAYERS.units[MARKS['selectdigtarget']]  || {}).id;
          if (unitid) {
            UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
              'group': (!!(UNITLAYERS.knights[MARKS['selectdigtarget']]) ? 'pawns' : 'knights')
            });
          }
        }
        MARKS = {};
        UNITLAYERS = {
          "rooks": {},
          "myrooks": {},
          "opprooks": {},
          "neutralrooks": {},
          "knights": {},
          "myknights": {},
          "oppknights": {},
          "neutralknights": {},
          "pawns": {},
          "mypawns": {},
          "opppawns": {},
          "neutralpawns": {},
          "turnvar,heightfrom": {},
          "myturnvar,heightfrom": {},
          "oppturnvar,heightfrom": {},
          "neutralturnvar,heightfrom": {},
          "turnvar,heightto": {},
          "myturnvar,heightto": {},
          "oppturnvar,heightto": {},
          "neutralturnvar,heightto": {},
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
          "digtargets": {},
          "winline": {}
        };
        var walkstarts = UNITLAYERS.myunits;
        for (var STARTPOS in walkstarts) {
          var allowedsteps = (!!(UNITLAYERS.myrooks[STARTPOS]) ? UNITLAYERS.myrooks : (!!(UNITLAYERS.myknights[STARTPOS]) ? UNITLAYERS.myknights : UNITLAYERS.mypawns));
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var walkedsquares = [];
            var POS = STARTPOS;
            while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && allowedsteps[POS]) {
              walkedsquares.push(POS);
            }
            var WALKLENGTH = walkedsquares.length;
            for (var walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
              POS = walkedsquares[walkstepper];
              if ((WALKLENGTH > 1)) {
                ARTIFACTS['winline'][POS] = {};
              }
            }
          }
        }
        var newstepid = step.stepid + '-' + 'dig';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'dig',
          path: step.path.concat('dig')
        });
        turn.links[newstepid] = {};
        if (Object.keys(ARTIFACTS.winline).length !== 0) {
          var winner = 1;
          var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'madeline';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.dig1instruction = function(step) {
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
          "digtargets": {},
          "winline": {}
        };
        var UNITDATA = step.UNITDATA;
        var TURNVARS = {};
        var UNITLAYERS = {
          "rooks": {},
          "myrooks": {},
          "opprooks": {},
          "neutralrooks": {},
          "knights": {},
          "myknights": {},
          "oppknights": {},
          "neutralknights": {},
          "pawns": {},
          "mypawns": {},
          "opppawns": {},
          "neutralpawns": {},
          "turnvar,heightfrom": {},
          "myturnvar,heightfrom": {},
          "oppturnvar,heightfrom": {},
          "neutralturnvar,heightfrom": {},
          "turnvar,heightto": {},
          "myturnvar,heightto": {},
          "oppturnvar,heightto": {},
          "neutralturnvar,heightto": {},
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
          clones: step.clones,
          path: [],
          TURNVARS: TURNVARS
        };
        var newlinks = turn.links.root;
        for (var linkpos in UNITLAYERS.myunits) {
          newlinks[linkpos] = 'selectunit1';
        }
        return turn;
      }
      game.start1instruction = function(step) {
        return '';
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
        var neighbourdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        var startconnections = connections[STARTPOS];
        for (var dirnbr = 0; dirnbr < 8; dirnbr++) {
          var POS = startconnections[neighbourdirs[dirnbr]];
          if (POS && (!!(UNITLAYERS.rooks[MARKS['selectunit']]) ? !(UNITLAYERS.pawns[POS]) : (!!(UNITLAYERS.pawns[MARKS['selectunit']]) ? !(UNITLAYERS.rooks[POS]) : true))) {
            if (UNITLAYERS.neutralunits[POS]) {
              ARTIFACTS['movetargets'][POS] = {};
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
      game.selectunit2instruction = function(step) {
        return '';
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
      game.selectmovetarget2instruction = function(step) {
        return '';
      };
      game.selectdigtarget2 = function(turn, step, markpos) {
        var MARKS = {
          selectdigtarget: markpos
        };
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectdigtarget'
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].dig = 'dig2';
        return newstep;
      };
      game.selectdigtarget2instruction = function(step) {
        return '';
      };
      game.move2 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          digtargets: Object.assign({}, step.ARTIFACTS.digtargets)
        });
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var clones = step.clones;
        var UNITLAYERS = step.UNITLAYERS;
        var TURNVARS = Object.assign({}, step.TURNVARS);
        TURNVARS['movedto'] = MARKS['selectmovetarget'];
        TURNVARS['heightfrom'] = (UNITLAYERS.units[MARKS['selectunit']] || {})['group'];
        TURNVARS['heightto'] = (UNITLAYERS.units[MARKS['selectmovetarget']] || {})['group'];
        var unitid = (UNITLAYERS.units[MARKS['selectunit']]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            'group': TURNVARS['heightto']
          });
        }
        delete UNITDATA[(UNITLAYERS.units[MARKS['selectmovetarget']]  || {}).id];
        var unitid = (UNITLAYERS.units[MARKS['selectunit']]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            'pos': MARKS['selectmovetarget']
          });
        }
        var newunitid = 'spawn' + (clones++);
        UNITDATA[newunitid] = {
          pos: MARKS['selectunit'],
          id: newunitid,
          group: TURNVARS['heightfrom'],
          owner: 0
        };
        MARKS = {};
        UNITLAYERS = {
          "rooks": {},
          "myrooks": {},
          "opprooks": {},
          "neutralrooks": {},
          "knights": {},
          "myknights": {},
          "oppknights": {},
          "neutralknights": {},
          "pawns": {},
          "mypawns": {},
          "opppawns": {},
          "neutralpawns": {},
          "turnvar,heightfrom": {},
          "myturnvar,heightfrom": {},
          "oppturnvar,heightfrom": {},
          "neutralturnvar,heightfrom": {},
          "turnvar,heightto": {},
          "myturnvar,heightto": {},
          "oppturnvar,heightto": {},
          "neutralturnvar,heightto": {},
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
          "digtargets": {},
          "winline": {}
        };
        var STARTPOS = TURNVARS['movedto'];
        var neighbourdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        var startconnections = connections[STARTPOS];
        for (var dirnbr = 0; dirnbr < 8; dirnbr++) {
          var POS = startconnections[neighbourdirs[dirnbr]];
          if (POS && UNITLAYERS.neutralunits[POS]) {
            ARTIFACTS['digtargets'][POS] = {};
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
          path: step.path.concat('move'),
          clones: clones,
          TURNVARS: TURNVARS
        });
        turn.links[newstepid] = {};
        var newlinks = turn.links[newstepid];
        for (var linkpos in ARTIFACTS.digtargets) {
          newlinks[linkpos] = 'selectdigtarget2';
        }
        return newstep;
      }
      game.move2instruction = function(step) {
        return '';
      };
      game.dig2 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          winline: Object.assign({}, step.ARTIFACTS.winline)
        });
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var UNITLAYERS = step.UNITLAYERS;
        if (!!(UNITLAYERS.pawns[MARKS['selectdigtarget']])) {
          delete UNITDATA[(UNITLAYERS.units[MARKS['selectdigtarget']]  || {}).id];
        } else {
          var unitid = (UNITLAYERS.units[MARKS['selectdigtarget']]  || {}).id;
          if (unitid) {
            UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
              'group': (!!(UNITLAYERS.knights[MARKS['selectdigtarget']]) ? 'pawns' : 'knights')
            });
          }
        }
        MARKS = {};
        UNITLAYERS = {
          "rooks": {},
          "myrooks": {},
          "opprooks": {},
          "neutralrooks": {},
          "knights": {},
          "myknights": {},
          "oppknights": {},
          "neutralknights": {},
          "pawns": {},
          "mypawns": {},
          "opppawns": {},
          "neutralpawns": {},
          "turnvar,heightfrom": {},
          "myturnvar,heightfrom": {},
          "oppturnvar,heightfrom": {},
          "neutralturnvar,heightfrom": {},
          "turnvar,heightto": {},
          "myturnvar,heightto": {},
          "oppturnvar,heightto": {},
          "neutralturnvar,heightto": {},
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
          "digtargets": {},
          "winline": {}
        };
        var walkstarts = UNITLAYERS.myunits;
        for (var STARTPOS in walkstarts) {
          var allowedsteps = (!!(UNITLAYERS.myrooks[STARTPOS]) ? UNITLAYERS.myrooks : (!!(UNITLAYERS.myknights[STARTPOS]) ? UNITLAYERS.myknights : UNITLAYERS.mypawns));
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var walkedsquares = [];
            var POS = STARTPOS;
            while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && allowedsteps[POS]) {
              walkedsquares.push(POS);
            }
            var WALKLENGTH = walkedsquares.length;
            for (var walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
              POS = walkedsquares[walkstepper];
              if ((WALKLENGTH > 1)) {
                ARTIFACTS['winline'][POS] = {};
              }
            }
          }
        }
        var newstepid = step.stepid + '-' + 'dig';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'dig',
          path: step.path.concat('dig')
        });
        turn.links[newstepid] = {};
        if (Object.keys(ARTIFACTS.winline).length !== 0) {
          var winner = 2;
          var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'madeline';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.dig2instruction = function(step) {
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
          "digtargets": {},
          "winline": {}
        };
        var UNITDATA = step.UNITDATA;
        var TURNVARS = {};
        var UNITLAYERS = {
          "rooks": {},
          "myrooks": {},
          "opprooks": {},
          "neutralrooks": {},
          "knights": {},
          "myknights": {},
          "oppknights": {},
          "neutralknights": {},
          "pawns": {},
          "mypawns": {},
          "opppawns": {},
          "neutralpawns": {},
          "turnvar,heightfrom": {},
          "myturnvar,heightfrom": {},
          "oppturnvar,heightfrom": {},
          "neutralturnvar,heightfrom": {},
          "turnvar,heightto": {},
          "myturnvar,heightto": {},
          "oppturnvar,heightto": {},
          "neutralturnvar,heightto": {},
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
          clones: step.clones,
          path: [],
          TURNVARS: TURNVARS
        };
        var newlinks = turn.links.root;
        for (var linkpos in UNITLAYERS.myunits) {
          newlinks[linkpos] = 'selectunit2';
        }
        return turn;
      }
      game.start2instruction = function(step) {
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