import * as isArray from 'lodash/isArray';

import { Definition } from '../types';
import makeParser from './';

export default function parseContent(gameDef: Definition, player: 1 | 2, action: string, expression, from){
  const parse = makeParser(gameDef, player, action, "id");
  const usedIcons = Object.keys(gameDef.graphics.icons)
    .reduce((mem,g) => mem.concat(gameDef.graphics.icons[g]).concat(gameDef.graphics.icons[g]+'s'), []);
  if (typeof expression === 'string'){
    if (gameDef.commands[expression] || expression === 'endturn'){
      return parse.content(['cmnd',expression]);
    } else if (gameDef.marks[expression]){
      return parse.content(['pos',expression]);
    } else if (usedIcons.indexOf(expression) !== -1) {
      return parse.content(['unitname',expression]);
    } else {
      return parse.content(['text',expression]);
    }
  } else if (typeof expression === 'number'){
    return parse.content(['text',expression]);
  } else if (!isArray(expression)){
    console.log("WEIRD",expression);
    throw "Weird content expression format: " + expression;
  }
  const [type, ...args] = expression;
  switch(type){
    case "if": {
      const [cond,then] = args;
      return `${parse.bool(cond)} ? ${parse.content(then)} : {type:'nothing'}`;
    }
    case "line": {
      return `collapseLine({
        type: 'line',
        content: [${ args.map(p => parse.content(p)).join(', ') }]
      })`;
    }
    case "text": {
      const [text] = args;
      return `{type:'text',text:${parse.value(text)}}`;
    }
    case "pos": {
      const [pos] = args;
      return `{type:'posref',pos:${parse.pos(pos)}}`;
    }
    case "player": {
      const [plr] = args;
      return `{type:'playerref',player:${parse.val(plr)}}`;
    }
    case "cmnd": {
      const [cmnd,alias] = args;
      if (alias){
        return `{type:'cmndref',cmnd:${parse.val(cmnd)},alias:${parse.val(alias)}}`;
      } else {
        return `{type:'cmndref',cmnd:${parse.val(cmnd)}}`;
      }
    }
    case "orlist": {
      return `[${args.map(([cond,content]) => `{cond: ${parse.bool(cond)}, content: ${parse.content(content)}}`)}].filter(function(elem){
        return elem.cond;
      }).reduce(function(mem, elem, n, list){
        mem.content.push(elem.content);
        if (n === list.length - 2){
          mem.content.push("or");
        } else if (n < list.length - 2){
          mem.content.push(",");
        }
        return mem;
      },{type:"line",content:[]})
      `
    }
    case "pluralise": {
      const [num,sing,plur] = args;
      return `{
        type: "line",
        content: [{type:"text",text: ${parse.val(num)}}, ${parse.val(num)} === 1 ? ${parse.content(sing)} : ${parse.content(plur)}]
      }`;
    }
    case "tile": {
      const [type, alias] = args;
      return `{
        type: "tileref",
        name: ${parse.val(type)}
        alias: ${parse.val(alias || type)}
      }`
    }
    case "unitname": {
      const [name] = args;
      return `{
        type: "unittyperef",
        alias: ${parse.val(name)},
        name: ${parse.val(name)}.replace(/s$/,'')
      }`
    }
    case "unitnameat": {
      const [pos] = args;
      return `{
        type: "unittyperef",
        name: game.graphics.icons[${parse.val(["read","units",pos,"group"])}]
      }`
    }
    default:
      try {
        return `{
          type: 'text',
          text: ${parse.val(expression)}
        }`
      } catch(e){
         return parse.content(["line", ...expression]);
      }
  }
}
