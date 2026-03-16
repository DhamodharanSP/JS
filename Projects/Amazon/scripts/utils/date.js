import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export function formatISOdate(dateString, style)
{
    const date = dayjs(dateString);
    switch(style)
    {
        case 'day': return date.format('MMMM D');
        case 'dayTime': return date.format('MMMM D - h:mm A');
        case 'dayMonthDate': return date.format('dddd, MMMM D');
        default: return date.format('D MMMM YYYY');
    }
}

export function dayDifference(day1, day2)
{
    return dayjs(day1).diff(dayjs(day2));
}