
import { Definition } from '../types';
import * as isNumber from 'lodash/isNumber';
import * as map from 'lodash/map';
import lib from '../../logic/';

// TODO - targetLayerPredefined never ever used?

export default function draw(gameDef: Definition, player: 1 | 2, action, drawDef, posVar = 'POS', targetLayerPredefined ?:boolean){
  if (!drawDef) return '';
  const O = {rules: gameDef, player, action};
  let conds = [];
  if (drawDef.condition) conds.push(lib.boolean(O,drawDef.condition));
  if (drawDef.unlessover) conds.push( `!${lib.set(O,drawDef.unlessover)}[${posVar}]` );
  if (drawDef.ifover) conds.push( `${lib.set(O,drawDef.unlessover)}[${posVar}]` );
  let artifactLiteral = `{${map(drawDef.include,(valdef,key)=> `${key}: ${lib.value(O,valdef)}`).join(', ')}}`;
  let body;
  if (drawDef.include && drawDef.include.owner){ // if artifact has owner it must be added to more than one layer
    let prefix, owner = lib.value(O,drawDef.include.owner);
    if (owner === 0) {
      prefix = '"neutral"';
    } else if (owner === player) {
      prefix = '"my"';
    } else if (isNumber(owner)) {
      prefix = '"opp"';
    } else {
      prefix = 'ownernames[artifact.owner]'
    }
    body = `
      ${!targetLayerPredefined ? `var targetlayername=${lib.value(O,drawDef.tolayer)};` : ''}
      var artifact=${artifactLiteral};
      ARTIFACTS[targetlayername][${posVar}]=artifact;
      ARTIFACTS[${prefix} + targetlayername][${posVar}]=artifact;
    `;
  } else {
    body = `
      ARTIFACTS[${targetLayerPredefined ? 'targetlayername' : lib.value(O,drawDef.tolayer)}][${posVar}]=${artifactLiteral};
    `;
  }
  if (conds.length){
    return `
      if (${conds.join(' && ')}) {
        ${body}
      }
    `;
  } else {
    return body;
  }
}
