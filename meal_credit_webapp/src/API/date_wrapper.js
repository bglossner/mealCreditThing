const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export default class DateWrapper {
    parseServerDateTime(datetime) {
        let d = new Date(datetime);
        let hour = d.getUTCHours();
        let ampm = hour > 11 ? "PM" : "AM";
        hour = hour === 0 ? 12 : hour % 12;
        return `${monthNames[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()} at ${hour}:${d.getUTCMinutes()} ${ampm}`;
    }

    getTimeBetween(dt1, dt2) {
        let d1 = new Date(dt1), d2 = new Date(dt2);
        let between = d2.getTime() - d1.getTime();
        let minutes = between % 60;
        let hours = between % 3600;
        let days = between % (3600 * 24);
        if (days > 0) {
            return `${days} days, ${hours - (24 * days)} hr`;
        }
        else if (hours > 0) {
            return `${hours} hr, ${minutes - (60 * hours)} min`;
        }
        else if (minutes > 0) {
            return `${minutes} min`;
        }

        return null;
    }

    getTimeFromNow(dt1) {
        return this.getTimeBetween((new Date()).toUTCString(), dt1);
    }
}

/* let date = new DateParser();
console.log(date.parseServerDateTime('2019-05-05T19:23:00.000Z')); */