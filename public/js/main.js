// main.js

const d = new Date();
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

document.getElementById("month").innerHTML = months[d.getMonth()];
document.getElementById("dayOfWeek").innerHTML = days[d.getDay()];
document.getElementById("date").innerHTML = d.getDate() + "<sup>th</sup>";
