(
  function() {
    var game = {};
    game.commands = {
      "move": 1,
      "kill": 1
    };
    game.graphics = {
      "tiles": {
        "homerow": "playercolour"
      },
      "icons": {
        "towers": "rooks",
        "walls": "pawns"
      }
    };
    game.board = {
      "height": 7,
      "width": 8,
      "terrain": {
        "homerow": {
          "1": [
            ["rect", "a1", "h1"]
          ],
          "2": [
            ["rect", "a7", "h7"]
          ]
        }
      }
    };
    game.AI = ["Steve", "Joe", "Clive"];
    game.id = "murusgallicus";
    var boardDef = {
      "height": 7,
      "width": 8,
      "terrain": {
        "homerow": {
          "1": [
            ["rect", "a1", "h1"]
          ],
          "2": [
            ["rect", "a7", "h7"]
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
            "towers": {
              "1": [
                ["rect", "a1", "h1"]
              ],
              "2": [
                ["rect", "a7", "h7"]
              ]
            }
          })
          ,
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
      var TERRAIN = terrainLayers(boardDef, 1, {
        "threatrow": {
          "1": [
            ["rect", "a3", "h3"]
          ],
          "2": [
            ["rect", "a5", "h5"]
          ]
        }
      });
      var ownernames = ["neutral", "my", "opp"];
      var player = 1;
      var otherplayer = 2;
      var mybasic = {
        "h1": 0,
        "g1": 0,
        "f1": 0,
        "e1": 0,
        "d1": 0,
        "c1": 0,
        "b1": 0,
        "a1": 0,
        "h2": 0,
        "g2": 0,
        "f2": 1,
        "e2": 1,
        "d2": 1,
        "c2": 1,
        "b2": 0,
        "a2": 0,
        "h3": 0,
        "g3": 0,
        "f3": 2,
        "e3": 2,
        "d3": 2,
        "c3": 2,
        "b3": 0,
        "a3": 0,
        "h4": 0,
        "g4": 0,
        "f4": 3,
        "e4": 3,
        "d4": 3,
        "c4": 3,
        "b4": 0,
        "a4": 0,
        "h5": 2,
        "g5": 3,
        "f5": 4,
        "e5": 4,
        "d5": 4,
        "c5": 4,
        "b5": 3,
        "a5": 2,
        "h6": 1,
        "g6": 1,
        "f6": 1,
        "e6": 1,
        "d6": 1,
        "c6": 1,
        "b6": 1,
        "a6": 1,
        "h7": 0,
        "g7": 0,
        "f7": 0,
        "e7": 0,
        "d7": 0,
        "c7": 0,
        "b7": 0,
        "a7": 0
      };
      var oppbasic = {
        "h1": 0,
        "g1": 0,
        "f1": 0,
        "e1": 0,
        "d1": 0,
        "c1": 0,
        "b1": 0,
        "a1": 0,
        "h2": 1,
        "g2": 1,
        "f2": 1,
        "e2": 1,
        "d2": 1,
        "c2": 1,
        "b2": 1,
        "a2": 1,
        "h3": 2,
        "g3": 3,
        "f3": 4,
        "e3": 4,
        "d3": 4,
        "c3": 4,
        "b3": 3,
        "a3": 2,
        "h4": 0,
        "g4": 0,
        "f4": 3,
        "e4": 3,
        "d4": 3,
        "c4": 3,
        "b4": 0,
        "a4": 0,
        "h5": 0,
        "g5": 0,
        "f5": 2,
        "e5": 2,
        "d5": 2,
        "c5": 2,
        "b5": 0,
        "a5": 0,
        "h6": 0,
        "g6": 0,
        "f6": 1,
        "e6": 1,
        "d6": 1,
        "c6": 1,
        "b6": 0,
        "a6": 0,
        "h7": 0,
        "g7": 0,
        "f7": 0,
        "e7": 0,
        "d7": 0,
        "c7": 0,
        "b7": 0,
        "a7": 0
      };
      game.selecttower1 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          movetargets: Object.assign({}, step.ARTIFACTS.movetargets),
          killtargets: Object.assign({}, step.ARTIFACTS.killtargets)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selecttower: markpos
        };
        var BLOCKS =
          (function() {
            var k, ret = {},
              s0 = UNITLAYERS.oppunits,
              s1 = UNITLAYERS.mytowers;
            for (k in s0) {
              ret[k] = 1;
            }
            for (k in s1) {
              ret[k] = 1;
            }
            return ret;
          }());
        var STARTPOS = MARKS['selecttower'];
        var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
          var DIR = allwalkerdirs[walkerdirnbr];
          var walkedsquares = [];
          var MAX = 2;
          var POS = STARTPOS;
          var LENGTH = 0;
          while (LENGTH < MAX && (POS = connections[POS][DIR]) && !BLOCKS[POS]) {
            walkedsquares.push(POS);
            LENGTH++;
          }
          var WALKLENGTH = walkedsquares.length;
          var STEP = 0;
          for (var walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
            POS = walkedsquares[walkstepper];
            STEP++;
            if (((WALKLENGTH === 2) && (STEP === 2))) {
              ARTIFACTS['movetargets'][POS] = {
                dir: DIR
              };
            }
          }
        }
        var STARTPOS = MARKS['selecttower'];
        var neighbourdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        var startconnections = connections[STARTPOS];
        for (var dirnbr = 0; dirnbr < 8; dirnbr++) {
          var POS = startconnections[neighbourdirs[dirnbr]];
          if (POS && UNITLAYERS.oppwalls[POS]) {
            ARTIFACTS['killtargets'][POS] = {};
          }
        } 
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selecttower'
        });
        turn.links[newstepid] = {};
        var newlinks = turn.links[newstepid];
        for (var linkpos in ARTIFACTS.movetargets) {
          newlinks[linkpos] = 'selectmove1';
        }
        var newlinks = turn.links[newstepid];
        for (var linkpos in ARTIFACTS.killtargets) {
          newlinks[linkpos] = 'selectkill1';
        }
        return newstep;
      };
      game.selecttower1instruction = function(step) {
        return '';
      };
      game.selectmove1 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          madetowers: Object.assign({}, step.ARTIFACTS.madetowers),
          madewalls: Object.assign({}, step.ARTIFACTS.madewalls)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectmove: markpos,
          selecttower: step.MARKS.selecttower
        };
        var STARTPOS = MARKS['selectmove'];
        var POS = connections[STARTPOS][relativedirs[(ARTIFACTS.movetargets[MARKS['selectmove']] || {})['dir'] - 2 + 5]];
        if (POS) {
          ARTIFACTS[(!!(UNITLAYERS.myunits[POS]) ? 'madetowers' : 'madewalls')][POS] = {};
        }
        ARTIFACTS[(!!(UNITLAYERS.myunits[MARKS['selectmove']]) ? 'madetowers' : 'madewalls')][STARTPOS] = {};
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
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
      game.selectkill1 = function(turn, step, markpos) {
        var MARKS = {
          selectkill: markpos,
          selecttower: step.MARKS.selecttower
        };
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectkill'
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].kill = 'kill1';
        return newstep;
      };
      game.selectkill1instruction = function(step) {
        return '';
      };
      game.move1 =
        function(turn, step) {
          var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
          var MARKS = step.MARKS;
          var UNITDATA = Object.assign({}, step.UNITDATA);
          var clones = step.clones;
          var UNITLAYERS = step.UNITLAYERS;
          delete UNITDATA[(UNITLAYERS.units[MARKS['selecttower']]  || {}).id];
          for (var POS in ARTIFACTS.madetowers) {
            var unitid = (UNITLAYERS.units[POS]  || {}).id;
            if (unitid) {
              UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
                'group': 'towers'
              });
            }
          }
          for (var POS in ARTIFACTS.madewalls) {
            var newunitid = 'spawn' + (clones++);
            UNITDATA[newunitid] = {
              pos: POS,
              id: newunitid,
              group: 'walls',
              owner: 1,
              from: MARKS['selecttower']
            };
          }
          MARKS = {};
          UNITLAYERS = {
            "towers": {},
            "mytowers": {},
            "opptowers": {},
            "neutraltowers": {},
            "walls": {},
            "mywalls": {},
            "oppwalls": {},
            "neutralwalls": {},
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
            "madetowers": {},
            "madewalls": {},
            "killtargets": {}
          };
          var newstepid = step.stepid + '-' + 'move';
          var newstep = turn.steps[newstepid] = Object.assign({}, step, {
            ARTIFACTS: ARTIFACTS,
            MARKS: MARKS,
            UNITDATA: UNITDATA,
            UNITLAYERS: UNITLAYERS,
            stepid: newstepid,
            name: 'move',
            path: step.path.concat('move'),
            clones: clones
          });
          turn.links[newstepid] = {};
          if (Object.keys(
              (function() {
                var ret = {},
                  s0 = UNITLAYERS.myunits,
                  s1 = TERRAIN.opphomerow;
                for (var key in s0) {
                  if (s1[key]) {
                    ret[key] = s0[key];
                  }
                }
                return ret;
              }()) ||  {}).length !== 0) {
            var winner = 1;
            var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
            turn.links[newstepid][result] = 'infiltration';
          } else turn.links[newstepid].endturn = "start" + otherplayer;
          return newstep;
        };
      game.move1instruction = function(step) {
        return '';
      };
      game.kill1 =
        function(turn, step) {
          var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
          var MARKS = step.MARKS;
          var UNITDATA = Object.assign({}, step.UNITDATA);
          var UNITLAYERS = step.UNITLAYERS;
          var unitid = (UNITLAYERS.units[MARKS['selecttower']]  || {}).id;
          if (unitid) {
            UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
              'group': 'walls'
            });
          }
          delete UNITDATA[(UNITLAYERS.units[MARKS['selectkill']]  || {}).id];
          MARKS = {};
          UNITLAYERS = {
            "towers": {},
            "mytowers": {},
            "opptowers": {},
            "neutraltowers": {},
            "walls": {},
            "mywalls": {},
            "oppwalls": {},
            "neutralwalls": {},
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
            "madetowers": {},
            "madewalls": {},
            "killtargets": {}
          };
          var newstepid = step.stepid + '-' + 'kill';
          var newstep = turn.steps[newstepid] = Object.assign({}, step, {
            ARTIFACTS: ARTIFACTS,
            MARKS: MARKS,
            UNITDATA: UNITDATA,
            UNITLAYERS: UNITLAYERS,
            stepid: newstepid,
            name: 'kill',
            path: step.path.concat('kill')
          });
          turn.links[newstepid] = {};
          if (Object.keys(
              (function() {
                var ret = {},
                  s0 = UNITLAYERS.myunits,
                  s1 = TERRAIN.opphomerow;
                for (var key in s0) {
                  if (s1[key]) {
                    ret[key] = s0[key];
                  }
                }
                return ret;
              }()) ||  {}).length !== 0) {
            var winner = 1;
            var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
            turn.links[newstepid][result] = 'infiltration';
          } else turn.links[newstepid].endturn = "start" + otherplayer;
          return newstep;
        };
      game.kill1instruction = function(step) {
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
          "madetowers": {},
          "madewalls": {},
          "killtargets": {}
        };
        var UNITDATA = step.UNITDATA;
        var UNITLAYERS = {
          "towers": {},
          "mytowers": {},
          "opptowers": {},
          "neutraltowers": {},
          "walls": {},
          "mywalls": {},
          "oppwalls": {},
          "neutralwalls": {},
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
          path: []
        };
        var newlinks = turn.links.root;
        for (var linkpos in UNITLAYERS.mytowers) {
          newlinks[linkpos] = 'selecttower1';
        }
        return turn;
      }
      game.start1instruction = function(step) {
        return '';
      };
      game.brain_Steve_1 =
        function(step) {
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          ARTIFACTS.oppmoves = {};
          ARTIFACTS.oppheavythreats = {};
          ARTIFACTS.opplightthreats = {};
          var BLOCKS =
            (function() {
              var k, ret = {},
                s0 = UNITLAYERS.towers,
                s1 = UNITLAYERS.mywalls;
              for (k in s0) {
                ret[k] = 1;
              }
              for (k in s1) {
                ret[k] = 1;
              }
              return ret;
            }());
          var walkstarts = UNITLAYERS.opptowers;
          for (var STARTPOS in walkstarts) {
            var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
            for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
              var walkedsquares = [];
              var MAX = 2;
              var POS = STARTPOS;
              var LENGTH = 0;
              while (LENGTH < MAX && (POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && !BLOCKS[POS]) {
                walkedsquares.push(POS);
                LENGTH++;
              }
              var WALKLENGTH = walkedsquares.length;
              var STEP = 0;
              for (var walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
                POS = walkedsquares[walkstepper];
                STEP++;
                if (((WALKLENGTH === 2) && (STEP === 2))) {
                  ARTIFACTS['oppmoves'][POS] = {};
                }
              }
            }
          }
          var filtersourcelayer = TERRAIN.mythreatrow;
          for (var POS in filtersourcelayer) {
            var filtertargetlayer = ARTIFACTS[(!!(UNITLAYERS.oppwalls[POS]) ? 'oppheavythreats' : 'opplightthreats')];
            if (filtersourcelayer[POS]) {
              var filterobj = filtersourcelayer[POS];
              if (!!(ARTIFACTS.oppmoves[POS])) {
                filtertargetlayer[POS] = filterobj;
              } 
            } 
          }
          return 2 * Object.keys(UNITLAYERS.mytowers).length + Object.keys(UNITLAYERS.mytowers).reduce(function(mem, pos) {
            return mem + (mybasic[pos] || 0);
          }, 0) + 2 * Object.keys(UNITLAYERS.mytowers).reduce(function(mem, pos) {
            return mem + (mybasic[pos] || 0);
          }, 0) - 10000 * Object.keys(
            (function() {
              var k, ret = {},
                s0 = ARTIFACTS.oppmoves,
                s1 = TERRAIN.myhomerow;
              for (k in s0) {
                ret[k] = 1;
              }
              for (k in s1) {
                ret[k] = 1;
              }
              return ret;
            }())).length - 20 * Object.keys(ARTIFACTS.opplightthreats).length - 500 * Object.keys(ARTIFACTS.oppheavythreats).length;
        };
      game.brain_Steve_1_detailed =
        function(step) {
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          ARTIFACTS.oppmoves = {};
          ARTIFACTS.oppheavythreats = {};
          ARTIFACTS.opplightthreats = {};
          var BLOCKS =
            (function() {
              var k, ret = {},
                s0 = UNITLAYERS.towers,
                s1 = UNITLAYERS.mywalls;
              for (k in s0) {
                ret[k] = 1;
              }
              for (k in s1) {
                ret[k] = 1;
              }
              return ret;
            }());
          var walkstarts = UNITLAYERS.opptowers;
          for (var STARTPOS in walkstarts) {
            var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
            for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
              var walkedsquares = [];
              var MAX = 2;
              var POS = STARTPOS;
              var LENGTH = 0;
              while (LENGTH < MAX && (POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && !BLOCKS[POS]) {
                walkedsquares.push(POS);
                LENGTH++;
              }
              var WALKLENGTH = walkedsquares.length;
              var STEP = 0;
              for (var walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
                POS = walkedsquares[walkstepper];
                STEP++;
                if (((WALKLENGTH === 2) && (STEP === 2))) {
                  ARTIFACTS['oppmoves'][POS] = {};
                }
              }
            }
          }
          var filtersourcelayer = TERRAIN.mythreatrow;
          for (var POS in filtersourcelayer) {
            var filtertargetlayer = ARTIFACTS[(!!(UNITLAYERS.oppwalls[POS]) ? 'oppheavythreats' : 'opplightthreats')];
            if (filtersourcelayer[POS]) {
              var filterobj = filtersourcelayer[POS];
              if (!!(ARTIFACTS.oppmoves[POS])) {
                filtertargetlayer[POS] = filterobj;
              } 
            } 
          }
          return {
            mytowercount: 2 * Object.keys(UNITLAYERS.mytowers).length,
            mywallpos: Object.keys(UNITLAYERS.mytowers).reduce(function(mem, pos) {
              return mem + (mybasic[pos] || 0);
            }, 0),
            mytowerpos: 2 * Object.keys(UNITLAYERS.mytowers).reduce(function(mem, pos) {
              return mem + (mybasic[pos] || 0);
            }, 0),
            oppwinmoves: -10000 * Object.keys(
              (function() {
                var k, ret = {},
                  s0 = ARTIFACTS.oppmoves,
                  s1 = TERRAIN.myhomerow;
                for (k in s0) {
                  ret[k] = 1;
                }
                for (k in s1) {
                  ret[k] = 1;
                }
                return ret;
              }())).length,
            opplightthreats: -20 * Object.keys(ARTIFACTS.opplightthreats).length,
            oppheavythreats: -500 * Object.keys(ARTIFACTS.oppheavythreats).length
          };
        };
      game.brain_Joe_1 =
        function(step) {
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          ARTIFACTS.oppmoves = {};
          var BLOCKS =
            (function() {
              var k, ret = {},
                s0 = UNITLAYERS.towers,
                s1 = UNITLAYERS.mywalls;
              for (k in s0) {
                ret[k] = 1;
              }
              for (k in s1) {
                ret[k] = 1;
              }
              return ret;
            }());
          var walkstarts = UNITLAYERS.opptowers;
          for (var STARTPOS in walkstarts) {
            var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
            for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
              var walkedsquares = [];
              var MAX = 2;
              var POS = STARTPOS;
              var LENGTH = 0;
              while (LENGTH < MAX && (POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && !BLOCKS[POS]) {
                walkedsquares.push(POS);
                LENGTH++;
              }
              var WALKLENGTH = walkedsquares.length;
              var STEP = 0;
              for (var walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
                POS = walkedsquares[walkstepper];
                STEP++;
                if (((WALKLENGTH === 2) && (STEP === 2))) {
                  ARTIFACTS['oppmoves'][POS] = {};
                }
              }
            }
          }
          return 2 * Object.keys(UNITLAYERS.mytowers).length + Object.keys(UNITLAYERS.mytowers).reduce(function(mem, pos) {
            return mem + (mybasic[pos] || 0);
          }, 0) + 2 * Object.keys(UNITLAYERS.mytowers).reduce(function(mem, pos) {
            return mem + (mybasic[pos] || 0);
          }, 0) - 100 * Object.keys(
            (function() {
              var k, ret = {},
                s0 = ARTIFACTS.oppmoves,
                s1 = TERRAIN.myhomerow;
              for (k in s0) {
                ret[k] = 1;
              }
              for (k in s1) {
                ret[k] = 1;
              }
              return ret;
            }())).length;
        };
      game.brain_Joe_1_detailed =
        function(step) {
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          ARTIFACTS.oppmoves = {};
          var BLOCKS =
            (function() {
              var k, ret = {},
                s0 = UNITLAYERS.towers,
                s1 = UNITLAYERS.mywalls;
              for (k in s0) {
                ret[k] = 1;
              }
              for (k in s1) {
                ret[k] = 1;
              }
              return ret;
            }());
          var walkstarts = UNITLAYERS.opptowers;
          for (var STARTPOS in walkstarts) {
            var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
            for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
              var walkedsquares = [];
              var MAX = 2;
              var POS = STARTPOS;
              var LENGTH = 0;
              while (LENGTH < MAX && (POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && !BLOCKS[POS]) {
                walkedsquares.push(POS);
                LENGTH++;
              }
              var WALKLENGTH = walkedsquares.length;
              var STEP = 0;
              for (var walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
                POS = walkedsquares[walkstepper];
                STEP++;
                if (((WALKLENGTH === 2) && (STEP === 2))) {
                  ARTIFACTS['oppmoves'][POS] = {};
                }
              }
            }
          }
          return {
            mytowercount: 2 * Object.keys(UNITLAYERS.mytowers).length,
            mywallpos: Object.keys(UNITLAYERS.mytowers).reduce(function(mem, pos) {
              return mem + (mybasic[pos] || 0);
            }, 0),
            mytowerpos: 2 * Object.keys(UNITLAYERS.mytowers).reduce(function(mem, pos) {
              return mem + (mybasic[pos] || 0);
            }, 0),
            oppwinmoves: -100 * Object.keys(
              (function() {
                var k, ret = {},
                  s0 = ARTIFACTS.oppmoves,
                  s1 = TERRAIN.myhomerow;
                for (k in s0) {
                  ret[k] = 1;
                }
                for (k in s1) {
                  ret[k] = 1;
                }
                return ret;
              }())).length
          };
        };
      game.brain_Clive_1 =
        function(step) {
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          ARTIFACTS.mymoves = {};
          ARTIFACTS.oppmoves = {};
          var BLOCKS =
            (function() {
              var k, ret = {},
                s0 = UNITLAYERS.towers,
                s1 = UNITLAYERS.oppwalls;
              for (k in s0) {
                ret[k] = 1;
              }
              for (k in s1) {
                ret[k] = 1;
              }
              return ret;
            }());
          var walkstarts = UNITLAYERS.mytowers;
          for (var STARTPOS in walkstarts) {
            var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
            for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
              var walkedsquares = [];
              var MAX = 2;
              var POS = STARTPOS;
              var LENGTH = 0;
              while (LENGTH < MAX && (POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && !BLOCKS[POS]) {
                walkedsquares.push(POS);
                LENGTH++;
              }
              var WALKLENGTH = walkedsquares.length;
              var STEP = 0;
              for (var walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
                POS = walkedsquares[walkstepper];
                STEP++;
                if (((WALKLENGTH === 2) && (STEP === 2))) {
                  ARTIFACTS['mymoves'][POS] = {};
                }
              }
            }
          }
          var BLOCKS =
            (function() {
              var k, ret = {},
                s0 = UNITLAYERS.towers,
                s1 = UNITLAYERS.mywalls;
              for (k in s0) {
                ret[k] = 1;
              }
              for (k in s1) {
                ret[k] = 1;
              }
              return ret;
            }());
          var walkstarts = UNITLAYERS.opptowers;
          for (var STARTPOS in walkstarts) {
            var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
            for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
              var walkedsquares = [];
              var MAX = 2;
              var POS = STARTPOS;
              var LENGTH = 0;
              while (LENGTH < MAX && (POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && !BLOCKS[POS]) {
                walkedsquares.push(POS);
                LENGTH++;
              }
              var WALKLENGTH = walkedsquares.length;
              var STEP = 0;
              for (var walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
                POS = walkedsquares[walkstepper];
                STEP++;
                if (((WALKLENGTH === 2) && (STEP === 2))) {
                  ARTIFACTS['oppmoves'][POS] = {};
                }
              }
            }
          }
          return Object.keys(ARTIFACTS.mymoves).length + 3 * Object.keys(UNITLAYERS.mytowers).reduce(function(mem, pos) {
            return mem + (mybasic[pos] || 0);
          }, 0) + Object.keys(UNITLAYERS.mytowers).reduce(function(mem, pos) {
            return mem + (mybasic[pos] || 0);
          }, 0) - Object.keys(ARTIFACTS.oppmoves).length;
        };
      game.brain_Clive_1_detailed =
        function(step) {
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          ARTIFACTS.mymoves = {};
          ARTIFACTS.oppmoves = {};
          var BLOCKS =
            (function() {
              var k, ret = {},
                s0 = UNITLAYERS.towers,
                s1 = UNITLAYERS.oppwalls;
              for (k in s0) {
                ret[k] = 1;
              }
              for (k in s1) {
                ret[k] = 1;
              }
              return ret;
            }());
          var walkstarts = UNITLAYERS.mytowers;
          for (var STARTPOS in walkstarts) {
            var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
            for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
              var walkedsquares = [];
              var MAX = 2;
              var POS = STARTPOS;
              var LENGTH = 0;
              while (LENGTH < MAX && (POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && !BLOCKS[POS]) {
                walkedsquares.push(POS);
                LENGTH++;
              }
              var WALKLENGTH = walkedsquares.length;
              var STEP = 0;
              for (var walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
                POS = walkedsquares[walkstepper];
                STEP++;
                if (((WALKLENGTH === 2) && (STEP === 2))) {
                  ARTIFACTS['mymoves'][POS] = {};
                }
              }
            }
          }
          var BLOCKS =
            (function() {
              var k, ret = {},
                s0 = UNITLAYERS.towers,
                s1 = UNITLAYERS.mywalls;
              for (k in s0) {
                ret[k] = 1;
              }
              for (k in s1) {
                ret[k] = 1;
              }
              return ret;
            }());
          var walkstarts = UNITLAYERS.opptowers;
          for (var STARTPOS in walkstarts) {
            var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
            for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
              var walkedsquares = [];
              var MAX = 2;
              var POS = STARTPOS;
              var LENGTH = 0;
              while (LENGTH < MAX && (POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && !BLOCKS[POS]) {
                walkedsquares.push(POS);
                LENGTH++;
              }
              var WALKLENGTH = walkedsquares.length;
              var STEP = 0;
              for (var walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
                POS = walkedsquares[walkstepper];
                STEP++;
                if (((WALKLENGTH === 2) && (STEP === 2))) {
                  ARTIFACTS['oppmoves'][POS] = {};
                }
              }
            }
          }
          return {
            mymoves: Object.keys(ARTIFACTS.mymoves).length,
            mytowerpos: 3 * Object.keys(UNITLAYERS.mytowers).reduce(function(mem, pos) {
              return mem + (mybasic[pos] || 0);
            }, 0),
            mywallpos: Object.keys(UNITLAYERS.mytowers).reduce(function(mem, pos) {
              return mem + (mybasic[pos] || 0);
            }, 0),
            oppmoves: -Object.keys(ARTIFACTS.oppmoves).length
          };
        };
      game.debug1 = function() {
        return {
          TERRAIN: TERRAIN
        };
      }
    })();
    (function() {
      var TERRAIN = terrainLayers(boardDef, 2, {
        "threatrow": {
          "1": [
            ["rect", "a3", "h3"]
          ],
          "2": [
            ["rect", "a5", "h5"]
          ]
        }
      });
      var ownernames = ["neutral", "opp", "my"];
      var player = 2;
      var otherplayer = 1;
      var oppbasic = {
        "h1": 0,
        "g1": 0,
        "f1": 0,
        "e1": 0,
        "d1": 0,
        "c1": 0,
        "b1": 0,
        "a1": 0,
        "h2": 0,
        "g2": 0,
        "f2": 1,
        "e2": 1,
        "d2": 1,
        "c2": 1,
        "b2": 0,
        "a2": 0,
        "h3": 0,
        "g3": 0,
        "f3": 2,
        "e3": 2,
        "d3": 2,
        "c3": 2,
        "b3": 0,
        "a3": 0,
        "h4": 0,
        "g4": 0,
        "f4": 3,
        "e4": 3,
        "d4": 3,
        "c4": 3,
        "b4": 0,
        "a4": 0,
        "h5": 2,
        "g5": 3,
        "f5": 4,
        "e5": 4,
        "d5": 4,
        "c5": 4,
        "b5": 3,
        "a5": 2,
        "h6": 1,
        "g6": 1,
        "f6": 1,
        "e6": 1,
        "d6": 1,
        "c6": 1,
        "b6": 1,
        "a6": 1,
        "h7": 0,
        "g7": 0,
        "f7": 0,
        "e7": 0,
        "d7": 0,
        "c7": 0,
        "b7": 0,
        "a7": 0
      };
      var mybasic = {
        "h1": 0,
        "g1": 0,
        "f1": 0,
        "e1": 0,
        "d1": 0,
        "c1": 0,
        "b1": 0,
        "a1": 0,
        "h2": 1,
        "g2": 1,
        "f2": 1,
        "e2": 1,
        "d2": 1,
        "c2": 1,
        "b2": 1,
        "a2": 1,
        "h3": 2,
        "g3": 3,
        "f3": 4,
        "e3": 4,
        "d3": 4,
        "c3": 4,
        "b3": 3,
        "a3": 2,
        "h4": 0,
        "g4": 0,
        "f4": 3,
        "e4": 3,
        "d4": 3,
        "c4": 3,
        "b4": 0,
        "a4": 0,
        "h5": 0,
        "g5": 0,
        "f5": 2,
        "e5": 2,
        "d5": 2,
        "c5": 2,
        "b5": 0,
        "a5": 0,
        "h6": 0,
        "g6": 0,
        "f6": 1,
        "e6": 1,
        "d6": 1,
        "c6": 1,
        "b6": 0,
        "a6": 0,
        "h7": 0,
        "g7": 0,
        "f7": 0,
        "e7": 0,
        "d7": 0,
        "c7": 0,
        "b7": 0,
        "a7": 0
      };
      game.selecttower2 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          movetargets: Object.assign({}, step.ARTIFACTS.movetargets),
          killtargets: Object.assign({}, step.ARTIFACTS.killtargets)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selecttower: markpos
        };
        var BLOCKS =
          (function() {
            var k, ret = {},
              s0 = UNITLAYERS.oppunits,
              s1 = UNITLAYERS.mytowers;
            for (k in s0) {
              ret[k] = 1;
            }
            for (k in s1) {
              ret[k] = 1;
            }
            return ret;
          }());
        var STARTPOS = MARKS['selecttower'];
        var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
          var DIR = allwalkerdirs[walkerdirnbr];
          var walkedsquares = [];
          var MAX = 2;
          var POS = STARTPOS;
          var LENGTH = 0;
          while (LENGTH < MAX && (POS = connections[POS][DIR]) && !BLOCKS[POS]) {
            walkedsquares.push(POS);
            LENGTH++;
          }
          var WALKLENGTH = walkedsquares.length;
          var STEP = 0;
          for (var walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
            POS = walkedsquares[walkstepper];
            STEP++;
            if (((WALKLENGTH === 2) && (STEP === 2))) {
              ARTIFACTS['movetargets'][POS] = {
                dir: DIR
              };
            }
          }
        }
        var STARTPOS = MARKS['selecttower'];
        var neighbourdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        var startconnections = connections[STARTPOS];
        for (var dirnbr = 0; dirnbr < 8; dirnbr++) {
          var POS = startconnections[neighbourdirs[dirnbr]];
          if (POS && UNITLAYERS.oppwalls[POS]) {
            ARTIFACTS['killtargets'][POS] = {};
          }
        } 
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selecttower'
        });
        turn.links[newstepid] = {};
        var newlinks = turn.links[newstepid];
        for (var linkpos in ARTIFACTS.movetargets) {
          newlinks[linkpos] = 'selectmove2';
        }
        var newlinks = turn.links[newstepid];
        for (var linkpos in ARTIFACTS.killtargets) {
          newlinks[linkpos] = 'selectkill2';
        }
        return newstep;
      };
      game.selecttower2instruction = function(step) {
        return '';
      };
      game.selectmove2 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          madetowers: Object.assign({}, step.ARTIFACTS.madetowers),
          madewalls: Object.assign({}, step.ARTIFACTS.madewalls)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectmove: markpos,
          selecttower: step.MARKS.selecttower
        };
        var STARTPOS = MARKS['selectmove'];
        var POS = connections[STARTPOS][relativedirs[(ARTIFACTS.movetargets[MARKS['selectmove']] || {})['dir'] - 2 + 5]];
        if (POS) {
          ARTIFACTS[(!!(UNITLAYERS.myunits[POS]) ? 'madetowers' : 'madewalls')][POS] = {};
        }
        ARTIFACTS[(!!(UNITLAYERS.myunits[MARKS['selectmove']]) ? 'madetowers' : 'madewalls')][STARTPOS] = {};
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
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
      game.selectkill2 = function(turn, step, markpos) {
        var MARKS = {
          selectkill: markpos,
          selecttower: step.MARKS.selecttower
        };
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectkill'
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].kill = 'kill2';
        return newstep;
      };
      game.selectkill2instruction = function(step) {
        return '';
      };
      game.move2 =
        function(turn, step) {
          var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
          var MARKS = step.MARKS;
          var UNITDATA = Object.assign({}, step.UNITDATA);
          var clones = step.clones;
          var UNITLAYERS = step.UNITLAYERS;
          delete UNITDATA[(UNITLAYERS.units[MARKS['selecttower']]  || {}).id];
          for (var POS in ARTIFACTS.madetowers) {
            var unitid = (UNITLAYERS.units[POS]  || {}).id;
            if (unitid) {
              UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
                'group': 'towers'
              });
            }
          }
          for (var POS in ARTIFACTS.madewalls) {
            var newunitid = 'spawn' + (clones++);
            UNITDATA[newunitid] = {
              pos: POS,
              id: newunitid,
              group: 'walls',
              owner: 2,
              from: MARKS['selecttower']
            };
          }
          MARKS = {};
          UNITLAYERS = {
            "towers": {},
            "mytowers": {},
            "opptowers": {},
            "neutraltowers": {},
            "walls": {},
            "mywalls": {},
            "oppwalls": {},
            "neutralwalls": {},
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
            "madetowers": {},
            "madewalls": {},
            "killtargets": {}
          };
          var newstepid = step.stepid + '-' + 'move';
          var newstep = turn.steps[newstepid] = Object.assign({}, step, {
            ARTIFACTS: ARTIFACTS,
            MARKS: MARKS,
            UNITDATA: UNITDATA,
            UNITLAYERS: UNITLAYERS,
            stepid: newstepid,
            name: 'move',
            path: step.path.concat('move'),
            clones: clones
          });
          turn.links[newstepid] = {};
          if (Object.keys(
              (function() {
                var ret = {},
                  s0 = UNITLAYERS.myunits,
                  s1 = TERRAIN.opphomerow;
                for (var key in s0) {
                  if (s1[key]) {
                    ret[key] = s0[key];
                  }
                }
                return ret;
              }()) ||  {}).length !== 0) {
            var winner = 2;
            var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
            turn.links[newstepid][result] = 'infiltration';
          } else turn.links[newstepid].endturn = "start" + otherplayer;
          return newstep;
        };
      game.move2instruction = function(step) {
        return '';
      };
      game.kill2 =
        function(turn, step) {
          var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
          var MARKS = step.MARKS;
          var UNITDATA = Object.assign({}, step.UNITDATA);
          var UNITLAYERS = step.UNITLAYERS;
          var unitid = (UNITLAYERS.units[MARKS['selecttower']]  || {}).id;
          if (unitid) {
            UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
              'group': 'walls'
            });
          }
          delete UNITDATA[(UNITLAYERS.units[MARKS['selectkill']]  || {}).id];
          MARKS = {};
          UNITLAYERS = {
            "towers": {},
            "mytowers": {},
            "opptowers": {},
            "neutraltowers": {},
            "walls": {},
            "mywalls": {},
            "oppwalls": {},
            "neutralwalls": {},
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
            "madetowers": {},
            "madewalls": {},
            "killtargets": {}
          };
          var newstepid = step.stepid + '-' + 'kill';
          var newstep = turn.steps[newstepid] = Object.assign({}, step, {
            ARTIFACTS: ARTIFACTS,
            MARKS: MARKS,
            UNITDATA: UNITDATA,
            UNITLAYERS: UNITLAYERS,
            stepid: newstepid,
            name: 'kill',
            path: step.path.concat('kill')
          });
          turn.links[newstepid] = {};
          if (Object.keys(
              (function() {
                var ret = {},
                  s0 = UNITLAYERS.myunits,
                  s1 = TERRAIN.opphomerow;
                for (var key in s0) {
                  if (s1[key]) {
                    ret[key] = s0[key];
                  }
                }
                return ret;
              }()) ||  {}).length !== 0) {
            var winner = 2;
            var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
            turn.links[newstepid][result] = 'infiltration';
          } else turn.links[newstepid].endturn = "start" + otherplayer;
          return newstep;
        };
      game.kill2instruction = function(step) {
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
          "madetowers": {},
          "madewalls": {},
          "killtargets": {}
        };
        var UNITDATA = step.UNITDATA;
        var UNITLAYERS = {
          "towers": {},
          "mytowers": {},
          "opptowers": {},
          "neutraltowers": {},
          "walls": {},
          "mywalls": {},
          "oppwalls": {},
          "neutralwalls": {},
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
          path: []
        };
        var newlinks = turn.links.root;
        for (var linkpos in UNITLAYERS.mytowers) {
          newlinks[linkpos] = 'selecttower2';
        }
        return turn;
      }
      game.start2instruction = function(step) {
        return '';
      };
      game.brain_Steve_2 =
        function(step) {
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          ARTIFACTS.oppmoves = {};
          ARTIFACTS.oppheavythreats = {};
          ARTIFACTS.opplightthreats = {};
          var BLOCKS =
            (function() {
              var k, ret = {},
                s0 = UNITLAYERS.towers,
                s1 = UNITLAYERS.mywalls;
              for (k in s0) {
                ret[k] = 1;
              }
              for (k in s1) {
                ret[k] = 1;
              }
              return ret;
            }());
          var walkstarts = UNITLAYERS.opptowers;
          for (var STARTPOS in walkstarts) {
            var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
            for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
              var walkedsquares = [];
              var MAX = 2;
              var POS = STARTPOS;
              var LENGTH = 0;
              while (LENGTH < MAX && (POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && !BLOCKS[POS]) {
                walkedsquares.push(POS);
                LENGTH++;
              }
              var WALKLENGTH = walkedsquares.length;
              var STEP = 0;
              for (var walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
                POS = walkedsquares[walkstepper];
                STEP++;
                if (((WALKLENGTH === 2) && (STEP === 2))) {
                  ARTIFACTS['oppmoves'][POS] = {};
                }
              }
            }
          }
          var filtersourcelayer = TERRAIN.mythreatrow;
          for (var POS in filtersourcelayer) {
            var filtertargetlayer = ARTIFACTS[(!!(UNITLAYERS.oppwalls[POS]) ? 'oppheavythreats' : 'opplightthreats')];
            if (filtersourcelayer[POS]) {
              var filterobj = filtersourcelayer[POS];
              if (!!(ARTIFACTS.oppmoves[POS])) {
                filtertargetlayer[POS] = filterobj;
              } 
            } 
          }
          return 2 * Object.keys(UNITLAYERS.mytowers).length + Object.keys(UNITLAYERS.mytowers).reduce(function(mem, pos) {
            return mem + (mybasic[pos] || 0);
          }, 0) + 2 * Object.keys(UNITLAYERS.mytowers).reduce(function(mem, pos) {
            return mem + (mybasic[pos] || 0);
          }, 0) - 10000 * Object.keys(
            (function() {
              var k, ret = {},
                s0 = ARTIFACTS.oppmoves,
                s1 = TERRAIN.myhomerow;
              for (k in s0) {
                ret[k] = 1;
              }
              for (k in s1) {
                ret[k] = 1;
              }
              return ret;
            }())).length - 20 * Object.keys(ARTIFACTS.opplightthreats).length - 500 * Object.keys(ARTIFACTS.oppheavythreats).length;
        };
      game.brain_Steve_2_detailed =
        function(step) {
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          ARTIFACTS.oppmoves = {};
          ARTIFACTS.oppheavythreats = {};
          ARTIFACTS.opplightthreats = {};
          var BLOCKS =
            (function() {
              var k, ret = {},
                s0 = UNITLAYERS.towers,
                s1 = UNITLAYERS.mywalls;
              for (k in s0) {
                ret[k] = 1;
              }
              for (k in s1) {
                ret[k] = 1;
              }
              return ret;
            }());
          var walkstarts = UNITLAYERS.opptowers;
          for (var STARTPOS in walkstarts) {
            var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
            for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
              var walkedsquares = [];
              var MAX = 2;
              var POS = STARTPOS;
              var LENGTH = 0;
              while (LENGTH < MAX && (POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && !BLOCKS[POS]) {
                walkedsquares.push(POS);
                LENGTH++;
              }
              var WALKLENGTH = walkedsquares.length;
              var STEP = 0;
              for (var walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
                POS = walkedsquares[walkstepper];
                STEP++;
                if (((WALKLENGTH === 2) && (STEP === 2))) {
                  ARTIFACTS['oppmoves'][POS] = {};
                }
              }
            }
          }
          var filtersourcelayer = TERRAIN.mythreatrow;
          for (var POS in filtersourcelayer) {
            var filtertargetlayer = ARTIFACTS[(!!(UNITLAYERS.oppwalls[POS]) ? 'oppheavythreats' : 'opplightthreats')];
            if (filtersourcelayer[POS]) {
              var filterobj = filtersourcelayer[POS];
              if (!!(ARTIFACTS.oppmoves[POS])) {
                filtertargetlayer[POS] = filterobj;
              } 
            } 
          }
          return {
            mytowercount: 2 * Object.keys(UNITLAYERS.mytowers).length,
            mywallpos: Object.keys(UNITLAYERS.mytowers).reduce(function(mem, pos) {
              return mem + (mybasic[pos] || 0);
            }, 0),
            mytowerpos: 2 * Object.keys(UNITLAYERS.mytowers).reduce(function(mem, pos) {
              return mem + (mybasic[pos] || 0);
            }, 0),
            oppwinmoves: -10000 * Object.keys(
              (function() {
                var k, ret = {},
                  s0 = ARTIFACTS.oppmoves,
                  s1 = TERRAIN.myhomerow;
                for (k in s0) {
                  ret[k] = 1;
                }
                for (k in s1) {
                  ret[k] = 1;
                }
                return ret;
              }())).length,
            opplightthreats: -20 * Object.keys(ARTIFACTS.opplightthreats).length,
            oppheavythreats: -500 * Object.keys(ARTIFACTS.oppheavythreats).length
          };
        };
      game.brain_Joe_2 =
        function(step) {
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          ARTIFACTS.oppmoves = {};
          var BLOCKS =
            (function() {
              var k, ret = {},
                s0 = UNITLAYERS.towers,
                s1 = UNITLAYERS.mywalls;
              for (k in s0) {
                ret[k] = 1;
              }
              for (k in s1) {
                ret[k] = 1;
              }
              return ret;
            }());
          var walkstarts = UNITLAYERS.opptowers;
          for (var STARTPOS in walkstarts) {
            var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
            for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
              var walkedsquares = [];
              var MAX = 2;
              var POS = STARTPOS;
              var LENGTH = 0;
              while (LENGTH < MAX && (POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && !BLOCKS[POS]) {
                walkedsquares.push(POS);
                LENGTH++;
              }
              var WALKLENGTH = walkedsquares.length;
              var STEP = 0;
              for (var walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
                POS = walkedsquares[walkstepper];
                STEP++;
                if (((WALKLENGTH === 2) && (STEP === 2))) {
                  ARTIFACTS['oppmoves'][POS] = {};
                }
              }
            }
          }
          return 2 * Object.keys(UNITLAYERS.mytowers).length + Object.keys(UNITLAYERS.mytowers).reduce(function(mem, pos) {
            return mem + (mybasic[pos] || 0);
          }, 0) + 2 * Object.keys(UNITLAYERS.mytowers).reduce(function(mem, pos) {
            return mem + (mybasic[pos] || 0);
          }, 0) - 100 * Object.keys(
            (function() {
              var k, ret = {},
                s0 = ARTIFACTS.oppmoves,
                s1 = TERRAIN.myhomerow;
              for (k in s0) {
                ret[k] = 1;
              }
              for (k in s1) {
                ret[k] = 1;
              }
              return ret;
            }())).length;
        };
      game.brain_Joe_2_detailed =
        function(step) {
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          ARTIFACTS.oppmoves = {};
          var BLOCKS =
            (function() {
              var k, ret = {},
                s0 = UNITLAYERS.towers,
                s1 = UNITLAYERS.mywalls;
              for (k in s0) {
                ret[k] = 1;
              }
              for (k in s1) {
                ret[k] = 1;
              }
              return ret;
            }());
          var walkstarts = UNITLAYERS.opptowers;
          for (var STARTPOS in walkstarts) {
            var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
            for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
              var walkedsquares = [];
              var MAX = 2;
              var POS = STARTPOS;
              var LENGTH = 0;
              while (LENGTH < MAX && (POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && !BLOCKS[POS]) {
                walkedsquares.push(POS);
                LENGTH++;
              }
              var WALKLENGTH = walkedsquares.length;
              var STEP = 0;
              for (var walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
                POS = walkedsquares[walkstepper];
                STEP++;
                if (((WALKLENGTH === 2) && (STEP === 2))) {
                  ARTIFACTS['oppmoves'][POS] = {};
                }
              }
            }
          }
          return {
            mytowercount: 2 * Object.keys(UNITLAYERS.mytowers).length,
            mywallpos: Object.keys(UNITLAYERS.mytowers).reduce(function(mem, pos) {
              return mem + (mybasic[pos] || 0);
            }, 0),
            mytowerpos: 2 * Object.keys(UNITLAYERS.mytowers).reduce(function(mem, pos) {
              return mem + (mybasic[pos] || 0);
            }, 0),
            oppwinmoves: -100 * Object.keys(
              (function() {
                var k, ret = {},
                  s0 = ARTIFACTS.oppmoves,
                  s1 = TERRAIN.myhomerow;
                for (k in s0) {
                  ret[k] = 1;
                }
                for (k in s1) {
                  ret[k] = 1;
                }
                return ret;
              }())).length
          };
        };
      game.brain_Clive_2 =
        function(step) {
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          ARTIFACTS.mymoves = {};
          ARTIFACTS.oppmoves = {};
          var BLOCKS =
            (function() {
              var k, ret = {},
                s0 = UNITLAYERS.towers,
                s1 = UNITLAYERS.oppwalls;
              for (k in s0) {
                ret[k] = 1;
              }
              for (k in s1) {
                ret[k] = 1;
              }
              return ret;
            }());
          var walkstarts = UNITLAYERS.mytowers;
          for (var STARTPOS in walkstarts) {
            var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
            for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
              var walkedsquares = [];
              var MAX = 2;
              var POS = STARTPOS;
              var LENGTH = 0;
              while (LENGTH < MAX && (POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && !BLOCKS[POS]) {
                walkedsquares.push(POS);
                LENGTH++;
              }
              var WALKLENGTH = walkedsquares.length;
              var STEP = 0;
              for (var walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
                POS = walkedsquares[walkstepper];
                STEP++;
                if (((WALKLENGTH === 2) && (STEP === 2))) {
                  ARTIFACTS['mymoves'][POS] = {};
                }
              }
            }
          }
          var BLOCKS =
            (function() {
              var k, ret = {},
                s0 = UNITLAYERS.towers,
                s1 = UNITLAYERS.mywalls;
              for (k in s0) {
                ret[k] = 1;
              }
              for (k in s1) {
                ret[k] = 1;
              }
              return ret;
            }());
          var walkstarts = UNITLAYERS.opptowers;
          for (var STARTPOS in walkstarts) {
            var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
            for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
              var walkedsquares = [];
              var MAX = 2;
              var POS = STARTPOS;
              var LENGTH = 0;
              while (LENGTH < MAX && (POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && !BLOCKS[POS]) {
                walkedsquares.push(POS);
                LENGTH++;
              }
              var WALKLENGTH = walkedsquares.length;
              var STEP = 0;
              for (var walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
                POS = walkedsquares[walkstepper];
                STEP++;
                if (((WALKLENGTH === 2) && (STEP === 2))) {
                  ARTIFACTS['oppmoves'][POS] = {};
                }
              }
            }
          }
          return Object.keys(ARTIFACTS.mymoves).length + 3 * Object.keys(UNITLAYERS.mytowers).reduce(function(mem, pos) {
            return mem + (mybasic[pos] || 0);
          }, 0) + Object.keys(UNITLAYERS.mytowers).reduce(function(mem, pos) {
            return mem + (mybasic[pos] || 0);
          }, 0) - Object.keys(ARTIFACTS.oppmoves).length;
        };
      game.brain_Clive_2_detailed =
        function(step) {
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          ARTIFACTS.mymoves = {};
          ARTIFACTS.oppmoves = {};
          var BLOCKS =
            (function() {
              var k, ret = {},
                s0 = UNITLAYERS.towers,
                s1 = UNITLAYERS.oppwalls;
              for (k in s0) {
                ret[k] = 1;
              }
              for (k in s1) {
                ret[k] = 1;
              }
              return ret;
            }());
          var walkstarts = UNITLAYERS.mytowers;
          for (var STARTPOS in walkstarts) {
            var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
            for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
              var walkedsquares = [];
              var MAX = 2;
              var POS = STARTPOS;
              var LENGTH = 0;
              while (LENGTH < MAX && (POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && !BLOCKS[POS]) {
                walkedsquares.push(POS);
                LENGTH++;
              }
              var WALKLENGTH = walkedsquares.length;
              var STEP = 0;
              for (var walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
                POS = walkedsquares[walkstepper];
                STEP++;
                if (((WALKLENGTH === 2) && (STEP === 2))) {
                  ARTIFACTS['mymoves'][POS] = {};
                }
              }
            }
          }
          var BLOCKS =
            (function() {
              var k, ret = {},
                s0 = UNITLAYERS.towers,
                s1 = UNITLAYERS.mywalls;
              for (k in s0) {
                ret[k] = 1;
              }
              for (k in s1) {
                ret[k] = 1;
              }
              return ret;
            }());
          var walkstarts = UNITLAYERS.opptowers;
          for (var STARTPOS in walkstarts) {
            var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
            for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
              var walkedsquares = [];
              var MAX = 2;
              var POS = STARTPOS;
              var LENGTH = 0;
              while (LENGTH < MAX && (POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && !BLOCKS[POS]) {
                walkedsquares.push(POS);
                LENGTH++;
              }
              var WALKLENGTH = walkedsquares.length;
              var STEP = 0;
              for (var walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
                POS = walkedsquares[walkstepper];
                STEP++;
                if (((WALKLENGTH === 2) && (STEP === 2))) {
                  ARTIFACTS['oppmoves'][POS] = {};
                }
              }
            }
          }
          return {
            mymoves: Object.keys(ARTIFACTS.mymoves).length,
            mytowerpos: 3 * Object.keys(UNITLAYERS.mytowers).reduce(function(mem, pos) {
              return mem + (mybasic[pos] || 0);
            }, 0),
            mywallpos: Object.keys(UNITLAYERS.mytowers).reduce(function(mem, pos) {
              return mem + (mybasic[pos] || 0);
            }, 0),
            oppmoves: -Object.keys(ARTIFACTS.oppmoves).length
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