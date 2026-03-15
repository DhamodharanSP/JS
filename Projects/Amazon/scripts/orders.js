import { orders } from '../data/orders.js';
import { getProduct, loadProducts } from '../data/products.js';

await loadProducts();
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
                            <div>${order.orderTime}</div>
                        </div>
                        <div class="order-total">
                            <div class="order-header-label">Total:</div>
                            <div>$${order.totalCostCents}</div>
                        </div>
                    </div>

                    <div class="order-header-right-section">
                        <div class="order-header-label">Order ID:</div>
                        <div>${order.id}</div>
                    </div>
                </div>

                ${generateOrderItems(order.products)}
            </div>
        `;
    });

    const orderGrid = document.querySelector('.js-orders-grid');
    orderGrid.innerHTML = ordersHTML;
}

function generateOrderItems(productDetails)
{
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
                        Arriving on: ${productDetail.estimatedDeliveryTime}
                    </div>
                    <div class="product-quantity">
                        Quantity: ${productDetail.quantity}
                    </div>
                    <button class="buy-again-button button-primary">
                        <img class="buy-again-icon" src="images/icons/buy-again.png">
                        <span class="buy-again-message">Buy it again</span>
                    </button>
                </div>

                <div class="product-actions">
                    <a href="tracking.html">
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