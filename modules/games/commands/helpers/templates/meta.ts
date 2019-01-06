import { typeSignature } from "../../../../types";

export default function templateMeta(gameId) {
  return `import {Meta} from '../../../types';

const ${gameId}Meta: Meta = {
  id: "${gameId}",
  name: "",
  tags: [],
  tagline: "",
};

export default ${gameId}Meta;
`;
}
