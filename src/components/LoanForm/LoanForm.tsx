import LoanEntity from "../LoanEntity/LoanEntity";
import type { FieldMetadata } from "../../types";

import { useLoan } from "./useLoan/useLoan";
import { useEntities } from "./useEntities/useEntities";
import { UpdateLoanContext } from "../../contexts/UpdateLoanContext";

interface LoanFormProps {
	fields: FieldMetadata[];
}

const LoanForm = ({ fields }: LoanFormProps) => {
	const entities = useEntities(fields); // convert flat fields into entity objects
	const updateLoanContext = useLoan(fields);

	return (
		<div className="content pt3">
			<UpdateLoanContext.Provider value={updateLoanContext}>
				{entities.map((entity) => (
					<LoanEntity entity={entity} key={entity.name} />
				))}
			</UpdateLoanContext.Provider>
		</div>
	);
};

export default LoanForm;
