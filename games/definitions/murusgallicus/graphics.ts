import {Graphics} from '../../types';
import { MurusgallicusTerrain, MurusgallicusUnit } from './_types';

const murusgallicusGraphics: Graphics<MurusgallicusTerrain, MurusgallicusUnit> = {
  tiles: {
    homerow: "playercolour"
  },
  icons: {
    towers: "rook",
    walls: "pawn"
  }
};

export default murusgallicusGraphics;
