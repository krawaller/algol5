import { useState, useEffect } from "react";
import { data } from "../../../../payloads/dist/titleData";

const list = data.filter(
  entry =>
    entry.graphics.boards["basic"].height ===
    entry.graphics.boards["basic"].width
);

export const useBoard = () => {
  const [index, setIndex] = useState(0);
  let interval: ReturnType<typeof setInterval>;
  useEffect(() => {
    interval = setInterval(() => setIndex(i => i + 1), 2000);
    return () => clearInterval(interval);
  }, []);
  return list[index % list.length];
};
