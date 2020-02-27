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
const iconMapping = { soldiers: "rook" };
const emptyArtifactLayers = { movetargets: {}, beingpushed: {}, squished: {} };
const connections = boardConnections({ height: 8, width: 8 });
const relativeDirs = makeRelativeDirs([]);
let TERRAIN1;
let TERRAIN2;
const groupLayers1 = {
  soldiers: [["units"], ["units", "myunits"], ["units", "oppunits"]]
};
const groupLayers2 = {
  soldiers: [["units"], ["units", "oppunits"], ["units", "myunits"]]
};
const game = {
  gameId: "aries",
  commands: { move: {} },
  iconMap: iconMapping,
  newBattle: setup => {
    let UNITDATA = setup2army(setup);
    let UNITLAYERS = { units: {}, myunits: {}, oppunits: {} };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers2[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    let terrain = { corner: { "1": ["a1"], "2": ["h8"] } };
    TERRAIN1 = terrainLayers(8, 8, terrain, 1);
    TERRAIN2 = terrainLayers(8, 8, terrain, 2);
    return game.action.startTurn1({
      BATTLEVARS: {},
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
        oppunits: oldUnitLayers.myunits
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
        BATTLEVARS: step.BATTLEVARS
      };
    },
    startTurn2: step => {
      const oldUnitLayers = step.UNITLAYERS;
      let UNITLAYERS = {
        units: oldUnitLayers.units,
        myunits: oldUnitLayers.oppunits,
        oppunits: oldUnitLayers.myunits
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
        BATTLEVARS: step.BATTLEVARS
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
      let BATTLEVARS = step.BATTLEVARS;
      let UNITLAYERS = step.UNITLAYERS;
      {
        let BLOCKS = UNITLAYERS.units;
        for (let DIR of orthoDirs) {
          let POS = MARKS.selectunit;
          while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
            ARTIFACTS.movetargets[POS] = emptyObj;
          }
          if (BLOCKS[POS]) {
            if (
              !(
                POS === BATTLEVARS["pushsquare"] &&
                (UNITLAYERS.units[MARKS.selectunit] || {}).id ===
                  BATTLEVARS["pusheeid"]
              ) &&
              UNITLAYERS.oppunits[POS]
            ) {
              ARTIFACTS.movetargets[POS] = { dir: DIR };
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
        BATTLEVARS
      };
    },
    selectmovetarget1: (step, newMarkPos) => {
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        beingpushed: {},
        squished: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: step.MARKS.selectunit,
        selectmovetarget: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      if (UNITLAYERS.oppunits[MARKS.selectmovetarget]) {
        {
          let allowedsteps = UNITLAYERS.oppunits;
          let BLOCKS = UNITLAYERS.myunits;
          let DIR =
            relativeDirs[1][
              (ARTIFACTS.movetargets[MARKS.selectmovetarget] || {}).dir
            ];
          let walkedsquares = [];
          let STOPREASON = "";
          let POS = "faux";
          connections.faux[DIR] = MARKS.selectmovetarget;
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
            ARTIFACTS.beingpushed[POS] = emptyObj;
          }
          let WALKLENGTH = walkedsquares.length;
          if (WALKLENGTH) {
            if (STOPREASON === "hitblock" || STOPREASON === "outofbounds") {
              ARTIFACTS.squished[walkedsquares[WALKLENGTH - 1]] = { dir: DIR };
            }
          }
        }
      }
      LINKS.commands.move = "move1";
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS,
        BATTLEVARS: step.BATTLEVARS,
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
      let BATTLEVARS = step.BATTLEVARS;
      let UNITLAYERS = step.UNITLAYERS;
      {
        let BLOCKS = UNITLAYERS.units;
        for (let DIR of orthoDirs) {
          let POS = MARKS.selectunit;
          while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
            ARTIFACTS.movetargets[POS] = emptyObj;
          }
          if (BLOCKS[POS]) {
            if (
              !(
                POS === BATTLEVARS["pushsquare"] &&
                (UNITLAYERS.units[MARKS.selectunit] || {}).id ===
                  BATTLEVARS["pusheeid"]
              ) &&
              UNITLAYERS.oppunits[POS]
            ) {
              ARTIFACTS.movetargets[POS] = { dir: DIR };
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
        BATTLEVARS
      };
    },
    selectmovetarget2: (step, newMarkPos) => {
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        beingpushed: {},
        squished: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: step.MARKS.selectunit,
        selectmovetarget: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      if (UNITLAYERS.oppunits[MARKS.selectmovetarget]) {
        {
          let allowedsteps = UNITLAYERS.oppunits;
          let BLOCKS = UNITLAYERS.myunits;
          let DIR =
            relativeDirs[1][
              (ARTIFACTS.movetargets[MARKS.selectmovetarget] || {}).dir
            ];
          let walkedsquares = [];
          let STOPREASON = "";
          let POS = "faux";
          connections.faux[DIR] = MARKS.selectmovetarget;
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
            ARTIFACTS.beingpushed[POS] = emptyObj;
          }
          let WALKLENGTH = walkedsquares.length;
          if (WALKLENGTH) {
            if (STOPREASON === "hitblock" || STOPREASON === "outofbounds") {
              ARTIFACTS.squished[walkedsquares[WALKLENGTH - 1]] = { dir: DIR };
            }
          }
        }
      }
      LINKS.commands.move = "move2";
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS,
        BATTLEVARS: step.BATTLEVARS,
        canAlwaysEnd: true
      };
    },
    move1: step => {
      let LINKS = { marks: {}, commands: {} };
      let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        beingpushed: step.ARTIFACTS.beingpushed,
        squished: step.ARTIFACTS.squished
      };
      let UNITLAYERS = step.UNITLAYERS;
      let BATTLEVARS = { ...step.BATTLEVARS };
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      {
        const LOOPSET = ARTIFACTS.squished;
        for (let LOOPPOS in LOOPSET) {
          anim.exitTo[LOOPPOS] = offsetPos(
            LOOPPOS,
            (LOOPSET[LOOPPOS] || {}).dir,
            1,
            0
          );
        }
      }
      BATTLEVARS.pusheeid = (UNITLAYERS.units[MARKS.selectmovetarget] || {}).id;
      BATTLEVARS.pushsquare = MARKS.selectmovetarget;
      for (let LOOPPOS in ARTIFACTS.beingpushed) {
        {
          let unitid = (UNITLAYERS.units[LOOPPOS] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              pos: offsetPos(
                LOOPPOS,
                (ARTIFACTS.movetargets[MARKS.selectmovetarget] || {}).dir,
                1,
                0,
                dimensions
              )
            };
          }
        }
      }
      for (let LOOPPOS in ARTIFACTS.squished) {
        delete UNITDATA[(UNITLAYERS.units[LOOPPOS] || {}).id];
      }
      {
        let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: MARKS.selectmovetarget
          };
        }
      }
      UNITLAYERS = { units: {}, myunits: {}, oppunits: {} };
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
            Object.keys(TERRAIN1.oppcorner)
              .concat(Object.keys(UNITLAYERS.myunits))
              .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
          )
            .filter(([key, n]) => n === 2)
            .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
        ).length !== 0
      ) {
        LINKS.endGame = "win";
        LINKS.endedBy = "invade";
        LINKS.endMarks = Object.keys(
          Object.entries(
            Object.keys(TERRAIN1.oppcorner)
              .concat(Object.keys(UNITLAYERS.myunits))
              .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
          )
            .filter(([key, n]) => n === 2)
            .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
        );
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
        BATTLEVARS,
        anim
      };
    },
    move2: step => {
      let LINKS = { marks: {}, commands: {} };
      let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        beingpushed: step.ARTIFACTS.beingpushed,
        squished: step.ARTIFACTS.squished
      };
      let UNITLAYERS = step.UNITLAYERS;
      let BATTLEVARS = { ...step.BATTLEVARS };
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      {
        const LOOPSET = ARTIFACTS.squished;
        for (let LOOPPOS in LOOPSET) {
          anim.exitTo[LOOPPOS] = offsetPos(
            LOOPPOS,
            (LOOPSET[LOOPPOS] || {}).dir,
            1,
            0
          );
        }
      }
      BATTLEVARS.pusheeid = (UNITLAYERS.units[MARKS.selectmovetarget] || {}).id;
      BATTLEVARS.pushsquare = MARKS.selectmovetarget;
      for (let LOOPPOS in ARTIFACTS.beingpushed) {
        {
          let unitid = (UNITLAYERS.units[LOOPPOS] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              pos: offsetPos(
                LOOPPOS,
                (ARTIFACTS.movetargets[MARKS.selectmovetarget] || {}).dir,
                1,
                0,
                dimensions
              )
            };
          }
        }
      }
      for (let LOOPPOS in ARTIFACTS.squished) {
        delete UNITDATA[(UNITLAYERS.units[LOOPPOS] || {}).id];
      }
      {
        let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: MARKS.selectmovetarget
          };
        }
      }
      UNITLAYERS = { units: {}, myunits: {}, oppunits: {} };
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
            Object.keys(TERRAIN2.oppcorner)
              .concat(Object.keys(UNITLAYERS.myunits))
              .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
          )
            .filter(([key, n]) => n === 2)
            .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
        ).length !== 0
      ) {
        LINKS.endGame = "win";
        LINKS.endedBy = "invade";
        LINKS.endMarks = Object.keys(
          Object.entries(
            Object.keys(TERRAIN2.oppcorner)
              .concat(Object.keys(UNITLAYERS.myunits))
              .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
          )
            .filter(([key, n]) => n === 2)
            .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
        );
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
        BATTLEVARS,
        anim
      };
    }
  },
  instruction: {
    startTurn1: step => {
      return collapseContent({
        line: [
          { select: "Select" },
          { unittype: ["rook", 1] },
          { text: "to move" }
        ]
      });
    },
    move1: () => defaultInstruction(1),
    selectunit1: step => {
      let BATTLEVARS = step.BATTLEVARS;
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { select: "Select" },
          { text: "where to move" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
              MARKS.selectunit
            ]
          },
          (UNITLAYERS.units[MARKS.selectunit] || {}).id ===
          BATTLEVARS["pusheeid"]
            ? collapseContent({
                line: [
                  { text: "(but you can't push back at" },
                  {
                    unit: [
                      iconMapping[
                        (UNITLAYERS.units[BATTLEVARS["pushsquare"]] || {}).group
                      ],
                      (UNITLAYERS.units[BATTLEVARS["pushsquare"]] || {}).owner,
                      BATTLEVARS["pushsquare"]
                    ]
                  },
                  { text: "this turn)" }
                ]
              })
            : undefined
        ]
      });
    },
    selectmovetarget1: step => {
      let ARTIFACTS = step.ARTIFACTS;
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "move" },
          { text: "to move" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
              MARKS.selectunit
            ]
          },
          { text: "to" },
          { pos: MARKS.selectmovetarget },
          Object.keys(ARTIFACTS.squished).length !== 0
            ? collapseContent({
                line: [
                  { text: "and squash" },
                  {
                    unit: [
                      iconMapping[
                        (
                          UNITLAYERS.units[
                            Object.keys(ARTIFACTS.squished)[0]
                          ] || {}
                        ).group
                      ],
                      (
                        UNITLAYERS.units[Object.keys(ARTIFACTS.squished)[0]] ||
                        {}
                      ).owner,
                      Object.keys(ARTIFACTS.squished)[0]
                    ]
                  }
                ]
              })
            : undefined
        ]
      });
    },
    startTurn2: step => {
      return collapseContent({
        line: [
          { select: "Select" },
          { unittype: ["rook", 2] },
          { text: "to move" }
        ]
      });
    },
    move2: () => defaultInstruction(2),
    selectunit2: step => {
      let BATTLEVARS = step.BATTLEVARS;
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { select: "Select" },
          { text: "where to move" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
              MARKS.selectunit
            ]
          },
          (UNITLAYERS.units[MARKS.selectunit] || {}).id ===
          BATTLEVARS["pusheeid"]
            ? collapseContent({
                line: [
                  { text: "(but you can't push back at" },
                  {
                    unit: [
                      iconMapping[
                        (UNITLAYERS.units[BATTLEVARS["pushsquare"]] || {}).group
                      ],
                      (UNITLAYERS.units[BATTLEVARS["pushsquare"]] || {}).owner,
                      BATTLEVARS["pushsquare"]
                    ]
                  },
                  { text: "this turn)" }
                ]
              })
            : undefined
        ]
      });
    },
    selectmovetarget2: step => {
      let ARTIFACTS = step.ARTIFACTS;
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "move" },
          { text: "to move" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
              MARKS.selectunit
            ]
          },
          { text: "to" },
          { pos: MARKS.selectmovetarget },
          Object.keys(ARTIFACTS.squished).length !== 0
            ? collapseContent({
                line: [
                  { text: "and squash" },
                  {
                    unit: [
                      iconMapping[
                        (
                          UNITLAYERS.units[
                            Object.keys(ARTIFACTS.squished)[0]
                          ] || {}
                        ).group
                      ],
                      (
                        UNITLAYERS.units[Object.keys(ARTIFACTS.squished)[0]] ||
                        {}
                      ).owner,
                      Object.keys(ARTIFACTS.squished)[0]
                    ]
                  }
                ]
              })
            : undefined
        ]
      });
    }
  }
};
export default game;
