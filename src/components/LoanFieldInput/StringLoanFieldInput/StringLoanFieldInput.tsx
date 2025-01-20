import type { StringFieldMetadata } from 'types';

import { useCallback, useMemo } from 'react';

import type { StandardInputProps } from '../types';

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
				errorMessage: !isValid ? 'Must not use invalid charactors' : undefined,
				hasError: !isValid,
				value: value,
			});
		},
		[onChange, regex]
	);

	return (
		<input
			onChange={onComponentChange}
			type="text"
			{...restProps}
		/>
	);
};

export default StringLoanFieldInput;
