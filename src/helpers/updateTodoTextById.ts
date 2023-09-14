import { Todo } from '../index';

export function updateTodoTextById(todos: Todo[], id: string, newText: string) {
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      todos[i].text = newText;
      break;
    }
  }
  return todos;
}
