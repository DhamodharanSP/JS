function fetchProducts()
{
    fetch('https://supersimplebackend.dev/products').then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
    });
}

fetchProducts();