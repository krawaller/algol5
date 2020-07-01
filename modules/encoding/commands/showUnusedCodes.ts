import { codes } from "../src/sprites/sprite.codes";

const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lower = "abcdefghijklmnopqrstuvwxyz";
const digits = "0123456789";
const control = "_()[]{}-,.;:'*+?!%&/=<>";
const FORBIDDEN = "#€";

const all = upper + lower + digits + control;

const unused = all
  .split("")
  .filter(c => !codes[c])
  .join(" ");

console.log("Unused single char codes:", unused);
