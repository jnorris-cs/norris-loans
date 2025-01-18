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
}: LoanFieldInputProps) => {
	if (isStringField(field)) {
		return (
			<StringLoanFieldInput
				field={field}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
			/>
		);
	}
	if (isMoneyField(field)) {
		return (
			<MoneyLoanFieldInput
				field={field}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
			/>
		);
	}
	if (isDateField(field)) {
		return (
			<DateLoanFieldInput
				field={field}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
			/>
		);
	}

	return false;
};

export default LoanFieldInput;
