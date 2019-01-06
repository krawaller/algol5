import { typeSignature } from "../../../../types";

export default function templateGraphics(gameId) {
  const gsig = typeSignature("Graphics", gameId);
  return `import {Graphics} from '../../../types';
import { ${gsig} } from './_types';

const ${gameId}Graphics: Graphics<${gsig}> = {
  icons: {

  },
  tiles: {

  }
};

export default ${gameId}Graphics;
`;
}
