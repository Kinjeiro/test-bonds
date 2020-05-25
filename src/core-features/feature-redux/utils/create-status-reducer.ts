import { getFetchTypesByType } from './utils-redux';
import { FETCH_ACTION_TYPE, SimpleAction } from '../model-redux';

export class StatusState {
  constructor(
    readonly isFetching: boolean = false,
    readonly isLoaded: boolean = false,
    readonly isFailed: boolean = false,
    readonly isResponseNotEmpty?: boolean,
    readonly error?: object | undefined,
    readonly updated?: Date,
  ) {
  }
}

export const INITIAL_STATE : StatusState = new StatusState();

/**
 *
 * @param typesArray - один или несколько массивов, в каждом по три types. Первый - fetch, второй - success, третий -
 *   fail
 */
export default function createStatusReducer(...typesArray: FETCH_ACTION_TYPE) {
  const { fetch, success, fail } = getFetchTypesByType(...typesArray);
  const allTypes = [...fetch, ...success, ...fail];

  return (state = INITIAL_STATE, { type, payload, error }: SimpleAction) => {
    const typeSingle = type as string;
    if (!allTypes.includes(typeSingle)) {
      return state;
    }

    const isFetching = fetch.includes(typeSingle);
    const isFailed = fail.includes(typeSingle);
    const isLoaded = !isFailed && (state.isLoaded || success.includes(typeSingle));
    const isResponseNotEmpty = payload === 0 || typeof payload === 'boolean' || !!payload;
    const finalError = (isFetching || isLoaded) ? null : error || (payload || state).error;

    return new StatusState(
      isFetching,
      isLoaded,
      isFailed,
      isResponseNotEmpty,
      finalError,
      new Date(),
    );
  };
}


