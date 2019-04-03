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
  let actions: { [id: string]: string } = Object.keys(links.commands).reduce(
    (mem, cmndName) => ({
      ...mem,
      [cmndName]: links.commands[cmndName]
    }),
    {}
  );

  actions = Object.keys(links.marks).reduce(
    (mem, markName) => ({
      ...mem,
      ...links.marks[markName].pos.reduce(
        (m, p) => ({ ...m, [p]: links.marks[markName].func }),
        {}
      )
    }),
    actions
  );

  if (links.endturn) {
    actions.endturn = links.endturn;
  }

  return actions;
}
