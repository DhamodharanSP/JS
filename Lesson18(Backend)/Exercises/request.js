const greetURL = 'https://supersimplebackend.dev/greeting';

// 18a.
export function requestGreet()
{
    const request = new XMLHttpRequest();

    request.open('GET', greetURL);

    request.addEventListener('load', () => {
        console.log(request.response);
    })

    request.send();
}

requestGreet();

// 18b.
export function fetchGreet()
{
    const promise = fetch(greetURL).then((response) => {
        return response.text();
    }).then((message) => {
        console.log(message);
    });
}

fetchGreet();

// 18c.
export async function asyncGreet()
{
    const response = await fetch(greetURL);
    const message = await response.text();
    console.log(message);
}

asyncGreet();

// 18d.
export async function asyncPostGreet()
{
    const response = await fetch(greetURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: 'Dhamo'
        })
    });

    const message = await response.text();
    console.log(message);
}

asyncPostGreet();