import React from 'react';

export function TodoList(props) {
  return (
    <ul>
      {props.todos.length
        ? props.todos.map((todo) => (
          <li key={todo.id} hx-target="this" hx-swap="outerHTML">
            <span>{todo.text}</span>
            <a
              style={{ float: 'right', color: 'red', marginLeft: '20px' }}
              href="#"
              hx-delete={`/todos/${todo.id}`}
            >
              remove
            </a>
            <a
              style={{ float: 'right', color: 'white', marginLeft: '20px' }}
              href="#"
              hx-get={`/todo/${todo.id}`}
            >
              edit
            </a>
          </li>
        ))
        : 'No items added'}
    </ul>
  );
}
