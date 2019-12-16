import React, { useEffect, useState, useMemo, memo } from "react";
import { AlgolDemo } from "../../../types";
import { GameId } from "../../../games/dist/list";
import { makeStore } from "../../../redux/store";
import {
  AlgolGameDemoState,
  stopAllDemos,
  stopDemo,
  stepDemo,
} from "../../../redux/slices";
import { playDemo } from "../../../redux/slices/demo/thunks/playDemo";
import { Board } from "../Board";
import dataURIs from "../../../graphics/dist/svgDataURIs";
import { emptyAnim } from "../../../common";

type DemoProps = {
  gameId: GameId;
  demo: AlgolDemo;
};

const noop = () => {};
const EMPTYARR = (Object.freeze([]) as unknown) as any[];

export const Demo = memo((props: DemoProps) => {
  const { gameId, demo } = props;
  const [gameDemoState, setGameDemoState] = useState<null | AlgolGameDemoState>(
    null
  );
  const {
    store,
    handleStart,
    handleStop,
    handleStepForward,
    handleStepBackward,
  } = useMemo(() => {
    const store = makeStore();
    const handleStart = () => store.dispatch(playDemo(gameId, demo));
    const handleStop = () => {
      store.dispatch(stopDemo({ gameId }));
    };
    const handleStepForward = () => {
      store.dispatch(stepDemo({ gameId, force: true }));
    };
    const handleStepBackward = () => {
      store.dispatch(stepDemo({ gameId, force: true, offset: -1 }));
    };
    return {
      store,
      handleStart,
      handleStop,
      handleStepForward,
      handleStepBackward,
    };
  }, [gameId]);

  useEffect(() => {
    store.subscribe(() =>
      setGameDemoState(store.getState().demo.demos[gameId]!)
    );
    store.dispatch(playDemo(gameId, demo));
    return () => {
      store.dispatch(stopAllDemos());
    };
  }, [gameId]);
  if (!gameDemoState) return null;
  return (
    <React.Fragment>
      <Board
        board={dataURIs[gameId]}
        marks={EMPTYARR}
        potentialMarks={EMPTYARR}
        callback={noop}
        units={gameDemoState.positions[gameDemoState.frame]}
        anim={{ ...emptyAnim, ...gameDemoState.anims[gameDemoState.frame] }}
      />
      <p>Frame {gameDemoState.frame}</p>
      <button onClick={handleStart} disabled={!!gameDemoState.playing}>
        start
      </button>
      <button onClick={handleStop} disabled={!gameDemoState.playing}>
        stop
      </button>
      <button onClick={handleStepForward}>step forward</button>
      <button onClick={handleStepBackward}>step backward</button>
    </React.Fragment>
  );
});
