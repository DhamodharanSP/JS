export let cart = [];

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