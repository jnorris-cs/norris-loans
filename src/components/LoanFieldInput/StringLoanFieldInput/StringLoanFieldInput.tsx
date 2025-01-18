import type { StringFieldMetadata } from "../../../types";

interface StringLoanFieldInputProps {
	field: StringFieldMetadata;
	value?: string;
}

const StringLoanFieldInput = ({ field }: StringLoanFieldInputProps) => {
	return (
		<input
			type="text"
			name={field.field}
			pattern={field.conditions.regex}
			className="field-input"
		/>
	);
};

export default StringLoanFieldInput;
