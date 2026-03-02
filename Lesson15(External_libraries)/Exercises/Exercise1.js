import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';


const today = dayjs();

console.log(today);

// 15a. 
const next5thDay = today.add(5, 'days');
console.log(next5thDay.format('MMMM D'));

// 15b.
const nextMonthDay = today.add(30, 'days');
console.log(nextMonthDay.format('MMMM D'));

// 15c.
const prevMonthDay = today.subtract(30, 'days');
console.log(prevMonthDay.format('MMMM D'));

// 15d.
console.log(today.format('dddd'));

// 15e.
const isWeekend = day => day.$W > 4;

console.log(isWeekend(today));

// Getting day number of the week - $W
console.log(today.$W);

