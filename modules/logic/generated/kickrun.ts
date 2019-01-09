import fullDef from '../../games/dist/games/kickrun';
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
const emptyArtifactLayer = {
  "movetargets": {}
};
game.commands = {
  "move": 1
};
game.graphics = {
  "tiles": {
    "corners": "playercolour"
  },
  "icons": {
    "runners": "bishop",
    "sidekickers": "pawn"
  }
};
game.board = {
  "height": 5,
  "width": 5,
  "terrain": {
    "corners": {
      "1": ["a1"],
      "2": ["e5"]
    }
  }
};
game.AI = [];
game.id = "kickrun";
let connections = boardConnections(fullDef.board);
let BOARD = boardLayers(fullDef.board);
game.newGame = function() {
  let turnseed = {
    turn: 0
  };
  let stepseed = {
    UNITDATA: deduceInitialUnitData(fullDef.setup)
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
    let ARTIFACTS = step.ARTIFACTS;
    let UNITLAYERS = step.UNITLAYERS;
    let MARKS = {
      selectunit: markpos
    };
    let BLOCKS = UNITLAYERS.units;
    let STARTPOS = MARKS["selectunit"];
    let allwalkerdirs = (!!(UNITLAYERS.myrunners[MARKS["selectunit"]]) ? [1, 2, 3] : [8, 1, 3, 4]);
    let nbrofwalkerdirs = allwalkerdirs.length;
    for (let walkerdirnbr = 0; walkerdirnbr < nbrofwalkerdirs; walkerdirnbr++) {
      let DIR = allwalkerdirs[walkerdirnbr];
      let STOPREASON = "";
      let MAX = (!!(UNITLAYERS.myrunners[MARKS["selectunit"]]) ? 4 : 1);
      let POS = STARTPOS;
      let LENGTH = 0;
      while (!(STOPREASON = (LENGTH === MAX ? "reachedmax" : !(POS = connections[POS][DIR]) ? "outofbounds" : BLOCKS[POS] ? "hitblock" : null))) {
        LENGTH++;
        if (((DIR !== 8) && (DIR !== 4))) {
          ARTIFACTS = {
            ...ARTIFACTS,
            ["movetargets"]: {
              ...ARTIFACTS["movetargets"],
              [POS]: {}
            }
          }
        }
      }
      if (BLOCKS[POS]) {
        if ((!!(UNITLAYERS.oppunits[POS]) && ((DIR === 8) || (DIR === 4)))) {
          ARTIFACTS = {
            ...ARTIFACTS,
            ["movetargets"]: {
              ...ARTIFACTS["movetargets"],
              [POS]: {}
            }
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
    for (let linkpos in ARTIFACTS.movetargets) {
      newlinks[linkpos] = 'selectmovetarget1';
    }
    return newstep;
  };
  game.selectunit1instruction = function(turn, step) {
    let MARKS = step.MARKS;
    let UNITLAYERS = step.UNITLAYERS;
    return (!!(UNITLAYERS.runners[MARKS["selectunit"]]) ? collapseLine({
      type: 'line',
      content: [{
        type: 'text',
        text: "Select where to move your"
      }, {
        type: 'posref',
        pos: MARKS["selectunit"]
      }, {
        type: "unittyperef",
        alias: "bishop",
        name: "bishop".replace(/s$/, '')
      }]
    }) : collapseLine({
      type: 'line',
      content: [{
        type: 'text',
        text: "Select where to move your"
      }, {
        type: 'posref',
        pos: MARKS["selectunit"]
      }, {
        type: "unittyperef",
        alias: "pawn",
        name: "pawn".replace(/s$/, '')
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
      }, (!!(UNITLAYERS.runners[MARKS["selectunit"]]) ? collapseLine({
        type: 'line',
        content: [{
          type: 'text',
          text: "slide your bishop from"
        }, {
          type: 'posref',
          pos: MARKS["selectunit"]
        }, {
          type: 'text',
          text: "to"
        }, {
          type: 'posref',
          pos: MARKS["selectmovetarget"]
        }]
      }) : collapseLine({
        type: 'line',
        content: [{
          type: 'text',
          text: "move your pawn from"
        }, {
          type: 'posref',
          pos: MARKS["selectunit"]
        }, {
          type: 'text',
          text: "to"
        }, {
          type: 'posref',
          pos: MARKS["selectmovetarget"]
        }, !!(UNITLAYERS.units[MARKS["selectmovetarget"]]) ? {
          type: 'text',
          text: "and capture the enemy there"
        } : {
          type: 'nothing'
        }]
      }))]
    });
  };
  game.move1 = function(turn, step) {
    let ARTIFACTS = step.ARTIFACTS;
    let MARKS = step.MARKS;
    let UNITDATA = Object.assign({}, step.UNITDATA);
    let UNITLAYERS = step.UNITLAYERS;
    let unitid = (UNITLAYERS.units[MARKS["selectunit"]]  || {}).id;
    if (unitid) {
      UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
        "pos": MARKS["selectmovetarget"]
      });
      delete UNITDATA[(UNITLAYERS.units[MARKS["selectmovetarget"]]  || {}).id];
    }
    MARKS = {};
    UNITLAYERS = {
      "runners": {},
      "myrunners": {},
      "opprunners": {},
      "neutralrunners": {},
      "sidekickers": {},
      "mysidekickers": {},
      "oppsidekickers": {},
      "neutralsidekickers": {},
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
            s0 = UNITLAYERS.myrunners,
            s1 = TERRAIN.oppcorners;
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
            s0 = UNITLAYERS.myrunners,
            s1 = TERRAIN.oppcorners;
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
    let ARTIFACTS = emptyArtifactLayer;
    let UNITDATA = step.UNITDATA;
    let UNITLAYERS = {
      "runners": {},
      "myrunners": {},
      "opprunners": {},
      "neutralrunners": {},
      "sidekickers": {},
      "mysidekickers": {},
      "oppsidekickers": {},
      "neutralsidekickers": {},
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
    return {
      type: 'text',
      text: "Select which unit to move"
    };
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
    let ARTIFACTS = step.ARTIFACTS;
    let UNITLAYERS = step.UNITLAYERS;
    let MARKS = {
      selectunit: markpos
    };
    let BLOCKS = UNITLAYERS.units;
    let STARTPOS = MARKS["selectunit"];
    let allwalkerdirs = (!!(UNITLAYERS.myrunners[MARKS["selectunit"]]) ? [5, 6, 7] : [4, 5, 7, 8]);
    let nbrofwalkerdirs = allwalkerdirs.length;
    for (let walkerdirnbr = 0; walkerdirnbr < nbrofwalkerdirs; walkerdirnbr++) {
      let DIR = allwalkerdirs[walkerdirnbr];
      let STOPREASON = "";
      let MAX = (!!(UNITLAYERS.myrunners[MARKS["selectunit"]]) ? 4 : 1);
      let POS = STARTPOS;
      let LENGTH = 0;
      while (!(STOPREASON = (LENGTH === MAX ? "reachedmax" : !(POS = connections[POS][DIR]) ? "outofbounds" : BLOCKS[POS] ? "hitblock" : null))) {
        LENGTH++;
        if (((DIR !== 8) && (DIR !== 4))) {
          ARTIFACTS = {
            ...ARTIFACTS,
            ["movetargets"]: {
              ...ARTIFACTS["movetargets"],
              [POS]: {}
            }
          }
        }
      }
      if (BLOCKS[POS]) {
        if ((!!(UNITLAYERS.oppunits[POS]) && ((DIR === 8) || (DIR === 4)))) {
          ARTIFACTS = {
            ...ARTIFACTS,
            ["movetargets"]: {
              ...ARTIFACTS["movetargets"],
              [POS]: {}
            }
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
    for (let linkpos in ARTIFACTS.movetargets) {
      newlinks[linkpos] = 'selectmovetarget2';
    }
    return newstep;
  };
  game.selectunit2instruction = function(turn, step) {
    let MARKS = step.MARKS;
    let UNITLAYERS = step.UNITLAYERS;
    return (!!(UNITLAYERS.runners[MARKS["selectunit"]]) ? collapseLine({
      type: 'line',
      content: [{
        type: 'text',
        text: "Select where to move your"
      }, {
        type: 'posref',
        pos: MARKS["selectunit"]
      }, {
        type: "unittyperef",
        alias: "bishop",
        name: "bishop".replace(/s$/, '')
      }]
    }) : collapseLine({
      type: 'line',
      content: [{
        type: 'text',
        text: "Select where to move your"
      }, {
        type: 'posref',
        pos: MARKS["selectunit"]
      }, {
        type: "unittyperef",
        alias: "pawn",
        name: "pawn".replace(/s$/, '')
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
      }, (!!(UNITLAYERS.runners[MARKS["selectunit"]]) ? collapseLine({
        type: 'line',
        content: [{
          type: 'text',
          text: "slide your bishop from"
        }, {
          type: 'posref',
          pos: MARKS["selectunit"]
        }, {
          type: 'text',
          text: "to"
        }, {
          type: 'posref',
          pos: MARKS["selectmovetarget"]
        }]
      }) : collapseLine({
        type: 'line',
        content: [{
          type: 'text',
          text: "move your pawn from"
        }, {
          type: 'posref',
          pos: MARKS["selectunit"]
        }, {
          type: 'text',
          text: "to"
        }, {
          type: 'posref',
          pos: MARKS["selectmovetarget"]
        }, !!(UNITLAYERS.units[MARKS["selectmovetarget"]]) ? {
          type: 'text',
          text: "and capture the enemy there"
        } : {
          type: 'nothing'
        }]
      }))]
    });
  };
  game.move2 = function(turn, step) {
    let ARTIFACTS = step.ARTIFACTS;
    let MARKS = step.MARKS;
    let UNITDATA = Object.assign({}, step.UNITDATA);
    let UNITLAYERS = step.UNITLAYERS;
    let unitid = (UNITLAYERS.units[MARKS["selectunit"]]  || {}).id;
    if (unitid) {
      UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
        "pos": MARKS["selectmovetarget"]
      });
      delete UNITDATA[(UNITLAYERS.units[MARKS["selectmovetarget"]]  || {}).id];
    }
    MARKS = {};
    UNITLAYERS = {
      "runners": {},
      "myrunners": {},
      "opprunners": {},
      "neutralrunners": {},
      "sidekickers": {},
      "mysidekickers": {},
      "oppsidekickers": {},
      "neutralsidekickers": {},
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
            s0 = UNITLAYERS.myrunners,
            s1 = TERRAIN.oppcorners;
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
            s0 = UNITLAYERS.myrunners,
            s1 = TERRAIN.oppcorners;
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
    let ARTIFACTS = emptyArtifactLayer;
    let UNITDATA = step.UNITDATA;
    let UNITLAYERS = {
      "runners": {},
      "myrunners": {},
      "opprunners": {},
      "neutralrunners": {},
      "sidekickers": {},
      "mysidekickers": {},
      "oppsidekickers": {},
      "neutralsidekickers": {},
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
    return {
      type: 'text',
      text: "Select which unit to move"
    };
  };
  game.debug2 = function() {
    return {
      TERRAIN: TERRAIN
    };
  }
};
export default game;