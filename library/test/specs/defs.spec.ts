import * as ts from "typescript";

import * as test from "tape";

import * as fs from 'fs';

let master = ``;
let usage = 'let concat = "wohoo"';

const filenames = fs.readdirSync(__dirname+"/../../defs").filter(f => f != '.DS_Store');

let games = filenames.map(gamename=>{
  const code = fs.readFileSync(__dirname+"/../../defs/"+gamename);
  const file = `
  /* File generated from JSON to check types. Don't fix errors in this file, go to the JSON! */

  import {Definition} from '../../../types';
  let game: Definition = ${code};
  export default game;
  `;
  master += `
  import ${gamename.replace('.json','')} from './${gamename.replace('.json','')}';`;
  usage += ` + ${gamename.replace('.json','')}.meta.gameid `;
  fs.writeFileSync(__dirname + '/../bogus/' + gamename.replace('.json','.ts'), file);
});

fs.writeFileSync(__dirname + '/../bogus/index.ts', master + `
  ${usage};
  console.log(concat);
`);

const compilerOptions: ts.CompilerOptions = {
  alwaysStrict: true,
  allowUnusedLabels: false,
  noUnusedLocals: true,
};

const program = ts.createProgram([__dirname + '/../bogus/index.ts'], compilerOptions);
const errors = program.getSemanticDiagnostics().reduce((mem,err) => ({
  ...mem,
  [err.file.fileName.split('/')[err.file.fileName.split('/').length-1].replace('.ts','.json')]: true
}), {});

test("The definition files match the type def", t => {
  filenames.forEach(file => {
    t.ok(!errors[file], "There were no type errors in " + file);
  });
  t.end();
});
