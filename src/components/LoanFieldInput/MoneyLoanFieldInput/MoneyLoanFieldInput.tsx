import CurrencyInput from "react-currency-input-field";
import type { MoneyFieldMetadata } from "../../../types";
import { useCallback } from "react";
import type { StandardInputProps } from "../types";

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})

type MoneyLoanFieldInputProps = {
	field: MoneyFieldMetadata;
	value?: number;
} & StandardInputProps

const MoneyLoanFieldInput = ({ field, value, onBlur, onChange }: MoneyLoanFieldInputProps) => {
	const onComponentChange = useCallback((stringValue: string | undefined): void => {
		const numericValue = Number(stringValue);
		const errorMessages: string[] = []
		const { minValue, maxValue } = field.conditions;
		const isMinCorrect = !minValue || minValue <= numericValue;
		const isMaxCorrect = !maxValue || maxValue >= numericValue;

		if (!isMinCorrect) {
			errorMessages.push(`must be greater than or equal to ${formatter.format(minValue)}`)
		}
		if (!isMaxCorrect) {
			errorMessages.push(`must be less than or equal to ${formatter.format(maxValue)}`)
		}

		onChange({
			hasError: !isMinCorrect || !isMaxCorrect,
			errorMessage: errorMessages.join(' '),
			value: numericValue
		})
	}, [onChange])
	
	return <CurrencyInput 
		prefix="$" 
		value={value}
		name={field.field} 
		decimalsLimit={2} 
		onValueChange={onComponentChange}
		onBlur={onBlur} />;
};

export default MoneyLoanFieldInput;
