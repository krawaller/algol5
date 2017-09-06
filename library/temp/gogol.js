(
  function() {
    var game = {};
    game.commands = {
      "deploy": 1,
      "move": 1,
      "jump": 1
    };
    game.graphics = {
      "tiles": {
        "homerow": "playercolour"
      },
      "icons": {
        "kings": "kings",
        "soldiers": "pawns"
      }
    };
    game.board = {
      "height": 8,
      "width": 8,
      "terrain": {
        "homerow": {
          "1": [
            ["rect", "a1", "h1"]
          ],
          "2": [
            ["rect", "a8", "h8"]
          ]
        },
        "edges": [
          ["rect", "a1", "a8"],
          ["rect", "h1", "h8"],
          ["rect", "b8", "g8"],
          ["rect", "b1", "g1"]
        ]
      }
    };
    game.AI = [];
    game.id = "gogol";
    var boardDef = {
      "height": 8,
      "width": 8,
      "terrain": {
        "homerow": {
          "1": [
            ["rect", "a1", "h1"]
          ],
          "2": [
            ["rect", "a8", "h8"]
          ]
        },
        "edges": [
          ["rect", "a1", "a8"],
          ["rect", "h1", "h8"],
          ["rect", "b8", "g8"],
          ["rect", "b1", "g1"]
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
            "soldiers": {
              "1": [
                ["rect", "a1", "h1"]
              ],
              "2": [
                ["rect", "a8", "h8"]
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
      var TERRAIN = terrainLayers(boardDef, 1);
      var ownernames = ["neutral", "my", "opp"];
      var player = 1;
      var otherplayer = 2;
      game.selectkingdeploy1 = function(turn, step, markpos) {
        var MARKS = {
          selectkingdeploy: markpos
        };
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectkingdeploy'
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].deploy = 'deploy1';
        return newstep;
      };
      game.selectkingdeploy1instruction = function(step) {
        return '';
      };
      game.selectunit1 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          kingwalk: Object.assign({}, step.ARTIFACTS.kingwalk),
          adjacentenemies: Object.assign({}, step.ARTIFACTS.adjacentenemies),
          willdie: Object.assign({}, step.ARTIFACTS.willdie),
          jumptargets: Object.assign({}, step.ARTIFACTS.jumptargets)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectunit: markpos
        };
        var BLOCKS = UNITLAYERS.units;
        var walkstarts =
          (function() {
            var k, ret = {},
              s0 = UNITLAYERS.mykings,
              s1 = ARTIFACTS.selectunit;
            for (k in s0) {
              ret[k] = 1;
            }
            for (k in s1) {
              ret[k] = 1;
            }
            return ret;
          }());
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var POS = STARTPOS;
            while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && !BLOCKS[POS]) {
              if (!ARTIFACTS.nokings[POS]) {
                ARTIFACTS['kingwalk'][POS] = {};
              }
            }
          }
        }
        var STARTPOS = MARKS['selectunit'];
        var neighbourdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        var startconnections = connections[STARTPOS];
        for (var dirnbr = 0; dirnbr < 8; dirnbr++) {
          var DIR = neighbourdirs[dirnbr];
          var POS = startconnections[DIR];
          if (POS && UNITLAYERS.oppunits[POS]) {
            ARTIFACTS['adjacentenemies'][POS] = {
              dir: DIR
            };
          }
        } 
        for (var STARTPOS in ARTIFACTS.adjacentenemies) {
          var DIR = relativedirs[(ARTIFACTS.adjacentenemies[STARTPOS] || {})['dir'] - 2 + 1];
          var POS = connections[STARTPOS][DIR];
          if (POS && !
            (function() {
              var k, ret = {},
                s0 = UNITLAYERS.units,
                s1 = (!!(UNITLAYERS.mykings[MARKS['selectunit']]) ? ARTIFACTS.nokings : ARTIFACTS.nosoldiers);
              for (k in s0) {
                ret[k] = 1;
              }
              for (k in s1) {
                ret[k] = 1;
              }
              return ret;
            }())[POS]) {
            var NEIGHBOURCOUNT = 1;
            ARTIFACTS['jumptargets'][POS] = {
              dir: DIR
            };
          }
          if (!!NEIGHBOURCOUNT) {
            ARTIFACTS['willdie'][STARTPOS] = {
              dir: DIR
            };
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
        for (var linkpos in (!!(UNITLAYERS.mykings[MARKS['selectunit']]) ? ARTIFACTS.kingwalk :
            (function() {
              var ret = {},
                s0 = BOARD.board,
                s1 =
                (function() {
                  var k, ret = {},
                    s0 = UNITLAYERS.units,
                    s1 =
                    (function() {
                      var k, ret = {},
                        s0 = ARTIFACTS.nosoldiers,
                        s1 = ARTIFACTS.jumptargets;
                      for (k in s0) {
                        ret[k] = 1;
                      }
                      for (k in s1) {
                        ret[k] = 1;
                      }
                      return ret;
                    }());
                  for (k in s0) {
                    ret[k] = 1;
                  }
                  for (k in s1) {
                    ret[k] = 1;
                  }
                  return ret;
                }());
              for (var key in s0) {
                if (!s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }()))) {
          newlinks[linkpos] = 'selectmovetarget1';
        }
        var newlinks = turn.links[newstepid];
        for (var linkpos in ARTIFACTS.jumptargets) {
          newlinks[linkpos] = 'selectjumptarget1';
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
      game.selectjumptarget1 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          splashed: Object.assign({}, step.ARTIFACTS.splashed)
        });
        var MARKS = {
          selectjumptarget: markpos,
          selectunit: step.MARKS.selectunit
        };
        var filtersourcelayer = ARTIFACTS.willdie;
        var filtertargetlayer = ARTIFACTS.splashed;
        for (var POS in filtersourcelayer) {
          if (filtersourcelayer[POS]) {
            var filterobj = filtersourcelayer[POS];
            if (filterobj.dir === (ARTIFACTS.jumptargets[MARKS['selectjumptarget']] || {})['dir']) {
              filtertargetlayer[POS] = filterobj;
            } 
          } 
        }
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectjumptarget'
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].jump = 'jump1';
        return newstep;
      };
      game.selectjumptarget1instruction = function(step) {
        return '';
      };
      game.deploy1 =
        function(turn, step) {
          var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
          var MARKS = step.MARKS;
          var UNITDATA = Object.assign({}, step.UNITDATA);
          var clones = step.clones;
          var UNITLAYERS = step.UNITLAYERS;
          var newunitid = 'spawn' + (clones++);
          UNITDATA[newunitid] = {
            pos: MARKS['selectkingdeploy'],
            id: newunitid,
            group: 'kings',
            owner: player
          };
          MARKS = {};
          UNITLAYERS = {
            "soldiers": {},
            "mysoldiers": {},
            "oppsoldiers": {},
            "neutralsoldiers": {},
            "kings": {},
            "mykings": {},
            "oppkings": {},
            "neutralkings": {},
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
            "nokings": {},
            "nosoldiers": {},
            "kingwalk": {},
            "adjacentenemies": {},
            "splashed": {},
            "willdie": {},
            "jumptargets": {}
          };
          var newstepid = step.stepid + '-' + 'deploy';
          var newstep = turn.steps[newstepid] = Object.assign({}, step, {
            ARTIFACTS: ARTIFACTS,
            MARKS: MARKS,
            UNITDATA: UNITDATA,
            UNITLAYERS: UNITLAYERS,
            stepid: newstepid,
            name: 'deploy',
            path: step.path.concat('deploy'),
            clones: clones
          });
          turn.links[newstepid] = {};
          if (Object.keys(
              (function() {
                var ret = {},
                  s0 = UNITLAYERS.mykings,
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
          } else
          if (((turn.turn > 2) && Object.keys(UNITLAYERS.oppkings ||  {}).length === 0)) {
            var winner = 1;
            var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
            turn.links[newstepid][result] = 'kingkill';
          } else turn.links[newstepid].endturn = "start" + otherplayer;
          return newstep;
        };
      game.deploy1instruction = function(step) {
        return '';
      };
      game.move1 =
        function(turn, step) {
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
            "soldiers": {},
            "mysoldiers": {},
            "oppsoldiers": {},
            "neutralsoldiers": {},
            "kings": {},
            "mykings": {},
            "oppkings": {},
            "neutralkings": {},
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
            "nokings": {},
            "nosoldiers": {},
            "kingwalk": {},
            "adjacentenemies": {},
            "splashed": {},
            "willdie": {},
            "jumptargets": {}
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
                  s0 = UNITLAYERS.mykings,
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
          } else
          if (((turn.turn > 2) && Object.keys(UNITLAYERS.oppkings ||  {}).length === 0)) {
            var winner = 1;
            var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
            turn.links[newstepid][result] = 'kingkill';
          } else turn.links[newstepid].endturn = "start" + otherplayer;
          return newstep;
        };
      game.move1instruction = function(step) {
        return '';
      };
      game.jump1 =
        function(turn, step) {
          var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
          var MARKS = step.MARKS;
          var UNITDATA = Object.assign({}, step.UNITDATA);
          var UNITLAYERS = step.UNITLAYERS;
          delete UNITDATA[(UNITLAYERS.units[Object.keys(ARTIFACTS.willdie)[0]]  || {}).id];
          var unitid = (UNITLAYERS.units[MARKS['selectunit']]  || {}).id;
          if (unitid) {
            UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
              'pos': MARKS['selectjumptarget']
            });
          }
          MARKS = {};
          UNITLAYERS = {
            "soldiers": {},
            "mysoldiers": {},
            "oppsoldiers": {},
            "neutralsoldiers": {},
            "kings": {},
            "mykings": {},
            "oppkings": {},
            "neutralkings": {},
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
            "nokings": {},
            "nosoldiers": {},
            "kingwalk": {},
            "adjacentenemies": {},
            "splashed": {},
            "willdie": {},
            "jumptargets": {}
          };
          var newstepid = step.stepid + '-' + 'jump';
          var newstep = turn.steps[newstepid] = Object.assign({}, step, {
            ARTIFACTS: ARTIFACTS,
            MARKS: MARKS,
            UNITDATA: UNITDATA,
            UNITLAYERS: UNITLAYERS,
            stepid: newstepid,
            name: 'jump',
            path: step.path.concat('jump')
          });
          turn.links[newstepid] = {};
          if (Object.keys(
              (function() {
                var ret = {},
                  s0 = UNITLAYERS.mykings,
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
          } else
          if (((turn.turn > 2) && Object.keys(UNITLAYERS.oppkings ||  {}).length === 0)) {
            var winner = 1;
            var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
            turn.links[newstepid][result] = 'kingkill';
          } else turn.links[newstepid].endturn = "start" + otherplayer;
          return newstep;
        };
      game.jump1instruction = function(step) {
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
          "nokings": {},
          "nosoldiers": {},
          "kingwalk": {},
          "adjacentenemies": {},
          "splashed": {},
          "willdie": {},
          "jumptargets": {}
        };
        var UNITDATA = step.UNITDATA;
        var UNITLAYERS = {
          "soldiers": {},
          "mysoldiers": {},
          "oppsoldiers": {},
          "neutralsoldiers": {},
          "kings": {},
          "mykings": {},
          "oppkings": {},
          "neutralkings": {},
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
        for (var STARTPOS in
            (function() {
              var ret = {},
                s0 = TERRAIN.edges,
                s1 = UNITLAYERS.mysoldiers;
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }())) {
          var neighbourdirs = (!!(TERRAIN.homerow[STARTPOS]) ? [1, 3, 5, 7] : [1, 5]);
          var nbrofneighbourdirs = neighbourdirs.length;
          var startconnections = connections[STARTPOS];
          for (var dirnbr = 0; dirnbr < nbrofneighbourdirs; dirnbr++) {
            var POS = startconnections[neighbourdirs[dirnbr]];
            if (POS) {
              ARTIFACTS['nokings'][POS] = {};
            }
          } 
        } 
        for (var STARTPOS in UNITLAYERS.mykings) {
          var neighbourdirs = [1, 3, 5, 7];
          var startconnections = connections[STARTPOS];
          for (var dirnbr = 0; dirnbr < 4; dirnbr++) {
            var POS = startconnections[neighbourdirs[dirnbr]];
            if (POS && (!!(TERRAIN.homerow[POS]) || (!!(TERRAIN.edges[STARTPOS]) && !!(TERRAIN.edges[POS])))) {
              ARTIFACTS['nosoldiers'][POS] = {};
            }
          } 
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
        if ((turn.turn > 2)) {
          var newlinks = turn.links.root;
          for (var linkpos in UNITLAYERS.myunits) {
            newlinks[linkpos] = 'selectunit1';
          }
        } else {
          var newlinks = turn.links.root;
          for (var linkpos in
              (function() {
                var ret = {},
                  s0 = BOARD.board,
                  s1 =
                  (function() {
                    var k, ret = {},
                      s0 = UNITLAYERS.units,
                      s1 = ARTIFACTS.nokings;
                    for (k in s0) {
                      ret[k] = 1;
                    }
                    for (k in s1) {
                      ret[k] = 1;
                    }
                    return ret;
                  }());
                for (var key in s0) {
                  if (!s1[key]) {
                    ret[key] = s0[key];
                  }
                }
                return ret;
              }())) {
            newlinks[linkpos] = 'selectkingdeploy1';
          }
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
      var TERRAIN = terrainLayers(boardDef, 2);
      var ownernames = ["neutral", "opp", "my"];
      var player = 2;
      var otherplayer = 1;
      game.selectkingdeploy2 = function(turn, step, markpos) {
        var MARKS = {
          selectkingdeploy: markpos
        };
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectkingdeploy'
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].deploy = 'deploy2';
        return newstep;
      };
      game.selectkingdeploy2instruction = function(step) {
        return '';
      };
      game.selectunit2 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          kingwalk: Object.assign({}, step.ARTIFACTS.kingwalk),
          adjacentenemies: Object.assign({}, step.ARTIFACTS.adjacentenemies),
          willdie: Object.assign({}, step.ARTIFACTS.willdie),
          jumptargets: Object.assign({}, step.ARTIFACTS.jumptargets)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectunit: markpos
        };
        var BLOCKS = UNITLAYERS.units;
        var walkstarts =
          (function() {
            var k, ret = {},
              s0 = UNITLAYERS.mykings,
              s1 = ARTIFACTS.selectunit;
            for (k in s0) {
              ret[k] = 1;
            }
            for (k in s1) {
              ret[k] = 1;
            }
            return ret;
          }());
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var POS = STARTPOS;
            while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && !BLOCKS[POS]) {
              if (!ARTIFACTS.nokings[POS]) {
                ARTIFACTS['kingwalk'][POS] = {};
              }
            }
          }
        }
        var STARTPOS = MARKS['selectunit'];
        var neighbourdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        var startconnections = connections[STARTPOS];
        for (var dirnbr = 0; dirnbr < 8; dirnbr++) {
          var DIR = neighbourdirs[dirnbr];
          var POS = startconnections[DIR];
          if (POS && UNITLAYERS.oppunits[POS]) {
            ARTIFACTS['adjacentenemies'][POS] = {
              dir: DIR
            };
          }
        } 
        for (var STARTPOS in ARTIFACTS.adjacentenemies) {
          var DIR = relativedirs[(ARTIFACTS.adjacentenemies[STARTPOS] || {})['dir'] - 2 + 1];
          var POS = connections[STARTPOS][DIR];
          if (POS && !
            (function() {
              var k, ret = {},
                s0 = UNITLAYERS.units,
                s1 = (!!(UNITLAYERS.mykings[MARKS['selectunit']]) ? ARTIFACTS.nokings : ARTIFACTS.nosoldiers);
              for (k in s0) {
                ret[k] = 1;
              }
              for (k in s1) {
                ret[k] = 1;
              }
              return ret;
            }())[POS]) {
            var NEIGHBOURCOUNT = 1;
            ARTIFACTS['jumptargets'][POS] = {
              dir: DIR
            };
          }
          if (!!NEIGHBOURCOUNT) {
            ARTIFACTS['willdie'][STARTPOS] = {
              dir: DIR
            };
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
        for (var linkpos in (!!(UNITLAYERS.mykings[MARKS['selectunit']]) ? ARTIFACTS.kingwalk :
            (function() {
              var ret = {},
                s0 = BOARD.board,
                s1 =
                (function() {
                  var k, ret = {},
                    s0 = UNITLAYERS.units,
                    s1 =
                    (function() {
                      var k, ret = {},
                        s0 = ARTIFACTS.nosoldiers,
                        s1 = ARTIFACTS.jumptargets;
                      for (k in s0) {
                        ret[k] = 1;
                      }
                      for (k in s1) {
                        ret[k] = 1;
                      }
                      return ret;
                    }());
                  for (k in s0) {
                    ret[k] = 1;
                  }
                  for (k in s1) {
                    ret[k] = 1;
                  }
                  return ret;
                }());
              for (var key in s0) {
                if (!s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }()))) {
          newlinks[linkpos] = 'selectmovetarget2';
        }
        var newlinks = turn.links[newstepid];
        for (var linkpos in ARTIFACTS.jumptargets) {
          newlinks[linkpos] = 'selectjumptarget2';
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
      game.selectjumptarget2 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          splashed: Object.assign({}, step.ARTIFACTS.splashed)
        });
        var MARKS = {
          selectjumptarget: markpos,
          selectunit: step.MARKS.selectunit
        };
        var filtersourcelayer = ARTIFACTS.willdie;
        var filtertargetlayer = ARTIFACTS.splashed;
        for (var POS in filtersourcelayer) {
          if (filtersourcelayer[POS]) {
            var filterobj = filtersourcelayer[POS];
            if (filterobj.dir === (ARTIFACTS.jumptargets[MARKS['selectjumptarget']] || {})['dir']) {
              filtertargetlayer[POS] = filterobj;
            } 
          } 
        }
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectjumptarget'
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].jump = 'jump2';
        return newstep;
      };
      game.selectjumptarget2instruction = function(step) {
        return '';
      };
      game.deploy2 =
        function(turn, step) {
          var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
          var MARKS = step.MARKS;
          var UNITDATA = Object.assign({}, step.UNITDATA);
          var clones = step.clones;
          var UNITLAYERS = step.UNITLAYERS;
          var newunitid = 'spawn' + (clones++);
          UNITDATA[newunitid] = {
            pos: MARKS['selectkingdeploy'],
            id: newunitid,
            group: 'kings',
            owner: player
          };
          MARKS = {};
          UNITLAYERS = {
            "soldiers": {},
            "mysoldiers": {},
            "oppsoldiers": {},
            "neutralsoldiers": {},
            "kings": {},
            "mykings": {},
            "oppkings": {},
            "neutralkings": {},
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
            "nokings": {},
            "nosoldiers": {},
            "kingwalk": {},
            "adjacentenemies": {},
            "splashed": {},
            "willdie": {},
            "jumptargets": {}
          };
          var newstepid = step.stepid + '-' + 'deploy';
          var newstep = turn.steps[newstepid] = Object.assign({}, step, {
            ARTIFACTS: ARTIFACTS,
            MARKS: MARKS,
            UNITDATA: UNITDATA,
            UNITLAYERS: UNITLAYERS,
            stepid: newstepid,
            name: 'deploy',
            path: step.path.concat('deploy'),
            clones: clones
          });
          turn.links[newstepid] = {};
          if (Object.keys(
              (function() {
                var ret = {},
                  s0 = UNITLAYERS.mykings,
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
          } else
          if (((turn.turn > 2) && Object.keys(UNITLAYERS.oppkings ||  {}).length === 0)) {
            var winner = 2;
            var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
            turn.links[newstepid][result] = 'kingkill';
          } else turn.links[newstepid].endturn = "start" + otherplayer;
          return newstep;
        };
      game.deploy2instruction = function(step) {
        return '';
      };
      game.move2 =
        function(turn, step) {
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
            "soldiers": {},
            "mysoldiers": {},
            "oppsoldiers": {},
            "neutralsoldiers": {},
            "kings": {},
            "mykings": {},
            "oppkings": {},
            "neutralkings": {},
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
            "nokings": {},
            "nosoldiers": {},
            "kingwalk": {},
            "adjacentenemies": {},
            "splashed": {},
            "willdie": {},
            "jumptargets": {}
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
                  s0 = UNITLAYERS.mykings,
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
          } else
          if (((turn.turn > 2) && Object.keys(UNITLAYERS.oppkings ||  {}).length === 0)) {
            var winner = 2;
            var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
            turn.links[newstepid][result] = 'kingkill';
          } else turn.links[newstepid].endturn = "start" + otherplayer;
          return newstep;
        };
      game.move2instruction = function(step) {
        return '';
      };
      game.jump2 =
        function(turn, step) {
          var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
          var MARKS = step.MARKS;
          var UNITDATA = Object.assign({}, step.UNITDATA);
          var UNITLAYERS = step.UNITLAYERS;
          delete UNITDATA[(UNITLAYERS.units[Object.keys(ARTIFACTS.willdie)[0]]  || {}).id];
          var unitid = (UNITLAYERS.units[MARKS['selectunit']]  || {}).id;
          if (unitid) {
            UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
              'pos': MARKS['selectjumptarget']
            });
          }
          MARKS = {};
          UNITLAYERS = {
            "soldiers": {},
            "mysoldiers": {},
            "oppsoldiers": {},
            "neutralsoldiers": {},
            "kings": {},
            "mykings": {},
            "oppkings": {},
            "neutralkings": {},
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
            "nokings": {},
            "nosoldiers": {},
            "kingwalk": {},
            "adjacentenemies": {},
            "splashed": {},
            "willdie": {},
            "jumptargets": {}
          };
          var newstepid = step.stepid + '-' + 'jump';
          var newstep = turn.steps[newstepid] = Object.assign({}, step, {
            ARTIFACTS: ARTIFACTS,
            MARKS: MARKS,
            UNITDATA: UNITDATA,
            UNITLAYERS: UNITLAYERS,
            stepid: newstepid,
            name: 'jump',
            path: step.path.concat('jump')
          });
          turn.links[newstepid] = {};
          if (Object.keys(
              (function() {
                var ret = {},
                  s0 = UNITLAYERS.mykings,
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
          } else
          if (((turn.turn > 2) && Object.keys(UNITLAYERS.oppkings ||  {}).length === 0)) {
            var winner = 2;
            var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
            turn.links[newstepid][result] = 'kingkill';
          } else turn.links[newstepid].endturn = "start" + otherplayer;
          return newstep;
        };
      game.jump2instruction = function(step) {
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
          "nokings": {},
          "nosoldiers": {},
          "kingwalk": {},
          "adjacentenemies": {},
          "splashed": {},
          "willdie": {},
          "jumptargets": {}
        };
        var UNITDATA = step.UNITDATA;
        var UNITLAYERS = {
          "soldiers": {},
          "mysoldiers": {},
          "oppsoldiers": {},
          "neutralsoldiers": {},
          "kings": {},
          "mykings": {},
          "oppkings": {},
          "neutralkings": {},
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
        for (var STARTPOS in
            (function() {
              var ret = {},
                s0 = TERRAIN.edges,
                s1 = UNITLAYERS.mysoldiers;
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }())) {
          var neighbourdirs = (!!(TERRAIN.homerow[STARTPOS]) ? [1, 3, 5, 7] : [1, 5]);
          var nbrofneighbourdirs = neighbourdirs.length;
          var startconnections = connections[STARTPOS];
          for (var dirnbr = 0; dirnbr < nbrofneighbourdirs; dirnbr++) {
            var POS = startconnections[neighbourdirs[dirnbr]];
            if (POS) {
              ARTIFACTS['nokings'][POS] = {};
            }
          } 
        } 
        for (var STARTPOS in UNITLAYERS.mykings) {
          var neighbourdirs = [1, 3, 5, 7];
          var startconnections = connections[STARTPOS];
          for (var dirnbr = 0; dirnbr < 4; dirnbr++) {
            var POS = startconnections[neighbourdirs[dirnbr]];
            if (POS && (!!(TERRAIN.homerow[POS]) || (!!(TERRAIN.edges[STARTPOS]) && !!(TERRAIN.edges[POS])))) {
              ARTIFACTS['nosoldiers'][POS] = {};
            }
          } 
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
        if ((turn.turn > 2)) {
          var newlinks = turn.links.root;
          for (var linkpos in UNITLAYERS.myunits) {
            newlinks[linkpos] = 'selectunit2';
          }
        } else {
          var newlinks = turn.links.root;
          for (var linkpos in
              (function() {
                var ret = {},
                  s0 = BOARD.board,
                  s1 =
                  (function() {
                    var k, ret = {},
                      s0 = UNITLAYERS.units,
                      s1 = ARTIFACTS.nokings;
                    for (k in s0) {
                      ret[k] = 1;
                    }
                    for (k in s1) {
                      ret[k] = 1;
                    }
                    return ret;
                  }());
                for (var key in s0) {
                  if (!s1[key]) {
                    ret[key] = s0[key];
                  }
                }
                return ret;
              }())) {
            newlinks[linkpos] = 'selectkingdeploy2';
          }
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