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
import boards from "../../games/definitions/gogol/boards";
import setups from "../../games/definitions/gogol/setups";
import variants from "../../games/definitions/gogol/variants";
const emptyObj = {};
const iconMapping = { kings: "king", soldiers: "pawn" };
let TERRAIN1, TERRAIN2, connections, relativeDirs, BOARD, dimensions;
const groupLayers1 = {
  kings: [
    ["units", "kings"],
    ["units", "myunits", "kings", "mykings"],
    ["units", "oppunits", "kings", "oppkings"]
  ],
  soldiers: [
    ["units"],
    ["units", "myunits", "mysoldiers"],
    ["units", "oppunits", "oppsoldiers"]
  ]
};
const groupLayers2 = {
  kings: [
    ["units", "kings"],
    ["units", "oppunits", "kings", "oppkings"],
    ["units", "myunits", "kings", "mykings"]
  ],
  soldiers: [
    ["units"],
    ["units", "oppunits", "oppsoldiers"],
    ["units", "myunits", "mysoldiers"]
  ]
};
const prefixes1 = ["neutral", "my", "opp"];
const prefixes2 = ["neutral", "opp", "my"];
const game = {
  gameId: "gogol",
  commands: { deploy: {}, move: {}, jump: {} },
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
      kings: {},
      mykings: {},
      oppkings: {},
      mysoldiers: {},
      oppsoldiers: {}
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
      let ARTIFACTS = {
        nokings: {},
        nosoldiers: {}
      };
      const oldUnitLayers = step.UNITLAYERS;
      let UNITLAYERS = {
        units: oldUnitLayers.units,
        myunits: oldUnitLayers.oppunits,
        oppunits: oldUnitLayers.myunits,
        kings: oldUnitLayers.kings,
        mykings: oldUnitLayers.oppkings,
        oppkings: oldUnitLayers.mykings,
        mysoldiers: oldUnitLayers.oppsoldiers,
        oppsoldiers: oldUnitLayers.mysoldiers
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      let TURN = step.TURN + 1;
      for (let STARTPOS in Object.entries(
        Object.keys(TERRAIN1.edges)
          .concat(Object.keys(UNITLAYERS.mysoldiers))
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
        let startconnections = connections[STARTPOS];
        for (let DIR of TERRAIN1.homerow[STARTPOS] ? orthoDirs : [1, 5]) {
          let POS = startconnections[DIR];
          if (POS) {
            ARTIFACTS.nokings[POS] = emptyObj;
          }
        }
      }
      for (let STARTPOS in UNITLAYERS.mykings) {
        let startconnections = connections[STARTPOS];
        for (let DIR of orthoDirs) {
          let POS = startconnections[DIR];
          if (
            POS &&
            (TERRAIN1.homerow[POS] ||
              (TERRAIN1.edges[STARTPOS] && TERRAIN1.edges[POS]))
          ) {
            ARTIFACTS.nosoldiers[POS] = emptyObj;
          }
        }
      }
      if (TURN > 1) {
        for (const pos of Object.keys(UNITLAYERS.myunits)) {
          LINKS.marks[pos] = "selectunit_basic_1";
        }
      } else {
        for (const pos of Object.keys(
          Object.keys(BOARD.board)
            .filter(
              k =>
                !{ ...UNITLAYERS.units, ...ARTIFACTS.nokings }.hasOwnProperty(k)
            )
            .reduce((m, k) => {
              m[k] = emptyObj;
              return m;
            }, {})
        )) {
          LINKS.marks[pos] = "selectkingdeploy_basic_1";
        }
      }
      return {
        UNITDATA: step.UNITDATA,
        LINKS,
        UNITLAYERS,
        ARTIFACTS,
        MARKS: {},
        TURN,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    startTurn_basic_2: step => {
      let ARTIFACTS = {
        nokings: {},
        nosoldiers: {}
      };
      const oldUnitLayers = step.UNITLAYERS;
      let UNITLAYERS = {
        units: oldUnitLayers.units,
        myunits: oldUnitLayers.oppunits,
        oppunits: oldUnitLayers.myunits,
        kings: oldUnitLayers.kings,
        mykings: oldUnitLayers.oppkings,
        oppkings: oldUnitLayers.mykings,
        mysoldiers: oldUnitLayers.oppsoldiers,
        oppsoldiers: oldUnitLayers.mysoldiers
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      let TURN = step.TURN;
      for (let STARTPOS in Object.entries(
        Object.keys(TERRAIN2.edges)
          .concat(Object.keys(UNITLAYERS.mysoldiers))
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
        let startconnections = connections[STARTPOS];
        for (let DIR of TERRAIN2.homerow[STARTPOS] ? orthoDirs : [1, 5]) {
          let POS = startconnections[DIR];
          if (POS) {
            ARTIFACTS.nokings[POS] = emptyObj;
          }
        }
      }
      for (let STARTPOS in UNITLAYERS.mykings) {
        let startconnections = connections[STARTPOS];
        for (let DIR of orthoDirs) {
          let POS = startconnections[DIR];
          if (
            POS &&
            (TERRAIN2.homerow[POS] ||
              (TERRAIN2.edges[STARTPOS] && TERRAIN2.edges[POS]))
          ) {
            ARTIFACTS.nosoldiers[POS] = emptyObj;
          }
        }
      }
      if (TURN > 1) {
        for (const pos of Object.keys(UNITLAYERS.myunits)) {
          LINKS.marks[pos] = "selectunit_basic_2";
        }
      } else {
        for (const pos of Object.keys(
          Object.keys(BOARD.board)
            .filter(
              k =>
                !{ ...UNITLAYERS.units, ...ARTIFACTS.nokings }.hasOwnProperty(k)
            )
            .reduce((m, k) => {
              m[k] = emptyObj;
              return m;
            }, {})
        )) {
          LINKS.marks[pos] = "selectkingdeploy_basic_2";
        }
      }
      return {
        UNITDATA: step.UNITDATA,
        LINKS,
        UNITLAYERS,
        ARTIFACTS,
        MARKS: {},
        TURN,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    selectkingdeploy_basic_1: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.deploy = "deploy_basic_1";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: { selectkingdeploy: newMarkPos },
        NEXTSPAWNID: step.NEXTSPAWNID,
        canAlwaysEnd: true
      };
    },
    selectunit_basic_1: (step, newMarkPos) => {
      let ARTIFACTS = {
        nokings: step.ARTIFACTS.nokings,
        nosoldiers: step.ARTIFACTS.nosoldiers,
        kingwalk: {},
        adjacentenemies: {},
        willdie: {},
        jumptargets: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let BLOCKS = UNITLAYERS.units;
        for (let STARTPOS in {
          ...UNITLAYERS.mykings,
          ...{ [MARKS.selectunit]: 1 }
        }) {
          for (let DIR of roseDirs) {
            let POS = STARTPOS;
            while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
              if (!ARTIFACTS.nokings[POS]) {
                ARTIFACTS.kingwalk[POS] = emptyObj;
              }
            }
          }
        }
      }
      {
        let startconnections = connections[MARKS.selectunit];
        for (let DIR of roseDirs) {
          let POS = startconnections[DIR];
          if (POS && UNITLAYERS.oppunits[POS]) {
            ARTIFACTS.adjacentenemies[POS] = { dir: DIR };
          }
        }
      }
      for (let STARTPOS in ARTIFACTS.adjacentenemies) {
        let DIR =
          relativeDirs[1][(ARTIFACTS.adjacentenemies[STARTPOS] || {}).dir];
        let NEIGHBOURCOUNT;
        let POS = connections[STARTPOS][DIR];
        if (
          POS &&
          !{
            ...UNITLAYERS.units,
            ...(UNITLAYERS.mykings[MARKS.selectunit]
              ? ARTIFACTS.nokings
              : ARTIFACTS.nosoldiers)
          }[POS]
        ) {
          NEIGHBOURCOUNT = 1;
          ARTIFACTS.jumptargets[POS] = { dir: DIR };
        }
        if (!!NEIGHBOURCOUNT) {
          ARTIFACTS.willdie[STARTPOS] = { dir: DIR };
        }
      }
      for (const pos of Object.keys(
        UNITLAYERS.mykings[MARKS.selectunit]
          ? ARTIFACTS.kingwalk
          : Object.keys(BOARD.board)
              .filter(
                k =>
                  !{
                    ...UNITLAYERS.units,
                    ...ARTIFACTS.nosoldiers,
                    ...ARTIFACTS.jumptargets
                  }.hasOwnProperty(k)
              )
              .reduce((m, k) => {
                m[k] = emptyObj;
                return m;
              }, {})
      )) {
        LINKS.marks[pos] = "selectmovetarget_basic_1";
      }
      for (const pos of Object.keys(ARTIFACTS.jumptargets)) {
        LINKS.marks[pos] = "selectjumptarget_basic_1";
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
          selectunit: step.MARKS.selectunit,
          selectmovetarget: newMarkPos
        },
        NEXTSPAWNID: step.NEXTSPAWNID,
        canAlwaysEnd: true
      };
    },
    selectjumptarget_basic_1: (step, newMarkPos) => {
      let ARTIFACTS = {
        nokings: step.ARTIFACTS.nokings,
        nosoldiers: step.ARTIFACTS.nosoldiers,
        kingwalk: step.ARTIFACTS.kingwalk,
        adjacentenemies: step.ARTIFACTS.adjacentenemies,
        willdie: step.ARTIFACTS.willdie,
        jumptargets: step.ARTIFACTS.jumptargets,
        splashed: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: step.MARKS.selectunit,
        selectjumptarget: newMarkPos
      };
      {
        let filtersourcelayer = ARTIFACTS.willdie;
        let filtertargetlayer = ARTIFACTS.splashed;
        for (let POS in filtersourcelayer) {
          let filterObj = filtersourcelayer[POS];
          if (
            filterObj.dir ===
            (ARTIFACTS.jumptargets[MARKS.selectjumptarget] || {}).dir
          ) {
            filtertargetlayer[POS] = filterObj;
          }
        }
      }
      LINKS.commands.jump = "jump_basic_1";
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS,
        NEXTSPAWNID: step.NEXTSPAWNID,
        canAlwaysEnd: true
      };
    },
    selectkingdeploy_basic_2: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.deploy = "deploy_basic_2";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: { selectkingdeploy: newMarkPos },
        NEXTSPAWNID: step.NEXTSPAWNID,
        canAlwaysEnd: true
      };
    },
    selectunit_basic_2: (step, newMarkPos) => {
      let ARTIFACTS = {
        nokings: step.ARTIFACTS.nokings,
        nosoldiers: step.ARTIFACTS.nosoldiers,
        kingwalk: {},
        adjacentenemies: {},
        willdie: {},
        jumptargets: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let BLOCKS = UNITLAYERS.units;
        for (let STARTPOS in {
          ...UNITLAYERS.mykings,
          ...{ [MARKS.selectunit]: 1 }
        }) {
          for (let DIR of roseDirs) {
            let POS = STARTPOS;
            while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
              if (!ARTIFACTS.nokings[POS]) {
                ARTIFACTS.kingwalk[POS] = emptyObj;
              }
            }
          }
        }
      }
      {
        let startconnections = connections[MARKS.selectunit];
        for (let DIR of roseDirs) {
          let POS = startconnections[DIR];
          if (POS && UNITLAYERS.oppunits[POS]) {
            ARTIFACTS.adjacentenemies[POS] = { dir: DIR };
          }
        }
      }
      for (let STARTPOS in ARTIFACTS.adjacentenemies) {
        let DIR =
          relativeDirs[1][(ARTIFACTS.adjacentenemies[STARTPOS] || {}).dir];
        let NEIGHBOURCOUNT;
        let POS = connections[STARTPOS][DIR];
        if (
          POS &&
          !{
            ...UNITLAYERS.units,
            ...(UNITLAYERS.mykings[MARKS.selectunit]
              ? ARTIFACTS.nokings
              : ARTIFACTS.nosoldiers)
          }[POS]
        ) {
          NEIGHBOURCOUNT = 1;
          ARTIFACTS.jumptargets[POS] = { dir: DIR };
        }
        if (!!NEIGHBOURCOUNT) {
          ARTIFACTS.willdie[STARTPOS] = { dir: DIR };
        }
      }
      for (const pos of Object.keys(
        UNITLAYERS.mykings[MARKS.selectunit]
          ? ARTIFACTS.kingwalk
          : Object.keys(BOARD.board)
              .filter(
                k =>
                  !{
                    ...UNITLAYERS.units,
                    ...ARTIFACTS.nosoldiers,
                    ...ARTIFACTS.jumptargets
                  }.hasOwnProperty(k)
              )
              .reduce((m, k) => {
                m[k] = emptyObj;
                return m;
              }, {})
      )) {
        LINKS.marks[pos] = "selectmovetarget_basic_2";
      }
      for (const pos of Object.keys(ARTIFACTS.jumptargets)) {
        LINKS.marks[pos] = "selectjumptarget_basic_2";
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
          selectunit: step.MARKS.selectunit,
          selectmovetarget: newMarkPos
        },
        NEXTSPAWNID: step.NEXTSPAWNID,
        canAlwaysEnd: true
      };
    },
    selectjumptarget_basic_2: (step, newMarkPos) => {
      let ARTIFACTS = {
        nokings: step.ARTIFACTS.nokings,
        nosoldiers: step.ARTIFACTS.nosoldiers,
        kingwalk: step.ARTIFACTS.kingwalk,
        adjacentenemies: step.ARTIFACTS.adjacentenemies,
        willdie: step.ARTIFACTS.willdie,
        jumptargets: step.ARTIFACTS.jumptargets,
        splashed: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: step.MARKS.selectunit,
        selectjumptarget: newMarkPos
      };
      {
        let filtersourcelayer = ARTIFACTS.willdie;
        let filtertargetlayer = ARTIFACTS.splashed;
        for (let POS in filtersourcelayer) {
          let filterObj = filtersourcelayer[POS];
          if (
            filterObj.dir ===
            (ARTIFACTS.jumptargets[MARKS.selectjumptarget] || {}).dir
          ) {
            filtertargetlayer[POS] = filterObj;
          }
        }
      }
      LINKS.commands.jump = "jump_basic_2";
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS,
        NEXTSPAWNID: step.NEXTSPAWNID,
        canAlwaysEnd: true
      };
    },
    deploy_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let NEXTSPAWNID = step.NEXTSPAWNID;
      let MARKS = step.MARKS;
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: MARKS.selectkingdeploy,
          id: newunitid,
          group: "kings",
          owner: 1
        };
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        kings: {},
        mykings: {},
        oppkings: {},
        mysoldiers: {},
        oppsoldiers: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      LINKS.endTurn = "startTurn_basic_2";
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS: step.ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS,
        NEXTSPAWNID
      };
    },
    move_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let TURN = step.TURN;
      let MARKS = step.MARKS;
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
        kings: {},
        mykings: {},
        oppkings: {},
        mysoldiers: {},
        oppsoldiers: {}
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
            Object.keys(UNITLAYERS.mykings)
              .concat(Object.keys(TERRAIN1.opphomerow))
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
            Object.keys(UNITLAYERS.mykings)
              .concat(Object.keys(TERRAIN1.opphomerow))
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
      } else if (TURN > 1 && Object.keys(UNITLAYERS.oppkings).length === 0) {
        LINKS.endGame = "win";
        LINKS.endedBy = "regicide";
      } else {
        LINKS.endTurn = "startTurn_basic_2";
      }
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS: step.ARTIFACTS,
        TURN,
        UNITDATA,
        UNITLAYERS,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    jump_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        nokings: step.ARTIFACTS.nokings,
        nosoldiers: step.ARTIFACTS.nosoldiers,
        kingwalk: step.ARTIFACTS.kingwalk,
        adjacentenemies: step.ARTIFACTS.adjacentenemies,
        willdie: step.ARTIFACTS.willdie,
        jumptargets: step.ARTIFACTS.jumptargets,
        splashed: step.ARTIFACTS.splashed
      };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let TURN = step.TURN;
      let MARKS = step.MARKS;
      delete UNITDATA[
        (UNITLAYERS.units[Object.keys(ARTIFACTS.splashed)[0]] || {}).id
      ];
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
        kings: {},
        mykings: {},
        oppkings: {},
        mysoldiers: {},
        oppsoldiers: {}
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
            Object.keys(UNITLAYERS.mykings)
              .concat(Object.keys(TERRAIN1.opphomerow))
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
            Object.keys(UNITLAYERS.mykings)
              .concat(Object.keys(TERRAIN1.opphomerow))
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
      } else if (TURN > 1 && Object.keys(UNITLAYERS.oppkings).length === 0) {
        LINKS.endGame = "win";
        LINKS.endedBy = "regicide";
      } else {
        LINKS.endTurn = "startTurn_basic_2";
      }
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS,
        TURN,
        UNITDATA,
        UNITLAYERS,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    deploy_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let NEXTSPAWNID = step.NEXTSPAWNID;
      let MARKS = step.MARKS;
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: MARKS.selectkingdeploy,
          id: newunitid,
          group: "kings",
          owner: 2
        };
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        kings: {},
        mykings: {},
        oppkings: {},
        mysoldiers: {},
        oppsoldiers: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      LINKS.endTurn = "startTurn_basic_1";
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS: step.ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS,
        NEXTSPAWNID
      };
    },
    move_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let TURN = step.TURN;
      let MARKS = step.MARKS;
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
        kings: {},
        mykings: {},
        oppkings: {},
        mysoldiers: {},
        oppsoldiers: {}
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
            Object.keys(UNITLAYERS.mykings)
              .concat(Object.keys(TERRAIN2.opphomerow))
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
            Object.keys(UNITLAYERS.mykings)
              .concat(Object.keys(TERRAIN2.opphomerow))
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
      } else if (TURN > 1 && Object.keys(UNITLAYERS.oppkings).length === 0) {
        LINKS.endGame = "win";
        LINKS.endedBy = "regicide";
      } else {
        LINKS.endTurn = "startTurn_basic_1";
      }
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS: step.ARTIFACTS,
        TURN,
        UNITDATA,
        UNITLAYERS,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    jump_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        nokings: step.ARTIFACTS.nokings,
        nosoldiers: step.ARTIFACTS.nosoldiers,
        kingwalk: step.ARTIFACTS.kingwalk,
        adjacentenemies: step.ARTIFACTS.adjacentenemies,
        willdie: step.ARTIFACTS.willdie,
        jumptargets: step.ARTIFACTS.jumptargets,
        splashed: step.ARTIFACTS.splashed
      };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let TURN = step.TURN;
      let MARKS = step.MARKS;
      delete UNITDATA[
        (UNITLAYERS.units[Object.keys(ARTIFACTS.splashed)[0]] || {}).id
      ];
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
        kings: {},
        mykings: {},
        oppkings: {},
        mysoldiers: {},
        oppsoldiers: {}
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
            Object.keys(UNITLAYERS.mykings)
              .concat(Object.keys(TERRAIN2.opphomerow))
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
            Object.keys(UNITLAYERS.mykings)
              .concat(Object.keys(TERRAIN2.opphomerow))
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
      } else if (TURN > 1 && Object.keys(UNITLAYERS.oppkings).length === 0) {
        LINKS.endGame = "win";
        LINKS.endedBy = "regicide";
      } else {
        LINKS.endTurn = "startTurn_basic_1";
      }
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS,
        TURN,
        UNITDATA,
        UNITLAYERS,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    }
  },
  instruction: {
    startTurn_basic_1: step => {
      let TURN = step.TURN;
      return TURN > 1
        ? collapseContent({
            line: [
              { select: "Select" },
              { unittype: ["king", 1] },
              { text: "or" },
              { unittype: ["pawn", 1] },
              { text: "to move" }
            ]
          })
        : collapseContent({
            line: [
              { select: "Select" },
              { text: "where to deploy your" },
              { unittype: ["king", 1] }
            ]
          });
    },
    deploy_basic_1: () => defaultInstruction(1),
    move_basic_1: () => defaultInstruction(1),
    jump_basic_1: () => defaultInstruction(1),
    selectkingdeploy_basic_1: step => {
      let MARKS = step.MARKS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "deploy" },
          { text: "to spawn" },
          { unit: ["king", 1, MARKS.selectkingdeploy] }
        ]
      });
    },
    selectunit_basic_1: step => {
      let ARTIFACTS = step.ARTIFACTS;
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return UNITLAYERS.kings[MARKS.selectunit]
        ? collapseContent({
            line: [
              { select: "Select" },
              { text: "where to" },
              collapseContent({
                line: [
                  Object.keys(ARTIFACTS.kingwalk).length !== 0
                    ? { text: "move" }
                    : undefined,
                  Object.keys(ARTIFACTS.jumptargets).length !== 0
                    ? { text: "jump" }
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
              { text: "your" },
              { unittype: ["king", 1] },
              Object.keys(
                Object.entries(
                  Object.keys(ARTIFACTS.nokings)
                    .concat(
                      Object.keys({
                        ...ARTIFACTS.kingwalk,
                        ...ARTIFACTS.jumptargets
                      })
                    )
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
                ? { text: "without making a forbidden configuration" }
                : undefined
            ]
          })
        : collapseContent({
            line: [
              { select: "Select" },
              { text: "where to move" },
              Object.keys(ARTIFACTS.jumptargets).length !== 0
                ? { text: "or jump" }
                : undefined,
              { text: "your" },
              { unittype: ["pawn", 1] },
              Object.keys(ARTIFACTS.nosoldiers).length !== 0
                ? { text: "without making a forbidden configuration" }
                : undefined
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
              iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
              MARKS.selectunit
            ]
          },
          { text: "go" },
          { text: "to" },
          { pos: MARKS.selectmovetarget }
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
          { text: "to make" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
              MARKS.selectunit
            ]
          },
          { text: "jump to" },
          { pos: MARKS.selectjumptarget },
          { text: "and kill" },
          {
            unit: [
              iconMapping[
                (UNITLAYERS.units[Object.keys(ARTIFACTS.splashed)[0]] || {})
                  .group
              ],
              (UNITLAYERS.units[Object.keys(ARTIFACTS.splashed)[0]] || {})
                .owner,
              Object.keys(ARTIFACTS.splashed)[0]
            ]
          }
        ]
      });
    },
    startTurn_basic_2: step => {
      let TURN = step.TURN;
      return TURN > 1
        ? collapseContent({
            line: [
              { select: "Select" },
              { unittype: ["king", 2] },
              { text: "or" },
              { unittype: ["pawn", 2] },
              { text: "to move" }
            ]
          })
        : collapseContent({
            line: [
              { select: "Select" },
              { text: "where to deploy your" },
              { unittype: ["king", 2] }
            ]
          });
    },
    deploy_basic_2: () => defaultInstruction(2),
    move_basic_2: () => defaultInstruction(2),
    jump_basic_2: () => defaultInstruction(2),
    selectkingdeploy_basic_2: step => {
      let MARKS = step.MARKS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "deploy" },
          { text: "to spawn" },
          { unit: ["king", 2, MARKS.selectkingdeploy] }
        ]
      });
    },
    selectunit_basic_2: step => {
      let ARTIFACTS = step.ARTIFACTS;
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return UNITLAYERS.kings[MARKS.selectunit]
        ? collapseContent({
            line: [
              { select: "Select" },
              { text: "where to" },
              collapseContent({
                line: [
                  Object.keys(ARTIFACTS.kingwalk).length !== 0
                    ? { text: "move" }
                    : undefined,
                  Object.keys(ARTIFACTS.jumptargets).length !== 0
                    ? { text: "jump" }
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
              { text: "your" },
              { unittype: ["king", 2] },
              Object.keys(
                Object.entries(
                  Object.keys(ARTIFACTS.nokings)
                    .concat(
                      Object.keys({
                        ...ARTIFACTS.kingwalk,
                        ...ARTIFACTS.jumptargets
                      })
                    )
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
                ? { text: "without making a forbidden configuration" }
                : undefined
            ]
          })
        : collapseContent({
            line: [
              { select: "Select" },
              { text: "where to move" },
              Object.keys(ARTIFACTS.jumptargets).length !== 0
                ? { text: "or jump" }
                : undefined,
              { text: "your" },
              { unittype: ["pawn", 2] },
              Object.keys(ARTIFACTS.nosoldiers).length !== 0
                ? { text: "without making a forbidden configuration" }
                : undefined
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
              iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
              MARKS.selectunit
            ]
          },
          { text: "go" },
          { text: "to" },
          { pos: MARKS.selectmovetarget }
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
          { text: "to make" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
              MARKS.selectunit
            ]
          },
          { text: "jump to" },
          { pos: MARKS.selectjumptarget },
          { text: "and kill" },
          {
            unit: [
              iconMapping[
                (UNITLAYERS.units[Object.keys(ARTIFACTS.splashed)[0]] || {})
                  .group
              ],
              (UNITLAYERS.units[Object.keys(ARTIFACTS.splashed)[0]] || {})
                .owner,
              Object.keys(ARTIFACTS.splashed)[0]
            ]
          }
        ]
      });
    }
  },
  variants,
  boards,
  setups
};
export default game;
