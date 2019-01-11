import { typeSignature } from "../../../../types";

export default function templateSetup(gameId) {
  const capId = gameId[0].toUpperCase().concat(gameId.slice(1));
  return `import { ${capId}Setup } from './_types';

const ${gameId}Setup: ${capId}Setup = {

};

export default ${gameId}Setup;
`;
}
