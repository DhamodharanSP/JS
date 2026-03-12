function fetchProducts()
{
    fetch('https://supersimplebackend.dev/products').then((response) => {
        console.log(response);
    }); // fetch uses Promise on request to get the response
}

fetchProducts();