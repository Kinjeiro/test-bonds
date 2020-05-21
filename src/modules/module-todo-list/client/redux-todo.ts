/* eslint-disable max-len */
import createReducer from '../../../core-features/feature-redux/utils/create-reducer';
import createStatusReducer, { StatusState } from '../../../core-features/feature-redux/utils/create-status-reducer';

import * as api from './api-todo-list';
import { Todo } from './model-todo';
import { SimpleAction } from '../../../core-features/feature-redux/model-redux';

// ======================================================
// INITIAL STATE
// ======================================================
interface TodoListReduxState {
  todoList: Todo[],
  actionLoadTodoListStatus: StatusState | undefined,
}
const initialState: TodoListReduxState = {
  todoList: [],
  actionLoadTodoListStatus: undefined,
};


// ======================================================
// TYPES
// ======================================================
const PREFIX = 'todo';
export const TYPES = {
  LOAD_TODO_LIST_FETCH:     `${PREFIX}/LOAD_TODO_LIST_FETCH`,
  LOAD_TODO_LIST_FAIL:      `${PREFIX}/LOAD_TODO_LIST_FAIL`,
  LOAD_TODO_LIST_SUCCESS:   `${PREFIX}/LOAD_TODO_LIST_SUCCESS`,
};


// ======================================================
// ACTION CREATORS
// ======================================================
export function getBindActions({
  apiLoadTodoList,
}) {
  return {
    actionLoadTodoList() {
      return {
        types: [TYPES.LOAD_TODO_LIST_FETCH, TYPES.LOAD_TODO_LIST_SUCCESS, TYPES.LOAD_TODO_LIST_FAIL],
        payload: apiLoadTodoList(),
      };
    },
  };
}

export const actions = getBindActions(api);

// ======================================================
// REDUCER
// ======================================================
const reducer = createReducer<TodoListReduxState, SimpleAction, TYPES>(
  initialState,
  {
    [TYPES.LOAD_TODO_LIST_SUCCESS]:
      (state, action, todoList) => ({
        ...state,
        todoList,
      }),
  },
  {
    actionLoadTodoListStatus: createStatusReducer(
      TYPES.LOAD_TODO_LIST_FETCH, TYPES.LOAD_TODO_LIST_SUCCESS, TYPES.LOAD_TODO_LIST_FAIL,
    ),
  },
);

export default reducer;
