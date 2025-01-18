import type { InputValue } from "../../types";

export type FieldChangeAction = Pick<State, "hasError" | "errorMessage"> & {
	value: InputValue;
};

export type StandardInputProps = {
	onChange: (payload: FieldChangeAction) => void;
	onBlur: () => void;
	onFocus: () => void;
};
