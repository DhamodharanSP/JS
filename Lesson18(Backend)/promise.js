import { loadProducts } from './loadProducts.js';

new Promise((resolve) => {
    console.log('start promise');
    loadProducts(() => {
        console.log('finished loading...');
        resolve();
    });
}).then(() => {
    console.log('next step');
});


