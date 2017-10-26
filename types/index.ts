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
  stepIdx?: number,
  maxStepIdx?: number,
}

export type ComplexContent = {type: string, [other:string]: any};

export type Content = ComplexContent | string;

export type StepControlUI = {
  potentialMarks: PositionList
  instruction: Content,
  commands: {
    [cmndname: string]: string;
  },
  submit: 'endturn' | 'win' | 'draw' | 'lose' | null
  undo: string | null,
  turnStart: boolean,
  deadEnds: {
    [action: string]: true;
  }
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
  deadEnds: {
    [stepid: string]: {
      [action: string]: true
    }
  }
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
  inflating?: boolean,
}

/* ---------------------------------------- Definition stuff ----------------------------------------  */

export type Meta = any;
export type Graphics = any;
export type Board = any;
export type Setup = any;
export type AI = any;
export type CommandDef = any;
export type MarkDef = any;
export type StartTurn = any;
export type EndGameDef = any;
export type GeneratorDef = WalkerDef | NeighbourDef | FilterDef;

export type DrawDef = {
  tolayer: any
  include?: any
  condition?: any
  ifover?: any
  unlessover?: any
}

export type WalkerDef = {
  type: 'walker'
  dir?: any
  dirs?: any
  start?: any
  starts?: any
  steps?: any
  testblocksbeforesteps?: boolean
  blocks?: any
  count?: any
  startasstep?: boolean
  max?: any
  draw: {
    start?: DrawDef
    steps?: DrawDef
    block?: DrawDef
    last?: DrawDef
    all?: DrawDef
    count?: DrawDef
  }
}

export type NeighbourDef = {
  type: 'neighbour'
  condition?: any
  ifover?: any
  unlessover?: any
  draw: {
    start?: DrawDef
    neighbours?: DrawDef
  }
}

export type FilterDef = {
  type: 'filter'
  layer: any
  tolayer: any
  matching?: any
}

export type Definition = {
  TODO?: string
  meta: Meta
  graphics: Graphics
  board: Board
  setup?: Setup
  startTurn?: StartTurn
  canalwaysend?: {
    [name: string]: true
  }
  endGame?: {
    [endgamename: string]: EndGameDef
  }
  endTurn?: {
    unless: any
  }
  AI?: AI
  commands: {
    [cmndname: string]: CommandDef
  }
  marks: {
    [markname: string]: MarkDef
  }
  generators: {
    [genname: string]: GeneratorDef
  }
};
