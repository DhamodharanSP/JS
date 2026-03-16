import { loadProducts, getProduct } from "../data/products.js";
import { getOrderProductDetails } from "../data/orders.js";
import { formatISOdate, dayDifference } from '../scripts/utils/date.js';
import { updateCartQuantity } from '../scripts/utils/cartUtility.js';

await loadProducts();
updateCartQuantity();
renderTrackingPage();

function renderTrackingPage()
{
    const url = new URL(window.location.href);
    const orderId = url.searchParams.get('orderId');
    const productId = url.searchParams.get('productId');

    const { order, productDetails } = getOrderProductDetails(orderId, productId);
    const product = getProduct(productId);

    const arrivalDate = formatISOdate(productDetails.estimatedDeliveryTime, 'dayMonthDate');
    const orderProgress = calculateOrderProgress(order.orderTime, productDetails.estimatedDeliveryTime);

    let orderTrackHTML = `
        <a class="back-to-orders-link link-primary" href="orders.html">
            View all orders
        </a>

        <div class="delivery-date">
            Arriving on ${arrivalDate}
        </div>

        <div class="product-info">
            ${product.name}
        </div>

        <div class="product-info">
            Quantity: ${productDetails.quantity}
        </div>

        <img class="product-image" src=${product.image}>

        <div class="progress-labels-container">
            <div class="progress-label js-preparing">
                Preparing
            </div>
            <div class="progress-label js-shipped">
                Shipped
            </div>
            <div class="progress-label js-delivered">
                Delivered
            </div>
        </div>

        <div class="progress-bar-container">
            <div class="progress-bar" style="width: ${orderProgress}%"></div>
        </div>
    `;

    const orderTrack = document.querySelector('.order-tracking');
    orderTrack.innerHTML = orderTrackHTML;

    calculateCurrentOrderStatus(orderProgress);
}

function calculateOrderProgress(orderTime, deliveryTime)
{
    // progressPercent = ((currentTime - orderTime) / (deliveryTime - orderTime)) * 100
    const progressPercent = (dayDifference(new Date(), orderTime) / dayDifference(deliveryTime, orderTime)) * 100;
    return Math.min(Math.max(progressPercent, 0), 100);
}

function calculateCurrentOrderStatus(progressPercent)
{
    let currentState;
    if(progressPercent <= 40) currentState = document.querySelector('.js-preparing');
    else if(progressPercent < 100) currentState = document.querySelector('.js-shipped');
    else currentState = document.querySelector('.js-delivered');
    currentState.classList.add('current-status');
}