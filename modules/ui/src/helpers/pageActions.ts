export interface PageActions {
  navTo: (path: string) => void;
  prefetch: (path: string) => void;
}

export const fakePageActions: PageActions = {
  navTo: str => console.log("nav to", str),
  prefetch: str => console.log("prefetch", str),
};
