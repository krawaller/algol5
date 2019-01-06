import {Graphics} from '../../../types';
import { _testTerrain, _testUnit } from './_types';

const _testGraphics: Graphics<_testTerrain, _testUnit> = {
  icons: {
    stepsfirsts: "queen",
    blocksfirsts: "queen",
    defaultfirsts: "queen",
    noblocks: "queen",
    pawns: "pawn"
  },
  tiles: {
    steps: "grass"
  }
};

export default _testGraphics;
