import { cart, getCartQuantity } from '../../data/cart.js';
import { products } from '../../data/products.js';
import { deliveryOptions } from '../../data/deliveryOptions.js';
import formatCurrency from '../utils/price.js';
import { taxRate } from '../config.js';

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
                <div class="payment-summary-money">
                    $${formatCurrency(totalShippingCost)}
                </div>
            </div>

            <div class="payment-summary-row subtotal-row">
                <div>Total before tax:</div>
                <div class="payment-summary-money">
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

            <button class="place-order-button button-primary">
                Place your order
            </button>
        </div>
    `;

    const paymentSummaryElement = document.querySelector('.js-payment-summary');

    paymentSummaryElement.innerHTML = paymentHTML;
}

function getTotalCost()
{
    let totalItemCost = 0, totalShippingCost = 0;
    
    cart.forEach((cartItem) => {
        const productId = cartItem.productId;

        const matchingItem = products.find(product => product.id === productId);

        const itemPrice = matchingItem.priceCents * cartItem.quantity;

        const deliveryOption = deliveryOptions.find(option => option.id === cartItem.deliveryOptionId);

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