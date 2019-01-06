import {Graphics} from '../../../types';
import { UglyduckTerrain, UglyduckUnit } from './_types';

const uglyduckGraphics: Graphics<UglyduckTerrain, UglyduckUnit> = {
  icons: {
    soldiers: "pawn",
    kings: "king"
  },
  tiles: {
    homerow: "playercolour"
  }
};

export default uglyduckGraphics;
