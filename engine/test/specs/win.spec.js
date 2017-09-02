/*
This test makes sure that executing the win command correctly ends a game.
*/

import algol from '../../engine';
import omit from 'lodash/omit';

import optionsInUI from '../../engine/various/optionsinui';

const path = [
  "b3","c3","move","endturn",
  "c2","b2","move","endturn",
  "a4","b3","move","endturn",
  "d2","d3","move","endturn",
  "c3","c2","move","endturn",
  "d1","d2","move","endturn",
  "b3","c3","move","endturn",
  "b2","b3","move","endturn",
  "c2","d1","move","win"
];

describe('a won battle', ()=> {
  let UI = algol.startGame('krieg', 'plr1', 'plr2');
  let remaining = path.slice(0);
  while(remaining.length){
    let action = remaining.shift();
    UI = algol.performAction(UI.sessionId, action);
  }
  it('has no actions available', () => {
    expect(optionsInUI(UI)).toEqual([]);
  });
  it('sets the winner correctly', () => {
    expect(UI.winner).toEqual(1);
  });
  it('bubbles up win result correctly', () => {
    expect(UI.endedBy).toEqual('cornerinfiltration')
  });
  it('has still ended if we save and restore', () => {
    let newUI = algol.inflateFromSave(UI.save);
    expect(omit(newUI, ['sessionId'])).toEqual(omit(UI,['sessionId']));
  });
});
