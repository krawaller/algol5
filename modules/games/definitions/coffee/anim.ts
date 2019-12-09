import { CoffeeAnim } from "./_types";

const coffeeAnim: CoffeeAnim = {
  downhill: [
    { forposin: ["downhill", { enterfrom: [["looppos"], "selectdrop"] }] },
  ],
  uphill: [
    { forposin: ["uphill", { enterfrom: [["looppos"], "selectdrop"] }] },
  ],
  horisontal: [
    { forposin: ["horisontal", { enterfrom: [["looppos"], "selectdrop"] }] },
  ],
  vertical: [
    { forposin: ["vertical", { enterfrom: [["looppos"], "selectdrop"] }] },
  ],
};

export default coffeeAnim;
