import createReducer from '../../../core-features/feature-redux/utils/create-reducer';
import createStatusReducer, { StatusState } from '../../../core-features/feature-redux/utils/create-status-reducer';
import { SimpleAction, UniAction } from '../../../core-features/feature-redux/model-redux';
import { GlobalState } from '../../../core-features/feature-redux/global-state';

// ======================================================
// MODULE
// ======================================================
import * as api from './api-bonds';
import { Bond, BondDatePeriodType, BondGroupBy } from './model-bond';
import { BondDataRequest } from './api-bonds';

// ======================================================
// INITIAL STATE
// ======================================================
export class BondsReduxState implements GlobalState {
  bond: Bond | undefined;
  bondDataRequest: BondDataRequest | undefined;
  actionLoadBondStatus!: StatusState;
  actionLoadBondDataStatus!: StatusState;
}
export const initialState: BondsReduxState = new BondsReduxState();


// ======================================================
// TYPES
// ======================================================
const PREFIX = 'bonds';
export const TYPES = {
  LOAD_BOND_FETCH:     `${PREFIX}/LOAD_BOND_FETCH`,
  LOAD_BOND_SUCCESS:   `${PREFIX}/LOAD_BOND_SUCCESS`,
  LOAD_BOND_FAIL:      `${PREFIX}/LOAD_BOND_FAIL`,

  LOAD_BOND_DATA_FETCH:     `${PREFIX}/LOAD_BOND_DATA_FETCH`,
  LOAD_BOND_DATA_SUCCESS:   `${PREFIX}/LOAD_BOND_DATA_SUCCESS`,
  LOAD_BOND_DATA_FAIL:      `${PREFIX}/LOAD_BOND_DATA_FAIL`,
};

// ======================================================
// ACTION CREATORS
// ======================================================
export function getBindActions(api: { [apiMethod: string]: (...args: any[]) => Promise<any> }) {
  return {
    actionLoadBond(isin: Bond['Isin']): UniAction<Bond> {
      return {
        type: [TYPES.LOAD_BOND_FETCH, TYPES.LOAD_BOND_SUCCESS, TYPES.LOAD_BOND_FAIL],
        payload: api.apiLoadBond(isin),
      };
    },
    actionLoadBondData(isin: Bond['Isin'], period: BondDatePeriodType, groupBy: BondGroupBy) {
      return {
        types: [TYPES.LOAD_BOND_DATA_FETCH, TYPES.LOAD_BOND_DATA_SUCCESS, TYPES.LOAD_BOND_DATA_FAIL],
        // todo @ANKU @LOW - add logic, if period less than prev we should't load data
        payload: api.apiLoadBondData(isin, period, groupBy),
      };
    },
  };
}

export const actions = getBindActions(api);

// ======================================================
// REDUCER
// ======================================================
const reducer = createReducer<BondsReduxState, SimpleAction>(
  initialState,
  {
    [TYPES.LOAD_BOND_SUCCESS]:
      'bond',
    [TYPES.LOAD_BOND_DATA_SUCCESS]:
      'bondDataRequest',
  },
  {
    actionLoadBondStatus: createStatusReducer(
      TYPES.LOAD_BOND_FETCH, TYPES.LOAD_BOND_SUCCESS, TYPES.LOAD_BOND_FAIL,
    ),
    actionLoadBondDataStatus: createStatusReducer(
      TYPES.LOAD_BOND_DATA_FETCH, TYPES.LOAD_BOND_DATA_SUCCESS, TYPES.LOAD_BOND_DATA_FAIL,
    ),
  },
);

export interface ReduxBonds {
  bondsState: BondsReduxState,
}
const reducersMap = {
  bondsState: reducer,
};

export default reducersMap;
