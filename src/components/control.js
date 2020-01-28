import React, { useRef } from 'react';
import "./control.scss";

export const Control = ({onVote, onReveal, hasReveal}) => {
  const voteRef = useRef();
  return <div className="control">
    <input className="input" ref={voteRef}></input>
    <button className="btn" onClick={() => {
      onVote(+voteRef.current.value);
    }}> Vote </button>
    <button className="btn" onClick={onReveal}> {hasReveal ? "Next" : "Reveal"} </button>
  </div>
}