export default function templateFlow(gameId: string) {
  const capId = gameId[0].toUpperCase().concat(gameId.slice(1));
  return `import { ${capId}Definition } from './_types';

const ${gameId}Flow: ${capId}Definition['flow'] = {
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
