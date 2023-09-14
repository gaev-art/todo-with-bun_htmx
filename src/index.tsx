import { randomUUID } from 'crypto';
import { renderToString } from 'react-dom/server';

import { TodoList } from './components/TodoList';
import { updateTodoTextById } from './helpers/updateTodoTextById';
import TodoItem from './components/TodoItem';
import EditTodo from './components/EditTodo';

export type Todo = {
  id: string;
  text: string;
};

let todos: Todo[] = [
  {
    id: randomUUID(),
    text: 'Task 1',
  },
  {
    id: randomUUID(),
    text: 'Task 2',
  },
];

const server = Bun.serve({
  port: 3000,
  fetch: handler,
});

const regex = /\/todo\/([a-f0-9-]+)/;

async function handler(request: Request): Promise<Response> {
  const url = new URL(request.url);

  if (url.pathname === '' || url.pathname === '/')
    return new Response(Bun.file('./public/index.html'));

  if (request.method === 'GET' && url.pathname === '/todos') {
    console.log('GET /todos');

    return new Response(renderToString(<TodoList todos={todos} />));
  }

  if (url.pathname === '/todos' && request.method === 'POST') {
    const { todo } = await request.json();

    if (!todo?.length) return new Response('Invalid input', { status: 500 });

    todos.push({ text: todo, id: randomUUID() });

    return new Response(renderToString(<TodoList todos={todos} />));
  }

  if (request.method === 'GET' && url.pathname.match(regex)) {
    const match = url.pathname.match(regex);

    if (match) {
      const id = match[1];
      const todo = todos.find((t) => t.id === id);

      if (!todo) return new Response('Invalid input', { status: 500 });

      return new Response(renderToString(<EditTodo todo={todo} />));
    }
  }

  if (request.method === 'POST' && url.pathname.match(regex)) {
    const match = url.pathname.match(regex);
    const { text } = await request.json();

    if (match) {
      const id = match[1];

      todos = updateTodoTextById(todos, id, text);
      const todo = todos.find((t) => t.id === id);

      if (!todo) return new Response('Invalid input', { status: 500 });

      return new Response(renderToString(<TodoItem todo={todo} />));
    }
  }

  if (request.method === 'DELETE') {
    const regex = /\/todos\/([a-f0-9-]+)/;
    const match = url.pathname.match(regex);

    if (match) {
      const id = match[1];
      const idx = todos.findIndex((t) => t.id === id);
      todos.splice(idx, 1);
    }

    return new Response('');
  }

  return new Response('NotFound', { status: 404 });
}

console.log(`Listening on http://localhost:${server.port}`);
