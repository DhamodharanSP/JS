const todoList = [];

function addList()
{
    const list = document.querySelector('.todo-input');

    const value = list.value;
    todoList.push(value);

    console.log(todoList);

    list.value = '';

    const items = document.querySelector('.todo-items');
    items.innerHTML = renderToDoList(); // displaying todo list on page
}


function renderToDoList()
{
    let todoListHTML = '';
    for(let i = 0; i < todoList.length; ++i)
    {
        const todo = todoList[i];
        const html = `<p>${todo}</p>`; // HTML generation
        todoListHTML += html;
    }
    return todoListHTML;
}