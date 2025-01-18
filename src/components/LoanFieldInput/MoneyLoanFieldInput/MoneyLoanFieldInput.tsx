import CurrencyInput from 'react-currency-input-field';
import type { FieldMetadata } from "../../../types";

interface MoneyLoanFieldInputProps {
	field: FieldMetadata;
	value?: number;
}

const MoneyLoanFieldInput = ({ field }: MoneyLoanFieldInputProps) => {
	return (
		<CurrencyInput
			prefix="$"
			name={field.field}
			decimalsLimit={2}
		/>
	)
};

export default MoneyLoanFieldInput;
