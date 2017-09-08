import * as isObject from 'lodash/isObject';
import * as isArray from 'lodash/isArray';
import * as isEqual from 'lodash/isEqual';
import * as some from 'lodash/some';

import {Definition} from './types';

export function ifCodeContains(code: string, lines: {[needle: string]: string}) {
  return Object.keys(lines).reduce((mem,needle) => code.match(needle) ? mem + ' ' + lines[needle] : mem, '');
}

export function getTerrain(gameDef: Definition) {
  return Object.assign({},
    gameDef && gameDef.board && gameDef.board.terrain || {},
    gameDef && gameDef.AI && gameDef.AI.terrain || {}
  );
}

export function isTerrainNeutral(gameDef: Definition) {
  return !(
    Object.keys(getTerrain(gameDef)).filter(t=> t[1] || t[2]).length
  );
}

export function contains(haystack,needle): boolean {
  if (isEqual(needle,haystack)){
    return true;
  } else if (isArray(haystack) || isObject(haystack)){
    return some(haystack,child=> contains(child,needle));
  } else {
    return false;
  }
}

export function usesTurnVars(search: Definition | any): boolean {
  return contains(search,'turnvar') || contains(search,'turnpos') || contains(search,'setturnvar') || contains(search,'setturnpos');
}
