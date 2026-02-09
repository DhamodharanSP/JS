function toggle(query)
{
    const button = document.querySelector(`.${query}`);
    if(!button.classList.contains('toggle'))
        button.classList.add('toggle');
    else button.classList.remove('toggle');
}

function toggleOne(query)
{
    const button = document.querySelector(`.${query}`);
    if(!button.classList.contains('toggle'))
    {
        turnOffPrevious();
        button.classList.add('toggle')
    }
    else button.classList.remove('toggle');
}

function turnOffPrevious()
{
    const previous = document.querySelector('.toggle');
    if(previous) 
        previous.classList.remove('toggle');
}