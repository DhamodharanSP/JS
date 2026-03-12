export let cart = [];

// oadCart() using XMLHttpRequest
/*
export function loadCart(callback)
{
    const request = new XMLHttpRequest();

    request.open('GET', 'https://supersimplebackend.dev/cart');

    request.addEventListener('load', () => {
        console.log(request.response);
        callback();
    });

    request.send();
}
*/

// loadCart() using fetch()
export function loadCart()
{
    const promise = fetch('https://supersimplebackend.dev/cart').then((response) => {
        return response.text();
    }).then((cartData) => {
        console.log(cartData);
        console.log('finished loading cart...');
    });
    return promise;
}