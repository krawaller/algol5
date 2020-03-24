import { useState, useEffect, useRef } from "react";

export function useParentSize() {
  const ref = useRef<HTMLDivElement>(null);
  const parent = ref.current && ref.current.parentElement;
  const getSize = () =>
    parent
      ? { width: parent.offsetWidth, height: parent.offsetHeight }
      : { height: 0, width: 0 };
  const [parentSize, setParentSize] = useState(getSize());
  const timeoutRef = useRef(false);
  const sizeRef = useRef(getSize());

  useEffect(() => {
    if (parent) {
      const setter = () => {
        sizeRef.current = getSize();
        console.log("CALLED SETTER!", sizeRef.current);
        if (!timeoutRef.current) {
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
      parent.addEventListener("resize", setter);
      setter();
      console.log("LISTENING TO PARENT!");
      return () => parent.removeEventListener("resize", setter);
    }
    console.log("No Parent :/");
  }, [parent]);

  return [parentSize, ref] as const;
}

export default useParentSize;
