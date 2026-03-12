import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { loadProducts } from '../data/products.js';

// using XMLHttpRequest and Promises
/*
new Promise((resolve) => {
    loadProducts(() => {
        resolve();
    });
}).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
});
*/

// using fetch()
Promise.all([
    loadProducts(),
    // new async_functions to add in future
]).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
});