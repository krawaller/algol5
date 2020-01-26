export const stringifyTimestamp = (timestamp: number, method = 0) => {
  return Math.floor(timestamp / 100000).toString(36);
};
