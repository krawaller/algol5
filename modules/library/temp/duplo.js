(
  function() {
    var game = {};
    game.commands = {
      "deploy": 1,
      "expand": 1
    };
    game.graphics = {
      "icons": {
        "soldiers": "pawn"
      },
      "tiles": {}
    };
    game.board = {
      "height": 8,
      "width": 8,
      "terrain": {}
    };
    game.AI = [];
    game.id = "duplo";
    var boardDef = {
      "height": 8,
      "width": 8,
      "terrain": {}
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
        UNITDATA: deduceInitialUnitData({})
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
      var ownernames = ["neutral", "my", "opp"];
      var player = 1;
      var otherplayer = 2;
      game.selectdeploy1 = function(turn, step, markpos) {
        var MARKS = Object.assign({}, step.MARKS, {
          selectdeploy: markpos
        });
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectdeploy'
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].deploy = 'deploy1';
        return newstep;
      };
      game.selectdeploy1instruction = function(turn, step) {
        var MARKS = step.MARKS;
        var UNITLAYERS = step.UNITLAYERS;
        return ((Object.keys(UNITLAYERS.myunits).length === 1) ? collapseLine({
          type: 'line',
          content: [{
            type: 'text',
            text: "Press"
          }, {
            type: 'cmndref',
            cmnd: "deploy"
          }, {
            type: 'text',
            text: "to place your second unit at"
          }, {
            type: 'posref',
            pos: MARKS["selectdeploy"]
          }]
        }) : collapseLine({
          type: 'line',
          content: [{
            type: 'text',
            text: "Press"
          }, {
            type: 'cmndref',
            cmnd: "deploy"
          }, {
            type: 'text',
            text: "to place your first unit at"
          }, {
            type: 'posref',
            pos: MARKS["selectdeploy"]
          }]
        }));
      };
      game.selectunit1 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          spawndirs: Object.assign({}, step.ARTIFACTS.spawndirs),
          growstarts: Object.assign({}, step.ARTIFACTS.growstarts),
          targets: Object.assign({}, step.ARTIFACTS.targets),
          potentialopptargets: Object.assign({}, step.ARTIFACTS.potentialopptargets)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectunit: markpos
        };
        var STARTPOS = MARKS["selectunit"];
        var neighbourdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        var startconnections = connections[STARTPOS];
        for (var dirnbr = 0; dirnbr < 8; dirnbr++) {
          var DIR = neighbourdirs[dirnbr];
          var POS = startconnections[DIR];
          if (POS) {
            if (!(UNITLAYERS.myunits[POS])) {
              ARTIFACTS["spawndirs"][POS] = {
                dir: DIR
              };
            }
          }
        }
        var allowedsteps = UNITLAYERS.myunits;
        var walkstarts = ARTIFACTS.spawndirs;
        for (var STARTPOS in walkstarts) {
          var DIR = relativedirs[5 - 2 + (ARTIFACTS.spawndirs[STARTPOS] || {})["dir"]];
          var walkedsquares = [];
          var POS = STARTPOS;
          while ((POS = connections[POS][DIR]) && allowedsteps[POS]) {
            walkedsquares.push(POS);
          }
          var WALKLENGTH = walkedsquares.length;
          ARTIFACTS["growstarts"][STARTPOS] = {
            dir: relativedirs[5 - 2 + DIR],
            strength: WALKLENGTH
          };
        }
        var allowedsteps =
          (function() {
            var ret = {},
              s0 = BOARD.board,
              s1 = UNITLAYERS.units;
            for (var key in s0) {
              if (!s1[key]) {
                ret[key] = s0[key];
              }
            }
            return ret;
          }());
        var BLOCKS = UNITLAYERS.oppunits;
        var walkstarts = ARTIFACTS.growstarts;
        for (var STARTPOS in walkstarts) {
          var DIR = (ARTIFACTS.growstarts[STARTPOS] || {})["dir"];
          var STOPREASON = "";
          var MAX = (ARTIFACTS.growstarts[STARTPOS] || {})["strength"];
          var POS = "faux";
          connections.faux[DIR] = STARTPOS;
          var LENGTH = 0;
          var STEP = 0;
          while (!(STOPREASON = (LENGTH === MAX ? "reachedmax" : !(POS = connections[POS][DIR]) ? "outofbounds" : BLOCKS[POS] ? "hitblock" : !allowedsteps[POS] ? "nomoresteps" : null))) {
            LENGTH++;
            STEP++;
            if ((STEP === MAX)) {
              ARTIFACTS["targets"][POS] = {
                dir: relativedirs[5 - 2 + DIR]
              };
            }
          }
          if (BLOCKS[POS]) {
            ARTIFACTS["potentialopptargets"][POS] = {
              dir: DIR,
              strength: MAX
            };
          }
        }
        var allowedsteps = UNITLAYERS.oppunits;
        var walkstarts = ARTIFACTS.potentialopptargets;
        for (var STARTPOS in walkstarts) {
          var DIR = (ARTIFACTS.potentialopptargets[STARTPOS] || {})["dir"];
          var STOPREASON = "";
          var MAX = (ARTIFACTS.potentialopptargets[STARTPOS] || {})["strength"];
          var POS = "faux";
          connections.faux[DIR] = STARTPOS;
          var LENGTH = 0;
          while (!(STOPREASON = (LENGTH === MAX ? "reachedmax" : !(POS = connections[POS][DIR]) ? "outofbounds" : !allowedsteps[POS] ? "nomoresteps" : null))) {
            LENGTH++;
          }
          if ((STOPREASON !== "reachedmax")) {
            ARTIFACTS["targets"][STARTPOS] = {
              dir: relativedirs[5 - 2 + DIR]
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
        for (var linkpos in ARTIFACTS.targets) {
          newlinks[linkpos] = 'selecttarget1';
        }
        return newstep;
      };
      game.selectunit1instruction = function(turn, step) {
        return {
          type: 'text',
          text: "Now select which square to expand to"
        };
      };
      game.selecttarget1 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          spawns: Object.assign({}, step.ARTIFACTS.spawns)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selecttarget: markpos,
          selectunit: step.MARKS.selectunit
        };
        var BLOCKS = UNITLAYERS.units;
        var STARTPOS = MARKS["selecttarget"];
        var POS = STARTPOS;
        while ((POS = connections[POS][(ARTIFACTS.targets[MARKS["selecttarget"]] || {})["dir"]]) && !BLOCKS[POS]) {
          ARTIFACTS["spawns"][POS] = {};
        }
        if (!(UNITLAYERS.units[STARTPOS])) {
          ARTIFACTS["spawns"][STARTPOS] = {};
        }
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selecttarget'
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].expand = 'expand1';
        return newstep;
      };
      game.selecttarget1instruction = function(turn, step) {
        var MARKS = step.MARKS;
        var UNITLAYERS = step.UNITLAYERS;
        return collapseLine({
          type: 'line',
          content: [{
            type: 'text',
            text: "Press"
          }, {
            type: 'cmndref',
            cmnd: "expand"
          }, {
            type: 'text',
            text: "to expand to from "
          }, {
            type: 'posref',
            pos: MARKS["selectunit"]
          }, {
            type: 'text',
            text: "to"
          }, {
            type: 'posref',
            pos: MARKS["selecttarget"]
          }, !!(UNITLAYERS.units[MARKS["selecttarget"]]) ? {
            type: 'text',
            text: "and neutralise the enemy there"
          } : {
            type: 'nothing'
          }]
        });
      };
      game.deploy1 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var clones = step.clones;
        var UNITLAYERS = step.UNITLAYERS;
        var newunitid = 'spawn' + (clones++);
        UNITDATA[newunitid] = {
          pos: MARKS["selectdeploy"],
          id: newunitid,
          group: "soldiers",
          owner: player
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
          "spawndirs": {},
          "growstarts": {},
          "targets": {},
          "potentialopptargets": {},
          "spawns": {}
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
        if ((Object.keys(UNITLAYERS.mysoldiers).length > 1)) {
          if ((Object.keys(UNITLAYERS.units).length === 64)) {
            var winner = ((Object.keys(UNITLAYERS.myunits).length > Object.keys(UNITLAYERS.oppunits).length) ? 1 : ((Object.keys(UNITLAYERS.oppunits).length === Object.keys(UNITLAYERS.myunits).length) ? 2 : 0));
            var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
            turn.links[newstepid][result] = 'boardfull';
          } else turn.links[newstepid].endturn = "start" + otherplayer;
        } else {
          var newlinks = turn.links[newstepid];
          for (var linkpos in
              (function() {
                var ret = {},
                  s0 = BOARD.board,
                  s1 = UNITLAYERS.units;
                for (var key in s0) {
                  if (!s1[key]) {
                    ret[key] = s0[key];
                  }
                }
                return ret;
              }())) {
            newlinks[linkpos] = 'selectdeploy1';
          }
        }
        return newstep;
      }
      game.deploy1instruction = function(turn, step) {
        var UNITLAYERS = step.UNITLAYERS;
        return (Object.keys(UNITLAYERS.myunits).length === 1) ? {
          type: 'text',
          text: "Now select where to deploy your second and last initial unit"
        } : {
          type: 'nothing'
        };
      };
      game.expand1 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var clones = step.clones;
        var UNITLAYERS = step.UNITLAYERS;
        for (var POS in ARTIFACTS.spawns) {
          var newunitid = 'spawn' + (clones++);
          UNITDATA[newunitid] = {
            pos: POS,
            id: newunitid,
            group: "soldiers",
            owner: 1,
            from: MARKS["selectunit"]
          };
        }
        if (!!(UNITLAYERS.units[MARKS["selecttarget"]])) {
          delete UNITDATA[(UNITLAYERS.units[MARKS["selecttarget"]]  || {}).id];
          var newunitid = 'spawn' + (clones++);
          UNITDATA[newunitid] = {
            pos: MARKS["selecttarget"],
            id: newunitid,
            group: "soldiers",
            owner: 0,
            from: MARKS["selectunit"]
          };
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
          "spawndirs": {},
          "growstarts": {},
          "targets": {},
          "potentialopptargets": {},
          "spawns": {}
        };
        var newstepid = step.stepid + '-' + 'expand';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'expand',
          path: step.path.concat('expand'),
          clones: clones
        });
        turn.links[newstepid] = {};
        if ((Object.keys(UNITLAYERS.units).length === 64)) {
          var winner = ((Object.keys(UNITLAYERS.myunits).length > Object.keys(UNITLAYERS.oppunits).length) ? 1 : ((Object.keys(UNITLAYERS.oppunits).length === Object.keys(UNITLAYERS.myunits).length) ? 2 : 0));
          var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'boardfull';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.expand1instruction = function(turn, step) {
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
          "spawndirs": {},
          "growstarts": {},
          "targets": {},
          "potentialopptargets": {},
          "spawns": {}
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
                  s1 = UNITLAYERS.units;
                for (var key in s0) {
                  if (!s1[key]) {
                    ret[key] = s0[key];
                  }
                }
                return ret;
              }())) {
            newlinks[linkpos] = 'selectdeploy1';
          }
        }
        return turn;
      }
      game.start1instruction = function(turn, step) {
        return ((turn.turn > 2) ? {
          type: 'text',
          text: "Select unit to expand from"
        } : {
          type: 'text',
          text: "Select where to deploy the first of your two initial units"
        });
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
      game.selectdeploy2 = function(turn, step, markpos) {
        var MARKS = Object.assign({}, step.MARKS, {
          selectdeploy: markpos
        });
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectdeploy'
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].deploy = 'deploy2';
        return newstep;
      };
      game.selectdeploy2instruction = function(turn, step) {
        var MARKS = step.MARKS;
        var UNITLAYERS = step.UNITLAYERS;
        return ((Object.keys(UNITLAYERS.myunits).length === 1) ? collapseLine({
          type: 'line',
          content: [{
            type: 'text',
            text: "Press"
          }, {
            type: 'cmndref',
            cmnd: "deploy"
          }, {
            type: 'text',
            text: "to place your second unit at"
          }, {
            type: 'posref',
            pos: MARKS["selectdeploy"]
          }]
        }) : collapseLine({
          type: 'line',
          content: [{
            type: 'text',
            text: "Press"
          }, {
            type: 'cmndref',
            cmnd: "deploy"
          }, {
            type: 'text',
            text: "to place your first unit at"
          }, {
            type: 'posref',
            pos: MARKS["selectdeploy"]
          }]
        }));
      };
      game.selectunit2 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          spawndirs: Object.assign({}, step.ARTIFACTS.spawndirs),
          growstarts: Object.assign({}, step.ARTIFACTS.growstarts),
          targets: Object.assign({}, step.ARTIFACTS.targets),
          potentialopptargets: Object.assign({}, step.ARTIFACTS.potentialopptargets)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectunit: markpos
        };
        var STARTPOS = MARKS["selectunit"];
        var neighbourdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        var startconnections = connections[STARTPOS];
        for (var dirnbr = 0; dirnbr < 8; dirnbr++) {
          var DIR = neighbourdirs[dirnbr];
          var POS = startconnections[DIR];
          if (POS) {
            if (!(UNITLAYERS.myunits[POS])) {
              ARTIFACTS["spawndirs"][POS] = {
                dir: DIR
              };
            }
          }
        }
        var allowedsteps = UNITLAYERS.myunits;
        var walkstarts = ARTIFACTS.spawndirs;
        for (var STARTPOS in walkstarts) {
          var DIR = relativedirs[5 - 2 + (ARTIFACTS.spawndirs[STARTPOS] || {})["dir"]];
          var walkedsquares = [];
          var POS = STARTPOS;
          while ((POS = connections[POS][DIR]) && allowedsteps[POS]) {
            walkedsquares.push(POS);
          }
          var WALKLENGTH = walkedsquares.length;
          ARTIFACTS["growstarts"][STARTPOS] = {
            dir: relativedirs[5 - 2 + DIR],
            strength: WALKLENGTH
          };
        }
        var allowedsteps =
          (function() {
            var ret = {},
              s0 = BOARD.board,
              s1 = UNITLAYERS.units;
            for (var key in s0) {
              if (!s1[key]) {
                ret[key] = s0[key];
              }
            }
            return ret;
          }());
        var BLOCKS = UNITLAYERS.oppunits;
        var walkstarts = ARTIFACTS.growstarts;
        for (var STARTPOS in walkstarts) {
          var DIR = (ARTIFACTS.growstarts[STARTPOS] || {})["dir"];
          var STOPREASON = "";
          var MAX = (ARTIFACTS.growstarts[STARTPOS] || {})["strength"];
          var POS = "faux";
          connections.faux[DIR] = STARTPOS;
          var LENGTH = 0;
          var STEP = 0;
          while (!(STOPREASON = (LENGTH === MAX ? "reachedmax" : !(POS = connections[POS][DIR]) ? "outofbounds" : BLOCKS[POS] ? "hitblock" : !allowedsteps[POS] ? "nomoresteps" : null))) {
            LENGTH++;
            STEP++;
            if ((STEP === MAX)) {
              ARTIFACTS["targets"][POS] = {
                dir: relativedirs[5 - 2 + DIR]
              };
            }
          }
          if (BLOCKS[POS]) {
            ARTIFACTS["potentialopptargets"][POS] = {
              dir: DIR,
              strength: MAX
            };
          }
        }
        var allowedsteps = UNITLAYERS.oppunits;
        var walkstarts = ARTIFACTS.potentialopptargets;
        for (var STARTPOS in walkstarts) {
          var DIR = (ARTIFACTS.potentialopptargets[STARTPOS] || {})["dir"];
          var STOPREASON = "";
          var MAX = (ARTIFACTS.potentialopptargets[STARTPOS] || {})["strength"];
          var POS = "faux";
          connections.faux[DIR] = STARTPOS;
          var LENGTH = 0;
          while (!(STOPREASON = (LENGTH === MAX ? "reachedmax" : !(POS = connections[POS][DIR]) ? "outofbounds" : !allowedsteps[POS] ? "nomoresteps" : null))) {
            LENGTH++;
          }
          if ((STOPREASON !== "reachedmax")) {
            ARTIFACTS["targets"][STARTPOS] = {
              dir: relativedirs[5 - 2 + DIR]
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
        for (var linkpos in ARTIFACTS.targets) {
          newlinks[linkpos] = 'selecttarget2';
        }
        return newstep;
      };
      game.selectunit2instruction = function(turn, step) {
        return {
          type: 'text',
          text: "Now select which square to expand to"
        };
      };
      game.selecttarget2 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          spawns: Object.assign({}, step.ARTIFACTS.spawns)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selecttarget: markpos,
          selectunit: step.MARKS.selectunit
        };
        var BLOCKS = UNITLAYERS.units;
        var STARTPOS = MARKS["selecttarget"];
        var POS = STARTPOS;
        while ((POS = connections[POS][(ARTIFACTS.targets[MARKS["selecttarget"]] || {})["dir"]]) && !BLOCKS[POS]) {
          ARTIFACTS["spawns"][POS] = {};
        }
        if (!(UNITLAYERS.units[STARTPOS])) {
          ARTIFACTS["spawns"][STARTPOS] = {};
        }
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selecttarget'
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].expand = 'expand2';
        return newstep;
      };
      game.selecttarget2instruction = function(turn, step) {
        var MARKS = step.MARKS;
        var UNITLAYERS = step.UNITLAYERS;
        return collapseLine({
          type: 'line',
          content: [{
            type: 'text',
            text: "Press"
          }, {
            type: 'cmndref',
            cmnd: "expand"
          }, {
            type: 'text',
            text: "to expand to from "
          }, {
            type: 'posref',
            pos: MARKS["selectunit"]
          }, {
            type: 'text',
            text: "to"
          }, {
            type: 'posref',
            pos: MARKS["selecttarget"]
          }, !!(UNITLAYERS.units[MARKS["selecttarget"]]) ? {
            type: 'text',
            text: "and neutralise the enemy there"
          } : {
            type: 'nothing'
          }]
        });
      };
      game.deploy2 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var clones = step.clones;
        var UNITLAYERS = step.UNITLAYERS;
        var newunitid = 'spawn' + (clones++);
        UNITDATA[newunitid] = {
          pos: MARKS["selectdeploy"],
          id: newunitid,
          group: "soldiers",
          owner: player
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
          "spawndirs": {},
          "growstarts": {},
          "targets": {},
          "potentialopptargets": {},
          "spawns": {}
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
        if ((Object.keys(UNITLAYERS.mysoldiers).length > 1)) {
          if ((Object.keys(UNITLAYERS.units).length === 64)) {
            var winner = ((Object.keys(UNITLAYERS.myunits).length > Object.keys(UNITLAYERS.oppunits).length) ? 2 : ((Object.keys(UNITLAYERS.oppunits).length === Object.keys(UNITLAYERS.myunits).length) ? 1 : 0));
            var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
            turn.links[newstepid][result] = 'boardfull';
          } else turn.links[newstepid].endturn = "start" + otherplayer;
        } else {
          var newlinks = turn.links[newstepid];
          for (var linkpos in
              (function() {
                var ret = {},
                  s0 = BOARD.board,
                  s1 = UNITLAYERS.units;
                for (var key in s0) {
                  if (!s1[key]) {
                    ret[key] = s0[key];
                  }
                }
                return ret;
              }())) {
            newlinks[linkpos] = 'selectdeploy2';
          }
        }
        return newstep;
      }
      game.deploy2instruction = function(turn, step) {
        var UNITLAYERS = step.UNITLAYERS;
        return (Object.keys(UNITLAYERS.myunits).length === 1) ? {
          type: 'text',
          text: "Now select where to deploy your second and last initial unit"
        } : {
          type: 'nothing'
        };
      };
      game.expand2 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var clones = step.clones;
        var UNITLAYERS = step.UNITLAYERS;
        for (var POS in ARTIFACTS.spawns) {
          var newunitid = 'spawn' + (clones++);
          UNITDATA[newunitid] = {
            pos: POS,
            id: newunitid,
            group: "soldiers",
            owner: 2,
            from: MARKS["selectunit"]
          };
        }
        if (!!(UNITLAYERS.units[MARKS["selecttarget"]])) {
          delete UNITDATA[(UNITLAYERS.units[MARKS["selecttarget"]]  || {}).id];
          var newunitid = 'spawn' + (clones++);
          UNITDATA[newunitid] = {
            pos: MARKS["selecttarget"],
            id: newunitid,
            group: "soldiers",
            owner: 0,
            from: MARKS["selectunit"]
          };
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
          "spawndirs": {},
          "growstarts": {},
          "targets": {},
          "potentialopptargets": {},
          "spawns": {}
        };
        var newstepid = step.stepid + '-' + 'expand';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'expand',
          path: step.path.concat('expand'),
          clones: clones
        });
        turn.links[newstepid] = {};
        if ((Object.keys(UNITLAYERS.units).length === 64)) {
          var winner = ((Object.keys(UNITLAYERS.myunits).length > Object.keys(UNITLAYERS.oppunits).length) ? 2 : ((Object.keys(UNITLAYERS.oppunits).length === Object.keys(UNITLAYERS.myunits).length) ? 1 : 0));
          var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'boardfull';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.expand2instruction = function(turn, step) {
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
          "spawndirs": {},
          "growstarts": {},
          "targets": {},
          "potentialopptargets": {},
          "spawns": {}
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
                  s1 = UNITLAYERS.units;
                for (var key in s0) {
                  if (!s1[key]) {
                    ret[key] = s0[key];
                  }
                }
                return ret;
              }())) {
            newlinks[linkpos] = 'selectdeploy2';
          }
        }
        return turn;
      }
      game.start2instruction = function(turn, step) {
        return ((turn.turn > 2) ? {
          type: 'text',
          text: "Select unit to expand from"
        } : {
          type: 'text',
          text: "Select where to deploy the first of your two initial units"
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