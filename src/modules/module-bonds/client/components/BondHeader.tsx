import React from 'react';

import { Bond } from '../model-bond';

export interface Props {
  bond: Bond | undefined;
  bondFetching: boolean;
}

export default function BondHeader(props: Props) {
  const {
    bondFetching,
    bond,
  } = props;

  function renderBond(bond: Bond) {
    const {
      Isin,
      //Name,
      Coupon,
      Currency,
      Maturity_Date,
      LastTradeDate,
      ClassificationData: {
        IndustryGroup,
      },
      IssueData: {
        Issuer,
      }
    } = bond;

    return (
      <>
        <div>
          <h3>{ Issuer } { Coupon }% { new Date(Maturity_Date).getFullYear() }</h3>
          <span>{ Currency }</span>
        </div>
        <div>
          { Isin }
        </div>
        <div>
          { Issuer }{ IndustryGroup }, till { LastTradeDate }
        </div>
      </>
    );
  }
  return (
    <div>
      {
        !bond || bondFetching
          ? 'Loading...'
          : renderBond(bond!)
      }
    </div>
  );
}
