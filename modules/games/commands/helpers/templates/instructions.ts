export default function templateInstructions(gameId) {
  const capId = gameId[0].toUpperCase().concat(gameId.slice(1));
  return `import { ${capId}Instructions } from './_types';

const ${gameId}Instructions: ${capId}Instructions = {

};

export default ${gameId}Instructions;
`;
}
