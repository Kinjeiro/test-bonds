import { ReduxBonds } from './redux-bonds';

export const selectBond = (globalState: ReduxBonds) => globalState.bondsState.bond;
export const selectBondStatus = (globalState: ReduxBonds) => globalState.bondsState.actionLoadBondStatus;
export const selectBondDataRequest = (globalState: ReduxBonds) => ({
  bondDataRequest: globalState.bondsState.bondDataRequest,
  actionLoadBondDataStatus: globalState.bondsState.actionLoadBondDataStatus,
});
