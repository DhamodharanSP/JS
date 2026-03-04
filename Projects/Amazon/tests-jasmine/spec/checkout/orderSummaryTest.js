import { renderOrderSummary } from '../../../scripts/checkout/orderSummary.js';
import { loadCartFromStorage } from "../../../data/cart.js";

describe('test suite: renderOrderSummary()', () => {
    it('displays the cart', () => {
        const testContainer = document.querySelector('.js-test-container');
        testContainer.innerHTML =  `
            <div class="js-checkout-quantity"></div>
            <div class="js-order-summary"></div>
            <div class="js-payment-summary"></div>
        `;

        const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
        const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

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

        expect(
            document.querySelectorAll('.cart-item-container').length
        ).toEqual(2);

        expect(
            document.querySelector(`.js-test-product-quantity-${productId1}`).innerText
        ).toContain('Quantity: 3 Update  Save Delete');

        expect(
            document.querySelector(`.js-test-product-quantity-${productId2}`).innerText
        ).toContain('Quantity: 2 Update  Save Delete');
        
    });
});