import {
  offsetPos,
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
import boards from "../../games/definitions/orthokon/boards";
import setups from "../../games/definitions/orthokon/setups";
import variants from "../../games/definitions/orthokon/variants";
const emptyObj = {};
const iconMapping = { soldiers: "pawn" };
let TERRAIN1, TERRAIN2, connections, relativeDirs, BOARD, dimensions;
const groupLayers1 = {
  soldiers: [["units"], ["units", "myunits"], ["units", "oppunits"]]
};
const groupLayers2 = {
  soldiers: [["units"], ["units", "oppunits"], ["units", "myunits"]]
};
const prefixes1 = ["neutral", "my", "opp"];
const prefixes2 = ["neutral", "opp", "my"];
const emptyArtifactLayers_basic = { victims: {}, slidetargets: {} };
const game = {
  gameId: "orthokon",
  commands: { slide: {} },
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
    let UNITLAYERS = { units: {}, myunits: {}, oppunits: {} };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers2[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    return game.action[`startTurn_${ruleset}_1`]({
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
        oppunits: oldUnitLayers.myunits
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      for (const pos of Object.keys(UNITLAYERS.myunits)) {
        LINKS.marks[pos] = "selectunit_basic_1";
      }
      return {
        UNITDATA: step.UNITDATA,
        LINKS,
        UNITLAYERS,
        ARTIFACTS: emptyArtifactLayers_basic,
        MARKS: {},
        TURN: step.TURN + 1
      };
    },
    startTurn_basic_2: step => {
      const oldUnitLayers = step.UNITLAYERS;
      let UNITLAYERS = {
        units: oldUnitLayers.units,
        myunits: oldUnitLayers.oppunits,
        oppunits: oldUnitLayers.myunits
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      for (const pos of Object.keys(UNITLAYERS.myunits)) {
        LINKS.marks[pos] = "selectunit_basic_2";
      }
      return {
        UNITDATA: step.UNITDATA,
        LINKS,
        UNITLAYERS,
        ARTIFACTS: emptyArtifactLayers_basic,
        MARKS: {},
        TURN: step.TURN
      };
    },
    selectunit_basic_1: (step, newMarkPos) => {
      let ARTIFACTS = {
        slidetargets: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let BLOCKS = UNITLAYERS.units;
        for (let DIR of roseDirs) {
          let walkedsquares = [];
          let POS = MARKS.selectunit;
          while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
            walkedsquares.push(POS);
          }
          let WALKLENGTH = walkedsquares.length;
          if (WALKLENGTH) {
            ARTIFACTS.slidetargets[walkedsquares[WALKLENGTH - 1]] = emptyObj;
          }
        }
      }
      for (const pos of Object.keys(ARTIFACTS.slidetargets)) {
        LINKS.marks[pos] = "selectslidetarget_basic_1";
      }
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS
      };
    },
    selectslidetarget_basic_1: (step, newMarkPos) => {
      let ARTIFACTS = {
        slidetargets: step.ARTIFACTS.slidetargets,
        victims: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: step.MARKS.selectunit,
        selectslidetarget: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let startconnections = connections[MARKS.selectslidetarget];
        for (let DIR of orthoDirs) {
          let POS = startconnections[DIR];
          if (POS && UNITLAYERS.oppunits[POS]) {
            ARTIFACTS.victims[POS] = emptyObj;
          }
        }
      }
      LINKS.commands.slide = "slide_basic_1";
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS
      };
    },
    selectunit_basic_2: (step, newMarkPos) => {
      let ARTIFACTS = {
        slidetargets: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let BLOCKS = UNITLAYERS.units;
        for (let DIR of roseDirs) {
          let walkedsquares = [];
          let POS = MARKS.selectunit;
          while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
            walkedsquares.push(POS);
          }
          let WALKLENGTH = walkedsquares.length;
          if (WALKLENGTH) {
            ARTIFACTS.slidetargets[walkedsquares[WALKLENGTH - 1]] = emptyObj;
          }
        }
      }
      for (const pos of Object.keys(ARTIFACTS.slidetargets)) {
        LINKS.marks[pos] = "selectslidetarget_basic_2";
      }
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS
      };
    },
    selectslidetarget_basic_2: (step, newMarkPos) => {
      let ARTIFACTS = {
        slidetargets: step.ARTIFACTS.slidetargets,
        victims: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: step.MARKS.selectunit,
        selectslidetarget: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let startconnections = connections[MARKS.selectslidetarget];
        for (let DIR of orthoDirs) {
          let POS = startconnections[DIR];
          if (POS && UNITLAYERS.oppunits[POS]) {
            ARTIFACTS.victims[POS] = emptyObj;
          }
        }
      }
      LINKS.commands.slide = "slide_basic_2";
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS
      };
    },
    slide_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        slidetargets: step.ARTIFACTS.slidetargets,
        victims: step.ARTIFACTS.victims
      };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      {
        let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: MARKS.selectslidetarget
          };
        }
      }
      for (let LOOPPOS in ARTIFACTS.victims) {
        {
          let unitid = (UNITLAYERS.units[LOOPPOS] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              owner: 1
            };
          }
        }
      }
      UNITLAYERS = { units: {}, myunits: {}, oppunits: {} };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      {
        LINKS.endTurn = "startTurn_basic_2";
      }
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS
      };
    },
    slide_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        slidetargets: step.ARTIFACTS.slidetargets,
        victims: step.ARTIFACTS.victims
      };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      {
        let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: MARKS.selectslidetarget
          };
        }
      }
      for (let LOOPPOS in ARTIFACTS.victims) {
        {
          let unitid = (UNITLAYERS.units[LOOPPOS] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              owner: 2
            };
          }
        }
      }
      UNITLAYERS = { units: {}, myunits: {}, oppunits: {} };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      {
        LINKS.endTurn = "startTurn_basic_1";
      }
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS
      };
    }
  },
  instruction: {
    startTurn_basic_1: step => {
      return collapseContent({
        line: [
          { select: "Select" },
          { text: "which" },
          { unittype: ["pawn", 1] },
          { text: "to slide" }
        ]
      });
    },
    slide_basic_1: () => defaultInstruction(1),
    selectunit_basic_1: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { select: "Select" },
          { text: "where to slide" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
              MARKS.selectunit
            ]
          }
        ]
      });
    },
    selectslidetarget_basic_1: step => {
      let ARTIFACTS = step.ARTIFACTS;
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "slide" },
          { text: "to make" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
              MARKS.selectunit
            ]
          },
          { text: "go to" },
          { pos: MARKS.selectslidetarget },
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
                  { unittype: ["pawn", 1] }
                ]
              })
            : undefined
        ]
      });
    },
    startTurn_basic_2: step => {
      return collapseContent({
        line: [
          { select: "Select" },
          { text: "which" },
          { unittype: ["pawn", 2] },
          { text: "to slide" }
        ]
      });
    },
    slide_basic_2: () => defaultInstruction(2),
    selectunit_basic_2: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { select: "Select" },
          { text: "where to slide" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
              MARKS.selectunit
            ]
          }
        ]
      });
    },
    selectslidetarget_basic_2: step => {
      let ARTIFACTS = step.ARTIFACTS;
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "slide" },
          { text: "to make" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
              MARKS.selectunit
            ]
          },
          { text: "go to" },
          { pos: MARKS.selectslidetarget },
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
                  { unittype: ["pawn", 2] }
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
