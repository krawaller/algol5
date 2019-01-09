import fullDef from "../../games/dist/games/orthokon";
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
} from "../../common";
let game: any = {};
const emptyArtifactLayer = { victims: {}, movetargets: {} };
game.commands = { move: 1 };
game.graphics = { icons: { soldiers: "pawn" }, tiles: {} };
game.board = { height: 4, width: 4, terrain: {} };
game.AI = ["Bob"];
game.id = "orthokon";
let connections = boardConnections(fullDef.board);
let BOARD = boardLayers(fullDef.board);
let TERRAIN = terrainLayers(fullDef.board, 0);
game.newGame = function() {
  let turnseed = { turn: 0 };
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

  game.brain_Bob_1 = function(step) {
    let UNITLAYERS = step.UNITLAYERS;
    let ARTIFACTS = step.ARTIFACTS;

    return Object.keys(UNITLAYERS.myunits).length;
  };
  game.brain_Bob_1_detailed = function(step) {
    let UNITLAYERS = step.UNITLAYERS;
    let ARTIFACTS = step.ARTIFACTS;

    return { headcount: Object.keys(UNITLAYERS.myunits).length };
  };

  game.selectunit1 = function(turn, step, markpos) {
    let ARTIFACTS = step.ARTIFACTS;
    let UNITLAYERS = step.UNITLAYERS;

    let MARKS = { selectunit: markpos };

    let BLOCKS = UNITLAYERS.units;

    let STARTPOS = MARKS["selectunit"];

    let allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];

    for (let walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
      let walkedsquares = [];

      let POS = STARTPOS;

      while (
        (POS = connections[POS][allwalkerdirs[walkerdirnbr]]) &&
        !BLOCKS[POS]
      ) {
        walkedsquares.push(POS);
      }
      var WALKLENGTH = walkedsquares.length;

      if (WALKLENGTH) {
        ARTIFACTS = {
          ...ARTIFACTS,
          ["movetargets"]: {
            ...ARTIFACTS["movetargets"],
            [walkedsquares[WALKLENGTH - 1]]: {}
          }
        };
      }
    }

    let newstepid = step.stepid + "-" + markpos;
    let newstep = (turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      stepid: newstepid,
      path: step.path.concat(markpos),
      name: "selectunit"
    }));
    turn.links[newstepid] = {};

    let newlinks = turn.links[newstepid];
    for (let linkpos in ARTIFACTS.movetargets) {
      newlinks[linkpos] = "selectmovetarget1";
    }

    return newstep;
  };
  game.selectunit1instruction = function(turn, step) {
    let MARKS = step.MARKS;
    return collapseLine({
      type: "line",
      content: [
        { type: "text", text: "Select where to move the" },
        { type: "posref", pos: MARKS["selectunit"] },
        {
          type: "unittyperef",
          alias: "pawn",
          name: "pawn".replace(/s$/, "")
        }
      ]
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
      if (POS && UNITLAYERS.oppunits[POS]) {
        ARTIFACTS = {
          ...ARTIFACTS,
          ["victims"]: {
            ...ARTIFACTS["victims"],
            [POS]: {}
          }
        };
      }
    }

    let newstepid = step.stepid + "-" + markpos;
    let newstep = (turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      stepid: newstepid,
      path: step.path.concat(markpos),
      name: "selectmovetarget"
    }));
    turn.links[newstepid] = {};

    turn.links[newstepid].move = "move1";

    return newstep;
  };
  game.selectmovetarget1instruction = function(turn, step) {
    let MARKS = step.MARKS;
    let ARTIFACTS = step.ARTIFACTS;
    return collapseLine({
      type: "line",
      content: [
        { type: "text", text: "Press" },
        { type: "cmndref", cmnd: "move" },
        { type: "text", text: "to move the" },
        { type: "posref", pos: MARKS["selectunit"] },
        {
          type: "unittyperef",
          alias: "pawn",
          name: "pawn".replace(/s$/, "")
        },
        { type: "text", text: "to" },
        { type: "posref", pos: MARKS["selectmovetarget"] },
        Object.keys(ARTIFACTS.victims).length !== 0
          ? collapseLine({
              type: "line",
              content: [
                { type: "text", text: "and take over" },
                {
                  type: "line",
                  content: [
                    {
                      type: "text",
                      text: Object.keys(ARTIFACTS.victims).length
                    },
                    Object.keys(ARTIFACTS.victims).length === 1
                      ? collapseLine({
                          type: "line",
                          content: [
                            { type: "text", text: "enemy" },
                            {
                              type: "unittyperef",
                              alias: "pawn",
                              name: "pawn".replace(/s$/, "")
                            }
                          ]
                        })
                      : collapseLine({
                          type: "line",
                          content: [
                            { type: "text", text: "enemy" },
                            {
                              type: "unittyperef",
                              alias: "pawns",
                              name: "pawns".replace(/s$/, "")
                            }
                          ]
                        })
                  ]
                }
              ]
            })
          : { type: "nothing" }
      ]
    });
  };

  game.move1 = function(turn, step) {
    let ARTIFACTS = step.ARTIFACTS;
    let MARKS = step.MARKS;
    let UNITDATA = Object.assign({}, step.UNITDATA);

    let UNITLAYERS = step.UNITLAYERS;

    {
      let unitid = (UNITLAYERS.units[MARKS["selectunit"]] || {}).id;
      if (unitid) {
        UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
          pos: MARKS["selectmovetarget"]
        });
      }
    }
    {
      let LOOPID;
      for (let POS in ARTIFACTS.victims) {
        if ((LOOPID = (UNITLAYERS.units[POS] || {}).id)) {
          UNITDATA[LOOPID] = Object.assign({}, UNITDATA[LOOPID], {
            owner: 1
          });
          // TODO - check that it uses ['loopid'] ?
        }
      }
    }
    MARKS = {};

    UNITLAYERS = {
      soldiers: {},
      mysoldiers: {},
      oppsoldiers: {},
      neutralsoldiers: {},
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {}
    };
    for (let unitid in UNITDATA) {
      let currentunit = UNITDATA[unitid];
      let unitgroup = currentunit.group;
      let unitpos = currentunit.pos;
      let owner = ownernames[currentunit.owner];
      UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[
        owner + unitgroup
      ][unitpos] = UNITLAYERS[owner + "units"][unitpos] = currentunit;
    }

    let newstepid = step.stepid + "-" + "move";
    let newstep = (turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      UNITDATA: UNITDATA,
      UNITLAYERS: UNITLAYERS,
      stepid: newstepid,
      name: "move",
      path: step.path.concat("move")
    }));
    turn.links[newstepid] = {};

    turn.links[newstepid].endturn = "start" + otherplayer;

    return newstep;
  };

  game.start1 = function(lastTurn, step) {
    let turn: { [f: string]: any } = {
      steps: {},
      player: player,
      turn: lastTurn.turn + 1,
      links: { root: {} },
      endMarks: {}
    };

    let MARKS = {};
    let ARTIFACTS = emptyArtifactLayer;
    let UNITDATA = step.UNITDATA;

    let UNITLAYERS = {
      soldiers: {},
      mysoldiers: {},
      oppsoldiers: {},
      neutralsoldiers: {},
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {}
    };
    for (let unitid in UNITDATA) {
      let currentunit = UNITDATA[unitid];
      let unitgroup = currentunit.group;
      let unitpos = currentunit.pos;
      let owner = ownernames[currentunit.owner];
      UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[
        owner + unitgroup
      ][unitpos] = UNITLAYERS[owner + "units"][unitpos] = currentunit;
    }

    let newstep = (turn.steps.root = {
      ARTIFACTS: ARTIFACTS,
      UNITDATA: UNITDATA,
      UNITLAYERS: UNITLAYERS,
      MARKS: MARKS,
      stepid: "root",
      name: "start",

      path: []
    });

    let newlinks = turn.links.root;
    for (let linkpos in UNITLAYERS.myunits) {
      newlinks[linkpos] = "selectunit1";
    }

    return turn;
  };
  game.start1instruction = function(turn, step) {
    return collapseLine({
      type: "line",
      content: [
        { type: "text", text: "Select which" },
        {
          type: "unittyperef",
          alias: "pawn",
          name: "pawn".replace(/s$/, "")
        },
        { type: "text", text: "to move" }
      ]
    });
  };

  game.debug1 = function() {
    return { TERRAIN: TERRAIN };
  };
}

