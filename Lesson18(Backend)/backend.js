const request = new XMLHttpRequest();

request.open('GET', 'https://supersimplebackend.dev');

request.addEventListener('load', () => {
    console.log(request.response);
}); // receiving 'response' from server - 'load' means, it triggers the event after loading the response from the server

request.send();