const dragBox = document.querySelector('.drag-box');

dragBox.addEventListener('dragstart', () => {

});

const dropContainer = document.querySelector('.container');

dropContainer.addEventListener('dragover', (event) => {
    event.preventDefault();
})

dropContainer.addEventListener('drop', () => {
    dropContainer.appendChild(dragBox);
});