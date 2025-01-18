import LoanFieldInput from "../LoanFieldInput/LoanFieldInput";
import {fieldReducer, initialState} from '../../reducers/useField'
import {useEffect, useMemo, useReducer} from 'react';
import type { FieldMetadata, InputValue } from "../../types";

import './LoanField.css'

interface LoanFieldProps {
	field: FieldMetadata;
	value?: InputValue;
}

const LoanField = ({ field, value }: LoanFieldProps) => {
	const [state, dispatch] = useReducer(fieldReducer, initialState);

	useEffect(() => {
		dispatch({ type: "initialize", value })
	}, [value])

	const classNames = useMemo<string>(() => {
		const classes = ['mb3', 'loan-field'];

		if (state.isFocused) {
			classes.push('focused')
		}

		if (state.hasError) {
			classes.push('invalid')
		}

		return classes.join(' ');
	}, [state.isFocused, state.isSaving]);

	return (
		<div className={classNames}>
			<label className="db mb1" htmlFor={field.field}>
				{field.display}
			</label>
			<LoanFieldInput field={field} />
		</div>
	);
};

export default LoanField;
