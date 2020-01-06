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
const emptyObj = {};
const BOARD = boardLayers({ height: 3, width: 4 });
const iconMapping = { kings: "king", pawns: "pawn", bishops: "bishop" };
const emptyArtifactLayers = { line: {} };
const connections = boardConnections({ height: 3, width: 4 });
const relativeDirs = makeRelativeDirs([]);
const TERRAIN = terrainLayers(3, 4, {});
const roseDirs = [1, 2, 3, 4, 5, 6, 7, 8];
const orthoDirs = [1, 3, 5, 7];
const diagDirs = [2, 4, 6, 8];
const knightDirs = [
  "d1f2r1",
  "d1f2r-1",
  "d3f2r1",
  "d3f2r-1",
  "d5f2r1",
  "d5f2r-1",
  "d7f2r1",
  "d7f2r-1"
];
let game = {
  gameId: "semaphor",
  action: {},
  instruction: {},
  commands: { deploy: {}, promote: {} }
};
{
  const groupLayers = {
    kings: [
      ["units", "kings"],
      ["units", "kings"],
      ["units", "kings"]
    ],
    pawns: [
      ["units", "pawns"],
      ["units", "pawns"],
      ["units", "pawns"]
    ],
    bishops: [
      ["units", "bishops"],
      ["units", "bishops"],
      ["units", "bishops"]
    ]
  };
  game.action.startTurn1 = step => {
    const oldUnitLayers = step.UNITLAYERS;
    let UNITLAYERS = {
      units: oldUnitLayers.units,
      kings: oldUnitLayers.kings,
      pawns: oldUnitLayers.pawns,
      bishops: oldUnitLayers.bishops
    };
    let LINKS = {
      marks: {},
      commands: {}
    };
    for (const pos of Object.keys(
      Object.keys(BOARD.board)
        .filter(k => !UNITLAYERS.units.hasOwnProperty(k))
        .reduce((m, k) => ({ ...m, [k]: emptyObj }), {})
    )) {
      LINKS.marks[pos] = "selectdeploytarget1";
    }
    for (const pos of Object.keys({
      ...UNITLAYERS.pawns,
      ...UNITLAYERS.bishops
    })) {
      LINKS.marks[pos] = "selectunit1";
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
        { select: "Select" },
        collapseContent({
          line: [
            Object.keys(UNITLAYERS.units).length !== 12
              ? collapseContent({
                  line: [{ text: "empty square to deploy to" }]
                })
              : undefined,
            Object.keys({ ...UNITLAYERS.bishops, ...UNITLAYERS.pawns })
              .length !== 0
              ? collapseContent({
                  line: [
                    { text: "a" },
                    { unittype: ["pawn", 0] },
                    { text: "or" },
                    { unittype: ["bishop", 0] },
                    { text: "to promote" }
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
        })
      ]
    });
  };
  game.action.deploy1 = step => {
    let LINKS = { marks: {}, commands: {} };
    let ARTIFACTS = {
      line: {}
    };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let NEXTSPAWNID = step.NEXTSPAWNID;
    let MARKS = step.MARKS;
    {
      let newunitid = "spawn" + NEXTSPAWNID++;
      UNITDATA[newunitid] = {
        pos: MARKS.selectdeploytarget,
        id: newunitid,
        group: "pawns",
        owner: 0
      };
    }
    UNITLAYERS = { units: {}, kings: {}, pawns: {}, bishops: {} };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    {
      for (let STARTPOS in UNITLAYERS.units) {
        let allowedsteps = UNITLAYERS[(UNITLAYERS.units[STARTPOS] || {}).group];
        for (let DIR of [1, 2, 3, 4]) {
          let walkedsquares = [];
          let POS = "faux";
          connections.faux[DIR] = STARTPOS;
          while ((POS = connections[POS][DIR]) && allowedsteps[POS]) {
            walkedsquares.push(POS);
          }
          let WALKLENGTH = walkedsquares.length;
          for (let walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
            POS = walkedsquares[walkstepper];
            if (WALKLENGTH > 2) {
              ARTIFACTS.line[POS] = emptyObj;
            }
          }
        }
      }
    }
    if (Object.keys(ARTIFACTS.line).length !== 0) {
      LINKS.endGame = "win";
      LINKS.endedBy = "madeline";
      LINKS.endMarks = Object.keys(ARTIFACTS.line);
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
  game.instruction.deploy1 = () => defaultInstruction(1);
  game.action.promote1 = step => {
    let LINKS = { marks: {}, commands: {} };
    let ARTIFACTS = {
      line: {}
    };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let MARKS = step.MARKS;
    {
      let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
      if (unitid) {
        UNITDATA[unitid] = {
          ...UNITDATA[unitid],
          group: UNITLAYERS.pawns[MARKS.selectunit] ? "bishops" : "kings"
        };
      }
    }
    UNITLAYERS = { units: {}, kings: {}, pawns: {}, bishops: {} };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    {
      for (let STARTPOS in UNITLAYERS.units) {
        let allowedsteps = UNITLAYERS[(UNITLAYERS.units[STARTPOS] || {}).group];
        for (let DIR of [1, 2, 3, 4]) {
          let walkedsquares = [];
          let POS = "faux";
          connections.faux[DIR] = STARTPOS;
          while ((POS = connections[POS][DIR]) && allowedsteps[POS]) {
            walkedsquares.push(POS);
          }
          let WALKLENGTH = walkedsquares.length;
          for (let walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
            POS = walkedsquares[walkstepper];
            if (WALKLENGTH > 2) {
              ARTIFACTS.line[POS] = emptyObj;
            }
          }
        }
      }
    }
    if (Object.keys(ARTIFACTS.line).length !== 0) {
      LINKS.endGame = "win";
      LINKS.endedBy = "madeline";
      LINKS.endMarks = Object.keys(ARTIFACTS.line);
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
      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.promote1 = () => defaultInstruction(1);
  game.action.selectdeploytarget1 = (step, newMarkPos) => {
    let LINKS = { marks: {}, commands: {} };
    LINKS.commands.deploy = "deploy1";
    return {
      LINKS,
      ARTIFACTS: step.ARTIFACTS,
      UNITLAYERS: step.UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS: { selectdeploytarget: newMarkPos },
      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.selectdeploytarget1 = step => {
    let MARKS = step.MARKS;
    return collapseContent({
      line: [
        { text: "Press" },
        { command: "deploy" },
        { text: "to spawn" },
        { unit: ["pawn", 0, MARKS.selectdeploytarget] }
      ]
    });
  };
  game.action.selectunit1 = (step, newMarkPos) => {
    let LINKS = { marks: {}, commands: {} };
    LINKS.commands.promote = "promote1";
    return {
      LINKS,
      ARTIFACTS: step.ARTIFACTS,
      UNITLAYERS: step.UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS: { selectunit: newMarkPos },
      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.selectunit1 = step => {
    let MARKS = step.MARKS;
    let UNITLAYERS = step.UNITLAYERS;
    return collapseContent({
      line: [
        { text: "Press" },
        { command: "promote" },
        { text: "to turn" },
        {
          unit: [
            iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
            (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
            MARKS.selectunit
          ]
        },
        { text: "into" },
        UNITLAYERS.pawns[MARKS.selectunit]
          ? { unittype: ["bishop", 0] }
          : { unittype: ["king", 0] }
      ]
    });
  };
}
{
  const groupLayers = {
    kings: [
      ["units", "kings"],
      ["units", "kings"],
      ["units", "kings"]
    ],
    pawns: [
      ["units", "pawns"],
      ["units", "pawns"],
      ["units", "pawns"]
    ],
    bishops: [
      ["units", "bishops"],
      ["units", "bishops"],
      ["units", "bishops"]
    ]
  };
  game.action.startTurn2 = step => {
    const oldUnitLayers = step.UNITLAYERS;
    let UNITLAYERS = {
      units: oldUnitLayers.units,
      kings: oldUnitLayers.kings,
      pawns: oldUnitLayers.pawns,
      bishops: oldUnitLayers.bishops
    };
    let LINKS = {
      marks: {},
      commands: {}
    };
    for (const pos of Object.keys(
      Object.keys(BOARD.board)
        .filter(k => !UNITLAYERS.units.hasOwnProperty(k))
        .reduce((m, k) => ({ ...m, [k]: emptyObj }), {})
    )) {
      LINKS.marks[pos] = "selectdeploytarget2";
    }
    for (const pos of Object.keys({
      ...UNITLAYERS.pawns,
      ...UNITLAYERS.bishops
    })) {
      LINKS.marks[pos] = "selectunit2";
    }
    return {
      UNITDATA: step.UNITDATA,
      LINKS,
      UNITLAYERS,
      ARTIFACTS: emptyArtifactLayers,
      MARKS: {},
      TURN: step.TURN,
      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.startTurn2 = step => {
    let UNITLAYERS = step.UNITLAYERS;
    return collapseContent({
      line: [
        { select: "Select" },
        collapseContent({
          line: [
            Object.keys(UNITLAYERS.units).length !== 12
              ? collapseContent({
                  line: [{ text: "empty square to deploy to" }]
                })
              : undefined,
            Object.keys({ ...UNITLAYERS.bishops, ...UNITLAYERS.pawns })
              .length !== 0
              ? collapseContent({
                  line: [
                    { text: "a" },
                    { unittype: ["pawn", 0] },
                    { text: "or" },
                    { unittype: ["bishop", 0] },
                    { text: "to promote" }
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
        })
      ]
    });
  };
  game.newBattle = () => {
    return game.action.startTurn1({
      NEXTSPAWNID: 1,
      TURN: 0,
      UNITDATA: {},
      UNITLAYERS: { units: {}, kings: {}, pawns: {}, bishops: {} }
    });
  };
  game.action.deploy2 = step => {
    let LINKS = { marks: {}, commands: {} };
    let ARTIFACTS = {
      line: {}
    };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let NEXTSPAWNID = step.NEXTSPAWNID;
    let MARKS = step.MARKS;
    {
      let newunitid = "spawn" + NEXTSPAWNID++;
      UNITDATA[newunitid] = {
        pos: MARKS.selectdeploytarget,
        id: newunitid,
        group: "pawns",
        owner: 0
      };
    }
    UNITLAYERS = { units: {}, kings: {}, pawns: {}, bishops: {} };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    {
      for (let STARTPOS in UNITLAYERS.units) {
        let allowedsteps = UNITLAYERS[(UNITLAYERS.units[STARTPOS] || {}).group];
        for (let DIR of [1, 2, 3, 4]) {
          let walkedsquares = [];
          let POS = "faux";
          connections.faux[DIR] = STARTPOS;
          while ((POS = connections[POS][DIR]) && allowedsteps[POS]) {
            walkedsquares.push(POS);
          }
          let WALKLENGTH = walkedsquares.length;
          for (let walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
            POS = walkedsquares[walkstepper];
            if (WALKLENGTH > 2) {
              ARTIFACTS.line[POS] = emptyObj;
            }
          }
        }
      }
    }
    if (Object.keys(ARTIFACTS.line).length !== 0) {
      LINKS.endGame = "win";
      LINKS.endedBy = "madeline";
      LINKS.endMarks = Object.keys(ARTIFACTS.line);
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
  game.instruction.deploy2 = () => defaultInstruction(2);
  game.action.promote2 = step => {
    let LINKS = { marks: {}, commands: {} };
    let ARTIFACTS = {
      line: {}
    };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let MARKS = step.MARKS;
    {
      let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
      if (unitid) {
        UNITDATA[unitid] = {
          ...UNITDATA[unitid],
          group: UNITLAYERS.pawns[MARKS.selectunit] ? "bishops" : "kings"
        };
      }
    }
    UNITLAYERS = { units: {}, kings: {}, pawns: {}, bishops: {} };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    {
      for (let STARTPOS in UNITLAYERS.units) {
        let allowedsteps = UNITLAYERS[(UNITLAYERS.units[STARTPOS] || {}).group];
        for (let DIR of [1, 2, 3, 4]) {
          let walkedsquares = [];
          let POS = "faux";
          connections.faux[DIR] = STARTPOS;
          while ((POS = connections[POS][DIR]) && allowedsteps[POS]) {
            walkedsquares.push(POS);
          }
          let WALKLENGTH = walkedsquares.length;
          for (let walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
            POS = walkedsquares[walkstepper];
            if (WALKLENGTH > 2) {
              ARTIFACTS.line[POS] = emptyObj;
            }
          }
        }
      }
    }
    if (Object.keys(ARTIFACTS.line).length !== 0) {
      LINKS.endGame = "win";
      LINKS.endedBy = "madeline";
      LINKS.endMarks = Object.keys(ARTIFACTS.line);
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
      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.promote2 = () => defaultInstruction(2);
  game.action.selectdeploytarget2 = (step, newMarkPos) => {
    let LINKS = { marks: {}, commands: {} };
    LINKS.commands.deploy = "deploy2";
    return {
      LINKS,
      ARTIFACTS: step.ARTIFACTS,
      UNITLAYERS: step.UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS: { selectdeploytarget: newMarkPos },
      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.selectdeploytarget2 = step => {
    let MARKS = step.MARKS;
    return collapseContent({
      line: [
        { text: "Press" },
        { command: "deploy" },
        { text: "to spawn" },
        { unit: ["pawn", 0, MARKS.selectdeploytarget] }
      ]
    });
  };
  game.action.selectunit2 = (step, newMarkPos) => {
    let LINKS = { marks: {}, commands: {} };
    LINKS.commands.promote = "promote2";
    return {
      LINKS,
      ARTIFACTS: step.ARTIFACTS,
      UNITLAYERS: step.UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS: { selectunit: newMarkPos },
      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.selectunit2 = step => {
    let MARKS = step.MARKS;
    let UNITLAYERS = step.UNITLAYERS;
    return collapseContent({
      line: [
        { text: "Press" },
        { command: "promote" },
        { text: "to turn" },
        {
          unit: [
            iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
            (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
            MARKS.selectunit
          ]
        },
        { text: "into" },
        UNITLAYERS.pawns[MARKS.selectunit]
          ? { unittype: ["bishop", 0] }
          : { unittype: ["king", 0] }
      ]
    });
  };
}
export default game;
