import { typeSignature } from "../../../../types";

export default function templateGenerators(gameId) {
  const gensig = typeSignature("Generators", gameId);
  return `import {Generators} from '../../../types';
import { ${gensig} } from './_types';

const ${gameId}Generators: Generators<${gensig}> = {

};

export default ${gameId}Generators;
`;
}
