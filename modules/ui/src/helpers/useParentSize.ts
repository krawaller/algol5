import { useState, useEffect, useRef } from "react";

export function useParentSize() {
  const ref = useRef<HTMLDivElement>(null);
  const parent = ref.current && ref.current.parentElement;
  const getSize = () => {
    const size = parent
      ? { width: parent.offsetWidth, height: parent.offsetHeight }
      : { height: 0, width: 0 };
    console.log("Actually looked at size", size);
    return size;
  };

  const [parentSize, setParentSize] = useState(getSize());
  const timeoutRef = useRef(false);
  const firstRef = useRef(true);
  const sizeRef = useRef(getSize());
  const global = typeof window !== "undefined" ? window : null;

  useEffect(() => {
    if (parent && global) {
      const setter = () => {
        sizeRef.current = getSize();
        console.log("CALLED SETTER!", sizeRef.current);
        if (firstRef.current) {
          firstRef.current = false;
          setParentSize(sizeRef.current);
        } else if (!timeoutRef.current) {
          timeoutRef.current = !setTimeout(() => {
            timeoutRef.current = false;
            console.log("queued call!", sizeRef.current);
            setParentSize(sizeRef.current);
          }, 50);
        } else {
          console.log("updating parent size!", sizeRef.current);
          setParentSize(sizeRef.current);
        }
      };
      global.addEventListener("resize", setter);
      setter();
      console.log("LISTENING TO PARENT!");
      return () => global.removeEventListener("resize", setter);
    }
    console.log("No Parent :/");
  }, [parent, global]);

  return [parentSize, ref] as const;
}

export default useParentSize;
