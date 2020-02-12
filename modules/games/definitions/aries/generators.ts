// Here you define the generators (artifact creators) for your game.
// The type analyser will look at this file to see what generators are available,
// and also what artifact layers there are. When you add/remove a generator or
// change the names of the layers you draw to, rerun the type analyser!

import { AriesGenerators } from "./_types";

const ariesGenerators: AriesGenerators = {
  findmovetargets: {
    type: "walker",
    start: "selectunit",
    dirs: "ortho",
    blocks: "units",
    draw: {
      steps: { tolayer: "movetargets" },
      block: {
        ifover: "oppunits",
        condition: {
          not: {
            and: [
              { samepos: [["target"], { battlepos: "pushsquare" }] },
              { same: [{ idat: "selectunit" }, { battlevar: "pusheeid" }] },
            ],
          },
        },
        tolayer: "movetargets",
        include: { dir: ["dir"] },
      },
    },
  },
  findpushresults: {
    type: "walker",
    start: "selectmovetarget",
    dir: { reldir: [1, { read: ["movetargets", "selectmovetarget", "dir"] }] },
    steps: "oppunits",
    blocks: "myunits",
    startasstep: true,
    stopPrio: ["reachedmax", "outofbounds", "hitblock", "nomoresteps"],
    draw: {
      steps: { tolayer: "beingpushed" },
      last: {
        condition: {
          or: [
            { stoppedBecause: "hitblock" },
            { stoppedBecause: "outofbounds" },
          ],
        },
        tolayer: "squished",
        include: { dir: ["dir"] },
      },
    },
  },
};

export default ariesGenerators;
