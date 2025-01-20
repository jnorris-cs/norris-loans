import { useEffect } from "react";
import { FieldAction } from "../FieldReducer/FieldReducer";

import type { UpdateLoanContextType } from "../../../contexts/UpdateLoanContext";
import type { Dispatch } from "react";
import type { FieldMetadata, InputValue, Loan } from "../../../types";

interface SaveFieldProps {
	dispatch: Dispatch<FieldAction>;
	isSaving: boolean;
	field: FieldMetadata;
	value: InputValue;
	updateLoan: UpdateLoanContextType;
}

// this part is obvious not production code :grimmacing:
const sleep = (ms: number) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};
const apiPatchCall = async (patchRecord: Partial<Loan>, value: InputValue) => {
	console.log("patch api call with this payload", patchRecord);
	await sleep(3000); // 3 seconds to similate patch

	// test api failures with "bad" or a number that includes "99"
	if (value === "bad" || value.toString().includes("99")) {
		throw new Error("Save failed");
	}
};

const updateRecord = async ({
	dispatch,
	field,
	value,
	updateLoan,
}: Omit<SaveFieldProps, "isSaving">) => {
	const patchRecord = {
		[field.entity]: {
			[field.field]: value,
		},
	};

	try {
		await apiPatchCall(patchRecord, value);
		dispatch({ type: "save-success" });
		updateLoan(patchRecord); // update hoisted state

		// clear saver message after 3 seconds
		setTimeout(() => {
			dispatch({ type: "clear-save-success" });
		}, 3000);
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
	}
};

export const useSaveField = ({
	dispatch,
	isSaving,
	field,
	value,
	updateLoan,
}: SaveFieldProps) => {
	useEffect(() => {
		if (!isSaving) {
			return;
		}

		updateRecord({ field, value, dispatch, updateLoan });
	}, [dispatch, isSaving, field, value]);
};
