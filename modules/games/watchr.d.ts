declare module "watchr" {
  // eslint-disable-next-line @typescript-eslint/ban-types
  export const open: (path: string, listener: Function, next: Function) => void;
}
