let products = [];

export function loadProducts()
{
    const request = new XMLHttpRequest();

    request.open('GET', 'https://error.supersimplebackend.dev/products');

    request.addEventListener('load', () => {
        products = JSON.parse(request.response);
        console.log(products);
    });

    request.addEventListener('error', (error) => {
        console.log('Unexpected error!');
    })

    request.send();
}

loadProducts();

// error in Promise
export function fetchProducts()
{
    const promise = fetch('https://error.supersimplebackend.dev/products').then((response) => {
        return response.json();
    }).then((productDetails) => {
        products = productDetails;
        console.log('products loaded via fetchProducts()')
    }).catch((error) => {
        console.log('unexpected error in fetchProducts()');
    });
    return promise;
}

fetchProducts();