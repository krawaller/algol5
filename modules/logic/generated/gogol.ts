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
const iconMapping = { kings: "king", soldiers: "pawn" };
const connections = boardConnections({ height: 8, width: 8 });
const relativeDirs = makeRelativeDirs([]);
const roseDirs = [1, 2, 3, 4, 5, 6, 7, 8];
const orthoDirs = [1, 3, 5, 7];
const diagDirs = [2, 4, 6, 8];
let game: Partial<AlgolGame> = { gameId: "gogol", action: {}, instruction: {} };
{
  const groupLayers = {
    kings: [
      ["units", "kings"],
      ["units", "myunits", "kings", "mykings"],
      ["units", "oppunits", "kings", "oppkings"]
    ],
    soldiers: [
      ["units"],
      ["units", "myunits", "mysoldiers"],
      ["units", "oppunits", "oppsoldiers"]
    ]
  };
  const TERRAIN = terrainLayers(
    8,
    8,
    {
      homerow: { "1": [{ rect: ["a1", "h1"] }], "2": [{ rect: ["a8", "h8"] }] },
      edges: [
        { rect: ["a1", "a8"] },
        { rect: ["h1", "h8"] },
        { rect: ["b8", "g8"] },
        { rect: ["b1", "g1"] }
      ]
    },
    1
  );
  game.action.startTurn1 = step => {
    let ARTIFACTS = {
      nokings: {},
      nosoldiers: {}
    };
    const oldUnitLayers = step.UNITLAYERS;
    let UNITLAYERS = {
      units: oldUnitLayers.units,
      myunits: oldUnitLayers.oppunits,
      oppunits: oldUnitLayers.myunits,
      kings: oldUnitLayers.kings,
      mykings: oldUnitLayers.oppkings,
      oppkings: oldUnitLayers.mykings,
      mysoldiers: oldUnitLayers.oppsoldiers,
      oppsoldiers: oldUnitLayers.mysoldiers
    };
    let LINKS: AlgolStepLinks = {
      actions: {}
    };
    let TURN = step.TURN + 1;
    for (let STARTPOS in Object.entries(
      Object.keys(TERRAIN.edges)
        .concat(Object.keys(UNITLAYERS.mysoldiers))
        .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
    )
      .filter(([key, n]) => n === 2)
      .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})) {
      let startconnections = connections[STARTPOS];
      for (let DIR of TERRAIN.homerow[STARTPOS] ? orthoDirs : [1, 5]) {
        let POS = startconnections[DIR];
        if (POS) {
          ARTIFACTS.nokings[POS] = emptyObj;
        }
      }
    }
    for (let STARTPOS in UNITLAYERS.mykings) {
      let startconnections = connections[STARTPOS];
      for (let DIR of orthoDirs) {
        let POS = startconnections[DIR];
        if (
          POS &&
          (TERRAIN.homerow[POS] ||
            (TERRAIN.edges[STARTPOS] && TERRAIN.edges[POS]))
        ) {
          ARTIFACTS.nosoldiers[POS] = emptyObj;
        }
      }
    }
    if (TURN > 1) {
      for (const pos of Object.keys(UNITLAYERS.myunits)) {
        LINKS.actions[pos] = "selectunit1";
      }
    } else {
      for (const pos of Object.keys(
        Object.keys(BOARD.board)
          .filter(
            k =>
              !{ ...UNITLAYERS.units, ...ARTIFACTS.nokings }.hasOwnProperty(k)
          )
          .reduce((m, k) => ({ ...m, [k]: emptyObj }), {})
      )) {
        LINKS.actions[pos] = "selectkingdeploy1";
      }
    }
    return {
      UNITDATA: step.UNITDATA,
      LINKS,
      UNITLAYERS,
      ARTIFACTS,
      MARKS: {},
      TURN,
      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.startTurn1 = step => {
    let TURN = step.TURN;
    return TURN > 1
      ? collapseContent({
          line: [
            { select: "Select" },
            { unittype: ["king", 1] },
            { text: "or" },
            { unittype: ["pawn", 1] },
            { text: "to move" }
          ]
        })
      : collapseContent({
          line: [
            { select: "Select" },
            { text: "where to deploy your" },
            { unittype: ["king", 1] }
          ]
        });
  };
  game.action.deploy1 = step => {
    let LINKS: AlgolStepLinks = { actions: {} };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let NEXTSPAWNID = step.NEXTSPAWNID;
    let TURN = step.TURN;
    let MARKS = step.MARKS;
    {
      let newunitid = "spawn" + NEXTSPAWNID++;
      UNITDATA[newunitid] = {
        pos: MARKS.selectkingdeploy,
        id: newunitid,
        group: "kings",
        owner: 1
      };
    }
    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      kings: {},
      mykings: {},
      oppkings: {},
      mysoldiers: {},
      oppsoldiers: {}
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
          Object.keys(UNITLAYERS.mykings)
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
          Object.keys(UNITLAYERS.mykings)
            .concat(Object.keys(TERRAIN.opphomerow))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
      );
    } else if (TURN > 1 && Object.keys(UNITLAYERS.oppkings).length === 0) {
      let winner = 1;
      LINKS.endGame = winner === 1 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "kingkill";
    } else {
      LINKS.endTurn = "startTurn2";
    }
    return {
      LINKS,
      MARKS: {},
      ARTIFACTS: step.ARTIFACTS,
      TURN,
      UNITDATA,
      UNITLAYERS,
      NEXTSPAWNID
    };
  };
  game.instruction.deploy1 = () => defaultInstruction(1);
  game.action.move1 = step => {
    let LINKS: AlgolStepLinks = { actions: {} };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let TURN = step.TURN;
    let MARKS = step.MARKS;
    {
      let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
      if (unitid) {
        UNITDATA[unitid] = {
          ...UNITDATA[unitid],
          pos: MARKS.selectmovetarget
        };
      }
    }
    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      kings: {},
      mykings: {},
      oppkings: {},
      mysoldiers: {},
      oppsoldiers: {}
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
          Object.keys(UNITLAYERS.mykings)
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
          Object.keys(UNITLAYERS.mykings)
            .concat(Object.keys(TERRAIN.opphomerow))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
      );
    } else if (TURN > 1 && Object.keys(UNITLAYERS.oppkings).length === 0) {
      let winner = 1;
      LINKS.endGame = winner === 1 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "kingkill";
    } else {
      LINKS.endTurn = "startTurn2";
    }
    return {
      LINKS,
      MARKS: {},
      ARTIFACTS: step.ARTIFACTS,
      TURN,
      UNITDATA,
      UNITLAYERS,
      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.move1 = () => defaultInstruction(1);
  game.action.jump1 = step => {
    let LINKS: AlgolStepLinks = { actions: {} };
    let ARTIFACTS = {
      nokings: step.ARTIFACTS.nokings,
      nosoldiers: step.ARTIFACTS.nosoldiers,
      kingwalk: step.ARTIFACTS.kingwalk,
      adjacentenemies: step.ARTIFACTS.adjacentenemies,
      willdie: step.ARTIFACTS.willdie,
      jumptargets: step.ARTIFACTS.jumptargets,
      splashed: step.ARTIFACTS.splashed
    };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let TURN = step.TURN;
    let MARKS = step.MARKS;
    delete UNITDATA[
      (UNITLAYERS.units[Object.keys(ARTIFACTS.splashed)[0]] || {}).id
    ];
    {
      let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
      if (unitid) {
        UNITDATA[unitid] = {
          ...UNITDATA[unitid],
          pos: MARKS.selectjumptarget
        };
      }
    }
    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      kings: {},
      mykings: {},
      oppkings: {},
      mysoldiers: {},
      oppsoldiers: {}
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
          Object.keys(UNITLAYERS.mykings)
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
          Object.keys(UNITLAYERS.mykings)
            .concat(Object.keys(TERRAIN.opphomerow))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
      );
    } else if (TURN > 1 && Object.keys(UNITLAYERS.oppkings).length === 0) {
      let winner = 1;
      LINKS.endGame = winner === 1 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "kingkill";
    } else {
      LINKS.endTurn = "startTurn2";
    }
    return {
      LINKS,
      MARKS: {},
      ARTIFACTS,
      TURN,
      UNITDATA,
      UNITLAYERS,
      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.jump1 = () => defaultInstruction(1);
  game.action.selectkingdeploy1 = (step, newMarkPos) => {
    let LINKS: AlgolStepLinks = { actions: {} };
    LINKS.actions.deploy = "deploy1";
    return {
      LINKS,
      ARTIFACTS: step.ARTIFACTS,
      UNITLAYERS: step.UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS: { selectkingdeploy: newMarkPos },
      NEXTSPAWNID: step.NEXTSPAWNID,
      canAlwaysEnd: true
    };
  };
  game.instruction.selectkingdeploy1 = step => {
    let MARKS = step.MARKS;
    return collapseContent({
      line: [
        { text: "Press" },
        { command: "deploy" },
        { text: "to spawn" },
        { unit: ["king", 1, MARKS.selectkingdeploy] }
      ]
    });
  };
  game.action.selectunit1 = (step, newMarkPos) => {
    let ARTIFACTS = {
      nokings: step.ARTIFACTS.nokings,
      nosoldiers: step.ARTIFACTS.nosoldiers,
      kingwalk: {},
      adjacentenemies: {},
      willdie: {},
      jumptargets: {}
    };
    let LINKS: AlgolStepLinks = { actions: {} };
    let MARKS = {
      selectunit: newMarkPos
    };
    let UNITLAYERS = step.UNITLAYERS;
    {
      let BLOCKS = UNITLAYERS.units;
      for (let STARTPOS in {
        ...UNITLAYERS.mykings,
        ...{ [MARKS.selectunit]: 1 }
      }) {
        for (let DIR of roseDirs) {
          let POS = STARTPOS;
          while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
            if (!ARTIFACTS.nokings[POS]) {
              ARTIFACTS.kingwalk[POS] = emptyObj;
            }
          }
        }
      }
    }
    {
      let startconnections = connections[MARKS.selectunit];
      for (let DIR of roseDirs) {
        let POS = startconnections[DIR];
        if (POS && UNITLAYERS.oppunits[POS]) {
          ARTIFACTS.adjacentenemies[POS] = { dir: DIR };
        }
      }
    }
    for (let STARTPOS in ARTIFACTS.adjacentenemies) {
      let DIR =
        relativeDirs[1][(ARTIFACTS.adjacentenemies[STARTPOS] || {}).dir];
      let NEIGHBOURCOUNT;
      let POS = connections[STARTPOS][DIR];
      if (
        POS &&
        !{
          ...UNITLAYERS.units,
          ...(UNITLAYERS.mykings[MARKS.selectunit]
            ? ARTIFACTS.nokings
            : ARTIFACTS.nosoldiers)
        }[POS]
      ) {
        NEIGHBOURCOUNT = 1;
        ARTIFACTS.jumptargets[POS] = { dir: DIR };
      }
      if (!!NEIGHBOURCOUNT) {
        ARTIFACTS.willdie[STARTPOS] = { dir: DIR };
      }
    }
    for (const pos of Object.keys(
      UNITLAYERS.mykings[MARKS.selectunit]
        ? ARTIFACTS.kingwalk
        : Object.keys(BOARD.board)
            .filter(
              k =>
                !{
                  ...UNITLAYERS.units,
                  ...ARTIFACTS.nosoldiers,
                  ...ARTIFACTS.jumptargets
                }.hasOwnProperty(k)
            )
            .reduce((m, k) => ({ ...m, [k]: emptyObj }), {})
    )) {
      LINKS.actions[pos] = "selectmovetarget1";
    }
    for (const pos of Object.keys(ARTIFACTS.jumptargets)) {
      LINKS.actions[pos] = "selectjumptarget1";
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
  game.instruction.selectunit1 = step => {
    let ARTIFACTS = step.ARTIFACTS;
    let MARKS = step.MARKS;
    let UNITLAYERS = step.UNITLAYERS;
    return UNITLAYERS.kings[MARKS.selectunit]
      ? collapseContent({
          line: [
            { select: "Select" },
            { text: "where to" },
            collapseContent({
              line: [
                Object.keys(ARTIFACTS.kingwalk).length !== 0
                  ? { text: "move" }
                  : undefined,
                Object.keys(ARTIFACTS.jumptargets).length !== 0
                  ? { text: "jump" }
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
            { text: "your" },
            { unittype: ["king", 1] },
            Object.keys(
              Object.entries(
                Object.keys(ARTIFACTS.nokings)
                  .concat(
                    Object.keys({
                      ...ARTIFACTS.kingwalk,
                      ...ARTIFACTS.jumptargets
                    })
                  )
                  .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
              )
                .filter(([key, n]) => n === 2)
                .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
            ).length !== 0
              ? { text: "without making a forbidden configuration" }
              : undefined
          ]
        })
      : collapseContent({
          line: [
            { select: "Select" },
            { text: "where to move" },
            Object.keys(ARTIFACTS.jumptargets).length !== 0
              ? { text: "or jump" }
              : undefined,
            { text: "your" },
            { unittype: ["pawn", 1] },
            Object.keys(ARTIFACTS.nosoldiers).length !== 0
              ? { text: "without making a forbidden configuration" }
              : undefined
          ]
        });
  };
  game.action.selectmovetarget1 = (step, newMarkPos) => {
    let LINKS: AlgolStepLinks = { actions: {} };
    LINKS.actions.move = "move1";
    return {
      LINKS,
      ARTIFACTS: step.ARTIFACTS,
      UNITLAYERS: step.UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS: {
        selectunit: step.MARKS.selectunit,
        selectmovetarget: newMarkPos
      },
      NEXTSPAWNID: step.NEXTSPAWNID,
      canAlwaysEnd: true
    };
  };
  game.instruction.selectmovetarget1 = step => {
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
        { text: "to" },
        { pos: MARKS.selectmovetarget }
      ]
    });
  };
  game.action.selectjumptarget1 = (step, newMarkPos) => {
    let ARTIFACTS = {
      nokings: step.ARTIFACTS.nokings,
      nosoldiers: step.ARTIFACTS.nosoldiers,
      kingwalk: step.ARTIFACTS.kingwalk,
      adjacentenemies: step.ARTIFACTS.adjacentenemies,
      willdie: step.ARTIFACTS.willdie,
      jumptargets: step.ARTIFACTS.jumptargets,
      splashed: {}
    };
    let LINKS: AlgolStepLinks = { actions: {} };
    let MARKS = {
      selectunit: step.MARKS.selectunit,
      selectjumptarget: newMarkPos
    };
    let filtersourcelayer = ARTIFACTS.willdie;
    let filtertargetlayer = ARTIFACTS.splashed;
    for (let POS in filtersourcelayer) {
      let filterObj = filtersourcelayer[POS];
      if (
        filterObj.dir ===
        (ARTIFACTS.jumptargets[MARKS.selectjumptarget] || {}).dir
      ) {
        filtertargetlayer[POS] = filterObj;
      }
    }
    LINKS.actions.jump = "jump1";
    return {
      LINKS,
      ARTIFACTS,
      UNITLAYERS: step.UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS,
      NEXTSPAWNID: step.NEXTSPAWNID,
      canAlwaysEnd: true
    };
  };
  game.instruction.selectjumptarget1 = step => {
    let ARTIFACTS = step.ARTIFACTS;
    let MARKS = step.MARKS;
    let UNITLAYERS = step.UNITLAYERS;
    return collapseContent({
      line: [
        { text: "Press" },
        { command: "jump" },
        { text: "to make" },
        {
          unit: [
            iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
            (UNITLAYERS.units[MARKS.selectunit] || {}).owner as 0 | 1 | 2,
            MARKS.selectunit
          ]
        },
        { text: "jump to" },
        { pos: MARKS.selectjumptarget },
        { text: "and kill" },
        {
          unit: [
            iconMapping[
              (UNITLAYERS.units[Object.keys(ARTIFACTS.splashed)[0]] || {}).group
            ],
            (UNITLAYERS.units[Object.keys(ARTIFACTS.splashed)[0]] || {})
              .owner as 0 | 1 | 2,
            Object.keys(ARTIFACTS.splashed)[0]
          ]
        }
      ]
    });
  };
}
{
  const groupLayers = {
    kings: [
      ["units", "kings"],
      ["units", "oppunits", "kings", "oppkings"],
      ["units", "myunits", "kings", "mykings"]
    ],
    soldiers: [
      ["units"],
      ["units", "oppunits", "oppsoldiers"],
      ["units", "myunits", "mysoldiers"]
    ]
  };
  const TERRAIN = terrainLayers(
    8,
    8,
    {
      homerow: { "1": [{ rect: ["a1", "h1"] }], "2": [{ rect: ["a8", "h8"] }] },
      edges: [
        { rect: ["a1", "a8"] },
        { rect: ["h1", "h8"] },
        { rect: ["b8", "g8"] },
        { rect: ["b1", "g1"] }
      ]
    },
    2
  );
  game.action.startTurn2 = step => {
    let ARTIFACTS = {
      nokings: {},
      nosoldiers: {}
    };
    const oldUnitLayers = step.UNITLAYERS;
    let UNITLAYERS = {
      units: oldUnitLayers.units,
      myunits: oldUnitLayers.oppunits,
      oppunits: oldUnitLayers.myunits,
      kings: oldUnitLayers.kings,
      mykings: oldUnitLayers.oppkings,
      oppkings: oldUnitLayers.mykings,
      mysoldiers: oldUnitLayers.oppsoldiers,
      oppsoldiers: oldUnitLayers.mysoldiers
    };
    let LINKS: AlgolStepLinks = {
      actions: {}
    };
    let TURN = step.TURN;
    for (let STARTPOS in Object.entries(
      Object.keys(TERRAIN.edges)
        .concat(Object.keys(UNITLAYERS.mysoldiers))
        .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
    )
      .filter(([key, n]) => n === 2)
      .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})) {
      let startconnections = connections[STARTPOS];
      for (let DIR of TERRAIN.homerow[STARTPOS] ? orthoDirs : [1, 5]) {
        let POS = startconnections[DIR];
        if (POS) {
          ARTIFACTS.nokings[POS] = emptyObj;
        }
      }
    }
    for (let STARTPOS in UNITLAYERS.mykings) {
      let startconnections = connections[STARTPOS];
      for (let DIR of orthoDirs) {
        let POS = startconnections[DIR];
        if (
          POS &&
          (TERRAIN.homerow[POS] ||
            (TERRAIN.edges[STARTPOS] && TERRAIN.edges[POS]))
        ) {
          ARTIFACTS.nosoldiers[POS] = emptyObj;
        }
      }
    }
    if (TURN > 1) {
      for (const pos of Object.keys(UNITLAYERS.myunits)) {
        LINKS.actions[pos] = "selectunit2";
      }
    } else {
      for (const pos of Object.keys(
        Object.keys(BOARD.board)
          .filter(
            k =>
              !{ ...UNITLAYERS.units, ...ARTIFACTS.nokings }.hasOwnProperty(k)
          )
          .reduce((m, k) => ({ ...m, [k]: emptyObj }), {})
      )) {
        LINKS.actions[pos] = "selectkingdeploy2";
      }
    }
    return {
      UNITDATA: step.UNITDATA,
      LINKS,
      UNITLAYERS,
      ARTIFACTS,
      MARKS: {},
      TURN,
      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.startTurn2 = step => {
    let TURN = step.TURN;
    return TURN > 1
      ? collapseContent({
          line: [
            { select: "Select" },
            { unittype: ["king", 2] },
            { text: "or" },
            { unittype: ["pawn", 2] },
            { text: "to move" }
          ]
        })
      : collapseContent({
          line: [
            { select: "Select" },
            { text: "where to deploy your" },
            { unittype: ["king", 2] }
          ]
        });
  };
  game.newBattle = () => {
    let UNITDATA = deduceInitialUnitData({
      soldiers: { "1": [{ rect: ["a1", "h1"] }], "2": [{ rect: ["a8", "h8"] }] }
    });
    let UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      kings: {},
      mykings: {},
      oppkings: {},
      mysoldiers: {},
      oppsoldiers: {}
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
  game.action.deploy2 = step => {
    let LINKS: AlgolStepLinks = { actions: {} };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let NEXTSPAWNID = step.NEXTSPAWNID;
    let TURN = step.TURN;
    let MARKS = step.MARKS;
    {
      let newunitid = "spawn" + NEXTSPAWNID++;
      UNITDATA[newunitid] = {
        pos: MARKS.selectkingdeploy,
        id: newunitid,
        group: "kings",
        owner: 2
      };
    }
    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      kings: {},
      mykings: {},
      oppkings: {},
      mysoldiers: {},
      oppsoldiers: {}
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
          Object.keys(UNITLAYERS.mykings)
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
          Object.keys(UNITLAYERS.mykings)
            .concat(Object.keys(TERRAIN.opphomerow))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
      );
    } else if (TURN > 1 && Object.keys(UNITLAYERS.oppkings).length === 0) {
      let winner = 2;
      LINKS.endGame = winner === 2 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "kingkill";
    } else {
      LINKS.endTurn = "startTurn1";
    }
    return {
      LINKS,
      MARKS: {},
      ARTIFACTS: step.ARTIFACTS,
      TURN,
      UNITDATA,
      UNITLAYERS,
      NEXTSPAWNID
    };
  };
  game.instruction.deploy2 = () => defaultInstruction(2);
  game.action.move2 = step => {
    let LINKS: AlgolStepLinks = { actions: {} };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let TURN = step.TURN;
    let MARKS = step.MARKS;
    {
      let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
      if (unitid) {
        UNITDATA[unitid] = {
          ...UNITDATA[unitid],
          pos: MARKS.selectmovetarget
        };
      }
    }
    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      kings: {},
      mykings: {},
      oppkings: {},
      mysoldiers: {},
      oppsoldiers: {}
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
          Object.keys(UNITLAYERS.mykings)
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
          Object.keys(UNITLAYERS.mykings)
            .concat(Object.keys(TERRAIN.opphomerow))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
      );
    } else if (TURN > 1 && Object.keys(UNITLAYERS.oppkings).length === 0) {
      let winner = 2;
      LINKS.endGame = winner === 2 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "kingkill";
    } else {
      LINKS.endTurn = "startTurn1";
    }
    return {
      LINKS,
      MARKS: {},
      ARTIFACTS: step.ARTIFACTS,
      TURN,
      UNITDATA,
      UNITLAYERS,
      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.move2 = () => defaultInstruction(2);
  game.action.jump2 = step => {
    let LINKS: AlgolStepLinks = { actions: {} };
    let ARTIFACTS = {
      nokings: step.ARTIFACTS.nokings,
      nosoldiers: step.ARTIFACTS.nosoldiers,
      kingwalk: step.ARTIFACTS.kingwalk,
      adjacentenemies: step.ARTIFACTS.adjacentenemies,
      willdie: step.ARTIFACTS.willdie,
      jumptargets: step.ARTIFACTS.jumptargets,
      splashed: step.ARTIFACTS.splashed
    };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let TURN = step.TURN;
    let MARKS = step.MARKS;
    delete UNITDATA[
      (UNITLAYERS.units[Object.keys(ARTIFACTS.splashed)[0]] || {}).id
    ];
    {
      let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
      if (unitid) {
        UNITDATA[unitid] = {
          ...UNITDATA[unitid],
          pos: MARKS.selectjumptarget
        };
      }
    }
    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      kings: {},
      mykings: {},
      oppkings: {},
      mysoldiers: {},
      oppsoldiers: {}
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
          Object.keys(UNITLAYERS.mykings)
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
          Object.keys(UNITLAYERS.mykings)
            .concat(Object.keys(TERRAIN.opphomerow))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
      );
    } else if (TURN > 1 && Object.keys(UNITLAYERS.oppkings).length === 0) {
      let winner = 2;
      LINKS.endGame = winner === 2 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "kingkill";
    } else {
      LINKS.endTurn = "startTurn1";
    }
    return {
      LINKS,
      MARKS: {},
      ARTIFACTS,
      TURN,
      UNITDATA,
      UNITLAYERS,
      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.jump2 = () => defaultInstruction(2);
  game.action.selectkingdeploy2 = (step, newMarkPos) => {
    let LINKS: AlgolStepLinks = { actions: {} };
    LINKS.actions.deploy = "deploy2";
    return {
      LINKS,
      ARTIFACTS: step.ARTIFACTS,
      UNITLAYERS: step.UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS: { selectkingdeploy: newMarkPos },
      NEXTSPAWNID: step.NEXTSPAWNID,
      canAlwaysEnd: true
    };
  };
  game.instruction.selectkingdeploy2 = step => {
    let MARKS = step.MARKS;
    return collapseContent({
      line: [
        { text: "Press" },
        { command: "deploy" },
        { text: "to spawn" },
        { unit: ["king", 2, MARKS.selectkingdeploy] }
      ]
    });
  };
  game.action.selectunit2 = (step, newMarkPos) => {
    let ARTIFACTS = {
      nokings: step.ARTIFACTS.nokings,
      nosoldiers: step.ARTIFACTS.nosoldiers,
      kingwalk: {},
      adjacentenemies: {},
      willdie: {},
      jumptargets: {}
    };
    let LINKS: AlgolStepLinks = { actions: {} };
    let MARKS = {
      selectunit: newMarkPos
    };
    let UNITLAYERS = step.UNITLAYERS;
    {
      let BLOCKS = UNITLAYERS.units;
      for (let STARTPOS in {
        ...UNITLAYERS.mykings,
        ...{ [MARKS.selectunit]: 1 }
      }) {
        for (let DIR of roseDirs) {
          let POS = STARTPOS;
          while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
            if (!ARTIFACTS.nokings[POS]) {
              ARTIFACTS.kingwalk[POS] = emptyObj;
            }
          }
        }
      }
    }
    {
      let startconnections = connections[MARKS.selectunit];
      for (let DIR of roseDirs) {
        let POS = startconnections[DIR];
        if (POS && UNITLAYERS.oppunits[POS]) {
          ARTIFACTS.adjacentenemies[POS] = { dir: DIR };
        }
      }
    }
    for (let STARTPOS in ARTIFACTS.adjacentenemies) {
      let DIR =
        relativeDirs[1][(ARTIFACTS.adjacentenemies[STARTPOS] || {}).dir];
      let NEIGHBOURCOUNT;
      let POS = connections[STARTPOS][DIR];
      if (
        POS &&
        !{
          ...UNITLAYERS.units,
          ...(UNITLAYERS.mykings[MARKS.selectunit]
            ? ARTIFACTS.nokings
            : ARTIFACTS.nosoldiers)
        }[POS]
      ) {
        NEIGHBOURCOUNT = 1;
        ARTIFACTS.jumptargets[POS] = { dir: DIR };
      }
      if (!!NEIGHBOURCOUNT) {
        ARTIFACTS.willdie[STARTPOS] = { dir: DIR };
      }
    }
    for (const pos of Object.keys(
      UNITLAYERS.mykings[MARKS.selectunit]
        ? ARTIFACTS.kingwalk
        : Object.keys(BOARD.board)
            .filter(
              k =>
                !{
                  ...UNITLAYERS.units,
                  ...ARTIFACTS.nosoldiers,
                  ...ARTIFACTS.jumptargets
                }.hasOwnProperty(k)
            )
            .reduce((m, k) => ({ ...m, [k]: emptyObj }), {})
    )) {
      LINKS.actions[pos] = "selectmovetarget2";
    }
    for (const pos of Object.keys(ARTIFACTS.jumptargets)) {
      LINKS.actions[pos] = "selectjumptarget2";
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
  game.instruction.selectunit2 = step => {
    let ARTIFACTS = step.ARTIFACTS;
    let MARKS = step.MARKS;
    let UNITLAYERS = step.UNITLAYERS;
    return UNITLAYERS.kings[MARKS.selectunit]
      ? collapseContent({
          line: [
            { select: "Select" },
            { text: "where to" },
            collapseContent({
              line: [
                Object.keys(ARTIFACTS.kingwalk).length !== 0
                  ? { text: "move" }
                  : undefined,
                Object.keys(ARTIFACTS.jumptargets).length !== 0
                  ? { text: "jump" }
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
            { text: "your" },
            { unittype: ["king", 2] },
            Object.keys(
              Object.entries(
                Object.keys(ARTIFACTS.nokings)
                  .concat(
                    Object.keys({
                      ...ARTIFACTS.kingwalk,
                      ...ARTIFACTS.jumptargets
                    })
                  )
                  .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
              )
                .filter(([key, n]) => n === 2)
                .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
            ).length !== 0
              ? { text: "without making a forbidden configuration" }
              : undefined
          ]
        })
      : collapseContent({
          line: [
            { select: "Select" },
            { text: "where to move" },
            Object.keys(ARTIFACTS.jumptargets).length !== 0
              ? { text: "or jump" }
              : undefined,
            { text: "your" },
            { unittype: ["pawn", 2] },
            Object.keys(ARTIFACTS.nosoldiers).length !== 0
              ? { text: "without making a forbidden configuration" }
              : undefined
          ]
        });
  };
  game.action.selectmovetarget2 = (step, newMarkPos) => {
    let LINKS: AlgolStepLinks = { actions: {} };
    LINKS.actions.move = "move2";
    return {
      LINKS,
      ARTIFACTS: step.ARTIFACTS,
      UNITLAYERS: step.UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS: {
        selectunit: step.MARKS.selectunit,
        selectmovetarget: newMarkPos
      },
      NEXTSPAWNID: step.NEXTSPAWNID,
      canAlwaysEnd: true
    };
  };
  game.instruction.selectmovetarget2 = step => {
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
        { text: "to" },
        { pos: MARKS.selectmovetarget }
      ]
    });
  };
  game.action.selectjumptarget2 = (step, newMarkPos) => {
    let ARTIFACTS = {
      nokings: step.ARTIFACTS.nokings,
      nosoldiers: step.ARTIFACTS.nosoldiers,
      kingwalk: step.ARTIFACTS.kingwalk,
      adjacentenemies: step.ARTIFACTS.adjacentenemies,
      willdie: step.ARTIFACTS.willdie,
      jumptargets: step.ARTIFACTS.jumptargets,
      splashed: {}
    };
    let LINKS: AlgolStepLinks = { actions: {} };
    let MARKS = {
      selectunit: step.MARKS.selectunit,
      selectjumptarget: newMarkPos
    };
    let filtersourcelayer = ARTIFACTS.willdie;
    let filtertargetlayer = ARTIFACTS.splashed;
    for (let POS in filtersourcelayer) {
      let filterObj = filtersourcelayer[POS];
      if (
        filterObj.dir ===
        (ARTIFACTS.jumptargets[MARKS.selectjumptarget] || {}).dir
      ) {
        filtertargetlayer[POS] = filterObj;
      }
    }
    LINKS.actions.jump = "jump2";
    return {
      LINKS,
      ARTIFACTS,
      UNITLAYERS: step.UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS,
      NEXTSPAWNID: step.NEXTSPAWNID,
      canAlwaysEnd: true
    };
  };
  game.instruction.selectjumptarget2 = step => {
    let ARTIFACTS = step.ARTIFACTS;
    let MARKS = step.MARKS;
    let UNITLAYERS = step.UNITLAYERS;
    return collapseContent({
      line: [
        { text: "Press" },
        { command: "jump" },
        { text: "to make" },
        {
          unit: [
            iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
            (UNITLAYERS.units[MARKS.selectunit] || {}).owner as 0 | 1 | 2,
            MARKS.selectunit
          ]
        },
        { text: "jump to" },
        { pos: MARKS.selectjumptarget },
        { text: "and kill" },
        {
          unit: [
            iconMapping[
              (UNITLAYERS.units[Object.keys(ARTIFACTS.splashed)[0]] || {}).group
            ],
            (UNITLAYERS.units[Object.keys(ARTIFACTS.splashed)[0]] || {})
              .owner as 0 | 1 | 2,
            Object.keys(ARTIFACTS.splashed)[0]
          ]
        }
      ]
    });
  };
}
export default game as AlgolGame;
