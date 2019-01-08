import fullDef from '../../games/dist/games/daggers';
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
  "tiles": {
    "base": "playercolour"
  },
  "icons": {
    "daggers": "bishop",
    "crowns": "king"
  }
};
game.board = {
  "height": 8,
  "width": 8,
  "terrain": {
    "base": {
      "1": [
        ["rect", "a8", "h8"]
      ],
      "2": [
        ["rect", "a1", "h1"]
      ]
    }
  }
};
game.AI = [];
game.id = "daggers";
let connections = boardConnections(fullDef.board);
let BOARD = boardLayers(fullDef.board);
game.newGame = function() {
  let turnseed = {
    turn: 0
  };
  let stepseed = {
    UNITDATA: deduceInitialUnitData({
      "crowns": {
        "1": ["d8", "e8"],
        "2": ["c1", "f1"]
      },
      "daggers": {
        "1": [
          ["rect", "c7", "f7"]
        ],
        "2": ["c3", "f3", ["rect", "b2", "g2"]]
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
      movetarget: Object.assign({}, step.ARTIFACTS.movetarget)
    };
    let UNITLAYERS = step.UNITLAYERS;
    let MARKS = {
      selectunit: markpos
    };
    if (!!(UNITLAYERS.mycrowns[MARKS["selectunit"]])) {
      let STARTPOS = MARKS["selectunit"];
      let neighbourdirs = [1, 2, 3, 4, 5, 6, 7, 8];
      let startconnections = connections[STARTPOS];
      for (let dirnbr = 0; dirnbr < 8; dirnbr++) {
        let POS = startconnections[neighbourdirs[dirnbr]];
        if (POS) {
          if (!(UNITLAYERS.myunits[POS])) {
            ARTIFACTS["movetarget"][POS] = {};
          }
        }
      }
    } else {
      let BLOCKS = UNITLAYERS.units;
      let STARTPOS = MARKS["selectunit"];
      let allwalkerdirs = [8, 1, 2, 4, 5, 6];
      for (let walkerdirnbr = 0; walkerdirnbr < 6; walkerdirnbr++) {
        let DIR = allwalkerdirs[walkerdirnbr];
        let STOPREASON = "";
        let MAX = (([8, 1, 2].indexOf(DIR) !== -1) ? 1 : 8);
        let POS = STARTPOS;
        let LENGTH = 0;
        while (!(STOPREASON = (LENGTH === MAX ? "reachedmax" : !(POS = connections[POS][DIR]) ? "outofbounds" : BLOCKS[POS] ? "hitblock" : null))) {
          LENGTH++;
          ARTIFACTS["movetarget"][POS] = {};
        }
        if (BLOCKS[POS]) {
          if ((!(UNITLAYERS.myunits[POS]) && !(([1, 5].indexOf(DIR) !== -1) && !!(UNITLAYERS.oppdaggers[POS])))) {
            ARTIFACTS["movetarget"][POS] = {};
          }
        }
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
    for (let linkpos in ARTIFACTS.movetarget) {
      newlinks[linkpos] = 'selectmovetarget1';
    }
    return newstep;
  };
  game.selectunit1instruction = function(turn, step) {
    let MARKS = step.MARKS;
    let UNITLAYERS = step.UNITLAYERS;
    return collapseLine({
      type: 'line',
      content: [{
        type: 'text',
        text: "Select where to move the"
      }, {
        type: 'posref',
        pos: MARKS["selectunit"]
      }, {
        type: "unittyperef",
        name: game.graphics.icons[(UNITLAYERS.units[MARKS["selectunit"]] || {})["group"]]
      }]
    });
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
        text: "to go"
      }, ((BOARD.board[MARKS["selectmovetarget"]].y > BOARD.board[MARKS["selectunit"]].y) ? {
        type: "conceptref",
        name: "uphill"
      } : (BOARD.board[MARKS["selectunit"]].y > BOARD.board[MARKS["selectmovetarget"]].y) ? {
        type: "conceptref",
        name: "downhill"
      } : {
        type: 'nothing'
      }), {
        type: 'text',
        text: "from"
      }, {
        type: 'posref',
        pos: MARKS["selectunit"]
      }, (!!(UNITLAYERS.units[MARKS["selectmovetarget"]]) ? collapseLine({
        type: 'line',
        content: [{
          type: 'text',
          text: "and kill the enemy"
        }, {
          type: "unittyperef",
          name: game.graphics.icons[(UNITLAYERS.units[MARKS["selectmovetarget"]] || {})["group"]]
        }, {
          type: 'text',
          text: "at"
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
      }))]
    });
  };
  game.move1 = function(turn, step) {
    let ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
    let MARKS = step.MARKS;
    let UNITDATA = Object.assign({}, step.UNITDATA);
    let UNITLAYERS = step.UNITLAYERS;
    { 
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
      "crowns": {},
      "mycrowns": {},
      "oppcrowns": {},
      "neutralcrowns": {},
      "daggers": {},
      "mydaggers": {},
      "oppdaggers": {},
      "neutraldaggers": {},
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
      "movetarget": {}
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
            s0 = UNITLAYERS.mycrowns,
            s1 = TERRAIN.oppbase;
          for (let key in s0) {
            if (s1[key]) {
              ret[key] = s0[key];
            }
          }
          return ret;
        }())).length !== 0) {
      let winner = 1;
      let result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
      turn.links[newstepid][result] = 'infiltration';
      turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
      turn.endMarks[newstepid].infiltration =
        (function() {
          let ret = {},
            s0 = UNITLAYERS.mycrowns,
            s1 = TERRAIN.oppbase;
          for (let key in s0) {
            if (s1[key]) {
              ret[key] = s0[key];
            }
          }
          return ret;
        }());
    } else
    if ((Object.keys(UNITLAYERS.oppcrowns).length === 1)) {
      let winner = 1;
      let result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
      turn.links[newstepid][result] = 'regicide';
    } else turn.links[newstepid].endturn = "start" + otherplayer;
    return newstep;
  }
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
      "movetarget": {}
    };
    let UNITDATA = step.UNITDATA;
    let UNITLAYERS = {
      "crowns": {},
      "mycrowns": {},
      "oppcrowns": {},
      "neutralcrowns": {},
      "daggers": {},
      "mydaggers": {},
      "oppdaggers": {},
      "neutraldaggers": {},
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
    return collapseLine({
      type: 'line',
      content: [{
        type: 'text',
        text: "Select a"
      }, {
        type: "unittyperef",
        alias: "bishop",
        name: "bishop".replace(/s$/, '')
      }, {
        type: 'text',
        text: "or"
      }, {
        type: "unittyperef",
        alias: "king",
        name: "king".replace(/s$/, '')
      }, {
        type: 'text',
        text: "to move"
      }]
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
      movetarget: Object.assign({}, step.ARTIFACTS.movetarget)
    };
    let UNITLAYERS = step.UNITLAYERS;
    let MARKS = {
      selectunit: markpos
    };
    if (!!(UNITLAYERS.mycrowns[MARKS["selectunit"]])) {
      let STARTPOS = MARKS["selectunit"];
      let neighbourdirs = [1, 2, 3, 4, 5, 6, 7, 8];
      let startconnections = connections[STARTPOS];
      for (let dirnbr = 0; dirnbr < 8; dirnbr++) {
        let POS = startconnections[neighbourdirs[dirnbr]];
        if (POS) {
          if (!(UNITLAYERS.myunits[POS])) {
            ARTIFACTS["movetarget"][POS] = {};
          }
        }
      }
    } else {
      let BLOCKS = UNITLAYERS.units;
      let STARTPOS = MARKS["selectunit"];
      let allwalkerdirs = [8, 1, 2, 4, 5, 6];
      for (let walkerdirnbr = 0; walkerdirnbr < 6; walkerdirnbr++) {
        let DIR = allwalkerdirs[walkerdirnbr];
        let STOPREASON = "";
        let MAX = (([8, 1, 2].indexOf(DIR) !== -1) ? 1 : 8);
        let POS = STARTPOS;
        let LENGTH = 0;
        while (!(STOPREASON = (LENGTH === MAX ? "reachedmax" : !(POS = connections[POS][DIR]) ? "outofbounds" : BLOCKS[POS] ? "hitblock" : null))) {
          LENGTH++;
          ARTIFACTS["movetarget"][POS] = {};
        }
        if (BLOCKS[POS]) {
          if ((!(UNITLAYERS.myunits[POS]) && !(([1, 5].indexOf(DIR) !== -1) && !!(UNITLAYERS.oppdaggers[POS])))) {
            ARTIFACTS["movetarget"][POS] = {};
          }
        }
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
    for (let linkpos in ARTIFACTS.movetarget) {
      newlinks[linkpos] = 'selectmovetarget2';
    }
    return newstep;
  };
  game.selectunit2instruction = function(turn, step) {
    let MARKS = step.MARKS;
    let UNITLAYERS = step.UNITLAYERS;
    return collapseLine({
      type: 'line',
      content: [{
        type: 'text',
        text: "Select where to move the"
      }, {
        type: 'posref',
        pos: MARKS["selectunit"]
      }, {
        type: "unittyperef",
        name: game.graphics.icons[(UNITLAYERS.units[MARKS["selectunit"]] || {})["group"]]
      }]
    });
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
        text: "to go"
      }, ((BOARD.board[MARKS["selectmovetarget"]].y > BOARD.board[MARKS["selectunit"]].y) ? {
        type: "conceptref",
        name: "uphill"
      } : (BOARD.board[MARKS["selectunit"]].y > BOARD.board[MARKS["selectmovetarget"]].y) ? {
        type: "conceptref",
        name: "downhill"
      } : {
        type: 'nothing'
      }), {
        type: 'text',
        text: "from"
      }, {
        type: 'posref',
        pos: MARKS["selectunit"]
      }, (!!(UNITLAYERS.units[MARKS["selectmovetarget"]]) ? collapseLine({
        type: 'line',
        content: [{
          type: 'text',
          text: "and kill the enemy"
        }, {
          type: "unittyperef",
          name: game.graphics.icons[(UNITLAYERS.units[MARKS["selectmovetarget"]] || {})["group"]]
        }, {
          type: 'text',
          text: "at"
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
      }))]
    });
  };
  game.move2 = function(turn, step) {
    let ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
    let MARKS = step.MARKS;
    let UNITDATA = Object.assign({}, step.UNITDATA);
    let UNITLAYERS = step.UNITLAYERS;
    { 
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
      "crowns": {},
      "mycrowns": {},
      "oppcrowns": {},
      "neutralcrowns": {},
      "daggers": {},
      "mydaggers": {},
      "oppdaggers": {},
      "neutraldaggers": {},
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
      "movetarget": {}
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
            s0 = UNITLAYERS.mycrowns,
            s1 = TERRAIN.oppbase;
          for (let key in s0) {
            if (s1[key]) {
              ret[key] = s0[key];
            }
          }
          return ret;
        }())).length !== 0) {
      let winner = 2;
      let result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
      turn.links[newstepid][result] = 'infiltration';
      turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
      turn.endMarks[newstepid].infiltration =
        (function() {
          let ret = {},
            s0 = UNITLAYERS.mycrowns,
            s1 = TERRAIN.oppbase;
          for (let key in s0) {
            if (s1[key]) {
              ret[key] = s0[key];
            }
          }
          return ret;
        }());
    } else
    if ((Object.keys(UNITLAYERS.oppcrowns).length === 1)) {
      let winner = 2;
      let result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
      turn.links[newstepid][result] = 'regicide';
    } else turn.links[newstepid].endturn = "start" + otherplayer;
    return newstep;
  }
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
      "movetarget": {}
    };
    let UNITDATA = step.UNITDATA;
    let UNITLAYERS = {
      "crowns": {},
      "mycrowns": {},
      "oppcrowns": {},
      "neutralcrowns": {},
      "daggers": {},
      "mydaggers": {},
      "oppdaggers": {},
      "neutraldaggers": {},
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
    return collapseLine({
      type: 'line',
      content: [{
        type: 'text',
        text: "Select a"
      }, {
        type: "unittyperef",
        alias: "bishop",
        name: "bishop".replace(/s$/, '')
      }, {
        type: 'text',
        text: "or"
      }, {
        type: "unittyperef",
        alias: "king",
        name: "king".replace(/s$/, '')
      }, {
        type: 'text',
        text: "to move"
      }]
    });
  };
  game.debug2 = function() {
    return {
      TERRAIN: TERRAIN
    };
  }
};
export default game;