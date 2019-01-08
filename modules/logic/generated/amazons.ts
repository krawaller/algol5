import fullDef from '../../games/dist/games/amazons';
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
  "targets": {}
};
game.commands = {
  "move": 1,
  "fire": 1
};
game.graphics = {
  "icons": {
    "queens": "queen",
    "fires": "pawn"
  },
  "tiles": {}
};
game.board = {
  "height": 10,
  "width": 10,
  "terrain": {}
};
game.AI = ["Steve"];
game.id = "amazons";
let connections = boardConnections(fullDef.board);
let BOARD = boardLayers(fullDef.board);
let TERRAIN = terrainLayers(fullDef.board, 0);
game.newGame = function() {
  let turnseed = {
    turn: 0
  };
  let stepseed = {
    UNITDATA: deduceInitialUnitData({
      "queens": {
        "1": ["d10", "g10", "a7", "j7"],
        "2": ["a4", "d1", "g1", "j4"]
      }
    }),
    TURNVARS: {}
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
{
  // Actions for player 1
  let ownernames = ["neutral", "my", "opp"];
  let player = 1;
  let otherplayer = 2;
  game.brain_Steve_1 = function(step) {
    let UNITLAYERS = step.UNITLAYERS;
    let ARTIFACTS = step.ARTIFACTS;
    ARTIFACTS.myroads = {};
    ARTIFACTS.opproads = {};
    ARTIFACTS.myreach = {};
    ARTIFACTS.oppreach = {};
    { 
      for (let STARTPOS in UNITLAYERS.queens) {
        let neighbourdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        let foundneighbours = [];
        let startconnections = connections[STARTPOS];
        for (let dirnbr = 0; dirnbr < 8; dirnbr++) {
          let POS = startconnections[neighbourdirs[dirnbr]];
          if (POS && !UNITLAYERS.units[POS]) {
            foundneighbours.push(POS);
          }
        }
        let NEIGHBOURCOUNT = foundneighbours.length;
        ARTIFACTS = {
          ...ARTIFACTS,
          [(!!(UNITLAYERS.myunits[STARTPOS]) ? "myroads" : "opproads")]: {
            ...ARTIFACTS[(!!(UNITLAYERS.myunits[STARTPOS]) ? "myroads" : "opproads")],
            [STARTPOS]: {
              count: NEIGHBOURCOUNT
            }
          }
        }
      }
    }  { 
      let BLOCKS = UNITLAYERS.units;
      let walkstarts = UNITLAYERS.queens;
      for (let STARTPOS in walkstarts) {
        let allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        for (let walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
          let POS = STARTPOS;
          while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && !BLOCKS[POS]) {
            ARTIFACTS = {
              ...ARTIFACTS,
              [(!!(UNITLAYERS.myunits[STARTPOS]) ? "myreach" : "oppreach")]: {
                ...ARTIFACTS[(!!(UNITLAYERS.myunits[STARTPOS]) ? "myreach" : "oppreach")],
                [POS]: {}
              }
            }
          }
        }
      }
    } 
    return reduce(ARTIFACTS.myroads, function(mem, obj) {
        return mem + obj["count"];
      }, 0) +
      Object.keys(ARTIFACTS.myreach).length - reduce(ARTIFACTS.opproads, function(mem, obj) {
        return mem + obj["count"];
      }, 0) -
      Object.keys(ARTIFACTS.oppreach).length;
  };
  game.brain_Steve_1_detailed = function(step) {
    let UNITLAYERS = step.UNITLAYERS;
    let ARTIFACTS = step.ARTIFACTS;
    ARTIFACTS.myroads = {};
    ARTIFACTS.opproads = {};
    ARTIFACTS.myreach = {};
    ARTIFACTS.oppreach = {};
    { 
      for (let STARTPOS in UNITLAYERS.queens) {
        let neighbourdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        let foundneighbours = [];
        let startconnections = connections[STARTPOS];
        for (let dirnbr = 0; dirnbr < 8; dirnbr++) {
          let POS = startconnections[neighbourdirs[dirnbr]];
          if (POS && !UNITLAYERS.units[POS]) {
            foundneighbours.push(POS);
          }
        }
        let NEIGHBOURCOUNT = foundneighbours.length;
        ARTIFACTS = {
          ...ARTIFACTS,
          [(!!(UNITLAYERS.myunits[STARTPOS]) ? "myroads" : "opproads")]: {
            ...ARTIFACTS[(!!(UNITLAYERS.myunits[STARTPOS]) ? "myroads" : "opproads")],
            [STARTPOS]: {
              count: NEIGHBOURCOUNT
            }
          }
        }
      }
    }  { 
      let BLOCKS = UNITLAYERS.units;
      let walkstarts = UNITLAYERS.queens;
      for (let STARTPOS in walkstarts) {
        let allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        for (let walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
          let POS = STARTPOS;
          while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && !BLOCKS[POS]) {
            ARTIFACTS = {
              ...ARTIFACTS,
              [(!!(UNITLAYERS.myunits[STARTPOS]) ? "myreach" : "oppreach")]: {
                ...ARTIFACTS[(!!(UNITLAYERS.myunits[STARTPOS]) ? "myreach" : "oppreach")],
                [POS]: {}
              }
            }
          }
        }
      }
    } 
    return {
      myroads: reduce(ARTIFACTS.myroads, function(mem, obj) {
        return mem + obj["count"];
      }, 0),
      mydomain: Object.keys(ARTIFACTS.myreach).length,
      opproads: -reduce(ARTIFACTS.opproads, function(mem, obj) {
        return mem + obj["count"];
      }, 0),
      oppdomain: -Object.keys(ARTIFACTS.oppreach).length
    };
  };
  game.selectunit1 = function(turn, step, markpos) {
    let ARTIFACTS = step.ARTIFACTS;
    let UNITLAYERS = step.UNITLAYERS;
    let MARKS = {
      selectunit: markpos
    };
    let BLOCKS = UNITLAYERS.units;
    let STARTPOS = MARKS["selectunit"];
    let allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
    for (let walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
      let POS = STARTPOS;
      while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && !BLOCKS[POS]) {
        ARTIFACTS = {
          ...ARTIFACTS,
          ["targets"]: {
            ...ARTIFACTS["targets"],
            [POS]: {}
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
    for (let linkpos in ARTIFACTS.targets) {
      newlinks[linkpos] = 'selectmovetarget1';
    }
    return newstep;
  };
  game.selectunit1instruction = function(turn, step) {
    let MARKS = step.MARKS;
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
        alias: "queen",
        name: "queen".replace(/s$/, '')
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
        text: "to go from"
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
    });
  };
  game.selectfiretarget1 = function(turn, step, markpos) {
    let MARKS = {
      selectfiretarget: markpos
    };
    let newstepid = step.stepid + '-' + markpos;
    let newstep = turn.steps[newstepid] = Object.assign({}, step, {
      MARKS: MARKS,
      stepid: newstepid,
      path: step.path.concat(markpos),
      name: 'selectfiretarget'
    });
    turn.links[newstepid] = {};
    turn.links[newstepid].fire = 'fire1';
    return newstep;
  };
  game.selectfiretarget1instruction = function(turn, step) {
    let MARKS = step.MARKS;
    return collapseLine({
      type: 'line',
      content: [{
        type: 'text',
        text: "Press"
      }, {
        type: 'cmndref',
        cmnd: "fire"
      }, {
        type: 'text',
        text: "to destroy the square at"
      }, {
        type: 'posref',
        pos: MARKS["selectfiretarget"]
      }]
    });
  };
  game.move1 = function(turn, step) {
    let ARTIFACTS = step.ARTIFACTS;
    let MARKS = step.MARKS;
    let UNITDATA = Object.assign({}, step.UNITDATA);
    let UNITLAYERS = step.UNITLAYERS;
    let TURNVARS = Object.assign({}, step.TURNVARS);
    { 
      let unitid = (UNITLAYERS.units[MARKS["selectunit"]]  || {}).id;
      if (unitid) {
        UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
          "pos": MARKS["selectmovetarget"]
        });
      }
    } { 
      TURNVARS["movedto"] = MARKS["selectmovetarget"];
    }
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
    for (let unitid in UNITDATA) {
      let currentunit = UNITDATA[unitid]
      let unitgroup = currentunit.group;
      let unitpos = currentunit.pos;
      let owner = ownernames[currentunit.owner]
      UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
    }
    let BLOCKS = UNITLAYERS.units;
    let STARTPOS = TURNVARS['movedto'];
    let allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
    for (let walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
      let POS = STARTPOS;
      while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && !BLOCKS[POS]) {
        ARTIFACTS = {
          ...ARTIFACTS,
          ["targets"]: {
            ...ARTIFACTS["targets"],
            [POS]: {}
          }
        }
      }
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
        ,
      TURNVARS: TURNVARS
    });
    turn.links[newstepid] = {};
    let newlinks = turn.links[newstepid];
    for (let linkpos in ARTIFACTS.targets) {
      newlinks[linkpos] = 'selectfiretarget1';
    }
    return newstep;
  }
  game.move1instruction = function(turn, step) {
    return {
      type: 'text',
      text: "Now select where to fire at"
    };
  };
  game.fire1 = function(turn, step) {
    let ARTIFACTS = step.ARTIFACTS;
    let MARKS = step.MARKS;
    let UNITDATA = Object.assign({}, step.UNITDATA);
    let clones = step.clones;
    let UNITLAYERS = step.UNITLAYERS;
    let TURNVARS = Object.assign({}, step.TURNVARS);
    let newunitid = 'spawn' + (clones++);
    UNITDATA[newunitid] = {
      pos: MARKS["selectfiretarget"],
      id: newunitid,
      group: "fires",
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
    for (let unitid in UNITDATA) {
      let currentunit = UNITDATA[unitid]
      let unitgroup = currentunit.group;
      let unitpos = currentunit.pos;
      let owner = ownernames[currentunit.owner]
      UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
    }
    let newstepid = step.stepid + '-' + 'fire';
    let newstep = turn.steps[newstepid] = Object.assign({}, step, {
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
    let TURNVARS = {};
    let UNITLAYERS = {
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
      clones: step.clones,
      path: [],
      TURNVARS: TURNVARS
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
        alias: "queen",
        name: "queen".replace(/s$/, '')
      }, {
        type: 'text',
        text: "to move and fire with"
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
  let ownernames = ["neutral", "opp", "my"];
  let player = 2;
  let otherplayer = 1;
  game.brain_Steve_2 = function(step) {
    let UNITLAYERS = step.UNITLAYERS;
    let ARTIFACTS = step.ARTIFACTS;
    ARTIFACTS.myroads = {};
    ARTIFACTS.opproads = {};
    ARTIFACTS.myreach = {};
    ARTIFACTS.oppreach = {};
    { 
      for (let STARTPOS in UNITLAYERS.queens) {
        let neighbourdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        let foundneighbours = [];
        let startconnections = connections[STARTPOS];
        for (let dirnbr = 0; dirnbr < 8; dirnbr++) {
          let POS = startconnections[neighbourdirs[dirnbr]];
          if (POS && !UNITLAYERS.units[POS]) {
            foundneighbours.push(POS);
          }
        }
        let NEIGHBOURCOUNT = foundneighbours.length;
        ARTIFACTS = {
          ...ARTIFACTS,
          [(!!(UNITLAYERS.myunits[STARTPOS]) ? "myroads" : "opproads")]: {
            ...ARTIFACTS[(!!(UNITLAYERS.myunits[STARTPOS]) ? "myroads" : "opproads")],
            [STARTPOS]: {
              count: NEIGHBOURCOUNT
            }
          }
        }
      }
    }  { 
      let BLOCKS = UNITLAYERS.units;
      let walkstarts = UNITLAYERS.queens;
      for (let STARTPOS in walkstarts) {
        let allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        for (let walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
          let POS = STARTPOS;
          while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && !BLOCKS[POS]) {
            ARTIFACTS = {
              ...ARTIFACTS,
              [(!!(UNITLAYERS.myunits[STARTPOS]) ? "myreach" : "oppreach")]: {
                ...ARTIFACTS[(!!(UNITLAYERS.myunits[STARTPOS]) ? "myreach" : "oppreach")],
                [POS]: {}
              }
            }
          }
        }
      }
    } 
    return reduce(ARTIFACTS.myroads, function(mem, obj) {
        return mem + obj["count"];
      }, 0) +
      Object.keys(ARTIFACTS.myreach).length - reduce(ARTIFACTS.opproads, function(mem, obj) {
        return mem + obj["count"];
      }, 0) -
      Object.keys(ARTIFACTS.oppreach).length;
  };
  game.brain_Steve_2_detailed = function(step) {
    let UNITLAYERS = step.UNITLAYERS;
    let ARTIFACTS = step.ARTIFACTS;
    ARTIFACTS.myroads = {};
    ARTIFACTS.opproads = {};
    ARTIFACTS.myreach = {};
    ARTIFACTS.oppreach = {};
    { 
      for (let STARTPOS in UNITLAYERS.queens) {
        let neighbourdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        let foundneighbours = [];
        let startconnections = connections[STARTPOS];
        for (let dirnbr = 0; dirnbr < 8; dirnbr++) {
          let POS = startconnections[neighbourdirs[dirnbr]];
          if (POS && !UNITLAYERS.units[POS]) {
            foundneighbours.push(POS);
          }
        }
        let NEIGHBOURCOUNT = foundneighbours.length;
        ARTIFACTS = {
          ...ARTIFACTS,
          [(!!(UNITLAYERS.myunits[STARTPOS]) ? "myroads" : "opproads")]: {
            ...ARTIFACTS[(!!(UNITLAYERS.myunits[STARTPOS]) ? "myroads" : "opproads")],
            [STARTPOS]: {
              count: NEIGHBOURCOUNT
            }
          }
        }
      }
    }  { 
      let BLOCKS = UNITLAYERS.units;
      let walkstarts = UNITLAYERS.queens;
      for (let STARTPOS in walkstarts) {
        let allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        for (let walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
          let POS = STARTPOS;
          while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && !BLOCKS[POS]) {
            ARTIFACTS = {
              ...ARTIFACTS,
              [(!!(UNITLAYERS.myunits[STARTPOS]) ? "myreach" : "oppreach")]: {
                ...ARTIFACTS[(!!(UNITLAYERS.myunits[STARTPOS]) ? "myreach" : "oppreach")],
                [POS]: {}
              }
            }
          }
        }
      }
    } 
    return {
      myroads: reduce(ARTIFACTS.myroads, function(mem, obj) {
        return mem + obj["count"];
      }, 0),
      mydomain: Object.keys(ARTIFACTS.myreach).length,
      opproads: -reduce(ARTIFACTS.opproads, function(mem, obj) {
        return mem + obj["count"];
      }, 0),
      oppdomain: -Object.keys(ARTIFACTS.oppreach).length
    };
  };
  game.selectunit2 = function(turn, step, markpos) {
    let ARTIFACTS = step.ARTIFACTS;
    let UNITLAYERS = step.UNITLAYERS;
    let MARKS = {
      selectunit: markpos
    };
    let BLOCKS = UNITLAYERS.units;
    let STARTPOS = MARKS["selectunit"];
    let allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
    for (let walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
      let POS = STARTPOS;
      while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && !BLOCKS[POS]) {
        ARTIFACTS = {
          ...ARTIFACTS,
          ["targets"]: {
            ...ARTIFACTS["targets"],
            [POS]: {}
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
    for (let linkpos in ARTIFACTS.targets) {
      newlinks[linkpos] = 'selectmovetarget2';
    }
    return newstep;
  };
  game.selectunit2instruction = function(turn, step) {
    let MARKS = step.MARKS;
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
        alias: "queen",
        name: "queen".replace(/s$/, '')
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
        text: "to go from"
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
    });
  };
  game.selectfiretarget2 = function(turn, step, markpos) {
    let MARKS = {
      selectfiretarget: markpos
    };
    let newstepid = step.stepid + '-' + markpos;
    let newstep = turn.steps[newstepid] = Object.assign({}, step, {
      MARKS: MARKS,
      stepid: newstepid,
      path: step.path.concat(markpos),
      name: 'selectfiretarget'
    });
    turn.links[newstepid] = {};
    turn.links[newstepid].fire = 'fire2';
    return newstep;
  };
  game.selectfiretarget2instruction = function(turn, step) {
    let MARKS = step.MARKS;
    return collapseLine({
      type: 'line',
      content: [{
        type: 'text',
        text: "Press"
      }, {
        type: 'cmndref',
        cmnd: "fire"
      }, {
        type: 'text',
        text: "to destroy the square at"
      }, {
        type: 'posref',
        pos: MARKS["selectfiretarget"]
      }]
    });
  };
  game.move2 = function(turn, step) {
    let ARTIFACTS = step.ARTIFACTS;
    let MARKS = step.MARKS;
    let UNITDATA = Object.assign({}, step.UNITDATA);
    let UNITLAYERS = step.UNITLAYERS;
    let TURNVARS = Object.assign({}, step.TURNVARS);
    { 
      let unitid = (UNITLAYERS.units[MARKS["selectunit"]]  || {}).id;
      if (unitid) {
        UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
          "pos": MARKS["selectmovetarget"]
        });
      }
    } { 
      TURNVARS["movedto"] = MARKS["selectmovetarget"];
    }
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
    for (let unitid in UNITDATA) {
      let currentunit = UNITDATA[unitid]
      let unitgroup = currentunit.group;
      let unitpos = currentunit.pos;
      let owner = ownernames[currentunit.owner]
      UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
    }
    let BLOCKS = UNITLAYERS.units;
    let STARTPOS = TURNVARS['movedto'];
    let allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
    for (let walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
      let POS = STARTPOS;
      while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && !BLOCKS[POS]) {
        ARTIFACTS = {
          ...ARTIFACTS,
          ["targets"]: {
            ...ARTIFACTS["targets"],
            [POS]: {}
          }
        }
      }
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
        ,
      TURNVARS: TURNVARS
    });
    turn.links[newstepid] = {};
    let newlinks = turn.links[newstepid];
    for (let linkpos in ARTIFACTS.targets) {
      newlinks[linkpos] = 'selectfiretarget2';
    }
    return newstep;
  }
  game.move2instruction = function(turn, step) {
    return {
      type: 'text',
      text: "Now select where to fire at"
    };
  };
  game.fire2 = function(turn, step) {
    let ARTIFACTS = step.ARTIFACTS;
    let MARKS = step.MARKS;
    let UNITDATA = Object.assign({}, step.UNITDATA);
    let clones = step.clones;
    let UNITLAYERS = step.UNITLAYERS;
    let TURNVARS = Object.assign({}, step.TURNVARS);
    let newunitid = 'spawn' + (clones++);
    UNITDATA[newunitid] = {
      pos: MARKS["selectfiretarget"],
      id: newunitid,
      group: "fires",
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
    for (let unitid in UNITDATA) {
      let currentunit = UNITDATA[unitid]
      let unitgroup = currentunit.group;
      let unitpos = currentunit.pos;
      let owner = ownernames[currentunit.owner]
      UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
    }
    let newstepid = step.stepid + '-' + 'fire';
    let newstep = turn.steps[newstepid] = Object.assign({}, step, {
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
    let TURNVARS = {};
    let UNITLAYERS = {
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
      clones: step.clones,
      path: [],
      TURNVARS: TURNVARS
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
        alias: "queen",
        name: "queen".replace(/s$/, '')
      }, {
        type: 'text',
        text: "to move and fire with"
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