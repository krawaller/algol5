export default function templateGenerators(gameId: string) {
  const capId = gameId[0].toUpperCase().concat(gameId.slice(1));
  return `// Here you define the generators (artifact creators) for your game. 
// The type analyser will look at this file to see what generators are available,
// and also what artifact layers there are. When you add/remove a generator or
// change the names of the layers you draw to, rerun the type analyser!

import { ${capId}Generators } from './_types';

const ${gameId}Generators: ${capId}Generators = {

};

export default ${gameId}Generators;
`;
}
