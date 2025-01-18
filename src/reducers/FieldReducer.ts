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

export type FieldChangeAction = Pick<State, "hasError" | "errorMessage" | "value">;

type FieldAction =
	| { type: "initialize"; value: InputValue | undefined }
	| { type: "focus-change"; value: boolean }
	| {
			type: "change";
			value: FieldChangeAction;
	  }
	| {
			type: "blur";
	  }
	| {
			type: "save-success";
	  }
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
		case "initialize":
			return {
				...state,
				initialValue: action.value,
				value: action.value,
			};
    case "focus-change":
      return { ...state,  isFocused: action.value};
		case "change":
			return { ...state, ...action.value };
		case "blur":
      // if value hasnt change, go back to initial values
			if (state.value === state.initialValue) {
				return { ...state, isDirty: false };
			}
      // if value is invalid, dont save it
      if (state.hasError){
        return { ...state, isDirty: true };     
      }

			// TODO add saving here
			return { ...state, isSaving: true, isDirty: true };
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
