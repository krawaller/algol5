export default function templatePerformance(gameId: string) {
  const capId = gameId[0].toUpperCase().concat(gameId.slice(1));
  return `import { ${capId}Performance } from './_types';

const ${gameId}Performance: ${capId}Performance = {
  canAlwaysEnd: {}
};

export default ${gameId}Performance;
`;
}
