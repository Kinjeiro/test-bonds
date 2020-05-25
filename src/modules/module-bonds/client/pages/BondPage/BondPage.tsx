import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

// ======================================================
// MODULE
// ======================================================
import useStyles from './BondPage.css';
import { actions } from '../../redux-bonds';
import { selectBond, selectBondStatus, selectBondDataRequest } from '../../redux-selectors-bonds';
import { useActions } from '../../../../../core-features/feature-redux/use-actions';
import { PARAM__BOND_ID } from '../../routes-paths';
import { BondGroupBy, BondDatePeriodType } from '../../model-bond';
import BondGraph from '../../components/BondGraph';
import BondHeader from '../../components/BondHeader';

interface Props {
}

const BondPage : React.FunctionComponent<Props> = () => {
  const {
    [PARAM__BOND_ID]: bondId,
  } = useParams();
  const bond = useSelector(selectBond);
  const bondStatus = useSelector(selectBondStatus);
  const {
    bondDataRequest,
    actionLoadBondDataStatus,
  } = useSelector(selectBondDataRequest);
  const {
    actionLoadBond,
    actionLoadBondData,
  } = useActions(actions);

  // ======================================================
  // STATE
  // ======================================================
  const [period, setPeriod] = useState(BondDatePeriodType.Month);
  const [groupBy, setGroupBy] = useState(BondGroupBy.Price);

  // ======================================================
  // LIFECYCLE
  // ======================================================
  useEffect(() => { actionLoadBond(bondId) }, [actionLoadBond, bondId]);
  useEffect(() => { actionLoadBondData(bondId, period, groupBy) }, [actionLoadBondData, bondId, period, groupBy]);


  // ======================================================
  // HANDLERS
  // ======================================================


  // ======================================================
  // MAIN RENDER
  // ======================================================
  const classes = useStyles();

  return (
    <div className={ classes.root }>
      <BondHeader
        bond={ bond }
        bondFetching={ !bondStatus || bondStatus.isFetching }
      />
      <BondGraph
        bond={ bond! }
        bondDataRequest={ bondDataRequest }
        bondDataRequestFetching={ !actionLoadBondDataStatus || actionLoadBondDataStatus.isFetching }
        onPeriodChange={ setPeriod }
        onGroupByChange={ setGroupBy }
      />
    </div>
  );
};

export default BondPage;
