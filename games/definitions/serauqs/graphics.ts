import {Graphics} from '../../types';
import { SerauqsTerrain, SerauqsUnit } from './_types';

const serauqsGraphics: Graphics<SerauqsTerrain, SerauqsUnit> = {
  icons: {
    soldiers: "pawn",
    wild: "king"
  },
  tiles: {
    corners: "grass",
    middle: "castle"
  }
};

export default serauqsGraphics;
