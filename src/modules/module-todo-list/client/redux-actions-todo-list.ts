import { Todo } from './model-todo';
import { selectTodoList } from './redux-selectors-todo-list';
import { ModuleState } from './redux-todo-list';
import { SimpleAction, UniAction } from '../../../core-features/feature-redux/model-redux';

export enum TodoActions {
  ADD_TODO__FETCHING = 'ADD_TODO__FETCHING',
  ADD_TODO__SUCCESS = 'ADD_TODO__SUCCESS',
  ADD_TODO__FAILED = 'ADD_TODO__FAILED',

  COMPLETE_TODO__FETCHING = 'COMPLETE_TODO__FETCHING',
  COMPLETE_TODO__SUCCESS = 'COMPLETE_TODO__SUCCESS',
  COMPLETE_TODO__FAILED = 'COMPLETE_TODO__FAILED',

  UNCOMPLETE_TODO = 'UNCOMPLETE_TODO',

  DELETE_TODO = 'DELETE_TODO',
}

interface TodoActionType<T, P> {
  type: T;
  payload: P;
}

export type TodoAction =
  | TodoActionType<typeof TodoActions.ADD_TODO, Todo>
  | TodoActionType<typeof TodoActions.COMPLETE_TODO, number>
  | TodoActionType<typeof TodoActions.UNCOMPLETE_TODO, number>
  | TodoActionType<typeof TodoActions.DELETE_TODO, number>
  ;

export function addTodo(todo: Todo): UniAction<Todo> {
	//return {
	//	type: TodoActions.ADD_TODO,
	//	payload: todo,
	//};
	return {
		type: [TodoActions.ADD_TODO__FETCHING, TodoActions.ADD_TODO__SUCCESS, TodoActions.ADD_TODO__FAILED],
		payload: Promise.resolve(todo),
	};
}

// Async Function example with redux-thunk
export function completeTodo(todoId: number): UniAction<Todo> {
	// here you could do API eg
	//return (dispatch: Function, getState: Function) => {
	//	dispatch({ type: TodoActions.COMPLETE_TODO, payload: todoId });
	//};
	return async (dispatch, getState) => {
    dispatch({
      type: TodoActions.COMPLETE_TODO__FETCHING,
    });

    try {
      // for the example
      //noinspection ES6RedundantAwait
      const apiResult = await Promise.resolve(
        selectTodoList(getState() as ModuleState).find(({ id }) => id === todoId)
      );

      dispatch({
        type: TodoActions.COMPLETE_TODO__SUCCESS,
        payload: apiResult,
      });
    } catch (error) {
      dispatch({
        type: TodoActions.COMPLETE_TODO__FAILED,
        error,
      });
    }
	};
}

export function uncompleteTodo(todoId: number): TodoAction {
	return {
		type: TodoActions.UNCOMPLETE_TODO,
		payload: todoId,
	};
}

export function deleteTodo(todoId: number): TodoAction {
	return {
		type: TodoActions.DELETE_TODO,
		payload: todoId,
	};
}
