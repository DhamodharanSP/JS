let dragItem = null;

document.addEventListener('dragstart', (event) => {
    const { target } = event;
    dragItem = target; 
    console.log('Drag started');
});

document.addEventListener('dragend', () => {
    dragItem = '';
    console.log('Drag ended');
});

const dropContainer = document.querySelector('.drop-container');

dropContainer.addEventListener('dragover', (event) => {
    event.preventDefault();
});

dropContainer.addEventListener('drop', (event) => {
    const { target } = event;
    const dropBox = target.closest('.container');
    if(dropBox) dropBox.appendChild(dragItem);
    console.log('dropped');
});