import fullDef from '../../games/dist/games/jostle';
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
  "movetargets": {},
  "initialenemy": {},
  "initialfriend": {},
  "newenemy": {},
  "newfriend": {}
};
game.commands = {
  "jostle": 1
};
game.graphics = {
  "icons": {
    "checkers": "pawn"
  },
  "tiles": {}
};
game.board = {
  "height": 10,
  "width": 10,
  "terrain": {}
};
game.AI = [];
game.id = "jostle";
let connections = boardConnections(fullDef.board);
let BOARD = boardLayers(fullDef.board);
let TERRAIN = terrainLayers(fullDef.board, 0);
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
  let ownernames = ["neutral", "my", "opp"];
  let player = 1;
  let otherplayer = 2;
  game.selectunit1 = function(turn, step, markpos) {
    let ARTIFACTS = step.ARTIFACTS;
    let UNITLAYERS = step.UNITLAYERS;
    let MARKS = {
      selectunit: markpos
    };
    let STARTPOS = MARKS["selectunit"];
    let neighbourdirs = [1, 3, 5, 7];
    let startconnections = connections[STARTPOS];
    for (let dirnbr = 0; dirnbr < 4; dirnbr++) {
      let POS = startconnections[neighbourdirs[dirnbr]];
      if (POS) {
        ARTIFACTS = {
          ...ARTIFACTS,
          [(!(UNITLAYERS.units[POS]) ? "movetargets" : (!!(UNITLAYERS.oppunits[POS]) ? "initialenemy" : "initialfriend"))]: {
            ...ARTIFACTS[(!(UNITLAYERS.units[POS]) ? "movetargets" : (!!(UNITLAYERS.oppunits[POS]) ? "initialenemy" : "initialfriend"))],
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
    for (let linkpos in ARTIFACTS.movetargets) {
      newlinks[linkpos] = 'selectmovetarget1';
    }
    return newstep;
  };
  game.selectunit1instruction = function(turn, step) {
    let ARTIFACTS = step.ARTIFACTS;
    return collapseLine({
      type: 'line',
      content: [{
        type: 'text',
        text: "This unit neighbours"
      }, {
        type: "line",
        content: [{
          type: "text",
          text: Object.keys(ARTIFACTS.initialfriend).length
        }, Object.keys(ARTIFACTS.initialfriend).length === 1 ? {
          type: 'text',
          text: "friend"
        } : {
          type: 'text',
          text: "friends"
        }]
      }, {
        type: 'text',
        text: "and"
      }, {
        type: "line",
        content: [{
          type: "text",
          text: Object.keys(ARTIFACTS.initialenemy).length
        }, Object.keys(ARTIFACTS.initialenemy).length === 1 ? {
          type: 'text',
          text: "enemy"
        } : {
          type: 'text',
          text: "enemies"
        }]
      }, {
        type: 'text',
        text: "making the square worth"
      }, {
        type: 'text',
        text: (Object.keys(ARTIFACTS.initialfriend).length - Object.keys(ARTIFACTS.initialenemy).length)
      }, {
        type: 'text',
        text: ". Select a higher value square to jostle to"
      }]
    });
  };
  game.selectmovetarget1 = function(turn, step, markpos) {
    let ARTIFACTS = step.ARTIFACTS;
    let UNITLAYERS = step.UNITLAYERS;
    let MARKS = {
      selectmovetarget: markpos,
      selectunit: step.MARKS.selectunit
    };
    let STARTPOS = MARKS["selectmovetarget"];
    let neighbourdirs = [1, 3, 5, 7];
    let startconnections = connections[STARTPOS];
    for (let dirnbr = 0; dirnbr < 4; dirnbr++) {
      let POS = startconnections[neighbourdirs[dirnbr]];
      if (POS && UNITLAYERS.units[POS]) {
        ARTIFACTS = {
          ...ARTIFACTS,
          [(!!(UNITLAYERS.oppunits[POS]) ? "newenemy" : "newfriend")]: {
            ...ARTIFACTS[(!!(UNITLAYERS.oppunits[POS]) ? "newenemy" : "newfriend")],
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
      name: 'selectmovetarget'
    });
    turn.links[newstepid] = {};
    if (((Object.keys(ARTIFACTS.newfriend).length - (1 + Object.keys(ARTIFACTS.newenemy).length)) > (Object.keys(ARTIFACTS.initialfriend).length - Object.keys(ARTIFACTS.initialenemy).length))) {
      turn.links[newstepid].jostle = 'jostle1';
    }
    return newstep;
  };
  game.selectmovetarget1instruction = function(turn, step) {
    let MARKS = step.MARKS;
    let ARTIFACTS = step.ARTIFACTS;
    return collapseLine({
      type: 'line',
      content: [{
        type: 'text',
        text: "From"
      }, {
        type: 'posref',
        pos: MARKS["selectmovetarget"]
      }, {
        type: 'text',
        text: "you would neighbour"
      }, {
        type: "line",
        content: [{
          type: "text",
          text: (Object.keys(ARTIFACTS.newfriend).length - 1)
        }, (Object.keys(ARTIFACTS.newfriend).length - 1) === 1 ? {
          type: 'text',
          text: "friend"
        } : {
          type: 'text',
          text: "friends"
        }]
      }, {
        type: 'text',
        text: "and"
      }, {
        type: "line",
        content: [{
          type: "text",
          text: Object.keys(ARTIFACTS.newenemy).length
        }, Object.keys(ARTIFACTS.newenemy).length === 1 ? {
          type: 'text',
          text: "enemy"
        } : {
          type: 'text',
          text: "enemies"
        }]
      }, {
        type: 'text',
        text: ", making it worth"
      }, {
        type: 'text',
        text: ((Object.keys(ARTIFACTS.newfriend).length - 1) - Object.keys(ARTIFACTS.newenemy).length)
      }, {
        type: 'text',
        text: ". Press"
      }, {
        type: 'cmndref',
        cmnd: "jostle"
      }, {
        type: 'text',
        text: "to move from"
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
  game.jostle1 = function(turn, step) {
    let ARTIFACTS = step.ARTIFACTS;
    let MARKS = step.MARKS;
    let UNITDATA = Object.assign({}, step.UNITDATA);
    let UNITLAYERS = step.UNITLAYERS;
    let unitid = (UNITLAYERS.units[MARKS["selectunit"]]  || {}).id;
    if (unitid) {
      UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
        "pos": MARKS["selectmovetarget"]
      });
    }
    MARKS = {};
    UNITLAYERS = {
      "checkers": {},
      "mycheckers": {},
      "oppcheckers": {},
      "neutralcheckers": {},
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
    let newstepid = step.stepid + '-' + 'jostle';
    let newstep = turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      UNITDATA: UNITDATA,
      UNITLAYERS: UNITLAYERS,
      stepid: newstepid,
      name: 'jostle',
      path: step.path.concat('jostle')
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
    let UNITLAYERS = {
      "checkers": {},
      "mycheckers": {},
      "oppcheckers": {},
      "neutralcheckers": {},
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
    for (let linkpos in UNITLAYERS.mycheckers) {
      newlinks[linkpos] = 'selectunit1';
    }
    return turn;
  }
  game.start1instruction = function(turn, step) {
    return {
      type: 'text',
      text: "Select which unit to jostle!"
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
  let ownernames = ["neutral", "opp", "my"];
  let player = 2;
  let otherplayer = 1;
  game.selectunit2 = function(turn, step, markpos) {
    let ARTIFACTS = step.ARTIFACTS;
    let UNITLAYERS = step.UNITLAYERS;
    let MARKS = {
      selectunit: markpos
    };
    let STARTPOS = MARKS["selectunit"];
    let neighbourdirs = [1, 3, 5, 7];
    let startconnections = connections[STARTPOS];
    for (let dirnbr = 0; dirnbr < 4; dirnbr++) {
      let POS = startconnections[neighbourdirs[dirnbr]];
      if (POS) {
        ARTIFACTS = {
          ...ARTIFACTS,
          [(!(UNITLAYERS.units[POS]) ? "movetargets" : (!!(UNITLAYERS.oppunits[POS]) ? "initialenemy" : "initialfriend"))]: {
            ...ARTIFACTS[(!(UNITLAYERS.units[POS]) ? "movetargets" : (!!(UNITLAYERS.oppunits[POS]) ? "initialenemy" : "initialfriend"))],
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
    for (let linkpos in ARTIFACTS.movetargets) {
      newlinks[linkpos] = 'selectmovetarget2';
    }
    return newstep;
  };
  game.selectunit2instruction = function(turn, step) {
    let ARTIFACTS = step.ARTIFACTS;
    return collapseLine({
      type: 'line',
      content: [{
        type: 'text',
        text: "This unit neighbours"
      }, {
        type: "line",
        content: [{
          type: "text",
          text: Object.keys(ARTIFACTS.initialfriend).length
        }, Object.keys(ARTIFACTS.initialfriend).length === 1 ? {
          type: 'text',
          text: "friend"
        } : {
          type: 'text',
          text: "friends"
        }]
      }, {
        type: 'text',
        text: "and"
      }, {
        type: "line",
        content: [{
          type: "text",
          text: Object.keys(ARTIFACTS.initialenemy).length
        }, Object.keys(ARTIFACTS.initialenemy).length === 1 ? {
          type: 'text',
          text: "enemy"
        } : {
          type: 'text',
          text: "enemies"
        }]
      }, {
        type: 'text',
        text: "making the square worth"
      }, {
        type: 'text',
        text: (Object.keys(ARTIFACTS.initialfriend).length - Object.keys(ARTIFACTS.initialenemy).length)
      }, {
        type: 'text',
        text: ". Select a higher value square to jostle to"
      }]
    });
  };
  game.selectmovetarget2 = function(turn, step, markpos) {
    let ARTIFACTS = step.ARTIFACTS;
    let UNITLAYERS = step.UNITLAYERS;
    let MARKS = {
      selectmovetarget: markpos,
      selectunit: step.MARKS.selectunit
    };
    let STARTPOS = MARKS["selectmovetarget"];
    let neighbourdirs = [1, 3, 5, 7];
    let startconnections = connections[STARTPOS];
    for (let dirnbr = 0; dirnbr < 4; dirnbr++) {
      let POS = startconnections[neighbourdirs[dirnbr]];
      if (POS && UNITLAYERS.units[POS]) {
        ARTIFACTS = {
          ...ARTIFACTS,
          [(!!(UNITLAYERS.oppunits[POS]) ? "newenemy" : "newfriend")]: {
            ...ARTIFACTS[(!!(UNITLAYERS.oppunits[POS]) ? "newenemy" : "newfriend")],
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
      name: 'selectmovetarget'
    });
    turn.links[newstepid] = {};
    if (((Object.keys(ARTIFACTS.newfriend).length - (1 + Object.keys(ARTIFACTS.newenemy).length)) > (Object.keys(ARTIFACTS.initialfriend).length - Object.keys(ARTIFACTS.initialenemy).length))) {
      turn.links[newstepid].jostle = 'jostle2';
    }
    return newstep;
  };
  game.selectmovetarget2instruction = function(turn, step) {
    let MARKS = step.MARKS;
    let ARTIFACTS = step.ARTIFACTS;
    return collapseLine({
      type: 'line',
      content: [{
        type: 'text',
        text: "From"
      }, {
        type: 'posref',
        pos: MARKS["selectmovetarget"]
      }, {
        type: 'text',
        text: "you would neighbour"
      }, {
        type: "line",
        content: [{
          type: "text",
          text: (Object.keys(ARTIFACTS.newfriend).length - 1)
        }, (Object.keys(ARTIFACTS.newfriend).length - 1) === 1 ? {
          type: 'text',
          text: "friend"
        } : {
          type: 'text',
          text: "friends"
        }]
      }, {
        type: 'text',
        text: "and"
      }, {
        type: "line",
        content: [{
          type: "text",
          text: Object.keys(ARTIFACTS.newenemy).length
        }, Object.keys(ARTIFACTS.newenemy).length === 1 ? {
          type: 'text',
          text: "enemy"
        } : {
          type: 'text',
          text: "enemies"
        }]
      }, {
        type: 'text',
        text: ", making it worth"
      }, {
        type: 'text',
        text: ((Object.keys(ARTIFACTS.newfriend).length - 1) - Object.keys(ARTIFACTS.newenemy).length)
      }, {
        type: 'text',
        text: ". Press"
      }, {
        type: 'cmndref',
        cmnd: "jostle"
      }, {
        type: 'text',
        text: "to move from"
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
  game.jostle2 = function(turn, step) {
    let ARTIFACTS = step.ARTIFACTS;
    let MARKS = step.MARKS;
    let UNITDATA = Object.assign({}, step.UNITDATA);
    let UNITLAYERS = step.UNITLAYERS;
    let unitid = (UNITLAYERS.units[MARKS["selectunit"]]  || {}).id;
    if (unitid) {
      UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
        "pos": MARKS["selectmovetarget"]
      });
    }
    MARKS = {};
    UNITLAYERS = {
      "checkers": {},
      "mycheckers": {},
      "oppcheckers": {},
      "neutralcheckers": {},
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
    let newstepid = step.stepid + '-' + 'jostle';
    let newstep = turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      UNITDATA: UNITDATA,
      UNITLAYERS: UNITLAYERS,
      stepid: newstepid,
      name: 'jostle',
      path: step.path.concat('jostle')
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
    let UNITLAYERS = {
      "checkers": {},
      "mycheckers": {},
      "oppcheckers": {},
      "neutralcheckers": {},
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
    for (let linkpos in UNITLAYERS.mycheckers) {
      newlinks[linkpos] = 'selectunit2';
    }
    return turn;
  }
  game.start2instruction = function(turn, step) {
    return {
      type: 'text',
      text: "Select which unit to jostle!"
    };
  };
  game.debug2 = function() {
    return {
      TERRAIN: TERRAIN
    };
  }
};
export default game;