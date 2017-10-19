import * as React from 'react'

type PlaybackProps = {
  onGoing: boolean;
  selectStep: (idx: number) => void;
  idx: number;
  maxIdx: number;
  stepIdx: number;
  maxStepIdx: number;
  turn: number;
};

type PlaybackState = {
  playing: boolean;
  speed: number;
};

// gameCommands, systemCommands, performCommand
class Playback extends React.Component <PlaybackProps,PlaybackState> {
  timeout: number
  constructor(props: PlaybackProps){
    super(props);
    this.state = {
      playing: false,
      speed: 1000
    }
  }
  rangeChange = (e) => {
    this.props.selectStep(+e.target.value);
  }
  play() {
    this.setState({
      playing: true
    });
    this.step();
  }
  step = () => {
    if (this.props.idx === this.props.maxIdx) {
      this.setState({playing: false});
    } else if (this.props.idx + 1 === this.props.maxIdx){
      this.setState({playing: false});
      this.props.selectStep(this.props.idx + 1);
    } else {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(this.step, this.state.speed);
      this.props.selectStep(this.props.idx + 1);
    }
  }
  pause() {
    this.setState({ playing: false });
    clearTimeout(this.timeout);
  }
  componentWillUnmount() {
    clearTimeout(this.timeout);
  }
  render(){
    const {selectStep,idx,maxIdx,onGoing,turn,stepIdx,maxStepIdx} = this.props;
    const {playing} = this.state;
    return (
      <div className="playback">
        <button className="commandbtn" disabled={!idx} onClick={()=> selectStep(idx-1)}>step back</button>
        <button className="commandbtn" disabled={idx === maxIdx} onClick={()=> selectStep(idx+1)}>step forward</button>
        {playing && <button className="commandbtn" onClick={()=> this.pause()}>pause</button>}
        {!playing && <button className="commandbtn" disabled={idx === maxIdx} onClick={()=> this.play()}>play</button>}
        {onGoing && <button className="commandbtn" onClick={()=> selectStep(-1)}>current</button>}
        <div>
          <input type="range" min="0" max={maxIdx} step={1} value={idx} onChange={this.rangeChange}/>
        </div>
        Now showing turn {turn} {maxStepIdx > 1 && <span>step {stepIdx} / {maxStepIdx}</span>}
      </div>
    );
  }
};

export default Playback;