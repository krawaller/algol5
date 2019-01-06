import {Graphics} from '../../../types';
import { GogolTerrain, GogolUnit } from './_types';

const gogolGraphics: Graphics<GogolTerrain, GogolUnit> = {
  tiles: {
    homerow: "playercolour"
  },
  icons: {
    kings: "king",
    soldiers: "pawn"
  }
};

export default gogolGraphics;
