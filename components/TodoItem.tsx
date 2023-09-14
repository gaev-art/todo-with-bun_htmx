import React from 'react';
import { Todo } from '../index';

export default function TodoItem(props: { todo: Todo }) {
  return (
    <li
      hx-target="this"
      hx-swap="outerHTML"
      id={`#todo-${props.todo.id}`}
      key={props.todo.id}
    >
      <span> {props.todo.text}</span>

      <a
        style={{ float: 'right', color: 'red', marginLeft: '20px' }}
        href="#"
        hx-delete={`/todos/${props.todo.id}`}
      >
        remove
      </a>
      <a
        style={{ float: 'right', color: 'white', marginLeft: '20px' }}
        href="#"
        hx-get={`/todo/${props.todo.id}`}
      >
        edit
      </a>
    </li>
  );
}
