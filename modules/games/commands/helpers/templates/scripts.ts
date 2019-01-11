export default function templateScripts(gameId) {
  const capId = gameId[0].toUpperCase().concat(gameId.slice(1));
  return `import { ${capId}Scripts } from './_types';

const ${gameId}Scripts: ${capId}Scripts = {

};

export default ${gameId}Scripts;
`;
}
