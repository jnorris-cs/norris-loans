import type { FieldMetadata, StringFieldMetadata } from "../types";

export const isStringField = (
	field: FieldMetadata,
): field is StringFieldMetadata => {
	return field.type === "string";
};
