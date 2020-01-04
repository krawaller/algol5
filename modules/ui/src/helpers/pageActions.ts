export interface PageActions {
  navTo: (path: string) => void;
  prefetch: (path: string) => void;
}
