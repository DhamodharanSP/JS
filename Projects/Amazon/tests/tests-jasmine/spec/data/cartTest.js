import { cart, addToCart, loadCartFromStorage, removeFromCart } from "../../../../data/cart.js";

describe('test suite: addToCart()', () => {
    //16e.
    beforeEach(() => {
        spyOn(localStorage, 'setItem'); // SpyOn objects to monitor them
    });

    it('adds an existing product to the cart', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([
                {
                    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                    quantity: 3,
                    deliveryOptionId: '1'
                }
            ]);
        });

        loadCartFromStorage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 2);
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(5);

        // 16c.
        expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', JSON.stringify([
            {
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 5,
                deliveryOptionId: '1'
            }
        ]));
    });

    it('adds a new product to the cart', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        }); // callFake will mock the functionality of spy object without affecting the original functionality

        loadCartFromStorage(); // again reloading the cart[] for updated mock

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 1);
        expect(cart.length).toEqual(1); // checking if the addition of item is done

        // expect(<spy_obj>).toHaveBeenCalledTimes(Number) - returns how many times the Spy object (function) is called
        expect(localStorage.setItem).toHaveBeenCalledTimes(1); // This will work only if the expected method is mocked before this

        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6'); // productId Check
        expect(cart[0].quantity).toEqual(1); // quantity Check

        // 16d.
        expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', JSON.stringify([
            {
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1'
            }
        ]));
    });
});

// 16i.
describe('test suite: removeFromCart()', () => {
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
    beforeEach(() => {
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([
                {
                    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                    quantity: 3,
                    deliveryOptionId: '1'
                },
                {
                    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                    quantity: 2,
                    deliveryOptionId: '2'
                }
            ]);
        });
        loadCartFromStorage();
    });

    it('removing an existing product in the cart', () => {
        expect(cart.length).toEqual(2); // initially two items
        removeFromCart(productId1); // 1 item removed
        expect(cart.length).toEqual(1); // now one item in the cart
        expect(cart[0].productId).toEqual(productId2); // checking correctness of product

        // checking if localStorage.setItem is called with the remaining products
        expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', JSON.stringify(
            [
                {
                    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                    quantity: 2,
                    deliveryOptionId: '2'
                }
            ]
        ));

        removeFromCart(productId2);
        expect(localStorage.setItem).toHaveBeenCalledTimes(2);

        // now the cart is empty and in the second function call, localStorage.setItem will set with cart = []

        // check if the localStorage.setItem has been called with empty [] as cart is now empty
        expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', JSON.stringify(
            []
        ));
    });

    it('removing a product that is not in the cart', () => {
        expect(cart.length).toEqual(2); // initially two items
        const dummy = '83d4ca15-0f35-48f5-b7a3-1ea210004f2e';
        removeFromCart(dummy);
        expect(cart.length).toEqual(2); // No item has been removed
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);

        // no changes in cart has no valid item is removed
        expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', JSON.stringify([
            {
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 3,
                deliveryOptionId: '1'
            },
            {
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 2,
                deliveryOptionId: '2'
            }
        ]));
    });
});