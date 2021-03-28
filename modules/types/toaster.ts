export type AlgolToaster = (msg: string, kind: "ok" | "error") => void;

export const fakeToaster: AlgolToaster = (msg, kind) => alert(msg);
