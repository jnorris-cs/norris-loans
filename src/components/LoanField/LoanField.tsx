import LoanFieldInput from "../LoanFieldInput/LoanFieldInput";
import {fieldReducer, initialState} from '../../reducers/FieldReducer'
import { useEffect, useMemo, useReducer} from 'react';
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
	}, [value, dispatch])

	const classNames = useMemo<string>(() => {
		const classes = ['mb3', 'loan-field'];

		if (state.isFocused) {
			classes.push('focused')
		}

		if (state.hasError) {
			classes.push('invalid')
		}

		return classes.join(' ');
	}, [state.isFocused, state.hasError]);

	// we dont want to show red error messages if field is in focus
	const onFocus = () => dispatch({ type: 'focus-change', value: true });
	const onLostFocus = () => dispatch({ type: 'focus-change', value: false });

	const onChange = (payload) => dispatch({
			type: 'change',
			value:payload
		})
	

	console.log('test 1')

	return (
		<div className={classNames} onFocus={onFocus} onBlur={onLostFocus}>
			<label className="db mb1" htmlFor={field.field}>
				{field.display}
			</label>
			<LoanFieldInput field={field} onChange={onChange} />
			{state.isFocused.toString()}
		</div>
	);
};

export default LoanField;
