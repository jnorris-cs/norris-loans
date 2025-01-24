import type { UpdateLoanContextType } from 'contexts/UpdateLoanContext';
import type { Dispatch } from 'react';
import type { FieldMetadata, InputValue, Loan } from 'types';

import { useEffect } from 'react';
import { extractErrorMessage } from 'utils/api';

import { FieldAction, FieldReducerState } from '../FieldReducer/FieldReducer';

interface SaveFieldProps {
  dispatch: Dispatch<FieldAction>;
  field: FieldMetadata;
  saveState: FieldReducerState['saveState'];
  setFieldValue: UpdateLoanContextType['setFieldValue'];
  value: InputValue;
}

// this part is obvious not production code :grimmacing:
const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
const apiPatchCall = async (patchRecord: Partial<Loan>, value: InputValue) => {
  console.log('patch api call with this payload', patchRecord);
  await sleep(2000); // 2 seconds to simulate patch

  // test api failures with "bad" or a number that includes "99"
  if (value === 'bad' || value?.toString().includes('99')) {
    throw new Error('Save failed');
  }
};

const updateRecord = async ({
  dispatch,
  field,
  setFieldValue,
  value,
}: Omit<SaveFieldProps, 'saveState'>) => {
  const patchRecord = {
    [field.entity]: {
      [field.field]: value,
    },
  };

  try {
    await apiPatchCall(patchRecord, value);
    dispatch({ type: 'save-success' });
    setFieldValue(patchRecord); // update global state

    // clear saved message after 3 seconds
    setTimeout(() => {
      dispatch({ type: 'clear-save-success' });
    }, 3000);
  } catch (error: unknown) {
    const errorMessage = extractErrorMessage(error);
    dispatch({ type: 'save-failure', value: errorMessage });
  }
};

export const useSaveField = ({
  dispatch,
  field,
  saveState,
  setFieldValue,
  value,
}: SaveFieldProps) => {
  useEffect(() => {
    if (saveState !== 'ready') {
      return;
    }
    dispatch({ type: 'start-save' });
    updateRecord({ dispatch, field, setFieldValue, value });
  }, [dispatch, saveState, field, value, setFieldValue]);
};
