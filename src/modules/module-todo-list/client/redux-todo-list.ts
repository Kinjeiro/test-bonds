import createReducer from '../../../core-features/feature-redux/utils/create-reducer';
import createStatusReducer, { StatusState } from '../../../core-features/feature-redux/utils/create-status-reducer';
import { SimpleAction, UniAction } from '../../../core-features/feature-redux/model-redux';
import { GlobalState } from '../../../core-features/feature-redux/global-state';

// ======================================================
// MODULE
// ======================================================
import * as api from './api-todo-list';
import { Todo } from './model-todo';
import { selectTodoList } from './redux-selectors-todo-list';

// ======================================================
// INITIAL STATE
// ======================================================
export interface TodoListReduxState extends GlobalState {
  todoList: Todo[],
  // todo @ANKU @LOW - this is example mode (for real product need for each todo create 3 status
  actionAddTodoStatus: StatusState | undefined,
  actionLoadTodoListStatus: StatusState | undefined,
  actionToggleTodoStatus: StatusState | undefined,
  actionDeleteTodoStatus: StatusState | undefined,
}
export const initialState: TodoListReduxState = {
  todoList: [],
  actionAddTodoStatus: undefined,
  actionLoadTodoListStatus: undefined,
  actionToggleTodoStatus: undefined,
  actionDeleteTodoStatus: undefined,
};


// ======================================================
// TYPES
// ======================================================
const PREFIX = 'todo';
export const TYPES = {
  LOAD_TODO_LIST_FETCH:     `${PREFIX}/LOAD_TODO_LIST_FETCH`,
  LOAD_TODO_LIST_FAIL:      `${PREFIX}/LOAD_TODO_LIST_FAIL`,
  LOAD_TODO_LIST_SUCCESS:   `${PREFIX}/LOAD_TODO_LIST_SUCCESS`,

  ADD_TODO_FETCH:     `${PREFIX}/ADD_TODO_FETCH`,
  ADD_TODO_SUCCESS:   `${PREFIX}/ADD_TODO_SUCCESS`,
  ADD_TODO_FAIL:      `${PREFIX}/ADD_TODO_FAIL`,

  TOGGLE_TODO_FETCH:     `${PREFIX}/TOGGLE_TODO_FETCH`,
  TOGGLE_TODO_SUCCESS:   `${PREFIX}/TOGGLE_TODO_SUCCESS`,
  TOGGLE_TODO_FAIL:      `${PREFIX}/TOGGLE_TODO_FAIL`,

  DELETE_TODO_FETCH:     `${PREFIX}/DELETE_TODO_FETCH`,
  DELETE_TODO_SUCCESS:   `${PREFIX}/DELETE_TODO_SUCCESS`,
  DELETE_TODO_FAIL:      `${PREFIX}/DELETE_TODO_FAIL`,
};

// ======================================================
// ACTION CREATORS
// ======================================================
export function getBindActions(api: { [apiMethod: string]: (...args: any[]) => Promise<any> }) {
  return {
    actionLoadTodoList(): UniAction<Todo[]> {
      return {
        type: [TYPES.LOAD_TODO_LIST_FETCH, TYPES.LOAD_TODO_LIST_SUCCESS, TYPES.LOAD_TODO_LIST_FAIL],
        payload: api.apiLoadTodoList(),
      };
    },
    actionAddTodo(todo: Todo): UniAction<Todo> {
      return {
        uuid: todo.id,
        type: [TYPES.ADD_TODO_FETCH, TYPES.ADD_TODO_SUCCESS, TYPES.ADD_TODO_FAIL],
        payload: api.apiAddTodo(todo),
      };
    },
    actionToggleTodo(todoId: number): UniAction<Todo> {
      // another example Thunk action
      return async (dispatch, getState) => {
        dispatch({
          uuid: todoId,
          type: TYPES.TOGGLE_TODO_FETCH,
        });

        try {
          // for example without api to show how to use select
          //noinspection ES6RedundantAwait
          const resultTodo: Todo = await Promise.resolve(
            selectTodoList(getState() as ReduxTodoList).find(({ id }) => id === todoId)!
          );

          dispatch({
            uuid: todoId,
            type: TYPES.TOGGLE_TODO_SUCCESS,
            payload: {
              ...resultTodo,
              completed: !resultTodo.completed,
            },
          });
        } catch (error) {
          dispatch({
            uuid: todoId,
            type: TYPES.TOGGLE_TODO_FAIL,
            error,
          });
        }
      };
    },
    actionDeleteTodo(todoId: number): UniAction {
      return {
        uuid: todoId,
        type: [TYPES.DELETE_TODO_FETCH, TYPES.DELETE_TODO_SUCCESS, TYPES.DELETE_TODO_FAIL],
        payload: api.apiDeleteTodo(todoId),
      };
    },
  };
}

export const actions = getBindActions(api);

// ======================================================
// REDUCER
// ======================================================
const reducer = createReducer<TodoListReduxState, SimpleAction>(
  initialState,
  {
    [TYPES.LOAD_TODO_LIST_SUCCESS]:
      'todoList',
    [TYPES.ADD_TODO_SUCCESS]:
      (state, action, todo) => ({
        ...state,
        todoList: [...state.todoList, todo],
      }),
    [TYPES.TOGGLE_TODO_SUCCESS]:
      (state, action, updatedTodo) => ({
        ...state,
        todoList: state.todoList.map((todo) => todo.id === action.uuid ? updatedTodo : todo),
      }),
    [TYPES.DELETE_TODO_SUCCESS]:
      (state, action) => ({
        ...state,
        todoList: state.todoList.filter((todo) => todo.id !== action.uuid),
      }),
  },
  {
    actionLoadTodoListStatus: createStatusReducer(
      TYPES.LOAD_TODO_LIST_FETCH, TYPES.LOAD_TODO_LIST_SUCCESS, TYPES.LOAD_TODO_LIST_FAIL,
    ),
    actionAddTodoStatus: createStatusReducer(
      TYPES.ADD_TODO_FETCH, TYPES.ADD_TODO_SUCCESS, TYPES.ADD_TODO_FAIL,
    ),
    actionToggleTodoStatus: createStatusReducer(
      TYPES.TOGGLE_TODO_FETCH, TYPES.TOGGLE_TODO_SUCCESS, TYPES.TOGGLE_TODO_FAIL,
    ),
    actionDeleteTodoStatus: createStatusReducer(
      TYPES.DELETE_TODO_FETCH, TYPES.DELETE_TODO_SUCCESS, TYPES.DELETE_TODO_FAIL,
    ),
  },
);

export interface ReduxTodoList {
  todoListState: TodoListReduxState,
}
const reducersMap = {
  todoListState: reducer,
};

export default reducersMap;
