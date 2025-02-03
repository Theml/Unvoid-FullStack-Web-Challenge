"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listAvailable30MinuteSlotsMultiplePerson = void 0;
const list_available_30_minute_slots_1 = require("../4-list-available-30-minute-slots/list-available-30-minute-slots");
const listAvailable30MinuteSlotsMultiplePerson = (attendees, range) => {
    // Your code goes here
    const availableSlots = [];
    attendees.forEach(attendee => {
        const { availability, events } = attendee;
        const attendeeAvailableSlots = (0, list_available_30_minute_slots_1.listAvailable30MinuteSlots)(availability, events, range);
        availableSlots.push(...attendeeAvailableSlots);
    });
    return availableSlots;
};
exports.listAvailable30MinuteSlotsMultiplePerson = listAvailable30MinuteSlotsMultiplePerson;
