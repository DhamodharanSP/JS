const todoList = [];

function addList()
{
    const list = document.querySelector('.todo-input');
    todoList.push(list.value);
    console.log(todoList);
}
