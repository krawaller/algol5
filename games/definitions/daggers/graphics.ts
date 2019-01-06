import {Graphics} from '../../../types';
import { DaggersTerrain, DaggersUnit } from './_types';

const daggersGraphics: Graphics<DaggersTerrain, DaggersUnit> = {
  tiles: {
    base: "playercolour"
  },
  icons: {
    daggers: "bishop",
    crowns: "king"
  }
};

export default daggersGraphics;
