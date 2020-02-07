import { processEntity } from "../";
import { AlgolSetupAnon, AlgolArmy } from "../../types";
import { AlgolIcon } from "../../types/gamedef";

/*
the initial unit data blob
*/
export function deduceInitialUnitData(
  setup: AlgolSetupAnon,
  groupAsIcon?: boolean
): AlgolArmy {
  let id = 1;
  return Object.keys(setup).reduce((mem, group) => {
    let defsbyplr = setup[group]!;
    return Object.keys(defsbyplr).reduce((mem, plr) => {
      let entitydefs = defsbyplr[plr as "0" | "1" | "2"]!;
      return entitydefs.reduce((mem, entitydef) => {
        processEntity(entitydef).forEach(e => {
          let newid = "unit" + id++;
          mem[newid] = {
            ...e,
            ...{
              id: newid,
              group: group,
              icon: groupAsIcon ? (group as AlgolIcon) : undefined,
              owner: parseInt(plr) as 0 | 1 | 2,
            },
          };
        });
        return mem;
      }, mem);
    }, mem);
  }, {} as AlgolArmy);
}
