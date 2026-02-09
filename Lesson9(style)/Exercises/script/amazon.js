function computeCost()
{
    const input = document.querySelector('.js-input');
    let cost = Number(input.value);
    if(!cost || cost < 0) // Handling invalid input
    {
        displayError();
        return;
    }
    if(cost < 40) cost += 10;
    const result = document.querySelector('.js-cost');
    result.innerHTML = `Total Cost: $${cost}`;
}

function handleKeydown(event)
{
    if(event.key === 'Enter')
        computeCost();
}

function displayError()
{
    const result = document.querySelector('.js-cost');
    result.innerHTML = `<p class='invalid'>Error: Invalid Amount!</p>`;
}