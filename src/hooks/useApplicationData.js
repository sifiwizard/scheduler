import { useState, useEffect } from "react";

import axios from "axios";

import { getDay, replaceDay } from "components/helpers/selectors";



export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  }); //Sets base state

  const setDay = day => setState({ ...state, day });

  useEffect(() => { //Runs when opeing
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
  }, []);

  function bookInterview(id, interview, edit = false) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }; //Copys states with new information to be added after sever update

    const newday = getDay(state, state.day) 
    if(!edit){newday.spots--;}
    const days = replaceDay(state, newday)// Gets add replaces day spots with new spots

    return axios.put(`/api/appointments/${id}`, {interview})
    .then(() => {  
      setState({...state, appointments, days });  //After server is updated update state
    })
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const newday = getDay(state, state.day)
    newday.spots++;
    const days = replaceDay(state, newday)
    
    return axios.delete(`/api/appointments/${id}`)
    .then(() => {  
      setState({...state, appointments, days});  
    })
  }

return {state, setDay, bookInterview, cancelInterview} //Return base state and state change functions
}