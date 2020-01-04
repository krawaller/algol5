import { AlgolHydratedDemo, AlgolBattleUI } from "../../types";
import { emptyBattleUI, emptyAnim } from "../empty";

export function demo2ui(demo: AlgolHydratedDemo, frame: number): AlgolBattleUI {
  return {
    ...emptyBattleUI,
    board: {
      anim: {
        ...emptyAnim,
        ...demo.anims[frame],
      },
      marks: [],
      potentialMarks: [],
      units: demo.positions[frame],
    },
  };
}
