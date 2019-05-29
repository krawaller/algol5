import games from "../../../logic/dist";

export type GameId = keyof typeof games;

const names = (Object.keys(games) as unknown) as GameId[];

export default names;
