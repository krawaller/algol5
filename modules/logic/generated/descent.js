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
const dimensions = { height: 4, width: 4 };
const BOARD = boardLayers(dimensions);
const iconMapping = {
  lvl3: "queen",
  lvl2: "rook",
  lvl1: "knight",
  lvl0: "pawn"
};
const emptyArtifactLayers = { movetargets: {}, digtargets: {}, winline: {} };
const connections = boardConnections({ height: 4, width: 4 });
const relativeDirs = makeRelativeDirs([]);
let TERRAIN1;
let TERRAIN2;
const groupLayers1 = {
  lvl3: [
    ["units", "neutralunits", "lvl3"],
    ["units", "myunits", "lvl3", "mylvl3"],
    ["units", "oppunits", "lvl3", "opplvl3"]
  ],
  lvl2: [
    ["units", "neutralunits", "lvl2"],
    ["units", "myunits", "lvl2", "mylvl2"],
    ["units", "oppunits", "lvl2", "opplvl2"]
  ],
  lvl1: [
    ["units", "neutralunits", "lvl1"],
    ["units", "myunits", "lvl1", "mylvl1"],
    ["units", "oppunits", "lvl1", "opplvl1"]
  ],
  lvl0: [
    ["units", "neutralunits", "lvl0"],
    ["units", "myunits", "lvl0", "mylvl0"],
    ["units", "oppunits", "lvl0", "opplvl0"]
  ]
};
const groupLayers2 = {
  lvl3: [
    ["units", "neutralunits", "lvl3"],
    ["units", "oppunits", "lvl3", "opplvl3"],
    ["units", "myunits", "lvl3", "mylvl3"]
  ],
  lvl2: [
    ["units", "neutralunits", "lvl2"],
    ["units", "oppunits", "lvl2", "opplvl2"],
    ["units", "myunits", "lvl2", "mylvl2"]
  ],
  lvl1: [
    ["units", "neutralunits", "lvl1"],
    ["units", "oppunits", "lvl1", "opplvl1"],
    ["units", "myunits", "lvl1", "mylvl1"]
  ],
  lvl0: [
    ["units", "neutralunits", "lvl0"],
    ["units", "oppunits", "lvl0", "opplvl0"],
    ["units", "myunits", "lvl0", "mylvl0"]
  ]
};
const game = {
  gameId: "descent",
  commands: { move: {}, dig: {} },
  iconMap: iconMapping,
  newBattle: setup => {
    let UNITDATA = setup2army(setup);
    let UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {},
      lvl3: {},
      mylvl3: {},
      opplvl3: {},
      lvl2: {},
      mylvl2: {},
      opplvl2: {},
      lvl1: {},
      mylvl1: {},
      opplvl1: {},
      lvl0: {},
      mylvl0: {},
      opplvl0: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers2[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    let terrain = {};
    TERRAIN1 = terrainLayers(4, 4, terrain, 1);
    TERRAIN2 = terrainLayers(4, 4, terrain, 2);
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
        myunits: oldUnitLayers.oppunits,
        oppunits: oldUnitLayers.myunits,
        neutralunits: oldUnitLayers.neutralunits,
        lvl3: oldUnitLayers.lvl3,
        mylvl3: oldUnitLayers.opplvl3,
        opplvl3: oldUnitLayers.mylvl3,
        lvl2: oldUnitLayers.lvl2,
        mylvl2: oldUnitLayers.opplvl2,
        opplvl2: oldUnitLayers.mylvl2,
        lvl1: oldUnitLayers.lvl1,
        mylvl1: oldUnitLayers.opplvl1,
        opplvl1: oldUnitLayers.mylvl1,
        lvl0: oldUnitLayers.lvl0,
        mylvl0: oldUnitLayers.opplvl0,
        opplvl0: oldUnitLayers.mylvl0
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      for (const pos of Object.keys(UNITLAYERS.myunits)) {
        LINKS.marks[pos] = "selectunit1";
      }
      return {
        UNITDATA: step.UNITDATA,
        LINKS,
        UNITLAYERS,
        ARTIFACTS: emptyArtifactLayers,
        MARKS: {},
        TURN: step.TURN + 1,
        NEXTSPAWNID: step.NEXTSPAWNID,
        TURNVARS: {}
      };
    },
    startTurn2: step => {
      const oldUnitLayers = step.UNITLAYERS;
      let UNITLAYERS = {
        units: oldUnitLayers.units,
        myunits: oldUnitLayers.oppunits,
        oppunits: oldUnitLayers.myunits,
        neutralunits: oldUnitLayers.neutralunits,
        lvl3: oldUnitLayers.lvl3,
        mylvl3: oldUnitLayers.opplvl3,
        opplvl3: oldUnitLayers.mylvl3,
        lvl2: oldUnitLayers.lvl2,
        mylvl2: oldUnitLayers.opplvl2,
        opplvl2: oldUnitLayers.mylvl2,
        lvl1: oldUnitLayers.lvl1,
        mylvl1: oldUnitLayers.opplvl1,
        opplvl1: oldUnitLayers.mylvl1,
        lvl0: oldUnitLayers.lvl0,
        mylvl0: oldUnitLayers.opplvl0,
        opplvl0: oldUnitLayers.mylvl0
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      for (const pos of Object.keys(UNITLAYERS.myunits)) {
        LINKS.marks[pos] = "selectunit2";
      }
      return {
        UNITDATA: step.UNITDATA,
        LINKS,
        UNITLAYERS,
        ARTIFACTS: emptyArtifactLayers,
        MARKS: {},
        TURN: step.TURN,
        NEXTSPAWNID: step.NEXTSPAWNID,
        TURNVARS: {}
      };
    },
    selectunit1: (step, newMarkPos) => {
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
        for (let DIR of roseDirs) {
          let POS = startconnections[DIR];
          if (
            POS &&
            (UNITLAYERS.lvl3[MARKS.selectunit]
              ? !UNITLAYERS.lvl1[POS] && !UNITLAYERS.lvl0[POS]
              : UNITLAYERS.lvl2[MARKS.selectunit]
              ? !UNITLAYERS.lvl0[POS]
              : UNITLAYERS.lvl1[MARKS.selectunit]
              ? !UNITLAYERS.lvl3[POS]
              : !UNITLAYERS.lvl2[POS] && !UNITLAYERS.lvl3[POS])
          ) {
            if (UNITLAYERS.neutralunits[POS]) {
              ARTIFACTS.movetargets[POS] = emptyObj;
            }
          }
        }
      }
      for (const pos of Object.keys(ARTIFACTS.movetargets)) {
        LINKS.marks[pos] = "selectmovetarget1";
      }
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS,
        TURNVARS: step.TURNVARS,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    selectmovetarget1: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.move = "move1";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: {
          selectunit: step.MARKS.selectunit,
          selectmovetarget: newMarkPos
        },
        TURNVARS: step.TURNVARS,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    selectdigtarget1: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.dig = "dig1";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: { selectdigtarget: newMarkPos },
        TURNVARS: step.TURNVARS,
        NEXTSPAWNID: step.NEXTSPAWNID,
        canAlwaysEnd: true
      };
    },
    selectunit2: (step, newMarkPos) => {
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
        for (let DIR of roseDirs) {
          let POS = startconnections[DIR];
          if (
            POS &&
            (UNITLAYERS.lvl3[MARKS.selectunit]
              ? !UNITLAYERS.lvl1[POS] && !UNITLAYERS.lvl0[POS]
              : UNITLAYERS.lvl2[MARKS.selectunit]
              ? !UNITLAYERS.lvl0[POS]
              : UNITLAYERS.lvl1[MARKS.selectunit]
              ? !UNITLAYERS.lvl3[POS]
              : !UNITLAYERS.lvl2[POS] && !UNITLAYERS.lvl3[POS])
          ) {
            if (UNITLAYERS.neutralunits[POS]) {
              ARTIFACTS.movetargets[POS] = emptyObj;
            }
          }
        }
      }
      for (const pos of Object.keys(ARTIFACTS.movetargets)) {
        LINKS.marks[pos] = "selectmovetarget2";
      }
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS,
        TURNVARS: step.TURNVARS,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    selectmovetarget2: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.move = "move2";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: {
          selectunit: step.MARKS.selectunit,
          selectmovetarget: newMarkPos
        },
        TURNVARS: step.TURNVARS,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    selectdigtarget2: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.dig = "dig2";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: { selectdigtarget: newMarkPos },
        TURNVARS: step.TURNVARS,
        NEXTSPAWNID: step.NEXTSPAWNID,
        canAlwaysEnd: true
      };
    },
    move1: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        digtargets: {}
      };
      let UNITLAYERS = step.UNITLAYERS;
      let TURNVARS = { ...step.TURNVARS };
      let UNITDATA = { ...step.UNITDATA };
      let NEXTSPAWNID = step.NEXTSPAWNID;
      let MARKS = step.MARKS;
      TURNVARS.movedto = MARKS.selectmovetarget;
      TURNVARS.heightfrom = (UNITLAYERS.units[MARKS.selectunit] || {}).group;
      TURNVARS.heightto = (
        UNITLAYERS.units[MARKS.selectmovetarget] || {}
      ).group;
      {
        let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            group: TURNVARS["heightto"]
          };
        }
      }
      delete UNITDATA[(UNITLAYERS.units[MARKS.selectmovetarget] || {}).id];
      {
        let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: MARKS.selectmovetarget
          };
        }
      }
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: MARKS.selectunit,
          id: newunitid,
          group: TURNVARS["heightfrom"],
          owner: 0
        };
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        neutralunits: {},
        lvl3: {},
        mylvl3: {},
        opplvl3: {},
        lvl2: {},
        mylvl2: {},
        opplvl2: {},
        lvl1: {},
        mylvl1: {},
        opplvl1: {},
        lvl0: {},
        mylvl0: {},
        opplvl0: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      {
        let startconnections = connections[TURNVARS["movedto"]];
        for (let DIR of roseDirs) {
          let POS = startconnections[DIR];
          if (POS && UNITLAYERS.neutralunits[POS] && !UNITLAYERS.lvl0[POS]) {
            ARTIFACTS.digtargets[POS] = emptyObj;
          }
        }
      }
      for (const pos of Object.keys(ARTIFACTS.digtargets)) {
        LINKS.marks[pos] = "selectdigtarget1";
      }
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS,
        TURNVARS,
        NEXTSPAWNID
      };
    },
    dig1: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        digtargets: step.ARTIFACTS.digtargets,
        winline: {}
      };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      {
        let unitid = (UNITLAYERS.units[MARKS.selectdigtarget] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            group: UNITLAYERS.lvl3[MARKS.selectdigtarget]
              ? "lvl2"
              : UNITLAYERS.lvl2[MARKS.selectdigtarget]
              ? "lvl1"
              : "lvl0"
          };
        }
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        neutralunits: {},
        lvl3: {},
        mylvl3: {},
        opplvl3: {},
        lvl2: {},
        mylvl2: {},
        opplvl2: {},
        lvl1: {},
        mylvl1: {},
        opplvl1: {},
        lvl0: {},
        mylvl0: {},
        opplvl0: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      {
        for (let STARTPOS in UNITLAYERS.myunits) {
          let allowedsteps = UNITLAYERS.mylvl3[STARTPOS]
            ? UNITLAYERS.mylvl3
            : UNITLAYERS.mylvl2[STARTPOS]
            ? UNITLAYERS.mylvl2
            : UNITLAYERS.mylvl1[STARTPOS]
            ? UNITLAYERS.mylvl1
            : UNITLAYERS.mylvl0;
          for (let DIR of roseDirs) {
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
                ARTIFACTS.winline[POS] = emptyObj;
              }
            }
          }
        }
      }
      if (Object.keys(ARTIFACTS.winline).length !== 0) {
        LINKS.endGame = "win";
        LINKS.endedBy = "madeline";
        LINKS.endMarks = Object.keys(ARTIFACTS.winline);
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
        TURNVARS: step.TURNVARS,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    move2: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        digtargets: {}
      };
      let UNITLAYERS = step.UNITLAYERS;
      let TURNVARS = { ...step.TURNVARS };
      let UNITDATA = { ...step.UNITDATA };
      let NEXTSPAWNID = step.NEXTSPAWNID;
      let MARKS = step.MARKS;
      TURNVARS.movedto = MARKS.selectmovetarget;
      TURNVARS.heightfrom = (UNITLAYERS.units[MARKS.selectunit] || {}).group;
      TURNVARS.heightto = (
        UNITLAYERS.units[MARKS.selectmovetarget] || {}
      ).group;
      {
        let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            group: TURNVARS["heightto"]
          };
        }
      }
      delete UNITDATA[(UNITLAYERS.units[MARKS.selectmovetarget] || {}).id];
      {
        let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: MARKS.selectmovetarget
          };
        }
      }
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: MARKS.selectunit,
          id: newunitid,
          group: TURNVARS["heightfrom"],
          owner: 0
        };
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        neutralunits: {},
        lvl3: {},
        mylvl3: {},
        opplvl3: {},
        lvl2: {},
        mylvl2: {},
        opplvl2: {},
        lvl1: {},
        mylvl1: {},
        opplvl1: {},
        lvl0: {},
        mylvl0: {},
        opplvl0: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      {
        let startconnections = connections[TURNVARS["movedto"]];
        for (let DIR of roseDirs) {
          let POS = startconnections[DIR];
          if (POS && UNITLAYERS.neutralunits[POS] && !UNITLAYERS.lvl0[POS]) {
            ARTIFACTS.digtargets[POS] = emptyObj;
          }
        }
      }
      for (const pos of Object.keys(ARTIFACTS.digtargets)) {
        LINKS.marks[pos] = "selectdigtarget2";
      }
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS,
        TURNVARS,
        NEXTSPAWNID
      };
    },
    dig2: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        digtargets: step.ARTIFACTS.digtargets,
        winline: {}
      };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      {
        let unitid = (UNITLAYERS.units[MARKS.selectdigtarget] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            group: UNITLAYERS.lvl3[MARKS.selectdigtarget]
              ? "lvl2"
              : UNITLAYERS.lvl2[MARKS.selectdigtarget]
              ? "lvl1"
              : "lvl0"
          };
        }
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        neutralunits: {},
        lvl3: {},
        mylvl3: {},
        opplvl3: {},
        lvl2: {},
        mylvl2: {},
        opplvl2: {},
        lvl1: {},
        mylvl1: {},
        opplvl1: {},
        lvl0: {},
        mylvl0: {},
        opplvl0: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      {
        for (let STARTPOS in UNITLAYERS.myunits) {
          let allowedsteps = UNITLAYERS.mylvl3[STARTPOS]
            ? UNITLAYERS.mylvl3
            : UNITLAYERS.mylvl2[STARTPOS]
            ? UNITLAYERS.mylvl2
            : UNITLAYERS.mylvl1[STARTPOS]
            ? UNITLAYERS.mylvl1
            : UNITLAYERS.mylvl0;
          for (let DIR of roseDirs) {
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
                ARTIFACTS.winline[POS] = emptyObj;
              }
            }
          }
        }
      }
      if (Object.keys(ARTIFACTS.winline).length !== 0) {
        LINKS.endGame = "win";
        LINKS.endedBy = "madeline";
        LINKS.endMarks = Object.keys(ARTIFACTS.winline);
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
        TURNVARS: step.TURNVARS,
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
              Object.keys(UNITLAYERS.mylvl3).length !== 0
                ? { unittype: ["queen", 1] }
                : undefined,
              Object.keys(UNITLAYERS.mylvl2).length !== 0
                ? { unittype: ["rook", 1] }
                : undefined,
              Object.keys(UNITLAYERS.mylvl1).length !== 0
                ? { unittype: ["knight", 1] }
                : undefined,
              Object.keys(UNITLAYERS.mylvl0).length !== 0
                ? { unittype: ["pawn", 1] }
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
          }),
          { text: "to move and dig with" }
        ]
      });
    },
    move1: step => {
      return collapseContent({
        line: [
          { text: "Now" },
          { select: "select" },
          { text: "a neighbouring" },
          collapseContent({
            line: [
              { unittype: ["queen", 0] },
              { unittype: ["rook", 0] },
              { unittype: ["knight", 0] }
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
          }),
          { text: "to dig" }
        ]
      });
    },
    dig1: () => defaultInstruction(1),
    selectunit1: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { select: "Select" },
          collapseContent({
            line: [
              !UNITLAYERS.lvl3[MARKS.selectunit] &&
              !UNITLAYERS.lvl2[MARKS.selectunit]
                ? { unittype: ["pawn", 0] }
                : undefined,
              !UNITLAYERS.lvl3[MARKS.selectunit]
                ? { unittype: ["knight", 0] }
                : undefined,
              !UNITLAYERS.lvl0[MARKS.selectunit]
                ? { unittype: ["rook", 0] }
                : undefined,
              !UNITLAYERS.lvl0[MARKS.selectunit] &&
              !UNITLAYERS.lvl1[MARKS.selectunit]
                ? { unittype: ["queen", 0] }
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
          }),
          { text: "to move" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
              MARKS.selectunit
            ]
          },
          { text: "to" }
        ]
      });
    },
    selectmovetarget1: step => {
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
          (UNITLAYERS.units[MARKS.selectunit] || {}).group ===
          (UNITLAYERS.units[MARKS.selectmovetarget] || {}).group
            ? { text: "walk" }
            : UNITLAYERS.lvl3[MARKS.selectunit] ||
              (UNITLAYERS.lvl2[MARKS.selectunit] &&
                UNITLAYERS.lvl1[MARKS.selectmovetarget]) ||
              (UNITLAYERS.lvl1[MARKS.selectunit] &&
                UNITLAYERS.lvl0[MARKS.selectmovetarget])
            ? { text: "descend" }
            : { text: "climb" },
          { text: "to" },
          { pos: MARKS.selectmovetarget }
        ]
      });
    },
    selectdigtarget1: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return UNITLAYERS.lvl3[MARKS.selectdigtarget]
        ? collapseContent({
            line: [
              { text: "Press" },
              { command: "dig" },
              { text: "to turn" },
              {
                unit: [
                  iconMapping[
                    (UNITLAYERS.units[MARKS.selectdigtarget] || {}).group
                  ],
                  (UNITLAYERS.units[MARKS.selectdigtarget] || {}).owner,
                  MARKS.selectdigtarget
                ]
              },
              { text: "to" },
              { unittype: ["rook", 0] }
            ]
          })
        : UNITLAYERS.lvl2[MARKS.selectdigtarget]
        ? collapseContent({
            line: [
              { text: "Press" },
              { command: "dig" },
              { text: "to turn" },
              {
                unit: [
                  iconMapping[
                    (UNITLAYERS.units[MARKS.selectdigtarget] || {}).group
                  ],
                  (UNITLAYERS.units[MARKS.selectdigtarget] || {}).owner,
                  MARKS.selectdigtarget
                ]
              },
              { text: "to" },
              { unittype: ["knight", 0] }
            ]
          })
        : collapseContent({
            line: [
              { text: "Press" },
              { command: "dig" },
              { text: "to turn" },
              {
                unit: [
                  iconMapping[
                    (UNITLAYERS.units[MARKS.selectdigtarget] || {}).group
                  ],
                  (UNITLAYERS.units[MARKS.selectdigtarget] || {}).owner,
                  MARKS.selectdigtarget
                ]
              },
              { text: "to" },
              { unittype: ["pawn", 0] }
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
              Object.keys(UNITLAYERS.mylvl3).length !== 0
                ? { unittype: ["queen", 2] }
                : undefined,
              Object.keys(UNITLAYERS.mylvl2).length !== 0
                ? { unittype: ["rook", 2] }
                : undefined,
              Object.keys(UNITLAYERS.mylvl1).length !== 0
                ? { unittype: ["knight", 2] }
                : undefined,
              Object.keys(UNITLAYERS.mylvl0).length !== 0
                ? { unittype: ["pawn", 2] }
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
          }),
          { text: "to move and dig with" }
        ]
      });
    },
    move2: step => {
      return collapseContent({
        line: [
          { text: "Now" },
          { select: "select" },
          { text: "a neighbouring" },
          collapseContent({
            line: [
              { unittype: ["queen", 0] },
              { unittype: ["rook", 0] },
              { unittype: ["knight", 0] }
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
          }),
          { text: "to dig" }
        ]
      });
    },
    dig2: () => defaultInstruction(2),
    selectunit2: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { select: "Select" },
          collapseContent({
            line: [
              !UNITLAYERS.lvl3[MARKS.selectunit] &&
              !UNITLAYERS.lvl2[MARKS.selectunit]
                ? { unittype: ["pawn", 0] }
                : undefined,
              !UNITLAYERS.lvl3[MARKS.selectunit]
                ? { unittype: ["knight", 0] }
                : undefined,
              !UNITLAYERS.lvl0[MARKS.selectunit]
                ? { unittype: ["rook", 0] }
                : undefined,
              !UNITLAYERS.lvl0[MARKS.selectunit] &&
              !UNITLAYERS.lvl1[MARKS.selectunit]
                ? { unittype: ["queen", 0] }
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
          }),
          { text: "to move" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
              MARKS.selectunit
            ]
          },
          { text: "to" }
        ]
      });
    },
    selectmovetarget2: step => {
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
          (UNITLAYERS.units[MARKS.selectunit] || {}).group ===
          (UNITLAYERS.units[MARKS.selectmovetarget] || {}).group
            ? { text: "walk" }
            : UNITLAYERS.lvl3[MARKS.selectunit] ||
              (UNITLAYERS.lvl2[MARKS.selectunit] &&
                UNITLAYERS.lvl1[MARKS.selectmovetarget]) ||
              (UNITLAYERS.lvl1[MARKS.selectunit] &&
                UNITLAYERS.lvl0[MARKS.selectmovetarget])
            ? { text: "descend" }
            : { text: "climb" },
          { text: "to" },
          { pos: MARKS.selectmovetarget }
        ]
      });
    },
    selectdigtarget2: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return UNITLAYERS.lvl3[MARKS.selectdigtarget]
        ? collapseContent({
            line: [
              { text: "Press" },
              { command: "dig" },
              { text: "to turn" },
              {
                unit: [
                  iconMapping[
                    (UNITLAYERS.units[MARKS.selectdigtarget] || {}).group
                  ],
                  (UNITLAYERS.units[MARKS.selectdigtarget] || {}).owner,
                  MARKS.selectdigtarget
                ]
              },
              { text: "to" },
              { unittype: ["rook", 0] }
            ]
          })
        : UNITLAYERS.lvl2[MARKS.selectdigtarget]
        ? collapseContent({
            line: [
              { text: "Press" },
              { command: "dig" },
              { text: "to turn" },
              {
                unit: [
                  iconMapping[
                    (UNITLAYERS.units[MARKS.selectdigtarget] || {}).group
                  ],
                  (UNITLAYERS.units[MARKS.selectdigtarget] || {}).owner,
                  MARKS.selectdigtarget
                ]
              },
              { text: "to" },
              { unittype: ["knight", 0] }
            ]
          })
        : collapseContent({
            line: [
              { text: "Press" },
              { command: "dig" },
              { text: "to turn" },
              {
                unit: [
                  iconMapping[
                    (UNITLAYERS.units[MARKS.selectdigtarget] || {}).group
                  ],
                  (UNITLAYERS.units[MARKS.selectdigtarget] || {}).owner,
                  MARKS.selectdigtarget
                ]
              },
              { text: "to" },
              { unittype: ["pawn", 0] }
            ]
          });
    }
  }
};
export default game;
