import type { InputValue } from 'types';

export type FieldAction =
	| { type: 'blur'; value: boolean }
	| {
			type: 'change';
			value: FieldChangeAction;
	  }
	| { type: 'clear-save-success' }
	| { type: 'focus' }
	| {
			type: 'save-failure';
			value: State['errorMessage'];
	  }
	| { type: 'save-success' };

export type FieldChangeAction = Pick<
	State,
	'errorMessage' | 'hasError' | 'value'
>;

export interface State {
	errorMessage?: string;
	hasError: boolean;
	hasSaved?: boolean;
	initialValue?: InputValue;
	isDirty: boolean; // has user blurred once?
	isFocused: boolean;
	isSaving: boolean;
	value: InputValue;
}

export const initialState: State = {
	hasError: false,
	isDirty: false,
	isFocused: false,
	isSaving: false,
	value: '',
};

export const fieldReducer = (state: State, action: FieldAction): State => {
	switch (action.type) {
		case 'blur':
			return {
				...state,
				// if value hasn't changed, go back to initial values
				isDirty: state.value !== state.initialValue,
				isFocused: false,
				isSaving: action.value,
			};
		case 'change':
			return { ...state, hasSaved: false, ...action.value };
		case 'clear-save-success':
			return {
				...state,
				hasSaved: false,
			};
		case 'focus':
			return { ...state, isFocused: true };
		case 'save-failure':
			return {
				...state,
				errorMessage: action.value ?? 'save failed',
				hasError: true,
				isSaving: false,
			};
		case 'save-success':
			return {
				...initialState,
				hasSaved: true,
				initialValue: state.value,
				value: state.value,
			};
		default:
			throw new Error('Unknown action');
	}
};
