import {Graphics} from '../../../types';
import { SemaphorTerrain, SemaphorUnit } from './_types';

const semaphorGraphics: Graphics<SemaphorTerrain, SemaphorUnit> = {
  icons: {
    kings: "king",
    pawns: "pawn",
    bishops: "bishop"
  },
  tiles: {}
};

export default semaphorGraphics;
