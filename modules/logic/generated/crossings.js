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
const iconMapping = { soldiers: "pawn", towers: "rook" };
let TERRAIN1, TERRAIN2, connections, relativeDirs, BOARD, dimensions;
const groupLayers1 = {
  soldiers: [
    ["units"],
    ["units", "myunits", "mysoldiers"],
    ["units", "oppunits", "oppsoldiers"]
  ],
  towers: [
    ["units"],
    ["units", "myunits", "mytowers"],
    ["units", "oppunits", "opptowers"]
  ]
};
const groupLayers2 = {
  soldiers: [
    ["units"],
    ["units", "oppunits", "oppsoldiers"],
    ["units", "myunits", "mysoldiers"]
  ],
  towers: [
    ["units"],
    ["units", "oppunits", "opptowers"],
    ["units", "myunits", "mytowers"]
  ]
};
const emptyArtifactLayers_basic = {
  steptargets: {},
  heads: {},
  phalanx: {},
  marchtargets: {},
  potentialvictim: {}
};
const game = {
  gameId: "crossings",
  commands: { step: {}, march: {} },
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
      mysoldiers: {},
      oppsoldiers: {},
      mytowers: {},
      opptowers: {}
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
        mysoldiers: oldUnitLayers.oppsoldiers,
        oppsoldiers: oldUnitLayers.mysoldiers,
        mytowers: oldUnitLayers.opptowers,
        opptowers: oldUnitLayers.mytowers
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      for (const pos of Object.keys(UNITLAYERS.mysoldiers)) {
        LINKS.marks[pos] = "selecttail_basic_1";
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
        mysoldiers: oldUnitLayers.oppsoldiers,
        oppsoldiers: oldUnitLayers.mysoldiers,
        mytowers: oldUnitLayers.opptowers,
        opptowers: oldUnitLayers.mytowers
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      for (const pos of Object.keys(UNITLAYERS.mysoldiers)) {
        LINKS.marks[pos] = "selecttail_basic_2";
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
    selecttail_basic_1: (step, newMarkPos) => {
      let ARTIFACTS = {
        steptargets: {},
        heads: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selecttail: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let startconnections = connections[MARKS.selecttail];
        for (let DIR of roseDirs) {
          let POS = startconnections[DIR];
          if (POS && !UNITLAYERS.units[POS]) {
            ARTIFACTS.steptargets[POS] = emptyObj;
          }
        }
      }
      {
        let allowedsteps = UNITLAYERS.mysoldiers;
        for (let DIR of roseDirs) {
          let walkedsquares = [];
          let POS = MARKS.selecttail;
          while ((POS = connections[POS][DIR]) && allowedsteps[POS]) {
            walkedsquares.push(POS);
          }
          let WALKLENGTH = walkedsquares.length;
          if (WALKLENGTH) {
            ARTIFACTS.heads[walkedsquares[WALKLENGTH - 1]] = {
              dir: DIR,
              max: 1 + WALKLENGTH
            };
          }
        }
      }
      for (const pos of Object.keys(ARTIFACTS.steptargets)) {
        LINKS.marks[pos] = "selectsteptarget_basic_1";
      }
      for (const pos of Object.keys(ARTIFACTS.heads)) {
        LINKS.marks[pos] = "selecthead_basic_1";
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
    selecthead_basic_1: (step, newMarkPos) => {
      let ARTIFACTS = {
        steptargets: step.ARTIFACTS.steptargets,
        heads: step.ARTIFACTS.heads,
        phalanx: {},
        marchtargets: {},
        potentialvictim: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selecttail: step.MARKS.selecttail,
        selecthead: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let MAX = (ARTIFACTS.heads[MARKS.selecthead] || {}).max;
        let POS = "faux";
        connections.faux[
          relativeDirs[5][(ARTIFACTS.heads[MARKS.selecthead] || {}).dir]
        ] = MARKS.selecthead;
        let LENGTH = 0;
        while (
          LENGTH < MAX &&
          (POS =
            connections[POS][
              relativeDirs[5][(ARTIFACTS.heads[MARKS.selecthead] || {}).dir]
            ])
        ) {
          LENGTH++;
          ARTIFACTS.phalanx[POS] = emptyObj;
        }
      }
      {
        let BLOCKS = UNITLAYERS.units;
        let DIR = (ARTIFACTS.heads[MARKS.selecthead] || {}).dir;
        let walkedsquares = [];
        let MAX = (ARTIFACTS.heads[MARKS.selecthead] || {}).max;
        let POS = MARKS.selecthead;
        let LENGTH = 0;
        let STEP = 0;
        while (LENGTH < MAX && (POS = connections[POS][DIR]) && !BLOCKS[POS]) {
          walkedsquares.push(POS);
          LENGTH++;
          STEP++;
          ARTIFACTS.marchtargets[POS] = { length: STEP };
        }
        let WALKLENGTH = walkedsquares.length;
        if (BLOCKS[POS]) {
          if (UNITLAYERS.oppsoldiers[POS]) {
            ARTIFACTS.potentialvictim[POS] = {
              strength: (ARTIFACTS.heads[MARKS.selecthead] || {}).max,
              dir: DIR,
              length: WALKLENGTH + 1
            };
          }
        }
      }
      {
        let allowedsteps = UNITLAYERS.oppunits;
        for (let STARTPOS in ARTIFACTS.potentialvictim) {
          let walkedsquares = [];
          let POS = STARTPOS;
          while (
            (POS =
              connections[POS][
                (ARTIFACTS.potentialvictim[STARTPOS] || {}).dir
              ]) &&
            allowedsteps[POS]
          ) {
            walkedsquares.push(POS);
          }
          let WALKLENGTH = walkedsquares.length;
          POS = STARTPOS;
          if (
            1 + WALKLENGTH <
            (ARTIFACTS.potentialvictim[STARTPOS] || {}).strength
          ) {
            ARTIFACTS.marchtargets[POS] = {
              length: (ARTIFACTS.potentialvictim[STARTPOS] || {}).length
            };
          }
        }
      }
      for (const pos of Object.keys(ARTIFACTS.marchtargets)) {
        LINKS.marks[pos] = "selectmarchtarget_basic_1";
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
    selectmarchtarget_basic_1: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.march = "march_basic_1";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: {
          selecttail: step.MARKS.selecttail,
          selecthead: step.MARKS.selecthead,
          selectmarchtarget: newMarkPos
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
          selecttail: step.MARKS.selecttail,
          selectsteptarget: newMarkPos
        }
      };
    },
    selecttail_basic_2: (step, newMarkPos) => {
      let ARTIFACTS = {
        steptargets: {},
        heads: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selecttail: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let startconnections = connections[MARKS.selecttail];
        for (let DIR of roseDirs) {
          let POS = startconnections[DIR];
          if (POS && !UNITLAYERS.units[POS]) {
            ARTIFACTS.steptargets[POS] = emptyObj;
          }
        }
      }
      {
        let allowedsteps = UNITLAYERS.mysoldiers;
        for (let DIR of roseDirs) {
          let walkedsquares = [];
          let POS = MARKS.selecttail;
          while ((POS = connections[POS][DIR]) && allowedsteps[POS]) {
            walkedsquares.push(POS);
          }
          let WALKLENGTH = walkedsquares.length;
          if (WALKLENGTH) {
            ARTIFACTS.heads[walkedsquares[WALKLENGTH - 1]] = {
              dir: DIR,
              max: 1 + WALKLENGTH
            };
          }
        }
      }
      for (const pos of Object.keys(ARTIFACTS.steptargets)) {
        LINKS.marks[pos] = "selectsteptarget_basic_2";
      }
      for (const pos of Object.keys(ARTIFACTS.heads)) {
        LINKS.marks[pos] = "selecthead_basic_2";
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
    selecthead_basic_2: (step, newMarkPos) => {
      let ARTIFACTS = {
        steptargets: step.ARTIFACTS.steptargets,
        heads: step.ARTIFACTS.heads,
        phalanx: {},
        marchtargets: {},
        potentialvictim: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selecttail: step.MARKS.selecttail,
        selecthead: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let MAX = (ARTIFACTS.heads[MARKS.selecthead] || {}).max;
        let POS = "faux";
        connections.faux[
          relativeDirs[5][(ARTIFACTS.heads[MARKS.selecthead] || {}).dir]
        ] = MARKS.selecthead;
        let LENGTH = 0;
        while (
          LENGTH < MAX &&
          (POS =
            connections[POS][
              relativeDirs[5][(ARTIFACTS.heads[MARKS.selecthead] || {}).dir]
            ])
        ) {
          LENGTH++;
          ARTIFACTS.phalanx[POS] = emptyObj;
        }
      }
      {
        let BLOCKS = UNITLAYERS.units;
        let DIR = (ARTIFACTS.heads[MARKS.selecthead] || {}).dir;
        let walkedsquares = [];
        let MAX = (ARTIFACTS.heads[MARKS.selecthead] || {}).max;
        let POS = MARKS.selecthead;
        let LENGTH = 0;
        let STEP = 0;
        while (LENGTH < MAX && (POS = connections[POS][DIR]) && !BLOCKS[POS]) {
          walkedsquares.push(POS);
          LENGTH++;
          STEP++;
          ARTIFACTS.marchtargets[POS] = { length: STEP };
        }
        let WALKLENGTH = walkedsquares.length;
        if (BLOCKS[POS]) {
          if (UNITLAYERS.oppsoldiers[POS]) {
            ARTIFACTS.potentialvictim[POS] = {
              strength: (ARTIFACTS.heads[MARKS.selecthead] || {}).max,
              dir: DIR,
              length: WALKLENGTH + 1
            };
          }
        }
      }
      {
        let allowedsteps = UNITLAYERS.oppunits;
        for (let STARTPOS in ARTIFACTS.potentialvictim) {
          let walkedsquares = [];
          let POS = STARTPOS;
          while (
            (POS =
              connections[POS][
                (ARTIFACTS.potentialvictim[STARTPOS] || {}).dir
              ]) &&
            allowedsteps[POS]
          ) {
            walkedsquares.push(POS);
          }
          let WALKLENGTH = walkedsquares.length;
          POS = STARTPOS;
          if (
            1 + WALKLENGTH <
            (ARTIFACTS.potentialvictim[STARTPOS] || {}).strength
          ) {
            ARTIFACTS.marchtargets[POS] = {
              length: (ARTIFACTS.potentialvictim[STARTPOS] || {}).length
            };
          }
        }
      }
      for (const pos of Object.keys(ARTIFACTS.marchtargets)) {
        LINKS.marks[pos] = "selectmarchtarget_basic_2";
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
    selectmarchtarget_basic_2: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.march = "march_basic_2";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: {
          selecttail: step.MARKS.selecttail,
          selecthead: step.MARKS.selecthead,
          selectmarchtarget: newMarkPos
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
          selecttail: step.MARKS.selecttail,
          selectsteptarget: newMarkPos
        }
      };
    },
    step_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      if (TERRAIN1.oppbase[MARKS.selectsteptarget]) {
        {
          let unitid = (UNITLAYERS.units[MARKS.selecttail] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              group: "towers"
            };
          }
        }
      }
      {
        let unitid = (UNITLAYERS.units[MARKS.selecttail] || {}).id;
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
        mysoldiers: {},
        oppsoldiers: {},
        mytowers: {},
        opptowers: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (
        !(
          Object.keys(UNITLAYERS.mytowers).length <
          Object.keys(UNITLAYERS.opptowers).length
        )
      ) {
        if (
          Object.keys(UNITLAYERS.mytowers).length >
          Object.keys(UNITLAYERS.opptowers).length
        ) {
          LINKS.starvation = {
            endGame: "win",
            endedBy: "dominance",
            endMarks: Object.keys(UNITLAYERS.mytowers)
          };
          LINKS.endTurn = "startTurn_basic_2";
        } else {
          LINKS.endTurn = "startTurn_basic_2";
        }
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
    march_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        steptargets: step.ARTIFACTS.steptargets,
        heads: step.ARTIFACTS.heads,
        phalanx: step.ARTIFACTS.phalanx,
        marchtargets: step.ARTIFACTS.marchtargets,
        potentialvictim: step.ARTIFACTS.potentialvictim
      };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      if (UNITLAYERS.units[MARKS.selectmarchtarget]) {
        delete UNITDATA[(UNITLAYERS.units[MARKS.selectmarchtarget] || {}).id];
      }
      if (TERRAIN1.oppbase[MARKS.selectmarchtarget]) {
        {
          let unitid = (UNITLAYERS.units[MARKS.selecthead] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              group: "towers"
            };
          }
        }
      }
      for (let LOOPPOS in ARTIFACTS.phalanx) {
        {
          let pos = LOOPPOS;
          let unitid = (UNITLAYERS.units[pos] || {}).id;
          if (unitid) {
            let dir = (ARTIFACTS.heads[MARKS.selecthead] || {}).dir;
            let dist = (ARTIFACTS.marchtargets[MARKS.selectmarchtarget] || {})
              .length;
            while (dist--) {
              pos = connections[pos][dir];
            }
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              pos
            };
          }
        }
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        mysoldiers: {},
        oppsoldiers: {},
        mytowers: {},
        opptowers: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (
        !(
          Object.keys(UNITLAYERS.mytowers).length <
          Object.keys(UNITLAYERS.opptowers).length
        )
      ) {
        if (
          Object.keys(UNITLAYERS.mytowers).length >
          Object.keys(UNITLAYERS.opptowers).length
        ) {
          LINKS.starvation = {
            endGame: "win",
            endedBy: "dominance",
            endMarks: Object.keys(UNITLAYERS.mytowers)
          };
          LINKS.endTurn = "startTurn_basic_2";
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
    step_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      if (TERRAIN2.oppbase[MARKS.selectsteptarget]) {
        {
          let unitid = (UNITLAYERS.units[MARKS.selecttail] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              group: "towers"
            };
          }
        }
      }
      {
        let unitid = (UNITLAYERS.units[MARKS.selecttail] || {}).id;
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
        mysoldiers: {},
        oppsoldiers: {},
        mytowers: {},
        opptowers: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (
        !(
          Object.keys(UNITLAYERS.mytowers).length <
          Object.keys(UNITLAYERS.opptowers).length
        )
      ) {
        if (
          Object.keys(UNITLAYERS.mytowers).length >
          Object.keys(UNITLAYERS.opptowers).length
        ) {
          LINKS.starvation = {
            endGame: "win",
            endedBy: "dominance",
            endMarks: Object.keys(UNITLAYERS.mytowers)
          };
          LINKS.endTurn = "startTurn_basic_1";
        } else {
          LINKS.endTurn = "startTurn_basic_1";
        }
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
    march_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        steptargets: step.ARTIFACTS.steptargets,
        heads: step.ARTIFACTS.heads,
        phalanx: step.ARTIFACTS.phalanx,
        marchtargets: step.ARTIFACTS.marchtargets,
        potentialvictim: step.ARTIFACTS.potentialvictim
      };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      if (UNITLAYERS.units[MARKS.selectmarchtarget]) {
        delete UNITDATA[(UNITLAYERS.units[MARKS.selectmarchtarget] || {}).id];
      }
      if (TERRAIN2.oppbase[MARKS.selectmarchtarget]) {
        {
          let unitid = (UNITLAYERS.units[MARKS.selecthead] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              group: "towers"
            };
          }
        }
      }
      for (let LOOPPOS in ARTIFACTS.phalanx) {
        {
          let pos = LOOPPOS;
          let unitid = (UNITLAYERS.units[pos] || {}).id;
          if (unitid) {
            let dir = (ARTIFACTS.heads[MARKS.selecthead] || {}).dir;
            let dist = (ARTIFACTS.marchtargets[MARKS.selectmarchtarget] || {})
              .length;
            while (dist--) {
              pos = connections[pos][dir];
            }
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              pos
            };
          }
        }
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        mysoldiers: {},
        oppsoldiers: {},
        mytowers: {},
        opptowers: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (
        !(
          Object.keys(UNITLAYERS.mytowers).length <
          Object.keys(UNITLAYERS.opptowers).length
        )
      ) {
        if (
          Object.keys(UNITLAYERS.mytowers).length >
          Object.keys(UNITLAYERS.opptowers).length
        ) {
          LINKS.starvation = {
            endGame: "win",
            endedBy: "dominance",
            endMarks: Object.keys(UNITLAYERS.mytowers)
          };
          LINKS.endTurn = "startTurn_basic_1";
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
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          Object.keys(UNITLAYERS.opptowers).length >
          Object.keys(UNITLAYERS.mytowers).length
            ? collapseContent({
                line: [
                  { text: "You must create a" },
                  { unittype: ["rook", 1] },
                  { text: "this turn!" }
                ]
              })
            : undefined,
          { select: "Select" },
          { unittype: ["pawn", 1] },
          { text: "to step with or to be tail of phalanx" }
        ]
      });
    },
    step_basic_1: () => defaultInstruction(1),
    march_basic_1: () => defaultInstruction(1),
    selecttail_basic_1: step => {
      let ARTIFACTS = step.ARTIFACTS;
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { select: "Select" },
          collapseContent({
            line: [
              Object.keys(ARTIFACTS.steptargets).length !== 0
                ? collapseContent({
                    line: [
                      { text: "where to step with" },
                      {
                        unit: [
                          iconMapping[
                            (UNITLAYERS.units[MARKS.selecttail] || {}).group
                          ],
                          (UNITLAYERS.units[MARKS.selecttail] || {}).owner,
                          MARKS.selecttail
                        ]
                      }
                    ]
                  })
                : undefined,
              Object.keys(ARTIFACTS.heads).length !== 0
                ? collapseContent({
                    line: [{ text: "a head for the phalanx" }]
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
    selecthead_basic_1: step => {
      let ARTIFACTS = step.ARTIFACTS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { select: "Select" },
          { text: "where to march" },
          collapseContent({
            line: Object.keys(ARTIFACTS.phalanx)
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
      });
    },
    selectmarchtarget_basic_1: step => {
      let ARTIFACTS = step.ARTIFACTS;
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "march" },
          { text: "to move" },
          collapseContent({
            line: Object.keys(ARTIFACTS.phalanx)
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
          TERRAIN1.oppbase[MARKS.selectmarchtarget]
            ? collapseContent({
                line: [
                  { text: "into the opponent base" },
                  UNITLAYERS.oppsoldiers[MARKS.selectmarchtarget]
                    ? collapseContent({
                        line: [
                          { text: ", kill" },
                          {
                            unit: [
                              iconMapping[
                                (
                                  UNITLAYERS.units[MARKS.selectmarchtarget] ||
                                  {}
                                ).group
                              ],
                              (UNITLAYERS.units[MARKS.selectmarchtarget] || {})
                                .owner,
                              MARKS.selectmarchtarget
                            ]
                          }
                        ]
                      })
                    : collapseContent({
                        line: [{ text: "at" }, { pos: MARKS.selectmarchtarget }]
                      }),
                  { text: "and turn the phalanx head into" },
                  { unittype: ["rook", 1] }
                ]
              })
            : UNITLAYERS.oppsoldiers[MARKS.selectmarchtarget]
            ? collapseContent({
                line: [
                  { text: "to kill" },
                  {
                    unit: [
                      iconMapping[
                        (UNITLAYERS.units[MARKS.selectmarchtarget] || {}).group
                      ],
                      (UNITLAYERS.units[MARKS.selectmarchtarget] || {}).owner,
                      MARKS.selectmarchtarget
                    ]
                  }
                ]
              })
            : collapseContent({
                line: [{ text: "towards" }, { pos: MARKS.selectmarchtarget }]
              })
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
              iconMapping[(UNITLAYERS.units[MARKS.selecttail] || {}).group],
              (UNITLAYERS.units[MARKS.selecttail] || {}).owner,
              MARKS.selecttail
            ]
          },
          TERRAIN1.oppbase[MARKS.selectsteptarget]
            ? collapseContent({
                line: [
                  { text: "into the opponent base at" },
                  { pos: MARKS.selectsteptarget },
                  { text: "and turn it into" },
                  { unittype: ["rook", 1] }
                ]
              })
            : collapseContent({
                line: [{ text: "to" }, { pos: MARKS.selectsteptarget }]
              })
        ]
      });
    },
    startTurn_basic_2: step => {
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          Object.keys(UNITLAYERS.opptowers).length >
          Object.keys(UNITLAYERS.mytowers).length
            ? collapseContent({
                line: [
                  { text: "You must create a" },
                  { unittype: ["rook", 2] },
                  { text: "this turn!" }
                ]
              })
            : undefined,
          { select: "Select" },
          { unittype: ["pawn", 2] },
          { text: "to step with or to be tail of phalanx" }
        ]
      });
    },
    step_basic_2: () => defaultInstruction(2),
    march_basic_2: () => defaultInstruction(2),
    selecttail_basic_2: step => {
      let ARTIFACTS = step.ARTIFACTS;
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { select: "Select" },
          collapseContent({
            line: [
              Object.keys(ARTIFACTS.steptargets).length !== 0
                ? collapseContent({
                    line: [
                      { text: "where to step with" },
                      {
                        unit: [
                          iconMapping[
                            (UNITLAYERS.units[MARKS.selecttail] || {}).group
                          ],
                          (UNITLAYERS.units[MARKS.selecttail] || {}).owner,
                          MARKS.selecttail
                        ]
                      }
                    ]
                  })
                : undefined,
              Object.keys(ARTIFACTS.heads).length !== 0
                ? collapseContent({
                    line: [{ text: "a head for the phalanx" }]
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
    selecthead_basic_2: step => {
      let ARTIFACTS = step.ARTIFACTS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { select: "Select" },
          { text: "where to march" },
          collapseContent({
            line: Object.keys(ARTIFACTS.phalanx)
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
      });
    },
    selectmarchtarget_basic_2: step => {
      let ARTIFACTS = step.ARTIFACTS;
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "march" },
          { text: "to move" },
          collapseContent({
            line: Object.keys(ARTIFACTS.phalanx)
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
          TERRAIN2.oppbase[MARKS.selectmarchtarget]
            ? collapseContent({
                line: [
                  { text: "into the opponent base" },
                  UNITLAYERS.oppsoldiers[MARKS.selectmarchtarget]
                    ? collapseContent({
                        line: [
                          { text: ", kill" },
                          {
                            unit: [
                              iconMapping[
                                (
                                  UNITLAYERS.units[MARKS.selectmarchtarget] ||
                                  {}
                                ).group
                              ],
                              (UNITLAYERS.units[MARKS.selectmarchtarget] || {})
                                .owner,
                              MARKS.selectmarchtarget
                            ]
                          }
                        ]
                      })
                    : collapseContent({
                        line: [{ text: "at" }, { pos: MARKS.selectmarchtarget }]
                      }),
                  { text: "and turn the phalanx head into" },
                  { unittype: ["rook", 2] }
                ]
              })
            : UNITLAYERS.oppsoldiers[MARKS.selectmarchtarget]
            ? collapseContent({
                line: [
                  { text: "to kill" },
                  {
                    unit: [
                      iconMapping[
                        (UNITLAYERS.units[MARKS.selectmarchtarget] || {}).group
                      ],
                      (UNITLAYERS.units[MARKS.selectmarchtarget] || {}).owner,
                      MARKS.selectmarchtarget
                    ]
                  }
                ]
              })
            : collapseContent({
                line: [{ text: "towards" }, { pos: MARKS.selectmarchtarget }]
              })
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
              iconMapping[(UNITLAYERS.units[MARKS.selecttail] || {}).group],
              (UNITLAYERS.units[MARKS.selecttail] || {}).owner,
              MARKS.selecttail
            ]
          },
          TERRAIN2.oppbase[MARKS.selectsteptarget]
            ? collapseContent({
                line: [
                  { text: "into the opponent base at" },
                  { pos: MARKS.selectsteptarget },
                  { text: "and turn it into" },
                  { unittype: ["rook", 2] }
                ]
              })
            : collapseContent({
                line: [{ text: "to" }, { pos: MARKS.selectsteptarget }]
              })
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
            "1": [
              "a1",
              "a2",
              "b2",
              "c1",
              "d3",
              "d4",
              "e1",
              "e2",
              "e3",
              "e4",
              "f1",
              "f2",
              "g2",
              "h1",
              "h2"
            ],
            "2": [
              "a7",
              "a8",
              "b7",
              "b8",
              "c7",
              "d8",
              "e6",
              "e7",
              "e8",
              "f5",
              "f6",
              "g7",
              "g8",
              "h7",
              "h8"
            ]
          }
        },
        marks: [],
        potentialMarks: []
      }
    }
  ],
  boards: {
    basic: {
      height: 8,
      width: 8,
      terrain: {
        base: {
          "1": [
            {
              rect: ["a1", "h1"]
            }
          ],
          "2": [
            {
              rect: ["a8", "h8"]
            }
          ]
        }
      }
    }
  },
  setups: {
    basic: {
      soldiers: {
        "1": [
          {
            rect: ["a1", "h2"]
          }
        ],
        "2": [
          {
            rect: ["a7", "h8"]
          }
        ]
      }
    }
  }
};
export default game;
