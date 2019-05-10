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
const iconMapping = { towers: "rook", walls: "pawn", catapults: "queen" };
const emptyArtifactLayers = {
  firetargets: {},
  movetargets: {},
  madecatapults: {},
  madetowers: {},
  madewalls: {},
  crushtargets: {}
};
const connections = boardConnections({ height: 7, width: 8 });
const relativeDirs = makeRelativeDirs([]);
const roseDirs = [1, 2, 3, 4, 5, 6, 7, 8];
const orthoDirs = [1, 3, 5, 7];
const diagDirs = [2, 4, 6, 8];
let game: Partial<AlgolGame> = {
  gameId: "murusgallicusadvanced",
  action: {},
  instruction: {}
};
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
    return collapseContent({
      line: [
        { select: "Select" },
        { unittype: ["rook", 1] },
        { text: "or" },
        { unittype: ["queen", 1] },
        { text: "to act with" }
      ]
    });
  };
  game.action.move1 = step => {
    let LINKS: AlgolStepLinks = { actions: {} };
    let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
    let ARTIFACTS = {
      movetargets: step.ARTIFACTS.movetargets,
      crushtargets: step.ARTIFACTS.crushtargets,
      madecatapults: step.ARTIFACTS.madecatapults,
      madetowers: step.ARTIFACTS.madetowers,
      madewalls: step.ARTIFACTS.madewalls
    };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let NEXTSPAWNID = step.NEXTSPAWNID;
    let MARKS = step.MARKS;
    for (let LOOPPOS in ARTIFACTS.madewalls) {
      anim.enterFrom[LOOPPOS] = MARKS.selecttower;
    }
    for (let LOOPPOS in ARTIFACTS.madetowers) {
      anim.ghosts.push([MARKS.selecttower, LOOPPOS, "pawn", 1]);
    }
    for (let LOOPPOS in ARTIFACTS.madecatapults) {
      anim.ghosts.push([MARKS.selecttower, LOOPPOS, "pawn", 1]);
    }
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
          owner: 1
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
      NEXTSPAWNID,
      anim
    };
  };
  game.instruction.move1 = () => defaultInstruction(1);
  game.action.crush1 = step => {
    let LINKS: AlgolStepLinks = { actions: {} };
    let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let MARKS = step.MARKS;
    anim.ghosts.push([MARKS.selecttower, MARKS.selectcrush, "pawn", 1]);
    {
      let unitid = (UNITLAYERS.units[MARKS.selecttower] || {}).id;
      if (unitid) {
        UNITDATA[unitid] = {
          ...UNITDATA[unitid],
          group: "walls"
        };
      }
    }
    if (UNITLAYERS.oppcatapults[MARKS.selectcrush]) {
      {
        let unitid = (UNITLAYERS.units[MARKS.selectcrush] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            group: "towers"
          };
        }
      }
    } else {
      delete UNITDATA[(UNITLAYERS.units[MARKS.selectcrush] || {}).id];
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
      NEXTSPAWNID: step.NEXTSPAWNID,
      anim
    };
  };
  game.instruction.crush1 = () => defaultInstruction(1);
  game.action.sacrifice1 = step => {
    let LINKS: AlgolStepLinks = { actions: {} };
    let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let MARKS = step.MARKS;
    anim.exitTo[MARKS.selecttower] = MARKS.selectcrush;
    {
      let unitid = (UNITLAYERS.units[MARKS.selectcrush] || {}).id;
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
      NEXTSPAWNID: step.NEXTSPAWNID,
      anim
    };
  };
  game.instruction.sacrifice1 = () => defaultInstruction(1);
  game.action.fire1 = step => {
    let LINKS: AlgolStepLinks = { actions: {} };
    let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let NEXTSPAWNID = step.NEXTSPAWNID;
    let MARKS = step.MARKS;
    if (!UNITLAYERS.oppunits[MARKS.selectfire]) {
      anim.enterFrom[MARKS.selectfire] = MARKS.selectcatapult;
    } else {
      anim.ghosts.push([MARKS.selectcatapult, MARKS.selectfire, "pawn", 1]);
    }
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
            owner: 1
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
      NEXTSPAWNID,
      anim
    };
  };
  game.instruction.fire1 = () => defaultInstruction(1);
  game.action.selecttower1 = (step, newMarkPos) => {
    let ARTIFACTS = {
      movetargets: {},
      crushtargets: {}
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
          ARTIFACTS.crushtargets[POS] = emptyObj;
        }
      }
    }
    for (const pos of Object.keys(ARTIFACTS.movetargets)) {
      LINKS.actions[pos] = "selectmove1";
    }
    for (const pos of Object.keys(ARTIFACTS.crushtargets)) {
      LINKS.actions[pos] = "selectcrush1";
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
    let UNITLAYERS = step.UNITLAYERS;
    return collapseContent({
      line: [
        { select: "Select" },
        collapseContent({
          line: [
            Object.keys(ARTIFACTS.movetargets).length !== 0
              ? { text: "a move target" }
              : undefined,
            Object.keys(ARTIFACTS.crushtargets).length !== 0
              ? collapseContent({
                  line: [
                    { text: "a" },
                    { unittype: ["pawn", 2] },
                    { text: "or" },
                    { unittype: ["queen", 2] },
                    { text: "to crush" }
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
        { text: "for" },
        {
          unit: [
            iconMapping[(UNITLAYERS.units[MARKS.selecttower] || {}).group],
            (UNITLAYERS.units[MARKS.selecttower] || {}).owner as 0 | 1 | 2,
            MARKS.selecttower
          ]
        }
      ]
    });
  };
  game.action.selectmove1 = (step, newMarkPos) => {
    let ARTIFACTS = {
      movetargets: step.ARTIFACTS.movetargets,
      crushtargets: step.ARTIFACTS.crushtargets,
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
    let ARTIFACTS = step.ARTIFACTS;
    let MARKS = step.MARKS;
    let UNITLAYERS = step.UNITLAYERS;
    return collapseContent({
      line: [
        { text: "Press" },
        { command: "move" },
        { text: "to overturn" },
        {
          unit: [
            iconMapping[(UNITLAYERS.units[MARKS.selecttower] || {}).group],
            (UNITLAYERS.units[MARKS.selecttower] || {}).owner as 0 | 1 | 2,
            MARKS.selecttower
          ]
        },
        { text: "," },
        collapseContent({
          line: [
            Object.keys(ARTIFACTS.madewalls).length !== 0
              ? collapseContent({
                  line: [
                    { text: "creating" },
                    collapseContent({
                      line: Object.keys(ARTIFACTS.madewalls)
                        .map(p => ({ unit: [iconMapping["walls"], 1, p] }))
                        .reduce((mem, i, n, list) => {
                          mem.push(i);
                          if (n === list.length - 2) {
                            mem.push({ text: " and " });
                          } else if (n < list.length - 2) {
                            mem.push({ text: ", " });
                          }
                          return mem;
                        }, [])
                    })
                  ]
                })
              : undefined,
            Object.keys(ARTIFACTS.madetowers).length !== 0
              ? collapseContent({
                  line: [
                    { text: "turning" },
                    collapseContent({
                      line: Object.keys(ARTIFACTS.madetowers)
                        .filter(p => UNITLAYERS.units[p])
                        .map(p => ({
                          unit: [
                            iconMapping[UNITLAYERS.units[p].group],
                            UNITLAYERS.units[p].owner as 0 | 1 | 2,
                            p
                          ]
                        }))
                        .reduce((mem, i, n, list) => {
                          mem.push(i);
                          if (n === list.length - 2) {
                            mem.push({ text: " and " });
                          } else if (n < list.length - 2) {
                            mem.push({ text: ", " });
                          }
                          return mem;
                        }, [])
                    }),
                    { text: "into" },
                    { unittype: ["rook", 1] }
                  ]
                })
              : undefined,
            Object.keys(ARTIFACTS.madecatapults).length !== 0
              ? collapseContent({
                  line: [
                    { text: "turning" },
                    collapseContent({
                      line: Object.keys(ARTIFACTS.madecatapults)
                        .filter(p => UNITLAYERS.units[p])
                        .map(p => ({
                          unit: [
                            iconMapping[UNITLAYERS.units[p].group],
                            UNITLAYERS.units[p].owner as 0 | 1 | 2,
                            p
                          ]
                        }))
                        .reduce((mem, i, n, list) => {
                          mem.push(i);
                          if (n === list.length - 2) {
                            mem.push({ text: " and " });
                          } else if (n < list.length - 2) {
                            mem.push({ text: ", " });
                          }
                          return mem;
                        }, [])
                    }),
                    { text: "into" },
                    { unittype: ["queen", 1] }
                  ]
                })
              : undefined
          ]
            .filter(i => !!i)
            .reduce((mem, i, n, list) => {
              mem.push(i);
              if (n === list.length - 2) {
                mem.push({ text: " and " });
              } else if (n < list.length - 2) {
                mem.push({ text: ", " });
              }
              return mem;
            }, [])
        })
      ]
    });
  };
  game.action.selectcrush1 = (step, newMarkPos) => {
    let LINKS: AlgolStepLinks = { actions: {} };
    let MARKS = {
      selecttower: step.MARKS.selecttower,
      selectcrush: newMarkPos
    };
    let UNITLAYERS = step.UNITLAYERS;
    LINKS.actions.crush = "crush1";
    if (UNITLAYERS.oppcatapults[MARKS.selectcrush]) {
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
  game.instruction.selectcrush1 = step => {
    let MARKS = step.MARKS;
    let UNITLAYERS = step.UNITLAYERS;
    return collapseContent({
      line: [
        { text: "Press" },
        { command: "crush" },
        { text: "to turn" },
        {
          unit: [
            iconMapping[(UNITLAYERS.units[MARKS.selecttower] || {}).group],
            (UNITLAYERS.units[MARKS.selecttower] || {}).owner as 0 | 1 | 2,
            MARKS.selecttower
          ]
        },
        { text: "to a" },
        { unittype: ["pawn", 1] },
        { text: "and" },
        UNITLAYERS.walls[MARKS.selectcrush]
          ? collapseContent({
              line: [
                { text: "destroy" },
                {
                  unit: [
                    iconMapping[
                      (UNITLAYERS.units[MARKS.selectcrush] || {}).group
                    ],
                    (UNITLAYERS.units[MARKS.selectcrush] || {}).owner as
                      | 0
                      | 1
                      | 2,
                    MARKS.selectcrush
                  ]
                }
              ]
            })
          : collapseContent({
              line: [
                { text: "reduce" },
                {
                  unit: [
                    iconMapping[
                      (UNITLAYERS.units[MARKS.selectcrush] || {}).group
                    ],
                    (UNITLAYERS.units[MARKS.selectcrush] || {}).owner as
                      | 0
                      | 1
                      | 2,
                    MARKS.selectcrush
                  ]
                },
                { text: "to a" },
                { unittype: ["rook", 2] },
                { text: ", or" },
                { command: "sacrifice" },
                {
                  unit: [
                    iconMapping[
                      (UNITLAYERS.units[MARKS.selecttower] || {}).group
                    ],
                    (UNITLAYERS.units[MARKS.selecttower] || {}).owner as
                      | 0
                      | 1
                      | 2,
                    MARKS.selecttower
                  ]
                },
                { text: "entirely to reduce" },
                {
                  unit: [
                    iconMapping[
                      (UNITLAYERS.units[MARKS.selectcrush] || {}).group
                    ],
                    (UNITLAYERS.units[MARKS.selectcrush] || {}).owner as
                      | 0
                      | 1
                      | 2,
                    MARKS.selectcrush
                  ]
                },
                { text: "to a" },
                { unittype: ["pawn", 2] },
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
    let UNITLAYERS = step.UNITLAYERS;
    return collapseContent({
      line: [
        { select: "Select" },
        { text: "where to fire the top section of" },
        {
          unit: [
            iconMapping[(UNITLAYERS.units[MARKS.selectcatapult] || {}).group],
            (UNITLAYERS.units[MARKS.selectcatapult] || {}).owner as 0 | 1 | 2,
            MARKS.selectcatapult
          ]
        }
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
        { text: "to turn" },
        {
          unit: [
            iconMapping[(UNITLAYERS.units[MARKS.selectcatapult] || {}).group],
            (UNITLAYERS.units[MARKS.selectcatapult] || {}).owner as 0 | 1 | 2,
            MARKS.selectcatapult
          ]
        },
        { text: "into a" },
        { unittype: ["rook", 1] },
        UNITLAYERS.walls[MARKS.selectfire]
          ? collapseContent({
              line: [
                { text: "and destroy" },
                {
                  unit: [
                    iconMapping[
                      (UNITLAYERS.units[MARKS.selectfire] || {}).group
                    ],
                    (UNITLAYERS.units[MARKS.selectfire] || {}).owner as
                      | 0
                      | 1
                      | 2,
                    MARKS.selectfire
                  ]
                }
              ]
            })
          : UNITLAYERS.units[MARKS.selectfire]
          ? collapseContent({
              line: [
                { text: "and reduce" },
                {
                  unit: [
                    iconMapping[
                      (UNITLAYERS.units[MARKS.selectfire] || {}).group
                    ],
                    (UNITLAYERS.units[MARKS.selectfire] || {}).owner as
                      | 0
                      | 1
                      | 2,
                    MARKS.selectfire
                  ]
                },
                { text: "to a" },
                UNITLAYERS.catapults[MARKS.selectfire]
                  ? { unittype: ["rook", 2] }
                  : { unittype: ["pawn", 2] }
              ]
            })
          : collapseContent({
              line: [
                { text: "and spawn" },
                { unit: ["pawn", 1, MARKS.selectfire] }
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
    return collapseContent({
      line: [
        { select: "Select" },
        { unittype: ["rook", 2] },
        { text: "or" },
        { unittype: ["queen", 2] },
        { text: "to act with" }
      ]
    });
  };
  game.newBattle = () => {
    let UNITDATA = deduceInitialUnitData({
      towers: { "1": [{ rect: ["a1", "h1"] }], "2": [{ rect: ["a7", "h7"] }] }
    });
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
    let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
    let ARTIFACTS = {
      movetargets: step.ARTIFACTS.movetargets,
      crushtargets: step.ARTIFACTS.crushtargets,
      madecatapults: step.ARTIFACTS.madecatapults,
      madetowers: step.ARTIFACTS.madetowers,
      madewalls: step.ARTIFACTS.madewalls
    };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let NEXTSPAWNID = step.NEXTSPAWNID;
    let MARKS = step.MARKS;
    for (let LOOPPOS in ARTIFACTS.madewalls) {
      anim.enterFrom[LOOPPOS] = MARKS.selecttower;
    }
    for (let LOOPPOS in ARTIFACTS.madetowers) {
      anim.ghosts.push([MARKS.selecttower, LOOPPOS, "pawn", 2]);
    }
    for (let LOOPPOS in ARTIFACTS.madecatapults) {
      anim.ghosts.push([MARKS.selecttower, LOOPPOS, "pawn", 2]);
    }
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
          owner: 2
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
      NEXTSPAWNID,
      anim
    };
  };
  game.instruction.move2 = () => defaultInstruction(2);
  game.action.crush2 = step => {
    let LINKS: AlgolStepLinks = { actions: {} };
    let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let MARKS = step.MARKS;
    anim.ghosts.push([MARKS.selecttower, MARKS.selectcrush, "pawn", 2]);
    {
      let unitid = (UNITLAYERS.units[MARKS.selecttower] || {}).id;
      if (unitid) {
        UNITDATA[unitid] = {
          ...UNITDATA[unitid],
          group: "walls"
        };
      }
    }
    if (UNITLAYERS.oppcatapults[MARKS.selectcrush]) {
      {
        let unitid = (UNITLAYERS.units[MARKS.selectcrush] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            group: "towers"
          };
        }
      }
    } else {
      delete UNITDATA[(UNITLAYERS.units[MARKS.selectcrush] || {}).id];
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
      NEXTSPAWNID: step.NEXTSPAWNID,
      anim
    };
  };
  game.instruction.crush2 = () => defaultInstruction(2);
  game.action.sacrifice2 = step => {
    let LINKS: AlgolStepLinks = { actions: {} };
    let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let MARKS = step.MARKS;
    anim.exitTo[MARKS.selecttower] = MARKS.selectcrush;
    {
      let unitid = (UNITLAYERS.units[MARKS.selectcrush] || {}).id;
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
      NEXTSPAWNID: step.NEXTSPAWNID,
      anim
    };
  };
  game.instruction.sacrifice2 = () => defaultInstruction(2);
  game.action.fire2 = step => {
    let LINKS: AlgolStepLinks = { actions: {} };
    let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let NEXTSPAWNID = step.NEXTSPAWNID;
    let MARKS = step.MARKS;
    if (!UNITLAYERS.oppunits[MARKS.selectfire]) {
      anim.enterFrom[MARKS.selectfire] = MARKS.selectcatapult;
    } else {
      anim.ghosts.push([MARKS.selectcatapult, MARKS.selectfire, "pawn", 2]);
    }
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
            owner: 2
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
      NEXTSPAWNID,
      anim
    };
  };
  game.instruction.fire2 = () => defaultInstruction(2);
  game.action.selecttower2 = (step, newMarkPos) => {
    let ARTIFACTS = {
      movetargets: {},
      crushtargets: {}
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
          ARTIFACTS.crushtargets[POS] = emptyObj;
        }
      }
    }
    for (const pos of Object.keys(ARTIFACTS.movetargets)) {
      LINKS.actions[pos] = "selectmove2";
    }
    for (const pos of Object.keys(ARTIFACTS.crushtargets)) {
      LINKS.actions[pos] = "selectcrush2";
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
    let UNITLAYERS = step.UNITLAYERS;
    return collapseContent({
      line: [
        { select: "Select" },
        collapseContent({
          line: [
            Object.keys(ARTIFACTS.movetargets).length !== 0
              ? { text: "a move target" }
              : undefined,
            Object.keys(ARTIFACTS.crushtargets).length !== 0
              ? collapseContent({
                  line: [
                    { text: "a" },
                    { unittype: ["pawn", 1] },
                    { text: "or" },
                    { unittype: ["queen", 1] },
                    { text: "to crush" }
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
        { text: "for" },
        {
          unit: [
            iconMapping[(UNITLAYERS.units[MARKS.selecttower] || {}).group],
            (UNITLAYERS.units[MARKS.selecttower] || {}).owner as 0 | 1 | 2,
            MARKS.selecttower
          ]
        }
      ]
    });
  };
  game.action.selectmove2 = (step, newMarkPos) => {
    let ARTIFACTS = {
      movetargets: step.ARTIFACTS.movetargets,
      crushtargets: step.ARTIFACTS.crushtargets,
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
    let ARTIFACTS = step.ARTIFACTS;
    let MARKS = step.MARKS;
    let UNITLAYERS = step.UNITLAYERS;
    return collapseContent({
      line: [
        { text: "Press" },
        { command: "move" },
        { text: "to overturn" },
        {
          unit: [
            iconMapping[(UNITLAYERS.units[MARKS.selecttower] || {}).group],
            (UNITLAYERS.units[MARKS.selecttower] || {}).owner as 0 | 1 | 2,
            MARKS.selecttower
          ]
        },
        { text: "," },
        collapseContent({
          line: [
            Object.keys(ARTIFACTS.madewalls).length !== 0
              ? collapseContent({
                  line: [
                    { text: "creating" },
                    collapseContent({
                      line: Object.keys(ARTIFACTS.madewalls)
                        .map(p => ({ unit: [iconMapping["walls"], 2, p] }))
                        .reduce((mem, i, n, list) => {
                          mem.push(i);
                          if (n === list.length - 2) {
                            mem.push({ text: " and " });
                          } else if (n < list.length - 2) {
                            mem.push({ text: ", " });
                          }
                          return mem;
                        }, [])
                    })
                  ]
                })
              : undefined,
            Object.keys(ARTIFACTS.madetowers).length !== 0
              ? collapseContent({
                  line: [
                    { text: "turning" },
                    collapseContent({
                      line: Object.keys(ARTIFACTS.madetowers)
                        .filter(p => UNITLAYERS.units[p])
                        .map(p => ({
                          unit: [
                            iconMapping[UNITLAYERS.units[p].group],
                            UNITLAYERS.units[p].owner as 0 | 1 | 2,
                            p
                          ]
                        }))
                        .reduce((mem, i, n, list) => {
                          mem.push(i);
                          if (n === list.length - 2) {
                            mem.push({ text: " and " });
                          } else if (n < list.length - 2) {
                            mem.push({ text: ", " });
                          }
                          return mem;
                        }, [])
                    }),
                    { text: "into" },
                    { unittype: ["rook", 2] }
                  ]
                })
              : undefined,
            Object.keys(ARTIFACTS.madecatapults).length !== 0
              ? collapseContent({
                  line: [
                    { text: "turning" },
                    collapseContent({
                      line: Object.keys(ARTIFACTS.madecatapults)
                        .filter(p => UNITLAYERS.units[p])
                        .map(p => ({
                          unit: [
                            iconMapping[UNITLAYERS.units[p].group],
                            UNITLAYERS.units[p].owner as 0 | 1 | 2,
                            p
                          ]
                        }))
                        .reduce((mem, i, n, list) => {
                          mem.push(i);
                          if (n === list.length - 2) {
                            mem.push({ text: " and " });
                          } else if (n < list.length - 2) {
                            mem.push({ text: ", " });
                          }
                          return mem;
                        }, [])
                    }),
                    { text: "into" },
                    { unittype: ["queen", 2] }
                  ]
                })
              : undefined
          ]
            .filter(i => !!i)
            .reduce((mem, i, n, list) => {
              mem.push(i);
              if (n === list.length - 2) {
                mem.push({ text: " and " });
              } else if (n < list.length - 2) {
                mem.push({ text: ", " });
              }
              return mem;
            }, [])
        })
      ]
    });
  };
  game.action.selectcrush2 = (step, newMarkPos) => {
    let LINKS: AlgolStepLinks = { actions: {} };
    let MARKS = {
      selecttower: step.MARKS.selecttower,
      selectcrush: newMarkPos
    };
    let UNITLAYERS = step.UNITLAYERS;
    LINKS.actions.crush = "crush2";
    if (UNITLAYERS.oppcatapults[MARKS.selectcrush]) {
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
  game.instruction.selectcrush2 = step => {
    let MARKS = step.MARKS;
    let UNITLAYERS = step.UNITLAYERS;
    return collapseContent({
      line: [
        { text: "Press" },
        { command: "crush" },
        { text: "to turn" },
        {
          unit: [
            iconMapping[(UNITLAYERS.units[MARKS.selecttower] || {}).group],
            (UNITLAYERS.units[MARKS.selecttower] || {}).owner as 0 | 1 | 2,
            MARKS.selecttower
          ]
        },
        { text: "to a" },
        { unittype: ["pawn", 2] },
        { text: "and" },
        UNITLAYERS.walls[MARKS.selectcrush]
          ? collapseContent({
              line: [
                { text: "destroy" },
                {
                  unit: [
                    iconMapping[
                      (UNITLAYERS.units[MARKS.selectcrush] || {}).group
                    ],
                    (UNITLAYERS.units[MARKS.selectcrush] || {}).owner as
                      | 0
                      | 1
                      | 2,
                    MARKS.selectcrush
                  ]
                }
              ]
            })
          : collapseContent({
              line: [
                { text: "reduce" },
                {
                  unit: [
                    iconMapping[
                      (UNITLAYERS.units[MARKS.selectcrush] || {}).group
                    ],
                    (UNITLAYERS.units[MARKS.selectcrush] || {}).owner as
                      | 0
                      | 1
                      | 2,
                    MARKS.selectcrush
                  ]
                },
                { text: "to a" },
                { unittype: ["rook", 1] },
                { text: ", or" },
                { command: "sacrifice" },
                {
                  unit: [
                    iconMapping[
                      (UNITLAYERS.units[MARKS.selecttower] || {}).group
                    ],
                    (UNITLAYERS.units[MARKS.selecttower] || {}).owner as
                      | 0
                      | 1
                      | 2,
                    MARKS.selecttower
                  ]
                },
                { text: "entirely to reduce" },
                {
                  unit: [
                    iconMapping[
                      (UNITLAYERS.units[MARKS.selectcrush] || {}).group
                    ],
                    (UNITLAYERS.units[MARKS.selectcrush] || {}).owner as
                      | 0
                      | 1
                      | 2,
                    MARKS.selectcrush
                  ]
                },
                { text: "to a" },
                { unittype: ["pawn", 1] },
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
    let UNITLAYERS = step.UNITLAYERS;
    return collapseContent({
      line: [
        { select: "Select" },
        { text: "where to fire the top section of" },
        {
          unit: [
            iconMapping[(UNITLAYERS.units[MARKS.selectcatapult] || {}).group],
            (UNITLAYERS.units[MARKS.selectcatapult] || {}).owner as 0 | 1 | 2,
            MARKS.selectcatapult
          ]
        }
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
        { text: "to turn" },
        {
          unit: [
            iconMapping[(UNITLAYERS.units[MARKS.selectcatapult] || {}).group],
            (UNITLAYERS.units[MARKS.selectcatapult] || {}).owner as 0 | 1 | 2,
            MARKS.selectcatapult
          ]
        },
        { text: "into a" },
        { unittype: ["rook", 2] },
        UNITLAYERS.walls[MARKS.selectfire]
          ? collapseContent({
              line: [
                { text: "and destroy" },
                {
                  unit: [
                    iconMapping[
                      (UNITLAYERS.units[MARKS.selectfire] || {}).group
                    ],
                    (UNITLAYERS.units[MARKS.selectfire] || {}).owner as
                      | 0
                      | 1
                      | 2,
                    MARKS.selectfire
                  ]
                }
              ]
            })
          : UNITLAYERS.units[MARKS.selectfire]
          ? collapseContent({
              line: [
                { text: "and reduce" },
                {
                  unit: [
                    iconMapping[
                      (UNITLAYERS.units[MARKS.selectfire] || {}).group
                    ],
                    (UNITLAYERS.units[MARKS.selectfire] || {}).owner as
                      | 0
                      | 1
                      | 2,
                    MARKS.selectfire
                  ]
                },
                { text: "to a" },
                UNITLAYERS.catapults[MARKS.selectfire]
                  ? { unittype: ["rook", 1] }
                  : { unittype: ["pawn", 1] }
              ]
            })
          : collapseContent({
              line: [
                { text: "and spawn" },
                { unit: ["pawn", 2, MARKS.selectfire] }
              ]
            })
      ]
    });
  };
}
export default game as AlgolGame;
