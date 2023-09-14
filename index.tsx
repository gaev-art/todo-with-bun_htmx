import { randomUUID } from 'crypto';
import { renderToString } from 'react-dom/server';

import { TodoList } from './components/TodoList';

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
  hostname: 'localhost',
  fetch: handler,
});

async function handler(request: Request): Promise<Response> {
  const url = new URL(request.url);

  if (url.pathname === '' || url.pathname === '/')
    return new Response(Bun.file('index.html'));

  if (request.method === 'GET' && url.pathname === '/todos') {
    return new Response(renderToString(<TodoList todos={todos} />));
  }

  if (url.pathname === '/todos' && request.method === 'POST') {
    const { todo } = await request.json();

    if (!todo?.length) return new Response('Invalid input', { status: 500 });

    todos.push({ text: todo, id: randomUUID() });

    return new Response(renderToString(<TodoList todos={todos} />));
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
