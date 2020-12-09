type ProcessPathOpts = {
  path: string;
  fac: number;
  xShift?: number;
};

export const processPath = (opts: ProcessPathOpts) => {
  const { path, fac = 1, xShift = 0 } = opts;
  return path.replace(/([0-9]{1,}(?:\.[0-9]*)? [0-9]{1,}(?:\.[0-9]*)?)/g, a => {
    const [xStr, yStr] = a.split(" ");
    // const [xInt, xDec] = xStr.split(".");
    // const [yInt, yDec] = yStr.split(".");
    const x = parseFloat(xStr) * fac + xShift;
    const y = parseFloat(yStr) * fac;
    let xOut = x.toString();
    if ((xOut.split(".")[1] || "").length > 4) xOut = x.toFixed(4);
    let yOut = y.toString();
    if ((yOut.split(".")[1] || "").length > 4) yOut = y.toFixed(4);
    return `${xOut} ${yOut}`;
  });
};
