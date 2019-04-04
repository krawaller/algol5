import { GogolGenerators } from "./_types";

const gogolGenerators: GogolGenerators = {
  findforbiddenkingspots: {
    type: "neighbour",
    starts: { intersect: ["edges", "mysoldiers"] },
    dirs: {
      ifelse: [{ anyat: ["homerow", ["start"]] }, ["ortho"], { list: [1, 5] }]
    },
    draw: { neighbours: { tolayer: "nokings" } }
  },
  findforbiddensoldierspots: {
    type: "neighbour",
    dirs: ["ortho"],
    starts: "mykings",
    condition: {
      or: [
        { anyat: ["homerow", ["target"]] },
        {
          and: [
            { anyat: ["edges", ["start"]] },
            { anyat: ["edges", ["target"]] }
          ]
        }
      ]
    },
    draw: { neighbours: { tolayer: "nosoldiers" } }
  },
  findkingwalktargets: {
    type: "walker",
    starts: { union: ["mykings", { single: "selectunit" }] },
    dirs: ["rose"],
    blocks: "units",
    draw: { steps: { unlessover: "nokings", tolayer: "kingwalk" } }
  },
  findadjacentenemies: {
    type: "neighbour",
    start: "selectunit",
    dirs: ["rose"],
    ifover: "oppunits",
    draw: {
      neighbours: { tolayer: "adjacentenemies", include: { dir: ["dir"] } }
    }
  },
  findsplashed: {
    type: "filter",
    layer: "willdie",
    matching: {
      dir: { is: { read: ["jumptargets", "selectjumptarget", "dir"] } }
    },
    tolayer: "splashed"
  },
  findjumptargets: {
    type: "neighbour",
    starts: "adjacentenemies",
    dir: { reldir: [1, { read: ["adjacentenemies", ["start"], "dir"] }] },
    unlessover: {
      union: [
        "units",
        {
          ifelse: [
            { anyat: ["mykings", "selectunit"] },
            "nokings",
            "nosoldiers"
          ]
        }
      ]
    },
    draw: {
      start: {
        condition: { truthy: ["neighbourcount"] },
        tolayer: "willdie",
        include: { dir: ["dir"] }
      },
      neighbours: { tolayer: "jumptargets", include: { dir: ["dir"] } }
    }
  }
};

export default gogolGenerators;
