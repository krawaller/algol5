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
const BOARD = boardLayers({ height: 4, width: 4 });
const iconMapping = { notfrozens: "knight", frozens: "knight" };
const emptyArtifactLayers = { movetargets: {} };
const connections = boardConnections({ height: 4, width: 4 });
const relativeDirs = makeRelativeDirs([]);
const roseDirs = [1, 2, 3, 4, 5, 6, 7, 8];
const orthoDirs = [1, 3, 5, 7];
const diagDirs = [2, 4, 6, 8];
let game: Partial<AlgolGame> = { gameId: "krieg", action: {}, instruction: {} };
{
  const groupLayers = {
    notfrozens: [
      ["units"],
      ["units", "myunits", "mynotfrozens"],
      ["units", "oppunits", "oppnotfrozens"]
    ],
    frozens: [
      ["units"],
      ["units", "myunits", "myfrozens"],
      ["units", "oppunits", "oppfrozens"]
    ]
  };
  const TERRAIN = terrainLayers(
    4,
    4,
    {
      southeast: ["a4", "c2"],
      northwest: ["b3", "d1"],
      corners: { "1": ["a4"], "2": ["d1"] },
      bases: { "1": ["b4", "a3", "b3"], "2": ["c2", "d2", "c1"] }
    },
    1
  );
  game.action.startTurn1 = step => {
    const oldUnitLayers = step.UNITLAYERS;
    let UNITLAYERS = {
      units: oldUnitLayers.units,
      myunits: oldUnitLayers.oppunits,
      oppunits: oldUnitLayers.myunits,
      mynotfrozens: oldUnitLayers.oppnotfrozens,
      oppnotfrozens: oldUnitLayers.mynotfrozens,
      myfrozens: oldUnitLayers.oppfrozens,
      oppfrozens: oldUnitLayers.myfrozens
    };
    let LINKS: AlgolStepLinks = {
      actions: {}
    };
    for (const pos of Object.keys(UNITLAYERS.mynotfrozens)) {
      LINKS.actions[pos] = "selectunit1";
    }
    return {
      UNITDATA: step.UNITDATA,
      LINKS,
      UNITLAYERS,
      ARTIFACTS: emptyArtifactLayers,
      MARKS: {},
      TURN: step.TURN + 1
    };
  };
  game.instruction.startTurn1 = step => {
    let UNITLAYERS = step.UNITLAYERS;
    let TURN = step.TURN;
    return TURN > 2
      ? collapseContent({
          line: [
            { select: "Select" },
            { unittype: ["knight", 1] },
            { text: "to move (except" },
            {
              unit: [
                iconMapping[
                  (UNITLAYERS.units[Object.keys(UNITLAYERS.myfrozens)[0]] || {})
                    .group
                ],
                (UNITLAYERS.units[Object.keys(UNITLAYERS.myfrozens)[0]] || {})
                  .owner as 0 | 1 | 2,
                Object.keys(UNITLAYERS.myfrozens)[0]
              ]
            },
            { text: "who moved last turn)" }
          ]
        })
      : collapseContent({
          line: [
            { select: "Select" },
            { unittype: ["knight", 1] },
            { text: "to move" }
          ]
        });
  };
  game.action.move1 = step => {
    let LINKS: AlgolStepLinks = { actions: {} };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let MARKS = step.MARKS;
    for (let LOOPPOS in UNITLAYERS.myfrozens) {
      {
        let unitid = (UNITLAYERS.units[LOOPPOS] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            group: "notfrozens"
          };
        }
      }
    }
    {
      let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
      if (unitid) {
        UNITDATA[unitid] = {
          ...UNITDATA[unitid],
          group: "frozens"
        };
      }
    }
    {
      let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
      if (unitid) {
        UNITDATA[unitid] = {
          ...UNITDATA[unitid],
          pos: MARKS.selectmove
        };
      }
    }
    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      mynotfrozens: {},
      oppnotfrozens: {},
      myfrozens: {},
      oppfrozens: {}
    };
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
          Object.keys(TERRAIN.oppcorners)
            .concat(Object.keys(UNITLAYERS.myunits))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
      ).length !== 0
    ) {
      let winner = 1;
      LINKS.endGame = winner === 1 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "cornerinfiltration";
      LINKS.endMarks = Object.keys(
        Object.entries(
          Object.keys(TERRAIN.oppcorners)
            .concat(Object.keys(UNITLAYERS.myunits))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
      );
    } else if (
      Object.keys(
        Object.entries(
          Object.keys(TERRAIN.oppbases)
            .concat(Object.keys(UNITLAYERS.myunits))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
      ).length === 2
    ) {
      let winner = 1;
      LINKS.endGame = winner === 1 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "occupation";
      LINKS.endMarks = Object.keys(
        Object.entries(
          Object.keys(TERRAIN.oppbases)
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
      ARTIFACTS: step.ARTIFACTS,
      TURN: step.TURN,
      UNITDATA,
      UNITLAYERS
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
    let UNITLAYERS = step.UNITLAYERS;
    {
      let STARTPOS = MARKS.selectunit;
      let startconnections = connections[STARTPOS];
      for (let DIR of TERRAIN.southeast[STARTPOS]
        ? [1, 3, 4, 5, 7]
        : TERRAIN.northwest[STARTPOS]
        ? [1, 3, 5, 7, 8]
        : orthoDirs) {
        let POS = startconnections[DIR];
        if (POS && !UNITLAYERS.units[POS]) {
          ARTIFACTS.movetargets[POS] = emptyObj;
        }
      }
    }
    for (const pos of Object.keys(ARTIFACTS.movetargets)) {
      LINKS.actions[pos] = "selectmove1";
    }
    return {
      LINKS,
      ARTIFACTS,
      UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS
    };
  };
  game.instruction.selectunit1 = step => {
    let MARKS = step.MARKS;
    let UNITLAYERS = step.UNITLAYERS;
    return collapseContent({
      line: [
        { select: "Select" },
        { text: "an empty square to move" },
        {
          unit: [
            iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
            (UNITLAYERS.units[MARKS.selectunit] || {}).owner as 0 | 1 | 2,
            MARKS.selectunit
          ]
        },
        { text: "to" }
      ]
    });
  };
  game.action.selectmove1 = (step, newMarkPos) => {
    let LINKS: AlgolStepLinks = { actions: {} };
    LINKS.actions.move = "move1";
    return {
      LINKS,
      ARTIFACTS: step.ARTIFACTS,
      UNITLAYERS: step.UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS: { selectunit: step.MARKS.selectunit, selectmove: newMarkPos }
    };
  };
  game.instruction.selectmove1 = step => {
    let MARKS = step.MARKS;
    let UNITLAYERS = step.UNITLAYERS;
    return collapseContent({
      line: [
        { text: "Press" },
        { command: "move" },
        { text: "to make" },
        {
          unit: [
            iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
            (UNITLAYERS.units[MARKS.selectunit] || {}).owner as 0 | 1 | 2,
            MARKS.selectunit
          ]
        },
        { text: "go" },
        TERRAIN.oppbases[MARKS.selectmove] &&
        !TERRAIN.oppbases[MARKS.selectunit]
          ? collapseContent({
              line: [
                { text: "into the opponent base at" },
                { pos: MARKS.selectmove }
              ]
            })
          : collapseContent({
              line: [{ text: "to" }, { pos: MARKS.selectmove }]
            })
      ]
    });
  };
}
{
  const groupLayers = {
    notfrozens: [
      ["units"],
      ["units", "oppunits", "oppnotfrozens"],
      ["units", "myunits", "mynotfrozens"]
    ],
    frozens: [
      ["units"],
      ["units", "oppunits", "oppfrozens"],
      ["units", "myunits", "myfrozens"]
    ]
  };
  const TERRAIN = terrainLayers(
    4,
    4,
    {
      southeast: ["a4", "c2"],
      northwest: ["b3", "d1"],
      corners: { "1": ["a4"], "2": ["d1"] },
      bases: { "1": ["b4", "a3", "b3"], "2": ["c2", "d2", "c1"] }
    },
    2
  );
  game.action.startTurn2 = step => {
    const oldUnitLayers = step.UNITLAYERS;
    let UNITLAYERS = {
      units: oldUnitLayers.units,
      myunits: oldUnitLayers.oppunits,
      oppunits: oldUnitLayers.myunits,
      mynotfrozens: oldUnitLayers.oppnotfrozens,
      oppnotfrozens: oldUnitLayers.mynotfrozens,
      myfrozens: oldUnitLayers.oppfrozens,
      oppfrozens: oldUnitLayers.myfrozens
    };
    let LINKS: AlgolStepLinks = {
      actions: {}
    };
    for (const pos of Object.keys(UNITLAYERS.mynotfrozens)) {
      LINKS.actions[pos] = "selectunit2";
    }
    return {
      UNITDATA: step.UNITDATA,
      LINKS,
      UNITLAYERS,
      ARTIFACTS: emptyArtifactLayers,
      MARKS: {},
      TURN: step.TURN + 1
    };
  };
  game.instruction.startTurn2 = step => {
    let UNITLAYERS = step.UNITLAYERS;
    let TURN = step.TURN;
    return TURN > 2
      ? collapseContent({
          line: [
            { select: "Select" },
            { unittype: ["knight", 2] },
            { text: "to move (except" },
            {
              unit: [
                iconMapping[
                  (UNITLAYERS.units[Object.keys(UNITLAYERS.myfrozens)[0]] || {})
                    .group
                ],
                (UNITLAYERS.units[Object.keys(UNITLAYERS.myfrozens)[0]] || {})
                  .owner as 0 | 1 | 2,
                Object.keys(UNITLAYERS.myfrozens)[0]
              ]
            },
            { text: "who moved last turn)" }
          ]
        })
      : collapseContent({
          line: [
            { select: "Select" },
            { unittype: ["knight", 2] },
            { text: "to move" }
          ]
        });
  };
  game.newBattle = () => {
    let UNITDATA = deduceInitialUnitData({
      notfrozens: {
        "1": ["a4", "b4", "a3", "b3"],
        "2": ["c2", "c1", "d2", "d1"]
      }
    });
    let UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      mynotfrozens: {},
      oppnotfrozens: {},
      myfrozens: {},
      oppfrozens: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    return game.action.startTurn1({
      TURN: 0,
      UNITDATA,
      UNITLAYERS
    });
  };
  game.action.move2 = step => {
    let LINKS: AlgolStepLinks = { actions: {} };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let MARKS = step.MARKS;
    for (let LOOPPOS in UNITLAYERS.myfrozens) {
      {
        let unitid = (UNITLAYERS.units[LOOPPOS] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            group: "notfrozens"
          };
        }
      }
    }
    {
      let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
      if (unitid) {
        UNITDATA[unitid] = {
          ...UNITDATA[unitid],
          group: "frozens"
        };
      }
    }
    {
      let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
      if (unitid) {
        UNITDATA[unitid] = {
          ...UNITDATA[unitid],
          pos: MARKS.selectmove
        };
      }
    }
    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      mynotfrozens: {},
      oppnotfrozens: {},
      myfrozens: {},
      oppfrozens: {}
    };
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
          Object.keys(TERRAIN.oppcorners)
            .concat(Object.keys(UNITLAYERS.myunits))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
      ).length !== 0
    ) {
      let winner = 2;
      LINKS.endGame = winner === 2 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "cornerinfiltration";
      LINKS.endMarks = Object.keys(
        Object.entries(
          Object.keys(TERRAIN.oppcorners)
            .concat(Object.keys(UNITLAYERS.myunits))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
      );
    } else if (
      Object.keys(
        Object.entries(
          Object.keys(TERRAIN.oppbases)
            .concat(Object.keys(UNITLAYERS.myunits))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
      ).length === 2
    ) {
      let winner = 2;
      LINKS.endGame = winner === 2 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "occupation";
      LINKS.endMarks = Object.keys(
        Object.entries(
          Object.keys(TERRAIN.oppbases)
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
      ARTIFACTS: step.ARTIFACTS,
      TURN: step.TURN,
      UNITDATA,
      UNITLAYERS
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
    let UNITLAYERS = step.UNITLAYERS;
    {
      let STARTPOS = MARKS.selectunit;
      let startconnections = connections[STARTPOS];
      for (let DIR of TERRAIN.southeast[STARTPOS]
        ? [1, 3, 4, 5, 7]
        : TERRAIN.northwest[STARTPOS]
        ? [1, 3, 5, 7, 8]
        : orthoDirs) {
        let POS = startconnections[DIR];
        if (POS && !UNITLAYERS.units[POS]) {
          ARTIFACTS.movetargets[POS] = emptyObj;
        }
      }
    }
    for (const pos of Object.keys(ARTIFACTS.movetargets)) {
      LINKS.actions[pos] = "selectmove2";
    }
    return {
      LINKS,
      ARTIFACTS,
      UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS
    };
  };
  game.instruction.selectunit2 = step => {
    let MARKS = step.MARKS;
    let UNITLAYERS = step.UNITLAYERS;
    return collapseContent({
      line: [
        { select: "Select" },
        { text: "an empty square to move" },
        {
          unit: [
            iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
            (UNITLAYERS.units[MARKS.selectunit] || {}).owner as 0 | 1 | 2,
            MARKS.selectunit
          ]
        },
        { text: "to" }
      ]
    });
  };
  game.action.selectmove2 = (step, newMarkPos) => {
    let LINKS: AlgolStepLinks = { actions: {} };
    LINKS.actions.move = "move2";
    return {
      LINKS,
      ARTIFACTS: step.ARTIFACTS,
      UNITLAYERS: step.UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS: { selectunit: step.MARKS.selectunit, selectmove: newMarkPos }
    };
  };
  game.instruction.selectmove2 = step => {
    let MARKS = step.MARKS;
    let UNITLAYERS = step.UNITLAYERS;
    return collapseContent({
      line: [
        { text: "Press" },
        { command: "move" },
        { text: "to make" },
        {
          unit: [
            iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
            (UNITLAYERS.units[MARKS.selectunit] || {}).owner as 0 | 1 | 2,
            MARKS.selectunit
          ]
        },
        { text: "go" },
        TERRAIN.oppbases[MARKS.selectmove] &&
        !TERRAIN.oppbases[MARKS.selectunit]
          ? collapseContent({
              line: [
                { text: "into the opponent base at" },
                { pos: MARKS.selectmove }
              ]
            })
          : collapseContent({
              line: [{ text: "to" }, { pos: MARKS.selectmove }]
            })
      ]
    });
  };
}
export default game as AlgolGame;
