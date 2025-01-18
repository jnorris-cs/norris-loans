import type { FieldMetadata } from "../../../types";

interface MoneyLoanFieldInputProps {
	field: FieldMetadata;
	value?: number;
}

const MoneyLoanFieldInput = ({ field }: MoneyLoanFieldInputProps) => {
	return <input type="number" name={field.field} />;
};

export default MoneyLoanFieldInput;
