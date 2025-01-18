import type { FieldMetadata, StringFieldMetadata } from "../../../types";

import LoanStringField from "../LoanStringField/LoanStringField";

// TODO move to utils
const isStringField = (field: FieldMetadata): field is StringFieldMetadata =>  {
  return field.type === 'string'
}

interface  LoanFieldInputProps {
	field: FieldMetadata;
	value?: unknown;
}

const LoanFieldInput = ({field}: LoanFieldInputProps) => {

  if (isStringField(field)){
    return <LoanStringField field={field} />
  }

  return false
};


export default LoanFieldInput