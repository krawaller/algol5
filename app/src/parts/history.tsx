import * as React from 'react'

import {StepUI} from '../../../engine/src/types';

type HistoryProps = {
  offset: number;
  history: StepUI[];
  selectStep: (idx: number)=>void;
  currentStep: number;
}

type Turn = {
  steps: (StepUI & {idx:number})[],
  turn: number,
  player: 0 | 1 | 2
}

const Step = ({step,selectStep,current}: {step: StepUI & {idx:number}, current: boolean, selectStep: (idx: number) => void}) => (
  <div className={"step" + (current ? " currentStep" : "")} onClick={()=>selectStep(step.idx)}>{step.description}</div>
);

const Turn = ({selectStep, currentStep, turn: {turn,steps,player}}: {turn: Turn, currentStep: number, selectStep: (idx: number)=>void}) => (
  <div className={"turn " + "player" + player}>
    <div>
      {turn}
    </div>
    <div>
      {steps.slice(0).reverse().map((s: StepUI & {idx:number}) => <Step key={s.idx} step={s} selectStep={selectStep} current={s.idx === currentStep} /> )}
    </div>
  </div>
);

const History = ({offset,history,selectStep,currentStep}: HistoryProps)=> {
    const turns: Turn[] = history.slice(0).reduce((mem, step: StepUI, n) => {
      if (!n || mem[mem.length-1].turn != step.turn){
        mem.push({
          turn: step.turn,
          steps: [step],
          player: step.playing
        });
      } else {
        mem[mem.length-1].steps.push(step);
      }
      return mem;
    }, []);

    return (
        <div className="history" style={{left:offset}}>
          {turns.slice(0).reverse().map(t => <Turn key={t.turn} turn={t} selectStep={selectStep} currentStep={currentStep} />)}
        </div>
    );
};

export default History;
