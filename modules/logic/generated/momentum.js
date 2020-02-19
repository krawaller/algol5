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
const dimensions = { height: 7, width: 7 };
const BOARD = boardLayers(dimensions);
const iconMapping = { stones: "pawn" };
const emptyArtifactLayers = { doomed: {}, pushed: {} };
const connections = boardConnections({ height: 7, width: 7 });
const relativeDirs = makeRelativeDirs([]);
const TERRAIN = terrainLayers(7, 7, {});
let game = {
  gameId: "momentum",
  action: {},
  instruction: {},
  commands: { drop: {} },
  iconMap: { stones: "pawn" }
};
{
  const groupLayers = {
    stones: [["units"], ["units", "myunits"], ["units", "oppunits"]]
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
    let UNITLAYERS = step.UNITLAYERS;
    return collapseContent({
      line: [
        { text: "Select where to drop" },
        Object.keys(UNITLAYERS.myunits).length === 7
          ? collapseContent({ line: [{ text: "your last remaining unit" }] })
          : collapseContent({
              line: [
                { text: "one of your" },
                { text: Object.keys(UNITLAYERS.myunits).length },
                { text: "remaining units" }
              ]
            })
      ]
    });
  };
  game.action.drop1 = step => {
    let LINKS = { marks: {}, commands: {} };
    let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
    let ARTIFACTS = {
      doomed: step.ARTIFACTS.doomed,
      pushed: step.ARTIFACTS.pushed
    };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let NEXTSPAWNID = step.NEXTSPAWNID;
    let MARKS = step.MARKS;
    {
      const LOOPSET = ARTIFACTS.doomed;
      for (let LOOPPOS in LOOPSET) {
        anim.exitTo[LOOPPOS] = offsetPos(
          LOOPPOS,
          (LOOPSET[LOOPPOS] || {}).pushdir,
          1,
          0
        );
      }
    }
    {
      let newunitid = "spawn" + NEXTSPAWNID++;
      UNITDATA[newunitid] = {
        pos: MARKS.selectdroptarget,
        id: newunitid,
        group: "stones",
        owner: 1
      };
    }
    for (let LOOPPOS in ARTIFACTS.doomed) {
      delete UNITDATA[(UNITLAYERS.units[LOOPPOS] || {}).id];
    }
    {
      const LOOPSET = ARTIFACTS.pushed;
      for (let LOOPPOS in LOOPSET) {
        {
          let unitid = (UNITLAYERS.units[LOOPPOS] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              pos: offsetPos(
                LOOPPOS,
                (LOOPSET[LOOPPOS] || {}).pushdir,
                1,
                0,
                dimensions
              )
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
      NEXTSPAWNID,
      anim
    };
  };
  game.instruction.drop1 = () => defaultInstruction(1);
  game.action.selectdroptarget1 = (step, newMarkPos) => {
    let ARTIFACTS = {
      doomed: {},
      pushed: {}
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
        let POS = MARKS.selectdroptarget;
        while (
          !(STOPREASON = !(POS = connections[POS][DIR])
            ? "outofbounds"
            : !allowedsteps[POS]
            ? "nomoresteps"
            : null)
        ) {
          walkedsquares.push(POS);
        }
        let WALKLENGTH = walkedsquares.length;
        if (WALKLENGTH) {
          {
            if (STOPREASON === "outofbounds") {
              ARTIFACTS.doomed[walkedsquares[WALKLENGTH - 1]] = {
                pushdir: DIR
              };
            }
          }
          {
            if (STOPREASON === "nomoresteps") {
              ARTIFACTS.pushed[walkedsquares[WALKLENGTH - 1]] = {
                pushdir: DIR
              };
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
        { text: "to spawn a unit at" },
        { pos: MARKS.selectdroptarget }
      ]
    });
  };
}
{
  const groupLayers = {
    stones: [["units"], ["units", "oppunits"], ["units", "myunits"]]
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
    let UNITLAYERS = step.UNITLAYERS;
    return collapseContent({
      line: [
        { text: "Select where to drop" },
        Object.keys(UNITLAYERS.myunits).length === 7
          ? collapseContent({ line: [{ text: "your last remaining unit" }] })
          : collapseContent({
              line: [
                { text: "one of your" },
                { text: Object.keys(UNITLAYERS.myunits).length },
                { text: "remaining units" }
              ]
            })
      ]
    });
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
    let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
    let ARTIFACTS = {
      doomed: step.ARTIFACTS.doomed,
      pushed: step.ARTIFACTS.pushed
    };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let NEXTSPAWNID = step.NEXTSPAWNID;
    let MARKS = step.MARKS;
    {
      const LOOPSET = ARTIFACTS.doomed;
      for (let LOOPPOS in LOOPSET) {
        anim.exitTo[LOOPPOS] = offsetPos(
          LOOPPOS,
          (LOOPSET[LOOPPOS] || {}).pushdir,
          1,
          0
        );
      }
    }
    {
      let newunitid = "spawn" + NEXTSPAWNID++;
      UNITDATA[newunitid] = {
        pos: MARKS.selectdroptarget,
        id: newunitid,
        group: "stones",
        owner: 2
      };
    }
    for (let LOOPPOS in ARTIFACTS.doomed) {
      delete UNITDATA[(UNITLAYERS.units[LOOPPOS] || {}).id];
    }
    {
      const LOOPSET = ARTIFACTS.pushed;
      for (let LOOPPOS in LOOPSET) {
        {
          let unitid = (UNITLAYERS.units[LOOPPOS] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              pos: offsetPos(
                LOOPPOS,
                (LOOPSET[LOOPPOS] || {}).pushdir,
                1,
                0,
                dimensions
              )
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
      NEXTSPAWNID,
      anim
    };
  };
  game.instruction.drop2 = () => defaultInstruction(2);
  game.action.selectdroptarget2 = (step, newMarkPos) => {
    let ARTIFACTS = {
      doomed: {},
      pushed: {}
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
        let POS = MARKS.selectdroptarget;
        while (
          !(STOPREASON = !(POS = connections[POS][DIR])
            ? "outofbounds"
            : !allowedsteps[POS]
            ? "nomoresteps"
            : null)
        ) {
          walkedsquares.push(POS);
        }
        let WALKLENGTH = walkedsquares.length;
        if (WALKLENGTH) {
          {
            if (STOPREASON === "outofbounds") {
              ARTIFACTS.doomed[walkedsquares[WALKLENGTH - 1]] = {
                pushdir: DIR
              };
            }
          }
          {
            if (STOPREASON === "nomoresteps") {
              ARTIFACTS.pushed[walkedsquares[WALKLENGTH - 1]] = {
                pushdir: DIR
              };
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
        { text: "to spawn a unit at" },
        { pos: MARKS.selectdroptarget }
      ]
    });
  };
}
export default game;
