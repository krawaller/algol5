// Here you define the generators (artifact creators) for your game.
// The type analyser will look at this file to see what generators are available,
// and also what artifact layers there are. When you add/remove a generator or
// change the names of the layers you draw to, rerun the type analyser!

import { TrafficlightsGenerators } from "./_types";

const trafficlightsGenerators: TrafficlightsGenerators = {
  findlines: {
    type: "walker",
    dirs: [1, 2, 3, 4],
    starts: "units",
    steps: { groupat: ["start"] },
    startasstep: true,
    draw: {
      steps: { condition: { morethan: [["walklength"], 2] }, tolayer: "line" },
    },
  },
};

export default trafficlightsGenerators;
