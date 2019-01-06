import { typeSignature } from "../../../../types";

export default function templateSetup(gameId) {
  const ssig = typeSignature("Setup", gameId);
  return `import {Setup} from '../../../types';
import { ${ssig} } from './_types';

const ${gameId}Setup: Setup<${ssig}> = {

};

export default ${gameId}Setup;
`;
}
