import { useEffect, useReducer, useMemo } from "react";
import { data } from "../../../../payloads/dist/titleData";

const list = data.filter(
  entry =>
    entry.graphics.boards["basic"].height ===
    entry.graphics.boards["basic"].width
);

const indexReducer = (state: number, action: string) => {
  if (action === "inc") return state === list.length - 1 ? 0 : state + 1;
  if (action === "dec") return state === 0 ? list.length - 1 : state - 1;
  return state;
};

const pauseReducer = (state: boolean, action: string) => {
  if (action === "play") return false;
  if (action === "pause") return true;
  if (action === "toggle") return !state;
  return state;
};

export const useTitleData = () => {
  const [index, dispatchIndex] = useReducer(indexReducer, 0);
  const [pause, dispatchPause] = useReducer(pauseReducer, true);
  let interval: ReturnType<typeof setInterval>;
  useEffect(() => {
    if (!pause) {
      interval = setInterval(() => dispatchIndex("inc"), 2500);
      return () => clearInterval(interval);
    }
  }, [pause]);
  const actions = useMemo(
    () => ({
      inc: () => dispatchIndex("inc"),
      dec: () => dispatchIndex("dec"),
      play: () => dispatchPause("play"),
      pause: () => dispatchPause("pause"),
    }),
    []
  );
  return {
    titleData: list[index],
    actions,
  };
};
