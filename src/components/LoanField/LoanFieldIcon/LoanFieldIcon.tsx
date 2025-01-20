import type { State } from "../FieldReducer/FieldReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faSpinner,
	faCheckCircle,
	faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";

type LoanFieldIconProps = Omit<State, "isFocused" | "value" | "initialValue">;

const LoanFieldIcon = ({
	isSaving,
	hasError,
	isDirty,
	hasSaved,
	errorMessage,
}: LoanFieldIconProps) => {
	if (isSaving) {
		return (
			<FontAwesomeIcon
				icon={faSpinner}
				className=" ml2 fa-spin gray"
				title="Saving..."
			/>
		);
	}

	if (hasSaved) {
		return (
			<FontAwesomeIcon
				icon={faCheckCircle}
				className=" ml2 gray"
				title="Saved"
			/>
		);
	}

	if (hasError && isDirty) {
		return (
			<FontAwesomeIcon
				icon={faExclamationTriangle}
				className=" ml2 dark-red"
				title={errorMessage}
			/>
		);
	}
};

export default LoanFieldIcon;
