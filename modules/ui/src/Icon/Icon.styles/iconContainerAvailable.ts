import { glitz } from "../../_helpers";

export const scaleDiff = 0.2;
export const iconContainerAvailable = glitz.injectStyle({
  animationDuration: "0.85s",
  animationTimingFunction: "linear",
  animationIterationCount: "infinite",
  animationName: {
    "0%": {
      transform: "scale(1, 1)",
    },
    "25%": {
      transform: `scale(${1 - scaleDiff}, ${1 - scaleDiff})`,
    },
    "50%": {
      transform: "scale(1, 1)",
    },
    "75%": {
      transform: `scale(${1 + scaleDiff}, ${1 + scaleDiff})`,
    },
    "100%": {
      transform: "scale(1, 1)",
    },
  },
});
