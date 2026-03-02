import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export const deliveryOptions = [
    {
        id: '1', 
        deliveryDays: 7,
        priceCents: 0
    },
    {
        id: '2', 
        deliveryDays: 3,
        priceCents: 499
    },
    {
        id: '3', 
        deliveryDays: 1,
        priceCents: 999
    },
];

export function getDeliveryOption(deliveryOptionId)
{
    return deliveryOptions.find(deliveryOption => deliveryOption.id === deliveryOptionId);;
}

export function calculateDeliveryDate(deliveryOption)
{
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    return deliveryDate.format('dddd, MMMM D');
}