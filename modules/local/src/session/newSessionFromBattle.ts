import { AlgolBattle, AlgolLocalBattle } from "../../../types";
import { stringifyPath } from "./stringifySession/stringifyPath";

const letters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const randomLetter = () => letters[Math.floor(Math.random() * letters.length)];

export function newSessionFromBattle(battle: AlgolBattle): AlgolLocalBattle {
  return {
    // TODO - make ID generation more robust
    id: `L${randomLetter()}${randomLetter()}${randomLetter()}`,
    created: Date.now(),
    type: "normal",
    player: 1,
    turn: 1,
    path: stringifyPath([], 0),
    screenshot: {
      marks: [],
      units: battle.state.board.units,
    },
  };
}
