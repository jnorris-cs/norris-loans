import type { FieldMetadata, InputValue, Loan } from 'types';

import { useCallback, useState } from 'react';
import { deepMerge } from 'utils/deepMerge';
import { getFromStorage, setInStorage } from 'utils/localStorage';

const LOAN_STORAGE_KEY = 'loan';

export const useLoan = () => {
	const savedValue = getFromStorage<Loan>(LOAN_STORAGE_KEY) ?? {};
	// we want to merge in case any new fields have been added since the last time the user saved
	const initialLoan = deepMerge<Loan>({}, savedValue);
	const [loan, setLoan] = useState<Loan>(initialLoan);

	const updateLoan = (patchRecord: Partial<Loan>): void => {
		const newLoan = deepMerge<Loan>({}, loan, patchRecord);
		console.log('updated in global state', newLoan);
		setLoan(newLoan);
		setInStorage(LOAN_STORAGE_KEY, newLoan);
	};

	const getFieldValue = useCallback(
		(field: FieldMetadata): InputValue => {
			if (!loan[field.entity]) {
				loan[field.entity] = {};
			}

			return loan[field.entity][field.field] ?? '';
		},
		[loan]
	);

	return {
		getFieldValue,
		updateLoan,
	};
};
