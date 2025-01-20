import type { FieldMetadata, InputValue } from 'types';

import LoanFieldInput from 'components/LoanFieldInput/LoanFieldInput';
import { UpdateLoanContext } from 'contexts/UpdateLoanContext';
import { useCallback, useContext, useMemo, useReducer } from 'react';

import {
	FieldChangeAction,
	fieldReducer,
	initialState,
} from './FieldReducer/FieldReducer';
import LoanFieldIcon from './LoanFieldIcon/LoanFieldIcon';
import { useSaveField } from './useSaveField/useSaveField';
import './LoanField.scss';

interface LoanFieldProps {
	field: FieldMetadata;
	value?: InputValue;
}

const LoanField = ({ field }: LoanFieldProps) => {
	// field state and logic
	const { getFieldValue, updateLoan } = useContext(UpdateLoanContext);
	const value = getFieldValue(field);
	const [state, dispatch] = useReducer(fieldReducer, {
		...initialState,
		initialValue: value,
		value: value,
	});

	useSaveField({
		dispatch,
		field,
		isSaving: state.isSaving,
		updateLoan,
		value: state.value,
	});

	// html values
	const id = useMemo(
		() => `${field.entity}.${field.field}`,
		[field.entity, field.field]
	);
	const classNames = useMemo<string>(() => {
		const classes = ['mb3', 'loan-field'];

		if (state.hasError && state.isDirty) {
			classes.push('loan-field__invalid');
		} else if (!state.hasError) {
			classes.push('loan-field__valid');
		}

		return classes.join(' ');
	}, [state.isDirty, state.hasError]);

	// input events handlers
	const onFocus = () => dispatch({ type: 'focus' });
	const onChange = (payload: FieldChangeAction) =>
		dispatch({
			type: 'change',
			value: payload,
		});
	const onBlur = useCallback(() => {
		const canSave = !state.hasError && state.value !== state.initialValue;
		dispatch({ type: 'blur', value: canSave });
	}, [dispatch, state.hasError, state.value, state.initialValue]);

	return (
		<div className={classNames}>
			<label
				className="db mb1"
				htmlFor={id}
			>
				{field.display}
			</label>
			<LoanFieldInput
				field={field}
				id={id}
				name={id}
				onBlur={onBlur}
				onChange={onChange}
				onFocus={onFocus}
				value={state.value}
			/>
			<LoanFieldIcon {...state} />
			{state.errorMessage && (
				<div className="loan-field-error-message">{state.errorMessage}</div>
			)}
		</div>
	);
};

export default LoanField;
