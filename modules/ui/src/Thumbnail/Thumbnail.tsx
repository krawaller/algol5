import React, { FunctionComponent, useState, useEffect, useRef } from "react";
import {
  AlgolDemo,
  AlgolHydratedDemo,
  AlgolGameGraphics,
} from "../../../types";
import { inflateDemo, emptyAnim } from "../../../common";
import { Board } from "../Board";
import { GameId } from "../../../games/dist/list";

type ThumbnailProps = {
  demo: AlgolDemo;
  gameId: GameId;
  playing: boolean;
  graphics: AlgolGameGraphics;
};

const EMPTYARR: never[] = [];
const EMPTYOBJ = {};
const noop = () => {};

export const Thumbnail: FunctionComponent<ThumbnailProps> = props => {
  const { demo, playing, graphics, gameId } = props;
  const [count, setCount] = useState(0);
  const [hydrDemo, setHydrDemo] = useState<AlgolHydratedDemo | null>(null);
  const timeout = useRef<null | ReturnType<typeof setTimeout>>();

  // initial hydration
  useEffect(() => {
    setTimeout(() => {
      setHydrDemo(inflateDemo(demo));
    });
  }, [demo]);

  // start/stop
  useEffect(() => {
    if (!playing) {
      if (timeout.current) {
        clearTimeout(timeout.current);
        timeout.current = null;
      }
    } else if (hydrDemo && playing) {
      if (!timeout.current) {
        timeout.current = setTimeout(() => {
          timeout.current = null;
          setCount(cur => cur + 1);
        }, 1000);
      }
    }
  }, [hydrDemo, playing, count]);

  const frame = hydrDemo ? count % hydrDemo.positions.length : 0;

  const height = 120;
  return (
    <div
      style={{
        width: height * ((graphics.width + 1) / (graphics.height + 1)),
        height,
        position: "relative",
      }}
    >
      <Board
        key={gameId}
        board={graphics}
        marks={EMPTYARR}
        potentialMarks={EMPTYARR}
        callback={noop}
        units={hydrDemo ? hydrDemo.positions[frame] : EMPTYOBJ}
        anim={{ ...emptyAnim, ...(hydrDemo && hydrDemo.anims[frame]) }}
      />
    </div>
  );
};
