import { deliveryOptions } from "./deliveryOptions.js";

export let cart = JSON.parse(localStorage.getItem('cartItems')) || [];

// Save cart to localStorage
function saveLocal()
{
    localStorage.setItem('cartItems', JSON.stringify(cart));
}

// Add Items to Cart 
export function addToCart(productId, quantity)
{
    let matchingItem;

    cart.forEach((cartItem) => {
        if(productId === cartItem.productId)
            matchingItem = cartItem;
    });

    if(matchingItem) matchingItem.quantity += quantity;
    else 
    {
        cart.push({
            productId,
            quantity,
            deliveryOptionId: '1'
        });
    }
    saveLocal();
}

// Remove from cart
export function removeFromCart(productId)
{
    cart = cart.filter((cartItem) => productId !== cartItem.productId);
    saveLocal();
}

// Get total cart quantity
export function getCartQuantity()
{
    let cartQuantity = 0;
    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    })
    return cartQuantity;
}

// Modify cart item quantity
export function modifyCartItem(productId, quantity)
{
    if(quantity < 0)
    {
        alert('Invalid Quantity!');
        return;
    }
    let matchingItem;
    cart.forEach((cartItem) => {
        if(productId === cartItem.productId)
            matchingItem = cartItem;
    });
    if(matchingItem) matchingItem.quantity = quantity;
    saveLocal();
}

// Get Specific item quantity
export function getItemQuantity(productId)
{
    let matchingItem;
    cart.forEach((cartItem) => {
        if(productId === cartItem.productId)
            matchingItem = cartItem; 
    });
    if(matchingItem) return matchingItem.quantity;
}

// Update delivery option for an item
export function updateDeliveryOption(productId, deliveryOptionId)
{
    const matchingItem = cart.find(cartItem => cartItem.productId === productId);
    matchingItem.deliveryOptionId = deliveryOptionId;
    saveLocal();
}