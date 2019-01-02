import {Graphics} from '../../types';
import { KickrunTerrain, KickrunUnit } from './_types';

const kickrunGraphics: Graphics<KickrunTerrain, KickrunUnit> = {
  tiles: {
    corners: "playercolour"
  },
  icons: {
    runners: "bishop",
    sidekickers: "pawn"
  }
};

export default kickrunGraphics;
