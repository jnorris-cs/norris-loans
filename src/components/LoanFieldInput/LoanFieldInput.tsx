import {
	isStringField,
	isDateField,
	isMoneyField,
} from "../../utils/field-types";
import StringLoanFieldInput from "./StringLoanFieldInput/StringLoanFieldInput";
import MoneyLoanFieldInput from "./MoneyLoanFieldInput/MoneyLoanFieldInput";
import DateLoanFieldInput from "./DateLoanFieldInput/DateLoanFieldInput";

import type { FieldMetadata } from "../../types";

interface LoanFieldInputProps {
	field: FieldMetadata;
	value?: unknown;
}

const LoanFieldInput = ({ field }: LoanFieldInputProps) => {
	if (isStringField(field)) {
		return <StringLoanFieldInput field={field} />;
	}
	if (isMoneyField(field)) {
		return <MoneyLoanFieldInput field={field} />;
	}
	if (isDateField(field)) {
		return <DateLoanFieldInput field={field} />;
	}

	return false;
};

export default LoanFieldInput;
