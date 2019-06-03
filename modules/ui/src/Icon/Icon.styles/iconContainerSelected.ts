import { glitz } from "../../_helpers";

export const rotateDiff = 15;
export const iconContainerSelected = glitz.injectStyle({
  animationDuration: "1s",
  animationTimingFunction: "linear",
  animationIterationCount: "infinite",
  animationName: {
    "0%": {
      transform: "rotate(0deg)",
    },
    "25%": {
      transform: `rotate(-${rotateDiff}deg)`,
    },
    "50%": {
      transform: "rotate(0deg)",
    },
    "75%": {
      transform: `rotate(${rotateDiff}deg)`,
    },
    "100%": {
      transform: "rotate(0deg)",
    },
  },
});
