import { Todo } from './model-todo';

export async function apiLoadTodoList() : Promise<Todo[]> {
  return [];
}

export async function apiAddTodo(todo: Todo) : Promise<Todo> {
  return todo;
}

export async function apiDeleteTodo(todoId: number) : Promise<void> {
}
