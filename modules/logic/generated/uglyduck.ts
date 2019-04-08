import {
  offsetPos,
  boardConnections,
  makeRelativeDirs,
  deduceInitialUnitData,
  boardLayers,
  collapseContent,
  defaultInstruction
} from "/Users/davidwaller/gitreps/algol5/modules/common";

const BOARD = boardLayers({ height: 5, width: 5 });

const emptyArtifactLayers = { movetargets: {} };

const connections = boardConnections({ height: 5, width: 5 });
const relativeDirs = makeRelativeDirs();
const roseDirs = [1, 2, 3, 4, 5, 6, 7, 8];
const orthoDirs = [1, 3, 5, 7];
const diagDirs = [2, 4, 6, 8];
let game: any = {};
type Links = {
  endturn?: "win" | "lose" | "draw" | "start1" | "start2";
  endMarks?: string[];
  endedBy?: "swanhome" | "starvation";
  actions: { [idx: string]: string };
};
{
  const ownerNames = ["neutral", "my", "opp"];
  const TERRAIN = {
    homerow: {
      a1: { pos: "a1", x: 1, y: 1, owner: 1 },
      b1: { pos: "b1", x: 2, y: 1, owner: 1 },
      c1: { pos: "c1", x: 3, y: 1, owner: 1 },
      d1: { pos: "d1", x: 4, y: 1, owner: 1 },
      e1: { pos: "e1", x: 5, y: 1, owner: 1 },
      a5: { pos: "a5", x: 1, y: 5, owner: 2 },
      b5: { pos: "b5", x: 2, y: 5, owner: 2 },
      c5: { pos: "c5", x: 3, y: 5, owner: 2 },
      d5: { pos: "d5", x: 4, y: 5, owner: 2 },
      e5: { pos: "e5", x: 5, y: 5, owner: 2 }
    },
    myhomerow: {
      a1: { pos: "a1", x: 1, y: 1, owner: 1 },
      b1: { pos: "b1", x: 2, y: 1, owner: 1 },
      c1: { pos: "c1", x: 3, y: 1, owner: 1 },
      d1: { pos: "d1", x: 4, y: 1, owner: 1 },
      e1: { pos: "e1", x: 5, y: 1, owner: 1 }
    },
    opphomerow: {
      a5: { pos: "a5", x: 1, y: 5, owner: 2 },
      b5: { pos: "b5", x: 2, y: 5, owner: 2 },
      c5: { pos: "c5", x: 3, y: 5, owner: 2 },
      d5: { pos: "d5", x: 4, y: 5, owner: 2 },
      e5: { pos: "e5", x: 5, y: 5, owner: 2 }
    },
    nohomerow: {
      a2: { pos: "a2", x: 1, y: 2 },
      a3: { pos: "a3", x: 1, y: 3 },
      a4: { pos: "a4", x: 1, y: 4 },
      b2: { pos: "b2", x: 2, y: 2 },
      b3: { pos: "b3", x: 2, y: 3 },
      b4: { pos: "b4", x: 2, y: 4 },
      c2: { pos: "c2", x: 3, y: 2 },
      c3: { pos: "c3", x: 3, y: 3 },
      c4: { pos: "c4", x: 3, y: 4 },
      d2: { pos: "d2", x: 4, y: 2 },
      d3: { pos: "d3", x: 4, y: 3 },
      d4: { pos: "d4", x: 4, y: 4 },
      e2: { pos: "e2", x: 5, y: 2 },
      e3: { pos: "e3", x: 5, y: 3 },
      e4: { pos: "e4", x: 5, y: 4 }
    }
  };
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
      neutralsoldiers: oldUnitLayers.neutralsoldiers,
      kings: oldUnitLayers.kings,
      mykings: oldUnitLayers.oppkings,
      oppkings: oldUnitLayers.mykings,
      neutralkings: oldUnitLayers.neutralkings
    };
    let LINKS: Links = {
      actions: {}
    };

    for (const pos of Object.keys(UNITLAYERS.myunits)) {
      LINKS.actions[pos] = "selectunit1";
    }

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
    let UNITLAYERS = step.UNITLAYERS;

    return collapseContent({
      line: [
        { text: "Select" },
        collapseContent({
          line: [
            Object.keys(UNITLAYERS.mysoldiers).length !== 0
              ? collapseContent({
                  line: [
                    { text: "a" },
                    { unittype: "pawn" },
                    { text: "to advance" }
                  ]
                })
              : undefined,
            Object.keys(UNITLAYERS.mykings).length !== 0
              ? collapseContent({
                  line: [
                    { text: "a" },
                    { unittype: "king" },
                    { text: "to retreat" }
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
  };
  game.move1 = step => {
    let LINKS: Links = { actions: {} };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let MARKS = step.MARKS;
    if (TERRAIN.opphomerow[MARKS.selectmovetarget]) {
      {
        let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            group: "kings"
          };
        }
      }
    }
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
      soldiers: {},
      mysoldiers: {},
      oppsoldiers: {},
      neutralsoldiers: {},
      kings: {},
      mykings: {},
      oppkings: {},
      neutralkings: {}
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
          Object.keys(UNITLAYERS.mykings)
            .concat(Object.keys(TERRAIN.homerow))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: {} }), {})
      ).length !== 0
    ) {
      let winner = 1;
      LINKS.endturn = winner === 1 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "swanhome";
      LINKS.endMarks = Object.keys(
        Object.entries(
          Object.keys(UNITLAYERS.mykings)
            .concat(Object.keys(TERRAIN.myhomerow))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: {} }), {})
      );
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
      movetargets: { ...step.ARTIFACTS.movetargets }
    };
    let LINKS: Links = { actions: {} };
    let MARKS = { ...step.MARKS, selectunit: newMarkPos };
    let UNITLAYERS = step.UNITLAYERS;
    {
      let startconnections = connections[MARKS.selectunit];
      for (let DIR of UNITLAYERS.mykings[MARKS.selectunit]
        ? [4, 5, 6]
        : [8, 1, 2]) {
        let POS = startconnections[DIR];
        if (
          POS &&
          (DIR === 1 || DIR === 5
            ? !UNITLAYERS.units[POS]
            : !UNITLAYERS.myunits[POS])
        ) {
          ARTIFACTS.movetargets[POS] = {};
        }
      }
    }
    for (const pos of Object.keys(ARTIFACTS.movetargets)) {
      LINKS.actions[pos] = "selectmovetarget1";
    }

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

    return UNITLAYERS.mykings[MARKS.selectunit]
      ? collapseContent({
          line: [
            { text: "Select a square closer to home to move your" },
            { unittype: "king" },
            { text: "to" }
          ]
        })
      : collapseContent({
          line: [
            { text: "Select a square closer to the enemy lines to move your" },
            { unittype: "pawn" },
            { text: "to" }
          ]
        });
  };
  game.selectmovetarget1 = (step, newMarkPos) => {
    let LINKS: Links = { actions: {} };

    LINKS.actions.move = "move1";

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
        { text: "to" },
        UNITLAYERS.mykings[MARKS.selectunit]
          ? collapseContent({
              line: [{ text: "retreat your" }, { unittype: "king" }]
            })
          : collapseContent({
              line: [{ text: "advance your" }, { unittype: "pawn" }]
            }),
        { text: "from" },
        { pos: MARKS.selectunit },
        TERRAIN.opphomerow[MARKS.selectmovetarget]
          ? collapseContent({
              line: [
                { text: "into the opponent base at" },
                { pos: MARKS.selectmovetarget }
              ]
            })
          : TERRAIN.myhomerow[MARKS.selectmovetarget]
          ? collapseContent({
              line: [{ text: "back home to" }, { pos: MARKS.selectmovetarget }]
            })
          : collapseContent({
              line: [{ text: "to" }, { pos: MARKS.selectmovetarget }]
            }),
        UNITLAYERS.oppunits[MARKS.selectmovetarget]
          ? collapseContent({
              line: [
                { text: ", killing the enemy" },
                {
                  unit: [
                    { soldiers: "pawn", kings: "king" }[
                      (UNITLAYERS.units[MARKS.selectmovetarget] || {}).group
                    ],
                    (UNITLAYERS.units[MARKS.selectmovetarget] || {}).owner,
                    MARKS.selectmovetarget
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
  const ownerNames = ["neutral", "opp", "my"];
  const TERRAIN = {
    homerow: {
      a1: { pos: "a1", x: 1, y: 1, owner: 1 },
      b1: { pos: "b1", x: 2, y: 1, owner: 1 },
      c1: { pos: "c1", x: 3, y: 1, owner: 1 },
      d1: { pos: "d1", x: 4, y: 1, owner: 1 },
      e1: { pos: "e1", x: 5, y: 1, owner: 1 },
      a5: { pos: "a5", x: 1, y: 5, owner: 2 },
      b5: { pos: "b5", x: 2, y: 5, owner: 2 },
      c5: { pos: "c5", x: 3, y: 5, owner: 2 },
      d5: { pos: "d5", x: 4, y: 5, owner: 2 },
      e5: { pos: "e5", x: 5, y: 5, owner: 2 }
    },
    opphomerow: {
      a1: { pos: "a1", x: 1, y: 1, owner: 1 },
      b1: { pos: "b1", x: 2, y: 1, owner: 1 },
      c1: { pos: "c1", x: 3, y: 1, owner: 1 },
      d1: { pos: "d1", x: 4, y: 1, owner: 1 },
      e1: { pos: "e1", x: 5, y: 1, owner: 1 }
    },
    myhomerow: {
      a5: { pos: "a5", x: 1, y: 5, owner: 2 },
      b5: { pos: "b5", x: 2, y: 5, owner: 2 },
      c5: { pos: "c5", x: 3, y: 5, owner: 2 },
      d5: { pos: "d5", x: 4, y: 5, owner: 2 },
      e5: { pos: "e5", x: 5, y: 5, owner: 2 }
    },
    nohomerow: {
      a2: { pos: "a2", x: 1, y: 2 },
      a3: { pos: "a3", x: 1, y: 3 },
      a4: { pos: "a4", x: 1, y: 4 },
      b2: { pos: "b2", x: 2, y: 2 },
      b3: { pos: "b3", x: 2, y: 3 },
      b4: { pos: "b4", x: 2, y: 4 },
      c2: { pos: "c2", x: 3, y: 2 },
      c3: { pos: "c3", x: 3, y: 3 },
      c4: { pos: "c4", x: 3, y: 4 },
      d2: { pos: "d2", x: 4, y: 2 },
      d3: { pos: "d3", x: 4, y: 3 },
      d4: { pos: "d4", x: 4, y: 4 },
      e2: { pos: "e2", x: 5, y: 2 },
      e3: { pos: "e3", x: 5, y: 3 },
      e4: { pos: "e4", x: 5, y: 4 }
    }
  };
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
      neutralsoldiers: oldUnitLayers.neutralsoldiers,
      kings: oldUnitLayers.kings,
      mykings: oldUnitLayers.oppkings,
      oppkings: oldUnitLayers.mykings,
      neutralkings: oldUnitLayers.neutralkings
    };
    let LINKS: Links = {
      actions: {}
    };

    for (const pos of Object.keys(UNITLAYERS.myunits)) {
      LINKS.actions[pos] = "selectunit2";
    }

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
    let UNITLAYERS = step.UNITLAYERS;

    return collapseContent({
      line: [
        { text: "Select" },
        collapseContent({
          line: [
            Object.keys(UNITLAYERS.mysoldiers).length !== 0
              ? collapseContent({
                  line: [
                    { text: "a" },
                    { unittype: "pawn" },
                    { text: "to advance" }
                  ]
                })
              : undefined,
            Object.keys(UNITLAYERS.mykings).length !== 0
              ? collapseContent({
                  line: [
                    { text: "a" },
                    { unittype: "king" },
                    { text: "to retreat" }
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
        pos: "e1",
        x: 5,
        y: 1,
        id: "unit5",
        group: "soldiers",
        owner: 1
      },
      unit6: {
        pos: "a5",
        x: 1,
        y: 5,
        id: "unit6",
        group: "soldiers",
        owner: 2
      },
      unit7: {
        pos: "b5",
        x: 2,
        y: 5,
        id: "unit7",
        group: "soldiers",
        owner: 2
      },
      unit8: {
        pos: "c5",
        x: 3,
        y: 5,
        id: "unit8",
        group: "soldiers",
        owner: 2
      },
      unit9: {
        pos: "d5",
        x: 4,
        y: 5,
        id: "unit9",
        group: "soldiers",
        owner: 2
      },
      unit10: {
        pos: "e5",
        x: 5,
        y: 5,
        id: "unit10",
        group: "soldiers",
        owner: 2
      }
    };

    let UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {},
      soldiers: {},
      mysoldiers: {},
      oppsoldiers: {},
      neutralsoldiers: {},
      kings: {},
      mykings: {},
      oppkings: {},
      neutralkings: {}
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
    let LINKS: Links = { actions: {} };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let MARKS = step.MARKS;
    if (TERRAIN.opphomerow[MARKS.selectmovetarget]) {
      {
        let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            group: "kings"
          };
        }
      }
    }
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
      soldiers: {},
      mysoldiers: {},
      oppsoldiers: {},
      neutralsoldiers: {},
      kings: {},
      mykings: {},
      oppkings: {},
      neutralkings: {}
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
          Object.keys(UNITLAYERS.mykings)
            .concat(Object.keys(TERRAIN.homerow))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: {} }), {})
      ).length !== 0
    ) {
      let winner = 2;
      LINKS.endturn = winner === 2 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "swanhome";
      LINKS.endMarks = Object.keys(
        Object.entries(
          Object.keys(UNITLAYERS.mykings)
            .concat(Object.keys(TERRAIN.myhomerow))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: {} }), {})
      );
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
      movetargets: { ...step.ARTIFACTS.movetargets }
    };
    let LINKS: Links = { actions: {} };
    let MARKS = { ...step.MARKS, selectunit: newMarkPos };
    let UNITLAYERS = step.UNITLAYERS;
    {
      let startconnections = connections[MARKS.selectunit];
      for (let DIR of UNITLAYERS.mykings[MARKS.selectunit]
        ? [8, 1, 2]
        : [4, 5, 6]) {
        let POS = startconnections[DIR];
        if (
          POS &&
          (DIR === 1 || DIR === 5
            ? !UNITLAYERS.units[POS]
            : !UNITLAYERS.myunits[POS])
        ) {
          ARTIFACTS.movetargets[POS] = {};
        }
      }
    }
    for (const pos of Object.keys(ARTIFACTS.movetargets)) {
      LINKS.actions[pos] = "selectmovetarget2";
    }

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

    return UNITLAYERS.mykings[MARKS.selectunit]
      ? collapseContent({
          line: [
            { text: "Select a square closer to home to move your" },
            { unittype: "king" },
            { text: "to" }
          ]
        })
      : collapseContent({
          line: [
            { text: "Select a square closer to the enemy lines to move your" },
            { unittype: "pawn" },
            { text: "to" }
          ]
        });
  };
  game.selectmovetarget2 = (step, newMarkPos) => {
    let LINKS: Links = { actions: {} };

    LINKS.actions.move = "move2";

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
        { text: "to" },
        UNITLAYERS.mykings[MARKS.selectunit]
          ? collapseContent({
              line: [{ text: "retreat your" }, { unittype: "king" }]
            })
          : collapseContent({
              line: [{ text: "advance your" }, { unittype: "pawn" }]
            }),
        { text: "from" },
        { pos: MARKS.selectunit },
        TERRAIN.opphomerow[MARKS.selectmovetarget]
          ? collapseContent({
              line: [
                { text: "into the opponent base at" },
                { pos: MARKS.selectmovetarget }
              ]
            })
          : TERRAIN.myhomerow[MARKS.selectmovetarget]
          ? collapseContent({
              line: [{ text: "back home to" }, { pos: MARKS.selectmovetarget }]
            })
          : collapseContent({
              line: [{ text: "to" }, { pos: MARKS.selectmovetarget }]
            }),
        UNITLAYERS.oppunits[MARKS.selectmovetarget]
          ? collapseContent({
              line: [
                { text: ", killing the enemy" },
                {
                  unit: [
                    { soldiers: "pawn", kings: "king" }[
                      (UNITLAYERS.units[MARKS.selectmovetarget] || {}).group
                    ],
                    (UNITLAYERS.units[MARKS.selectmovetarget] || {}).owner,
                    MARKS.selectmovetarget
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
