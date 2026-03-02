import { getCartQuantity } from "../../data/cart.js";

export function updateCheckoutQuantity()
{
    const cartCheckoutElement = document.querySelector('.js-checkout-quantity');
    cartCheckoutElement.textContent = `${ getCartQuantity() || 'No' } Items`;
}