(
  function() {
    var game = {};
    game.commands = {
      "deploy": 1,
      "promote": 1
    };
    game.graphics = {
      "icons": {
        "kings": "king",
        "pawns": "pawn",
        "bishops": "bishop"
      }
    };
    game.board = {
      "width": 4,
      "height": 3
    };
    game.AI = [];
    game.id = "semaphor";
    var boardDef = {
      "width": 4,
      "height": 3
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
      game.selectdeploytarget1 = function(turn, step, markpos) {
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
      game.selectdeploytarget1instruction = function(turn, step) {
        var MARKS = step.MARKS;
        return collapseLine({
          type: 'line',
          content: [{
            type: 'text',
            text: "Press"
          }, {
            type: 'cmndref',
            cmnd: "deploy"
          }, {
            type: 'text',
            text: "to place a pawn at"
          }, {
            type: 'posref',
            pos: MARKS["selectdeploytarget"]
          }]
        });
      };
      game.selectunit1 = function(turn, step, markpos) {
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
      game.selectunit1instruction = function(turn, step) {
        var MARKS = step.MARKS;
        var UNITLAYERS = step.UNITLAYERS;
        return collapseLine({
          type: 'line',
          content: [{
            type: 'text',
            text: "Press"
          }, {
            type: 'cmndref',
            cmnd: "promote"
          }, {
            type: 'text',
            text: "to turn the"
          }, (!!(UNITLAYERS.pawns[MARKS["selectunit"]]) ? {
            type: 'text',
            text: "pawn into a bishop"
          } : {
            type: 'text',
            text: "bishop into a king"
          })]
        });
      };
      game.deploy1 = function(turn, step) {
        var ARTIFACTS = {
          line: Object.assign({}, step.ARTIFACTS.line)
        };
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var clones = step.clones;
        var UNITLAYERS = step.UNITLAYERS;
        var newunitid = 'spawn' + (clones++);
        UNITDATA[newunitid] = {
          pos: MARKS["selectdeploytarget"],
          id: newunitid,
          group: "pawns",
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
          var allowedsteps = UNITLAYERS[(UNITLAYERS.units[STARTPOS] || {})["group"]];
          var allwalkerdirs = [1, 2, 3, 4];
          for (var walkerdirnbr = 0; walkerdirnbr < 4; walkerdirnbr++) {
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
              if ((WALKLENGTH > 2)) {
                ARTIFACTS["line"][POS] = {};
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
        if (Object.keys(ARTIFACTS.line).length !== 0) {
          var winner = 1;
          var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'madeline';
          turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
          turn.endMarks[newstepid].madeline = ARTIFACTS.line;
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.deploy1instruction = function(turn, step) {
        return {
          type: 'text',
          text: ""
        };
      };
      game.promote1 = function(turn, step) {
        var ARTIFACTS = {
          line: Object.assign({}, step.ARTIFACTS.line)
        };
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var UNITLAYERS = step.UNITLAYERS;
        var unitid = (UNITLAYERS.units[MARKS["selectunit"]]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            "group": (!!(UNITLAYERS.pawns[MARKS["selectunit"]]) ? "bishops" : "kings")
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
          var allowedsteps = UNITLAYERS[(UNITLAYERS.units[STARTPOS] || {})["group"]];
          var allwalkerdirs = [1, 2, 3, 4];
          for (var walkerdirnbr = 0; walkerdirnbr < 4; walkerdirnbr++) {
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
              if ((WALKLENGTH > 2)) {
                ARTIFACTS["line"][POS] = {};
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
        if (Object.keys(ARTIFACTS.line).length !== 0) {
          var winner = 1;
          var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'madeline';
          turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
          turn.endMarks[newstepid].madeline = ARTIFACTS.line;
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.promote1instruction = function(turn, step) {
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
      }
      game.start1instruction = function(turn, step) {
        var UNITLAYERS = step.UNITLAYERS;
        return collapseLine({
          type: 'line',
          content: [{
              type: 'text',
              text: "Select"
            },
            [{
              cond: (Object.keys(UNITLAYERS.units).length !== 12),
              content: {
                type: 'text',
                text: "an empty square to deploy to"
              }
            }, {
              cond: Object.keys(
                (function() {
                  var k, ret = {},
                    s0 = UNITLAYERS.bishops,
                    s1 = UNITLAYERS.pawns;
                  for (k in s0) {
                    ret[k] = 1;
                  }
                  for (k in s1) {
                    ret[k] = 1;
                  }
                  return ret;
                }())).length !== 0,
              content: collapseLine({
                type: 'line',
                content: [{
                    type: 'text',
                    text: "a"
                  },
                  [{
                    cond: Object.keys(UNITLAYERS.pawns).length !== 0,
                    content: {
                      type: "unittyperef",
                      alias: "pawn",
                      name: "pawn".replace(/s$/, '')
                    }
                  }, {
                    cond: Object.keys(UNITLAYERS.bishops).length !== 0,
                    content: {
                      type: "unittyperef",
                      alias: "bishop",
                      name: "bishop".replace(/s$/, '')
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
                    text: "to promote"
                  }
                ]
              })
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
            })
          ]
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
      game.selectdeploytarget2 = function(turn, step, markpos) {
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
      game.selectdeploytarget2instruction = function(turn, step) {
        var MARKS = step.MARKS;
        return collapseLine({
          type: 'line',
          content: [{
            type: 'text',
            text: "Press"
          }, {
            type: 'cmndref',
            cmnd: "deploy"
          }, {
            type: 'text',
            text: "to place a pawn at"
          }, {
            type: 'posref',
            pos: MARKS["selectdeploytarget"]
          }]
        });
      };
      game.selectunit2 = function(turn, step, markpos) {
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
      game.selectunit2instruction = function(turn, step) {
        var MARKS = step.MARKS;
        var UNITLAYERS = step.UNITLAYERS;
        return collapseLine({
          type: 'line',
          content: [{
            type: 'text',
            text: "Press"
          }, {
            type: 'cmndref',
            cmnd: "promote"
          }, {
            type: 'text',
            text: "to turn the"
          }, (!!(UNITLAYERS.pawns[MARKS["selectunit"]]) ? {
            type: 'text',
            text: "pawn into a bishop"
          } : {
            type: 'text',
            text: "bishop into a king"
          })]
        });
      };
      game.deploy2 = function(turn, step) {
        var ARTIFACTS = {
          line: Object.assign({}, step.ARTIFACTS.line)
        };
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var clones = step.clones;
        var UNITLAYERS = step.UNITLAYERS;
        var newunitid = 'spawn' + (clones++);
        UNITDATA[newunitid] = {
          pos: MARKS["selectdeploytarget"],
          id: newunitid,
          group: "pawns",
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
          var allowedsteps = UNITLAYERS[(UNITLAYERS.units[STARTPOS] || {})["group"]];
          var allwalkerdirs = [1, 2, 3, 4];
          for (var walkerdirnbr = 0; walkerdirnbr < 4; walkerdirnbr++) {
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
              if ((WALKLENGTH > 2)) {
                ARTIFACTS["line"][POS] = {};
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
        if (Object.keys(ARTIFACTS.line).length !== 0) {
          var winner = 2;
          var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'madeline';
          turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
          turn.endMarks[newstepid].madeline = ARTIFACTS.line;
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.deploy2instruction = function(turn, step) {
        return {
          type: 'text',
          text: ""
        };
      };
      game.promote2 = function(turn, step) {
        var ARTIFACTS = {
          line: Object.assign({}, step.ARTIFACTS.line)
        };
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var UNITLAYERS = step.UNITLAYERS;
        var unitid = (UNITLAYERS.units[MARKS["selectunit"]]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            "group": (!!(UNITLAYERS.pawns[MARKS["selectunit"]]) ? "bishops" : "kings")
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
          var allowedsteps = UNITLAYERS[(UNITLAYERS.units[STARTPOS] || {})["group"]];
          var allwalkerdirs = [1, 2, 3, 4];
          for (var walkerdirnbr = 0; walkerdirnbr < 4; walkerdirnbr++) {
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
              if ((WALKLENGTH > 2)) {
                ARTIFACTS["line"][POS] = {};
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
        if (Object.keys(ARTIFACTS.line).length !== 0) {
          var winner = 2;
          var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'madeline';
          turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
          turn.endMarks[newstepid].madeline = ARTIFACTS.line;
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.promote2instruction = function(turn, step) {
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
      }
      game.start2instruction = function(turn, step) {
        var UNITLAYERS = step.UNITLAYERS;
        return collapseLine({
          type: 'line',
          content: [{
              type: 'text',
              text: "Select"
            },
            [{
              cond: (Object.keys(UNITLAYERS.units).length !== 12),
              content: {
                type: 'text',
                text: "an empty square to deploy to"
              }
            }, {
              cond: Object.keys(
                (function() {
                  var k, ret = {},
                    s0 = UNITLAYERS.bishops,
                    s1 = UNITLAYERS.pawns;
                  for (k in s0) {
                    ret[k] = 1;
                  }
                  for (k in s1) {
                    ret[k] = 1;
                  }
                  return ret;
                }())).length !== 0,
              content: collapseLine({
                type: 'line',
                content: [{
                    type: 'text',
                    text: "a"
                  },
                  [{
                    cond: Object.keys(UNITLAYERS.pawns).length !== 0,
                    content: {
                      type: "unittyperef",
                      alias: "pawn",
                      name: "pawn".replace(/s$/, '')
                    }
                  }, {
                    cond: Object.keys(UNITLAYERS.bishops).length !== 0,
                    content: {
                      type: "unittyperef",
                      alias: "bishop",
                      name: "bishop".replace(/s$/, '')
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
                    text: "to promote"
                  }
                ]
              })
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
            })
          ]
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