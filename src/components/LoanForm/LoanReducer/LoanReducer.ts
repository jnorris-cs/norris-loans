import type { Loan } from 'types';

import { deepMerge } from 'utils/deepMerge';

type LoanAction = { type: 'patch'; value: Partial<Loan> };
interface State {
  loan: Loan;
}

export const loanReducer = (state: State, action: LoanAction): State => {
  switch (action.type) {
    case 'patch':
      return {
        loan: deepMerge<Loan>({}, state.loan, action.value),
      };
    default:
      throw new Error('Unknown action');
  }
};
