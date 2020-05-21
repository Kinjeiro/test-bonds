import { ModuleState } from './redux-todo-list';

export const selectTodoList = (globalState: ModuleState) => globalState.todoList;
