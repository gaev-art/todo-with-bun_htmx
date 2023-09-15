

export function updateTodoTextById(todos, id, newText) {
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      todos[i].text = newText;
      break;
    }
  }
  return todos;
}
