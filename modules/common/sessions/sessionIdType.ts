export const sessionIdType = (sessionId?: string) =>
  sessionId?.match(/^R/) ? "remote" : "local";
