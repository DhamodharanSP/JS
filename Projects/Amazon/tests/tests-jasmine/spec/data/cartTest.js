import { cart, addToCart, loadCartFromStorage } from "../../../../data/cart.js";

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