{
  // Actions for player 2

  let ownernames = ["neutral", "opp", "my"];
  let player = 2;
  let otherplayer = 1;

  game.brain_Bob_2 = function(step) {
    let UNITLAYERS = step.UNITLAYERS;
    let ARTIFACTS = step.ARTIFACTS;

    return Object.keys(UNITLAYERS.myunits).length;
  };
  game.brain_Bob_2_detailed = function(step) {
    let UNITLAYERS = step.UNITLAYERS;
    let ARTIFACTS = step.ARTIFACTS;

    return { headcount: Object.keys(UNITLAYERS.myunits).length };
  };

  game.selectunit2 = function(turn, step, markpos) {
    let ARTIFACTS = step.ARTIFACTS;
    let UNITLAYERS = step.UNITLAYERS;

    let MARKS = { selectunit: markpos };

    let BLOCKS = UNITLAYERS.units;

    let STARTPOS = MARKS["selectunit"];

    let allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];

    for (let walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
      let walkedsquares = [];

      let POS = STARTPOS;

      while (
        (POS = connections[POS][allwalkerdirs[walkerdirnbr]]) &&
        !BLOCKS[POS]
      ) {
        walkedsquares.push(POS);
      }
      var WALKLENGTH = walkedsquares.length;

      if (WALKLENGTH) {
        ARTIFACTS = {
          ...ARTIFACTS,
          ["movetargets"]: {
            ...ARTIFACTS["movetargets"],
            [walkedsquares[WALKLENGTH - 1]]: {}
          }
        };
      }
    }

    let newstepid = step.stepid + "-" + markpos;
    let newstep = (turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      stepid: newstepid,
      path: step.path.concat(markpos),
      name: "selectunit"
    }));
    turn.links[newstepid] = {};

    let newlinks = turn.links[newstepid];
    for (let linkpos in ARTIFACTS.movetargets) {
      newlinks[linkpos] = "selectmovetarget2";
    }

    return newstep;
  };
  game.selectunit2instruction = function(turn, step) {
    let MARKS = step.MARKS;
    return collapseLine({
      type: "line",
      content: [
        { type: "text", text: "Select where to move the" },
        { type: "posref", pos: MARKS["selectunit"] },
        {
          type: "unittyperef",
          alias: "pawn",
          name: "pawn".replace(/s$/, "")
        }
      ]
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
      if (POS && UNITLAYERS.oppunits[POS]) {
        ARTIFACTS = {
          ...ARTIFACTS,
          ["victims"]: {
            ...ARTIFACTS["victims"],
            [POS]: {}
          }
        };
      }
    }

    let newstepid = step.stepid + "-" + markpos;
    let newstep = (turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      stepid: newstepid,
      path: step.path.concat(markpos),
      name: "selectmovetarget"
    }));
    turn.links[newstepid] = {};

    turn.links[newstepid].move = "move2";

    return newstep;
  };
  game.selectmovetarget2instruction = function(turn, step) {
    let MARKS = step.MARKS;
    let ARTIFACTS = step.ARTIFACTS;
    return collapseLine({
      type: "line",
      content: [
        { type: "text", text: "Press" },
        { type: "cmndref", cmnd: "move" },
        { type: "text", text: "to move the" },
        { type: "posref", pos: MARKS["selectunit"] },
        {
          type: "unittyperef",
          alias: "pawn",
          name: "pawn".replace(/s$/, "")
        },
        { type: "text", text: "to" },
        { type: "posref", pos: MARKS["selectmovetarget"] },
        Object.keys(ARTIFACTS.victims).length !== 0
          ? collapseLine({
              type: "line",
              content: [
                { type: "text", text: "and take over" },
                {
                  type: "line",
                  content: [
                    {
                      type: "text",
                      text: Object.keys(ARTIFACTS.victims).length
                    },
                    Object.keys(ARTIFACTS.victims).length === 1
                      ? collapseLine({
                          type: "line",
                          content: [
                            { type: "text", text: "enemy" },
                            {
                              type: "unittyperef",
                              alias: "pawn",
                              name: "pawn".replace(/s$/, "")
                            }
                          ]
                        })
                      : collapseLine({
                          type: "line",
                          content: [
                            { type: "text", text: "enemy" },
                            {
                              type: "unittyperef",
                              alias: "pawns",
                              name: "pawns".replace(/s$/, "")
                            }
                          ]
                        })
                  ]
                }
              ]
            })
          : { type: "nothing" }
      ]
    });
  };

  game.move2 = function(turn, step) {
    let ARTIFACTS = step.ARTIFACTS;
    let MARKS = step.MARKS;
    let UNITDATA = Object.assign({}, step.UNITDATA);

    let UNITLAYERS = step.UNITLAYERS;

    {
      let unitid = (UNITLAYERS.units[MARKS["selectunit"]] || {}).id;
      if (unitid) {
        UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
          pos: MARKS["selectmovetarget"]
        });
      }
    }
    {
      let LOOPID;
      for (let POS in ARTIFACTS.victims) {
        if ((LOOPID = (UNITLAYERS.units[POS] || {}).id)) {
          UNITDATA[LOOPID] = Object.assign({}, UNITDATA[LOOPID], {
            owner: 2
          });
          // TODO - check that it uses ['loopid'] ?
        }
      }
    }
    MARKS = {};

    UNITLAYERS = {
      soldiers: {},
      mysoldiers: {},
      oppsoldiers: {},
      neutralsoldiers: {},
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {}
    };
    for (let unitid in UNITDATA) {
      let currentunit = UNITDATA[unitid];
      let unitgroup = currentunit.group;
      let unitpos = currentunit.pos;
      let owner = ownernames[currentunit.owner];
      UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[
        owner + unitgroup
      ][unitpos] = UNITLAYERS[owner + "units"][unitpos] = currentunit;
    }

    let newstepid = step.stepid + "-" + "move";
    let newstep = (turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      UNITDATA: UNITDATA,
      UNITLAYERS: UNITLAYERS,
      stepid: newstepid,
      name: "move",
      path: step.path.concat("move")
    }));
    turn.links[newstepid] = {};

    turn.links[newstepid].endturn = "start" + otherplayer;

    return newstep;
  };

  game.start2 = function(lastTurn, step) {
    let turn: { [f: string]: any } = {
      steps: {},
      player: player,
      turn: lastTurn.turn + 1,
      links: { root: {} },
      endMarks: {}
    };

    let MARKS = {};
    let ARTIFACTS = emptyArtifactLayer;
    let UNITDATA = step.UNITDATA;

    let UNITLAYERS = {
      soldiers: {},
      mysoldiers: {},
      oppsoldiers: {},
      neutralsoldiers: {},
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {}
    };
    for (let unitid in UNITDATA) {
      let currentunit = UNITDATA[unitid];
      let unitgroup = currentunit.group;
      let unitpos = currentunit.pos;
      let owner = ownernames[currentunit.owner];
      UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[
        owner + unitgroup
      ][unitpos] = UNITLAYERS[owner + "units"][unitpos] = currentunit;
    }

    let newstep = (turn.steps.root = {
      ARTIFACTS: ARTIFACTS,
      UNITDATA: UNITDATA,
      UNITLAYERS: UNITLAYERS,
      MARKS: MARKS,
      stepid: "root",
      name: "start",

      path: []
    });

    let newlinks = turn.links.root;
    for (let linkpos in UNITLAYERS.myunits) {
      newlinks[linkpos] = "selectunit2";
    }

    return turn;
  };
  game.start2instruction = function(turn, step) {
    return collapseLine({
      type: "line",
      content: [
        { type: "text", text: "Select which" },
        {
          type: "unittyperef",
          alias: "pawn",
          name: "pawn".replace(/s$/, "")
        },
        { type: "text", text: "to move" }
      ]
    });
  };

  game.debug2 = function() {
    return { TERRAIN: TERRAIN };
  };
}

export default game;
