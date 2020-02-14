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
const dimensions = { height: 10, width: 10 };
const BOARD = boardLayers(dimensions);
const iconMapping = { amazons: "queen", fires: "pawn" };
const emptyArtifactLayers = { movetargets: {}, firedfrom: {}, firetargets: {} };
const connections = boardConnections({ height: 10, width: 10 });
const relativeDirs = makeRelativeDirs([]);
const TERRAIN = terrainLayers(10, 10, {});
let game = {
  gameId: "amazons",
  action: {},
  instruction: {},
  commands: { move: {}, fire: {} },
  iconMap: { amazons: "queen", fires: "pawn" }
};
{
  const groupLayers = {
    amazons: [
      ["units", "amazons"],
      ["units", "myunits", "amazons"],
      ["units", "oppunits", "amazons"]
    ],
    fires: [["units"], ["units", "myunits"], ["units", "oppunits"]]
  };
  game.action.startTurn1 = step => {
    const oldUnitLayers = step.UNITLAYERS;
    let UNITLAYERS = {
      units: oldUnitLayers.units,
      myunits: oldUnitLayers.oppunits,
      oppunits: oldUnitLayers.myunits,
      amazons: oldUnitLayers.amazons
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
      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.startTurn1 = step => {
    return collapseContent({
      line: [
        { select: "Select" },
        { unittype: ["queen", 1] },
        { text: "to move and fire with" }
      ]
    });
  };
  game.action.move1 = step => {
    let LINKS = { marks: {}, commands: {} };
    let ARTIFACTS = {
      movetargets: step.ARTIFACTS.movetargets,
      firedfrom: {},
      firetargets: {}
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
    UNITLAYERS = { units: {}, myunits: {}, oppunits: {}, amazons: {} };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    {
      let BLOCKS = UNITLAYERS.units;
      let STARTPOS = MARKS.selectmovetarget;
      for (let DIR of roseDirs) {
        let POS = STARTPOS;
        while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
          ARTIFACTS.firetargets[POS] = emptyObj;
        }
        POS = STARTPOS;
        ARTIFACTS.firedfrom[POS] = emptyObj;
      }
    }
    for (const pos of Object.keys(ARTIFACTS.firetargets)) {
      LINKS.marks[pos] = "selectfiretarget1";
    }
    return {
      LINKS,
      MARKS: {},
      ARTIFACTS,
      TURN: step.TURN,
      UNITDATA,
      UNITLAYERS,
      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.move1 = step => {
    return { text: "Now select where to fire at" };
  };
  game.action.fire1 = step => {
    let LINKS = { marks: {}, commands: {} };
    let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
    let ARTIFACTS = {
      movetargets: step.ARTIFACTS.movetargets,
      firedfrom: step.ARTIFACTS.firedfrom,
      firetargets: step.ARTIFACTS.firetargets
    };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let NEXTSPAWNID = step.NEXTSPAWNID;
    let MARKS = step.MARKS;
    anim.enterFrom[MARKS.selectfiretarget] = Object.keys(
      ARTIFACTS.firedfrom
    )[0];
    {
      let newunitid = "spawn" + NEXTSPAWNID++;
      UNITDATA[newunitid] = {
        pos: MARKS.selectfiretarget,
        id: newunitid,
        group: "fires",
        owner: 0
      };
    }
    UNITLAYERS = { units: {}, myunits: {}, oppunits: {}, amazons: {} };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    {
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
  game.instruction.fire1 = () => defaultInstruction(1);
  game.action.selectunit1 = (step, newMarkPos) => {
    let ARTIFACTS = {
      movetargets: {}
    };
    let LINKS = { marks: {}, commands: {} };
    let MARKS = {
      selectunit: newMarkPos
    };
    let UNITLAYERS = step.UNITLAYERS;
    {
      let BLOCKS = UNITLAYERS.units;
      for (let DIR of roseDirs) {
        let POS = MARKS.selectunit;
        while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
          ARTIFACTS.movetargets[POS] = emptyObj;
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
      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.selectunit1 = step => {
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
        }
      ]
    });
  };
  game.action.selectmovetarget1 = (step, newMarkPos) => {
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
  };
  game.instruction.selectmovetarget1 = step => {
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
        { text: "go to" },
        { pos: MARKS.selectmovetarget }
      ]
    });
  };
  game.action.selectfiretarget1 = (step, newMarkPos) => {
    let LINKS = { marks: {}, commands: {} };
    LINKS.commands.fire = "fire1";
    return {
      LINKS,
      ARTIFACTS: step.ARTIFACTS,
      UNITLAYERS: step.UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS: { selectfiretarget: newMarkPos },
      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.selectfiretarget1 = step => {
    let MARKS = step.MARKS;
    return collapseContent({
      line: [
        { text: "Press" },
        { command: "fire" },
        { text: "to spawn" },
        collapseContent({
          line: Object.keys({ [MARKS.selectfiretarget]: 1 })
            .map(p => ({ unit: [iconMapping["fires"], 0, p] }))
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
  };
}
{
  const groupLayers = {
    amazons: [
      ["units", "amazons"],
      ["units", "oppunits", "amazons"],
      ["units", "myunits", "amazons"]
    ],
    fires: [["units"], ["units", "oppunits"], ["units", "myunits"]]
  };
  game.action.startTurn2 = step => {
    const oldUnitLayers = step.UNITLAYERS;
    let UNITLAYERS = {
      units: oldUnitLayers.units,
      myunits: oldUnitLayers.oppunits,
      oppunits: oldUnitLayers.myunits,
      amazons: oldUnitLayers.amazons
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
      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.startTurn2 = step => {
    return collapseContent({
      line: [
        { select: "Select" },
        { unittype: ["queen", 2] },
        { text: "to move and fire with" }
      ]
    });
  };
  game.newBattle = () => {
    let UNITDATA = setup2army({
      amazons: {
        "1": ["d10", "g10", "a7", "j7"],
        "2": ["a4", "d1", "g1", "j4"]
      }
    });
    let UNITLAYERS = { units: {}, myunits: {}, oppunits: {}, amazons: {} };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    return game.action.startTurn1({
      NEXTSPAWNID: 1,
      TURN: 0,
      UNITDATA,
      UNITLAYERS
    });
  };
  game.action.move2 = step => {
    let LINKS = { marks: {}, commands: {} };
    let ARTIFACTS = {
      movetargets: step.ARTIFACTS.movetargets,
      firedfrom: {},
      firetargets: {}
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
    UNITLAYERS = { units: {}, myunits: {}, oppunits: {}, amazons: {} };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    {
      let BLOCKS = UNITLAYERS.units;
      let STARTPOS = MARKS.selectmovetarget;
      for (let DIR of roseDirs) {
        let POS = STARTPOS;
        while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
          ARTIFACTS.firetargets[POS] = emptyObj;
        }
        POS = STARTPOS;
        ARTIFACTS.firedfrom[POS] = emptyObj;
      }
    }
    for (const pos of Object.keys(ARTIFACTS.firetargets)) {
      LINKS.marks[pos] = "selectfiretarget2";
    }
    return {
      LINKS,
      MARKS: {},
      ARTIFACTS,
      TURN: step.TURN,
      UNITDATA,
      UNITLAYERS,
      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.move2 = step => {
    return { text: "Now select where to fire at" };
  };
  game.action.fire2 = step => {
    let LINKS = { marks: {}, commands: {} };
    let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
    let ARTIFACTS = {
      movetargets: step.ARTIFACTS.movetargets,
      firedfrom: step.ARTIFACTS.firedfrom,
      firetargets: step.ARTIFACTS.firetargets
    };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let NEXTSPAWNID = step.NEXTSPAWNID;
    let MARKS = step.MARKS;
    anim.enterFrom[MARKS.selectfiretarget] = Object.keys(
      ARTIFACTS.firedfrom
    )[0];
    {
      let newunitid = "spawn" + NEXTSPAWNID++;
      UNITDATA[newunitid] = {
        pos: MARKS.selectfiretarget,
        id: newunitid,
        group: "fires",
        owner: 0
      };
    }
    UNITLAYERS = { units: {}, myunits: {}, oppunits: {}, amazons: {} };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    {
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
  game.instruction.fire2 = () => defaultInstruction(2);
  game.action.selectunit2 = (step, newMarkPos) => {
    let ARTIFACTS = {
      movetargets: {}
    };
    let LINKS = { marks: {}, commands: {} };
    let MARKS = {
      selectunit: newMarkPos
    };
    let UNITLAYERS = step.UNITLAYERS;
    {
      let BLOCKS = UNITLAYERS.units;
      for (let DIR of roseDirs) {
        let POS = MARKS.selectunit;
        while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
          ARTIFACTS.movetargets[POS] = emptyObj;
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
      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.selectunit2 = step => {
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
        }
      ]
    });
  };
  game.action.selectmovetarget2 = (step, newMarkPos) => {
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
  };
  game.instruction.selectmovetarget2 = step => {
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
        { text: "go to" },
        { pos: MARKS.selectmovetarget }
      ]
    });
  };
  game.action.selectfiretarget2 = (step, newMarkPos) => {
    let LINKS = { marks: {}, commands: {} };
    LINKS.commands.fire = "fire2";
    return {
      LINKS,
      ARTIFACTS: step.ARTIFACTS,
      UNITLAYERS: step.UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS: { selectfiretarget: newMarkPos },
      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.selectfiretarget2 = step => {
    let MARKS = step.MARKS;
    return collapseContent({
      line: [
        { text: "Press" },
        { command: "fire" },
        { text: "to spawn" },
        collapseContent({
          line: Object.keys({ [MARKS.selectfiretarget]: 1 })
            .map(p => ({ unit: [iconMapping["fires"], 0, p] }))
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
  };
}
export default game;
