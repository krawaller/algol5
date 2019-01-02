import {Board} from '../../types';
import { GowiththefloeTerrain } from './_types';

const gowiththefloeBoard: Board<GowiththefloeTerrain> = {
  height: 8,
  width: 8,
  terrain: {
    water: ["a1", "a2", "a7", "a8", "b1", "b8", "g1", "g8", "h1", "h2", "h7", "h8"]
  }
};

export default gowiththefloeBoard;
