export default function isTurnEndCommand(cmnd){
  return !!{
    endturn: 1,
    win: 1,
    lose: 1,
    draw: 1
  }[cmnd];
}
