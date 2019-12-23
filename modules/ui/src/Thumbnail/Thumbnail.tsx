import React, { FunctionComponent, useState, useEffect, useRef } from "react";
import {
  AlgolDemo,
  AlgolHydratedDemo,
  AlgolGameGraphics,
} from "../../../types";
import { inflateDemo, emptyAnim } from "../../../common";
import { Board } from "../Board";
import { GameId } from "../../../games/dist/list";
import { useInView } from "react-intersection-observer";

const THUMBNAIL_HEIGHT_PX = 120;
const FRAME_LENGTH_MS = 1500;

type ThumbnailProps = {
  demo: AlgolDemo;
  gameId: GameId;
  graphics: AlgolGameGraphics;
};

const EMPTYARR: never[] = [];
const EMPTYOBJ = {};
const noop = () => {};

export const Thumbnail: FunctionComponent<ThumbnailProps> = props => {
  const { demo, graphics, gameId } = props;
  const [count, setCount] = useState(0);
  const [hydrDemo, setHydrDemo] = useState<AlgolHydratedDemo | null>(null);
  const timeout = useRef<null | ReturnType<typeof setTimeout>>();
  const [ref, inView] = useInView({ threshold: 1 });

  // initial hydration
  useEffect(() => {
    setTimeout(() => {
      setHydrDemo(inflateDemo(demo));
    });
  }, [demo]);

  // start/stop
  useEffect(() => {
    if (!inView) {
      if (timeout.current) {
        clearTimeout(timeout.current);
        timeout.current = null;
      }
    } else if (hydrDemo) {
      if (!timeout.current) {
        timeout.current = setTimeout(() => {
          timeout.current = null;
          setCount(cur => cur + 1);
        }, FRAME_LENGTH_MS);
      }
    }
  }, [hydrDemo, inView, count]);

  const frame = hydrDemo ? count % hydrDemo.positions.length : 0;

  return (
    <div
      ref={ref}
      style={{
        width:
          THUMBNAIL_HEIGHT_PX * ((graphics.width + 1) / (graphics.height + 1)),
        height: THUMBNAIL_HEIGHT_PX,
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
