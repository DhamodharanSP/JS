function Cart(localStorageKey)
{
    const cart = {
        cartItems: undefined,

        loadCartFromStorage()
        {
            this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [
                {
                    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                    quantity: 2,
                    deliveryOptionId: '1'
                },
                {
                    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                    quantity: 3,
                    deliveryOptionId: '3'
                }
            ];
        },

        saveLocal()
        {
            localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
        },

        addToCart(productId, quantity = 1)
        {
            let matchingItem;

            this.cartItems.forEach((cartItem) => {
                if(productId === cartItem.productId)
                    matchingItem = cartItem;
            });

            if(matchingItem) matchingItem.quantity += quantity;
            else 
            {
                this.cartItems.push({
                    productId,
                    quantity,
                    deliveryOptionId: '1'
                });
            }
            this.saveLocal();
        },

        removeFromCart(productId)
        {
            this.cartItems = this.cartItems.filter((cartItem) => productId !== cartItem.productId);
            this.saveLocal();
        },

        getCartQuantity()
        {
            let cartQuantity = 0;
            this.cartItems.forEach((cartItem) => {
                cartQuantity += cartItem.quantity;
            });
            return cartQuantity;
        },

        modifyCartItem(productId, quantity)
        {
            if(quantity < 0)
            {
                alert('Invalid Quantity!');
                return;
            }
            let matchingItem;
            this.cartItems.forEach((cartItem) => {
                if(productId === cartItem.productId)
                    matchingItem = cartItem;
            });
            if(matchingItem) matchingItem.quantity = quantity;
            this.saveLocal();
        },

        getItemQuantity(productId)
        {
            let matchingItem;
            this.cartItems.forEach((cartItem) => {
                if(productId === cartItem.productId)
                    matchingItem = cartItem; 
            });
            if(matchingItem) return matchingItem.quantity;
        },

        updateDeliveryOption(productId, deliveryOptionId)
        {
            const matchingItem = this.cartItems.find(cartItem => cartItem.productId === productId);
            if(!matchingItem) return;
            matchingItem.deliveryOptionId = deliveryOptionId;
            this.saveLocal();
        }  
    };
    return cart;
}

// Added arguments for passing correct localStorageKey

const cart = Cart('cart-oop');

cart.loadCartFromStorage();

const businessCart = Cart('cart-business');

businessCart.loadCartFromStorage();

console.log(cart);
console.log(businessCart);