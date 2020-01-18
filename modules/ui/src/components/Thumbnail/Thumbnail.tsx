import React, { FunctionComponent } from "react";
import { AlgolDemo, AlgolGameGraphics } from "../../../../types";
import { emptyAnim } from "../../../../common";
import { Board } from "../Board";
import { GameId } from "../../../../games/dist/list";
import { useInView } from "react-intersection-observer";

import { useDemo } from "../../helpers";

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
  // types for useInView are bogus, hence the "as" casting
  const [ref, inView] = useInView({ threshold: 1 } as {});
  const { frame, hydrDemo } = useDemo({ demo, playing: inView });

  return (
    <div ref={ref}>
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
