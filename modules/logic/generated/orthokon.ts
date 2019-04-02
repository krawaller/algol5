const {
  offsetPos,
  boardConnections,
  makeRelativeDirs,
  deduceInitialUnitData,
  boardLayers
} = require("/Users/davidwaller/gitreps/algol5/modules/common");

const BOARD = boardLayers({ height: 4, width: 4 });

const emptyArtifactLayers = { victims: {}, movetargets: {} };

const connections = boardConnections({ height: 4, width: 4 });
const relativeDirs = makeRelativeDirs();
const TERRAIN = {};
const roseDirs = [1, 2, 3, 4, 5, 6, 7, 8];
const orthoDirs = [1, 3, 5, 7];
const diagDirs = [2, 4, 6, 8];
let game: any = {};
type Links = {
  endturn?: "win" | "lose" | "draw" | "start1" | "start2";
  endMarks?: string[];
  endedBy?: "starvation";
  commands: {
    move?: "move1" | "move2";
  };
  marks: {
    selectunit?: { func: "selectunit1" | "selectunit2"; pos: string[] };
    selectmovetarget?: {
      func: "selectmovetarget1" | "selectmovetarget2";
      pos: string[];
    };
  };
};
{
  const ownerNames = ["neutral", "my", "opp"];
  game.start1 = step => {
    const oldUnitLayers = step.UNITLAYERS;
    let UNITLAYERS = {
      units: oldUnitLayers.units,
      myunits: oldUnitLayers.oppunits,
      oppunits: oldUnitLayers.myunits,
      neutralunits: oldUnitLayers.neutralunits,
      soldiers: oldUnitLayers.soldiers,
      mysoldiers: oldUnitLayers.oppsoldiers,
      oppsoldiers: oldUnitLayers.mysoldiers,
      neutralsoldiers: oldUnitLayers.neutralsoldiers
    };
    let LINKS: Links = {
      commands: {},
      marks: {}
    };

    LINKS.marks.selectunit = {
      func: "selectunit1",
      pos: Object.keys(UNITLAYERS.myunits)
    };

    return {
      UNITDATA: step.UNITDATA,
      LINKS,
      name: "start",
      path: [],
      UNITLAYERS,
      ARTIFACTS: emptyArtifactLayers,
      MARKS: {},
      TURN: step.TURN + 1
    };
  };
  game.move1 = step => {
    let LINKS: Links = { commands: {}, marks: {} };
    let ARTIFACTS = {
      victims: step.ARTIFACTS.victims,
      movetargets: step.ARTIFACTS.movetargets
    };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
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
    for (let LOOPPOS in ARTIFACTS.victims) {
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
    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {},
      soldiers: {},
      mysoldiers: {},
      oppsoldiers: {},
      neutralsoldiers: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      const ownerPrefix = ownerNames[owner];
      UNITLAYERS.units[pos] = UNITLAYERS[group][pos] = UNITLAYERS[
        ownerPrefix + group
      ][pos] = UNITLAYERS[ownerPrefix + "units"][pos] = currentunit;
    }
    {
      LINKS.endturn = "start2";
    }
    return {
      LINKS,
      path: step.path.concat("move"),
      MARKS: {},
      ARTIFACTS,
      TURN: step.TURN,
      UNITDATA,
      UNITLAYERS
    };
  };
  game.selectunit1 = (step, newMarkPos) => {
    let ARTIFACTS = {
      victims: step.ARTIFACTS.victims,
      movetargets: { ...step.ARTIFACTS.movetargets }
    };
    let LINKS: Links = { commands: {}, marks: {} };
    let MARKS = { ...step.MARKS, selectunit: newMarkPos };
    let UNITLAYERS = step.UNITLAYERS;
    {
      let BLOCKS = UNITLAYERS.units;

      for (let DIR of roseDirs) {
        let walkedsquares = [];
        let POS = MARKS.selectunit;
        while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
          walkedsquares.push(POS);
        }
        let WALKLENGTH = walkedsquares.length;
        if (WALKLENGTH) {
          ARTIFACTS.movetargets[walkedsquares[WALKLENGTH - 1]] = {};
        }
      }
    }
    LINKS.marks.selectmovetarget = {
      func: "selectmovetarget1",
      pos: Object.keys(ARTIFACTS.movetargets)
    };

    return {
      LINKS,
      path: step.path.concat(newMarkPos),
      name: "selectunit",
      ARTIFACTS,
      UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS
    };
  };
  game.selectmovetarget1 = (step, newMarkPos) => {
    let ARTIFACTS = {
      victims: { ...step.ARTIFACTS.victims },
      movetargets: step.ARTIFACTS.movetargets
    };
    let LINKS: Links = { commands: {}, marks: {} };
    let MARKS = { ...step.MARKS, selectmovetarget: newMarkPos };
    let UNITLAYERS = step.UNITLAYERS;
    {
      let startconnections = connections[MARKS.selectmovetarget];
      for (let DIR of orthoDirs) {
        let POS = startconnections[DIR];
        if (POS && UNITLAYERS.oppunits[POS]) {
          ARTIFACTS.victims[POS] = {};
        }
      }
    }
    LINKS.commands.move = "move1";

    return {
      LINKS,
      path: step.path.concat(newMarkPos),
      name: "selectmovetarget",
      ARTIFACTS,
      UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS
    };
  };
}
{
  const ownerNames = ["neutral", "opp", "my"];
  game.start2 = step => {
    const oldUnitLayers = step.UNITLAYERS;
    let UNITLAYERS = {
      units: oldUnitLayers.units,
      myunits: oldUnitLayers.oppunits,
      oppunits: oldUnitLayers.myunits,
      neutralunits: oldUnitLayers.neutralunits,
      soldiers: oldUnitLayers.soldiers,
      mysoldiers: oldUnitLayers.oppsoldiers,
      oppsoldiers: oldUnitLayers.mysoldiers,
      neutralsoldiers: oldUnitLayers.neutralsoldiers
    };
    let LINKS: Links = {
      commands: {},
      marks: {}
    };

    LINKS.marks.selectunit = {
      func: "selectunit2",
      pos: Object.keys(UNITLAYERS.myunits)
    };

    return {
      UNITDATA: step.UNITDATA,
      LINKS,
      name: "start",
      path: [],
      UNITLAYERS,
      ARTIFACTS: emptyArtifactLayers,
      MARKS: {},
      TURN: step.TURN + 1
    };
  };
  game.newBattle = () => {
    let UNITDATA = {
      unit1: {
        pos: "a1",
        x: 1,
        y: 1,
        id: "unit1",
        group: "soldiers",
        owner: 1
      },
      unit2: {
        pos: "b1",
        x: 2,
        y: 1,
        id: "unit2",
        group: "soldiers",
        owner: 1
      },
      unit3: {
        pos: "c1",
        x: 3,
        y: 1,
        id: "unit3",
        group: "soldiers",
        owner: 1
      },
      unit4: {
        pos: "d1",
        x: 4,
        y: 1,
        id: "unit4",
        group: "soldiers",
        owner: 1
      },
      unit5: {
        pos: "a4",
        x: 1,
        y: 4,
        id: "unit5",
        group: "soldiers",
        owner: 2
      },
      unit6: {
        pos: "b4",
        x: 2,
        y: 4,
        id: "unit6",
        group: "soldiers",
        owner: 2
      },
      unit7: {
        pos: "c4",
        x: 3,
        y: 4,
        id: "unit7",
        group: "soldiers",
        owner: 2
      },
      unit8: { pos: "d4", x: 4, y: 4, id: "unit8", group: "soldiers", owner: 2 }
    };

    let UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {},
      soldiers: {},
      mysoldiers: {},
      oppsoldiers: {},
      neutralsoldiers: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      const ownerPrefix = ownerNames[owner];
      UNITLAYERS.units[pos] = UNITLAYERS[group][pos] = UNITLAYERS[
        ownerPrefix + group
      ][pos] = UNITLAYERS[ownerPrefix + "units"][pos] = currentunit;
    }

    return game.start1({
      turn: 0,
      UNITDATA,
      UNITLAYERS
    });
  };
  game.move2 = step => {
    let LINKS: Links = { commands: {}, marks: {} };
    let ARTIFACTS = {
      victims: step.ARTIFACTS.victims,
      movetargets: step.ARTIFACTS.movetargets
    };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
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
    for (let LOOPPOS in ARTIFACTS.victims) {
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
    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {},
      soldiers: {},
      mysoldiers: {},
      oppsoldiers: {},
      neutralsoldiers: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      const ownerPrefix = ownerNames[owner];
      UNITLAYERS.units[pos] = UNITLAYERS[group][pos] = UNITLAYERS[
        ownerPrefix + group
      ][pos] = UNITLAYERS[ownerPrefix + "units"][pos] = currentunit;
    }
    {
      LINKS.endturn = "start1";
    }
    return {
      LINKS,
      path: step.path.concat("move"),
      MARKS: {},
      ARTIFACTS,
      TURN: step.TURN,
      UNITDATA,
      UNITLAYERS
    };
  };
  game.selectunit2 = (step, newMarkPos) => {
    let ARTIFACTS = {
      victims: step.ARTIFACTS.victims,
      movetargets: { ...step.ARTIFACTS.movetargets }
    };
    let LINKS: Links = { commands: {}, marks: {} };
    let MARKS = { ...step.MARKS, selectunit: newMarkPos };
    let UNITLAYERS = step.UNITLAYERS;
    {
      let BLOCKS = UNITLAYERS.units;

      for (let DIR of roseDirs) {
        let walkedsquares = [];
        let POS = MARKS.selectunit;
        while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
          walkedsquares.push(POS);
        }
        let WALKLENGTH = walkedsquares.length;
        if (WALKLENGTH) {
          ARTIFACTS.movetargets[walkedsquares[WALKLENGTH - 1]] = {};
        }
      }
    }
    LINKS.marks.selectmovetarget = {
      func: "selectmovetarget2",
      pos: Object.keys(ARTIFACTS.movetargets)
    };

    return {
      LINKS,
      path: step.path.concat(newMarkPos),
      name: "selectunit",
      ARTIFACTS,
      UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS
    };
  };
  game.selectmovetarget2 = (step, newMarkPos) => {
    let ARTIFACTS = {
      victims: { ...step.ARTIFACTS.victims },
      movetargets: step.ARTIFACTS.movetargets
    };
    let LINKS: Links = { commands: {}, marks: {} };
    let MARKS = { ...step.MARKS, selectmovetarget: newMarkPos };
    let UNITLAYERS = step.UNITLAYERS;
    {
      let startconnections = connections[MARKS.selectmovetarget];
      for (let DIR of orthoDirs) {
        let POS = startconnections[DIR];
        if (POS && UNITLAYERS.oppunits[POS]) {
          ARTIFACTS.victims[POS] = {};
        }
      }
    }
    LINKS.commands.move = "move2";

    return {
      LINKS,
      path: step.path.concat(newMarkPos),
      name: "selectmovetarget",
      ARTIFACTS,
      UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS
    };
  };
}
export default game;
