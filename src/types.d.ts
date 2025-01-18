export type EntityType = "Loan" | "Borrower";
export type FieldType = "string" | "money" | "date";
export type MoneyConditions = { maxValue: number; minValue: number };
export type StringConditions = { regex‌: string };

export type FieldMetadata = {
	entity: EntityType;
	display: string;
	field: string;
	type: FieldType;
	conditions?: MoneyConditions | StringConditions;
};

export type LoanEntityMetadata = {
	name: EntityType;
	fields: FieldMetadata[];
};
