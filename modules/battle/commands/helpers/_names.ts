import games from "../../../logic/dist";

const names = Object.keys(games);

export type GameId = keyof typeof games;

export default names;
