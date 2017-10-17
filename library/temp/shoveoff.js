(
  function() {
    var game = {};
    game.commands = {
      "north": 1,
      "south": 1,
      "east": 1,
      "west": 1
    };
    game.graphics = {
      "icons": {
        "soldiers": "pawn"
      }
    };
    game.board = {
      "height": 4,
      "width": 4,
      "terrain": {
        "southedge": [
          ["rect", "a1", "d1"]
        ],
        "northedge": [
          ["rect", "a4", "d4"]
        ],
        "westedge": [
          ["rect", "a1", "a4"]
        ],
        "eastedge": [
          ["rect", "d1", "d4"]
        ],
        "edge": [
          ["holerect", "a1", "d4", ["b2", "b3", "c2", "c3"]]
        ]
      }
    };
    game.AI = [];
    game.id = "shoveoff";
    var boardDef = {
      "height": 4,
      "width": 4,
      "terrain": {
        "southedge": [
          ["rect", "a1", "d1"]
        ],
        "northedge": [
          ["rect", "a4", "d4"]
        ],
        "westedge": [
          ["rect", "a1", "a4"]
        ],
        "eastedge": [
          ["rect", "d1", "d4"]
        ],
        "edge": [
          ["holerect", "a1", "d4", ["b2", "b3", "c2", "c3"]]
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
              "0": [
                ["rect", "a1", "d4"]
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
      game.selectpushpoint1 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          targetedgepoints: Object.assign({}, step.ARTIFACTS.targetedgepoints),
          squishsouth: Object.assign({}, step.ARTIFACTS.squishsouth),
          squishwest: Object.assign({}, step.ARTIFACTS.squishwest),
          squishnorth: Object.assign({}, step.ARTIFACTS.squishnorth),
          squisheast: Object.assign({}, step.ARTIFACTS.squisheast),
          pushsouth: Object.assign({}, step.ARTIFACTS.pushsouth),
          pushwest: Object.assign({}, step.ARTIFACTS.pushwest),
          pushnorth: Object.assign({}, step.ARTIFACTS.pushnorth),
          pusheast: Object.assign({}, step.ARTIFACTS.pusheast),
          spawnsouth: Object.assign({}, step.ARTIFACTS.spawnsouth),
          spawnwest: Object.assign({}, step.ARTIFACTS.spawnwest),
          spawnnorth: Object.assign({}, step.ARTIFACTS.spawnnorth),
          spawneast: Object.assign({}, step.ARTIFACTS.spawneast)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectpushpoint: markpos
        };
        var STARTPOS = MARKS["selectpushpoint"];
        var allwalkerdirs = [1, 3, 5, 7];
        for (var walkerdirnbr = 0; walkerdirnbr < 4; walkerdirnbr++) {
          var DIR = allwalkerdirs[walkerdirnbr];
          var walkedsquares = [];
          var POS = STARTPOS;
          while ((POS = connections[POS][DIR])) {
            walkedsquares.push(POS);
          }
          var WALKLENGTH = walkedsquares.length;
          if (WALKLENGTH) {
            if ((WALKLENGTH === 3) && !UNITLAYERS.oppunits[walkedsquares[WALKLENGTH - 1]]) {
              ARTIFACTS["targetedgepoints"][walkedsquares[WALKLENGTH - 1]] = {
                dir: relativedirs[5 - 2 + DIR]
              };
            }
          }
        }
        var walkstarts = ARTIFACTS.targetedgepoints;
        for (var STARTPOS in walkstarts) {
          var DIR = (ARTIFACTS.targetedgepoints[STARTPOS] || {})["dir"];
          var walkedsquares = [];
          var POS = "faux";
          connections.faux[DIR] = STARTPOS;
          var STEP = 0;
          while ((POS = connections[POS][DIR])) {
            walkedsquares.push(POS);
            STEP++;
            if ((STEP !== 1)) {
              ARTIFACTS[((DIR === 1) ? "pushsouth" : ((DIR === 3) ? "pushwest" : ((DIR === 5) ? "pushnorth" : "pusheast")))][POS] = {};
            }
          }
          var WALKLENGTH = walkedsquares.length;
          ARTIFACTS[((DIR === 1) ? "squishsouth" : ((DIR === 3) ? "squishwest" : ((DIR === 5) ? "squishnorth" : "squisheast")))][STARTPOS] = {};
          if (WALKLENGTH) {
            ARTIFACTS[((DIR === 1) ? "spawnsouth" : ((DIR === 3) ? "spawnwest" : ((DIR === 5) ? "spawnnorth" : "spawneast")))][walkedsquares[WALKLENGTH - 1]] = {};
          }
        }
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectpushpoint'
        });
        turn.links[newstepid] = {};
        if (Object.keys(ARTIFACTS.spawnsouth).length !== 0) {
          turn.links[newstepid].south = 'south1';
        }
        if (Object.keys(ARTIFACTS.spawnnorth).length !== 0) {
          turn.links[newstepid].north = 'north1';
        }
        if (Object.keys(ARTIFACTS.spawnwest).length !== 0) {
          turn.links[newstepid].west = 'west1';
        }
        if (Object.keys(ARTIFACTS.spawneast).length !== 0) {
          turn.links[newstepid].east = 'east1';
        }
        return newstep;
      };
      game.selectpushpoint1instruction = function(turn, step) {
        var MARKS = step.MARKS;
        var ARTIFACTS = step.ARTIFACTS;
        return collapseLine({
          type: 'line',
          content: [{
              type: 'text',
              text: "Press"
            },
            [{
              cond: Object.keys(ARTIFACTS.spawnsouth).length !== 0,
              content: {
                type: 'cmndref',
                cmnd: "south"
              }
            }, {
              cond: Object.keys(ARTIFACTS.spawnnorth).length !== 0,
              content: {
                type: 'cmndref',
                cmnd: "north"
              }
            }, {
              cond: Object.keys(ARTIFACTS.spawnwest).length !== 0,
              content: {
                type: 'cmndref',
                cmnd: "west"
              }
            }, {
              cond: Object.keys(ARTIFACTS.spawneast).length !== 0,
              content: {
                type: 'cmndref',
                cmnd: "east"
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
              text: "to shove in that direction and make room for the new unit at"
            }, {
              type: 'posref',
              pos: MARKS["selectpushpoint"]
            }
          ]
        });
      };
      game.north1 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          fourinarow: Object.assign({}, step.ARTIFACTS.fourinarow)
        });
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var clones = step.clones;
        var UNITLAYERS = step.UNITLAYERS;
        delete UNITDATA[(UNITLAYERS.units[Object.keys(ARTIFACTS.squishnorth)[0]]  || {}).id];
        var LOOPID;
        for (var POS in ARTIFACTS.pushnorth) {
          if (LOOPID = (UNITLAYERS.units[POS] || {}).id) {
            var pushid = LOOPID;
            var pushdir = 1;
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
        var newunitid = 'spawn' + (clones++);
        UNITDATA[newunitid] = {
          pos: Object.keys(ARTIFACTS.spawnnorth)[0],
          id: newunitid,
          group: "soldiers",
          owner: ((8 > Object.keys(UNITLAYERS.myunits).length) ? 1 : 0)
        };
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
          "targetedgepoints": {},
          "squishsouth": {},
          "squishwest": {},
          "squishnorth": {},
          "squisheast": {},
          "pushsouth": {},
          "pushwest": {},
          "pushnorth": {},
          "pusheast": {},
          "spawnsouth": {},
          "spawnwest": {},
          "spawnnorth": {},
          "spawneast": {},
          "fourinarow": {}
        };
        var allowedsteps = UNITLAYERS.myunits;
        var walkstarts = UNITLAYERS.myunits;
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var DIR = allwalkerdirs[walkerdirnbr];
            var walkedsquares = [];
            var POS = "faux";
            connections.faux[DIR] = STARTPOS;
            while ((POS = connections[POS][DIR]) && allowedsteps[POS]) {
              walkedsquares.push(POS);
            }
            var WALKLENGTH = walkedsquares.length;
            for (var walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
              POS = walkedsquares[walkstepper];
              if ((WALKLENGTH === 4)) {
                ARTIFACTS["fourinarow"][POS] = {};
              }
            }
          }
        }
        var newstepid = step.stepid + '-' + 'north';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'north',
          path: step.path.concat('north'),
          clones: clones
        });
        turn.links[newstepid] = {};
        if (Object.keys(ARTIFACTS.fourinarow).length !== 0) {
          var winner = 1;
          var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'madeline';
          turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
          turn.endMarks[newstepid].madeline = ARTIFACTS.fourinarow;
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.north1instruction = function(turn, step) {
        return {
          type: 'text',
          text: ""
        };
      };
      game.south1 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          fourinarow: Object.assign({}, step.ARTIFACTS.fourinarow)
        });
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var clones = step.clones;
        var UNITLAYERS = step.UNITLAYERS;
        delete UNITDATA[(UNITLAYERS.units[Object.keys(ARTIFACTS.squishsouth)[0]]  || {}).id];
        var LOOPID;
        for (var POS in ARTIFACTS.pushsouth) {
          if (LOOPID = (UNITLAYERS.units[POS] || {}).id) {
            var pushid = LOOPID;
            var pushdir = 5;
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
        var newunitid = 'spawn' + (clones++);
        UNITDATA[newunitid] = {
          pos: Object.keys(ARTIFACTS.spawnsouth)[0],
          id: newunitid,
          group: "soldiers",
          owner: ((8 > Object.keys(UNITLAYERS.myunits).length) ? 1 : 0)
        };
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
          "targetedgepoints": {},
          "squishsouth": {},
          "squishwest": {},
          "squishnorth": {},
          "squisheast": {},
          "pushsouth": {},
          "pushwest": {},
          "pushnorth": {},
          "pusheast": {},
          "spawnsouth": {},
          "spawnwest": {},
          "spawnnorth": {},
          "spawneast": {},
          "fourinarow": {}
        };
        var allowedsteps = UNITLAYERS.myunits;
        var walkstarts = UNITLAYERS.myunits;
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var DIR = allwalkerdirs[walkerdirnbr];
            var walkedsquares = [];
            var POS = "faux";
            connections.faux[DIR] = STARTPOS;
            while ((POS = connections[POS][DIR]) && allowedsteps[POS]) {
              walkedsquares.push(POS);
            }
            var WALKLENGTH = walkedsquares.length;
            for (var walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
              POS = walkedsquares[walkstepper];
              if ((WALKLENGTH === 4)) {
                ARTIFACTS["fourinarow"][POS] = {};
              }
            }
          }
        }
        var newstepid = step.stepid + '-' + 'south';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'south',
          path: step.path.concat('south'),
          clones: clones
        });
        turn.links[newstepid] = {};
        if (Object.keys(ARTIFACTS.fourinarow).length !== 0) {
          var winner = 1;
          var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'madeline';
          turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
          turn.endMarks[newstepid].madeline = ARTIFACTS.fourinarow;
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.south1instruction = function(turn, step) {
        return {
          type: 'text',
          text: ""
        };
      };
      game.east1 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          fourinarow: Object.assign({}, step.ARTIFACTS.fourinarow)
        });
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var clones = step.clones;
        var UNITLAYERS = step.UNITLAYERS;
        delete UNITDATA[(UNITLAYERS.units[Object.keys(ARTIFACTS.squisheast)[0]]  || {}).id];
        var LOOPID;
        for (var POS in ARTIFACTS.pusheast) {
          if (LOOPID = (UNITLAYERS.units[POS] || {}).id) {
            var pushid = LOOPID;
            var pushdir = 3;
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
        var newunitid = 'spawn' + (clones++);
        UNITDATA[newunitid] = {
          pos: Object.keys(ARTIFACTS.spawneast)[0],
          id: newunitid,
          group: "soldiers",
          owner: ((8 > Object.keys(UNITLAYERS.myunits).length) ? 1 : 0)
        };
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
          "targetedgepoints": {},
          "squishsouth": {},
          "squishwest": {},
          "squishnorth": {},
          "squisheast": {},
          "pushsouth": {},
          "pushwest": {},
          "pushnorth": {},
          "pusheast": {},
          "spawnsouth": {},
          "spawnwest": {},
          "spawnnorth": {},
          "spawneast": {},
          "fourinarow": {}
        };
        var allowedsteps = UNITLAYERS.myunits;
        var walkstarts = UNITLAYERS.myunits;
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var DIR = allwalkerdirs[walkerdirnbr];
            var walkedsquares = [];
            var POS = "faux";
            connections.faux[DIR] = STARTPOS;
            while ((POS = connections[POS][DIR]) && allowedsteps[POS]) {
              walkedsquares.push(POS);
            }
            var WALKLENGTH = walkedsquares.length;
            for (var walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
              POS = walkedsquares[walkstepper];
              if ((WALKLENGTH === 4)) {
                ARTIFACTS["fourinarow"][POS] = {};
              }
            }
          }
        }
        var newstepid = step.stepid + '-' + 'east';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'east',
          path: step.path.concat('east'),
          clones: clones
        });
        turn.links[newstepid] = {};
        if (Object.keys(ARTIFACTS.fourinarow).length !== 0) {
          var winner = 1;
          var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'madeline';
          turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
          turn.endMarks[newstepid].madeline = ARTIFACTS.fourinarow;
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.east1instruction = function(turn, step) {
        return {
          type: 'text',
          text: ""
        };
      };
      game.west1 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          fourinarow: Object.assign({}, step.ARTIFACTS.fourinarow)
        });
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var clones = step.clones;
        var UNITLAYERS = step.UNITLAYERS;
        delete UNITDATA[(UNITLAYERS.units[Object.keys(ARTIFACTS.squishwest)[0]]  || {}).id];
        var LOOPID;
        for (var POS in ARTIFACTS.pushwest) {
          if (LOOPID = (UNITLAYERS.units[POS] || {}).id) {
            var pushid = LOOPID;
            var pushdir = 7;
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
        var newunitid = 'spawn' + (clones++);
        UNITDATA[newunitid] = {
          pos: Object.keys(ARTIFACTS.spawnwest)[0],
          id: newunitid,
          group: "soldiers",
          owner: ((8 > Object.keys(UNITLAYERS.myunits).length) ? 1 : 0)
        };
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
          "targetedgepoints": {},
          "squishsouth": {},
          "squishwest": {},
          "squishnorth": {},
          "squisheast": {},
          "pushsouth": {},
          "pushwest": {},
          "pushnorth": {},
          "pusheast": {},
          "spawnsouth": {},
          "spawnwest": {},
          "spawnnorth": {},
          "spawneast": {},
          "fourinarow": {}
        };
        var allowedsteps = UNITLAYERS.myunits;
        var walkstarts = UNITLAYERS.myunits;
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var DIR = allwalkerdirs[walkerdirnbr];
            var walkedsquares = [];
            var POS = "faux";
            connections.faux[DIR] = STARTPOS;
            while ((POS = connections[POS][DIR]) && allowedsteps[POS]) {
              walkedsquares.push(POS);
            }
            var WALKLENGTH = walkedsquares.length;
            for (var walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
              POS = walkedsquares[walkstepper];
              if ((WALKLENGTH === 4)) {
                ARTIFACTS["fourinarow"][POS] = {};
              }
            }
          }
        }
        var newstepid = step.stepid + '-' + 'west';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'west',
          path: step.path.concat('west'),
          clones: clones
        });
        turn.links[newstepid] = {};
        if (Object.keys(ARTIFACTS.fourinarow).length !== 0) {
          var winner = 1;
          var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'madeline';
          turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
          turn.endMarks[newstepid].madeline = ARTIFACTS.fourinarow;
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.west1instruction = function(turn, step) {
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
          "targetedgepoints": {},
          "squishsouth": {},
          "squishwest": {},
          "squishnorth": {},
          "squisheast": {},
          "pushsouth": {},
          "pushwest": {},
          "pushnorth": {},
          "pusheast": {},
          "spawnsouth": {},
          "spawnwest": {},
          "spawnnorth": {},
          "spawneast": {},
          "fourinarow": {}
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
          clones: step.clones,
          path: []
        };
        var newlinks = turn.links.root;
        for (var linkpos in TERRAIN.edge) {
          newlinks[linkpos] = 'selectpushpoint1';
        }
        return turn;
      }
      game.start1instruction = function(turn, step) {
        var UNITLAYERS = step.UNITLAYERS;
        return collapseLine({
          type: 'line',
          content: [{
            type: 'text',
            text: "Select where to shove in"
          }, ((Object.keys(UNITLAYERS.myunits).length === 7) ? {
            type: 'text',
            text: "your last off-board unit"
          } : ((Object.keys(UNITLAYERS.myunits).length === 8) ? {
            type: 'text',
            text: "a neutral unit"
          } : collapseLine({
            type: 'line',
            content: [{
              type: 'text',
              text: "one of your"
            }, {
              type: 'text',
              text: (8 - Object.keys(UNITLAYERS.myunits).length)
            }, {
              type: 'text',
              text: "remaining off-board units"
            }]
          })))]
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
      game.selectpushpoint2 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          targetedgepoints: Object.assign({}, step.ARTIFACTS.targetedgepoints),
          squishsouth: Object.assign({}, step.ARTIFACTS.squishsouth),
          squishwest: Object.assign({}, step.ARTIFACTS.squishwest),
          squishnorth: Object.assign({}, step.ARTIFACTS.squishnorth),
          squisheast: Object.assign({}, step.ARTIFACTS.squisheast),
          pushsouth: Object.assign({}, step.ARTIFACTS.pushsouth),
          pushwest: Object.assign({}, step.ARTIFACTS.pushwest),
          pushnorth: Object.assign({}, step.ARTIFACTS.pushnorth),
          pusheast: Object.assign({}, step.ARTIFACTS.pusheast),
          spawnsouth: Object.assign({}, step.ARTIFACTS.spawnsouth),
          spawnwest: Object.assign({}, step.ARTIFACTS.spawnwest),
          spawnnorth: Object.assign({}, step.ARTIFACTS.spawnnorth),
          spawneast: Object.assign({}, step.ARTIFACTS.spawneast)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectpushpoint: markpos
        };
        var STARTPOS = MARKS["selectpushpoint"];
        var allwalkerdirs = [1, 3, 5, 7];
        for (var walkerdirnbr = 0; walkerdirnbr < 4; walkerdirnbr++) {
          var DIR = allwalkerdirs[walkerdirnbr];
          var walkedsquares = [];
          var POS = STARTPOS;
          while ((POS = connections[POS][DIR])) {
            walkedsquares.push(POS);
          }
          var WALKLENGTH = walkedsquares.length;
          if (WALKLENGTH) {
            if ((WALKLENGTH === 3) && !UNITLAYERS.oppunits[walkedsquares[WALKLENGTH - 1]]) {
              ARTIFACTS["targetedgepoints"][walkedsquares[WALKLENGTH - 1]] = {
                dir: relativedirs[5 - 2 + DIR]
              };
            }
          }
        }
        var walkstarts = ARTIFACTS.targetedgepoints;
        for (var STARTPOS in walkstarts) {
          var DIR = (ARTIFACTS.targetedgepoints[STARTPOS] || {})["dir"];
          var walkedsquares = [];
          var POS = "faux";
          connections.faux[DIR] = STARTPOS;
          var STEP = 0;
          while ((POS = connections[POS][DIR])) {
            walkedsquares.push(POS);
            STEP++;
            if ((STEP !== 1)) {
              ARTIFACTS[((DIR === 1) ? "pushsouth" : ((DIR === 3) ? "pushwest" : ((DIR === 5) ? "pushnorth" : "pusheast")))][POS] = {};
            }
          }
          var WALKLENGTH = walkedsquares.length;
          ARTIFACTS[((DIR === 1) ? "squishsouth" : ((DIR === 3) ? "squishwest" : ((DIR === 5) ? "squishnorth" : "squisheast")))][STARTPOS] = {};
          if (WALKLENGTH) {
            ARTIFACTS[((DIR === 1) ? "spawnsouth" : ((DIR === 3) ? "spawnwest" : ((DIR === 5) ? "spawnnorth" : "spawneast")))][walkedsquares[WALKLENGTH - 1]] = {};
          }
        }
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectpushpoint'
        });
        turn.links[newstepid] = {};
        if (Object.keys(ARTIFACTS.spawnsouth).length !== 0) {
          turn.links[newstepid].south = 'south2';
        }
        if (Object.keys(ARTIFACTS.spawnnorth).length !== 0) {
          turn.links[newstepid].north = 'north2';
        }
        if (Object.keys(ARTIFACTS.spawnwest).length !== 0) {
          turn.links[newstepid].west = 'west2';
        }
        if (Object.keys(ARTIFACTS.spawneast).length !== 0) {
          turn.links[newstepid].east = 'east2';
        }
        return newstep;
      };
      game.selectpushpoint2instruction = function(turn, step) {
        var MARKS = step.MARKS;
        var ARTIFACTS = step.ARTIFACTS;
        return collapseLine({
          type: 'line',
          content: [{
              type: 'text',
              text: "Press"
            },
            [{
              cond: Object.keys(ARTIFACTS.spawnsouth).length !== 0,
              content: {
                type: 'cmndref',
                cmnd: "south"
              }
            }, {
              cond: Object.keys(ARTIFACTS.spawnnorth).length !== 0,
              content: {
                type: 'cmndref',
                cmnd: "north"
              }
            }, {
              cond: Object.keys(ARTIFACTS.spawnwest).length !== 0,
              content: {
                type: 'cmndref',
                cmnd: "west"
              }
            }, {
              cond: Object.keys(ARTIFACTS.spawneast).length !== 0,
              content: {
                type: 'cmndref',
                cmnd: "east"
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
              text: "to shove in that direction and make room for the new unit at"
            }, {
              type: 'posref',
              pos: MARKS["selectpushpoint"]
            }
          ]
        });
      };
      game.north2 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          fourinarow: Object.assign({}, step.ARTIFACTS.fourinarow)
        });
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var clones = step.clones;
        var UNITLAYERS = step.UNITLAYERS;
        delete UNITDATA[(UNITLAYERS.units[Object.keys(ARTIFACTS.squishnorth)[0]]  || {}).id];
        var LOOPID;
        for (var POS in ARTIFACTS.pushnorth) {
          if (LOOPID = (UNITLAYERS.units[POS] || {}).id) {
            var pushid = LOOPID;
            var pushdir = 1;
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
        var newunitid = 'spawn' + (clones++);
        UNITDATA[newunitid] = {
          pos: Object.keys(ARTIFACTS.spawnnorth)[0],
          id: newunitid,
          group: "soldiers",
          owner: ((8 > Object.keys(UNITLAYERS.myunits).length) ? 2 : 0)
        };
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
          "targetedgepoints": {},
          "squishsouth": {},
          "squishwest": {},
          "squishnorth": {},
          "squisheast": {},
          "pushsouth": {},
          "pushwest": {},
          "pushnorth": {},
          "pusheast": {},
          "spawnsouth": {},
          "spawnwest": {},
          "spawnnorth": {},
          "spawneast": {},
          "fourinarow": {}
        };
        var allowedsteps = UNITLAYERS.myunits;
        var walkstarts = UNITLAYERS.myunits;
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var DIR = allwalkerdirs[walkerdirnbr];
            var walkedsquares = [];
            var POS = "faux";
            connections.faux[DIR] = STARTPOS;
            while ((POS = connections[POS][DIR]) && allowedsteps[POS]) {
              walkedsquares.push(POS);
            }
            var WALKLENGTH = walkedsquares.length;
            for (var walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
              POS = walkedsquares[walkstepper];
              if ((WALKLENGTH === 4)) {
                ARTIFACTS["fourinarow"][POS] = {};
              }
            }
          }
        }
        var newstepid = step.stepid + '-' + 'north';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'north',
          path: step.path.concat('north'),
          clones: clones
        });
        turn.links[newstepid] = {};
        if (Object.keys(ARTIFACTS.fourinarow).length !== 0) {
          var winner = 2;
          var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'madeline';
          turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
          turn.endMarks[newstepid].madeline = ARTIFACTS.fourinarow;
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.north2instruction = function(turn, step) {
        return {
          type: 'text',
          text: ""
        };
      };
      game.south2 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          fourinarow: Object.assign({}, step.ARTIFACTS.fourinarow)
        });
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var clones = step.clones;
        var UNITLAYERS = step.UNITLAYERS;
        delete UNITDATA[(UNITLAYERS.units[Object.keys(ARTIFACTS.squishsouth)[0]]  || {}).id];
        var LOOPID;
        for (var POS in ARTIFACTS.pushsouth) {
          if (LOOPID = (UNITLAYERS.units[POS] || {}).id) {
            var pushid = LOOPID;
            var pushdir = 5;
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
        var newunitid = 'spawn' + (clones++);
        UNITDATA[newunitid] = {
          pos: Object.keys(ARTIFACTS.spawnsouth)[0],
          id: newunitid,
          group: "soldiers",
          owner: ((8 > Object.keys(UNITLAYERS.myunits).length) ? 2 : 0)
        };
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
          "targetedgepoints": {},
          "squishsouth": {},
          "squishwest": {},
          "squishnorth": {},
          "squisheast": {},
          "pushsouth": {},
          "pushwest": {},
          "pushnorth": {},
          "pusheast": {},
          "spawnsouth": {},
          "spawnwest": {},
          "spawnnorth": {},
          "spawneast": {},
          "fourinarow": {}
        };
        var allowedsteps = UNITLAYERS.myunits;
        var walkstarts = UNITLAYERS.myunits;
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var DIR = allwalkerdirs[walkerdirnbr];
            var walkedsquares = [];
            var POS = "faux";
            connections.faux[DIR] = STARTPOS;
            while ((POS = connections[POS][DIR]) && allowedsteps[POS]) {
              walkedsquares.push(POS);
            }
            var WALKLENGTH = walkedsquares.length;
            for (var walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
              POS = walkedsquares[walkstepper];
              if ((WALKLENGTH === 4)) {
                ARTIFACTS["fourinarow"][POS] = {};
              }
            }
          }
        }
        var newstepid = step.stepid + '-' + 'south';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'south',
          path: step.path.concat('south'),
          clones: clones
        });
        turn.links[newstepid] = {};
        if (Object.keys(ARTIFACTS.fourinarow).length !== 0) {
          var winner = 2;
          var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'madeline';
          turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
          turn.endMarks[newstepid].madeline = ARTIFACTS.fourinarow;
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.south2instruction = function(turn, step) {
        return {
          type: 'text',
          text: ""
        };
      };
      game.east2 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          fourinarow: Object.assign({}, step.ARTIFACTS.fourinarow)
        });
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var clones = step.clones;
        var UNITLAYERS = step.UNITLAYERS;
        delete UNITDATA[(UNITLAYERS.units[Object.keys(ARTIFACTS.squisheast)[0]]  || {}).id];
        var LOOPID;
        for (var POS in ARTIFACTS.pusheast) {
          if (LOOPID = (UNITLAYERS.units[POS] || {}).id) {
            var pushid = LOOPID;
            var pushdir = 3;
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
        var newunitid = 'spawn' + (clones++);
        UNITDATA[newunitid] = {
          pos: Object.keys(ARTIFACTS.spawneast)[0],
          id: newunitid,
          group: "soldiers",
          owner: ((8 > Object.keys(UNITLAYERS.myunits).length) ? 2 : 0)
        };
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
          "targetedgepoints": {},
          "squishsouth": {},
          "squishwest": {},
          "squishnorth": {},
          "squisheast": {},
          "pushsouth": {},
          "pushwest": {},
          "pushnorth": {},
          "pusheast": {},
          "spawnsouth": {},
          "spawnwest": {},
          "spawnnorth": {},
          "spawneast": {},
          "fourinarow": {}
        };
        var allowedsteps = UNITLAYERS.myunits;
        var walkstarts = UNITLAYERS.myunits;
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var DIR = allwalkerdirs[walkerdirnbr];
            var walkedsquares = [];
            var POS = "faux";
            connections.faux[DIR] = STARTPOS;
            while ((POS = connections[POS][DIR]) && allowedsteps[POS]) {
              walkedsquares.push(POS);
            }
            var WALKLENGTH = walkedsquares.length;
            for (var walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
              POS = walkedsquares[walkstepper];
              if ((WALKLENGTH === 4)) {
                ARTIFACTS["fourinarow"][POS] = {};
              }
            }
          }
        }
        var newstepid = step.stepid + '-' + 'east';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'east',
          path: step.path.concat('east'),
          clones: clones
        });
        turn.links[newstepid] = {};
        if (Object.keys(ARTIFACTS.fourinarow).length !== 0) {
          var winner = 2;
          var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'madeline';
          turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
          turn.endMarks[newstepid].madeline = ARTIFACTS.fourinarow;
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.east2instruction = function(turn, step) {
        return {
          type: 'text',
          text: ""
        };
      };
      game.west2 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          fourinarow: Object.assign({}, step.ARTIFACTS.fourinarow)
        });
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var clones = step.clones;
        var UNITLAYERS = step.UNITLAYERS;
        delete UNITDATA[(UNITLAYERS.units[Object.keys(ARTIFACTS.squishwest)[0]]  || {}).id];
        var LOOPID;
        for (var POS in ARTIFACTS.pushwest) {
          if (LOOPID = (UNITLAYERS.units[POS] || {}).id) {
            var pushid = LOOPID;
            var pushdir = 7;
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
        var newunitid = 'spawn' + (clones++);
        UNITDATA[newunitid] = {
          pos: Object.keys(ARTIFACTS.spawnwest)[0],
          id: newunitid,
          group: "soldiers",
          owner: ((8 > Object.keys(UNITLAYERS.myunits).length) ? 2 : 0)
        };
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
          "targetedgepoints": {},
          "squishsouth": {},
          "squishwest": {},
          "squishnorth": {},
          "squisheast": {},
          "pushsouth": {},
          "pushwest": {},
          "pushnorth": {},
          "pusheast": {},
          "spawnsouth": {},
          "spawnwest": {},
          "spawnnorth": {},
          "spawneast": {},
          "fourinarow": {}
        };
        var allowedsteps = UNITLAYERS.myunits;
        var walkstarts = UNITLAYERS.myunits;
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var DIR = allwalkerdirs[walkerdirnbr];
            var walkedsquares = [];
            var POS = "faux";
            connections.faux[DIR] = STARTPOS;
            while ((POS = connections[POS][DIR]) && allowedsteps[POS]) {
              walkedsquares.push(POS);
            }
            var WALKLENGTH = walkedsquares.length;
            for (var walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
              POS = walkedsquares[walkstepper];
              if ((WALKLENGTH === 4)) {
                ARTIFACTS["fourinarow"][POS] = {};
              }
            }
          }
        }
        var newstepid = step.stepid + '-' + 'west';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'west',
          path: step.path.concat('west'),
          clones: clones
        });
        turn.links[newstepid] = {};
        if (Object.keys(ARTIFACTS.fourinarow).length !== 0) {
          var winner = 2;
          var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'madeline';
          turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
          turn.endMarks[newstepid].madeline = ARTIFACTS.fourinarow;
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.west2instruction = function(turn, step) {
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
          "targetedgepoints": {},
          "squishsouth": {},
          "squishwest": {},
          "squishnorth": {},
          "squisheast": {},
          "pushsouth": {},
          "pushwest": {},
          "pushnorth": {},
          "pusheast": {},
          "spawnsouth": {},
          "spawnwest": {},
          "spawnnorth": {},
          "spawneast": {},
          "fourinarow": {}
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
          clones: step.clones,
          path: []
        };
        var newlinks = turn.links.root;
        for (var linkpos in TERRAIN.edge) {
          newlinks[linkpos] = 'selectpushpoint2';
        }
        return turn;
      }
      game.start2instruction = function(turn, step) {
        var UNITLAYERS = step.UNITLAYERS;
        return collapseLine({
          type: 'line',
          content: [{
            type: 'text',
            text: "Select where to shove in"
          }, ((Object.keys(UNITLAYERS.myunits).length === 7) ? {
            type: 'text',
            text: "your last off-board unit"
          } : ((Object.keys(UNITLAYERS.myunits).length === 8) ? {
            type: 'text',
            text: "a neutral unit"
          } : collapseLine({
            type: 'line',
            content: [{
              type: 'text',
              text: "one of your"
            }, {
              type: 'text',
              text: (8 - Object.keys(UNITLAYERS.myunits).length)
            }, {
              type: 'text',
              text: "remaining off-board units"
            }]
          })))]
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