import React from 'react';
import { Todo } from '../index';

export default function EditTodo(props: { todo: Todo }) {
  return (
    <form hx-post={`/todo/${props.todo.id}`} hx-ext="json-enc">
      <input type="text" name="text" defaultValue={props.todo.text} autoFocus />
    </form>
  );
}
