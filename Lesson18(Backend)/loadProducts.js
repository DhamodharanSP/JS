export let products = [];

// loadProducts() using XMLHttpRequest
/* 
export function loadProducts(render)
{
    const request = new XMLHttpRequest();

    request.open('GET', 'https://supersimplebackend.dev/products');

    request.addEventListener('load', () => {
        products = JSON.parse(request.response);
        console.log('loaded products');
        render();
    });

    request.send();
}
*/

// loadProducts() using fetch()
export function loadProducts()
{
    console.log('load products');
    const promise = fetch('https://supersimplebackend.dev/products').then((response) => {
        return response.json();
    }).then((productsData) => {
        products = productsData;
        console.log('finished loading products...');
    });
    return promise;
}