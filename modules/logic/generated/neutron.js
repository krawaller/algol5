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
  knightDirs,
  jumpTwoDirs,
  ringTwoDirs
} from "../../common";
const emptyObj = {};
const iconMapping = { soldiers: "pawn" };
let TERRAIN1, TERRAIN2, connections, relativeDirs, BOARD, dimensions;
const groupLayers1 = {
  soldiers: [
    ["units", "neutralunits", "neutralsoldiers"],
    ["units", "myunits"],
    ["units", "oppunits"]
  ]
};
const groupLayers2 = {
  soldiers: [
    ["units", "neutralunits", "neutralsoldiers"],
    ["units", "oppunits"],
    ["units", "myunits"]
  ]
};
const emptyArtifactLayers_basic = {
  singleneutrontargets: {},
  firstneutrontargets: {},
  secondneutrontargets: {},
  mytargets: {}
};
const emptyArtifactLayers_paperneutron = {
  singleneutrontargets: {},
  firstneutrontargets: {},
  secondneutrontargets: {},
  mytargets: {}
};
const game = {
  gameId: "neutron",
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
    let UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {},
      neutralsoldiers: {}
    };
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
      let ARTIFACTS = {
        singleneutrontargets: {}
      };
      const oldUnitLayers = step.UNITLAYERS;
      let UNITLAYERS = {
        units: oldUnitLayers.units,
        myunits: oldUnitLayers.oppunits,
        oppunits: oldUnitLayers.myunits,
        neutralunits: oldUnitLayers.neutralunits,
        neutralsoldiers: oldUnitLayers.neutralsoldiers
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      let TURN = step.TURN + 1;
      {
        let BLOCKS = UNITLAYERS.units;
        for (let DIR of roseDirs) {
          let walkedsquares = [];
          let POS = Object.keys(UNITLAYERS.neutralunits)[0];
          while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
            walkedsquares.push(POS);
          }
          let WALKLENGTH = walkedsquares.length;
          if (WALKLENGTH) {
            ARTIFACTS.singleneutrontargets[
              walkedsquares[WALKLENGTH - 1]
            ] = emptyObj;
          }
        }
      }
      if (TURN === 1) {
        for (const pos of Object.keys(UNITLAYERS.myunits)) {
          LINKS.marks[pos] = "selectunit_basic_1";
        }
      } else {
        for (const pos of Object.keys(ARTIFACTS.singleneutrontargets)) {
          LINKS.marks[pos] = "selectsingleneutrontarget_basic_1";
        }
      }
      return {
        UNITDATA: step.UNITDATA,
        LINKS,
        UNITLAYERS,
        ARTIFACTS,
        MARKS: {},
        TURN,
        TURNVARS: {}
      };
    },
    startTurn_basic_2: step => {
      let ARTIFACTS = {
        singleneutrontargets: {}
      };
      const oldUnitLayers = step.UNITLAYERS;
      let UNITLAYERS = {
        units: oldUnitLayers.units,
        myunits: oldUnitLayers.oppunits,
        oppunits: oldUnitLayers.myunits,
        neutralunits: oldUnitLayers.neutralunits,
        neutralsoldiers: oldUnitLayers.neutralsoldiers
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      {
        let BLOCKS = UNITLAYERS.units;
        for (let DIR of roseDirs) {
          let walkedsquares = [];
          let POS = Object.keys(UNITLAYERS.neutralunits)[0];
          while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
            walkedsquares.push(POS);
          }
          let WALKLENGTH = walkedsquares.length;
          if (WALKLENGTH) {
            ARTIFACTS.singleneutrontargets[
              walkedsquares[WALKLENGTH - 1]
            ] = emptyObj;
          }
        }
      }
      for (const pos of Object.keys(ARTIFACTS.singleneutrontargets)) {
        LINKS.marks[pos] = "selectsingleneutrontarget_basic_2";
      }
      return {
        UNITDATA: step.UNITDATA,
        LINKS,
        UNITLAYERS,
        ARTIFACTS,
        MARKS: {},
        TURN: step.TURN,
        TURNVARS: {}
      };
    },
    startTurn_paperneutron_1: step => {
      const oldUnitLayers = step.UNITLAYERS;
      let UNITLAYERS = {
        units: oldUnitLayers.units,
        myunits: oldUnitLayers.oppunits,
        oppunits: oldUnitLayers.myunits,
        neutralunits: oldUnitLayers.neutralunits,
        neutralsoldiers: oldUnitLayers.neutralsoldiers
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      let TURN = step.TURN + 1;
      if (TURN === 1) {
        for (const pos of Object.keys(UNITLAYERS.myunits)) {
          LINKS.marks[pos] = "selectunit_paperneutron_1";
        }
      } else {
        for (const pos of Object.keys(UNITLAYERS.neutralunits)) {
          LINKS.marks[pos] = "selectfirstneutron_paperneutron_1";
        }
      }
      return {
        UNITDATA: step.UNITDATA,
        LINKS,
        UNITLAYERS,
        ARTIFACTS: emptyArtifactLayers_paperneutron,
        MARKS: {},
        TURN,
        TURNVARS: {}
      };
    },
    startTurn_paperneutron_2: step => {
      const oldUnitLayers = step.UNITLAYERS;
      let UNITLAYERS = {
        units: oldUnitLayers.units,
        myunits: oldUnitLayers.oppunits,
        oppunits: oldUnitLayers.myunits,
        neutralunits: oldUnitLayers.neutralunits,
        neutralsoldiers: oldUnitLayers.neutralsoldiers
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      for (const pos of Object.keys(UNITLAYERS.neutralunits)) {
        LINKS.marks[pos] = "selectfirstneutron_paperneutron_2";
      }
      return {
        UNITDATA: step.UNITDATA,
        LINKS,
        UNITLAYERS,
        ARTIFACTS: emptyArtifactLayers_paperneutron,
        MARKS: {},
        TURN: step.TURN,
        TURNVARS: {}
      };
    },
    selectunit_basic_1: (step, newMarkPos) => {
      let ARTIFACTS = {
        singleneutrontargets: step.ARTIFACTS.singleneutrontargets,
        mytargets: {}
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
            ARTIFACTS.mytargets[walkedsquares[WALKLENGTH - 1]] = emptyObj;
          }
        }
      }
      for (const pos of Object.keys(ARTIFACTS.mytargets)) {
        LINKS.marks[pos] = "selectmytarget_basic_1";
      }
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS,
        TURNVARS: step.TURNVARS
      };
    },
    selectmytarget_basic_1: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.slide = "slide_basic_1";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: {
          selectunit: step.MARKS.selectunit,
          selectmytarget: newMarkPos
        },
        TURNVARS: step.TURNVARS
      };
    },
    selectsingleneutrontarget_basic_1: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.slide = "slide_basic_1";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: { selectsingleneutrontarget: newMarkPos },
        TURNVARS: step.TURNVARS
      };
    },
    selectunit_basic_2: (step, newMarkPos) => {
      let ARTIFACTS = {
        singleneutrontargets: step.ARTIFACTS.singleneutrontargets,
        mytargets: {}
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
            ARTIFACTS.mytargets[walkedsquares[WALKLENGTH - 1]] = emptyObj;
          }
        }
      }
      for (const pos of Object.keys(ARTIFACTS.mytargets)) {
        LINKS.marks[pos] = "selectmytarget_basic_2";
      }
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS,
        TURNVARS: step.TURNVARS
      };
    },
    selectmytarget_basic_2: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.slide = "slide_basic_2";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: {
          selectunit: step.MARKS.selectunit,
          selectmytarget: newMarkPos
        },
        TURNVARS: step.TURNVARS
      };
    },
    selectsingleneutrontarget_basic_2: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.slide = "slide_basic_2";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: { selectsingleneutrontarget: newMarkPos },
        TURNVARS: step.TURNVARS
      };
    },
    selectunit_paperneutron_1: (step, newMarkPos) => {
      let ARTIFACTS = {
        mytargets: {}
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
            ARTIFACTS.mytargets[walkedsquares[WALKLENGTH - 1]] = emptyObj;
          }
        }
      }
      for (const pos of Object.keys(ARTIFACTS.mytargets)) {
        LINKS.marks[pos] = "selectmytarget_paperneutron_1";
      }
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS,
        TURNVARS: step.TURNVARS
      };
    },
    selectmytarget_paperneutron_1: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.slide = "slide_paperneutron_1";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: {
          selectunit: step.MARKS.selectunit,
          selectmytarget: newMarkPos
        },
        TURNVARS: step.TURNVARS
      };
    },
    selectfirstneutron_paperneutron_1: (step, newMarkPos) => {
      let ARTIFACTS = {
        firstneutrontargets: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectfirstneutron: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let BLOCKS = UNITLAYERS.units;
        for (let DIR of roseDirs) {
          let walkedsquares = [];
          let POS = MARKS.selectfirstneutron;
          while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
            walkedsquares.push(POS);
          }
          let WALKLENGTH = walkedsquares.length;
          if (WALKLENGTH) {
            ARTIFACTS.firstneutrontargets[
              walkedsquares[WALKLENGTH - 1]
            ] = emptyObj;
          }
        }
      }
      for (const pos of Object.keys(ARTIFACTS.firstneutrontargets)) {
        LINKS.marks[pos] = "selectfirstneutrontarget_paperneutron_1";
      }
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS,
        TURNVARS: step.TURNVARS
      };
    },
    selectfirstneutrontarget_paperneutron_1: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.slide = "slide_paperneutron_1";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: {
          selectfirstneutron: step.MARKS.selectfirstneutron,
          selectfirstneutrontarget: newMarkPos
        },
        TURNVARS: step.TURNVARS
      };
    },
    selectsecondneutrontarget_paperneutron_1: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.slide = "slide_paperneutron_1";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: { selectsecondneutrontarget: newMarkPos },
        TURNVARS: step.TURNVARS
      };
    },
    selectunit_paperneutron_2: (step, newMarkPos) => {
      let ARTIFACTS = {
        firstneutrontargets: step.ARTIFACTS.firstneutrontargets,
        secondneutrontargets: step.ARTIFACTS.secondneutrontargets,
        mytargets: {}
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
            ARTIFACTS.mytargets[walkedsquares[WALKLENGTH - 1]] = emptyObj;
          }
        }
      }
      for (const pos of Object.keys(ARTIFACTS.mytargets)) {
        LINKS.marks[pos] = "selectmytarget_paperneutron_2";
      }
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS,
        TURNVARS: step.TURNVARS
      };
    },
    selectmytarget_paperneutron_2: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.slide = "slide_paperneutron_2";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: {
          selectunit: step.MARKS.selectunit,
          selectmytarget: newMarkPos
        },
        TURNVARS: step.TURNVARS
      };
    },
    selectfirstneutron_paperneutron_2: (step, newMarkPos) => {
      let ARTIFACTS = {
        firstneutrontargets: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectfirstneutron: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let BLOCKS = UNITLAYERS.units;
        for (let DIR of roseDirs) {
          let walkedsquares = [];
          let POS = MARKS.selectfirstneutron;
          while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
            walkedsquares.push(POS);
          }
          let WALKLENGTH = walkedsquares.length;
          if (WALKLENGTH) {
            ARTIFACTS.firstneutrontargets[
              walkedsquares[WALKLENGTH - 1]
            ] = emptyObj;
          }
        }
      }
      for (const pos of Object.keys(ARTIFACTS.firstneutrontargets)) {
        LINKS.marks[pos] = "selectfirstneutrontarget_paperneutron_2";
      }
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS,
        TURNVARS: step.TURNVARS
      };
    },
    selectfirstneutrontarget_paperneutron_2: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.slide = "slide_paperneutron_2";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: {
          selectfirstneutron: step.MARKS.selectfirstneutron,
          selectfirstneutrontarget: newMarkPos
        },
        TURNVARS: step.TURNVARS
      };
    },
    selectsecondneutrontarget_paperneutron_2: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.slide = "slide_paperneutron_2";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: { selectsecondneutrontarget: newMarkPos },
        TURNVARS: step.TURNVARS
      };
    },
    slide_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let UNITLAYERS = step.UNITLAYERS;
      let TURNVARS = step.TURNVARS;
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      {
        let unitid = (
          UNITLAYERS.units[
            MARKS.selectunit ||
              TURNVARS["nextneutron"] ||
              MARKS.selectfirstneutron ||
              Object.keys(UNITLAYERS.neutralunits)[0]
          ] || {}
        ).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos:
              MARKS.selectmytarget ||
              MARKS.selectsecondneutrontarget ||
              MARKS.selectfirstneutrontarget ||
              MARKS.selectsingleneutrontarget
          };
        }
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        neutralunits: {},
        neutralsoldiers: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (!!MARKS.selectunit) {
        if (
          Object.keys(
            Object.entries(
              Object.keys(UNITLAYERS.neutralsoldiers)
                .concat(Object.keys(TERRAIN1.mybase))
                .reduce((mem, k) => {
                  mem[k] = (mem[k] || 0) + 1;
                  return mem;
                }, {})
            )
              .filter(([key, n]) => n === 2)
              .reduce((mem, [key]) => {
                mem[key] = emptyObj;
                return mem;
              }, {})
          ).length !== 0
        ) {
          LINKS.endGame = "win";
          LINKS.endedBy = "goal";
          LINKS.endMarks = Object.keys(
            Object.entries(
              Object.keys(TERRAIN1.mybase)
                .concat(Object.keys(UNITLAYERS.neutralsoldiers))
                .reduce((mem, k) => {
                  mem[k] = (mem[k] || 0) + 1;
                  return mem;
                }, {})
            )
              .filter(([key, n]) => n === 2)
              .reduce((mem, [key]) => {
                mem[key] = emptyObj;
                return mem;
              }, {})
          );
        } else if (
          Object.keys(
            Object.entries(
              Object.keys(UNITLAYERS.neutralsoldiers)
                .concat(Object.keys(TERRAIN1.oppbase))
                .reduce((mem, k) => {
                  mem[k] = (mem[k] || 0) + 1;
                  return mem;
                }, {})
            )
              .filter(([key, n]) => n === 2)
              .reduce((mem, [key]) => {
                mem[key] = emptyObj;
                return mem;
              }, {})
          ).length !== 0
        ) {
          LINKS.endGame = "lose";
          LINKS.endedBy = "suicide";
          LINKS.endMarks = Object.keys(
            Object.entries(
              Object.keys(TERRAIN1.oppbase)
                .concat(Object.keys(UNITLAYERS.neutralsoldiers))
                .reduce((mem, k) => {
                  mem[k] = (mem[k] || 0) + 1;
                  return mem;
                }, {})
            )
              .filter(([key, n]) => n === 2)
              .reduce((mem, [key]) => {
                mem[key] = emptyObj;
                return mem;
              }, {})
          );
        } else {
          LINKS.endTurn = "startTurn_basic_2";
        }
      } else {
        for (const pos of Object.keys(UNITLAYERS.myunits)) {
          LINKS.marks[pos] = "selectunit_basic_1";
        }
      }
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS: step.ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS,
        TURNVARS
      };
    },
    slide_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let UNITLAYERS = step.UNITLAYERS;
      let TURNVARS = step.TURNVARS;
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      {
        let unitid = (
          UNITLAYERS.units[
            MARKS.selectunit ||
              TURNVARS["nextneutron"] ||
              MARKS.selectfirstneutron ||
              Object.keys(UNITLAYERS.neutralunits)[0]
          ] || {}
        ).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos:
              MARKS.selectmytarget ||
              MARKS.selectsecondneutrontarget ||
              MARKS.selectfirstneutrontarget ||
              MARKS.selectsingleneutrontarget
          };
        }
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        neutralunits: {},
        neutralsoldiers: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (!!MARKS.selectunit) {
        if (
          Object.keys(
            Object.entries(
              Object.keys(UNITLAYERS.neutralsoldiers)
                .concat(Object.keys(TERRAIN2.mybase))
                .reduce((mem, k) => {
                  mem[k] = (mem[k] || 0) + 1;
                  return mem;
                }, {})
            )
              .filter(([key, n]) => n === 2)
              .reduce((mem, [key]) => {
                mem[key] = emptyObj;
                return mem;
              }, {})
          ).length !== 0
        ) {
          LINKS.endGame = "win";
          LINKS.endedBy = "goal";
          LINKS.endMarks = Object.keys(
            Object.entries(
              Object.keys(TERRAIN2.mybase)
                .concat(Object.keys(UNITLAYERS.neutralsoldiers))
                .reduce((mem, k) => {
                  mem[k] = (mem[k] || 0) + 1;
                  return mem;
                }, {})
            )
              .filter(([key, n]) => n === 2)
              .reduce((mem, [key]) => {
                mem[key] = emptyObj;
                return mem;
              }, {})
          );
        } else if (
          Object.keys(
            Object.entries(
              Object.keys(UNITLAYERS.neutralsoldiers)
                .concat(Object.keys(TERRAIN2.oppbase))
                .reduce((mem, k) => {
                  mem[k] = (mem[k] || 0) + 1;
                  return mem;
                }, {})
            )
              .filter(([key, n]) => n === 2)
              .reduce((mem, [key]) => {
                mem[key] = emptyObj;
                return mem;
              }, {})
          ).length !== 0
        ) {
          LINKS.endGame = "lose";
          LINKS.endedBy = "suicide";
          LINKS.endMarks = Object.keys(
            Object.entries(
              Object.keys(TERRAIN2.oppbase)
                .concat(Object.keys(UNITLAYERS.neutralsoldiers))
                .reduce((mem, k) => {
                  mem[k] = (mem[k] || 0) + 1;
                  return mem;
                }, {})
            )
              .filter(([key, n]) => n === 2)
              .reduce((mem, [key]) => {
                mem[key] = emptyObj;
                return mem;
              }, {})
          );
        } else {
          LINKS.endTurn = "startTurn_basic_1";
        }
      } else {
        for (const pos of Object.keys(UNITLAYERS.myunits)) {
          LINKS.marks[pos] = "selectunit_basic_2";
        }
      }
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS: step.ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS,
        TURNVARS
      };
    },
    slide_paperneutron_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        mytargets: step.ARTIFACTS.mytargets,
        firstneutrontargets: step.ARTIFACTS.firstneutrontargets,
        secondneutrontargets: {}
      };
      let UNITLAYERS = step.UNITLAYERS;
      let TURNVARS = { ...step.TURNVARS };
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      {
        let unitid = (
          UNITLAYERS.units[
            MARKS.selectunit ||
              TURNVARS["nextneutron"] ||
              MARKS.selectfirstneutron ||
              Object.keys(UNITLAYERS.neutralunits)[0]
          ] || {}
        ).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos:
              MARKS.selectmytarget ||
              MARKS.selectsecondneutrontarget ||
              MARKS.selectfirstneutrontarget ||
              MARKS.selectsingleneutrontarget
          };
        }
      }
      if (!MARKS.selectunit) {
        if (!!TURNVARS["nextneutron"]) {
          TURNVARS.neutronsdone = 1;
        } else {
          TURNVARS.nextneutron = Object.keys(
            Object.keys(UNITLAYERS.neutralsoldiers)
              .filter(k => k !== MARKS.selectfirstneutron)
              .reduce((m, k) => {
                m[k] = emptyObj;
                return m;
              }, {})
          )[0];
        }
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        neutralunits: {},
        neutralsoldiers: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (!!TURNVARS["nextneutron"] && !MARKS.selectunit) {
        {
          let BLOCKS = UNITLAYERS.units;
          for (let DIR of roseDirs) {
            let walkedsquares = [];
            let POS = TURNVARS["nextneutron"];
            while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
              walkedsquares.push(POS);
            }
            let WALKLENGTH = walkedsquares.length;
            if (WALKLENGTH) {
              ARTIFACTS.secondneutrontargets[
                walkedsquares[WALKLENGTH - 1]
              ] = emptyObj;
            }
          }
        }
      }
      if (!!MARKS.selectunit) {
        if (
          Object.keys(
            Object.entries(
              Object.keys(UNITLAYERS.neutralsoldiers)
                .concat(Object.keys(TERRAIN1.mybase))
                .reduce((mem, k) => {
                  mem[k] = (mem[k] || 0) + 1;
                  return mem;
                }, {})
            )
              .filter(([key, n]) => n === 2)
              .reduce((mem, [key]) => {
                mem[key] = emptyObj;
                return mem;
              }, {})
          ).length !== 0
        ) {
          LINKS.endGame = "win";
          LINKS.endedBy = "goal";
          LINKS.endMarks = Object.keys(
            Object.entries(
              Object.keys(TERRAIN1.mybase)
                .concat(Object.keys(UNITLAYERS.neutralsoldiers))
                .reduce((mem, k) => {
                  mem[k] = (mem[k] || 0) + 1;
                  return mem;
                }, {})
            )
              .filter(([key, n]) => n === 2)
              .reduce((mem, [key]) => {
                mem[key] = emptyObj;
                return mem;
              }, {})
          );
        } else if (
          Object.keys(
            Object.entries(
              Object.keys(UNITLAYERS.neutralsoldiers)
                .concat(Object.keys(TERRAIN1.oppbase))
                .reduce((mem, k) => {
                  mem[k] = (mem[k] || 0) + 1;
                  return mem;
                }, {})
            )
              .filter(([key, n]) => n === 2)
              .reduce((mem, [key]) => {
                mem[key] = emptyObj;
                return mem;
              }, {})
          ).length !== 0
        ) {
          LINKS.endGame = "lose";
          LINKS.endedBy = "suicide";
          LINKS.endMarks = Object.keys(
            Object.entries(
              Object.keys(TERRAIN1.oppbase)
                .concat(Object.keys(UNITLAYERS.neutralsoldiers))
                .reduce((mem, k) => {
                  mem[k] = (mem[k] || 0) + 1;
                  return mem;
                }, {})
            )
              .filter(([key, n]) => n === 2)
              .reduce((mem, [key]) => {
                mem[key] = emptyObj;
                return mem;
              }, {})
          );
        } else {
          LINKS.endTurn = "startTurn_paperneutron_2";
        }
      } else {
        if (!!MARKS.selectsecondneutrontarget) {
          for (const pos of Object.keys(UNITLAYERS.myunits)) {
            LINKS.marks[pos] = "selectunit_paperneutron_1";
          }
        } else {
          for (const pos of Object.keys(ARTIFACTS.secondneutrontargets)) {
            LINKS.marks[pos] = "selectsecondneutrontarget_paperneutron_1";
          }
        }
      }
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS,
        TURNVARS
      };
    },
    slide_paperneutron_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        firstneutrontargets: step.ARTIFACTS.firstneutrontargets,
        secondneutrontargets: {}
      };
      let UNITLAYERS = step.UNITLAYERS;
      let TURNVARS = { ...step.TURNVARS };
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      {
        let unitid = (
          UNITLAYERS.units[
            MARKS.selectunit ||
              TURNVARS["nextneutron"] ||
              MARKS.selectfirstneutron ||
              Object.keys(UNITLAYERS.neutralunits)[0]
          ] || {}
        ).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos:
              MARKS.selectmytarget ||
              MARKS.selectsecondneutrontarget ||
              MARKS.selectfirstneutrontarget ||
              MARKS.selectsingleneutrontarget
          };
        }
      }
      if (!MARKS.selectunit) {
        if (!!TURNVARS["nextneutron"]) {
          TURNVARS.neutronsdone = 1;
        } else {
          TURNVARS.nextneutron = Object.keys(
            Object.keys(UNITLAYERS.neutralsoldiers)
              .filter(k => k !== MARKS.selectfirstneutron)
              .reduce((m, k) => {
                m[k] = emptyObj;
                return m;
              }, {})
          )[0];
        }
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        neutralunits: {},
        neutralsoldiers: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (!!TURNVARS["nextneutron"] && !MARKS.selectunit) {
        {
          let BLOCKS = UNITLAYERS.units;
          for (let DIR of roseDirs) {
            let walkedsquares = [];
            let POS = TURNVARS["nextneutron"];
            while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
              walkedsquares.push(POS);
            }
            let WALKLENGTH = walkedsquares.length;
            if (WALKLENGTH) {
              ARTIFACTS.secondneutrontargets[
                walkedsquares[WALKLENGTH - 1]
              ] = emptyObj;
            }
          }
        }
      }
      if (!!MARKS.selectunit) {
        if (
          Object.keys(
            Object.entries(
              Object.keys(UNITLAYERS.neutralsoldiers)
                .concat(Object.keys(TERRAIN2.mybase))
                .reduce((mem, k) => {
                  mem[k] = (mem[k] || 0) + 1;
                  return mem;
                }, {})
            )
              .filter(([key, n]) => n === 2)
              .reduce((mem, [key]) => {
                mem[key] = emptyObj;
                return mem;
              }, {})
          ).length !== 0
        ) {
          LINKS.endGame = "win";
          LINKS.endedBy = "goal";
          LINKS.endMarks = Object.keys(
            Object.entries(
              Object.keys(TERRAIN2.mybase)
                .concat(Object.keys(UNITLAYERS.neutralsoldiers))
                .reduce((mem, k) => {
                  mem[k] = (mem[k] || 0) + 1;
                  return mem;
                }, {})
            )
              .filter(([key, n]) => n === 2)
              .reduce((mem, [key]) => {
                mem[key] = emptyObj;
                return mem;
              }, {})
          );
        } else if (
          Object.keys(
            Object.entries(
              Object.keys(UNITLAYERS.neutralsoldiers)
                .concat(Object.keys(TERRAIN2.oppbase))
                .reduce((mem, k) => {
                  mem[k] = (mem[k] || 0) + 1;
                  return mem;
                }, {})
            )
              .filter(([key, n]) => n === 2)
              .reduce((mem, [key]) => {
                mem[key] = emptyObj;
                return mem;
              }, {})
          ).length !== 0
        ) {
          LINKS.endGame = "lose";
          LINKS.endedBy = "suicide";
          LINKS.endMarks = Object.keys(
            Object.entries(
              Object.keys(TERRAIN2.oppbase)
                .concat(Object.keys(UNITLAYERS.neutralsoldiers))
                .reduce((mem, k) => {
                  mem[k] = (mem[k] || 0) + 1;
                  return mem;
                }, {})
            )
              .filter(([key, n]) => n === 2)
              .reduce((mem, [key]) => {
                mem[key] = emptyObj;
                return mem;
              }, {})
          );
        } else {
          LINKS.endTurn = "startTurn_paperneutron_1";
        }
      } else {
        if (!!MARKS.selectsecondneutrontarget) {
          for (const pos of Object.keys(UNITLAYERS.myunits)) {
            LINKS.marks[pos] = "selectunit_paperneutron_2";
          }
        } else {
          for (const pos of Object.keys(ARTIFACTS.secondneutrontargets)) {
            LINKS.marks[pos] = "selectsecondneutrontarget_paperneutron_2";
          }
        }
      }
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS,
        TURNVARS
      };
    }
  },
  instruction: {
    startTurn_basic_1: step => {
      let UNITLAYERS = step.UNITLAYERS;
      let TURN = step.TURN;
      return 1 === 1 && TURN === 1
        ? collapseContent({
            line: [
              { text: "Select a" },
              { unittype: ["pawn", 1] },
              { text: "to slide (first turn you don't move" },
              { unittype: ["pawn", 0] },
              { text: ")" }
            ]
          })
        : collapseContent({
            line: [
              { text: "Select where to move" },
              {
                unit: [
                  iconMapping[
                    (
                      UNITLAYERS.units[
                        Object.keys(UNITLAYERS.neutralunits)[0]
                      ] || {}
                    ).group
                  ],
                  (
                    UNITLAYERS.units[Object.keys(UNITLAYERS.neutralunits)[0]] ||
                    {}
                  ).owner,
                  Object.keys(UNITLAYERS.neutralunits)[0]
                ]
              }
            ]
          });
    },
    slide_basic_1: step => {
      let LINKS = step.LINKS;
      return LINKS.endTurn || LINKS.endGame
        ? collapseContent({
            line: [
              { text: "Press " },
              { endTurn: "end turn" },
              { text: " to submit your moves and hand over to " },
              { player: 2 }
            ]
          })
        : collapseContent({
            line: [
              { text: "Now select which" },
              { unittype: ["pawn", 1] },
              { text: "to move" }
            ]
          });
    },
    selectunit_basic_1: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Select where to slide" },
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
    selectmytarget_basic_1: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "slide" },
          { text: "to move" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
              MARKS.selectunit
            ]
          },
          { text: "to" },
          { pos: MARKS.selectmytarget }
        ]
      });
    },
    selectsingleneutrontarget_basic_1: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "slide" },
          { text: "to move" },
          {
            unit: [
              iconMapping[
                (
                  UNITLAYERS.units[Object.keys(UNITLAYERS.neutralunits)[0]] ||
                  {}
                ).group
              ],
              (UNITLAYERS.units[Object.keys(UNITLAYERS.neutralunits)[0]] || {})
                .owner,
              Object.keys(UNITLAYERS.neutralunits)[0]
            ]
          },
          { text: "to" },
          { pos: MARKS.selectsingleneutrontarget }
        ]
      });
    },
    startTurn_basic_2: step => {
      let UNITLAYERS = step.UNITLAYERS;
      let TURN = step.TURN;
      return 2 === 1 && TURN === 1
        ? collapseContent({
            line: [
              { text: "Select a" },
              { unittype: ["pawn", 2] },
              { text: "to slide (first turn you don't move" },
              { unittype: ["pawn", 0] },
              { text: ")" }
            ]
          })
        : collapseContent({
            line: [
              { text: "Select where to move" },
              {
                unit: [
                  iconMapping[
                    (
                      UNITLAYERS.units[
                        Object.keys(UNITLAYERS.neutralunits)[0]
                      ] || {}
                    ).group
                  ],
                  (
                    UNITLAYERS.units[Object.keys(UNITLAYERS.neutralunits)[0]] ||
                    {}
                  ).owner,
                  Object.keys(UNITLAYERS.neutralunits)[0]
                ]
              }
            ]
          });
    },
    slide_basic_2: step => {
      let LINKS = step.LINKS;
      return LINKS.endTurn || LINKS.endGame
        ? collapseContent({
            line: [
              { text: "Press " },
              { endTurn: "end turn" },
              { text: " to submit your moves and hand over to " },
              { player: 1 }
            ]
          })
        : collapseContent({
            line: [
              { text: "Now select which" },
              { unittype: ["pawn", 2] },
              { text: "to move" }
            ]
          });
    },
    selectunit_basic_2: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Select where to slide" },
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
    selectmytarget_basic_2: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "slide" },
          { text: "to move" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
              MARKS.selectunit
            ]
          },
          { text: "to" },
          { pos: MARKS.selectmytarget }
        ]
      });
    },
    selectsingleneutrontarget_basic_2: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "slide" },
          { text: "to move" },
          {
            unit: [
              iconMapping[
                (
                  UNITLAYERS.units[Object.keys(UNITLAYERS.neutralunits)[0]] ||
                  {}
                ).group
              ],
              (UNITLAYERS.units[Object.keys(UNITLAYERS.neutralunits)[0]] || {})
                .owner,
              Object.keys(UNITLAYERS.neutralunits)[0]
            ]
          },
          { text: "to" },
          { pos: MARKS.selectsingleneutrontarget }
        ]
      });
    },
    startTurn_paperneutron_1: step => {
      let TURN = step.TURN;
      return 1 === 1 && TURN === 1
        ? collapseContent({
            line: [
              { text: "Select a" },
              { unittype: ["pawn", 1] },
              { text: "to slide (first turn you don't move" },
              { unittype: ["pawn", 0] },
              { text: ")" }
            ]
          })
        : collapseContent({
            line: [
              { text: "Select which" },
              { unittype: ["pawn", 0] },
              { text: "to move first" }
            ]
          });
    },
    slide_paperneutron_1: step => {
      let TURNVARS = step.TURNVARS;
      let LINKS = step.LINKS;
      return LINKS.endTurn || LINKS.endGame
        ? collapseContent({
            line: [
              { text: "Press " },
              { endTurn: "end turn" },
              { text: " to submit your moves and hand over to " },
              { player: 2 }
            ]
          })
        : !!TURNVARS["neutronsdone"]
        ? collapseContent({
            line: [
              { text: "Now select which of your" },
              { unittype: ["pawn", 1] },
              { text: "to move" }
            ]
          })
        : collapseContent({
            line: [
              { text: "Now you must select where to move the second" },
              { unittype: ["pawn", 0] }
            ]
          });
    },
    selectunit_paperneutron_1: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Select where to slide" },
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
    selectmytarget_paperneutron_1: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "slide" },
          { text: "to move" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
              MARKS.selectunit
            ]
          },
          { text: "to" },
          { pos: MARKS.selectmytarget }
        ]
      });
    },
    selectfirstneutron_paperneutron_1: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Select where to slide" },
          {
            unit: [
              iconMapping[
                (UNITLAYERS.units[MARKS.selectfirstneutron] || {}).group
              ],
              (UNITLAYERS.units[MARKS.selectfirstneutron] || {}).owner,
              MARKS.selectfirstneutron
            ]
          }
        ]
      });
    },
    selectfirstneutrontarget_paperneutron_1: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "slide" },
          { text: "to move" },
          {
            unit: [
              iconMapping[
                (UNITLAYERS.units[MARKS.selectfirstneutron] || {}).group
              ],
              (UNITLAYERS.units[MARKS.selectfirstneutron] || {}).owner,
              MARKS.selectfirstneutron
            ]
          },
          { text: "to" },
          { pos: MARKS.selectfirstneutrontarget }
        ]
      });
    },
    selectsecondneutrontarget_paperneutron_1: step => {
      let TURNVARS = step.TURNVARS;
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "slide" },
          { text: "to move" },
          {
            unit: [
              iconMapping[
                (UNITLAYERS.units[TURNVARS["nextneutron"]] || {}).group
              ],
              (UNITLAYERS.units[TURNVARS["nextneutron"]] || {}).owner,
              TURNVARS["nextneutron"]
            ]
          },
          { text: "to" },
          { pos: MARKS.selectsecondneutrontarget }
        ]
      });
    },
    startTurn_paperneutron_2: step => {
      let TURN = step.TURN;
      return 2 === 1 && TURN === 1
        ? collapseContent({
            line: [
              { text: "Select a" },
              { unittype: ["pawn", 2] },
              { text: "to slide (first turn you don't move" },
              { unittype: ["pawn", 0] },
              { text: ")" }
            ]
          })
        : collapseContent({
            line: [
              { text: "Select which" },
              { unittype: ["pawn", 0] },
              { text: "to move first" }
            ]
          });
    },
    slide_paperneutron_2: step => {
      let TURNVARS = step.TURNVARS;
      let LINKS = step.LINKS;
      return LINKS.endTurn || LINKS.endGame
        ? collapseContent({
            line: [
              { text: "Press " },
              { endTurn: "end turn" },
              { text: " to submit your moves and hand over to " },
              { player: 1 }
            ]
          })
        : !!TURNVARS["neutronsdone"]
        ? collapseContent({
            line: [
              { text: "Now select which of your" },
              { unittype: ["pawn", 2] },
              { text: "to move" }
            ]
          })
        : collapseContent({
            line: [
              { text: "Now you must select where to move the second" },
              { unittype: ["pawn", 0] }
            ]
          });
    },
    selectunit_paperneutron_2: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Select where to slide" },
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
    selectmytarget_paperneutron_2: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "slide" },
          { text: "to move" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
              MARKS.selectunit
            ]
          },
          { text: "to" },
          { pos: MARKS.selectmytarget }
        ]
      });
    },
    selectfirstneutron_paperneutron_2: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Select where to slide" },
          {
            unit: [
              iconMapping[
                (UNITLAYERS.units[MARKS.selectfirstneutron] || {}).group
              ],
              (UNITLAYERS.units[MARKS.selectfirstneutron] || {}).owner,
              MARKS.selectfirstneutron
            ]
          }
        ]
      });
    },
    selectfirstneutrontarget_paperneutron_2: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "slide" },
          { text: "to move" },
          {
            unit: [
              iconMapping[
                (UNITLAYERS.units[MARKS.selectfirstneutron] || {}).group
              ],
              (UNITLAYERS.units[MARKS.selectfirstneutron] || {}).owner,
              MARKS.selectfirstneutron
            ]
          },
          { text: "to" },
          { pos: MARKS.selectfirstneutrontarget }
        ]
      });
    },
    selectsecondneutrontarget_paperneutron_2: step => {
      let TURNVARS = step.TURNVARS;
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "slide" },
          { text: "to move" },
          {
            unit: [
              iconMapping[
                (UNITLAYERS.units[TURNVARS["nextneutron"]] || {}).group
              ],
              (UNITLAYERS.units[TURNVARS["nextneutron"]] || {}).owner,
              TURNVARS["nextneutron"]
            ]
          },
          { text: "to" },
          { pos: MARKS.selectsecondneutrontarget }
        ]
      });
    }
  },
  variants: [
    {
      ruleset: "basic",
      board: "basic",
      setup: "basic",
      desc: "regular",
      code: "r",
      arr: {
        setup: {
          soldiers: {
            "0": ["a3"],
            "1": ["a4", "b4", "b3", "c1", "e1"],
            "2": ["a1", "a5", "c5", "d5", "e2"]
          }
        },
        marks: [],
        potentialMarks: []
      }
    },
    {
      ruleset: "paperneutron",
      board: "paperneutron",
      setup: "paperneutron",
      desc: "paper neutron",
      code: "p",
      arr: {
        setup: {
          soldiers: {
            "0": ["a2", "d2"],
            "1": ["a1", "b1", "c3", "d3"],
            "2": ["a4", "b2", "c4", "d4"]
          }
        },
        marks: [],
        potentialMarks: []
      }
    }
  ],
  boards: {
    basic: {
      height: 5,
      width: 5,
      terrain: {
        base: {
          "1": [
            {
              rect: ["a1", "e1"]
            }
          ],
          "2": [
            {
              rect: ["a5", "e5"]
            }
          ]
        }
      }
    },
    paperneutron: {
      height: 4,
      width: 4,
      terrain: {
        base: {
          "1": [
            {
              rect: ["a1", "d1"]
            }
          ],
          "2": [
            {
              rect: ["a4", "d4"]
            }
          ]
        }
      }
    }
  },
  setups: {
    basic: {
      soldiers: {
        "0": ["c3"],
        "1": [
          {
            rect: ["a1", "e1"]
          }
        ],
        "2": [
          {
            rect: ["a5", "e5"]
          }
        ]
      }
    },
    paperneutron: {
      soldiers: {
        "0": ["b3", "c2"],
        "1": [
          {
            rect: ["a1", "d1"]
          }
        ],
        "2": [
          {
            rect: ["a4", "d4"]
          }
        ]
      }
    }
  }
};
export default game;
