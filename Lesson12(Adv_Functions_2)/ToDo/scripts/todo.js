const todoList = JSON.parse(localStorage.getItem('todo-events')) || [];

render();

// Adding Event listeners

// click event
const addButton = document.querySelector('.todo-add');
addButton.addEventListener('click', () => {
    addEvent();
})

// keydown event
addButton.addEventListener('keydown', (event) => {
    if(event.key === 'enter') addEvent();
})


function addEvent()
{
    const todoEvent = document.querySelector('.todo-input-js');
    const event = todoEvent.value;

    const todoDate = document.querySelector('.todo-date-js');
    const date = todoDate.value;

    if(!event || !date) return;

    todoList.push({ event, date });

    updateToDoList();
    
    todoEvent.value = '';
    todoDate.value = '';

    render();
}

function render()
{
    let todoHTML = ``;
    todoList.forEach( (todoEvent, i) => {
        const { event, date } = todoEvent;
        const html = `
            <div>${event}</div>
            <div>${date}</div>
            <button class="todo-delete">
                Delete
            </button>
        `;
        todoHTML += html
    });
    const listElement = document.querySelector('.todo-list');
    listElement.innerHTML = todoHTML;
    
    // click - event listener for all delete buttons in todo-list
    const deleteButtons = document.querySelectorAll('.todo-delete');
    deleteButtons.forEach((deleteButton, index) => {
        deleteButton.addEventListener('click', () => {
            todoList.splice(index ,1);
            updateToDoList();
            render();
        });
    })
}

function updateToDoList()
{
    localStorage.setItem('todo-events', JSON.stringify(todoList));
}