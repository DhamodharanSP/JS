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
/*
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
*/

// async/await
export async function loadCart()
{
    try {
        const response = await fetch('https://supersimplebackend.dev/cart');
        const data = await response.text();
        console.log(data);
        console.log('finished loading cart...');
        return data;
    }
    catch (error) {
        console.log('Unexpected error! failed loading cart');
    }
}