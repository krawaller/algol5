import {
  offsetPos,
  boardConnections,
  makeRelativeDirs,
  deduceInitialUnitData,
  boardLayers,
  collapseContent,
  defaultInstruction
} from "/Users/davidwaller/gitreps/algol5/modules/common";

const BOARD = boardLayers({ height: 8, width: 8 });

const emptyArtifactLayers = { movetarget: {} };

const connections = boardConnections({ height: 8, width: 8 });
const relativeDirs = makeRelativeDirs();
const roseDirs = [1, 2, 3, 4, 5, 6, 7, 8];
const orthoDirs = [1, 3, 5, 7];
const diagDirs = [2, 4, 6, 8];
let game: any = {};
type Links = {
  endturn?: "win" | "lose" | "draw" | "start1" | "start2";
  endMarks?: string[];
  endedBy?: "infiltration" | "regicide" | "starvation";
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
  const TERRAIN = {
    base: {
      a8: { pos: "a8", x: 1, y: 8, owner: 1 },
      b8: { pos: "b8", x: 2, y: 8, owner: 1 },
      c8: { pos: "c8", x: 3, y: 8, owner: 1 },
      d8: { pos: "d8", x: 4, y: 8, owner: 1 },
      e8: { pos: "e8", x: 5, y: 8, owner: 1 },
      f8: { pos: "f8", x: 6, y: 8, owner: 1 },
      g8: { pos: "g8", x: 7, y: 8, owner: 1 },
      h8: { pos: "h8", x: 8, y: 8, owner: 1 },
      a1: { pos: "a1", x: 1, y: 1, owner: 2 },
      b1: { pos: "b1", x: 2, y: 1, owner: 2 },
      c1: { pos: "c1", x: 3, y: 1, owner: 2 },
      d1: { pos: "d1", x: 4, y: 1, owner: 2 },
      e1: { pos: "e1", x: 5, y: 1, owner: 2 },
      f1: { pos: "f1", x: 6, y: 1, owner: 2 },
      g1: { pos: "g1", x: 7, y: 1, owner: 2 },
      h1: { pos: "h1", x: 8, y: 1, owner: 2 }
    },
    mybase: {
      a8: { pos: "a8", x: 1, y: 8, owner: 1 },
      b8: { pos: "b8", x: 2, y: 8, owner: 1 },
      c8: { pos: "c8", x: 3, y: 8, owner: 1 },
      d8: { pos: "d8", x: 4, y: 8, owner: 1 },
      e8: { pos: "e8", x: 5, y: 8, owner: 1 },
      f8: { pos: "f8", x: 6, y: 8, owner: 1 },
      g8: { pos: "g8", x: 7, y: 8, owner: 1 },
      h8: { pos: "h8", x: 8, y: 8, owner: 1 }
    },
    oppbase: {
      a1: { pos: "a1", x: 1, y: 1, owner: 2 },
      b1: { pos: "b1", x: 2, y: 1, owner: 2 },
      c1: { pos: "c1", x: 3, y: 1, owner: 2 },
      d1: { pos: "d1", x: 4, y: 1, owner: 2 },
      e1: { pos: "e1", x: 5, y: 1, owner: 2 },
      f1: { pos: "f1", x: 6, y: 1, owner: 2 },
      g1: { pos: "g1", x: 7, y: 1, owner: 2 },
      h1: { pos: "h1", x: 8, y: 1, owner: 2 }
    },
    nobase: {
      a2: { pos: "a2", x: 1, y: 2 },
      a3: { pos: "a3", x: 1, y: 3 },
      a4: { pos: "a4", x: 1, y: 4 },
      a5: { pos: "a5", x: 1, y: 5 },
      a6: { pos: "a6", x: 1, y: 6 },
      a7: { pos: "a7", x: 1, y: 7 },
      b2: { pos: "b2", x: 2, y: 2 },
      b3: { pos: "b3", x: 2, y: 3 },
      b4: { pos: "b4", x: 2, y: 4 },
      b5: { pos: "b5", x: 2, y: 5 },
      b6: { pos: "b6", x: 2, y: 6 },
      b7: { pos: "b7", x: 2, y: 7 },
      c2: { pos: "c2", x: 3, y: 2 },
      c3: { pos: "c3", x: 3, y: 3 },
      c4: { pos: "c4", x: 3, y: 4 },
      c5: { pos: "c5", x: 3, y: 5 },
      c6: { pos: "c6", x: 3, y: 6 },
      c7: { pos: "c7", x: 3, y: 7 },
      d2: { pos: "d2", x: 4, y: 2 },
      d3: { pos: "d3", x: 4, y: 3 },
      d4: { pos: "d4", x: 4, y: 4 },
      d5: { pos: "d5", x: 4, y: 5 },
      d6: { pos: "d6", x: 4, y: 6 },
      d7: { pos: "d7", x: 4, y: 7 },
      e2: { pos: "e2", x: 5, y: 2 },
      e3: { pos: "e3", x: 5, y: 3 },
      e4: { pos: "e4", x: 5, y: 4 },
      e5: { pos: "e5", x: 5, y: 5 },
      e6: { pos: "e6", x: 5, y: 6 },
      e7: { pos: "e7", x: 5, y: 7 },
      f2: { pos: "f2", x: 6, y: 2 },
      f3: { pos: "f3", x: 6, y: 3 },
      f4: { pos: "f4", x: 6, y: 4 },
      f5: { pos: "f5", x: 6, y: 5 },
      f6: { pos: "f6", x: 6, y: 6 },
      f7: { pos: "f7", x: 6, y: 7 },
      g2: { pos: "g2", x: 7, y: 2 },
      g3: { pos: "g3", x: 7, y: 3 },
      g4: { pos: "g4", x: 7, y: 4 },
      g5: { pos: "g5", x: 7, y: 5 },
      g6: { pos: "g6", x: 7, y: 6 },
      g7: { pos: "g7", x: 7, y: 7 },
      h2: { pos: "h2", x: 8, y: 2 },
      h3: { pos: "h3", x: 8, y: 3 },
      h4: { pos: "h4", x: 8, y: 4 },
      h5: { pos: "h5", x: 8, y: 5 },
      h6: { pos: "h6", x: 8, y: 6 },
      h7: { pos: "h7", x: 8, y: 7 }
    }
  };
  game.start1 = step => {
    const oldUnitLayers = step.UNITLAYERS;
    let UNITLAYERS = {
      units: oldUnitLayers.units,
      myunits: oldUnitLayers.oppunits,
      oppunits: oldUnitLayers.myunits,
      neutralunits: oldUnitLayers.neutralunits,
      daggers: oldUnitLayers.daggers,
      mydaggers: oldUnitLayers.oppdaggers,
      oppdaggers: oldUnitLayers.mydaggers,
      neutraldaggers: oldUnitLayers.neutraldaggers,
      crowns: oldUnitLayers.crowns,
      mycrowns: oldUnitLayers.oppcrowns,
      oppcrowns: oldUnitLayers.mycrowns,
      neutralcrowns: oldUnitLayers.neutralcrowns
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
      UNITLAYERS,
      ARTIFACTS: emptyArtifactLayers,
      MARKS: {},
      TURN: step.TURN + 1
    };
  };
  game.start1instruction = step => {
    return collapseContent({
      line: [
        { text: "Select a" },
        { unittype: "bishop" },
        { text: "or" },
        { unittype: "king" },
        { text: "to move" }
      ]
    });
  };
  game.move1 = step => {
    let LINKS: Links = { commands: {}, marks: {} };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let MARKS = step.MARKS;
    delete UNITDATA[(UNITLAYERS.units[MARKS.selectmovetarget] || {}).id];
    {
      let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
      if (unitid) {
        UNITDATA[unitid] = {
          ...UNITDATA[unitid],
          pos: MARKS.selectmovetarget
        };
      }
    }

    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {},
      daggers: {},
      mydaggers: {},
      oppdaggers: {},
      neutraldaggers: {},
      crowns: {},
      mycrowns: {},
      oppcrowns: {},
      neutralcrowns: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      const ownerPrefix = ownerNames[owner];
      UNITLAYERS.units[pos] = UNITLAYERS[group][pos] = UNITLAYERS[
        ownerPrefix + group
      ][pos] = UNITLAYERS[ownerPrefix + "units"][pos] = currentunit;
    }

    if (
      Object.keys(
        Object.entries(
          Object.keys(UNITLAYERS.mycrowns)
            .concat(Object.keys(TERRAIN.oppbase))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: {} }), {})
      ).length !== 0
    ) {
      let winner = 1;
      LINKS.endturn = winner === 1 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "infiltration";
      LINKS.endMarks = Object.keys(
        Object.entries(
          Object.keys(UNITLAYERS.mycrowns)
            .concat(Object.keys(TERRAIN.oppbase))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: {} }), {})
      );
    } else if (Object.keys(UNITLAYERS.oppcrowns).length === 1) {
      let winner = 1;
      LINKS.endturn = winner === 1 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "regicide";
    } else {
      LINKS.endturn = "start2";
    }
    return {
      LINKS,
      MARKS: {},
      ARTIFACTS: step.ARTIFACTS,
      TURN: step.TURN,
      UNITDATA,
      UNITLAYERS
    };
  };
  game.move1instruction = () => defaultInstruction(1);
  game.selectunit1 = (step, newMarkPos) => {
    let ARTIFACTS = {
      movetarget: { ...step.ARTIFACTS.movetarget }
    };
    let LINKS: Links = { commands: {}, marks: {} };
    let MARKS = { ...step.MARKS, selectunit: newMarkPos };
    let UNITLAYERS = step.UNITLAYERS;
    if (UNITLAYERS.mycrowns[MARKS.selectunit]) {
      {
        let startconnections = connections[MARKS.selectunit];
        for (let DIR of roseDirs) {
          let POS = startconnections[DIR];
          if (POS) {
            if (!UNITLAYERS.myunits[POS]) {
              ARTIFACTS.movetarget[POS] = {};
            }
          }
        }
      }
    } else {
      {
        let BLOCKS = UNITLAYERS.units;

        for (let DIR of [8, 1, 2, 4, 5, 6]) {
          let MAX = [8, 1, 2].indexOf(DIR) !== -1 ? 1 : 8;
          let POS = MARKS.selectunit;
          let LENGTH = 0;
          while (
            LENGTH < MAX &&
            (POS = connections[POS][DIR]) &&
            !BLOCKS[POS]
          ) {
            LENGTH++;
            ARTIFACTS.movetarget[POS] = {};
          }
          if (BLOCKS[POS]) {
            if (
              !UNITLAYERS.myunits[POS] &&
              !([1, 5].indexOf(DIR) !== -1 && UNITLAYERS.oppdaggers[POS])
            ) {
              ARTIFACTS.movetarget[POS] = {};
            }
          }
        }
      }
    }
    LINKS.marks.selectmovetarget = {
      func: "selectmovetarget1",
      pos: Object.keys(ARTIFACTS.movetarget)
    };

    return {
      LINKS,
      ARTIFACTS,
      UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS
    };
  };
  game.selectunit1instruction = step => {
    let MARKS = step.MARKS;

    let UNITLAYERS = step.UNITLAYERS;

    return collapseContent({
      line: [
        { text: "Select where to move the" },
        { pos: MARKS.selectunit },
        {
          unit: [
            { daggers: "bishop", crowns: "king" }[
              (UNITLAYERS.units[MARKS.selectunit] || {}).group
            ],
            (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
            MARKS.selectunit
          ]
        }
      ]
    });
  };
  game.selectmovetarget1 = (step, newMarkPos) => {
    let LINKS: Links = { commands: {}, marks: {} };

    LINKS.commands.move = "move1";

    return {
      LINKS,
      ARTIFACTS: step.ARTIFACTS,
      UNITLAYERS: step.UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS: { ...step.MARKS, selectmovetarget: newMarkPos }
    };
  };
  game.selectmovetarget1instruction = step => {
    let MARKS = step.MARKS;

    let UNITLAYERS = step.UNITLAYERS;

    return collapseContent({
      line: [
        { text: "Press" },
        { command: "move" },
        { text: "to go" },
        BOARD.board[MARKS.selectmovetarget].y > BOARD.board[MARKS.selectunit].y
          ? { text: "uphill" }
          : BOARD.board[MARKS.selectunit].y >
            BOARD.board[MARKS.selectmovetarget].y
          ? { text: "downhill" }
          : undefined,
        { text: "from" },
        { pos: MARKS.selectunit },
        UNITLAYERS.units[MARKS.selectmovetarget]
          ? collapseContent({
              line: [
                { text: "and kill the enemy" },
                {
                  unit: [
                    { daggers: "bishop", crowns: "king" }[
                      (UNITLAYERS.units[MARKS.selectmovetarget] || {}).group
                    ],
                    (UNITLAYERS.units[MARKS.selectmovetarget] || {}).owner,
                    MARKS.selectmovetarget
                  ]
                },
                { pos: MARKS.selectmovetarget }
              ]
            })
          : collapseContent({
              line: [{ text: "to" }, { pos: MARKS.selectmovetarget }]
            })
      ]
    });
  };
}
{
  const ownerNames = ["neutral", "opp", "my"];
  const TERRAIN = {
    base: {
      a8: { pos: "a8", x: 1, y: 8, owner: 1 },
      b8: { pos: "b8", x: 2, y: 8, owner: 1 },
      c8: { pos: "c8", x: 3, y: 8, owner: 1 },
      d8: { pos: "d8", x: 4, y: 8, owner: 1 },
      e8: { pos: "e8", x: 5, y: 8, owner: 1 },
      f8: { pos: "f8", x: 6, y: 8, owner: 1 },
      g8: { pos: "g8", x: 7, y: 8, owner: 1 },
      h8: { pos: "h8", x: 8, y: 8, owner: 1 },
      a1: { pos: "a1", x: 1, y: 1, owner: 2 },
      b1: { pos: "b1", x: 2, y: 1, owner: 2 },
      c1: { pos: "c1", x: 3, y: 1, owner: 2 },
      d1: { pos: "d1", x: 4, y: 1, owner: 2 },
      e1: { pos: "e1", x: 5, y: 1, owner: 2 },
      f1: { pos: "f1", x: 6, y: 1, owner: 2 },
      g1: { pos: "g1", x: 7, y: 1, owner: 2 },
      h1: { pos: "h1", x: 8, y: 1, owner: 2 }
    },
    oppbase: {
      a8: { pos: "a8", x: 1, y: 8, owner: 1 },
      b8: { pos: "b8", x: 2, y: 8, owner: 1 },
      c8: { pos: "c8", x: 3, y: 8, owner: 1 },
      d8: { pos: "d8", x: 4, y: 8, owner: 1 },
      e8: { pos: "e8", x: 5, y: 8, owner: 1 },
      f8: { pos: "f8", x: 6, y: 8, owner: 1 },
      g8: { pos: "g8", x: 7, y: 8, owner: 1 },
      h8: { pos: "h8", x: 8, y: 8, owner: 1 }
    },
    mybase: {
      a1: { pos: "a1", x: 1, y: 1, owner: 2 },
      b1: { pos: "b1", x: 2, y: 1, owner: 2 },
      c1: { pos: "c1", x: 3, y: 1, owner: 2 },
      d1: { pos: "d1", x: 4, y: 1, owner: 2 },
      e1: { pos: "e1", x: 5, y: 1, owner: 2 },
      f1: { pos: "f1", x: 6, y: 1, owner: 2 },
      g1: { pos: "g1", x: 7, y: 1, owner: 2 },
      h1: { pos: "h1", x: 8, y: 1, owner: 2 }
    },
    nobase: {
      a2: { pos: "a2", x: 1, y: 2 },
      a3: { pos: "a3", x: 1, y: 3 },
      a4: { pos: "a4", x: 1, y: 4 },
      a5: { pos: "a5", x: 1, y: 5 },
      a6: { pos: "a6", x: 1, y: 6 },
      a7: { pos: "a7", x: 1, y: 7 },
      b2: { pos: "b2", x: 2, y: 2 },
      b3: { pos: "b3", x: 2, y: 3 },
      b4: { pos: "b4", x: 2, y: 4 },
      b5: { pos: "b5", x: 2, y: 5 },
      b6: { pos: "b6", x: 2, y: 6 },
      b7: { pos: "b7", x: 2, y: 7 },
      c2: { pos: "c2", x: 3, y: 2 },
      c3: { pos: "c3", x: 3, y: 3 },
      c4: { pos: "c4", x: 3, y: 4 },
      c5: { pos: "c5", x: 3, y: 5 },
      c6: { pos: "c6", x: 3, y: 6 },
      c7: { pos: "c7", x: 3, y: 7 },
      d2: { pos: "d2", x: 4, y: 2 },
      d3: { pos: "d3", x: 4, y: 3 },
      d4: { pos: "d4", x: 4, y: 4 },
      d5: { pos: "d5", x: 4, y: 5 },
      d6: { pos: "d6", x: 4, y: 6 },
      d7: { pos: "d7", x: 4, y: 7 },
      e2: { pos: "e2", x: 5, y: 2 },
      e3: { pos: "e3", x: 5, y: 3 },
      e4: { pos: "e4", x: 5, y: 4 },
      e5: { pos: "e5", x: 5, y: 5 },
      e6: { pos: "e6", x: 5, y: 6 },
      e7: { pos: "e7", x: 5, y: 7 },
      f2: { pos: "f2", x: 6, y: 2 },
      f3: { pos: "f3", x: 6, y: 3 },
      f4: { pos: "f4", x: 6, y: 4 },
      f5: { pos: "f5", x: 6, y: 5 },
      f6: { pos: "f6", x: 6, y: 6 },
      f7: { pos: "f7", x: 6, y: 7 },
      g2: { pos: "g2", x: 7, y: 2 },
      g3: { pos: "g3", x: 7, y: 3 },
      g4: { pos: "g4", x: 7, y: 4 },
      g5: { pos: "g5", x: 7, y: 5 },
      g6: { pos: "g6", x: 7, y: 6 },
      g7: { pos: "g7", x: 7, y: 7 },
      h2: { pos: "h2", x: 8, y: 2 },
      h3: { pos: "h3", x: 8, y: 3 },
      h4: { pos: "h4", x: 8, y: 4 },
      h5: { pos: "h5", x: 8, y: 5 },
      h6: { pos: "h6", x: 8, y: 6 },
      h7: { pos: "h7", x: 8, y: 7 }
    }
  };
  game.start2 = step => {
    const oldUnitLayers = step.UNITLAYERS;
    let UNITLAYERS = {
      units: oldUnitLayers.units,
      myunits: oldUnitLayers.oppunits,
      oppunits: oldUnitLayers.myunits,
      neutralunits: oldUnitLayers.neutralunits,
      daggers: oldUnitLayers.daggers,
      mydaggers: oldUnitLayers.oppdaggers,
      oppdaggers: oldUnitLayers.mydaggers,
      neutraldaggers: oldUnitLayers.neutraldaggers,
      crowns: oldUnitLayers.crowns,
      mycrowns: oldUnitLayers.oppcrowns,
      oppcrowns: oldUnitLayers.mycrowns,
      neutralcrowns: oldUnitLayers.neutralcrowns
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
      UNITLAYERS,
      ARTIFACTS: emptyArtifactLayers,
      MARKS: {},
      TURN: step.TURN + 1
    };
  };
  game.start2instruction = step => {
    return collapseContent({
      line: [
        { text: "Select a" },
        { unittype: "bishop" },
        { text: "or" },
        { unittype: "king" },
        { text: "to move" }
      ]
    });
  };
  game.newBattle = () => {
    let UNITDATA = {
      unit1: { pos: "d8", x: 4, y: 8, id: "unit1", group: "crowns", owner: 1 },
      unit2: { pos: "e8", x: 5, y: 8, id: "unit2", group: "crowns", owner: 1 },
      unit3: { pos: "c1", x: 3, y: 1, id: "unit3", group: "crowns", owner: 2 },
      unit4: { pos: "f1", x: 6, y: 1, id: "unit4", group: "crowns", owner: 2 },
      unit5: { pos: "c7", x: 3, y: 7, id: "unit5", group: "daggers", owner: 1 },
      unit6: { pos: "d7", x: 4, y: 7, id: "unit6", group: "daggers", owner: 1 },
      unit7: { pos: "e7", x: 5, y: 7, id: "unit7", group: "daggers", owner: 1 },
      unit8: { pos: "f7", x: 6, y: 7, id: "unit8", group: "daggers", owner: 1 },
      unit9: { pos: "c3", x: 3, y: 3, id: "unit9", group: "daggers", owner: 2 },
      unit10: {
        pos: "f3",
        x: 6,
        y: 3,
        id: "unit10",
        group: "daggers",
        owner: 2
      },
      unit11: {
        pos: "b2",
        x: 2,
        y: 2,
        id: "unit11",
        group: "daggers",
        owner: 2
      },
      unit12: {
        pos: "c2",
        x: 3,
        y: 2,
        id: "unit12",
        group: "daggers",
        owner: 2
      },
      unit13: {
        pos: "d2",
        x: 4,
        y: 2,
        id: "unit13",
        group: "daggers",
        owner: 2
      },
      unit14: {
        pos: "e2",
        x: 5,
        y: 2,
        id: "unit14",
        group: "daggers",
        owner: 2
      },
      unit15: {
        pos: "f2",
        x: 6,
        y: 2,
        id: "unit15",
        group: "daggers",
        owner: 2
      },
      unit16: {
        pos: "g2",
        x: 7,
        y: 2,
        id: "unit16",
        group: "daggers",
        owner: 2
      }
    };

    let UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {},
      daggers: {},
      mydaggers: {},
      oppdaggers: {},
      neutraldaggers: {},
      crowns: {},
      mycrowns: {},
      oppcrowns: {},
      neutralcrowns: {}
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
      TURN: 0,
      UNITDATA,
      UNITLAYERS
    });
  };
  game.move2 = step => {
    let LINKS: Links = { commands: {}, marks: {} };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let MARKS = step.MARKS;
    delete UNITDATA[(UNITLAYERS.units[MARKS.selectmovetarget] || {}).id];
    {
      let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
      if (unitid) {
        UNITDATA[unitid] = {
          ...UNITDATA[unitid],
          pos: MARKS.selectmovetarget
        };
      }
    }

    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {},
      daggers: {},
      mydaggers: {},
      oppdaggers: {},
      neutraldaggers: {},
      crowns: {},
      mycrowns: {},
      oppcrowns: {},
      neutralcrowns: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      const ownerPrefix = ownerNames[owner];
      UNITLAYERS.units[pos] = UNITLAYERS[group][pos] = UNITLAYERS[
        ownerPrefix + group
      ][pos] = UNITLAYERS[ownerPrefix + "units"][pos] = currentunit;
    }

    if (
      Object.keys(
        Object.entries(
          Object.keys(UNITLAYERS.mycrowns)
            .concat(Object.keys(TERRAIN.oppbase))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: {} }), {})
      ).length !== 0
    ) {
      let winner = 2;
      LINKS.endturn = winner === 2 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "infiltration";
      LINKS.endMarks = Object.keys(
        Object.entries(
          Object.keys(UNITLAYERS.mycrowns)
            .concat(Object.keys(TERRAIN.oppbase))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: {} }), {})
      );
    } else if (Object.keys(UNITLAYERS.oppcrowns).length === 1) {
      let winner = 2;
      LINKS.endturn = winner === 2 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "regicide";
    } else {
      LINKS.endturn = "start1";
    }
    return {
      LINKS,
      MARKS: {},
      ARTIFACTS: step.ARTIFACTS,
      TURN: step.TURN,
      UNITDATA,
      UNITLAYERS
    };
  };
  game.move2instruction = () => defaultInstruction(2);
  game.selectunit2 = (step, newMarkPos) => {
    let ARTIFACTS = {
      movetarget: { ...step.ARTIFACTS.movetarget }
    };
    let LINKS: Links = { commands: {}, marks: {} };
    let MARKS = { ...step.MARKS, selectunit: newMarkPos };
    let UNITLAYERS = step.UNITLAYERS;
    if (UNITLAYERS.mycrowns[MARKS.selectunit]) {
      {
        let startconnections = connections[MARKS.selectunit];
        for (let DIR of roseDirs) {
          let POS = startconnections[DIR];
          if (POS) {
            if (!UNITLAYERS.myunits[POS]) {
              ARTIFACTS.movetarget[POS] = {};
            }
          }
        }
      }
    } else {
      {
        let BLOCKS = UNITLAYERS.units;

        for (let DIR of [8, 1, 2, 4, 5, 6]) {
          let MAX = [8, 1, 2].indexOf(DIR) !== -1 ? 1 : 8;
          let POS = MARKS.selectunit;
          let LENGTH = 0;
          while (
            LENGTH < MAX &&
            (POS = connections[POS][DIR]) &&
            !BLOCKS[POS]
          ) {
            LENGTH++;
            ARTIFACTS.movetarget[POS] = {};
          }
          if (BLOCKS[POS]) {
            if (
              !UNITLAYERS.myunits[POS] &&
              !([1, 5].indexOf(DIR) !== -1 && UNITLAYERS.oppdaggers[POS])
            ) {
              ARTIFACTS.movetarget[POS] = {};
            }
          }
        }
      }
    }
    LINKS.marks.selectmovetarget = {
      func: "selectmovetarget2",
      pos: Object.keys(ARTIFACTS.movetarget)
    };

    return {
      LINKS,
      ARTIFACTS,
      UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS
    };
  };
  game.selectunit2instruction = step => {
    let MARKS = step.MARKS;

    let UNITLAYERS = step.UNITLAYERS;

    return collapseContent({
      line: [
        { text: "Select where to move the" },
        { pos: MARKS.selectunit },
        {
          unit: [
            { daggers: "bishop", crowns: "king" }[
              (UNITLAYERS.units[MARKS.selectunit] || {}).group
            ],
            (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
            MARKS.selectunit
          ]
        }
      ]
    });
  };
  game.selectmovetarget2 = (step, newMarkPos) => {
    let LINKS: Links = { commands: {}, marks: {} };

    LINKS.commands.move = "move2";

    return {
      LINKS,
      ARTIFACTS: step.ARTIFACTS,
      UNITLAYERS: step.UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS: { ...step.MARKS, selectmovetarget: newMarkPos }
    };
  };
  game.selectmovetarget2instruction = step => {
    let MARKS = step.MARKS;

    let UNITLAYERS = step.UNITLAYERS;

    return collapseContent({
      line: [
        { text: "Press" },
        { command: "move" },
        { text: "to go" },
        BOARD.board[MARKS.selectmovetarget].y > BOARD.board[MARKS.selectunit].y
          ? { text: "uphill" }
          : BOARD.board[MARKS.selectunit].y >
            BOARD.board[MARKS.selectmovetarget].y
          ? { text: "downhill" }
          : undefined,
        { text: "from" },
        { pos: MARKS.selectunit },
        UNITLAYERS.units[MARKS.selectmovetarget]
          ? collapseContent({
              line: [
                { text: "and kill the enemy" },
                {
                  unit: [
                    { daggers: "bishop", crowns: "king" }[
                      (UNITLAYERS.units[MARKS.selectmovetarget] || {}).group
                    ],
                    (UNITLAYERS.units[MARKS.selectmovetarget] || {}).owner,
                    MARKS.selectmovetarget
                  ]
                },
                { pos: MARKS.selectmovetarget }
              ]
            })
          : collapseContent({
              line: [{ text: "to" }, { pos: MARKS.selectmovetarget }]
            })
      ]
    });
  };
}
export default game;
