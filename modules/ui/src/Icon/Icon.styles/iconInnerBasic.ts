export const iconInnerTransitionDuration = 500;

export const iconInnerBasic = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  position: "absolute",
  transition: `opacity ${iconInnerTransitionDuration}ms ease, transform ${iconInnerTransitionDuration}ms ease`,
  transform: "scale(1,1)",
  opacity: 1,
  zIndex: 2,
} as const;
