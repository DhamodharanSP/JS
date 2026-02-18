const todoList = [];

function addList()
{
    const todoValue = document.querySelector('.todo-input');
    const event = todoValue.value;

    const todoDate = document.querySelector('.todo-date');
    const date = todoDate.value;

    todoList.push({ event, date});

    todoValue.value = '';
    todoDate.value = '';

    renderToDoList(); // displaying todo list on page
}


function renderToDoList()
{
    let todoListHTML = '';
    for(let i = 0; i < todoList.length; ++i)
    {
        const todoEvent = todoList[i];
        const { event, date} = todoEvent;
        const html = `
            <div>
                ${event}
            </div>
            <div>
                ${date}
            </div>
            <button onclick="
                todoList.splice(${i},1);
                renderToDoList();
            " class="todo-delete">
                Delete
            </button>
        `; 
        todoListHTML += html;
    }
    const items = document.querySelector('.todo-items');
    items.innerHTML = todoListHTML;
}