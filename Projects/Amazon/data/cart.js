export const cart = [
    {
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 4
    },
    {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1
    }
];

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
}

// Remove from cart
export function removeFromCart(productId)
{
    cart = cart.filter((cartItem) => productId !== cartItem.productId);
}