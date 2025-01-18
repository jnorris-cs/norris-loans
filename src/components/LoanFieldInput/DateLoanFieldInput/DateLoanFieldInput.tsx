import React, { useCallback } from "react";

import type { FieldMetadata } from "../../../types";
import type { StandardInputProps } from "../types";

type DateLoanFieldInputProps = {
	field: FieldMetadata;
	value?: string;
} & StandardInputProps;

const DateLoanFieldInput = ({
	field,
	value,
	onBlur,
	onChange,
	onFocus,
}: DateLoanFieldInputProps) => {
	const onComponentChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>): void => {
			console.log(event.target.value);

			onChange({
				hasError: false,
				value: event.target.value,
				errorMessage: undefined,
			});
		},
		[onChange],
	);

	return (
		<input
			type="date"
			name={field.field}
			value={value}
			onBlur={onBlur}
			onChange={onComponentChange}
			onFocus={onFocus}
		/>
	);
};

export default DateLoanFieldInput;
