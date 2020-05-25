import { Dispatch, Middleware, MiddlewareAPI } from 'redux';
import UniErrorHelper from '../feature-uni-error/helper-uni-error';
import { ACTION_PROMISE_UNI_ERROR_FIELD, SimpleAction, ThunkAction, UniAction } from './model-redux';
// ======================================================
// MODULE
// ====================================================== import {ACTION_PROMISE_UNI_ERROR_FIELD, SimpleAction,
// ThunkAction, UniAction} from './model-redux';

// improved redux-thunk version
function isPromise(promise: any) {
  // noinspection Eslint
  // eslint-disable-next-line
  return promise && (Promise.resolve(promise) == promise || promise.then);
}

const promiseMiddleware: Middleware = ({ dispatch, getState }: MiddlewareAPI) => (next: Dispatch<SimpleAction> ) => (action: UniAction) => {
  // default action
  if (typeof action === 'function') {
    return (action as ThunkAction)(dispatch, getState);
  }

  const {
    payload,
    type,
    types, // @depracated - use type (variable for backreference support)
    // бывает что сервер если что-то не найдено отвечает ошибкой с http кодом и ее не нужно показывать как глобальную
    errorIsAnswer,
    ...other
  } = action as SimpleAction;


  if (!isPromise(payload)) {
    return next(action);
  }

  const promise = payload;

  // @guide - можно подать название экшена в поле type, либо 3 названия для отслеживания разных статусов promise запроса
  const [REQUEST, SUCCESS, FAILURE] = Array.isArray(type)
    ? type
    : types || [null, type, null];

  if (REQUEST) {
    // если есть разбиение на стадии - сначала сообщаем, что мы начали загрузку
    next({
      payload,
      ...other,
      type: REQUEST,
    });
  }

  const actionPromise = typeof promise === 'function'
    ? promise(dispatch, getState)
    : promise;

  return actionPromise
    .then((promisePayload: any) => {
      // check all server error formats, because some systems can send 200 code with json error
      const uniError = UniErrorHelper.parse(promisePayload, undefined, { withoutException: true });
      if (uniError) {
        return Promise.reject(uniError);
      }

      return next(
        {
          payload: promisePayload,
          ...other,
          type: SUCCESS,
        },
      );
    })
    .catch((errors: any) => {
      const resultUniError = UniErrorHelper.create(errors);

      // todo @ANKU @LOW - Logger
      // todo @ANKU @LOW - Notification system

      if (FAILURE) {
        return next(
          {
            payload,
            ...other,
            error: resultUniError,
            [ACTION_PROMISE_UNI_ERROR_FIELD]: resultUniError,
            type: FAILURE,
          },
        );
      }

      return resultUniError;
    });
};

export default promiseMiddleware;
