import LoanFieldInput from "../LoanFieldInput/LoanFieldInput";
import type { FieldMetadata } from "../../types";

interface LoanFieldProps {
	field: FieldMetadata;
	value?: unknown;
}

const LoanField = ({ field }: LoanFieldProps) => {
	return (
		<div className="mb3">
			<label className="db mb1" htmlFor={field.field}>
				{field.display}
			</label>
			<LoanFieldInput field={field} />
		</div>
	);
};

export default LoanField;
