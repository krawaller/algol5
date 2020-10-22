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
import boards from "../../games/definitions/razzledazzle/boards";
import setups from "../../games/definitions/razzledazzle/setups";
import variants from "../../games/definitions/razzledazzle/variants";
const emptyObj = {};
const iconMapping = {
  carriers: "queen",
  receivers: "king",
  resters: "knight",
  ball: "pawn"
};
let TERRAIN1, TERRAIN2, connections, relativeDirs, BOARD, dimensions;
const groupLayers1 = {
  carriers: [
    ["units"],
    ["units", "myunits", "mycarriers"],
    ["units", "oppunits", "oppcarriers"]
  ],
  receivers: [
    ["units"],
    ["units", "myunits", "myreceivers"],
    ["units", "oppunits", "oppreceivers"]
  ],
  resters: [
    ["units", "resters"],
    ["units", "myunits", "resters"],
    ["units", "oppunits", "resters"]
  ],
  ball: [
    ["units", "ball"],
    ["units", "myunits", "ball"],
    ["units", "oppunits", "ball"]
  ]
};
const groupLayers2 = {
  carriers: [
    ["units"],
    ["units", "oppunits", "oppcarriers"],
    ["units", "myunits", "mycarriers"]
  ],
  receivers: [
    ["units"],
    ["units", "oppunits", "oppreceivers"],
    ["units", "myunits", "myreceivers"]
  ],
  resters: [
    ["units", "resters"],
    ["units", "oppunits", "resters"],
    ["units", "myunits", "resters"]
  ],
  ball: [
    ["units", "ball"],
    ["units", "oppunits", "ball"],
    ["units", "myunits", "ball"]
  ]
};
const prefixes1 = ["neutral", "my", "opp"];
const prefixes2 = ["neutral", "opp", "my"];
const game = {
  gameId: "razzledazzle",
  commands: { move: {}, pass: {} },
  iconMap: iconMapping,
  setBoard: board => {
    TERRAIN1 = terrainLayers(board, 1);
    TERRAIN2 = terrainLayers(board, 2);
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
      mycarriers: {},
      oppcarriers: {},
      myreceivers: {},
      oppreceivers: {},
      resters: {},
      ball: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers2[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    return game.action[`startTurn_${ruleset}_1`]({
      BATTLEVARS: {},
      TURN: 0,
      UNITDATA,
      UNITLAYERS
    });
  },
  action: {
    startTurn_basic_1: step => {
      let ARTIFACTS = {
        annoyer: {},
        passtargets: {}
      };
      const oldUnitLayers = step.UNITLAYERS;
      let UNITLAYERS = {
        units: oldUnitLayers.units,
        myunits: oldUnitLayers.oppunits,
        oppunits: oldUnitLayers.myunits,
        mycarriers: oldUnitLayers.oppcarriers,
        oppcarriers: oldUnitLayers.mycarriers,
        myreceivers: oldUnitLayers.oppreceivers,
        oppreceivers: oldUnitLayers.myreceivers,
        resters: oldUnitLayers.resters,
        ball: oldUnitLayers.ball
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      let BATTLEVARS = step.BATTLEVARS;
      if (!!BATTLEVARS["plr2lastmove"]) {
        {
          let STARTPOS = BATTLEVARS["plr2lastmove"];
          let foundneighbours = [];
          let startconnections = connections[STARTPOS];
          for (let DIR of roseDirs) {
            let POS = startconnections[DIR];
            if (POS && UNITLAYERS.mycarriers[POS]) {
              foundneighbours.push(POS);
            }
          }
          let NEIGHBOURCOUNT = foundneighbours.length;
          if (!!NEIGHBOURCOUNT) {
            ARTIFACTS.annoyer[STARTPOS] = emptyObj;
          }
        }
      }
      {
        let BLOCKS = UNITLAYERS.units;
        for (let STARTPOS in UNITLAYERS.mycarriers) {
          for (let DIR of roseDirs) {
            let POS = STARTPOS;
            while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {}
            if (BLOCKS[POS]) {
              if (UNITLAYERS.myreceivers[POS]) {
                ARTIFACTS.passtargets[POS] = emptyObj;
              }
            }
          }
        }
      }
      if (
        Object.keys(ARTIFACTS.annoyer).length !== 0 &&
        Object.keys(ARTIFACTS.passtargets).length !== 0
      ) {
        for (const pos of Object.keys(ARTIFACTS.passtargets)) {
          LINKS.marks[pos] = "selectpasstarget_basic_1";
        }
      } else {
        for (const pos of Object.keys(
          Object.keys(UNITLAYERS.myunits)
            .filter(k => !UNITLAYERS.mycarriers.hasOwnProperty(k))
            .reduce((m, k) => {
              m[k] = emptyObj;
              return m;
            }, {})
        )) {
          LINKS.marks[pos] = "selectmover_basic_1";
        }
        for (const pos of Object.keys(UNITLAYERS.mycarriers)) {
          LINKS.marks[pos] = "selectpasser_basic_1";
        }
      }
      return {
        UNITDATA: step.UNITDATA,
        LINKS,
        UNITLAYERS,
        ARTIFACTS,
        MARKS: {},
        TURN: step.TURN + 1,
        BATTLEVARS
      };
    },
    startTurn_basic_2: step => {
      let ARTIFACTS = {
        annoyer: {},
        passtargets: {}
      };
      const oldUnitLayers = step.UNITLAYERS;
      let UNITLAYERS = {
        units: oldUnitLayers.units,
        myunits: oldUnitLayers.oppunits,
        oppunits: oldUnitLayers.myunits,
        mycarriers: oldUnitLayers.oppcarriers,
        oppcarriers: oldUnitLayers.mycarriers,
        myreceivers: oldUnitLayers.oppreceivers,
        oppreceivers: oldUnitLayers.myreceivers,
        resters: oldUnitLayers.resters,
        ball: oldUnitLayers.ball
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      let BATTLEVARS = step.BATTLEVARS;
      if (!!BATTLEVARS["plr1lastmove"]) {
        {
          let STARTPOS = BATTLEVARS["plr1lastmove"];
          let foundneighbours = [];
          let startconnections = connections[STARTPOS];
          for (let DIR of roseDirs) {
            let POS = startconnections[DIR];
            if (POS && UNITLAYERS.mycarriers[POS]) {
              foundneighbours.push(POS);
            }
          }
          let NEIGHBOURCOUNT = foundneighbours.length;
          if (!!NEIGHBOURCOUNT) {
            ARTIFACTS.annoyer[STARTPOS] = emptyObj;
          }
        }
      }
      {
        let BLOCKS = UNITLAYERS.units;
        for (let STARTPOS in UNITLAYERS.mycarriers) {
          for (let DIR of roseDirs) {
            let POS = STARTPOS;
            while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {}
            if (BLOCKS[POS]) {
              if (UNITLAYERS.myreceivers[POS]) {
                ARTIFACTS.passtargets[POS] = emptyObj;
              }
            }
          }
        }
      }
      if (
        Object.keys(ARTIFACTS.annoyer).length !== 0 &&
        Object.keys(ARTIFACTS.passtargets).length !== 0
      ) {
        for (const pos of Object.keys(ARTIFACTS.passtargets)) {
          LINKS.marks[pos] = "selectpasstarget_basic_2";
        }
      } else {
        for (const pos of Object.keys(
          Object.keys(UNITLAYERS.myunits)
            .filter(k => !UNITLAYERS.mycarriers.hasOwnProperty(k))
            .reduce((m, k) => {
              m[k] = emptyObj;
              return m;
            }, {})
        )) {
          LINKS.marks[pos] = "selectmover_basic_2";
        }
        for (const pos of Object.keys(UNITLAYERS.mycarriers)) {
          LINKS.marks[pos] = "selectpasser_basic_2";
        }
      }
      return {
        UNITDATA: step.UNITDATA,
        LINKS,
        UNITLAYERS,
        ARTIFACTS,
        MARKS: {},
        TURN: step.TURN,
        BATTLEVARS
      };
    },
    selectmover_basic_1: (step, newMarkPos) => {
      let ARTIFACTS = {
        annoyer: step.ARTIFACTS.annoyer,
        passtargets: step.ARTIFACTS.passtargets,
        movetargets: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectmover: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let startconnections = connections[MARKS.selectmover];
        for (let DIR of knightDirs) {
          let POS = startconnections[DIR];
          if (POS && !UNITLAYERS.units[POS]) {
            ARTIFACTS.movetargets[POS] = emptyObj;
          }
        }
      }
      for (const pos of Object.keys(ARTIFACTS.movetargets)) {
        LINKS.marks[pos] = "selectmovetarget_basic_1";
      }
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS,
        BATTLEVARS: step.BATTLEVARS
      };
    },
    selectpasser_basic_1: (step, newMarkPos) => {
      let ARTIFACTS = {
        annoyer: step.ARTIFACTS.annoyer,
        passtargets: step.ARTIFACTS.passtargets
      };
      let LINKS = { marks: {}, commands: {} };
      for (const pos of Object.keys(ARTIFACTS.passtargets)) {
        LINKS.marks[pos] = "selectpasstarget_basic_1";
      }
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: { selectpasser: newMarkPos },
        BATTLEVARS: step.BATTLEVARS
      };
    },
    selectpasstarget_basic_1: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.pass = "pass_basic_1";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: { selectpasstarget: newMarkPos },
        BATTLEVARS: step.BATTLEVARS
      };
    },
    selectmovetarget_basic_1: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.move = "move_basic_1";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: {
          selectmover: step.MARKS.selectmover,
          selectmovetarget: newMarkPos
        },
        BATTLEVARS: step.BATTLEVARS
      };
    },
    selectmover_basic_2: (step, newMarkPos) => {
      let ARTIFACTS = {
        annoyer: step.ARTIFACTS.annoyer,
        passtargets: step.ARTIFACTS.passtargets,
        movetargets: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectmover: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let startconnections = connections[MARKS.selectmover];
        for (let DIR of knightDirs) {
          let POS = startconnections[DIR];
          if (POS && !UNITLAYERS.units[POS]) {
            ARTIFACTS.movetargets[POS] = emptyObj;
          }
        }
      }
      for (const pos of Object.keys(ARTIFACTS.movetargets)) {
        LINKS.marks[pos] = "selectmovetarget_basic_2";
      }
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS,
        BATTLEVARS: step.BATTLEVARS
      };
    },
    selectpasser_basic_2: (step, newMarkPos) => {
      let ARTIFACTS = {
        annoyer: step.ARTIFACTS.annoyer,
        passtargets: step.ARTIFACTS.passtargets
      };
      let LINKS = { marks: {}, commands: {} };
      for (const pos of Object.keys(ARTIFACTS.passtargets)) {
        LINKS.marks[pos] = "selectpasstarget_basic_2";
      }
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: { selectpasser: newMarkPos },
        BATTLEVARS: step.BATTLEVARS
      };
    },
    selectpasstarget_basic_2: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.pass = "pass_basic_2";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: { selectpasstarget: newMarkPos },
        BATTLEVARS: step.BATTLEVARS
      };
    },
    selectmovetarget_basic_2: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.move = "move_basic_2";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: {
          selectmover: step.MARKS.selectmover,
          selectmovetarget: newMarkPos
        },
        BATTLEVARS: step.BATTLEVARS
      };
    },
    move_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let UNITLAYERS = step.UNITLAYERS;
      let BATTLEVARS = { ...step.BATTLEVARS };
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      if (UNITLAYERS.resters[MARKS.selectmover]) {
        {
          let unitid = (UNITLAYERS.units[MARKS.selectmover] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              group: "receivers"
            };
          }
        }
      }
      {
        let unitid = (UNITLAYERS.units[MARKS.selectmover] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: MARKS.selectmovetarget
          };
        }
      }
      BATTLEVARS.plr1lastmove = MARKS.selectmovetarget;
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        mycarriers: {},
        oppcarriers: {},
        myreceivers: {},
        oppreceivers: {},
        resters: {},
        ball: {}
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
            Object.keys(UNITLAYERS.mycarriers)
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
        LINKS.endedBy = "goal";
        LINKS.endMarks = Object.keys(UNITLAYERS.mycarriers);
      } else {
        LINKS.endTurn = "startTurn_basic_2";
      }
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS: step.ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS,
        BATTLEVARS
      };
    },
    pass_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
      let ARTIFACTS = {
        passtargets: { ...step.ARTIFACTS.passtargets },
        annoyer: step.ARTIFACTS.annoyer
      };
      let UNITLAYERS = step.UNITLAYERS;
      let BATTLEVARS = { ...step.BATTLEVARS };
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      ARTIFACTS.passtargets = {};
      for (let LOOPPOS in UNITLAYERS.mycarriers) {
        anim.ghosts.push([LOOPPOS, MARKS.selectpasstarget, "pawn", 1]);
      }
      BATTLEVARS.plr1lastmove = "";
      for (let LOOPPOS in UNITLAYERS.mycarriers) {
        {
          let unitid = (UNITLAYERS.units[LOOPPOS] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              group: "resters"
            };
          }
        }
      }
      {
        let unitid = (UNITLAYERS.units[MARKS.selectpasstarget] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            group: "carriers"
          };
        }
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        mycarriers: {},
        oppcarriers: {},
        myreceivers: {},
        oppreceivers: {},
        resters: {},
        ball: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      {
        let BLOCKS = UNITLAYERS.units;
        for (let STARTPOS in UNITLAYERS.mycarriers) {
          for (let DIR of roseDirs) {
            let POS = STARTPOS;
            while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {}
            if (BLOCKS[POS]) {
              if (UNITLAYERS.myreceivers[POS]) {
                ARTIFACTS.passtargets[POS] = emptyObj;
              }
            }
          }
        }
      }
      if (
        Object.keys(
          Object.entries(
            Object.keys(UNITLAYERS.mycarriers)
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
        LINKS.endedBy = "goal";
        LINKS.endMarks = Object.keys(UNITLAYERS.mycarriers);
      } else {
        LINKS.endTurn = "startTurn_basic_2";
      }
      for (const pos of Object.keys(ARTIFACTS.passtargets)) {
        LINKS.marks[pos] = "selectpasstarget_basic_1";
      }
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS,
        BATTLEVARS,
        anim
      };
    },
    move_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let UNITLAYERS = step.UNITLAYERS;
      let BATTLEVARS = { ...step.BATTLEVARS };
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      if (UNITLAYERS.resters[MARKS.selectmover]) {
        {
          let unitid = (UNITLAYERS.units[MARKS.selectmover] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              group: "receivers"
            };
          }
        }
      }
      {
        let unitid = (UNITLAYERS.units[MARKS.selectmover] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: MARKS.selectmovetarget
          };
        }
      }
      BATTLEVARS.plr2lastmove = MARKS.selectmovetarget;
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        mycarriers: {},
        oppcarriers: {},
        myreceivers: {},
        oppreceivers: {},
        resters: {},
        ball: {}
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
            Object.keys(UNITLAYERS.mycarriers)
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
        LINKS.endedBy = "goal";
        LINKS.endMarks = Object.keys(UNITLAYERS.mycarriers);
      } else {
        LINKS.endTurn = "startTurn_basic_1";
      }
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS: step.ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS,
        BATTLEVARS
      };
    },
    pass_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
      let ARTIFACTS = {
        passtargets: { ...step.ARTIFACTS.passtargets },
        annoyer: step.ARTIFACTS.annoyer
      };
      let UNITLAYERS = step.UNITLAYERS;
      let BATTLEVARS = { ...step.BATTLEVARS };
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      ARTIFACTS.passtargets = {};
      for (let LOOPPOS in UNITLAYERS.mycarriers) {
        anim.ghosts.push([LOOPPOS, MARKS.selectpasstarget, "pawn", 2]);
      }
      BATTLEVARS.plr2lastmove = "";
      for (let LOOPPOS in UNITLAYERS.mycarriers) {
        {
          let unitid = (UNITLAYERS.units[LOOPPOS] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              group: "resters"
            };
          }
        }
      }
      {
        let unitid = (UNITLAYERS.units[MARKS.selectpasstarget] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            group: "carriers"
          };
        }
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        mycarriers: {},
        oppcarriers: {},
        myreceivers: {},
        oppreceivers: {},
        resters: {},
        ball: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      {
        let BLOCKS = UNITLAYERS.units;
        for (let STARTPOS in UNITLAYERS.mycarriers) {
          for (let DIR of roseDirs) {
            let POS = STARTPOS;
            while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {}
            if (BLOCKS[POS]) {
              if (UNITLAYERS.myreceivers[POS]) {
                ARTIFACTS.passtargets[POS] = emptyObj;
              }
            }
          }
        }
      }
      if (
        Object.keys(
          Object.entries(
            Object.keys(UNITLAYERS.mycarriers)
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
        LINKS.endedBy = "goal";
        LINKS.endMarks = Object.keys(UNITLAYERS.mycarriers);
      } else {
        LINKS.endTurn = "startTurn_basic_1";
      }
      for (const pos of Object.keys(ARTIFACTS.passtargets)) {
        LINKS.marks[pos] = "selectpasstarget_basic_2";
      }
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS,
        BATTLEVARS,
        anim
      };
    }
  },
  instruction: {
    startTurn_basic_1: step => {
      let ARTIFACTS = step.ARTIFACTS;
      let UNITLAYERS = step.UNITLAYERS;
      return Object.keys(ARTIFACTS.annoyer).length !== 0 &&
        Object.keys(ARTIFACTS.passtargets).length !== 0
        ? collapseContent({
            line: [
              { text: "Since" },
              collapseContent({
                line: Object.keys(ARTIFACTS.annoyer)
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
              { text: "is intimidating" },
              collapseContent({
                line: Object.keys(UNITLAYERS.mycarriers)
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
              { text: "you must" },
              { select: "select" },
              { text: "a" },
              { unittype: ["king", 1] },
              { text: "to throw to" }
            ]
          })
        : Object.keys(ARTIFACTS.annoyer).length !== 0
        ? collapseContent({
            line: [
              collapseContent({
                line: Object.keys(ARTIFACTS.annoyer)
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
              { text: "intimidates" },
              collapseContent({
                line: Object.keys(UNITLAYERS.mycarriers)
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
              { text: "but there's no one to pass to, so you may" },
              { select: "select" },
              { text: "a unit to move with" }
            ]
          })
        : collapseContent({
            line: [{ select: "Select" }, { text: "a unit to act with" }]
          });
    },
    move_basic_1: () => defaultInstruction(1),
    pass_basic_1: step => {
      let ARTIFACTS = step.ARTIFACTS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          collapseContent({
            line: [
              collapseContent({
                line: [
                  { text: "Press" },
                  { endTurn: "end turn" },
                  { text: "to hand over to" },
                  { player: 2 }
                ]
              }),
              Object.keys(ARTIFACTS.passtargets).length !== 0
                ? collapseContent({
                    line: [
                      { select: "select" },
                      { text: "another" },
                      { unittype: ["king", 1] },
                      { text: "for" },
                      collapseContent({
                        line: Object.keys(UNITLAYERS.mycarriers)
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
                      { text: "to pass on to" }
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
    selectmover_basic_1: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { select: "Select" },
          { text: "where to move" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectmover] || {}).group],
              (UNITLAYERS.units[MARKS.selectmover] || {}).owner,
              MARKS.selectmover
            ]
          }
        ]
      });
    },
    selectpasser_basic_1: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { select: "Select" },
          { text: "a" },
          { unittype: ["king", 1] },
          { text: "for" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectpasser] || {}).group],
              (UNITLAYERS.units[MARKS.selectpasser] || {}).owner,
              MARKS.selectpasser
            ]
          },
          { text: "to pass to" }
        ]
      });
    },
    selectpasstarget_basic_1: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "pass" },
          { text: "to make" },
          collapseContent({
            line: Object.keys(UNITLAYERS.mycarriers)
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
          { text: "throw to" },
          {
            unit: [
              iconMapping[
                (UNITLAYERS.units[MARKS.selectpasstarget] || {}).group
              ],
              (UNITLAYERS.units[MARKS.selectpasstarget] || {}).owner,
              MARKS.selectpasstarget
            ]
          }
        ]
      });
    },
    selectmovetarget_basic_1: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "move" },
          { text: "to make" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectmover] || {}).group],
              (UNITLAYERS.units[MARKS.selectmover] || {}).owner,
              MARKS.selectmover
            ]
          },
          { text: "go to" },
          { pos: MARKS.selectmovetarget },
          UNITLAYERS.resters[MARKS.selectmover]
            ? collapseContent({
                line: [{ text: "and become able to receive passes again" }]
              })
            : undefined
        ]
      });
    },
    startTurn_basic_2: step => {
      let ARTIFACTS = step.ARTIFACTS;
      let UNITLAYERS = step.UNITLAYERS;
      return Object.keys(ARTIFACTS.annoyer).length !== 0 &&
        Object.keys(ARTIFACTS.passtargets).length !== 0
        ? collapseContent({
            line: [
              { text: "Since" },
              collapseContent({
                line: Object.keys(ARTIFACTS.annoyer)
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
              { text: "is intimidating" },
              collapseContent({
                line: Object.keys(UNITLAYERS.mycarriers)
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
              { text: "you must" },
              { select: "select" },
              { text: "a" },
              { unittype: ["king", 2] },
              { text: "to throw to" }
            ]
          })
        : Object.keys(ARTIFACTS.annoyer).length !== 0
        ? collapseContent({
            line: [
              collapseContent({
                line: Object.keys(ARTIFACTS.annoyer)
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
              { text: "intimidates" },
              collapseContent({
                line: Object.keys(UNITLAYERS.mycarriers)
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
              { text: "but there's no one to pass to, so you may" },
              { select: "select" },
              { text: "a unit to move with" }
            ]
          })
        : collapseContent({
            line: [{ select: "Select" }, { text: "a unit to act with" }]
          });
    },
    move_basic_2: () => defaultInstruction(2),
    pass_basic_2: step => {
      let ARTIFACTS = step.ARTIFACTS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          collapseContent({
            line: [
              collapseContent({
                line: [
                  { text: "Press" },
                  { endTurn: "end turn" },
                  { text: "to hand over to" },
                  { player: 1 }
                ]
              }),
              Object.keys(ARTIFACTS.passtargets).length !== 0
                ? collapseContent({
                    line: [
                      { select: "select" },
                      { text: "another" },
                      { unittype: ["king", 2] },
                      { text: "for" },
                      collapseContent({
                        line: Object.keys(UNITLAYERS.mycarriers)
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
                      { text: "to pass on to" }
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
    selectmover_basic_2: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { select: "Select" },
          { text: "where to move" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectmover] || {}).group],
              (UNITLAYERS.units[MARKS.selectmover] || {}).owner,
              MARKS.selectmover
            ]
          }
        ]
      });
    },
    selectpasser_basic_2: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { select: "Select" },
          { text: "a" },
          { unittype: ["king", 2] },
          { text: "for" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectpasser] || {}).group],
              (UNITLAYERS.units[MARKS.selectpasser] || {}).owner,
              MARKS.selectpasser
            ]
          },
          { text: "to pass to" }
        ]
      });
    },
    selectpasstarget_basic_2: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "pass" },
          { text: "to make" },
          collapseContent({
            line: Object.keys(UNITLAYERS.mycarriers)
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
          { text: "throw to" },
          {
            unit: [
              iconMapping[
                (UNITLAYERS.units[MARKS.selectpasstarget] || {}).group
              ],
              (UNITLAYERS.units[MARKS.selectpasstarget] || {}).owner,
              MARKS.selectpasstarget
            ]
          }
        ]
      });
    },
    selectmovetarget_basic_2: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "move" },
          { text: "to make" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectmover] || {}).group],
              (UNITLAYERS.units[MARKS.selectmover] || {}).owner,
              MARKS.selectmover
            ]
          },
          { text: "go to" },
          { pos: MARKS.selectmovetarget },
          UNITLAYERS.resters[MARKS.selectmover]
            ? collapseContent({
                line: [{ text: "and become able to receive passes again" }]
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
