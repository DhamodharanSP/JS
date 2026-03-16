export const orders = JSON.parse(localStorage.getItem('orders')) || [];

function saveLocal()
{
    localStorage.setItem('orders', JSON.stringify(orders));
}

export function addOrder(order)
{
    orders.unshift(order);
    saveLocal();
}

export function getOrderProductDetails(orderId, productId)
{
    const order = orders.find((order) => order.id === orderId);
    const productDetails = order.products.find((product) => product.productId === productId);
    return { order, productDetails };
}