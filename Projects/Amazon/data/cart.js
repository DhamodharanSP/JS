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
            quantity
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