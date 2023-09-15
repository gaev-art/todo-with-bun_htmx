import React from 'react';

export default function EditTodo(props) {
  return (
    <form hx-post={`/todo/${props.todo.id}`} hx-ext="json-enc">
      <input type="text" name="text" defaultValue={props.todo.text} autoFocus />
    </form>
  );
}
