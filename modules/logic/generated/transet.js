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
const iconMapping = { pinets: "pawn", piokers: "bishop", piases: "king" };
let TERRAIN1, TERRAIN2, connections, relativeDirs, BOARD, dimensions;
const groupLayers1 = {
  pinets: [
    ["units", "pinets"],
    ["units", "myunits", "pinets"],
    ["units", "oppunits", "pinets"]
  ],
  piokers: [
    ["units", "piokers"],
    ["units", "myunits", "piokers"],
    ["units", "oppunits", "piokers"]
  ],
  piases: [["units"], ["units", "myunits"], ["units", "oppunits"]]
};
const groupLayers2 = {
  pinets: [
    ["units", "pinets"],
    ["units", "oppunits", "pinets"],
    ["units", "myunits", "pinets"]
  ],
  piokers: [
    ["units", "piokers"],
    ["units", "oppunits", "piokers"],
    ["units", "myunits", "piokers"]
  ],
  piases: [["units"], ["units", "oppunits"], ["units", "myunits"]]
};
const emptyArtifactLayers_basic = {
  swap2step: {},
  swap1steps: {},
  movetargets: {}
};
const game = {
  gameId: "transet",
  commands: { move: {}, swap: {} },
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
      pinets: {},
      piokers: {}
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
        pinets: oldUnitLayers.pinets,
        piokers: oldUnitLayers.piokers
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
        oppunits: oldUnitLayers.myunits,
        pinets: oldUnitLayers.pinets,
        piokers: oldUnitLayers.piokers
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
        movetargets: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let startconnections = connections[MARKS.selectunit];
        for (let DIR of UNITLAYERS.pinets[MARKS.selectunit]
          ? [1]
          : UNITLAYERS.piokers[MARKS.selectunit]
          ? [8, 2]
          : [8, 1, 2]) {
          let POS = startconnections[DIR];
          if (POS && !UNITLAYERS.myunits[POS]) {
            ARTIFACTS.movetargets[POS] = emptyObj;
          }
        }
      }
      for (const pos of Object.keys(ARTIFACTS.movetargets)) {
        LINKS.marks[pos] = "selectmovetarget_basic_1";
      }
      for (const pos of Object.keys(
        Object.keys(UNITLAYERS.myunits)
          .filter(k => !{ [MARKS.selectunit]: 1 }.hasOwnProperty(k))
          .reduce((m, k) => {
            m[k] = emptyObj;
            return m;
          }, {})
      )) {
        LINKS.marks[pos] = "selectswapunit_basic_1";
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
    selectmovetarget_basic_1: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: step.MARKS.selectunit,
        selectmovetarget: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      if (
        UNITLAYERS.units[MARKS.selectmovetarget] &&
        !TERRAIN1.oppbase[MARKS.selectmovetarget]
      ) {
        for (const pos of Object.keys(
          Object.keys(TERRAIN1.oppbase)
            .filter(k => !UNITLAYERS.oppunits.hasOwnProperty(k))
            .reduce((m, k) => {
              m[k] = emptyObj;
              return m;
            }, {})
        )) {
          LINKS.marks[pos] = "selectdeportdestination_basic_1";
        }
      } else {
        LINKS.commands.move = "move_basic_1";
      }
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS
      };
    },
    selectdeportdestination_basic_1: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.move = "move_basic_1";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: {
          selectunit: step.MARKS.selectunit,
          selectmovetarget: step.MARKS.selectmovetarget,
          selectdeportdestination: newMarkPos
        }
      };
    },
    selectswapunit_basic_1: (step, newMarkPos) => {
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        swap1steps: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: step.MARKS.selectunit,
        selectswapunit: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let startconnections = connections[MARKS.selectunit];
        for (let DIR of orthoDirs) {
          let POS = startconnections[DIR];
          if (POS && !UNITLAYERS.units[POS]) {
            ARTIFACTS.swap1steps[POS] = { dir: DIR };
          }
        }
      }
      for (const pos of Object.keys(ARTIFACTS.swap1steps)) {
        LINKS.marks[pos] = "selectswap1target_basic_1";
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
    selectswap1target_basic_1: (step, newMarkPos) => {
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        swap1steps: step.ARTIFACTS.swap1steps,
        swap2step: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: step.MARKS.selectunit,
        selectswapunit: step.MARKS.selectswapunit,
        selectswap1target: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let POS =
          connections[MARKS.selectswapunit][
            relativeDirs[5][
              (ARTIFACTS.swap1steps[MARKS.selectswap1target] || {}).dir
            ]
          ];
        if (
          POS &&
          !{ ...UNITLAYERS.units, ...{ [MARKS.selectswap1target]: 1 } }[POS]
        ) {
          ARTIFACTS.swap2step[POS] = emptyObj;
        }
      }
      if (Object.keys(ARTIFACTS.swap2step).length !== 0) {
        LINKS.commands.swap = "swap_basic_1";
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
    selectunit_basic_2: (step, newMarkPos) => {
      let ARTIFACTS = {
        movetargets: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let startconnections = connections[MARKS.selectunit];
        for (let DIR of UNITLAYERS.pinets[MARKS.selectunit]
          ? [5]
          : UNITLAYERS.piokers[MARKS.selectunit]
          ? [4, 6]
          : [4, 5, 6]) {
          let POS = startconnections[DIR];
          if (POS && !UNITLAYERS.myunits[POS]) {
            ARTIFACTS.movetargets[POS] = emptyObj;
          }
        }
      }
      for (const pos of Object.keys(ARTIFACTS.movetargets)) {
        LINKS.marks[pos] = "selectmovetarget_basic_2";
      }
      for (const pos of Object.keys(
        Object.keys(UNITLAYERS.myunits)
          .filter(k => !{ [MARKS.selectunit]: 1 }.hasOwnProperty(k))
          .reduce((m, k) => {
            m[k] = emptyObj;
            return m;
          }, {})
      )) {
        LINKS.marks[pos] = "selectswapunit_basic_2";
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
    selectmovetarget_basic_2: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: step.MARKS.selectunit,
        selectmovetarget: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      if (
        UNITLAYERS.units[MARKS.selectmovetarget] &&
        !TERRAIN2.oppbase[MARKS.selectmovetarget]
      ) {
        for (const pos of Object.keys(
          Object.keys(TERRAIN2.oppbase)
            .filter(k => !UNITLAYERS.oppunits.hasOwnProperty(k))
            .reduce((m, k) => {
              m[k] = emptyObj;
              return m;
            }, {})
        )) {
          LINKS.marks[pos] = "selectdeportdestination_basic_2";
        }
      } else {
        LINKS.commands.move = "move_basic_2";
      }
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS
      };
    },
    selectdeportdestination_basic_2: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.move = "move_basic_2";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: {
          selectunit: step.MARKS.selectunit,
          selectmovetarget: step.MARKS.selectmovetarget,
          selectdeportdestination: newMarkPos
        }
      };
    },
    selectswapunit_basic_2: (step, newMarkPos) => {
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        swap1steps: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: step.MARKS.selectunit,
        selectswapunit: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let startconnections = connections[MARKS.selectunit];
        for (let DIR of orthoDirs) {
          let POS = startconnections[DIR];
          if (POS && !UNITLAYERS.units[POS]) {
            ARTIFACTS.swap1steps[POS] = { dir: DIR };
          }
        }
      }
      for (const pos of Object.keys(ARTIFACTS.swap1steps)) {
        LINKS.marks[pos] = "selectswap1target_basic_2";
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
    selectswap1target_basic_2: (step, newMarkPos) => {
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        swap1steps: step.ARTIFACTS.swap1steps,
        swap2step: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: step.MARKS.selectunit,
        selectswapunit: step.MARKS.selectswapunit,
        selectswap1target: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let POS =
          connections[MARKS.selectswapunit][
            relativeDirs[5][
              (ARTIFACTS.swap1steps[MARKS.selectswap1target] || {}).dir
            ]
          ];
        if (
          POS &&
          !{ ...UNITLAYERS.units, ...{ [MARKS.selectswap1target]: 1 } }[POS]
        ) {
          ARTIFACTS.swap2step[POS] = emptyObj;
        }
      }
      if (Object.keys(ARTIFACTS.swap2step).length !== 0) {
        LINKS.commands.swap = "swap_basic_2";
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
    move_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      if (UNITLAYERS.units[MARKS.selectmovetarget]) {
        if (TERRAIN1.oppbase[MARKS.selectmovetarget]) {
          delete UNITDATA[(UNITLAYERS.units[MARKS.selectmovetarget] || {}).id];
        } else {
          {
            let unitid = (UNITLAYERS.units[MARKS.selectmovetarget] || {}).id;
            if (unitid) {
              UNITDATA[unitid] = {
                ...UNITDATA[unitid],
                pos: MARKS.selectdeportdestination
              };
            }
          }
        }
      }
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
        pinets: {},
        piokers: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (
        Object.keys(
          Object.entries(
            Object.keys(UNITLAYERS.myunits)
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
        LINKS.endGame = "win";
        LINKS.endedBy = "infiltration";
        LINKS.endMarks = Object.keys(
          Object.entries(
            Object.keys(UNITLAYERS.myunits)
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
        );
      } else {
        LINKS.endTurn = "startTurn_basic_2";
      }
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS: step.ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS
      };
    },
    swap_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        swap1steps: step.ARTIFACTS.swap1steps,
        swap2step: step.ARTIFACTS.swap2step
      };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      {
        let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: MARKS.selectswap1target
          };
        }
      }
      {
        let unitid = (UNITLAYERS.units[MARKS.selectswapunit] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: Object.keys(ARTIFACTS.swap2step)[0]
          };
        }
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        pinets: {},
        piokers: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (
        Object.keys(
          Object.entries(
            Object.keys(UNITLAYERS.myunits)
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
        LINKS.endGame = "win";
        LINKS.endedBy = "infiltration";
        LINKS.endMarks = Object.keys(
          Object.entries(
            Object.keys(UNITLAYERS.myunits)
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
        UNITLAYERS
      };
    },
    move_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      if (UNITLAYERS.units[MARKS.selectmovetarget]) {
        if (TERRAIN2.oppbase[MARKS.selectmovetarget]) {
          delete UNITDATA[(UNITLAYERS.units[MARKS.selectmovetarget] || {}).id];
        } else {
          {
            let unitid = (UNITLAYERS.units[MARKS.selectmovetarget] || {}).id;
            if (unitid) {
              UNITDATA[unitid] = {
                ...UNITDATA[unitid],
                pos: MARKS.selectdeportdestination
              };
            }
          }
        }
      }
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
        pinets: {},
        piokers: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (
        Object.keys(
          Object.entries(
            Object.keys(UNITLAYERS.myunits)
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
        LINKS.endGame = "win";
        LINKS.endedBy = "infiltration";
        LINKS.endMarks = Object.keys(
          Object.entries(
            Object.keys(UNITLAYERS.myunits)
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
        );
      } else {
        LINKS.endTurn = "startTurn_basic_1";
      }
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS: step.ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS
      };
    },
    swap_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        swap1steps: step.ARTIFACTS.swap1steps,
        swap2step: step.ARTIFACTS.swap2step
      };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      {
        let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: MARKS.selectswap1target
          };
        }
      }
      {
        let unitid = (UNITLAYERS.units[MARKS.selectswapunit] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: Object.keys(ARTIFACTS.swap2step)[0]
          };
        }
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        pinets: {},
        piokers: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (
        Object.keys(
          Object.entries(
            Object.keys(UNITLAYERS.myunits)
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
        LINKS.endGame = "win";
        LINKS.endedBy = "infiltration";
        LINKS.endMarks = Object.keys(
          Object.entries(
            Object.keys(UNITLAYERS.myunits)
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
        UNITLAYERS
      };
    }
  },
  instruction: {
    startTurn_basic_1: step => {
      return collapseContent({
        line: [
          { select: "Select" },
          { unittype: ["pawn", 1] },
          { text: "," },
          { unittype: ["bishop", 1] },
          { text: "or" },
          { unittype: ["king", 1] },
          { text: "to move" }
        ]
      });
    },
    move_basic_1: () => defaultInstruction(1),
    swap_basic_1: () => defaultInstruction(1),
    selectunit_basic_1: step => {
      let ARTIFACTS = step.ARTIFACTS;
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      let LINKS = step.LINKS;
      return collapseContent({
        line: [
          { select: "Select" },
          collapseContent({
            line: [
              Object.keys(ARTIFACTS.movetargets).length !== 0
                ? collapseContent({
                    line: [
                      { text: "where to move" },
                      {
                        unit: [
                          iconMapping[
                            (UNITLAYERS.units[MARKS.selectunit] || {}).group
                          ],
                          (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
                          MARKS.selectunit
                        ]
                      }
                    ]
                  })
                : undefined,
              !!Object.keys(LINKS.marks).find(
                a => LINKS.marks[a] === "selectswapunit" + 1
              )
                ? collapseContent({
                    line: [
                      { text: "another unit to swap" },
                      {
                        unit: [
                          iconMapping[
                            (UNITLAYERS.units[MARKS.selectunit] || {}).group
                          ],
                          (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
                          MARKS.selectunit
                        ]
                      },
                      { text: "with" }
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
    selectmovetarget_basic_1: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return UNITLAYERS.units[MARKS.selectmovetarget] &&
        !TERRAIN1.oppbase[MARKS.selectmovetarget]
        ? collapseContent({
            line: [
              { select: "Select" },
              { text: "where" },
              {
                unit: [
                  iconMapping[
                    (UNITLAYERS.units[MARKS.selectmovetarget] || {}).group
                  ],
                  (UNITLAYERS.units[MARKS.selectmovetarget] || {}).owner,
                  MARKS.selectmovetarget
                ]
              },
              { text: "should end up" }
            ]
          })
        : collapseContent({
            line: [
              { text: "Press" },
              { command: "move" },
              { text: "to make" },
              {
                unit: [
                  iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
                  (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
                  MARKS.selectunit
                ]
              },
              { text: "go to" },
              { pos: MARKS.selectmovetarget }
            ]
          });
    },
    selectdeportdestination_basic_1: step => {
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
              (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
              MARKS.selectunit
            ]
          },
          { text: "go to" },
          { pos: MARKS.selectmovetarget },
          { text: "and deport" },
          {
            unit: [
              iconMapping[
                (UNITLAYERS.units[MARKS.selectmovetarget] || {}).group
              ],
              (UNITLAYERS.units[MARKS.selectmovetarget] || {}).owner,
              MARKS.selectmovetarget
            ]
          },
          { text: "to" },
          { pos: MARKS.selectdeportdestination }
        ]
      });
    },
    selectswapunit_basic_1: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { select: "Select" },
          { text: "a neighbouring square for" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
              MARKS.selectunit
            ]
          },
          { text: "to step to." },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectswapunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectswapunit] || {}).owner,
              MARKS.selectswapunit
            ]
          },
          { text: "will step in the opposite direction" }
        ]
      });
    },
    selectswap1target_basic_1: step => {
      let ARTIFACTS = step.ARTIFACTS;
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "swap" },
          { text: "to step" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
              MARKS.selectunit
            ]
          },
          { text: "to" },
          { pos: MARKS.selectswap1target },
          { text: "and" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectswapunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectswapunit] || {}).owner,
              MARKS.selectswapunit
            ]
          },
          { text: "to" },
          { pos: Object.keys(ARTIFACTS.swap2step)[0] }
        ]
      });
    },
    startTurn_basic_2: step => {
      return collapseContent({
        line: [
          { select: "Select" },
          { unittype: ["pawn", 2] },
          { text: "," },
          { unittype: ["bishop", 2] },
          { text: "or" },
          { unittype: ["king", 2] },
          { text: "to move" }
        ]
      });
    },
    move_basic_2: () => defaultInstruction(2),
    swap_basic_2: () => defaultInstruction(2),
    selectunit_basic_2: step => {
      let ARTIFACTS = step.ARTIFACTS;
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      let LINKS = step.LINKS;
      return collapseContent({
        line: [
          { select: "Select" },
          collapseContent({
            line: [
              Object.keys(ARTIFACTS.movetargets).length !== 0
                ? collapseContent({
                    line: [
                      { text: "where to move" },
                      {
                        unit: [
                          iconMapping[
                            (UNITLAYERS.units[MARKS.selectunit] || {}).group
                          ],
                          (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
                          MARKS.selectunit
                        ]
                      }
                    ]
                  })
                : undefined,
              !!Object.keys(LINKS.marks).find(
                a => LINKS.marks[a] === "selectswapunit" + 2
              )
                ? collapseContent({
                    line: [
                      { text: "another unit to swap" },
                      {
                        unit: [
                          iconMapping[
                            (UNITLAYERS.units[MARKS.selectunit] || {}).group
                          ],
                          (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
                          MARKS.selectunit
                        ]
                      },
                      { text: "with" }
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
    selectmovetarget_basic_2: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return UNITLAYERS.units[MARKS.selectmovetarget] &&
        !TERRAIN2.oppbase[MARKS.selectmovetarget]
        ? collapseContent({
            line: [
              { select: "Select" },
              { text: "where" },
              {
                unit: [
                  iconMapping[
                    (UNITLAYERS.units[MARKS.selectmovetarget] || {}).group
                  ],
                  (UNITLAYERS.units[MARKS.selectmovetarget] || {}).owner,
                  MARKS.selectmovetarget
                ]
              },
              { text: "should end up" }
            ]
          })
        : collapseContent({
            line: [
              { text: "Press" },
              { command: "move" },
              { text: "to make" },
              {
                unit: [
                  iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
                  (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
                  MARKS.selectunit
                ]
              },
              { text: "go to" },
              { pos: MARKS.selectmovetarget }
            ]
          });
    },
    selectdeportdestination_basic_2: step => {
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
              (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
              MARKS.selectunit
            ]
          },
          { text: "go to" },
          { pos: MARKS.selectmovetarget },
          { text: "and deport" },
          {
            unit: [
              iconMapping[
                (UNITLAYERS.units[MARKS.selectmovetarget] || {}).group
              ],
              (UNITLAYERS.units[MARKS.selectmovetarget] || {}).owner,
              MARKS.selectmovetarget
            ]
          },
          { text: "to" },
          { pos: MARKS.selectdeportdestination }
        ]
      });
    },
    selectswapunit_basic_2: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { select: "Select" },
          { text: "a neighbouring square for" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
              MARKS.selectunit
            ]
          },
          { text: "to step to." },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectswapunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectswapunit] || {}).owner,
              MARKS.selectswapunit
            ]
          },
          { text: "will step in the opposite direction" }
        ]
      });
    },
    selectswap1target_basic_2: step => {
      let ARTIFACTS = step.ARTIFACTS;
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "swap" },
          { text: "to step" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
              MARKS.selectunit
            ]
          },
          { text: "to" },
          { pos: MARKS.selectswap1target },
          { text: "and" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectswapunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectswapunit] || {}).owner,
              MARKS.selectswapunit
            ]
          },
          { text: "to" },
          { pos: Object.keys(ARTIFACTS.swap2step)[0] }
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
        marks: ["c5"],
        potentialMarks: ["d3", "a4", "b4", "c4", "d4", "b5"],
        setup: {
          piokers: {
            "1": ["b1", "e2"],
            "2": ["d3", "b5"]
          },
          pinets: {
            "1": ["e1", "a2"],
            "2": ["a4", "e5"]
          },
          piases: {
            "1": ["c3"],
            "2": ["c5"]
          }
        }
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
    }
  },
  setups: {
    basic: {
      pinets: {
        "1": ["a1", "e1"],
        "2": ["a5", "e5"]
      },
      piokers: {
        "1": ["b1", "d1"],
        "2": ["b5", "d5"]
      },
      piases: {
        "1": ["c1"],
        "2": ["c5"]
      }
    }
  }
};
export default game;
