import type { InputValue } from "../../types";

export type FieldChangeAction = Pick<State, "hasError" | "errorMessage"> & {
	value: InputValue;
};

export type StandardInputProps = {
	onChange: (payload: FieldChangeAction) => void;
	onBlur: () => void;
	onFocus: () => void;
	name: string;
	id: string;
};

export type DateLoanFieldInputProps = {
	field: FieldMetadata;
	value: string;
} & StandardInputProps;

export type MoneyLoanFieldInputProps = {
	field: MoneyFieldMetadata;
	value?: number;
} & StandardInputProps;

export type StringLoanFieldInputProps = {
	field: StringFieldMetadata;
	value: string;
} & StandardInputProps;
