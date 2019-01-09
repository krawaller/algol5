import fullDef from '../../games/dist/games/_test';
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
  "marks": {},
  "blocks": {}
};
game.commands = {};
game.graphics = {
  "icons": {
    "stepsfirsts": "queen",
    "blocksfirsts": "queen",
    "defaultfirsts": "queen",
    "noblocks": "queen",
    "pawns": "pawn"
  },
  "tiles": {
    "steps": "grass"
  }
};
game.board = {
  "height": 10,
  "width": 10,
  "terrain": {
    "steps": [
      ["rect", "a1", "d4"]
    ]
  }
};
game.AI = [];
game.id = "_test";
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
    }; {
      let allowedsteps = TERRAIN.steps;
      let BLOCKS = UNITLAYERS.units;
      let walkstarts =
        (function() {
          let ret = {},
            s0 = UNITLAYERS.mystepsfirsts,
            s1 =
            (function() {
              let ret = {};
              ret[MARKS["selectunit"]] = 1;
              return ret;
            }());
          for (let key in s0) {
            if (s1[key]) {
              ret[key] = s0[key];
            }
          }
          return ret;
        }());
      for (let STARTPOS in walkstarts) {
        let allwalkerdirs = [1, 5];
        for (let walkerdirnbr = 0; walkerdirnbr < 2; walkerdirnbr++) {
          let STOPREASON = "";
          let POS = STARTPOS;
          while (!(STOPREASON = (!(POS = connections[POS][allwalkerdirs[walkerdirnbr]]) ? "outofbounds" : !allowedsteps[POS] ? "nomoresteps" : BLOCKS[POS] ? "hitblock" : null))) {
            ARTIFACTS = {
              ...ARTIFACTS,
              ["marks"]: {
                ...ARTIFACTS["marks"],
                [POS]: {}
              }
            }
          }
          if (BLOCKS[POS] && allowedsteps[POS]) {
            ARTIFACTS = {
              ...ARTIFACTS,
              ["blocks"]: {
                ...ARTIFACTS["blocks"],
                [POS]: {}
              }
            }
          }
        }
      }
    } {
      let allowedsteps = TERRAIN.steps;
      let BLOCKS = UNITLAYERS.units;
      let walkstarts =
        (function() {
          let ret = {},
            s0 = UNITLAYERS.myblocksfirsts,
            s1 =
            (function() {
              let ret = {};
              ret[MARKS["selectunit"]] = 1;
              return ret;
            }());
          for (let key in s0) {
            if (s1[key]) {
              ret[key] = s0[key];
            }
          }
          return ret;
        }());
      for (let STARTPOS in walkstarts) {
        let allwalkerdirs = [1, 5];
        for (let walkerdirnbr = 0; walkerdirnbr < 2; walkerdirnbr++) {
          let STOPREASON = "";
          let POS = STARTPOS;
          while (!(STOPREASON = (!(POS = connections[POS][allwalkerdirs[walkerdirnbr]]) ? "outofbounds" : BLOCKS[POS] ? "hitblock" : !allowedsteps[POS] ? "nomoresteps" : null))) {
            ARTIFACTS = {
              ...ARTIFACTS,
              ["marks"]: {
                ...ARTIFACTS["marks"],
                [POS]: {}
              }
            }
          }
          if (BLOCKS[POS]) {
            ARTIFACTS = {
              ...ARTIFACTS,
              ["blocks"]: {
                ...ARTIFACTS["blocks"],
                [POS]: {}
              }
            }
          }
        }
      }
    } {
      let allowedsteps = TERRAIN.steps;
      let BLOCKS = UNITLAYERS.units;
      let walkstarts =
        (function() {
          let ret = {},
            s0 = UNITLAYERS.mydefaultfirsts,
            s1 =
            (function() {
              let ret = {};
              ret[MARKS["selectunit"]] = 1;
              return ret;
            }());
          for (let key in s0) {
            if (s1[key]) {
              ret[key] = s0[key];
            }
          }
          return ret;
        }());
      for (let STARTPOS in walkstarts) {
        let allwalkerdirs = [1, 5];
        for (let walkerdirnbr = 0; walkerdirnbr < 2; walkerdirnbr++) {
          let STOPREASON = "";
          let POS = STARTPOS;
          while (!(STOPREASON = (!(POS = connections[POS][allwalkerdirs[walkerdirnbr]]) ? "outofbounds" : !allowedsteps[POS] ? "nomoresteps" : BLOCKS[POS] ? "hitblock" : null))) {
            ARTIFACTS = {
              ...ARTIFACTS,
              ["marks"]: {
                ...ARTIFACTS["marks"],
                [POS]: {}
              }
            }
          }
          if (BLOCKS[POS] && allowedsteps[POS]) {
            ARTIFACTS = {
              ...ARTIFACTS,
              ["blocks"]: {
                ...ARTIFACTS["blocks"],
                [POS]: {}
              }
            }
          }
        }
      }
    } {
      let allowedsteps = TERRAIN.steps;
      let BLOCKS = UNITLAYERS.units;
      let walkstarts =
        (function() {
          let ret = {},
            s0 = UNITLAYERS.mynoblocks,
            s1 =
            (function() {
              let ret = {};
              ret[MARKS["selectunit"]] = 1;
              return ret;
            }());
          for (let key in s0) {
            if (s1[key]) {
              ret[key] = s0[key];
            }
          }
          return ret;
        }());
      for (let STARTPOS in walkstarts) {
        let allwalkerdirs = [1, 5];
        for (let walkerdirnbr = 0; walkerdirnbr < 2; walkerdirnbr++) {
          let POS = STARTPOS;
          while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && allowedsteps[POS] && !BLOCKS[POS]) {
            ARTIFACTS = {
              ...ARTIFACTS,
              ["marks"]: {
                ...ARTIFACTS["marks"],
                [POS]: {}
              }
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
    for (let linkpos in
        (function() {
          let k, ret = {},
            s0 = ARTIFACTS.marks,
            s1 = ARTIFACTS.blocks;
          for (k in s0) {
            ret[k] = 1;
          }
          for (k in s1) {
            ret[k] = 1;
          }
          return ret;
        }())) {
      newlinks[linkpos] = 'selectmark1';
    }
    return newstep;
  };
  game.selectunit1instruction = function(turn, step) {
    return {
      type: 'text',
      text: "bar"
    };
  };
  game.selectmark1 = function(turn, step, markpos) {
    let MARKS = {
      selectmark: markpos,
      selectunit: step.MARKS.selectunit
    };
    let newstepid = step.stepid + '-' + markpos;
    let newstep = turn.steps[newstepid] = Object.assign({}, step, {
      MARKS: MARKS,
      stepid: newstepid,
      path: step.path.concat(markpos),
      name: 'selectmark'
    });
    turn.links[newstepid] = {};
    turn.links[newstepid].endturn = "start" + otherplayer;
    return newstep;
  };
  game.selectmark1instruction = function(turn, step) {
    return {
      type: 'text',
      text: "baz"
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
    let ARTIFACTS = emptyArtifactLayer;
    let UNITDATA = step.UNITDATA;
    let UNITLAYERS = {
      "stepsfirsts": {},
      "mystepsfirsts": {},
      "oppstepsfirsts": {},
      "neutralstepsfirsts": {},
      "blocksfirsts": {},
      "myblocksfirsts": {},
      "oppblocksfirsts": {},
      "neutralblocksfirsts": {},
      "defaultfirsts": {},
      "mydefaultfirsts": {},
      "oppdefaultfirsts": {},
      "neutraldefaultfirsts": {},
      "noblocks": {},
      "mynoblocks": {},
      "oppnoblocks": {},
      "neutralnoblocks": {},
      "pawns": {},
      "mypawns": {},
      "opppawns": {},
      "neutralpawns": {},
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
      text: "foo"
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
    }; {
      let allowedsteps = TERRAIN.steps;
      let BLOCKS = UNITLAYERS.units;
      let walkstarts =
        (function() {
          let ret = {},
            s0 = UNITLAYERS.mystepsfirsts,
            s1 =
            (function() {
              let ret = {};
              ret[MARKS["selectunit"]] = 1;
              return ret;
            }());
          for (let key in s0) {
            if (s1[key]) {
              ret[key] = s0[key];
            }
          }
          return ret;
        }());
      for (let STARTPOS in walkstarts) {
        let allwalkerdirs = [1, 5];
        for (let walkerdirnbr = 0; walkerdirnbr < 2; walkerdirnbr++) {
          let STOPREASON = "";
          let POS = STARTPOS;
          while (!(STOPREASON = (!(POS = connections[POS][allwalkerdirs[walkerdirnbr]]) ? "outofbounds" : !allowedsteps[POS] ? "nomoresteps" : BLOCKS[POS] ? "hitblock" : null))) {
            ARTIFACTS = {
              ...ARTIFACTS,
              ["marks"]: {
                ...ARTIFACTS["marks"],
                [POS]: {}
              }
            }
          }
          if (BLOCKS[POS] && allowedsteps[POS]) {
            ARTIFACTS = {
              ...ARTIFACTS,
              ["blocks"]: {
                ...ARTIFACTS["blocks"],
                [POS]: {}
              }
            }
          }
        }
      }
    } {
      let allowedsteps = TERRAIN.steps;
      let BLOCKS = UNITLAYERS.units;
      let walkstarts =
        (function() {
          let ret = {},
            s0 = UNITLAYERS.myblocksfirsts,
            s1 =
            (function() {
              let ret = {};
              ret[MARKS["selectunit"]] = 1;
              return ret;
            }());
          for (let key in s0) {
            if (s1[key]) {
              ret[key] = s0[key];
            }
          }
          return ret;
        }());
      for (let STARTPOS in walkstarts) {
        let allwalkerdirs = [1, 5];
        for (let walkerdirnbr = 0; walkerdirnbr < 2; walkerdirnbr++) {
          let STOPREASON = "";
          let POS = STARTPOS;
          while (!(STOPREASON = (!(POS = connections[POS][allwalkerdirs[walkerdirnbr]]) ? "outofbounds" : BLOCKS[POS] ? "hitblock" : !allowedsteps[POS] ? "nomoresteps" : null))) {
            ARTIFACTS = {
              ...ARTIFACTS,
              ["marks"]: {
                ...ARTIFACTS["marks"],
                [POS]: {}
              }
            }
          }
          if (BLOCKS[POS]) {
            ARTIFACTS = {
              ...ARTIFACTS,
              ["blocks"]: {
                ...ARTIFACTS["blocks"],
                [POS]: {}
              }
            }
          }
        }
      }
    } {
      let allowedsteps = TERRAIN.steps;
      let BLOCKS = UNITLAYERS.units;
      let walkstarts =
        (function() {
          let ret = {},
            s0 = UNITLAYERS.mydefaultfirsts,
            s1 =
            (function() {
              let ret = {};
              ret[MARKS["selectunit"]] = 1;
              return ret;
            }());
          for (let key in s0) {
            if (s1[key]) {
              ret[key] = s0[key];
            }
          }
          return ret;
        }());
      for (let STARTPOS in walkstarts) {
        let allwalkerdirs = [1, 5];
        for (let walkerdirnbr = 0; walkerdirnbr < 2; walkerdirnbr++) {
          let STOPREASON = "";
          let POS = STARTPOS;
          while (!(STOPREASON = (!(POS = connections[POS][allwalkerdirs[walkerdirnbr]]) ? "outofbounds" : !allowedsteps[POS] ? "nomoresteps" : BLOCKS[POS] ? "hitblock" : null))) {
            ARTIFACTS = {
              ...ARTIFACTS,
              ["marks"]: {
                ...ARTIFACTS["marks"],
                [POS]: {}
              }
            }
          }
          if (BLOCKS[POS] && allowedsteps[POS]) {
            ARTIFACTS = {
              ...ARTIFACTS,
              ["blocks"]: {
                ...ARTIFACTS["blocks"],
                [POS]: {}
              }
            }
          }
        }
      }
    } {
      let allowedsteps = TERRAIN.steps;
      let BLOCKS = UNITLAYERS.units;
      let walkstarts =
        (function() {
          let ret = {},
            s0 = UNITLAYERS.mynoblocks,
            s1 =
            (function() {
              let ret = {};
              ret[MARKS["selectunit"]] = 1;
              return ret;
            }());
          for (let key in s0) {
            if (s1[key]) {
              ret[key] = s0[key];
            }
          }
          return ret;
        }());
      for (let STARTPOS in walkstarts) {
        let allwalkerdirs = [1, 5];
        for (let walkerdirnbr = 0; walkerdirnbr < 2; walkerdirnbr++) {
          let POS = STARTPOS;
          while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && allowedsteps[POS] && !BLOCKS[POS]) {
            ARTIFACTS = {
              ...ARTIFACTS,
              ["marks"]: {
                ...ARTIFACTS["marks"],
                [POS]: {}
              }
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
    for (let linkpos in
        (function() {
          let k, ret = {},
            s0 = ARTIFACTS.marks,
            s1 = ARTIFACTS.blocks;
          for (k in s0) {
            ret[k] = 1;
          }
          for (k in s1) {
            ret[k] = 1;
          }
          return ret;
        }())) {
      newlinks[linkpos] = 'selectmark2';
    }
    return newstep;
  };
  game.selectunit2instruction = function(turn, step) {
    return {
      type: 'text',
      text: "bar"
    };
  };
  game.selectmark2 = function(turn, step, markpos) {
    let MARKS = {
      selectmark: markpos,
      selectunit: step.MARKS.selectunit
    };
    let newstepid = step.stepid + '-' + markpos;
    let newstep = turn.steps[newstepid] = Object.assign({}, step, {
      MARKS: MARKS,
      stepid: newstepid,
      path: step.path.concat(markpos),
      name: 'selectmark'
    });
    turn.links[newstepid] = {};
    turn.links[newstepid].endturn = "start" + otherplayer;
    return newstep;
  };
  game.selectmark2instruction = function(turn, step) {
    return {
      type: 'text',
      text: "baz"
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
    let ARTIFACTS = emptyArtifactLayer;
    let UNITDATA = step.UNITDATA;
    let UNITLAYERS = {
      "stepsfirsts": {},
      "mystepsfirsts": {},
      "oppstepsfirsts": {},
      "neutralstepsfirsts": {},
      "blocksfirsts": {},
      "myblocksfirsts": {},
      "oppblocksfirsts": {},
      "neutralblocksfirsts": {},
      "defaultfirsts": {},
      "mydefaultfirsts": {},
      "oppdefaultfirsts": {},
      "neutraldefaultfirsts": {},
      "noblocks": {},
      "mynoblocks": {},
      "oppnoblocks": {},
      "neutralnoblocks": {},
      "pawns": {},
      "mypawns": {},
      "opppawns": {},
      "neutralpawns": {},
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
      text: "foo"
    };
  };
  game.debug2 = function() {
    return {
      TERRAIN: TERRAIN
    };
  }
};
export default game;