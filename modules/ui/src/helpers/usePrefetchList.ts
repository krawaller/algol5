import { useRef, useEffect } from "react";
import { AppActions } from "./appActions";

export const usePrefetchList = (actions: AppActions, urls: string[]) => {
  const interval = useRef<ReturnType<typeof setInterval> | null>(null);
  const idx = useRef<number>(0);
  useEffect(() => {
    interval.current = setInterval(() => {
      actions.prefetch(urls[idx.current]);
      idx.current++;
      if (idx.current >= urls.length) {
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
