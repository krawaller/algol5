export default function isGameEndCommand(cmnd){
  return !!{
    win: 1,
    lose: 1,
    draw: 1
  }[cmnd];
}
