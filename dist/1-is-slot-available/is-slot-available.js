"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSlotAvailable = void 0;
const isSlotAvailable = (availability, slot) => {
    // Your code goes here
    const { start, durationM } = slot;
    const startDay = start.getDay();
    const endDay = new Date(start.getTime() + durationM * 60000);
    const dayAvailable = availability.include.find(avail => avail.weekday === startDay);
    if (!dayAvailable)
        return false;
    const [availableStartTime, availableEndTime] = dayAvailable.range;
    const slotStartTime = { hours: start.getHours(), minutes: start.getMinutes() };
    const slotEndTime = { hours: endDay.getHours(), minutes: endDay.getMinutes() };
    return isTimeInRange(slotStartTime, availableStartTime, availableEndTime) &&
        isTimeInRange(slotEndTime, availableStartTime, availableEndTime);
};
exports.isSlotAvailable = isSlotAvailable;
const isTimeInRange = (time, startTime, endTime) => {
    const currentTime = time.hours * 60 + time.minutes;
    const start = startTime.hours * 60 + startTime.minutes;
    const end = endTime.hours * 60 + endTime.minutes;
    return currentTime >= start && currentTime <= end;
};
