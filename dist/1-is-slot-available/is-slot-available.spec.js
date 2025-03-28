"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const is_slot_available_1 = require("./is-slot-available");
describe(`01 - ${is_slot_available_1.isSlotAvailable.name}`, () => {
    const availability = {
        include: [
            {
                weekday: types_1.Weekday.monday,
                range: [
                    { hours: 9, minutes: 0 },
                    { hours: 12, minutes: 0 },
                ],
            },
            {
                weekday: types_1.Weekday.tuesday,
                range: [
                    { hours: 14, minutes: 0 },
                    { hours: 18, minutes: 0 },
                ],
            },
            {
                weekday: types_1.Weekday.wednesday,
                range: [
                    { hours: 10, minutes: 0 },
                    { hours: 16, minutes: 0 },
                ],
            },
            {
                weekday: types_1.Weekday.thursday,
                range: [
                    { hours: 8, minutes: 30 },
                    { hours: 11, minutes: 30 },
                ],
            },
            {
                weekday: types_1.Weekday.friday,
                range: [
                    { hours: 13, minutes: 0 },
                    { hours: 17, minutes: 0 },
                ],
            },
        ],
    };
    it('should return true for an available slot', () => {
        const availableSlots = [
            { start: new Date('2024-01-15T09:15:00Z'), durationM: 45 }, // Monday at 9:15 UTC
            { start: new Date('2024-01-16T16:45:00Z'), durationM: 45 }, // Tuesday at 16:45 UTC
            { start: new Date('2024-01-17T14:00:00Z'), durationM: 60 }, // Wednesday at 14:00 UTC
            { start: new Date('2024-01-18T08:30:00Z'), durationM: 30 }, // Thursday at 8:30 UTC
            { start: new Date('2024-01-19T15:30:00Z'), durationM: 60 }, // Friday at 15:30 UTC
        ];
        const result = availableSlots.every(slot => (0, is_slot_available_1.isSlotAvailable)(availability, slot));
        expect(result).toBe(true);
    });
    it('should return false for an unavailable slot', () => {
        const unavailableSlots = [
            { start: new Date('2024-01-15T17:15:00Z'), durationM: 45 }, // Monday at 17:15 UTC
            { start: new Date('2024-01-16T13:45:00Z'), durationM: 45 }, // Tuesday at 13:45 UTC
            { start: new Date('2024-01-17T08:00:00Z'), durationM: 60 }, // Wednesday at 08:00 UTC
            { start: new Date('2024-01-18T08:30:00Z'), durationM: 240 }, // Thursday at 08:30 UTC
            { start: new Date('2024-01-19T12:30:00Z'), durationM: 60 }, // Friday at 12:30 UTC
        ];
        const result = unavailableSlots.every(slot => (0, is_slot_available_1.isSlotAvailable)(availability, slot) === false);
        expect(result).toBe(true);
    });
});
