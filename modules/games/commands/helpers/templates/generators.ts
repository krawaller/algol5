export default function templateGenerators(gameId: string) {
  const capId = gameId[0].toUpperCase().concat(gameId.slice(1));
  return `import { ${capId}Generators } from './_types';

const ${gameId}Generators: ${capId}Generators = {

};

export default ${gameId}Generators;
`;
}
