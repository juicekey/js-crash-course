'use strict'

const todos = fetchTodos()

const filters = {
    searchText: '',
    hideCompleted: false
}
renderTodos(todos, filters)


document.querySelector('#search-todo').addEventListener('input', (e) => {
    filters.searchText = e.target.value
    renderTodos(todos, filters)
})

document.querySelector('#new-todo').addEventListener('submit', (e) => {
    const todoText = e.target.elements.newTodo.value.trim()
    e.preventDefault()
    
    if (todoText.length > 0) {
        todos.push({
            id: uuidv4(),
            text: todoText,
            completed: false
        })
    }
    
    saveTodos(todos)
    renderTodos(todos, filters)
    e.target.elements.newTodo.value = ''
})

document.querySelector('#hide-completed').addEventListener('change', (e) => {
        filters.hideCompleted = e.target.checked
        renderTodos(todos, filters)
})
