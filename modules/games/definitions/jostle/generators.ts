import { JostleGenerators } from './_types';

const jostleGenerators: JostleGenerators = {
  findinitial: {
    type: "neighbour",
    dirs: ["ortho"],
    start: "selectunit",
    draw: {
      neighbours: {
        tolayer: {
          ifelse: [
            { noneat: ["units", ["target"]] },
            "movetargets",
            {
              ifelse: [
                { anyat: ["oppunits", ["target"]] },
                "initialenemy",
                "initialfriend"
              ]
            }
          ]
        }
      }
    }
  },
  findnew: {
    type: "neighbour",
    dirs: ["ortho"],
    start: "selectmovetarget",
    ifover: "units",
    draw: {
      neighbours: {
        tolayer: {
          ifelse: [{ anyat: ["oppunits", ["target"]] }, "newenemy", "newfriend"]
        }
      }
    }
  }
};

export default jostleGenerators;
