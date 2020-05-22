import isNil from 'lodash/isNil';
import uniqueId from 'lodash/uniqueId';
import mergeWith from 'lodash/mergeWith';
import cloneDeepWith from 'lodash/cloneDeepWith';
import cloneDeepLodash from 'lodash/cloneDeep';
import { ACTION_ID_FIELD, ACTION_PAYLOAD_FIELD, FETCH_ACTION_TYPE } from '../model-redux';

// todo @ANKU @LOW - @refac replace : any //@ts-ignore

/*
@guide -
- rootReducer - main state
- sliceReducer - part of main state
- caseReducer - one type function
*/

/**
 * check action
 *
 * @param reducerFunction
 * @param reducerPredicate
 * @returns {function(*=, *=)}
 */
export function createFilteredReducer(reducerFunction: any, reducerPredicate: any) {
  return (state: any, action: any) => {
    const isInitializationCall = state === undefined;
    const shouldRunWrappedReducer = reducerPredicate(action, state) || isInitializationCall;
    return shouldRunWrappedReducer
      ? reducerFunction(state, action)
      : state;
  };
}

export function createFilteredByIdReducer(
  reducerFunction: any,
  {
    idField = null,

    generateInitId = false,
    exactlyId = null,
    actionIdField = null,
    stateIdField = null,
  },
) {
  return (state: any, action: any) => {
    let newState = state;

    const defaultIdField = idField || actionIdField || stateIdField || ACTION_ID_FIELD;

    const isInitializationCall = state === undefined;
    const shouldRunWrappedReducer = isNil(exactlyId)
      ? action[actionIdField || defaultIdField] === state[stateIdField || defaultIdField]
      : action[actionIdField || defaultIdField] === exactlyId;

    if (isInitializationCall || shouldRunWrappedReducer) {
      newState = reducerFunction(state, action);
    }

    //@ts-ignore
    if (isNil(newState[stateIdField]) && generateInitId) {
      newState = {
        ...newState,
        [stateIdField || defaultIdField]: exactlyId || uniqueId(),
      };
    }

    return newState;
  };
}

export function createForFieldCaseReducer(fieldName: any, state: any, action: any) {
  return {
    ...state,
    [fieldName]: action[ACTION_PAYLOAD_FIELD],
  };
}

export function createAllTypesReducer(TYPES: any, reducer: any) {
  const typesValues = Object.values(TYPES);
  return (state: any, action: any) => {
    if (typesValues.indexOf(action.type) >= 0) {
      return reducer(state, action);
    }
    return state;
  };
}

/**
 *
 * @param TYPES
 * @param reducer
 * @param actionIdField
 * @param createIfNotExist - bool | (initialState, action) => {}
 * @return {*}
 */
export function createAllTypesMapCollectionReducer(
  TYPES: any,
  reducer: any,
  actionIdField = ACTION_ID_FIELD,
  createIfNotExist = true,
) {
  return createAllTypesReducer(TYPES, (state: any, action: any) => {
    const uuid = action[actionIdField];
    const payload = action[ACTION_PAYLOAD_FIELD];

    if (typeof uuid === 'undefined' || uuid === true) {
      // тип подходит, но не задан uuid - значит на все
      return Object.keys(state)
        .reduce(
          (stateNew, eachUuid) => {
            //@ts-ignore
            // eslint-disable-next-line no-param-reassign
            stateNew[eachUuid] = reducer(state[eachUuid], action, payload);
            return stateNew;
          },
          {},
        );
    }

    const mapItem = state[uuid];
    if (typeof mapItem !== 'undefined' || createIfNotExist) {
      return {
        ...state,
        [uuid]: typeof mapItem === 'undefined' && typeof createIfNotExist === 'function'
          //@ts-ignore
          ? createIfNotExist(reducer(undefined, action), action, payload)
          : reducer(mapItem, action, payload),
      };
    }
    return state;
  });
}

export function getFetchTypes(fetchTypes: any) {
  if (!Array.isArray(fetchTypes)) {
    return {
      fetch: null,
      success: fetchTypes,
      fail: null,
    };
  }
  return {
    fetch: fetchTypes[0],
    success: fetchTypes[1],
    fail: fetchTypes[2],
  };
}

function arrayConcatMergeCustomizer(objValue: any, newValue: any) {
  if (Array.isArray(objValue)) {
    return objValue.concat(newValue);
  }
  return newValue;
}

export function getFetchTypesByType(...arrayOfFetchTypes: FETCH_ACTION_TYPE) : {
  fetch: string[],
  success: string[],
  fail: string[],
} {
  if (!Array.isArray(arrayOfFetchTypes[0])) {
    //@ts-ignore
    // getFetchTypesByType(FETCH, SUCCESS, FAILED) - без массива массивов
    arrayOfFetchTypes = [arrayOfFetchTypes];
  }

  return arrayOfFetchTypes.reduce((result, fetchTypes) => {
    if (!fetchTypes) {
      return result;
    }
    const types = getFetchTypes(fetchTypes);
    return mergeWith(result, types, arrayConcatMergeCustomizer);
  }, {
    fetch: [],
    success: [],
    fail: [],
  });
}

/**
 * !!! mutable
 *
 * @param source
 * @param newObj
 * @return {*}
 */
export function mergeWithConcatArrays(source: any, newObj: any) {
  return mergeWith(source, newObj, arrayConcatMergeCustomizer);
}

export function cloneDeep(value: any, customizer: any = undefined) {
  return customizer
    ? cloneDeepWith(value, customizer)
    : cloneDeepLodash(value);
}
