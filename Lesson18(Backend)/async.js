import { loadProducts } from "./loadProducts.js";

async function loadPage()
{
    await loadProducts(); // this line replaces - loadProducts().then(() => { ... });
    console.log('page loaded...');
    return 'async return';  // same as resolve(value)
}

loadPage().then((value) => {
    console.log(value);
    console.log('next step');
});