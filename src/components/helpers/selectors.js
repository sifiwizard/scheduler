

export function getAppointmentsForDay(state, day) {
  const selectedDay = state.days.filter(days => days.name === day);
  return selectedDay[0] ? selectedDay[0].appointments.map(appointment => state.appointments[appointment]) : [];
}

export function getInterview(state, interview) {
  return interview ? {student: interview.student, interviewer: state.interviewers[interview.interviewer]} : null;
}

export function getInterviewersForDay(state, day) {
  const selectedDay = state.days.filter(days => days.name === day);
  return selectedDay[0] ? selectedDay[0].interviewers.map(interviewer => state.interviewers[interviewer]) : [];
}