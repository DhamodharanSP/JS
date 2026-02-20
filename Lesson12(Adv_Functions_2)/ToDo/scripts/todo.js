const todoList = JSON.parse(localStorage.getItem('todo-events')) || [];

render();

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
    todoList.forEach( function (todoEvent, i) {
        const { event, date } = todoEvent;
        const html = `
            <div>${event}</div>
            <div>${date}</div>
            <button onclick="
                todoList.splice(${i},1);
                updateToDoList();
                render();
            " class="todo-delete">
                Delete
            </button>
        `;
        todoHTML += html
    });
    const listElement = document.querySelector('.todo-list');
    listElement.innerHTML = todoHTML;
}

function updateToDoList()
{
    localStorage.setItem('todo-events', JSON.stringify(todoList));
}