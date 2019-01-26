import { convertToEntities } from "../";

/*
the initial unit data blob
*/
export function deduceInitialUnitData(setup) {
  var id = 1;
  return Object.keys(setup).reduce(function(mem, group) {
    var defsbyplr = setup[group];
    return Object.keys(defsbyplr).reduce(function(mem, plr) {
      var entitydefs = defsbyplr[plr];
      return entitydefs.reduce(function(mem, entitydef) {
        convertToEntities(entitydef).forEach(function(e) {
          var newid = "unit" + id++;
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
