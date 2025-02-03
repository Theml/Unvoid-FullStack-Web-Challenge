import { listAvailable30MinuteSlots } from '../4-list-available-30-minute-slots/list-available-30-minute-slots';
import { CalendarAvailability, CalendarEvent, CalendarSlot } from '../types';

export const listAvailable30MinuteSlotsMultiplePerson = (
  attendees: Array<{
    availability: CalendarAvailability;
    events: Array<CalendarEvent>;
  }>,
  range: [Date, Date],
): Array<CalendarSlot> => {
  // Your code goes here
  const availableSlots: CalendarSlot[] = []

  attendees.forEach(attendee => {
    const { availability, events } = attendee
    const attendeeAvailableSlots = listAvailable30MinuteSlots(availability, events, range)
    availableSlots.push(... attendeeAvailableSlots)
  })

  return availableSlots;
};
