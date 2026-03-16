import { cart, getCartQuantity, emptyCart, isCartEmpty } from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';
import formatCurrency from '../utils/price.js';
import { taxRate } from '../config.js';
import { addOrder } from '../../data/orders.js';

export function renderPaymentSummary() {
    const { totalItemCost, totalShippingCost } = getTotalCost();
    const totalAmount = totalItemCost + totalShippingCost;
    const taxAmount = calculateTax(totalAmount, taxRate);
    const grandTotal = totalAmount + taxAmount;
    const paymentHTML = `   
        <div>
            <div class="payment-summary-title">
                Order Summary
            </div>

            <div class="payment-summary-row">
                <div>
                    Items (<span>${getCartQuantity()}</span>):
                </div>
                <div class="payment-summary-money">
                    $${formatCurrency(totalItemCost)}
                </div>
            </div>

            <div class="payment-summary-row">
                <div>Shipping &amp; handling:</div>
                <div class="payment-summary-money js-test-shipping-cost">
                    $${formatCurrency(totalShippingCost)}
                </div>
            </div>

            <div class="payment-summary-row subtotal-row">
                <div>Total before tax:</div>
                <div class="payment-summary-money js-test-total-cost">
                    $${formatCurrency(totalAmount)}
                </div>
            </div>

            <div class="payment-summary-row">
                <div>Estimated tax (${taxRate}%):</div>
                <div class="payment-summary-money">
                    $${formatCurrency(taxAmount)}
                </div>
            </div>

            <div class="payment-summary-row total-row">
                <div>Order total:</div>
                <div class="payment-summary-money">
                    $${formatCurrency(grandTotal)}
                </div>
            </div>

            <button class="place-order-button button-primary js-place-order">
                Place your order
            </button>
        </div>
    `;

    const paymentSummaryElement = document.querySelector('.js-payment-summary');

    paymentSummaryElement.innerHTML = paymentHTML;

    placeOrder();
}

function getTotalCost()
{
    let totalItemCost = 0, totalShippingCost = 0;
    
    cart.forEach((cartItem) => {
        const productId = cartItem.productId;

        const product = getProduct(productId);

        const itemPrice = product.priceCents * cartItem.quantity;

        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);

        const shippingPrice = deliveryOption.priceCents;

        totalItemCost += itemPrice;
        totalShippingCost += shippingPrice;
    });

    return {totalItemCost, totalShippingCost};
}


function calculateTax(priceAmount, taxRate)
{
    return priceAmount * taxRate / 100;
}

function placeOrder()
{
    if(isCartEmpty())
    {
        const placeOrderBtnStyle = document.querySelector('.place-order-button');
        placeOrderBtnStyle.classList.add('block-order');
    }
    const placeOrderBtn = document.querySelector('.js-place-order');

    placeOrderBtn.addEventListener('click', async () => {
        try {
            if(isCartEmpty()) {
                return;
            }
            const response = await fetch('https://supersimplebackend.dev/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cart: cart
                })
            });

            const order = await response.json();
            addOrder(order);
            emptyCart();
        }
        catch (error) {
            console.log('Unexpected Error while trying to place order');
        }

        window.location.href = 'orders.html'; // this will control the url in the browser relative to current html file
    });
}