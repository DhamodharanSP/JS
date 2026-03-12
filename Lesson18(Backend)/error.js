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