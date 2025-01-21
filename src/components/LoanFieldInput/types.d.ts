import type { InputValue } from 'types';

export type DateLoanFieldInputProps = {
  field: FieldMetadata;
  value: string;
} & StandardInputProps;

export type FieldChangeAction = {
  value: InputValue;
} & Pick<State, 'errorMessage' | 'hasError'>;

export type MoneyLoanFieldInputProps = {
  field: MoneyFieldMetadata;
  value?: number;
} & StandardInputProps;

export type StandardInputProps = {
  field: FieldMetadata;
  id: string;
  name: string;
  onBlur: () => void;
  onChange: (payload: FieldChangeAction) => void;
  onFocus: () => void;
};

export type StringLoanFieldInputProps = {
  field: StringFieldMetadata;
  value: string;
} & StandardInputProps;
