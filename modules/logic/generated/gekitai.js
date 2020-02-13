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
const BOARD = boardLayers({ height: 6, width: 6 });
const iconMapping = { markers: "pawn" };
const emptyArtifactLayers = { death: {}, push: {} };
const connections = boardConnections({ height: 6, width: 6 });
const relativeDirs = makeRelativeDirs([]);
const TERRAIN = terrainLayers(6, 6, {});
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
  gameId: "gekitai",
  action: {},
  instruction: {},
  commands: { drop: {} },
  iconMap: { markers: "pawn" }
};
{
  const groupLayers = {
    markers: [["units"], ["units", "myunits"], ["units", "oppunits"]]
  };
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
    for (const pos of Object.keys(
      Object.keys(BOARD.board)
        .filter(k => !UNITLAYERS.units.hasOwnProperty(k))
        .reduce((m, k) => ({ ...m, [k]: emptyObj }), {})
    )) {
      LINKS.marks[pos] = "selectdroptarget1";
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
  };
  game.instruction.startTurn1 = step => {
    return collapseContent({ line: [{ text: "Select where to drop a unit" }] });
  };
  game.action.drop1 = step => {
    let LINKS = { marks: {}, commands: {} };
    let ARTIFACTS = {
      death: step.ARTIFACTS.death,
      push: step.ARTIFACTS.push
    };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let NEXTSPAWNID = step.NEXTSPAWNID;
    let MARKS = step.MARKS;
    {
      let newunitid = "spawn" + NEXTSPAWNID++;
      UNITDATA[newunitid] = {
        pos: MARKS.selectdroptarget,
        id: newunitid,
        group: "markers",
        owner: 1
      };
    }
    for (let LOOPPOS in ARTIFACTS.death) {
      delete UNITDATA[(UNITLAYERS.units[LOOPPOS] || {}).id];
    }
    {
      const LOOPSET = ARTIFACTS.push;
      for (let LOOPPOS in LOOPSET) {
        {
          let unitid = (UNITLAYERS.units[LOOPPOS] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              pos: offsetPos(LOOPPOS, (LOOPSET[LOOPPOS] || {}).pushdir, 1, 0, {
                height: 6,
                width: 6
              })
            };
          }
        }
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
    if (Object.keys(UNITLAYERS.myunits).length === 8) {
      LINKS.endGame = "win";
      LINKS.endedBy = "allout";
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
      NEXTSPAWNID
    };
  };
  game.instruction.drop1 = () => defaultInstruction(1);
  game.action.selectdroptarget1 = (step, newMarkPos) => {
    let ARTIFACTS = {
      death: {},
      push: {}
    };
    let LINKS = { marks: {}, commands: {} };
    let MARKS = {
      selectdroptarget: newMarkPos
    };
    let UNITLAYERS = step.UNITLAYERS;
    {
      let allowedsteps = UNITLAYERS.units;
      for (let DIR of roseDirs) {
        let walkedsquares = [];
        let STOPREASON = "";
        let MAX = 1;
        let POS = MARKS.selectdroptarget;
        let LENGTH = 0;
        while (
          !(STOPREASON = !(POS = connections[POS][DIR])
            ? "outofbounds"
            : !allowedsteps[POS]
            ? "nomoresteps"
            : LENGTH === MAX
            ? "reachedmax"
            : null)
        ) {
          walkedsquares.push(POS);
          LENGTH++;
        }
        let WALKLENGTH = walkedsquares.length;
        if (WALKLENGTH) {
          {
            if (STOPREASON === "outofbounds") {
              ARTIFACTS.death[walkedsquares[WALKLENGTH - 1]] = emptyObj;
            }
          }
          {
            if (STOPREASON === "nomoresteps") {
              ARTIFACTS.push[walkedsquares[WALKLENGTH - 1]] = { pushdir: DIR };
            }
          }
        }
      }
    }
    LINKS.commands.drop = "drop1";
    return {
      LINKS,
      ARTIFACTS,
      UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS,
      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.selectdroptarget1 = step => {
    let MARKS = step.MARKS;
    return collapseContent({
      line: [
        { text: "Press" },
        { command: "drop" },
        { text: "to drop a" },
        { unittype: ["pawn", 1] },
        { text: "at" },
        { pos: MARKS.selectdroptarget }
      ]
    });
  };
}
{
  const groupLayers = {
    markers: [["units"], ["units", "oppunits"], ["units", "myunits"]]
  };
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
    for (const pos of Object.keys(
      Object.keys(BOARD.board)
        .filter(k => !UNITLAYERS.units.hasOwnProperty(k))
        .reduce((m, k) => ({ ...m, [k]: emptyObj }), {})
    )) {
      LINKS.marks[pos] = "selectdroptarget2";
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
  };
  game.instruction.startTurn2 = step => {
    return collapseContent({ line: [{ text: "Select where to drop a unit" }] });
  };
  game.newBattle = () => {
    return game.action.startTurn1({
      NEXTSPAWNID: 1,
      TURN: 0,
      UNITDATA: {},
      UNITLAYERS: { units: {}, myunits: {}, oppunits: {} }
    });
  };
  game.action.drop2 = step => {
    let LINKS = { marks: {}, commands: {} };
    let ARTIFACTS = {
      death: step.ARTIFACTS.death,
      push: step.ARTIFACTS.push
    };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let NEXTSPAWNID = step.NEXTSPAWNID;
    let MARKS = step.MARKS;
    {
      let newunitid = "spawn" + NEXTSPAWNID++;
      UNITDATA[newunitid] = {
        pos: MARKS.selectdroptarget,
        id: newunitid,
        group: "markers",
        owner: 2
      };
    }
    for (let LOOPPOS in ARTIFACTS.death) {
      delete UNITDATA[(UNITLAYERS.units[LOOPPOS] || {}).id];
    }
    {
      const LOOPSET = ARTIFACTS.push;
      for (let LOOPPOS in LOOPSET) {
        {
          let unitid = (UNITLAYERS.units[LOOPPOS] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              pos: offsetPos(LOOPPOS, (LOOPSET[LOOPPOS] || {}).pushdir, 1, 0, {
                height: 6,
                width: 6
              })
            };
          }
        }
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
    if (Object.keys(UNITLAYERS.myunits).length === 8) {
      LINKS.endGame = "win";
      LINKS.endedBy = "allout";
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
      NEXTSPAWNID
    };
  };
  game.instruction.drop2 = () => defaultInstruction(2);
  game.action.selectdroptarget2 = (step, newMarkPos) => {
    let ARTIFACTS = {
      death: {},
      push: {}
    };
    let LINKS = { marks: {}, commands: {} };
    let MARKS = {
      selectdroptarget: newMarkPos
    };
    let UNITLAYERS = step.UNITLAYERS;
    {
      let allowedsteps = UNITLAYERS.units;
      for (let DIR of roseDirs) {
        let walkedsquares = [];
        let STOPREASON = "";
        let MAX = 1;
        let POS = MARKS.selectdroptarget;
        let LENGTH = 0;
        while (
          !(STOPREASON = !(POS = connections[POS][DIR])
            ? "outofbounds"
            : !allowedsteps[POS]
            ? "nomoresteps"
            : LENGTH === MAX
            ? "reachedmax"
            : null)
        ) {
          walkedsquares.push(POS);
          LENGTH++;
        }
        let WALKLENGTH = walkedsquares.length;
        if (WALKLENGTH) {
          {
            if (STOPREASON === "outofbounds") {
              ARTIFACTS.death[walkedsquares[WALKLENGTH - 1]] = emptyObj;
            }
          }
          {
            if (STOPREASON === "nomoresteps") {
              ARTIFACTS.push[walkedsquares[WALKLENGTH - 1]] = { pushdir: DIR };
            }
          }
        }
      }
    }
    LINKS.commands.drop = "drop2";
    return {
      LINKS,
      ARTIFACTS,
      UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS,
      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.selectdroptarget2 = step => {
    let MARKS = step.MARKS;
    return collapseContent({
      line: [
        { text: "Press" },
        { command: "drop" },
        { text: "to drop a" },
        { unittype: ["pawn", 2] },
        { text: "at" },
        { pos: MARKS.selectdroptarget }
      ]
    });
  };
}
export default game;
