import type { FieldMetadata, InputValue, Loan } from 'types';

import { useCallback, useState } from 'react';
import { deepMerge } from 'utils/deepMerge';
import { getFromStorage, setInStorage } from 'utils/localStorage';

const LOAN_STORAGE_KEY = 'loan';

export const convertFieldsToEmptyLoan = (fields: FieldMetadata[]): Loan => {
  return fields.reduce<Loan>((acc, field) => {
    if (!acc[field.entity]) {
      acc[field.entity] = {};
    }

    return acc;
  }, {});
};

export const useLoan = (fields: FieldMetadata[]) => {
  const emptyValue = convertFieldsToEmptyLoan(fields);
  const savedValue = getFromStorage<Loan>(LOAN_STORAGE_KEY) ?? {};
  // we want to merge in case any new entity types have been added since the last time the user saved
  const initialLoan = deepMerge<Loan>({}, emptyValue, savedValue);
  const [loan, setLoan] = useState<Loan>(initialLoan);

  const setFieldValue = (patchRecord: Partial<Loan>): void => {
    const newLoan = deepMerge<Loan>({}, loan, patchRecord);
    console.log('updated in global state', newLoan);
    setLoan(newLoan);
    setInStorage(LOAN_STORAGE_KEY, newLoan);
  };

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
