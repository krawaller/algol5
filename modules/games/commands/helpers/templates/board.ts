import { typeSignature } from "../../../../types";

export default function templateBoard(gameId) {
  const bsig = typeSignature("Board", gameId);
  return `import {Board} from '../../../types';
import { ${bsig} } from './_types';

const ${gameId}Board: Board<${bsig}> = {
  height: 666,
  width: 666,
  terrain: {

  }
};

export default ${gameId}Board;
`;
}
