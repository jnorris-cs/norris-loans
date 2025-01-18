import type {
	FieldMetadata,
} from "../../types";


interface  LoanEntityProps {
	field: FieldMetadata;
  value?: unknown
}

const  LoanEntity = ({ field, value }:  LoanEntityProps) => {


	return <div>
    <label>{field.display}</label>  
  </div>;
};

export default  LoanEntity;
