import { Definition } from '../types';
import { blankUnitLayers, isTerrainLayerRef } from '../utils';
import value from './value';
import * as isArray from 'lodash/isArray';

export default function layerRef(gameDef: Definition, player: 1 | 2, action: string, layername){
  if (isArray(layername)){
    layername = value(gameDef, player, action, layername);
  }
  var bag = {board:1,light:1,dark:1}[layername] ? "BOARD"
    : blankUnitLayers(gameDef)[layername] ? "UNITLAYERS"
    : isTerrainLayerRef(gameDef,layername) ? "TERRAIN"
    : "ARTIFACTS"
  return layername[0].match(/[a-z]/) ? bag+"."+layername : bag+"["+layername+"]"; // TODO - what is this last bit?
}
