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
const BOARD = boardLayers({ height: 7, width: 8 });

const emptyArtifactLayers = {
  firetargets: {},
  movetargets: {},
  madecatapults: {},
  madetowers: {},
  madewalls: {},
  killtargets: {}
};

const connections = boardConnections({ height: 7, width: 8 });
const relativeDirs = makeRelativeDirs([]);
const roseDirs = [1, 2, 3, 4, 5, 6, 7, 8];
const orthoDirs = [1, 3, 5, 7];
const diagDirs = [2, 4, 6, 8];
let game: Partial<AlgolGame> = { action: {}, instruction: {} };
{
  const groupLayers = {
    towers: [
      ["units", "towers"],
      ["units", "myunits", "towers", "mytowers"],
      ["units", "oppunits", "towers", "opptowers"]
    ],
    walls: [
      ["units", "walls"],
      ["units", "myunits", "walls", "mywalls"],
      ["units", "oppunits", "walls", "oppwalls"]
    ],
    catapults: [
      ["units", "catapults"],
      ["units", "myunits", "catapults", "mycatapults"],
      ["units", "oppunits", "catapults", "oppcatapults"]
    ]
  };
  const TERRAIN = terrainLayers(
    7,
    8,
    {
      homerow: { "1": [{ rect: ["a1", "h1"] }], "2": [{ rect: ["a7", "h7"] }] }
    },
    1
  );
  game.action.startTurn1 = step => {
    const oldUnitLayers = step.UNITLAYERS;
    let UNITLAYERS = {
      units: oldUnitLayers.units,
      myunits: oldUnitLayers.oppunits,
      oppunits: oldUnitLayers.myunits,
      towers: oldUnitLayers.towers,
      mytowers: oldUnitLayers.opptowers,
      opptowers: oldUnitLayers.mytowers,
      walls: oldUnitLayers.walls,
      mywalls: oldUnitLayers.oppwalls,
      oppwalls: oldUnitLayers.mywalls,
      catapults: oldUnitLayers.catapults,
      mycatapults: oldUnitLayers.oppcatapults,
      oppcatapults: oldUnitLayers.mycatapults
    };
    let LINKS: AlgolStepLinks = {
      actions: {}
    };

    for (const pos of Object.keys(UNITLAYERS.mytowers)) {
      LINKS.actions[pos] = "selecttower1";
    }

    for (const pos of Object.keys(UNITLAYERS.mycatapults)) {
      LINKS.actions[pos] = "selectcatapult1";
    }

    return {
      UNITDATA: step.UNITDATA,
      LINKS,
      UNITLAYERS,
      ARTIFACTS: emptyArtifactLayers,
      MARKS: {},
      TURN: step.TURN + 1,
      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.startTurn1 = step => {
    let UNITLAYERS = step.UNITLAYERS;

    return collapseContent({
      line: [
        { text: "Select a" },
        collapseContent({
          line: [
            Object.keys(UNITLAYERS.mytowers).length !== 0
              ? { unittype: "rook" }
              : undefined,
            Object.keys(UNITLAYERS.mycatapults).length !== 0
              ? { unittype: "queen" }
              : undefined
          ]
            .filter(i => !!i)
            .reduce((mem, i, n, list) => {
              mem.push(i);
              if (n === list.length - 2) {
                mem.push({ text: " or " });
              } else if (n < list.length - 2) {
                mem.push({ text: ", " });
              }
              return mem;
            }, [])
        }),
        { text: "to act with" }
      ]
    });
  };
  game.action.move1 = step => {
    let LINKS: AlgolStepLinks = { actions: {} };
    let ARTIFACTS = {
      movetargets: step.ARTIFACTS.movetargets,
      killtargets: step.ARTIFACTS.killtargets,
      madecatapults: step.ARTIFACTS.madecatapults,
      madetowers: step.ARTIFACTS.madetowers,
      madewalls: step.ARTIFACTS.madewalls
    };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let NEXTSPAWNID = step.NEXTSPAWNID;
    let MARKS = step.MARKS;
    delete UNITDATA[(UNITLAYERS.units[MARKS.selecttower] || {}).id];
    for (let LOOPPOS in ARTIFACTS.madecatapults) {
      {
        let unitid = (UNITLAYERS.units[LOOPPOS] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            group: "catapults"
          };
        }
      }
    }
    for (let LOOPPOS in ARTIFACTS.madetowers) {
      {
        let unitid = (UNITLAYERS.units[LOOPPOS] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            group: "towers"
          };
        }
      }
    }
    for (let LOOPPOS in ARTIFACTS.madewalls) {
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: LOOPPOS,
          id: newunitid,
          group: "walls",
          owner: 1,
          from: MARKS.selecttower
        };
      }
    }
    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      towers: {},
      mytowers: {},
      opptowers: {},
      walls: {},
      mywalls: {},
      oppwalls: {},
      catapults: {},
      mycatapults: {},
      oppcatapults: {}
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
          Object.keys(UNITLAYERS.myunits)
            .concat(Object.keys(TERRAIN.opphomerow))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
      ).length !== 0
    ) {
      let winner = 1;
      LINKS.endGame = winner === 1 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "infiltration";
      LINKS.endMarks = Object.keys(
        Object.entries(
          Object.keys(UNITLAYERS.myunits)
            .concat(Object.keys(TERRAIN.opphomerow))
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

      NEXTSPAWNID
    };
  };
  game.instruction.move1 = () => defaultInstruction(1);
  game.action.kill1 = step => {
    let LINKS: AlgolStepLinks = { actions: {} };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let MARKS = step.MARKS;
    {
      let unitid = (UNITLAYERS.units[MARKS.selecttower] || {}).id;
      if (unitid) {
        UNITDATA[unitid] = {
          ...UNITDATA[unitid],
          group: "walls"
        };
      }
    }
    if (UNITLAYERS.oppcatapults[MARKS.selectkill]) {
      {
        let unitid = (UNITLAYERS.units[MARKS.selectkill] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            group: "towers"
          };
        }
      }
    } else {
      delete UNITDATA[(UNITLAYERS.units[MARKS.selectkill] || {}).id];
    }
    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      towers: {},
      mytowers: {},
      opptowers: {},
      walls: {},
      mywalls: {},
      oppwalls: {},
      catapults: {},
      mycatapults: {},
      oppcatapults: {}
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
          Object.keys(UNITLAYERS.myunits)
            .concat(Object.keys(TERRAIN.opphomerow))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
      ).length !== 0
    ) {
      let winner = 1;
      LINKS.endGame = winner === 1 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "infiltration";
      LINKS.endMarks = Object.keys(
        Object.entries(
          Object.keys(UNITLAYERS.myunits)
            .concat(Object.keys(TERRAIN.opphomerow))
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
      UNITLAYERS,

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.kill1 = () => defaultInstruction(1);
  game.action.sacrifice1 = step => {
    let LINKS: AlgolStepLinks = { actions: {} };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let MARKS = step.MARKS;
    {
      let unitid = (UNITLAYERS.units[MARKS.selectkill] || {}).id;
      if (unitid) {
        UNITDATA[unitid] = {
          ...UNITDATA[unitid],
          group: "walls"
        };
      }
    }
    delete UNITDATA[(UNITLAYERS.units[MARKS.selecttower] || {}).id];
    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      towers: {},
      mytowers: {},
      opptowers: {},
      walls: {},
      mywalls: {},
      oppwalls: {},
      catapults: {},
      mycatapults: {},
      oppcatapults: {}
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
          Object.keys(UNITLAYERS.myunits)
            .concat(Object.keys(TERRAIN.opphomerow))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
      ).length !== 0
    ) {
      let winner = 1;
      LINKS.endGame = winner === 1 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "infiltration";
      LINKS.endMarks = Object.keys(
        Object.entries(
          Object.keys(UNITLAYERS.myunits)
            .concat(Object.keys(TERRAIN.opphomerow))
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
      UNITLAYERS,

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.sacrifice1 = () => defaultInstruction(1);
  game.action.fire1 = step => {
    let LINKS: AlgolStepLinks = { actions: {} };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let NEXTSPAWNID = step.NEXTSPAWNID;
    let MARKS = step.MARKS;
    if (UNITLAYERS.oppwalls[MARKS.selectfire]) {
      delete UNITDATA[(UNITLAYERS.units[MARKS.selectfire] || {}).id];
    } else {
      if (UNITLAYERS.oppunits[MARKS.selectfire]) {
        {
          let unitid = (UNITLAYERS.units[MARKS.selectfire] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              group: UNITLAYERS.oppcatapults[MARKS.selectfire]
                ? "towers"
                : "walls"
            };
          }
        }
      } else {
        {
          let newunitid = "spawn" + NEXTSPAWNID++;
          UNITDATA[newunitid] = {
            pos: MARKS.selectfire,
            id: newunitid,
            group: "walls",
            owner: 1,
            from: MARKS.selectcatapult
          };
        }
      }
    }
    {
      let unitid = (UNITLAYERS.units[MARKS.selectcatapult] || {}).id;
      if (unitid) {
        UNITDATA[unitid] = {
          ...UNITDATA[unitid],
          group: "towers"
        };
      }
    }

    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      towers: {},
      mytowers: {},
      opptowers: {},
      walls: {},
      mywalls: {},
      oppwalls: {},
      catapults: {},
      mycatapults: {},
      oppcatapults: {}
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
          Object.keys(UNITLAYERS.myunits)
            .concat(Object.keys(TERRAIN.opphomerow))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
      ).length !== 0
    ) {
      let winner = 1;
      LINKS.endGame = winner === 1 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "infiltration";
      LINKS.endMarks = Object.keys(
        Object.entries(
          Object.keys(UNITLAYERS.myunits)
            .concat(Object.keys(TERRAIN.opphomerow))
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
      UNITLAYERS,

      NEXTSPAWNID
    };
  };
  game.instruction.fire1 = () => defaultInstruction(1);
  game.action.selecttower1 = (step, newMarkPos) => {
    let ARTIFACTS = {
      movetargets: {},
      killtargets: {}
    };
    let LINKS: AlgolStepLinks = { actions: {} };
    let MARKS = {
      selecttower: newMarkPos
    };
    let UNITLAYERS = step.UNITLAYERS;
    {
      let BLOCKS = { ...UNITLAYERS.oppunits, ...UNITLAYERS.mycatapults };

      for (let DIR of roseDirs) {
        let walkedsquares = [];
        let MAX = 2;
        let POS = MARKS.selecttower;
        let LENGTH = 0;
        while (LENGTH < MAX && (POS = connections[POS][DIR]) && !BLOCKS[POS]) {
          walkedsquares.push(POS);
          LENGTH++;
        }
        let WALKLENGTH = walkedsquares.length;
        let STEP = 0;
        for (let walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
          POS = walkedsquares[walkstepper];
          STEP++;
          if (WALKLENGTH === 2 && STEP === 2) {
            ARTIFACTS.movetargets[POS] = { dir: DIR };
          }
        }
      }
    }
    {
      let startconnections = connections[MARKS.selecttower];
      for (let DIR of roseDirs) {
        let POS = startconnections[DIR];
        if (
          POS &&
          { ...UNITLAYERS.oppcatapults, ...UNITLAYERS.oppwalls }[POS]
        ) {
          ARTIFACTS.killtargets[POS] = emptyObj;
        }
      }
    }
    for (const pos of Object.keys(ARTIFACTS.movetargets)) {
      LINKS.actions[pos] = "selectmove1";
    }

    for (const pos of Object.keys(ARTIFACTS.killtargets)) {
      LINKS.actions[pos] = "selectkill1";
    }

    return {
      LINKS,
      ARTIFACTS,
      UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS,

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.selecttower1 = step => {
    let ARTIFACTS = step.ARTIFACTS;
    let MARKS = step.MARKS;

    return collapseContent({
      line: [
        { text: "Select" },
        collapseContent({
          line: [
            Object.keys(ARTIFACTS.movetargets).length !== 0
              ? { text: "a move target" }
              : undefined,
            Object.keys(ARTIFACTS.killtargets).length !== 0
              ? collapseContent({
                  line: [
                    { text: "an enemy" },
                    { unittype: "pawn" },
                    { text: "to kill" }
                  ]
                })
              : undefined
          ]
            .filter(i => !!i)
            .reduce((mem, i, n, list) => {
              mem.push(i);
              if (n === list.length - 2) {
                mem.push({ text: " or " });
              } else if (n < list.length - 2) {
                mem.push({ text: ", " });
              }
              return mem;
            }, [])
        }),
        { text: "for the" },
        { pos: MARKS.selecttower },
        { unittype: "rook" }
      ]
    });
  };
  game.action.selectmove1 = (step, newMarkPos) => {
    let ARTIFACTS = {
      movetargets: step.ARTIFACTS.movetargets,
      killtargets: step.ARTIFACTS.killtargets,
      madecatapults: {},
      madetowers: {},
      madewalls: {}
    };
    let LINKS: AlgolStepLinks = { actions: {} };
    let MARKS = {
      selecttower: step.MARKS.selecttower,
      selectmove: newMarkPos
    };
    let UNITLAYERS = step.UNITLAYERS;
    {
      let STARTPOS = MARKS.selectmove;

      let POS =
        connections[STARTPOS][
          relativeDirs[5][(ARTIFACTS.movetargets[MARKS.selectmove] || {}).dir]
        ];
      if (POS) {
        ARTIFACTS[
          UNITLAYERS.myunits[POS]
            ? UNITLAYERS.mytowers[POS]
              ? "madecatapults"
              : "madetowers"
            : "madewalls"
        ][POS] = emptyObj;
      }

      ARTIFACTS[
        UNITLAYERS.myunits[MARKS.selectmove]
          ? UNITLAYERS.mytowers[MARKS.selectmove]
            ? "madecatapults"
            : "madetowers"
          : "madewalls"
      ][STARTPOS] = emptyObj;
    }
    LINKS.actions.move = "move1";

    return {
      LINKS,
      ARTIFACTS,
      UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS,

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.selectmove1 = step => {
    let MARKS = step.MARKS;

    return collapseContent({
      line: [
        { text: "Press" },
        { command: "move" },
        { text: "to overturn your" },
        { pos: MARKS.selecttower },
        { unittype: "rook" },
        { text: "towards" },
        { pos: MARKS.selectmove }
      ]
    });
  };
  game.action.selectkill1 = (step, newMarkPos) => {
    let LINKS: AlgolStepLinks = { actions: {} };
    let MARKS = {
      selecttower: step.MARKS.selecttower,
      selectkill: newMarkPos
    };
    let UNITLAYERS = step.UNITLAYERS;

    LINKS.actions.kill = "kill1";
    if (UNITLAYERS.oppcatapults[MARKS.selectkill]) {
      LINKS.actions.sacrifice = "sacrifice1";
    }

    return {
      LINKS,
      ARTIFACTS: step.ARTIFACTS,
      UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS,

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.selectkill1 = step => {
    let MARKS = step.MARKS;

    let UNITLAYERS = step.UNITLAYERS;

    return collapseContent({
      line: [
        { text: "Press" },
        { command: "kill" },
        { text: "to make a section of the" },
        { pos: MARKS.selecttower },
        { unittype: "rook" },
        UNITLAYERS.walls[MARKS.selectkill]
          ? collapseContent({
              line: [
                { text: "crush the enemy" },
                { unittype: "pawn" },
                { text: "at" },
                { pos: MARKS.selectkill }
              ]
            })
          : collapseContent({
              line: [
                { text: "reduce the enemy" },
                { unittype: "queen" },
                { text: "at" },
                { pos: MARKS.selectkill },
                { text: "to a" },
                { unittype: "rook" },
                { text: ", or" },
                { command: "sacrifice" },
                { text: "your" },
                { unittype: "rook" },
                { text: "entirely to turn the" },
                { unittype: "queen" },
                { text: "to a" },
                { unittype: "pawn" },
                { text: "!" }
              ]
            })
      ]
    });
  };
  game.action.selectcatapult1 = (step, newMarkPos) => {
    let ARTIFACTS = {
      firetargets: {}
    };
    let LINKS: AlgolStepLinks = { actions: {} };
    let MARKS = {
      selectcatapult: newMarkPos
    };
    let UNITLAYERS = step.UNITLAYERS;
    {
      for (let DIR of [7, 8, 1, 2, 3]) {
        let MAX = 3;
        let POS = MARKS.selectcatapult;
        let LENGTH = 0;
        let STEP = 0;
        while (LENGTH < MAX && (POS = connections[POS][DIR])) {
          LENGTH++;
          STEP++;
          if (STEP > 1 && !UNITLAYERS.myunits[POS]) {
            ARTIFACTS.firetargets[POS] = emptyObj;
          }
        }
      }
    }
    for (const pos of Object.keys(ARTIFACTS.firetargets)) {
      LINKS.actions[pos] = "selectfire1";
    }

    return {
      LINKS,
      ARTIFACTS,
      UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS,

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.selectcatapult1 = step => {
    let MARKS = step.MARKS;

    return collapseContent({
      line: [
        { text: "Select where to fire the top section of your" },
        { pos: MARKS.selectcatapult },
        { unittype: "queen" }
      ]
    });
  };
  game.action.selectfire1 = (step, newMarkPos) => {
    let LINKS: AlgolStepLinks = { actions: {} };

    LINKS.actions.fire = "fire1";

    return {
      LINKS,
      ARTIFACTS: step.ARTIFACTS,
      UNITLAYERS: step.UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS: {
        selectcatapult: step.MARKS.selectcatapult,
        selectfire: newMarkPos
      },

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.selectfire1 = step => {
    let MARKS = step.MARKS;

    let UNITLAYERS = step.UNITLAYERS;

    return collapseContent({
      line: [
        { text: "Press" },
        { command: "fire" },
        { text: "to shoot a section of the" },
        { pos: MARKS.selectcatapult },
        { unittype: "queen" },
        UNITLAYERS.walls[MARKS.selectfire]
          ? collapseContent({
              line: [
                { text: "and destroy the enemy" },
                { unittype: "pawn" },
                { text: "at" },
                { pos: MARKS.selectfire }
              ]
            })
          : UNITLAYERS.units[MARKS.selectfire]
          ? collapseContent({
              line: [
                { text: ", reducing the enemy" },
                {
                  unit: [
                    { towers: "rook", walls: "pawn", catapults: "queen" }[
                      (UNITLAYERS.units[MARKS.selectfire] || {}).group
                    ],
                    (UNITLAYERS.units[MARKS.selectfire] || {}).owner as
                      | 0
                      | 1
                      | 2,
                    MARKS.selectfire
                  ]
                },
                { text: "at" },
                { pos: MARKS.selectfire },
                { text: "to a" },
                UNITLAYERS.catapults[MARKS.selectfire]
                  ? { unittype: "rook" }
                  : { unittype: "pawn" }
              ]
            })
          : collapseContent({
              line: [
                { text: "at" },
                { pos: MARKS.selectfire },
                { text: ", gaining a" },
                { unittype: "pawn" },
                { text: "there" }
              ]
            })
      ]
    });
  };
}
{
  const groupLayers = {
    towers: [
      ["units", "towers"],
      ["units", "oppunits", "towers", "opptowers"],
      ["units", "myunits", "towers", "mytowers"]
    ],
    walls: [
      ["units", "walls"],
      ["units", "oppunits", "walls", "oppwalls"],
      ["units", "myunits", "walls", "mywalls"]
    ],
    catapults: [
      ["units", "catapults"],
      ["units", "oppunits", "catapults", "oppcatapults"],
      ["units", "myunits", "catapults", "mycatapults"]
    ]
  };
  const TERRAIN = terrainLayers(
    7,
    8,
    {
      homerow: { "1": [{ rect: ["a1", "h1"] }], "2": [{ rect: ["a7", "h7"] }] }
    },
    2
  );
  game.action.startTurn2 = step => {
    const oldUnitLayers = step.UNITLAYERS;
    let UNITLAYERS = {
      units: oldUnitLayers.units,
      myunits: oldUnitLayers.oppunits,
      oppunits: oldUnitLayers.myunits,
      towers: oldUnitLayers.towers,
      mytowers: oldUnitLayers.opptowers,
      opptowers: oldUnitLayers.mytowers,
      walls: oldUnitLayers.walls,
      mywalls: oldUnitLayers.oppwalls,
      oppwalls: oldUnitLayers.mywalls,
      catapults: oldUnitLayers.catapults,
      mycatapults: oldUnitLayers.oppcatapults,
      oppcatapults: oldUnitLayers.mycatapults
    };
    let LINKS: AlgolStepLinks = {
      actions: {}
    };

    for (const pos of Object.keys(UNITLAYERS.mytowers)) {
      LINKS.actions[pos] = "selecttower2";
    }

    for (const pos of Object.keys(UNITLAYERS.mycatapults)) {
      LINKS.actions[pos] = "selectcatapult2";
    }

    return {
      UNITDATA: step.UNITDATA,
      LINKS,
      UNITLAYERS,
      ARTIFACTS: emptyArtifactLayers,
      MARKS: {},
      TURN: step.TURN + 1,
      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.startTurn2 = step => {
    let UNITLAYERS = step.UNITLAYERS;

    return collapseContent({
      line: [
        { text: "Select a" },
        collapseContent({
          line: [
            Object.keys(UNITLAYERS.mytowers).length !== 0
              ? { unittype: "rook" }
              : undefined,
            Object.keys(UNITLAYERS.mycatapults).length !== 0
              ? { unittype: "queen" }
              : undefined
          ]
            .filter(i => !!i)
            .reduce((mem, i, n, list) => {
              mem.push(i);
              if (n === list.length - 2) {
                mem.push({ text: " or " });
              } else if (n < list.length - 2) {
                mem.push({ text: ", " });
              }
              return mem;
            }, [])
        }),
        { text: "to act with" }
      ]
    });
  };
  game.newBattle = () => {
    let UNITDATA = {
      unit1: { pos: "a1", x: 1, y: 1, id: "unit1", group: "towers", owner: 1 },
      unit2: { pos: "b1", x: 2, y: 1, id: "unit2", group: "towers", owner: 1 },
      unit3: { pos: "c1", x: 3, y: 1, id: "unit3", group: "towers", owner: 1 },
      unit4: { pos: "d1", x: 4, y: 1, id: "unit4", group: "towers", owner: 1 },
      unit5: { pos: "e1", x: 5, y: 1, id: "unit5", group: "towers", owner: 1 },
      unit6: { pos: "f1", x: 6, y: 1, id: "unit6", group: "towers", owner: 1 },
      unit7: { pos: "g1", x: 7, y: 1, id: "unit7", group: "towers", owner: 1 },
      unit8: { pos: "h1", x: 8, y: 1, id: "unit8", group: "towers", owner: 1 },
      unit9: { pos: "a7", x: 1, y: 7, id: "unit9", group: "towers", owner: 2 },
      unit10: {
        pos: "b7",
        x: 2,
        y: 7,
        id: "unit10",
        group: "towers",
        owner: 2
      },
      unit11: {
        pos: "c7",
        x: 3,
        y: 7,
        id: "unit11",
        group: "towers",
        owner: 2
      },
      unit12: {
        pos: "d7",
        x: 4,
        y: 7,
        id: "unit12",
        group: "towers",
        owner: 2
      },
      unit13: {
        pos: "e7",
        x: 5,
        y: 7,
        id: "unit13",
        group: "towers",
        owner: 2
      },
      unit14: {
        pos: "f7",
        x: 6,
        y: 7,
        id: "unit14",
        group: "towers",
        owner: 2
      },
      unit15: {
        pos: "g7",
        x: 7,
        y: 7,
        id: "unit15",
        group: "towers",
        owner: 2
      },
      unit16: { pos: "h7", x: 8, y: 7, id: "unit16", group: "towers", owner: 2 }
    };

    let UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      towers: {},
      mytowers: {},
      opptowers: {},
      walls: {},
      mywalls: {},
      oppwalls: {},
      catapults: {},
      mycatapults: {},
      oppcatapults: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    return game.action.startTurn1({
      NEXTSPAWNID: 1,
      TURN: 0,
      UNITDATA,
      UNITLAYERS
    });
  };
  game.action.move2 = step => {
    let LINKS: AlgolStepLinks = { actions: {} };
    let ARTIFACTS = {
      movetargets: step.ARTIFACTS.movetargets,
      killtargets: step.ARTIFACTS.killtargets,
      madecatapults: step.ARTIFACTS.madecatapults,
      madetowers: step.ARTIFACTS.madetowers,
      madewalls: step.ARTIFACTS.madewalls
    };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let NEXTSPAWNID = step.NEXTSPAWNID;
    let MARKS = step.MARKS;
    delete UNITDATA[(UNITLAYERS.units[MARKS.selecttower] || {}).id];
    for (let LOOPPOS in ARTIFACTS.madecatapults) {
      {
        let unitid = (UNITLAYERS.units[LOOPPOS] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            group: "catapults"
          };
        }
      }
    }
    for (let LOOPPOS in ARTIFACTS.madetowers) {
      {
        let unitid = (UNITLAYERS.units[LOOPPOS] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            group: "towers"
          };
        }
      }
    }
    for (let LOOPPOS in ARTIFACTS.madewalls) {
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: LOOPPOS,
          id: newunitid,
          group: "walls",
          owner: 2,
          from: MARKS.selecttower
        };
      }
    }
    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      towers: {},
      mytowers: {},
      opptowers: {},
      walls: {},
      mywalls: {},
      oppwalls: {},
      catapults: {},
      mycatapults: {},
      oppcatapults: {}
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
          Object.keys(UNITLAYERS.myunits)
            .concat(Object.keys(TERRAIN.opphomerow))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
      ).length !== 0
    ) {
      let winner = 2;
      LINKS.endGame = winner === 2 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "infiltration";
      LINKS.endMarks = Object.keys(
        Object.entries(
          Object.keys(UNITLAYERS.myunits)
            .concat(Object.keys(TERRAIN.opphomerow))
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

      NEXTSPAWNID
    };
  };
  game.instruction.move2 = () => defaultInstruction(2);
  game.action.kill2 = step => {
    let LINKS: AlgolStepLinks = { actions: {} };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let MARKS = step.MARKS;
    {
      let unitid = (UNITLAYERS.units[MARKS.selecttower] || {}).id;
      if (unitid) {
        UNITDATA[unitid] = {
          ...UNITDATA[unitid],
          group: "walls"
        };
      }
    }
    if (UNITLAYERS.oppcatapults[MARKS.selectkill]) {
      {
        let unitid = (UNITLAYERS.units[MARKS.selectkill] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            group: "towers"
          };
        }
      }
    } else {
      delete UNITDATA[(UNITLAYERS.units[MARKS.selectkill] || {}).id];
    }
    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      towers: {},
      mytowers: {},
      opptowers: {},
      walls: {},
      mywalls: {},
      oppwalls: {},
      catapults: {},
      mycatapults: {},
      oppcatapults: {}
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
          Object.keys(UNITLAYERS.myunits)
            .concat(Object.keys(TERRAIN.opphomerow))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
      ).length !== 0
    ) {
      let winner = 2;
      LINKS.endGame = winner === 2 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "infiltration";
      LINKS.endMarks = Object.keys(
        Object.entries(
          Object.keys(UNITLAYERS.myunits)
            .concat(Object.keys(TERRAIN.opphomerow))
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
      UNITLAYERS,

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.kill2 = () => defaultInstruction(2);
  game.action.sacrifice2 = step => {
    let LINKS: AlgolStepLinks = { actions: {} };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let MARKS = step.MARKS;
    {
      let unitid = (UNITLAYERS.units[MARKS.selectkill] || {}).id;
      if (unitid) {
        UNITDATA[unitid] = {
          ...UNITDATA[unitid],
          group: "walls"
        };
      }
    }
    delete UNITDATA[(UNITLAYERS.units[MARKS.selecttower] || {}).id];
    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      towers: {},
      mytowers: {},
      opptowers: {},
      walls: {},
      mywalls: {},
      oppwalls: {},
      catapults: {},
      mycatapults: {},
      oppcatapults: {}
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
          Object.keys(UNITLAYERS.myunits)
            .concat(Object.keys(TERRAIN.opphomerow))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
      ).length !== 0
    ) {
      let winner = 2;
      LINKS.endGame = winner === 2 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "infiltration";
      LINKS.endMarks = Object.keys(
        Object.entries(
          Object.keys(UNITLAYERS.myunits)
            .concat(Object.keys(TERRAIN.opphomerow))
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
      UNITLAYERS,

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.sacrifice2 = () => defaultInstruction(2);
  game.action.fire2 = step => {
    let LINKS: AlgolStepLinks = { actions: {} };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let NEXTSPAWNID = step.NEXTSPAWNID;
    let MARKS = step.MARKS;
    if (UNITLAYERS.oppwalls[MARKS.selectfire]) {
      delete UNITDATA[(UNITLAYERS.units[MARKS.selectfire] || {}).id];
    } else {
      if (UNITLAYERS.oppunits[MARKS.selectfire]) {
        {
          let unitid = (UNITLAYERS.units[MARKS.selectfire] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              group: UNITLAYERS.oppcatapults[MARKS.selectfire]
                ? "towers"
                : "walls"
            };
          }
        }
      } else {
        {
          let newunitid = "spawn" + NEXTSPAWNID++;
          UNITDATA[newunitid] = {
            pos: MARKS.selectfire,
            id: newunitid,
            group: "walls",
            owner: 2,
            from: MARKS.selectcatapult
          };
        }
      }
    }
    {
      let unitid = (UNITLAYERS.units[MARKS.selectcatapult] || {}).id;
      if (unitid) {
        UNITDATA[unitid] = {
          ...UNITDATA[unitid],
          group: "towers"
        };
      }
    }

    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      towers: {},
      mytowers: {},
      opptowers: {},
      walls: {},
      mywalls: {},
      oppwalls: {},
      catapults: {},
      mycatapults: {},
      oppcatapults: {}
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
          Object.keys(UNITLAYERS.myunits)
            .concat(Object.keys(TERRAIN.opphomerow))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
      ).length !== 0
    ) {
      let winner = 2;
      LINKS.endGame = winner === 2 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "infiltration";
      LINKS.endMarks = Object.keys(
        Object.entries(
          Object.keys(UNITLAYERS.myunits)
            .concat(Object.keys(TERRAIN.opphomerow))
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
      UNITLAYERS,

      NEXTSPAWNID
    };
  };
  game.instruction.fire2 = () => defaultInstruction(2);
  game.action.selecttower2 = (step, newMarkPos) => {
    let ARTIFACTS = {
      movetargets: {},
      killtargets: {}
    };
    let LINKS: AlgolStepLinks = { actions: {} };
    let MARKS = {
      selecttower: newMarkPos
    };
    let UNITLAYERS = step.UNITLAYERS;
    {
      let BLOCKS = { ...UNITLAYERS.oppunits, ...UNITLAYERS.mycatapults };

      for (let DIR of roseDirs) {
        let walkedsquares = [];
        let MAX = 2;
        let POS = MARKS.selecttower;
        let LENGTH = 0;
        while (LENGTH < MAX && (POS = connections[POS][DIR]) && !BLOCKS[POS]) {
          walkedsquares.push(POS);
          LENGTH++;
        }
        let WALKLENGTH = walkedsquares.length;
        let STEP = 0;
        for (let walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
          POS = walkedsquares[walkstepper];
          STEP++;
          if (WALKLENGTH === 2 && STEP === 2) {
            ARTIFACTS.movetargets[POS] = { dir: DIR };
          }
        }
      }
    }
    {
      let startconnections = connections[MARKS.selecttower];
      for (let DIR of roseDirs) {
        let POS = startconnections[DIR];
        if (
          POS &&
          { ...UNITLAYERS.oppcatapults, ...UNITLAYERS.oppwalls }[POS]
        ) {
          ARTIFACTS.killtargets[POS] = emptyObj;
        }
      }
    }
    for (const pos of Object.keys(ARTIFACTS.movetargets)) {
      LINKS.actions[pos] = "selectmove2";
    }

    for (const pos of Object.keys(ARTIFACTS.killtargets)) {
      LINKS.actions[pos] = "selectkill2";
    }

    return {
      LINKS,
      ARTIFACTS,
      UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS,

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.selecttower2 = step => {
    let ARTIFACTS = step.ARTIFACTS;
    let MARKS = step.MARKS;

    return collapseContent({
      line: [
        { text: "Select" },
        collapseContent({
          line: [
            Object.keys(ARTIFACTS.movetargets).length !== 0
              ? { text: "a move target" }
              : undefined,
            Object.keys(ARTIFACTS.killtargets).length !== 0
              ? collapseContent({
                  line: [
                    { text: "an enemy" },
                    { unittype: "pawn" },
                    { text: "to kill" }
                  ]
                })
              : undefined
          ]
            .filter(i => !!i)
            .reduce((mem, i, n, list) => {
              mem.push(i);
              if (n === list.length - 2) {
                mem.push({ text: " or " });
              } else if (n < list.length - 2) {
                mem.push({ text: ", " });
              }
              return mem;
            }, [])
        }),
        { text: "for the" },
        { pos: MARKS.selecttower },
        { unittype: "rook" }
      ]
    });
  };
  game.action.selectmove2 = (step, newMarkPos) => {
    let ARTIFACTS = {
      movetargets: step.ARTIFACTS.movetargets,
      killtargets: step.ARTIFACTS.killtargets,
      madecatapults: {},
      madetowers: {},
      madewalls: {}
    };
    let LINKS: AlgolStepLinks = { actions: {} };
    let MARKS = {
      selecttower: step.MARKS.selecttower,
      selectmove: newMarkPos
    };
    let UNITLAYERS = step.UNITLAYERS;
    {
      let STARTPOS = MARKS.selectmove;

      let POS =
        connections[STARTPOS][
          relativeDirs[5][(ARTIFACTS.movetargets[MARKS.selectmove] || {}).dir]
        ];
      if (POS) {
        ARTIFACTS[
          UNITLAYERS.myunits[POS]
            ? UNITLAYERS.mytowers[POS]
              ? "madecatapults"
              : "madetowers"
            : "madewalls"
        ][POS] = emptyObj;
      }

      ARTIFACTS[
        UNITLAYERS.myunits[MARKS.selectmove]
          ? UNITLAYERS.mytowers[MARKS.selectmove]
            ? "madecatapults"
            : "madetowers"
          : "madewalls"
      ][STARTPOS] = emptyObj;
    }
    LINKS.actions.move = "move2";

    return {
      LINKS,
      ARTIFACTS,
      UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS,

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.selectmove2 = step => {
    let MARKS = step.MARKS;

    return collapseContent({
      line: [
        { text: "Press" },
        { command: "move" },
        { text: "to overturn your" },
        { pos: MARKS.selecttower },
        { unittype: "rook" },
        { text: "towards" },
        { pos: MARKS.selectmove }
      ]
    });
  };
  game.action.selectkill2 = (step, newMarkPos) => {
    let LINKS: AlgolStepLinks = { actions: {} };
    let MARKS = {
      selecttower: step.MARKS.selecttower,
      selectkill: newMarkPos
    };
    let UNITLAYERS = step.UNITLAYERS;

    LINKS.actions.kill = "kill2";
    if (UNITLAYERS.oppcatapults[MARKS.selectkill]) {
      LINKS.actions.sacrifice = "sacrifice2";
    }

    return {
      LINKS,
      ARTIFACTS: step.ARTIFACTS,
      UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS,

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.selectkill2 = step => {
    let MARKS = step.MARKS;

    let UNITLAYERS = step.UNITLAYERS;

    return collapseContent({
      line: [
        { text: "Press" },
        { command: "kill" },
        { text: "to make a section of the" },
        { pos: MARKS.selecttower },
        { unittype: "rook" },
        UNITLAYERS.walls[MARKS.selectkill]
          ? collapseContent({
              line: [
                { text: "crush the enemy" },
                { unittype: "pawn" },
                { text: "at" },
                { pos: MARKS.selectkill }
              ]
            })
          : collapseContent({
              line: [
                { text: "reduce the enemy" },
                { unittype: "queen" },
                { text: "at" },
                { pos: MARKS.selectkill },
                { text: "to a" },
                { unittype: "rook" },
                { text: ", or" },
                { command: "sacrifice" },
                { text: "your" },
                { unittype: "rook" },
                { text: "entirely to turn the" },
                { unittype: "queen" },
                { text: "to a" },
                { unittype: "pawn" },
                { text: "!" }
              ]
            })
      ]
    });
  };
  game.action.selectcatapult2 = (step, newMarkPos) => {
    let ARTIFACTS = {
      firetargets: {}
    };
    let LINKS: AlgolStepLinks = { actions: {} };
    let MARKS = {
      selectcatapult: newMarkPos
    };
    let UNITLAYERS = step.UNITLAYERS;
    {
      for (let DIR of [3, 4, 5, 6, 7]) {
        let MAX = 3;
        let POS = MARKS.selectcatapult;
        let LENGTH = 0;
        let STEP = 0;
        while (LENGTH < MAX && (POS = connections[POS][DIR])) {
          LENGTH++;
          STEP++;
          if (STEP > 1 && !UNITLAYERS.myunits[POS]) {
            ARTIFACTS.firetargets[POS] = emptyObj;
          }
        }
      }
    }
    for (const pos of Object.keys(ARTIFACTS.firetargets)) {
      LINKS.actions[pos] = "selectfire2";
    }

    return {
      LINKS,
      ARTIFACTS,
      UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS,

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.selectcatapult2 = step => {
    let MARKS = step.MARKS;

    return collapseContent({
      line: [
        { text: "Select where to fire the top section of your" },
        { pos: MARKS.selectcatapult },
        { unittype: "queen" }
      ]
    });
  };
  game.action.selectfire2 = (step, newMarkPos) => {
    let LINKS: AlgolStepLinks = { actions: {} };

    LINKS.actions.fire = "fire2";

    return {
      LINKS,
      ARTIFACTS: step.ARTIFACTS,
      UNITLAYERS: step.UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS: {
        selectcatapult: step.MARKS.selectcatapult,
        selectfire: newMarkPos
      },

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.selectfire2 = step => {
    let MARKS = step.MARKS;

    let UNITLAYERS = step.UNITLAYERS;

    return collapseContent({
      line: [
        { text: "Press" },
        { command: "fire" },
        { text: "to shoot a section of the" },
        { pos: MARKS.selectcatapult },
        { unittype: "queen" },
        UNITLAYERS.walls[MARKS.selectfire]
          ? collapseContent({
              line: [
                { text: "and destroy the enemy" },
                { unittype: "pawn" },
                { text: "at" },
                { pos: MARKS.selectfire }
              ]
            })
          : UNITLAYERS.units[MARKS.selectfire]
          ? collapseContent({
              line: [
                { text: ", reducing the enemy" },
                {
                  unit: [
                    { towers: "rook", walls: "pawn", catapults: "queen" }[
                      (UNITLAYERS.units[MARKS.selectfire] || {}).group
                    ],
                    (UNITLAYERS.units[MARKS.selectfire] || {}).owner as
                      | 0
                      | 1
                      | 2,
                    MARKS.selectfire
                  ]
                },
                { text: "at" },
                { pos: MARKS.selectfire },
                { text: "to a" },
                UNITLAYERS.catapults[MARKS.selectfire]
                  ? { unittype: "rook" }
                  : { unittype: "pawn" }
              ]
            })
          : collapseContent({
              line: [
                { text: "at" },
                { pos: MARKS.selectfire },
                { text: ", gaining a" },
                { unittype: "pawn" },
                { text: "there" }
              ]
            })
      ]
    });
  };
}
export default game as AlgolGame;
