import fullDef from "../../games/dist/games/descent";
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
const emptyArtifactLayer = { movetargets: {}, digtargets: {}, winline: {} };
game.commands = { move: 1, dig: 1 };
game.graphics = {
  icons: { pawns: "pawn", knights: "knight", rooks: "rook" },
  tiles: {}
};
game.board = { height: 4, width: 4, terrain: {} };
game.AI = [];
game.id = "descent";
let connections = boardConnections(fullDef.board);
let BOARD = boardLayers(fullDef.board);
let TERRAIN = terrainLayers(fullDef.board, 0);
game.newGame = function() {
  let turnseed = { turn: 0 };
  let stepseed = {
    UNITDATA: deduceInitialUnitData(fullDef.setup),
    TURNVARS: {},

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

  game.selectunit1 = function(turn, step, markpos) {
    let ARTIFACTS = step.ARTIFACTS;
    let UNITLAYERS = step.UNITLAYERS;

    let MARKS = { selectunit: markpos };

    let STARTPOS = MARKS["selectunit"];

    let neighbourdirs = [1, 2, 3, 4, 5, 6, 7, 8];

    let startconnections = connections[STARTPOS];
    for (let dirnbr = 0; dirnbr < 8; dirnbr++) {
      let POS = startconnections[neighbourdirs[dirnbr]];
      if (
        POS &&
        (!!UNITLAYERS.rooks[MARKS["selectunit"]]
          ? !UNITLAYERS.pawns[POS]
          : !!UNITLAYERS.pawns[MARKS["selectunit"]]
          ? !UNITLAYERS.rooks[POS]
          : true)
      ) {
        if (UNITLAYERS.neutralunits[POS]) {
          ARTIFACTS = {
            ...ARTIFACTS,
            ["movetargets"]: {
              ...ARTIFACTS["movetargets"],
              [POS]: {}
            }
          };
        }
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
    return { type: "text", text: "Select where to move this unit" };
  };

  game.selectmovetarget1 = function(turn, step, markpos) {
    let MARKS = {
      selectmovetarget: markpos,
      selectunit: step.MARKS.selectunit
    };

    let newstepid = step.stepid + "-" + markpos;
    let newstep = (turn.steps[newstepid] = Object.assign({}, step, {
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
    let UNITLAYERS = step.UNITLAYERS;
    return collapseLine({
      type: "line",
      content: [
        { type: "text", text: "Press" },
        { type: "cmndref", cmnd: "move" },
        { type: "text", text: "to" },
        (UNITLAYERS.units[MARKS["selectunit"]] || {})["group"] ===
        (UNITLAYERS.units[MARKS["selectmovetarget"]] || {})["group"]
          ? { type: "text", text: "walk" }
          : !!UNITLAYERS.rooks[MARKS["selectunit"]] ||
            !!UNITLAYERS.pawns[MARKS["selectmovetarget"]]
          ? { type: "text", text: "descend" }
          : { type: "text", text: "climb" },
        { type: "text", text: "from" },
        { type: "posref", pos: MARKS["selectunit"] },
        { type: "text", text: "to" },
        { type: "posref", pos: MARKS["selectmovetarget"] }
      ]
    });
  };

  game.selectdigtarget1 = function(turn, step, markpos) {
    let MARKS = { selectdigtarget: markpos };

    let newstepid = step.stepid + "-" + markpos;
    let newstep = (turn.steps[newstepid] = Object.assign({}, step, {
      MARKS: MARKS,
      stepid: newstepid,
      path: step.path.concat(markpos),
      name: "selectdigtarget"
    }));
    turn.links[newstepid] = {};

    turn.links[newstepid].dig = "dig1";

    return newstep;
  };
  game.selectdigtarget1instruction = function(turn, step) {
    let MARKS = step.MARKS;
    let UNITLAYERS = step.UNITLAYERS;
    return !!UNITLAYERS.rooks[MARKS["selectdigtarget"]]
      ? collapseLine({
          type: "line",
          content: [
            { type: "text", text: "Press" },
            { type: "cmndref", cmnd: "dig" },
            { type: "text", text: "to lower" },
            { type: "posref", pos: MARKS["selectdigtarget"] },
            { type: "text", text: "from level 3 to level 2" }
          ]
        })
      : !!UNITLAYERS.knights[MARKS["selectdigtarget"]]
      ? collapseLine({
          type: "line",
          content: [
            { type: "text", text: "Press" },
            { type: "cmndref", cmnd: "dig" },
            { type: "text", text: "to lower" },
            { type: "posref", pos: MARKS["selectdigtarget"] },
            { type: "text", text: "from level 2 to level 1" }
          ]
        })
      : collapseLine({
          type: "line",
          content: [
            { type: "text", text: "Press" },
            { type: "cmndref", cmnd: "dig" },
            { type: "text", text: "to destroy" },
            { type: "posref", pos: MARKS["selectdigtarget"] }
          ]
        });
  };

  game.move1 = function(turn, step) {
    let ARTIFACTS = step.ARTIFACTS;
    let MARKS = step.MARKS;
    let UNITDATA = Object.assign({}, step.UNITDATA);
    let clones = step.clones;
    let UNITLAYERS = step.UNITLAYERS;
    let TURNVARS = Object.assign({}, step.TURNVARS);

    {
      TURNVARS["movedto"] = MARKS["selectmovetarget"];
    }
    {
      TURNVARS["heightfrom"] = (UNITLAYERS.units[MARKS["selectunit"]] || {})[
        "group"
      ];
    }
    {
      TURNVARS["heightto"] = (UNITLAYERS.units[MARKS["selectmovetarget"]] ||
        {})["group"];
    }
    {
      let unitid = (UNITLAYERS.units[MARKS["selectunit"]] || {}).id;
      if (unitid) {
        UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
          group: TURNVARS["heightto"]
        });
      }
    }
    {
      delete UNITDATA[(UNITLAYERS.units[MARKS["selectmovetarget"]] || {}).id];
    }
    {
      let unitid = (UNITLAYERS.units[MARKS["selectunit"]] || {}).id;
      if (unitid) {
        UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
          pos: MARKS["selectmovetarget"]
        });
      }
    }
    {
      let newunitid = "spawn" + clones++;
      UNITDATA[newunitid] = {
        pos: MARKS["selectunit"],
        id: newunitid,
        group: TURNVARS["heightfrom"],
        owner: 0
      };
    }
    MARKS = {};

    UNITLAYERS = {
      rooks: {},
      myrooks: {},
      opprooks: {},
      neutralrooks: {},
      knights: {},
      myknights: {},
      oppknights: {},
      neutralknights: {},
      pawns: {},
      mypawns: {},
      opppawns: {},
      neutralpawns: {},
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

    let STARTPOS = TURNVARS["movedto"];

    let neighbourdirs = [1, 2, 3, 4, 5, 6, 7, 8];

    let startconnections = connections[STARTPOS];
    for (let dirnbr = 0; dirnbr < 8; dirnbr++) {
      let POS = startconnections[neighbourdirs[dirnbr]];
      if (POS && UNITLAYERS.neutralunits[POS]) {
        ARTIFACTS = {
          ...ARTIFACTS,
          ["digtargets"]: {
            ...ARTIFACTS["digtargets"],
            [POS]: {}
          }
        };
      }
    }

    let newstepid = step.stepid + "-" + "move";
    let newstep = (turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      UNITDATA: UNITDATA,
      UNITLAYERS: UNITLAYERS,
      stepid: newstepid,
      name: "move",
      path: step.path.concat("move"),
      clones: clones,
      TURNVARS: TURNVARS
    }));
    turn.links[newstepid] = {};

    let newlinks = turn.links[newstepid];
    for (let linkpos in ARTIFACTS.digtargets) {
      newlinks[linkpos] = "selectdigtarget1";
    }

    return newstep;
  };

  game.move1instruction = function(turn, step) {
    return {
      type: "text",
      text: "Now select an empty neighbouring square to dig"
    };
  };

  game.dig1 = function(turn, step) {
    let ARTIFACTS = step.ARTIFACTS;
    let MARKS = step.MARKS;
    let UNITDATA = Object.assign({}, step.UNITDATA);

    let UNITLAYERS = step.UNITLAYERS;

    if (!!UNITLAYERS.pawns[MARKS["selectdigtarget"]]) {
      delete UNITDATA[(UNITLAYERS.units[MARKS["selectdigtarget"]] || {}).id];
    } else {
      let unitid = (UNITLAYERS.units[MARKS["selectdigtarget"]] || {}).id;
      if (unitid) {
        UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
          group: !!UNITLAYERS.knights[MARKS["selectdigtarget"]]
            ? "pawns"
            : "knights"
        });
      }
    }

    MARKS = {};

    UNITLAYERS = {
      rooks: {},
      myrooks: {},
      opprooks: {},
      neutralrooks: {},
      knights: {},
      myknights: {},
      oppknights: {},
      neutralknights: {},
      pawns: {},
      mypawns: {},
      opppawns: {},
      neutralpawns: {},
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

    let walkstarts = UNITLAYERS.myunits;
    for (let STARTPOS in walkstarts) {
      let allowedsteps = !!UNITLAYERS.myrooks[STARTPOS]
        ? UNITLAYERS.myrooks
        : !!UNITLAYERS.myknights[STARTPOS]
        ? UNITLAYERS.myknights
        : UNITLAYERS.mypawns;

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

          if (WALKLENGTH > 2) {
            ARTIFACTS = {
              ...ARTIFACTS,
              ["winline"]: {
                ...ARTIFACTS["winline"],
                [POS]: {}
              }
            };
          }
        }
      }
    }

    let newstepid = step.stepid + "-" + "dig";
    let newstep = (turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      UNITDATA: UNITDATA,
      UNITLAYERS: UNITLAYERS,
      stepid: newstepid,
      name: "dig",
      path: step.path.concat("dig")
    }));
    turn.links[newstepid] = {};

    if (Object.keys(ARTIFACTS.winline).length !== 0) {
      let winner = 1;
      let result = winner === 1 ? "win" : winner ? "lose" : "draw";
      turn.links[newstepid][result] = "madeline";

      turn.endMarks[newstepid] = turn.endMarks[newstepid] || {};
      turn.endMarks[newstepid].madeline = ARTIFACTS.winline;
    } else turn.links[newstepid].endturn = "start" + otherplayer;

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
    let TURNVARS = {};

    let UNITLAYERS = {
      rooks: {},
      myrooks: {},
      opprooks: {},
      neutralrooks: {},
      knights: {},
      myknights: {},
      oppknights: {},
      neutralknights: {},
      pawns: {},
      mypawns: {},
      opppawns: {},
      neutralpawns: {},
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
      clones: step.clones,
      path: [],
      TURNVARS: TURNVARS
    });

    let newlinks = turn.links.root;
    for (let linkpos in UNITLAYERS.myunits) {
      newlinks[linkpos] = "selectunit1";
    }

    return turn;
  };
  game.start1instruction = function(turn, step) {
    return { type: "text", text: "Select a unit to move and dig with" };
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

  game.selectunit2 = function(turn, step, markpos) {
    let ARTIFACTS = step.ARTIFACTS;
    let UNITLAYERS = step.UNITLAYERS;

    let MARKS = { selectunit: markpos };

    let STARTPOS = MARKS["selectunit"];

    let neighbourdirs = [1, 2, 3, 4, 5, 6, 7, 8];

    let startconnections = connections[STARTPOS];
    for (let dirnbr = 0; dirnbr < 8; dirnbr++) {
      let POS = startconnections[neighbourdirs[dirnbr]];
      if (
        POS &&
        (!!UNITLAYERS.rooks[MARKS["selectunit"]]
          ? !UNITLAYERS.pawns[POS]
          : !!UNITLAYERS.pawns[MARKS["selectunit"]]
          ? !UNITLAYERS.rooks[POS]
          : true)
      ) {
        if (UNITLAYERS.neutralunits[POS]) {
          ARTIFACTS = {
            ...ARTIFACTS,
            ["movetargets"]: {
              ...ARTIFACTS["movetargets"],
              [POS]: {}
            }
          };
        }
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
    return { type: "text", text: "Select where to move this unit" };
  };

  game.selectmovetarget2 = function(turn, step, markpos) {
    let MARKS = {
      selectmovetarget: markpos,
      selectunit: step.MARKS.selectunit
    };

    let newstepid = step.stepid + "-" + markpos;
    let newstep = (turn.steps[newstepid] = Object.assign({}, step, {
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
    let UNITLAYERS = step.UNITLAYERS;
    return collapseLine({
      type: "line",
      content: [
        { type: "text", text: "Press" },
        { type: "cmndref", cmnd: "move" },
        { type: "text", text: "to" },
        (UNITLAYERS.units[MARKS["selectunit"]] || {})["group"] ===
        (UNITLAYERS.units[MARKS["selectmovetarget"]] || {})["group"]
          ? { type: "text", text: "walk" }
          : !!UNITLAYERS.rooks[MARKS["selectunit"]] ||
            !!UNITLAYERS.pawns[MARKS["selectmovetarget"]]
          ? { type: "text", text: "descend" }
          : { type: "text", text: "climb" },
        { type: "text", text: "from" },
        { type: "posref", pos: MARKS["selectunit"] },
        { type: "text", text: "to" },
        { type: "posref", pos: MARKS["selectmovetarget"] }
      ]
    });
  };

  game.selectdigtarget2 = function(turn, step, markpos) {
    let MARKS = { selectdigtarget: markpos };

    let newstepid = step.stepid + "-" + markpos;
    let newstep = (turn.steps[newstepid] = Object.assign({}, step, {
      MARKS: MARKS,
      stepid: newstepid,
      path: step.path.concat(markpos),
      name: "selectdigtarget"
    }));
    turn.links[newstepid] = {};

    turn.links[newstepid].dig = "dig2";

    return newstep;
  };
  game.selectdigtarget2instruction = function(turn, step) {
    let MARKS = step.MARKS;
    let UNITLAYERS = step.UNITLAYERS;
    return !!UNITLAYERS.rooks[MARKS["selectdigtarget"]]
      ? collapseLine({
          type: "line",
          content: [
            { type: "text", text: "Press" },
            { type: "cmndref", cmnd: "dig" },
            { type: "text", text: "to lower" },
            { type: "posref", pos: MARKS["selectdigtarget"] },
            { type: "text", text: "from level 3 to level 2" }
          ]
        })
      : !!UNITLAYERS.knights[MARKS["selectdigtarget"]]
      ? collapseLine({
          type: "line",
          content: [
            { type: "text", text: "Press" },
            { type: "cmndref", cmnd: "dig" },
            { type: "text", text: "to lower" },
            { type: "posref", pos: MARKS["selectdigtarget"] },
            { type: "text", text: "from level 2 to level 1" }
          ]
        })
      : collapseLine({
          type: "line",
          content: [
            { type: "text", text: "Press" },
            { type: "cmndref", cmnd: "dig" },
            { type: "text", text: "to destroy" },
            { type: "posref", pos: MARKS["selectdigtarget"] }
          ]
        });
  };

  game.move2 = function(turn, step) {
    let ARTIFACTS = step.ARTIFACTS;
    let MARKS = step.MARKS;
    let UNITDATA = Object.assign({}, step.UNITDATA);
    let clones = step.clones;
    let UNITLAYERS = step.UNITLAYERS;
    let TURNVARS = Object.assign({}, step.TURNVARS);

    {
      TURNVARS["movedto"] = MARKS["selectmovetarget"];
    }
    {
      TURNVARS["heightfrom"] = (UNITLAYERS.units[MARKS["selectunit"]] || {})[
        "group"
      ];
    }
    {
      TURNVARS["heightto"] = (UNITLAYERS.units[MARKS["selectmovetarget"]] ||
        {})["group"];
    }
    {
      let unitid = (UNITLAYERS.units[MARKS["selectunit"]] || {}).id;
      if (unitid) {
        UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
          group: TURNVARS["heightto"]
        });
      }
    }
    {
      delete UNITDATA[(UNITLAYERS.units[MARKS["selectmovetarget"]] || {}).id];
    }
    {
      let unitid = (UNITLAYERS.units[MARKS["selectunit"]] || {}).id;
      if (unitid) {
        UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
          pos: MARKS["selectmovetarget"]
        });
      }
    }
    {
      let newunitid = "spawn" + clones++;
      UNITDATA[newunitid] = {
        pos: MARKS["selectunit"],
        id: newunitid,
        group: TURNVARS["heightfrom"],
        owner: 0
      };
    }
    MARKS = {};

    UNITLAYERS = {
      rooks: {},
      myrooks: {},
      opprooks: {},
      neutralrooks: {},
      knights: {},
      myknights: {},
      oppknights: {},
      neutralknights: {},
      pawns: {},
      mypawns: {},
      opppawns: {},
      neutralpawns: {},
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

    let STARTPOS = TURNVARS["movedto"];

    let neighbourdirs = [1, 2, 3, 4, 5, 6, 7, 8];

    let startconnections = connections[STARTPOS];
    for (let dirnbr = 0; dirnbr < 8; dirnbr++) {
      let POS = startconnections[neighbourdirs[dirnbr]];
      if (POS && UNITLAYERS.neutralunits[POS]) {
        ARTIFACTS = {
          ...ARTIFACTS,
          ["digtargets"]: {
            ...ARTIFACTS["digtargets"],
            [POS]: {}
          }
        };
      }
    }

    let newstepid = step.stepid + "-" + "move";
    let newstep = (turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      UNITDATA: UNITDATA,
      UNITLAYERS: UNITLAYERS,
      stepid: newstepid,
      name: "move",
      path: step.path.concat("move"),
      clones: clones,
      TURNVARS: TURNVARS
    }));
    turn.links[newstepid] = {};

    let newlinks = turn.links[newstepid];
    for (let linkpos in ARTIFACTS.digtargets) {
      newlinks[linkpos] = "selectdigtarget2";
    }

    return newstep;
  };

  game.move2instruction = function(turn, step) {
    return {
      type: "text",
      text: "Now select an empty neighbouring square to dig"
    };
  };

  game.dig2 = function(turn, step) {
    let ARTIFACTS = step.ARTIFACTS;
    let MARKS = step.MARKS;
    let UNITDATA = Object.assign({}, step.UNITDATA);

    let UNITLAYERS = step.UNITLAYERS;

    if (!!UNITLAYERS.pawns[MARKS["selectdigtarget"]]) {
      delete UNITDATA[(UNITLAYERS.units[MARKS["selectdigtarget"]] || {}).id];
    } else {
      let unitid = (UNITLAYERS.units[MARKS["selectdigtarget"]] || {}).id;
      if (unitid) {
        UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
          group: !!UNITLAYERS.knights[MARKS["selectdigtarget"]]
            ? "pawns"
            : "knights"
        });
      }
    }

    MARKS = {};

    UNITLAYERS = {
      rooks: {},
      myrooks: {},
      opprooks: {},
      neutralrooks: {},
      knights: {},
      myknights: {},
      oppknights: {},
      neutralknights: {},
      pawns: {},
      mypawns: {},
      opppawns: {},
      neutralpawns: {},
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

    let walkstarts = UNITLAYERS.myunits;
    for (let STARTPOS in walkstarts) {
      let allowedsteps = !!UNITLAYERS.myrooks[STARTPOS]
        ? UNITLAYERS.myrooks
        : !!UNITLAYERS.myknights[STARTPOS]
        ? UNITLAYERS.myknights
        : UNITLAYERS.mypawns;

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

          if (WALKLENGTH > 2) {
            ARTIFACTS = {
              ...ARTIFACTS,
              ["winline"]: {
                ...ARTIFACTS["winline"],
                [POS]: {}
              }
            };
          }
        }
      }
    }

    let newstepid = step.stepid + "-" + "dig";
    let newstep = (turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      UNITDATA: UNITDATA,
      UNITLAYERS: UNITLAYERS,
      stepid: newstepid,
      name: "dig",
      path: step.path.concat("dig")
    }));
    turn.links[newstepid] = {};

    if (Object.keys(ARTIFACTS.winline).length !== 0) {
      let winner = 2;
      let result = winner === 2 ? "win" : winner ? "lose" : "draw";
      turn.links[newstepid][result] = "madeline";

      turn.endMarks[newstepid] = turn.endMarks[newstepid] || {};
      turn.endMarks[newstepid].madeline = ARTIFACTS.winline;
    } else turn.links[newstepid].endturn = "start" + otherplayer;

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
    let TURNVARS = {};

    let UNITLAYERS = {
      rooks: {},
      myrooks: {},
      opprooks: {},
      neutralrooks: {},
      knights: {},
      myknights: {},
      oppknights: {},
      neutralknights: {},
      pawns: {},
      mypawns: {},
      opppawns: {},
      neutralpawns: {},
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
      clones: step.clones,
      path: [],
      TURNVARS: TURNVARS
    });

    let newlinks = turn.links.root;
    for (let linkpos in UNITLAYERS.myunits) {
      newlinks[linkpos] = "selectunit2";
    }

    return turn;
  };
  game.start2instruction = function(turn, step) {
    return { type: "text", text: "Select a unit to move and dig with" };
  };

  game.debug2 = function() {
    return { TERRAIN: TERRAIN };
  };
}

export default game;
