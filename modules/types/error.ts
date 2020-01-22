export type AlgolError = {
  type: "ALGOLERROR";
  title: string;
  message: string;
  meta: any;
};

export const isAlgolError = (obj: any): obj is AlgolError =>
  (obj as AlgolError).type === "ALGOLERROR";
