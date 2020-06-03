import { AlgolLocalBattle, BattleNavActions, AlgolNavStep } from "../../types";
import { makeSessionControlsStep } from "./makeSessionControlsStep";
import { makeSessionHistoryStep } from "./makeSessionHistoryStep";

type MakeSessionLobbyStepOpts = {
  session: AlgolLocalBattle;
  battleNavActions: BattleNavActions;
};

export const makeSessionLobbyStep = (
  opts: MakeSessionLobbyStepOpts
): AlgolNavStep => {
  const { battleNavActions, session } = opts;
  const verb =
    session.type === "normal"
      ? "Created"
      : session.type === "fork"
      ? "Forked"
      : "Imported";
  const descs = [
    `${verb} ${new Date(session.updated!).toString().slice(0, 10)}`,
  ];
  if (session.updated) {
    descs.push(`Updated ${new Date(session.updated!).toString().slice(0, 10)}`);
  }
  if (session.endedBy) {
    descs.push(
      `Ended turn ${session.turn}${
        session.player ? `, plr${session.player} won` : " in a draw"
      }`
    );
  } else {
    descs.push(`Turn ${session.turn}, plr${session.player} to play`);
  }

  return {
    title: `Session ${session.id}`,
    desc: descs.join("\n"),
    onClick: battleNavActions.toBattleLobby,
    links: [
      makeSessionControlsStep(battleNavActions),
      makeSessionHistoryStep(battleNavActions),
    ],
  };
};
