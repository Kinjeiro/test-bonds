import moment from 'moment';

import { sleep } from '../../../core-features/feature-common-utils/promise-utils';

import { Bond, BondDatePeriodType, BondGroupBy } from './model-bond';
import { BOND_US910047AG49_DATA, BONDS, } from './api-bonds.mocks';

export type BondDataRequest = {
  period: BondDatePeriodType,
  //start?: Date,
  //end?: Date,
  groupBy: BondGroupBy,
  data: number[][],
};

export async function apiLoadBond(isin: Bond['Isin']) : Promise<Bond> {
  return sleep(2000, BONDS[isin]);
}

export async function apiLoadBondData(
  isin: Bond['Isin'],
  period: BondDatePeriodType,
  groupBy: BondGroupBy,
): Promise<BondDataRequest> {
  let resultData: number[][] = [];
  switch (groupBy) {
    case BondGroupBy.Price: resultData = BOND_US910047AG49_DATA.price; break;
    case BondGroupBy.Yield: resultData = BOND_US910047AG49_DATA.yeild; break;
    case BondGroupBy.Spread: resultData = BOND_US910047AG49_DATA.spread; break;
  }

  let resultTime: moment.Moment | undefined = undefined;

  switch (period) {
    case BondDatePeriodType.Week:
      resultTime = moment().subtract(1, 'week').endOf('week');
      break;
    case BondDatePeriodType.Month:
      resultTime = moment().subtract(1, 'month').endOf('month');
      break;
    case BondDatePeriodType.Quarter:
      resultTime = moment().subtract(1, 'quarter').endOf('quarter');
      break;
    case BondDatePeriodType.Year:
      resultTime = moment().subtract(1, 'year').endOf('year');
      break;
    case BondDatePeriodType.Max:
      break;
  }

  if (resultTime) {
    const resultTimestamp: number = resultTime.toDate().getTime();
    // todo @ANKU @LOW - performance func to search (find indexStart \ indexEnd in some iterate and slice it)
    resultData = resultData.filter(([timestamp]) => timestamp > resultTimestamp);
  }

  return sleep(10, {
    period,
    groupBy,
    data: resultData,
  });
}
