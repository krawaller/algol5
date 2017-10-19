(
  function() {
    var game = {};
    game.commands = {
      "move": 1,
      "kill": 1,
      "sacrifice": 1,
      "fire": 1
    };
    game.graphics = {
      "tiles": {
        "homerow": "playercolour"
      },
      "icons": {
        "towers": "rook",
        "walls": "pawn",
        "catapults": "queen"
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
    game.AI = [];
    game.id = "murusgallicusadvanced";
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
      var TERRAIN = terrainLayers(boardDef, 1);
      var ownernames = ["neutral", "my", "opp"];
      var player = 1;
      var otherplayer = 2;
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
              s1 = UNITLAYERS.mycatapults;
            for (k in s0) {
              ret[k] = 1;
            }
            for (k in s1) {
              ret[k] = 1;
            }
            return ret;
          }());
        var STARTPOS = MARKS["selecttower"];
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
              ARTIFACTS["movetargets"][POS] = {
                dir: DIR
              };
            }
          }
        }
        var STARTPOS = MARKS["selecttower"];
        var neighbourdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        var startconnections = connections[STARTPOS];
        for (var dirnbr = 0; dirnbr < 8; dirnbr++) {
          var POS = startconnections[neighbourdirs[dirnbr]];
          if (POS &&
            (function() {
              var k, ret = {},
                s0 = UNITLAYERS.oppcatapults,
                s1 = UNITLAYERS.oppwalls;
              for (k in s0) {
                ret[k] = 1;
              }
              for (k in s1) {
                ret[k] = 1;
              }
              return ret;
            }())[POS]) {
            ARTIFACTS["killtargets"][POS] = {};
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
      game.selecttower1instruction = function(turn, step) {
        var MARKS = step.MARKS;
        var ARTIFACTS = step.ARTIFACTS;
        return collapseLine({
          type: 'line',
          content: [{
              type: 'text',
              text: "Select"
            },
            [{
              cond: Object.keys(ARTIFACTS.movetargets).length !== 0,
              content: {
                type: 'text',
                text: "a move target"
              }
            }, {
              cond: Object.keys(ARTIFACTS.killtargets).length !== 0,
              content: collapseLine({
                type: 'line',
                content: [{
                  type: 'text',
                  text: "an enemy"
                }, {
                  type: "unittyperef",
                  name: "pawn"
                }, {
                  type: 'text',
                  text: "to kill"
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
            }), {
              type: 'text',
              text: "for the"
            }, {
              type: 'posref',
              pos: MARKS["selecttower"]
            }, {
              type: "unittyperef",
              name: "rook"
            }
          ]
        });
      };
      game.selectmove1 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          madecatapults: Object.assign({}, step.ARTIFACTS.madecatapults),
          madetowers: Object.assign({}, step.ARTIFACTS.madetowers),
          madewalls: Object.assign({}, step.ARTIFACTS.madewalls)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectmove: markpos,
          selecttower: step.MARKS.selecttower
        };
        var STARTPOS = MARKS["selectmove"];
        var POS = connections[STARTPOS][relativedirs[(ARTIFACTS.movetargets[MARKS["selectmove"]] || {})["dir"] - 2 + 5]];
        if (POS) {
          ARTIFACTS[(!!(UNITLAYERS.myunits[POS]) ? (!!(UNITLAYERS.mytowers[POS]) ? "madecatapults" : "madetowers") : "madewalls")][POS] = {};
        }
        ARTIFACTS[(!!(UNITLAYERS.myunits[MARKS["selectmove"]]) ? (!!(UNITLAYERS.mytowers[MARKS["selectmove"]]) ? "madecatapults" : "madetowers") : "madewalls")][STARTPOS] = {};
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
      game.selectmove1instruction = function(turn, step) {
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
            text: "to overturn your"
          }, {
            type: 'posref',
            pos: MARKS["selecttower"]
          }, {
            type: "unittyperef",
            name: "rook"
          }, {
            type: 'text',
            text: "towards"
          }, {
            type: 'posref',
            pos: MARKS["selectmove"]
          }]
        });
      };
      game.selectkill1 = function(turn, step, markpos) {
        var UNITLAYERS = step.UNITLAYERS;
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
        if (!!(UNITLAYERS.oppcatapults[MARKS["selectkill"]])) {
          turn.links[newstepid].sacrifice = 'sacrifice1';
        }
        return newstep;
      };
      game.selectkill1instruction = function(turn, step) {
        var MARKS = step.MARKS;
        var UNITLAYERS = step.UNITLAYERS;
        return collapseLine({
          type: 'line',
          content: [{
            type: 'text',
            text: "Press"
          }, {
            type: 'cmndref',
            cmnd: "kill"
          }, {
            type: 'text',
            text: "to make a section of the"
          }, {
            type: 'posref',
            pos: MARKS["selecttower"]
          }, {
            type: "unittyperef",
            name: "rook"
          }, (!!(UNITLAYERS.walls[MARKS["selectkill"]]) ? collapseLine({
            type: 'line',
            content: [{
              type: 'text',
              text: "crush the enemy"
            }, {
              type: "unittyperef",
              name: "pawn"
            }, {
              type: 'text',
              text: "at"
            }, {
              type: 'posref',
              pos: MARKS["selectkill"]
            }]
          }) : collapseLine({
            type: 'line',
            content: [{
              type: 'text',
              text: "reduce the enemy"
            }, {
              type: "unittyperef",
              name: "queen"
            }, {
              type: 'text',
              text: "at"
            }, {
              type: 'posref',
              pos: MARKS["selectkill"]
            }, {
              type: 'text',
              text: "to a"
            }, {
              type: "unittyperef",
              name: "rook"
            }, {
              type: 'text',
              text: ", or"
            }, {
              type: 'cmndref',
              cmnd: "sacrifice"
            }, {
              type: 'text',
              text: "your"
            }, {
              type: "unittyperef",
              name: "rook"
            }, {
              type: 'text',
              text: "entirely to turn the"
            }, {
              type: "unittyperef",
              name: "queen"
            }, {
              type: 'text',
              text: "to a"
            }, {
              type: "unittyperef",
              name: "pawn"
            }, {
              type: 'text',
              text: "!"
            }]
          }))]
        });
      };
      game.selectcatapult1 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          firetargets: Object.assign({}, step.ARTIFACTS.firetargets)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectcatapult: markpos
        };
        var STARTPOS = MARKS["selectcatapult"];
        var allwalkerdirs = [7, 8, 1, 2, 3];
        for (var walkerdirnbr = 0; walkerdirnbr < 5; walkerdirnbr++) {
          var MAX = 3;
          var POS = STARTPOS;
          var LENGTH = 0;
          var STEP = 0;
          while (LENGTH < MAX && (POS = connections[POS][allwalkerdirs[walkerdirnbr]])) {
            LENGTH++;
            STEP++;
            if (((STEP > 1) && !(UNITLAYERS.myunits[POS]))) {
              ARTIFACTS["firetargets"][POS] = {};
            }
          }
        }
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectcatapult'
        });
        turn.links[newstepid] = {};
        var newlinks = turn.links[newstepid];
        for (var linkpos in ARTIFACTS.firetargets) {
          newlinks[linkpos] = 'selectfire1';
        }
        return newstep;
      };
      game.selectcatapult1instruction = function(turn, step) {
        var MARKS = step.MARKS;
        return collapseLine({
          type: 'line',
          content: [{
            type: 'text',
            text: "Select where to fire the top section of your"
          }, {
            type: 'posref',
            pos: MARKS["selectcatapult"]
          }, {
            type: "unittyperef",
            name: "queen"
          }]
        });
      };
      game.selectfire1 = function(turn, step, markpos) {
        var MARKS = {
          selectfire: markpos,
          selectcatapult: step.MARKS.selectcatapult
        };
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectfire'
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].fire = 'fire1';
        return newstep;
      };
      game.selectfire1instruction = function(turn, step) {
        var MARKS = step.MARKS;
        var UNITLAYERS = step.UNITLAYERS;
        return collapseLine({
          type: 'line',
          content: [{
            type: 'text',
            text: "Press"
          }, {
            type: 'cmndref',
            cmnd: "fire"
          }, {
            type: 'text',
            text: "to shoot a section of the"
          }, {
            type: 'posref',
            pos: MARKS["selectcatapult"]
          }, {
            type: "unittyperef",
            name: "queen"
          }, (!!(UNITLAYERS.walls[MARKS["selectfire"]]) ? collapseLine({
            type: 'line',
            content: [{
              type: 'text',
              text: "and destroy the enemy"
            }, {
              type: "unittyperef",
              name: "pawn"
            }, {
              type: 'text',
              text: "at"
            }, {
              type: 'posref',
              pos: MARKS["selectfire"]
            }]
          }) : (!!(UNITLAYERS.units[MARKS["selectfire"]]) ? collapseLine({
            type: 'line',
            content: [{
              type: 'text',
              text: ", reducing the enemy"
            }, {
              type: "unittyperef",
              name: game.graphics.icons[(UNITLAYERS.units[MARKS["selectfire"]] || {})["group"]]
            }, {
              type: 'text',
              text: "at"
            }, {
              type: 'posref',
              pos: MARKS["selectfire"]
            }, {
              type: 'text',
              text: "to a"
            }, (!!(UNITLAYERS.catapults[MARKS["selectfire"]]) ? {
              type: "unittyperef",
              name: "rook"
            } : {
              type: "unittyperef",
              name: "pawn"
            })]
          }) : collapseLine({
            type: 'line',
            content: [{
              type: 'text',
              text: "at"
            }, {
              type: 'posref',
              pos: MARKS["selectfire"]
            }, {
              type: 'text',
              text: ", gaining a"
            }, {
              type: "unittyperef",
              name: "pawn"
            }, {
              type: 'text',
              text: "there"
            }]
          })))]
        });
      };
      game.move1 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var clones = step.clones;
        var UNITLAYERS = step.UNITLAYERS;
        delete UNITDATA[(UNITLAYERS.units[MARKS["selecttower"]]  || {}).id];
        for (var POS in ARTIFACTS.madecatapults) {
          var unitid = (UNITLAYERS.units[POS]  || {}).id;
          if (unitid) {
            UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
              "group": "catapults"
            });
          }
        }
        for (var POS in ARTIFACTS.madetowers) {
          var unitid = (UNITLAYERS.units[POS]  || {}).id;
          if (unitid) {
            UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
              "group": "towers"
            });
          }
        }
        for (var POS in ARTIFACTS.madewalls) {
          var newunitid = 'spawn' + (clones++);
          UNITDATA[newunitid] = {
            pos: POS,
            id: newunitid,
            group: "walls",
            owner: 1,
            from: MARKS["selecttower"]
          };
        }
        MARKS = {};
        UNITLAYERS = {
          "towers": {},
          "mytowers": {},
          "opptowers": {},
          "neutraltowers": {},
          "catapults": {},
          "mycatapults": {},
          "oppcatapults": {},
          "neutralcatapults": {},
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
          "firetargets": {},
          "movetargets": {},
          "madecatapults": {},
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
            }())).length !== 0) {
          var winner = 1;
          var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'infiltration';
          turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
          turn.endMarks[newstepid].infiltration =
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
      game.kill1 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var UNITLAYERS = step.UNITLAYERS;
        var unitid = (UNITLAYERS.units[MARKS["selecttower"]]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            "group": "walls"
          });
        }
        if (!!(UNITLAYERS.oppcatapults[MARKS["selectkill"]])) {
          var unitid = (UNITLAYERS.units[MARKS["selectkill"]]  || {}).id;
          if (unitid) {
            UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
              "group": "towers"
            });
          }
        } else {
          delete UNITDATA[(UNITLAYERS.units[MARKS["selectkill"]]  || {}).id];
        }
        MARKS = {};
        UNITLAYERS = {
          "towers": {},
          "mytowers": {},
          "opptowers": {},
          "neutraltowers": {},
          "catapults": {},
          "mycatapults": {},
          "oppcatapults": {},
          "neutralcatapults": {},
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
          "firetargets": {},
          "movetargets": {},
          "madecatapults": {},
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
            }())).length !== 0) {
          var winner = 1;
          var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'infiltration';
          turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
          turn.endMarks[newstepid].infiltration =
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
            }());
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.kill1instruction = function(turn, step) {
        return {
          type: 'text',
          text: ""
        };
      };
      game.sacrifice1 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var UNITLAYERS = step.UNITLAYERS;
        var unitid = (UNITLAYERS.units[MARKS["selectkill"]]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            "group": "walls"
          });
        }
        delete UNITDATA[(UNITLAYERS.units[MARKS["selecttower"]]  || {}).id];
        MARKS = {};
        UNITLAYERS = {
          "towers": {},
          "mytowers": {},
          "opptowers": {},
          "neutraltowers": {},
          "catapults": {},
          "mycatapults": {},
          "oppcatapults": {},
          "neutralcatapults": {},
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
          "firetargets": {},
          "movetargets": {},
          "madecatapults": {},
          "madetowers": {},
          "madewalls": {},
          "killtargets": {}
        };
        var newstepid = step.stepid + '-' + 'sacrifice';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'sacrifice',
          path: step.path.concat('sacrifice')
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
            }())).length !== 0) {
          var winner = 1;
          var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'infiltration';
          turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
          turn.endMarks[newstepid].infiltration =
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
            }());
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.sacrifice1instruction = function(turn, step) {
        return {
          type: 'text',
          text: ""
        };
      };
      game.fire1 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var clones = step.clones;
        var UNITLAYERS = step.UNITLAYERS;
        if (!!(UNITLAYERS.oppwalls[MARKS["selectfire"]])) {
          delete UNITDATA[(UNITLAYERS.units[MARKS["selectfire"]]  || {}).id];
        } else {
          if (!!(UNITLAYERS.oppunits[MARKS["selectfire"]])) {
            var unitid = (UNITLAYERS.units[MARKS["selectfire"]]  || {}).id;
            if (unitid) {
              UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
                "group": (!!(UNITLAYERS.oppcatapults[MARKS["selectfire"]]) ? "towers" : "walls")
              });
            }
          } else {
            var newunitid = 'spawn' + (clones++);
            UNITDATA[newunitid] = {
              pos: MARKS["selectfire"],
              id: newunitid,
              group: "walls",
              owner: 1,
              from: MARKS["selectcatapult"]
            };
          }
        }
        var unitid = (UNITLAYERS.units[MARKS["selectcatapult"]]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            "group": "towers"
          });
        }
        MARKS = {};
        UNITLAYERS = {
          "towers": {},
          "mytowers": {},
          "opptowers": {},
          "neutraltowers": {},
          "catapults": {},
          "mycatapults": {},
          "oppcatapults": {},
          "neutralcatapults": {},
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
          "firetargets": {},
          "movetargets": {},
          "madecatapults": {},
          "madetowers": {},
          "madewalls": {},
          "killtargets": {}
        };
        var newstepid = step.stepid + '-' + 'fire';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'fire',
          path: step.path.concat('fire'),
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
            }())).length !== 0) {
          var winner = 1;
          var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'infiltration';
          turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
          turn.endMarks[newstepid].infiltration =
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
            }());
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.fire1instruction = function(turn, step) {
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
          "firetargets": {},
          "movetargets": {},
          "madecatapults": {},
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
          "catapults": {},
          "mycatapults": {},
          "oppcatapults": {},
          "neutralcatapults": {},
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
        var newlinks = turn.links.root;
        for (var linkpos in UNITLAYERS.mycatapults) {
          newlinks[linkpos] = 'selectcatapult1';
        }
        return turn;
      }
      game.start1instruction = function(turn, step) {
        var UNITLAYERS = step.UNITLAYERS;
        return collapseLine({
          type: 'line',
          content: [{
              type: 'text',
              text: "Select a"
            },
            [{
              cond: Object.keys(UNITLAYERS.mytowers).length !== 0,
              content: {
                type: "unittyperef",
                name: "rook"
              }
            }, {
              cond: Object.keys(UNITLAYERS.mycatapults).length !== 0,
              content: {
                type: "unittyperef",
                name: "queen"
              }
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
            }), {
              type: 'text',
              text: "to act with"
            }
          ]
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
              s1 = UNITLAYERS.mycatapults;
            for (k in s0) {
              ret[k] = 1;
            }
            for (k in s1) {
              ret[k] = 1;
            }
            return ret;
          }());
        var STARTPOS = MARKS["selecttower"];
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
              ARTIFACTS["movetargets"][POS] = {
                dir: DIR
              };
            }
          }
        }
        var STARTPOS = MARKS["selecttower"];
        var neighbourdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        var startconnections = connections[STARTPOS];
        for (var dirnbr = 0; dirnbr < 8; dirnbr++) {
          var POS = startconnections[neighbourdirs[dirnbr]];
          if (POS &&
            (function() {
              var k, ret = {},
                s0 = UNITLAYERS.oppcatapults,
                s1 = UNITLAYERS.oppwalls;
              for (k in s0) {
                ret[k] = 1;
              }
              for (k in s1) {
                ret[k] = 1;
              }
              return ret;
            }())[POS]) {
            ARTIFACTS["killtargets"][POS] = {};
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
      game.selecttower2instruction = function(turn, step) {
        var MARKS = step.MARKS;
        var ARTIFACTS = step.ARTIFACTS;
        return collapseLine({
          type: 'line',
          content: [{
              type: 'text',
              text: "Select"
            },
            [{
              cond: Object.keys(ARTIFACTS.movetargets).length !== 0,
              content: {
                type: 'text',
                text: "a move target"
              }
            }, {
              cond: Object.keys(ARTIFACTS.killtargets).length !== 0,
              content: collapseLine({
                type: 'line',
                content: [{
                  type: 'text',
                  text: "an enemy"
                }, {
                  type: "unittyperef",
                  name: "pawn"
                }, {
                  type: 'text',
                  text: "to kill"
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
            }), {
              type: 'text',
              text: "for the"
            }, {
              type: 'posref',
              pos: MARKS["selecttower"]
            }, {
              type: "unittyperef",
              name: "rook"
            }
          ]
        });
      };
      game.selectmove2 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          madecatapults: Object.assign({}, step.ARTIFACTS.madecatapults),
          madetowers: Object.assign({}, step.ARTIFACTS.madetowers),
          madewalls: Object.assign({}, step.ARTIFACTS.madewalls)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectmove: markpos,
          selecttower: step.MARKS.selecttower
        };
        var STARTPOS = MARKS["selectmove"];
        var POS = connections[STARTPOS][relativedirs[(ARTIFACTS.movetargets[MARKS["selectmove"]] || {})["dir"] - 2 + 5]];
        if (POS) {
          ARTIFACTS[(!!(UNITLAYERS.myunits[POS]) ? (!!(UNITLAYERS.mytowers[POS]) ? "madecatapults" : "madetowers") : "madewalls")][POS] = {};
        }
        ARTIFACTS[(!!(UNITLAYERS.myunits[MARKS["selectmove"]]) ? (!!(UNITLAYERS.mytowers[MARKS["selectmove"]]) ? "madecatapults" : "madetowers") : "madewalls")][STARTPOS] = {};
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
      game.selectmove2instruction = function(turn, step) {
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
            text: "to overturn your"
          }, {
            type: 'posref',
            pos: MARKS["selecttower"]
          }, {
            type: "unittyperef",
            name: "rook"
          }, {
            type: 'text',
            text: "towards"
          }, {
            type: 'posref',
            pos: MARKS["selectmove"]
          }]
        });
      };
      game.selectkill2 = function(turn, step, markpos) {
        var UNITLAYERS = step.UNITLAYERS;
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
        if (!!(UNITLAYERS.oppcatapults[MARKS["selectkill"]])) {
          turn.links[newstepid].sacrifice = 'sacrifice2';
        }
        return newstep;
      };
      game.selectkill2instruction = function(turn, step) {
        var MARKS = step.MARKS;
        var UNITLAYERS = step.UNITLAYERS;
        return collapseLine({
          type: 'line',
          content: [{
            type: 'text',
            text: "Press"
          }, {
            type: 'cmndref',
            cmnd: "kill"
          }, {
            type: 'text',
            text: "to make a section of the"
          }, {
            type: 'posref',
            pos: MARKS["selecttower"]
          }, {
            type: "unittyperef",
            name: "rook"
          }, (!!(UNITLAYERS.walls[MARKS["selectkill"]]) ? collapseLine({
            type: 'line',
            content: [{
              type: 'text',
              text: "crush the enemy"
            }, {
              type: "unittyperef",
              name: "pawn"
            }, {
              type: 'text',
              text: "at"
            }, {
              type: 'posref',
              pos: MARKS["selectkill"]
            }]
          }) : collapseLine({
            type: 'line',
            content: [{
              type: 'text',
              text: "reduce the enemy"
            }, {
              type: "unittyperef",
              name: "queen"
            }, {
              type: 'text',
              text: "at"
            }, {
              type: 'posref',
              pos: MARKS["selectkill"]
            }, {
              type: 'text',
              text: "to a"
            }, {
              type: "unittyperef",
              name: "rook"
            }, {
              type: 'text',
              text: ", or"
            }, {
              type: 'cmndref',
              cmnd: "sacrifice"
            }, {
              type: 'text',
              text: "your"
            }, {
              type: "unittyperef",
              name: "rook"
            }, {
              type: 'text',
              text: "entirely to turn the"
            }, {
              type: "unittyperef",
              name: "queen"
            }, {
              type: 'text',
              text: "to a"
            }, {
              type: "unittyperef",
              name: "pawn"
            }, {
              type: 'text',
              text: "!"
            }]
          }))]
        });
      };
      game.selectcatapult2 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          firetargets: Object.assign({}, step.ARTIFACTS.firetargets)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectcatapult: markpos
        };
        var STARTPOS = MARKS["selectcatapult"];
        var allwalkerdirs = [3, 4, 5, 6, 7];
        for (var walkerdirnbr = 0; walkerdirnbr < 5; walkerdirnbr++) {
          var MAX = 3;
          var POS = STARTPOS;
          var LENGTH = 0;
          var STEP = 0;
          while (LENGTH < MAX && (POS = connections[POS][allwalkerdirs[walkerdirnbr]])) {
            LENGTH++;
            STEP++;
            if (((STEP > 1) && !(UNITLAYERS.myunits[POS]))) {
              ARTIFACTS["firetargets"][POS] = {};
            }
          }
        }
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectcatapult'
        });
        turn.links[newstepid] = {};
        var newlinks = turn.links[newstepid];
        for (var linkpos in ARTIFACTS.firetargets) {
          newlinks[linkpos] = 'selectfire2';
        }
        return newstep;
      };
      game.selectcatapult2instruction = function(turn, step) {
        var MARKS = step.MARKS;
        return collapseLine({
          type: 'line',
          content: [{
            type: 'text',
            text: "Select where to fire the top section of your"
          }, {
            type: 'posref',
            pos: MARKS["selectcatapult"]
          }, {
            type: "unittyperef",
            name: "queen"
          }]
        });
      };
      game.selectfire2 = function(turn, step, markpos) {
        var MARKS = {
          selectfire: markpos,
          selectcatapult: step.MARKS.selectcatapult
        };
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectfire'
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].fire = 'fire2';
        return newstep;
      };
      game.selectfire2instruction = function(turn, step) {
        var MARKS = step.MARKS;
        var UNITLAYERS = step.UNITLAYERS;
        return collapseLine({
          type: 'line',
          content: [{
            type: 'text',
            text: "Press"
          }, {
            type: 'cmndref',
            cmnd: "fire"
          }, {
            type: 'text',
            text: "to shoot a section of the"
          }, {
            type: 'posref',
            pos: MARKS["selectcatapult"]
          }, {
            type: "unittyperef",
            name: "queen"
          }, (!!(UNITLAYERS.walls[MARKS["selectfire"]]) ? collapseLine({
            type: 'line',
            content: [{
              type: 'text',
              text: "and destroy the enemy"
            }, {
              type: "unittyperef",
              name: "pawn"
            }, {
              type: 'text',
              text: "at"
            }, {
              type: 'posref',
              pos: MARKS["selectfire"]
            }]
          }) : (!!(UNITLAYERS.units[MARKS["selectfire"]]) ? collapseLine({
            type: 'line',
            content: [{
              type: 'text',
              text: ", reducing the enemy"
            }, {
              type: "unittyperef",
              name: game.graphics.icons[(UNITLAYERS.units[MARKS["selectfire"]] || {})["group"]]
            }, {
              type: 'text',
              text: "at"
            }, {
              type: 'posref',
              pos: MARKS["selectfire"]
            }, {
              type: 'text',
              text: "to a"
            }, (!!(UNITLAYERS.catapults[MARKS["selectfire"]]) ? {
              type: "unittyperef",
              name: "rook"
            } : {
              type: "unittyperef",
              name: "pawn"
            })]
          }) : collapseLine({
            type: 'line',
            content: [{
              type: 'text',
              text: "at"
            }, {
              type: 'posref',
              pos: MARKS["selectfire"]
            }, {
              type: 'text',
              text: ", gaining a"
            }, {
              type: "unittyperef",
              name: "pawn"
            }, {
              type: 'text',
              text: "there"
            }]
          })))]
        });
      };
      game.move2 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var clones = step.clones;
        var UNITLAYERS = step.UNITLAYERS;
        delete UNITDATA[(UNITLAYERS.units[MARKS["selecttower"]]  || {}).id];
        for (var POS in ARTIFACTS.madecatapults) {
          var unitid = (UNITLAYERS.units[POS]  || {}).id;
          if (unitid) {
            UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
              "group": "catapults"
            });
          }
        }
        for (var POS in ARTIFACTS.madetowers) {
          var unitid = (UNITLAYERS.units[POS]  || {}).id;
          if (unitid) {
            UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
              "group": "towers"
            });
          }
        }
        for (var POS in ARTIFACTS.madewalls) {
          var newunitid = 'spawn' + (clones++);
          UNITDATA[newunitid] = {
            pos: POS,
            id: newunitid,
            group: "walls",
            owner: 2,
            from: MARKS["selecttower"]
          };
        }
        MARKS = {};
        UNITLAYERS = {
          "towers": {},
          "mytowers": {},
          "opptowers": {},
          "neutraltowers": {},
          "catapults": {},
          "mycatapults": {},
          "oppcatapults": {},
          "neutralcatapults": {},
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
          "firetargets": {},
          "movetargets": {},
          "madecatapults": {},
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
            }())).length !== 0) {
          var winner = 2;
          var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'infiltration';
          turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
          turn.endMarks[newstepid].infiltration =
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
      game.kill2 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var UNITLAYERS = step.UNITLAYERS;
        var unitid = (UNITLAYERS.units[MARKS["selecttower"]]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            "group": "walls"
          });
        }
        if (!!(UNITLAYERS.oppcatapults[MARKS["selectkill"]])) {
          var unitid = (UNITLAYERS.units[MARKS["selectkill"]]  || {}).id;
          if (unitid) {
            UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
              "group": "towers"
            });
          }
        } else {
          delete UNITDATA[(UNITLAYERS.units[MARKS["selectkill"]]  || {}).id];
        }
        MARKS = {};
        UNITLAYERS = {
          "towers": {},
          "mytowers": {},
          "opptowers": {},
          "neutraltowers": {},
          "catapults": {},
          "mycatapults": {},
          "oppcatapults": {},
          "neutralcatapults": {},
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
          "firetargets": {},
          "movetargets": {},
          "madecatapults": {},
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
            }())).length !== 0) {
          var winner = 2;
          var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'infiltration';
          turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
          turn.endMarks[newstepid].infiltration =
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
            }());
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.kill2instruction = function(turn, step) {
        return {
          type: 'text',
          text: ""
        };
      };
      game.sacrifice2 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var UNITLAYERS = step.UNITLAYERS;
        var unitid = (UNITLAYERS.units[MARKS["selectkill"]]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            "group": "walls"
          });
        }
        delete UNITDATA[(UNITLAYERS.units[MARKS["selecttower"]]  || {}).id];
        MARKS = {};
        UNITLAYERS = {
          "towers": {},
          "mytowers": {},
          "opptowers": {},
          "neutraltowers": {},
          "catapults": {},
          "mycatapults": {},
          "oppcatapults": {},
          "neutralcatapults": {},
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
          "firetargets": {},
          "movetargets": {},
          "madecatapults": {},
          "madetowers": {},
          "madewalls": {},
          "killtargets": {}
        };
        var newstepid = step.stepid + '-' + 'sacrifice';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'sacrifice',
          path: step.path.concat('sacrifice')
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
            }())).length !== 0) {
          var winner = 2;
          var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'infiltration';
          turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
          turn.endMarks[newstepid].infiltration =
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
            }());
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.sacrifice2instruction = function(turn, step) {
        return {
          type: 'text',
          text: ""
        };
      };
      game.fire2 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var clones = step.clones;
        var UNITLAYERS = step.UNITLAYERS;
        if (!!(UNITLAYERS.oppwalls[MARKS["selectfire"]])) {
          delete UNITDATA[(UNITLAYERS.units[MARKS["selectfire"]]  || {}).id];
        } else {
          if (!!(UNITLAYERS.oppunits[MARKS["selectfire"]])) {
            var unitid = (UNITLAYERS.units[MARKS["selectfire"]]  || {}).id;
            if (unitid) {
              UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
                "group": (!!(UNITLAYERS.oppcatapults[MARKS["selectfire"]]) ? "towers" : "walls")
              });
            }
          } else {
            var newunitid = 'spawn' + (clones++);
            UNITDATA[newunitid] = {
              pos: MARKS["selectfire"],
              id: newunitid,
              group: "walls",
              owner: 2,
              from: MARKS["selectcatapult"]
            };
          }
        }
        var unitid = (UNITLAYERS.units[MARKS["selectcatapult"]]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            "group": "towers"
          });
        }
        MARKS = {};
        UNITLAYERS = {
          "towers": {},
          "mytowers": {},
          "opptowers": {},
          "neutraltowers": {},
          "catapults": {},
          "mycatapults": {},
          "oppcatapults": {},
          "neutralcatapults": {},
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
          "firetargets": {},
          "movetargets": {},
          "madecatapults": {},
          "madetowers": {},
          "madewalls": {},
          "killtargets": {}
        };
        var newstepid = step.stepid + '-' + 'fire';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'fire',
          path: step.path.concat('fire'),
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
            }())).length !== 0) {
          var winner = 2;
          var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'infiltration';
          turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
          turn.endMarks[newstepid].infiltration =
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
            }());
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.fire2instruction = function(turn, step) {
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
          "firetargets": {},
          "movetargets": {},
          "madecatapults": {},
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
          "catapults": {},
          "mycatapults": {},
          "oppcatapults": {},
          "neutralcatapults": {},
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
        var newlinks = turn.links.root;
        for (var linkpos in UNITLAYERS.mycatapults) {
          newlinks[linkpos] = 'selectcatapult2';
        }
        return turn;
      }
      game.start2instruction = function(turn, step) {
        var UNITLAYERS = step.UNITLAYERS;
        return collapseLine({
          type: 'line',
          content: [{
              type: 'text',
              text: "Select a"
            },
            [{
              cond: Object.keys(UNITLAYERS.mytowers).length !== 0,
              content: {
                type: "unittyperef",
                name: "rook"
              }
            }, {
              cond: Object.keys(UNITLAYERS.mycatapults).length !== 0,
              content: {
                type: "unittyperef",
                name: "queen"
              }
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
            }), {
              type: 'text',
              text: "to act with"
            }
          ]
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