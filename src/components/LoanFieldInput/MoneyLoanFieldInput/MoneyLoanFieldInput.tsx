import type { MoneyFieldMetadata } from 'types';

import { useCallback } from 'react';
import CurrencyInput from 'react-currency-input-field';

import type { StandardInputProps } from '../types';

const formatter = new Intl.NumberFormat('en-US', {
	currency: 'USD',
	style: 'currency',
});

type MoneyLoanFieldInputProps = {
	field: MoneyFieldMetadata;
	value?: number;
} & StandardInputProps;

const MoneyLoanFieldInput = ({
	field,
	onChange,
	...restProps
}: MoneyLoanFieldInputProps) => {
	const onComponentChange = useCallback(
		(stringValue: string | undefined): void => {
			const numericValue = Number(stringValue);
			
			if (isNaN(numericValue)){
				return;
			}

			const errorMessages: string[] = [];
			const { maxValue, minValue } = field.conditions;
			const isMinCorrect = !minValue || minValue <= numericValue;
			const isMaxCorrect = !maxValue || maxValue >= numericValue;

			if (!isMinCorrect) {
				errorMessages.push(
					`must be greater than or equal to ${formatter.format(minValue)}`
				);
			}
			if (!isMaxCorrect) {
				errorMessages.push(
					`must be less than or equal to ${formatter.format(maxValue)}`
				);
			}

			onChange({
				errorMessage: errorMessages.join(' '),
				hasError: !isMinCorrect || !isMaxCorrect,
				value: numericValue,
			});
		},
		[onChange, field.conditions]
	);

	return (
		<CurrencyInput
			decimalsLimit={2}
			onValueChange={onComponentChange}
			prefix="$"
			{...restProps}
		/>
	);
};

export default MoneyLoanFieldInput;
