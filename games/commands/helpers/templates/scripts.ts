import { typeSignature } from "../../../../types";

export default function templateScripts(gameId) {
  return `import {GameTestSuite} from '../../../types';

const ${gameId}Tests: GameTestSuite = {

};

export default ${gameId}Tests;
`;
}
