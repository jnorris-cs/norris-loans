import {
  faCheckCircle,
  faExclamationTriangle,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { FieldReducerState } from '../FieldReducer/FieldReducer';

type LoanFieldIconProps = Omit<
  FieldReducerState,
  'initialValue' | 'isFocused' | 'value'
>;

const LoanFieldIcon = ({
  errorMessage,
  hasError,
  isDirty,
  saveState,
}: LoanFieldIconProps) => {
  if (saveState === 'saving') {
    return (
      <FontAwesomeIcon
        className=" ml2 fa-spin light-gray"
        icon={faSpinner}
        title="Saving..."
      />
    );
  }

  if (saveState === 'saved') {
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
