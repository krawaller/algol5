import * as React from 'react';

type ContentProps = {
  content: any,
  performCommand?: (cmnd:string) => void
};

let Content = ({content, performCommand}: ContentProps)=> {
  if (typeof content === 'string'){
    return <span>{content}</span>;
  }
  switch(content.type){
    case "page":
    return <div>{content.content.map((c,i)=><Content content={c} performCommand={performCommand} key={i}/>)}</div>;
    case "line":
      return <p className="line">{content.content.map((c,i)=><Content content={c} performCommand={performCommand} key={i}/>)}</p>;
    case "text":
      return <span className={(content.text[0]||'').match(/[\,\.\!\?\:\;]/) ? "noleftmargin" : ""}>{content.text}</span>;
    case "end":
      return <span>{content.name}</span>;
    case "posref":
      return <span>{content.pos}</span>;
    case "cmndref":
      return <button onClick={()=>performCommand(content.cmnd)}>{content.alias || content.cmnd}</button>;
    case "playerref":
      return <span>{content.player}</span>;
    case "nothing":
      return null;
    case "unittyperef":
      return <span>{content.name}</span>;
    default:
      console.log("Oh no :(", content);
      throw "Unknown content: " + content;
  }
};

export default Content
