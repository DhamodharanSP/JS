const container = document.querySelector('.container');

container.addEventListener('click', (event) => {
    const targetElement = event.target;
    console.log(targetElement);
    if(targetElement.matches('.one')) console.log('teal');
    else if(targetElement.matches('.two')) console.log('coral');
    else if(targetElement.matches('.three')) console.log('blueviolet');
    else if(targetElement.closest('.four')) console.log('red');
    else if(targetElement.matches('.five')) console.log('blue');
    else if(targetElement.matches('.six')) console.log('green');
});

// .matches() - only check for matching class in current element
// .closest() - check for closest matching class from current element to its nearby parent