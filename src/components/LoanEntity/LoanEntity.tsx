import { useState } from "react";
import type {
	LoanEntityMetadata,
} from "../../types";
import LoanField from '../LoanField/LoanField'


interface  LoanEntityProps {
	entity: LoanEntityMetadata;
  values?: Record<string, unknown>
}

const  LoanEntity = ({ entity, values }:  LoanEntityProps) => {

	const [showFields, setShowFields] = useState(true);


	return <fieldset className="bw0 pa0 mb4">
    <legend className="fw6 f3 mb2">{entity.name}</legend>  
		<></>
		{ showFields?
			entity.fields.map((field) => <LoanField field={field} key={field.field} />)
			: false
		}
  </fieldset>;
};

export default  LoanEntity;
