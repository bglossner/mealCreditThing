const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const SECONDS_IN_DAY = 3600 * 24;
const SECONDS_IN_HOUR = 3600;
const SECONDS_IN_MIN = 60; 

export default class DateWrapper {

    parseServerDateTime(datetime) {
        let d = new Date(datetime);
        let hour = d.getUTCHours();
        let ampm = hour > 11 ? "PM" : "AM";
        hour = hour === 0 ? 12 : hour % 12;
        return `${monthNames[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()} at ${hour}:${d.getUTCMinutes()} ${ampm}`;
    }

    parseServerDateTimeNums(d) {
        let hour = d.getUTCHours();
        let ampm = hour > 11 ? "PM" : "AM";
        hour = hour === 0 ? 12 : hour % 12;
        return `${monthNames[d.getMonth()].substring(0, 3)} ${d.getDate()} at ${hour}:${d.getMinutes()} ${ampm}`;
    }

    parseHoursMinutes(d) {
        let hour = d.getUTCHours();
        let ampm = hour > 11 ? "PM" : "AM";
        hour = hour === 0 ? 12 : hour % 12;
        return `${hour}:${d.getMinutes()} ${ampm}`;
    }

    parseMonthDay(d) {
        return `${d.getMonth() + 1}/${d.getDate()}`;
    }

    getTimeBetweenDates(dt1, dt2) {
        let d1 = new Date(dt1), d2 = new Date(dt2);
        // console.log(dt1, d1.toUTCString(), dt2, d2.toUTCString());
        return (d2.getTime() - d1.getTime()) / 1000;
    }

    getOverlappingRange(x1, x2, y1, y2) {
        let d1 = new Date(x1), d2 = new Date(x2), d3 = new Date(y1), d4 = new Date(y2);
        let start = d1 > d3 ? d1 : d3;
        let end = d2 > d4 ? d4 : d2;
        let timeBetween = this.getTimeBetweenDates(start, end);
        
        if (timeBetween <= 0) {
            return null;
        }

        /*if (timeBetween < SECONDS_IN_DAY) {
            let m1 = this.parseHoursMinutes(start), m2 = this.parseHoursMinutes(end);
            return [`${this.parseMonthDay(start)} at ${m1}`, `${this.parseMonthDay(end)} at ${m2}`];
        } else {
            return [`${this.parseServerDateTimeNums(start)}`, `${this.parseServerDateTimeNums(end)}`];
        }*/
        return [`${this.parseServerDateTimeNums(start)}`, `${this.parseServerDateTimeNums(end)}`]
    }

    getReadableTimeBetweenDates(dt1, dt2) {
        let between = this.getTimeBetweenDates(dt1, dt2);
        let minutes = Math.floor(between / SECONDS_IN_MIN);
        let hours = Math.floor(between / SECONDS_IN_HOUR);
        let days = Math.floor(between / SECONDS_IN_DAY);
        if (days > 0) {
            return `${days} days, ${hours - (24 * days)} hr`;
        }
        else if (hours > 0) {
            return `${hours} hr, ${minutes - (60 * hours)} min`;
        }
        else if (minutes > 0) {
            return `${minutes} min`;
        }
        //console.log("HERE")

        return null;
    }

    getTimeFromNow(dt1) {
        return this.getReadableTimeBetweenDates((new Date()).toUTCString(), dt1);
    }
}

/* let date = new DateParser();
console.log(date.parseServerDateTime('2019-05-05T19:23:00.000Z')); */