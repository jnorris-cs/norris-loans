import type { StringFieldMetadata } from "../../../types";

interface LoanStringFieldProps {
	field: StringFieldMetadata;
	value?: string;
}

const LoanStringField = ({ field }: LoanStringFieldProps) => {
	return (
		<input type="text" name={field.field} pattern={field.conditions.regex} />
	);
};

export default LoanStringField;
