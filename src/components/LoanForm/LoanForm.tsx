import type { FieldMetadata } from 'types';

import LoanEntity from 'components/LoanEntity/LoanEntity';
import { UpdateLoanContext } from 'contexts/UpdateLoanContext';

import { useGroupFieldsByEntity } from './useGroupFieldsByEntity/useGroupFieldsByEntity';
import { useLoan } from './useLoan/useLoan';

interface LoanFormProps {
	fields: FieldMetadata[];
}

const LoanForm = ({ fields }: LoanFormProps) => {
	const entities = useGroupFieldsByEntity(fields); // convert flat fields into entity objects
	const updateLoanContext = useLoan();

	return (
		<form
			action="#"
			autoComplete="off"
			className="content pt3"
		>
			<UpdateLoanContext.Provider value={updateLoanContext}>
				{entities.map((entity) => (
					<LoanEntity
						entity={entity}
						key={entity.name}
					/>
				))}
			</UpdateLoanContext.Provider>
		</form>
	);
};

export default LoanForm;
