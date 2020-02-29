import {
  offsetPos,
  boardConnections,
  makeRelativeDirs,
  setup2army,
  boardLayers,
  terrainLayers,
  collapseContent,
  defaultInstruction,
  roseDirs,
  orthoDirs,
  diagDirs,
  knightDirs
} from "../../common";
const emptyObj = {};
const dimensions = { height: 3, width: 4 };
const BOARD = boardLayers(dimensions);
const iconMapping = { kings: "king", pawns: "pawn", bishops: "bishop" };
const emptyArtifactLayers = { line: {} };
const connections = boardConnections({ height: 3, width: 4 });
const relativeDirs = makeRelativeDirs([]);
let TERRAIN1;
let TERRAIN2;
const groupLayers1 = {
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
const groupLayers2 = {
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
const game = {
  gameId: "trafficlights",
  commands: { deploy: {}, promote: {} },
  iconMap: iconMapping,
  newBattle: setup => {
    let UNITDATA = setup2army(setup);
    let UNITLAYERS = { units: {}, kings: {}, pawns: {}, bishops: {} };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers2[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    let terrain = {};
    TERRAIN1 = terrainLayers(3, 4, terrain, 1);
    TERRAIN2 = terrainLayers(3, 4, terrain, 2);
    return game.action.startTurn1({
      NEXTSPAWNID: 1,
      TURN: 0,
      UNITDATA,
      UNITLAYERS
    });
  },
  action: {
    startTurn1: step => {
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
    },
    startTurn2: step => {
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
    },
    selectdeploytarget1: (step, newMarkPos) => {
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
    },
    selectunit1: (step, newMarkPos) => {
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
    },
    selectdeploytarget2: (step, newMarkPos) => {
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
    },
    selectunit2: (step, newMarkPos) => {
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
    },
    deploy1: step => {
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
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      {
        for (let STARTPOS in UNITLAYERS.units) {
          let allowedsteps =
            UNITLAYERS[(UNITLAYERS.units[STARTPOS] || {}).group];
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
    },
    promote1: step => {
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
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      {
        for (let STARTPOS in UNITLAYERS.units) {
          let allowedsteps =
            UNITLAYERS[(UNITLAYERS.units[STARTPOS] || {}).group];
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
    },
    deploy2: step => {
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
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      {
        for (let STARTPOS in UNITLAYERS.units) {
          let allowedsteps =
            UNITLAYERS[(UNITLAYERS.units[STARTPOS] || {}).group];
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
    },
    promote2: step => {
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
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      {
        for (let STARTPOS in UNITLAYERS.units) {
          let allowedsteps =
            UNITLAYERS[(UNITLAYERS.units[STARTPOS] || {}).group];
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
    }
  },
  instruction: {
    startTurn1: step => {
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
    },
    deploy1: () => defaultInstruction(1),
    promote1: () => defaultInstruction(1),
    selectdeploytarget1: step => {
      let MARKS = step.MARKS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "deploy" },
          { text: "to spawn" },
          { unit: ["pawn", 0, MARKS.selectdeploytarget] }
        ]
      });
    },
    selectunit1: step => {
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
    },
    startTurn2: step => {
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
    },
    deploy2: () => defaultInstruction(2),
    promote2: () => defaultInstruction(2),
    selectdeploytarget2: step => {
      let MARKS = step.MARKS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "deploy" },
          { text: "to spawn" },
          { unit: ["pawn", 0, MARKS.selectdeploytarget] }
        ]
      });
    },
    selectunit2: step => {
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
    }
  }
};
export default game;
