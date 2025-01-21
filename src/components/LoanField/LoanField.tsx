import type { FieldMetadata, InputValue } from 'types';

import LoanFieldInput from 'components/LoanFieldInput/LoanFieldInput';
import { UpdateLoanContext } from 'contexts/UpdateLoanContext';
import { useContext, useMemo, useReducer } from 'react';

import {
  FieldChangeAction,
  fieldReducer,
  initialState,
} from './FieldReducer/FieldReducer';
import LoanFieldIcon from './LoanFieldIcon/LoanFieldIcon';
import { useSaveField } from './useSaveField/useSaveField';
import './LoanField.scss';

interface LoanFieldProps {
  field: FieldMetadata;
  value?: InputValue;
}

const LoanField = ({ field }: LoanFieldProps) => {
  // field state and logic
  const { getFieldValue, setFieldValue } = useContext(UpdateLoanContext);
  const value = getFieldValue(field);
  const [state, dispatch] = useReducer(fieldReducer, {
    ...initialState,
    initialValue: value,
    value: value,
  });

  useSaveField({
    dispatch,
    field,
    isSaving: state.isSaving,
    setFieldValue,
    value: state.value,
  });

  // html values
  const id = useMemo(
    () => `${field.entity}.${field.field}`,
    [field.entity, field.field]
  );
  const containerClassName = useMemo<string>(() => {
    const classNames = ['mb3', 'loan-field'];

    if (state.hasError && state.isDirty) {
      classNames.push('loan-field__invalid');
    } else if (!state.hasError) {
      classNames.push('loan-field__valid');
    }

    return classNames.join(' ');
  }, [state.isDirty, state.hasError]);

  // input events handlers
  const onFocus = () => dispatch({ type: 'focus' });
  const onChange = (payload: FieldChangeAction) =>
    dispatch({
      type: 'change',
      value: payload,
    });
  const onBlur = () => dispatch({ type: 'blur' });

  return (
    <div className={containerClassName}>
      <label
        className="db mb1"
        htmlFor={id}
      >
        {field.display}
      </label>
      <LoanFieldInput
        field={field}
        id={id}
        name={id}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        value={state.value}
      />
      <LoanFieldIcon {...state} />
      {state.errorMessage && state.isDirty && (
        <div className="loan-field-error-message">{state.errorMessage}</div>
      )}
    </div>
  );
};

export default LoanField;
