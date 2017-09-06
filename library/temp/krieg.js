(
  function() {
    var game = {};
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
    game.AI = ["Fred"];
    game.id = "krieg";
    var boardDef = {
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
          "notfrozens": {
            "1": ["a4", "b4", "a3", "b3"],
            "2": ["c2", "c1", "d2", "d1"]
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
        var STARTPOS = MARKS['selectunit'];
        var neighbourdirs = (!!(TERRAIN.southeast[STARTPOS]) ? [1, 3, 4, 5, 7] : (!!(TERRAIN.northwest[STARTPOS]) ? [1, 3, 5, 7, 8] : [1, 3, 5, 7]));
        var nbrofneighbourdirs = neighbourdirs.length;
        var startconnections = connections[STARTPOS];
        for (var dirnbr = 0; dirnbr < nbrofneighbourdirs; dirnbr++) {
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
          newlinks[linkpos] = 'selectmove1';
        }
        return newstep;
      };
      game.selectunit1instruction = function(step) {
        return '';
      };
      game.selectmove1 = function(turn, step, markpos) {
        var MARKS = {
          selectmove: markpos,
          selectunit: step.MARKS.selectunit
        };
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectmove'
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].move = 'move1';
        return newstep;
      };
      game.selectmove1instruction = function(step) {
        return '';
      };
      game.move1 =
        function(turn, step) {
          var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
          var MARKS = step.MARKS;
          var UNITDATA = Object.assign({}, step.UNITDATA);
          var UNITLAYERS = step.UNITLAYERS;
          var LOOPID;
          for (var POS in UNITLAYERS.myfrozens) {
            LOOPID = UNITLAYERS.myfrozens[POS].id
            UNITDATA[LOOPID] = Object.assign({}, UNITDATA[LOOPID], {
              'group': 'notfrozens'
            });
          }
          var unitid = (UNITLAYERS.units[MARKS['selectunit']]  || {}).id;
          if (unitid) {
            UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
              'group': 'frozens'
            });
          }
          var unitid = (UNITLAYERS.units[MARKS['selectunit']]  || {}).id;
          if (unitid) {
            UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
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
                  s0 = TERRAIN.oppcorners,
                  s1 = UNITLAYERS.myunits;
                for (var key in s0) {
                  if (s1[key]) {
                    ret[key] = s0[key];
                  }
                }
                return ret;
              }()) ||  {}).length !== 0) {
            var winner = 1;
            var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
            turn.links[newstepid][result] = 'cornerinfiltration';
          } else
          if ((Object.keys(
              (function() {
                var ret = {},
                  s0 = TERRAIN.oppbases,
                  s1 = UNITLAYERS.myunits;
                for (var key in s0) {
                  if (s1[key]) {
                    ret[key] = s0[key];
                  }
                }
                return ret;
              }())).length === 2)) {
            var winner = 1;
            var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
            turn.links[newstepid][result] = 'occupation';
          } else turn.links[newstepid].endturn = "start" + otherplayer;
          return newstep;
        };
      game.move1instruction =
        function(step) {
          var MARKS = step.MARKS;
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          var UNITDATA = step.UNITDATA;
          return ''
        };
      game.start1 =
        function(turn, step) {
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
          for (var linkpos in UNITLAYERS.mynotfrozens) {
            newlinks[linkpos] = 'selectunit1';
          }
          return turn;
        };
      game.start1instruction =
        function(step) {
          var MARKS = step.MARKS;
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          var UNITDATA = step.UNITDATA;
          return ''
        };
      game.brain_Fred_1 =
        function(step) {
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          ARTIFACTS.myfrozenguardedthreat = {};
          ARTIFACTS.myfrozenfreethreat = {};
          ARTIFACTS.mymoverguardedthreat = {};
          ARTIFACTS.mymoverfreethreat = {};
          ARTIFACTS.oppfrozenguardedthreat = {};
          ARTIFACTS.oppfrozenfreethreat = {};
          ARTIFACTS.oppmoverguardedthreat = {};
          ARTIFACTS.oppmoverfreethreat = {};
          for (var STARTPOS in UNITLAYERS.myunits) {
            var neighbourdirs = (!!(TERRAIN.oppbases[STARTPOS]) ? [4] : [3, 5]);
            var nbrofneighbourdirs = neighbourdirs.length;
            var startconnections = connections[STARTPOS];
            for (var dirnbr = 0; dirnbr < nbrofneighbourdirs; dirnbr++) {
              var POS = startconnections[neighbourdirs[dirnbr]];
              if (POS &&
                (function() {
                  var k, ret = {},
                    s0 = TERRAIN.oppbases,
                    s1 = TERRAIN.oppcorners;
                  for (k in s0) {
                    ret[k] = 1;
                  }
                  for (k in s1) {
                    ret[k] = 1;
                  }
                  return ret;
                }())[POS]) {
                ARTIFACTS[(!!(UNITLAYERS.myfrozens[STARTPOS]) ? (!!(UNITLAYERS.units[POS]) ? 'myfrozenguardedthreat' : 'myfrozenfreethreat') : (!!(UNITLAYERS.units[POS]) ? 'mymoverguardedthreat' : 'mymoverfreethreat'))][POS] = {};
              }
            } 
          } 
          for (var STARTPOS in UNITLAYERS.oppunits) {
            var neighbourdirs = (!!(TERRAIN.mybases[STARTPOS]) ? [8] : [7, 1]);
            var nbrofneighbourdirs = neighbourdirs.length;
            var startconnections = connections[STARTPOS];
            for (var dirnbr = 0; dirnbr < nbrofneighbourdirs; dirnbr++) {
              var POS = startconnections[neighbourdirs[dirnbr]];
              if (POS &&
                (function() {
                  var k, ret = {},
                    s0 = TERRAIN.mybases,
                    s1 = TERRAIN.mycorners;
                  for (k in s0) {
                    ret[k] = 1;
                  }
                  for (k in s1) {
                    ret[k] = 1;
                  }
                  return ret;
                }())[POS]) {
                ARTIFACTS[(!!(UNITLAYERS.oppfrozens[STARTPOS]) ? (!!(UNITLAYERS.units[POS]) ? 'oppfrozenguardedthreat' : 'oppfrozenfreethreat') : (!!(UNITLAYERS.units[POS]) ? 'oppmoverguardedthreat' : 'oppmoverfreethreat'))][POS] = {};
              }
            } 
          } 
          return Object.keys(ARTIFACTS.myfrozenguardedthreat).length + 2 * Object.keys(ARTIFACTS.myfrozenfreethreat).length + 3 * Object.keys(ARTIFACTS.mymoverguardedthreat).length + 4 * Object.keys(ARTIFACTS.mymoverfreethreat).length + 5 * Object.keys(
            (function() {
              var ret = {},
                s0 = UNITLAYERS.myfrozens,
                s1 = TERRAIN.oppbases;
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }())).length + 6 * Object.keys(
            (function() {
              var ret = {},
                s0 = UNITLAYERS.mynotfrozens,
                s1 = TERRAIN.oppbases;
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }())).length - Object.keys(ARTIFACTS.oppfrozenguardedthreat).length - 2 * Object.keys(ARTIFACTS.oppfrozenfreethreat).length - 3 * Object.keys(ARTIFACTS.oppmoverguardedthreat).length - 4 * Object.keys(ARTIFACTS.oppmoverfreethreat).length - 5 * Object.keys(
            (function() {
              var ret = {},
                s0 = UNITLAYERS.oppfrozens,
                s1 = TERRAIN.mybases;
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }())).length - 6 * Object.keys(
            (function() {
              var ret = {},
                s0 = UNITLAYERS.oppnotfrozens,
                s1 = TERRAIN.mybases;
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }())).length;
        };
      game.brain_Fred_1_detailed =
        function(step) {
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          ARTIFACTS.myfrozenguardedthreat = {};
          ARTIFACTS.myfrozenfreethreat = {};
          ARTIFACTS.mymoverguardedthreat = {};
          ARTIFACTS.mymoverfreethreat = {};
          ARTIFACTS.oppfrozenguardedthreat = {};
          ARTIFACTS.oppfrozenfreethreat = {};
          ARTIFACTS.oppmoverguardedthreat = {};
          ARTIFACTS.oppmoverfreethreat = {};
          for (var STARTPOS in UNITLAYERS.myunits) {
            var neighbourdirs = (!!(TERRAIN.oppbases[STARTPOS]) ? [4] : [3, 5]);
            var nbrofneighbourdirs = neighbourdirs.length;
            var startconnections = connections[STARTPOS];
            for (var dirnbr = 0; dirnbr < nbrofneighbourdirs; dirnbr++) {
              var POS = startconnections[neighbourdirs[dirnbr]];
              if (POS &&
                (function() {
                  var k, ret = {},
                    s0 = TERRAIN.oppbases,
                    s1 = TERRAIN.oppcorners;
                  for (k in s0) {
                    ret[k] = 1;
                  }
                  for (k in s1) {
                    ret[k] = 1;
                  }
                  return ret;
                }())[POS]) {
                ARTIFACTS[(!!(UNITLAYERS.myfrozens[STARTPOS]) ? (!!(UNITLAYERS.units[POS]) ? 'myfrozenguardedthreat' : 'myfrozenfreethreat') : (!!(UNITLAYERS.units[POS]) ? 'mymoverguardedthreat' : 'mymoverfreethreat'))][POS] = {};
              }
            } 
          } 
          for (var STARTPOS in UNITLAYERS.oppunits) {
            var neighbourdirs = (!!(TERRAIN.mybases[STARTPOS]) ? [8] : [7, 1]);
            var nbrofneighbourdirs = neighbourdirs.length;
            var startconnections = connections[STARTPOS];
            for (var dirnbr = 0; dirnbr < nbrofneighbourdirs; dirnbr++) {
              var POS = startconnections[neighbourdirs[dirnbr]];
              if (POS &&
                (function() {
                  var k, ret = {},
                    s0 = TERRAIN.mybases,
                    s1 = TERRAIN.mycorners;
                  for (k in s0) {
                    ret[k] = 1;
                  }
                  for (k in s1) {
                    ret[k] = 1;
                  }
                  return ret;
                }())[POS]) {
                ARTIFACTS[(!!(UNITLAYERS.oppfrozens[STARTPOS]) ? (!!(UNITLAYERS.units[POS]) ? 'oppfrozenguardedthreat' : 'oppfrozenfreethreat') : (!!(UNITLAYERS.units[POS]) ? 'oppmoverguardedthreat' : 'oppmoverfreethreat'))][POS] = {};
              }
            } 
          } 
          return {
            myfrozenguardedthreat: Object.keys(ARTIFACTS.myfrozenguardedthreat).length,
            myfrozenfreethreat: 2 * Object.keys(ARTIFACTS.myfrozenfreethreat).length,
            mymoverguardedthreat: 3 * Object.keys(ARTIFACTS.mymoverguardedthreat).length,
            mymoverfreethreat: 4 * Object.keys(ARTIFACTS.mymoverfreethreat).length,
            myfrozeninfiltrators: 5 * Object.keys(
              (function() {
                var ret = {},
                  s0 = UNITLAYERS.myfrozens,
                  s1 = TERRAIN.oppbases;
                for (var key in s0) {
                  if (s1[key]) {
                    ret[key] = s0[key];
                  }
                }
                return ret;
              }())).length,
            myfreeinfiltrators: 6 * Object.keys(
              (function() {
                var ret = {},
                  s0 = UNITLAYERS.mynotfrozens,
                  s1 = TERRAIN.oppbases;
                for (var key in s0) {
                  if (s1[key]) {
                    ret[key] = s0[key];
                  }
                }
                return ret;
              }())).length,
            oppfrozenguardedthreat: -Object.keys(ARTIFACTS.oppfrozenguardedthreat).length,
            oppfrozenfreethreat: -2 * Object.keys(ARTIFACTS.oppfrozenfreethreat).length,
            oppmoverguardedthreat: -3 * Object.keys(ARTIFACTS.oppmoverguardedthreat).length,
            oppmoverfreethreat: -4 * Object.keys(ARTIFACTS.oppmoverfreethreat).length,
            oppfrozeninfiltrators: -5 * Object.keys(
              (function() {
                var ret = {},
                  s0 = UNITLAYERS.oppfrozens,
                  s1 = TERRAIN.mybases;
                for (var key in s0) {
                  if (s1[key]) {
                    ret[key] = s0[key];
                  }
                }
                return ret;
              }())).length,
            oppfreeinfiltrators: -6 * Object.keys(
              (function() {
                var ret = {},
                  s0 = UNITLAYERS.oppnotfrozens,
                  s1 = TERRAIN.mybases;
                for (var key in s0) {
                  if (s1[key]) {
                    ret[key] = s0[key];
                  }
                }
                return ret;
              }())).length
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
        var STARTPOS = MARKS['selectunit'];
        var neighbourdirs = (!!(TERRAIN.southeast[STARTPOS]) ? [1, 3, 4, 5, 7] : (!!(TERRAIN.northwest[STARTPOS]) ? [1, 3, 5, 7, 8] : [1, 3, 5, 7]));
        var nbrofneighbourdirs = neighbourdirs.length;
        var startconnections = connections[STARTPOS];
        for (var dirnbr = 0; dirnbr < nbrofneighbourdirs; dirnbr++) {
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
          newlinks[linkpos] = 'selectmove2';
        }
        return newstep;
      };
      game.selectunit2instruction = function(step) {
        return '';
      };
      game.selectmove2 = function(turn, step, markpos) {
        var MARKS = {
          selectmove: markpos,
          selectunit: step.MARKS.selectunit
        };
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectmove'
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].move = 'move2';
        return newstep;
      };
      game.selectmove2instruction = function(step) {
        return '';
      };
      game.move2 =
        function(turn, step) {
          var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
          var MARKS = step.MARKS;
          var UNITDATA = Object.assign({}, step.UNITDATA);
          var UNITLAYERS = step.UNITLAYERS;
          var LOOPID;
          for (var POS in UNITLAYERS.myfrozens) {
            LOOPID = UNITLAYERS.myfrozens[POS].id
            UNITDATA[LOOPID] = Object.assign({}, UNITDATA[LOOPID], {
              'group': 'notfrozens'
            });
          }
          var unitid = (UNITLAYERS.units[MARKS['selectunit']]  || {}).id;
          if (unitid) {
            UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
              'group': 'frozens'
            });
          }
          var unitid = (UNITLAYERS.units[MARKS['selectunit']]  || {}).id;
          if (unitid) {
            UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
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
                  s0 = TERRAIN.oppcorners,
                  s1 = UNITLAYERS.myunits;
                for (var key in s0) {
                  if (s1[key]) {
                    ret[key] = s0[key];
                  }
                }
                return ret;
              }()) ||  {}).length !== 0) {
            var winner = 2;
            var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
            turn.links[newstepid][result] = 'cornerinfiltration';
          } else
          if ((Object.keys(
              (function() {
                var ret = {},
                  s0 = TERRAIN.oppbases,
                  s1 = UNITLAYERS.myunits;
                for (var key in s0) {
                  if (s1[key]) {
                    ret[key] = s0[key];
                  }
                }
                return ret;
              }())).length === 2)) {
            var winner = 2;
            var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
            turn.links[newstepid][result] = 'occupation';
          } else turn.links[newstepid].endturn = "start" + otherplayer;
          return newstep;
        };
      game.move2instruction =
        function(step) {
          var MARKS = step.MARKS;
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          var UNITDATA = step.UNITDATA;
          return ''
        };
      game.start2 =
        function(turn, step) {
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
          for (var linkpos in UNITLAYERS.mynotfrozens) {
            newlinks[linkpos] = 'selectunit2';
          }
          return turn;
        };
      game.start2instruction =
        function(step) {
          var MARKS = step.MARKS;
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          var UNITDATA = step.UNITDATA;
          return ''
        };
      game.brain_Fred_2 =
        function(step) {
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          ARTIFACTS.myfrozenguardedthreat = {};
          ARTIFACTS.myfrozenfreethreat = {};
          ARTIFACTS.mymoverguardedthreat = {};
          ARTIFACTS.mymoverfreethreat = {};
          ARTIFACTS.oppfrozenguardedthreat = {};
          ARTIFACTS.oppfrozenfreethreat = {};
          ARTIFACTS.oppmoverguardedthreat = {};
          ARTIFACTS.oppmoverfreethreat = {};
          for (var STARTPOS in UNITLAYERS.myunits) {
            var neighbourdirs = (!!(TERRAIN.oppbases[STARTPOS]) ? [8] : [7, 1]);
            var nbrofneighbourdirs = neighbourdirs.length;
            var startconnections = connections[STARTPOS];
            for (var dirnbr = 0; dirnbr < nbrofneighbourdirs; dirnbr++) {
              var POS = startconnections[neighbourdirs[dirnbr]];
              if (POS &&
                (function() {
                  var k, ret = {},
                    s0 = TERRAIN.oppbases,
                    s1 = TERRAIN.oppcorners;
                  for (k in s0) {
                    ret[k] = 1;
                  }
                  for (k in s1) {
                    ret[k] = 1;
                  }
                  return ret;
                }())[POS]) {
                ARTIFACTS[(!!(UNITLAYERS.myfrozens[STARTPOS]) ? (!!(UNITLAYERS.units[POS]) ? 'myfrozenguardedthreat' : 'myfrozenfreethreat') : (!!(UNITLAYERS.units[POS]) ? 'mymoverguardedthreat' : 'mymoverfreethreat'))][POS] = {};
              }
            } 
          } 
          for (var STARTPOS in UNITLAYERS.oppunits) {
            var neighbourdirs = (!!(TERRAIN.mybases[STARTPOS]) ? [4] : [3, 5]);
            var nbrofneighbourdirs = neighbourdirs.length;
            var startconnections = connections[STARTPOS];
            for (var dirnbr = 0; dirnbr < nbrofneighbourdirs; dirnbr++) {
              var POS = startconnections[neighbourdirs[dirnbr]];
              if (POS &&
                (function() {
                  var k, ret = {},
                    s0 = TERRAIN.mybases,
                    s1 = TERRAIN.mycorners;
                  for (k in s0) {
                    ret[k] = 1;
                  }
                  for (k in s1) {
                    ret[k] = 1;
                  }
                  return ret;
                }())[POS]) {
                ARTIFACTS[(!!(UNITLAYERS.oppfrozens[STARTPOS]) ? (!!(UNITLAYERS.units[POS]) ? 'oppfrozenguardedthreat' : 'oppfrozenfreethreat') : (!!(UNITLAYERS.units[POS]) ? 'oppmoverguardedthreat' : 'oppmoverfreethreat'))][POS] = {};
              }
            } 
          } 
          return Object.keys(ARTIFACTS.myfrozenguardedthreat).length + 2 * Object.keys(ARTIFACTS.myfrozenfreethreat).length + 3 * Object.keys(ARTIFACTS.mymoverguardedthreat).length + 4 * Object.keys(ARTIFACTS.mymoverfreethreat).length + 5 * Object.keys(
            (function() {
              var ret = {},
                s0 = UNITLAYERS.myfrozens,
                s1 = TERRAIN.oppbases;
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }())).length + 6 * Object.keys(
            (function() {
              var ret = {},
                s0 = UNITLAYERS.mynotfrozens,
                s1 = TERRAIN.oppbases;
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }())).length - Object.keys(ARTIFACTS.oppfrozenguardedthreat).length - 2 * Object.keys(ARTIFACTS.oppfrozenfreethreat).length - 3 * Object.keys(ARTIFACTS.oppmoverguardedthreat).length - 4 * Object.keys(ARTIFACTS.oppmoverfreethreat).length - 5 * Object.keys(
            (function() {
              var ret = {},
                s0 = UNITLAYERS.oppfrozens,
                s1 = TERRAIN.mybases;
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }())).length - 6 * Object.keys(
            (function() {
              var ret = {},
                s0 = UNITLAYERS.oppnotfrozens,
                s1 = TERRAIN.mybases;
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }())).length;
        };
      game.brain_Fred_2_detailed =
        function(step) {
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          ARTIFACTS.myfrozenguardedthreat = {};
          ARTIFACTS.myfrozenfreethreat = {};
          ARTIFACTS.mymoverguardedthreat = {};
          ARTIFACTS.mymoverfreethreat = {};
          ARTIFACTS.oppfrozenguardedthreat = {};
          ARTIFACTS.oppfrozenfreethreat = {};
          ARTIFACTS.oppmoverguardedthreat = {};
          ARTIFACTS.oppmoverfreethreat = {};
          for (var STARTPOS in UNITLAYERS.myunits) {
            var neighbourdirs = (!!(TERRAIN.oppbases[STARTPOS]) ? [8] : [7, 1]);
            var nbrofneighbourdirs = neighbourdirs.length;
            var startconnections = connections[STARTPOS];
            for (var dirnbr = 0; dirnbr < nbrofneighbourdirs; dirnbr++) {
              var POS = startconnections[neighbourdirs[dirnbr]];
              if (POS &&
                (function() {
                  var k, ret = {},
                    s0 = TERRAIN.oppbases,
                    s1 = TERRAIN.oppcorners;
                  for (k in s0) {
                    ret[k] = 1;
                  }
                  for (k in s1) {
                    ret[k] = 1;
                  }
                  return ret;
                }())[POS]) {
                ARTIFACTS[(!!(UNITLAYERS.myfrozens[STARTPOS]) ? (!!(UNITLAYERS.units[POS]) ? 'myfrozenguardedthreat' : 'myfrozenfreethreat') : (!!(UNITLAYERS.units[POS]) ? 'mymoverguardedthreat' : 'mymoverfreethreat'))][POS] = {};
              }
            } 
          } 
          for (var STARTPOS in UNITLAYERS.oppunits) {
            var neighbourdirs = (!!(TERRAIN.mybases[STARTPOS]) ? [4] : [3, 5]);
            var nbrofneighbourdirs = neighbourdirs.length;
            var startconnections = connections[STARTPOS];
            for (var dirnbr = 0; dirnbr < nbrofneighbourdirs; dirnbr++) {
              var POS = startconnections[neighbourdirs[dirnbr]];
              if (POS &&
                (function() {
                  var k, ret = {},
                    s0 = TERRAIN.mybases,
                    s1 = TERRAIN.mycorners;
                  for (k in s0) {
                    ret[k] = 1;
                  }
                  for (k in s1) {
                    ret[k] = 1;
                  }
                  return ret;
                }())[POS]) {
                ARTIFACTS[(!!(UNITLAYERS.oppfrozens[STARTPOS]) ? (!!(UNITLAYERS.units[POS]) ? 'oppfrozenguardedthreat' : 'oppfrozenfreethreat') : (!!(UNITLAYERS.units[POS]) ? 'oppmoverguardedthreat' : 'oppmoverfreethreat'))][POS] = {};
              }
            } 
          } 
          return {
            myfrozenguardedthreat: Object.keys(ARTIFACTS.myfrozenguardedthreat).length,
            myfrozenfreethreat: 2 * Object.keys(ARTIFACTS.myfrozenfreethreat).length,
            mymoverguardedthreat: 3 * Object.keys(ARTIFACTS.mymoverguardedthreat).length,
            mymoverfreethreat: 4 * Object.keys(ARTIFACTS.mymoverfreethreat).length,
            myfrozeninfiltrators: 5 * Object.keys(
              (function() {
                var ret = {},
                  s0 = UNITLAYERS.myfrozens,
                  s1 = TERRAIN.oppbases;
                for (var key in s0) {
                  if (s1[key]) {
                    ret[key] = s0[key];
                  }
                }
                return ret;
              }())).length,
            myfreeinfiltrators: 6 * Object.keys(
              (function() {
                var ret = {},
                  s0 = UNITLAYERS.mynotfrozens,
                  s1 = TERRAIN.oppbases;
                for (var key in s0) {
                  if (s1[key]) {
                    ret[key] = s0[key];
                  }
                }
                return ret;
              }())).length,
            oppfrozenguardedthreat: -Object.keys(ARTIFACTS.oppfrozenguardedthreat).length,
            oppfrozenfreethreat: -2 * Object.keys(ARTIFACTS.oppfrozenfreethreat).length,
            oppmoverguardedthreat: -3 * Object.keys(ARTIFACTS.oppmoverguardedthreat).length,
            oppmoverfreethreat: -4 * Object.keys(ARTIFACTS.oppmoverfreethreat).length,
            oppfrozeninfiltrators: -5 * Object.keys(
              (function() {
                var ret = {},
                  s0 = UNITLAYERS.oppfrozens,
                  s1 = TERRAIN.mybases;
                for (var key in s0) {
                  if (s1[key]) {
                    ret[key] = s0[key];
                  }
                }
                return ret;
              }())).length,
            oppfreeinfiltrators: -6 * Object.keys(
              (function() {
                var ret = {},
                  s0 = UNITLAYERS.oppnotfrozens,
                  s1 = TERRAIN.mybases;
                for (var key in s0) {
                  if (s1[key]) {
                    ret[key] = s0[key];
                  }
                }
                return ret;
              }())).length
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