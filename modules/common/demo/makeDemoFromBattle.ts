import * as jdp from "jsondiffpatch";
import { AlgolDemo, AlgolBattle, AlgolAnimCompiled } from "../../types";

export function makeDemoFromBattle(battle: AlgolBattle): AlgolDemo {
  const patches: AlgolDemo["patches"] = [];
  const anims: { [idx: string]: Partial<AlgolAnimCompiled> } = {};
  const [firstFrame, ...frames] = battle.history;
  const initial = firstFrame.board.units;
  let current = initial;
  while (frames.length) {
    const frame = frames.shift();
    const diff = jdp.diff(current, frame.board.units) as AlgolDemo["patches"];
    if (diff) {
      patches.push(diff);
      const newAnim: AlgolAnimCompiled = frame.board.anim || {
          enterFrom: {},
          exitTo: {},
          ghosts: [],
        },
        anim: Partial<AlgolAnimCompiled> = {};
      if (newAnim.ghosts.length) {
        anim.ghosts = newAnim.ghosts;
      }
      if (Object.keys(newAnim.enterFrom).length) {
        anim.enterFrom = newAnim.enterFrom;
      }
      if (Object.keys(newAnim.exitTo).length) {
        anim.exitTo = newAnim.exitTo;
      }
      if (Object.keys(anim).length) {
        anims[patches.length] = anim;
      }
    }
    current = frame.board.units;
  }
  const demo: AlgolDemo = { initial, anims, patches };
  if (battle.gameEndedBy) {
    demo.endHighlight = battle.state.board.marks;
  }
  return demo;
}
