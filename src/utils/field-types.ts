import type {
	FieldMetadata,
	StringFieldMetadata,
	MoneyFieldMetadata,
} from "../types";

export const isStringField = (
	field: FieldMetadata,
): field is StringFieldMetadata => {
	return field.type === "string";
};

export const isDateField = (field: FieldMetadata): field is FieldMetadata => {
	return field.type === "date";
};

export const isMoneyField = (
	field: FieldMetadata,
): field is MoneyFieldMetadata => {
	return field.type === "money";
};
