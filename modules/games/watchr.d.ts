declare module "watchr" {
  export const open: (path: string, listener: Function, next: Function) => void;
}
