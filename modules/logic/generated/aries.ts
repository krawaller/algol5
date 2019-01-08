import {
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
    "corner": "playercolour"
  },
  "icons": {
    "soldiers": "rook"
  }
};
game.board = {
  "height": 8,
  "width": 8,
  "terrain": {
    "corner": {
      "1": ["a1"],
      "2": ["h8"]
    }
  }
};
game.AI = [];
game.id = "aries";
let boardDef = {
  "height": 8,
  "width": 8,
  "terrain": {
    "corner": {
      "1": ["a1"],
      "2": ["h8"]
    }
  }
};
let connections = boardConnections(boardDef);
let BOARD = boardLayers(boardDef);
let relativedirs = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
game.newGame = function() {
  let turnseed = {
    turn: 0
  };
  let stepseed = {
    UNITDATA: deduceInitialUnitData({
        "soldiers": {
          "1": [
            ["rect", "a1", "d4"]
          ],
          "2": [
            ["rect", "e5", "h8"]
          ]
        }
      })
      ,
    BATTLEVARS: {}
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
  let TERRAIN = terrainLayers(boardDef, 1);
  let ownernames = ["neutral", "my", "opp"];
  let player = 1;
  let otherplayer = 2;
  game.selectunit1 = function(turn, step, markpos) {
    let BATTLEVARS = step.BATTLEVARS;
    let ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
      movetargets: Object.assign({}, step.ARTIFACTS.movetargets)
    });
    let UNITLAYERS = step.UNITLAYERS;
    let MARKS = {
      selectunit: markpos
    };
    let BLOCKS = UNITLAYERS.units;
    let STARTPOS = MARKS["selectunit"];
    let allwalkerdirs = [1, 3, 5, 7];
    for (let walkerdirnbr = 0; walkerdirnbr < 4; walkerdirnbr++) {
      let DIR = allwalkerdirs[walkerdirnbr];
      let STOPREASON = "";
      let POS = STARTPOS;
      while (!(STOPREASON = (!(POS = connections[POS][DIR]) ? "outofbounds" : BLOCKS[POS] ? "hitblock" : null))) {
        ARTIFACTS["movetargets"][POS] = {};
      }
      if (BLOCKS[POS]) {
        if (!((POS === BATTLEVARS['pushsquare']) && ((UNITLAYERS.units[MARKS["selectunit"]] || {})["id"] === BATTLEVARS["pusheeid"])) && UNITLAYERS.oppunits[POS]) {
          ARTIFACTS["movetargets"][POS] = {
            dir: DIR
          };
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
    return collapseLine({
      type: 'line',
      content: [{
        type: 'text',
        text: "Select where to move your"
      }, {
        type: 'posref',
        pos: MARKS["selectunit"]
      }, {
        type: "unittyperef",
        alias: "rook",
        name: "rook".replace(/s$/, '')
      }]
    });
  };
  game.selectmovetarget1 = function(turn, step, markpos) {
    let ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
      beingpushed: Object.assign({}, step.ARTIFACTS.beingpushed),
      squished: Object.assign({}, step.ARTIFACTS.squished)
    });
    let UNITLAYERS = step.UNITLAYERS;
    let MARKS = {
      selectmovetarget: markpos,
      selectunit: step.MARKS.selectunit
    };
    if (!!(UNITLAYERS.oppunits[MARKS["selectmovetarget"]])) {
      let allowedsteps = UNITLAYERS.oppunits;
      let BLOCKS = UNITLAYERS.myunits;
      let STARTPOS = MARKS["selectmovetarget"];
      let DIR = relativedirs[(ARTIFACTS.movetargets[MARKS["selectmovetarget"]] || {})["dir"] - 2 + 1];
      let walkedsquares = [];
      let STOPREASON = "";
      let POS = "faux";
      connections.faux[DIR] = STARTPOS;
      while (!(STOPREASON = (!(POS = connections[POS][DIR]) ? "outofbounds" : BLOCKS[POS] ? "hitblock" : !allowedsteps[POS] ? "nomoresteps" : null))) {
        walkedsquares.push(POS);
        ARTIFACTS["beingpushed"][POS] = {};
      }
      var WALKLENGTH = walkedsquares.length;
      if (WALKLENGTH) {
        if ((["hitblock", "outofbounds"].indexOf(STOPREASON) !== -1)) {
          ARTIFACTS["squished"][walkedsquares[WALKLENGTH - 1]] = {};
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
    turn.links[newstepid].move = 'move1';
    return newstep;
  };
  game.selectmovetarget1instruction = function(turn, step) {
    let MARKS = step.MARKS;
    let ARTIFACTS = step.ARTIFACTS;
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
        text: "to move your"
      }, {
        type: 'posref',
        pos: MARKS["selectunit"]
      }, {
        type: "unittyperef",
        alias: "rook",
        name: "rook".replace(/s$/, '')
      }, {
        type: 'text',
        text: "to"
      }, {
        type: 'posref',
        pos: MARKS["selectmovetarget"]
      }, Object.keys(ARTIFACTS.squished).length !== 0 ? collapseLine({
        type: 'line',
        content: [{
          type: 'text',
          text: "and squash the enemy at"
        }, {
          type: 'posref',
          pos: Object.keys(ARTIFACTS.squished)[0]
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
    let BATTLEVARS = Object.assign({}, step.BATTLEVARS);
    { 
      BATTLEVARS["pusheeid"] = (UNITLAYERS.units[MARKS["selectmovetarget"]] || {})["id"];
    } { 
      BATTLEVARS["pushsquare"] = MARKS["selectmovetarget"];
    } { 
      let LOOPID;
      for (let POS in ARTIFACTS.beingpushed) {
        if (LOOPID = (UNITLAYERS.units[POS] || {}).id) {
          let pushid = LOOPID;
          let pushdir = (ARTIFACTS.movetargets[MARKS["selectmovetarget"]] || {})["dir"];
          let dist = 1;
          let newpos = UNITDATA[pushid].pos;
          while (dist && connections[newpos][pushdir]) {
            newpos = connections[newpos][pushdir];
            dist--;
          }
          UNITDATA[pushid] = Object.assign({}, UNITDATA[pushid], {
            pos: newpos
          });
          // TODO - check that it uses ['loopid'] ?
        }
      }
    } { 
      let LOOPID;
      for (let POS in ARTIFACTS.squished) {
        if (LOOPID = (UNITLAYERS.units[POS] || {}).id) {
          delete UNITDATA[LOOPID]; // TODO - check that it uses ['loopid'] ?
        }
      }
    } { 
      let unitid = (UNITLAYERS.units[MARKS["selectunit"]]  || {}).id;
      if (unitid) {
        UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
          "pos": MARKS["selectmovetarget"]
        });
      }
    }
    MARKS = {};
    UNITLAYERS = {
      "soldiers": {},
      "mysoldiers": {},
      "oppsoldiers": {},
      "neutralsoldiers": {},
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
      "movetargets": {},
      "beingpushed": {},
      "squished": {}
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
        ,
      BATTLEVARS: BATTLEVARS
    });
    turn.links[newstepid] = {};
    if (Object.keys(
        (function() {
          let ret = {},
            s0 = TERRAIN.oppcorner,
            s1 = UNITLAYERS.myunits;
          for (let key in s0) {
            if (s1[key]) {
              ret[key] = s0[key];
            }
          }
          return ret;
        }())).length !== 0) {
      let winner = 1;
      let result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
      turn.links[newstepid][result] = 'invade';
      turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
      turn.endMarks[newstepid].invade =
        (function() {
          let ret = {},
            s0 = TERRAIN.oppcorner,
            s1 = UNITLAYERS.myunits;
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
      "movetargets": {},
      "beingpushed": {},
      "squished": {}
    };
    let UNITDATA = step.UNITDATA;
    let BATTLEVARS = step.BATTLEVARS;
    let UNITLAYERS = {
      "soldiers": {},
      "mysoldiers": {},
      "oppsoldiers": {},
      "neutralsoldiers": {},
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
        ,
      BATTLEVARS: BATTLEVARS
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
        alias: "rook",
        name: "rook".replace(/s$/, '')
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
})();
(function() {
  let TERRAIN = terrainLayers(boardDef, 2);
  let ownernames = ["neutral", "opp", "my"];
  let player = 2;
  let otherplayer = 1;
  game.selectunit2 = function(turn, step, markpos) {
    let BATTLEVARS = step.BATTLEVARS;
    let ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
      movetargets: Object.assign({}, step.ARTIFACTS.movetargets)
    });
    let UNITLAYERS = step.UNITLAYERS;
    let MARKS = {
      selectunit: markpos
    };
    let BLOCKS = UNITLAYERS.units;
    let STARTPOS = MARKS["selectunit"];
    let allwalkerdirs = [1, 3, 5, 7];
    for (let walkerdirnbr = 0; walkerdirnbr < 4; walkerdirnbr++) {
      let DIR = allwalkerdirs[walkerdirnbr];
      let STOPREASON = "";
      let POS = STARTPOS;
      while (!(STOPREASON = (!(POS = connections[POS][DIR]) ? "outofbounds" : BLOCKS[POS] ? "hitblock" : null))) {
        ARTIFACTS["movetargets"][POS] = {};
      }
      if (BLOCKS[POS]) {
        if (!((POS === BATTLEVARS['pushsquare']) && ((UNITLAYERS.units[MARKS["selectunit"]] || {})["id"] === BATTLEVARS["pusheeid"])) && UNITLAYERS.oppunits[POS]) {
          ARTIFACTS["movetargets"][POS] = {
            dir: DIR
          };
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
    return collapseLine({
      type: 'line',
      content: [{
        type: 'text',
        text: "Select where to move your"
      }, {
        type: 'posref',
        pos: MARKS["selectunit"]
      }, {
        type: "unittyperef",
        alias: "rook",
        name: "rook".replace(/s$/, '')
      }]
    });
  };
  game.selectmovetarget2 = function(turn, step, markpos) {
    let ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
      beingpushed: Object.assign({}, step.ARTIFACTS.beingpushed),
      squished: Object.assign({}, step.ARTIFACTS.squished)
    });
    let UNITLAYERS = step.UNITLAYERS;
    let MARKS = {
      selectmovetarget: markpos,
      selectunit: step.MARKS.selectunit
    };
    if (!!(UNITLAYERS.oppunits[MARKS["selectmovetarget"]])) {
      let allowedsteps = UNITLAYERS.oppunits;
      let BLOCKS = UNITLAYERS.myunits;
      let STARTPOS = MARKS["selectmovetarget"];
      let DIR = relativedirs[(ARTIFACTS.movetargets[MARKS["selectmovetarget"]] || {})["dir"] - 2 + 1];
      let walkedsquares = [];
      let STOPREASON = "";
      let POS = "faux";
      connections.faux[DIR] = STARTPOS;
      while (!(STOPREASON = (!(POS = connections[POS][DIR]) ? "outofbounds" : BLOCKS[POS] ? "hitblock" : !allowedsteps[POS] ? "nomoresteps" : null))) {
        walkedsquares.push(POS);
        ARTIFACTS["beingpushed"][POS] = {};
      }
      var WALKLENGTH = walkedsquares.length;
      if (WALKLENGTH) {
        if ((["hitblock", "outofbounds"].indexOf(STOPREASON) !== -1)) {
          ARTIFACTS["squished"][walkedsquares[WALKLENGTH - 1]] = {};
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
    turn.links[newstepid].move = 'move2';
    return newstep;
  };
  game.selectmovetarget2instruction = function(turn, step) {
    let MARKS = step.MARKS;
    let ARTIFACTS = step.ARTIFACTS;
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
        text: "to move your"
      }, {
        type: 'posref',
        pos: MARKS["selectunit"]
      }, {
        type: "unittyperef",
        alias: "rook",
        name: "rook".replace(/s$/, '')
      }, {
        type: 'text',
        text: "to"
      }, {
        type: 'posref',
        pos: MARKS["selectmovetarget"]
      }, Object.keys(ARTIFACTS.squished).length !== 0 ? collapseLine({
        type: 'line',
        content: [{
          type: 'text',
          text: "and squash the enemy at"
        }, {
          type: 'posref',
          pos: Object.keys(ARTIFACTS.squished)[0]
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
    let BATTLEVARS = Object.assign({}, step.BATTLEVARS);
    { 
      BATTLEVARS["pusheeid"] = (UNITLAYERS.units[MARKS["selectmovetarget"]] || {})["id"];
    } { 
      BATTLEVARS["pushsquare"] = MARKS["selectmovetarget"];
    } { 
      let LOOPID;
      for (let POS in ARTIFACTS.beingpushed) {
        if (LOOPID = (UNITLAYERS.units[POS] || {}).id) {
          let pushid = LOOPID;
          let pushdir = (ARTIFACTS.movetargets[MARKS["selectmovetarget"]] || {})["dir"];
          let dist = 1;
          let newpos = UNITDATA[pushid].pos;
          while (dist && connections[newpos][pushdir]) {
            newpos = connections[newpos][pushdir];
            dist--;
          }
          UNITDATA[pushid] = Object.assign({}, UNITDATA[pushid], {
            pos: newpos
          });
          // TODO - check that it uses ['loopid'] ?
        }
      }
    } { 
      let LOOPID;
      for (let POS in ARTIFACTS.squished) {
        if (LOOPID = (UNITLAYERS.units[POS] || {}).id) {
          delete UNITDATA[LOOPID]; // TODO - check that it uses ['loopid'] ?
        }
      }
    } { 
      let unitid = (UNITLAYERS.units[MARKS["selectunit"]]  || {}).id;
      if (unitid) {
        UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
          "pos": MARKS["selectmovetarget"]
        });
      }
    }
    MARKS = {};
    UNITLAYERS = {
      "soldiers": {},
      "mysoldiers": {},
      "oppsoldiers": {},
      "neutralsoldiers": {},
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
      "movetargets": {},
      "beingpushed": {},
      "squished": {}
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
        ,
      BATTLEVARS: BATTLEVARS
    });
    turn.links[newstepid] = {};
    if (Object.keys(
        (function() {
          let ret = {},
            s0 = TERRAIN.oppcorner,
            s1 = UNITLAYERS.myunits;
          for (let key in s0) {
            if (s1[key]) {
              ret[key] = s0[key];
            }
          }
          return ret;
        }())).length !== 0) {
      let winner = 2;
      let result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
      turn.links[newstepid][result] = 'invade';
      turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
      turn.endMarks[newstepid].invade =
        (function() {
          let ret = {},
            s0 = TERRAIN.oppcorner,
            s1 = UNITLAYERS.myunits;
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
      "movetargets": {},
      "beingpushed": {},
      "squished": {}
    };
    let UNITDATA = step.UNITDATA;
    let BATTLEVARS = step.BATTLEVARS;
    let UNITLAYERS = {
      "soldiers": {},
      "mysoldiers": {},
      "oppsoldiers": {},
      "neutralsoldiers": {},
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
        ,
      BATTLEVARS: BATTLEVARS
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
        alias: "rook",
        name: "rook".replace(/s$/, '')
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
})();
export default game;