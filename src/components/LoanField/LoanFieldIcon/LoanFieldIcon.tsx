import {
	faCheckCircle,
	faExclamationTriangle,
	faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { State } from '../FieldReducer/FieldReducer';

type LoanFieldIconProps = Omit<State, 'initialValue' | 'isFocused' | 'value'>;

const LoanFieldIcon = ({
	errorMessage,
	hasError,
	hasSaved,
	isDirty,
	isSaving,
}: LoanFieldIconProps) => {
	if (isSaving) {
		return (
			<FontAwesomeIcon
				className=" ml2 fa-spin light-gray"
				icon={faSpinner}
				title="Saving..."
			/>
		);
	}

	if (hasSaved) {
		return (
			<FontAwesomeIcon
				className=" ml2 light-gray"
				icon={faCheckCircle}
				title="Saved"
			/>
		);
	}

	if (hasError && isDirty) {
		return (
			<FontAwesomeIcon
				className=" ml2 dark-red"
				icon={faExclamationTriangle}
				title={errorMessage}
			/>
		);
	}
};

export default LoanFieldIcon;
