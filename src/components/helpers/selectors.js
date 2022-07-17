

export function getAppointmentsForDay(state, day) {
  const selectedDay = state.days.filter(days => days.name === day);
  return selectedDay[0] ? selectedDay[0].appointments.map(appointment => state.appointments[appointment]) : [];
}