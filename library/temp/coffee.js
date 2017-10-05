(
  function() {
    var game = {};
    game.commands = {
      "uphill": 1,
      "downhill": 1,
      "horisontal": 1,
      "vertical": 1
    };
    game.graphics = {
      "icons": {
        "soldiers": "pawns",
        "markers": "pawns"
      }
    };
    game.board = {
      "height": 5,
      "width": 5
    };
    game.AI = [];
    game.id = "coffee";
    var boardDef = {
      "height": 5,
      "width": 5
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
      game.selectdrop1 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          FOOBAR: Object.assign({}, step.ARTIFACTS.FOOBAR),
          vertical: Object.assign({}, step.ARTIFACTS.vertical),
          uphill: Object.assign({}, step.ARTIFACTS.uphill),
          horisontal: Object.assign({}, step.ARTIFACTS.horisontal),
          downhill: Object.assign({}, step.ARTIFACTS.downhill)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectdrop: markpos
        };
        var STARTPOS = MARKS['selectdrop'];
        var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
          var DIR = allwalkerdirs[walkerdirnbr];
          var POS = STARTPOS;
          while ((POS = connections[POS][DIR])) {
            if (!UNITLAYERS.units[POS]) {
              ARTIFACTS[['FOOBAR', 'vertical', 'uphill', 'horisontal', 'downhill', 'vertical', 'uphill', 'horisontal', 'downhill'][DIR]][POS] = {};
            }
          }
        }
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectdrop'
        });
        turn.links[newstepid] = {};
        if (Object.keys(ARTIFACTS.uphill).length !== 0) {
          turn.links[newstepid].uphill = 'uphill1';
        }
        if (Object.keys(ARTIFACTS.downhill).length !== 0) {
          turn.links[newstepid].downhill = 'downhill1';
        }
        if (Object.keys(ARTIFACTS.vertical).length !== 0) {
          turn.links[newstepid].vertical = 'vertical1';
        }
        if (Object.keys(ARTIFACTS.horisontal).length !== 0) {
          turn.links[newstepid].horisontal = 'horisontal1';
        }
        return newstep;
      };
      game.selectdrop1instruction = function(turn, step) {
        return '';
      };
      game.uphill1 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          winline: Object.assign({}, step.ARTIFACTS.winline)
        });
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var clones = step.clones;
        var UNITLAYERS = step.UNITLAYERS;
        for (var POS in UNITLAYERS.markers) {
          delete UNITDATA[(UNITLAYERS.units[POS]  || {}).id];
        }
        var newunitid = 'spawn' + (clones++);
        UNITDATA[newunitid] = {
          pos: MARKS['selectdrop'],
          id: newunitid,
          group: 'soldiers',
          owner: player
        };
        for (var POS in ARTIFACTS.uphill) {
          var newunitid = 'spawn' + (clones++);
          UNITDATA[newunitid] = {
            pos: POS,
            id: newunitid,
            group: 'markers',
            owner: 0
          };
        }
        MARKS = {};
        UNITLAYERS = {
          "markers": {},
          "mymarkers": {},
          "oppmarkers": {},
          "neutralmarkers": {},
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
          "FOOBAR": {},
          "vertical": {},
          "uphill": {},
          "horisontal": {},
          "downhill": {},
          "winline": {}
        };
        var allowedsteps = UNITLAYERS.myunits;
        var walkstarts = UNITLAYERS.myunits;
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var walkedsquares = [];
            var POS = STARTPOS;
            while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && allowedsteps[POS]) {
              walkedsquares.push(POS);
            }
            var WALKLENGTH = walkedsquares.length;
            if ((3 === WALKLENGTH)) {
              ARTIFACTS['winline'][STARTPOS] = {};
            }
          }
        }
        var newstepid = step.stepid + '-' + 'uphill';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'uphill',
          path: step.path.concat('uphill'),
          clones: clones
        });
        turn.links[newstepid] = {};
        if (Object.keys(UNITLAYERS.markers).length === 0) {
          turn.blockedby = "nolegal";
        } else
        if (Object.keys(ARTIFACTS.winline).length !== 0) {
          var winner = 1;
          var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'madeline';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.uphill1instruction = function(turn, step) {
        return '';
      };
      game.downhill1 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          winline: Object.assign({}, step.ARTIFACTS.winline)
        });
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var clones = step.clones;
        var UNITLAYERS = step.UNITLAYERS;
        for (var POS in UNITLAYERS.markers) {
          delete UNITDATA[(UNITLAYERS.units[POS]  || {}).id];
        }
        var newunitid = 'spawn' + (clones++);
        UNITDATA[newunitid] = {
          pos: MARKS['selectdrop'],
          id: newunitid,
          group: 'soldiers',
          owner: player
        };
        for (var POS in ARTIFACTS.downhill) {
          var newunitid = 'spawn' + (clones++);
          UNITDATA[newunitid] = {
            pos: POS,
            id: newunitid,
            group: 'markers',
            owner: 0
          };
        }
        MARKS = {};
        UNITLAYERS = {
          "markers": {},
          "mymarkers": {},
          "oppmarkers": {},
          "neutralmarkers": {},
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
          "FOOBAR": {},
          "vertical": {},
          "uphill": {},
          "horisontal": {},
          "downhill": {},
          "winline": {}
        };
        var allowedsteps = UNITLAYERS.myunits;
        var walkstarts = UNITLAYERS.myunits;
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var walkedsquares = [];
            var POS = STARTPOS;
            while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && allowedsteps[POS]) {
              walkedsquares.push(POS);
            }
            var WALKLENGTH = walkedsquares.length;
            if ((3 === WALKLENGTH)) {
              ARTIFACTS['winline'][STARTPOS] = {};
            }
          }
        }
        var newstepid = step.stepid + '-' + 'downhill';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'downhill',
          path: step.path.concat('downhill'),
          clones: clones
        });
        turn.links[newstepid] = {};
        if (Object.keys(UNITLAYERS.markers).length === 0) {
          turn.blockedby = "nolegal";
        } else
        if (Object.keys(ARTIFACTS.winline).length !== 0) {
          var winner = 1;
          var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'madeline';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.downhill1instruction = function(turn, step) {
        return '';
      };
      game.horisontal1 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          winline: Object.assign({}, step.ARTIFACTS.winline)
        });
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var clones = step.clones;
        var UNITLAYERS = step.UNITLAYERS;
        for (var POS in UNITLAYERS.markers) {
          delete UNITDATA[(UNITLAYERS.units[POS]  || {}).id];
        }
        var newunitid = 'spawn' + (clones++);
        UNITDATA[newunitid] = {
          pos: MARKS['selectdrop'],
          id: newunitid,
          group: 'soldiers',
          owner: player
        };
        for (var POS in ARTIFACTS.horisontal) {
          var newunitid = 'spawn' + (clones++);
          UNITDATA[newunitid] = {
            pos: POS,
            id: newunitid,
            group: 'markers',
            owner: 0
          };
        }
        MARKS = {};
        UNITLAYERS = {
          "markers": {},
          "mymarkers": {},
          "oppmarkers": {},
          "neutralmarkers": {},
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
          "FOOBAR": {},
          "vertical": {},
          "uphill": {},
          "horisontal": {},
          "downhill": {},
          "winline": {}
        };
        var allowedsteps = UNITLAYERS.myunits;
        var walkstarts = UNITLAYERS.myunits;
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var walkedsquares = [];
            var POS = STARTPOS;
            while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && allowedsteps[POS]) {
              walkedsquares.push(POS);
            }
            var WALKLENGTH = walkedsquares.length;
            if ((3 === WALKLENGTH)) {
              ARTIFACTS['winline'][STARTPOS] = {};
            }
          }
        }
        var newstepid = step.stepid + '-' + 'horisontal';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'horisontal',
          path: step.path.concat('horisontal'),
          clones: clones
        });
        turn.links[newstepid] = {};
        if (Object.keys(UNITLAYERS.markers).length === 0) {
          turn.blockedby = "nolegal";
        } else
        if (Object.keys(ARTIFACTS.winline).length !== 0) {
          var winner = 1;
          var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'madeline';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.horisontal1instruction = function(turn, step) {
        return '';
      };
      game.vertical1 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          winline: Object.assign({}, step.ARTIFACTS.winline)
        });
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var clones = step.clones;
        var UNITLAYERS = step.UNITLAYERS;
        for (var POS in UNITLAYERS.markers) {
          delete UNITDATA[(UNITLAYERS.units[POS]  || {}).id];
        }
        var newunitid = 'spawn' + (clones++);
        UNITDATA[newunitid] = {
          pos: MARKS['selectdrop'],
          id: newunitid,
          group: 'soldiers',
          owner: player
        };
        for (var POS in ARTIFACTS.vertical) {
          var newunitid = 'spawn' + (clones++);
          UNITDATA[newunitid] = {
            pos: POS,
            id: newunitid,
            group: 'markers',
            owner: 0
          };
        }
        MARKS = {};
        UNITLAYERS = {
          "markers": {},
          "mymarkers": {},
          "oppmarkers": {},
          "neutralmarkers": {},
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
          "FOOBAR": {},
          "vertical": {},
          "uphill": {},
          "horisontal": {},
          "downhill": {},
          "winline": {}
        };
        var allowedsteps = UNITLAYERS.myunits;
        var walkstarts = UNITLAYERS.myunits;
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var walkedsquares = [];
            var POS = STARTPOS;
            while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && allowedsteps[POS]) {
              walkedsquares.push(POS);
            }
            var WALKLENGTH = walkedsquares.length;
            if ((3 === WALKLENGTH)) {
              ARTIFACTS['winline'][STARTPOS] = {};
            }
          }
        }
        var newstepid = step.stepid + '-' + 'vertical';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'vertical',
          path: step.path.concat('vertical'),
          clones: clones
        });
        turn.links[newstepid] = {};
        if (Object.keys(UNITLAYERS.markers).length === 0) {
          turn.blockedby = "nolegal";
        } else
        if (Object.keys(ARTIFACTS.winline).length !== 0) {
          var winner = 1;
          var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'madeline';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.vertical1instruction = function(turn, step) {
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
          "FOOBAR": {},
          "vertical": {},
          "uphill": {},
          "horisontal": {},
          "downhill": {},
          "winline": {}
        };
        var UNITDATA = step.UNITDATA;
        var UNITLAYERS = {
          "markers": {},
          "mymarkers": {},
          "oppmarkers": {},
          "neutralmarkers": {},
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
        for (var linkpos in (Object.keys(UNITLAYERS.markers).length === 0 ? BOARD.board : UNITLAYERS.markers)) {
          newlinks[linkpos] = 'selectdrop1';
        }
        return turn;
      }
      game.start1instruction = function(turn, step) {
        return '';
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
      game.selectdrop2 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          FOOBAR: Object.assign({}, step.ARTIFACTS.FOOBAR),
          vertical: Object.assign({}, step.ARTIFACTS.vertical),
          uphill: Object.assign({}, step.ARTIFACTS.uphill),
          horisontal: Object.assign({}, step.ARTIFACTS.horisontal),
          downhill: Object.assign({}, step.ARTIFACTS.downhill)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectdrop: markpos
        };
        var STARTPOS = MARKS['selectdrop'];
        var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
          var DIR = allwalkerdirs[walkerdirnbr];
          var POS = STARTPOS;
          while ((POS = connections[POS][DIR])) {
            if (!UNITLAYERS.units[POS]) {
              ARTIFACTS[['FOOBAR', 'vertical', 'uphill', 'horisontal', 'downhill', 'vertical', 'uphill', 'horisontal', 'downhill'][DIR]][POS] = {};
            }
          }
        }
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectdrop'
        });
        turn.links[newstepid] = {};
        if (Object.keys(ARTIFACTS.uphill).length !== 0) {
          turn.links[newstepid].uphill = 'uphill2';
        }
        if (Object.keys(ARTIFACTS.downhill).length !== 0) {
          turn.links[newstepid].downhill = 'downhill2';
        }
        if (Object.keys(ARTIFACTS.vertical).length !== 0) {
          turn.links[newstepid].vertical = 'vertical2';
        }
        if (Object.keys(ARTIFACTS.horisontal).length !== 0) {
          turn.links[newstepid].horisontal = 'horisontal2';
        }
        return newstep;
      };
      game.selectdrop2instruction = function(turn, step) {
        return '';
      };
      game.uphill2 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          winline: Object.assign({}, step.ARTIFACTS.winline)
        });
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var clones = step.clones;
        var UNITLAYERS = step.UNITLAYERS;
        for (var POS in UNITLAYERS.markers) {
          delete UNITDATA[(UNITLAYERS.units[POS]  || {}).id];
        }
        var newunitid = 'spawn' + (clones++);
        UNITDATA[newunitid] = {
          pos: MARKS['selectdrop'],
          id: newunitid,
          group: 'soldiers',
          owner: player
        };
        for (var POS in ARTIFACTS.uphill) {
          var newunitid = 'spawn' + (clones++);
          UNITDATA[newunitid] = {
            pos: POS,
            id: newunitid,
            group: 'markers',
            owner: 0
          };
        }
        MARKS = {};
        UNITLAYERS = {
          "markers": {},
          "mymarkers": {},
          "oppmarkers": {},
          "neutralmarkers": {},
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
          "FOOBAR": {},
          "vertical": {},
          "uphill": {},
          "horisontal": {},
          "downhill": {},
          "winline": {}
        };
        var allowedsteps = UNITLAYERS.myunits;
        var walkstarts = UNITLAYERS.myunits;
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var walkedsquares = [];
            var POS = STARTPOS;
            while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && allowedsteps[POS]) {
              walkedsquares.push(POS);
            }
            var WALKLENGTH = walkedsquares.length;
            if ((3 === WALKLENGTH)) {
              ARTIFACTS['winline'][STARTPOS] = {};
            }
          }
        }
        var newstepid = step.stepid + '-' + 'uphill';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'uphill',
          path: step.path.concat('uphill'),
          clones: clones
        });
        turn.links[newstepid] = {};
        if (Object.keys(UNITLAYERS.markers).length === 0) {
          turn.blockedby = "nolegal";
        } else
        if (Object.keys(ARTIFACTS.winline).length !== 0) {
          var winner = 2;
          var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'madeline';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.uphill2instruction = function(turn, step) {
        return '';
      };
      game.downhill2 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          winline: Object.assign({}, step.ARTIFACTS.winline)
        });
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var clones = step.clones;
        var UNITLAYERS = step.UNITLAYERS;
        for (var POS in UNITLAYERS.markers) {
          delete UNITDATA[(UNITLAYERS.units[POS]  || {}).id];
        }
        var newunitid = 'spawn' + (clones++);
        UNITDATA[newunitid] = {
          pos: MARKS['selectdrop'],
          id: newunitid,
          group: 'soldiers',
          owner: player
        };
        for (var POS in ARTIFACTS.downhill) {
          var newunitid = 'spawn' + (clones++);
          UNITDATA[newunitid] = {
            pos: POS,
            id: newunitid,
            group: 'markers',
            owner: 0
          };
        }
        MARKS = {};
        UNITLAYERS = {
          "markers": {},
          "mymarkers": {},
          "oppmarkers": {},
          "neutralmarkers": {},
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
          "FOOBAR": {},
          "vertical": {},
          "uphill": {},
          "horisontal": {},
          "downhill": {},
          "winline": {}
        };
        var allowedsteps = UNITLAYERS.myunits;
        var walkstarts = UNITLAYERS.myunits;
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var walkedsquares = [];
            var POS = STARTPOS;
            while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && allowedsteps[POS]) {
              walkedsquares.push(POS);
            }
            var WALKLENGTH = walkedsquares.length;
            if ((3 === WALKLENGTH)) {
              ARTIFACTS['winline'][STARTPOS] = {};
            }
          }
        }
        var newstepid = step.stepid + '-' + 'downhill';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'downhill',
          path: step.path.concat('downhill'),
          clones: clones
        });
        turn.links[newstepid] = {};
        if (Object.keys(UNITLAYERS.markers).length === 0) {
          turn.blockedby = "nolegal";
        } else
        if (Object.keys(ARTIFACTS.winline).length !== 0) {
          var winner = 2;
          var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'madeline';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.downhill2instruction = function(turn, step) {
        return '';
      };
      game.horisontal2 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          winline: Object.assign({}, step.ARTIFACTS.winline)
        });
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var clones = step.clones;
        var UNITLAYERS = step.UNITLAYERS;
        for (var POS in UNITLAYERS.markers) {
          delete UNITDATA[(UNITLAYERS.units[POS]  || {}).id];
        }
        var newunitid = 'spawn' + (clones++);
        UNITDATA[newunitid] = {
          pos: MARKS['selectdrop'],
          id: newunitid,
          group: 'soldiers',
          owner: player
        };
        for (var POS in ARTIFACTS.horisontal) {
          var newunitid = 'spawn' + (clones++);
          UNITDATA[newunitid] = {
            pos: POS,
            id: newunitid,
            group: 'markers',
            owner: 0
          };
        }
        MARKS = {};
        UNITLAYERS = {
          "markers": {},
          "mymarkers": {},
          "oppmarkers": {},
          "neutralmarkers": {},
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
          "FOOBAR": {},
          "vertical": {},
          "uphill": {},
          "horisontal": {},
          "downhill": {},
          "winline": {}
        };
        var allowedsteps = UNITLAYERS.myunits;
        var walkstarts = UNITLAYERS.myunits;
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var walkedsquares = [];
            var POS = STARTPOS;
            while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && allowedsteps[POS]) {
              walkedsquares.push(POS);
            }
            var WALKLENGTH = walkedsquares.length;
            if ((3 === WALKLENGTH)) {
              ARTIFACTS['winline'][STARTPOS] = {};
            }
          }
        }
        var newstepid = step.stepid + '-' + 'horisontal';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'horisontal',
          path: step.path.concat('horisontal'),
          clones: clones
        });
        turn.links[newstepid] = {};
        if (Object.keys(UNITLAYERS.markers).length === 0) {
          turn.blockedby = "nolegal";
        } else
        if (Object.keys(ARTIFACTS.winline).length !== 0) {
          var winner = 2;
          var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'madeline';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.horisontal2instruction = function(turn, step) {
        return '';
      };
      game.vertical2 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          winline: Object.assign({}, step.ARTIFACTS.winline)
        });
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var clones = step.clones;
        var UNITLAYERS = step.UNITLAYERS;
        for (var POS in UNITLAYERS.markers) {
          delete UNITDATA[(UNITLAYERS.units[POS]  || {}).id];
        }
        var newunitid = 'spawn' + (clones++);
        UNITDATA[newunitid] = {
          pos: MARKS['selectdrop'],
          id: newunitid,
          group: 'soldiers',
          owner: player
        };
        for (var POS in ARTIFACTS.vertical) {
          var newunitid = 'spawn' + (clones++);
          UNITDATA[newunitid] = {
            pos: POS,
            id: newunitid,
            group: 'markers',
            owner: 0
          };
        }
        MARKS = {};
        UNITLAYERS = {
          "markers": {},
          "mymarkers": {},
          "oppmarkers": {},
          "neutralmarkers": {},
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
          "FOOBAR": {},
          "vertical": {},
          "uphill": {},
          "horisontal": {},
          "downhill": {},
          "winline": {}
        };
        var allowedsteps = UNITLAYERS.myunits;
        var walkstarts = UNITLAYERS.myunits;
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var walkedsquares = [];
            var POS = STARTPOS;
            while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && allowedsteps[POS]) {
              walkedsquares.push(POS);
            }
            var WALKLENGTH = walkedsquares.length;
            if ((3 === WALKLENGTH)) {
              ARTIFACTS['winline'][STARTPOS] = {};
            }
          }
        }
        var newstepid = step.stepid + '-' + 'vertical';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'vertical',
          path: step.path.concat('vertical'),
          clones: clones
        });
        turn.links[newstepid] = {};
        if (Object.keys(UNITLAYERS.markers).length === 0) {
          turn.blockedby = "nolegal";
        } else
        if (Object.keys(ARTIFACTS.winline).length !== 0) {
          var winner = 2;
          var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'madeline';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.vertical2instruction = function(turn, step) {
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
          "FOOBAR": {},
          "vertical": {},
          "uphill": {},
          "horisontal": {},
          "downhill": {},
          "winline": {}
        };
        var UNITDATA = step.UNITDATA;
        var UNITLAYERS = {
          "markers": {},
          "mymarkers": {},
          "oppmarkers": {},
          "neutralmarkers": {},
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
        for (var linkpos in (Object.keys(UNITLAYERS.markers).length === 0 ? BOARD.board : UNITLAYERS.markers)) {
          newlinks[linkpos] = 'selectdrop2';
        }
        return turn;
      }
      game.start2instruction = function(turn, step) {
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