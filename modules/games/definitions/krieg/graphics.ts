import {Graphics} from '../../../types';
import { KriegTerrain, KriegUnit } from './_types';

const kriegGraphics: Graphics<KriegTerrain, KriegUnit> = {
  tiles: {
    corners: "playercolour",
    bases: "castle"
  },
  icons: {
    notfrozens: "knight",
    frozens: "rook"
  }
};

export default kriegGraphics;
