(
  function() {
    var game = {};
    var boardDef = {
      "height": 6,
      "width": 6,
      "terrain": {
        "zone": {
          "1": [
            ["rect", "b6", "f6", 5]
          ],
          "2": [
            ["rect", "a1", "a5", 3]
          ]
        },
        "corner": ["a6"]
      }
    };
    var connections = boardConnections(boardDef);
    var BOARD = boardLayers(boardDef);
    var relativedirs = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    (function() {
      var TERRAIN = terrainLayers(boardDef, 1);
      var ownernames = ["neutral", "my", "opp"];
      var player = 1;
      var otherplayer = 2;
      game.selecttarget1 =
        function(turn, step, markpos) {
          var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
            intersection: Object.assign({}, step.ARTIFACTS.intersection)
          });
          var UNITLAYERS = step.UNITLAYERS;
          var MARKS = {
            selecttarget: markpos
          };
          var STARTPOS = MARKS['selecttarget'];
          var DIR = 5;
          var POS = STARTPOS;
          while ((POS = connections[POS][5])) {
            if (ARTIFACTS.enemyline[POS]) {
              ARTIFACTS['intersection'][POS] = {};
            }
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
          turn.links[newstepid].snipe = 'snipe1';
          return newstep;
        };
      game.selecttarget1instruction =
        function(step) {
          var MARKS = step.MARKS;
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          var UNITDATA = step.UNITDATA;
          return ''
        };
      game.snipe1 =
        function(turn, step) {
          var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
            winline: Object.assign({}, step.ARTIFACTS.winline),
            loseline: Object.assign({}, step.ARTIFACTS.loseline)
          });
          var MARKS = step.MARKS;
          var UNITDATA = Object.assign({}, step.UNITDATA);
          var clones = step.clones;
          var UNITLAYERS = step.UNITLAYERS;
          if (Object.keys(UNITLAYERS.mysniper ||  {}).length === 0) {
            var newunitid = 'spawn' + (clones++);
            UNITDATA[newunitid] = {
              pos: MARKS['selecttarget'],
              id: newunitid,
              group: 'sniper',
              owner: player
            };
          } else {
            var unitid = (UNITLAYERS.units[Object.keys(UNITLAYERS.mysniper)[0]]  || {}).id;
            if (unitid) {
              UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
                'pos': MARKS['selecttarget']
              });
            }
          }
          if (Object.keys(UNITLAYERS.oppsniper ||  {}).length !== 0) {
            if (!!(UNITLAYERS.units[Object.keys(ARTIFACTS.intersection)[0]])) {
              var unitid = (UNITLAYERS.units[Object.keys(ARTIFACTS.intersection)[0]]  || {}).id;
              if (unitid) {
                UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
                  'owner': (((UNITLAYERS.units[Object.keys(ARTIFACTS.intersection)[0]] || {})['owner'] === 2) ? 1 : 2)
                });
              }
            } else {
              var newunitid = 'spawn' + (clones++);
              UNITDATA[newunitid] = {
                pos: Object.keys(ARTIFACTS.intersection)[0],
                id: newunitid,
                group: 'soldiers',
                owner: 1,
                from: MARKS['selecttarget']
              };
            }
          }
          MARKS = {};
          UNITLAYERS = {
            "sniper": {},
            "mysniper": {},
            "oppsniper": {},
            "neutralsniper": {},
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
            "winline": {},
            "loseline": {},
            "intersection": {},
            "enemyline": {},
            "potentialempties": {},
            "mandatory": {}
          };
          var walkstarts = UNITLAYERS.soldiers;
          for (var STARTPOS in walkstarts) {
            var allowedsteps = (!!(UNITLAYERS.mysoldiers[STARTPOS]) ? UNITLAYERS.mysoldiers : UNITLAYERS.oppsoldiers);
            var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
            for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
              var walkedsquares = [];
              var POS = STARTPOS;
              while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && allowedsteps[POS]) {
                walkedsquares.push(POS);
              }
              var WALKLENGTH = walkedsquares.length;
              if ((WALKLENGTH > 2)) {
                ARTIFACTS[(!!(UNITLAYERS.mysoldiers[STARTPOS]) ? 'winline' : 'loseline')][STARTPOS] = {};
              }
            }
          }
          var newstepid = step.stepid + '-' + 'snipe';
          var newstep = turn.steps[newstepid] = Object.assign({}, step, {
            ARTIFACTS: ARTIFACTS,
            MARKS: MARKS,
            UNITDATA: UNITDATA,
            UNITLAYERS: UNITLAYERS,
            stepid: newstepid,
            name: 'snipe',
            path: step.path.concat('snipe'),
            clones: clones
          });
          turn.links[newstepid] = {};
          if (Object.keys(ARTIFACTS.winline ||  {}).length !== 0) {
            var winner = 1;
            var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
            turn.links[newstepid][result] = 'madeline';
          } else
          if (Object.keys(ARTIFACTS.loseline ||  {}).length !== 0) {
            var winner = 2;
            var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
            turn.links[newstepid][result] = 'madeoppline';
          } else turn.links[newstepid].endturn = "start" + otherplayer;
          return newstep;
        };
      game.snipe1instruction =
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
            "winline": {},
            "loseline": {},
            "intersection": {},
            "enemyline": {},
            "potentialempties": {},
            "mandatory": {}
          };
          var UNITDATA = step.UNITDATA;
          var UNITLAYERS = {
            "sniper": {},
            "mysniper": {},
            "oppsniper": {},
            "neutralsniper": {},
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
          if (Object.keys(UNITLAYERS.oppsniper ||  {}).length !== 0) {
            var STARTPOS = Object.keys(UNITLAYERS.oppsniper)[0];
            var DIR = 3;
            var POS = STARTPOS;
            while ((POS = connections[POS][3])) {
              if (!UNITLAYERS.units[POS]) {
                ARTIFACTS['potentialempties'][POS] = {};
              }
              ARTIFACTS['enemyline'][POS] = {};
            }
            var walkstarts = ARTIFACTS.potentialempties;
            for (var STARTPOS in walkstarts) {
              var DIR = 1;
              var walkedsquares = [];
              var POS = STARTPOS;
              while ((POS = connections[POS][1])) {
                walkedsquares.push(POS);
              }
              var WALKLENGTH = walkedsquares.length;
              if (WALKLENGTH) {
                if (!UNITLAYERS.sniper[walkedsquares[WALKLENGTH - 1]]) {
                  ARTIFACTS['mandatory'][walkedsquares[WALKLENGTH - 1]] = {};
                }
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
          var newlinks = turn.links.root;
          for (var linkpos in (Object.keys(ARTIFACTS.mandatory ||  {}).length === 0 ?
              (function() {
                var ret = {},
                  s0 = TERRAIN.myzone,
                  s1 = UNITLAYERS.sniper;
                for (var key in s0) {
                  if (!s1[key]) {
                    ret[key] = s0[key];
                  }
                }
                return ret;
              }()) : ARTIFACTS.mandatory)) {
            newlinks[linkpos] = 'selecttarget1';
          }
          return turn;
        };
      game.start1instruction =
        function(step) {
          var MARKS = step.MARKS;
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          var UNITDATA = step.UNITDATA;
          return (Object.keys(UNITLAYERS.mysniper ||  {}).length === 0 ? 'Select initial sniper deployment' : 'Select where to snipe from')
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
      game.selecttarget2 =
        function(turn, step, markpos) {
          var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
            intersection: Object.assign({}, step.ARTIFACTS.intersection)
          });
          var UNITLAYERS = step.UNITLAYERS;
          var MARKS = {
            selecttarget: markpos
          };
          var STARTPOS = MARKS['selecttarget'];
          var DIR = 3;
          var POS = STARTPOS;
          while ((POS = connections[POS][3])) {
            if (ARTIFACTS.enemyline[POS]) {
              ARTIFACTS['intersection'][POS] = {};
            }
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
          turn.links[newstepid].snipe = 'snipe2';
          return newstep;
        };
      game.selecttarget2instruction =
        function(step) {
          var MARKS = step.MARKS;
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          var UNITDATA = step.UNITDATA;
          return ''
        };
      game.snipe2 =
        function(turn, step) {
          var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
            winline: Object.assign({}, step.ARTIFACTS.winline),
            loseline: Object.assign({}, step.ARTIFACTS.loseline)
          });
          var MARKS = step.MARKS;
          var UNITDATA = Object.assign({}, step.UNITDATA);
          var clones = step.clones;
          var UNITLAYERS = step.UNITLAYERS;
          if (Object.keys(UNITLAYERS.mysniper ||  {}).length === 0) {
            var newunitid = 'spawn' + (clones++);
            UNITDATA[newunitid] = {
              pos: MARKS['selecttarget'],
              id: newunitid,
              group: 'sniper',
              owner: player
            };
          } else {
            var unitid = (UNITLAYERS.units[Object.keys(UNITLAYERS.mysniper)[0]]  || {}).id;
            if (unitid) {
              UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
                'pos': MARKS['selecttarget']
              });
            }
          }
          if (Object.keys(UNITLAYERS.oppsniper ||  {}).length !== 0) {
            if (!!(UNITLAYERS.units[Object.keys(ARTIFACTS.intersection)[0]])) {
              var unitid = (UNITLAYERS.units[Object.keys(ARTIFACTS.intersection)[0]]  || {}).id;
              if (unitid) {
                UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
                  'owner': (((UNITLAYERS.units[Object.keys(ARTIFACTS.intersection)[0]] || {})['owner'] === 2) ? 1 : 2)
                });
              }
            } else {
              var newunitid = 'spawn' + (clones++);
              UNITDATA[newunitid] = {
                pos: Object.keys(ARTIFACTS.intersection)[0],
                id: newunitid,
                group: 'soldiers',
                owner: 2,
                from: MARKS['selecttarget']
              };
            }
          }
          MARKS = {};
          UNITLAYERS = {
            "sniper": {},
            "mysniper": {},
            "oppsniper": {},
            "neutralsniper": {},
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
            "winline": {},
            "loseline": {},
            "intersection": {},
            "enemyline": {},
            "potentialempties": {},
            "mandatory": {}
          };
          var walkstarts = UNITLAYERS.soldiers;
          for (var STARTPOS in walkstarts) {
            var allowedsteps = (!!(UNITLAYERS.mysoldiers[STARTPOS]) ? UNITLAYERS.mysoldiers : UNITLAYERS.oppsoldiers);
            var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
            for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
              var walkedsquares = [];
              var POS = STARTPOS;
              while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && allowedsteps[POS]) {
                walkedsquares.push(POS);
              }
              var WALKLENGTH = walkedsquares.length;
              if ((WALKLENGTH > 2)) {
                ARTIFACTS[(!!(UNITLAYERS.mysoldiers[STARTPOS]) ? 'winline' : 'loseline')][STARTPOS] = {};
              }
            }
          }
          var newstepid = step.stepid + '-' + 'snipe';
          var newstep = turn.steps[newstepid] = Object.assign({}, step, {
            ARTIFACTS: ARTIFACTS,
            MARKS: MARKS,
            UNITDATA: UNITDATA,
            UNITLAYERS: UNITLAYERS,
            stepid: newstepid,
            name: 'snipe',
            path: step.path.concat('snipe'),
            clones: clones
          });
          turn.links[newstepid] = {};
          if (Object.keys(ARTIFACTS.winline ||  {}).length !== 0) {
            var winner = 2;
            var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
            turn.links[newstepid][result] = 'madeline';
          } else
          if (Object.keys(ARTIFACTS.loseline ||  {}).length !== 0) {
            var winner = 1;
            var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
            turn.links[newstepid][result] = 'madeoppline';
          } else turn.links[newstepid].endturn = "start" + otherplayer;
          return newstep;
        };
      game.snipe2instruction =
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
            "winline": {},
            "loseline": {},
            "intersection": {},
            "enemyline": {},
            "potentialempties": {},
            "mandatory": {}
          };
          var UNITDATA = step.UNITDATA;
          var UNITLAYERS = {
            "sniper": {},
            "mysniper": {},
            "oppsniper": {},
            "neutralsniper": {},
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
          if (Object.keys(UNITLAYERS.oppsniper ||  {}).length !== 0) {
            var STARTPOS = Object.keys(UNITLAYERS.oppsniper)[0];
            var DIR = 5;
            var POS = STARTPOS;
            while ((POS = connections[POS][5])) {
              if (!UNITLAYERS.units[POS]) {
                ARTIFACTS['potentialempties'][POS] = {};
              }
              ARTIFACTS['enemyline'][POS] = {};
            }
            var walkstarts = ARTIFACTS.potentialempties;
            for (var STARTPOS in walkstarts) {
              var DIR = 7;
              var walkedsquares = [];
              var POS = STARTPOS;
              while ((POS = connections[POS][7])) {
                walkedsquares.push(POS);
              }
              var WALKLENGTH = walkedsquares.length;
              if (WALKLENGTH) {
                if (!UNITLAYERS.sniper[walkedsquares[WALKLENGTH - 1]]) {
                  ARTIFACTS['mandatory'][walkedsquares[WALKLENGTH - 1]] = {};
                }
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
          var newlinks = turn.links.root;
          for (var linkpos in (Object.keys(ARTIFACTS.mandatory ||  {}).length === 0 ?
              (function() {
                var ret = {},
                  s0 = TERRAIN.myzone,
                  s1 = UNITLAYERS.sniper;
                for (var key in s0) {
                  if (!s1[key]) {
                    ret[key] = s0[key];
                  }
                }
                return ret;
              }()) : ARTIFACTS.mandatory)) {
            newlinks[linkpos] = 'selecttarget2';
          }
          return turn;
        };
      game.start2instruction =
        function(step) {
          var MARKS = step.MARKS;
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          var UNITDATA = step.UNITDATA;
          return (Object.keys(UNITLAYERS.mysniper ||  {}).length === 0 ? 'Select initial sniper deployment' : 'Select where to snipe from')
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
    }
    game.commands = {
      "snipe": 1
    };
    game.graphics = {
      "icons": {
        "soldiers": "pawns",
        "sniper": "kings"
      },
      "tiles": {
        "zone": "grass",
        "corner": "castle"
      }
    };
    game.board = {
      "height": 6,
      "width": 6,
      "terrain": {
        "zone": {
          "1": [
            ["rect", "b6", "f6", 5]
          ],
          "2": [
            ["rect", "a1", "a5", 3]
          ]
        },
        "corner": ["a6"]
      }
    };
    game.AI = [];
    game.id = "snijpunt";
    return game;
  }
)()