(
  function() {
    var game = {};
    var connections = {
      "faux": {},
      "a1": {
        "1": "a2",
        "2": "b2",
        "3": "b1"
      },
      "a2": {
        "1": "a3",
        "2": "b3",
        "3": "b2",
        "4": "b1",
        "5": "a1"
      },
      "a3": {
        "1": "a4",
        "2": "b4",
        "3": "b3",
        "4": "b2",
        "5": "a2"
      },
      "a4": {
        "3": "b4",
        "4": "b3",
        "5": "a3"
      },
      "b1": {
        "1": "b2",
        "2": "c2",
        "3": "c1",
        "7": "a1",
        "8": "a2"
      },
      "b2": {
        "1": "b3",
        "2": "c3",
        "3": "c2",
        "4": "c1",
        "5": "b1",
        "6": "a1",
        "7": "a2",
        "8": "a3"
      },
      "b3": {
        "1": "b4",
        "2": "c4",
        "3": "c3",
        "4": "c2",
        "5": "b2",
        "6": "a2",
        "7": "a3",
        "8": "a4"
      },
      "b4": {
        "3": "c4",
        "4": "c3",
        "5": "b3",
        "6": "a3",
        "7": "a4"
      },
      "c1": {
        "1": "c2",
        "2": "d2",
        "3": "d1",
        "7": "b1",
        "8": "b2"
      },
      "c2": {
        "1": "c3",
        "2": "d3",
        "3": "d2",
        "4": "d1",
        "5": "c1",
        "6": "b1",
        "7": "b2",
        "8": "b3"
      },
      "c3": {
        "1": "c4",
        "2": "d4",
        "3": "d3",
        "4": "d2",
        "5": "c2",
        "6": "b2",
        "7": "b3",
        "8": "b4"
      },
      "c4": {
        "3": "d4",
        "4": "d3",
        "5": "c3",
        "6": "b3",
        "7": "b4"
      },
      "d1": {
        "1": "d2",
        "7": "c1",
        "8": "c2"
      },
      "d2": {
        "1": "d3",
        "5": "d1",
        "6": "c1",
        "7": "c2",
        "8": "c3"
      },
      "d3": {
        "1": "d4",
        "5": "d2",
        "6": "c2",
        "7": "c3",
        "8": "c4"
      },
      "d4": {
        "5": "d3",
        "6": "c3",
        "7": "c4"
      }
    };
    var BOARD = {
      "board": {
        "a1": {
          "colour": "dark",
          "pos": "a1",
          "x": 1,
          "y": 1
        },
        "a2": {
          "colour": "light",
          "pos": "a2",
          "x": 1,
          "y": 2
        },
        "a3": {
          "colour": "dark",
          "pos": "a3",
          "x": 1,
          "y": 3
        },
        "a4": {
          "colour": "light",
          "pos": "a4",
          "x": 1,
          "y": 4
        },
        "b1": {
          "colour": "light",
          "pos": "b1",
          "x": 2,
          "y": 1
        },
        "b2": {
          "colour": "dark",
          "pos": "b2",
          "x": 2,
          "y": 2
        },
        "b3": {
          "colour": "light",
          "pos": "b3",
          "x": 2,
          "y": 3
        },
        "b4": {
          "colour": "dark",
          "pos": "b4",
          "x": 2,
          "y": 4
        },
        "c1": {
          "colour": "dark",
          "pos": "c1",
          "x": 3,
          "y": 1
        },
        "c2": {
          "colour": "light",
          "pos": "c2",
          "x": 3,
          "y": 2
        },
        "c3": {
          "colour": "dark",
          "pos": "c3",
          "x": 3,
          "y": 3
        },
        "c4": {
          "colour": "light",
          "pos": "c4",
          "x": 3,
          "y": 4
        },
        "d1": {
          "colour": "light",
          "pos": "d1",
          "x": 4,
          "y": 1
        },
        "d2": {
          "colour": "dark",
          "pos": "d2",
          "x": 4,
          "y": 2
        },
        "d3": {
          "colour": "light",
          "pos": "d3",
          "x": 4,
          "y": 3
        },
        "d4": {
          "colour": "dark",
          "pos": "d4",
          "x": 4,
          "y": 4
        }
      },
      "light": {
        "a2": {
          "colour": "light",
          "pos": "a2",
          "x": 1,
          "y": 2
        },
        "a4": {
          "colour": "light",
          "pos": "a4",
          "x": 1,
          "y": 4
        },
        "b1": {
          "colour": "light",
          "pos": "b1",
          "x": 2,
          "y": 1
        },
        "b3": {
          "colour": "light",
          "pos": "b3",
          "x": 2,
          "y": 3
        },
        "c2": {
          "colour": "light",
          "pos": "c2",
          "x": 3,
          "y": 2
        },
        "c4": {
          "colour": "light",
          "pos": "c4",
          "x": 3,
          "y": 4
        },
        "d1": {
          "colour": "light",
          "pos": "d1",
          "x": 4,
          "y": 1
        },
        "d3": {
          "colour": "light",
          "pos": "d3",
          "x": 4,
          "y": 3
        }
      },
      "dark": {
        "a1": {
          "colour": "dark",
          "pos": "a1",
          "x": 1,
          "y": 1
        },
        "a3": {
          "colour": "dark",
          "pos": "a3",
          "x": 1,
          "y": 3
        },
        "b2": {
          "colour": "dark",
          "pos": "b2",
          "x": 2,
          "y": 2
        },
        "b4": {
          "colour": "dark",
          "pos": "b4",
          "x": 2,
          "y": 4
        },
        "c1": {
          "colour": "dark",
          "pos": "c1",
          "x": 3,
          "y": 1
        },
        "c3": {
          "colour": "dark",
          "pos": "c3",
          "x": 3,
          "y": 3
        },
        "d2": {
          "colour": "dark",
          "pos": "d2",
          "x": 4,
          "y": 2
        },
        "d4": {
          "colour": "dark",
          "pos": "d4",
          "x": 4,
          "y": 4
        }
      }
    };
    var relativedirs = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    var TERRAIN = {};
    (function() {
      var ownernames = ["neutral", "my", "opp"];
      var player = 1;
      var otherplayer = 2;
      game.selectunit1 =
        function(turn, step, markpos) {
          var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
            movetargets: Object.assign({}, step.ARTIFACTS.movetargets)
          });
          var UNITLAYERS = step.UNITLAYERS;
          var MARKS = {
            selectunit: markpos
          };
          var BLOCKS = UNITLAYERS.units;
          var STARTPOS = MARKS['selectunit'];
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var walkedsquares = [];
            var POS = STARTPOS;
            while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && !BLOCKS[POS]) {
              walkedsquares.push(POS);
            }
            var WALKLENGTH = walkedsquares.length;
            if (WALKLENGTH) {
              ARTIFACTS['movetargets'][walkedsquares[WALKLENGTH - 1]] = {};
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
      game.selectunit1instruction =
        function(step) {
          var MARKS = step.MARKS;
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          var UNITDATA = step.UNITDATA;
          return ''
        };
      game.selectmovetarget1 =
        function(turn, step, markpos) {
          var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
            victims: Object.assign({}, step.ARTIFACTS.victims)
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
            if (POS && UNITLAYERS.oppunits[POS]) {
              ARTIFACTS['victims'][POS] = {};
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
      game.selectmovetarget1instruction =
        function(step) {
          var MARKS = step.MARKS;
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          var UNITDATA = step.UNITDATA;
          return ''
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
          var LOOPID;
          for (var POS in ARTIFACTS.victims) {
            if (LOOPID = (UNITLAYERS.units[POS] || {}).id) {
              UNITDATA[LOOPID] = Object.assign({}, UNITDATA[LOOPID], {
                'owner': 1
              });
            }
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
            "victims": {},
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
          turn.links[newstepid].endturn = "start" + otherplayer;
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
            "victims": {},
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
        };
      game.start1instruction =
        function(step) {
          var MARKS = step.MARKS;
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          var UNITDATA = step.UNITDATA;
          return ''
        };
      game.brain_Bob_1 =
        function(step) {
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          return Object.keys(UNITLAYERS.myunits).length;
        };
      game.brain_Bob_1_detailed =
        function(step) {
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          return {
            headcount: Object.keys(UNITLAYERS.myunits).length
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
      game.selectunit2 =
        function(turn, step, markpos) {
          var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
            movetargets: Object.assign({}, step.ARTIFACTS.movetargets)
          });
          var UNITLAYERS = step.UNITLAYERS;
          var MARKS = {
            selectunit: markpos
          };
          var BLOCKS = UNITLAYERS.units;
          var STARTPOS = MARKS['selectunit'];
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var walkedsquares = [];
            var POS = STARTPOS;
            while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && !BLOCKS[POS]) {
              walkedsquares.push(POS);
            }
            var WALKLENGTH = walkedsquares.length;
            if (WALKLENGTH) {
              ARTIFACTS['movetargets'][walkedsquares[WALKLENGTH - 1]] = {};
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
      game.selectunit2instruction =
        function(step) {
          var MARKS = step.MARKS;
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          var UNITDATA = step.UNITDATA;
          return ''
        };
      game.selectmovetarget2 =
        function(turn, step, markpos) {
          var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
            victims: Object.assign({}, step.ARTIFACTS.victims)
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
            if (POS && UNITLAYERS.oppunits[POS]) {
              ARTIFACTS['victims'][POS] = {};
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
      game.selectmovetarget2instruction =
        function(step) {
          var MARKS = step.MARKS;
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          var UNITDATA = step.UNITDATA;
          return ''
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
          var LOOPID;
          for (var POS in ARTIFACTS.victims) {
            if (LOOPID = (UNITLAYERS.units[POS] || {}).id) {
              UNITDATA[LOOPID] = Object.assign({}, UNITDATA[LOOPID], {
                'owner': 2
              });
            }
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
            "victims": {},
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
          turn.links[newstepid].endturn = "start" + otherplayer;
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
            "victims": {},
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
        };
      game.start2instruction =
        function(step) {
          var MARKS = step.MARKS;
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          var UNITDATA = step.UNITDATA;
          return ''
        };
      game.brain_Bob_2 =
        function(step) {
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          return Object.keys(UNITLAYERS.myunits).length;
        };
      game.brain_Bob_2_detailed =
        function(step) {
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          return {
            headcount: Object.keys(UNITLAYERS.myunits).length
          };
        };
      game.debug2 = function() {
        return {
          TERRAIN: TERRAIN
        };
      }
    })();
    function reduce(coll, iterator, acc) {
      for (var key in coll) {
        acc = iterator(acc, coll[key], key);
      }
      return acc;
    }
    game.newGame =
      function() {
        var turnseed = {
          turn: 0
        };
        var stepseed = {
          UNITDATA: {
            "unit1": {
              "pos": "a1",
              "id": "unit1",
              "group": "soldiers",
              "owner": 1
            },
            "unit2": {
              "pos": "b1",
              "id": "unit2",
              "group": "soldiers",
              "owner": 1
            },
            "unit3": {
              "pos": "c1",
              "id": "unit3",
              "group": "soldiers",
              "owner": 1
            },
            "unit4": {
              "pos": "d1",
              "id": "unit4",
              "group": "soldiers",
              "owner": 1
            },
            "unit5": {
              "pos": "a4",
              "id": "unit5",
              "group": "soldiers",
              "owner": 2
            },
            "unit6": {
              "pos": "b4",
              "id": "unit6",
              "group": "soldiers",
              "owner": 2
            },
            "unit7": {
              "pos": "c4",
              "id": "unit7",
              "group": "soldiers",
              "owner": 2
            },
            "unit8": {
              "pos": "d4",
              "id": "unit8",
              "group": "soldiers",
              "owner": 2
            }
          }
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
    }
    game.commands = {
      "move": 1
    };
    game.graphics = {
      "icons": {
        "soldiers": "pawns"
      }
    };
    game.board = {
      "height": 4,
      "width": 4
    };
    game.AI = ["Bob"];
    game.id = "orthokon";
    return game;
  }
)()