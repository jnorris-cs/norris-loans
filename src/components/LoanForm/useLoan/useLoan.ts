import type { FieldMetadata, InputValue, Loan } from 'types';

import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { deepMerge } from 'utils/deepMerge';
import { getFromStorage, setInStorage } from 'utils/localStorage';

import { loanReducer } from '../LoanReducer/LoanReducer';
const LOAN_STORAGE_KEY = 'loan';

const convertFieldsToEmptyLoan = (fields: FieldMetadata[]): Loan => {
  return fields.reduce<Loan>((acc, field) => {
    if (!acc[field.entity]) {
      acc[field.entity] = {};
    }

    return acc;
  }, {});
};

export const useLoan = (fields: FieldMetadata[]) => {
  const initialLoan = useMemo(() => {
    const emptyValue = convertFieldsToEmptyLoan(fields);
    const savedValue = getFromStorage<Loan>(LOAN_STORAGE_KEY) ?? {};
    // we want to merge in case any new entity types have been added since the last time the user saved
    return deepMerge<Loan>({}, emptyValue, savedValue);
  }, [fields]);
  const [{ loan }, dispatch] = useReducer(loanReducer, { loan: initialLoan });

  const setFieldValue = useCallback((patchRecord: Partial<Loan>) => {
    dispatch({ type: 'patch', value: patchRecord });
  }, []);

  useEffect(() => {
    if (loan === initialLoan) {
      return;
    }

    console.log('loan in global state', loan);
    setInStorage(LOAN_STORAGE_KEY, loan);
  }, [loan, initialLoan]);

  const getFieldValue = useCallback(
    (field: FieldMetadata): InputValue => {
      if (!loan[field.entity]) {
        loan[field.entity] = {};
      }

      return loan[field.entity][field.field] ?? '';
    },
    [loan]
  );

  return {
    getFieldValue,
    setFieldValue,
  };
};
