import {Player} from '../src/types';

export default function makePlayer(n: number): Player{
  return {
    name: 'Plr' + n,
    type: 'local'
  };
}
