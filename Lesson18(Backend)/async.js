import { loadProducts } from "./loadProducts.js";
import { loadCart } from "./loadCart.js";

async function loadPage()
{
    await loadProducts(); // this line replaces - loadProducts().then(() => { ... });
    console.log('page loaded...');

    const msg = await new Promise((resolve) => {
        console.log('await is used on promises');
        resolve('promise return');
    })

    console.log(msg);

    return 'async return';  // same as resolve(value)
}

loadPage().then((value) => {
    console.log(value);
    console.log('next step');
});