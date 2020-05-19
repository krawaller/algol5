export interface AppActions {
  navTo: (path: string) => void;
  prefetch: (path: string) => void;
}

export const fakeAppActions: AppActions = {
  navTo: str => console.log("nav to", str),
  prefetch: str => console.log("prefetch", str),
};
