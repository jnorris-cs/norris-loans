import {
	isStringField,
	isDateField,
	isMoneyField,
} from "../../utils/field-types";
import StringLoanFieldInput from "./StringLoanFieldInput/StringLoanFieldInput";
import MoneyLoanFieldInput from "./MoneyLoanFieldInput/MoneyLoanFieldInput";
import DateLoanFieldInput from "./DateLoanFieldInput/DateLoanFieldInput";
import type { StandardInputProps } from "./types";

import type { FieldMetadata, InputValue } from "../../types";

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
	const standardProps = {
		name: field.field,
		id: field.field,
		onBlur:onBlur,
		onFocus:onFocus,
		onChange: onChange
	}

	if (isStringField(field)) {
		return (
			<StringLoanFieldInput
				{...standardProps}
				field={field}
				value={value}
			/>
		);
	}
	if (isMoneyField(field)) {
		return (
			<MoneyLoanFieldInput
			{...standardProps}
			field={field}
			value={value}
			/>
		);
	}
	if (isDateField(field)) {
		return (
			<DateLoanFieldInput
				{...standardProps}
				field={field}
				value={value}
			/>
		);
	}

	return false;
};

export default LoanFieldInput;
