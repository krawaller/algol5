(
  function() {
    var game = {};
    var boardDef = {
      "width": 4,
      "height": 3
    };
    var connections = boardConnections(boardDef);
    var BOARD = boardLayers(boardDef);
    var relativedirs = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    var TERRAIN = terrainLayers(boardDef, 0);
    (function() {
      var ownernames = ["neutral", "my", "opp"];
      var player = 1;
      var otherplayer = 2;
      game.selectdeploytarget1 =
        function(turn, step, markpos) {
          var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
          var UNITLAYERS = step.UNITLAYERS;
          var MARKS = {
            selectdeploytarget: markpos
          };
          var newstepid = step.stepid + '-' + markpos;
          var newstep = turn.steps[newstepid] = Object.assign({}, step, {
            MARKS: MARKS,
            stepid: newstepid,
            path: step.path.concat(markpos),
            name: 'selectdeploytarget'
          });
          turn.links[newstepid] = {};
          turn.links[newstepid].deploy = 'deploy1';
          return newstep;
        };
      game.selectdeploytarget1instruction =
        function(step) {
          var MARKS = step.MARKS;
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          var UNITDATA = step.UNITDATA;
          return ''
        };
      game.selectunit1 =
        function(turn, step, markpos) {
          var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
          var UNITLAYERS = step.UNITLAYERS;
          var MARKS = {
            selectunit: markpos
          };
          var newstepid = step.stepid + '-' + markpos;
          var newstep = turn.steps[newstepid] = Object.assign({}, step, {
            MARKS: MARKS,
            stepid: newstepid,
            path: step.path.concat(markpos),
            name: 'selectunit'
          });
          turn.links[newstepid] = {};
          turn.links[newstepid].promote = 'promote1';
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
      game.deploy1 =
        function(turn, step) {
          var ARTIFACTS = {
            line: Object.assign({}, step.ARTIFACTS.line)
          };
          var MARKS = step.MARKS;
          var UNITDATA = Object.assign({}, step.UNITDATA);
          var clones = step.clones;
          var UNITLAYERS = step.UNITLAYERS;
          var newunitid = 'spawn' + (clones++);
          UNITDATA[newunitid] = {
            pos: MARKS['selectdeploytarget'],
            id: newunitid,
            group: 'pawns',
            owner: 0
          };
          MARKS = {};
          UNITLAYERS = {
            "bishops": {},
            "mybishops": {},
            "oppbishops": {},
            "neutralbishops": {},
            "kings": {},
            "mykings": {},
            "oppkings": {},
            "neutralkings": {},
            "pawns": {},
            "mypawns": {},
            "opppawns": {},
            "neutralpawns": {},
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
            "line": {}
          };
          var walkstarts = UNITLAYERS.units;
          for (var STARTPOS in walkstarts) {
            var allowedsteps = UNITLAYERS[(UNITLAYERS.units[STARTPOS] || {})['group']];
            var allwalkerdirs = [1, 2, 3, 4];
            for (var walkerdirnbr = 0; walkerdirnbr < 4; walkerdirnbr++) {
              var walkedsquares = [];
              var POS = STARTPOS;
              while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && allowedsteps[POS]) {
                walkedsquares.push(POS);
              }
              var WALKLENGTH = walkedsquares.length;
              for (var walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
                POS = walkedsquares[walkstepper];
                if ((WALKLENGTH > 1)) {
                  ARTIFACTS['line'][POS] = {};
                }
              }
            }
          }
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
          if (Object.keys(ARTIFACTS.line ||  {}).length !== 0) {
            var winner = 1;
            var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
            turn.links[newstepid][result] = 'madeline';
          } else turn.links[newstepid].endturn = "start" + otherplayer;
          return newstep;
        };
      game.deploy1instruction =
        function(step) {
          var MARKS = step.MARKS;
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          var UNITDATA = step.UNITDATA;
          return ''
        };
      game.promote1 =
        function(turn, step) {
          var ARTIFACTS = {
            line: Object.assign({}, step.ARTIFACTS.line)
          };
          var MARKS = step.MARKS;
          var UNITDATA = Object.assign({}, step.UNITDATA);
          var UNITLAYERS = step.UNITLAYERS;
          var unitid = (UNITLAYERS.units[MARKS['selectunit']]  || {}).id;
          if (unitid) {
            UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
              'group': (!!(UNITLAYERS.pawns[MARKS['selectunit']]) ? 'bishops' : 'kings')
            });
          }
          MARKS = {};
          UNITLAYERS = {
            "bishops": {},
            "mybishops": {},
            "oppbishops": {},
            "neutralbishops": {},
            "kings": {},
            "mykings": {},
            "oppkings": {},
            "neutralkings": {},
            "pawns": {},
            "mypawns": {},
            "opppawns": {},
            "neutralpawns": {},
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
            "line": {}
          };
          var walkstarts = UNITLAYERS.units;
          for (var STARTPOS in walkstarts) {
            var allowedsteps = UNITLAYERS[(UNITLAYERS.units[STARTPOS] || {})['group']];
            var allwalkerdirs = [1, 2, 3, 4];
            for (var walkerdirnbr = 0; walkerdirnbr < 4; walkerdirnbr++) {
              var walkedsquares = [];
              var POS = STARTPOS;
              while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && allowedsteps[POS]) {
                walkedsquares.push(POS);
              }
              var WALKLENGTH = walkedsquares.length;
              for (var walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
                POS = walkedsquares[walkstepper];
                if ((WALKLENGTH > 1)) {
                  ARTIFACTS['line'][POS] = {};
                }
              }
            }
          }
          var newstepid = step.stepid + '-' + 'promote';
          var newstep = turn.steps[newstepid] = Object.assign({}, step, {
            ARTIFACTS: ARTIFACTS,
            MARKS: MARKS,
            UNITDATA: UNITDATA,
            UNITLAYERS: UNITLAYERS,
            stepid: newstepid,
            name: 'promote',
            path: step.path.concat('promote')
          });
          turn.links[newstepid] = {};
          if (Object.keys(ARTIFACTS.line ||  {}).length !== 0) {
            var winner = 1;
            var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
            turn.links[newstepid][result] = 'madeline';
          } else turn.links[newstepid].endturn = "start" + otherplayer;
          return newstep;
        };
      game.promote1instruction =
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
            "line": {}
          };
          var UNITDATA = step.UNITDATA;
          var UNITLAYERS = {
            "bishops": {},
            "mybishops": {},
            "oppbishops": {},
            "neutralbishops": {},
            "kings": {},
            "mykings": {},
            "oppkings": {},
            "neutralkings": {},
            "pawns": {},
            "mypawns": {},
            "opppawns": {},
            "neutralpawns": {},
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
            newlinks[linkpos] = 'selectdeploytarget1';
          }
          var newlinks = turn.links.root;
          for (var linkpos in
              (function() {
                var k, ret = {},
                  s0 = UNITLAYERS.pawns,
                  s1 = UNITLAYERS.bishops;
                for (k in s0) {
                  ret[k] = 1;
                }
                for (k in s1) {
                  ret[k] = 1;
                }
                return ret;
              }())) {
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
      game.selectdeploytarget2 =
        function(turn, step, markpos) {
          var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
          var UNITLAYERS = step.UNITLAYERS;
          var MARKS = {
            selectdeploytarget: markpos
          };
          var newstepid = step.stepid + '-' + markpos;
          var newstep = turn.steps[newstepid] = Object.assign({}, step, {
            MARKS: MARKS,
            stepid: newstepid,
            path: step.path.concat(markpos),
            name: 'selectdeploytarget'
          });
          turn.links[newstepid] = {};
          turn.links[newstepid].deploy = 'deploy2';
          return newstep;
        };
      game.selectdeploytarget2instruction =
        function(step) {
          var MARKS = step.MARKS;
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          var UNITDATA = step.UNITDATA;
          return ''
        };
      game.selectunit2 =
        function(turn, step, markpos) {
          var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
          var UNITLAYERS = step.UNITLAYERS;
          var MARKS = {
            selectunit: markpos
          };
          var newstepid = step.stepid + '-' + markpos;
          var newstep = turn.steps[newstepid] = Object.assign({}, step, {
            MARKS: MARKS,
            stepid: newstepid,
            path: step.path.concat(markpos),
            name: 'selectunit'
          });
          turn.links[newstepid] = {};
          turn.links[newstepid].promote = 'promote2';
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
      game.deploy2 =
        function(turn, step) {
          var ARTIFACTS = {
            line: Object.assign({}, step.ARTIFACTS.line)
          };
          var MARKS = step.MARKS;
          var UNITDATA = Object.assign({}, step.UNITDATA);
          var clones = step.clones;
          var UNITLAYERS = step.UNITLAYERS;
          var newunitid = 'spawn' + (clones++);
          UNITDATA[newunitid] = {
            pos: MARKS['selectdeploytarget'],
            id: newunitid,
            group: 'pawns',
            owner: 0
          };
          MARKS = {};
          UNITLAYERS = {
            "bishops": {},
            "mybishops": {},
            "oppbishops": {},
            "neutralbishops": {},
            "kings": {},
            "mykings": {},
            "oppkings": {},
            "neutralkings": {},
            "pawns": {},
            "mypawns": {},
            "opppawns": {},
            "neutralpawns": {},
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
            "line": {}
          };
          var walkstarts = UNITLAYERS.units;
          for (var STARTPOS in walkstarts) {
            var allowedsteps = UNITLAYERS[(UNITLAYERS.units[STARTPOS] || {})['group']];
            var allwalkerdirs = [1, 2, 3, 4];
            for (var walkerdirnbr = 0; walkerdirnbr < 4; walkerdirnbr++) {
              var walkedsquares = [];
              var POS = STARTPOS;
              while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && allowedsteps[POS]) {
                walkedsquares.push(POS);
              }
              var WALKLENGTH = walkedsquares.length;
              for (var walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
                POS = walkedsquares[walkstepper];
                if ((WALKLENGTH > 1)) {
                  ARTIFACTS['line'][POS] = {};
                }
              }
            }
          }
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
          if (Object.keys(ARTIFACTS.line ||  {}).length !== 0) {
            var winner = 2;
            var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
            turn.links[newstepid][result] = 'madeline';
          } else turn.links[newstepid].endturn = "start" + otherplayer;
          return newstep;
        };
      game.deploy2instruction =
        function(step) {
          var MARKS = step.MARKS;
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          var UNITDATA = step.UNITDATA;
          return ''
        };
      game.promote2 =
        function(turn, step) {
          var ARTIFACTS = {
            line: Object.assign({}, step.ARTIFACTS.line)
          };
          var MARKS = step.MARKS;
          var UNITDATA = Object.assign({}, step.UNITDATA);
          var UNITLAYERS = step.UNITLAYERS;
          var unitid = (UNITLAYERS.units[MARKS['selectunit']]  || {}).id;
          if (unitid) {
            UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
              'group': (!!(UNITLAYERS.pawns[MARKS['selectunit']]) ? 'bishops' : 'kings')
            });
          }
          MARKS = {};
          UNITLAYERS = {
            "bishops": {},
            "mybishops": {},
            "oppbishops": {},
            "neutralbishops": {},
            "kings": {},
            "mykings": {},
            "oppkings": {},
            "neutralkings": {},
            "pawns": {},
            "mypawns": {},
            "opppawns": {},
            "neutralpawns": {},
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
            "line": {}
          };
          var walkstarts = UNITLAYERS.units;
          for (var STARTPOS in walkstarts) {
            var allowedsteps = UNITLAYERS[(UNITLAYERS.units[STARTPOS] || {})['group']];
            var allwalkerdirs = [1, 2, 3, 4];
            for (var walkerdirnbr = 0; walkerdirnbr < 4; walkerdirnbr++) {
              var walkedsquares = [];
              var POS = STARTPOS;
              while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && allowedsteps[POS]) {
                walkedsquares.push(POS);
              }
              var WALKLENGTH = walkedsquares.length;
              for (var walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
                POS = walkedsquares[walkstepper];
                if ((WALKLENGTH > 1)) {
                  ARTIFACTS['line'][POS] = {};
                }
              }
            }
          }
          var newstepid = step.stepid + '-' + 'promote';
          var newstep = turn.steps[newstepid] = Object.assign({}, step, {
            ARTIFACTS: ARTIFACTS,
            MARKS: MARKS,
            UNITDATA: UNITDATA,
            UNITLAYERS: UNITLAYERS,
            stepid: newstepid,
            name: 'promote',
            path: step.path.concat('promote')
          });
          turn.links[newstepid] = {};
          if (Object.keys(ARTIFACTS.line ||  {}).length !== 0) {
            var winner = 2;
            var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
            turn.links[newstepid][result] = 'madeline';
          } else turn.links[newstepid].endturn = "start" + otherplayer;
          return newstep;
        };
      game.promote2instruction =
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
            "line": {}
          };
          var UNITDATA = step.UNITDATA;
          var UNITLAYERS = {
            "bishops": {},
            "mybishops": {},
            "oppbishops": {},
            "neutralbishops": {},
            "kings": {},
            "mykings": {},
            "oppkings": {},
            "neutralkings": {},
            "pawns": {},
            "mypawns": {},
            "opppawns": {},
            "neutralpawns": {},
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
            newlinks[linkpos] = 'selectdeploytarget2';
          }
          var newlinks = turn.links.root;
          for (var linkpos in
              (function() {
                var k, ret = {},
                  s0 = UNITLAYERS.pawns,
                  s1 = UNITLAYERS.bishops;
                for (k in s0) {
                  ret[k] = 1;
                }
                for (k in s1) {
                  ret[k] = 1;
                }
                return ret;
              }())) {
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
      "deploy": 1,
      "promote": 1
    };
    game.graphics = {
      "icons": {
        "kings": "kings",
        "pawns": "pawns",
        "bishops": "bishops"
      }
    };
    game.board = {
      "width": 4,
      "height": 3
    };
    game.AI = [];
    game.id = "semaphor";
    return game;
  }
)()