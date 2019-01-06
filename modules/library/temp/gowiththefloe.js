(
  function() {
    var game = {};
    game.commands = {
      "move": 1,
      "eat": 1
    };
    game.graphics = {
      "tiles": {
        "water": "water"
      },
      "icons": {
        "seals": "queen",
        "bears": "queen",
        "holes": "pawn"
      }
    };
    game.board = {
      "height": 8,
      "width": 8,
      "terrain": {
        "water": ["a1", "a2", "a7", "a8", "b1", "b8", "g1", "g8", "h1", "h2", "h7", "h8"]
      }
    };
    game.AI = [];
    game.id = "gowiththefloe";
    var boardDef = {
      "height": 8,
      "width": 8,
      "terrain": {
        "water": ["a1", "a2", "a7", "a8", "b1", "b8", "g1", "g8", "h1", "h2", "h7", "h8"]
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
            "seals": {
              "1": ["b2", "b7"]
            },
            "bears": {
              "2": ["g2", "g7"]
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
      game.selectunit1 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          movetargets: Object.assign({}, step.ARTIFACTS.movetargets),
          eattargets: Object.assign({}, step.ARTIFACTS.eattargets)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectunit: markpos
        };
        var BLOCKS =
          (function() {
            var k, ret = {},
              s0 = UNITLAYERS.seals,
              s1 = UNITLAYERS.bears,
              s2 = TERRAIN.water;
            for (k in s0) {
              ret[k] = 1;
            }
            for (k in s1) {
              ret[k] = 1;
            }
            for (k in s2) {
              ret[k] = 1;
            }
            return ret;
          }());
        var STARTPOS = MARKS["selectunit"];
        var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
          var DIR = allwalkerdirs[walkerdirnbr];
          var MAX = 2;
          var POS = STARTPOS;
          var LENGTH = 0;
          while (LENGTH < MAX && (POS = connections[POS][DIR]) && !BLOCKS[POS]) {
            LENGTH++;
            if (!UNITLAYERS.holes[POS]) {
              ARTIFACTS["movetargets"][POS] = {
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
        return collapseLine({
          type: 'line',
          content: [{
            type: 'text',
            text: "Select where to move"
          }]
        });
      };
      game.selectmovetarget1 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          cracks: Object.assign({}, step.ARTIFACTS.cracks)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectmovetarget: markpos,
          selectunit: step.MARKS.selectunit
        };
        var BLOCKS =
          (function() {
            var ret = {};
            ret[MARKS["selectunit"]] = 1;
            return ret;
          }());
        var STARTPOS = MARKS["selectmovetarget"];
        var STOPREASON = "";
        var POS = STARTPOS;
        while (!(STOPREASON = (!(POS = connections[POS][relativedirs[5 - 2 + (ARTIFACTS.movetargets[MARKS["selectmovetarget"]] || {})["dir"]]]) ? "outofbounds" : BLOCKS[POS] ? "hitblock" : null))) {
          if (!UNITLAYERS.holes[POS]) {
            ARTIFACTS["cracks"][POS] = {};
          }
        }
        if (BLOCKS[POS]) {
          ARTIFACTS["cracks"][POS] = {};
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
            text: "to go here"
          }]
        });
      };
      game.selecteattarget1 = function(turn, step, markpos) {
        var MARKS = {
          selecteattarget: markpos,
          selectunit: step.MARKS.selectunit
        };
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selecteattarget'
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].eat = 'eat1';
        return newstep;
      };
      game.selecteattarget1instruction = function(turn, step) {
        return collapseLine({
          type: 'line',
          content: [{
            type: 'text',
            text: "Press"
          }, {
            type: 'cmndref',
            cmnd: "eat"
          }, {
            type: 'text',
            text: "to, well, eat"
          }]
        });
      };
      game.move1 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          canmove: Object.assign({}, step.ARTIFACTS.canmove)
        });
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var clones = step.clones;
        var UNITLAYERS = step.UNITLAYERS;
        var unitid = (UNITLAYERS.units[MARKS["selectunit"]]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            "pos": MARKS["selectmovetarget"]
          });
        }
        for (var POS in ARTIFACTS.cracks) {
          var newunitid = 'spawn' + (clones++);
          UNITDATA[newunitid] = {
            pos: POS,
            id: newunitid,
            group: "holes",
            owner: 0
          };
        }
        MARKS = {};
        UNITLAYERS = {
          "seals": {},
          "myseals": {},
          "oppseals": {},
          "neutralseals": {},
          "bears": {},
          "mybears": {},
          "oppbears": {},
          "neutralbears": {},
          "holes": {},
          "myholes": {},
          "oppholes": {},
          "neutralholes": {},
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
          "eattargets": {},
          "movetargets": {},
          "canmove": {},
          "cracks": {}
        };
        var walkstarts = UNITLAYERS.seals;
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var MAX = 2;
            var POS = STARTPOS;
            var walkpositionstocount =
              (function() {
                var ret = {},
                  s0 = TERRAIN.nowater,
                  s1 = UNITLAYERS.holes;
                for (var key in s0) {
                  if (!s1[key]) {
                    ret[key] = s0[key];
                  }
                }
                return ret;
              }());
            var CURRENTCOUNT = 0;
            var LENGTH = 0;
            while (LENGTH < MAX && (POS = connections[POS][allwalkerdirs[walkerdirnbr]])) {
              CURRENTCOUNT += (walkpositionstocount[POS] ? 1 : 0);
              LENGTH++;
            }
            var TOTALCOUNT = CURRENTCOUNT;
            if ((TOTALCOUNT > 0)) {
              ARTIFACTS["canmove"][STARTPOS] = {};
            }
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
          clones: clones
        });
        turn.links[newstepid] = {};
        if ((Object.keys(ARTIFACTS.canmove).length !== Object.keys(UNITLAYERS.seals).length)) {
          var winner = 1;
          var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'safeseal';
          turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
          turn.endMarks[newstepid].safeseal =
            (function() {
              var ret = {},
                s0 = UNITLAYERS.seals,
                s1 = ARTIFACTS.canmove;
              for (var key in s0) {
                if (!s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }());
        } else
        if (Object.keys(UNITLAYERS.seals).length === 0) {
          var winner = 2;
          var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'sealseaten';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.move1instruction = function(turn, step) {
        return {
          type: 'text',
          text: ""
        };
      };
      game.eat1 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          canmove: Object.assign({}, step.ARTIFACTS.canmove)
        });
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var UNITLAYERS = step.UNITLAYERS;
        delete UNITDATA[(UNITLAYERS.units[MARKS["selectunit"]]  || {}).id];
        delete UNITDATA[(UNITLAYERS.units[MARKS["selecteattarget"]]  || {}).id];
        MARKS = {};
        UNITLAYERS = {
          "seals": {},
          "myseals": {},
          "oppseals": {},
          "neutralseals": {},
          "bears": {},
          "mybears": {},
          "oppbears": {},
          "neutralbears": {},
          "holes": {},
          "myholes": {},
          "oppholes": {},
          "neutralholes": {},
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
          "eattargets": {},
          "movetargets": {},
          "canmove": {},
          "cracks": {}
        };
        var walkstarts = UNITLAYERS.seals;
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var MAX = 2;
            var POS = STARTPOS;
            var walkpositionstocount =
              (function() {
                var ret = {},
                  s0 = TERRAIN.nowater,
                  s1 = UNITLAYERS.holes;
                for (var key in s0) {
                  if (!s1[key]) {
                    ret[key] = s0[key];
                  }
                }
                return ret;
              }());
            var CURRENTCOUNT = 0;
            var LENGTH = 0;
            while (LENGTH < MAX && (POS = connections[POS][allwalkerdirs[walkerdirnbr]])) {
              CURRENTCOUNT += (walkpositionstocount[POS] ? 1 : 0);
              LENGTH++;
            }
            var TOTALCOUNT = CURRENTCOUNT;
            if ((TOTALCOUNT > 0)) {
              ARTIFACTS["canmove"][STARTPOS] = {};
            }
          }
        }
        var newstepid = step.stepid + '-' + 'eat';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'eat',
          path: step.path.concat('eat')
        });
        turn.links[newstepid] = {};
        if ((Object.keys(ARTIFACTS.canmove).length !== Object.keys(UNITLAYERS.seals).length)) {
          var winner = 1;
          var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'safeseal';
          turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
          turn.endMarks[newstepid].safeseal =
            (function() {
              var ret = {},
                s0 = UNITLAYERS.seals,
                s1 = ARTIFACTS.canmove;
              for (var key in s0) {
                if (!s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }());
        } else
        if (Object.keys(UNITLAYERS.seals).length === 0) {
          var winner = 2;
          var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'sealseaten';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.eat1instruction = function(turn, step) {
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
          "eattargets": {},
          "movetargets": {},
          "canmove": {},
          "cracks": {}
        };
        var UNITDATA = step.UNITDATA;
        var UNITLAYERS = {
          "seals": {},
          "myseals": {},
          "oppseals": {},
          "neutralseals": {},
          "bears": {},
          "mybears": {},
          "oppbears": {},
          "neutralbears": {},
          "holes": {},
          "myholes": {},
          "oppholes": {},
          "neutralholes": {},
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
            text: "Select a unit to move"
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
          movetargets: Object.assign({}, step.ARTIFACTS.movetargets),
          eattargets: Object.assign({}, step.ARTIFACTS.eattargets)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectunit: markpos
        };
        var BLOCKS =
          (function() {
            var k, ret = {},
              s0 = UNITLAYERS.seals,
              s1 = UNITLAYERS.bears,
              s2 = TERRAIN.water;
            for (k in s0) {
              ret[k] = 1;
            }
            for (k in s1) {
              ret[k] = 1;
            }
            for (k in s2) {
              ret[k] = 1;
            }
            return ret;
          }());
        var STARTPOS = MARKS["selectunit"];
        var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
          var DIR = allwalkerdirs[walkerdirnbr];
          var MAX = 2;
          var POS = STARTPOS;
          var LENGTH = 0;
          while (LENGTH < MAX && (POS = connections[POS][DIR]) && !BLOCKS[POS]) {
            LENGTH++;
            if (!UNITLAYERS.holes[POS]) {
              ARTIFACTS["movetargets"][POS] = {
                dir: DIR
              };
            }
          }
        }
        var STARTPOS = MARKS["selectunit"];
        var neighbourdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        var startconnections = connections[STARTPOS];
        for (var dirnbr = 0; dirnbr < 8; dirnbr++) {
          var POS = startconnections[neighbourdirs[dirnbr]];
          if (POS && UNITLAYERS.seals[POS]) {
            ARTIFACTS["eattargets"][POS] = {};
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
        for (var linkpos in ARTIFACTS.eattargets) {
          newlinks[linkpos] = 'selecteattarget2';
        }
        return newstep;
      };
      game.selectunit2instruction = function(turn, step) {
        return collapseLine({
          type: 'line',
          content: [{
            type: 'text',
            text: "Select where to move"
          }]
        });
      };
      game.selectmovetarget2 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          cracks: Object.assign({}, step.ARTIFACTS.cracks)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectmovetarget: markpos,
          selectunit: step.MARKS.selectunit
        };
        var BLOCKS =
          (function() {
            var ret = {};
            ret[MARKS["selectunit"]] = 1;
            return ret;
          }());
        var STARTPOS = MARKS["selectmovetarget"];
        var STOPREASON = "";
        var POS = STARTPOS;
        while (!(STOPREASON = (!(POS = connections[POS][relativedirs[5 - 2 + (ARTIFACTS.movetargets[MARKS["selectmovetarget"]] || {})["dir"]]]) ? "outofbounds" : BLOCKS[POS] ? "hitblock" : null))) {
          if (!UNITLAYERS.holes[POS]) {
            ARTIFACTS["cracks"][POS] = {};
          }
        }
        if (BLOCKS[POS]) {
          ARTIFACTS["cracks"][POS] = {};
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
            text: "to go here"
          }]
        });
      };
      game.selecteattarget2 = function(turn, step, markpos) {
        var MARKS = {
          selecteattarget: markpos,
          selectunit: step.MARKS.selectunit
        };
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selecteattarget'
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].eat = 'eat2';
        return newstep;
      };
      game.selecteattarget2instruction = function(turn, step) {
        return collapseLine({
          type: 'line',
          content: [{
            type: 'text',
            text: "Press"
          }, {
            type: 'cmndref',
            cmnd: "eat"
          }, {
            type: 'text',
            text: "to, well, eat"
          }]
        });
      };
      game.move2 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          canmove: Object.assign({}, step.ARTIFACTS.canmove)
        });
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var clones = step.clones;
        var UNITLAYERS = step.UNITLAYERS;
        var unitid = (UNITLAYERS.units[MARKS["selectunit"]]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            "pos": MARKS["selectmovetarget"]
          });
        }
        for (var POS in ARTIFACTS.cracks) {
          var newunitid = 'spawn' + (clones++);
          UNITDATA[newunitid] = {
            pos: POS,
            id: newunitid,
            group: "holes",
            owner: 0
          };
        }
        MARKS = {};
        UNITLAYERS = {
          "seals": {},
          "myseals": {},
          "oppseals": {},
          "neutralseals": {},
          "bears": {},
          "mybears": {},
          "oppbears": {},
          "neutralbears": {},
          "holes": {},
          "myholes": {},
          "oppholes": {},
          "neutralholes": {},
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
          "eattargets": {},
          "movetargets": {},
          "canmove": {},
          "cracks": {}
        };
        var walkstarts = UNITLAYERS.seals;
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var MAX = 2;
            var POS = STARTPOS;
            var walkpositionstocount =
              (function() {
                var ret = {},
                  s0 = TERRAIN.nowater,
                  s1 = UNITLAYERS.holes;
                for (var key in s0) {
                  if (!s1[key]) {
                    ret[key] = s0[key];
                  }
                }
                return ret;
              }());
            var CURRENTCOUNT = 0;
            var LENGTH = 0;
            while (LENGTH < MAX && (POS = connections[POS][allwalkerdirs[walkerdirnbr]])) {
              CURRENTCOUNT += (walkpositionstocount[POS] ? 1 : 0);
              LENGTH++;
            }
            var TOTALCOUNT = CURRENTCOUNT;
            if ((TOTALCOUNT > 0)) {
              ARTIFACTS["canmove"][STARTPOS] = {};
            }
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
          clones: clones
        });
        turn.links[newstepid] = {};
        if ((Object.keys(ARTIFACTS.canmove).length !== Object.keys(UNITLAYERS.seals).length)) {
          var winner = 1;
          var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'safeseal';
          turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
          turn.endMarks[newstepid].safeseal =
            (function() {
              var ret = {},
                s0 = UNITLAYERS.seals,
                s1 = ARTIFACTS.canmove;
              for (var key in s0) {
                if (!s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }());
        } else
        if (Object.keys(UNITLAYERS.seals).length === 0) {
          var winner = 2;
          var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'sealseaten';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.move2instruction = function(turn, step) {
        return {
          type: 'text',
          text: ""
        };
      };
      game.eat2 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          canmove: Object.assign({}, step.ARTIFACTS.canmove)
        });
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var UNITLAYERS = step.UNITLAYERS;
        delete UNITDATA[(UNITLAYERS.units[MARKS["selectunit"]]  || {}).id];
        delete UNITDATA[(UNITLAYERS.units[MARKS["selecteattarget"]]  || {}).id];
        MARKS = {};
        UNITLAYERS = {
          "seals": {},
          "myseals": {},
          "oppseals": {},
          "neutralseals": {},
          "bears": {},
          "mybears": {},
          "oppbears": {},
          "neutralbears": {},
          "holes": {},
          "myholes": {},
          "oppholes": {},
          "neutralholes": {},
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
          "eattargets": {},
          "movetargets": {},
          "canmove": {},
          "cracks": {}
        };
        var walkstarts = UNITLAYERS.seals;
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var MAX = 2;
            var POS = STARTPOS;
            var walkpositionstocount =
              (function() {
                var ret = {},
                  s0 = TERRAIN.nowater,
                  s1 = UNITLAYERS.holes;
                for (var key in s0) {
                  if (!s1[key]) {
                    ret[key] = s0[key];
                  }
                }
                return ret;
              }());
            var CURRENTCOUNT = 0;
            var LENGTH = 0;
            while (LENGTH < MAX && (POS = connections[POS][allwalkerdirs[walkerdirnbr]])) {
              CURRENTCOUNT += (walkpositionstocount[POS] ? 1 : 0);
              LENGTH++;
            }
            var TOTALCOUNT = CURRENTCOUNT;
            if ((TOTALCOUNT > 0)) {
              ARTIFACTS["canmove"][STARTPOS] = {};
            }
          }
        }
        var newstepid = step.stepid + '-' + 'eat';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'eat',
          path: step.path.concat('eat')
        });
        turn.links[newstepid] = {};
        if ((Object.keys(ARTIFACTS.canmove).length !== Object.keys(UNITLAYERS.seals).length)) {
          var winner = 1;
          var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'safeseal';
          turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
          turn.endMarks[newstepid].safeseal =
            (function() {
              var ret = {},
                s0 = UNITLAYERS.seals,
                s1 = ARTIFACTS.canmove;
              for (var key in s0) {
                if (!s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }());
        } else
        if (Object.keys(UNITLAYERS.seals).length === 0) {
          var winner = 2;
          var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'sealseaten';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.eat2instruction = function(turn, step) {
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
          "eattargets": {},
          "movetargets": {},
          "canmove": {},
          "cracks": {}
        };
        var UNITDATA = step.UNITDATA;
        var UNITLAYERS = {
          "seals": {},
          "myseals": {},
          "oppseals": {},
          "neutralseals": {},
          "bears": {},
          "mybears": {},
          "oppbears": {},
          "neutralbears": {},
          "holes": {},
          "myholes": {},
          "oppholes": {},
          "neutralholes": {},
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
            text: "Select a unit to move"
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