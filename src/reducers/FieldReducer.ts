import type { InputValue } from "../types";

interface State {
	isFocused: boolean
	hasError: boolean
	errorMessage?: string
  initialValue?: InputValue
	value?: InputValue
	isSaving: boolean
  wasSaveSuccussful? : boolean
};

type FieldAction =
  | { type: "initialize", value: InputValue | undefined }
  | { type: "focus-change", value: boolean }
	| { 
		type: "change"; 
		value: Pick<State, 'hasError' | 'errorMessage'> & { value: InputValue }
	}
	| {
		type: 'blur'
	}
	| {
		type: 'save-success'
	}
	| {
		type: 'save-failure', value: State['errorMessage']
	}

 export const initialState: State = { 
    isFocused: false,
    hasError: false,
    isSaving: false
  };


  export const fieldReducer = (state: State, action: FieldAction): State => {
    switch (action.type) {
      case "initialize":
        return {
          ...state,
          initialValue: action.value,
          value: action.value
        };
      case "focus-change":
        return { ...state,  isFocused: action.value};
      case "change":
        return { ...state, ...action.value,
        };
      case "blur":
        if (state.value === state.initialValue){
          return { ...state, isFocused: false};
        }

        // TODO add saving here
        return { ...state, isSaving: true, isFocused: false};
      case "save-success":

        return { 
          ...initialState,
          initialValue: state.value,
          wasSaveSuccussful: true
        };
      case "save-failure":

        return { 
          ...state,
          isSaving: false,
          hasError: true,
          errorMessage: action.value ?? 'save failed'
        };
      default:
        throw new Error("Unknown action");
    }
  }
