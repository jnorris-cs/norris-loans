import LoanFieldInput from "../LoanFieldInput/LoanFieldInput";
import LoanFieldIcon from "./LoadFieldIcon/LoadFieldIcon";
import {
	fieldReducer,
	initialState,
	FieldChangeAction,
} from "../../reducers/FieldReducer";
import { useCallback, useEffect, useMemo, useReducer } from "react";
import type { FieldMetadata, InputValue } from "../../types";

import "./LoanField.scss";

interface LoanFieldProps {
	field: FieldMetadata;
	value?: InputValue;
}

const LoanField = ({ field, value = "" }: LoanFieldProps) => {
	const [state, dispatch] = useReducer(fieldReducer, {
		...initialState,
		initialValue: value,
		value: value,
	});

	const id = useMemo(
		() => `${field.entity}.${field.field}`,
		[field.entity, field.field],
	);
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
	const onBlur = useCallback(() => {
		const canSave = !state.hasError && state.value !== state.initialValue;
		dispatch({ type: "blur", value: canSave });
	}, [dispatch, state.hasError, state.value, state.initialValue]);

	useEffect(() => {
		if (!state.isSaving) {
			return;
		}

		setTimeout(() => {
			dispatch({ type: "save-success" });
			setTimeout(() => {
				dispatch({ type: "clear-save-success" });
			}, 3000);
		}, 3000);
	}, [state.isSaving]);

	return (
		<div className={classNames}>
			<label className="db mb1" htmlFor={id}>
				{field.display}
			</label>
			<LoanFieldInput
				field={field}
				id={id}
				name={id}
				value={state.value}
				onChange={onChange}
				onBlur={onBlur}
				onFocus={onFocus}
			/>
			<LoanFieldIcon {...state} />
			{state.errorMessage && (
				<div className="loan-field-error-message">{state.errorMessage}</div>
			)}
		</div>
	);
};

export default LoanField;
