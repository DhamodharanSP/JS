export async function connectAmazon()
{
    try {
        const response = await fetch('https://amazon.com');
        console.log('response received on request');
    }
    catch (error) {
        console.log(`CORS error! request was blocked by the backend server. ${error}`);
    }
}

connectAmazon();