import { resumeDemo } from "./resumeDemo";
import { testCreator } from "../../../testUtils";
import { GameId } from "../../../../games/dist/list";

testCreator(resumeDemo, [
  {
    description: "Resuming a demo sets playing to true",
    previous: {
      demo: {
        demos: {
          amazons: {
            positions: [{}, {}, {}],
            anims: {},
            frame: 1,
            inflated: true,
            playId: 666,
          },
        },
      },
    },
    payload: {
      gameId: "amazons" as GameId,
    },
    expected: {
      demo: {
        demos: {
          amazons: {
            positions: [{}, {}, {}],
            anims: {},
            frame: 1,
            inflated: true,
            playId: 666,
            playing: true,
          },
        },
      },
    },
  },
]);
