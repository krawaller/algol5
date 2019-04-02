const {
  offsetPos,
  boardConnections,
  makeRelativeDirs,
  deduceInitialUnitData,
  boardLayers
} = require("/Users/davidwaller/gitreps/algol5/modules/common");

const BOARD = boardLayers({ height: 10, width: 10 });

const emptyArtifactLayers = { targets: {} };

const connections = boardConnections({ height: 10, width: 10 });
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
    fire?: "fire1" | "fire2";
  };
  marks: {
    selectunit?: { func: "selectunit1" | "selectunit2"; pos: string[] };
    selectmovetarget?: {
      func: "selectmovetarget1" | "selectmovetarget2";
      pos: string[];
    };
    selectfiretarget?: {
      func: "selectfiretarget1" | "selectfiretarget2";
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
      queens: oldUnitLayers.queens,
      myqueens: oldUnitLayers.oppqueens,
      oppqueens: oldUnitLayers.myqueens,
      neutralqueens: oldUnitLayers.neutralqueens,
      fires: oldUnitLayers.fires,
      myfires: oldUnitLayers.oppfires,
      oppfires: oldUnitLayers.myfires,
      neutralfires: oldUnitLayers.neutralfires
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
      TURN: step.TURN + 1,
      NEXTSPAWNID: step.NEXTSPAWNID,
      TURNVARS: {}
    };
  };
  game.move1 = step => {
    let LINKS: Links = { commands: {}, marks: {} };
    let ARTIFACTS = {
      targets: { ...step.ARTIFACTS.targets }
    };
    let UNITLAYERS = step.UNITLAYERS;
    let TURNVARS = { ...step.TURNVARS };

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
    TURNVARS["movedto"] = MARKS.selectmovetarget;
    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {},
      queens: {},
      myqueens: {},
      oppqueens: {},
      neutralqueens: {},
      fires: {},
      myfires: {},
      oppfires: {},
      neutralfires: {}
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
      let BLOCKS = UNITLAYERS.units;

      for (let DIR of roseDirs) {
        let POS = TURNVARS["movedto"];
        while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
          ARTIFACTS.targets[POS] = {};
        }
      }
    }
    LINKS.marks.selectfiretarget = {
      func: "selectfiretarget1",
      pos: Object.keys(ARTIFACTS.targets)
    };

    return {
      LINKS,
      path: step.path.concat("move"),
      MARKS: {},
      ARTIFACTS,
      TURN: step.TURN,
      UNITDATA,
      UNITLAYERS,
      TURNVARS,

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.fire1 = step => {
    let LINKS: Links = { commands: {}, marks: {} };
    let UNITLAYERS = step.UNITLAYERS;
    let TURNVARS = step.TURNVARS;
    let UNITDATA = { ...step.UNITDATA };
    let NEXTSPAWNID = step.NEXTSPAWNID;
    let MARKS = step.MARKS;
    {
      let newunitid = "spawn" + NEXTSPAWNID++;
      UNITDATA[newunitid] = {
        pos: MARKS.selectfiretarget,
        id: newunitid,
        group: "fires",
        owner: 1,
        from: TURNVARS["movedto"]
      };
    }
    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {},
      queens: {},
      myqueens: {},
      oppqueens: {},
      neutralqueens: {},
      fires: {},
      myfires: {},
      oppfires: {},
      neutralfires: {}
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
      path: step.path.concat("fire"),
      MARKS: {},
      ARTIFACTS: step.ARTIFACTS,
      TURN: step.TURN,
      UNITDATA,
      UNITLAYERS,
      TURNVARS,

      NEXTSPAWNID
    };
  };
  game.selectunit1 = (step, newMarkPos) => {
    let ARTIFACTS = {
      targets: { ...step.ARTIFACTS.targets }
    };
    let LINKS: Links = { commands: {}, marks: {} };
    let MARKS = { ...step.MARKS, selectunit: newMarkPos };
    let UNITLAYERS = step.UNITLAYERS;
    {
      let BLOCKS = UNITLAYERS.units;

      for (let DIR of roseDirs) {
        let POS = MARKS.selectunit;
        while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
          ARTIFACTS.targets[POS] = {};
        }
      }
    }
    LINKS.marks.selectmovetarget = {
      func: "selectmovetarget1",
      pos: Object.keys(ARTIFACTS.targets)
    };

    return {
      LINKS,
      path: step.path.concat(newMarkPos),
      name: "selectunit",
      ARTIFACTS,
      UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS,
      TURNVARS: step.TURNVARS,

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.selectmovetarget1 = (step, newMarkPos) => {
    let LINKS: Links = { commands: {}, marks: {} };

    LINKS.commands.move = "move1";

    return {
      LINKS,
      path: step.path.concat(newMarkPos),
      name: "selectmovetarget",
      ARTIFACTS: step.ARTIFACTS,
      UNITLAYERS: step.UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS: { ...step.MARKS, selectmovetarget: newMarkPos },
      TURNVARS: step.TURNVARS,

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.selectfiretarget1 = (step, newMarkPos) => {
    let LINKS: Links = { commands: {}, marks: {} };

    LINKS.commands.fire = "fire1";

    return {
      LINKS,
      path: step.path.concat(newMarkPos),
      name: "selectfiretarget",
      ARTIFACTS: step.ARTIFACTS,
      UNITLAYERS: step.UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS: { ...step.MARKS, selectfiretarget: newMarkPos },
      TURNVARS: step.TURNVARS,

      NEXTSPAWNID: step.NEXTSPAWNID
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
      queens: oldUnitLayers.queens,
      myqueens: oldUnitLayers.oppqueens,
      oppqueens: oldUnitLayers.myqueens,
      neutralqueens: oldUnitLayers.neutralqueens,
      fires: oldUnitLayers.fires,
      myfires: oldUnitLayers.oppfires,
      oppfires: oldUnitLayers.myfires,
      neutralfires: oldUnitLayers.neutralfires
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
      TURN: step.TURN + 1,
      NEXTSPAWNID: step.NEXTSPAWNID,
      TURNVARS: {}
    };
  };
  game.newBattle = () => {
    let UNITDATA = {
      unit1: {
        pos: "d10",
        x: 4,
        y: 10,
        id: "unit1",
        group: "queens",
        owner: 1
      },
      unit2: {
        pos: "g10",
        x: 7,
        y: 10,
        id: "unit2",
        group: "queens",
        owner: 1
      },
      unit3: { pos: "a7", x: 1, y: 7, id: "unit3", group: "queens", owner: 1 },
      unit4: { pos: "j7", x: 10, y: 7, id: "unit4", group: "queens", owner: 1 },
      unit5: { pos: "a4", x: 1, y: 4, id: "unit5", group: "queens", owner: 2 },
      unit6: { pos: "d1", x: 4, y: 1, id: "unit6", group: "queens", owner: 2 },
      unit7: { pos: "g1", x: 7, y: 1, id: "unit7", group: "queens", owner: 2 },
      unit8: { pos: "j4", x: 10, y: 4, id: "unit8", group: "queens", owner: 2 }
    };

    let UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {},
      queens: {},
      myqueens: {},
      oppqueens: {},
      neutralqueens: {},
      fires: {},
      myfires: {},
      oppfires: {},
      neutralfires: {}
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
      NEXTSPAWNID: 1,

      turn: 0,
      UNITDATA,
      UNITLAYERS
    });
  };
  game.move2 = step => {
    let LINKS: Links = { commands: {}, marks: {} };
    let ARTIFACTS = {
      targets: { ...step.ARTIFACTS.targets }
    };
    let UNITLAYERS = step.UNITLAYERS;
    let TURNVARS = { ...step.TURNVARS };

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
    TURNVARS["movedto"] = MARKS.selectmovetarget;
    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {},
      queens: {},
      myqueens: {},
      oppqueens: {},
      neutralqueens: {},
      fires: {},
      myfires: {},
      oppfires: {},
      neutralfires: {}
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
      let BLOCKS = UNITLAYERS.units;

      for (let DIR of roseDirs) {
        let POS = TURNVARS["movedto"];
        while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
          ARTIFACTS.targets[POS] = {};
        }
      }
    }
    LINKS.marks.selectfiretarget = {
      func: "selectfiretarget2",
      pos: Object.keys(ARTIFACTS.targets)
    };

    return {
      LINKS,
      path: step.path.concat("move"),
      MARKS: {},
      ARTIFACTS,
      TURN: step.TURN,
      UNITDATA,
      UNITLAYERS,
      TURNVARS,

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.fire2 = step => {
    let LINKS: Links = { commands: {}, marks: {} };
    let UNITLAYERS = step.UNITLAYERS;
    let TURNVARS = step.TURNVARS;
    let UNITDATA = { ...step.UNITDATA };
    let NEXTSPAWNID = step.NEXTSPAWNID;
    let MARKS = step.MARKS;
    {
      let newunitid = "spawn" + NEXTSPAWNID++;
      UNITDATA[newunitid] = {
        pos: MARKS.selectfiretarget,
        id: newunitid,
        group: "fires",
        owner: 2,
        from: TURNVARS["movedto"]
      };
    }
    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {},
      queens: {},
      myqueens: {},
      oppqueens: {},
      neutralqueens: {},
      fires: {},
      myfires: {},
      oppfires: {},
      neutralfires: {}
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
      path: step.path.concat("fire"),
      MARKS: {},
      ARTIFACTS: step.ARTIFACTS,
      TURN: step.TURN,
      UNITDATA,
      UNITLAYERS,
      TURNVARS,

      NEXTSPAWNID
    };
  };
  game.selectunit2 = (step, newMarkPos) => {
    let ARTIFACTS = {
      targets: { ...step.ARTIFACTS.targets }
    };
    let LINKS: Links = { commands: {}, marks: {} };
    let MARKS = { ...step.MARKS, selectunit: newMarkPos };
    let UNITLAYERS = step.UNITLAYERS;
    {
      let BLOCKS = UNITLAYERS.units;

      for (let DIR of roseDirs) {
        let POS = MARKS.selectunit;
        while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
          ARTIFACTS.targets[POS] = {};
        }
      }
    }
    LINKS.marks.selectmovetarget = {
      func: "selectmovetarget2",
      pos: Object.keys(ARTIFACTS.targets)
    };

    return {
      LINKS,
      path: step.path.concat(newMarkPos),
      name: "selectunit",
      ARTIFACTS,
      UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS,
      TURNVARS: step.TURNVARS,

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.selectmovetarget2 = (step, newMarkPos) => {
    let LINKS: Links = { commands: {}, marks: {} };

    LINKS.commands.move = "move2";

    return {
      LINKS,
      path: step.path.concat(newMarkPos),
      name: "selectmovetarget",
      ARTIFACTS: step.ARTIFACTS,
      UNITLAYERS: step.UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS: { ...step.MARKS, selectmovetarget: newMarkPos },
      TURNVARS: step.TURNVARS,

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.selectfiretarget2 = (step, newMarkPos) => {
    let LINKS: Links = { commands: {}, marks: {} };

    LINKS.commands.fire = "fire2";

    return {
      LINKS,
      path: step.path.concat(newMarkPos),
      name: "selectfiretarget",
      ARTIFACTS: step.ARTIFACTS,
      UNITLAYERS: step.UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS: { ...step.MARKS, selectfiretarget: newMarkPos },
      TURNVARS: step.TURNVARS,

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
}
export default game;
