import type { FieldMetadata, InputValue, Loan } from '../../../types';
import { getFromStorage } from '../../../utils/localStorage';
import { deepMerge } from '../../../utils/deepMerge';
import { useCallback, useState } from 'react';

export const convertFieldsToEmptyLoan = (fields: FieldMetadata[]): Loan => {
	const loan: Loan = {};

	fields.forEach((field) => {
		if (!loan[field.entity]) {
			loan[field.entity] = {};
		}
		loan[field.entity][field.field] = undefined;
	});

	return loan;
};

export const useLoan = (fields: FieldMetadata[]) => {
	const emptyValue = convertFieldsToEmptyLoan(fields);
	const savedValue = getFromStorage<Loan>('loan') ?? {};
	// we want to merge in case any new fields have been added since the last time the user saved
	const initialLoan = deepMerge<Loan>(savedValue, emptyValue);
	const [loan, setLoan] = useState<Loan>(initialLoan);

	const updateLoan = (patchRecord: Partial<Loan>): void => {
		const newLoan = deepMerge<Loan>(patchRecord, loan);
		// todo make prettier
		console.log('updated in hoisted state', newLoan);
		setLoan(newLoan);
	};

	const getFieldValue = useCallback(
		(field: FieldMetadata): InputValue => {
			return loan[field.entity][field.field] ?? '';
		},
		[loan]
	);

	return {
		updateLoan,
		getFieldValue,
	};
};
