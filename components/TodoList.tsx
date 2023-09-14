import React from 'react';
import { Todo } from '../index';

export function TodoList(props: { todos: Todo[] }) {
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
            </li>
          ))
        : 'No items added'}
    </ul>
  );
}
