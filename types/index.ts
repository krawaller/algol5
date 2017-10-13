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
};

export type Player = {
  type: string,
  name: string,
}

export type BattleUI = {
  save?: string,
  gameId: string
  sessionId: string,
  endedBy?: string,
  winner?: 0 | 1 | 2,
  players: [Player,Player],
  board: { // TODO - remove?
    height: number,
    width: number
  },
  current: {
    UI: StepUI,
    controls: StepControlUI,
    history: StepUI[]
  },
  history: StepUI[],
}

export type PositionList = {
  pos: string,
  coords: Coords,
}[];

export type StepUI = {
  playing: 0 | 1 | 2, // Can be 0 for start setup
  marks: PositionList
  units: {
    [id: string]: {
      icon: string,
      coords: Coords,
      spawnCoords?: Coords
    }
  },
  turn: number,
  description?: Content,
  idx?: number,
}

export type Content = string | {type: string, [other:string]: any};

export type StepControlUI = {
  potentialMarks: PositionList
  instruction: Content,
  commands: {
    [cmndname: string]: string;
  },
  submit: 'endturn' | 'win' | 'draw' | 'lose' | null
  undo: string | null,
  turnStart: boolean,
};

type FunctionName = string;
type Position = string;
type Command = string;
type Action = Position | Command;

export type Layer = {
  [posname: string]: Object // object with whatever props u want
}

export type Step = {
  stepid: string,
  name?: string, // name of command or mark
  path: Action[],
  ARTIFACTS: {
    [layername: string]: Layer
  },
  UNITLAYERS: {
    [layername: string]: Layer
  },
  UNITDATA: {
    [unitid: string]: {
      pos: string,
      id: string,
      group: string,
      owner: number
    }
  },
  MARKS: {
    [funcname: string]: Position
  },
  TURNVARS?: {
    [varname: string]: any
  },
  clones?: any, // whaaat?
};

export type Turn = {
  ends: {
    win: string[],
    lose: string[],
    draw: string[]
  },
  steps: {
    [stepid: string]: Step
  },
  next: {
    [stepid: string]: Turn
  }
  player: 1 | 2,
  turn: number,
  links: {
    [stepid: string]: {
      [action: string]: FunctionName
    }
  },
  endMarks: {
    [stepid: string]: {
      [action: string]: Layer
    }
  },
  canend?: boolean,
  blockedby?: string
}

export type Game = {
  commands: any,
  id: string,
  graphics: {
    icons: any,
    tiles: any
  },
  board: {
    terrain: any,
    height: number,
    width: number
  },
  canalwaysend?: {
    [funcname: string]: true
  },
  debug: () => Object
};

export type Session = {
  gameId: string,
  game: Game,
  turn: Turn,
  step: Step,
  savedIndexes: number[],
  markTimeStamps: {},
  undo: any[],
  players: [Player,Player],
  id: string,
  battleId: string,
  winner?: 0 | 1 | 2,
  endedBy?: string,
  saveString?: string,
  history: StepUI[],
  currentSteps: StepUI[],
}

export type Definition = any;