import { CalendarAvailability, CalendarEvent, CalendarSlot } from '../types';

interface Time {
  hours: number,
  minutes: number
}

export const isSlotAvailableWithBuffer = (
  availability: CalendarAvailability,
  events: Array<CalendarEvent>,
  slot: CalendarSlot,
): boolean => {
  // Your code goes here
  const { start, durationM } = slot;
  const end = new Date(start.getTime() + durationM * 60000);
  const weekday = start.getDay()
  const dayAvailable = availability.include.find(avail => avail.weekday === weekday)

  if (!dayAvailable) {
    return false
  }

  const [availableStartTime, availableEndTime] = dayAvailable.range
  const slotStartTime = { hours: start.getHours(), minutes: start.getMinutes()}
  const slotEndTime = { hours: end.getHours(), minutes: end.getMinutes()}

  if(!isTimeInRange(slotStartTime, availableStartTime, availableEndTime) || 
      !isTimeInRange(slotEndTime, availableStartTime, availableEndTime)){
        return false;
  }

  for (const event of events) {
    if(evnetsOverlap(event, start, end)) {
      return false;
    }
  }
  return true;
};

const isTimeInRange = (time: Time, startTime: Time, endTime: Time): boolean =>{
  const currentTime = time.hours * 60 + time.minutes
  const start = startTime.hours * 60 + startTime.minutes
  const end = endTime.hours * 60 + endTime.minutes

  return currentTime >= start && currentTime <= end
}

const evnetsOverlap = (event: CalendarEvent, start: Date, end: Date): boolean => {
  const {start: eventStart, end: eventEnd, buffer} = event

  let bufferStart = new Date(eventStart)
  let bufferEnd = new Date(eventEnd)
  if(buffer) {
    bufferStart = new Date(eventStart.getTime() - buffer.before * 60000)
    bufferEnd = new Date(eventEnd.getTime() + buffer.after * 60000)
  }
  return (start < bufferEnd && end > bufferStart)
}