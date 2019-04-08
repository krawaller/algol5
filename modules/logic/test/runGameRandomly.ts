import { AlgolStepLinks } from "../../types";

export function runGameRandomly(id: string, game: any, max: number = 1000) {
  test(`Game - ${id} - random play, max ${max} moves`, () => {
    let remaining = max;
    let step: { LINKS: AlgolStepLinks } = game.newBattle();
    let actionObj = getActionObj(step.LINKS);
    let actions = Object.keys(actionObj);

    while (remaining && actions.length && !step.LINKS.endedBy) {
      remaining--;
      const action = actions[Math.floor(Math.random() * actions.length)];
      step = game[actionObj[action]](step, action);
      actionObj = getActionObj(step.LINKS);
      actions = Object.keys(actionObj);
    }
    //console.log(`Played ${id} for ${max - remaining} steps`);
  });
}

function getActionObj(links: AlgolStepLinks) {
  let actions = { ...links.actions };

  if (links.endturn) {
    actions.endturn = links.endturn;
  }

  return actions;
}
