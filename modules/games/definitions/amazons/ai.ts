// AI is not yet reimplemented in the new engine. Never mind this file, for now! :)

import { AmazonsAI } from "./_types";

const amazonsAI: AmazonsAI = {
  generators: {
    findroads: {
      type: "neighbour",
      dirs: "rose",
      starts: "amazons",
      unlessover: "units",
      draw: {
        start: {
          tolayer: {
            ifelse: [{ anyat: ["myunits", ["start"]] }, "myroads", "opproads"]
          },
          include: { count: ["neighbourcount"] }
        }
      }
    },
    findreach: {
      type: "walker",
      dirs: "rose",
      starts: "amazons",
      blocks: "units",
      draw: {
        steps: {
          tolayer: {
            ifelse: [{ anyat: ["myunits", ["start"]] }, "myreach", "oppreach"]
          }
        }
      }
    }
  },
  aspects: {
    myroads: { harvest: ["myroads", "count"] },
    mydomain: { sizeof: "myreach" },
    opproads: { harvest: ["opproads", "count"] },
    oppdomain: { sizeof: "oppreach" }
  },
  brains: {
    Steve: {
      generators: ["findroads", "findreach"],
      plus: { myroads: 1, mydomain: 1 },
      minus: { opproads: 1, oppdomain: 1 }
    }
  }
};

export default amazonsAI;
