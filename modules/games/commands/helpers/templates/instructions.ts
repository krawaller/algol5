export default function templateInstructions(gameId: string) {
  const capId = gameId[0].toUpperCase().concat(gameId.slice(1));
  return `import { ${capId}Definition } from './_types';

const ${gameId}Instructions: ${capId}Definition['instructions'] = {
  startTurn: { line: ["Go!"] }
};

export default ${gameId}Instructions;
`;
}
