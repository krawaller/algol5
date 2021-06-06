import { useCallback, useEffect, useRef } from "react";

export function useIsMounted() {
  const ref = useRef(true);
  useEffect(() => {
    return () => {
      ref.current = false;
    };
  }, []);
  return useCallback(() => ref.current, []);
}
