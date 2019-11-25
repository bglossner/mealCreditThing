const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export default class DateWrapper {
    parseServerDateTime(datetime) {
        let d = new Date(datetime);
        let hour = d.getUTCHours();
        let ampm = hour > 11 ? "PM" : "AM";
        hour = hour === 0 ? 12 : hour % 12;
        return `${monthNames[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()} at ${hour}:${d.getUTCMinutes()}1${ampm}`;
    }
}

/* let date = new DateParser();
console.log(date.parseServerDateTime('2019-05-05T19:23:00.000Z')); */