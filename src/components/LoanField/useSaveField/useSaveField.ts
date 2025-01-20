import { useEffect } from "react";
import { FieldAction } from "../FieldReducer/FieldReducer";
import type { Dispatch } from "react";
import type { FieldMetadata, InputValue, Loan } from "../../../types";

interface SaveFieldProps {
	dispatch: Dispatch<FieldAction>;
	isSaving: boolean;
	field: FieldMetadata;
	value: InputValue;
}

// this part is obvious not production code :grimmacing:
const sleep = (ms: number) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};
const apiPatchCall = async (patchRecord: Partial<Loan>, value: InputValue) => {
	console.log("saving...", patchRecord);
	await sleep(3000); // 3 seconds to similate patch
	// test api failures
	if (value === "bad" || value.toString().includes("99")) {
		throw new Error("Save failed");
	}
};

const updateRecord = async ({
	dispatch,
	field,
	value,
}: Omit<SaveFieldProps, "isSaving">) => {
	const patchRecord = {
		[field.entity]: {
			[field.field]: value,
		},
	};

	try {
		await apiPatchCall(patchRecord, value);
		dispatch({ type: "save-success" });
	} catch (error: unknown) {
		const errorMessage: string =
			typeof error === "object" &&
			error &&
			"message" in error &&
			typeof error.message === "string"
				? error.message
				: typeof error === "string" && error
					? error
					: "Save Failed";
		dispatch({ type: "save-failure", value: errorMessage });
	} finally {
		dispatch({ type: "clear-save-success" });
	}
};

export const useSaveField = ({
	dispatch,
	isSaving,
	field,
	value,
}: SaveFieldProps) => {
	useEffect(() => {
		if (!isSaving) {
			return;
		}

		updateRecord({ field, value, dispatch });
	}, [dispatch, isSaving]);
};
