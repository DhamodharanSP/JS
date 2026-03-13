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

// error handling in async/await
async function asyncLoadProducts()
{
    try {
        await fetch('https://error.supersimplebackend.dev/products').then((response) => {
            return response.json();
        }).then((productDetails) => {
            products = productDetails;
        });
    }
    catch(error) {
        console.log('unexpected error in asyncLoadProducts()')
    }
}

asyncLoadProducts();

// try / catch - we can also use this in synchronous code
try {
    functionNotExist();
    console.log('next code'); // the code after an error will be omitted and directed to catch() block
}
catch(error)
{
    console.log('unexpected error in calling function()');
}

// throw - throwing a manual error
function factorial(n)
{
    if(n < 0) throw 'negative number not supported for factorial';
    if(n === 0) return 1;
    return n * factorial(n-1);
}

try 
{
    console.log(factorial(-5));
}
catch(error)
{
    console.log(`Error: ${error}`);
}
