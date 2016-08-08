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
        "1": "a6",
        "2": "b6",
        "3": "b5",
        "4": "b4",
        "5": "a4"
      },
      "a6": {
        "3": "b6",
        "4": "b5",
        "5": "a5"
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
        "1": "b6",
        "2": "c6",
        "3": "c5",
        "4": "c4",
        "5": "b4",
        "6": "a4",
        "7": "a5",
        "8": "a6"
      },
      "b6": {
        "3": "c6",
        "4": "c5",
        "5": "b5",
        "6": "a5",
        "7": "a6"
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
        "1": "c6",
        "2": "d6",
        "3": "d5",
        "4": "d4",
        "5": "c4",
        "6": "b4",
        "7": "b5",
        "8": "b6"
      },
      "c6": {
        "3": "d6",
        "4": "d5",
        "5": "c5",
        "6": "b5",
        "7": "b6"
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
        "1": "d6",
        "2": "e6",
        "3": "e5",
        "4": "e4",
        "5": "d4",
        "6": "c4",
        "7": "c5",
        "8": "c6"
      },
      "d6": {
        "3": "e6",
        "4": "e5",
        "5": "d5",
        "6": "c5",
        "7": "c6"
      },
      "e1": {
        "1": "e2",
        "2": "f2",
        "3": "f1",
        "7": "d1",
        "8": "d2"
      },
      "e2": {
        "1": "e3",
        "2": "f3",
        "3": "f2",
        "4": "f1",
        "5": "e1",
        "6": "d1",
        "7": "d2",
        "8": "d3"
      },
      "e3": {
        "1": "e4",
        "2": "f4",
        "3": "f3",
        "4": "f2",
        "5": "e2",
        "6": "d2",
        "7": "d3",
        "8": "d4"
      },
      "e4": {
        "1": "e5",
        "2": "f5",
        "3": "f4",
        "4": "f3",
        "5": "e3",
        "6": "d3",
        "7": "d4",
        "8": "d5"
      },
      "e5": {
        "1": "e6",
        "2": "f6",
        "3": "f5",
        "4": "f4",
        "5": "e4",
        "6": "d4",
        "7": "d5",
        "8": "d6"
      },
      "e6": {
        "3": "f6",
        "4": "f5",
        "5": "e5",
        "6": "d5",
        "7": "d6"
      },
      "f1": {
        "1": "f2",
        "7": "e1",
        "8": "e2"
      },
      "f2": {
        "1": "f3",
        "5": "f1",
        "6": "e1",
        "7": "e2",
        "8": "e3"
      },
      "f3": {
        "1": "f4",
        "5": "f2",
        "6": "e2",
        "7": "e3",
        "8": "e4"
      },
      "f4": {
        "1": "f5",
        "5": "f3",
        "6": "e3",
        "7": "e4",
        "8": "e5"
      },
      "f5": {
        "1": "f6",
        "5": "f4",
        "6": "e4",
        "7": "e5",
        "8": "e6"
      },
      "f6": {
        "5": "f5",
        "6": "e5",
        "7": "e6"
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
        "a6": {
          "colour": "light",
          "pos": "a6",
          "x": 1,
          "y": 6
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
        "b6": {
          "colour": "dark",
          "pos": "b6",
          "x": 2,
          "y": 6
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
        "c6": {
          "colour": "light",
          "pos": "c6",
          "x": 3,
          "y": 6
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
        "d6": {
          "colour": "dark",
          "pos": "d6",
          "x": 4,
          "y": 6
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
        },
        "e6": {
          "colour": "light",
          "pos": "e6",
          "x": 5,
          "y": 6
        },
        "f1": {
          "colour": "light",
          "pos": "f1",
          "x": 6,
          "y": 1
        },
        "f2": {
          "colour": "dark",
          "pos": "f2",
          "x": 6,
          "y": 2
        },
        "f3": {
          "colour": "light",
          "pos": "f3",
          "x": 6,
          "y": 3
        },
        "f4": {
          "colour": "dark",
          "pos": "f4",
          "x": 6,
          "y": 4
        },
        "f5": {
          "colour": "light",
          "pos": "f5",
          "x": 6,
          "y": 5
        },
        "f6": {
          "colour": "dark",
          "pos": "f6",
          "x": 6,
          "y": 6
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
        "a6": {
          "colour": "light",
          "pos": "a6",
          "x": 1,
          "y": 6
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
        "c6": {
          "colour": "light",
          "pos": "c6",
          "x": 3,
          "y": 6
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
        },
        "e6": {
          "colour": "light",
          "pos": "e6",
          "x": 5,
          "y": 6
        },
        "f1": {
          "colour": "light",
          "pos": "f1",
          "x": 6,
          "y": 1
        },
        "f3": {
          "colour": "light",
          "pos": "f3",
          "x": 6,
          "y": 3
        },
        "f5": {
          "colour": "light",
          "pos": "f5",
          "x": 6,
          "y": 5
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
        "b6": {
          "colour": "dark",
          "pos": "b6",
          "x": 2,
          "y": 6
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
        "d6": {
          "colour": "dark",
          "pos": "d6",
          "x": 4,
          "y": 6
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
        },
        "f2": {
          "colour": "dark",
          "pos": "f2",
          "x": 6,
          "y": 2
        },
        "f4": {
          "colour": "dark",
          "pos": "f4",
          "x": 6,
          "y": 4
        },
        "f6": {
          "colour": "dark",
          "pos": "f6",
          "x": 6,
          "y": 6
        }
      }
    };
    var relativedirs = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    (function() {
      var TERRAIN = {
        "zone": {
          "b6": {
            "pos": "b6",
            "owner": 1
          },
          "c6": {
            "pos": "c6",
            "owner": 1
          },
          "d6": {
            "pos": "d6",
            "owner": 1
          },
          "e6": {
            "pos": "e6",
            "owner": 1
          },
          "f6": {
            "pos": "f6",
            "owner": 1
          },
          "a1": {
            "pos": "a1",
            "owner": 2
          },
          "a2": {
            "pos": "a2",
            "owner": 2
          },
          "a3": {
            "pos": "a3",
            "owner": 2
          },
          "a4": {
            "pos": "a4",
            "owner": 2
          },
          "a5": {
            "pos": "a5",
            "owner": 2
          }
        },
        "myzone": {
          "b6": {
            "pos": "b6",
            "owner": 1
          },
          "c6": {
            "pos": "c6",
            "owner": 1
          },
          "d6": {
            "pos": "d6",
            "owner": 1
          },
          "e6": {
            "pos": "e6",
            "owner": 1
          },
          "f6": {
            "pos": "f6",
            "owner": 1
          }
        },
        "oppzone": {
          "a1": {
            "pos": "a1",
            "owner": 2
          },
          "a2": {
            "pos": "a2",
            "owner": 2
          },
          "a3": {
            "pos": "a3",
            "owner": 2
          },
          "a4": {
            "pos": "a4",
            "owner": 2
          },
          "a5": {
            "pos": "a5",
            "owner": 2
          }
        },
        "corner": {
          "a6": {
            "pos": "a6"
          }
        }
      };
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
                owner: player
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
                ARTIFACTS[(!!(UNITLAYERS.mysoldiers[STARTPOS]) ? 'winline' : 'loseline')][POS] = {};
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
              if (!UNITLAYERS.sniper[walkedsquares[WALKLENGTH - 1]]) {
                ARTIFACTS['mandatory'][walkedsquares[WALKLENGTH - 1]] = {};
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
          return ''
        };
    })();
    (function() {
      var TERRAIN = {
        "zone": {
          "b6": {
            "pos": "b6",
            "owner": 1
          },
          "c6": {
            "pos": "c6",
            "owner": 1
          },
          "d6": {
            "pos": "d6",
            "owner": 1
          },
          "e6": {
            "pos": "e6",
            "owner": 1
          },
          "f6": {
            "pos": "f6",
            "owner": 1
          },
          "a1": {
            "pos": "a1",
            "owner": 2
          },
          "a2": {
            "pos": "a2",
            "owner": 2
          },
          "a3": {
            "pos": "a3",
            "owner": 2
          },
          "a4": {
            "pos": "a4",
            "owner": 2
          },
          "a5": {
            "pos": "a5",
            "owner": 2
          }
        },
        "oppzone": {
          "b6": {
            "pos": "b6",
            "owner": 1
          },
          "c6": {
            "pos": "c6",
            "owner": 1
          },
          "d6": {
            "pos": "d6",
            "owner": 1
          },
          "e6": {
            "pos": "e6",
            "owner": 1
          },
          "f6": {
            "pos": "f6",
            "owner": 1
          }
        },
        "myzone": {
          "a1": {
            "pos": "a1",
            "owner": 2
          },
          "a2": {
            "pos": "a2",
            "owner": 2
          },
          "a3": {
            "pos": "a3",
            "owner": 2
          },
          "a4": {
            "pos": "a4",
            "owner": 2
          },
          "a5": {
            "pos": "a5",
            "owner": 2
          }
        },
        "corner": {
          "a6": {
            "pos": "a6"
          }
        }
      };
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
                owner: player
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
                ARTIFACTS[(!!(UNITLAYERS.mysoldiers[STARTPOS]) ? 'winline' : 'loseline')][POS] = {};
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
              if (!UNITLAYERS.sniper[walkedsquares[WALKLENGTH - 1]]) {
                ARTIFACTS['mandatory'][walkedsquares[WALKLENGTH - 1]] = {};
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
    return game;
  }
)()