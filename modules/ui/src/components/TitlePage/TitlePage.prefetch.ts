import { useRef, useEffect } from "react";
import { list } from "../../../../games/dist/list";
import { PageActions } from "../../helpers";

export const usePrefetchGames = (actions: PageActions) => {
  const interval = useRef<ReturnType<typeof setInterval> | null>(null);
  const gameIdx = useRef<number>(0);
  useEffect(() => {
    interval.current = setInterval(() => {
      actions.prefetch(`/games/${list[gameIdx.current]}`);
      gameIdx.current++;
      if (gameIdx.current >= list.length) {
        clearInterval(interval.current!);
      }
    }, 100);
    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    };
  }, []);
};
