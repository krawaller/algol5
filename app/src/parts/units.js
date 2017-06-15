import React from 'react'
import Unit from './unit'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import map from 'lodash/map'

// icons, board, unitdata
let Units = (props)=> {
    let units = map(props.unitdata,(unit)=> <Unit key={unit.id} {...props} unit={unit}/>)
    return <ReactCSSTransitionGroup transitionName="pieces" transitionEnterTimeout={500} transitionLeaveTimeout={500}>{units}</ReactCSSTransitionGroup>
};

export default Units