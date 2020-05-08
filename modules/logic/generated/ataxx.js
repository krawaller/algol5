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
const iconMapping = { microbes: "pawn" };
let TERRAIN1, TERRAIN2, connections, relativeDirs, BOARD, dimensions;
const groupLayers1 = {
  microbes: [
    ["units", "microbes"],
    ["units", "myunits", "microbes"],
    ["units", "oppunits", "microbes"]
  ]
};
const groupLayers2 = {
  microbes: [
    ["units", "microbes"],
    ["units", "oppunits", "microbes"],
    ["units", "myunits", "microbes"]
  ]
};
const emptyArtifactLayers_basic = {
  splittargets: {},
  movetargets: {},
  jumptargets: {},
  assimilated: {}
};
const game = {
  gameId: "ataxx",
  commands: { split: {}, jump: {} },
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
    let UNITLAYERS = { units: {}, myunits: {}, oppunits: {}, microbes: {} };
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
        microbes: oldUnitLayers.microbes
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
        microbes: oldUnitLayers.microbes
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
        TURN: step.TURN,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    selectunit_basic_1: (step, newMarkPos) => {
      let ARTIFACTS = {
        jumptargets: {},
        movetargets: {},
        splittargets: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let startconnections = connections[MARKS.selectunit];
        for (let DIR of ringTwoDirs) {
          let POS = startconnections[DIR];
          if (POS && !UNITLAYERS.units[POS]) {
            {
              ARTIFACTS.jumptargets[POS] = emptyObj;
            }
            {
              ARTIFACTS.movetargets[POS] = emptyObj;
            }
          }
        }
      }
      {
        let startconnections = connections[MARKS.selectunit];
        for (let DIR of roseDirs) {
          let POS = startconnections[DIR];
          if (POS && !UNITLAYERS.units[POS]) {
            {
              ARTIFACTS.splittargets[POS] = emptyObj;
            }
            {
              ARTIFACTS.movetargets[POS] = emptyObj;
            }
          }
        }
      }
      for (const pos of Object.keys(ARTIFACTS.jumptargets)) {
        LINKS.marks[pos] = "selectjumptarget_basic_1";
      }
      for (const pos of Object.keys(ARTIFACTS.splittargets)) {
        LINKS.marks[pos] = "selectsplittarget_basic_1";
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
    },
    selectsplittarget_basic_1: (step, newMarkPos) => {
      let ARTIFACTS = {
        jumptargets: step.ARTIFACTS.jumptargets,
        movetargets: step.ARTIFACTS.movetargets,
        splittargets: step.ARTIFACTS.splittargets,
        assimilated: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: step.MARKS.selectunit,
        selectsplittarget: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let startconnections =
          connections[MARKS.selectjumptarget || MARKS.selectsplittarget];
        for (let DIR of roseDirs) {
          let POS = startconnections[DIR];
          if (POS && UNITLAYERS.oppunits[POS]) {
            ARTIFACTS.assimilated[POS] = emptyObj;
          }
        }
      }
      LINKS.commands.split = "split_basic_1";
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    selectjumptarget_basic_1: (step, newMarkPos) => {
      let ARTIFACTS = {
        jumptargets: step.ARTIFACTS.jumptargets,
        movetargets: step.ARTIFACTS.movetargets,
        splittargets: step.ARTIFACTS.splittargets,
        assimilated: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: step.MARKS.selectunit,
        selectjumptarget: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let startconnections =
          connections[MARKS.selectjumptarget || MARKS.selectsplittarget];
        for (let DIR of roseDirs) {
          let POS = startconnections[DIR];
          if (POS && UNITLAYERS.oppunits[POS]) {
            ARTIFACTS.assimilated[POS] = emptyObj;
          }
        }
      }
      LINKS.commands.jump = "jump_basic_1";
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    selectunit_basic_2: (step, newMarkPos) => {
      let ARTIFACTS = {
        jumptargets: {},
        movetargets: {},
        splittargets: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let startconnections = connections[MARKS.selectunit];
        for (let DIR of ringTwoDirs) {
          let POS = startconnections[DIR];
          if (POS && !UNITLAYERS.units[POS]) {
            {
              ARTIFACTS.jumptargets[POS] = emptyObj;
            }
            {
              ARTIFACTS.movetargets[POS] = emptyObj;
            }
          }
        }
      }
      {
        let startconnections = connections[MARKS.selectunit];
        for (let DIR of roseDirs) {
          let POS = startconnections[DIR];
          if (POS && !UNITLAYERS.units[POS]) {
            {
              ARTIFACTS.splittargets[POS] = emptyObj;
            }
            {
              ARTIFACTS.movetargets[POS] = emptyObj;
            }
          }
        }
      }
      for (const pos of Object.keys(ARTIFACTS.jumptargets)) {
        LINKS.marks[pos] = "selectjumptarget_basic_2";
      }
      for (const pos of Object.keys(ARTIFACTS.splittargets)) {
        LINKS.marks[pos] = "selectsplittarget_basic_2";
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
    },
    selectsplittarget_basic_2: (step, newMarkPos) => {
      let ARTIFACTS = {
        jumptargets: step.ARTIFACTS.jumptargets,
        movetargets: step.ARTIFACTS.movetargets,
        splittargets: step.ARTIFACTS.splittargets,
        assimilated: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: step.MARKS.selectunit,
        selectsplittarget: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let startconnections =
          connections[MARKS.selectjumptarget || MARKS.selectsplittarget];
        for (let DIR of roseDirs) {
          let POS = startconnections[DIR];
          if (POS && UNITLAYERS.oppunits[POS]) {
            ARTIFACTS.assimilated[POS] = emptyObj;
          }
        }
      }
      LINKS.commands.split = "split_basic_2";
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    selectjumptarget_basic_2: (step, newMarkPos) => {
      let ARTIFACTS = {
        jumptargets: step.ARTIFACTS.jumptargets,
        movetargets: step.ARTIFACTS.movetargets,
        splittargets: step.ARTIFACTS.splittargets,
        assimilated: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: step.MARKS.selectunit,
        selectjumptarget: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let startconnections =
          connections[MARKS.selectjumptarget || MARKS.selectsplittarget];
        for (let DIR of roseDirs) {
          let POS = startconnections[DIR];
          if (POS && UNITLAYERS.oppunits[POS]) {
            ARTIFACTS.assimilated[POS] = emptyObj;
          }
        }
      }
      LINKS.commands.jump = "jump_basic_2";
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    split_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
      let ARTIFACTS = {
        jumptargets: step.ARTIFACTS.jumptargets,
        movetargets: step.ARTIFACTS.movetargets,
        splittargets: step.ARTIFACTS.splittargets,
        assimilated: step.ARTIFACTS.assimilated
      };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let NEXTSPAWNID = step.NEXTSPAWNID;
      let MARKS = step.MARKS;
      anim.enterFrom[MARKS.selectsplittarget] = MARKS.selectunit;
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: MARKS.selectsplittarget,
          id: newunitid,
          group: "microbes",
          owner: 1
        };
      }
      for (let LOOPPOS in ARTIFACTS.assimilated) {
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
      UNITLAYERS = { units: {}, myunits: {}, oppunits: {}, microbes: {} };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (Object.keys(UNITLAYERS.units).length === 49) {
        LINKS.endGame = ["draw", "win", "lose"][
          Object.keys(UNITLAYERS.myunits).length > 24 ? 1 : 2
        ];
        LINKS.endedBy = "dominance";
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
        NEXTSPAWNID,
        anim
      };
    },
    jump_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        jumptargets: step.ARTIFACTS.jumptargets,
        movetargets: step.ARTIFACTS.movetargets,
        splittargets: step.ARTIFACTS.splittargets,
        assimilated: step.ARTIFACTS.assimilated
      };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      {
        let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: MARKS.selectjumptarget
          };
        }
      }
      for (let LOOPPOS in ARTIFACTS.assimilated) {
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
      UNITLAYERS = { units: {}, myunits: {}, oppunits: {}, microbes: {} };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (Object.keys(UNITLAYERS.units).length === 49) {
        LINKS.endGame = ["draw", "win", "lose"][
          Object.keys(UNITLAYERS.myunits).length > 24 ? 1 : 2
        ];
        LINKS.endedBy = "dominance";
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
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    split_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
      let ARTIFACTS = {
        jumptargets: step.ARTIFACTS.jumptargets,
        movetargets: step.ARTIFACTS.movetargets,
        splittargets: step.ARTIFACTS.splittargets,
        assimilated: step.ARTIFACTS.assimilated
      };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let NEXTSPAWNID = step.NEXTSPAWNID;
      let MARKS = step.MARKS;
      anim.enterFrom[MARKS.selectsplittarget] = MARKS.selectunit;
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: MARKS.selectsplittarget,
          id: newunitid,
          group: "microbes",
          owner: 2
        };
      }
      for (let LOOPPOS in ARTIFACTS.assimilated) {
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
      UNITLAYERS = { units: {}, myunits: {}, oppunits: {}, microbes: {} };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (Object.keys(UNITLAYERS.units).length === 49) {
        LINKS.endGame = ["draw", "lose", "win"][
          Object.keys(UNITLAYERS.myunits).length > 24 ? 2 : 1
        ];
        LINKS.endedBy = "dominance";
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
        NEXTSPAWNID,
        anim
      };
    },
    jump_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        jumptargets: step.ARTIFACTS.jumptargets,
        movetargets: step.ARTIFACTS.movetargets,
        splittargets: step.ARTIFACTS.splittargets,
        assimilated: step.ARTIFACTS.assimilated
      };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      {
        let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: MARKS.selectjumptarget
          };
        }
      }
      for (let LOOPPOS in ARTIFACTS.assimilated) {
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
      UNITLAYERS = { units: {}, myunits: {}, oppunits: {}, microbes: {} };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (Object.keys(UNITLAYERS.units).length === 49) {
        LINKS.endGame = ["draw", "lose", "win"][
          Object.keys(UNITLAYERS.myunits).length > 24 ? 2 : 1
        ];
        LINKS.endedBy = "dominance";
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
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    }
  },
  instruction: {
    startTurn_basic_1: step => {
      return collapseContent({
        line: [
          { select: "Select" },
          { unittype: ["pawn", 1] },
          { text: "to act with" }
        ]
      });
    },
    split_basic_1: () => defaultInstruction(1),
    jump_basic_1: () => defaultInstruction(1),
    selectunit_basic_1: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Select where to jump or split with" },
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
    selectsplittarget_basic_1: step => {
      let ARTIFACTS = step.ARTIFACTS;
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "split" },
          { text: "to spawn" },
          { unit: ["pawn", 1, MARKS.selectsplittarget] },
          Object.keys(ARTIFACTS.assimilated).length !== 0
            ? collapseContent({
                line: [
                  { text: "and assimilate" },
                  collapseContent({
                    line: Object.keys(ARTIFACTS.assimilated)
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
                  })
                ]
              })
            : undefined
        ]
      });
    },
    selectjumptarget_basic_1: step => {
      let ARTIFACTS = step.ARTIFACTS;
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "jump" },
          { text: "to move" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
              MARKS.selectunit
            ]
          },
          { text: "to" },
          { pos: MARKS.selectjumptarget },
          Object.keys(ARTIFACTS.assimilated).length !== 0
            ? collapseContent({
                line: [
                  { text: "and assimilate" },
                  collapseContent({
                    line: Object.keys(ARTIFACTS.assimilated)
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
                  })
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
          { unittype: ["pawn", 2] },
          { text: "to act with" }
        ]
      });
    },
    split_basic_2: () => defaultInstruction(2),
    jump_basic_2: () => defaultInstruction(2),
    selectunit_basic_2: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Select where to jump or split with" },
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
    selectsplittarget_basic_2: step => {
      let ARTIFACTS = step.ARTIFACTS;
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "split" },
          { text: "to spawn" },
          { unit: ["pawn", 2, MARKS.selectsplittarget] },
          Object.keys(ARTIFACTS.assimilated).length !== 0
            ? collapseContent({
                line: [
                  { text: "and assimilate" },
                  collapseContent({
                    line: Object.keys(ARTIFACTS.assimilated)
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
                  })
                ]
              })
            : undefined
        ]
      });
    },
    selectjumptarget_basic_2: step => {
      let ARTIFACTS = step.ARTIFACTS;
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "jump" },
          { text: "to move" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
              MARKS.selectunit
            ]
          },
          { text: "to" },
          { pos: MARKS.selectjumptarget },
          Object.keys(ARTIFACTS.assimilated).length !== 0
            ? collapseContent({
                line: [
                  { text: "and assimilate" },
                  collapseContent({
                    line: Object.keys(ARTIFACTS.assimilated)
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
                  })
                ]
              })
            : undefined
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
      height: 7,
      width: 7,
      terrain: {},
      offset: "ring2"
    }
  },
  setups: {
    basic: {
      microbes: {
        "1": ["a7", "g1"],
        "2": ["a1", "g7"]
      }
    }
  }
};
export default game;
