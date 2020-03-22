import { useState, useEffect, useCallback, useRef } from "react";

// https://usehooks.com/useWindowSize/

export function useWindowSize() {
  const isClient = typeof window === "object";

  const getSize = useCallback(
    () => ({
      width: isClient ? window.innerWidth : 0,
      height: isClient ? window.innerHeight : 0,
    }),
    [isClient]
  );

  const [windowSize, setWindowSize] = useState(getSize());
  const timeoutRef = useRef(false);
  const sizeRef = useRef(getSize());

  useEffect(() => {
    if (!isClient) return;

    function handleResize() {
      sizeRef.current = getSize();
      if (!timeoutRef.current) {
        timeoutRef.current = !setTimeout(() => {
          timeoutRef.current = false;
          setWindowSize(sizeRef.current);
        }, 50);
      } else {
        setWindowSize(sizeRef.current);
      }
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
}

export default useWindowSize;
