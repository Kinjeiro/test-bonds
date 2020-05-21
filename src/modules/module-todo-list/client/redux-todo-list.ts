import createReducer from '../../../core-features/feature-redux/createReducer';

// ======================================================
// MODULE
// ======================================================
import { Todo } from './model-todo';
import { TodoAction, TodoActions } from './redux-actions-todo-list';
import { GlobalState } from '../../../core-features/feature-redux/global-state';

export const initialState: Todo[] = [];
export const todoListReducer = createReducer<Todo[]>(
  initialState,
  {
    [TodoActions.ADD_TODO](state: Todo[], action: TodoAction) {
      return [...state, action.payload];
    },
    [TodoActions.COMPLETE_TODO](state: Todo[], action: TodoAction) {
      // search after todo item with the given id and set completed to true
      return state.map(t =>
        t.id === action.payload ? { ...t, completed: true } : t
      );
    },
    [TodoActions.UNCOMPLETE_TODO](state: Todo[], action: TodoAction) {
      // search after todo item with the given id and set completed to false
      return state.map(t =>
        t.id === action.payload ? { ...t, completed: false } : t
      );
    },
    [TodoActions.DELETE_TODO](state: Todo[], action: TodoAction) {
      // remove all todos with the given id
      return state.filter(t => t.id !== action.payload);
    },
  },
);

export interface ModuleState extends GlobalState {
  todoList: Todo[],
}
const reducersMap = {
  todoList: todoListReducer,
};

export default reducersMap;
