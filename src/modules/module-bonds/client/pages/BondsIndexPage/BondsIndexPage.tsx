import React from 'react';
import { Link } from 'react-router-dom';
import { pathToBond } from '../../routes-paths';
import { BONDS } from '../../api-bonds.mocks';

const BondsIndexPage: React.FC = () => {
  return (
    <div>
      <Link
        to={ pathToBond(BONDS.US910047AG49.Isin) }
      >
        Search test bond!
      </Link>
    </div>
  );
};

export default BondsIndexPage;
