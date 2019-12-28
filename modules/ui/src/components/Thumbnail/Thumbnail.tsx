import React, { FunctionComponent } from "react";
import { AlgolDemo, AlgolGameGraphics } from "../../../../types";
import { emptyAnim } from "../../../../common";
import { Board } from "../Board";
import { GameId } from "../../../../games/dist/list";
import { useInView } from "react-intersection-observer";

import { useDemo } from "../../helpers";

const THUMBNAIL_HEIGHT_PX = 120;

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
  const [ref, inView] = useInView({ threshold: 1 });
  const { frame, hydrDemo } = useDemo(demo, inView);

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
        graphics={graphics}
        marks={EMPTYARR}
        potentialMarks={EMPTYARR}
        callback={noop}
        units={hydrDemo ? hydrDemo.positions[frame] : EMPTYOBJ}
        anim={{ ...emptyAnim, ...(hydrDemo && hydrDemo.anims[frame]) }}
      />
    </div>
  );
};
