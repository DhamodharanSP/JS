const box = document.querySelector('.drag-box');

box.addEventListener('dragstart', () => {
    console.log("Drag started");
});

box.addEventListener('dragend', () => {
    console.log("Drag ended");
})