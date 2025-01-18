export type EntityType = "Loan" | "Borrower";
export type FieldType = "string" | "money" | "date";
export type InputValue = string | number | Date;

export type Loan = Record<EntityType, Record<string, InputValue>>;

export type FieldMetadata = {
	entity: EntityType;
	display: string;
	field: string;
	type: FieldType;
};

export type StringFieldMetadata = FieldMetadata & {
	type: "string";
	conditions: { regex: string };
};

export type MoneyFieldMetadata = FieldMetadata & {
	type: "money";
	conditions: { maxValue: number; minValue: number };
};

export type LoanEntityMetadata = {
	name: EntityType;
	fields: FieldMetadata[];
};
