import type { FieldMetadata, InputValue, Loan } from 'types';

import { createContext } from 'react';

export interface UpdateLoanContextType {
  getFieldValue: (field: FieldMetadata) => InputValue;
  setFieldValue: (loan: Loan) => void;
}

export const UpdateLoanContext = createContext<UpdateLoanContextType>({
  getFieldValue: () => '',
  setFieldValue: () => {},
});
