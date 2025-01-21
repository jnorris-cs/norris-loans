import type { InputValue } from 'types';

export type FieldAction =
  | { type: 'blur' }
  | {
      type: 'change';
      value: FieldChangeAction;
    }
  | { type: 'clear-save-success' }
  | { type: 'focus' }
  | {
      type: 'save-failure';
      value: FieldReducerState['errorMessage'];
    }
  | { type: 'save-success' }
  | { type: 'start-save' };

export type FieldChangeAction = Pick<
  FieldReducerState,
  'errorMessage' | 'hasError' | 'value'
>;

export interface FieldReducerState {
  errorMessage?: string;
  hasError: boolean;
  initialValue?: InputValue;
  isDirty: boolean; // has user blurred once?
  isFocused: boolean;
  saveState?: 'not ready' | 'ready' | 'saved' | 'saving';
  value: InputValue;
}

export const initialState: FieldReducerState = {
  hasError: false,
  isDirty: false,
  isFocused: false,
  value: '',
};

export const fieldReducer = (
  state: FieldReducerState,
  action: FieldAction
): FieldReducerState => {
  switch (action.type) {
    case 'blur': {
      const valueChanged = state.value !== state.initialValue;

      return {
        ...state,
        isDirty: valueChanged,
        isFocused: false,
        saveState: !state.hasError && valueChanged ? 'ready' : undefined,
      };
    }
    case 'change':
      return { ...state, saveState: 'not ready', ...action.value };
    case 'clear-save-success':
      return {
        ...state,
        saveState: 'not ready',
      };
    case 'focus':
      return { ...state, isFocused: true };
    case 'save-failure':
      return {
        ...state,
        errorMessage: action.value ?? 'save failed',
        hasError: true,
        saveState: 'not ready',
      };
    case 'save-success':
      return {
        ...initialState,
        initialValue: state.value,
        saveState: 'saved',
        value: state.value,
      };
    case 'start-save':
      return { ...state, initialValue: state.value, saveState: 'saving' };
    default:
      throw new Error('Unknown action');
  }
};
