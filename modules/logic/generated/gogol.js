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
const dimensions = { height: 8, width: 8 };
const BOARD = boardLayers(dimensions);
const iconMapping = { kings: "king", soldiers: "pawn" };
const connections = boardConnections({ height: 8, width: 8 });
const relativeDirs = makeRelativeDirs([]);
let TERRAIN1;
let TERRAIN2;
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
const game = {
  gameId: "gogol",
  commands: { deploy: {}, move: {}, jump: {} },
  iconMap: iconMapping,
  newBattle: setup => {
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
    let terrain = {
      homerow: { "1": [{ rect: ["a1", "h1"] }], "2": [{ rect: ["a8", "h8"] }] },
      edges: [
        { rect: ["a1", "a8"] },
        { rect: ["h1", "h8"] },
        { rect: ["b8", "g8"] },
        { rect: ["b1", "g1"] }
      ]
    };
    TERRAIN1 = terrainLayers(8, 8, terrain, 1);
    TERRAIN2 = terrainLayers(8, 8, terrain, 2);
    return game.action.startTurn1({
      NEXTSPAWNID: 1,
      TURN: 0,
      UNITDATA,
      UNITLAYERS
    });
  },
  action: {
    startTurn1: step => {
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
          .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
      )
        .filter(([key, n]) => n === 2)
        .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})) {
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
          LINKS.marks[pos] = "selectunit1";
        }
      } else {
        for (const pos of Object.keys(
          Object.keys(BOARD.board)
            .filter(
              k =>
                !{ ...UNITLAYERS.units, ...ARTIFACTS.nokings }.hasOwnProperty(k)
            )
            .reduce((m, k) => ({ ...m, [k]: emptyObj }), {})
        )) {
          LINKS.marks[pos] = "selectkingdeploy1";
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
    startTurn2: step => {
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
          .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
      )
        .filter(([key, n]) => n === 2)
        .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})) {
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
          LINKS.marks[pos] = "selectunit2";
        }
      } else {
        for (const pos of Object.keys(
          Object.keys(BOARD.board)
            .filter(
              k =>
                !{ ...UNITLAYERS.units, ...ARTIFACTS.nokings }.hasOwnProperty(k)
            )
            .reduce((m, k) => ({ ...m, [k]: emptyObj }), {})
        )) {
          LINKS.marks[pos] = "selectkingdeploy2";
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
    selectkingdeploy1: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.deploy = "deploy1";
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
    selectunit1: (step, newMarkPos) => {
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
              .reduce((m, k) => ({ ...m, [k]: emptyObj }), {})
      )) {
        LINKS.marks[pos] = "selectmovetarget1";
      }
      for (const pos of Object.keys(ARTIFACTS.jumptargets)) {
        LINKS.marks[pos] = "selectjumptarget1";
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
        NEXTSPAWNID: step.NEXTSPAWNID,
        canAlwaysEnd: true
      };
    },
    selectjumptarget1: (step, newMarkPos) => {
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
      LINKS.commands.jump = "jump1";
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
    selectkingdeploy2: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.deploy = "deploy2";
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
    selectunit2: (step, newMarkPos) => {
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
              .reduce((m, k) => ({ ...m, [k]: emptyObj }), {})
      )) {
        LINKS.marks[pos] = "selectmovetarget2";
      }
      for (const pos of Object.keys(ARTIFACTS.jumptargets)) {
        LINKS.marks[pos] = "selectjumptarget2";
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
        NEXTSPAWNID: step.NEXTSPAWNID,
        canAlwaysEnd: true
      };
    },
    selectjumptarget2: (step, newMarkPos) => {
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
      LINKS.commands.jump = "jump2";
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
    deploy1: step => {
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
      LINKS.endTurn = "startTurn2";
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
    move1: step => {
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
            Object.keys(UNITLAYERS.mykings)
              .concat(Object.keys(TERRAIN1.opphomerow))
              .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
          )
            .filter(([key, n]) => n === 2)
            .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
        );
      } else if (TURN > 1 && Object.keys(UNITLAYERS.oppkings).length === 0) {
        LINKS.endGame = "win";
        LINKS.endedBy = "regicide";
      } else {
        LINKS.endTurn = "startTurn2";
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
    jump1: step => {
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
            Object.keys(UNITLAYERS.mykings)
              .concat(Object.keys(TERRAIN1.opphomerow))
              .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
          )
            .filter(([key, n]) => n === 2)
            .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
        );
      } else if (TURN > 1 && Object.keys(UNITLAYERS.oppkings).length === 0) {
        LINKS.endGame = "win";
        LINKS.endedBy = "regicide";
      } else {
        LINKS.endTurn = "startTurn2";
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
    deploy2: step => {
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
      LINKS.endTurn = "startTurn1";
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
    move2: step => {
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
            Object.keys(UNITLAYERS.mykings)
              .concat(Object.keys(TERRAIN2.opphomerow))
              .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
          )
            .filter(([key, n]) => n === 2)
            .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
        );
      } else if (TURN > 1 && Object.keys(UNITLAYERS.oppkings).length === 0) {
        LINKS.endGame = "win";
        LINKS.endedBy = "regicide";
      } else {
        LINKS.endTurn = "startTurn1";
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
    jump2: step => {
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
            Object.keys(UNITLAYERS.mykings)
              .concat(Object.keys(TERRAIN2.opphomerow))
              .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
          )
            .filter(([key, n]) => n === 2)
            .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
        );
      } else if (TURN > 1 && Object.keys(UNITLAYERS.oppkings).length === 0) {
        LINKS.endGame = "win";
        LINKS.endedBy = "regicide";
      } else {
        LINKS.endTurn = "startTurn1";
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
    startTurn1: step => {
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
    deploy1: () => defaultInstruction(1),
    move1: () => defaultInstruction(1),
    jump1: () => defaultInstruction(1),
    selectkingdeploy1: step => {
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
    selectunit1: step => {
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
                    .reduce(
                      (mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }),
                      {}
                    )
                )
                  .filter(([key, n]) => n === 2)
                  .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
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
          { text: "go" },
          { text: "to" },
          { pos: MARKS.selectmovetarget }
        ]
      });
    },
    selectjumptarget1: step => {
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
    startTurn2: step => {
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
    deploy2: () => defaultInstruction(2),
    move2: () => defaultInstruction(2),
    jump2: () => defaultInstruction(2),
    selectkingdeploy2: step => {
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
    selectunit2: step => {
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
                    .reduce(
                      (mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }),
                      {}
                    )
                )
                  .filter(([key, n]) => n === 2)
                  .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
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
          { text: "go" },
          { text: "to" },
          { pos: MARKS.selectmovetarget }
        ]
      });
    },
    selectjumptarget2: step => {
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
  }
};
export default game;
