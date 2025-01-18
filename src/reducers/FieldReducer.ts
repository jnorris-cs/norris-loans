import type { InputValue } from "../types";

interface State {
	isDirty: boolean; // has user blurred once?
	isFocused: boolean;
	hasError: boolean;
	errorMessage?: string;
	initialValue?: InputValue;
	value?: InputValue;
	isSaving: boolean;
	wasSaveSuccussful?: boolean;
}

export type FieldChangeAction = Pick<
	State,
	"hasError" | "errorMessage" | "value"
>;

type FieldAction =
	| { type: "focus" }
	| {
			type: "change";
			value: FieldChangeAction;
	  }
	| { type: "blur" }
	| { type: "save-success" }
	| {
			type: "save-failure";
			value: State["errorMessage"];
	  };

export const initialState: State = {
	isFocused: false,
	isDirty: false,
	hasError: false,
	isSaving: false,
};

export const fieldReducer = (state: State, action: FieldAction): State => {
	switch (action.type) {
		case "focus":
			return { ...state, isFocused: true };
		case "change":
			return { ...state, ...action.value };
		case "blur":
			// eslint-disable-next-line no-case-declarations
			const newState = { ...state, isDirty: true, isFocused: false };

			// if value hasnt changed, go back to initial values
			if (state.value === state.initialValue) {
				return { ...newState, isDirty: false };
			}
			// if value is invalid, dont save it
			if (state.hasError) {
				return newState;
			}

			// TODO add saving here
			return { ...newState, isSaving: true };
		case "save-success":
			return {
				...initialState,
				initialValue: state.value,
				wasSaveSuccussful: true,
			};
		case "save-failure":
			return {
				...state,
				isSaving: false,
				hasError: true,
				errorMessage: action.value ?? "save failed",
			};
		default:
			throw new Error("Unknown action");
	}
};
