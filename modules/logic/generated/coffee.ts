import fullDef from '../../games/dist/games/coffee';
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
  "uphill": 1,
  "downhill": 1,
  "horisontal": 1,
  "vertical": 1
};
game.graphics = {
  "icons": {
    "soldiers": "pawn",
    "markers": "pawn"
  },
  "tiles": {}
};
game.board = {
  "height": 5,
  "width": 5,
  "terrain": {}
};
game.AI = [];
game.id = "coffee";
let connections = boardConnections(fullDef.board);
let BOARD = boardLayers(fullDef.board);
let TERRAIN = terrainLayers(fullDef.board, 0);
game.newGame = function() {
  let turnseed = {
    turn: 0
  };
  let stepseed = {
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
{
  // Actions for player 1
  let ownernames = ["neutral", "my", "opp"];
  let player = 1;
  let otherplayer = 2;
  game.selectdrop1 = function(turn, step, markpos) {
    let ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
      FOOBAR: Object.assign({}, step.ARTIFACTS.FOOBAR),
      vertical: Object.assign({}, step.ARTIFACTS.vertical),
      uphill: Object.assign({}, step.ARTIFACTS.uphill),
      horisontal: Object.assign({}, step.ARTIFACTS.horisontal),
      downhill: Object.assign({}, step.ARTIFACTS.downhill)
    });
    let UNITLAYERS = step.UNITLAYERS;
    let MARKS = {
      selectdrop: markpos
    };
    let STARTPOS = MARKS["selectdrop"];
    let allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
    for (let walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
      let DIR = allwalkerdirs[walkerdirnbr];
      let POS = STARTPOS;
      while ((POS = connections[POS][DIR])) {
        if (!UNITLAYERS.units[POS]) {
          ARTIFACTS[["FOOBAR", "vertical", "uphill", "horisontal", "downhill", "vertical", "uphill", "horisontal", "downhill"][DIR]][POS] = {};
        }
      }
    }
    let newstepid = step.stepid + '-' + markpos;
    let newstep = turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      stepid: newstepid,
      path: step.path.concat(markpos),
      name: 'selectdrop'
    });
    turn.links[newstepid] = {};
    if (Object.keys(ARTIFACTS.uphill).length !== 0) {
      { 
        turn.links[newstepid].uphill = 'uphill1';
      }
    }
    if (Object.keys(ARTIFACTS.downhill).length !== 0) {
      { 
        turn.links[newstepid].downhill = 'downhill1';
      }
    }
    if (Object.keys(ARTIFACTS.vertical).length !== 0) {
      { 
        turn.links[newstepid].vertical = 'vertical1';
      }
    }
    if (Object.keys(ARTIFACTS.horisontal).length !== 0) {
      { 
        turn.links[newstepid].horisontal = 'horisontal1';
      }
    }
    return newstep;
  };
  game.selectdrop1instruction = function(turn, step) {
    let ARTIFACTS = step.ARTIFACTS;
    return collapseLine({
      type: 'line',
      content: [{
          type: 'text',
          text: "Press"
        },
        [{
          cond: Object.keys(ARTIFACTS.uphill).length !== 0,
          content: {
            type: 'cmndref',
            cmnd: "uphill"
          }
        }, {
          cond: Object.keys(ARTIFACTS.downhill).length !== 0,
          content: {
            type: 'cmndref',
            cmnd: "downhill"
          }
        }, {
          cond: Object.keys(ARTIFACTS.vertical).length !== 0,
          content: {
            type: 'cmndref',
            cmnd: "vertical"
          }
        }, {
          cond: Object.keys(ARTIFACTS.horisontal).length !== 0,
          content: {
            type: 'cmndref',
            cmnd: "horisontal"
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
          text: "to give your opponent placing options in that direction"
        }
      ]
    });
  };
  game.uphill1 = function(turn, step) {
    let ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
      winline: Object.assign({}, step.ARTIFACTS.winline)
    });
    let MARKS = step.MARKS;
    let UNITDATA = Object.assign({}, step.UNITDATA);
    let clones = step.clones;
    let UNITLAYERS = step.UNITLAYERS;
    { 
      for (let POS in UNITLAYERS.markers) {
        delete UNITDATA[(UNITLAYERS.units[POS]  || {}).id];
      }
    } { 
      let newunitid = 'spawn' + (clones++);
      UNITDATA[newunitid] = {
        pos: MARKS["selectdrop"],
        id: newunitid,
        group: "soldiers",
        owner: player
      };
    } { 
      for (let POS in ARTIFACTS.uphill) {
        let newunitid = 'spawn' + (clones++);
        UNITDATA[newunitid] = {
          pos: POS,
          id: newunitid,
          group: "markers",
          owner: 0
        };
      }
    }
    MARKS = {};
    UNITLAYERS = {
      "markers": {},
      "mymarkers": {},
      "oppmarkers": {},
      "neutralmarkers": {},
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
      "FOOBAR": {},
      "vertical": {},
      "uphill": {},
      "horisontal": {},
      "downhill": {},
      "winline": {}
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
          if ((4 === WALKLENGTH)) {
            ARTIFACTS["winline"][POS] = {};
          }
        }
      }
    }
    let newstepid = step.stepid + '-' + 'uphill';
    let newstep = turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      UNITDATA: UNITDATA,
      UNITLAYERS: UNITLAYERS,
      stepid: newstepid,
      name: 'uphill',
      path: step.path.concat('uphill'),
      clones: clones
    });
    turn.links[newstepid] = {};
    if (Object.keys(UNITLAYERS.markers).length === 0) {
      turn.blockedby = "nolegal";
    } else
    if (Object.keys(ARTIFACTS.winline).length !== 0) {
      let winner = 1;
      let result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
      turn.links[newstepid][result] = 'madeline';
      turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
      turn.endMarks[newstepid].madeline = ARTIFACTS.winline;
    } else turn.links[newstepid].endturn = "start" + otherplayer;
    return newstep;
  }
  game.downhill1 = function(turn, step) {
    let ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
      winline: Object.assign({}, step.ARTIFACTS.winline)
    });
    let MARKS = step.MARKS;
    let UNITDATA = Object.assign({}, step.UNITDATA);
    let clones = step.clones;
    let UNITLAYERS = step.UNITLAYERS;
    { 
      for (let POS in UNITLAYERS.markers) {
        delete UNITDATA[(UNITLAYERS.units[POS]  || {}).id];
      }
    } { 
      let newunitid = 'spawn' + (clones++);
      UNITDATA[newunitid] = {
        pos: MARKS["selectdrop"],
        id: newunitid,
        group: "soldiers",
        owner: player
      };
    } { 
      for (let POS in ARTIFACTS.downhill) {
        let newunitid = 'spawn' + (clones++);
        UNITDATA[newunitid] = {
          pos: POS,
          id: newunitid,
          group: "markers",
          owner: 0
        };
      }
    }
    MARKS = {};
    UNITLAYERS = {
      "markers": {},
      "mymarkers": {},
      "oppmarkers": {},
      "neutralmarkers": {},
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
      "FOOBAR": {},
      "vertical": {},
      "uphill": {},
      "horisontal": {},
      "downhill": {},
      "winline": {}
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
          if ((4 === WALKLENGTH)) {
            ARTIFACTS["winline"][POS] = {};
          }
        }
      }
    }
    let newstepid = step.stepid + '-' + 'downhill';
    let newstep = turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      UNITDATA: UNITDATA,
      UNITLAYERS: UNITLAYERS,
      stepid: newstepid,
      name: 'downhill',
      path: step.path.concat('downhill'),
      clones: clones
    });
    turn.links[newstepid] = {};
    if (Object.keys(UNITLAYERS.markers).length === 0) {
      turn.blockedby = "nolegal";
    } else
    if (Object.keys(ARTIFACTS.winline).length !== 0) {
      let winner = 1;
      let result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
      turn.links[newstepid][result] = 'madeline';
      turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
      turn.endMarks[newstepid].madeline = ARTIFACTS.winline;
    } else turn.links[newstepid].endturn = "start" + otherplayer;
    return newstep;
  }
  game.horisontal1 = function(turn, step) {
    let ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
      winline: Object.assign({}, step.ARTIFACTS.winline)
    });
    let MARKS = step.MARKS;
    let UNITDATA = Object.assign({}, step.UNITDATA);
    let clones = step.clones;
    let UNITLAYERS = step.UNITLAYERS;
    { 
      for (let POS in UNITLAYERS.markers) {
        delete UNITDATA[(UNITLAYERS.units[POS]  || {}).id];
      }
    } { 
      let newunitid = 'spawn' + (clones++);
      UNITDATA[newunitid] = {
        pos: MARKS["selectdrop"],
        id: newunitid,
        group: "soldiers",
        owner: player
      };
    } { 
      for (let POS in ARTIFACTS.horisontal) {
        let newunitid = 'spawn' + (clones++);
        UNITDATA[newunitid] = {
          pos: POS,
          id: newunitid,
          group: "markers",
          owner: 0
        };
      }
    }
    MARKS = {};
    UNITLAYERS = {
      "markers": {},
      "mymarkers": {},
      "oppmarkers": {},
      "neutralmarkers": {},
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
      "FOOBAR": {},
      "vertical": {},
      "uphill": {},
      "horisontal": {},
      "downhill": {},
      "winline": {}
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
          if ((4 === WALKLENGTH)) {
            ARTIFACTS["winline"][POS] = {};
          }
        }
      }
    }
    let newstepid = step.stepid + '-' + 'horisontal';
    let newstep = turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      UNITDATA: UNITDATA,
      UNITLAYERS: UNITLAYERS,
      stepid: newstepid,
      name: 'horisontal',
      path: step.path.concat('horisontal'),
      clones: clones
    });
    turn.links[newstepid] = {};
    if (Object.keys(UNITLAYERS.markers).length === 0) {
      turn.blockedby = "nolegal";
    } else
    if (Object.keys(ARTIFACTS.winline).length !== 0) {
      let winner = 1;
      let result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
      turn.links[newstepid][result] = 'madeline';
      turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
      turn.endMarks[newstepid].madeline = ARTIFACTS.winline;
    } else turn.links[newstepid].endturn = "start" + otherplayer;
    return newstep;
  }
  game.vertical1 = function(turn, step) {
    let ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
      winline: Object.assign({}, step.ARTIFACTS.winline)
    });
    let MARKS = step.MARKS;
    let UNITDATA = Object.assign({}, step.UNITDATA);
    let clones = step.clones;
    let UNITLAYERS = step.UNITLAYERS;
    { 
      for (let POS in UNITLAYERS.markers) {
        delete UNITDATA[(UNITLAYERS.units[POS]  || {}).id];
      }
    } { 
      let newunitid = 'spawn' + (clones++);
      UNITDATA[newunitid] = {
        pos: MARKS["selectdrop"],
        id: newunitid,
        group: "soldiers",
        owner: player
      };
    } { 
      for (let POS in ARTIFACTS.vertical) {
        let newunitid = 'spawn' + (clones++);
        UNITDATA[newunitid] = {
          pos: POS,
          id: newunitid,
          group: "markers",
          owner: 0
        };
      }
    }
    MARKS = {};
    UNITLAYERS = {
      "markers": {},
      "mymarkers": {},
      "oppmarkers": {},
      "neutralmarkers": {},
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
      "FOOBAR": {},
      "vertical": {},
      "uphill": {},
      "horisontal": {},
      "downhill": {},
      "winline": {}
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
          if ((4 === WALKLENGTH)) {
            ARTIFACTS["winline"][POS] = {};
          }
        }
      }
    }
    let newstepid = step.stepid + '-' + 'vertical';
    let newstep = turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      UNITDATA: UNITDATA,
      UNITLAYERS: UNITLAYERS,
      stepid: newstepid,
      name: 'vertical',
      path: step.path.concat('vertical'),
      clones: clones
    });
    turn.links[newstepid] = {};
    if (Object.keys(UNITLAYERS.markers).length === 0) {
      turn.blockedby = "nolegal";
    } else
    if (Object.keys(ARTIFACTS.winline).length !== 0) {
      let winner = 1;
      let result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
      turn.links[newstepid][result] = 'madeline';
      turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
      turn.endMarks[newstepid].madeline = ARTIFACTS.winline;
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
      "FOOBAR": {},
      "vertical": {},
      "uphill": {},
      "horisontal": {},
      "downhill": {},
      "winline": {}
    };
    let UNITDATA = step.UNITDATA;
    let UNITLAYERS = {
      "markers": {},
      "mymarkers": {},
      "oppmarkers": {},
      "neutralmarkers": {},
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
    for (let linkpos in (Object.keys(UNITLAYERS.markers).length === 0 ? BOARD.board : UNITLAYERS.markers)) {
      newlinks[linkpos] = 'selectdrop1';
    }
    return turn;
  }
  game.start1instruction = function(turn, step) {
    let UNITLAYERS = step.UNITLAYERS;
    return (Object.keys(UNITLAYERS.neutralunits).length === 0 ? {
      type: 'text',
      text: "Select any square to place the first unit of the game"
    } : {
      type: 'text',
      text: "Select which neutral unit to take over"
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
  game.selectdrop2 = function(turn, step, markpos) {
    let ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
      FOOBAR: Object.assign({}, step.ARTIFACTS.FOOBAR),
      vertical: Object.assign({}, step.ARTIFACTS.vertical),
      uphill: Object.assign({}, step.ARTIFACTS.uphill),
      horisontal: Object.assign({}, step.ARTIFACTS.horisontal),
      downhill: Object.assign({}, step.ARTIFACTS.downhill)
    });
    let UNITLAYERS = step.UNITLAYERS;
    let MARKS = {
      selectdrop: markpos
    };
    let STARTPOS = MARKS["selectdrop"];
    let allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
    for (let walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
      let DIR = allwalkerdirs[walkerdirnbr];
      let POS = STARTPOS;
      while ((POS = connections[POS][DIR])) {
        if (!UNITLAYERS.units[POS]) {
          ARTIFACTS[["FOOBAR", "vertical", "uphill", "horisontal", "downhill", "vertical", "uphill", "horisontal", "downhill"][DIR]][POS] = {};
        }
      }
    }
    let newstepid = step.stepid + '-' + markpos;
    let newstep = turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      stepid: newstepid,
      path: step.path.concat(markpos),
      name: 'selectdrop'
    });
    turn.links[newstepid] = {};
    if (Object.keys(ARTIFACTS.uphill).length !== 0) {
      { 
        turn.links[newstepid].uphill = 'uphill2';
      }
    }
    if (Object.keys(ARTIFACTS.downhill).length !== 0) {
      { 
        turn.links[newstepid].downhill = 'downhill2';
      }
    }
    if (Object.keys(ARTIFACTS.vertical).length !== 0) {
      { 
        turn.links[newstepid].vertical = 'vertical2';
      }
    }
    if (Object.keys(ARTIFACTS.horisontal).length !== 0) {
      { 
        turn.links[newstepid].horisontal = 'horisontal2';
      }
    }
    return newstep;
  };
  game.selectdrop2instruction = function(turn, step) {
    let ARTIFACTS = step.ARTIFACTS;
    return collapseLine({
      type: 'line',
      content: [{
          type: 'text',
          text: "Press"
        },
        [{
          cond: Object.keys(ARTIFACTS.uphill).length !== 0,
          content: {
            type: 'cmndref',
            cmnd: "uphill"
          }
        }, {
          cond: Object.keys(ARTIFACTS.downhill).length !== 0,
          content: {
            type: 'cmndref',
            cmnd: "downhill"
          }
        }, {
          cond: Object.keys(ARTIFACTS.vertical).length !== 0,
          content: {
            type: 'cmndref',
            cmnd: "vertical"
          }
        }, {
          cond: Object.keys(ARTIFACTS.horisontal).length !== 0,
          content: {
            type: 'cmndref',
            cmnd: "horisontal"
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
          text: "to give your opponent placing options in that direction"
        }
      ]
    });
  };
  game.uphill2 = function(turn, step) {
    let ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
      winline: Object.assign({}, step.ARTIFACTS.winline)
    });
    let MARKS = step.MARKS;
    let UNITDATA = Object.assign({}, step.UNITDATA);
    let clones = step.clones;
    let UNITLAYERS = step.UNITLAYERS;
    { 
      for (let POS in UNITLAYERS.markers) {
        delete UNITDATA[(UNITLAYERS.units[POS]  || {}).id];
      }
    } { 
      let newunitid = 'spawn' + (clones++);
      UNITDATA[newunitid] = {
        pos: MARKS["selectdrop"],
        id: newunitid,
        group: "soldiers",
        owner: player
      };
    } { 
      for (let POS in ARTIFACTS.uphill) {
        let newunitid = 'spawn' + (clones++);
        UNITDATA[newunitid] = {
          pos: POS,
          id: newunitid,
          group: "markers",
          owner: 0
        };
      }
    }
    MARKS = {};
    UNITLAYERS = {
      "markers": {},
      "mymarkers": {},
      "oppmarkers": {},
      "neutralmarkers": {},
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
      "FOOBAR": {},
      "vertical": {},
      "uphill": {},
      "horisontal": {},
      "downhill": {},
      "winline": {}
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
          if ((4 === WALKLENGTH)) {
            ARTIFACTS["winline"][POS] = {};
          }
        }
      }
    }
    let newstepid = step.stepid + '-' + 'uphill';
    let newstep = turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      UNITDATA: UNITDATA,
      UNITLAYERS: UNITLAYERS,
      stepid: newstepid,
      name: 'uphill',
      path: step.path.concat('uphill'),
      clones: clones
    });
    turn.links[newstepid] = {};
    if (Object.keys(UNITLAYERS.markers).length === 0) {
      turn.blockedby = "nolegal";
    } else
    if (Object.keys(ARTIFACTS.winline).length !== 0) {
      let winner = 2;
      let result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
      turn.links[newstepid][result] = 'madeline';
      turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
      turn.endMarks[newstepid].madeline = ARTIFACTS.winline;
    } else turn.links[newstepid].endturn = "start" + otherplayer;
    return newstep;
  }
  game.downhill2 = function(turn, step) {
    let ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
      winline: Object.assign({}, step.ARTIFACTS.winline)
    });
    let MARKS = step.MARKS;
    let UNITDATA = Object.assign({}, step.UNITDATA);
    let clones = step.clones;
    let UNITLAYERS = step.UNITLAYERS;
    { 
      for (let POS in UNITLAYERS.markers) {
        delete UNITDATA[(UNITLAYERS.units[POS]  || {}).id];
      }
    } { 
      let newunitid = 'spawn' + (clones++);
      UNITDATA[newunitid] = {
        pos: MARKS["selectdrop"],
        id: newunitid,
        group: "soldiers",
        owner: player
      };
    } { 
      for (let POS in ARTIFACTS.downhill) {
        let newunitid = 'spawn' + (clones++);
        UNITDATA[newunitid] = {
          pos: POS,
          id: newunitid,
          group: "markers",
          owner: 0
        };
      }
    }
    MARKS = {};
    UNITLAYERS = {
      "markers": {},
      "mymarkers": {},
      "oppmarkers": {},
      "neutralmarkers": {},
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
      "FOOBAR": {},
      "vertical": {},
      "uphill": {},
      "horisontal": {},
      "downhill": {},
      "winline": {}
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
          if ((4 === WALKLENGTH)) {
            ARTIFACTS["winline"][POS] = {};
          }
        }
      }
    }
    let newstepid = step.stepid + '-' + 'downhill';
    let newstep = turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      UNITDATA: UNITDATA,
      UNITLAYERS: UNITLAYERS,
      stepid: newstepid,
      name: 'downhill',
      path: step.path.concat('downhill'),
      clones: clones
    });
    turn.links[newstepid] = {};
    if (Object.keys(UNITLAYERS.markers).length === 0) {
      turn.blockedby = "nolegal";
    } else
    if (Object.keys(ARTIFACTS.winline).length !== 0) {
      let winner = 2;
      let result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
      turn.links[newstepid][result] = 'madeline';
      turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
      turn.endMarks[newstepid].madeline = ARTIFACTS.winline;
    } else turn.links[newstepid].endturn = "start" + otherplayer;
    return newstep;
  }
  game.horisontal2 = function(turn, step) {
    let ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
      winline: Object.assign({}, step.ARTIFACTS.winline)
    });
    let MARKS = step.MARKS;
    let UNITDATA = Object.assign({}, step.UNITDATA);
    let clones = step.clones;
    let UNITLAYERS = step.UNITLAYERS;
    { 
      for (let POS in UNITLAYERS.markers) {
        delete UNITDATA[(UNITLAYERS.units[POS]  || {}).id];
      }
    } { 
      let newunitid = 'spawn' + (clones++);
      UNITDATA[newunitid] = {
        pos: MARKS["selectdrop"],
        id: newunitid,
        group: "soldiers",
        owner: player
      };
    } { 
      for (let POS in ARTIFACTS.horisontal) {
        let newunitid = 'spawn' + (clones++);
        UNITDATA[newunitid] = {
          pos: POS,
          id: newunitid,
          group: "markers",
          owner: 0
        };
      }
    }
    MARKS = {};
    UNITLAYERS = {
      "markers": {},
      "mymarkers": {},
      "oppmarkers": {},
      "neutralmarkers": {},
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
      "FOOBAR": {},
      "vertical": {},
      "uphill": {},
      "horisontal": {},
      "downhill": {},
      "winline": {}
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
          if ((4 === WALKLENGTH)) {
            ARTIFACTS["winline"][POS] = {};
          }
        }
      }
    }
    let newstepid = step.stepid + '-' + 'horisontal';
    let newstep = turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      UNITDATA: UNITDATA,
      UNITLAYERS: UNITLAYERS,
      stepid: newstepid,
      name: 'horisontal',
      path: step.path.concat('horisontal'),
      clones: clones
    });
    turn.links[newstepid] = {};
    if (Object.keys(UNITLAYERS.markers).length === 0) {
      turn.blockedby = "nolegal";
    } else
    if (Object.keys(ARTIFACTS.winline).length !== 0) {
      let winner = 2;
      let result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
      turn.links[newstepid][result] = 'madeline';
      turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
      turn.endMarks[newstepid].madeline = ARTIFACTS.winline;
    } else turn.links[newstepid].endturn = "start" + otherplayer;
    return newstep;
  }
  game.vertical2 = function(turn, step) {
    let ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
      winline: Object.assign({}, step.ARTIFACTS.winline)
    });
    let MARKS = step.MARKS;
    let UNITDATA = Object.assign({}, step.UNITDATA);
    let clones = step.clones;
    let UNITLAYERS = step.UNITLAYERS;
    { 
      for (let POS in UNITLAYERS.markers) {
        delete UNITDATA[(UNITLAYERS.units[POS]  || {}).id];
      }
    } { 
      let newunitid = 'spawn' + (clones++);
      UNITDATA[newunitid] = {
        pos: MARKS["selectdrop"],
        id: newunitid,
        group: "soldiers",
        owner: player
      };
    } { 
      for (let POS in ARTIFACTS.vertical) {
        let newunitid = 'spawn' + (clones++);
        UNITDATA[newunitid] = {
          pos: POS,
          id: newunitid,
          group: "markers",
          owner: 0
        };
      }
    }
    MARKS = {};
    UNITLAYERS = {
      "markers": {},
      "mymarkers": {},
      "oppmarkers": {},
      "neutralmarkers": {},
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
      "FOOBAR": {},
      "vertical": {},
      "uphill": {},
      "horisontal": {},
      "downhill": {},
      "winline": {}
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
          if ((4 === WALKLENGTH)) {
            ARTIFACTS["winline"][POS] = {};
          }
        }
      }
    }
    let newstepid = step.stepid + '-' + 'vertical';
    let newstep = turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      UNITDATA: UNITDATA,
      UNITLAYERS: UNITLAYERS,
      stepid: newstepid,
      name: 'vertical',
      path: step.path.concat('vertical'),
      clones: clones
    });
    turn.links[newstepid] = {};
    if (Object.keys(UNITLAYERS.markers).length === 0) {
      turn.blockedby = "nolegal";
    } else
    if (Object.keys(ARTIFACTS.winline).length !== 0) {
      let winner = 2;
      let result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
      turn.links[newstepid][result] = 'madeline';
      turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
      turn.endMarks[newstepid].madeline = ARTIFACTS.winline;
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
      "FOOBAR": {},
      "vertical": {},
      "uphill": {},
      "horisontal": {},
      "downhill": {},
      "winline": {}
    };
    let UNITDATA = step.UNITDATA;
    let UNITLAYERS = {
      "markers": {},
      "mymarkers": {},
      "oppmarkers": {},
      "neutralmarkers": {},
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
    for (let linkpos in (Object.keys(UNITLAYERS.markers).length === 0 ? BOARD.board : UNITLAYERS.markers)) {
      newlinks[linkpos] = 'selectdrop2';
    }
    return turn;
  }
  game.start2instruction = function(turn, step) {
    let UNITLAYERS = step.UNITLAYERS;
    return (Object.keys(UNITLAYERS.neutralunits).length === 0 ? {
      type: 'text',
      text: "Select any square to place the first unit of the game"
    } : {
      type: 'text',
      text: "Select which neutral unit to take over"
    });
  };
  game.debug2 = function() {
    return {
      TERRAIN: TERRAIN
    };
  }
};
export default game;