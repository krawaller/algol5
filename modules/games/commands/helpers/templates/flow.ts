export default function templateFlow(gameId) {
  const capId = gameId[0].toUpperCase().concat(gameId.slice(1));
  return `import { ${capId}Flow } from './_types';

const ${gameId}Flow: ${capId}Flow = {
  startTurn: {

  },
  commands: {

  },
  marks: {

  }
};

export default ${gameId}Flow;
`;
}
