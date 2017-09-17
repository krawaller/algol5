import * as React from 'react';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import Unit from './unit';

import * as map from 'lodash/map'

type UnitsProps = any;

// icons, board, unitdata
let Units = (props: UnitsProps)=> {
    let units = map(props.unitdata,(unit)=> <Unit key={unit.id} {...props} unit={unit}/>)
    return <ReactCSSTransitionGroup transitionName="pieces" transitionEnterTimeout={500} transitionLeaveTimeout={500}>{units}</ReactCSSTransitionGroup>
};

export default Units