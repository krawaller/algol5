import { ShoveoffGenerators } from "./_types";

const shoveoffGenerators: ShoveoffGenerators = {
  findaffected: {
    type: "walker",
    start: "selectpushpoint",
    dirs: "ortho",
    draw: {
      last: {
        condition: { same: [["walklength"], 3] },
        unlessover: "oppunits",
        tolayer: "targetedgepoints",
        include: { dir: { reldir: [["dir"], 5] } }
      }
    }
  },
  findresults: {
    type: "walker",
    starts: "targetedgepoints",
    dir: { read: ["targetedgepoints", ["start"], "dir"] },
    startasstep: true,
    draw: {
      start: {
        tolayer: {
          ifelse: [
            { same: [["dir"], 1] },
            "squishsouth",
            {
              ifelse: [
                { same: [["dir"], 3] },
                "squishwest",
                {
                  ifelse: [{ same: [["dir"], 5] }, "squishnorth", "squisheast"]
                }
              ]
            }
          ]
        }
      },
      steps: {
        condition: { different: [["step"], 1] },
        tolayer: {
          ifelse: [
            { same: [["dir"], 1] },
            "pushsouth",
            {
              ifelse: [
                { same: [["dir"], 3] },
                "pushwest",
                { ifelse: [{ same: [["dir"], 5] }, "pushnorth", "pusheast"] }
              ]
            }
          ]
        }
      },
      last: {
        tolayer: {
          ifelse: [
            { same: [["dir"], 1] },
            "spawnsouth",
            {
              ifelse: [
                { same: [["dir"], 3] },
                "spawnwest",
                { ifelse: [{ same: [["dir"], 5] }, "spawnnorth", "spawneast"] }
              ]
            }
          ]
        }
      }
    }
  },
  findfourinarow: {
    type: "walker",
    dirs: "rose",
    starts: "myunits",
    steps: "myunits",
    startasstep: true,
    draw: {
      steps: { condition: { same: [["walklength"], 4] }, tolayer: "fourinarow" }
    }
  }
};

export default shoveoffGenerators;
