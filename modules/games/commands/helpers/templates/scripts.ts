export default function templateScripts(gameId: string) {
  const capId = gameId[0].toUpperCase().concat(gameId.slice(1));
  return `import { ${capId}Definition } from './_types';

const ${gameId}Scripts: ${capId}Definition['scripts'] = {

};

export default ${gameId}Scripts;
`;
}
