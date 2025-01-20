import type { StandardInputProps } from '../types';
import type { StringFieldMetadata } from '../../../types';
import { useCallback, useMemo } from 'react';

type StringLoanFieldInputProps = {
	field: StringFieldMetadata;
	value?: string;
} & StandardInputProps;

const StringLoanFieldInput = ({
	field,
	onChange,
	...restProps
}: StringLoanFieldInputProps) => {
	const regex = useMemo(
		() => new RegExp(field.conditions.regex),
		[field.conditions.regex]
	);

	const onComponentChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>): void => {
			const value = event.target.value;
			const isValid = regex.test(value);

			onChange({
				hasError: !isValid,
				value: value,
				errorMessage: !isValid ? 'Must not use invalid charactors' : undefined,
			});
		},
		[onChange, regex]
	);

	return (
		<input
			type="text"
			onChange={onComponentChange}
			{...restProps}
		/>
	);
};

export default StringLoanFieldInput;
