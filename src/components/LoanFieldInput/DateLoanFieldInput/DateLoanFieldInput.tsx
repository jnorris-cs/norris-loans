import React, { useCallback } from "react";

import type { FieldMetadata } from "../../../types";
import type { StandardInputProps } from "../types";

type DateLoanFieldInputProps = {
	field: FieldMetadata;
	value?: string;
} & StandardInputProps;

const DateLoanFieldInput = ({
	field,
	onChange,
	...restProps
}: DateLoanFieldInputProps) => {
	const onComponentChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>): void => {
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
			onChange={onComponentChange}
			{...restProps}
		/>
	);
};

export default DateLoanFieldInput;
