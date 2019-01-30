import { processEntity } from "../";

/*
the initial unit data blob
*/
export function deduceInitialUnitData(setup) {
  let id = 1;
  return Object.keys(setup).reduce((mem, group) => {
    let defsbyplr = setup[group];
    return Object.keys(defsbyplr).reduce((mem, plr) => {
      let entitydefs = defsbyplr[plr];
      return entitydefs.reduce((mem, entitydef) => {
        processEntity(entitydef).forEach(e => {
          let newid = "unit" + id++;
          mem[newid] = {
            ...e,
            ...{
              id: newid,
              group: group,
              owner: parseInt(plr)
            }
          };
        });
        return mem;
      }, mem);
    }, mem);
  }, {});
}
