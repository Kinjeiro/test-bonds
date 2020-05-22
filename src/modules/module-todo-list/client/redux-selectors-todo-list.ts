import { ReduxTodoList } from './redux-todo-list';

export const selectTodoList = (globalState: ReduxTodoList) => globalState.todoListState.todoList;
