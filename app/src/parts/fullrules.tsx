import * as React from 'react';

import {RuleDescription} from '../../../types';
import Content from './content';

const FullRules = ({rules}: {rules: RuleDescription}) => {
  let ret = [];
  ret = ret.concat([
    <h3>Game flow</h3>,
    <Content content={rules.flow}/>
  ]);
  if (rules.concepts){
    ret.push(<h3>Game concepts</h3>);
    Object.keys(rules.concepts).forEach(name => ret.push(
      <div>
        <h4>{name}</h4>
        <Content content={rules.concepts[name]}/>
      </div>
    ));
  }
  ["actions","tiles","goals","units"].forEach(kind => {
    if (rules[kind]){
      ret.push(<h3>{kind}</h3>);
      Object.keys(rules[kind]).forEach(name => ret.push(
        <div>
          <h4>{name}</h4>
          <Content content={rules[kind][name].rule}/>
        </div>
      ));
    }
  });
  return <div className="fullrules">{ret}</div>
};

export default FullRules;
