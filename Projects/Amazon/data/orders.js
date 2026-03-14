export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order)
{
    orders.unshift(order);
    saveLocal();
}

function saveLocal()
{
    localStorage.setItem('orders', JSON.stringify(orders));
}
