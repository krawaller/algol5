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
import boards from "../../games/definitions/erdoslatino/boards";
import setups from "../../games/definitions/erdoslatino/setups";
import variants from "../../games/definitions/erdoslatino/variants";
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
        sees: {},
        takencolumn: {},
        mytakencolumn: {},
        opptakencolumn: {},
        neutraltakencolumn: {},
        almost: {},
        conquer: {},
        oppconquer: {}
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
                if (!UNITLAYERS.units[POS]) {
                  ARTIFACTS.sees[POS] = {
                    who:
                      (ARTIFACTS.sees[POS] || {}).who |
                      (UNITLAYERS.units[STARTPOS] || {}).bit,
                    minbelow:
                      DIR === 1
                        ? Math.min.apply(
                            null,
                            [
                              (ARTIFACTS.sees[POS] || {}).minbelow,
                              (UNITLAYERS.units[STARTPOS] || {}).bottom
                            ].filter(n => !isNaN(n))
                          )
                        : (ARTIFACTS.sees[POS] || {}).minbelow,
                    maxbelow:
                      DIR === 1
                        ? Math.max.apply(
                            null,
                            [
                              (ARTIFACTS.sees[POS] || {}).maxbelow,
                              (UNITLAYERS.units[STARTPOS] || {}).top
                            ].filter(n => !isNaN(n))
                          )
                        : (ARTIFACTS.sees[POS] || {}).maxbelow,
                    minabove:
                      DIR === 5
                        ? Math.min.apply(
                            null,
                            [
                              (ARTIFACTS.sees[POS] || {}).minabove,
                              (UNITLAYERS.units[STARTPOS] || {}).bottom
                            ].filter(n => !isNaN(n))
                          )
                        : (ARTIFACTS.sees[POS] || {}).minabove,
                    maxabove:
                      DIR === 5
                        ? Math.max.apply(
                            null,
                            [
                              (ARTIFACTS.sees[POS] || {}).maxabove,
                              (UNITLAYERS.units[STARTPOS] || {}).top
                            ].filter(n => !isNaN(n))
                          )
                        : (ARTIFACTS.sees[POS] || {}).maxabove
                  };
                }
              }
              {
                if (
                  !UNITLAYERS.neutralunits[STARTPOS] &&
                  (DIR === 1 || DIR === 5) &&
                  !UNITLAYERS.units[POS]
                ) {
                  let targetlayername = "takencolumn";
                  let artifact = {
                    owner: (UNITLAYERS.units[STARTPOS] || {}).owner
                  };
                  ARTIFACTS[targetlayername][POS] = ARTIFACTS[
                    prefixes1[artifact.owner] + targetlayername
                  ][POS] = artifact;
                }
              }
              {
                if (
                  (DIR === 1 || DIR === 5) &&
                  UNITLAYERS.neutralunits[POS] &&
                  UNITLAYERS.neutralunits[STARTPOS]
                ) {
                  ARTIFACTS.almost[POS] = {
                    ascnorth:
                      DIR === 1 &&
                      (UNITLAYERS.units[POS] || {}).bit >
                        (UNITLAYERS.units[STARTPOS] || {}).bit
                        ? 1
                        : (ARTIFACTS.almost[POS] || {}).ascnorth,
                    descnorth:
                      DIR === 1 &&
                      (UNITLAYERS.units[POS] || {}).bit <
                        (UNITLAYERS.units[STARTPOS] || {}).bit
                        ? 1
                        : (ARTIFACTS.almost[POS] || {}).descnorth,
                    ascsouth:
                      DIR === 5 &&
                      (UNITLAYERS.units[POS] || {}).bit >
                        (UNITLAYERS.units[STARTPOS] || {}).bit
                        ? 1
                        : (ARTIFACTS.almost[POS] || {}).ascsouth,
                    descsouth:
                      DIR === 5 &&
                      (UNITLAYERS.units[POS] || {}).bit <
                        (UNITLAYERS.units[STARTPOS] || {}).bit
                        ? 1
                        : (ARTIFACTS.almost[POS] || {}).descsouth
                  };
                }
              }
            }
            let WALKLENGTH = walkedsquares.length;
            if (WALKLENGTH) {
              if (
                DIR === 1 &&
                !UNITLAYERS.neutralunits[STARTPOS] &&
                !ARTIFACTS.ownedcolumns[walkedsquares[WALKLENGTH - 1]]
              ) {
                let targetlayername = "ownedcolumns";
                let artifact = {
                  owner: (UNITLAYERS.units[STARTPOS] || {}).owner
                };
                ARTIFACTS[targetlayername][
                  walkedsquares[WALKLENGTH - 1]
                ] = ARTIFACTS[prefixes1[artifact.owner] + targetlayername][
                  walkedsquares[WALKLENGTH - 1]
                ] = artifact;
              }
            }
          }
        }
      }
      {
        for (let STARTPOS in ARTIFACTS.almost) {
          for (let DIR of [1, 5]) {
            let POS = STARTPOS;
            while ((POS = connections[POS][DIR])) {
              {
                if (
                  DIR === 5 &&
                  !!(ARTIFACTS.sees[POS] || {}).minbelow &&
                  !UNITLAYERS.units[POS]
                ) {
                  ARTIFACTS.conquer[POS] = {
                    by:
                      (ARTIFACTS.conquer[POS] || {}).by |
                      (31 &
                        ~(ARTIFACTS.sees[POS] || {}).minbelow &
                        ~(UNITLAYERS.units[STARTPOS] || {}).top)
                  };
                }
              }
              {
                if (
                  DIR === 1 &&
                  !!(ARTIFACTS.sees[POS] || {}).minabove &&
                  !UNITLAYERS.units[POS]
                ) {
                  ARTIFACTS.oppconquer[POS] = {
                    by:
                      (ARTIFACTS.oppconquer[POS] || {}).by |
                      (31 &
                        ~(ARTIFACTS.sees[POS] || {}).minabove &
                        ~(UNITLAYERS.units[STARTPOS] || {}).top)
                  };
                }
              }
              {
                if (
                  !!(ARTIFACTS.almost[STARTPOS] || {})[
                    DIR === 1 ? "ascnorth" : "ascsouth"
                  ] &&
                  !UNITLAYERS.units[POS]
                ) {
                  ARTIFACTS[DIR === 1 ? "conquer" : "oppconquer"][POS] = {
                    by:
                      (
                        (DIR === 1 ? ARTIFACTS.conquer : ARTIFACTS.oppconquer)[
                          POS
                        ] || {}
                      ).by | (UNITLAYERS.units[STARTPOS] || {}).above
                  };
                }
              }
              {
                if (
                  !!(ARTIFACTS.almost[STARTPOS] || {})[
                    DIR === 1 ? "descnorth" : "descsouth"
                  ] &&
                  !UNITLAYERS.units[POS]
                ) {
                  ARTIFACTS[DIR === 1 ? "oppconquer" : "conquer"][POS] = {
                    by:
                      (
                        (DIR === 1 ? ARTIFACTS.oppconquer : ARTIFACTS.conquer)[
                          POS
                        ] || {}
                      ).by | (UNITLAYERS.units[STARTPOS] || {}).below
                  };
                }
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
        sees: {},
        takencolumn: {},
        mytakencolumn: {},
        opptakencolumn: {},
        neutraltakencolumn: {},
        almost: {},
        conquer: {},
        oppconquer: {}
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
                if (!UNITLAYERS.units[POS]) {
                  ARTIFACTS.sees[POS] = {
                    who:
                      (ARTIFACTS.sees[POS] || {}).who |
                      (UNITLAYERS.units[STARTPOS] || {}).bit,
                    minbelow:
                      DIR === 1
                        ? Math.min.apply(
                            null,
                            [
                              (ARTIFACTS.sees[POS] || {}).minbelow,
                              (UNITLAYERS.units[STARTPOS] || {}).bottom
                            ].filter(n => !isNaN(n))
                          )
                        : (ARTIFACTS.sees[POS] || {}).minbelow,
                    maxbelow:
                      DIR === 1
                        ? Math.max.apply(
                            null,
                            [
                              (ARTIFACTS.sees[POS] || {}).maxbelow,
                              (UNITLAYERS.units[STARTPOS] || {}).top
                            ].filter(n => !isNaN(n))
                          )
                        : (ARTIFACTS.sees[POS] || {}).maxbelow,
                    minabove:
                      DIR === 5
                        ? Math.min.apply(
                            null,
                            [
                              (ARTIFACTS.sees[POS] || {}).minabove,
                              (UNITLAYERS.units[STARTPOS] || {}).bottom
                            ].filter(n => !isNaN(n))
                          )
                        : (ARTIFACTS.sees[POS] || {}).minabove,
                    maxabove:
                      DIR === 5
                        ? Math.max.apply(
                            null,
                            [
                              (ARTIFACTS.sees[POS] || {}).maxabove,
                              (UNITLAYERS.units[STARTPOS] || {}).top
                            ].filter(n => !isNaN(n))
                          )
                        : (ARTIFACTS.sees[POS] || {}).maxabove
                  };
                }
              }
              {
                if (
                  !UNITLAYERS.neutralunits[STARTPOS] &&
                  (DIR === 1 || DIR === 5) &&
                  !UNITLAYERS.units[POS]
                ) {
                  let targetlayername = "takencolumn";
                  let artifact = {
                    owner: (UNITLAYERS.units[STARTPOS] || {}).owner
                  };
                  ARTIFACTS[targetlayername][POS] = ARTIFACTS[
                    prefixes2[artifact.owner] + targetlayername
                  ][POS] = artifact;
                }
              }
              {
                if (
                  (DIR === 1 || DIR === 5) &&
                  UNITLAYERS.neutralunits[POS] &&
                  UNITLAYERS.neutralunits[STARTPOS]
                ) {
                  ARTIFACTS.almost[POS] = {
                    ascnorth:
                      DIR === 1 &&
                      (UNITLAYERS.units[POS] || {}).bit >
                        (UNITLAYERS.units[STARTPOS] || {}).bit
                        ? 1
                        : (ARTIFACTS.almost[POS] || {}).ascnorth,
                    descnorth:
                      DIR === 1 &&
                      (UNITLAYERS.units[POS] || {}).bit <
                        (UNITLAYERS.units[STARTPOS] || {}).bit
                        ? 1
                        : (ARTIFACTS.almost[POS] || {}).descnorth,
                    ascsouth:
                      DIR === 5 &&
                      (UNITLAYERS.units[POS] || {}).bit >
                        (UNITLAYERS.units[STARTPOS] || {}).bit
                        ? 1
                        : (ARTIFACTS.almost[POS] || {}).ascsouth,
                    descsouth:
                      DIR === 5 &&
                      (UNITLAYERS.units[POS] || {}).bit <
                        (UNITLAYERS.units[STARTPOS] || {}).bit
                        ? 1
                        : (ARTIFACTS.almost[POS] || {}).descsouth
                  };
                }
              }
            }
            let WALKLENGTH = walkedsquares.length;
            if (WALKLENGTH) {
              if (
                DIR === 1 &&
                !UNITLAYERS.neutralunits[STARTPOS] &&
                !ARTIFACTS.ownedcolumns[walkedsquares[WALKLENGTH - 1]]
              ) {
                let targetlayername = "ownedcolumns";
                let artifact = {
                  owner: (UNITLAYERS.units[STARTPOS] || {}).owner
                };
                ARTIFACTS[targetlayername][
                  walkedsquares[WALKLENGTH - 1]
                ] = ARTIFACTS[prefixes2[artifact.owner] + targetlayername][
                  walkedsquares[WALKLENGTH - 1]
                ] = artifact;
              }
            }
          }
        }
      }
      {
        for (let STARTPOS in ARTIFACTS.almost) {
          for (let DIR of [1, 5]) {
            let POS = STARTPOS;
            while ((POS = connections[POS][DIR])) {
              {
                if (
                  DIR === 5 &&
                  !!(ARTIFACTS.sees[POS] || {}).maxbelow &&
                  !UNITLAYERS.units[POS]
                ) {
                  ARTIFACTS.conquer[POS] = {
                    by:
                      (ARTIFACTS.conquer[POS] || {}).by |
                      (31 &
                        ~(ARTIFACTS.sees[POS] || {}).maxbelow &
                        ~(UNITLAYERS.units[STARTPOS] || {}).bottom)
                  };
                }
              }
              {
                if (
                  DIR === 1 &&
                  !!(ARTIFACTS.sees[POS] || {}).maxabove &&
                  !UNITLAYERS.units[POS]
                ) {
                  ARTIFACTS.oppconquer[POS] = {
                    by:
                      (ARTIFACTS.oppconquer[POS] || {}).by |
                      (31 &
                        ~(ARTIFACTS.sees[POS] || {}).maxabove &
                        ~(UNITLAYERS.units[STARTPOS] || {}).bottom)
                  };
                }
              }
              {
                if (
                  !!(ARTIFACTS.almost[STARTPOS] || {})[
                    DIR === 1 ? "ascnorth" : "ascsouth"
                  ] &&
                  !UNITLAYERS.units[POS]
                ) {
                  ARTIFACTS[DIR === 1 ? "oppconquer" : "conquer"][POS] = {
                    by:
                      (
                        (DIR === 1 ? ARTIFACTS.oppconquer : ARTIFACTS.conquer)[
                          POS
                        ] || {}
                      ).by | (UNITLAYERS.units[STARTPOS] || {}).above
                  };
                }
              }
              {
                if (
                  !!(ARTIFACTS.almost[STARTPOS] || {})[
                    DIR === 1 ? "descnorth" : "descsouth"
                  ] &&
                  !UNITLAYERS.units[POS]
                ) {
                  ARTIFACTS[DIR === 1 ? "conquer" : "oppconquer"][POS] = {
                    by:
                      (
                        (DIR === 1 ? ARTIFACTS.conquer : ARTIFACTS.oppconquer)[
                          POS
                        ] || {}
                      ).by | (UNITLAYERS.units[STARTPOS] || {}).below
                  };
                }
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
        sees: step.ARTIFACTS.sees,
        takencolumn: step.ARTIFACTS.takencolumn,
        mytakencolumn: step.ARTIFACTS.mytakencolumn,
        opptakencolumn: step.ARTIFACTS.opptakencolumn,
        neutraltakencolumn: step.ARTIFACTS.neutraltakencolumn,
        almost: step.ARTIFACTS.almost,
        conquer: step.ARTIFACTS.conquer,
        oppconquer: step.ARTIFACTS.oppconquer,
        currentcolumn: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selecttarget: newMarkPos
      };
      {
        for (let DIR of [1, 5]) {
          let POS = "faux";
          connections.faux[DIR] = MARKS.selecttarget;
          while ((POS = connections[POS][DIR])) {
            ARTIFACTS.currentcolumn[POS] = emptyObj;
          }
        }
      }
      if (!Boolean((ARTIFACTS.sees[MARKS.selecttarget] || {}).who & 1)) {
        LINKS.commands.place1 = "place1_basic_1";
      }
      if (!Boolean((ARTIFACTS.sees[MARKS.selecttarget] || {}).who & 2)) {
        LINKS.commands.place2 = "place2_basic_1";
      }
      if (!Boolean((ARTIFACTS.sees[MARKS.selecttarget] || {}).who & 4)) {
        LINKS.commands.place3 = "place3_basic_1";
      }
      if (!Boolean((ARTIFACTS.sees[MARKS.selecttarget] || {}).who & 8)) {
        LINKS.commands.place4 = "place4_basic_1";
      }
      if (!Boolean((ARTIFACTS.sees[MARKS.selecttarget] || {}).who & 16)) {
        LINKS.commands.place5 = "place5_basic_1";
      }
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
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
        sees: step.ARTIFACTS.sees,
        takencolumn: step.ARTIFACTS.takencolumn,
        mytakencolumn: step.ARTIFACTS.mytakencolumn,
        opptakencolumn: step.ARTIFACTS.opptakencolumn,
        neutraltakencolumn: step.ARTIFACTS.neutraltakencolumn,
        almost: step.ARTIFACTS.almost,
        conquer: step.ARTIFACTS.conquer,
        oppconquer: step.ARTIFACTS.oppconquer,
        currentcolumn: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selecttarget: newMarkPos
      };
      {
        for (let DIR of [1, 5]) {
          let POS = "faux";
          connections.faux[DIR] = MARKS.selecttarget;
          while ((POS = connections[POS][DIR])) {
            ARTIFACTS.currentcolumn[POS] = emptyObj;
          }
        }
      }
      if (!Boolean((ARTIFACTS.sees[MARKS.selecttarget] || {}).who & 1)) {
        LINKS.commands.place1 = "place1_basic_2";
      }
      if (!Boolean((ARTIFACTS.sees[MARKS.selecttarget] || {}).who & 2)) {
        LINKS.commands.place2 = "place2_basic_2";
      }
      if (!Boolean((ARTIFACTS.sees[MARKS.selecttarget] || {}).who & 4)) {
        LINKS.commands.place3 = "place3_basic_2";
      }
      if (!Boolean((ARTIFACTS.sees[MARKS.selecttarget] || {}).who & 8)) {
        LINKS.commands.place4 = "place4_basic_2";
      }
      if (!Boolean((ARTIFACTS.sees[MARKS.selecttarget] || {}).who & 16)) {
        LINKS.commands.place5 = "place5_basic_2";
      }
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
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
        sees: step.ARTIFACTS.sees,
        takencolumn: step.ARTIFACTS.takencolumn,
        mytakencolumn: step.ARTIFACTS.mytakencolumn,
        opptakencolumn: step.ARTIFACTS.opptakencolumn,
        neutraltakencolumn: step.ARTIFACTS.neutraltakencolumn,
        almost: step.ARTIFACTS.almost,
        conquer: step.ARTIFACTS.conquer,
        oppconquer: step.ARTIFACTS.oppconquer,
        currentcolumn: step.ARTIFACTS.currentcolumn
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
          owner: ARTIFACTS.takencolumn[MARKS.selecttarget]
            ? (ARTIFACTS.takencolumn[MARKS.selecttarget] || {}).owner
            : Boolean((ARTIFACTS.conquer[MARKS.selecttarget] || {}).by & 1)
            ? 1
            : Boolean((ARTIFACTS.oppconquer[MARKS.selecttarget] || {}).by & 1)
            ? 2
            : 0,
          lvl: 1,
          bit: 1,
          bottom: 1,
          below: 0,
          top: 31,
          above: 0
        };
      }
      if (Boolean((ARTIFACTS.conquer[MARKS.selecttarget] || {}).by & 1)) {
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
      } else {
        if (Boolean((ARTIFACTS.oppconquer[MARKS.selecttarget] || {}).by & 1)) {
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
          whoWins(
            Object.keys(ARTIFACTS.myownedcolumns).length,
            Object.keys(ARTIFACTS.oppownedcolumns).length
          )
        ];
        LINKS.endedBy = "columncount";
        LINKS.endMarks = Object.keys(
          [emptyObj, UNITLAYERS.myunits, UNITLAYERS.oppunits][
            whoWins(
              Object.keys(ARTIFACTS.myownedcolumns).length,
              Object.keys(ARTIFACTS.oppownedcolumns).length
            )
          ]
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
        sees: step.ARTIFACTS.sees,
        takencolumn: step.ARTIFACTS.takencolumn,
        mytakencolumn: step.ARTIFACTS.mytakencolumn,
        opptakencolumn: step.ARTIFACTS.opptakencolumn,
        neutraltakencolumn: step.ARTIFACTS.neutraltakencolumn,
        almost: step.ARTIFACTS.almost,
        conquer: step.ARTIFACTS.conquer,
        oppconquer: step.ARTIFACTS.oppconquer,
        currentcolumn: step.ARTIFACTS.currentcolumn
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
          owner: ARTIFACTS.takencolumn[MARKS.selecttarget]
            ? (ARTIFACTS.takencolumn[MARKS.selecttarget] || {}).owner
            : Boolean((ARTIFACTS.conquer[MARKS.selecttarget] || {}).by & 2)
            ? 1
            : Boolean((ARTIFACTS.oppconquer[MARKS.selecttarget] || {}).by & 2)
            ? 2
            : 0,
          lvl: 2,
          bit: 2,
          bottom: 3,
          below: 1,
          top: 30,
          above: 28
        };
      }
      if (Boolean((ARTIFACTS.conquer[MARKS.selecttarget] || {}).by & 2)) {
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
      } else {
        if (Boolean((ARTIFACTS.oppconquer[MARKS.selecttarget] || {}).by & 2)) {
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
          whoWins(
            Object.keys(ARTIFACTS.myownedcolumns).length,
            Object.keys(ARTIFACTS.oppownedcolumns).length
          )
        ];
        LINKS.endedBy = "columncount";
        LINKS.endMarks = Object.keys(
          [emptyObj, UNITLAYERS.myunits, UNITLAYERS.oppunits][
            whoWins(
              Object.keys(ARTIFACTS.myownedcolumns).length,
              Object.keys(ARTIFACTS.oppownedcolumns).length
            )
          ]
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
        sees: step.ARTIFACTS.sees,
        takencolumn: step.ARTIFACTS.takencolumn,
        mytakencolumn: step.ARTIFACTS.mytakencolumn,
        opptakencolumn: step.ARTIFACTS.opptakencolumn,
        neutraltakencolumn: step.ARTIFACTS.neutraltakencolumn,
        almost: step.ARTIFACTS.almost,
        conquer: step.ARTIFACTS.conquer,
        oppconquer: step.ARTIFACTS.oppconquer,
        currentcolumn: step.ARTIFACTS.currentcolumn
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
          owner: ARTIFACTS.takencolumn[MARKS.selecttarget]
            ? (ARTIFACTS.takencolumn[MARKS.selecttarget] || {}).owner
            : Boolean((ARTIFACTS.conquer[MARKS.selecttarget] || {}).by & 4)
            ? 1
            : Boolean((ARTIFACTS.oppconquer[MARKS.selecttarget] || {}).by & 4)
            ? 2
            : 0,
          lvl: 3,
          bit: 4,
          bottom: 7,
          below: 3,
          top: 28,
          above: 24
        };
      }
      if (Boolean((ARTIFACTS.conquer[MARKS.selecttarget] || {}).by & 4)) {
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
      } else {
        if (Boolean((ARTIFACTS.oppconquer[MARKS.selecttarget] || {}).by & 4)) {
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
          whoWins(
            Object.keys(ARTIFACTS.myownedcolumns).length,
            Object.keys(ARTIFACTS.oppownedcolumns).length
          )
        ];
        LINKS.endedBy = "columncount";
        LINKS.endMarks = Object.keys(
          [emptyObj, UNITLAYERS.myunits, UNITLAYERS.oppunits][
            whoWins(
              Object.keys(ARTIFACTS.myownedcolumns).length,
              Object.keys(ARTIFACTS.oppownedcolumns).length
            )
          ]
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
        sees: step.ARTIFACTS.sees,
        takencolumn: step.ARTIFACTS.takencolumn,
        mytakencolumn: step.ARTIFACTS.mytakencolumn,
        opptakencolumn: step.ARTIFACTS.opptakencolumn,
        neutraltakencolumn: step.ARTIFACTS.neutraltakencolumn,
        almost: step.ARTIFACTS.almost,
        conquer: step.ARTIFACTS.conquer,
        oppconquer: step.ARTIFACTS.oppconquer,
        currentcolumn: step.ARTIFACTS.currentcolumn
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
          owner: ARTIFACTS.takencolumn[MARKS.selecttarget]
            ? (ARTIFACTS.takencolumn[MARKS.selecttarget] || {}).owner
            : Boolean((ARTIFACTS.conquer[MARKS.selecttarget] || {}).by & 8)
            ? 1
            : Boolean((ARTIFACTS.oppconquer[MARKS.selecttarget] || {}).by & 8)
            ? 2
            : 0,
          lvl: 4,
          bit: 8,
          bottom: 15,
          below: 7,
          top: 24,
          above: 16
        };
      }
      if (Boolean((ARTIFACTS.conquer[MARKS.selecttarget] || {}).by & 8)) {
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
      } else {
        if (Boolean((ARTIFACTS.oppconquer[MARKS.selecttarget] || {}).by & 8)) {
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
          whoWins(
            Object.keys(ARTIFACTS.myownedcolumns).length,
            Object.keys(ARTIFACTS.oppownedcolumns).length
          )
        ];
        LINKS.endedBy = "columncount";
        LINKS.endMarks = Object.keys(
          [emptyObj, UNITLAYERS.myunits, UNITLAYERS.oppunits][
            whoWins(
              Object.keys(ARTIFACTS.myownedcolumns).length,
              Object.keys(ARTIFACTS.oppownedcolumns).length
            )
          ]
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
        sees: step.ARTIFACTS.sees,
        takencolumn: step.ARTIFACTS.takencolumn,
        mytakencolumn: step.ARTIFACTS.mytakencolumn,
        opptakencolumn: step.ARTIFACTS.opptakencolumn,
        neutraltakencolumn: step.ARTIFACTS.neutraltakencolumn,
        almost: step.ARTIFACTS.almost,
        conquer: step.ARTIFACTS.conquer,
        oppconquer: step.ARTIFACTS.oppconquer,
        currentcolumn: step.ARTIFACTS.currentcolumn
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
          owner: ARTIFACTS.takencolumn[MARKS.selecttarget]
            ? (ARTIFACTS.takencolumn[MARKS.selecttarget] || {}).owner
            : Boolean((ARTIFACTS.conquer[MARKS.selecttarget] || {}).by & 16)
            ? 1
            : Boolean((ARTIFACTS.oppconquer[MARKS.selecttarget] || {}).by & 16)
            ? 2
            : 0,
          lvl: 5,
          bit: 16,
          bottom: 31,
          below: 0,
          top: 16,
          above: 0
        };
      }
      if (Boolean((ARTIFACTS.conquer[MARKS.selecttarget] || {}).by & 16)) {
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
      } else {
        if (Boolean((ARTIFACTS.oppconquer[MARKS.selecttarget] || {}).by & 16)) {
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
          whoWins(
            Object.keys(ARTIFACTS.myownedcolumns).length,
            Object.keys(ARTIFACTS.oppownedcolumns).length
          )
        ];
        LINKS.endedBy = "columncount";
        LINKS.endMarks = Object.keys(
          [emptyObj, UNITLAYERS.myunits, UNITLAYERS.oppunits][
            whoWins(
              Object.keys(ARTIFACTS.myownedcolumns).length,
              Object.keys(ARTIFACTS.oppownedcolumns).length
            )
          ]
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
        sees: step.ARTIFACTS.sees,
        takencolumn: step.ARTIFACTS.takencolumn,
        mytakencolumn: step.ARTIFACTS.mytakencolumn,
        opptakencolumn: step.ARTIFACTS.opptakencolumn,
        neutraltakencolumn: step.ARTIFACTS.neutraltakencolumn,
        almost: step.ARTIFACTS.almost,
        conquer: step.ARTIFACTS.conquer,
        oppconquer: step.ARTIFACTS.oppconquer,
        currentcolumn: step.ARTIFACTS.currentcolumn
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
          owner: ARTIFACTS.takencolumn[MARKS.selecttarget]
            ? (ARTIFACTS.takencolumn[MARKS.selecttarget] || {}).owner
            : Boolean((ARTIFACTS.conquer[MARKS.selecttarget] || {}).by & 1)
            ? 2
            : Boolean((ARTIFACTS.oppconquer[MARKS.selecttarget] || {}).by & 1)
            ? 1
            : 0,
          lvl: 1,
          bit: 1,
          bottom: 1,
          below: 0,
          top: 31,
          above: 0
        };
      }
      if (Boolean((ARTIFACTS.conquer[MARKS.selecttarget] || {}).by & 1)) {
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
      } else {
        if (Boolean((ARTIFACTS.oppconquer[MARKS.selecttarget] || {}).by & 1)) {
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
          whoWins(
            Object.keys(ARTIFACTS.oppownedcolumns).length,
            Object.keys(ARTIFACTS.myownedcolumns).length
          )
        ];
        LINKS.endedBy = "columncount";
        LINKS.endMarks = Object.keys(
          [emptyObj, UNITLAYERS.myunits, UNITLAYERS.oppunits][
            whoWins(
              Object.keys(ARTIFACTS.myownedcolumns).length,
              Object.keys(ARTIFACTS.oppownedcolumns).length
            )
          ]
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
        sees: step.ARTIFACTS.sees,
        takencolumn: step.ARTIFACTS.takencolumn,
        mytakencolumn: step.ARTIFACTS.mytakencolumn,
        opptakencolumn: step.ARTIFACTS.opptakencolumn,
        neutraltakencolumn: step.ARTIFACTS.neutraltakencolumn,
        almost: step.ARTIFACTS.almost,
        conquer: step.ARTIFACTS.conquer,
        oppconquer: step.ARTIFACTS.oppconquer,
        currentcolumn: step.ARTIFACTS.currentcolumn
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
          owner: ARTIFACTS.takencolumn[MARKS.selecttarget]
            ? (ARTIFACTS.takencolumn[MARKS.selecttarget] || {}).owner
            : Boolean((ARTIFACTS.conquer[MARKS.selecttarget] || {}).by & 2)
            ? 2
            : Boolean((ARTIFACTS.oppconquer[MARKS.selecttarget] || {}).by & 2)
            ? 1
            : 0,
          lvl: 2,
          bit: 2,
          bottom: 3,
          below: 1,
          top: 30,
          above: 28
        };
      }
      if (Boolean((ARTIFACTS.conquer[MARKS.selecttarget] || {}).by & 2)) {
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
      } else {
        if (Boolean((ARTIFACTS.oppconquer[MARKS.selecttarget] || {}).by & 2)) {
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
          whoWins(
            Object.keys(ARTIFACTS.oppownedcolumns).length,
            Object.keys(ARTIFACTS.myownedcolumns).length
          )
        ];
        LINKS.endedBy = "columncount";
        LINKS.endMarks = Object.keys(
          [emptyObj, UNITLAYERS.myunits, UNITLAYERS.oppunits][
            whoWins(
              Object.keys(ARTIFACTS.myownedcolumns).length,
              Object.keys(ARTIFACTS.oppownedcolumns).length
            )
          ]
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
        sees: step.ARTIFACTS.sees,
        takencolumn: step.ARTIFACTS.takencolumn,
        mytakencolumn: step.ARTIFACTS.mytakencolumn,
        opptakencolumn: step.ARTIFACTS.opptakencolumn,
        neutraltakencolumn: step.ARTIFACTS.neutraltakencolumn,
        almost: step.ARTIFACTS.almost,
        conquer: step.ARTIFACTS.conquer,
        oppconquer: step.ARTIFACTS.oppconquer,
        currentcolumn: step.ARTIFACTS.currentcolumn
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
          owner: ARTIFACTS.takencolumn[MARKS.selecttarget]
            ? (ARTIFACTS.takencolumn[MARKS.selecttarget] || {}).owner
            : Boolean((ARTIFACTS.conquer[MARKS.selecttarget] || {}).by & 4)
            ? 2
            : Boolean((ARTIFACTS.oppconquer[MARKS.selecttarget] || {}).by & 4)
            ? 1
            : 0,
          lvl: 3,
          bit: 4,
          bottom: 7,
          below: 3,
          top: 28,
          above: 24
        };
      }
      if (Boolean((ARTIFACTS.conquer[MARKS.selecttarget] || {}).by & 4)) {
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
      } else {
        if (Boolean((ARTIFACTS.oppconquer[MARKS.selecttarget] || {}).by & 4)) {
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
          whoWins(
            Object.keys(ARTIFACTS.oppownedcolumns).length,
            Object.keys(ARTIFACTS.myownedcolumns).length
          )
        ];
        LINKS.endedBy = "columncount";
        LINKS.endMarks = Object.keys(
          [emptyObj, UNITLAYERS.myunits, UNITLAYERS.oppunits][
            whoWins(
              Object.keys(ARTIFACTS.myownedcolumns).length,
              Object.keys(ARTIFACTS.oppownedcolumns).length
            )
          ]
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
        sees: step.ARTIFACTS.sees,
        takencolumn: step.ARTIFACTS.takencolumn,
        mytakencolumn: step.ARTIFACTS.mytakencolumn,
        opptakencolumn: step.ARTIFACTS.opptakencolumn,
        neutraltakencolumn: step.ARTIFACTS.neutraltakencolumn,
        almost: step.ARTIFACTS.almost,
        conquer: step.ARTIFACTS.conquer,
        oppconquer: step.ARTIFACTS.oppconquer,
        currentcolumn: step.ARTIFACTS.currentcolumn
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
          owner: ARTIFACTS.takencolumn[MARKS.selecttarget]
            ? (ARTIFACTS.takencolumn[MARKS.selecttarget] || {}).owner
            : Boolean((ARTIFACTS.conquer[MARKS.selecttarget] || {}).by & 8)
            ? 2
            : Boolean((ARTIFACTS.oppconquer[MARKS.selecttarget] || {}).by & 8)
            ? 1
            : 0,
          lvl: 4,
          bit: 8,
          bottom: 15,
          below: 7,
          top: 24,
          above: 16
        };
      }
      if (Boolean((ARTIFACTS.conquer[MARKS.selecttarget] || {}).by & 8)) {
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
      } else {
        if (Boolean((ARTIFACTS.oppconquer[MARKS.selecttarget] || {}).by & 8)) {
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
          whoWins(
            Object.keys(ARTIFACTS.oppownedcolumns).length,
            Object.keys(ARTIFACTS.myownedcolumns).length
          )
        ];
        LINKS.endedBy = "columncount";
        LINKS.endMarks = Object.keys(
          [emptyObj, UNITLAYERS.myunits, UNITLAYERS.oppunits][
            whoWins(
              Object.keys(ARTIFACTS.myownedcolumns).length,
              Object.keys(ARTIFACTS.oppownedcolumns).length
            )
          ]
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
        sees: step.ARTIFACTS.sees,
        takencolumn: step.ARTIFACTS.takencolumn,
        mytakencolumn: step.ARTIFACTS.mytakencolumn,
        opptakencolumn: step.ARTIFACTS.opptakencolumn,
        neutraltakencolumn: step.ARTIFACTS.neutraltakencolumn,
        almost: step.ARTIFACTS.almost,
        conquer: step.ARTIFACTS.conquer,
        oppconquer: step.ARTIFACTS.oppconquer,
        currentcolumn: step.ARTIFACTS.currentcolumn
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
          owner: ARTIFACTS.takencolumn[MARKS.selecttarget]
            ? (ARTIFACTS.takencolumn[MARKS.selecttarget] || {}).owner
            : Boolean((ARTIFACTS.conquer[MARKS.selecttarget] || {}).by & 16)
            ? 2
            : Boolean((ARTIFACTS.oppconquer[MARKS.selecttarget] || {}).by & 16)
            ? 1
            : 0,
          lvl: 5,
          bit: 16,
          bottom: 31,
          below: 0,
          top: 16,
          above: 0
        };
      }
      if (Boolean((ARTIFACTS.conquer[MARKS.selecttarget] || {}).by & 16)) {
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
      } else {
        if (Boolean((ARTIFACTS.oppconquer[MARKS.selecttarget] || {}).by & 16)) {
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
          whoWins(
            Object.keys(ARTIFACTS.oppownedcolumns).length,
            Object.keys(ARTIFACTS.myownedcolumns).length
          )
        ];
        LINKS.endedBy = "columncount";
        LINKS.endMarks = Object.keys(
          [emptyObj, UNITLAYERS.myunits, UNITLAYERS.oppunits][
            whoWins(
              Object.keys(ARTIFACTS.myownedcolumns).length,
              Object.keys(ARTIFACTS.oppownedcolumns).length
            )
          ]
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
                            : Boolean(
                                (ARTIFACTS.conquer[MARKS.selecttarget] || {})
                                  .by & 1
                              )
                            ? 1
                            : Boolean(
                                (ARTIFACTS.oppconquer[MARKS.selecttarget] || {})
                                  .by & 1
                              )
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
                            : Boolean(
                                (ARTIFACTS.conquer[MARKS.selecttarget] || {})
                                  .by & 2
                              )
                            ? 1
                            : Boolean(
                                (ARTIFACTS.oppconquer[MARKS.selecttarget] || {})
                                  .by & 2
                              )
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
                            : Boolean(
                                (ARTIFACTS.conquer[MARKS.selecttarget] || {})
                                  .by & 4
                              )
                            ? 1
                            : Boolean(
                                (ARTIFACTS.oppconquer[MARKS.selecttarget] || {})
                                  .by & 4
                              )
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
                            : Boolean(
                                (ARTIFACTS.conquer[MARKS.selecttarget] || {})
                                  .by & 8
                              )
                            ? 1
                            : Boolean(
                                (ARTIFACTS.oppconquer[MARKS.selecttarget] || {})
                                  .by & 8
                              )
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
                            : Boolean(
                                (ARTIFACTS.conquer[MARKS.selecttarget] || {})
                                  .by & 16
                              )
                            ? 1
                            : Boolean(
                                (ARTIFACTS.oppconquer[MARKS.selecttarget] || {})
                                  .by & 16
                              )
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
                            : Boolean(
                                (ARTIFACTS.conquer[MARKS.selecttarget] || {})
                                  .by & 1
                              )
                            ? 2
                            : Boolean(
                                (ARTIFACTS.oppconquer[MARKS.selecttarget] || {})
                                  .by & 1
                              )
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
                            : Boolean(
                                (ARTIFACTS.conquer[MARKS.selecttarget] || {})
                                  .by & 2
                              )
                            ? 2
                            : Boolean(
                                (ARTIFACTS.oppconquer[MARKS.selecttarget] || {})
                                  .by & 2
                              )
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
                            : Boolean(
                                (ARTIFACTS.conquer[MARKS.selecttarget] || {})
                                  .by & 4
                              )
                            ? 2
                            : Boolean(
                                (ARTIFACTS.oppconquer[MARKS.selecttarget] || {})
                                  .by & 4
                              )
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
                            : Boolean(
                                (ARTIFACTS.conquer[MARKS.selecttarget] || {})
                                  .by & 8
                              )
                            ? 2
                            : Boolean(
                                (ARTIFACTS.oppconquer[MARKS.selecttarget] || {})
                                  .by & 8
                              )
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
                            : Boolean(
                                (ARTIFACTS.conquer[MARKS.selecttarget] || {})
                                  .by & 16
                              )
                            ? 2
                            : Boolean(
                                (ARTIFACTS.oppconquer[MARKS.selecttarget] || {})
                                  .by & 16
                              )
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
    }
  },
  variants,
  boards,
  setups
};
export default game;
