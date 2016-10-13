(
  function() {
    var game = {};
    var connections = {
      "faux": {},
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
        "1": "a4",
        "2": "b4",
        "3": "b3",
        "4": "b2",
        "5": "a2"
      },
      "a4": {
        "1": "a5",
        "2": "b5",
        "3": "b4",
        "4": "b3",
        "5": "a3"
      },
      "a5": {
        "3": "b5",
        "4": "b4",
        "5": "a4"
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
        "1": "b4",
        "2": "c4",
        "3": "c3",
        "4": "c2",
        "5": "b2",
        "6": "a2",
        "7": "a3",
        "8": "a4"
      },
      "b4": {
        "1": "b5",
        "2": "c5",
        "3": "c4",
        "4": "c3",
        "5": "b3",
        "6": "a3",
        "7": "a4",
        "8": "a5"
      },
      "b5": {
        "3": "c5",
        "4": "c4",
        "5": "b4",
        "6": "a4",
        "7": "a5"
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
        "1": "c4",
        "2": "d4",
        "3": "d3",
        "4": "d2",
        "5": "c2",
        "6": "b2",
        "7": "b3",
        "8": "b4"
      },
      "c4": {
        "1": "c5",
        "2": "d5",
        "3": "d4",
        "4": "d3",
        "5": "c3",
        "6": "b3",
        "7": "b4",
        "8": "b5"
      },
      "c5": {
        "3": "d5",
        "4": "d4",
        "5": "c4",
        "6": "b4",
        "7": "b5"
      },
      "d1": {
        "1": "d2",
        "2": "e2",
        "3": "e1",
        "7": "c1",
        "8": "c2"
      },
      "d2": {
        "1": "d3",
        "2": "e3",
        "3": "e2",
        "4": "e1",
        "5": "d1",
        "6": "c1",
        "7": "c2",
        "8": "c3"
      },
      "d3": {
        "1": "d4",
        "2": "e4",
        "3": "e3",
        "4": "e2",
        "5": "d2",
        "6": "c2",
        "7": "c3",
        "8": "c4"
      },
      "d4": {
        "1": "d5",
        "2": "e5",
        "3": "e4",
        "4": "e3",
        "5": "d3",
        "6": "c3",
        "7": "c4",
        "8": "c5"
      },
      "d5": {
        "3": "e5",
        "4": "e4",
        "5": "d4",
        "6": "c4",
        "7": "c5"
      },
      "e1": {
        "1": "e2",
        "7": "d1",
        "8": "d2"
      },
      "e2": {
        "1": "e3",
        "5": "e1",
        "6": "d1",
        "7": "d2",
        "8": "d3"
      },
      "e3": {
        "1": "e4",
        "5": "e2",
        "6": "d2",
        "7": "d3",
        "8": "d4"
      },
      "e4": {
        "1": "e5",
        "5": "e3",
        "6": "d3",
        "7": "d4",
        "8": "d5"
      },
      "e5": {
        "5": "e4",
        "6": "d4",
        "7": "d5"
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
        "a4": {
          "colour": "light",
          "pos": "a4",
          "x": 1,
          "y": 4
        },
        "a5": {
          "colour": "dark",
          "pos": "a5",
          "x": 1,
          "y": 5
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
        "b4": {
          "colour": "dark",
          "pos": "b4",
          "x": 2,
          "y": 4
        },
        "b5": {
          "colour": "light",
          "pos": "b5",
          "x": 2,
          "y": 5
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
        "c4": {
          "colour": "light",
          "pos": "c4",
          "x": 3,
          "y": 4
        },
        "c5": {
          "colour": "dark",
          "pos": "c5",
          "x": 3,
          "y": 5
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
        },
        "d4": {
          "colour": "dark",
          "pos": "d4",
          "x": 4,
          "y": 4
        },
        "d5": {
          "colour": "light",
          "pos": "d5",
          "x": 4,
          "y": 5
        },
        "e1": {
          "colour": "dark",
          "pos": "e1",
          "x": 5,
          "y": 1
        },
        "e2": {
          "colour": "light",
          "pos": "e2",
          "x": 5,
          "y": 2
        },
        "e3": {
          "colour": "dark",
          "pos": "e3",
          "x": 5,
          "y": 3
        },
        "e4": {
          "colour": "light",
          "pos": "e4",
          "x": 5,
          "y": 4
        },
        "e5": {
          "colour": "dark",
          "pos": "e5",
          "x": 5,
          "y": 5
        }
      },
      "light": {
        "a2": {
          "colour": "light",
          "pos": "a2",
          "x": 1,
          "y": 2
        },
        "a4": {
          "colour": "light",
          "pos": "a4",
          "x": 1,
          "y": 4
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
        "b5": {
          "colour": "light",
          "pos": "b5",
          "x": 2,
          "y": 5
        },
        "c2": {
          "colour": "light",
          "pos": "c2",
          "x": 3,
          "y": 2
        },
        "c4": {
          "colour": "light",
          "pos": "c4",
          "x": 3,
          "y": 4
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
        },
        "d5": {
          "colour": "light",
          "pos": "d5",
          "x": 4,
          "y": 5
        },
        "e2": {
          "colour": "light",
          "pos": "e2",
          "x": 5,
          "y": 2
        },
        "e4": {
          "colour": "light",
          "pos": "e4",
          "x": 5,
          "y": 4
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
        "a5": {
          "colour": "dark",
          "pos": "a5",
          "x": 1,
          "y": 5
        },
        "b2": {
          "colour": "dark",
          "pos": "b2",
          "x": 2,
          "y": 2
        },
        "b4": {
          "colour": "dark",
          "pos": "b4",
          "x": 2,
          "y": 4
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
        "c5": {
          "colour": "dark",
          "pos": "c5",
          "x": 3,
          "y": 5
        },
        "d2": {
          "colour": "dark",
          "pos": "d2",
          "x": 4,
          "y": 2
        },
        "d4": {
          "colour": "dark",
          "pos": "d4",
          "x": 4,
          "y": 4
        },
        "e1": {
          "colour": "dark",
          "pos": "e1",
          "x": 5,
          "y": 1
        },
        "e3": {
          "colour": "dark",
          "pos": "e3",
          "x": 5,
          "y": 3
        },
        "e5": {
          "colour": "dark",
          "pos": "e5",
          "x": 5,
          "y": 5
        }
      }
    };
    var relativedirs = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    var TERRAIN = {};
    (function() {
      var ownernames = ["neutral", "my", "opp"];
      var player = 1;
      var otherplayer = 2;
      game.selectdrop1 =
        function(turn, step, markpos) {
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
          if (Object.keys(ARTIFACTS.uphill ||  {}).length !== 0) {
            turn.links[newstepid].uphill = 'uphill1';
          }
          if (Object.keys(ARTIFACTS.downhill ||  {}).length !== 0) {
            turn.links[newstepid].downhill = 'downhill1';
          }
          if (Object.keys(ARTIFACTS.vertical ||  {}).length !== 0) {
            turn.links[newstepid].vertical = 'vertical1';
          }
          if (Object.keys(ARTIFACTS.horisontal ||  {}).length !== 0) {
            turn.links[newstepid].horisontal = 'horisontal1';
          }
          return newstep;
        };
      game.selectdrop1instruction =
        function(step) {
          var MARKS = step.MARKS;
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          var UNITDATA = step.UNITDATA;
          return ''
        };
      game.uphill1 =
        function(turn, step) {
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
            var DIR = undefined;
            var walkedsquares = [];
            var POS = STARTPOS;
            while ((POS = connections[POS][DIR]) && allowedsteps[POS]) {
              walkedsquares.push(POS);
            }
            var WALKLENGTH = walkedsquares.length;
            if ((3 === WALKLENGTH)) {
              ARTIFACTS['winline'][POS] = {};
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
          if (Object.keys(UNITLAYERS.markers ||  {}).length === 0) {
            turn.blockedby = "nolegal";
          } else
          if (Object.keys(ARTIFACTS.winline ||  {}).length !== 0) {
            var winner = 1;
            var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
            turn.links[newstepid][result] = 'madeline';
          } else turn.links[newstepid].endturn = "start" + otherplayer;
          return newstep;
        };
      game.uphill1instruction =
        function(step) {
          var MARKS = step.MARKS;
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          var UNITDATA = step.UNITDATA;
          return ''
        };
      game.downhill1 =
        function(turn, step) {
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
            var DIR = undefined;
            var walkedsquares = [];
            var POS = STARTPOS;
            while ((POS = connections[POS][DIR]) && allowedsteps[POS]) {
              walkedsquares.push(POS);
            }
            var WALKLENGTH = walkedsquares.length;
            if ((3 === WALKLENGTH)) {
              ARTIFACTS['winline'][POS] = {};
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
          if (Object.keys(UNITLAYERS.markers ||  {}).length === 0) {
            turn.blockedby = "nolegal";
          } else
          if (Object.keys(ARTIFACTS.winline ||  {}).length !== 0) {
            var winner = 1;
            var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
            turn.links[newstepid][result] = 'madeline';
          } else turn.links[newstepid].endturn = "start" + otherplayer;
          return newstep;
        };
      game.downhill1instruction =
        function(step) {
          var MARKS = step.MARKS;
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          var UNITDATA = step.UNITDATA;
          return ''
        };
      game.horisontal1 =
        function(turn, step) {
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
            var DIR = undefined;
            var walkedsquares = [];
            var POS = STARTPOS;
            while ((POS = connections[POS][DIR]) && allowedsteps[POS]) {
              walkedsquares.push(POS);
            }
            var WALKLENGTH = walkedsquares.length;
            if ((3 === WALKLENGTH)) {
              ARTIFACTS['winline'][POS] = {};
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
          if (Object.keys(UNITLAYERS.markers ||  {}).length === 0) {
            turn.blockedby = "nolegal";
          } else
          if (Object.keys(ARTIFACTS.winline ||  {}).length !== 0) {
            var winner = 1;
            var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
            turn.links[newstepid][result] = 'madeline';
          } else turn.links[newstepid].endturn = "start" + otherplayer;
          return newstep;
        };
      game.horisontal1instruction =
        function(step) {
          var MARKS = step.MARKS;
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          var UNITDATA = step.UNITDATA;
          return ''
        };
      game.vertical1 =
        function(turn, step) {
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
            var DIR = undefined;
            var walkedsquares = [];
            var POS = STARTPOS;
            while ((POS = connections[POS][DIR]) && allowedsteps[POS]) {
              walkedsquares.push(POS);
            }
            var WALKLENGTH = walkedsquares.length;
            if ((3 === WALKLENGTH)) {
              ARTIFACTS['winline'][POS] = {};
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
          if (Object.keys(UNITLAYERS.markers ||  {}).length === 0) {
            turn.blockedby = "nolegal";
          } else
          if (Object.keys(ARTIFACTS.winline ||  {}).length !== 0) {
            var winner = 1;
            var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
            turn.links[newstepid][result] = 'madeline';
          } else turn.links[newstepid].endturn = "start" + otherplayer;
          return newstep;
        };
      game.vertical1instruction =
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
          for (var linkpos in (Object.keys(UNITLAYERS.markers ||  {}).length === 0 ? BOARD.board : UNITLAYERS.markers)) {
            newlinks[linkpos] = 'selectdrop1';
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
      game.selectdrop2 =
        function(turn, step, markpos) {
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
          if (Object.keys(ARTIFACTS.uphill ||  {}).length !== 0) {
            turn.links[newstepid].uphill = 'uphill2';
          }
          if (Object.keys(ARTIFACTS.downhill ||  {}).length !== 0) {
            turn.links[newstepid].downhill = 'downhill2';
          }
          if (Object.keys(ARTIFACTS.vertical ||  {}).length !== 0) {
            turn.links[newstepid].vertical = 'vertical2';
          }
          if (Object.keys(ARTIFACTS.horisontal ||  {}).length !== 0) {
            turn.links[newstepid].horisontal = 'horisontal2';
          }
          return newstep;
        };
      game.selectdrop2instruction =
        function(step) {
          var MARKS = step.MARKS;
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          var UNITDATA = step.UNITDATA;
          return ''
        };
      game.uphill2 =
        function(turn, step) {
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
            var DIR = undefined;
            var walkedsquares = [];
            var POS = STARTPOS;
            while ((POS = connections[POS][DIR]) && allowedsteps[POS]) {
              walkedsquares.push(POS);
            }
            var WALKLENGTH = walkedsquares.length;
            if ((3 === WALKLENGTH)) {
              ARTIFACTS['winline'][POS] = {};
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
          if (Object.keys(UNITLAYERS.markers ||  {}).length === 0) {
            turn.blockedby = "nolegal";
          } else
          if (Object.keys(ARTIFACTS.winline ||  {}).length !== 0) {
            var winner = 2;
            var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
            turn.links[newstepid][result] = 'madeline';
          } else turn.links[newstepid].endturn = "start" + otherplayer;
          return newstep;
        };
      game.uphill2instruction =
        function(step) {
          var MARKS = step.MARKS;
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          var UNITDATA = step.UNITDATA;
          return ''
        };
      game.downhill2 =
        function(turn, step) {
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
            var DIR = undefined;
            var walkedsquares = [];
            var POS = STARTPOS;
            while ((POS = connections[POS][DIR]) && allowedsteps[POS]) {
              walkedsquares.push(POS);
            }
            var WALKLENGTH = walkedsquares.length;
            if ((3 === WALKLENGTH)) {
              ARTIFACTS['winline'][POS] = {};
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
          if (Object.keys(UNITLAYERS.markers ||  {}).length === 0) {
            turn.blockedby = "nolegal";
          } else
          if (Object.keys(ARTIFACTS.winline ||  {}).length !== 0) {
            var winner = 2;
            var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
            turn.links[newstepid][result] = 'madeline';
          } else turn.links[newstepid].endturn = "start" + otherplayer;
          return newstep;
        };
      game.downhill2instruction =
        function(step) {
          var MARKS = step.MARKS;
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          var UNITDATA = step.UNITDATA;
          return ''
        };
      game.horisontal2 =
        function(turn, step) {
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
            var DIR = undefined;
            var walkedsquares = [];
            var POS = STARTPOS;
            while ((POS = connections[POS][DIR]) && allowedsteps[POS]) {
              walkedsquares.push(POS);
            }
            var WALKLENGTH = walkedsquares.length;
            if ((3 === WALKLENGTH)) {
              ARTIFACTS['winline'][POS] = {};
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
          if (Object.keys(UNITLAYERS.markers ||  {}).length === 0) {
            turn.blockedby = "nolegal";
          } else
          if (Object.keys(ARTIFACTS.winline ||  {}).length !== 0) {
            var winner = 2;
            var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
            turn.links[newstepid][result] = 'madeline';
          } else turn.links[newstepid].endturn = "start" + otherplayer;
          return newstep;
        };
      game.horisontal2instruction =
        function(step) {
          var MARKS = step.MARKS;
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          var UNITDATA = step.UNITDATA;
          return ''
        };
      game.vertical2 =
        function(turn, step) {
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
            var DIR = undefined;
            var walkedsquares = [];
            var POS = STARTPOS;
            while ((POS = connections[POS][DIR]) && allowedsteps[POS]) {
              walkedsquares.push(POS);
            }
            var WALKLENGTH = walkedsquares.length;
            if ((3 === WALKLENGTH)) {
              ARTIFACTS['winline'][POS] = {};
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
          if (Object.keys(UNITLAYERS.markers ||  {}).length === 0) {
            turn.blockedby = "nolegal";
          } else
          if (Object.keys(ARTIFACTS.winline ||  {}).length !== 0) {
            var winner = 2;
            var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
            turn.links[newstepid][result] = 'madeline';
          } else turn.links[newstepid].endturn = "start" + otherplayer;
          return newstep;
        };
      game.vertical2instruction =
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
          for (var linkpos in (Object.keys(UNITLAYERS.markers ||  {}).length === 0 ? BOARD.board : UNITLAYERS.markers)) {
            newlinks[linkpos] = 'selectdrop2';
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
          UNITDATA: {}
          ,
          clones: 0
        };
        return game.start1(turnseed, stepseed);
      };
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
    return game;
  }
)()