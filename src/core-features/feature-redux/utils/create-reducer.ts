import UniErrorHelper from '../../feature-uni-error/helper-uni-error';

import { createForFieldCaseReducer } from './utils-redux';
import { ACTION_PAYLOAD_FIELD, SimpleAction, UniReducer } from '../model-redux';

type StringMap = {
  [key: string]: any,
};

/**
 * Удобное создание редьюсеров (без лишних switch-case условий)
 *
 * @param initialState
 * @param handlers - key - action type, value - caseReducer
 * @param fieldsHandlers
 * @param defaultHandler
 * @returns {reducer}
 */
export default function createReducer<
  STATE = any,
  ACTION extends SimpleAction = SimpleAction,
  TYPES = { [enumId: string]: string },
>(
  initialState: STATE,
  handlers: {
    [actionType in keyof TYPES]?: UniReducer<STATE, ACTION>
  },
  fieldsHandlers?: {
    [field in keyof STATE]?: UniReducer<any, ACTION>
  },
  defaultHandler?: UniReducer<STATE, ACTION>,
) {
  return function reducer(this: any, state = initialState, action: ACTION) {
    // fieldsHandlers
    let updatedFields : StringMap = {};
    if (fieldsHandlers) {
      //forOwn(
      //  fieldsHandlers,
      //  (fieldReducer: UniReducer<any, ACTION>, fieldName: string) => {
      //    const prevFieldState = (state as StringMap)[fieldName];
      //    const newFieldState = fieldReducer(prevFieldState, action, action[ACTION_PAYLOAD_FIELD]);
      //    // link compare
      //    if (newFieldState !== prevFieldState) {
      //      updatedFields[fieldName] = newFieldState;
      //    }
      //  }
      //);
      updatedFields = Object.keys(fieldsHandlers).reduce(
        (result: StringMap, fieldName: string) => {
          const fieldReducer = updatedFields[fieldName];

          const prevFieldState = (state as StringMap)[fieldName];
          const newFieldState = fieldReducer(prevFieldState, action, action[ACTION_PAYLOAD_FIELD]);
          // link compare
          if (newFieldState !== prevFieldState) {
            result[fieldName] = newFieldState;
          }
          return result;
        },
        {}
      );
    }

    if (Object.keys(updatedFields).length > 0) {
      state = {
        ...state,
        ...updatedFields,
      };
    }

    // handlers
    if (action && typeof action.type === 'string' && action.type in handlers) {
      // todo @ANKU @LOW - @ts-ignore
      //@ts-ignore
      let caseReducer = handlers[action.type];
      if (typeof caseReducer === 'string') {
        // если редьюсер это имя поля, то нужно все, что вернется в payload пихнуть под этой переменной
        caseReducer = createForFieldCaseReducer.bind(this, caseReducer);
      }
      return caseReducer(state, action, action[ACTION_PAYLOAD_FIELD]);
    }

    if (defaultHandler) {
      if (typeof defaultHandler !== 'function') {
        // todo @ANKU @LOW - @i18n
        throw UniErrorHelper.createThrowableUniError({
          internalMessage: '"defaultHandler" should be function for createReducer function',
        });
      }
      return defaultHandler(state, action, action[ACTION_PAYLOAD_FIELD]);
    }

    return state;
  };
}



