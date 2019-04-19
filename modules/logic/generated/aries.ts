import {
  offsetPos,
  boardConnections,
  makeRelativeDirs,
  deduceInitialUnitData,
  boardLayers,
  terrainLayers,
  collapseContent,
  defaultInstruction
} from "../../common";
import { AlgolStepLinks, AlgolGame } from "../../types";
const emptyObj = {};
const BOARD = boardLayers({ height: 8, width: 8 });

const emptyArtifactLayers = { movetargets: {}, beingpushed: {}, squished: {} };

const connections = boardConnections({ height: 8, width: 8 });
const relativeDirs = makeRelativeDirs([]);
const roseDirs = [1, 2, 3, 4, 5, 6, 7, 8];
const orthoDirs = [1, 3, 5, 7];
const diagDirs = [2, 4, 6, 8];
let game: Partial<AlgolGame> = { action: {}, instruction: {} };
{
  const groupLayers = {
    soldiers: [["units"], ["units", "myunits"], ["units", "oppunits"]]
  };
  const TERRAIN = terrainLayers(
    8,
    8,
    { corner: { "1": ["a1"], "2": ["h8"] } },
    1
  );
  game.action.startTurn1 = step => {
    const oldUnitLayers = step.UNITLAYERS;
    let UNITLAYERS = {
      units: oldUnitLayers.units,
      myunits: oldUnitLayers.oppunits,
      oppunits: oldUnitLayers.myunits
    };
    let LINKS: AlgolStepLinks = {
      actions: {}
    };

    for (const pos of Object.keys(UNITLAYERS.myunits)) {
      LINKS.actions[pos] = "selectunit1";
    }

    return {
      UNITDATA: step.UNITDATA,
      LINKS,
      UNITLAYERS,
      ARTIFACTS: emptyArtifactLayers,
      MARKS: {},
      TURN: step.TURN + 1,

      BATTLEVARS: step.BATTLEVARS
    };
  };
  game.instruction.startTurn1 = step => {
    return collapseContent({
      line: [{ text: "Select a" }, { unittype: "rook" }, { text: "to move" }]
    });
  };
  game.action.move1 = step => {
    let LINKS: AlgolStepLinks = { actions: {} };
    let ARTIFACTS = {
      movetargets: step.ARTIFACTS.movetargets,
      beingpushed: step.ARTIFACTS.beingpushed,
      squished: step.ARTIFACTS.squished
    };
    let UNITLAYERS = step.UNITLAYERS;
    let BATTLEVARS = { ...step.BATTLEVARS };

    let UNITDATA = { ...step.UNITDATA };
    let MARKS = step.MARKS;
    BATTLEVARS.pusheeid = (UNITLAYERS.units[MARKS.selectmovetarget] || {}).id;
    BATTLEVARS.pushsquare = MARKS.selectmovetarget;
    for (let LOOPPOS in ARTIFACTS.beingpushed) {
      {
        let unitid = (UNITLAYERS.units[LOOPPOS] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: <string>(
              offsetPos(
                LOOPPOS,
                (ARTIFACTS.movetargets[MARKS.selectmovetarget] || {}).dir,
                1,
                0,
                { height: 8, width: 8 }
              )
            )
          };
        }
      }
    }
    for (let LOOPPOS in ARTIFACTS.squished) {
      delete UNITDATA[(UNITLAYERS.units[LOOPPOS] || {}).id];
    }
    {
      let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
      if (unitid) {
        UNITDATA[unitid] = {
          ...UNITDATA[unitid],
          pos: MARKS.selectmovetarget
        };
      }
    }

    UNITLAYERS = { units: {}, myunits: {}, oppunits: {} };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }

    if (
      Object.keys(
        Object.entries(
          Object.keys(TERRAIN.oppcorner)
            .concat(Object.keys(UNITLAYERS.myunits))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
      ).length !== 0
    ) {
      let winner = 1;
      LINKS.endGame = winner === 1 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "invade";
      LINKS.endMarks = Object.keys(
        Object.entries(
          Object.keys(TERRAIN.oppcorner)
            .concat(Object.keys(UNITLAYERS.myunits))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
      );
    } else {
      LINKS.endTurn = "startTurn2";
    }
    return {
      LINKS,
      MARKS: {},
      ARTIFACTS,
      TURN: step.TURN,
      UNITDATA,
      UNITLAYERS,

      BATTLEVARS
    };
  };
  game.instruction.move1 = () => defaultInstruction(1);
  game.action.selectunit1 = (step, newMarkPos) => {
    let ARTIFACTS = {
      movetargets: {}
    };
    let LINKS: AlgolStepLinks = { actions: {} };
    let MARKS = {
      selectunit: newMarkPos
    };
    let BATTLEVARS = step.BATTLEVARS;
    let UNITLAYERS = step.UNITLAYERS;
    {
      let BLOCKS = UNITLAYERS.units;

      for (let DIR of orthoDirs) {
        let POS = MARKS.selectunit;
        while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
          ARTIFACTS.movetargets[POS] = emptyObj;
        }
        if (BLOCKS[POS]) {
          if (
            !(
              POS === BATTLEVARS["pushsquare"] &&
              (UNITLAYERS.units[MARKS.selectunit] || {}).id ===
                BATTLEVARS["pusheeid"]
            ) &&
            UNITLAYERS.oppunits[POS]
          ) {
            ARTIFACTS.movetargets[POS] = { dir: DIR };
          }
        }
      }
    }
    for (const pos of Object.keys(ARTIFACTS.movetargets)) {
      LINKS.actions[pos] = "selectmovetarget1";
    }

    return {
      LINKS,
      ARTIFACTS,
      UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS,

      BATTLEVARS
    };
  };
  game.instruction.selectunit1 = step => {
    let MARKS = step.MARKS;

    return collapseContent({
      line: [
        { text: "Select where to move your" },
        { pos: MARKS.selectunit },
        { unittype: "rook" }
      ]
    });
  };
  game.action.selectmovetarget1 = (step, newMarkPos) => {
    let ARTIFACTS = {
      movetargets: step.ARTIFACTS.movetargets,
      beingpushed: {},
      squished: {}
    };
    let LINKS: AlgolStepLinks = { actions: {} };
    let MARKS = {
      selectunit: step.MARKS.selectunit,
      selectmovetarget: newMarkPos
    };
    let UNITLAYERS = step.UNITLAYERS;
    if (UNITLAYERS.oppunits[MARKS.selectmovetarget]) {
      {
        let allowedsteps = UNITLAYERS.oppunits;
        let BLOCKS = UNITLAYERS.myunits;

        let walkedsquares = [];
        let STOPREASON = "";
        let POS = "faux";
        connections.faux[
          relativeDirs[1][
            (ARTIFACTS.movetargets[MARKS.selectmovetarget] || {}).dir
          ]
        ] = MARKS.selectmovetarget;
        while (
          !(STOPREASON = !(POS =
            connections[POS][
              relativeDirs[1][
                (ARTIFACTS.movetargets[MARKS.selectmovetarget] || {}).dir
              ]
            ])
            ? "outofbounds"
            : BLOCKS[POS]
            ? "hitblock"
            : !allowedsteps[POS]
            ? "nomoresteps"
            : null)
        ) {
          walkedsquares.push(POS);
          ARTIFACTS.beingpushed[POS] = emptyObj;
        }
        let WALKLENGTH = walkedsquares.length;
        if (WALKLENGTH) {
          if (["hitblock", "outofbounds"].indexOf(STOPREASON) !== -1) {
            ARTIFACTS.squished[walkedsquares[WALKLENGTH - 1]] = emptyObj;
          }
        }
      }
    }
    LINKS.actions.move = "move1";

    return {
      LINKS,
      ARTIFACTS,
      UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS,

      BATTLEVARS: step.BATTLEVARS
    };
  };
  game.instruction.selectmovetarget1 = step => {
    let ARTIFACTS = step.ARTIFACTS;
    let MARKS = step.MARKS;

    return collapseContent({
      line: [
        { text: "Press" },
        { command: "move" },
        { text: "to move your" },
        { pos: MARKS.selectunit },
        { unittype: "rook" },
        { text: "to" },
        { pos: MARKS.selectmovetarget },
        Object.keys(ARTIFACTS.squished).length !== 0
          ? collapseContent({
              line: [
                { text: "and squash the enemy at" },
                { pos: Object.keys(ARTIFACTS.squished)[0] }
              ]
            })
          : undefined
      ]
    });
  };
}
{
  const groupLayers = {
    soldiers: [["units"], ["units", "oppunits"], ["units", "myunits"]]
  };
  const TERRAIN = terrainLayers(
    8,
    8,
    { corner: { "1": ["a1"], "2": ["h8"] } },
    2
  );
  game.action.startTurn2 = step => {
    const oldUnitLayers = step.UNITLAYERS;
    let UNITLAYERS = {
      units: oldUnitLayers.units,
      myunits: oldUnitLayers.oppunits,
      oppunits: oldUnitLayers.myunits
    };
    let LINKS: AlgolStepLinks = {
      actions: {}
    };

    for (const pos of Object.keys(UNITLAYERS.myunits)) {
      LINKS.actions[pos] = "selectunit2";
    }

    return {
      UNITDATA: step.UNITDATA,
      LINKS,
      UNITLAYERS,
      ARTIFACTS: emptyArtifactLayers,
      MARKS: {},
      TURN: step.TURN + 1,

      BATTLEVARS: step.BATTLEVARS
    };
  };
  game.instruction.startTurn2 = step => {
    return collapseContent({
      line: [{ text: "Select a" }, { unittype: "rook" }, { text: "to move" }]
    });
  };
  game.newBattle = () => {
    let UNITDATA = {
      unit1: {
        pos: "a1",
        x: 1,
        y: 1,
        id: "unit1",
        group: "soldiers",
        owner: 1
      },
      unit2: {
        pos: "a2",
        x: 1,
        y: 2,
        id: "unit2",
        group: "soldiers",
        owner: 1
      },
      unit3: {
        pos: "a3",
        x: 1,
        y: 3,
        id: "unit3",
        group: "soldiers",
        owner: 1
      },
      unit4: {
        pos: "a4",
        x: 1,
        y: 4,
        id: "unit4",
        group: "soldiers",
        owner: 1
      },
      unit5: {
        pos: "b1",
        x: 2,
        y: 1,
        id: "unit5",
        group: "soldiers",
        owner: 1
      },
      unit6: {
        pos: "b2",
        x: 2,
        y: 2,
        id: "unit6",
        group: "soldiers",
        owner: 1
      },
      unit7: {
        pos: "b3",
        x: 2,
        y: 3,
        id: "unit7",
        group: "soldiers",
        owner: 1
      },
      unit8: {
        pos: "b4",
        x: 2,
        y: 4,
        id: "unit8",
        group: "soldiers",
        owner: 1
      },
      unit9: {
        pos: "c1",
        x: 3,
        y: 1,
        id: "unit9",
        group: "soldiers",
        owner: 1
      },
      unit10: {
        pos: "c2",
        x: 3,
        y: 2,
        id: "unit10",
        group: "soldiers",
        owner: 1
      },
      unit11: {
        pos: "c3",
        x: 3,
        y: 3,
        id: "unit11",
        group: "soldiers",
        owner: 1
      },
      unit12: {
        pos: "c4",
        x: 3,
        y: 4,
        id: "unit12",
        group: "soldiers",
        owner: 1
      },
      unit13: {
        pos: "d1",
        x: 4,
        y: 1,
        id: "unit13",
        group: "soldiers",
        owner: 1
      },
      unit14: {
        pos: "d2",
        x: 4,
        y: 2,
        id: "unit14",
        group: "soldiers",
        owner: 1
      },
      unit15: {
        pos: "d3",
        x: 4,
        y: 3,
        id: "unit15",
        group: "soldiers",
        owner: 1
      },
      unit16: {
        pos: "d4",
        x: 4,
        y: 4,
        id: "unit16",
        group: "soldiers",
        owner: 1
      },
      unit17: {
        pos: "e5",
        x: 5,
        y: 5,
        id: "unit17",
        group: "soldiers",
        owner: 2
      },
      unit18: {
        pos: "e6",
        x: 5,
        y: 6,
        id: "unit18",
        group: "soldiers",
        owner: 2
      },
      unit19: {
        pos: "e7",
        x: 5,
        y: 7,
        id: "unit19",
        group: "soldiers",
        owner: 2
      },
      unit20: {
        pos: "e8",
        x: 5,
        y: 8,
        id: "unit20",
        group: "soldiers",
        owner: 2
      },
      unit21: {
        pos: "f5",
        x: 6,
        y: 5,
        id: "unit21",
        group: "soldiers",
        owner: 2
      },
      unit22: {
        pos: "f6",
        x: 6,
        y: 6,
        id: "unit22",
        group: "soldiers",
        owner: 2
      },
      unit23: {
        pos: "f7",
        x: 6,
        y: 7,
        id: "unit23",
        group: "soldiers",
        owner: 2
      },
      unit24: {
        pos: "f8",
        x: 6,
        y: 8,
        id: "unit24",
        group: "soldiers",
        owner: 2
      },
      unit25: {
        pos: "g5",
        x: 7,
        y: 5,
        id: "unit25",
        group: "soldiers",
        owner: 2
      },
      unit26: {
        pos: "g6",
        x: 7,
        y: 6,
        id: "unit26",
        group: "soldiers",
        owner: 2
      },
      unit27: {
        pos: "g7",
        x: 7,
        y: 7,
        id: "unit27",
        group: "soldiers",
        owner: 2
      },
      unit28: {
        pos: "g8",
        x: 7,
        y: 8,
        id: "unit28",
        group: "soldiers",
        owner: 2
      },
      unit29: {
        pos: "h5",
        x: 8,
        y: 5,
        id: "unit29",
        group: "soldiers",
        owner: 2
      },
      unit30: {
        pos: "h6",
        x: 8,
        y: 6,
        id: "unit30",
        group: "soldiers",
        owner: 2
      },
      unit31: {
        pos: "h7",
        x: 8,
        y: 7,
        id: "unit31",
        group: "soldiers",
        owner: 2
      },
      unit32: {
        pos: "h8",
        x: 8,
        y: 8,
        id: "unit32",
        group: "soldiers",
        owner: 2
      }
    };

    let UNITLAYERS = { units: {}, myunits: {}, oppunits: {} };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    return game.action.startTurn1({
      BATTLEVARS: {},
      TURN: 0,
      UNITDATA,
      UNITLAYERS
    });
  };
  game.action.move2 = step => {
    let LINKS: AlgolStepLinks = { actions: {} };
    let ARTIFACTS = {
      movetargets: step.ARTIFACTS.movetargets,
      beingpushed: step.ARTIFACTS.beingpushed,
      squished: step.ARTIFACTS.squished
    };
    let UNITLAYERS = step.UNITLAYERS;
    let BATTLEVARS = { ...step.BATTLEVARS };

    let UNITDATA = { ...step.UNITDATA };
    let MARKS = step.MARKS;
    BATTLEVARS.pusheeid = (UNITLAYERS.units[MARKS.selectmovetarget] || {}).id;
    BATTLEVARS.pushsquare = MARKS.selectmovetarget;
    for (let LOOPPOS in ARTIFACTS.beingpushed) {
      {
        let unitid = (UNITLAYERS.units[LOOPPOS] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: <string>(
              offsetPos(
                LOOPPOS,
                (ARTIFACTS.movetargets[MARKS.selectmovetarget] || {}).dir,
                1,
                0,
                { height: 8, width: 8 }
              )
            )
          };
        }
      }
    }
    for (let LOOPPOS in ARTIFACTS.squished) {
      delete UNITDATA[(UNITLAYERS.units[LOOPPOS] || {}).id];
    }
    {
      let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
      if (unitid) {
        UNITDATA[unitid] = {
          ...UNITDATA[unitid],
          pos: MARKS.selectmovetarget
        };
      }
    }

    UNITLAYERS = { units: {}, myunits: {}, oppunits: {} };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }

    if (
      Object.keys(
        Object.entries(
          Object.keys(TERRAIN.oppcorner)
            .concat(Object.keys(UNITLAYERS.myunits))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
      ).length !== 0
    ) {
      let winner = 2;
      LINKS.endGame = winner === 2 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "invade";
      LINKS.endMarks = Object.keys(
        Object.entries(
          Object.keys(TERRAIN.oppcorner)
            .concat(Object.keys(UNITLAYERS.myunits))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
      );
    } else {
      LINKS.endTurn = "startTurn1";
    }
    return {
      LINKS,
      MARKS: {},
      ARTIFACTS,
      TURN: step.TURN,
      UNITDATA,
      UNITLAYERS,

      BATTLEVARS
    };
  };
  game.instruction.move2 = () => defaultInstruction(2);
  game.action.selectunit2 = (step, newMarkPos) => {
    let ARTIFACTS = {
      movetargets: {}
    };
    let LINKS: AlgolStepLinks = { actions: {} };
    let MARKS = {
      selectunit: newMarkPos
    };
    let BATTLEVARS = step.BATTLEVARS;
    let UNITLAYERS = step.UNITLAYERS;
    {
      let BLOCKS = UNITLAYERS.units;

      for (let DIR of orthoDirs) {
        let POS = MARKS.selectunit;
        while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
          ARTIFACTS.movetargets[POS] = emptyObj;
        }
        if (BLOCKS[POS]) {
          if (
            !(
              POS === BATTLEVARS["pushsquare"] &&
              (UNITLAYERS.units[MARKS.selectunit] || {}).id ===
                BATTLEVARS["pusheeid"]
            ) &&
            UNITLAYERS.oppunits[POS]
          ) {
            ARTIFACTS.movetargets[POS] = { dir: DIR };
          }
        }
      }
    }
    for (const pos of Object.keys(ARTIFACTS.movetargets)) {
      LINKS.actions[pos] = "selectmovetarget2";
    }

    return {
      LINKS,
      ARTIFACTS,
      UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS,

      BATTLEVARS
    };
  };
  game.instruction.selectunit2 = step => {
    let MARKS = step.MARKS;

    return collapseContent({
      line: [
        { text: "Select where to move your" },
        { pos: MARKS.selectunit },
        { unittype: "rook" }
      ]
    });
  };
  game.action.selectmovetarget2 = (step, newMarkPos) => {
    let ARTIFACTS = {
      movetargets: step.ARTIFACTS.movetargets,
      beingpushed: {},
      squished: {}
    };
    let LINKS: AlgolStepLinks = { actions: {} };
    let MARKS = {
      selectunit: step.MARKS.selectunit,
      selectmovetarget: newMarkPos
    };
    let UNITLAYERS = step.UNITLAYERS;
    if (UNITLAYERS.oppunits[MARKS.selectmovetarget]) {
      {
        let allowedsteps = UNITLAYERS.oppunits;
        let BLOCKS = UNITLAYERS.myunits;

        let walkedsquares = [];
        let STOPREASON = "";
        let POS = "faux";
        connections.faux[
          relativeDirs[1][
            (ARTIFACTS.movetargets[MARKS.selectmovetarget] || {}).dir
          ]
        ] = MARKS.selectmovetarget;
        while (
          !(STOPREASON = !(POS =
            connections[POS][
              relativeDirs[1][
                (ARTIFACTS.movetargets[MARKS.selectmovetarget] || {}).dir
              ]
            ])
            ? "outofbounds"
            : BLOCKS[POS]
            ? "hitblock"
            : !allowedsteps[POS]
            ? "nomoresteps"
            : null)
        ) {
          walkedsquares.push(POS);
          ARTIFACTS.beingpushed[POS] = emptyObj;
        }
        let WALKLENGTH = walkedsquares.length;
        if (WALKLENGTH) {
          if (["hitblock", "outofbounds"].indexOf(STOPREASON) !== -1) {
            ARTIFACTS.squished[walkedsquares[WALKLENGTH - 1]] = emptyObj;
          }
        }
      }
    }
    LINKS.actions.move = "move2";

    return {
      LINKS,
      ARTIFACTS,
      UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS,

      BATTLEVARS: step.BATTLEVARS
    };
  };
  game.instruction.selectmovetarget2 = step => {
    let ARTIFACTS = step.ARTIFACTS;
    let MARKS = step.MARKS;

    return collapseContent({
      line: [
        { text: "Press" },
        { command: "move" },
        { text: "to move your" },
        { pos: MARKS.selectunit },
        { unittype: "rook" },
        { text: "to" },
        { pos: MARKS.selectmovetarget },
        Object.keys(ARTIFACTS.squished).length !== 0
          ? collapseContent({
              line: [
                { text: "and squash the enemy at" },
                { pos: Object.keys(ARTIFACTS.squished)[0] }
              ]
            })
          : undefined
      ]
    });
  };
}
export default game as AlgolGame;
