import LoanFieldInput from "../LoanFieldInput/LoanFieldInput";
import LoanFieldIcon from "./LoanFieldIcon/LoanFieldIcon";
import {
	fieldReducer,
	initialState,
	FieldChangeAction,
} from "./FieldReducer/FieldReducer";
import { useCallback, useMemo, useReducer, useContext } from "react";
import type { FieldMetadata, InputValue } from "../../types";
import { useSaveField } from "./useSaveField/useSaveField";
import { UpdateLoanContext } from "../../contexts/UpdateLoanContext";

import "./LoanField.scss";

interface LoanFieldProps {
	field: FieldMetadata;
	value?: InputValue;
}

const LoanField = ({ field }: LoanFieldProps) => {
	// field state
	const { updateLoan, getFieldValue } = useContext(UpdateLoanContext);
	const value = getFieldValue(field);
	const [state, dispatch] = useReducer(fieldReducer, {
		...initialState,
		initialValue: value,
		value: value,
	});

	useSaveField({
		isSaving: state.isSaving,
		field,
		value: state.value,
		dispatch,
		updateLoan,
	});

	// html values
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

	// input events handlers
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
