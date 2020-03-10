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
const iconMapping = { towers: "rook", walls: "pawn" };
const emptyArtifactLayers = {
  movetargets: {},
  madetowers: {},
  madewalls: {},
  crushtargets: {}
};
let TERRAIN1, TERRAIN2, connections, relativeDirs, BOARD, dimensions;
const groupLayers1 = {
  towers: [
    ["units", "towers"],
    ["units", "myunits", "towers", "mytowers"],
    ["units", "oppunits", "towers", "opptowers"]
  ],
  walls: [
    ["units", "walls"],
    ["units", "myunits", "walls", "mywalls"],
    ["units", "oppunits", "walls", "oppwalls"]
  ]
};
const groupLayers2 = {
  towers: [
    ["units", "towers"],
    ["units", "oppunits", "towers", "opptowers"],
    ["units", "myunits", "towers", "mytowers"]
  ],
  walls: [
    ["units", "walls"],
    ["units", "oppunits", "walls", "oppwalls"],
    ["units", "myunits", "walls", "mywalls"]
  ]
};
const game = {
  gameId: "murusgallicus",
  commands: { move: {}, crush: {} },
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
      towers: {},
      mytowers: {},
      opptowers: {},
      walls: {},
      mywalls: {},
      oppwalls: {}
    };
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
        towers: oldUnitLayers.towers,
        mytowers: oldUnitLayers.opptowers,
        opptowers: oldUnitLayers.mytowers,
        walls: oldUnitLayers.walls,
        mywalls: oldUnitLayers.oppwalls,
        oppwalls: oldUnitLayers.mywalls
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      for (const pos of Object.keys(UNITLAYERS.mytowers)) {
        LINKS.marks[pos] = "selecttower_basic_1";
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
    startTurn_basic_2: step => {
      const oldUnitLayers = step.UNITLAYERS;
      let UNITLAYERS = {
        units: oldUnitLayers.units,
        myunits: oldUnitLayers.oppunits,
        oppunits: oldUnitLayers.myunits,
        towers: oldUnitLayers.towers,
        mytowers: oldUnitLayers.opptowers,
        opptowers: oldUnitLayers.mytowers,
        walls: oldUnitLayers.walls,
        mywalls: oldUnitLayers.oppwalls,
        oppwalls: oldUnitLayers.mywalls
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      for (const pos of Object.keys(UNITLAYERS.mytowers)) {
        LINKS.marks[pos] = "selecttower_basic_2";
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
    selecttower_basic_1: (step, newMarkPos) => {
      let ARTIFACTS = {
        movetargets: {},
        crushtargets: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selecttower: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let BLOCKS = { ...UNITLAYERS.oppunits, ...UNITLAYERS.mytowers };
        for (let DIR of roseDirs) {
          let walkedsquares = [];
          let MAX = 2;
          let POS = MARKS.selecttower;
          let LENGTH = 0;
          while (
            LENGTH < MAX &&
            (POS = connections[POS][DIR]) &&
            !BLOCKS[POS]
          ) {
            walkedsquares.push(POS);
            LENGTH++;
          }
          let WALKLENGTH = walkedsquares.length;
          let STEP = 0;
          for (let walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
            POS = walkedsquares[walkstepper];
            STEP++;
            if (WALKLENGTH === 2 && STEP === 2) {
              ARTIFACTS.movetargets[POS] = { dir: DIR };
            }
          }
        }
      }
      {
        let startconnections = connections[MARKS.selecttower];
        for (let DIR of roseDirs) {
          let POS = startconnections[DIR];
          if (POS && UNITLAYERS.oppwalls[POS]) {
            ARTIFACTS.crushtargets[POS] = emptyObj;
          }
        }
      }
      for (const pos of Object.keys(ARTIFACTS.movetargets)) {
        LINKS.marks[pos] = "selectmove_basic_1";
      }
      for (const pos of Object.keys(ARTIFACTS.crushtargets)) {
        LINKS.marks[pos] = "selectcrush_basic_1";
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
    selectmove_basic_1: (step, newMarkPos) => {
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        crushtargets: step.ARTIFACTS.crushtargets,
        madetowers: {},
        madewalls: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selecttower: step.MARKS.selecttower,
        selectmove: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let STARTPOS = MARKS.selectmove;
        let POS =
          connections[STARTPOS][
            relativeDirs[5][(ARTIFACTS.movetargets[MARKS.selectmove] || {}).dir]
          ];
        if (POS) {
          ARTIFACTS[UNITLAYERS.myunits[POS] ? "madetowers" : "madewalls"][
            POS
          ] = emptyObj;
        }
        ARTIFACTS[
          UNITLAYERS.myunits[MARKS.selectmove] ? "madetowers" : "madewalls"
        ][STARTPOS] = emptyObj;
      }
      LINKS.commands.move = "move_basic_1";
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
    selectcrush_basic_1: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.crush = "crush_basic_1";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: { selecttower: step.MARKS.selecttower, selectcrush: newMarkPos },
        NEXTSPAWNID: step.NEXTSPAWNID,
        canAlwaysEnd: true
      };
    },
    selecttower_basic_2: (step, newMarkPos) => {
      let ARTIFACTS = {
        movetargets: {},
        crushtargets: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selecttower: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let BLOCKS = { ...UNITLAYERS.oppunits, ...UNITLAYERS.mytowers };
        for (let DIR of roseDirs) {
          let walkedsquares = [];
          let MAX = 2;
          let POS = MARKS.selecttower;
          let LENGTH = 0;
          while (
            LENGTH < MAX &&
            (POS = connections[POS][DIR]) &&
            !BLOCKS[POS]
          ) {
            walkedsquares.push(POS);
            LENGTH++;
          }
          let WALKLENGTH = walkedsquares.length;
          let STEP = 0;
          for (let walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
            POS = walkedsquares[walkstepper];
            STEP++;
            if (WALKLENGTH === 2 && STEP === 2) {
              ARTIFACTS.movetargets[POS] = { dir: DIR };
            }
          }
        }
      }
      {
        let startconnections = connections[MARKS.selecttower];
        for (let DIR of roseDirs) {
          let POS = startconnections[DIR];
          if (POS && UNITLAYERS.oppwalls[POS]) {
            ARTIFACTS.crushtargets[POS] = emptyObj;
          }
        }
      }
      for (const pos of Object.keys(ARTIFACTS.movetargets)) {
        LINKS.marks[pos] = "selectmove_basic_2";
      }
      for (const pos of Object.keys(ARTIFACTS.crushtargets)) {
        LINKS.marks[pos] = "selectcrush_basic_2";
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
    selectmove_basic_2: (step, newMarkPos) => {
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        crushtargets: step.ARTIFACTS.crushtargets,
        madetowers: {},
        madewalls: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selecttower: step.MARKS.selecttower,
        selectmove: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let STARTPOS = MARKS.selectmove;
        let POS =
          connections[STARTPOS][
            relativeDirs[5][(ARTIFACTS.movetargets[MARKS.selectmove] || {}).dir]
          ];
        if (POS) {
          ARTIFACTS[UNITLAYERS.myunits[POS] ? "madetowers" : "madewalls"][
            POS
          ] = emptyObj;
        }
        ARTIFACTS[
          UNITLAYERS.myunits[MARKS.selectmove] ? "madetowers" : "madewalls"
        ][STARTPOS] = emptyObj;
      }
      LINKS.commands.move = "move_basic_2";
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
    selectcrush_basic_2: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.crush = "crush_basic_2";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: { selecttower: step.MARKS.selecttower, selectcrush: newMarkPos },
        NEXTSPAWNID: step.NEXTSPAWNID,
        canAlwaysEnd: true
      };
    },
    move_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        crushtargets: step.ARTIFACTS.crushtargets,
        madetowers: step.ARTIFACTS.madetowers,
        madewalls: step.ARTIFACTS.madewalls
      };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let NEXTSPAWNID = step.NEXTSPAWNID;
      let MARKS = step.MARKS;
      for (let LOOPPOS in ARTIFACTS.madewalls) {
        anim.enterFrom[LOOPPOS] = MARKS.selecttower;
      }
      for (let LOOPPOS in ARTIFACTS.madetowers) {
        anim.ghosts.push([MARKS.selecttower, LOOPPOS, "pawn", 1]);
      }
      delete UNITDATA[(UNITLAYERS.units[MARKS.selecttower] || {}).id];
      for (let LOOPPOS in ARTIFACTS.madetowers) {
        {
          let unitid = (UNITLAYERS.units[LOOPPOS] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              group: "towers"
            };
          }
        }
      }
      for (let LOOPPOS in ARTIFACTS.madewalls) {
        {
          let newunitid = "spawn" + NEXTSPAWNID++;
          UNITDATA[newunitid] = {
            pos: LOOPPOS,
            id: newunitid,
            group: "walls",
            owner: 1
          };
        }
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        towers: {},
        mytowers: {},
        opptowers: {},
        walls: {},
        mywalls: {},
        oppwalls: {}
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
              .concat(Object.keys(TERRAIN1.opphomerow))
              .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
          )
            .filter(([key, n]) => n === 2)
            .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
        ).length !== 0
      ) {
        LINKS.endGame = "win";
        LINKS.endedBy = "infiltration";
        LINKS.endMarks = Object.keys(
          Object.entries(
            Object.keys(UNITLAYERS.myunits)
              .concat(Object.keys(TERRAIN1.opphomerow))
              .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
          )
            .filter(([key, n]) => n === 2)
            .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
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
        NEXTSPAWNID,
        anim
      };
    },
    crush_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      anim.ghosts.push([MARKS.selecttower, MARKS.selectcrush, "pawn", 1]);
      {
        let unitid = (UNITLAYERS.units[MARKS.selecttower] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            group: "walls"
          };
        }
      }
      delete UNITDATA[(UNITLAYERS.units[MARKS.selectcrush] || {}).id];
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        towers: {},
        mytowers: {},
        opptowers: {},
        walls: {},
        mywalls: {},
        oppwalls: {}
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
              .concat(Object.keys(TERRAIN1.opphomerow))
              .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
          )
            .filter(([key, n]) => n === 2)
            .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
        ).length !== 0
      ) {
        LINKS.endGame = "win";
        LINKS.endedBy = "infiltration";
        LINKS.endMarks = Object.keys(
          Object.entries(
            Object.keys(UNITLAYERS.myunits)
              .concat(Object.keys(TERRAIN1.opphomerow))
              .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
          )
            .filter(([key, n]) => n === 2)
            .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
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
        UNITLAYERS,
        NEXTSPAWNID: step.NEXTSPAWNID,
        anim
      };
    },
    move_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        crushtargets: step.ARTIFACTS.crushtargets,
        madetowers: step.ARTIFACTS.madetowers,
        madewalls: step.ARTIFACTS.madewalls
      };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let NEXTSPAWNID = step.NEXTSPAWNID;
      let MARKS = step.MARKS;
      for (let LOOPPOS in ARTIFACTS.madewalls) {
        anim.enterFrom[LOOPPOS] = MARKS.selecttower;
      }
      for (let LOOPPOS in ARTIFACTS.madetowers) {
        anim.ghosts.push([MARKS.selecttower, LOOPPOS, "pawn", 2]);
      }
      delete UNITDATA[(UNITLAYERS.units[MARKS.selecttower] || {}).id];
      for (let LOOPPOS in ARTIFACTS.madetowers) {
        {
          let unitid = (UNITLAYERS.units[LOOPPOS] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              group: "towers"
            };
          }
        }
      }
      for (let LOOPPOS in ARTIFACTS.madewalls) {
        {
          let newunitid = "spawn" + NEXTSPAWNID++;
          UNITDATA[newunitid] = {
            pos: LOOPPOS,
            id: newunitid,
            group: "walls",
            owner: 2
          };
        }
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        towers: {},
        mytowers: {},
        opptowers: {},
        walls: {},
        mywalls: {},
        oppwalls: {}
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
              .concat(Object.keys(TERRAIN2.opphomerow))
              .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
          )
            .filter(([key, n]) => n === 2)
            .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
        ).length !== 0
      ) {
        LINKS.endGame = "win";
        LINKS.endedBy = "infiltration";
        LINKS.endMarks = Object.keys(
          Object.entries(
            Object.keys(UNITLAYERS.myunits)
              .concat(Object.keys(TERRAIN2.opphomerow))
              .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
          )
            .filter(([key, n]) => n === 2)
            .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
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
        NEXTSPAWNID,
        anim
      };
    },
    crush_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      anim.ghosts.push([MARKS.selecttower, MARKS.selectcrush, "pawn", 2]);
      {
        let unitid = (UNITLAYERS.units[MARKS.selecttower] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            group: "walls"
          };
        }
      }
      delete UNITDATA[(UNITLAYERS.units[MARKS.selectcrush] || {}).id];
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        towers: {},
        mytowers: {},
        opptowers: {},
        walls: {},
        mywalls: {},
        oppwalls: {}
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
              .concat(Object.keys(TERRAIN2.opphomerow))
              .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
          )
            .filter(([key, n]) => n === 2)
            .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
        ).length !== 0
      ) {
        LINKS.endGame = "win";
        LINKS.endedBy = "infiltration";
        LINKS.endMarks = Object.keys(
          Object.entries(
            Object.keys(UNITLAYERS.myunits)
              .concat(Object.keys(TERRAIN2.opphomerow))
              .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
          )
            .filter(([key, n]) => n === 2)
            .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
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
        UNITLAYERS,
        NEXTSPAWNID: step.NEXTSPAWNID,
        anim
      };
    }
  },
  instruction: {
    startTurn_basic_1: step => {
      return collapseContent({
        line: [
          { select: "Select" },
          { unittype: ["rook", 1] },
          { text: "to act with" }
        ]
      });
    },
    move_basic_1: () => defaultInstruction(1),
    crush_basic_1: () => defaultInstruction(1),
    selecttower_basic_1: step => {
      let ARTIFACTS = step.ARTIFACTS;
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { select: "Select" },
          collapseContent({
            line: [
              Object.keys(ARTIFACTS.movetargets).length !== 0
                ? { text: "a move target" }
                : undefined,
              Object.keys(ARTIFACTS.crushtargets).length !== 0
                ? collapseContent({
                    line: [
                      { text: "a" },
                      { unittype: ["pawn", 2] },
                      { text: "to crush" }
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
          }),
          { text: "for" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selecttower] || {}).group],
              (UNITLAYERS.units[MARKS.selecttower] || {}).owner,
              MARKS.selecttower
            ]
          }
        ]
      });
    },
    selectmove_basic_1: step => {
      let ARTIFACTS = step.ARTIFACTS;
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "move" },
          { text: "to overturn" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selecttower] || {}).group],
              (UNITLAYERS.units[MARKS.selecttower] || {}).owner,
              MARKS.selecttower
            ]
          },
          { text: "," },
          collapseContent({
            line: [
              Object.keys(ARTIFACTS.madewalls).length !== 0
                ? collapseContent({
                    line: [
                      { text: "creating" },
                      collapseContent({
                        line: Object.keys(ARTIFACTS.madewalls)
                          .map(p => ({ unit: [iconMapping["walls"], 1, p] }))
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
                : undefined,
              Object.keys(ARTIFACTS.madetowers).length !== 0
                ? collapseContent({
                    line: [
                      { text: "turning" },
                      collapseContent({
                        line: Object.keys(ARTIFACTS.madetowers)
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
                      { unittype: ["rook", 1] }
                    ]
                  })
                : undefined
            ]
              .filter(i => !!i)
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
      });
    },
    selectcrush_basic_1: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "crush" },
          { text: "to turn" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selecttower] || {}).group],
              (UNITLAYERS.units[MARKS.selecttower] || {}).owner,
              MARKS.selecttower
            ]
          },
          { text: "into a" },
          { unittype: ["pawn", 1] },
          { text: "and destroy" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectcrush] || {}).group],
              (UNITLAYERS.units[MARKS.selectcrush] || {}).owner,
              MARKS.selectcrush
            ]
          }
        ]
      });
    },
    startTurn_basic_2: step => {
      return collapseContent({
        line: [
          { select: "Select" },
          { unittype: ["rook", 2] },
          { text: "to act with" }
        ]
      });
    },
    move_basic_2: () => defaultInstruction(2),
    crush_basic_2: () => defaultInstruction(2),
    selecttower_basic_2: step => {
      let ARTIFACTS = step.ARTIFACTS;
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { select: "Select" },
          collapseContent({
            line: [
              Object.keys(ARTIFACTS.movetargets).length !== 0
                ? { text: "a move target" }
                : undefined,
              Object.keys(ARTIFACTS.crushtargets).length !== 0
                ? collapseContent({
                    line: [
                      { text: "a" },
                      { unittype: ["pawn", 1] },
                      { text: "to crush" }
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
          }),
          { text: "for" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selecttower] || {}).group],
              (UNITLAYERS.units[MARKS.selecttower] || {}).owner,
              MARKS.selecttower
            ]
          }
        ]
      });
    },
    selectmove_basic_2: step => {
      let ARTIFACTS = step.ARTIFACTS;
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "move" },
          { text: "to overturn" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selecttower] || {}).group],
              (UNITLAYERS.units[MARKS.selecttower] || {}).owner,
              MARKS.selecttower
            ]
          },
          { text: "," },
          collapseContent({
            line: [
              Object.keys(ARTIFACTS.madewalls).length !== 0
                ? collapseContent({
                    line: [
                      { text: "creating" },
                      collapseContent({
                        line: Object.keys(ARTIFACTS.madewalls)
                          .map(p => ({ unit: [iconMapping["walls"], 2, p] }))
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
                : undefined,
              Object.keys(ARTIFACTS.madetowers).length !== 0
                ? collapseContent({
                    line: [
                      { text: "turning" },
                      collapseContent({
                        line: Object.keys(ARTIFACTS.madetowers)
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
                      { unittype: ["rook", 2] }
                    ]
                  })
                : undefined
            ]
              .filter(i => !!i)
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
      });
    },
    selectcrush_basic_2: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "crush" },
          { text: "to turn" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selecttower] || {}).group],
              (UNITLAYERS.units[MARKS.selecttower] || {}).owner,
              MARKS.selecttower
            ]
          },
          { text: "into a" },
          { unittype: ["pawn", 2] },
          { text: "and destroy" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectcrush] || {}).group],
              (UNITLAYERS.units[MARKS.selectcrush] || {}).owner,
              MARKS.selectcrush
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
      code: "y"
    }
  ],
  boards: {
    basic: {
      height: 7,
      width: 8,
      terrain: {
        homerow: {
          "1": [
            {
              rect: ["a1", "h1"]
            }
          ],
          "2": [
            {
              rect: ["a7", "h7"]
            }
          ]
        }
      }
    }
  },
  setups: {
    basic: {
      towers: {
        "1": [
          {
            rect: ["a1", "h1"]
          }
        ],
        "2": [
          {
            rect: ["a7", "h7"]
          }
        ]
      }
    }
  }
};
export default game;
