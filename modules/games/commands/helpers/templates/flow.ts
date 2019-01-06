import { typeSignature } from "../../../../types";

export default function templateFlow(gameId) {
  const fsig = typeSignature("Flow", gameId);
  return `import {Flow} from '../../../types';
import { ${fsig} } from './_types';

const ${gameId}Flow: Flow<${fsig}> = {
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
