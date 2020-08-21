'use strict'

//get todos from local storage

const fetchTodos = function () {
    const todoJSON = localStorage.getItem('todo')

    try {
        return todoJSON ? JSON.parse(todoJSON) : []
    } catch (e) {
        return []
    }
}

//save todos to local storage

const saveTodos = function (todo) {
    localStorage.setItem('todo', JSON.stringify(todo))
}

const removeTodo = function (id) {
    const todoIndex = todos.findIndex(function(todo) {
        return todo.id === id
    })

    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
}

const toggleTodo = function (id) {
    const index = todos.findIndex(function(todo) {
        return todo.id === id
    })

    if (index > -1) {
        todos[index].completed = !todos[index].completed
    }
}

//create DOM for todo

const createTodoDOM = (todo) => {
    const todoEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const todoCheckbox = document.createElement('input')
    const todoText = document.createElement('span')
    const removeButton = document.createElement('button')
    
    todoCheckbox.setAttribute('type', 'checkbox')
    todoCheckbox.checked = todo.completed
    containerEl.appendChild(todoCheckbox)
    todoCheckbox.addEventListener('change', () => {
        toggleTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    todoText.textContent = todo.text
    containerEl.appendChild(todoText)

    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)

    removeButton.textContent = 'Remove'
    removeButton.classList.add('button', 'button--text')
    todoEl.appendChild(removeButton)
    removeButton.addEventListener('click', () => {
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    return todoEl
}

//create DOM for summary

const createSummaryDOM = (incompletes) => {
    const summary = document.createElement('h3')
    summary.classList.add('list-title')
    if (incompletes.length === 1) {
        summary.textContent = `You have ${incompletes.length} task remaining!`
    } else {
        summary.textContent = `You have ${incompletes.length} tasks remaining!`
    }
    
    return summary
}

//render todos

const renderTodos = (todos, filters) => {
    const todoEl = document.querySelector('#todos')
    let filteredTodos = todos.filter((todo) => {
        return todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
    })


    filteredTodos = filteredTodos.filter((todos) => {
        if (filters.hideCompleted) {
            return !todos.completed
        } else {
            return true
        }
    })

    const incompletes = filteredTodos.filter((todo) => {
        return !todo.completed
    })

    todoEl.innerHTML = ''

    
    document.querySelector('#todos').appendChild(createSummaryDOM(incompletes))

    if (filteredTodos.length > 0) {
        filteredTodos.forEach((todo) => {
            todoEl.appendChild(createTodoDOM(todo))
        })
    } else {
        const messageEl = document.createElement('p')
        messageEl.classList.add('empty-message')
        messageEl.textContent = 'No to-dos fam'
        todoEl.appendChild(messageEl)
    }

}