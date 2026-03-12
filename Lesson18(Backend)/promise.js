import { loadProducts } from './loadProducts.js';
import { loadCart } from './loadCart.js';

new Promise((resolve) => {
    console.log('start promise');
    loadProducts(() => {
        console.log('finished loading products...');
        resolve('promise1'); // we can pass values in resolve() to use that in then()
    });

}).then((value) => {
    console.log(value);
    return new Promise((resolve) => {
        loadCart(() => {
            console.log('finished loading cart...');
            resolve('promise2'); // the values are only accessible between two promises - current and next
        });
    });

}).then((value) => {
    console.log(value); // accessing the value passed from previous promise
    console.log('Next step - Rendering page');
}); // multiple promises instead of multiple callbacks to avoid nested code and flatten it for better readability and maintainability


