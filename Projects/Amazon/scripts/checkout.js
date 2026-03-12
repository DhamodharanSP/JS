import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { loadProducts } from '../data/products.js';

new Promise((resolve) => {
    loadProducts(() => {
        resolve();
    });
}).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
});
