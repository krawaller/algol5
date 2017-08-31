/*
Returns an object with the 4 turn-ending actions, and an array of steps for each.s
*/
export default function endStepsForTurnByCmnd(turn){
  return ['win','lose','draw'].reduce((mem,cmnd) => ({
    ...mem,
    [cmnd]: turn.ends[cmnd]
  }),{
    endturn: Object.keys(turn.next)
  });
}