import {
  offsetPos,
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
const emptyObj = {};
const iconMapping = {
  lvl1: "pawn",
  lvl2: "knight",
  lvl3: "rook",
  lvl4: "king",
  lvl5: "queen"
};
let TERRAIN1, TERRAIN2, connections, relativeDirs, BOARD, dimensions;
const groupLayers1 = {
  lvl1: [
    ["units", "neutralunits"],
    ["units", "myunits"],
    ["units", "oppunits"]
  ],
  lvl2: [
    ["units", "neutralunits"],
    ["units", "myunits"],
    ["units", "oppunits"]
  ],
  lvl3: [
    ["units", "neutralunits"],
    ["units", "myunits"],
    ["units", "oppunits"]
  ],
  lvl4: [
    ["units", "neutralunits"],
    ["units", "myunits"],
    ["units", "oppunits"]
  ],
  lvl5: [
    ["units", "neutralunits"],
    ["units", "myunits"],
    ["units", "oppunits"]
  ]
};
const groupLayers2 = {
  lvl1: [
    ["units", "neutralunits"],
    ["units", "oppunits"],
    ["units", "myunits"]
  ],
  lvl2: [
    ["units", "neutralunits"],
    ["units", "oppunits"],
    ["units", "myunits"]
  ],
  lvl3: [
    ["units", "neutralunits"],
    ["units", "oppunits"],
    ["units", "myunits"]
  ],
  lvl4: [
    ["units", "neutralunits"],
    ["units", "oppunits"],
    ["units", "myunits"]
  ],
  lvl5: [
    ["units", "neutralunits"],
    ["units", "oppunits"],
    ["units", "myunits"]
  ]
};
const prefixes1 = ["neutral", "my", "opp"];
const prefixes2 = ["neutral", "opp", "my"];
const game = {
  gameId: "erdoslatino",
  commands: { place1: {}, place2: {}, place3: {}, place4: {}, place5: {} },
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
    let UNITLAYERS = { units: {}, myunits: {}, oppunits: {}, neutralunits: {} };
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
        ownedcolumns: {},
        myownedcolumns: {},
        oppownedcolumns: {},
        neutralownedcolumns: {},
        FOOBAR: {},
        sees1: {},
        sees2: {},
        sees3: {},
        sees4: {},
        sees5: {},
        above1: {},
        above2: {},
        above3: {},
        above4: {},
        above5: {},
        below1: {},
        below2: {},
        below3: {},
        below4: {},
        below5: {},
        takencolumn: {},
        mytakencolumn: {},
        opptakencolumn: {},
        neutraltakencolumn: {},
        upwards: {},
        downwards: {}
      };
      const oldUnitLayers = step.UNITLAYERS;
      let UNITLAYERS = {
        units: oldUnitLayers.units,
        myunits: oldUnitLayers.oppunits,
        oppunits: oldUnitLayers.myunits,
        neutralunits: oldUnitLayers.neutralunits
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      {
        for (let STARTPOS in UNITLAYERS.units) {
          for (let DIR of orthoDirs) {
            let walkedsquares = [];
            let POS = STARTPOS;
            while ((POS = connections[POS][DIR])) {
              walkedsquares.push(POS);
              {
                ARTIFACTS[
                  ["FOOBAR", "sees1", "sees2", "sees3", "sees4", "sees5"][
                    (UNITLAYERS.units[STARTPOS] || {}).lvl
                  ]
                ][POS] = emptyObj;
              }
              {
                if (DIR === 1) {
                  ARTIFACTS[
                    [
                      "FOOBAR",
                      "above1",
                      "above2",
                      "above3",
                      "above4",
                      "above5"
                    ][(UNITLAYERS.units[STARTPOS] || {}).lvl]
                  ][POS] = emptyObj;
                }
              }
              {
                if (DIR === 5) {
                  ARTIFACTS[
                    [
                      "FOOBAR",
                      "below1",
                      "below2",
                      "below3",
                      "below4",
                      "below5"
                    ][(UNITLAYERS.units[STARTPOS] || {}).lvl]
                  ][POS] = emptyObj;
                }
              }
              {
                if (
                  !UNITLAYERS.neutralunits[STARTPOS] &&
                  (DIR === 1 || DIR === 5)
                ) {
                  let targetlayername = "takencolumn";
                  let artifact = {
                    owner: UNITLAYERS.myunits[STARTPOS] ? 1 : 2
                  };
                  ARTIFACTS[targetlayername][POS] = ARTIFACTS[
                    prefixes1[artifact.owner] + targetlayername
                  ] = artifact;
                }
              }
              {
                if (
                  DIR === 1 &&
                  UNITLAYERS.units[POS] &&
                  (UNITLAYERS.units[POS] || {}).lvl >
                    (UNITLAYERS.units[STARTPOS] || {}).lvl
                ) {
                  ARTIFACTS.upwards[POS] = {
                    lvl: (UNITLAYERS.units[POS] || {}).lvl
                  };
                }
              }
              {
                if (
                  DIR === 5 &&
                  UNITLAYERS.units[POS] &&
                  (UNITLAYERS.units[POS] || {}).lvl <
                    (UNITLAYERS.units[STARTPOS] || {}).lvl
                ) {
                  ARTIFACTS.downwards[POS] = {
                    lvl: (UNITLAYERS.units[POS] || {}).lvl
                  };
                }
              }
            }
            let WALKLENGTH = walkedsquares.length;
            if (WALKLENGTH) {
              if (DIR === 1 && !UNITLAYERS.neutralunits[STARTPOS]) {
                let targetlayername = "ownedcolumns";
                let artifact = {
                  owner: (UNITLAYERS.units[STARTPOS] || {}).owner
                };
                ARTIFACTS[targetlayername][
                  walkedsquares[WALKLENGTH - 1]
                ] = ARTIFACTS[
                  prefixes1[artifact.owner] + targetlayername
                ] = artifact;
              }
            }
          }
        }
      }
      for (const pos of Object.keys(
        Object.keys(BOARD.board)
          .filter(k => !UNITLAYERS.units.hasOwnProperty(k))
          .reduce((m, k) => {
            m[k] = emptyObj;
            return m;
          }, {})
      )) {
        LINKS.marks[pos] = "selecttarget_basic_1";
      }
      return {
        UNITDATA: step.UNITDATA,
        LINKS,
        UNITLAYERS,
        ARTIFACTS,
        MARKS: {},
        TURN: step.TURN + 1,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    startTurn_basic_2: step => {
      let ARTIFACTS = {
        ownedcolumns: {},
        myownedcolumns: {},
        oppownedcolumns: {},
        neutralownedcolumns: {},
        FOOBAR: {},
        sees1: {},
        sees2: {},
        sees3: {},
        sees4: {},
        sees5: {},
        above1: {},
        above2: {},
        above3: {},
        above4: {},
        above5: {},
        below1: {},
        below2: {},
        below3: {},
        below4: {},
        below5: {},
        takencolumn: {},
        mytakencolumn: {},
        opptakencolumn: {},
        neutraltakencolumn: {},
        upwards: {},
        downwards: {}
      };
      const oldUnitLayers = step.UNITLAYERS;
      let UNITLAYERS = {
        units: oldUnitLayers.units,
        myunits: oldUnitLayers.oppunits,
        oppunits: oldUnitLayers.myunits,
        neutralunits: oldUnitLayers.neutralunits
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      {
        for (let STARTPOS in UNITLAYERS.units) {
          for (let DIR of orthoDirs) {
            let walkedsquares = [];
            let POS = STARTPOS;
            while ((POS = connections[POS][DIR])) {
              walkedsquares.push(POS);
              {
                ARTIFACTS[
                  ["FOOBAR", "sees1", "sees2", "sees3", "sees4", "sees5"][
                    (UNITLAYERS.units[STARTPOS] || {}).lvl
                  ]
                ][POS] = emptyObj;
              }
              {
                if (DIR === 5) {
                  ARTIFACTS[
                    [
                      "FOOBAR",
                      "above1",
                      "above2",
                      "above3",
                      "above4",
                      "above5"
                    ][(UNITLAYERS.units[STARTPOS] || {}).lvl]
                  ][POS] = emptyObj;
                }
              }
              {
                if (DIR === 1) {
                  ARTIFACTS[
                    [
                      "FOOBAR",
                      "below1",
                      "below2",
                      "below3",
                      "below4",
                      "below5"
                    ][(UNITLAYERS.units[STARTPOS] || {}).lvl]
                  ][POS] = emptyObj;
                }
              }
              {
                if (
                  !UNITLAYERS.neutralunits[STARTPOS] &&
                  (DIR === 1 || DIR === 5)
                ) {
                  let targetlayername = "takencolumn";
                  let artifact = {
                    owner: UNITLAYERS.myunits[STARTPOS] ? 2 : 1
                  };
                  ARTIFACTS[targetlayername][POS] = ARTIFACTS[
                    prefixes2[artifact.owner] + targetlayername
                  ] = artifact;
                }
              }
              {
                if (
                  DIR === 5 &&
                  UNITLAYERS.units[POS] &&
                  (UNITLAYERS.units[POS] || {}).lvl >
                    (UNITLAYERS.units[STARTPOS] || {}).lvl
                ) {
                  ARTIFACTS.upwards[POS] = {
                    lvl: (UNITLAYERS.units[POS] || {}).lvl
                  };
                }
              }
              {
                if (
                  DIR === 1 &&
                  UNITLAYERS.units[POS] &&
                  (UNITLAYERS.units[POS] || {}).lvl <
                    (UNITLAYERS.units[STARTPOS] || {}).lvl
                ) {
                  ARTIFACTS.downwards[POS] = {
                    lvl: (UNITLAYERS.units[POS] || {}).lvl
                  };
                }
              }
            }
            let WALKLENGTH = walkedsquares.length;
            if (WALKLENGTH) {
              if (DIR === 1 && !UNITLAYERS.neutralunits[STARTPOS]) {
                let targetlayername = "ownedcolumns";
                let artifact = {
                  owner: (UNITLAYERS.units[STARTPOS] || {}).owner
                };
                ARTIFACTS[targetlayername][
                  walkedsquares[WALKLENGTH - 1]
                ] = ARTIFACTS[
                  prefixes2[artifact.owner] + targetlayername
                ] = artifact;
              }
            }
          }
        }
      }
      for (const pos of Object.keys(
        Object.keys(BOARD.board)
          .filter(k => !UNITLAYERS.units.hasOwnProperty(k))
          .reduce((m, k) => {
            m[k] = emptyObj;
            return m;
          }, {})
      )) {
        LINKS.marks[pos] = "selecttarget_basic_2";
      }
      return {
        UNITDATA: step.UNITDATA,
        LINKS,
        UNITLAYERS,
        ARTIFACTS,
        MARKS: {},
        TURN: step.TURN,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    selecttarget_basic_1: (step, newMarkPos) => {
      let ARTIFACTS = {
        ownedcolumns: step.ARTIFACTS.ownedcolumns,
        myownedcolumns: step.ARTIFACTS.myownedcolumns,
        oppownedcolumns: step.ARTIFACTS.oppownedcolumns,
        neutralownedcolumns: step.ARTIFACTS.neutralownedcolumns,
        FOOBAR: step.ARTIFACTS.FOOBAR,
        sees1: step.ARTIFACTS.sees1,
        sees2: step.ARTIFACTS.sees2,
        sees3: step.ARTIFACTS.sees3,
        sees4: step.ARTIFACTS.sees4,
        sees5: step.ARTIFACTS.sees5,
        above1: step.ARTIFACTS.above1,
        above2: step.ARTIFACTS.above2,
        above3: step.ARTIFACTS.above3,
        above4: step.ARTIFACTS.above4,
        above5: step.ARTIFACTS.above5,
        below1: step.ARTIFACTS.below1,
        below2: step.ARTIFACTS.below2,
        below3: step.ARTIFACTS.below3,
        below4: step.ARTIFACTS.below4,
        below5: step.ARTIFACTS.below5,
        takencolumn: step.ARTIFACTS.takencolumn,
        mytakencolumn: step.ARTIFACTS.mytakencolumn,
        opptakencolumn: step.ARTIFACTS.opptakencolumn,
        neutraltakencolumn: step.ARTIFACTS.neutraltakencolumn,
        upwards: step.ARTIFACTS.upwards,
        downwards: step.ARTIFACTS.downwards,
        currentcolumn: {},
        conquerwith3: {},
        conquerwith4: {},
        conquerwith5: {},
        conquerwith2: {},
        conquerwith1: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selecttarget: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      if (!ARTIFACTS.takencolumn[MARKS.selecttarget]) {
        {
          for (let DIR of [1, 5]) {
            let POS = "faux";
            connections.faux[DIR] = MARKS.selecttarget;
            while ((POS = connections[POS][DIR])) {
              ARTIFACTS.currentcolumn[POS] = emptyObj;
            }
          }
        }
        {
          for (let STARTPOS in Object.entries(
            Object.keys(ARTIFACTS.upwards)
              .concat(Object.keys(ARTIFACTS.currentcolumn))
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
            let POS = STARTPOS;
            while ((POS = connections[POS][1])) {
              {
                if (
                  (UNITLAYERS.units[STARTPOS] || {}).lvl < 3 &&
                  !UNITLAYERS.units[POS]
                ) {
                  ARTIFACTS.conquerwith3[POS] = emptyObj;
                }
              }
              {
                if (
                  (UNITLAYERS.units[STARTPOS] || {}).lvl < 4 &&
                  !UNITLAYERS.units[POS]
                ) {
                  ARTIFACTS.conquerwith4[POS] = emptyObj;
                }
              }
              {
                if (!UNITLAYERS.units[POS]) {
                  ARTIFACTS.conquerwith5[POS] = emptyObj;
                }
              }
            }
          }
        }
        {
          for (let STARTPOS in Object.entries(
            Object.keys(ARTIFACTS.downwards)
              .concat(Object.keys(ARTIFACTS.currentcolumn))
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
            let POS = STARTPOS;
            while ((POS = connections[POS][5])) {
              {
                if (
                  (UNITLAYERS.units[STARTPOS] || {}).lvl > 3 &&
                  !UNITLAYERS.units[POS]
                ) {
                  ARTIFACTS.conquerwith3[POS] = emptyObj;
                }
              }
              {
                if (
                  (UNITLAYERS.units[STARTPOS] || {}).lvl > 2 &&
                  !UNITLAYERS.units[POS]
                ) {
                  ARTIFACTS.conquerwith2[POS] = emptyObj;
                }
              }
              {
                if (!UNITLAYERS.units[POS]) {
                  ARTIFACTS.conquerwith1[POS] = emptyObj;
                }
              }
            }
          }
        }
        {
          let filtersourcelayer = ARTIFACTS.currentcolumn;
          let filtertargetlayer = ARTIFACTS.conquerwith2;
          for (let POS in filtersourcelayer) {
            let filterObj = filtersourcelayer[POS];
            if (
              !UNITLAYERS.units[POS] &&
              ARTIFACTS.above1[POS] &&
              (ARTIFACTS.below3[POS] ||
                ARTIFACTS.below4[POS] ||
                ARTIFACTS.below5[POS])
            ) {
              filtertargetlayer[POS] = filterObj;
            }
          }
        }
        {
          let filtersourcelayer = ARTIFACTS.currentcolumn;
          let filtertargetlayer = ARTIFACTS.conquerwith3;
          for (let POS in filtersourcelayer) {
            let filterObj = filtersourcelayer[POS];
            if (
              !UNITLAYERS.units[POS] &&
              (ARTIFACTS.above1[POS] || ARTIFACTS.above2[POS]) &&
              (ARTIFACTS.below4[POS] || ARTIFACTS.below5[POS])
            ) {
              filtertargetlayer[POS] = filterObj;
            }
          }
        }
        {
          let filtersourcelayer = ARTIFACTS.currentcolumn;
          let filtertargetlayer = ARTIFACTS.conquerwith4;
          for (let POS in filtersourcelayer) {
            let filterObj = filtersourcelayer[POS];
            if (
              !UNITLAYERS.units[POS] &&
              (ARTIFACTS.above1[POS] ||
                ARTIFACTS.above2[POS] ||
                ARTIFACTS.above3[POS]) &&
              ARTIFACTS.below5[POS]
            ) {
              filtertargetlayer[POS] = filterObj;
            }
          }
        }
      }
      if (!ARTIFACTS.sees1[MARKS.selecttarget]) {
        LINKS.commands.place1 = "place1_basic_1";
      }
      if (!ARTIFACTS.sees2[MARKS.selecttarget]) {
        LINKS.commands.place2 = "place2_basic_1";
      }
      if (!ARTIFACTS.sees3[MARKS.selecttarget]) {
        LINKS.commands.place3 = "place3_basic_1";
      }
      if (!ARTIFACTS.sees4[MARKS.selecttarget]) {
        LINKS.commands.place4 = "place4_basic_1";
      }
      if (!ARTIFACTS.sees5[MARKS.selecttarget]) {
        LINKS.commands.place5 = "place5_basic_1";
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
    selecttarget_basic_2: (step, newMarkPos) => {
      let ARTIFACTS = {
        ownedcolumns: step.ARTIFACTS.ownedcolumns,
        myownedcolumns: step.ARTIFACTS.myownedcolumns,
        oppownedcolumns: step.ARTIFACTS.oppownedcolumns,
        neutralownedcolumns: step.ARTIFACTS.neutralownedcolumns,
        FOOBAR: step.ARTIFACTS.FOOBAR,
        sees1: step.ARTIFACTS.sees1,
        sees2: step.ARTIFACTS.sees2,
        sees3: step.ARTIFACTS.sees3,
        sees4: step.ARTIFACTS.sees4,
        sees5: step.ARTIFACTS.sees5,
        above1: step.ARTIFACTS.above1,
        above2: step.ARTIFACTS.above2,
        above3: step.ARTIFACTS.above3,
        above4: step.ARTIFACTS.above4,
        above5: step.ARTIFACTS.above5,
        below1: step.ARTIFACTS.below1,
        below2: step.ARTIFACTS.below2,
        below3: step.ARTIFACTS.below3,
        below4: step.ARTIFACTS.below4,
        below5: step.ARTIFACTS.below5,
        takencolumn: step.ARTIFACTS.takencolumn,
        mytakencolumn: step.ARTIFACTS.mytakencolumn,
        opptakencolumn: step.ARTIFACTS.opptakencolumn,
        neutraltakencolumn: step.ARTIFACTS.neutraltakencolumn,
        upwards: step.ARTIFACTS.upwards,
        downwards: step.ARTIFACTS.downwards,
        currentcolumn: {},
        conquerwith3: {},
        conquerwith4: {},
        conquerwith5: {},
        conquerwith2: {},
        conquerwith1: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selecttarget: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      if (!ARTIFACTS.takencolumn[MARKS.selecttarget]) {
        {
          for (let DIR of [1, 5]) {
            let POS = "faux";
            connections.faux[DIR] = MARKS.selecttarget;
            while ((POS = connections[POS][DIR])) {
              ARTIFACTS.currentcolumn[POS] = emptyObj;
            }
          }
        }
        {
          for (let STARTPOS in Object.entries(
            Object.keys(ARTIFACTS.upwards)
              .concat(Object.keys(ARTIFACTS.currentcolumn))
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
            let POS = STARTPOS;
            while ((POS = connections[POS][5])) {
              {
                if (
                  (UNITLAYERS.units[STARTPOS] || {}).lvl < 3 &&
                  !UNITLAYERS.units[POS]
                ) {
                  ARTIFACTS.conquerwith3[POS] = emptyObj;
                }
              }
              {
                if (
                  (UNITLAYERS.units[STARTPOS] || {}).lvl < 4 &&
                  !UNITLAYERS.units[POS]
                ) {
                  ARTIFACTS.conquerwith4[POS] = emptyObj;
                }
              }
              {
                if (!UNITLAYERS.units[POS]) {
                  ARTIFACTS.conquerwith5[POS] = emptyObj;
                }
              }
            }
          }
        }
        {
          for (let STARTPOS in Object.entries(
            Object.keys(ARTIFACTS.downwards)
              .concat(Object.keys(ARTIFACTS.currentcolumn))
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
            let POS = STARTPOS;
            while ((POS = connections[POS][1])) {
              {
                if (
                  (UNITLAYERS.units[STARTPOS] || {}).lvl > 3 &&
                  !UNITLAYERS.units[POS]
                ) {
                  ARTIFACTS.conquerwith3[POS] = emptyObj;
                }
              }
              {
                if (
                  (UNITLAYERS.units[STARTPOS] || {}).lvl > 2 &&
                  !UNITLAYERS.units[POS]
                ) {
                  ARTIFACTS.conquerwith2[POS] = emptyObj;
                }
              }
              {
                if (!UNITLAYERS.units[POS]) {
                  ARTIFACTS.conquerwith1[POS] = emptyObj;
                }
              }
            }
          }
        }
        {
          let filtersourcelayer = ARTIFACTS.currentcolumn;
          let filtertargetlayer = ARTIFACTS.conquerwith2;
          for (let POS in filtersourcelayer) {
            let filterObj = filtersourcelayer[POS];
            if (
              !UNITLAYERS.units[POS] &&
              ARTIFACTS.above1[POS] &&
              (ARTIFACTS.below3[POS] ||
                ARTIFACTS.below4[POS] ||
                ARTIFACTS.below5[POS])
            ) {
              filtertargetlayer[POS] = filterObj;
            }
          }
        }
        {
          let filtersourcelayer = ARTIFACTS.currentcolumn;
          let filtertargetlayer = ARTIFACTS.conquerwith3;
          for (let POS in filtersourcelayer) {
            let filterObj = filtersourcelayer[POS];
            if (
              !UNITLAYERS.units[POS] &&
              (ARTIFACTS.above1[POS] || ARTIFACTS.above2[POS]) &&
              (ARTIFACTS.below4[POS] || ARTIFACTS.below5[POS])
            ) {
              filtertargetlayer[POS] = filterObj;
            }
          }
        }
        {
          let filtersourcelayer = ARTIFACTS.currentcolumn;
          let filtertargetlayer = ARTIFACTS.conquerwith4;
          for (let POS in filtersourcelayer) {
            let filterObj = filtersourcelayer[POS];
            if (
              !UNITLAYERS.units[POS] &&
              (ARTIFACTS.above1[POS] ||
                ARTIFACTS.above2[POS] ||
                ARTIFACTS.above3[POS]) &&
              ARTIFACTS.below5[POS]
            ) {
              filtertargetlayer[POS] = filterObj;
            }
          }
        }
      }
      if (!ARTIFACTS.sees1[MARKS.selecttarget]) {
        LINKS.commands.place1 = "place1_basic_2";
      }
      if (!ARTIFACTS.sees2[MARKS.selecttarget]) {
        LINKS.commands.place2 = "place2_basic_2";
      }
      if (!ARTIFACTS.sees3[MARKS.selecttarget]) {
        LINKS.commands.place3 = "place3_basic_2";
      }
      if (!ARTIFACTS.sees4[MARKS.selecttarget]) {
        LINKS.commands.place4 = "place4_basic_2";
      }
      if (!ARTIFACTS.sees5[MARKS.selecttarget]) {
        LINKS.commands.place5 = "place5_basic_2";
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
    place1_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        ownedcolumns: step.ARTIFACTS.ownedcolumns,
        myownedcolumns: step.ARTIFACTS.myownedcolumns,
        oppownedcolumns: step.ARTIFACTS.oppownedcolumns,
        neutralownedcolumns: step.ARTIFACTS.neutralownedcolumns,
        FOOBAR: step.ARTIFACTS.FOOBAR,
        sees1: step.ARTIFACTS.sees1,
        sees2: step.ARTIFACTS.sees2,
        sees3: step.ARTIFACTS.sees3,
        sees4: step.ARTIFACTS.sees4,
        sees5: step.ARTIFACTS.sees5,
        above1: step.ARTIFACTS.above1,
        above2: step.ARTIFACTS.above2,
        above3: step.ARTIFACTS.above3,
        above4: step.ARTIFACTS.above4,
        above5: step.ARTIFACTS.above5,
        below1: step.ARTIFACTS.below1,
        below2: step.ARTIFACTS.below2,
        below3: step.ARTIFACTS.below3,
        below4: step.ARTIFACTS.below4,
        below5: step.ARTIFACTS.below5,
        takencolumn: step.ARTIFACTS.takencolumn,
        mytakencolumn: step.ARTIFACTS.mytakencolumn,
        opptakencolumn: step.ARTIFACTS.opptakencolumn,
        neutraltakencolumn: step.ARTIFACTS.neutraltakencolumn,
        upwards: step.ARTIFACTS.upwards,
        downwards: step.ARTIFACTS.downwards,
        currentcolumn: step.ARTIFACTS.currentcolumn,
        conquerwith3: step.ARTIFACTS.conquerwith3,
        conquerwith4: step.ARTIFACTS.conquerwith4,
        conquerwith5: step.ARTIFACTS.conquerwith5,
        conquerwith2: step.ARTIFACTS.conquerwith2,
        conquerwith1: step.ARTIFACTS.conquerwith1
      };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let NEXTSPAWNID = step.NEXTSPAWNID;
      let MARKS = step.MARKS;
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: MARKS.selecttarget,
          id: newunitid,
          group: "lvl1",
          owner: ARTIFACTS.conquerwith1[MARKS.selecttarget]
            ? 1
            : ARTIFACTS.takencolumn[MARKS.selecttarget]
            ? (ARTIFACTS.takencolumn[MARKS.selecttarget] || {}).owner
            : 0,
          lvl: 1
        };
      }
      if (ARTIFACTS.conquerwith1[MARKS.selecttarget]) {
        for (let LOOPPOS in ARTIFACTS.currentcolumn) {
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
      }
      UNITLAYERS = { units: {}, myunits: {}, oppunits: {}, neutralunits: {} };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (
        Object.keys(BOARD.board).length === Object.keys(UNITLAYERS.units).length
      ) {
        LINKS.endGame = ["draw", "win", "lose"][
          Object.keys(ARTIFACTS.myownedcolumns).length >
          Object.keys(ARTIFACTS.oppownedcolumns).length
            ? 1
            : Object.keys(ARTIFACTS.myownedcolumns).length <
              Object.keys(ARTIFACTS.oppownedcolumns).length
            ? 2
            : 0
        ];
        LINKS.endedBy = "dominance";
        LINKS.endMarks = Object.keys(
          Object.keys(ARTIFACTS.myownedcolumns).length >
            Object.keys(ARTIFACTS.oppownedcolumns).length
            ? UNITLAYERS.myunits
            : Object.keys(ARTIFACTS.myownedcolumns).length <
              Object.keys(ARTIFACTS.oppownedcolumns).length
            ? UNITLAYERS.oppunits
            : emptyObj
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
        NEXTSPAWNID
      };
    },
    place2_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        ownedcolumns: step.ARTIFACTS.ownedcolumns,
        myownedcolumns: step.ARTIFACTS.myownedcolumns,
        oppownedcolumns: step.ARTIFACTS.oppownedcolumns,
        neutralownedcolumns: step.ARTIFACTS.neutralownedcolumns,
        FOOBAR: step.ARTIFACTS.FOOBAR,
        sees1: step.ARTIFACTS.sees1,
        sees2: step.ARTIFACTS.sees2,
        sees3: step.ARTIFACTS.sees3,
        sees4: step.ARTIFACTS.sees4,
        sees5: step.ARTIFACTS.sees5,
        above1: step.ARTIFACTS.above1,
        above2: step.ARTIFACTS.above2,
        above3: step.ARTIFACTS.above3,
        above4: step.ARTIFACTS.above4,
        above5: step.ARTIFACTS.above5,
        below1: step.ARTIFACTS.below1,
        below2: step.ARTIFACTS.below2,
        below3: step.ARTIFACTS.below3,
        below4: step.ARTIFACTS.below4,
        below5: step.ARTIFACTS.below5,
        takencolumn: step.ARTIFACTS.takencolumn,
        mytakencolumn: step.ARTIFACTS.mytakencolumn,
        opptakencolumn: step.ARTIFACTS.opptakencolumn,
        neutraltakencolumn: step.ARTIFACTS.neutraltakencolumn,
        upwards: step.ARTIFACTS.upwards,
        downwards: step.ARTIFACTS.downwards,
        currentcolumn: step.ARTIFACTS.currentcolumn,
        conquerwith3: step.ARTIFACTS.conquerwith3,
        conquerwith4: step.ARTIFACTS.conquerwith4,
        conquerwith5: step.ARTIFACTS.conquerwith5,
        conquerwith2: step.ARTIFACTS.conquerwith2,
        conquerwith1: step.ARTIFACTS.conquerwith1
      };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let NEXTSPAWNID = step.NEXTSPAWNID;
      let MARKS = step.MARKS;
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: MARKS.selecttarget,
          id: newunitid,
          group: "lvl2",
          owner: ARTIFACTS.conquerwith2[MARKS.selecttarget]
            ? 1
            : ARTIFACTS.takencolumn[MARKS.selecttarget]
            ? (ARTIFACTS.takencolumn[MARKS.selecttarget] || {}).owner
            : 0,
          lvl: 2
        };
      }
      if (ARTIFACTS.conquerwith2[MARKS.selecttarget]) {
        for (let LOOPPOS in ARTIFACTS.currentcolumn) {
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
      }
      UNITLAYERS = { units: {}, myunits: {}, oppunits: {}, neutralunits: {} };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (
        Object.keys(BOARD.board).length === Object.keys(UNITLAYERS.units).length
      ) {
        LINKS.endGame = ["draw", "win", "lose"][
          Object.keys(ARTIFACTS.myownedcolumns).length >
          Object.keys(ARTIFACTS.oppownedcolumns).length
            ? 1
            : Object.keys(ARTIFACTS.myownedcolumns).length <
              Object.keys(ARTIFACTS.oppownedcolumns).length
            ? 2
            : 0
        ];
        LINKS.endedBy = "dominance";
        LINKS.endMarks = Object.keys(
          Object.keys(ARTIFACTS.myownedcolumns).length >
            Object.keys(ARTIFACTS.oppownedcolumns).length
            ? UNITLAYERS.myunits
            : Object.keys(ARTIFACTS.myownedcolumns).length <
              Object.keys(ARTIFACTS.oppownedcolumns).length
            ? UNITLAYERS.oppunits
            : emptyObj
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
        NEXTSPAWNID
      };
    },
    place3_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        ownedcolumns: step.ARTIFACTS.ownedcolumns,
        myownedcolumns: step.ARTIFACTS.myownedcolumns,
        oppownedcolumns: step.ARTIFACTS.oppownedcolumns,
        neutralownedcolumns: step.ARTIFACTS.neutralownedcolumns,
        FOOBAR: step.ARTIFACTS.FOOBAR,
        sees1: step.ARTIFACTS.sees1,
        sees2: step.ARTIFACTS.sees2,
        sees3: step.ARTIFACTS.sees3,
        sees4: step.ARTIFACTS.sees4,
        sees5: step.ARTIFACTS.sees5,
        above1: step.ARTIFACTS.above1,
        above2: step.ARTIFACTS.above2,
        above3: step.ARTIFACTS.above3,
        above4: step.ARTIFACTS.above4,
        above5: step.ARTIFACTS.above5,
        below1: step.ARTIFACTS.below1,
        below2: step.ARTIFACTS.below2,
        below3: step.ARTIFACTS.below3,
        below4: step.ARTIFACTS.below4,
        below5: step.ARTIFACTS.below5,
        takencolumn: step.ARTIFACTS.takencolumn,
        mytakencolumn: step.ARTIFACTS.mytakencolumn,
        opptakencolumn: step.ARTIFACTS.opptakencolumn,
        neutraltakencolumn: step.ARTIFACTS.neutraltakencolumn,
        upwards: step.ARTIFACTS.upwards,
        downwards: step.ARTIFACTS.downwards,
        currentcolumn: step.ARTIFACTS.currentcolumn,
        conquerwith3: step.ARTIFACTS.conquerwith3,
        conquerwith4: step.ARTIFACTS.conquerwith4,
        conquerwith5: step.ARTIFACTS.conquerwith5,
        conquerwith2: step.ARTIFACTS.conquerwith2,
        conquerwith1: step.ARTIFACTS.conquerwith1
      };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let NEXTSPAWNID = step.NEXTSPAWNID;
      let MARKS = step.MARKS;
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: MARKS.selecttarget,
          id: newunitid,
          group: "lvl3",
          owner: ARTIFACTS.conquerwith3[MARKS.selecttarget]
            ? 1
            : ARTIFACTS.takencolumn[MARKS.selecttarget]
            ? (ARTIFACTS.takencolumn[MARKS.selecttarget] || {}).owner
            : 0,
          lvl: 3
        };
      }
      if (ARTIFACTS.conquerwith3[MARKS.selecttarget]) {
        for (let LOOPPOS in ARTIFACTS.currentcolumn) {
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
      }
      UNITLAYERS = { units: {}, myunits: {}, oppunits: {}, neutralunits: {} };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (
        Object.keys(BOARD.board).length === Object.keys(UNITLAYERS.units).length
      ) {
        LINKS.endGame = ["draw", "win", "lose"][
          Object.keys(ARTIFACTS.myownedcolumns).length >
          Object.keys(ARTIFACTS.oppownedcolumns).length
            ? 1
            : Object.keys(ARTIFACTS.myownedcolumns).length <
              Object.keys(ARTIFACTS.oppownedcolumns).length
            ? 2
            : 0
        ];
        LINKS.endedBy = "dominance";
        LINKS.endMarks = Object.keys(
          Object.keys(ARTIFACTS.myownedcolumns).length >
            Object.keys(ARTIFACTS.oppownedcolumns).length
            ? UNITLAYERS.myunits
            : Object.keys(ARTIFACTS.myownedcolumns).length <
              Object.keys(ARTIFACTS.oppownedcolumns).length
            ? UNITLAYERS.oppunits
            : emptyObj
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
        NEXTSPAWNID
      };
    },
    place4_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        ownedcolumns: step.ARTIFACTS.ownedcolumns,
        myownedcolumns: step.ARTIFACTS.myownedcolumns,
        oppownedcolumns: step.ARTIFACTS.oppownedcolumns,
        neutralownedcolumns: step.ARTIFACTS.neutralownedcolumns,
        FOOBAR: step.ARTIFACTS.FOOBAR,
        sees1: step.ARTIFACTS.sees1,
        sees2: step.ARTIFACTS.sees2,
        sees3: step.ARTIFACTS.sees3,
        sees4: step.ARTIFACTS.sees4,
        sees5: step.ARTIFACTS.sees5,
        above1: step.ARTIFACTS.above1,
        above2: step.ARTIFACTS.above2,
        above3: step.ARTIFACTS.above3,
        above4: step.ARTIFACTS.above4,
        above5: step.ARTIFACTS.above5,
        below1: step.ARTIFACTS.below1,
        below2: step.ARTIFACTS.below2,
        below3: step.ARTIFACTS.below3,
        below4: step.ARTIFACTS.below4,
        below5: step.ARTIFACTS.below5,
        takencolumn: step.ARTIFACTS.takencolumn,
        mytakencolumn: step.ARTIFACTS.mytakencolumn,
        opptakencolumn: step.ARTIFACTS.opptakencolumn,
        neutraltakencolumn: step.ARTIFACTS.neutraltakencolumn,
        upwards: step.ARTIFACTS.upwards,
        downwards: step.ARTIFACTS.downwards,
        currentcolumn: step.ARTIFACTS.currentcolumn,
        conquerwith3: step.ARTIFACTS.conquerwith3,
        conquerwith4: step.ARTIFACTS.conquerwith4,
        conquerwith5: step.ARTIFACTS.conquerwith5,
        conquerwith2: step.ARTIFACTS.conquerwith2,
        conquerwith1: step.ARTIFACTS.conquerwith1
      };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let NEXTSPAWNID = step.NEXTSPAWNID;
      let MARKS = step.MARKS;
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: MARKS.selecttarget,
          id: newunitid,
          group: "lvl4",
          owner: ARTIFACTS.conquerwith4[MARKS.selecttarget]
            ? 1
            : ARTIFACTS.takencolumn[MARKS.selecttarget]
            ? (ARTIFACTS.takencolumn[MARKS.selecttarget] || {}).owner
            : 0,
          lvl: 4
        };
      }
      if (ARTIFACTS.conquerwith4[MARKS.selecttarget]) {
        for (let LOOPPOS in ARTIFACTS.currentcolumn) {
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
      }
      UNITLAYERS = { units: {}, myunits: {}, oppunits: {}, neutralunits: {} };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (
        Object.keys(BOARD.board).length === Object.keys(UNITLAYERS.units).length
      ) {
        LINKS.endGame = ["draw", "win", "lose"][
          Object.keys(ARTIFACTS.myownedcolumns).length >
          Object.keys(ARTIFACTS.oppownedcolumns).length
            ? 1
            : Object.keys(ARTIFACTS.myownedcolumns).length <
              Object.keys(ARTIFACTS.oppownedcolumns).length
            ? 2
            : 0
        ];
        LINKS.endedBy = "dominance";
        LINKS.endMarks = Object.keys(
          Object.keys(ARTIFACTS.myownedcolumns).length >
            Object.keys(ARTIFACTS.oppownedcolumns).length
            ? UNITLAYERS.myunits
            : Object.keys(ARTIFACTS.myownedcolumns).length <
              Object.keys(ARTIFACTS.oppownedcolumns).length
            ? UNITLAYERS.oppunits
            : emptyObj
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
        NEXTSPAWNID
      };
    },
    place5_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        ownedcolumns: step.ARTIFACTS.ownedcolumns,
        myownedcolumns: step.ARTIFACTS.myownedcolumns,
        oppownedcolumns: step.ARTIFACTS.oppownedcolumns,
        neutralownedcolumns: step.ARTIFACTS.neutralownedcolumns,
        FOOBAR: step.ARTIFACTS.FOOBAR,
        sees1: step.ARTIFACTS.sees1,
        sees2: step.ARTIFACTS.sees2,
        sees3: step.ARTIFACTS.sees3,
        sees4: step.ARTIFACTS.sees4,
        sees5: step.ARTIFACTS.sees5,
        above1: step.ARTIFACTS.above1,
        above2: step.ARTIFACTS.above2,
        above3: step.ARTIFACTS.above3,
        above4: step.ARTIFACTS.above4,
        above5: step.ARTIFACTS.above5,
        below1: step.ARTIFACTS.below1,
        below2: step.ARTIFACTS.below2,
        below3: step.ARTIFACTS.below3,
        below4: step.ARTIFACTS.below4,
        below5: step.ARTIFACTS.below5,
        takencolumn: step.ARTIFACTS.takencolumn,
        mytakencolumn: step.ARTIFACTS.mytakencolumn,
        opptakencolumn: step.ARTIFACTS.opptakencolumn,
        neutraltakencolumn: step.ARTIFACTS.neutraltakencolumn,
        upwards: step.ARTIFACTS.upwards,
        downwards: step.ARTIFACTS.downwards,
        currentcolumn: step.ARTIFACTS.currentcolumn,
        conquerwith3: step.ARTIFACTS.conquerwith3,
        conquerwith4: step.ARTIFACTS.conquerwith4,
        conquerwith5: step.ARTIFACTS.conquerwith5,
        conquerwith2: step.ARTIFACTS.conquerwith2,
        conquerwith1: step.ARTIFACTS.conquerwith1
      };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let NEXTSPAWNID = step.NEXTSPAWNID;
      let MARKS = step.MARKS;
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: MARKS.selecttarget,
          id: newunitid,
          group: "lvl5",
          owner: ARTIFACTS.conquerwith5[MARKS.selecttarget]
            ? 1
            : ARTIFACTS.takencolumn[MARKS.selecttarget]
            ? (ARTIFACTS.takencolumn[MARKS.selecttarget] || {}).owner
            : 0,
          lvl: 5
        };
      }
      if (ARTIFACTS.conquerwith5[MARKS.selecttarget]) {
        for (let LOOPPOS in ARTIFACTS.currentcolumn) {
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
      }
      UNITLAYERS = { units: {}, myunits: {}, oppunits: {}, neutralunits: {} };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (
        Object.keys(BOARD.board).length === Object.keys(UNITLAYERS.units).length
      ) {
        LINKS.endGame = ["draw", "win", "lose"][
          Object.keys(ARTIFACTS.myownedcolumns).length >
          Object.keys(ARTIFACTS.oppownedcolumns).length
            ? 1
            : Object.keys(ARTIFACTS.myownedcolumns).length <
              Object.keys(ARTIFACTS.oppownedcolumns).length
            ? 2
            : 0
        ];
        LINKS.endedBy = "dominance";
        LINKS.endMarks = Object.keys(
          Object.keys(ARTIFACTS.myownedcolumns).length >
            Object.keys(ARTIFACTS.oppownedcolumns).length
            ? UNITLAYERS.myunits
            : Object.keys(ARTIFACTS.myownedcolumns).length <
              Object.keys(ARTIFACTS.oppownedcolumns).length
            ? UNITLAYERS.oppunits
            : emptyObj
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
        NEXTSPAWNID
      };
    },
    place1_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        ownedcolumns: step.ARTIFACTS.ownedcolumns,
        myownedcolumns: step.ARTIFACTS.myownedcolumns,
        oppownedcolumns: step.ARTIFACTS.oppownedcolumns,
        neutralownedcolumns: step.ARTIFACTS.neutralownedcolumns,
        FOOBAR: step.ARTIFACTS.FOOBAR,
        sees1: step.ARTIFACTS.sees1,
        sees2: step.ARTIFACTS.sees2,
        sees3: step.ARTIFACTS.sees3,
        sees4: step.ARTIFACTS.sees4,
        sees5: step.ARTIFACTS.sees5,
        above1: step.ARTIFACTS.above1,
        above2: step.ARTIFACTS.above2,
        above3: step.ARTIFACTS.above3,
        above4: step.ARTIFACTS.above4,
        above5: step.ARTIFACTS.above5,
        below1: step.ARTIFACTS.below1,
        below2: step.ARTIFACTS.below2,
        below3: step.ARTIFACTS.below3,
        below4: step.ARTIFACTS.below4,
        below5: step.ARTIFACTS.below5,
        takencolumn: step.ARTIFACTS.takencolumn,
        mytakencolumn: step.ARTIFACTS.mytakencolumn,
        opptakencolumn: step.ARTIFACTS.opptakencolumn,
        neutraltakencolumn: step.ARTIFACTS.neutraltakencolumn,
        upwards: step.ARTIFACTS.upwards,
        downwards: step.ARTIFACTS.downwards,
        currentcolumn: step.ARTIFACTS.currentcolumn,
        conquerwith3: step.ARTIFACTS.conquerwith3,
        conquerwith4: step.ARTIFACTS.conquerwith4,
        conquerwith5: step.ARTIFACTS.conquerwith5,
        conquerwith2: step.ARTIFACTS.conquerwith2,
        conquerwith1: step.ARTIFACTS.conquerwith1
      };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let NEXTSPAWNID = step.NEXTSPAWNID;
      let MARKS = step.MARKS;
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: MARKS.selecttarget,
          id: newunitid,
          group: "lvl1",
          owner: ARTIFACTS.conquerwith1[MARKS.selecttarget]
            ? 2
            : ARTIFACTS.takencolumn[MARKS.selecttarget]
            ? (ARTIFACTS.takencolumn[MARKS.selecttarget] || {}).owner
            : 0,
          lvl: 1
        };
      }
      if (ARTIFACTS.conquerwith1[MARKS.selecttarget]) {
        for (let LOOPPOS in ARTIFACTS.currentcolumn) {
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
      }
      UNITLAYERS = { units: {}, myunits: {}, oppunits: {}, neutralunits: {} };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (
        Object.keys(BOARD.board).length === Object.keys(UNITLAYERS.units).length
      ) {
        LINKS.endGame = ["draw", "lose", "win"][
          Object.keys(ARTIFACTS.myownedcolumns).length >
          Object.keys(ARTIFACTS.oppownedcolumns).length
            ? 2
            : Object.keys(ARTIFACTS.myownedcolumns).length <
              Object.keys(ARTIFACTS.oppownedcolumns).length
            ? 1
            : 0
        ];
        LINKS.endedBy = "dominance";
        LINKS.endMarks = Object.keys(
          Object.keys(ARTIFACTS.myownedcolumns).length >
            Object.keys(ARTIFACTS.oppownedcolumns).length
            ? UNITLAYERS.myunits
            : Object.keys(ARTIFACTS.myownedcolumns).length <
              Object.keys(ARTIFACTS.oppownedcolumns).length
            ? UNITLAYERS.oppunits
            : emptyObj
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
        NEXTSPAWNID
      };
    },
    place2_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        ownedcolumns: step.ARTIFACTS.ownedcolumns,
        myownedcolumns: step.ARTIFACTS.myownedcolumns,
        oppownedcolumns: step.ARTIFACTS.oppownedcolumns,
        neutralownedcolumns: step.ARTIFACTS.neutralownedcolumns,
        FOOBAR: step.ARTIFACTS.FOOBAR,
        sees1: step.ARTIFACTS.sees1,
        sees2: step.ARTIFACTS.sees2,
        sees3: step.ARTIFACTS.sees3,
        sees4: step.ARTIFACTS.sees4,
        sees5: step.ARTIFACTS.sees5,
        above1: step.ARTIFACTS.above1,
        above2: step.ARTIFACTS.above2,
        above3: step.ARTIFACTS.above3,
        above4: step.ARTIFACTS.above4,
        above5: step.ARTIFACTS.above5,
        below1: step.ARTIFACTS.below1,
        below2: step.ARTIFACTS.below2,
        below3: step.ARTIFACTS.below3,
        below4: step.ARTIFACTS.below4,
        below5: step.ARTIFACTS.below5,
        takencolumn: step.ARTIFACTS.takencolumn,
        mytakencolumn: step.ARTIFACTS.mytakencolumn,
        opptakencolumn: step.ARTIFACTS.opptakencolumn,
        neutraltakencolumn: step.ARTIFACTS.neutraltakencolumn,
        upwards: step.ARTIFACTS.upwards,
        downwards: step.ARTIFACTS.downwards,
        currentcolumn: step.ARTIFACTS.currentcolumn,
        conquerwith3: step.ARTIFACTS.conquerwith3,
        conquerwith4: step.ARTIFACTS.conquerwith4,
        conquerwith5: step.ARTIFACTS.conquerwith5,
        conquerwith2: step.ARTIFACTS.conquerwith2,
        conquerwith1: step.ARTIFACTS.conquerwith1
      };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let NEXTSPAWNID = step.NEXTSPAWNID;
      let MARKS = step.MARKS;
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: MARKS.selecttarget,
          id: newunitid,
          group: "lvl2",
          owner: ARTIFACTS.conquerwith2[MARKS.selecttarget]
            ? 2
            : ARTIFACTS.takencolumn[MARKS.selecttarget]
            ? (ARTIFACTS.takencolumn[MARKS.selecttarget] || {}).owner
            : 0,
          lvl: 2
        };
      }
      if (ARTIFACTS.conquerwith2[MARKS.selecttarget]) {
        for (let LOOPPOS in ARTIFACTS.currentcolumn) {
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
      }
      UNITLAYERS = { units: {}, myunits: {}, oppunits: {}, neutralunits: {} };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (
        Object.keys(BOARD.board).length === Object.keys(UNITLAYERS.units).length
      ) {
        LINKS.endGame = ["draw", "lose", "win"][
          Object.keys(ARTIFACTS.myownedcolumns).length >
          Object.keys(ARTIFACTS.oppownedcolumns).length
            ? 2
            : Object.keys(ARTIFACTS.myownedcolumns).length <
              Object.keys(ARTIFACTS.oppownedcolumns).length
            ? 1
            : 0
        ];
        LINKS.endedBy = "dominance";
        LINKS.endMarks = Object.keys(
          Object.keys(ARTIFACTS.myownedcolumns).length >
            Object.keys(ARTIFACTS.oppownedcolumns).length
            ? UNITLAYERS.myunits
            : Object.keys(ARTIFACTS.myownedcolumns).length <
              Object.keys(ARTIFACTS.oppownedcolumns).length
            ? UNITLAYERS.oppunits
            : emptyObj
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
        NEXTSPAWNID
      };
    },
    place3_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        ownedcolumns: step.ARTIFACTS.ownedcolumns,
        myownedcolumns: step.ARTIFACTS.myownedcolumns,
        oppownedcolumns: step.ARTIFACTS.oppownedcolumns,
        neutralownedcolumns: step.ARTIFACTS.neutralownedcolumns,
        FOOBAR: step.ARTIFACTS.FOOBAR,
        sees1: step.ARTIFACTS.sees1,
        sees2: step.ARTIFACTS.sees2,
        sees3: step.ARTIFACTS.sees3,
        sees4: step.ARTIFACTS.sees4,
        sees5: step.ARTIFACTS.sees5,
        above1: step.ARTIFACTS.above1,
        above2: step.ARTIFACTS.above2,
        above3: step.ARTIFACTS.above3,
        above4: step.ARTIFACTS.above4,
        above5: step.ARTIFACTS.above5,
        below1: step.ARTIFACTS.below1,
        below2: step.ARTIFACTS.below2,
        below3: step.ARTIFACTS.below3,
        below4: step.ARTIFACTS.below4,
        below5: step.ARTIFACTS.below5,
        takencolumn: step.ARTIFACTS.takencolumn,
        mytakencolumn: step.ARTIFACTS.mytakencolumn,
        opptakencolumn: step.ARTIFACTS.opptakencolumn,
        neutraltakencolumn: step.ARTIFACTS.neutraltakencolumn,
        upwards: step.ARTIFACTS.upwards,
        downwards: step.ARTIFACTS.downwards,
        currentcolumn: step.ARTIFACTS.currentcolumn,
        conquerwith3: step.ARTIFACTS.conquerwith3,
        conquerwith4: step.ARTIFACTS.conquerwith4,
        conquerwith5: step.ARTIFACTS.conquerwith5,
        conquerwith2: step.ARTIFACTS.conquerwith2,
        conquerwith1: step.ARTIFACTS.conquerwith1
      };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let NEXTSPAWNID = step.NEXTSPAWNID;
      let MARKS = step.MARKS;
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: MARKS.selecttarget,
          id: newunitid,
          group: "lvl3",
          owner: ARTIFACTS.conquerwith3[MARKS.selecttarget]
            ? 2
            : ARTIFACTS.takencolumn[MARKS.selecttarget]
            ? (ARTIFACTS.takencolumn[MARKS.selecttarget] || {}).owner
            : 0,
          lvl: 3
        };
      }
      if (ARTIFACTS.conquerwith3[MARKS.selecttarget]) {
        for (let LOOPPOS in ARTIFACTS.currentcolumn) {
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
      }
      UNITLAYERS = { units: {}, myunits: {}, oppunits: {}, neutralunits: {} };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (
        Object.keys(BOARD.board).length === Object.keys(UNITLAYERS.units).length
      ) {
        LINKS.endGame = ["draw", "lose", "win"][
          Object.keys(ARTIFACTS.myownedcolumns).length >
          Object.keys(ARTIFACTS.oppownedcolumns).length
            ? 2
            : Object.keys(ARTIFACTS.myownedcolumns).length <
              Object.keys(ARTIFACTS.oppownedcolumns).length
            ? 1
            : 0
        ];
        LINKS.endedBy = "dominance";
        LINKS.endMarks = Object.keys(
          Object.keys(ARTIFACTS.myownedcolumns).length >
            Object.keys(ARTIFACTS.oppownedcolumns).length
            ? UNITLAYERS.myunits
            : Object.keys(ARTIFACTS.myownedcolumns).length <
              Object.keys(ARTIFACTS.oppownedcolumns).length
            ? UNITLAYERS.oppunits
            : emptyObj
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
        NEXTSPAWNID
      };
    },
    place4_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        ownedcolumns: step.ARTIFACTS.ownedcolumns,
        myownedcolumns: step.ARTIFACTS.myownedcolumns,
        oppownedcolumns: step.ARTIFACTS.oppownedcolumns,
        neutralownedcolumns: step.ARTIFACTS.neutralownedcolumns,
        FOOBAR: step.ARTIFACTS.FOOBAR,
        sees1: step.ARTIFACTS.sees1,
        sees2: step.ARTIFACTS.sees2,
        sees3: step.ARTIFACTS.sees3,
        sees4: step.ARTIFACTS.sees4,
        sees5: step.ARTIFACTS.sees5,
        above1: step.ARTIFACTS.above1,
        above2: step.ARTIFACTS.above2,
        above3: step.ARTIFACTS.above3,
        above4: step.ARTIFACTS.above4,
        above5: step.ARTIFACTS.above5,
        below1: step.ARTIFACTS.below1,
        below2: step.ARTIFACTS.below2,
        below3: step.ARTIFACTS.below3,
        below4: step.ARTIFACTS.below4,
        below5: step.ARTIFACTS.below5,
        takencolumn: step.ARTIFACTS.takencolumn,
        mytakencolumn: step.ARTIFACTS.mytakencolumn,
        opptakencolumn: step.ARTIFACTS.opptakencolumn,
        neutraltakencolumn: step.ARTIFACTS.neutraltakencolumn,
        upwards: step.ARTIFACTS.upwards,
        downwards: step.ARTIFACTS.downwards,
        currentcolumn: step.ARTIFACTS.currentcolumn,
        conquerwith3: step.ARTIFACTS.conquerwith3,
        conquerwith4: step.ARTIFACTS.conquerwith4,
        conquerwith5: step.ARTIFACTS.conquerwith5,
        conquerwith2: step.ARTIFACTS.conquerwith2,
        conquerwith1: step.ARTIFACTS.conquerwith1
      };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let NEXTSPAWNID = step.NEXTSPAWNID;
      let MARKS = step.MARKS;
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: MARKS.selecttarget,
          id: newunitid,
          group: "lvl4",
          owner: ARTIFACTS.conquerwith4[MARKS.selecttarget]
            ? 2
            : ARTIFACTS.takencolumn[MARKS.selecttarget]
            ? (ARTIFACTS.takencolumn[MARKS.selecttarget] || {}).owner
            : 0,
          lvl: 4
        };
      }
      if (ARTIFACTS.conquerwith4[MARKS.selecttarget]) {
        for (let LOOPPOS in ARTIFACTS.currentcolumn) {
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
      }
      UNITLAYERS = { units: {}, myunits: {}, oppunits: {}, neutralunits: {} };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (
        Object.keys(BOARD.board).length === Object.keys(UNITLAYERS.units).length
      ) {
        LINKS.endGame = ["draw", "lose", "win"][
          Object.keys(ARTIFACTS.myownedcolumns).length >
          Object.keys(ARTIFACTS.oppownedcolumns).length
            ? 2
            : Object.keys(ARTIFACTS.myownedcolumns).length <
              Object.keys(ARTIFACTS.oppownedcolumns).length
            ? 1
            : 0
        ];
        LINKS.endedBy = "dominance";
        LINKS.endMarks = Object.keys(
          Object.keys(ARTIFACTS.myownedcolumns).length >
            Object.keys(ARTIFACTS.oppownedcolumns).length
            ? UNITLAYERS.myunits
            : Object.keys(ARTIFACTS.myownedcolumns).length <
              Object.keys(ARTIFACTS.oppownedcolumns).length
            ? UNITLAYERS.oppunits
            : emptyObj
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
        NEXTSPAWNID
      };
    },
    place5_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        ownedcolumns: step.ARTIFACTS.ownedcolumns,
        myownedcolumns: step.ARTIFACTS.myownedcolumns,
        oppownedcolumns: step.ARTIFACTS.oppownedcolumns,
        neutralownedcolumns: step.ARTIFACTS.neutralownedcolumns,
        FOOBAR: step.ARTIFACTS.FOOBAR,
        sees1: step.ARTIFACTS.sees1,
        sees2: step.ARTIFACTS.sees2,
        sees3: step.ARTIFACTS.sees3,
        sees4: step.ARTIFACTS.sees4,
        sees5: step.ARTIFACTS.sees5,
        above1: step.ARTIFACTS.above1,
        above2: step.ARTIFACTS.above2,
        above3: step.ARTIFACTS.above3,
        above4: step.ARTIFACTS.above4,
        above5: step.ARTIFACTS.above5,
        below1: step.ARTIFACTS.below1,
        below2: step.ARTIFACTS.below2,
        below3: step.ARTIFACTS.below3,
        below4: step.ARTIFACTS.below4,
        below5: step.ARTIFACTS.below5,
        takencolumn: step.ARTIFACTS.takencolumn,
        mytakencolumn: step.ARTIFACTS.mytakencolumn,
        opptakencolumn: step.ARTIFACTS.opptakencolumn,
        neutraltakencolumn: step.ARTIFACTS.neutraltakencolumn,
        upwards: step.ARTIFACTS.upwards,
        downwards: step.ARTIFACTS.downwards,
        currentcolumn: step.ARTIFACTS.currentcolumn,
        conquerwith3: step.ARTIFACTS.conquerwith3,
        conquerwith4: step.ARTIFACTS.conquerwith4,
        conquerwith5: step.ARTIFACTS.conquerwith5,
        conquerwith2: step.ARTIFACTS.conquerwith2,
        conquerwith1: step.ARTIFACTS.conquerwith1
      };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let NEXTSPAWNID = step.NEXTSPAWNID;
      let MARKS = step.MARKS;
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: MARKS.selecttarget,
          id: newunitid,
          group: "lvl5",
          owner: ARTIFACTS.conquerwith5[MARKS.selecttarget]
            ? 2
            : ARTIFACTS.takencolumn[MARKS.selecttarget]
            ? (ARTIFACTS.takencolumn[MARKS.selecttarget] || {}).owner
            : 0,
          lvl: 5
        };
      }
      if (ARTIFACTS.conquerwith5[MARKS.selecttarget]) {
        for (let LOOPPOS in ARTIFACTS.currentcolumn) {
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
      }
      UNITLAYERS = { units: {}, myunits: {}, oppunits: {}, neutralunits: {} };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (
        Object.keys(BOARD.board).length === Object.keys(UNITLAYERS.units).length
      ) {
        LINKS.endGame = ["draw", "lose", "win"][
          Object.keys(ARTIFACTS.myownedcolumns).length >
          Object.keys(ARTIFACTS.oppownedcolumns).length
            ? 2
            : Object.keys(ARTIFACTS.myownedcolumns).length <
              Object.keys(ARTIFACTS.oppownedcolumns).length
            ? 1
            : 0
        ];
        LINKS.endedBy = "dominance";
        LINKS.endMarks = Object.keys(
          Object.keys(ARTIFACTS.myownedcolumns).length >
            Object.keys(ARTIFACTS.oppownedcolumns).length
            ? UNITLAYERS.myunits
            : Object.keys(ARTIFACTS.myownedcolumns).length <
              Object.keys(ARTIFACTS.oppownedcolumns).length
            ? UNITLAYERS.oppunits
            : emptyObj
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
        NEXTSPAWNID
      };
    }
  },
  instruction: {
    startTurn_basic_1: step => {
      return collapseContent({
        line: [{ text: "Select a free spot to place a unit" }]
      });
    },
    place1_basic_1: () => defaultInstruction(1),
    place2_basic_1: () => defaultInstruction(1),
    place3_basic_1: () => defaultInstruction(1),
    place4_basic_1: () => defaultInstruction(1),
    place5_basic_1: () => defaultInstruction(1),
    selecttarget_basic_1: step => {
      let ARTIFACTS = step.ARTIFACTS;
      let MARKS = step.MARKS;
      let LINKS = step.LINKS;
      return collapseContent({
        line: [
          { text: "Press" },
          collapseContent({
            line: [
              !!LINKS.commands["place1"]
                ? collapseContent({
                    line: [
                      { command: "place1" },
                      { text: "for" },
                      {
                        unittype: [
                          "pawn",
                          ARTIFACTS.takencolumn[MARKS.selecttarget]
                            ? (ARTIFACTS.takencolumn[MARKS.selecttarget] || {})
                                .owner
                            : ARTIFACTS.conquerwith1[MARKS.selecttarget]
                            ? 1
                            : 0
                        ]
                      }
                    ]
                  })
                : undefined,
              !!LINKS.commands["place2"]
                ? collapseContent({
                    line: [
                      { command: "place2" },
                      { text: "for" },
                      {
                        unittype: [
                          "knight",
                          ARTIFACTS.takencolumn[MARKS.selecttarget]
                            ? (ARTIFACTS.takencolumn[MARKS.selecttarget] || {})
                                .owner
                            : ARTIFACTS.conquerwith2[MARKS.selecttarget]
                            ? 1
                            : 0
                        ]
                      }
                    ]
                  })
                : undefined,
              !!LINKS.commands["place3"]
                ? collapseContent({
                    line: [
                      { command: "place3" },
                      { text: "for" },
                      {
                        unittype: [
                          "rook",
                          ARTIFACTS.takencolumn[MARKS.selecttarget]
                            ? (ARTIFACTS.takencolumn[MARKS.selecttarget] || {})
                                .owner
                            : ARTIFACTS.conquerwith3[MARKS.selecttarget]
                            ? 1
                            : 0
                        ]
                      }
                    ]
                  })
                : undefined,
              !!LINKS.commands["place4"]
                ? collapseContent({
                    line: [
                      { command: "place4" },
                      { text: "for" },
                      {
                        unittype: [
                          "king",
                          ARTIFACTS.takencolumn[MARKS.selecttarget]
                            ? (ARTIFACTS.takencolumn[MARKS.selecttarget] || {})
                                .owner
                            : ARTIFACTS.conquerwith4[MARKS.selecttarget]
                            ? 1
                            : 0
                        ]
                      }
                    ]
                  })
                : undefined,
              !!LINKS.commands["place5"]
                ? collapseContent({
                    line: [
                      { command: "place5" },
                      { text: "for" },
                      {
                        unittype: [
                          "queen",
                          ARTIFACTS.takencolumn[MARKS.selecttarget]
                            ? (ARTIFACTS.takencolumn[MARKS.selecttarget] || {})
                                .owner
                            : ARTIFACTS.conquerwith5[MARKS.selecttarget]
                            ? 1
                            : 0
                        ]
                      }
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
    startTurn_basic_2: step => {
      return collapseContent({
        line: [{ text: "Select a free spot to place a unit" }]
      });
    },
    place1_basic_2: () => defaultInstruction(2),
    place2_basic_2: () => defaultInstruction(2),
    place3_basic_2: () => defaultInstruction(2),
    place4_basic_2: () => defaultInstruction(2),
    place5_basic_2: () => defaultInstruction(2),
    selecttarget_basic_2: step => {
      let ARTIFACTS = step.ARTIFACTS;
      let MARKS = step.MARKS;
      let LINKS = step.LINKS;
      return collapseContent({
        line: [
          { text: "Press" },
          collapseContent({
            line: [
              !!LINKS.commands["place1"]
                ? collapseContent({
                    line: [
                      { command: "place1" },
                      { text: "for" },
                      {
                        unittype: [
                          "pawn",
                          ARTIFACTS.takencolumn[MARKS.selecttarget]
                            ? (ARTIFACTS.takencolumn[MARKS.selecttarget] || {})
                                .owner
                            : ARTIFACTS.conquerwith1[MARKS.selecttarget]
                            ? 2
                            : 0
                        ]
                      }
                    ]
                  })
                : undefined,
              !!LINKS.commands["place2"]
                ? collapseContent({
                    line: [
                      { command: "place2" },
                      { text: "for" },
                      {
                        unittype: [
                          "knight",
                          ARTIFACTS.takencolumn[MARKS.selecttarget]
                            ? (ARTIFACTS.takencolumn[MARKS.selecttarget] || {})
                                .owner
                            : ARTIFACTS.conquerwith2[MARKS.selecttarget]
                            ? 2
                            : 0
                        ]
                      }
                    ]
                  })
                : undefined,
              !!LINKS.commands["place3"]
                ? collapseContent({
                    line: [
                      { command: "place3" },
                      { text: "for" },
                      {
                        unittype: [
                          "rook",
                          ARTIFACTS.takencolumn[MARKS.selecttarget]
                            ? (ARTIFACTS.takencolumn[MARKS.selecttarget] || {})
                                .owner
                            : ARTIFACTS.conquerwith3[MARKS.selecttarget]
                            ? 2
                            : 0
                        ]
                      }
                    ]
                  })
                : undefined,
              !!LINKS.commands["place4"]
                ? collapseContent({
                    line: [
                      { command: "place4" },
                      { text: "for" },
                      {
                        unittype: [
                          "king",
                          ARTIFACTS.takencolumn[MARKS.selecttarget]
                            ? (ARTIFACTS.takencolumn[MARKS.selecttarget] || {})
                                .owner
                            : ARTIFACTS.conquerwith4[MARKS.selecttarget]
                            ? 2
                            : 0
                        ]
                      }
                    ]
                  })
                : undefined,
              !!LINKS.commands["place5"]
                ? collapseContent({
                    line: [
                      { command: "place5" },
                      { text: "for" },
                      {
                        unittype: [
                          "queen",
                          ARTIFACTS.takencolumn[MARKS.selecttarget]
                            ? (ARTIFACTS.takencolumn[MARKS.selecttarget] || {})
                                .owner
                            : ARTIFACTS.conquerwith5[MARKS.selecttarget]
                            ? 2
                            : 0
                        ]
                      }
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
          lvl1: {
            "1": ["c3"],
            "2": ["b5"]
          },
          lvl2: {
            "0": ["d4"]
          },
          lvl3: {
            "0": ["d5"],
            "2": ["b1"]
          },
          lvl4: {
            "1": ["c4"],
            "2": ["b3"]
          },
          lvl5: {
            "1": ["c5"],
            "2": ["b2"]
          }
        },
        marks: [],
        potentialMarks: [
          "a1",
          "a2",
          "a3",
          "a4",
          "a5",
          "b4",
          "c1",
          "c2",
          "d1",
          "d2",
          "d3",
          "e1",
          "e2",
          "e3",
          "e4",
          "e5"
        ]
      }
    }
  ],
  boards: {
    basic: {
      height: 5,
      width: 5,
      terrain: {}
    }
  },
  setups: {
    basic: {}
  }
};
export default game;
