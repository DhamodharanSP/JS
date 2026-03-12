import { loadProducts } from './loadProducts.js';
import { loadCart } from './loadCart.js';

new Promise((resolve) => {
    console.log('start promise');
    loadProducts(() => {
        console.log('finished loading products...');
        resolve();
    });

}).then(() => {
    return new Promise((resolve) => {
        loadCart(() => {
            console.log('finished loading cart...');
            resolve();
        });
    });
    
}).then(() => {
    console.log('Next step - Rendering page');
})


