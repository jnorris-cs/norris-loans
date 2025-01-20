import type { FieldMetadata, InputValue, Loan } from 'types';

import { createContext } from 'react';

export interface UpdateLoanContextType {
	getFieldValue: (field: FieldMetadata) => InputValue;
	updateLoan: (loan: Loan) => void;
}

export const UpdateLoanContext = createContext<UpdateLoanContextType>({
	getFieldValue: () => '',
	updateLoan: () => {},
});
