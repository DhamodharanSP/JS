let dragItem = null;

document.addEventListener('dragstart', (event) => {
    const { target } = event;
    if (!target.classList.contains('drag-box')) return;
    dragItem = target; 
    console.log('Drag started');
});

document.addEventListener('dragend', () => {
    dragItem = null;
    console.log('Drag ended');
});

const dropContainer = document.querySelector('.drop-container');

dropContainer.addEventListener('dragover', (event) => {
    event.preventDefault();
});

dropContainer.addEventListener('drop', (event) => {
    const { target } = event;
    const dropBox = target.closest('.container');
    if(dropBox && dragItem) dropBox.appendChild(dragItem);
    console.log('dropped');
});