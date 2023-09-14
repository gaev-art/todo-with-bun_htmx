import React from 'react';
import { Todo } from '../index';

export function TodoList(props: { todos: Todo[] }) {
  return (
    <ul>
      {props.todos.length
        ? props.todos.map((todo) => (
            <li key={todo.id}>
              <span>{todo.text}</span>
            </li>
          ))
        : 'No items added'}
    </ul>
  );
}
