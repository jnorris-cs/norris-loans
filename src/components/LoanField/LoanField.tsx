import LoanFieldInput from "../LoanFieldInput/LoanFieldInput";
import {
	fieldReducer,
	initialState,
	FieldChangeAction,
} from "../../reducers/FieldReducer";
import { useMemo, useReducer } from "react";
import type { FieldMetadata, InputValue } from "../../types";

import "./LoanField.scss";

interface LoanFieldProps {
	field: FieldMetadata;
	value?: InputValue;
}

const LoanField = ({ field, value }: LoanFieldProps) => {
	const [state, dispatch] = useReducer(fieldReducer, {
		...initialState,
		initialValue: value,
		value: value,
	});

	const classNames = useMemo<string>(() => {
		const classes = ["mb3", "loan-field"];

		if (state.hasError && state.isDirty) {
			classes.push("loan-field__invalid");
		} else if (!state.hasError) {
			classes.push("loan-field__valid");
		}

		return classes.join(" ");
	}, [state.isDirty, state.hasError]);

	// handle input events
	const onFocus = () => dispatch({ type: "focus" });
	const onChange = (payload: FieldChangeAction) =>
		dispatch({
			type: "change",
			value: payload,
		});
	const onBlur = () => dispatch({ type: "blur" });

	return (
		<div className={classNames}>
			<label className="db mb1" htmlFor={field.field}>
				{field.display}
			</label>
			<LoanFieldInput
				field={field}
				value={state.value}
				onChange={onChange}
				onBlur={onBlur}
				onFocus={onFocus}
			/>
			{state.errorMessage && (
				<div className="loan-field-error-message">{state.errorMessage}</div>
			)}
		</div>
	);
};

export default LoanField;
