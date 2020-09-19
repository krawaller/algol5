import {
  offsetPos,
  whoWins,
  boardConnections,
  makeRelativeDirs,
  setup2army,
  coords2pos,
  boardLayers,
  terrainLayers,
  collapseContent,
  defaultInstruction,
  roseDirs,
  orthoDirs,
  diagDirs,
  knightDirs,
  jumpTwoDirs,
  ringTwoDirs
} from "../../common";
import boards from "../../games/definitions/ambivalente/boards";
import setups from "../../games/definitions/ambivalente/setups";
import variants from "../../games/definitions/ambivalente/variants";
const emptyObj = {};
const iconMapping = { pawns: "pawn" };
let TERRAIN1, TERRAIN2, connections, relativeDirs, BOARD, dimensions;
const groupLayers1 = {
  pawns: [
    ["units", "pawns"],
    ["units", "myunits", "pawns"],
    ["units", "oppunits", "pawns"]
  ]
};
const groupLayers2 = {
  pawns: [
    ["units", "pawns"],
    ["units", "oppunits", "pawns"],
    ["units", "myunits", "pawns"]
  ]
};
const prefixes1 = ["neutral", "my", "opp"];
const prefixes2 = ["neutral", "opp", "my"];
const emptyArtifactLayers_basic = { touchedfoes: {}, victims: {} };
const game = {
  gameId: "ambivalente",
  commands: { drop: {} },
  iconMap: iconMapping,
  setBoard: board => {
    TERRAIN1 = terrainLayers(board.height, board.width, board.terrain, 1);
    TERRAIN2 = terrainLayers(board.height, board.width, board.terrain, 2);
    dimensions = { height: board.height, width: board.width };
    BOARD = boardLayers(dimensions);
    connections = boardConnections(board);
    relativeDirs = makeRelativeDirs(board);
  },
  newBattle: (setup, ruleset) => {
    let UNITDATA = setup2army(setup);
    let UNITLAYERS = { units: {}, myunits: {}, oppunits: {}, pawns: {} };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers2[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    return game.action[`startTurn_${ruleset}_1`]({
      NEXTSPAWNID: 1,
      TURN: 0,
      UNITDATA,
      UNITLAYERS
    });
  },
  action: {
    startTurn_basic_1: step => {
      const oldUnitLayers = step.UNITLAYERS;
      let UNITLAYERS = {
        units: oldUnitLayers.units,
        myunits: oldUnitLayers.oppunits,
        oppunits: oldUnitLayers.myunits,
        pawns: oldUnitLayers.pawns
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      for (const pos of Object.keys(
        Object.keys(BOARD.board)
          .filter(k => !UNITLAYERS.units.hasOwnProperty(k))
          .reduce((m, k) => {
            m[k] = emptyObj;
            return m;
          }, {})
      )) {
        LINKS.marks[pos] = "selectdroptarget_basic_1";
      }
      return {
        UNITDATA: step.UNITDATA,
        LINKS,
        UNITLAYERS,
        ARTIFACTS: emptyArtifactLayers_basic,
        MARKS: {},
        TURN: step.TURN + 1,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    startTurn_basic_2: step => {
      const oldUnitLayers = step.UNITLAYERS;
      let UNITLAYERS = {
        units: oldUnitLayers.units,
        myunits: oldUnitLayers.oppunits,
        oppunits: oldUnitLayers.myunits,
        pawns: oldUnitLayers.pawns
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      for (const pos of Object.keys(
        Object.keys(BOARD.board)
          .filter(k => !UNITLAYERS.units.hasOwnProperty(k))
          .reduce((m, k) => {
            m[k] = emptyObj;
            return m;
          }, {})
      )) {
        LINKS.marks[pos] = "selectdroptarget_basic_2";
      }
      return {
        UNITDATA: step.UNITDATA,
        LINKS,
        UNITLAYERS,
        ARTIFACTS: emptyArtifactLayers_basic,
        MARKS: {},
        TURN: step.TURN,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    selectdroptarget_basic_1: (step, newMarkPos) => {
      let ARTIFACTS = {
        touchedfoes: {},
        victims: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectdroptarget: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let startconnections = connections[MARKS.selectdroptarget];
        for (let DIR of roseDirs) {
          let POS = startconnections[DIR];
          if (POS && UNITLAYERS.oppunits[POS]) {
            ARTIFACTS.touchedfoes[POS] = { dir: DIR };
          }
        }
      }
      for (let STARTPOS in ARTIFACTS.touchedfoes) {
        let POS =
          connections[STARTPOS][
            relativeDirs["d5f2r0"][(ARTIFACTS.touchedfoes[STARTPOS] || {}).dir]
          ];
        if (POS && UNITLAYERS.oppunits[POS]) {
          ARTIFACTS.victims[POS] = emptyObj;
        }
      }
      for (let STARTPOS in ARTIFACTS.touchedfoes) {
        let NEIGHBOURCOUNT;
        let POS =
          connections[STARTPOS][(ARTIFACTS.touchedfoes[STARTPOS] || {}).dir];
        if (POS && UNITLAYERS.myunits[POS]) {
          NEIGHBOURCOUNT = 1;
        }
        if (!!NEIGHBOURCOUNT) {
          ARTIFACTS.victims[STARTPOS] = emptyObj;
        }
      }
      if (TERRAIN1.corners[MARKS.selectdroptarget]) {
        {
          let foundneighbours = [];
          let startconnections = connections[MARKS.selectdroptarget];
          for (let DIR of orthoDirs) {
            let POS = startconnections[DIR];
            if (POS && UNITLAYERS.oppunits[POS]) {
              foundneighbours.push(POS);
            }
          }
          let NEIGHBOURCOUNT = foundneighbours.length;
          for (
            let neighbournbr = 0;
            neighbournbr < NEIGHBOURCOUNT;
            neighbournbr++
          ) {
            let POS = foundneighbours[neighbournbr];
            if (NEIGHBOURCOUNT === 2) {
              ARTIFACTS.victims[POS] = emptyObj;
            }
          }
        }
      }
      for (let STARTPOS in Object.entries(
        Object.keys(TERRAIN1.corners)
          .concat(Object.keys(UNITLAYERS.oppunits))
          .reduce((mem, k) => {
            mem[k] = (mem[k] || 0) + 1;
            return mem;
          }, {})
      )
        .filter(([key, n]) => n === 2)
        .reduce((mem, [key]) => {
          mem[key] = emptyObj;
          return mem;
        }, {})) {
        let foundneighbours = [];
        let startconnections = connections[STARTPOS];
        for (let DIR of orthoDirs) {
          let POS = startconnections[DIR];
          if (
            POS &&
            { ...UNITLAYERS.myunits, ...{ [MARKS.selectdroptarget]: 1 } }[POS]
          ) {
            foundneighbours.push(POS);
          }
        }
        let NEIGHBOURCOUNT = foundneighbours.length;
        if (2 === NEIGHBOURCOUNT) {
          ARTIFACTS.victims[STARTPOS] = emptyObj;
        }
      }
      LINKS.commands.drop = "drop_basic_1";
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS,
        NEXTSPAWNID: step.NEXTSPAWNID,
        canAlwaysEnd: true
      };
    },
    selectdroptarget_basic_2: (step, newMarkPos) => {
      let ARTIFACTS = {
        touchedfoes: {},
        victims: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectdroptarget: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let startconnections = connections[MARKS.selectdroptarget];
        for (let DIR of roseDirs) {
          let POS = startconnections[DIR];
          if (POS && UNITLAYERS.oppunits[POS]) {
            ARTIFACTS.touchedfoes[POS] = { dir: DIR };
          }
        }
      }
      for (let STARTPOS in ARTIFACTS.touchedfoes) {
        let POS =
          connections[STARTPOS][
            relativeDirs["d5f2r0"][(ARTIFACTS.touchedfoes[STARTPOS] || {}).dir]
          ];
        if (POS && UNITLAYERS.oppunits[POS]) {
          ARTIFACTS.victims[POS] = emptyObj;
        }
      }
      for (let STARTPOS in ARTIFACTS.touchedfoes) {
        let NEIGHBOURCOUNT;
        let POS =
          connections[STARTPOS][(ARTIFACTS.touchedfoes[STARTPOS] || {}).dir];
        if (POS && UNITLAYERS.myunits[POS]) {
          NEIGHBOURCOUNT = 1;
        }
        if (!!NEIGHBOURCOUNT) {
          ARTIFACTS.victims[STARTPOS] = emptyObj;
        }
      }
      if (TERRAIN2.corners[MARKS.selectdroptarget]) {
        {
          let foundneighbours = [];
          let startconnections = connections[MARKS.selectdroptarget];
          for (let DIR of orthoDirs) {
            let POS = startconnections[DIR];
            if (POS && UNITLAYERS.oppunits[POS]) {
              foundneighbours.push(POS);
            }
          }
          let NEIGHBOURCOUNT = foundneighbours.length;
          for (
            let neighbournbr = 0;
            neighbournbr < NEIGHBOURCOUNT;
            neighbournbr++
          ) {
            let POS = foundneighbours[neighbournbr];
            if (NEIGHBOURCOUNT === 2) {
              ARTIFACTS.victims[POS] = emptyObj;
            }
          }
        }
      }
      for (let STARTPOS in Object.entries(
        Object.keys(TERRAIN2.corners)
          .concat(Object.keys(UNITLAYERS.oppunits))
          .reduce((mem, k) => {
            mem[k] = (mem[k] || 0) + 1;
            return mem;
          }, {})
      )
        .filter(([key, n]) => n === 2)
        .reduce((mem, [key]) => {
          mem[key] = emptyObj;
          return mem;
        }, {})) {
        let foundneighbours = [];
        let startconnections = connections[STARTPOS];
        for (let DIR of orthoDirs) {
          let POS = startconnections[DIR];
          if (
            POS &&
            { ...UNITLAYERS.myunits, ...{ [MARKS.selectdroptarget]: 1 } }[POS]
          ) {
            foundneighbours.push(POS);
          }
        }
        let NEIGHBOURCOUNT = foundneighbours.length;
        if (2 === NEIGHBOURCOUNT) {
          ARTIFACTS.victims[STARTPOS] = emptyObj;
        }
      }
      LINKS.commands.drop = "drop_basic_2";
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS,
        NEXTSPAWNID: step.NEXTSPAWNID,
        canAlwaysEnd: true
      };
    },
    drop_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        touchedfoes: step.ARTIFACTS.touchedfoes,
        victims: step.ARTIFACTS.victims
      };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let NEXTSPAWNID = step.NEXTSPAWNID;
      let MARKS = step.MARKS;
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: MARKS.selectdroptarget,
          id: newunitid,
          group: "pawns",
          owner: 1
        };
      }
      for (let LOOPPOS in ARTIFACTS.victims) {
        {
          let unitid = (UNITLAYERS.units[LOOPPOS] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              owner: 0
            };
          }
        }
      }
      UNITLAYERS = { units: {}, myunits: {}, oppunits: {}, pawns: {} };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (Object.keys(UNITLAYERS.units).length === 36) {
        LINKS.endGame = ["draw", "win", "lose"][
          whoWins(
            Object.keys(UNITLAYERS.myunits).length,
            Object.keys(UNITLAYERS.oppunits).length
          )
        ];
        LINKS.endedBy = "filledboard";
        LINKS.endMarks = Object.keys(
          [emptyObj, UNITLAYERS.myunits, UNITLAYERS.oppunits][
            whoWins(
              Object.keys(UNITLAYERS.myunits).length,
              Object.keys(UNITLAYERS.oppunits).length
            )
          ]
        );
      } else {
        LINKS.endTurn = "startTurn_basic_2";
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
    drop_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        touchedfoes: step.ARTIFACTS.touchedfoes,
        victims: step.ARTIFACTS.victims
      };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let NEXTSPAWNID = step.NEXTSPAWNID;
      let MARKS = step.MARKS;
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: MARKS.selectdroptarget,
          id: newunitid,
          group: "pawns",
          owner: 2
        };
      }
      for (let LOOPPOS in ARTIFACTS.victims) {
        {
          let unitid = (UNITLAYERS.units[LOOPPOS] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              owner: 0
            };
          }
        }
      }
      UNITLAYERS = { units: {}, myunits: {}, oppunits: {}, pawns: {} };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (Object.keys(UNITLAYERS.units).length === 36) {
        LINKS.endGame = ["draw", "lose", "win"][
          whoWins(
            Object.keys(UNITLAYERS.oppunits).length,
            Object.keys(UNITLAYERS.myunits).length
          )
        ];
        LINKS.endedBy = "filledboard";
        LINKS.endMarks = Object.keys(
          [emptyObj, UNITLAYERS.myunits, UNITLAYERS.oppunits][
            whoWins(
              Object.keys(UNITLAYERS.myunits).length,
              Object.keys(UNITLAYERS.oppunits).length
            )
          ]
        );
      } else {
        LINKS.endTurn = "startTurn_basic_1";
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
    }
  },
  instruction: {
    startTurn_basic_1: step => {
      return collapseContent({
        line: [
          { text: "Select an empty square to drop a" },
          { unittype: ["pawn", 1] }
        ]
      });
    },
    drop_basic_1: () => defaultInstruction(1),
    selectdroptarget_basic_1: step => {
      let ARTIFACTS = step.ARTIFACTS;
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "drop" },
          { text: "to spawn" },
          { unit: ["pawn", 1, MARKS.selectdroptarget] },
          Object.keys(ARTIFACTS.victims).length !== 0
            ? collapseContent({
                line: [
                  { text: "and turn" },
                  collapseContent({
                    line: Object.keys(ARTIFACTS.victims)
                      .filter(p => UNITLAYERS.units[p])
                      .map(p => ({
                        unit: [
                          iconMapping[UNITLAYERS.units[p].group],
                          UNITLAYERS.units[p].owner,
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
                  { unittype: ["pawn", 0] }
                ]
              })
            : undefined
        ]
      });
    },
    startTurn_basic_2: step => {
      return collapseContent({
        line: [
          { text: "Select an empty square to drop a" },
          { unittype: ["pawn", 2] }
        ]
      });
    },
    drop_basic_2: () => defaultInstruction(2),
    selectdroptarget_basic_2: step => {
      let ARTIFACTS = step.ARTIFACTS;
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "drop" },
          { text: "to spawn" },
          { unit: ["pawn", 2, MARKS.selectdroptarget] },
          Object.keys(ARTIFACTS.victims).length !== 0
            ? collapseContent({
                line: [
                  { text: "and turn" },
                  collapseContent({
                    line: Object.keys(ARTIFACTS.victims)
                      .filter(p => UNITLAYERS.units[p])
                      .map(p => ({
                        unit: [
                          iconMapping[UNITLAYERS.units[p].group],
                          UNITLAYERS.units[p].owner,
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
                  { unittype: ["pawn", 0] }
                ]
              })
            : undefined
        ]
      });
    }
  },
  variants,
  boards,
  setups
};
export default game;
