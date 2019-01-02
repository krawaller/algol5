import {Graphics} from '../../types';
import { MurusgallicusadvancedTerrain, MurusgallicusadvancedUnit } from './_types';

const murusgallicusadvancedGraphics: Graphics<MurusgallicusadvancedTerrain, MurusgallicusadvancedUnit> = {
  tiles: {
    homerow: "playercolour"
  },
  icons: {
    towers: "rook",
    walls: "pawn",
    catapults: "queen"
  }
};

export default murusgallicusadvancedGraphics;
