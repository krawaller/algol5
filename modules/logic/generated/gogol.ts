import fullDef from '../../games/dist/games/gogol';
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
  "nokings": {},
  "nosoldiers": {},
  "kingwalk": {},
  "adjacentenemies": {},
  "splashed": {},
  "willdie": {},
  "jumptargets": {}
};
game.commands = {
  "deploy": 1,
  "move": 1,
  "jump": 1
};
game.graphics = {
  "tiles": {
    "homerow": "playercolour"
  },
  "icons": {
    "kings": "king",
    "soldiers": "pawn"
  }
};
game.board = {
  "height": 8,
  "width": 8,
  "terrain": {
    "homerow": {
      "1": [
        ["rect", "a1", "h1"]
      ],
      "2": [
        ["rect", "a8", "h8"]
      ]
    },
    "edges": [
      ["rect", "a1", "a8"],
      ["rect", "h1", "h8"],
      ["rect", "b8", "g8"],
      ["rect", "b1", "g1"]
    ]
  }
};
game.AI = [];
game.id = "gogol";
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
            ["rect", "a1", "h1"]
          ],
          "2": [
            ["rect", "a8", "h8"]
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
  game.selectkingdeploy1 = function(turn, step, markpos) {
    let MARKS = {
      selectkingdeploy: markpos
    };
    let newstepid = step.stepid + '-' + markpos;
    let newstep = turn.steps[newstepid] = Object.assign({}, step, {
      MARKS: MARKS,
      stepid: newstepid,
      path: step.path.concat(markpos),
      name: 'selectkingdeploy'
    });
    turn.links[newstepid] = {};
    turn.links[newstepid].deploy = 'deploy1';
    return newstep;
  };
  game.selectkingdeploy1instruction = function(turn, step) {
    return collapseLine({
      type: 'line',
      content: [{
        type: 'text',
        text: "Press"
      }, {
        type: 'cmndref',
        cmnd: "deploy"
      }, {
        type: 'text',
        text: "to place your king here"
      }]
    });
  };
  game.selectunit1 = function(turn, step, markpos) {
    let ARTIFACTS = step.ARTIFACTS;
    let UNITLAYERS = step.UNITLAYERS;
    let MARKS = {
      selectunit: markpos
    }; {
      let BLOCKS = UNITLAYERS.units;
      let walkstarts =
        (function() {
          let k, ret = {},
            s0 = UNITLAYERS.mykings,
            s1 = ARTIFACTS.selectunit;
          for (k in s0) {
            ret[k] = 1;
          }
          for (k in s1) {
            ret[k] = 1;
          }
          return ret;
        }());
      for (let STARTPOS in walkstarts) {
        let allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        for (let walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
          let POS = STARTPOS;
          while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && !BLOCKS[POS]) {
            if (!ARTIFACTS.nokings[POS]) {
              ARTIFACTS = {
                ...ARTIFACTS,
                ["kingwalk"]: {
                  ...ARTIFACTS["kingwalk"],
                  [POS]: {}
                }
              }
            }
          }
        }
      }
    } {
      let STARTPOS = MARKS["selectunit"];
      let neighbourdirs = [1, 2, 3, 4, 5, 6, 7, 8];
      let startconnections = connections[STARTPOS];
      for (let dirnbr = 0; dirnbr < 8; dirnbr++) {
        let DIR = neighbourdirs[dirnbr];
        let POS = startconnections[DIR];
        if (POS && UNITLAYERS.oppunits[POS]) {
          ARTIFACTS = {
            ...ARTIFACTS,
            ["adjacentenemies"]: {
              ...ARTIFACTS["adjacentenemies"],
              [POS]: {
                dir: DIR
              }
            }
          }
        }
      }
    } {
      for (let STARTPOS in ARTIFACTS.adjacentenemies) {
        let DIR = relativedirs[(ARTIFACTS.adjacentenemies[STARTPOS] || {})["dir"] - 2 + 1];
        let NEIGHBOURCOUNT;
        let POS = connections[STARTPOS][DIR];
        if (POS && !
          (function() {
            let k, ret = {},
              s0 = UNITLAYERS.units,
              s1 = (!!(UNITLAYERS.mykings[MARKS["selectunit"]]) ? ARTIFACTS.nokings : ARTIFACTS.nosoldiers);
            for (k in s0) {
              ret[k] = 1;
            }
            for (k in s1) {
              ret[k] = 1;
            }
            return ret;
          }())[POS]) {
          NEIGHBOURCOUNT = 1;
          ARTIFACTS = {
            ...ARTIFACTS,
            ["jumptargets"]: {
              ...ARTIFACTS["jumptargets"],
              [POS]: {
                dir: DIR
              }
            }
          }
        }
        if (!!NEIGHBOURCOUNT) {
          ARTIFACTS = {
            ...ARTIFACTS,
            ["willdie"]: {
              ...ARTIFACTS["willdie"],
              [STARTPOS]: {
                dir: DIR
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
    turn.links[newstepid] = {}; { 
      let newlinks = turn.links[newstepid];
      for (let linkpos in (!!(UNITLAYERS.mykings[MARKS["selectunit"]]) ? ARTIFACTS.kingwalk :
          (function() {
            let ret = {},
              s0 = BOARD.board,
              s1 =
              (function() {
                let k, ret = {},
                  s0 = UNITLAYERS.units,
                  s1 =
                  (function() {
                    let k, ret = {},
                      s0 = ARTIFACTS.nosoldiers,
                      s1 = ARTIFACTS.jumptargets;
                    for (k in s0) {
                      ret[k] = 1;
                    }
                    for (k in s1) {
                      ret[k] = 1;
                    }
                    return ret;
                  }());
                for (k in s0) {
                  ret[k] = 1;
                }
                for (k in s1) {
                  ret[k] = 1;
                }
                return ret;
              }());
            for (let key in s0) {
              if (!s1[key]) {
                ret[key] = s0[key];
              }
            }
            return ret;
          }()))) {
        newlinks[linkpos] = 'selectmovetarget1';
      }
    } { 
      let newlinks = turn.links[newstepid];
      for (let linkpos in ARTIFACTS.jumptargets) {
        newlinks[linkpos] = 'selectjumptarget1';
      }
    }
    return newstep;
  };
  game.selectunit1instruction = function(turn, step) {
    let MARKS = step.MARKS;
    let ARTIFACTS = step.ARTIFACTS;
    let UNITLAYERS = step.UNITLAYERS;
    return (!!(UNITLAYERS.kings[MARKS["selectunit"]]) ? collapseLine({
      type: 'line',
      content: [{
          type: 'text',
          text: "Select where to"
        },
        [{
          cond: Object.keys(ARTIFACTS.kingwalk).length !== 0,
          content: {
            type: 'text',
            text: "move"
          }
        }, {
          cond: Object.keys(ARTIFACTS.jumptargets).length !== 0,
          content: {
            type: 'text',
            text: "jump"
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
          text: "your"
        }, {
          type: "unittyperef",
          alias: "king",
          name: "king".replace(/s$/, '')
        },
        Object.keys(
          (function() {
            let ret = {},
              s0 = ARTIFACTS.nokings,
              s1 =
              (function() {
                let k, ret = {},
                  s0 = ARTIFACTS.kingwalk,
                  s1 = ARTIFACTS.jumptargets;
                for (k in s0) {
                  ret[k] = 1;
                }
                for (k in s1) {
                  ret[k] = 1;
                }
                return ret;
              }());
            for (let key in s0) {
              if (s1[key]) {
                ret[key] = s0[key];
              }
            }
            return ret;
          }())).length !== 0 ? {
          type: 'text',
          text: "without making a forbidden configuration"
        } : {
          type: 'nothing'
        }
      ]
    }) : collapseLine({
      type: 'line',
      content: [{
        type: 'text',
        text: "Select where to move"
      }, Object.keys(ARTIFACTS.jumptargets).length !== 0 ? {
        type: 'text',
        text: "or jump"
      } : {
        type: 'nothing'
      }, {
        type: 'text',
        text: "your"
      }, {
        type: "unittyperef",
        alias: "pawn",
        name: "pawn".replace(/s$/, '')
      }, Object.keys(ARTIFACTS.nosoldiers).length !== 0 ? {
        type: 'text',
        text: "without making a forbidden configuration"
      } : {
        type: 'nothing'
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
  game.selectjumptarget1 = function(turn, step, markpos) {
    let ARTIFACTS = step.ARTIFACTS;
    let MARKS = {
      selectjumptarget: markpos,
      selectunit: step.MARKS.selectunit
    };
    let filtersourcelayer = ARTIFACTS.willdie;
    let filtertargetlayer = ARTIFACTS.splashed;
    for (let POS in filtersourcelayer) {
      if (filtersourcelayer[POS]) {
        let filterobj = filtersourcelayer[POS];
        if (filterobj.dir === (ARTIFACTS.jumptargets[MARKS["selectjumptarget"]] || {})["dir"]) {
          filtertargetlayer[POS] = filterobj;
        }
      }
    }
    let newstepid = step.stepid + '-' + markpos;
    let newstep = turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      stepid: newstepid,
      path: step.path.concat(markpos),
      name: 'selectjumptarget'
    });
    turn.links[newstepid] = {};
    turn.links[newstepid].jump = 'jump1';
    return newstep;
  };
  game.selectjumptarget1instruction = function(turn, step) {
    let MARKS = step.MARKS;
    let ARTIFACTS = step.ARTIFACTS;
    let UNITLAYERS = step.UNITLAYERS;
    return collapseLine({
      type: 'line',
      content: [{
        type: 'text',
        text: "Press"
      }, {
        type: 'cmndref',
        cmnd: "jump"
      }, {
        type: 'text',
        text: "to jump from"
      }, {
        type: 'posref',
        pos: MARKS["selectunit"]
      }, {
        type: 'text',
        text: "to"
      }, {
        type: 'posref',
        pos: MARKS["selectjumptarget"]
      }, {
        type: 'text',
        text: " and kill the"
      }, {
        type: "unittyperef",
        name: game.graphics.icons[(UNITLAYERS.units[Object.keys(ARTIFACTS.splashed)[0]] || {})["group"]]
      }, {
        type: 'text',
        text: "at"
      }, {
        type: 'text',
        text: Object.keys(ARTIFACTS.splashed)[0]
      }]
    });
  };
  game.deploy1 = function(turn, step) {
    let ARTIFACTS = step.ARTIFACTS;
    let MARKS = step.MARKS;
    let UNITDATA = Object.assign({}, step.UNITDATA);
    let clones = step.clones;
    let UNITLAYERS = step.UNITLAYERS;
    let newunitid = 'spawn' + (clones++);
    UNITDATA[newunitid] = {
      pos: MARKS["selectkingdeploy"],
      id: newunitid,
      group: "kings",
      owner: player
    };
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
    let newstepid = step.stepid + '-' + 'deploy';
    let newstep = turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      UNITDATA: UNITDATA,
      UNITLAYERS: UNITLAYERS,
      stepid: newstepid,
      name: 'deploy',
      path: step.path.concat('deploy'),
      clones: clones
    });
    turn.links[newstepid] = {};
    if (Object.keys(
        (function() {
          let ret = {},
            s0 = UNITLAYERS.mykings,
            s1 = TERRAIN.opphomerow;
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
    } else
    if (((turn.turn > 2) && Object.keys(UNITLAYERS.oppkings).length === 0)) {
      let winner = 1;
      let result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
      turn.links[newstepid][result] = 'kingkill';
    } else turn.links[newstepid].endturn = "start" + otherplayer;
    return newstep;
  }
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
            s1 = TERRAIN.opphomerow;
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
    } else
    if (((turn.turn > 2) && Object.keys(UNITLAYERS.oppkings).length === 0)) {
      let winner = 1;
      let result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
      turn.links[newstepid][result] = 'kingkill';
    } else turn.links[newstepid].endturn = "start" + otherplayer;
    return newstep;
  }
  game.jump1 = function(turn, step) {
    let ARTIFACTS = step.ARTIFACTS;
    let MARKS = step.MARKS;
    let UNITDATA = Object.assign({}, step.UNITDATA);
    let UNITLAYERS = step.UNITLAYERS;
    { 
      delete UNITDATA[(UNITLAYERS.units[Object.keys(ARTIFACTS.splashed)[0]]  || {}).id];
    } { 
      let unitid = (UNITLAYERS.units[MARKS["selectunit"]]  || {}).id;
      if (unitid) {
        UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
          "pos": MARKS["selectjumptarget"]
        });
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
    let newstepid = step.stepid + '-' + 'jump';
    let newstep = turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      UNITDATA: UNITDATA,
      UNITLAYERS: UNITLAYERS,
      stepid: newstepid,
      name: 'jump',
      path: step.path.concat('jump')
    });
    turn.links[newstepid] = {};
    if (Object.keys(
        (function() {
          let ret = {},
            s0 = UNITLAYERS.mykings,
            s1 = TERRAIN.opphomerow;
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
    } else
    if (((turn.turn > 2) && Object.keys(UNITLAYERS.oppkings).length === 0)) {
      let winner = 1;
      let result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
      turn.links[newstepid][result] = 'kingkill';
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
    {
      for (let STARTPOS in
          (function() {
            let ret = {},
              s0 = TERRAIN.edges,
              s1 = UNITLAYERS.mysoldiers;
            for (let key in s0) {
              if (s1[key]) {
                ret[key] = s0[key];
              }
            }
            return ret;
          }())) {
        let neighbourdirs = (!!(TERRAIN.homerow[STARTPOS]) ? [1, 3, 5, 7] : [1, 5]);
        let nbrofneighbourdirs = neighbourdirs.length;
        let startconnections = connections[STARTPOS];
        for (let dirnbr = 0; dirnbr < nbrofneighbourdirs; dirnbr++) {
          let POS = startconnections[neighbourdirs[dirnbr]];
          if (POS) {
            ARTIFACTS = {
              ...ARTIFACTS,
              ["nokings"]: {
                ...ARTIFACTS["nokings"],
                [POS]: {}
              }
            }
          }
        }
      }
    } {
      for (let STARTPOS in UNITLAYERS.mykings) {
        let neighbourdirs = [1, 3, 5, 7];
        let startconnections = connections[STARTPOS];
        for (let dirnbr = 0; dirnbr < 4; dirnbr++) {
          let POS = startconnections[neighbourdirs[dirnbr]];
          if (POS && (!!(TERRAIN.homerow[POS]) || (!!(TERRAIN.edges[STARTPOS]) && !!(TERRAIN.edges[POS])))) {
            ARTIFACTS = {
              ...ARTIFACTS,
              ["nosoldiers"]: {
                ...ARTIFACTS["nosoldiers"],
                [POS]: {}
              }
            }
          }
        }
      }
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
    if ((turn.turn > 2)) {
      let newlinks = turn.links.root;
      for (let linkpos in UNITLAYERS.myunits) {
        newlinks[linkpos] = 'selectunit1';
      }
    } else {
      let newlinks = turn.links.root;
      for (let linkpos in
          (function() {
            let ret = {},
              s0 = BOARD.board,
              s1 =
              (function() {
                let k, ret = {},
                  s0 = UNITLAYERS.units,
                  s1 = ARTIFACTS.nokings;
                for (k in s0) {
                  ret[k] = 1;
                }
                for (k in s1) {
                  ret[k] = 1;
                }
                return ret;
              }());
            for (let key in s0) {
              if (!s1[key]) {
                ret[key] = s0[key];
              }
            }
            return ret;
          }())) {
        newlinks[linkpos] = 'selectkingdeploy1';
      }
    }
    return turn;
  }
  game.start1instruction = function(turn, step) {
    return ((turn.turn > 2) ? {
      type: 'text',
      text: "Select a unit to move"
    } : {
      type: 'text',
      text: "Select where to deploy your king"
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
  game.selectkingdeploy2 = function(turn, step, markpos) {
    let MARKS = {
      selectkingdeploy: markpos
    };
    let newstepid = step.stepid + '-' + markpos;
    let newstep = turn.steps[newstepid] = Object.assign({}, step, {
      MARKS: MARKS,
      stepid: newstepid,
      path: step.path.concat(markpos),
      name: 'selectkingdeploy'
    });
    turn.links[newstepid] = {};
    turn.links[newstepid].deploy = 'deploy2';
    return newstep;
  };
  game.selectkingdeploy2instruction = function(turn, step) {
    return collapseLine({
      type: 'line',
      content: [{
        type: 'text',
        text: "Press"
      }, {
        type: 'cmndref',
        cmnd: "deploy"
      }, {
        type: 'text',
        text: "to place your king here"
      }]
    });
  };
  game.selectunit2 = function(turn, step, markpos) {
    let ARTIFACTS = step.ARTIFACTS;
    let UNITLAYERS = step.UNITLAYERS;
    let MARKS = {
      selectunit: markpos
    }; {
      let BLOCKS = UNITLAYERS.units;
      let walkstarts =
        (function() {
          let k, ret = {},
            s0 = UNITLAYERS.mykings,
            s1 = ARTIFACTS.selectunit;
          for (k in s0) {
            ret[k] = 1;
          }
          for (k in s1) {
            ret[k] = 1;
          }
          return ret;
        }());
      for (let STARTPOS in walkstarts) {
        let allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        for (let walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
          let POS = STARTPOS;
          while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && !BLOCKS[POS]) {
            if (!ARTIFACTS.nokings[POS]) {
              ARTIFACTS = {
                ...ARTIFACTS,
                ["kingwalk"]: {
                  ...ARTIFACTS["kingwalk"],
                  [POS]: {}
                }
              }
            }
          }
        }
      }
    } {
      let STARTPOS = MARKS["selectunit"];
      let neighbourdirs = [1, 2, 3, 4, 5, 6, 7, 8];
      let startconnections = connections[STARTPOS];
      for (let dirnbr = 0; dirnbr < 8; dirnbr++) {
        let DIR = neighbourdirs[dirnbr];
        let POS = startconnections[DIR];
        if (POS && UNITLAYERS.oppunits[POS]) {
          ARTIFACTS = {
            ...ARTIFACTS,
            ["adjacentenemies"]: {
              ...ARTIFACTS["adjacentenemies"],
              [POS]: {
                dir: DIR
              }
            }
          }
        }
      }
    } {
      for (let STARTPOS in ARTIFACTS.adjacentenemies) {
        let DIR = relativedirs[(ARTIFACTS.adjacentenemies[STARTPOS] || {})["dir"] - 2 + 1];
        let NEIGHBOURCOUNT;
        let POS = connections[STARTPOS][DIR];
        if (POS && !
          (function() {
            let k, ret = {},
              s0 = UNITLAYERS.units,
              s1 = (!!(UNITLAYERS.mykings[MARKS["selectunit"]]) ? ARTIFACTS.nokings : ARTIFACTS.nosoldiers);
            for (k in s0) {
              ret[k] = 1;
            }
            for (k in s1) {
              ret[k] = 1;
            }
            return ret;
          }())[POS]) {
          NEIGHBOURCOUNT = 1;
          ARTIFACTS = {
            ...ARTIFACTS,
            ["jumptargets"]: {
              ...ARTIFACTS["jumptargets"],
              [POS]: {
                dir: DIR
              }
            }
          }
        }
        if (!!NEIGHBOURCOUNT) {
          ARTIFACTS = {
            ...ARTIFACTS,
            ["willdie"]: {
              ...ARTIFACTS["willdie"],
              [STARTPOS]: {
                dir: DIR
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
    turn.links[newstepid] = {}; { 
      let newlinks = turn.links[newstepid];
      for (let linkpos in (!!(UNITLAYERS.mykings[MARKS["selectunit"]]) ? ARTIFACTS.kingwalk :
          (function() {
            let ret = {},
              s0 = BOARD.board,
              s1 =
              (function() {
                let k, ret = {},
                  s0 = UNITLAYERS.units,
                  s1 =
                  (function() {
                    let k, ret = {},
                      s0 = ARTIFACTS.nosoldiers,
                      s1 = ARTIFACTS.jumptargets;
                    for (k in s0) {
                      ret[k] = 1;
                    }
                    for (k in s1) {
                      ret[k] = 1;
                    }
                    return ret;
                  }());
                for (k in s0) {
                  ret[k] = 1;
                }
                for (k in s1) {
                  ret[k] = 1;
                }
                return ret;
              }());
            for (let key in s0) {
              if (!s1[key]) {
                ret[key] = s0[key];
              }
            }
            return ret;
          }()))) {
        newlinks[linkpos] = 'selectmovetarget2';
      }
    } { 
      let newlinks = turn.links[newstepid];
      for (let linkpos in ARTIFACTS.jumptargets) {
        newlinks[linkpos] = 'selectjumptarget2';
      }
    }
    return newstep;
  };
  game.selectunit2instruction = function(turn, step) {
    let MARKS = step.MARKS;
    let ARTIFACTS = step.ARTIFACTS;
    let UNITLAYERS = step.UNITLAYERS;
    return (!!(UNITLAYERS.kings[MARKS["selectunit"]]) ? collapseLine({
      type: 'line',
      content: [{
          type: 'text',
          text: "Select where to"
        },
        [{
          cond: Object.keys(ARTIFACTS.kingwalk).length !== 0,
          content: {
            type: 'text',
            text: "move"
          }
        }, {
          cond: Object.keys(ARTIFACTS.jumptargets).length !== 0,
          content: {
            type: 'text',
            text: "jump"
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
          text: "your"
        }, {
          type: "unittyperef",
          alias: "king",
          name: "king".replace(/s$/, '')
        },
        Object.keys(
          (function() {
            let ret = {},
              s0 = ARTIFACTS.nokings,
              s1 =
              (function() {
                let k, ret = {},
                  s0 = ARTIFACTS.kingwalk,
                  s1 = ARTIFACTS.jumptargets;
                for (k in s0) {
                  ret[k] = 1;
                }
                for (k in s1) {
                  ret[k] = 1;
                }
                return ret;
              }());
            for (let key in s0) {
              if (s1[key]) {
                ret[key] = s0[key];
              }
            }
            return ret;
          }())).length !== 0 ? {
          type: 'text',
          text: "without making a forbidden configuration"
        } : {
          type: 'nothing'
        }
      ]
    }) : collapseLine({
      type: 'line',
      content: [{
        type: 'text',
        text: "Select where to move"
      }, Object.keys(ARTIFACTS.jumptargets).length !== 0 ? {
        type: 'text',
        text: "or jump"
      } : {
        type: 'nothing'
      }, {
        type: 'text',
        text: "your"
      }, {
        type: "unittyperef",
        alias: "pawn",
        name: "pawn".replace(/s$/, '')
      }, Object.keys(ARTIFACTS.nosoldiers).length !== 0 ? {
        type: 'text',
        text: "without making a forbidden configuration"
      } : {
        type: 'nothing'
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
  game.selectjumptarget2 = function(turn, step, markpos) {
    let ARTIFACTS = step.ARTIFACTS;
    let MARKS = {
      selectjumptarget: markpos,
      selectunit: step.MARKS.selectunit
    };
    let filtersourcelayer = ARTIFACTS.willdie;
    let filtertargetlayer = ARTIFACTS.splashed;
    for (let POS in filtersourcelayer) {
      if (filtersourcelayer[POS]) {
        let filterobj = filtersourcelayer[POS];
        if (filterobj.dir === (ARTIFACTS.jumptargets[MARKS["selectjumptarget"]] || {})["dir"]) {
          filtertargetlayer[POS] = filterobj;
        }
      }
    }
    let newstepid = step.stepid + '-' + markpos;
    let newstep = turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      stepid: newstepid,
      path: step.path.concat(markpos),
      name: 'selectjumptarget'
    });
    turn.links[newstepid] = {};
    turn.links[newstepid].jump = 'jump2';
    return newstep;
  };
  game.selectjumptarget2instruction = function(turn, step) {
    let MARKS = step.MARKS;
    let ARTIFACTS = step.ARTIFACTS;
    let UNITLAYERS = step.UNITLAYERS;
    return collapseLine({
      type: 'line',
      content: [{
        type: 'text',
        text: "Press"
      }, {
        type: 'cmndref',
        cmnd: "jump"
      }, {
        type: 'text',
        text: "to jump from"
      }, {
        type: 'posref',
        pos: MARKS["selectunit"]
      }, {
        type: 'text',
        text: "to"
      }, {
        type: 'posref',
        pos: MARKS["selectjumptarget"]
      }, {
        type: 'text',
        text: " and kill the"
      }, {
        type: "unittyperef",
        name: game.graphics.icons[(UNITLAYERS.units[Object.keys(ARTIFACTS.splashed)[0]] || {})["group"]]
      }, {
        type: 'text',
        text: "at"
      }, {
        type: 'text',
        text: Object.keys(ARTIFACTS.splashed)[0]
      }]
    });
  };
  game.deploy2 = function(turn, step) {
    let ARTIFACTS = step.ARTIFACTS;
    let MARKS = step.MARKS;
    let UNITDATA = Object.assign({}, step.UNITDATA);
    let clones = step.clones;
    let UNITLAYERS = step.UNITLAYERS;
    let newunitid = 'spawn' + (clones++);
    UNITDATA[newunitid] = {
      pos: MARKS["selectkingdeploy"],
      id: newunitid,
      group: "kings",
      owner: player
    };
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
    let newstepid = step.stepid + '-' + 'deploy';
    let newstep = turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      UNITDATA: UNITDATA,
      UNITLAYERS: UNITLAYERS,
      stepid: newstepid,
      name: 'deploy',
      path: step.path.concat('deploy'),
      clones: clones
    });
    turn.links[newstepid] = {};
    if (Object.keys(
        (function() {
          let ret = {},
            s0 = UNITLAYERS.mykings,
            s1 = TERRAIN.opphomerow;
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
    } else
    if (((turn.turn > 2) && Object.keys(UNITLAYERS.oppkings).length === 0)) {
      let winner = 2;
      let result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
      turn.links[newstepid][result] = 'kingkill';
    } else turn.links[newstepid].endturn = "start" + otherplayer;
    return newstep;
  }
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
            s1 = TERRAIN.opphomerow;
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
    } else
    if (((turn.turn > 2) && Object.keys(UNITLAYERS.oppkings).length === 0)) {
      let winner = 2;
      let result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
      turn.links[newstepid][result] = 'kingkill';
    } else turn.links[newstepid].endturn = "start" + otherplayer;
    return newstep;
  }
  game.jump2 = function(turn, step) {
    let ARTIFACTS = step.ARTIFACTS;
    let MARKS = step.MARKS;
    let UNITDATA = Object.assign({}, step.UNITDATA);
    let UNITLAYERS = step.UNITLAYERS;
    { 
      delete UNITDATA[(UNITLAYERS.units[Object.keys(ARTIFACTS.splashed)[0]]  || {}).id];
    } { 
      let unitid = (UNITLAYERS.units[MARKS["selectunit"]]  || {}).id;
      if (unitid) {
        UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
          "pos": MARKS["selectjumptarget"]
        });
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
    let newstepid = step.stepid + '-' + 'jump';
    let newstep = turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      UNITDATA: UNITDATA,
      UNITLAYERS: UNITLAYERS,
      stepid: newstepid,
      name: 'jump',
      path: step.path.concat('jump')
    });
    turn.links[newstepid] = {};
    if (Object.keys(
        (function() {
          let ret = {},
            s0 = UNITLAYERS.mykings,
            s1 = TERRAIN.opphomerow;
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
    } else
    if (((turn.turn > 2) && Object.keys(UNITLAYERS.oppkings).length === 0)) {
      let winner = 2;
      let result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
      turn.links[newstepid][result] = 'kingkill';
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
    {
      for (let STARTPOS in
          (function() {
            let ret = {},
              s0 = TERRAIN.edges,
              s1 = UNITLAYERS.mysoldiers;
            for (let key in s0) {
              if (s1[key]) {
                ret[key] = s0[key];
              }
            }
            return ret;
          }())) {
        let neighbourdirs = (!!(TERRAIN.homerow[STARTPOS]) ? [1, 3, 5, 7] : [1, 5]);
        let nbrofneighbourdirs = neighbourdirs.length;
        let startconnections = connections[STARTPOS];
        for (let dirnbr = 0; dirnbr < nbrofneighbourdirs; dirnbr++) {
          let POS = startconnections[neighbourdirs[dirnbr]];
          if (POS) {
            ARTIFACTS = {
              ...ARTIFACTS,
              ["nokings"]: {
                ...ARTIFACTS["nokings"],
                [POS]: {}
              }
            }
          }
        }
      }
    } {
      for (let STARTPOS in UNITLAYERS.mykings) {
        let neighbourdirs = [1, 3, 5, 7];
        let startconnections = connections[STARTPOS];
        for (let dirnbr = 0; dirnbr < 4; dirnbr++) {
          let POS = startconnections[neighbourdirs[dirnbr]];
          if (POS && (!!(TERRAIN.homerow[POS]) || (!!(TERRAIN.edges[STARTPOS]) && !!(TERRAIN.edges[POS])))) {
            ARTIFACTS = {
              ...ARTIFACTS,
              ["nosoldiers"]: {
                ...ARTIFACTS["nosoldiers"],
                [POS]: {}
              }
            }
          }
        }
      }
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
    if ((turn.turn > 2)) {
      let newlinks = turn.links.root;
      for (let linkpos in UNITLAYERS.myunits) {
        newlinks[linkpos] = 'selectunit2';
      }
    } else {
      let newlinks = turn.links.root;
      for (let linkpos in
          (function() {
            let ret = {},
              s0 = BOARD.board,
              s1 =
              (function() {
                let k, ret = {},
                  s0 = UNITLAYERS.units,
                  s1 = ARTIFACTS.nokings;
                for (k in s0) {
                  ret[k] = 1;
                }
                for (k in s1) {
                  ret[k] = 1;
                }
                return ret;
              }());
            for (let key in s0) {
              if (!s1[key]) {
                ret[key] = s0[key];
              }
            }
            return ret;
          }())) {
        newlinks[linkpos] = 'selectkingdeploy2';
      }
    }
    return turn;
  }
  game.start2instruction = function(turn, step) {
    return ((turn.turn > 2) ? {
      type: 'text',
      text: "Select a unit to move"
    } : {
      type: 'text',
      text: "Select where to deploy your king"
    });
  };
  game.debug2 = function() {
    return {
      TERRAIN: TERRAIN
    };
  }
};
export default game;