import React, {useState} from "react";


export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);  

  function transition(newMode, replace = false) { 

    const preHistory = history;
    if (replace) {
    preHistory.splice(-1,1);
    setHistory(preHistory);
    }
    setHistory([...history, newMode]); 
    setMode(newMode); 
  }

  function back () {
    if (history.length > 1) {
    const preHistory = history;
    preHistory.splice(-1,1);
    setHistory(preHistory); 
    }
    setMode(history[history.length-1])}


  return { mode, transition, back };
}