import fullDef from '../../games/dist/games/shoveoff';
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
  "north": 1,
  "south": 1,
  "east": 1,
  "west": 1
};
game.graphics = {
  "icons": {
    "soldiers": "pawn"
  },
  "tiles": {}
};
game.board = {
  "height": 4,
  "width": 4,
  "terrain": {
    "southedge": [
      ["rect", "a1", "d1"]
    ],
    "northedge": [
      ["rect", "a4", "d4"]
    ],
    "westedge": [
      ["rect", "a1", "a4"]
    ],
    "eastedge": [
      ["rect", "d1", "d4"]
    ],
    "edge": [
      ["holerect", "a1", "d4", ["b2", "b3", "c2", "c3"]]
    ]
  }
};
game.AI = [];
game.id = "shoveoff";
let connections = boardConnections(fullDef.board);
let BOARD = boardLayers(fullDef.board);
game.newGame = function() {
  let turnseed = {
    turn: 0
  };
  let stepseed = {
    UNITDATA: deduceInitialUnitData({
        "soldiers": {
          "0": [
            ["rect", "a1", "d4"]
          ]
        }
      })
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
  let TERRAIN = terrainLayers(fullDef.board, 1);
  let ownernames = ["neutral", "my", "opp"];
  let player = 1;
  let otherplayer = 2;
  game.selectpushpoint1 = function(turn, step, markpos) {
    let ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
      targetedgepoints: Object.assign({}, step.ARTIFACTS.targetedgepoints),
      squishsouth: Object.assign({}, step.ARTIFACTS.squishsouth),
      squishwest: Object.assign({}, step.ARTIFACTS.squishwest),
      squishnorth: Object.assign({}, step.ARTIFACTS.squishnorth),
      squisheast: Object.assign({}, step.ARTIFACTS.squisheast),
      pushsouth: Object.assign({}, step.ARTIFACTS.pushsouth),
      pushwest: Object.assign({}, step.ARTIFACTS.pushwest),
      pushnorth: Object.assign({}, step.ARTIFACTS.pushnorth),
      pusheast: Object.assign({}, step.ARTIFACTS.pusheast),
      spawnsouth: Object.assign({}, step.ARTIFACTS.spawnsouth),
      spawnwest: Object.assign({}, step.ARTIFACTS.spawnwest),
      spawnnorth: Object.assign({}, step.ARTIFACTS.spawnnorth),
      spawneast: Object.assign({}, step.ARTIFACTS.spawneast)
    });
    let UNITLAYERS = step.UNITLAYERS;
    let MARKS = {
      selectpushpoint: markpos
    }; {
      let STARTPOS = MARKS["selectpushpoint"];
      let allwalkerdirs = [1, 3, 5, 7];
      for (let walkerdirnbr = 0; walkerdirnbr < 4; walkerdirnbr++) {
        let DIR = allwalkerdirs[walkerdirnbr];
        let walkedsquares = [];
        let POS = STARTPOS;
        while ((POS = connections[POS][DIR])) {
          walkedsquares.push(POS);
        }
        var WALKLENGTH = walkedsquares.length;
        if (WALKLENGTH) {
          if ((WALKLENGTH === 3) && !UNITLAYERS.oppunits[walkedsquares[WALKLENGTH - 1]]) {
            ARTIFACTS["targetedgepoints"][walkedsquares[WALKLENGTH - 1]] = {
              dir: relativedirs[5 - 2 + DIR]
            };
          }
        }
      }
    } {
      let walkstarts = ARTIFACTS.targetedgepoints;
      for (let STARTPOS in walkstarts) {
        let DIR = (ARTIFACTS.targetedgepoints[STARTPOS] || {})["dir"];
        let walkedsquares = [];
        let POS = "faux";
        connections.faux[DIR] = STARTPOS;
        let STEP = 0;
        while ((POS = connections[POS][DIR])) {
          walkedsquares.push(POS);
          STEP++;
          if ((STEP !== 1)) {
            ARTIFACTS[((DIR === 1) ? "pushsouth" : ((DIR === 3) ? "pushwest" : ((DIR === 5) ? "pushnorth" : "pusheast")))][POS] = {};
          }
        }
        var WALKLENGTH = walkedsquares.length;
        ARTIFACTS[((DIR === 1) ? "squishsouth" : ((DIR === 3) ? "squishwest" : ((DIR === 5) ? "squishnorth" : "squisheast")))][STARTPOS] = {};
        if (WALKLENGTH) {
          ARTIFACTS[((DIR === 1) ? "spawnsouth" : ((DIR === 3) ? "spawnwest" : ((DIR === 5) ? "spawnnorth" : "spawneast")))][walkedsquares[WALKLENGTH - 1]] = {};
        }
      }
    }
    let newstepid = step.stepid + '-' + markpos;
    let newstep = turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      stepid: newstepid,
      path: step.path.concat(markpos),
      name: 'selectpushpoint'
    });
    turn.links[newstepid] = {};
    if (Object.keys(ARTIFACTS.spawnsouth).length !== 0) {
      { 
        turn.links[newstepid].south = 'south1';
      }
    }
    if (Object.keys(ARTIFACTS.spawnnorth).length !== 0) {
      { 
        turn.links[newstepid].north = 'north1';
      }
    }
    if (Object.keys(ARTIFACTS.spawnwest).length !== 0) {
      { 
        turn.links[newstepid].west = 'west1';
      }
    }
    if (Object.keys(ARTIFACTS.spawneast).length !== 0) {
      { 
        turn.links[newstepid].east = 'east1';
      }
    }
    return newstep;
  };
  game.selectpushpoint1instruction = function(turn, step) {
    let MARKS = step.MARKS;
    let ARTIFACTS = step.ARTIFACTS;
    return collapseLine({
      type: 'line',
      content: [{
          type: 'text',
          text: "Press"
        },
        [{
          cond: Object.keys(ARTIFACTS.spawnsouth).length !== 0,
          content: {
            type: 'cmndref',
            cmnd: "south"
          }
        }, {
          cond: Object.keys(ARTIFACTS.spawnnorth).length !== 0,
          content: {
            type: 'cmndref',
            cmnd: "north"
          }
        }, {
          cond: Object.keys(ARTIFACTS.spawnwest).length !== 0,
          content: {
            type: 'cmndref',
            cmnd: "west"
          }
        }, {
          cond: Object.keys(ARTIFACTS.spawneast).length !== 0,
          content: {
            type: 'cmndref',
            cmnd: "east"
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
          text: "to shove in that direction and make room for the new unit at"
        }, {
          type: 'posref',
          pos: MARKS["selectpushpoint"]
        }
      ]
    });
  };
  game.north1 = function(turn, step) {
    let ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
      fourinarow: Object.assign({}, step.ARTIFACTS.fourinarow)
    });
    let MARKS = step.MARKS;
    let UNITDATA = Object.assign({}, step.UNITDATA);
    let clones = step.clones;
    let UNITLAYERS = step.UNITLAYERS;
    { 
      delete UNITDATA[(UNITLAYERS.units[Object.keys(ARTIFACTS.squishnorth)[0]]  || {}).id];
    } { 
      let LOOPID;
      for (let POS in ARTIFACTS.pushnorth) {
        if (LOOPID = (UNITLAYERS.units[POS] || {}).id) {
          let pushid = LOOPID;
          let pushdir = 1;
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
      let newunitid = 'spawn' + (clones++);
      UNITDATA[newunitid] = {
        pos: Object.keys(ARTIFACTS.spawnnorth)[0],
        id: newunitid,
        group: "soldiers",
        owner: ((8 > Object.keys(UNITLAYERS.myunits).length) ? 1 : 0)
      };
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
      "targetedgepoints": {},
      "squishsouth": {},
      "squishwest": {},
      "squishnorth": {},
      "squisheast": {},
      "pushsouth": {},
      "pushwest": {},
      "pushnorth": {},
      "pusheast": {},
      "spawnsouth": {},
      "spawnwest": {},
      "spawnnorth": {},
      "spawneast": {},
      "fourinarow": {}
    };
    let allowedsteps = UNITLAYERS.myunits;
    let walkstarts = UNITLAYERS.myunits;
    for (let STARTPOS in walkstarts) {
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
          if ((WALKLENGTH === 4)) {
            ARTIFACTS["fourinarow"][POS] = {};
          }
        }
      }
    }
    let newstepid = step.stepid + '-' + 'north';
    let newstep = turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      UNITDATA: UNITDATA,
      UNITLAYERS: UNITLAYERS,
      stepid: newstepid,
      name: 'north',
      path: step.path.concat('north'),
      clones: clones
    });
    turn.links[newstepid] = {};
    if (Object.keys(ARTIFACTS.fourinarow).length !== 0) {
      let winner = 1;
      let result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
      turn.links[newstepid][result] = 'madeline';
      turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
      turn.endMarks[newstepid].madeline = ARTIFACTS.fourinarow;
    } else turn.links[newstepid].endturn = "start" + otherplayer;
    return newstep;
  }
  game.south1 = function(turn, step) {
    let ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
      fourinarow: Object.assign({}, step.ARTIFACTS.fourinarow)
    });
    let MARKS = step.MARKS;
    let UNITDATA = Object.assign({}, step.UNITDATA);
    let clones = step.clones;
    let UNITLAYERS = step.UNITLAYERS;
    { 
      delete UNITDATA[(UNITLAYERS.units[Object.keys(ARTIFACTS.squishsouth)[0]]  || {}).id];
    } { 
      let LOOPID;
      for (let POS in ARTIFACTS.pushsouth) {
        if (LOOPID = (UNITLAYERS.units[POS] || {}).id) {
          let pushid = LOOPID;
          let pushdir = 5;
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
      let newunitid = 'spawn' + (clones++);
      UNITDATA[newunitid] = {
        pos: Object.keys(ARTIFACTS.spawnsouth)[0],
        id: newunitid,
        group: "soldiers",
        owner: ((8 > Object.keys(UNITLAYERS.myunits).length) ? 1 : 0)
      };
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
      "targetedgepoints": {},
      "squishsouth": {},
      "squishwest": {},
      "squishnorth": {},
      "squisheast": {},
      "pushsouth": {},
      "pushwest": {},
      "pushnorth": {},
      "pusheast": {},
      "spawnsouth": {},
      "spawnwest": {},
      "spawnnorth": {},
      "spawneast": {},
      "fourinarow": {}
    };
    let allowedsteps = UNITLAYERS.myunits;
    let walkstarts = UNITLAYERS.myunits;
    for (let STARTPOS in walkstarts) {
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
          if ((WALKLENGTH === 4)) {
            ARTIFACTS["fourinarow"][POS] = {};
          }
        }
      }
    }
    let newstepid = step.stepid + '-' + 'south';
    let newstep = turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      UNITDATA: UNITDATA,
      UNITLAYERS: UNITLAYERS,
      stepid: newstepid,
      name: 'south',
      path: step.path.concat('south'),
      clones: clones
    });
    turn.links[newstepid] = {};
    if (Object.keys(ARTIFACTS.fourinarow).length !== 0) {
      let winner = 1;
      let result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
      turn.links[newstepid][result] = 'madeline';
      turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
      turn.endMarks[newstepid].madeline = ARTIFACTS.fourinarow;
    } else turn.links[newstepid].endturn = "start" + otherplayer;
    return newstep;
  }
  game.east1 = function(turn, step) {
    let ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
      fourinarow: Object.assign({}, step.ARTIFACTS.fourinarow)
    });
    let MARKS = step.MARKS;
    let UNITDATA = Object.assign({}, step.UNITDATA);
    let clones = step.clones;
    let UNITLAYERS = step.UNITLAYERS;
    { 
      delete UNITDATA[(UNITLAYERS.units[Object.keys(ARTIFACTS.squisheast)[0]]  || {}).id];
    } { 
      let LOOPID;
      for (let POS in ARTIFACTS.pusheast) {
        if (LOOPID = (UNITLAYERS.units[POS] || {}).id) {
          let pushid = LOOPID;
          let pushdir = 3;
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
      let newunitid = 'spawn' + (clones++);
      UNITDATA[newunitid] = {
        pos: Object.keys(ARTIFACTS.spawneast)[0],
        id: newunitid,
        group: "soldiers",
        owner: ((8 > Object.keys(UNITLAYERS.myunits).length) ? 1 : 0)
      };
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
      "targetedgepoints": {},
      "squishsouth": {},
      "squishwest": {},
      "squishnorth": {},
      "squisheast": {},
      "pushsouth": {},
      "pushwest": {},
      "pushnorth": {},
      "pusheast": {},
      "spawnsouth": {},
      "spawnwest": {},
      "spawnnorth": {},
      "spawneast": {},
      "fourinarow": {}
    };
    let allowedsteps = UNITLAYERS.myunits;
    let walkstarts = UNITLAYERS.myunits;
    for (let STARTPOS in walkstarts) {
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
          if ((WALKLENGTH === 4)) {
            ARTIFACTS["fourinarow"][POS] = {};
          }
        }
      }
    }
    let newstepid = step.stepid + '-' + 'east';
    let newstep = turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      UNITDATA: UNITDATA,
      UNITLAYERS: UNITLAYERS,
      stepid: newstepid,
      name: 'east',
      path: step.path.concat('east'),
      clones: clones
    });
    turn.links[newstepid] = {};
    if (Object.keys(ARTIFACTS.fourinarow).length !== 0) {
      let winner = 1;
      let result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
      turn.links[newstepid][result] = 'madeline';
      turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
      turn.endMarks[newstepid].madeline = ARTIFACTS.fourinarow;
    } else turn.links[newstepid].endturn = "start" + otherplayer;
    return newstep;
  }
  game.west1 = function(turn, step) {
    let ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
      fourinarow: Object.assign({}, step.ARTIFACTS.fourinarow)
    });
    let MARKS = step.MARKS;
    let UNITDATA = Object.assign({}, step.UNITDATA);
    let clones = step.clones;
    let UNITLAYERS = step.UNITLAYERS;
    { 
      delete UNITDATA[(UNITLAYERS.units[Object.keys(ARTIFACTS.squishwest)[0]]  || {}).id];
    } { 
      let LOOPID;
      for (let POS in ARTIFACTS.pushwest) {
        if (LOOPID = (UNITLAYERS.units[POS] || {}).id) {
          let pushid = LOOPID;
          let pushdir = 7;
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
      let newunitid = 'spawn' + (clones++);
      UNITDATA[newunitid] = {
        pos: Object.keys(ARTIFACTS.spawnwest)[0],
        id: newunitid,
        group: "soldiers",
        owner: ((8 > Object.keys(UNITLAYERS.myunits).length) ? 1 : 0)
      };
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
      "targetedgepoints": {},
      "squishsouth": {},
      "squishwest": {},
      "squishnorth": {},
      "squisheast": {},
      "pushsouth": {},
      "pushwest": {},
      "pushnorth": {},
      "pusheast": {},
      "spawnsouth": {},
      "spawnwest": {},
      "spawnnorth": {},
      "spawneast": {},
      "fourinarow": {}
    };
    let allowedsteps = UNITLAYERS.myunits;
    let walkstarts = UNITLAYERS.myunits;
    for (let STARTPOS in walkstarts) {
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
          if ((WALKLENGTH === 4)) {
            ARTIFACTS["fourinarow"][POS] = {};
          }
        }
      }
    }
    let newstepid = step.stepid + '-' + 'west';
    let newstep = turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      UNITDATA: UNITDATA,
      UNITLAYERS: UNITLAYERS,
      stepid: newstepid,
      name: 'west',
      path: step.path.concat('west'),
      clones: clones
    });
    turn.links[newstepid] = {};
    if (Object.keys(ARTIFACTS.fourinarow).length !== 0) {
      let winner = 1;
      let result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
      turn.links[newstepid][result] = 'madeline';
      turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
      turn.endMarks[newstepid].madeline = ARTIFACTS.fourinarow;
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
      "targetedgepoints": {},
      "squishsouth": {},
      "squishwest": {},
      "squishnorth": {},
      "squisheast": {},
      "pushsouth": {},
      "pushwest": {},
      "pushnorth": {},
      "pusheast": {},
      "spawnsouth": {},
      "spawnwest": {},
      "spawnnorth": {},
      "spawneast": {},
      "fourinarow": {}
    };
    let UNITDATA = step.UNITDATA;
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
      clones: step.clones,
      path: []
    };
    let newlinks = turn.links.root;
    for (let linkpos in TERRAIN.edge) {
      newlinks[linkpos] = 'selectpushpoint1';
    }
    return turn;
  }
  game.start1instruction = function(turn, step) {
    let UNITLAYERS = step.UNITLAYERS;
    return collapseLine({
      type: 'line',
      content: [{
        type: 'text',
        text: "Select where to shove in"
      }, ((Object.keys(UNITLAYERS.myunits).length === 7) ? {
        type: 'text',
        text: "your last off-board unit"
      } : ((Object.keys(UNITLAYERS.myunits).length === 8) ? {
        type: 'text',
        text: "a neutral unit"
      } : collapseLine({
        type: 'line',
        content: [{
          type: 'text',
          text: "one of your"
        }, {
          type: 'text',
          text: (8 - Object.keys(UNITLAYERS.myunits).length)
        }, {
          type: 'text',
          text: "remaining off-board units"
        }]
      })))]
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
  game.selectpushpoint2 = function(turn, step, markpos) {
    let ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
      targetedgepoints: Object.assign({}, step.ARTIFACTS.targetedgepoints),
      squishsouth: Object.assign({}, step.ARTIFACTS.squishsouth),
      squishwest: Object.assign({}, step.ARTIFACTS.squishwest),
      squishnorth: Object.assign({}, step.ARTIFACTS.squishnorth),
      squisheast: Object.assign({}, step.ARTIFACTS.squisheast),
      pushsouth: Object.assign({}, step.ARTIFACTS.pushsouth),
      pushwest: Object.assign({}, step.ARTIFACTS.pushwest),
      pushnorth: Object.assign({}, step.ARTIFACTS.pushnorth),
      pusheast: Object.assign({}, step.ARTIFACTS.pusheast),
      spawnsouth: Object.assign({}, step.ARTIFACTS.spawnsouth),
      spawnwest: Object.assign({}, step.ARTIFACTS.spawnwest),
      spawnnorth: Object.assign({}, step.ARTIFACTS.spawnnorth),
      spawneast: Object.assign({}, step.ARTIFACTS.spawneast)
    });
    let UNITLAYERS = step.UNITLAYERS;
    let MARKS = {
      selectpushpoint: markpos
    }; {
      let STARTPOS = MARKS["selectpushpoint"];
      let allwalkerdirs = [1, 3, 5, 7];
      for (let walkerdirnbr = 0; walkerdirnbr < 4; walkerdirnbr++) {
        let DIR = allwalkerdirs[walkerdirnbr];
        let walkedsquares = [];
        let POS = STARTPOS;
        while ((POS = connections[POS][DIR])) {
          walkedsquares.push(POS);
        }
        var WALKLENGTH = walkedsquares.length;
        if (WALKLENGTH) {
          if ((WALKLENGTH === 3) && !UNITLAYERS.oppunits[walkedsquares[WALKLENGTH - 1]]) {
            ARTIFACTS["targetedgepoints"][walkedsquares[WALKLENGTH - 1]] = {
              dir: relativedirs[5 - 2 + DIR]
            };
          }
        }
      }
    } {
      let walkstarts = ARTIFACTS.targetedgepoints;
      for (let STARTPOS in walkstarts) {
        let DIR = (ARTIFACTS.targetedgepoints[STARTPOS] || {})["dir"];
        let walkedsquares = [];
        let POS = "faux";
        connections.faux[DIR] = STARTPOS;
        let STEP = 0;
        while ((POS = connections[POS][DIR])) {
          walkedsquares.push(POS);
          STEP++;
          if ((STEP !== 1)) {
            ARTIFACTS[((DIR === 1) ? "pushsouth" : ((DIR === 3) ? "pushwest" : ((DIR === 5) ? "pushnorth" : "pusheast")))][POS] = {};
          }
        }
        var WALKLENGTH = walkedsquares.length;
        ARTIFACTS[((DIR === 1) ? "squishsouth" : ((DIR === 3) ? "squishwest" : ((DIR === 5) ? "squishnorth" : "squisheast")))][STARTPOS] = {};
        if (WALKLENGTH) {
          ARTIFACTS[((DIR === 1) ? "spawnsouth" : ((DIR === 3) ? "spawnwest" : ((DIR === 5) ? "spawnnorth" : "spawneast")))][walkedsquares[WALKLENGTH - 1]] = {};
        }
      }
    }
    let newstepid = step.stepid + '-' + markpos;
    let newstep = turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      stepid: newstepid,
      path: step.path.concat(markpos),
      name: 'selectpushpoint'
    });
    turn.links[newstepid] = {};
    if (Object.keys(ARTIFACTS.spawnsouth).length !== 0) {
      { 
        turn.links[newstepid].south = 'south2';
      }
    }
    if (Object.keys(ARTIFACTS.spawnnorth).length !== 0) {
      { 
        turn.links[newstepid].north = 'north2';
      }
    }
    if (Object.keys(ARTIFACTS.spawnwest).length !== 0) {
      { 
        turn.links[newstepid].west = 'west2';
      }
    }
    if (Object.keys(ARTIFACTS.spawneast).length !== 0) {
      { 
        turn.links[newstepid].east = 'east2';
      }
    }
    return newstep;
  };
  game.selectpushpoint2instruction = function(turn, step) {
    let MARKS = step.MARKS;
    let ARTIFACTS = step.ARTIFACTS;
    return collapseLine({
      type: 'line',
      content: [{
          type: 'text',
          text: "Press"
        },
        [{
          cond: Object.keys(ARTIFACTS.spawnsouth).length !== 0,
          content: {
            type: 'cmndref',
            cmnd: "south"
          }
        }, {
          cond: Object.keys(ARTIFACTS.spawnnorth).length !== 0,
          content: {
            type: 'cmndref',
            cmnd: "north"
          }
        }, {
          cond: Object.keys(ARTIFACTS.spawnwest).length !== 0,
          content: {
            type: 'cmndref',
            cmnd: "west"
          }
        }, {
          cond: Object.keys(ARTIFACTS.spawneast).length !== 0,
          content: {
            type: 'cmndref',
            cmnd: "east"
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
          text: "to shove in that direction and make room for the new unit at"
        }, {
          type: 'posref',
          pos: MARKS["selectpushpoint"]
        }
      ]
    });
  };
  game.north2 = function(turn, step) {
    let ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
      fourinarow: Object.assign({}, step.ARTIFACTS.fourinarow)
    });
    let MARKS = step.MARKS;
    let UNITDATA = Object.assign({}, step.UNITDATA);
    let clones = step.clones;
    let UNITLAYERS = step.UNITLAYERS;
    { 
      delete UNITDATA[(UNITLAYERS.units[Object.keys(ARTIFACTS.squishnorth)[0]]  || {}).id];
    } { 
      let LOOPID;
      for (let POS in ARTIFACTS.pushnorth) {
        if (LOOPID = (UNITLAYERS.units[POS] || {}).id) {
          let pushid = LOOPID;
          let pushdir = 1;
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
      let newunitid = 'spawn' + (clones++);
      UNITDATA[newunitid] = {
        pos: Object.keys(ARTIFACTS.spawnnorth)[0],
        id: newunitid,
        group: "soldiers",
        owner: ((8 > Object.keys(UNITLAYERS.myunits).length) ? 2 : 0)
      };
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
      "targetedgepoints": {},
      "squishsouth": {},
      "squishwest": {},
      "squishnorth": {},
      "squisheast": {},
      "pushsouth": {},
      "pushwest": {},
      "pushnorth": {},
      "pusheast": {},
      "spawnsouth": {},
      "spawnwest": {},
      "spawnnorth": {},
      "spawneast": {},
      "fourinarow": {}
    };
    let allowedsteps = UNITLAYERS.myunits;
    let walkstarts = UNITLAYERS.myunits;
    for (let STARTPOS in walkstarts) {
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
          if ((WALKLENGTH === 4)) {
            ARTIFACTS["fourinarow"][POS] = {};
          }
        }
      }
    }
    let newstepid = step.stepid + '-' + 'north';
    let newstep = turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      UNITDATA: UNITDATA,
      UNITLAYERS: UNITLAYERS,
      stepid: newstepid,
      name: 'north',
      path: step.path.concat('north'),
      clones: clones
    });
    turn.links[newstepid] = {};
    if (Object.keys(ARTIFACTS.fourinarow).length !== 0) {
      let winner = 2;
      let result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
      turn.links[newstepid][result] = 'madeline';
      turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
      turn.endMarks[newstepid].madeline = ARTIFACTS.fourinarow;
    } else turn.links[newstepid].endturn = "start" + otherplayer;
    return newstep;
  }
  game.south2 = function(turn, step) {
    let ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
      fourinarow: Object.assign({}, step.ARTIFACTS.fourinarow)
    });
    let MARKS = step.MARKS;
    let UNITDATA = Object.assign({}, step.UNITDATA);
    let clones = step.clones;
    let UNITLAYERS = step.UNITLAYERS;
    { 
      delete UNITDATA[(UNITLAYERS.units[Object.keys(ARTIFACTS.squishsouth)[0]]  || {}).id];
    } { 
      let LOOPID;
      for (let POS in ARTIFACTS.pushsouth) {
        if (LOOPID = (UNITLAYERS.units[POS] || {}).id) {
          let pushid = LOOPID;
          let pushdir = 5;
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
      let newunitid = 'spawn' + (clones++);
      UNITDATA[newunitid] = {
        pos: Object.keys(ARTIFACTS.spawnsouth)[0],
        id: newunitid,
        group: "soldiers",
        owner: ((8 > Object.keys(UNITLAYERS.myunits).length) ? 2 : 0)
      };
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
      "targetedgepoints": {},
      "squishsouth": {},
      "squishwest": {},
      "squishnorth": {},
      "squisheast": {},
      "pushsouth": {},
      "pushwest": {},
      "pushnorth": {},
      "pusheast": {},
      "spawnsouth": {},
      "spawnwest": {},
      "spawnnorth": {},
      "spawneast": {},
      "fourinarow": {}
    };
    let allowedsteps = UNITLAYERS.myunits;
    let walkstarts = UNITLAYERS.myunits;
    for (let STARTPOS in walkstarts) {
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
          if ((WALKLENGTH === 4)) {
            ARTIFACTS["fourinarow"][POS] = {};
          }
        }
      }
    }
    let newstepid = step.stepid + '-' + 'south';
    let newstep = turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      UNITDATA: UNITDATA,
      UNITLAYERS: UNITLAYERS,
      stepid: newstepid,
      name: 'south',
      path: step.path.concat('south'),
      clones: clones
    });
    turn.links[newstepid] = {};
    if (Object.keys(ARTIFACTS.fourinarow).length !== 0) {
      let winner = 2;
      let result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
      turn.links[newstepid][result] = 'madeline';
      turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
      turn.endMarks[newstepid].madeline = ARTIFACTS.fourinarow;
    } else turn.links[newstepid].endturn = "start" + otherplayer;
    return newstep;
  }
  game.east2 = function(turn, step) {
    let ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
      fourinarow: Object.assign({}, step.ARTIFACTS.fourinarow)
    });
    let MARKS = step.MARKS;
    let UNITDATA = Object.assign({}, step.UNITDATA);
    let clones = step.clones;
    let UNITLAYERS = step.UNITLAYERS;
    { 
      delete UNITDATA[(UNITLAYERS.units[Object.keys(ARTIFACTS.squisheast)[0]]  || {}).id];
    } { 
      let LOOPID;
      for (let POS in ARTIFACTS.pusheast) {
        if (LOOPID = (UNITLAYERS.units[POS] || {}).id) {
          let pushid = LOOPID;
          let pushdir = 3;
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
      let newunitid = 'spawn' + (clones++);
      UNITDATA[newunitid] = {
        pos: Object.keys(ARTIFACTS.spawneast)[0],
        id: newunitid,
        group: "soldiers",
        owner: ((8 > Object.keys(UNITLAYERS.myunits).length) ? 2 : 0)
      };
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
      "targetedgepoints": {},
      "squishsouth": {},
      "squishwest": {},
      "squishnorth": {},
      "squisheast": {},
      "pushsouth": {},
      "pushwest": {},
      "pushnorth": {},
      "pusheast": {},
      "spawnsouth": {},
      "spawnwest": {},
      "spawnnorth": {},
      "spawneast": {},
      "fourinarow": {}
    };
    let allowedsteps = UNITLAYERS.myunits;
    let walkstarts = UNITLAYERS.myunits;
    for (let STARTPOS in walkstarts) {
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
          if ((WALKLENGTH === 4)) {
            ARTIFACTS["fourinarow"][POS] = {};
          }
        }
      }
    }
    let newstepid = step.stepid + '-' + 'east';
    let newstep = turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      UNITDATA: UNITDATA,
      UNITLAYERS: UNITLAYERS,
      stepid: newstepid,
      name: 'east',
      path: step.path.concat('east'),
      clones: clones
    });
    turn.links[newstepid] = {};
    if (Object.keys(ARTIFACTS.fourinarow).length !== 0) {
      let winner = 2;
      let result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
      turn.links[newstepid][result] = 'madeline';
      turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
      turn.endMarks[newstepid].madeline = ARTIFACTS.fourinarow;
    } else turn.links[newstepid].endturn = "start" + otherplayer;
    return newstep;
  }
  game.west2 = function(turn, step) {
    let ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
      fourinarow: Object.assign({}, step.ARTIFACTS.fourinarow)
    });
    let MARKS = step.MARKS;
    let UNITDATA = Object.assign({}, step.UNITDATA);
    let clones = step.clones;
    let UNITLAYERS = step.UNITLAYERS;
    { 
      delete UNITDATA[(UNITLAYERS.units[Object.keys(ARTIFACTS.squishwest)[0]]  || {}).id];
    } { 
      let LOOPID;
      for (let POS in ARTIFACTS.pushwest) {
        if (LOOPID = (UNITLAYERS.units[POS] || {}).id) {
          let pushid = LOOPID;
          let pushdir = 7;
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
      let newunitid = 'spawn' + (clones++);
      UNITDATA[newunitid] = {
        pos: Object.keys(ARTIFACTS.spawnwest)[0],
        id: newunitid,
        group: "soldiers",
        owner: ((8 > Object.keys(UNITLAYERS.myunits).length) ? 2 : 0)
      };
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
      "targetedgepoints": {},
      "squishsouth": {},
      "squishwest": {},
      "squishnorth": {},
      "squisheast": {},
      "pushsouth": {},
      "pushwest": {},
      "pushnorth": {},
      "pusheast": {},
      "spawnsouth": {},
      "spawnwest": {},
      "spawnnorth": {},
      "spawneast": {},
      "fourinarow": {}
    };
    let allowedsteps = UNITLAYERS.myunits;
    let walkstarts = UNITLAYERS.myunits;
    for (let STARTPOS in walkstarts) {
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
          if ((WALKLENGTH === 4)) {
            ARTIFACTS["fourinarow"][POS] = {};
          }
        }
      }
    }
    let newstepid = step.stepid + '-' + 'west';
    let newstep = turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      UNITDATA: UNITDATA,
      UNITLAYERS: UNITLAYERS,
      stepid: newstepid,
      name: 'west',
      path: step.path.concat('west'),
      clones: clones
    });
    turn.links[newstepid] = {};
    if (Object.keys(ARTIFACTS.fourinarow).length !== 0) {
      let winner = 2;
      let result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
      turn.links[newstepid][result] = 'madeline';
      turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
      turn.endMarks[newstepid].madeline = ARTIFACTS.fourinarow;
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
      "targetedgepoints": {},
      "squishsouth": {},
      "squishwest": {},
      "squishnorth": {},
      "squisheast": {},
      "pushsouth": {},
      "pushwest": {},
      "pushnorth": {},
      "pusheast": {},
      "spawnsouth": {},
      "spawnwest": {},
      "spawnnorth": {},
      "spawneast": {},
      "fourinarow": {}
    };
    let UNITDATA = step.UNITDATA;
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
      clones: step.clones,
      path: []
    };
    let newlinks = turn.links.root;
    for (let linkpos in TERRAIN.edge) {
      newlinks[linkpos] = 'selectpushpoint2';
    }
    return turn;
  }
  game.start2instruction = function(turn, step) {
    let UNITLAYERS = step.UNITLAYERS;
    return collapseLine({
      type: 'line',
      content: [{
        type: 'text',
        text: "Select where to shove in"
      }, ((Object.keys(UNITLAYERS.myunits).length === 7) ? {
        type: 'text',
        text: "your last off-board unit"
      } : ((Object.keys(UNITLAYERS.myunits).length === 8) ? {
        type: 'text',
        text: "a neutral unit"
      } : collapseLine({
        type: 'line',
        content: [{
          type: 'text',
          text: "one of your"
        }, {
          type: 'text',
          text: (8 - Object.keys(UNITLAYERS.myunits).length)
        }, {
          type: 'text',
          text: "remaining off-board units"
        }]
      })))]
    });
  };
  game.debug2 = function() {
    return {
      TERRAIN: TERRAIN
    };
  }
};
export default game;