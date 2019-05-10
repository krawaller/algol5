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
const iconMapping = { towers: "rook", walls: "pawn" };
const emptyArtifactLayers = {
  movetargets: {},
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
  gameId: "murusgallicus",
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
    ]
  };
  const TERRAIN = terrainLayers(
    7,
    8,
    {
      homerow: { "1": [{ rect: ["a1", "h1"] }], "2": [{ rect: ["a7", "h7"] }] },
      threatrow: {
        "1": [{ rect: ["a3", "h3"] }],
        "2": [{ rect: ["a5", "h5"] }]
      }
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
      oppwalls: oldUnitLayers.mywalls
    };
    let LINKS: AlgolStepLinks = {
      actions: {}
    };
    for (const pos of Object.keys(UNITLAYERS.mytowers)) {
      LINKS.actions[pos] = "selecttower1";
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
    delete UNITDATA[(UNITLAYERS.units[MARKS.selecttower] || {}).id];
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
      oppwalls: {}
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
    delete UNITDATA[(UNITLAYERS.units[MARKS.selectcrush] || {}).id];
    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      towers: {},
      mytowers: {},
      opptowers: {},
      walls: {},
      mywalls: {},
      oppwalls: {}
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
  game.instruction.crush1 = () => defaultInstruction(1);
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
      let BLOCKS = { ...UNITLAYERS.oppunits, ...UNITLAYERS.mytowers };
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
        if (POS && UNITLAYERS.oppwalls[POS]) {
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
        ARTIFACTS[UNITLAYERS.myunits[POS] ? "madetowers" : "madewalls"][
          POS
        ] = emptyObj;
      }
      ARTIFACTS[
        UNITLAYERS.myunits[MARKS.selectmove] ? "madetowers" : "madewalls"
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
    LINKS.actions.crush = "crush1";
    return {
      LINKS,
      ARTIFACTS: step.ARTIFACTS,
      UNITLAYERS: step.UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS: { selecttower: step.MARKS.selecttower, selectcrush: newMarkPos },
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
        { text: "into a" },
        { unittype: ["pawn", 1] },
        { text: "and destroy" },
        {
          unit: [
            iconMapping[(UNITLAYERS.units[MARKS.selectcrush] || {}).group],
            (UNITLAYERS.units[MARKS.selectcrush] || {}).owner as 0 | 1 | 2,
            MARKS.selectcrush
          ]
        }
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
    ]
  };
  const TERRAIN = terrainLayers(
    7,
    8,
    {
      homerow: { "1": [{ rect: ["a1", "h1"] }], "2": [{ rect: ["a7", "h7"] }] },
      threatrow: {
        "1": [{ rect: ["a3", "h3"] }],
        "2": [{ rect: ["a5", "h5"] }]
      }
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
      oppwalls: oldUnitLayers.mywalls
    };
    let LINKS: AlgolStepLinks = {
      actions: {}
    };
    for (const pos of Object.keys(UNITLAYERS.mytowers)) {
      LINKS.actions[pos] = "selecttower2";
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
      oppwalls: {}
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
    delete UNITDATA[(UNITLAYERS.units[MARKS.selecttower] || {}).id];
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
      oppwalls: {}
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
    delete UNITDATA[(UNITLAYERS.units[MARKS.selectcrush] || {}).id];
    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      towers: {},
      mytowers: {},
      opptowers: {},
      walls: {},
      mywalls: {},
      oppwalls: {}
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
  game.instruction.crush2 = () => defaultInstruction(2);
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
      let BLOCKS = { ...UNITLAYERS.oppunits, ...UNITLAYERS.mytowers };
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
        if (POS && UNITLAYERS.oppwalls[POS]) {
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
        ARTIFACTS[UNITLAYERS.myunits[POS] ? "madetowers" : "madewalls"][
          POS
        ] = emptyObj;
      }
      ARTIFACTS[
        UNITLAYERS.myunits[MARKS.selectmove] ? "madetowers" : "madewalls"
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
    LINKS.actions.crush = "crush2";
    return {
      LINKS,
      ARTIFACTS: step.ARTIFACTS,
      UNITLAYERS: step.UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS: { selecttower: step.MARKS.selecttower, selectcrush: newMarkPos },
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
        { text: "into a" },
        { unittype: ["pawn", 2] },
        { text: "and destroy" },
        {
          unit: [
            iconMapping[(UNITLAYERS.units[MARKS.selectcrush] || {}).group],
            (UNITLAYERS.units[MARKS.selectcrush] || {}).owner as 0 | 1 | 2,
            MARKS.selectcrush
          ]
        }
      ]
    });
  };
}
export default game as AlgolGame;
