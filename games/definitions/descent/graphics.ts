import {Graphics} from '../../../types';
import { DescentTerrain, DescentUnit } from './_types';

const descentGraphics: Graphics<DescentTerrain, DescentUnit> = {
  icons: {
    pawns: "pawn",
    knights: "knight",
    rooks: "rook"
  },
  tiles: {}
};

export default descentGraphics;
