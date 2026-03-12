export let products = [];

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