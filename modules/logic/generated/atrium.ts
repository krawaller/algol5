import fullDef from '../../games/dist/games/atrium';
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
  "winline": {}
};
game.commands = {
  "move": 1
};
game.graphics = {
  "icons": {
    "kings": "king",
    "queens": "queen"
  },
  "tiles": {}
};
game.board = {
  "height": 5,
  "width": 5,
  "terrain": {}
};
game.AI = [];
game.id = "atrium";
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
      if (POS && !UNITLAYERS.units[POS]) {
        ARTIFACTS = {
          ...ARTIFACTS,
          ["movetargets"]: {
            ...ARTIFACTS["movetargets"],
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
    let MARKS = step.MARKS;
    let UNITLAYERS = step.UNITLAYERS;
    return collapseLine({
      type: 'line',
      content: [{
        type: 'text',
        text: "Select an orthogonal empty neighbour to move the"
      }, {
        type: 'posref',
        pos: MARKS["selectunit"]
      }, {
        type: "unittyperef",
        name: game.graphics.icons[(UNITLAYERS.units[MARKS["selectunit"]] || {})["group"]]
      }, {
        type: 'text',
        text: "to"
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
        text: "to walk the"
      }, {
        type: 'posref',
        pos: MARKS["selectunit"]
      }, {
        type: "unittyperef",
        name: game.graphics.icons[(UNITLAYERS.units[MARKS["selectunit"]] || {})["group"]]
      }, {
        type: 'text',
        text: "to"
      }, {
        type: 'posref',
        pos: MARKS["selectmovetarget"]
      }]
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
    }
    MARKS = {};
    UNITLAYERS = {
      "kings": {},
      "mykings": {},
      "oppkings": {},
      "neutralkings": {},
      "queens": {},
      "myqueens": {},
      "oppqueens": {},
      "neutralqueens": {},
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
    let walkstarts = UNITLAYERS.myunits;
    for (let STARTPOS in walkstarts) {
      let allowedsteps = (!!(UNITLAYERS.mykings[STARTPOS]) ? UNITLAYERS.mykings : UNITLAYERS.myqueens);
      let allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
      for (let walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
        let DIR = allwalkerdirs[walkerdirnbr];
        let walkedsquares = [];
        let POS = "faux";
        connections.faux[DIR] = STARTPOS;
        while ((POS = connections[POS][DIR]) && allowedsteps[POS]) {
          walkedsquares.push(POS);
        }
        var WALKLENGTH = walkedsquares.length;
        for (var walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
          POS = walkedsquares[walkstepper];
          if ((WALKLENGTH === 3)) {
            ARTIFACTS = {
              ...ARTIFACTS,
              ["winline"]: {
                ...ARTIFACTS["winline"],
                [POS]: {}
              }
            }
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
    });
    turn.links[newstepid] = {};
    if (Object.keys(ARTIFACTS.winline).length !== 0) {
      let winner = 1;
      let result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
      turn.links[newstepid][result] = 'madewinline';
      turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
      turn.endMarks[newstepid].madewinline = ARTIFACTS.winline;
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
      "kings": {},
      "mykings": {},
      "oppkings": {},
      "neutralkings": {},
      "queens": {},
      "myqueens": {},
      "oppqueens": {},
      "neutralqueens": {},
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
        alias: "king",
        name: "king".replace(/s$/, '')
      }, {
        type: 'text',
        text: "or"
      }, {
        type: "unittyperef",
        alias: "queen",
        name: "queen".replace(/s$/, '')
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
      if (POS && !UNITLAYERS.units[POS]) {
        ARTIFACTS = {
          ...ARTIFACTS,
          ["movetargets"]: {
            ...ARTIFACTS["movetargets"],
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
    let MARKS = step.MARKS;
    let UNITLAYERS = step.UNITLAYERS;
    return collapseLine({
      type: 'line',
      content: [{
        type: 'text',
        text: "Select an orthogonal empty neighbour to move the"
      }, {
        type: 'posref',
        pos: MARKS["selectunit"]
      }, {
        type: "unittyperef",
        name: game.graphics.icons[(UNITLAYERS.units[MARKS["selectunit"]] || {})["group"]]
      }, {
        type: 'text',
        text: "to"
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
        text: "to walk the"
      }, {
        type: 'posref',
        pos: MARKS["selectunit"]
      }, {
        type: "unittyperef",
        name: game.graphics.icons[(UNITLAYERS.units[MARKS["selectunit"]] || {})["group"]]
      }, {
        type: 'text',
        text: "to"
      }, {
        type: 'posref',
        pos: MARKS["selectmovetarget"]
      }]
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
    }
    MARKS = {};
    UNITLAYERS = {
      "kings": {},
      "mykings": {},
      "oppkings": {},
      "neutralkings": {},
      "queens": {},
      "myqueens": {},
      "oppqueens": {},
      "neutralqueens": {},
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
    let walkstarts = UNITLAYERS.myunits;
    for (let STARTPOS in walkstarts) {
      let allowedsteps = (!!(UNITLAYERS.mykings[STARTPOS]) ? UNITLAYERS.mykings : UNITLAYERS.myqueens);
      let allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
      for (let walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
        let DIR = allwalkerdirs[walkerdirnbr];
        let walkedsquares = [];
        let POS = "faux";
        connections.faux[DIR] = STARTPOS;
        while ((POS = connections[POS][DIR]) && allowedsteps[POS]) {
          walkedsquares.push(POS);
        }
        var WALKLENGTH = walkedsquares.length;
        for (var walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
          POS = walkedsquares[walkstepper];
          if ((WALKLENGTH === 3)) {
            ARTIFACTS = {
              ...ARTIFACTS,
              ["winline"]: {
                ...ARTIFACTS["winline"],
                [POS]: {}
              }
            }
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
    });
    turn.links[newstepid] = {};
    if (Object.keys(ARTIFACTS.winline).length !== 0) {
      let winner = 2;
      let result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
      turn.links[newstepid][result] = 'madewinline';
      turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
      turn.endMarks[newstepid].madewinline = ARTIFACTS.winline;
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
      "kings": {},
      "mykings": {},
      "oppkings": {},
      "neutralkings": {},
      "queens": {},
      "myqueens": {},
      "oppqueens": {},
      "neutralqueens": {},
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
        alias: "king",
        name: "king".replace(/s$/, '')
      }, {
        type: 'text',
        text: "or"
      }, {
        type: "unittyperef",
        alias: "queen",
        name: "queen".replace(/s$/, '')
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