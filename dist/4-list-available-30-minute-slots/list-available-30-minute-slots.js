"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listAvailable30MinuteSlots = void 0;
const listAvailable30MinuteSlots = (availability, events, range) => {
    // Your code goes here
    const [startDate, endDate] = range;
    const freeSlots = [];
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
        const dayAvailability = availability.include.find(avail => avail.weekday === currentDate.getDay());
        if (dayAvailability) {
            const startTime = new Date(currentDate);
            const [availableStartTime, availableEndTime] = dayAvailability.range;
            const availableSlots = generateAvailableSlots(currentDate, availableStartTime, availableEndTime, 30);
            const occupiedSlots = getOccupiedSlots(events, currentDate, 30);
            const freeSlotsOfDay = availableSlots.filter(slot => !occupiedSlots.some(occupiedSlot => slotsOverlap(slot, occupiedSlot)));
            freeSlots.push(...freeSlotsOfDay);
        }
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return freeSlots;
};
exports.listAvailable30MinuteSlots = listAvailable30MinuteSlots;
const generateAvailableSlots = (date, startTime, endTime, slotDuration) => {
    const availableSlots = [];
    let currentSlotStart = new Date(date);
    currentSlotStart.setHours(startTime.hours, startTime.minutes, 0, 0);
    const endHour = endTime.hours + (endTime.minutes / 60);
    while (currentSlotStart.getHours() < endHour) {
        const slotEnd = new Date(currentSlotStart.getTime() + slotDuration * 60000);
        if (slotEnd.getHours() <= endTime.hours || slotEnd.getHours() === endTime.hours && slotEnd.getMinutes() <= endTime.minutes) {
            availableSlots.push({ start: new Date(currentSlotStart), durationM: slotDuration });
        }
        currentSlotStart = slotEnd;
    }
    return availableSlots;
};
const getOccupiedSlots = (events, date, slotDuration) => {
    const occupiedSlots = [];
    const eventsOnDate = events.filter(event => isSameDay(event.start, date));
    for (const event of eventsOnDate) {
        const eventDurationMinutes = (event.end.getTime() - event.start.getTime()) / 60000;
        const bufferBefore = event.buffer ? event.buffer.before : 0;
        const bufferAfter = event.buffer ? event.buffer.after : 0;
        const totalEventDuration = eventDurationMinutes + bufferBefore + bufferAfter;
        let currentSlotStart = new Date(event.start);
        while (currentSlotStart < event.end) {
            const slotEnd = new Date(currentSlotStart.getTime() + totalEventDuration * 60000);
            occupiedSlots.push({ start: new Date(currentSlotStart), durationM: totalEventDuration });
            currentSlotStart = slotEnd;
        }
    }
    return occupiedSlots;
};
const isSameDay = (date1, date2) => {
    return date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate();
};
const slotsOverlap = (slot1, slot2) => {
    const slot1End = new Date(slot1.start.getTime() + slot1.durationM * 60000);
    const slot2End = new Date(slot2.start.getTime() + slot2.durationM * 60000);
    return (slot1.start < slot2End && slot1End > slot2.start);
};
