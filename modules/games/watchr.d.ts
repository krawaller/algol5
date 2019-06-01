declare module "watchr" {
  interface watchr {
    open: (path: string, listener: Function, next: Function) => void;
  }
  export = watchr;
}
