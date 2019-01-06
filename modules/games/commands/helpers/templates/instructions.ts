import { typeSignature } from "../../../../types";

export default function templateInstructions(gameId) {
  const isig = typeSignature("Instructions", gameId);
  return `import {Instructions} from '../../../types';
import { ${isig} } from './_types';

const ${gameId}Instructions: Instructions<${isig}> = {

};

export default ${gameId}Instructions;
`;
}
