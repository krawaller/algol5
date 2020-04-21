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
const iconMapping = { soldiers: "pawn" };
const emptyArtifactLayers = {
  firstneutrontargets: {},
  secondneutrontargets: {},
  myunittargets: {}
};
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
const game = {
  gameId: "paperneutron",
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
          LINKS.marks[pos] = "selectmyunit_basic_1";
        }
      } else {
        for (const pos of Object.keys(UNITLAYERS.neutralunits)) {
          LINKS.marks[pos] = "selectfirstneutron_basic_1";
        }
      }
      return {
        UNITDATA: step.UNITDATA,
        LINKS,
        UNITLAYERS,
        ARTIFACTS: emptyArtifactLayers,
        MARKS: {},
        TURN,
        TURNVARS: {}
      };
    },
    startTurn_basic_2: step => {
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
        LINKS.marks[pos] = "selectfirstneutron_basic_2";
      }
      return {
        UNITDATA: step.UNITDATA,
        LINKS,
        UNITLAYERS,
        ARTIFACTS: emptyArtifactLayers,
        MARKS: {},
        TURN: step.TURN,
        TURNVARS: {}
      };
    },
    selectfirstneutrontarget_basic_1: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.slide = "slide_basic_1";
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
    selectsecondneutrontarget_basic_1: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.slide = "slide_basic_1";
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
    selectmyunittarget_basic_1: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.slide = "slide_basic_1";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: {
          selectmyunit: step.MARKS.selectmyunit,
          selectmyunittarget: newMarkPos
        },
        TURNVARS: step.TURNVARS
      };
    },
    selectmyunit_basic_1: (step, newMarkPos) => {
      let ARTIFACTS = {
        myunittargets: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectmyunit: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let BLOCKS = UNITLAYERS.units;
        for (let DIR of roseDirs) {
          let walkedsquares = [];
          let POS = MARKS.selectmyunit;
          while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
            walkedsquares.push(POS);
          }
          let WALKLENGTH = walkedsquares.length;
          if (WALKLENGTH) {
            ARTIFACTS.myunittargets[walkedsquares[WALKLENGTH - 1]] = emptyObj;
          }
        }
      }
      for (const pos of Object.keys(ARTIFACTS.myunittargets)) {
        LINKS.marks[pos] = "selectmyunittarget_basic_1";
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
    selectfirstneutron_basic_1: (step, newMarkPos) => {
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
        LINKS.marks[pos] = "selectfirstneutrontarget_basic_1";
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
    selectfirstneutrontarget_basic_2: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.slide = "slide_basic_2";
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
    selectsecondneutrontarget_basic_2: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.slide = "slide_basic_2";
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
    selectmyunittarget_basic_2: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.slide = "slide_basic_2";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: {
          selectmyunit: step.MARKS.selectmyunit,
          selectmyunittarget: newMarkPos
        },
        TURNVARS: step.TURNVARS
      };
    },
    selectmyunit_basic_2: (step, newMarkPos) => {
      let ARTIFACTS = {
        firstneutrontargets: step.ARTIFACTS.firstneutrontargets,
        secondneutrontargets: step.ARTIFACTS.secondneutrontargets,
        myunittargets: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectmyunit: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let BLOCKS = UNITLAYERS.units;
        for (let DIR of roseDirs) {
          let walkedsquares = [];
          let POS = MARKS.selectmyunit;
          while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
            walkedsquares.push(POS);
          }
          let WALKLENGTH = walkedsquares.length;
          if (WALKLENGTH) {
            ARTIFACTS.myunittargets[walkedsquares[WALKLENGTH - 1]] = emptyObj;
          }
        }
      }
      for (const pos of Object.keys(ARTIFACTS.myunittargets)) {
        LINKS.marks[pos] = "selectmyunittarget_basic_2";
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
    selectfirstneutron_basic_2: (step, newMarkPos) => {
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
        LINKS.marks[pos] = "selectfirstneutrontarget_basic_2";
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
    slide_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        myunittargets: step.ARTIFACTS.myunittargets,
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
            MARKS.selectmyunit ||
              TURNVARS["nextneutron"] ||
              MARKS.selectfirstneutron
          ] || {}
        ).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos:
              MARKS.selectmyunittarget ||
              MARKS.selectsecondneutrontarget ||
              MARKS.selectfirstneutrontarget
          };
        }
      }
      if (!MARKS.selectmyunit) {
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
      if (!!TURNVARS["nextneutron"] && !MARKS.selectmyunit) {
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
      if (!!MARKS.selectmyunit) {
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
        if (!!MARKS.selectsecondneutrontarget) {
          for (const pos of Object.keys(UNITLAYERS.myunits)) {
            LINKS.marks[pos] = "selectmyunit_basic_1";
          }
        } else {
          for (const pos of Object.keys(ARTIFACTS.secondneutrontargets)) {
            LINKS.marks[pos] = "selectsecondneutrontarget_basic_1";
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
    slide_basic_2: step => {
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
            MARKS.selectmyunit ||
              TURNVARS["nextneutron"] ||
              MARKS.selectfirstneutron
          ] || {}
        ).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos:
              MARKS.selectmyunittarget ||
              MARKS.selectsecondneutrontarget ||
              MARKS.selectfirstneutrontarget
          };
        }
      }
      if (!MARKS.selectmyunit) {
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
      if (!!TURNVARS["nextneutron"] && !MARKS.selectmyunit) {
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
      if (!!MARKS.selectmyunit) {
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
        if (!!MARKS.selectsecondneutrontarget) {
          for (const pos of Object.keys(UNITLAYERS.myunits)) {
            LINKS.marks[pos] = "selectmyunit_basic_2";
          }
        } else {
          for (const pos of Object.keys(ARTIFACTS.secondneutrontargets)) {
            LINKS.marks[pos] = "selectsecondneutrontarget_basic_2";
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
      let TURN = step.TURN;
      return 1 === 1 && TURN === 1
        ? collapseContent({
            line: [
              { text: "Select a" },
              { unittype: ["pawn", 1] },
              { text: "to slide (first turn of the game you don't move any" },
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
    slide_basic_1: step => {
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
    selectfirstneutrontarget_basic_1: step => {
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
    selectsecondneutrontarget_basic_1: step => {
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
    selectmyunittarget_basic_1: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "slide" },
          { text: "to move" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectmyunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectmyunit] || {}).owner,
              MARKS.selectmyunit
            ]
          },
          { text: "to" },
          { pos: MARKS.selectmyunittarget }
        ]
      });
    },
    selectmyunit_basic_1: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Select where to slide" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectmyunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectmyunit] || {}).owner,
              MARKS.selectmyunit
            ]
          }
        ]
      });
    },
    selectfirstneutron_basic_1: step => {
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
    startTurn_basic_2: step => {
      let TURN = step.TURN;
      return 2 === 1 && TURN === 1
        ? collapseContent({
            line: [
              { text: "Select a" },
              { unittype: ["pawn", 2] },
              { text: "to slide (first turn of the game you don't move any" },
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
    slide_basic_2: step => {
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
    selectfirstneutrontarget_basic_2: step => {
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
    selectsecondneutrontarget_basic_2: step => {
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
    selectmyunittarget_basic_2: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "slide" },
          { text: "to move" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectmyunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectmyunit] || {}).owner,
              MARKS.selectmyunit
            ]
          },
          { text: "to" },
          { pos: MARKS.selectmyunittarget }
        ]
      });
    },
    selectmyunit_basic_2: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Select where to slide" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectmyunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectmyunit] || {}).owner,
              MARKS.selectmyunit
            ]
          }
        ]
      });
    },
    selectfirstneutron_basic_2: step => {
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
        setup: {},
        marks: [],
        potentialMarks: []
      }
    }
  ],
  boards: {
    basic: {
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
