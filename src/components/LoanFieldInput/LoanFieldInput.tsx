import StringLoanFieldInput from './StringLoanFieldInput/StringLoanFieldInput';
import MoneyLoanFieldInput from './MoneyLoanFieldInput/MoneyLoanFieldInput';
import DateLoanFieldInput from './DateLoanFieldInput/DateLoanFieldInput';

import type {
	StandardInputProps,
	DateLoanFieldInputProps,
	MoneyLoanFieldInputProps,
	StringLoanFieldInputProps,
} from './types';
import type { FieldMetadata, InputValue } from '../../types';

const isStringField = (
	props: StandardInputProps
): props is StringLoanFieldInputProps => {
	return props.field.type === 'string';
};

const isDateField = (
	props: StandardInputProps
): props is DateLoanFieldInputProps => {
	return props.field.type === 'date';
};

const isMoneyField = (
	props: StandardInputProps
): props is MoneyLoanFieldInputProps => {
	return props.field.type === 'money';
};

type LoanFieldInputProps = {
	field: FieldMetadata;
	value?: InputValue;
} & StandardInputProps;

const LoanFieldInput = (props: LoanFieldInputProps) => {
	if (isStringField(props)) {
		return <StringLoanFieldInput {...props} />;
	}
	if (isMoneyField(props)) {
		return <MoneyLoanFieldInput {...props} />;
	}
	if (isDateField(props)) {
		return <DateLoanFieldInput {...props} />;
	}

	return false;
};

export default LoanFieldInput;
