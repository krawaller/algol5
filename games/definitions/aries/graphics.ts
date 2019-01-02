import {Graphics} from '../../types';
import { AriesTerrain, AriesUnit } from './_types';

const ariesGraphics: Graphics<AriesTerrain, AriesUnit> = {
  tiles: {
    corner: "playercolour"
  },
  icons: {
    soldiers: "rook"
  }
};

export default ariesGraphics;
