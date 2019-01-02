import {Instructions} from '../../types';

const duploInstructions: Instructions = {
  startTurn: ["ifelse", ["morethan", ["turn"], 2], "Select unit to expand from", "Select where to deploy the first of your two initial units"],
  selectdeploy: ["ifelse", ["same", ["sizeof", "myunits"], 1],
    ["line", "Press", "deploy", "to place your second unit at", "selectdeploy"],
    ["line", "Press", "deploy", "to place your first unit at", "selectdeploy"]
  ],
  deploy: ["if", ["same", ["sizeof", "myunits"], 1], "Now select where to deploy your second and last initial unit"],
  selectunit: "Now select which square to expand to",
  selecttarget: ["line", "Press", "expand", "to expand to from ", "selectunit", "to", "selecttarget", ["if", ["anyat", "units", "selecttarget"], "and neutralise the enemy there"]]
};

export default duploInstructions;
