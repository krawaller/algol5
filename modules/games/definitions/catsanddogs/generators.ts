// Here you define the generators (artifact creators) for your game.
// The type analyser will look at this file to see what generators are available,
// and also what artifact layers there are. When you add/remove a generator or
// change the names of the layers you draw to, rerun the type analyser!

import { CatsanddogsDefinition } from "./_types";

const catsanddogsGenerators: CatsanddogsDefinition["generators"] = {
    finddroptargets: {
        type: "walker",
        dir: 5,
        starts: { subtract: ["board", "units"] },
        blocks: "animals",
        startasstep: true,
        draw: {
            last: {
                tolayer: "droptargets",
            },
        },
    }
};

export default catsanddogsGenerators;
