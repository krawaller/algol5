(
  function() {
    var game = {};
    var connections = {
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
        "3": "b3",
        "4": "b2",
        "5": "a2"
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
        "3": "c3",
        "4": "c2",
        "5": "b2",
        "6": "a2",
        "7": "a3"
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
        "3": "d3",
        "4": "d2",
        "5": "c2",
        "6": "b2",
        "7": "b3"
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
        "5": "d2",
        "6": "c2",
        "7": "c3"
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
        }
      },
      "light": {
        "a2": {
          "colour": "light",
          "pos": "a2",
          "x": 1,
          "y": 2
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
        }
      }
    };
    var TERRAIN = {};
    (function() {
      var ownernames = ["neutral", "my", "opp"];
      var player = 1;
      var otherplayer = 2;
      game.selectdeploytarget1 =
        function(turn, step, markpos) {
          var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
          var UNITLAYERS = step.UNITLAYERS;
          var MARKS = Object.assign({}, step.MARKS, {
            selectdeploytarget: markpos
          });
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
          var MARKS = Object.assign({}, step.MARKS, {
            selectunit: markpos
          });
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
            var allwalkerdirs = [1, 2, 3, 4];
            for (var walkerdirnbr = 0; walkerdirnbr < 4; walkerdirnbr++) {
              var walkedsquares = [];
              var STOPREASON = "";
              var nextpos = "";
              var POS = STARTPOS;
              var allowedsteps = UNITLAYERS[(UNITLAYERS.units[STARTPOS] || {})['group']];
              while (!(STOPREASON = (!(nextpos = connections[POS][allwalkerdirs[walkerdirnbr]]) ? "outofbounds" : !allowedsteps[nextpos] ? "nomoresteps" : null))) {
                walkedsquares.push(POS = nextpos);
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
            var allwalkerdirs = [1, 2, 3, 4];
            for (var walkerdirnbr = 0; walkerdirnbr < 4; walkerdirnbr++) {
              var walkedsquares = [];
              var STOPREASON = "";
              var nextpos = "";
              var POS = STARTPOS;
              var allowedsteps = UNITLAYERS[(UNITLAYERS.units[STARTPOS] || {})['group']];
              while (!(STOPREASON = (!(nextpos = connections[POS][allwalkerdirs[walkerdirnbr]]) ? "outofbounds" : !allowedsteps[nextpos] ? "nomoresteps" : null))) {
                walkedsquares.push(POS = nextpos);
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
          var linkedpositions = Object.keys(
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
            }()));
          var nbrofpositions = linkedpositions.length;
          for (var linknbr = 0; linknbr < nbrofpositions; linknbr++) {
            turn.links.root[linkedpositions[linknbr]] = 'selectdeploytarget1';
          }
          var linkedpositions = Object.keys(
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
            }()));
          var nbrofpositions = linkedpositions.length;
          for (var linknbr = 0; linknbr < nbrofpositions; linknbr++) {
            turn.links.root[linkedpositions[linknbr]] = 'selectunit1';
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
    })();
    (function() {
      var ownernames = ["neutral", "opp", "my"];
      var player = 2;
      var otherplayer = 1;
      game.selectdeploytarget2 =
        function(turn, step, markpos) {
          var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
          var UNITLAYERS = step.UNITLAYERS;
          var MARKS = Object.assign({}, step.MARKS, {
            selectdeploytarget: markpos
          });
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
          var MARKS = Object.assign({}, step.MARKS, {
            selectunit: markpos
          });
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
            var allwalkerdirs = [1, 2, 3, 4];
            for (var walkerdirnbr = 0; walkerdirnbr < 4; walkerdirnbr++) {
              var walkedsquares = [];
              var STOPREASON = "";
              var nextpos = "";
              var POS = STARTPOS;
              var allowedsteps = UNITLAYERS[(UNITLAYERS.units[STARTPOS] || {})['group']];
              while (!(STOPREASON = (!(nextpos = connections[POS][allwalkerdirs[walkerdirnbr]]) ? "outofbounds" : !allowedsteps[nextpos] ? "nomoresteps" : null))) {
                walkedsquares.push(POS = nextpos);
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
            var allwalkerdirs = [1, 2, 3, 4];
            for (var walkerdirnbr = 0; walkerdirnbr < 4; walkerdirnbr++) {
              var walkedsquares = [];
              var STOPREASON = "";
              var nextpos = "";
              var POS = STARTPOS;
              var allowedsteps = UNITLAYERS[(UNITLAYERS.units[STARTPOS] || {})['group']];
              while (!(STOPREASON = (!(nextpos = connections[POS][allwalkerdirs[walkerdirnbr]]) ? "outofbounds" : !allowedsteps[nextpos] ? "nomoresteps" : null))) {
                walkedsquares.push(POS = nextpos);
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
          var linkedpositions = Object.keys(
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
            }()));
          var nbrofpositions = linkedpositions.length;
          for (var linknbr = 0; linknbr < nbrofpositions; linknbr++) {
            turn.links.root[linkedpositions[linknbr]] = 'selectdeploytarget2';
          }
          var linkedpositions = Object.keys(
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
            }()));
          var nbrofpositions = linkedpositions.length;
          for (var linknbr = 0; linknbr < nbrofpositions; linknbr++) {
            turn.links.root[linkedpositions[linknbr]] = 'selectunit2';
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
    })();
    game.newGame =
      function() {
        var turnseed = {
          turn: 0
        };
        var stepseed = {
          UNITDATA: {}
          ,
          clones: 0
        };
        return game.start1(turnseed, stepseed);
      };
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
    return game;
  }
)()