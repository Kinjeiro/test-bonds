import { Reducer, Action } from 'redux';

export default function createReducer<S>(
	initialState: S,
	handlers: any
): Reducer<S> {
	return (state: S = initialState, action: Action): S => {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
}
