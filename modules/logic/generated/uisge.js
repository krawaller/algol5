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
import boards from "../../games/definitions/uisge/boards";
import setups from "../../games/definitions/uisge/setups";
import variants from "../../games/definitions/uisge/variants";
const emptyObj = {};
const iconMapping = { soldiers: "pawn", kings: "king" };
let TERRAIN1, TERRAIN2, connections, relativeDirs, BOARD, dimensions;
const groupLayers1 = {
  soldiers: [
    ["units", "soldiers"],
    ["units", "myunits", "soldiers"],
    ["units", "oppunits", "soldiers"]
  ],
  kings: [
    ["units", "kings"],
    ["units", "myunits", "kings", "mykings"],
    ["units", "oppunits", "kings", "oppkings"]
  ]
};
const groupLayers2 = {
  soldiers: [
    ["units", "soldiers"],
    ["units", "oppunits", "soldiers"],
    ["units", "myunits", "soldiers"]
  ],
  kings: [
    ["units", "kings"],
    ["units", "oppunits", "kings", "oppkings"],
    ["units", "myunits", "kings", "mykings"]
  ]
};
const prefixes1 = ["neutral", "my", "opp"];
const prefixes2 = ["neutral", "opp", "my"];
const emptyArtifactLayers_basic = {
  jumptargets: {},
  steptargets: {},
  group: {}
};
const game = {
  gameId: "uisge",
  commands: { jump: {}, step: {} },
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
      soldiers: {},
      kings: {},
      mykings: {},
      oppkings: {}
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
        soldiers: oldUnitLayers.soldiers,
        kings: oldUnitLayers.kings,
        mykings: oldUnitLayers.oppkings,
        oppkings: oldUnitLayers.mykings
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
        soldiers: oldUnitLayers.soldiers,
        kings: oldUnitLayers.kings,
        mykings: oldUnitLayers.oppkings,
        oppkings: oldUnitLayers.mykings
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
        jumptargets: {},
        steptargets: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let allowedsteps = UNITLAYERS.units;
        let BLOCKS = Object.keys(BOARD.board)
          .filter(k => !UNITLAYERS.units.hasOwnProperty(k))
          .reduce((m, k) => {
            m[k] = emptyObj;
            return m;
          }, {});
        for (let DIR of orthoDirs) {
          let walkedsquares = [];
          let STOPREASON = "";
          let POS = MARKS.selectunit;
          while (
            !(STOPREASON = !(POS = connections[POS][DIR])
              ? "outofbounds"
              : BLOCKS[POS]
              ? "hitblock"
              : !allowedsteps[POS]
              ? "nomoresteps"
              : null)
          ) {
            walkedsquares.push(POS);
          }
          let WALKLENGTH = walkedsquares.length;
          if (BLOCKS[POS]) {
            if (WALKLENGTH === 1) {
              ARTIFACTS.jumptargets[POS] = emptyObj;
            }
          }
        }
      }
      if (UNITLAYERS.kings[MARKS.selectunit]) {
        {
          let startconnections = connections[MARKS.selectunit];
          for (let DIR of roseDirs) {
            let POS = startconnections[DIR];
            if (POS && !UNITLAYERS.units[POS]) {
              ARTIFACTS.steptargets[POS] = emptyObj;
            }
          }
        }
      }
      for (const pos of Object.keys(ARTIFACTS.jumptargets)) {
        LINKS.marks[pos] = "selectjumptarget_basic_1";
      }
      if (UNITLAYERS.kings[MARKS.selectunit]) {
        for (const pos of Object.keys(ARTIFACTS.steptargets)) {
          LINKS.marks[pos] = "selectsteptarget_basic_1";
        }
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
    selectjumptarget_basic_1: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.jump = "jump_basic_1";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: {
          selectunit: step.MARKS.selectunit,
          selectjumptarget: newMarkPos
        }
      };
    },
    selectsteptarget_basic_1: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.step = "step_basic_1";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: {
          selectunit: step.MARKS.selectunit,
          selectsteptarget: newMarkPos
        }
      };
    },
    selectunit_basic_2: (step, newMarkPos) => {
      let ARTIFACTS = {
        jumptargets: {},
        steptargets: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let allowedsteps = UNITLAYERS.units;
        let BLOCKS = Object.keys(BOARD.board)
          .filter(k => !UNITLAYERS.units.hasOwnProperty(k))
          .reduce((m, k) => {
            m[k] = emptyObj;
            return m;
          }, {});
        for (let DIR of orthoDirs) {
          let walkedsquares = [];
          let STOPREASON = "";
          let POS = MARKS.selectunit;
          while (
            !(STOPREASON = !(POS = connections[POS][DIR])
              ? "outofbounds"
              : BLOCKS[POS]
              ? "hitblock"
              : !allowedsteps[POS]
              ? "nomoresteps"
              : null)
          ) {
            walkedsquares.push(POS);
          }
          let WALKLENGTH = walkedsquares.length;
          if (BLOCKS[POS]) {
            if (WALKLENGTH === 1) {
              ARTIFACTS.jumptargets[POS] = emptyObj;
            }
          }
        }
      }
      if (UNITLAYERS.kings[MARKS.selectunit]) {
        {
          let startconnections = connections[MARKS.selectunit];
          for (let DIR of roseDirs) {
            let POS = startconnections[DIR];
            if (POS && !UNITLAYERS.units[POS]) {
              ARTIFACTS.steptargets[POS] = emptyObj;
            }
          }
        }
      }
      for (const pos of Object.keys(ARTIFACTS.jumptargets)) {
        LINKS.marks[pos] = "selectjumptarget_basic_2";
      }
      if (UNITLAYERS.kings[MARKS.selectunit]) {
        for (const pos of Object.keys(ARTIFACTS.steptargets)) {
          LINKS.marks[pos] = "selectsteptarget_basic_2";
        }
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
    selectjumptarget_basic_2: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.jump = "jump_basic_2";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: {
          selectunit: step.MARKS.selectunit,
          selectjumptarget: newMarkPos
        }
      };
    },
    selectsteptarget_basic_2: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.step = "step_basic_2";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: {
          selectunit: step.MARKS.selectunit,
          selectsteptarget: newMarkPos
        }
      };
    },
    jump_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        jumptargets: step.ARTIFACTS.jumptargets,
        steptargets: step.ARTIFACTS.steptargets,
        group: {}
      };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      {
        let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            group: UNITLAYERS.kings[MARKS.selectunit] ? "soldiers" : "kings"
          };
        }
      }
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
        soldiers: {},
        kings: {},
        mykings: {},
        oppkings: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      const visited = {};
      const toCheck = [Object.keys(UNITLAYERS.units)[0]];
      const steps = UNITLAYERS.units;
      while (toCheck.length) {
        const from = toCheck.shift();
        visited[from] = true;
        for (const DIR of orthoDirs) {
          const POS = connections[from][DIR];
          if (POS && !visited[POS] && steps[POS]) {
            toCheck.push(POS);
            ARTIFACTS.group[POS] = emptyObj;
          }
        }
      }
      if (Object.keys(ARTIFACTS.group).length === 11) {
        if (Object.keys(UNITLAYERS.mykings).length === 6) {
          LINKS.endGame = "win";
          LINKS.endedBy = "domination";
          LINKS.endMarks = Object.keys(UNITLAYERS.mykings);
        } else {
          LINKS.endTurn = "startTurn_basic_2";
        }
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
    step_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        jumptargets: step.ARTIFACTS.jumptargets,
        steptargets: step.ARTIFACTS.steptargets,
        group: {}
      };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      {
        let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: MARKS.selectsteptarget
          };
        }
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        soldiers: {},
        kings: {},
        mykings: {},
        oppkings: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      const visited = {};
      const toCheck = [Object.keys(UNITLAYERS.units)[0]];
      const steps = UNITLAYERS.units;
      while (toCheck.length) {
        const from = toCheck.shift();
        visited[from] = true;
        for (const DIR of orthoDirs) {
          const POS = connections[from][DIR];
          if (POS && !visited[POS] && steps[POS]) {
            toCheck.push(POS);
            ARTIFACTS.group[POS] = emptyObj;
          }
        }
      }
      if (Object.keys(ARTIFACTS.group).length === 11) {
        if (Object.keys(UNITLAYERS.mykings).length === 6) {
          LINKS.endGame = "win";
          LINKS.endedBy = "domination";
          LINKS.endMarks = Object.keys(UNITLAYERS.mykings);
        } else {
          LINKS.endTurn = "startTurn_basic_2";
        }
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
    jump_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        jumptargets: step.ARTIFACTS.jumptargets,
        steptargets: step.ARTIFACTS.steptargets,
        group: {}
      };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      {
        let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            group: UNITLAYERS.kings[MARKS.selectunit] ? "soldiers" : "kings"
          };
        }
      }
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
        soldiers: {},
        kings: {},
        mykings: {},
        oppkings: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      const visited = {};
      const toCheck = [Object.keys(UNITLAYERS.units)[0]];
      const steps = UNITLAYERS.units;
      while (toCheck.length) {
        const from = toCheck.shift();
        visited[from] = true;
        for (const DIR of orthoDirs) {
          const POS = connections[from][DIR];
          if (POS && !visited[POS] && steps[POS]) {
            toCheck.push(POS);
            ARTIFACTS.group[POS] = emptyObj;
          }
        }
      }
      if (Object.keys(ARTIFACTS.group).length === 11) {
        if (Object.keys(UNITLAYERS.mykings).length === 6) {
          LINKS.endGame = "win";
          LINKS.endedBy = "domination";
          LINKS.endMarks = Object.keys(UNITLAYERS.mykings);
        } else {
          LINKS.endTurn = "startTurn_basic_1";
        }
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
    step_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        jumptargets: step.ARTIFACTS.jumptargets,
        steptargets: step.ARTIFACTS.steptargets,
        group: {}
      };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      {
        let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: MARKS.selectsteptarget
          };
        }
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        soldiers: {},
        kings: {},
        mykings: {},
        oppkings: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      const visited = {};
      const toCheck = [Object.keys(UNITLAYERS.units)[0]];
      const steps = UNITLAYERS.units;
      while (toCheck.length) {
        const from = toCheck.shift();
        visited[from] = true;
        for (const DIR of orthoDirs) {
          const POS = connections[from][DIR];
          if (POS && !visited[POS] && steps[POS]) {
            toCheck.push(POS);
            ARTIFACTS.group[POS] = emptyObj;
          }
        }
      }
      if (Object.keys(ARTIFACTS.group).length === 11) {
        if (Object.keys(UNITLAYERS.mykings).length === 6) {
          LINKS.endGame = "win";
          LINKS.endedBy = "domination";
          LINKS.endMarks = Object.keys(UNITLAYERS.mykings);
        } else {
          LINKS.endTurn = "startTurn_basic_1";
        }
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
          { text: "or" },
          { unittype: ["king", 1] },
          { text: "to act with" }
        ]
      });
    },
    jump_basic_1: () => defaultInstruction(1),
    step_basic_1: () => defaultInstruction(1),
    selectunit_basic_1: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Select where to jump" },
          UNITLAYERS.kings[MARKS.selectunit] ? { text: "or step" } : undefined,
          { text: "with" },
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
    selectjumptarget_basic_1: step => {
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
              (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
              MARKS.selectunit
            ]
          },
          { text: "flip to" },
          {
            unit: [
              iconMapping[
                UNITLAYERS.kings[MARKS.selectunit] ? "soldiers" : "kings"
              ],
              1,
              MARKS.selectjumptarget
            ]
          }
        ]
      });
    },
    selectsteptarget_basic_1: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "step" },
          { text: "to move" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
              MARKS.selectunit
            ]
          },
          { text: "to" },
          { pos: MARKS.selectsteptarget }
        ]
      });
    },
    startTurn_basic_2: step => {
      return collapseContent({
        line: [
          { select: "Select" },
          { unittype: ["pawn", 2] },
          { text: "or" },
          { unittype: ["king", 2] },
          { text: "to act with" }
        ]
      });
    },
    jump_basic_2: () => defaultInstruction(2),
    step_basic_2: () => defaultInstruction(2),
    selectunit_basic_2: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Select where to jump" },
          UNITLAYERS.kings[MARKS.selectunit] ? { text: "or step" } : undefined,
          { text: "with" },
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
    selectjumptarget_basic_2: step => {
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
              (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
              MARKS.selectunit
            ]
          },
          { text: "flip to" },
          {
            unit: [
              iconMapping[
                UNITLAYERS.kings[MARKS.selectunit] ? "soldiers" : "kings"
              ],
              2,
              MARKS.selectjumptarget
            ]
          }
        ]
      });
    },
    selectsteptarget_basic_2: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "step" },
          { text: "to move" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
              MARKS.selectunit
            ]
          },
          { text: "to" },
          { pos: MARKS.selectsteptarget }
        ]
      });
    }
  },
  variants,
  boards,
  setups
};
export default game;
