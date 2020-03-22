import useWindowSize from "./useWindowSize";

export function useOrientation() {
  const { height, width } = useWindowSize();
  return width > height ? "landscape" : "portrait";
}

export default useOrientation;
