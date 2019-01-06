(
  function() {
    var game = {};
    game.commands = {
      "move": 1,
      "swap": 1
    };
    game.graphics = {
      "icons": {
        "pinets": "pawn",
        "piokers": "bishop",
        "piases": "king"
      },
      "tiles": {
        "base": "playercolour"
      }
    };
    game.board = {
      "height": 5,
      "width": 5,
      "terrain": {
        "base": {
          "1": [
            ["rect", "a1", "e1"]
          ],
          "2": [
            ["rect", "a5", "e5"]
          ]
        }
      }
    };
    game.AI = [];
    game.id = "transet";
    var boardDef = {
      "height": 5,
      "width": 5,
      "terrain": {
        "base": {
          "1": [
            ["rect", "a1", "e1"]
          ],
          "2": [
            ["rect", "a5", "e5"]
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
          "pinets": {
            "1": ["a1", "e1"],
            "2": ["a5", "e5"]
          },
          "piokers": {
            "1": ["b1", "d1"],
            "2": ["b5", "d5"]
          },
          "piases": {
            "1": ["c1"],
            "2": ["c5"]
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
        var STARTPOS = MARKS["selectunit"];
        var neighbourdirs = (!!(UNITLAYERS.pinets[MARKS["selectunit"]]) ? [1] : (!!(UNITLAYERS.piokers[MARKS["selectunit"]]) ? [8, 2] : [8, 1, 2]));
        var nbrofneighbourdirs = neighbourdirs.length;
        var startconnections = connections[STARTPOS];
        for (var dirnbr = 0; dirnbr < nbrofneighbourdirs; dirnbr++) {
          var POS = startconnections[neighbourdirs[dirnbr]];
          if (POS && !UNITLAYERS.myunits[POS]) {
            ARTIFACTS["movetargets"][POS] = {};
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
        var newlinks = turn.links[newstepid];
        for (var linkpos in
            (function() {
              var ret = {},
                s0 = UNITLAYERS.myunits,
                s1 =
                (function() {
                  var ret = {};
                  ret[MARKS["selectunit"]] = 1;
                  return ret;
                }());
              for (var key in s0) {
                if (!s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }())) {
          newlinks[linkpos] = 'selectswapunit1';
        }
        return newstep;
      };
      game.selectunit1instruction = function(turn, step) {
        var MARKS = step.MARKS;
        var ARTIFACTS = step.ARTIFACTS;
        var UNITLAYERS = step.UNITLAYERS;
        return collapseLine({
          type: 'line',
          content: [{
              type: 'text',
              text: "Select"
            },
            [{
              cond: Object.keys(ARTIFACTS.movetargets).length !== 0,
              content: collapseLine({
                type: 'line',
                content: [{
                  type: 'text',
                  text: "a square to"
                }, {
                  type: 'cmndref',
                  cmnd: "move"
                }, {
                  type: 'text',
                  text: "the"
                }, {
                  type: 'posref',
                  pos: MARKS["selectunit"]
                }, {
                  type: "unittyperef",
                  name: game.graphics.icons[(UNITLAYERS.units[MARKS["selectunit"]] || {})["group"]]
                }, {
                  type: 'text',
                  text: "to"
                }]
              })
            }, {
              cond: Object.keys(turn.links[step.stepid]).filter(function(action) {
                var func = turn.links[step.stepid][action];
                return func.substr(0, func.length - 1) === "selectswapunit";
              }).length,
              content: collapseLine({
                type: 'line',
                content: [{
                  type: 'text',
                  text: "another unit to swap the"
                }, {
                  type: 'posref',
                  pos: MARKS["selectunit"]
                }, {
                  type: "unittyperef",
                  name: game.graphics.icons[(UNITLAYERS.units[MARKS["selectunit"]] || {})["group"]]
                }, {
                  type: 'text',
                  text: "with"
                }]
              })
            }].filter(function(elem) {
              return elem.cond;
            }).reduce(function(mem, elem, n, list) {
              mem.content.push(elem.content);
              if (n === list.length - 2) {
                mem.content.push("or");
              } else if (n < list.length - 2) {
                mem.content.push(",");
              }
              return mem;
            }, {
              type: "line",
              content: []
            })
          ]
        });
      };
      game.selectmovetarget1 = function(turn, step, markpos) {
        var UNITLAYERS = step.UNITLAYERS;
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
        if ((!!(UNITLAYERS.units[MARKS["selectmovetarget"]]) && !(TERRAIN.oppbase[MARKS["selectmovetarget"]]))) {
          var newlinks = turn.links[newstepid];
          for (var linkpos in
              (function() {
                var ret = {},
                  s0 = TERRAIN.oppbase,
                  s1 = UNITLAYERS.oppunits;
                for (var key in s0) {
                  if (!s1[key]) {
                    ret[key] = s0[key];
                  }
                }
                return ret;
              }())) {
            newlinks[linkpos] = 'selectdeportdestination1';
          }
        } else {
          turn.links[newstepid].move = 'move1';
        }
        return newstep;
      };
      game.selectmovetarget1instruction = function(turn, step) {
        var MARKS = step.MARKS;
        var UNITLAYERS = step.UNITLAYERS;
        return ((!!(UNITLAYERS.units[MARKS["selectmovetarget"]]) && !(TERRAIN.oppbase[MARKS["selectmovetarget"]])) ? collapseLine({
          type: 'line',
          content: [{
            type: 'text',
            text: "Select where the enemy,"
          }, {
            type: "unittyperef",
            name: game.graphics.icons[(UNITLAYERS.units[MARKS["selectmovetarget"]] || {})["group"]]
          }, {
            type: 'text',
            text: "at"
          }, {
            type: 'posref',
            pos: MARKS["selectmovetarget"]
          }, {
            type: 'text',
            text: "should end up"
          }]
        }) : collapseLine({
          type: 'line',
          content: [{
            type: 'text',
            text: "Press"
          }, {
            type: 'cmndref',
            cmnd: "move"
          }, {
            type: 'text',
            text: "to go from"
          }, {
            type: 'posref',
            pos: MARKS["selectunit"]
          }, {
            type: 'text',
            text: "to"
          }, {
            type: 'posref',
            pos: MARKS["selectmovetarget"]
          }]
        }));
      };
      game.selectdeportdestination1 = function(turn, step, markpos) {
        var MARKS = {
          selectdeportdestination: markpos,
          selectunit: step.MARKS.selectunit,
          selectmovetarget: step.MARKS.selectmovetarget
        };
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectdeportdestination'
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].move = 'move1';
        return newstep;
      };
      game.selectdeportdestination1instruction = function(turn, step) {
        var MARKS = step.MARKS;
        return collapseLine({
          type: 'line',
          content: [{
            type: 'text',
            text: "Press"
          }, {
            type: 'cmndref',
            cmnd: "move"
          }, {
            type: 'text',
            text: "to go from"
          }, {
            type: 'posref',
            pos: MARKS["selectunit"]
          }, {
            type: 'text',
            text: "to"
          }, {
            type: 'posref',
            pos: MARKS["selectmovetarget"]
          }, {
            type: 'text',
            text: "and deport the enemy to"
          }, {
            type: 'posref',
            pos: MARKS["selectdeportdestination"]
          }]
        });
      };
      game.selectswapunit1 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          swap1steps: Object.assign({}, step.ARTIFACTS.swap1steps)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectswapunit: markpos,
          selectunit: step.MARKS.selectunit
        };
        var STARTPOS = MARKS["selectunit"];
        var neighbourdirs = [1, 3, 5, 7];
        var startconnections = connections[STARTPOS];
        for (var dirnbr = 0; dirnbr < 4; dirnbr++) {
          var DIR = neighbourdirs[dirnbr];
          var POS = startconnections[DIR];
          if (POS && !UNITLAYERS.units[POS]) {
            ARTIFACTS["swap1steps"][POS] = {
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
          name: 'selectswapunit'
        });
        turn.links[newstepid] = {};
        var newlinks = turn.links[newstepid];
        for (var linkpos in ARTIFACTS.swap1steps) {
          newlinks[linkpos] = 'selectswap1target1';
        }
        return newstep;
      };
      game.selectswapunit1instruction = function(turn, step) {
        var MARKS = step.MARKS;
        return collapseLine({
          type: 'line',
          content: [{
            type: 'text',
            text: "Select a neighbouring square for"
          }, {
            type: 'posref',
            pos: MARKS["selectunit"]
          }, {
            type: 'text',
            text: "to step to. The"
          }, {
            type: 'posref',
            pos: MARKS["selectswapunit"]
          }, {
            type: 'text',
            text: "unit will step in the opposite direction"
          }]
        });
      };
      game.selectswap1target1 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          swap2step: Object.assign({}, step.ARTIFACTS.swap2step)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectswap1target: markpos,
          selectunit: step.MARKS.selectunit,
          selectswapunit: step.MARKS.selectswapunit
        };
        var STARTPOS = MARKS["selectswapunit"];
        var POS = connections[STARTPOS][relativedirs[(ARTIFACTS.swap1steps[MARKS["selectswap1target"]] || {})["dir"] - 2 + 5]];
        if (POS && !
          (function() {
            var k, ret = {},
              s0 = UNITLAYERS.units,
              s1 =
              (function() {
                var ret = {};
                ret[MARKS["selectswap1target"]] = 1;
                return ret;
              }());
            for (k in s0) {
              ret[k] = 1;
            }
            for (k in s1) {
              ret[k] = 1;
            }
            return ret;
          }())[POS]) {
          ARTIFACTS["swap2step"][POS] = {};
        }
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectswap1target'
        });
        turn.links[newstepid] = {};
        if (Object.keys(ARTIFACTS.swap2step).length !== 0) {
          turn.links[newstepid].swap = 'swap1';
        }
        return newstep;
      };
      game.selectswap1target1instruction = function(turn, step) {
        var MARKS = step.MARKS;
        var ARTIFACTS = step.ARTIFACTS;
        return collapseLine({
          type: 'line',
          content: [{
            type: 'text',
            text: "Press"
          }, {
            type: 'cmndref',
            cmnd: "swap"
          }, {
            type: 'text',
            text: "to step"
          }, {
            type: 'posref',
            pos: MARKS["selectunit"]
          }, {
            type: 'text',
            text: "to"
          }, {
            type: 'posref',
            pos: MARKS["selectswap1target"]
          }, {
            type: 'text',
            text: "and step"
          }, {
            type: 'posref',
            pos: MARKS["selectswapunit"]
          }, {
            type: 'text',
            text: "in the other direction to"
          }, {
            type: 'text',
            text: Object.keys(ARTIFACTS.swap2step)[0]
          }]
        });
      };
      game.move1 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var UNITLAYERS = step.UNITLAYERS;
        if (!!(UNITLAYERS.units[MARKS["selectmovetarget"]])) {
          if (!!(TERRAIN.oppbase[MARKS["selectmovetarget"]])) {
            delete UNITDATA[(UNITLAYERS.units[MARKS["selectmovetarget"]]  || {}).id];
          } else {
            var unitid = (UNITLAYERS.units[MARKS["selectmovetarget"]]  || {}).id;
            if (unitid) {
              UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
                "pos": MARKS["selectdeportdestination"]
              });
            }
          }
        }
        var unitid = (UNITLAYERS.units[MARKS["selectunit"]]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            "pos": MARKS["selectmovetarget"]
          });
        }
        MARKS = {};
        UNITLAYERS = {
          "pinets": {},
          "mypinets": {},
          "opppinets": {},
          "neutralpinets": {},
          "piokers": {},
          "mypiokers": {},
          "opppiokers": {},
          "neutralpiokers": {},
          "piases": {},
          "mypiases": {},
          "opppiases": {},
          "neutralpiases": {},
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
          "swap2step": {},
          "swap1steps": {},
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
                s0 = UNITLAYERS.myunits,
                s1 = TERRAIN.oppbase;
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
          turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
          turn.endMarks[newstepid].infiltration =
            (function() {
              var ret = {},
                s0 = UNITLAYERS.myunits,
                s1 = TERRAIN.oppbase;
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }());
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.move1instruction = function(turn, step) {
        return {
          type: 'text',
          text: ""
        };
      };
      game.swap1 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var UNITLAYERS = step.UNITLAYERS;
        var unitid = (UNITLAYERS.units[MARKS["selectunit"]]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            "pos": MARKS["selectswap1target"]
          });
        }
        var unitid = (UNITLAYERS.units[MARKS["selectswapunit"]]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            "pos": Object.keys(ARTIFACTS.swap2step)[0]
          });
        }
        MARKS = {};
        UNITLAYERS = {
          "pinets": {},
          "mypinets": {},
          "opppinets": {},
          "neutralpinets": {},
          "piokers": {},
          "mypiokers": {},
          "opppiokers": {},
          "neutralpiokers": {},
          "piases": {},
          "mypiases": {},
          "opppiases": {},
          "neutralpiases": {},
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
          "swap2step": {},
          "swap1steps": {},
          "movetargets": {}
        };
        var newstepid = step.stepid + '-' + 'swap';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'swap',
          path: step.path.concat('swap')
        });
        turn.links[newstepid] = {};
        if (Object.keys(
            (function() {
              var ret = {},
                s0 = UNITLAYERS.myunits,
                s1 = TERRAIN.oppbase;
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
          turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
          turn.endMarks[newstepid].infiltration =
            (function() {
              var ret = {},
                s0 = UNITLAYERS.myunits,
                s1 = TERRAIN.oppbase;
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }());
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.swap1instruction = function(turn, step) {
        return {
          type: 'text',
          text: ""
        };
      };
      game.start1 = function(turn, step) {
        var turn = {
          steps: {},
          player: player,
          turn: turn.turn + 1,
          links: {
            root: {}
          },
          endMarks: {}
        };
        var MARKS = {};
        var ARTIFACTS = {
          "swap2step": {},
          "swap1steps": {},
          "movetargets": {}
        };
        var UNITDATA = step.UNITDATA;
        var UNITLAYERS = {
          "pinets": {},
          "mypinets": {},
          "opppinets": {},
          "neutralpinets": {},
          "piokers": {},
          "mypiokers": {},
          "opppiokers": {},
          "neutralpiokers": {},
          "piases": {},
          "mypiases": {},
          "opppiases": {},
          "neutralpiases": {},
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
        return collapseLine({
          type: 'line',
          content: [{
            type: 'text',
            text: "Select a unit to"
          }, {
            type: 'cmndref',
            cmnd: "move"
          }]
        });
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
        var STARTPOS = MARKS["selectunit"];
        var neighbourdirs = (!!(UNITLAYERS.pinets[MARKS["selectunit"]]) ? [5] : (!!(UNITLAYERS.piokers[MARKS["selectunit"]]) ? [4, 6] : [4, 5, 6]));
        var nbrofneighbourdirs = neighbourdirs.length;
        var startconnections = connections[STARTPOS];
        for (var dirnbr = 0; dirnbr < nbrofneighbourdirs; dirnbr++) {
          var POS = startconnections[neighbourdirs[dirnbr]];
          if (POS && !UNITLAYERS.myunits[POS]) {
            ARTIFACTS["movetargets"][POS] = {};
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
        var newlinks = turn.links[newstepid];
        for (var linkpos in
            (function() {
              var ret = {},
                s0 = UNITLAYERS.myunits,
                s1 =
                (function() {
                  var ret = {};
                  ret[MARKS["selectunit"]] = 1;
                  return ret;
                }());
              for (var key in s0) {
                if (!s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }())) {
          newlinks[linkpos] = 'selectswapunit2';
        }
        return newstep;
      };
      game.selectunit2instruction = function(turn, step) {
        var MARKS = step.MARKS;
        var ARTIFACTS = step.ARTIFACTS;
        var UNITLAYERS = step.UNITLAYERS;
        return collapseLine({
          type: 'line',
          content: [{
              type: 'text',
              text: "Select"
            },
            [{
              cond: Object.keys(ARTIFACTS.movetargets).length !== 0,
              content: collapseLine({
                type: 'line',
                content: [{
                  type: 'text',
                  text: "a square to"
                }, {
                  type: 'cmndref',
                  cmnd: "move"
                }, {
                  type: 'text',
                  text: "the"
                }, {
                  type: 'posref',
                  pos: MARKS["selectunit"]
                }, {
                  type: "unittyperef",
                  name: game.graphics.icons[(UNITLAYERS.units[MARKS["selectunit"]] || {})["group"]]
                }, {
                  type: 'text',
                  text: "to"
                }]
              })
            }, {
              cond: Object.keys(turn.links[step.stepid]).filter(function(action) {
                var func = turn.links[step.stepid][action];
                return func.substr(0, func.length - 1) === "selectswapunit";
              }).length,
              content: collapseLine({
                type: 'line',
                content: [{
                  type: 'text',
                  text: "another unit to swap the"
                }, {
                  type: 'posref',
                  pos: MARKS["selectunit"]
                }, {
                  type: "unittyperef",
                  name: game.graphics.icons[(UNITLAYERS.units[MARKS["selectunit"]] || {})["group"]]
                }, {
                  type: 'text',
                  text: "with"
                }]
              })
            }].filter(function(elem) {
              return elem.cond;
            }).reduce(function(mem, elem, n, list) {
              mem.content.push(elem.content);
              if (n === list.length - 2) {
                mem.content.push("or");
              } else if (n < list.length - 2) {
                mem.content.push(",");
              }
              return mem;
            }, {
              type: "line",
              content: []
            })
          ]
        });
      };
      game.selectmovetarget2 = function(turn, step, markpos) {
        var UNITLAYERS = step.UNITLAYERS;
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
        if ((!!(UNITLAYERS.units[MARKS["selectmovetarget"]]) && !(TERRAIN.oppbase[MARKS["selectmovetarget"]]))) {
          var newlinks = turn.links[newstepid];
          for (var linkpos in
              (function() {
                var ret = {},
                  s0 = TERRAIN.oppbase,
                  s1 = UNITLAYERS.oppunits;
                for (var key in s0) {
                  if (!s1[key]) {
                    ret[key] = s0[key];
                  }
                }
                return ret;
              }())) {
            newlinks[linkpos] = 'selectdeportdestination2';
          }
        } else {
          turn.links[newstepid].move = 'move2';
        }
        return newstep;
      };
      game.selectmovetarget2instruction = function(turn, step) {
        var MARKS = step.MARKS;
        var UNITLAYERS = step.UNITLAYERS;
        return ((!!(UNITLAYERS.units[MARKS["selectmovetarget"]]) && !(TERRAIN.oppbase[MARKS["selectmovetarget"]])) ? collapseLine({
          type: 'line',
          content: [{
            type: 'text',
            text: "Select where the enemy,"
          }, {
            type: "unittyperef",
            name: game.graphics.icons[(UNITLAYERS.units[MARKS["selectmovetarget"]] || {})["group"]]
          }, {
            type: 'text',
            text: "at"
          }, {
            type: 'posref',
            pos: MARKS["selectmovetarget"]
          }, {
            type: 'text',
            text: "should end up"
          }]
        }) : collapseLine({
          type: 'line',
          content: [{
            type: 'text',
            text: "Press"
          }, {
            type: 'cmndref',
            cmnd: "move"
          }, {
            type: 'text',
            text: "to go from"
          }, {
            type: 'posref',
            pos: MARKS["selectunit"]
          }, {
            type: 'text',
            text: "to"
          }, {
            type: 'posref',
            pos: MARKS["selectmovetarget"]
          }]
        }));
      };
      game.selectdeportdestination2 = function(turn, step, markpos) {
        var MARKS = {
          selectdeportdestination: markpos,
          selectunit: step.MARKS.selectunit,
          selectmovetarget: step.MARKS.selectmovetarget
        };
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectdeportdestination'
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].move = 'move2';
        return newstep;
      };
      game.selectdeportdestination2instruction = function(turn, step) {
        var MARKS = step.MARKS;
        return collapseLine({
          type: 'line',
          content: [{
            type: 'text',
            text: "Press"
          }, {
            type: 'cmndref',
            cmnd: "move"
          }, {
            type: 'text',
            text: "to go from"
          }, {
            type: 'posref',
            pos: MARKS["selectunit"]
          }, {
            type: 'text',
            text: "to"
          }, {
            type: 'posref',
            pos: MARKS["selectmovetarget"]
          }, {
            type: 'text',
            text: "and deport the enemy to"
          }, {
            type: 'posref',
            pos: MARKS["selectdeportdestination"]
          }]
        });
      };
      game.selectswapunit2 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          swap1steps: Object.assign({}, step.ARTIFACTS.swap1steps)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectswapunit: markpos,
          selectunit: step.MARKS.selectunit
        };
        var STARTPOS = MARKS["selectunit"];
        var neighbourdirs = [1, 3, 5, 7];
        var startconnections = connections[STARTPOS];
        for (var dirnbr = 0; dirnbr < 4; dirnbr++) {
          var DIR = neighbourdirs[dirnbr];
          var POS = startconnections[DIR];
          if (POS && !UNITLAYERS.units[POS]) {
            ARTIFACTS["swap1steps"][POS] = {
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
          name: 'selectswapunit'
        });
        turn.links[newstepid] = {};
        var newlinks = turn.links[newstepid];
        for (var linkpos in ARTIFACTS.swap1steps) {
          newlinks[linkpos] = 'selectswap1target2';
        }
        return newstep;
      };
      game.selectswapunit2instruction = function(turn, step) {
        var MARKS = step.MARKS;
        return collapseLine({
          type: 'line',
          content: [{
            type: 'text',
            text: "Select a neighbouring square for"
          }, {
            type: 'posref',
            pos: MARKS["selectunit"]
          }, {
            type: 'text',
            text: "to step to. The"
          }, {
            type: 'posref',
            pos: MARKS["selectswapunit"]
          }, {
            type: 'text',
            text: "unit will step in the opposite direction"
          }]
        });
      };
      game.selectswap1target2 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          swap2step: Object.assign({}, step.ARTIFACTS.swap2step)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectswap1target: markpos,
          selectunit: step.MARKS.selectunit,
          selectswapunit: step.MARKS.selectswapunit
        };
        var STARTPOS = MARKS["selectswapunit"];
        var POS = connections[STARTPOS][relativedirs[(ARTIFACTS.swap1steps[MARKS["selectswap1target"]] || {})["dir"] - 2 + 5]];
        if (POS && !
          (function() {
            var k, ret = {},
              s0 = UNITLAYERS.units,
              s1 =
              (function() {
                var ret = {};
                ret[MARKS["selectswap1target"]] = 1;
                return ret;
              }());
            for (k in s0) {
              ret[k] = 1;
            }
            for (k in s1) {
              ret[k] = 1;
            }
            return ret;
          }())[POS]) {
          ARTIFACTS["swap2step"][POS] = {};
        }
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectswap1target'
        });
        turn.links[newstepid] = {};
        if (Object.keys(ARTIFACTS.swap2step).length !== 0) {
          turn.links[newstepid].swap = 'swap2';
        }
        return newstep;
      };
      game.selectswap1target2instruction = function(turn, step) {
        var MARKS = step.MARKS;
        var ARTIFACTS = step.ARTIFACTS;
        return collapseLine({
          type: 'line',
          content: [{
            type: 'text',
            text: "Press"
          }, {
            type: 'cmndref',
            cmnd: "swap"
          }, {
            type: 'text',
            text: "to step"
          }, {
            type: 'posref',
            pos: MARKS["selectunit"]
          }, {
            type: 'text',
            text: "to"
          }, {
            type: 'posref',
            pos: MARKS["selectswap1target"]
          }, {
            type: 'text',
            text: "and step"
          }, {
            type: 'posref',
            pos: MARKS["selectswapunit"]
          }, {
            type: 'text',
            text: "in the other direction to"
          }, {
            type: 'text',
            text: Object.keys(ARTIFACTS.swap2step)[0]
          }]
        });
      };
      game.move2 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var UNITLAYERS = step.UNITLAYERS;
        if (!!(UNITLAYERS.units[MARKS["selectmovetarget"]])) {
          if (!!(TERRAIN.oppbase[MARKS["selectmovetarget"]])) {
            delete UNITDATA[(UNITLAYERS.units[MARKS["selectmovetarget"]]  || {}).id];
          } else {
            var unitid = (UNITLAYERS.units[MARKS["selectmovetarget"]]  || {}).id;
            if (unitid) {
              UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
                "pos": MARKS["selectdeportdestination"]
              });
            }
          }
        }
        var unitid = (UNITLAYERS.units[MARKS["selectunit"]]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            "pos": MARKS["selectmovetarget"]
          });
        }
        MARKS = {};
        UNITLAYERS = {
          "pinets": {},
          "mypinets": {},
          "opppinets": {},
          "neutralpinets": {},
          "piokers": {},
          "mypiokers": {},
          "opppiokers": {},
          "neutralpiokers": {},
          "piases": {},
          "mypiases": {},
          "opppiases": {},
          "neutralpiases": {},
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
          "swap2step": {},
          "swap1steps": {},
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
                s0 = UNITLAYERS.myunits,
                s1 = TERRAIN.oppbase;
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
          turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
          turn.endMarks[newstepid].infiltration =
            (function() {
              var ret = {},
                s0 = UNITLAYERS.myunits,
                s1 = TERRAIN.oppbase;
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }());
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.move2instruction = function(turn, step) {
        return {
          type: 'text',
          text: ""
        };
      };
      game.swap2 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var UNITLAYERS = step.UNITLAYERS;
        var unitid = (UNITLAYERS.units[MARKS["selectunit"]]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            "pos": MARKS["selectswap1target"]
          });
        }
        var unitid = (UNITLAYERS.units[MARKS["selectswapunit"]]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            "pos": Object.keys(ARTIFACTS.swap2step)[0]
          });
        }
        MARKS = {};
        UNITLAYERS = {
          "pinets": {},
          "mypinets": {},
          "opppinets": {},
          "neutralpinets": {},
          "piokers": {},
          "mypiokers": {},
          "opppiokers": {},
          "neutralpiokers": {},
          "piases": {},
          "mypiases": {},
          "opppiases": {},
          "neutralpiases": {},
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
          "swap2step": {},
          "swap1steps": {},
          "movetargets": {}
        };
        var newstepid = step.stepid + '-' + 'swap';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'swap',
          path: step.path.concat('swap')
        });
        turn.links[newstepid] = {};
        if (Object.keys(
            (function() {
              var ret = {},
                s0 = UNITLAYERS.myunits,
                s1 = TERRAIN.oppbase;
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
          turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
          turn.endMarks[newstepid].infiltration =
            (function() {
              var ret = {},
                s0 = UNITLAYERS.myunits,
                s1 = TERRAIN.oppbase;
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }());
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.swap2instruction = function(turn, step) {
        return {
          type: 'text',
          text: ""
        };
      };
      game.start2 = function(turn, step) {
        var turn = {
          steps: {},
          player: player,
          turn: turn.turn + 1,
          links: {
            root: {}
          },
          endMarks: {}
        };
        var MARKS = {};
        var ARTIFACTS = {
          "swap2step": {},
          "swap1steps": {},
          "movetargets": {}
        };
        var UNITDATA = step.UNITDATA;
        var UNITLAYERS = {
          "pinets": {},
          "mypinets": {},
          "opppinets": {},
          "neutralpinets": {},
          "piokers": {},
          "mypiokers": {},
          "opppiokers": {},
          "neutralpiokers": {},
          "piases": {},
          "mypiases": {},
          "opppiases": {},
          "neutralpiases": {},
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
        return collapseLine({
          type: 'line',
          content: [{
            type: 'text',
            text: "Select a unit to"
          }, {
            type: 'cmndref',
            cmnd: "move"
          }]
        });
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