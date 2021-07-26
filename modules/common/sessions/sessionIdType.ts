export const sessionIdType = (sessionId?: string | null) =>
  sessionId?.match(/^R/) ? "remote" : "local";
