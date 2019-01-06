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
    ret.push(
      <ul>
        {Object.keys(rules.concepts).map(name => (
          <li>
            <strong>{name}: </strong>
            <Content content={rules.concepts[name]} flatLines={true}/>
          </li>
        ))}
      </ul>
    );
  }
  ["actions","tiles","goals","units"].forEach(kind => {
    if (rules[kind]){
      ret.push(<h3>{kind}</h3>);
      ret.push(
        <ul>
          {Object.keys(rules[kind]).map(name => (
            <li>
              <strong>{name}: </strong>
              <Content content={rules[kind][name].rule} flatLines={true}/>
            </li>
          ))}
        </ul>
      );
    }
  });
  return <div className="fullrules">{ret}</div>
};

export default FullRules;
