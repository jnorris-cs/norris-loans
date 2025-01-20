import { createContext } from 'react';
import type { FieldMetadata, InputValue, Loan } from '../types';

export interface UpdateLoanContextType {
	updateLoan: (loan: Loan) => void;
	getFieldValue: (field: FieldMetadata) => InputValue;
}

export const UpdateLoanContext = createContext<UpdateLoanContextType>({
	updateLoan: () => {},
	getFieldValue: () => '',
});
