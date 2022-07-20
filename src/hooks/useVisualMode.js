import React, {useState} from "react";


export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);  //Basic mode and history

  function transition(newMode, replace = false) { 

    const preHistory = history;
    if (replace) { //Remove end of history to be replaced
    preHistory.splice(-1,1);
    setHistory(preHistory);
    }
    setHistory([...history, newMode]); 
    setMode(newMode); 
  }

  function back () {
    if (history.length > 1) { //Will not go past begining of history
    const preHistory = history;
    preHistory.splice(-1,1);
    setHistory(preHistory); 
    }
    setMode(history[history.length-1])}


  return { mode, transition, back };
}