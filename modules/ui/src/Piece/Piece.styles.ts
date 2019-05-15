import { TransitionStatus } from "react-transition-group/Transition";
import { CSSProperties } from "react";

export function lifecycleStyles(
  status: TransitionStatus,
  animating?: "from" | "to" | "ghost",
  targetted?: boolean
): CSSProperties {
  if (status === "entering" && animating !== "from" && animating !== "ghost") {
    return {
      opacity: 0,
      transform: "scale(0.1, 0.1)",
      ...(targetted &&
        {
          //transitionDelay: "300ms"
        })
    };
  }
  if (status === "exiting") {
    return {
      opacity: 0,
      ...(animating !== "to" &&
        animating !== "ghost" && {
          transform: "scale(2, 2)"
        }),
      ...(animating === "ghost" && {
        transitionDelay: "150ms",
        transitionDuration: "100ms"
      }),
      ...(targetted &&
        {
          //transitionDelay: "300ms"
        })
    };
  }
  return {};
}

export function transitions(status: TransitionStatus) {
  const transitions = ["left 0.3s ease", "bottom 0.3s ease"];
  if (status !== "entering") {
    transitions.push("opacity 0.4s ease");
    transitions.push("transform 0.4s ease");
  }
  return transitions.join(", ");
}

export const pieceStyles: CSSProperties = {
  userSelect: "none",
  pointerEvents: "none"
};
