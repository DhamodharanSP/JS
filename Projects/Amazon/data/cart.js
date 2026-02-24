export const cart = [];

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