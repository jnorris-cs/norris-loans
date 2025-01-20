import type { FieldMetadata } from 'types';

import React, { useCallback } from 'react';

import type { StandardInputProps } from '../types';

type DateLoanFieldInputProps = {
	field: FieldMetadata;
	value?: string;
} & StandardInputProps;

const DateLoanFieldInput = ({
	onChange,
	...restProps
}: DateLoanFieldInputProps) => {
	const onComponentChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>): void => {
			onChange({
				errorMessage: undefined,
				hasError: false,
				value: event.target.value,
			});
		},
		[onChange]
	);

	return (
		<input
			onChange={onComponentChange}
			type="date"
			{...restProps}
		/>
	);
};

export default DateLoanFieldInput;
