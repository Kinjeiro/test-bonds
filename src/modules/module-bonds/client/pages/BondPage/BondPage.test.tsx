import React from 'react';
import { wait, screen } from '@testing-library/react';

// ======================================================
// MODULE
// ======================================================
import { pathToBond } from '../../routes-paths';
import { BONDS } from '../../api-bonds.mocks';
import { apiLoadBond } from '../../api-bonds';
import renderTestApp from '../../../../../render-test-app';

jest.mock('../../api-bonds');

// Integration test for bonds main graph page
describe.skip('BondPage', () => {
  beforeAll(async () => {
    renderTestApp(pathToBond(BONDS.US910047AG49.Isin));
  });
  test('header should be shown', async () => {
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(apiLoadBond).toHaveBeenCalledTimes(1);
    await wait(() =>
      expect(screen.getByText(BONDS.US910047AG49.IssueData.Issuer)).toBeInTheDocument()
    );
  }, 10000);
});

