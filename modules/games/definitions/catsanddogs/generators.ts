// Here you define the generators (artifact creators) for your game.
// The type analyser will look at this file to see what generators are available,
// and also what artifact layers there are. When you add/remove a generator or
// change the names of the layers you draw to, rerun the type analyser!

import { CatsanddogsDefinition } from "./_types";

const catsanddogsGenerators: CatsanddogsDefinition["generators"] = {
    findforbidden: {
        type: "neighbour",
        dirs: 'ortho',
        starts: 'oppanimals',
        draw: { neighbours: {tolayer: 'forbidden'} },
    },
};

export default catsanddogsGenerators;
