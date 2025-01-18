import { useEffect } from "react";
import { FieldAction } from "../../reducers/FieldReducer";
import type { Dispatch } from "react";

interface SaveFieldProps {
	dispatch: Dispatch<FieldAction>;
	isSaving: boolean;
}

export const useSaveField = ({ dispatch, isSaving }: SaveFieldProps) => {
	useEffect(() => {
		if (!isSaving) {
			return;
		}

		setTimeout(() => {
			dispatch({ type: "save-success" });
			setTimeout(() => {
				dispatch({ type: "clear-save-success" });
			}, 3000);
		}, 3000);
	}, [dispatch, isSaving]);
};
