import type { State } from "../../../reducers/FieldReducer";
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
}: LoanFieldIconProps) => {
	if (isSaving) {
		return <FontAwesomeIcon icon={faSpinner} className=" ml2 fa-spin" />;
	}

	if (hasSaved) {
		return <FontAwesomeIcon icon={faCheckCircle} className=" ml2 green" />;
	}

	if (hasError && isDirty) {
		return (
			<FontAwesomeIcon icon={faExclamationTriangle} className=" ml2 dark-red" />
		);
	}
};

export default LoanFieldIcon;
