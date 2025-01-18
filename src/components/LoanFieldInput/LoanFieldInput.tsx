import StringLoanFieldInput from "./StringLoanFieldInput/StringLoanFieldInput";
import MoneyLoanFieldInput from "./MoneyLoanFieldInput/MoneyLoanFieldInput";
import DateLoanFieldInput from "./DateLoanFieldInput/DateLoanFieldInput";

import type {
	StandardInputProps,
	DateLoanFieldInputProps,
	MoneyLoanFieldInputProps,
	StringLoanFieldInputProps,
} from "./types";
import type { FieldMetadata, InputValue } from "../../types";

const isStringField = (
	props: StandardInputProps,
): props is StringLoanFieldInputProps => {
	return props.field.type === "string";
};

const isDateField = (
	props: StandardInputProps,
): props is DateLoanFieldInputProps => {
	return props.field.type === "date";
};

const isMoneyField = (
	props: StandardInputProps,
): props is MoneyLoanFieldInputProps => {
	return props.field.type === "money";
};

type LoanFieldInputProps = {
	field: FieldMetadata;
	value?: InputValue;
} & StandardInputProps;

const LoanFieldInput = ({
	field,
	value,
	onChange,
	onBlur,
	onFocus,
}: LoanFieldInputProps) => {
	const inputProps = {
		name: field.field,
		id: field.field,
		onBlur: onBlur,
		onFocus: onFocus,
		onChange: onChange,
		field: field,
		value: value ?? "",
	};

	if (isStringField(inputProps)) {
		return <StringLoanFieldInput {...inputProps} />;
	}
	if (isMoneyField(inputProps)) {
		return <MoneyLoanFieldInput {...inputProps} />;
	}
	if (isDateField(inputProps)) {
		return <DateLoanFieldInput {...inputProps} />;
	}

	return false;
};

export default LoanFieldInput;
