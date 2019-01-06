import {Graphics} from '../../../types';
import { GowiththefloeTerrain, GowiththefloeUnit } from './_types';

const gowiththefloeGraphics: Graphics<GowiththefloeTerrain, GowiththefloeUnit> = {
  tiles: {
    water: "water"
  },
  icons: {
    seals: "queen",
    bears: "queen",
    holes: "pawn"
  }
};

export default gowiththefloeGraphics;
