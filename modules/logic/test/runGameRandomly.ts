import { AlgolStep, AlgolStepLinks, AlgolGame } from "../../types";
import games from "../../games/dist/lib";

export function runGameRandomly(
  id: string,
  game: AlgolGame,
  max = 1000
) {
  test(`Game - ${id} - random play, max ${max} moves`, () => {
    let remaining = max;
    game.setBoard(games[id].boards.basic);
    let step: AlgolStep = game.newBattle(games[id].setups.basic, "basic");
    let actionObj = getActionObj(step.LINKS);
    let actions = Object.keys(actionObj);

    while (remaining && actions.length && !step.LINKS.endedBy) {
      remaining--;
      const action = actions[Math.floor(Math.random() * actions.length)];
      step = game.action[actionObj[action]](step, action);
      actionObj = getActionObj(step.LINKS);
      actions = Object.keys(actionObj);
    }
    //console.log(`Played ${id} for ${max - remaining} steps`);
  });
}

function getActionObj(links: AlgolStepLinks) {
  const actions = { ...links.commands, ...links.marks };

  if (links.endTurn) {
    actions.endTurn = links.endTurn;
  }

  return actions;
}
