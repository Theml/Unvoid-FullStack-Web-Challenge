"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Weekday = void 0;
/** Use `Date.getDay()` to convert a `Date` to a `Weekday`. */
var Weekday;
(function (Weekday) {
    Weekday[Weekday["sunday"] = 0] = "sunday";
    Weekday[Weekday["monday"] = 1] = "monday";
    Weekday[Weekday["tuesday"] = 2] = "tuesday";
    Weekday[Weekday["wednesday"] = 3] = "wednesday";
    Weekday[Weekday["thursday"] = 4] = "thursday";
    Weekday[Weekday["friday"] = 5] = "friday";
    Weekday[Weekday["saturday"] = 6] = "saturday";
})(Weekday || (exports.Weekday = Weekday = {}));
