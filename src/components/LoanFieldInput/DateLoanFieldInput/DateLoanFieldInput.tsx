import type { FieldMetadata } from "../../../types";

interface DateLoanFieldInputProps {
	field: FieldMetadata;
	value?: Date;
}

const DateLoanFieldInput = ({ field }: DateLoanFieldInputProps) => {
	return <input type="date" name={field.field} className="field-input" />;
};

export default DateLoanFieldInput;
