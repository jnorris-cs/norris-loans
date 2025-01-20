import type { InputValue } from '../../../types';

export interface State {
	isDirty: boolean; // has user blurred once?
	isFocused: boolean;
	hasError: boolean;
	errorMessage?: string;
	initialValue?: InputValue;
	value: InputValue;
	isSaving: boolean;
	hasSaved?: boolean;
}

export type FieldChangeAction = Pick<
	State,
	'hasError' | 'errorMessage' | 'value'
>;

export type FieldAction =
	| { type: 'focus' }
	| {
			type: 'change';
			value: FieldChangeAction;
	  }
	| { type: 'blur'; value: boolean }
	| { type: 'save-success' }
	| { type: 'clear-save-success' }
	| {
			type: 'save-failure';
			value: State['errorMessage'];
	  };

export const initialState: State = {
	isFocused: false,
	isDirty: false,
	hasError: false,
	isSaving: false,
	value: '',
};

export const fieldReducer = (state: State, action: FieldAction): State => {
	switch (action.type) {
		case 'focus':
			return { ...state, isFocused: true };
		case 'change':
			return { ...state, hasSaved: false, ...action.value };
		case 'blur':
			return {
				...state,
				// if value hasnt changed, go back to initial values
				isDirty: state.value !== state.initialValue,
				isFocused: false,
				isSaving: action.value,
			};
		case 'save-success':
			return {
				...initialState,
				initialValue: state.value,
				value: state.value,
				hasSaved: true,
			};
		case 'clear-save-success':
			return {
				...state,
				hasSaved: false,
			};
		case 'save-failure':
			return {
				...state,
				isSaving: false,
				hasError: true,
				errorMessage: action.value ?? 'save failed',
			};
		default:
			throw new Error('Unknown action');
	}
};
