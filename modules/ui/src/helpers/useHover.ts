import { useState, useRef, useEffect } from "react";

// Adapted from https://usehooks.com/useHover/

export const useHover = <E extends HTMLElement>() => {
  const [value, setValue] = useState(false);

  const ref = useRef<E>(null);

  useEffect(
    () => {
      const node = ref.current;
      if (node) {
        const handleMouseOver = () => setValue(true);
        const handleMouseOut = () => setValue(false);

        node.addEventListener("mouseover", handleMouseOver);
        node.addEventListener("mouseout", handleMouseOut);

        return () => {
          node.removeEventListener("mouseover", handleMouseOver);
          node.removeEventListener("mouseout", handleMouseOut);
        };
      }
    },
    [ref.current] // Recall only if ref changes
  );

  return [ref, value] as const;
};
