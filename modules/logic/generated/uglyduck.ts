import fullDef from '../../games/dist/games/uglyduck';
import {
  relativedirs,
  reduce,
  pos2coords,
  coords2pos,
  boardPositions,
  offsetPos,
  posConnections,
  boardConnections,
  boardLayers,
  convertToEntities,
  deduceInitialUnitData,
  terrainLayers,
  mergeStrings,
  collapseLine
} from '../../common';
let game: any = {};
game.commands = {
  "move": 1
};
game.graphics = {
  "icons": {
    "soldiers": "pawn",
    "kings": "king"
  },
  "tiles": {
    "homerow": "playercolour"
  }
};
game.board = {
  "height": 5,
  "width": 5,
  "terrain": {
    "homerow": {
      "1": [
        ["rect", "a1", "e1"]
      ],
      "2": [
        ["rect", "a5", "e5"]
      ]
    }
  }
};
game.AI = [];
game.id = "uglyduck";
let connections = boardConnections(fullDef.board);
let BOARD = boardLayers(fullDef.board);
game.newGame = function() {
  let turnseed = {
    turn: 0
  };
  let stepseed = {
    UNITDATA: deduceInitialUnitData({
      "soldiers": {
        "1": [
          ["rect", "a1", "e1"]
        ],
        "2": [
          ["rect", "a5", "e5"]
        ]
      }
    })
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
{
  // Actions for player 1
  let TERRAIN = terrainLayers(fullDef.board, 1);
  let ownernames = ["neutral", "my", "opp"];
  let player = 1;
  let otherplayer = 2;
  game.selectunit1 = function(turn, step, markpos) {
    let ARTIFACTS = {
      movetargets: Object.assign({}, step.ARTIFACTS.movetargets)
    };
    let UNITLAYERS = step.UNITLAYERS;
    let MARKS = {
      selectunit: markpos
    };
    let STARTPOS = MARKS["selectunit"];
    let neighbourdirs = (!!(UNITLAYERS.mykings[MARKS["selectunit"]]) ? [4, 5, 6] : [8, 1, 2]);
    let startconnections = connections[STARTPOS];
    for (let dirnbr = 0; dirnbr < 3; dirnbr++) {
      let DIR = neighbourdirs[dirnbr];
      let POS = startconnections[DIR];
      if (POS && (((DIR === 1) || (DIR === 5)) ? !(UNITLAYERS.units[POS]) : !(UNITLAYERS.myunits[POS]))) {
        ARTIFACTS["movetargets"][POS] = {};
      }
    }
    let newstepid = step.stepid + '-' + markpos;
    let newstep = turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      stepid: newstepid,
      path: step.path.concat(markpos),
      name: 'selectunit'
    });
    turn.links[newstepid] = {};
    let newlinks = turn.links[newstepid];
    for (let linkpos in ARTIFACTS.movetargets) {
      newlinks[linkpos] = 'selectmovetarget1';
    }
    return newstep;
  };
  game.selectunit1instruction = function(turn, step) {
    let MARKS = step.MARKS;
    let UNITLAYERS = step.UNITLAYERS;
    return (!!(UNITLAYERS.mykings[MARKS["selectunit"]]) ? collapseLine({
      type: 'line',
      content: [{
        type: 'text',
        text: "Select a square closer to home to move your"
      }, {
        type: "unittyperef",
        alias: "king",
        name: "king".replace(/s$/, '')
      }, {
        type: 'text',
        text: "to"
      }]
    }) : collapseLine({
      type: 'line',
      content: [{
        type: 'text',
        text: "Select a square closer to the enemy lines to move your"
      }, {
        type: "unittyperef",
        alias: "pawn",
        name: "pawn".replace(/s$/, '')
      }, {
        type: 'text',
        text: "to"
      }]
    }));
  };
  game.selectmovetarget1 = function(turn, step, markpos) {
    let MARKS = {
      selectmovetarget: markpos,
      selectunit: step.MARKS.selectunit
    };
    let newstepid = step.stepid + '-' + markpos;
    let newstep = turn.steps[newstepid] = Object.assign({}, step, {
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
    let MARKS = step.MARKS;
    let UNITLAYERS = step.UNITLAYERS;
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
        text: "to"
      }, (!!(UNITLAYERS.mykings[MARKS["selectunit"]]) ? collapseLine({
        type: 'line',
        content: [{
          type: 'text',
          text: "retreat your"
        }, {
          type: "unittyperef",
          alias: "king",
          name: "king".replace(/s$/, '')
        }]
      }) : collapseLine({
        type: 'line',
        content: [{
          type: 'text',
          text: "advance your"
        }, {
          type: "unittyperef",
          alias: "pawn",
          name: "pawn".replace(/s$/, '')
        }]
      })), {
        type: 'text',
        text: "from"
      }, {
        type: 'posref',
        pos: MARKS["selectunit"]
      }, (!!(TERRAIN.opphomerow[MARKS["selectmovetarget"]]) ? collapseLine({
        type: 'line',
        content: [{
          type: 'text',
          text: "into the opponent base at"
        }, {
          type: 'posref',
          pos: MARKS["selectmovetarget"]
        }]
      }) : (!!(TERRAIN.myhomerow[MARKS["selectmovetarget"]]) ? collapseLine({
        type: 'line',
        content: [{
          type: 'text',
          text: "back home to"
        }, {
          type: 'posref',
          pos: MARKS["selectmovetarget"]
        }]
      }) : collapseLine({
        type: 'line',
        content: [{
          type: 'text',
          text: "to"
        }, {
          type: 'posref',
          pos: MARKS["selectmovetarget"]
        }]
      }))), !!(UNITLAYERS.oppunits[MARKS["selectmovetarget"]]) ? collapseLine({
        type: 'line',
        content: [{
          type: 'text',
          text: ", killing the enemy"
        }, {
          type: "unittyperef",
          name: game.graphics.icons[(UNITLAYERS.units[MARKS["selectmovetarget"]] || {})["group"]]
        }]
      }) : {
        type: 'nothing'
      }]
    });
  };
  game.move1 = function(turn, step) {
    let ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
    let MARKS = step.MARKS;
    let UNITDATA = Object.assign({}, step.UNITDATA);
    let UNITLAYERS = step.UNITLAYERS;
    if (!!(TERRAIN.opphomerow[MARKS["selectmovetarget"]])) {
      { 
        let unitid = (UNITLAYERS.units[MARKS["selectunit"]]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            "group": "kings"
          });
        }
      }
    } { 
      let unitid = (UNITLAYERS.units[MARKS["selectunit"]]  || {}).id;
      if (unitid) {
        UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
          "pos": MARKS["selectmovetarget"]
        });
        delete UNITDATA[(UNITLAYERS.units[MARKS["selectmovetarget"]]  || {}).id];
      }
    }
    MARKS = {};
    UNITLAYERS = {
      "soldiers": {},
      "mysoldiers": {},
      "oppsoldiers": {},
      "neutralsoldiers": {},
      "kings": {},
      "mykings": {},
      "oppkings": {},
      "neutralkings": {},
      "units": {},
      "myunits": {},
      "oppunits": {},
      "neutralunits": {}
    };
    for (let unitid in UNITDATA) {
      let currentunit = UNITDATA[unitid]
      let unitgroup = currentunit.group;
      let unitpos = currentunit.pos;
      let owner = ownernames[currentunit.owner]
      UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
    }
    ARTIFACTS = {
      "movetargets": {}
    };
    let newstepid = step.stepid + '-' + 'move';
    let newstep = turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      UNITDATA: UNITDATA,
      UNITLAYERS: UNITLAYERS,
      stepid: newstepid,
      name: 'move',
      path: step.path.concat('move')
    });
    turn.links[newstepid] = {};
    if (Object.keys(
        (function() {
          let ret = {},
            s0 = UNITLAYERS.mykings,
            s1 = TERRAIN.myhomerow;
          for (let key in s0) {
            if (s1[key]) {
              ret[key] = s0[key];
            }
          }
          return ret;
        }())).length !== 0) {
      let winner = 1;
      let result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
      turn.links[newstepid][result] = 'swanhome';
      turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
      turn.endMarks[newstepid].swanhome =
        (function() {
          let ret = {},
            s0 = UNITLAYERS.mykings,
            s1 = TERRAIN.myhomerow;
          for (let key in s0) {
            if (s1[key]) {
              ret[key] = s0[key];
            }
          }
          return ret;
        }());
    } else turn.links[newstepid].endturn = "start" + otherplayer;
    return newstep;
  }
  game.move1instruction = function(turn, step) {
    return {
      type: 'text',
      text: ""
    };
  };
  game.start1 = function(lastTurn, step) {
    let turn: {
      [f: string]: any
    } = {
      steps: {},
      player: player,
      turn: lastTurn.turn + 1,
      links: {
        root: {}
      },
      endMarks: {}
    };
    let MARKS = {};
    let ARTIFACTS = {
      "movetargets": {}
    };
    let UNITDATA = step.UNITDATA;
    let UNITLAYERS = {
      "soldiers": {},
      "mysoldiers": {},
      "oppsoldiers": {},
      "neutralsoldiers": {},
      "kings": {},
      "mykings": {},
      "oppkings": {},
      "neutralkings": {},
      "units": {},
      "myunits": {},
      "oppunits": {},
      "neutralunits": {}
    };
    for (let unitid in UNITDATA) {
      let currentunit = UNITDATA[unitid]
      let unitgroup = currentunit.group;
      let unitpos = currentunit.pos;
      let owner = ownernames[currentunit.owner]
      UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
    }
    let newstep = turn.steps.root = {
      ARTIFACTS: ARTIFACTS,
      UNITDATA: UNITDATA,
      UNITLAYERS: UNITLAYERS,
      MARKS: MARKS,
      stepid: 'root',
      name: 'start',
      path: []
    };
    let newlinks = turn.links.root;
    for (let linkpos in UNITLAYERS.myunits) {
      newlinks[linkpos] = 'selectunit1';
    }
    return turn;
  }
  game.start1instruction = function(turn, step) {
    let UNITLAYERS = step.UNITLAYERS;
    return collapseLine({
      type: 'line',
      content: [{
          type: 'text',
          text: "Select"
        },
        [{
          cond: Object.keys(UNITLAYERS.mysoldiers).length !== 0,
          content: collapseLine({
            type: 'line',
            content: [{
              type: 'text',
              text: "a"
            }, {
              type: "unittyperef",
              alias: "pawn",
              name: "pawn".replace(/s$/, '')
            }, {
              type: 'text',
              text: "to advance"
            }]
          })
        }, {
          cond: Object.keys(UNITLAYERS.mykings).length !== 0,
          content: collapseLine({
            type: 'line',
            content: [{
              type: 'text',
              text: "a"
            }, {
              type: "unittyperef",
              alias: "king",
              name: "king".replace(/s$/, '')
            }, {
              type: 'text',
              text: "to retreat"
            }]
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
};
{
  // Actions for player 2
  let TERRAIN = terrainLayers(fullDef.board, 2);
  let ownernames = ["neutral", "opp", "my"];
  let player = 2;
  let otherplayer = 1;
  game.selectunit2 = function(turn, step, markpos) {
    let ARTIFACTS = {
      movetargets: Object.assign({}, step.ARTIFACTS.movetargets)
    };
    let UNITLAYERS = step.UNITLAYERS;
    let MARKS = {
      selectunit: markpos
    };
    let STARTPOS = MARKS["selectunit"];
    let neighbourdirs = (!!(UNITLAYERS.mykings[MARKS["selectunit"]]) ? [8, 1, 2] : [4, 5, 6]);
    let startconnections = connections[STARTPOS];
    for (let dirnbr = 0; dirnbr < 3; dirnbr++) {
      let DIR = neighbourdirs[dirnbr];
      let POS = startconnections[DIR];
      if (POS && (((DIR === 1) || (DIR === 5)) ? !(UNITLAYERS.units[POS]) : !(UNITLAYERS.myunits[POS]))) {
        ARTIFACTS["movetargets"][POS] = {};
      }
    }
    let newstepid = step.stepid + '-' + markpos;
    let newstep = turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      stepid: newstepid,
      path: step.path.concat(markpos),
      name: 'selectunit'
    });
    turn.links[newstepid] = {};
    let newlinks = turn.links[newstepid];
    for (let linkpos in ARTIFACTS.movetargets) {
      newlinks[linkpos] = 'selectmovetarget2';
    }
    return newstep;
  };
  game.selectunit2instruction = function(turn, step) {
    let MARKS = step.MARKS;
    let UNITLAYERS = step.UNITLAYERS;
    return (!!(UNITLAYERS.mykings[MARKS["selectunit"]]) ? collapseLine({
      type: 'line',
      content: [{
        type: 'text',
        text: "Select a square closer to home to move your"
      }, {
        type: "unittyperef",
        alias: "king",
        name: "king".replace(/s$/, '')
      }, {
        type: 'text',
        text: "to"
      }]
    }) : collapseLine({
      type: 'line',
      content: [{
        type: 'text',
        text: "Select a square closer to the enemy lines to move your"
      }, {
        type: "unittyperef",
        alias: "pawn",
        name: "pawn".replace(/s$/, '')
      }, {
        type: 'text',
        text: "to"
      }]
    }));
  };
  game.selectmovetarget2 = function(turn, step, markpos) {
    let MARKS = {
      selectmovetarget: markpos,
      selectunit: step.MARKS.selectunit
    };
    let newstepid = step.stepid + '-' + markpos;
    let newstep = turn.steps[newstepid] = Object.assign({}, step, {
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
    let MARKS = step.MARKS;
    let UNITLAYERS = step.UNITLAYERS;
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
        text: "to"
      }, (!!(UNITLAYERS.mykings[MARKS["selectunit"]]) ? collapseLine({
        type: 'line',
        content: [{
          type: 'text',
          text: "retreat your"
        }, {
          type: "unittyperef",
          alias: "king",
          name: "king".replace(/s$/, '')
        }]
      }) : collapseLine({
        type: 'line',
        content: [{
          type: 'text',
          text: "advance your"
        }, {
          type: "unittyperef",
          alias: "pawn",
          name: "pawn".replace(/s$/, '')
        }]
      })), {
        type: 'text',
        text: "from"
      }, {
        type: 'posref',
        pos: MARKS["selectunit"]
      }, (!!(TERRAIN.opphomerow[MARKS["selectmovetarget"]]) ? collapseLine({
        type: 'line',
        content: [{
          type: 'text',
          text: "into the opponent base at"
        }, {
          type: 'posref',
          pos: MARKS["selectmovetarget"]
        }]
      }) : (!!(TERRAIN.myhomerow[MARKS["selectmovetarget"]]) ? collapseLine({
        type: 'line',
        content: [{
          type: 'text',
          text: "back home to"
        }, {
          type: 'posref',
          pos: MARKS["selectmovetarget"]
        }]
      }) : collapseLine({
        type: 'line',
        content: [{
          type: 'text',
          text: "to"
        }, {
          type: 'posref',
          pos: MARKS["selectmovetarget"]
        }]
      }))), !!(UNITLAYERS.oppunits[MARKS["selectmovetarget"]]) ? collapseLine({
        type: 'line',
        content: [{
          type: 'text',
          text: ", killing the enemy"
        }, {
          type: "unittyperef",
          name: game.graphics.icons[(UNITLAYERS.units[MARKS["selectmovetarget"]] || {})["group"]]
        }]
      }) : {
        type: 'nothing'
      }]
    });
  };
  game.move2 = function(turn, step) {
    let ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
    let MARKS = step.MARKS;
    let UNITDATA = Object.assign({}, step.UNITDATA);
    let UNITLAYERS = step.UNITLAYERS;
    if (!!(TERRAIN.opphomerow[MARKS["selectmovetarget"]])) {
      { 
        let unitid = (UNITLAYERS.units[MARKS["selectunit"]]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            "group": "kings"
          });
        }
      }
    } { 
      let unitid = (UNITLAYERS.units[MARKS["selectunit"]]  || {}).id;
      if (unitid) {
        UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
          "pos": MARKS["selectmovetarget"]
        });
        delete UNITDATA[(UNITLAYERS.units[MARKS["selectmovetarget"]]  || {}).id];
      }
    }
    MARKS = {};
    UNITLAYERS = {
      "soldiers": {},
      "mysoldiers": {},
      "oppsoldiers": {},
      "neutralsoldiers": {},
      "kings": {},
      "mykings": {},
      "oppkings": {},
      "neutralkings": {},
      "units": {},
      "myunits": {},
      "oppunits": {},
      "neutralunits": {}
    };
    for (let unitid in UNITDATA) {
      let currentunit = UNITDATA[unitid]
      let unitgroup = currentunit.group;
      let unitpos = currentunit.pos;
      let owner = ownernames[currentunit.owner]
      UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
    }
    ARTIFACTS = {
      "movetargets": {}
    };
    let newstepid = step.stepid + '-' + 'move';
    let newstep = turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      UNITDATA: UNITDATA,
      UNITLAYERS: UNITLAYERS,
      stepid: newstepid,
      name: 'move',
      path: step.path.concat('move')
    });
    turn.links[newstepid] = {};
    if (Object.keys(
        (function() {
          let ret = {},
            s0 = UNITLAYERS.mykings,
            s1 = TERRAIN.myhomerow;
          for (let key in s0) {
            if (s1[key]) {
              ret[key] = s0[key];
            }
          }
          return ret;
        }())).length !== 0) {
      let winner = 2;
      let result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
      turn.links[newstepid][result] = 'swanhome';
      turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
      turn.endMarks[newstepid].swanhome =
        (function() {
          let ret = {},
            s0 = UNITLAYERS.mykings,
            s1 = TERRAIN.myhomerow;
          for (let key in s0) {
            if (s1[key]) {
              ret[key] = s0[key];
            }
          }
          return ret;
        }());
    } else turn.links[newstepid].endturn = "start" + otherplayer;
    return newstep;
  }
  game.move2instruction = function(turn, step) {
    return {
      type: 'text',
      text: ""
    };
  };
  game.start2 = function(lastTurn, step) {
    let turn: {
      [f: string]: any
    } = {
      steps: {},
      player: player,
      turn: lastTurn.turn + 1,
      links: {
        root: {}
      },
      endMarks: {}
    };
    let MARKS = {};
    let ARTIFACTS = {
      "movetargets": {}
    };
    let UNITDATA = step.UNITDATA;
    let UNITLAYERS = {
      "soldiers": {},
      "mysoldiers": {},
      "oppsoldiers": {},
      "neutralsoldiers": {},
      "kings": {},
      "mykings": {},
      "oppkings": {},
      "neutralkings": {},
      "units": {},
      "myunits": {},
      "oppunits": {},
      "neutralunits": {}
    };
    for (let unitid in UNITDATA) {
      let currentunit = UNITDATA[unitid]
      let unitgroup = currentunit.group;
      let unitpos = currentunit.pos;
      let owner = ownernames[currentunit.owner]
      UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
    }
    let newstep = turn.steps.root = {
      ARTIFACTS: ARTIFACTS,
      UNITDATA: UNITDATA,
      UNITLAYERS: UNITLAYERS,
      MARKS: MARKS,
      stepid: 'root',
      name: 'start',
      path: []
    };
    let newlinks = turn.links.root;
    for (let linkpos in UNITLAYERS.myunits) {
      newlinks[linkpos] = 'selectunit2';
    }
    return turn;
  }
  game.start2instruction = function(turn, step) {
    let UNITLAYERS = step.UNITLAYERS;
    return collapseLine({
      type: 'line',
      content: [{
          type: 'text',
          text: "Select"
        },
        [{
          cond: Object.keys(UNITLAYERS.mysoldiers).length !== 0,
          content: collapseLine({
            type: 'line',
            content: [{
              type: 'text',
              text: "a"
            }, {
              type: "unittyperef",
              alias: "pawn",
              name: "pawn".replace(/s$/, '')
            }, {
              type: 'text',
              text: "to advance"
            }]
          })
        }, {
          cond: Object.keys(UNITLAYERS.mykings).length !== 0,
          content: collapseLine({
            type: 'line',
            content: [{
              type: 'text',
              text: "a"
            }, {
              type: "unittyperef",
              alias: "king",
              name: "king".replace(/s$/, '')
            }, {
              type: 'text',
              text: "to retreat"
            }]
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
};
export default game;