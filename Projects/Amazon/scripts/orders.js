import { orders } from '../data/orders.js';
import { getProduct, loadProducts } from '../data/products.js';
import { addToCart } from '../data/cart.js';
import { formatCurrency } from '../scripts/utils/price.js';
import { formatISOdate } from '../scripts/utils/date.js';
import { updateCartQuantity } from './utils/cartUtility.js';

await loadProducts();
updateCartQuantity();
renderOrdersPage();

export function renderOrdersPage()
{
    let ordersHTML = '';
    orders.forEach((order) => {
        ordersHTML += `
            <div class="order-container">
                <div class="order-header">
                    <div class="order-header-left-section">
                        <div class="order-date">
                            <div class="order-header-label">
                                Order Placed:
                            </div>
                            <div style="font-size: 0.9rem">${formatISOdate(order.orderTime, 'dayTime')}</div>
                        </div>
                        <div class="order-total">
                            <div class="order-header-label">Total:</div>
                            <div>$${formatCurrency(order.totalCostCents)}</div>
                        </div>
                    </div>

                    <div class="order-header-right-section">
                        <div class="order-header-label">Order ID:</div>
                        <div>${order.id}</div>
                    </div>
                </div>

                ${generateOrderItems(order)}
            </div>
        `;
    });

    const orderGrid = document.querySelector('.js-orders-grid');
    orderGrid.innerHTML = ordersHTML;

    buyAgain();
}

function generateOrderItems(order)
{
    const productDetails = order.products;
    let productListHTML = '';
    productDetails.forEach((productDetail) => {
        const product = getProduct(productDetail.productId);
        productListHTML += `
            <div class="order-details-grid">
                <div class="product-image-container">
                    <img src=${product.image}>
                </div>

                <div class="product-details">
                    <div class="product-name">
                        ${product.name}
                    </div>
                    <div class="product-delivery-date">
                        Arriving on: ${formatISOdate(productDetail.estimatedDeliveryTime, 'day')}
                    </div>
                    <div class="product-quantity">
                        Quantity: ${productDetail.quantity}
                    </div>
                    <button class="buy-again-button button-primary js-buy-again" data-product-id=${product.id}>
                        <img class="buy-again-icon" src="images/icons/buy-again.png">
                        <span class="buy-again-message">
                            Buy it again
                        </span>
                    </button>
                </div>

                <div class="product-actions">
                    <a href="tracking.html?orderId=${order.id}&productId=${product.id}">
                        <button class="track-package-button button-secondary">
                            Track package
                        </button>
                    </a>
                </div>
            </div>
        `;
    });
    return productListHTML;
}

function buyAgain()
{
    const buyAgainButtons = document.querySelectorAll('.js-buy-again');
    buyAgainButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const { productId } = button.dataset;
            addToCart(productId);
            addedEffect(button);
            updateCartQuantity();
        });
    });
}

function addedEffect(button)
{
    button.innerHTML = '✓ Added';
    clearTimeout(button.timeoutId);
    button.timeoutId = setTimeout(() => {
        button.innerHTML = `
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">
                Buy it again
            </span>
        `;
    }, 1500);
}