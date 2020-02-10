import {
  offsetPos,
  boardConnections,
  makeRelativeDirs,
  setup2army,
  boardLayers,
  terrainLayers,
  collapseContent,
  defaultInstruction
} from "../../common";
const emptyObj = {};
const BOARD = boardLayers({ height: 8, width: 8 });
const iconMapping = { soldiers: "rook" };
const emptyArtifactLayers = { movetargets: {}, beingpushed: {}, squished: {} };
const connections = boardConnections({ height: 8, width: 8 });
const relativeDirs = makeRelativeDirs([]);
const roseDirs = [1, 2, 3, 4, 5, 6, 7, 8];
const orthoDirs = [1, 3, 5, 7];
const diagDirs = [2, 4, 6, 8];
const knightDirs = [
  "d1f2r1",
  "d1f2r-1",
  "d3f2r1",
  "d3f2r-1",
  "d5f2r1",
  "d5f2r-1",
  "d7f2r1",
  "d7f2r-1"
];
let game = {
  gameId: "aries",
  action: {},
  instruction: {},
  commands: { move: {} },
  iconMap: { soldiers: "rook" }
};
{
  const groupLayers = {
    soldiers: [["units"], ["units", "myunits"], ["units", "oppunits"]]
  };
  const TERRAIN = terrainLayers(
    8,
    8,
    { corner: { "1": ["a1"], "2": ["h8"] } },
    1
  );
  game.action.startTurn1 = step => {
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
  };
  game.instruction.startTurn1 = step => {
    return collapseContent({
      line: [
        { select: "Select" },
        { unittype: ["rook", 1] },
        { text: "to move" }
      ]
    });
  };
  game.action.move1 = step => {
    let LINKS = { marks: {}, commands: {} };
    let ARTIFACTS = {
      movetargets: step.ARTIFACTS.movetargets,
      beingpushed: step.ARTIFACTS.beingpushed,
      squished: step.ARTIFACTS.squished
    };
    let UNITLAYERS = step.UNITLAYERS;
    let BATTLEVARS = { ...step.BATTLEVARS };
    let UNITDATA = { ...step.UNITDATA };
    let MARKS = step.MARKS;
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
              { height: 8, width: 8 }
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
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    if (
      Object.keys(
        Object.entries(
          Object.keys(TERRAIN.oppcorner)
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
          Object.keys(TERRAIN.oppcorner)
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
      BATTLEVARS
    };
  };
  game.instruction.move1 = () => defaultInstruction(1);
  game.action.selectunit1 = (step, newMarkPos) => {
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
  };
  game.instruction.selectunit1 = step => {
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
        (UNITLAYERS.units[MARKS.selectunit] || {}).id === BATTLEVARS["pusheeid"]
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
  };
  game.action.selectmovetarget1 = (step, newMarkPos) => {
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
        let walkedsquares = [];
        let STOPREASON = "";
        let POS = "faux";
        connections.faux[
          relativeDirs[1][
            (ARTIFACTS.movetargets[MARKS.selectmovetarget] || {}).dir
          ]
        ] = MARKS.selectmovetarget;
        while (
          !(STOPREASON = !(POS =
            connections[POS][
              relativeDirs[1][
                (ARTIFACTS.movetargets[MARKS.selectmovetarget] || {}).dir
              ]
            ])
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
            ARTIFACTS.squished[walkedsquares[WALKLENGTH - 1]] = emptyObj;
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
  };
  game.instruction.selectmovetarget1 = step => {
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
                        UNITLAYERS.units[Object.keys(ARTIFACTS.squished)[0]] ||
                        {}
                      ).group
                    ],
                    (UNITLAYERS.units[Object.keys(ARTIFACTS.squished)[0]] || {})
                      .owner,
                    Object.keys(ARTIFACTS.squished)[0]
                  ]
                }
              ]
            })
          : undefined
      ]
    });
  };
}
{
  const groupLayers = {
    soldiers: [["units"], ["units", "oppunits"], ["units", "myunits"]]
  };
  const TERRAIN = terrainLayers(
    8,
    8,
    { corner: { "1": ["a1"], "2": ["h8"] } },
    2
  );
  game.action.startTurn2 = step => {
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
  };
  game.instruction.startTurn2 = step => {
    return collapseContent({
      line: [
        { select: "Select" },
        { unittype: ["rook", 2] },
        { text: "to move" }
      ]
    });
  };
  game.newBattle = () => {
    let UNITDATA = setup2army({
      soldiers: { "1": [{ rect: ["a1", "d4"] }], "2": [{ rect: ["e5", "h8"] }] }
    });
    let UNITLAYERS = { units: {}, myunits: {}, oppunits: {} };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    return game.action.startTurn1({
      BATTLEVARS: {},
      TURN: 0,
      UNITDATA,
      UNITLAYERS
    });
  };
  game.action.move2 = step => {
    let LINKS = { marks: {}, commands: {} };
    let ARTIFACTS = {
      movetargets: step.ARTIFACTS.movetargets,
      beingpushed: step.ARTIFACTS.beingpushed,
      squished: step.ARTIFACTS.squished
    };
    let UNITLAYERS = step.UNITLAYERS;
    let BATTLEVARS = { ...step.BATTLEVARS };
    let UNITDATA = { ...step.UNITDATA };
    let MARKS = step.MARKS;
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
              { height: 8, width: 8 }
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
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    if (
      Object.keys(
        Object.entries(
          Object.keys(TERRAIN.oppcorner)
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
          Object.keys(TERRAIN.oppcorner)
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
      BATTLEVARS
    };
  };
  game.instruction.move2 = () => defaultInstruction(2);
  game.action.selectunit2 = (step, newMarkPos) => {
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
  };
  game.instruction.selectunit2 = step => {
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
        (UNITLAYERS.units[MARKS.selectunit] || {}).id === BATTLEVARS["pusheeid"]
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
  };
  game.action.selectmovetarget2 = (step, newMarkPos) => {
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
        let walkedsquares = [];
        let STOPREASON = "";
        let POS = "faux";
        connections.faux[
          relativeDirs[1][
            (ARTIFACTS.movetargets[MARKS.selectmovetarget] || {}).dir
          ]
        ] = MARKS.selectmovetarget;
        while (
          !(STOPREASON = !(POS =
            connections[POS][
              relativeDirs[1][
                (ARTIFACTS.movetargets[MARKS.selectmovetarget] || {}).dir
              ]
            ])
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
            ARTIFACTS.squished[walkedsquares[WALKLENGTH - 1]] = emptyObj;
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
  };
  game.instruction.selectmovetarget2 = step => {
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
                        UNITLAYERS.units[Object.keys(ARTIFACTS.squished)[0]] ||
                        {}
                      ).group
                    ],
                    (UNITLAYERS.units[Object.keys(ARTIFACTS.squished)[0]] || {})
                      .owner,
                    Object.keys(ARTIFACTS.squished)[0]
                  ]
                }
              ]
            })
          : undefined
      ]
    });
  };
}
export default game;
