import { getCartQuantity } from '../../data/cart.js';

export function updateCartQuantity()
{
    const cartQuantityElement = document.querySelector('.js-cart-quantity');
    cartQuantityElement.innerText = getCartQuantity() || '';
}