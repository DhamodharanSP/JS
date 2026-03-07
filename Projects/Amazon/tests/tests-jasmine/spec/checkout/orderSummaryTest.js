import { renderOrderSummary } from '../../../../scripts/checkout/orderSummary.js';
import { cart, loadCartFromStorage } from "../../../../data/cart.js";

describe('test suite: renderOrderSummary()', () => {
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
    let testContainer;

    beforeEach(() => {
        spyOn(localStorage, 'setItem');

        testContainer = document.querySelector('.js-test-container');
        testContainer.innerHTML =  `
            <div class="js-checkout-quantity"></div>
            <div class="js-order-summary"></div>
            <div class="js-payment-summary"></div>
        `;

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([
                {
                    productId: productId1,
                    quantity: 3,
                    deliveryOptionId: '1'
                },
                {
                    productId: productId2,
                    quantity: 2,
                    deliveryOptionId: '2'
                }
            ]);
        });

        loadCartFromStorage();

        renderOrderSummary();
    });

    // 16f.
    afterEach(() => {
        testContainer.innerHTML = '';
    });

    it('displays the cart', () => {
        expect(
            document.querySelectorAll('.cart-item-container').length
        ).toEqual(2);

        expect(
            document.querySelector(`.js-test-product-quantity-${productId1}`).innerText
        ).toContain('Quantity: 3 Update  Save Delete');

        expect(
            document.querySelector(`.js-test-product-quantity-${productId2}`).innerText
        ).toContain('Quantity: 2 Update  Save Delete');

        // 16g.
        expect(
            document.querySelector(`.js-test-product-name-${productId1}`).innerText
        ).toEqual('Black and Gray Athletic Cotton Socks - 6 Pairs');

        expect(
            document.querySelector(`.js-test-product-name-${productId2}`).innerText
        ).toEqual('Intermediate Size Basketball');

        // 16h.
        expect(
            document.querySelector(`.js-test-product-price-${productId1}`).innerText
        ).toEqual('$10.90');

        expect(
            document.querySelector(`.js-test-product-price-${productId2}`).innerText
        ).toEqual('$20.95');
    });

    it('removes a product', () => {
        document.querySelector(`.js-test-delete-${productId1}`).click();

        expect(
            document.querySelectorAll('.cart-item-container').length
        ).toEqual(1);

        expect(
            document.querySelector(`.js-cart-item-container-${productId1}`)
        ).toEqual(null);

        expect(
            document.querySelector(`.js-cart-item-container-${productId2}`)
        ).not.toEqual(null);

        expect(cart.length).toEqual(1);

        expect(cart[0].productId).toEqual(productId2);
    });

    // 16j.
    it('updating the delivery option', () => {
        // click the 3rd input radio button
        document.querySelector(`.js-test-delivery-option-${productId1}-3`).click();

        // checking if the input is checked
        expect(
            document.querySelector(`.js-test-delivery-option-input-${productId1}-3`).checked
        ).toEqual(true);

        // checking cart items
        expect(cart.length).toEqual(2);
        expect(cart[0].productId).toEqual(productId1);
        expect(cart[0].deliveryOptionId).toEqual('3');

        // checking shipping cost
        expect(
            document.querySelector('.js-test-shipping-cost').innerText
        ).toEqual('$14.98');

        // checking total cost
        expect(
            document.querySelector('.js-test-total-cost').innerText
        ).toEqual('$89.58');
    });
});