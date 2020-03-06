export default function templatePerformance(gameId: string) {
  const capId = gameId[0].toUpperCase().concat(gameId.slice(1));
  return `import { ${capId}Definition } from './_types';

const ${gameId}Performance: ${capId}Definition['performance'] = {
  canAlwaysEnd: {},
  massiveTree: {},
  noEndGameCheck: []
};

export default ${gameId}Performance;
`;
}
