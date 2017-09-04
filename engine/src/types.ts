export type SaveData = {
  gameId: string,
  turnNumber: number,
  moveIndexes: number[],
  battleId: string,
  ended?: boolean
};

export type Coords = {
  x: number,
  y: number
}

export type Pos = {
  pos: string,
  coords: Coords,
}

export type UnitData = {
  group: string,
  coords: Coords,
  spawnCoords?: Coords
}

export type Board = {
  height: number,
  width: number,
}

export type PotentialMark = {

}

export type Command = {

}

export type UI = {
  activeMarks: Pos[],
  units: {
    [id: string]: UnitData
  },
  players: [string,string],
  playing: 1 | 2,
  board: Board,
  sessionId: string,
  turnStart: boolean,
  gameId: string
  turn: number,
  save: string,
  potentialMarks: PotentialMark[],
  commands: Command[],
  system: Command[],
  endedBy?: string,
  description?: string,
  winner?: 0 | 1 | 2
}