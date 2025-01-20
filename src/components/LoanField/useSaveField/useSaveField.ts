import type { UpdateLoanContextType } from 'contexts/UpdateLoanContext';
import type { Dispatch } from 'react';
import type { FieldMetadata, InputValue, Loan } from 'types';

import { useEffect } from 'react';
import { extractErrorMessage } from 'utils/api';

import { FieldAction } from '../FieldReducer/FieldReducer';

interface SaveFieldProps {
	dispatch: Dispatch<FieldAction>;
	field: FieldMetadata;
	isSaving: boolean;
	updateLoan: UpdateLoanContextType['updateLoan'];
	value: InputValue;
}

// this part is obvious not production code :grimmacing:
const sleep = (ms: number) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};
const apiPatchCall = async (patchRecord: Partial<Loan>, value: InputValue) => {
	console.log('patch api call with this payload', patchRecord);
	await sleep(2000); // 2 seconds to simulate patch

	// test api failures with "bad" or a number that includes "99"
	if (value === 'bad' || value.toString().includes('99')) {
		throw new Error('Save failed');
	}
};

const updateRecord = async ({
	dispatch,
	field,
	updateLoan,
	value,
}: Omit<SaveFieldProps, 'isSaving'>) => {
	const patchRecord = {
		[field.entity]: {
			[field.field]: value,
		},
	};

	try {
		await apiPatchCall(patchRecord, value);
		dispatch({ type: 'save-success' });
		updateLoan(patchRecord); // update global state

		// clear saved message after 3 seconds
		setTimeout(() => {
			dispatch({ type: 'clear-save-success' });
		}, 3000);
	} catch (error: unknown) {
		const errorMessage: string = extractErrorMessage(error);
		dispatch({ type: 'save-failure', value: errorMessage });
	}
};

export const useSaveField = ({
	dispatch,
	field,
	isSaving,
	updateLoan,
	value,
}: SaveFieldProps) => {
	useEffect(() => {
		if (!isSaving) {
			return;
		}

		updateRecord({ dispatch, field, updateLoan, value });
	}, [dispatch, isSaving, field, value, updateLoan]);
};
