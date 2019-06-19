import React, { useEffect, useState } from "react";
import { AlgolDemo } from "../../../types";
import { GameId } from "../../../games/dist/list";
import { makeStore } from "../../../redux/store";
import { AlgolGameDemoState, stopAllDemos } from "../../../redux/slices";
import { playDemo } from "../../../redux/slices/demo/thunks/playDemo";
import { Board } from "../Board";
import dataURIs from "../../../graphics/dist/svgDataURIs";
import { emptyAnim } from "../../../common";

type DemoProps = {
  gameId: GameId;
  demo: AlgolDemo;
};

export const Demo = (props: DemoProps) => {
  const { gameId, demo } = props;
  const [gameDemoState, setGameDemoState] = useState<null | AlgolGameDemoState>(
    null
  );
  useEffect(() => {
    const store = makeStore();
    store.subscribe(() =>
      setGameDemoState(store.getState().demo.demos[gameId]!)
    );
    store.dispatch(playDemo(gameId, demo));
    return () => {
      store.dispatch(stopAllDemos());
    };
  }, [gameId]);
  if (!gameDemoState) return null;
  console.log(gameDemoState);
  return (
    <Board
      board={dataURIs[gameId]}
      marks={[]}
      potentialMarks={[]}
      callback={() => {}}
      units={gameDemoState.positions[gameDemoState.frame]}
      anim={{ ...emptyAnim, ...gameDemoState.anims[gameDemoState.frame] }}
    />
  );
};
