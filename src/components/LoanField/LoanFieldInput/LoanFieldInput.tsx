import { isStringField } from "../../../utils/field-types";
import LoanStringField from "../LoanStringField/LoanStringField";
import type { FieldMetadata } from "../../../types";

interface LoanFieldInputProps {
	field: FieldMetadata;
	value?: unknown;
}

const LoanFieldInput = ({ field }: LoanFieldInputProps) => {
	if (isStringField(field)) {
		return <LoanStringField field={field} />;
	}

	return false;
};

export default LoanFieldInput;
