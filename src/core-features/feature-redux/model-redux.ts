import { AnyAction, Dispatch } from 'redux';

import UniError from '../feature-uni-error/model-uni-error';

import { getStateType } from './global-state';

export const ACTION_PAYLOAD_FIELD = 'payload';
export const ACTION_ID_FIELD = 'uuid';
export const ACTION_PROMISE_UNI_ERROR_FIELD = 'promiseError';

export type FETCHING_TYPE = string;
export type SUCCESS_TYPE = string;
export type FAILED_TYPE = string;
export type FETCH_ACTION_TYPE = [FETCHING_TYPE, SUCCESS_TYPE, FAILED_TYPE];

export interface SimpleAction<PAYLOAD = any, TYPE = string> extends AnyAction {
  type: TYPE | FETCH_ACTION_TYPE;
  uuid?: string | number,
  payload?: PAYLOAD | Promise<PAYLOAD>;
  errorIsAnswer?: boolean;
  error?: UniError;
  [ACTION_PROMISE_UNI_ERROR_FIELD]?: UniError;
}

export type ThunkAction<PAYLOAD = any> = (
  dispatch: Dispatch<SimpleAction<PAYLOAD>>,
  getState: getStateType
) => Promise<void> | void;

export type UniAction<PAYLOAD = any> = ThunkAction<PAYLOAD> | SimpleAction<PAYLOAD>;


//export type Reducer<S = any, A extends Action = AnyAction> = (
//  state: S | undefined,
//  action: A
//) => S
export type UniReducer<
  S = any,
  A extends AnyAction = SimpleAction,
  P = any,
> = (
  state: S,
  action: A,
  payload?: P | undefined,
) => S | undefined;

