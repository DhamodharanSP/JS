export async function invalidRequest()
{
    try {
        const response = await fetch('https://supersimplebackend.dev/greeting', {
            method: 'POST'
        });
        if(response.status >= 400) throw response;
        const message = await response.text();
        console.log(message);
    }
    catch (error) {
        if(error.status === 400)
        {
            const errMsg = await error.json();
            console.log(errMsg);
        }
        else console.log('Network error. Please try again later');
    }
}

invalidRequest();