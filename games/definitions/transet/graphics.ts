import {Graphics} from '../../types';
import { TransetTerrain, TransetUnit } from './_types';

const transetGraphics: Graphics<TransetTerrain, TransetUnit> = {
  icons: {
    pinets: "pawn",
    piokers: "bishop",
    piases: "king"
  },
  tiles: {
    base: "playercolour"
  }
};

export default transetGraphics;
