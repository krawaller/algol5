(
  function() {
    var game = {};
    game.commands = {
      "move": 1,
      "fire": 1
    };
    game.graphics = {
      "icons": {
        "queens": "queens",
        "fires": "pawns"
      }
    };
    game.board = {
      "height": 10,
      "width": 10
    };
    game.AI = ["Steve"];
    game.id = "amazon";
    var boardDef = {
      "height": 10,
      "width": 10
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
        UNITDATA: deduceInitialUnitData({
          "queens": {
            "1": ["d10", "g10", "a7", "j7"],
            "2": ["a4", "d1", "g1", "j4"]
          }
        }),
        TURNVARS: {},
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
      game.selectunit1 = function(turn, step, markpos) {
        var ARTIFACTS = {
          targets: Object.assign({}, step.ARTIFACTS.targets)
        };
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectunit: markpos
        };
        var BLOCKS = UNITLAYERS.units;
        var STARTPOS = MARKS['selectunit'];
        var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
          var POS = STARTPOS;
          while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && !BLOCKS[POS]) {
            ARTIFACTS['targets'][POS] = {};
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
          newlinks[linkpos] = 'selectmovetarget1';
        }
        return newstep;
      };
      game.selectunit1instruction = function(step) {
        return 'Select where to move the amazon';
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
        return 'Choose Move to go here!';
      };
      game.selectfiretarget1 = function(turn, step, markpos) {
        var MARKS = {
          selectfiretarget: markpos
        };
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectfiretarget'
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].fire = 'fire1';
        return newstep;
      };
      game.selectfiretarget1instruction = function(step) {
        return 'Choose Fire to shoot here!';
      };
      game.move1 =
        function(turn, step) {
          var ARTIFACTS = {
            targets: Object.assign({}, step.ARTIFACTS.targets)
          };
          var MARKS = step.MARKS;
          var UNITDATA = Object.assign({}, step.UNITDATA);
          var UNITLAYERS = step.UNITLAYERS;
          var TURNVARS = Object.assign({}, step.TURNVARS);
          var unitid = (UNITLAYERS.units[MARKS['selectunit']]  || {}).id;
          if (unitid) {
            UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
              'pos': MARKS['selectmovetarget']
            });
          }
          TURNVARS['movedto'] = MARKS['selectmovetarget'];
          MARKS = {};
          UNITLAYERS = {
            "queens": {},
            "myqueens": {},
            "oppqueens": {},
            "neutralqueens": {},
            "fires": {},
            "myfires": {},
            "oppfires": {},
            "neutralfires": {},
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
            "targets": {}
          };
          var BLOCKS = UNITLAYERS.units;
          var STARTPOS = TURNVARS['movedto'];
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var POS = STARTPOS;
            while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && !BLOCKS[POS]) {
              ARTIFACTS['targets'][POS] = {};
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
            path: step.path.concat('move')
              ,
            TURNVARS: TURNVARS
          });
          turn.links[newstepid] = {};
          var newlinks = turn.links[newstepid];
          for (var linkpos in ARTIFACTS.targets) {
            newlinks[linkpos] = 'selectfiretarget1';
          }
          return newstep;
        };
      game.move1instruction =
        function(step) {
          var MARKS = step.MARKS;
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          var UNITDATA = step.UNITDATA;
          return 'Now select where to fire at'
        };
      game.fire1 =
        function(turn, step) {
          var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
          var MARKS = step.MARKS;
          var UNITDATA = Object.assign({}, step.UNITDATA);
          var clones = step.clones;
          var UNITLAYERS = step.UNITLAYERS;
          var TURNVARS = Object.assign({}, step.TURNVARS);
          var newunitid = 'spawn' + (clones++);
          UNITDATA[newunitid] = {
            pos: MARKS['selectfiretarget'],
            id: newunitid,
            group: 'fires',
            owner: 0,
            from: TURNVARS['movedto']
          };
          MARKS = {};
          UNITLAYERS = {
            "queens": {},
            "myqueens": {},
            "oppqueens": {},
            "neutralqueens": {},
            "fires": {},
            "myfires": {},
            "oppfires": {},
            "neutralfires": {},
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
            "targets": {}
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
            clones: clones,
            TURNVARS: TURNVARS
          });
          turn.links[newstepid] = {};
          turn.links[newstepid].endturn = "start" + otherplayer;
          return newstep;
        };
      game.fire1instruction =
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
            "targets": {}
          };
          var UNITDATA = step.UNITDATA;
          var TURNVARS = {};
          var UNITLAYERS = {
            "queens": {},
            "myqueens": {},
            "oppqueens": {},
            "neutralqueens": {},
            "fires": {},
            "myfires": {},
            "oppfires": {},
            "neutralfires": {},
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
            path: [],
            TURNVARS: TURNVARS
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
          return 'Select an amazon to move and fire with'
        };
      game.brain_Steve_1 =
        function(step) {
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          ARTIFACTS.myroads = {};
          ARTIFACTS.opproads = {};
          ARTIFACTS.myreach = {};
          ARTIFACTS.oppreach = {};
          for (var STARTPOS in UNITLAYERS.queens) {
            var neighbourdirs = [1, 2, 3, 4, 5, 6, 7, 8];
            var foundneighbours = [];
            var startconnections = connections[STARTPOS];
            for (var dirnbr = 0; dirnbr < 8; dirnbr++) {
              var POS = startconnections[neighbourdirs[dirnbr]];
              if (POS && !UNITLAYERS.units[POS]) {
                foundneighbours.push(POS);
              }
            } 
            var NEIGHBOURCOUNT = foundneighbours.length;
            ARTIFACTS[(!!(UNITLAYERS.myunits[STARTPOS]) ? 'myroads' : 'opproads')][STARTPOS] = {
              count: NEIGHBOURCOUNT
            };
          } 
          var BLOCKS = UNITLAYERS.units;
          var walkstarts = UNITLAYERS.queens;
          for (var STARTPOS in walkstarts) {
            var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
            for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
              var POS = STARTPOS;
              while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && !BLOCKS[POS]) {
                ARTIFACTS[(!!(UNITLAYERS.myunits[STARTPOS]) ? 'myreach' : 'oppreach')][POS] = {};
              }
            }
          }
          return reduce(ARTIFACTS.myroads, function(mem, obj) {
            return mem + obj['count'];
          }, 0) + Object.keys(ARTIFACTS.myreach).length - reduce(ARTIFACTS.opproads, function(mem, obj) {
            return mem + obj['count'];
          }, 0) - Object.keys(ARTIFACTS.oppreach).length;
        };
      game.brain_Steve_1_detailed =
        function(step) {
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          ARTIFACTS.myroads = {};
          ARTIFACTS.opproads = {};
          ARTIFACTS.myreach = {};
          ARTIFACTS.oppreach = {};
          for (var STARTPOS in UNITLAYERS.queens) {
            var neighbourdirs = [1, 2, 3, 4, 5, 6, 7, 8];
            var foundneighbours = [];
            var startconnections = connections[STARTPOS];
            for (var dirnbr = 0; dirnbr < 8; dirnbr++) {
              var POS = startconnections[neighbourdirs[dirnbr]];
              if (POS && !UNITLAYERS.units[POS]) {
                foundneighbours.push(POS);
              }
            } 
            var NEIGHBOURCOUNT = foundneighbours.length;
            ARTIFACTS[(!!(UNITLAYERS.myunits[STARTPOS]) ? 'myroads' : 'opproads')][STARTPOS] = {
              count: NEIGHBOURCOUNT
            };
          } 
          var BLOCKS = UNITLAYERS.units;
          var walkstarts = UNITLAYERS.queens;
          for (var STARTPOS in walkstarts) {
            var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
            for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
              var POS = STARTPOS;
              while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && !BLOCKS[POS]) {
                ARTIFACTS[(!!(UNITLAYERS.myunits[STARTPOS]) ? 'myreach' : 'oppreach')][POS] = {};
              }
            }
          }
          return {
            myroads: reduce(ARTIFACTS.myroads, function(mem, obj) {
              return mem + obj['count'];
            }, 0),
            mydomain: Object.keys(ARTIFACTS.myreach).length,
            opproads: -reduce(ARTIFACTS.opproads, function(mem, obj) {
              return mem + obj['count'];
            }, 0),
            oppdomain: -Object.keys(ARTIFACTS.oppreach).length
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
      game.selectunit2 = function(turn, step, markpos) {
        var ARTIFACTS = {
          targets: Object.assign({}, step.ARTIFACTS.targets)
        };
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectunit: markpos
        };
        var BLOCKS = UNITLAYERS.units;
        var STARTPOS = MARKS['selectunit'];
        var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
          var POS = STARTPOS;
          while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && !BLOCKS[POS]) {
            ARTIFACTS['targets'][POS] = {};
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
          newlinks[linkpos] = 'selectmovetarget2';
        }
        return newstep;
      };
      game.selectunit2instruction = function(step) {
        return 'Select where to move the amazon';
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
        return 'Choose Move to go here!';
      };
      game.selectfiretarget2 = function(turn, step, markpos) {
        var MARKS = {
          selectfiretarget: markpos
        };
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectfiretarget'
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].fire = 'fire2';
        return newstep;
      };
      game.selectfiretarget2instruction = function(step) {
        return 'Choose Fire to shoot here!';
      };
      game.move2 =
        function(turn, step) {
          var ARTIFACTS = {
            targets: Object.assign({}, step.ARTIFACTS.targets)
          };
          var MARKS = step.MARKS;
          var UNITDATA = Object.assign({}, step.UNITDATA);
          var UNITLAYERS = step.UNITLAYERS;
          var TURNVARS = Object.assign({}, step.TURNVARS);
          var unitid = (UNITLAYERS.units[MARKS['selectunit']]  || {}).id;
          if (unitid) {
            UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
              'pos': MARKS['selectmovetarget']
            });
          }
          TURNVARS['movedto'] = MARKS['selectmovetarget'];
          MARKS = {};
          UNITLAYERS = {
            "queens": {},
            "myqueens": {},
            "oppqueens": {},
            "neutralqueens": {},
            "fires": {},
            "myfires": {},
            "oppfires": {},
            "neutralfires": {},
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
            "targets": {}
          };
          var BLOCKS = UNITLAYERS.units;
          var STARTPOS = TURNVARS['movedto'];
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var POS = STARTPOS;
            while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && !BLOCKS[POS]) {
              ARTIFACTS['targets'][POS] = {};
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
            path: step.path.concat('move')
              ,
            TURNVARS: TURNVARS
          });
          turn.links[newstepid] = {};
          var newlinks = turn.links[newstepid];
          for (var linkpos in ARTIFACTS.targets) {
            newlinks[linkpos] = 'selectfiretarget2';
          }
          return newstep;
        };
      game.move2instruction =
        function(step) {
          var MARKS = step.MARKS;
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          var UNITDATA = step.UNITDATA;
          return 'Now select where to fire at'
        };
      game.fire2 =
        function(turn, step) {
          var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
          var MARKS = step.MARKS;
          var UNITDATA = Object.assign({}, step.UNITDATA);
          var clones = step.clones;
          var UNITLAYERS = step.UNITLAYERS;
          var TURNVARS = Object.assign({}, step.TURNVARS);
          var newunitid = 'spawn' + (clones++);
          UNITDATA[newunitid] = {
            pos: MARKS['selectfiretarget'],
            id: newunitid,
            group: 'fires',
            owner: 0,
            from: TURNVARS['movedto']
          };
          MARKS = {};
          UNITLAYERS = {
            "queens": {},
            "myqueens": {},
            "oppqueens": {},
            "neutralqueens": {},
            "fires": {},
            "myfires": {},
            "oppfires": {},
            "neutralfires": {},
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
            "targets": {}
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
            clones: clones,
            TURNVARS: TURNVARS
          });
          turn.links[newstepid] = {};
          turn.links[newstepid].endturn = "start" + otherplayer;
          return newstep;
        };
      game.fire2instruction =
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
            "targets": {}
          };
          var UNITDATA = step.UNITDATA;
          var TURNVARS = {};
          var UNITLAYERS = {
            "queens": {},
            "myqueens": {},
            "oppqueens": {},
            "neutralqueens": {},
            "fires": {},
            "myfires": {},
            "oppfires": {},
            "neutralfires": {},
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
            path: [],
            TURNVARS: TURNVARS
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
          return 'Select an amazon to move and fire with'
        };
      game.brain_Steve_2 =
        function(step) {
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          ARTIFACTS.myroads = {};
          ARTIFACTS.opproads = {};
          ARTIFACTS.myreach = {};
          ARTIFACTS.oppreach = {};
          for (var STARTPOS in UNITLAYERS.queens) {
            var neighbourdirs = [1, 2, 3, 4, 5, 6, 7, 8];
            var foundneighbours = [];
            var startconnections = connections[STARTPOS];
            for (var dirnbr = 0; dirnbr < 8; dirnbr++) {
              var POS = startconnections[neighbourdirs[dirnbr]];
              if (POS && !UNITLAYERS.units[POS]) {
                foundneighbours.push(POS);
              }
            } 
            var NEIGHBOURCOUNT = foundneighbours.length;
            ARTIFACTS[(!!(UNITLAYERS.myunits[STARTPOS]) ? 'myroads' : 'opproads')][STARTPOS] = {
              count: NEIGHBOURCOUNT
            };
          } 
          var BLOCKS = UNITLAYERS.units;
          var walkstarts = UNITLAYERS.queens;
          for (var STARTPOS in walkstarts) {
            var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
            for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
              var POS = STARTPOS;
              while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && !BLOCKS[POS]) {
                ARTIFACTS[(!!(UNITLAYERS.myunits[STARTPOS]) ? 'myreach' : 'oppreach')][POS] = {};
              }
            }
          }
          return reduce(ARTIFACTS.myroads, function(mem, obj) {
            return mem + obj['count'];
          }, 0) + Object.keys(ARTIFACTS.myreach).length - reduce(ARTIFACTS.opproads, function(mem, obj) {
            return mem + obj['count'];
          }, 0) - Object.keys(ARTIFACTS.oppreach).length;
        };
      game.brain_Steve_2_detailed =
        function(step) {
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          ARTIFACTS.myroads = {};
          ARTIFACTS.opproads = {};
          ARTIFACTS.myreach = {};
          ARTIFACTS.oppreach = {};
          for (var STARTPOS in UNITLAYERS.queens) {
            var neighbourdirs = [1, 2, 3, 4, 5, 6, 7, 8];
            var foundneighbours = [];
            var startconnections = connections[STARTPOS];
            for (var dirnbr = 0; dirnbr < 8; dirnbr++) {
              var POS = startconnections[neighbourdirs[dirnbr]];
              if (POS && !UNITLAYERS.units[POS]) {
                foundneighbours.push(POS);
              }
            } 
            var NEIGHBOURCOUNT = foundneighbours.length;
            ARTIFACTS[(!!(UNITLAYERS.myunits[STARTPOS]) ? 'myroads' : 'opproads')][STARTPOS] = {
              count: NEIGHBOURCOUNT
            };
          } 
          var BLOCKS = UNITLAYERS.units;
          var walkstarts = UNITLAYERS.queens;
          for (var STARTPOS in walkstarts) {
            var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
            for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
              var POS = STARTPOS;
              while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && !BLOCKS[POS]) {
                ARTIFACTS[(!!(UNITLAYERS.myunits[STARTPOS]) ? 'myreach' : 'oppreach')][POS] = {};
              }
            }
          }
          return {
            myroads: reduce(ARTIFACTS.myroads, function(mem, obj) {
              return mem + obj['count'];
            }, 0),
            mydomain: Object.keys(ARTIFACTS.myreach).length,
            opproads: -reduce(ARTIFACTS.opproads, function(mem, obj) {
              return mem + obj['count'];
            }, 0),
            oppdomain: -Object.keys(ARTIFACTS.oppreach).length
          };
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