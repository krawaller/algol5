import * as React from 'react';

let Piece = ({content, performCommand})=> {
  if (typeof content === 'string'){
    return <span>{content}</span>;
  }
  switch(content.type){
    case "line":
      return <span>{content.content.map((c,i)=><Piece content={c} performCommand={performCommand} key={i}/>)}</span>;
    case "text":
      return <span>{content.text}</span>;
    case "posref":
      return <span>{content.pos}</span>;
    case "cmndref":
      return <button className="commandbtn" onClick={()=>performCommand(content.cmnd)}>{content.cmnd}</button>;
    case "playerref":
      return <span>{content.player}</span>;
    default:
      console.log("Oh no :(", content);
      throw "Unknown content: " + content;
  }
};

export default Piece
