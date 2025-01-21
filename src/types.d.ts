export type EntityType = 'Borrower' | 'Loan';
export type FieldMetadata = {
  display: string;
  entity: EntityType;
  field: string;
  type: FieldType;
};
export type FieldType = 'date' | 'money' | 'string';
export type InputValue = number | string;
export type Loan = Record<string, Record<string, InputValue | undefined>>;

export type LoanEntityMetadata = {
  fields: FieldMetadata[];
  name: EntityType;
};

export type MoneyFieldMetadata = {
  conditions: { maxValue: number; minValue: number };
  type: 'money';
} & FieldMetadata;

export type StringFieldMetadata = {
  conditions: { regex: string };
  type: 'string';
} & FieldMetadata;
