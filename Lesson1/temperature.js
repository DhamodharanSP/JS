function CelsiusToFahrenheit(celsius)
{
    return (celsius * 9 / 5) + 32;
}

function FahrenheitToCelsius(fahrenheit)
{
    return (fahrenheit - 32) * 5 / 9;
}

console.log(CelsiusToFahrenheit(25));
console.log(FahrenheitToCelsius(86));
console.log(CelsiusToFahrenheit(-5));