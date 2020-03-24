import { useState, useRef, useEffect } from "react";
import { useWindowSize } from "./useWindowSize";

export const useBoundingBox = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { height, width } = useWindowSize();
  const [bbox, setBbox] = useState({ height: 0, width: 0 });
  useEffect(() => {
    if (ref.current) {
      setBbox(ref.current.getBoundingClientRect());
    }
  }, [height, width, ref.current]);
  return [bbox, ref] as const;
};

export default useBoundingBox;
