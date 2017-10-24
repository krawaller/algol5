/*
Used in .inflateFromSave, .startGameSession and .makeSessionAction (when ending turn)
Mutates the given turn with all steps that can lead to turn end, and links for those steps
Returns the mutated turn
*/

import hydrateStep from './hydratestep';
import { Game, Turn } from '../types';

export default function hydrateTurn(game: Game, turn: Turn): Turn { // TODO - forcefully flag if we're AI analyzing! or just always do it :P
  turn.ends = {
    win: [],
    draw: [],
    lose: [],
  };
  turn.deadEnds = {};
  turn.next = {}
  hydrateStep(game,turn,turn.steps.root)
  return turn;
}